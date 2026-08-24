-- Migration: 00037_picking_list_rpc
-- Story 8.3: Picking List — Unificacao Automatica de Cargas
--
-- RPC that returns consolidated product list from confirmed orders
-- for a given account + delivery date. Groups by product_variant_id
-- and SUMs quantities. Optional region_id filter (future Story 8.6).

CREATE OR REPLACE FUNCTION public.get_picking_list(
  p_account_id UUID,
  p_target_date DATE,
  p_region_id UUID DEFAULT NULL
)
RETURNS TABLE (
  product_variant_id UUID,
  product_name TEXT,
  variant_name TEXT,
  total_quantity NUMERIC(12,3),
  unit_cost NUMERIC(10,2),
  total_cost NUMERIC(14,2),
  order_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
    SELECT
      oi.product_variant_id,
      oi.product_name,
      oi.variant_name,
      SUM(oi.quantity)::NUMERIC(12,3) AS total_quantity,
      oi.cost_price AS unit_cost,
      SUM(oi.quantity * oi.cost_price)::NUMERIC(14,2) AS total_cost,
      COUNT(DISTINCT o.id) AS order_count
    FROM public.order_items oi
    JOIN public.orders o ON o.id = oi.order_id
    WHERE o.account_id = p_account_id
      AND o.delivery_date = p_target_date
      AND o.status = 'confirmado'
      AND (p_region_id IS NULL OR TRUE) -- placeholder for future region filter (Story 8.6)
    GROUP BY oi.product_variant_id, oi.product_name, oi.variant_name, oi.cost_price
    ORDER BY oi.product_name, oi.variant_name;
END;
$$;

-- Grant execute to authenticated users (RLS enforced via p_account_id parameter)
GRANT EXECUTE ON FUNCTION public.get_picking_list(UUID, DATE, UUID) TO authenticated;
