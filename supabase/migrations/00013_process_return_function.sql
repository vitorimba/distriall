-- Migration: 00013_process_return_function
-- Story 2.5: Devolucao Parcial de Pedido

CREATE OR REPLACE FUNCTION public.process_return(
  p_order_id UUID,
  p_items JSONB -- [{ "order_item_id": "uuid", "returned_quantity": 3, "reason": "motivo" }]
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_item JSONB;
  v_order_item RECORD;
  v_current_order RECORD;
  v_return_qty NUMERIC(10,3);
  v_available NUMERIC(10,3);
  v_total_return_value NUMERIC(12,2) := 0;
  v_total_return_cost NUMERIC(12,2) := 0;
BEGIN
  -- Validate order exists and is delivered
  SELECT * INTO v_current_order FROM public.orders WHERE id = p_order_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order % not found', p_order_id;
  END IF;

  IF v_current_order.status != 'entregue' THEN
    RAISE EXCEPTION 'Returns only allowed on delivered orders. Current status: %', v_current_order.status;
  END IF;

  -- Process each returned item
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

    -- Update item
    UPDATE public.order_items SET
      returned_quantity = returned_quantity + v_return_qty,
      is_returned = CASE
        WHEN returned_quantity + v_return_qty >= quantity THEN true
        ELSE false
      END,
      return_reason = v_item->>'reason',
      returned_at = now()
    WHERE id = (v_item->>'order_item_id')::UUID;

    -- Accumulate return values
    v_total_return_value := v_total_return_value + ROUND(v_return_qty * v_order_item.unit_price, 2);
    v_total_return_cost := v_total_return_cost + ROUND(v_return_qty * v_order_item.cost_price, 2);
  END LOOP;

  -- Recalculate order totals
  UPDATE public.orders SET
    subtotal = subtotal - v_total_return_value,
    total_cost = total_cost - v_total_return_cost,
    profit = (subtotal - v_total_return_value) - (total_cost - v_total_return_cost),
    total = (subtotal - v_total_return_value) - discount,
    updated_at = now()
  WHERE id = p_order_id;

  RETURN p_order_id;
END;
$$;
