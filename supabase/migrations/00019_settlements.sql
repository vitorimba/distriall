-- Migration: 00019_settlements
-- Story 3.4: Acerto Semanal Automatizado

-- 1. Settlements table
CREATE TABLE public.settlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'rascunho'
    CHECK (status IN ('rascunho', 'conferido', 'fechado')),

  -- Revenue breakdown by payment method
  total_revenue NUMERIC(12,2) NOT NULL DEFAULT 0,
  revenue_dinheiro NUMERIC(12,2) NOT NULL DEFAULT 0,
  revenue_pix NUMERIC(12,2) NOT NULL DEFAULT 0,
  revenue_boleto NUMERIC(12,2) NOT NULL DEFAULT 0,
  revenue_vale NUMERIC(12,2) NOT NULL DEFAULT 0,
  revenue_cartao NUMERIC(12,2) NOT NULL DEFAULT 0,

  -- Costs
  total_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_expenses NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_returns NUMERIC(12,2) NOT NULL DEFAULT 0,

  -- Calculated
  gross_profit NUMERIC(12,2) NOT NULL DEFAULT 0,
  net_profit NUMERIC(12,2) NOT NULL DEFAULT 0,

  -- Metadata
  order_count INTEGER NOT NULL DEFAULT 0,
  client_count INTEGER NOT NULL DEFAULT 0,
  pending_vouchers_count INTEGER NOT NULL DEFAULT 0,
  pending_vouchers_amount NUMERIC(12,2) NOT NULL DEFAULT 0,

  notes TEXT,
  closed_by UUID REFERENCES public.users(id),
  closed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_settlements_account ON public.settlements(account_id);
CREATE INDEX idx_settlements_period ON public.settlements(period_start, period_end);
CREATE INDEX idx_settlements_status ON public.settlements(status);

-- Updated_at trigger
CREATE TRIGGER on_settlements_updated
  BEFORE UPDATE ON public.settlements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 2. Settlement orders (link table)
CREATE TABLE public.settlement_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  settlement_id UUID NOT NULL REFERENCES public.settlements(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES public.orders(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(settlement_id, order_id)
);

CREATE INDEX idx_settlement_orders_settlement ON public.settlement_orders(settlement_id);
CREATE INDEX idx_settlement_orders_order ON public.settlement_orders(order_id);

-- 3. Settlement expenses (link table)
CREATE TABLE public.settlement_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  settlement_id UUID NOT NULL REFERENCES public.settlements(id) ON DELETE CASCADE,
  expense_id UUID NOT NULL REFERENCES public.expenses(id),
  amount NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(settlement_id, expense_id)
);

CREATE INDEX idx_settlement_expenses_settlement ON public.settlement_expenses(settlement_id);
CREATE INDEX idx_settlement_expenses_expense ON public.settlement_expenses(expense_id);

-- 4. RLS for settlements
ALTER TABLE public.settlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Financial visibility required for settlements"
  ON public.settlements FOR SELECT
  USING (
    account_id = ANY(get_user_account_ids())
    AND can_view_financial(account_id)
  );

CREATE POLICY "Admins can create settlements"
  ON public.settlements FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );

CREATE POLICY "Admins can update non-closed settlements"
  ON public.settlements FOR UPDATE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
    AND status != 'fechado'
  )
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );

CREATE POLICY "Admins can delete non-closed settlements"
  ON public.settlements FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
    AND status != 'fechado'
  );

-- 5. RLS for settlement_orders
ALTER TABLE public.settlement_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Financial visibility for settlement_orders"
  ON public.settlement_orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.settlements s
      WHERE s.id = settlement_id
        AND s.account_id = ANY(get_user_account_ids())
        AND can_view_financial(s.account_id)
    )
  );

CREATE POLICY "Admins can insert settlement_orders"
  ON public.settlement_orders FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.settlements s
      WHERE s.id = settlement_id
        AND s.account_id = ANY(get_user_account_ids())
        AND get_user_role_in_account(s.account_id) = 'admin'
    )
  );

CREATE POLICY "Admins can delete settlement_orders"
  ON public.settlement_orders FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.settlements s
      WHERE s.id = settlement_id
        AND s.account_id = ANY(get_user_account_ids())
        AND get_user_role_in_account(s.account_id) = 'admin'
    )
  );

-- 6. RLS for settlement_expenses
ALTER TABLE public.settlement_expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Financial visibility for settlement_expenses"
  ON public.settlement_expenses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.settlements s
      WHERE s.id = settlement_id
        AND s.account_id = ANY(get_user_account_ids())
        AND can_view_financial(s.account_id)
    )
  );

CREATE POLICY "Admins can insert settlement_expenses"
  ON public.settlement_expenses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.settlements s
      WHERE s.id = settlement_id
        AND s.account_id = ANY(get_user_account_ids())
        AND get_user_role_in_account(s.account_id) = 'admin'
    )
  );

CREATE POLICY "Admins can delete settlement_expenses"
  ON public.settlement_expenses FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.settlements s
      WHERE s.id = settlement_id
        AND s.account_id = ANY(get_user_account_ids())
        AND get_user_role_in_account(s.account_id) = 'admin'
    )
  );

