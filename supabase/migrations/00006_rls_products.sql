-- Migration: 00006_rls_products
-- Story 1.4: RLS for products and product_variants

-- 1. Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- 2. Products policies
CREATE POLICY "Users can view own account products"
  ON public.products FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Users can create products in own accounts"
  ON public.products FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) IN ('admin', 'vendedor')
  );

CREATE POLICY "Users can update products in own accounts"
  ON public.products FOR UPDATE
  USING (account_id = ANY(get_user_account_ids()))
  WITH CHECK (get_user_role_in_account(account_id) IN ('admin', 'vendedor'));

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );

-- 3. Product variants policies (same pattern)
CREATE POLICY "Users can view own account product variants"
  ON public.product_variants FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Users can create product variants in own accounts"
  ON public.product_variants FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) IN ('admin', 'vendedor')
  );

CREATE POLICY "Users can update product variants in own accounts"
  ON public.product_variants FOR UPDATE
  USING (account_id = ANY(get_user_account_ids()))
  WITH CHECK (get_user_role_in_account(account_id) IN ('admin', 'vendedor'));

CREATE POLICY "Admins can delete product variants"
  ON public.product_variants FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );
