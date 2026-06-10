-- Migration: 00009_orders
-- Story 2.1: Lancamento e Edicao de Pedidos

-- 1. Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id),
  created_by UUID NOT NULL REFERENCES auth.users(id),
  order_number SERIAL,
  status TEXT NOT NULL DEFAULT 'lancado'
    CHECK (status IN ('lancado', 'confirmado', 'carregado', 'entregue', 'cancelado')),
  payment_method TEXT CHECK (payment_method IN ('dinheiro', 'pix', 'boleto', 'vale', 'cartao', 'misto')),
  subtotal NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
  profit NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(12,2) NOT NULL DEFAULT 0,
  notes TEXT,
  delivery_date DATE,
  delivered_at TIMESTAMPTZ,
  confirmed_at TIMESTAMPTZ,
  loaded_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_account ON public.orders(account_id);
CREATE INDEX idx_orders_client ON public.orders(client_id);
CREATE INDEX idx_orders_status ON public.orders(account_id, status);
CREATE INDEX idx_orders_delivery_date ON public.orders(account_id, delivery_date);

-- 2. Order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  product_variant_id UUID NOT NULL REFERENCES public.product_variants(id),
  product_name TEXT NOT NULL,
  variant_name TEXT NOT NULL,
  quantity NUMERIC(10,3) NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  cost_price NUMERIC(10,2) NOT NULL,
  total NUMERIC(12,2) NOT NULL,
  total_cost NUMERIC(12,2) NOT NULL,
  is_returned BOOLEAN NOT NULL DEFAULT false,
  returned_quantity NUMERIC(10,3) DEFAULT 0,
  return_reason TEXT,
  returned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_order_items_account ON public.order_items(account_id);

-- 3. Updated_at trigger for orders
CREATE TRIGGER on_orders_updated
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