-- 7. DB function: generate_settlement
-- PO Condition 1 fix: expenses WHERE clause uses JOIN on expense_splits
-- to ensure only expenses where the account participates are included.
CREATE OR REPLACE FUNCTION public.generate_settlement(
  p_account_id UUID,
  p_period_start DATE,
  p_period_end DATE
) RETURNS UUID AS $$
DECLARE
  v_settlement_id UUID;
  v_total_revenue NUMERIC := 0;
  v_total_cost NUMERIC := 0;
  v_total_expenses NUMERIC := 0;
  v_total_returns NUMERIC := 0;
  v_rev_dinheiro NUMERIC := 0;
  v_rev_pix NUMERIC := 0;
  v_rev_boleto NUMERIC := 0;
  v_rev_vale NUMERIC := 0;
  v_rev_cartao NUMERIC := 0;
  v_order_count INTEGER := 0;
  v_client_count INTEGER := 0;
  v_pending_vouchers_count INTEGER := 0;
  v_pending_vouchers_amount NUMERIC := 0;
BEGIN
  -- 1. Calculate revenue from orders in period
  SELECT
    COALESCE(SUM(o.total), 0),
    COALESCE(SUM(o.total_cost), 0),
    COUNT(*),
    COUNT(DISTINCT o.client_id)
  INTO v_total_revenue, v_total_cost, v_order_count, v_client_count
  FROM public.orders o
  WHERE o.account_id = p_account_id
    AND o.created_at::date BETWEEN p_period_start AND p_period_end
    AND o.status != 'cancelado';

  -- 2. Revenue breakdown by payment method
  SELECT
    COALESCE(SUM(p.amount) FILTER (WHERE p.method = 'dinheiro'), 0),
    COALESCE(SUM(p.amount) FILTER (WHERE p.method = 'pix'), 0),
    COALESCE(SUM(p.amount) FILTER (WHERE p.method = 'boleto'), 0),
    COALESCE(SUM(p.amount) FILTER (WHERE p.method = 'vale'), 0),
    COALESCE(SUM(p.amount) FILTER (WHERE p.method = 'cartao'), 0)
  INTO v_rev_dinheiro, v_rev_pix, v_rev_boleto, v_rev_vale, v_rev_cartao
  FROM public.payments p
  JOIN public.orders o ON p.order_id = o.id
  WHERE o.account_id = p_account_id
    AND o.created_at::date BETWEEN p_period_start AND p_period_end
    AND o.status != 'cancelado'
    AND p.status != 'cancelado';

  -- 3. Calculate returns
  SELECT COALESCE(SUM(oi.returned_quantity * oi.unit_price), 0)
  INTO v_total_returns
  FROM public.order_items oi
  JOIN public.orders o ON oi.order_id = o.id
  WHERE o.account_id = p_account_id
    AND o.created_at::date BETWEEN p_period_start AND p_period_end
    AND oi.is_returned = true;

  -- 4. Calculate expenses (direct + splits from shared expenses)
  -- FIX (PO Condition 1): For shared expenses, JOIN on expense_splits to ensure
  -- only expenses where this account has a split record are included.
  -- Direct expenses: account_id = p_account_id AND is_shared = false
  -- Shared expenses: is_shared = true AND has a split record for p_account_id
  SELECT COALESCE(SUM(
    CASE
      WHEN e.is_shared THEN es.amount
      ELSE e.amount
    END
  ), 0)
  INTO v_total_expenses
  FROM public.expenses e
  LEFT JOIN public.expense_splits es
    ON es.expense_id = e.id AND es.account_id = p_account_id
  WHERE e.expense_date BETWEEN p_period_start AND p_period_end
    AND (
      (e.is_shared = false AND e.account_id = p_account_id)
      OR
      (e.is_shared = true AND es.id IS NOT NULL)
    );

  -- 5. Pending vouchers
  SELECT COUNT(*), COALESCE(SUM(v.amount), 0)
  INTO v_pending_vouchers_count, v_pending_vouchers_amount
  FROM public.vouchers v
  WHERE v.account_id = p_account_id
    AND v.status = 'pendente'
    AND v.created_at::date BETWEEN p_period_start AND p_period_end;

  -- 6. Create settlement record
  INSERT INTO public.settlements (
    account_id, period_start, period_end,
    total_revenue, revenue_dinheiro, revenue_pix, revenue_boleto, revenue_vale, revenue_cartao,
    total_cost, total_expenses, total_returns,
    gross_profit, net_profit,
    order_count, client_count,
    pending_vouchers_count, pending_vouchers_amount
  ) VALUES (
    p_account_id, p_period_start, p_period_end,
    v_total_revenue, v_rev_dinheiro, v_rev_pix, v_rev_boleto, v_rev_vale, v_rev_cartao,
    v_total_cost, v_total_expenses, v_total_returns,
    v_total_revenue - v_total_cost,
    v_total_revenue - v_total_cost - v_total_expenses - v_total_returns,
    v_order_count, v_client_count,
    v_pending_vouchers_count, v_pending_vouchers_amount
  ) RETURNING id INTO v_settlement_id;

  -- 7. Link orders to settlement
  INSERT INTO public.settlement_orders (settlement_id, order_id)
  SELECT v_settlement_id, o.id
  FROM public.orders o
  WHERE o.account_id = p_account_id
    AND o.created_at::date BETWEEN p_period_start AND p_period_end
    AND o.status != 'cancelado';

  -- 8. Link expenses to settlement
  -- Same fix applied: only include expenses where this account participates
  INSERT INTO public.settlement_expenses (settlement_id, expense_id, amount)
  SELECT
    v_settlement_id,
    e.id,
    CASE
      WHEN e.is_shared THEN es.amount
      ELSE e.amount
    END
  FROM public.expenses e
  LEFT JOIN public.expense_splits es
    ON es.expense_id = e.id AND es.account_id = p_account_id
  WHERE e.expense_date BETWEEN p_period_start AND p_period_end
    AND (
      (e.is_shared = false AND e.account_id = p_account_id)
      OR
      (e.is_shared = true AND es.id IS NOT NULL)
    );

  RETURN v_settlement_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
