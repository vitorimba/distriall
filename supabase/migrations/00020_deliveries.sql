-- Migration: 00020_deliveries
-- Story 4.1: Tela do Entregador — tabelas deliveries e delivery_items

-- 1. Deliveries table (rota do dia)
CREATE TABLE public.deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  driver_id UUID NOT NULL REFERENCES public.users(id),
  delivery_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'em_rota', 'concluida')),
  notes TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_deliveries_account ON public.deliveries(account_id);
CREATE INDEX idx_deliveries_driver ON public.deliveries(driver_id);
CREATE INDEX idx_deliveries_date ON public.deliveries(delivery_date);
CREATE INDEX idx_deliveries_driver_date ON public.deliveries(driver_id, delivery_date);

-- Updated_at trigger
CREATE TRIGGER on_deliveries_updated
  BEFORE UPDATE ON public.deliveries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 2. Delivery items table (pedidos na rota)
CREATE TABLE public.delivery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id UUID NOT NULL REFERENCES public.deliveries(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES public.orders(id),
  sequence INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'entregue', 'nao_entregue')),
  observation TEXT,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(delivery_id, order_id)
);

CREATE INDEX idx_delivery_items_delivery ON public.delivery_items(delivery_id);
CREATE INDEX idx_delivery_items_order ON public.delivery_items(order_id);
CREATE INDEX idx_delivery_items_sequence ON public.delivery_items(delivery_id, sequence);
CREATE INDEX idx_delivery_items_status ON public.delivery_items(delivery_id, status);

-- 3. RLS for deliveries
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;

-- Admins/vendedores veem todas as deliveries da conta; entregador vê apenas as suas
CREATE POLICY "Drivers can only view their own deliveries"
  ON public.deliveries FOR SELECT
  USING (
    (get_user_role_in_account(account_id) IN ('admin', 'vendedor'))
    OR
    (driver_id = auth.uid())
  );

CREATE POLICY "Admins can create deliveries"
  ON public.deliveries FOR INSERT
  WITH CHECK (
    get_user_role_in_account(account_id) = 'admin'
  );

-- Entregador pode atualizar status das suas deliveries; admin pode atualizar qualquer uma
CREATE POLICY "Drivers can update their own deliveries"
  ON public.deliveries FOR UPDATE
  USING (driver_id = auth.uid() OR get_user_role_in_account(account_id) = 'admin');

CREATE POLICY "Admins can delete deliveries"
  ON public.deliveries FOR DELETE
  USING (
    get_user_role_in_account(account_id) = 'admin'
  );

-- 4. RLS for delivery_items
ALTER TABLE public.delivery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Delivery items visible to driver and admins"
  ON public.delivery_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.deliveries d
      WHERE d.id = delivery_id
        AND (
          d.driver_id = auth.uid()
          OR get_user_role_in_account(d.account_id) IN ('admin', 'vendedor')
        )
    )
  );

CREATE POLICY "Admins can insert delivery items"
  ON public.delivery_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.deliveries d
      WHERE d.id = delivery_id
        AND get_user_role_in_account(d.account_id) = 'admin'
    )
  );

-- Entregador pode atualizar delivery_items das suas rotas
CREATE POLICY "Drivers can update their delivery items"
  ON public.delivery_items FOR UPDATE
  USING (
    delivery_id IN (
      SELECT id FROM public.deliveries WHERE driver_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.deliveries d
      WHERE d.id = delivery_id
        AND get_user_role_in_account(d.account_id) = 'admin'
    )
  );

CREATE POLICY "Admins can delete delivery items"
  ON public.delivery_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.deliveries d
      WHERE d.id = delivery_id
        AND get_user_role_in_account(d.account_id) = 'admin'
    )
  );
