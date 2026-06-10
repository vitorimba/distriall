-- Migration: 00012_order_status_transition
-- Story 2.2: Status transition functions

-- 1. Single order status transition
CREATE OR REPLACE FUNCTION public.transition_order_status(
  p_order_id UUID,
  p_new_status TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_status TEXT;
  v_valid_transitions JSONB := '{
    "lancado": ["confirmado", "cancelado"],
    "confirmado": ["lancado", "carregado", "cancelado"],
    "carregado": ["confirmado", "entregue", "cancelado"],
    "entregue": ["carregado"],
    "cancelado": []
  }'::JSONB;
BEGIN
  SELECT status INTO v_current_status FROM public.orders WHERE id = p_order_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order % not found', p_order_id;
  END IF;

  IF NOT (v_valid_transitions->v_current_status) ? p_new_status THEN
    RAISE EXCEPTION 'Invalid transition from % to %', v_current_status, p_new_status;
  END IF;

  UPDATE public.orders SET
    status = p_new_status,
    confirmed_at = CASE
      WHEN p_new_status = 'confirmado' THEN now()
      WHEN p_new_status = 'lancado' THEN NULL
      ELSE confirmed_at
    END,
    loaded_at = CASE
      WHEN p_new_status = 'carregado' THEN now()
      WHEN p_new_status IN ('lancado', 'confirmado') THEN NULL
      ELSE loaded_at
    END,
    delivered_at = CASE
      WHEN p_new_status = 'entregue' THEN now()
      WHEN p_new_status IN ('lancado', 'confirmado', 'carregado') THEN NULL
      ELSE delivered_at
    END,
    cancelled_at = CASE
      WHEN p_new_status = 'cancelado' THEN now()
      ELSE cancelled_at
    END,
    updated_at = now()
  WHERE id = p_order_id;
END;
$$;

-- 2. Batch status transition
CREATE OR REPLACE FUNCTION public.batch_transition_status(
  p_order_ids UUID[],
  p_new_status TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
  v_results JSONB := '[]'::JSONB;
  v_success BOOLEAN;
  v_error TEXT;
BEGIN
  FOREACH v_id IN ARRAY p_order_ids
  LOOP
    BEGIN
      PERFORM public.transition_order_status(v_id, p_new_status);
      v_results := v_results || jsonb_build_object('id', v_id, 'success', true);
    EXCEPTION WHEN OTHERS THEN
      v_error := SQLERRM;
      v_results := v_results || jsonb_build_object('id', v_id, 'success', false, 'error', v_error);
    END;
  END LOOP;

  RETURN v_results;
END;
$$;
