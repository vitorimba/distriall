-- Migration: 00010_rls_orders
-- Story 2.1: RLS for orders and order_items

-- 1. Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 2. Orders policies
CREATE POLICY "Users can view own account orders"
  ON public.orders FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Users can create orders in own accounts"
  ON public.orders FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) IN ('admin', 'vendedor')
  );

CREATE POLICY "Users can update orders in own accounts"
  ON public.orders FOR UPDATE
  USING (account_id = ANY(get_user_account_ids()))
  WITH CHECK (get_user_role_in_account(account_id) IN ('admin', 'vendedor'));

CREATE POLICY "Admins can delete orders"
  ON public.orders FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );

-- 3. Order items policies (same pattern)
CREATE POLICY "Users can view own account order items"
  ON public.order_items FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Users can create order items in own accounts"
  ON public.order_items FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) IN ('admin', 'vendedor')
  );

CREATE POLICY "Users can update order items in own accounts"
  ON public.order_items FOR UPDATE
  USING (account_id = ANY(get_user_account_ids()))
  WITH CHECK (get_user_role_in_account(account_id) IN ('admin', 'vendedor'));

CREATE POLICY "Admins can delete order items"
  ON public.order_items FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );
