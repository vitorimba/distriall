-- Migration: 00026_order_address_snapshot
-- Epic 7 Story 7.7: Update create_order/update_order to capture address snapshots

-- 1. Update create_order — add p_delivery_address_id parameter
CREATE OR REPLACE FUNCTION public.create_order(
  p_account_id UUID,
  p_client_id UUID,
  p_items JSONB,
  p_payment_method TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL,
  p_delivery_date DATE DEFAULT NULL,
  p_delivery_address_id UUID DEFAULT NULL
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
  v_account_price NUMERIC(10,2);
  v_unit_price NUMERIC(10,2);
  v_line_total NUMERIC(12,2);
  v_line_cost NUMERIC(12,2);
  v_subtotal NUMERIC(12,2) := 0;
  v_total_cost NUMERIC(12,2) := 0;
  v_quantity NUMERIC(10,3);
  v_delivery_snapshot JSONB;
  v_fiscal_snapshot JSONB;
BEGIN
  -- Create the order
  INSERT INTO public.orders (
    account_id, client_id, created_by,
    payment_method, notes, delivery_date,
    delivery_address_id
  ) VALUES (
    p_account_id, p_client_id, auth.uid(),
    p_payment_method, p_notes, p_delivery_date,
    p_delivery_address_id
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

    -- Check for client-specific custom price (highest priority)
    SELECT cp.custom_price INTO v_custom_price
    FROM public.client_prices cp
    WHERE cp.client_id = p_client_id
      AND cp.product_variant_id = v_variant.id;

    -- Check for account-specific price (second priority)
    SELECT ap.sell_price INTO v_account_price
    FROM public.account_prices ap
    WHERE ap.account_id = p_account_id
      AND ap.product_variant_id = v_variant.id;

    -- Price resolution: client > account > global
    v_unit_price := COALESCE(v_custom_price, v_account_price, v_variant.sell_price);
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

  -- Capture address snapshots
  IF p_delivery_address_id IS NOT NULL THEN
    SELECT jsonb_build_object(
      'address_id', ca.id, 'label', ca.label,
      'street', ca.street, 'number', ca.number,
      'complement', ca.complement, 'neighborhood', ca.neighborhood,
      'city', ca.city, 'state', ca.state, 'cep', ca.cep
    ) INTO v_delivery_snapshot
    FROM public.client_addresses ca WHERE ca.id = p_delivery_address_id;

    -- Fiscal = explicit fiscal address or fallback to delivery
    SELECT jsonb_build_object(
      'address_id', ca.id, 'label', ca.label,
      'street', ca.street, 'number', ca.number,
      'complement', ca.complement, 'neighborhood', ca.neighborhood,
      'city', ca.city, 'state', ca.state, 'cep', ca.cep
    ) INTO v_fiscal_snapshot
    FROM public.client_addresses ca
    WHERE ca.client_id = p_client_id AND ca.is_active = true AND ca.is_fiscal = true
    LIMIT 1;

    IF v_fiscal_snapshot IS NULL THEN
      v_fiscal_snapshot := v_delivery_snapshot;
    END IF;

    UPDATE public.orders
    SET delivery_address_snapshot = v_delivery_snapshot,
        fiscal_address_snapshot = v_fiscal_snapshot
    WHERE id = v_order_id;
  END IF;

  RETURN v_order_id;
END;
$$;

-- 2. Update update_order — add p_delivery_address_id parameter
CREATE OR REPLACE FUNCTION public.update_order(
  p_order_id UUID,
  p_client_id UUID,
  p_items JSONB,
  p_payment_method TEXT DEFAULT NULL,
  p_notes TEXT DEFAULT NULL,
  p_delivery_date DATE DEFAULT NULL,
  p_delivery_address_id UUID DEFAULT NULL
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
  v_account_price NUMERIC(10,2);
  v_unit_price NUMERIC(10,2);
  v_line_total NUMERIC(12,2);
  v_line_cost NUMERIC(12,2);
  v_subtotal NUMERIC(12,2) := 0;
  v_total_cost NUMERIC(12,2) := 0;
  v_quantity NUMERIC(10,3);
  v_delivery_snapshot JSONB;
  v_fiscal_snapshot JSONB;
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
      delivery_date = p_delivery_date,
      delivery_address_id = p_delivery_address_id
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

    SELECT ap.sell_price INTO v_account_price
    FROM public.account_prices ap
    WHERE ap.account_id = v_order.account_id
      AND ap.product_variant_id = v_variant.id;

    v_unit_price := COALESCE(v_custom_price, v_account_price, v_variant.sell_price);
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

  -- Capture address snapshots
  IF p_delivery_address_id IS NOT NULL THEN
    SELECT jsonb_build_object(
      'address_id', ca.id, 'label', ca.label,
      'street', ca.street, 'number', ca.number,
      'complement', ca.complement, 'neighborhood', ca.neighborhood,
      'city', ca.city, 'state', ca.state, 'cep', ca.cep
    ) INTO v_delivery_snapshot
    FROM public.client_addresses ca WHERE ca.id = p_delivery_address_id;

    SELECT jsonb_build_object(
      'address_id', ca.id, 'label', ca.label,
      'street', ca.street, 'number', ca.number,
      'complement', ca.complement, 'neighborhood', ca.neighborhood,
      'city', ca.city, 'state', ca.state, 'cep', ca.cep
    ) INTO v_fiscal_snapshot
    FROM public.client_addresses ca
    WHERE ca.client_id = p_client_id AND ca.is_active = true AND ca.is_fiscal = true
    LIMIT 1;

    IF v_fiscal_snapshot IS NULL THEN
      v_fiscal_snapshot := v_delivery_snapshot;
    END IF;

    UPDATE public.orders
    SET delivery_address_snapshot = v_delivery_snapshot,
        fiscal_address_snapshot = v_fiscal_snapshot
    WHERE id = p_order_id;
  ELSE
    -- Clear snapshots if no address selected
    UPDATE public.orders
    SET delivery_address_snapshot = NULL,
        fiscal_address_snapshot = NULL
    WHERE id = p_order_id;
  END IF;

  RETURN p_order_id;
END;
$$;
