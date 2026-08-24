-- Migration: 00037_delivery_settlements
-- Story 8.4: Acerto do Entregador — checklist de retorno

-- 1. Delivery settlements table (acerto do dia)
CREATE TABLE public.delivery_settlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  delivery_id UUID NOT NULL REFERENCES public.deliveries(id) ON DELETE CASCADE,
  settled_by UUID NOT NULL DEFAULT auth.uid() REFERENCES public.users(id),
  settled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'aberto'
    CHECK (status IN ('aberto', 'fechado')),
  cash_expected NUMERIC(12,2) NOT NULL DEFAULT 0,
  cash_received NUMERIC(12,2) NOT NULL DEFAULT 0,
  vouchers_expected INTEGER NOT NULL DEFAULT 0,
  vouchers_returned INTEGER NOT NULL DEFAULT 0,
  has_discrepancy BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_delivery_settlements_account ON public.delivery_settlements(account_id);
CREATE INDEX idx_delivery_settlements_delivery ON public.delivery_settlements(delivery_id);
CREATE INDEX idx_delivery_settlements_date ON public.delivery_settlements(settled_at);

CREATE TRIGGER on_delivery_settlements_updated
  BEFORE UPDATE ON public.delivery_settlements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 2. Settlement items table (itens do acerto por pedido)
CREATE TABLE public.settlement_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  settlement_id UUID NOT NULL REFERENCES public.delivery_settlements(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES public.orders(id),
  payment_method TEXT,
  expected_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  received_amount NUMERIC(12,2),
  voucher_returned BOOLEAN DEFAULT false,
  boleto_returned BOOLEAN DEFAULT false,
  check_number TEXT,
  check_amount NUMERIC(12,2),
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'conferido', 'divergencia')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_settlement_items_settlement ON public.settlement_items(settlement_id);
CREATE INDEX idx_settlement_items_order ON public.settlement_items(order_id);

-- 3. RLS for delivery_settlements
ALTER TABLE public.delivery_settlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view settlements of their accounts"
  ON public.delivery_settlements FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Admins can insert settlements"
  ON public.delivery_settlements FOR INSERT
  WITH CHECK (
    get_user_role_in_account(account_id) = 'admin'
  );

CREATE POLICY "Admins can update settlements"
  ON public.delivery_settlements FOR UPDATE
  USING (
    get_user_role_in_account(account_id) = 'admin'
  );

CREATE POLICY "Admins can delete settlements"
  ON public.delivery_settlements FOR DELETE
  USING (
    get_user_role_in_account(account_id) = 'admin'
  );

-- 4. RLS for settlement_items
ALTER TABLE public.settlement_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settlement items visible to account users"
  ON public.settlement_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.delivery_settlements ds
      WHERE ds.id = settlement_id
        AND ds.account_id = ANY(get_user_account_ids())
    )
  );

CREATE POLICY "Admins can insert settlement items"
  ON public.settlement_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.delivery_settlements ds
      WHERE ds.id = settlement_id
        AND get_user_role_in_account(ds.account_id) = 'admin'
    )
  );

CREATE POLICY "Admins can update settlement items"
  ON public.settlement_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.delivery_settlements ds
      WHERE ds.id = settlement_id
        AND get_user_role_in_account(ds.account_id) = 'admin'
    )
  );

CREATE POLICY "Admins can delete settlement items"
  ON public.settlement_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.delivery_settlements ds
      WHERE ds.id = settlement_id
        AND get_user_role_in_account(ds.account_id) = 'admin'
    )
  );
