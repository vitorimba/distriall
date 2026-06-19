-- Migration: 00023_shared_product_catalog
-- Catalogo de produtos compartilhado entre todas as unidades (Votu, RP, Boa Mesa)
-- Produtos e variantes deixam de ser isolados por account_id e passam a ser globais

-- ============================================================================
-- PHASE 1: Limpar dados de teste (pedidos, pagamentos, entregas, acertos)
-- ============================================================================

-- Ordem de limpeza respeitando FKs (dependentes primeiro)
DELETE FROM public.delivery_items;
DELETE FROM public.deliveries;
DELETE FROM public.settlement_orders;
DELETE FROM public.settlements;
DELETE FROM public.payments;
DELETE FROM public.order_items;
DELETE FROM public.orders;

-- Limpar tambem precos especiais de clientes (serao remapeados para novos variant IDs)
DELETE FROM public.client_prices;

-- ============================================================================
-- PHASE 2: Consolidar produtos — manter apenas os da conta "Distriall Votu"
-- ============================================================================

-- Deletar product_variants de contas que NAO sao Votu
DELETE FROM public.product_variants
WHERE account_id NOT IN (
  SELECT id FROM public.accounts WHERE name = 'Distriall Votu'
);

-- Deletar products de contas que NAO sao Votu
DELETE FROM public.products
WHERE account_id NOT IN (
  SELECT id FROM public.accounts WHERE name = 'Distriall Votu'
);

-- ============================================================================
-- PHASE 3: Remover account_id de products e product_variants
-- ============================================================================

-- Drop RLS policies que referenciam account_id
DROP POLICY IF EXISTS "Users can view own account products" ON public.products;
DROP POLICY IF EXISTS "Users can create products in own accounts" ON public.products;
DROP POLICY IF EXISTS "Users can update products in own accounts" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;

DROP POLICY IF EXISTS "Users can view own account product variants" ON public.product_variants;
DROP POLICY IF EXISTS "Users can create product variants in own accounts" ON public.product_variants;
DROP POLICY IF EXISTS "Users can update product variants in own accounts" ON public.product_variants;
DROP POLICY IF EXISTS "Admins can delete product variants" ON public.product_variants;

-- Drop indexes que usam account_id
DROP INDEX IF EXISTS idx_products_account;
DROP INDEX IF EXISTS idx_products_name;
DROP INDEX IF EXISTS idx_product_variants_account;

-- Remover coluna account_id
ALTER TABLE public.product_variants DROP COLUMN account_id;
ALTER TABLE public.products DROP COLUMN account_id;

-- Criar novo index para nome (sem account_id)
CREATE INDEX idx_products_name ON public.products(name);

-- ============================================================================
-- PHASE 4: Novas RLS policies — produtos visiveis para todos autenticados,
--          edicao por admin/vendedor de qualquer conta
-- ============================================================================

-- Products: qualquer usuario autenticado pode ver
CREATE POLICY "Authenticated users can view products"
  ON public.products FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Products: admin ou vendedor de qualquer conta pode criar
CREATE POLICY "Admin or vendor can create products"
  ON public.products FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.account_users
      WHERE user_id = auth.uid()
        AND is_active = true
        AND role IN ('admin', 'vendedor')
    )
  );

-- Products: admin ou vendedor pode editar
CREATE POLICY "Admin or vendor can update products"
  ON public.products FOR UPDATE
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.account_users
      WHERE user_id = auth.uid()
        AND is_active = true
        AND role IN ('admin', 'vendedor')
    )
  );

-- Products: admin pode deletar
CREATE POLICY "Admin can delete products"
  ON public.products FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.account_users
      WHERE user_id = auth.uid()
        AND is_active = true
        AND role = 'admin'
    )
  );

-- Product variants: mesmas regras
CREATE POLICY "Authenticated users can view product variants"
  ON public.product_variants FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin or vendor can create product variants"
  ON public.product_variants FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.account_users
      WHERE user_id = auth.uid()
        AND is_active = true
        AND role IN ('admin', 'vendedor')
    )
  );

CREATE POLICY "Admin or vendor can update product variants"
  ON public.product_variants FOR UPDATE
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.account_users
      WHERE user_id = auth.uid()
        AND is_active = true
        AND role IN ('admin', 'vendedor')
    )
  );

CREATE POLICY "Admin can delete product variants"
  ON public.product_variants FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.account_users
      WHERE user_id = auth.uid()
        AND is_active = true
        AND role = 'admin'
    )
  );
