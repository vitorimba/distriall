-- Migration: 00028_exchanges
-- Feature: Exchange tracking — links returned items to a new replacement order

-- 1. Create exchanges table
CREATE TABLE public.exchanges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  origin_order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  exchange_order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  created_by UUID NOT NULL DEFAULT auth.uid(),
  reason TEXT NOT NULL,
  credit_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'concluida', 'cancelada')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Add exchange_id to orders (links the new order back to the exchange)
ALTER TABLE public.orders ADD COLUMN exchange_id UUID REFERENCES public.exchanges(id) ON DELETE SET NULL;

-- 3. Indexes
CREATE INDEX idx_exchanges_account ON public.exchanges(account_id);
CREATE INDEX idx_exchanges_origin ON public.exchanges(origin_order_id);
CREATE INDEX idx_exchanges_exchange_order ON public.exchanges(exchange_order_id);
CREATE INDEX idx_orders_exchange ON public.orders(exchange_id) WHERE exchange_id IS NOT NULL;

-- 4. RLS
ALTER TABLE public.exchanges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view exchanges of their accounts"
  ON public.exchanges FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Users can insert exchanges for their accounts"
  ON public.exchanges FOR INSERT
  WITH CHECK (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Users can update exchanges of their accounts"
  ON public.exchanges FOR UPDATE
  USING (account_id = ANY(get_user_account_ids()));

-- 5. RPC: create_exchange
-- Processes return of selected items and creates an exchange record
CREATE OR REPLACE FUNCTION public.create_exchange(
  p_order_id UUID,
  p_items JSONB,   -- [{ "order_item_id": "uuid", "returned_quantity": 3 }]
  p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_item JSONB;
  v_order RECORD;
  v_order_item RECORD;
  v_return_qty NUMERIC(10,3);
  v_available NUMERIC(10,3);
  v_credit NUMERIC(12,2) := 0;
  v_total_return_cost NUMERIC(12,2) := 0;
  v_exchange_id UUID;
BEGIN
  -- Validate order exists and is delivered
  SELECT * INTO v_order FROM public.orders WHERE id = p_order_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order % not found', p_order_id;
  END IF;

  IF v_order.status != 'entregue' THEN
    RAISE EXCEPTION 'Exchanges only allowed on delivered orders. Current status: %', v_order.status;
  END IF;

  IF p_reason IS NULL OR length(trim(p_reason)) < 5 THEN
    RAISE EXCEPTION 'Reason must be at least 5 characters';
  END IF;

  -- Process returns on each item (same logic as process_return)
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_return_qty := (v_item->>'returned_quantity')::NUMERIC(10,3);

    IF v_return_qty <= 0 THEN
      RAISE EXCEPTION 'Returned quantity must be greater than 0';
    END IF;

    SELECT * INTO v_order_item
    FROM public.order_items
    WHERE id = (v_item->>'order_item_id')::UUID
      AND order_id = p_order_id;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Order item % not found in order %', v_item->>'order_item_id', p_order_id;
    END IF;

    v_available := v_order_item.quantity - v_order_item.returned_quantity;

    IF v_return_qty > v_available THEN
      RAISE EXCEPTION 'Cannot return % of %. Available: %', v_return_qty, v_order_item.product_name, v_available;
    END IF;

    -- Update item as returned
    UPDATE public.order_items SET
      returned_quantity = returned_quantity + v_return_qty,
      is_returned = CASE
        WHEN returned_quantity + v_return_qty >= quantity THEN true
        ELSE false
      END,
      return_reason = 'Troca: ' || p_reason,
      returned_at = now()
    WHERE id = (v_item->>'order_item_id')::UUID;

    -- Accumulate credit
    v_credit := v_credit + ROUND(v_return_qty * v_order_item.unit_price, 2);
    v_total_return_cost := v_total_return_cost + ROUND(v_return_qty * v_order_item.cost_price, 2);
  END LOOP;

  -- Recalculate order totals (same as process_return)
  UPDATE public.orders SET
    subtotal = subtotal - v_credit,
    total_cost = total_cost - v_total_return_cost,
    profit = (subtotal - v_credit) - (total_cost - v_total_return_cost),
    total = (subtotal - v_credit) - discount,
    updated_at = now()
  WHERE id = p_order_id;

  -- Create exchange record
  INSERT INTO public.exchanges (
    account_id, origin_order_id, reason, credit_amount, created_by
  ) VALUES (
    v_order.account_id, p_order_id, p_reason, v_credit, auth.uid()
  )
  RETURNING id INTO v_exchange_id;

  RETURN jsonb_build_object(
    'exchange_id', v_exchange_id,
    'credit_amount', v_credit
  );
END;
$$;

-- 6. RPC: link_exchange_order
-- Called when the new order is created, linking it to the exchange
CREATE OR REPLACE FUNCTION public.link_exchange_order(
  p_exchange_id UUID,
  p_order_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_exchange RECORD;
BEGIN
  SELECT * INTO v_exchange FROM public.exchanges WHERE id = p_exchange_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Exchange % not found', p_exchange_id;
  END IF;

  IF v_exchange.status != 'pendente' THEN
    RAISE EXCEPTION 'Exchange is not pending. Status: %', v_exchange.status;
  END IF;

  -- Link the new order to the exchange
  UPDATE public.exchanges
  SET exchange_order_id = p_order_id,
      status = 'concluida',
      updated_at = now()
  WHERE id = p_exchange_id;

  -- Link the order back to the exchange
  UPDATE public.orders
  SET exchange_id = p_exchange_id
  WHERE id = p_order_id;
END;
$$;
