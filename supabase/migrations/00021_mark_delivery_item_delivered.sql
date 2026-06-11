-- Migration: 00021_mark_delivery_item_delivered
-- Story 4.2: RPC atomica para marcar item como entregue (Tech Debt I01 de Story 4.1)
-- Resolve: dois UPDATEs sequenciais sem transacao em use-driver-deliveries.ts

CREATE OR REPLACE FUNCTION public.mark_delivery_item_delivered(
  p_item_id UUID,
  p_order_id UUID,
  p_observation TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_delivery_id UUID;
  v_driver_id UUID;
  v_delivered_at TIMESTAMPTZ := now();
BEGIN
  -- Fetch delivery_id and verify item exists
  SELECT di.delivery_id, d.driver_id
    INTO v_delivery_id, v_driver_id
    FROM public.delivery_items di
    JOIN public.deliveries d ON d.id = di.delivery_id
   WHERE di.id = p_item_id
     AND di.order_id = p_order_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'delivery_item not found: item_id=%, order_id=%', p_item_id, p_order_id;
  END IF;

  -- Authorization: caller must be driver or admin
  IF v_driver_id <> auth.uid() AND NOT EXISTS (
    SELECT 1 FROM public.deliveries d2
    WHERE d2.id = v_delivery_id
      AND get_user_role_in_account(d2.account_id) = 'admin'
  ) THEN
    RAISE EXCEPTION 'Unauthorized: not the driver or admin for this delivery';
  END IF;

  -- Atomic update: delivery_item
  UPDATE public.delivery_items
     SET status = 'entregue',
         delivered_at = v_delivered_at,
         observation = p_observation
   WHERE id = p_item_id;

  -- Atomic update: order
  UPDATE public.orders
     SET status = 'entregue',
         delivered_at = v_delivered_at
   WHERE id = p_order_id;
END;
$$;

-- Grant execute to authenticated users (RLS inside function handles authorization)
GRANT EXECUTE ON FUNCTION public.mark_delivery_item_delivered(UUID, UUID, TEXT) TO authenticated;
