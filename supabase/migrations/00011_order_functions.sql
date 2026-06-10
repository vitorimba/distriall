-- Migration: 00011_order_functions
-- Story 2.1: PL/pgSQL functions for order creation and update

-- 1. create_order: atomically creates order + items with price snapshots
CREATE OR REPLACE FUNCTION public.create_order(
  p_account_id UUID,
  p_client_id UUID,
  p_items JSONB,        -- [{variant_id, quantity}]
  p_payment_method TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL,
  p_delivery_date DATE DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order_id UUID;
  v_item JSONB;
  v_variant RECORD;
  v_custom_price NUMERIC(10,2);
  v_unit_price NUMERIC(10,2);
  v_line_total NUMERIC(12,2);
  v_line_cost NUMERIC(12,2);
  v_subtotal NUMERIC(12,2) := 0;
  v_total_cost NUMERIC(12,2) := 0;
  v_quantity NUMERIC(10,3);
BEGIN
  -- Create the order
  INSERT INTO public.orders (
    account_id, client_id, created_by,
    payment_method, notes, delivery_date
  ) VALUES (
    p_account_id, p_client_id, auth.uid(),
    p_payment_method, p_notes, p_delivery_date
  )
  RETURNING id INTO v_order_id;

  -- Loop through items
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_quantity := (v_item->>'quantity')::NUMERIC(10,3);

    -- Get variant with product name
    SELECT pv.id, pv.sell_price, pv.cost_price, pv.name AS variant_name, p.name AS product_name
    INTO v_variant
    FROM public.product_variants pv
    JOIN public.products p ON p.id = pv.product_id
    WHERE pv.id = (v_item->>'variant_id')::UUID;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product variant % not found', v_item->>'variant_id';
    END IF;

    -- Check for custom price
    SELECT cp.custom_price INTO v_custom_price
    FROM public.client_prices cp
    WHERE cp.client_id = p_client_id
      AND cp.product_variant_id = v_variant.id;

    v_unit_price := COALESCE(v_custom_price, v_variant.sell_price);
    v_line_total := ROUND(v_quantity * v_unit_price, 2);
    v_line_cost := ROUND(v_quantity * v_variant.cost_price, 2);

    -- Insert order item with snapshots
    INSERT INTO public.order_items (
      order_id, account_id, product_variant_id,
      product_name, variant_name,
      quantity, unit_price, cost_price,
      total, total_cost
    ) VALUES (
      v_order_id, p_account_id, v_variant.id,
      v_variant.product_name, v_variant.variant_name,
      v_quantity, v_unit_price, v_variant.cost_price,
      v_line_total, v_line_cost
    );

    v_subtotal := v_subtotal + v_line_total;
    v_total_cost := v_total_cost + v_line_cost;
  END LOOP;

  -- Update order totals
  UPDATE public.orders
  SET subtotal = v_subtotal,
      total_cost = v_total_cost,
      profit = v_subtotal - v_total_cost,
      total = v_subtotal
  WHERE id = v_order_id;

  RETURN v_order_id;
END;
$$;

-- 2. update_order: atomically replaces order items and recalculates totals
CREATE OR REPLACE FUNCTION public.update_order(
  p_order_id UUID,
  p_client_id UUID,
  p_items JSONB,
  p_payment_method TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL,
  p_delivery_date DATE DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order RECORD;
  v_item JSONB;
  v_variant RECORD;
  v_custom_price NUMERIC(10,2);
  v_unit_price NUMERIC(10,2);
  v_line_total NUMERIC(12,2);
  v_line_cost NUMERIC(12,2);
  v_subtotal NUMERIC(12,2) := 0;
  v_total_cost NUMERIC(12,2) := 0;
  v_quantity NUMERIC(10,3);
BEGIN
  -- Verify order exists and is editable
  SELECT * INTO v_order FROM public.orders WHERE id = p_order_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order % not found', p_order_id;
  END IF;

  IF v_order.status IN ('entregue', 'cancelado') THEN
    RAISE EXCEPTION 'Cannot edit order with status %', v_order.status;
  END IF;

  -- Update order header
  UPDATE public.orders
  SET client_id = p_client_id,
      payment_method = p_payment_method,
      notes = p_notes,
      delivery_date = p_delivery_date
  WHERE id = p_order_id;

  -- Delete old items
  DELETE FROM public.order_items WHERE order_id = p_order_id;

  -- Re-insert items with fresh snapshots
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_quantity := (v_item->>'quantity')::NUMERIC(10,3);

    SELECT pv.id, pv.sell_price, pv.cost_price, pv.name AS variant_name, p.name AS product_name
    INTO v_variant
    FROM public.product_variants pv
    JOIN public.products p ON p.id = pv.product_id
    WHERE pv.id = (v_item->>'variant_id')::UUID;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product variant % not found', v_item->>'variant_id';
    END IF;

    SELECT cp.custom_price INTO v_custom_price
    FROM public.client_prices cp
    WHERE cp.client_id = p_client_id
      AND cp.product_variant_id = v_variant.id;

    v_unit_price := COALESCE(v_custom_price, v_variant.sell_price);
    v_line_total := ROUND(v_quantity * v_unit_price, 2);
    v_line_cost := ROUND(v_quantity * v_variant.cost_price, 2);

    INSERT INTO public.order_items (
      order_id, account_id, product_variant_id,
      product_name, variant_name,
      quantity, unit_price, cost_price,
      total, total_cost
    ) VALUES (
      p_order_id, v_order.account_id, v_variant.id,
      v_variant.product_name, v_variant.variant_name,
      v_quantity, v_unit_price, v_variant.cost_price,
      v_line_total, v_line_cost
    );

    v_subtotal := v_subtotal + v_line_total;
    v_total_cost := v_total_cost + v_line_cost;
  END LOOP;

  -- Update order totals
  UPDATE public.orders
  SET subtotal = v_subtotal,
      total_cost = v_total_cost,
      profit = v_subtotal - v_total_cost,
      total = v_subtotal
  WHERE id = p_order_id;

  RETURN p_order_id;
END;
$$;
