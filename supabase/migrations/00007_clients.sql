-- Migration: 00007_clients
-- Story 1.5: Cadastro de Clientes com Preco Diferenciado

-- 1. Clients table
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  trade_name TEXT,
  address TEXT,
  city TEXT,
  neighborhood TEXT,
  phone TEXT,
  whatsapp TEXT,
  default_payment_method TEXT CHECK (default_payment_method IN ('dinheiro', 'pix', 'boleto', 'vale', 'cartao')),
  notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_clients_account ON public.clients(account_id);
CREATE INDEX idx_clients_name ON public.clients(account_id, name);

-- 2. Client prices table (overrides de preco por cliente)
CREATE TABLE public.client_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  product_variant_id UUID NOT NULL REFERENCES public.product_variants(id) ON DELETE CASCADE,
  custom_price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(client_id, product_variant_id)
);

CREATE INDEX idx_client_prices_client ON public.client_prices(client_id);
CREATE INDEX idx_client_prices_account ON public.client_prices(account_id);

-- 3. Updated_at triggers
CREATE TRIGGER on_clients_updated
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_client_prices_updated
  BEFORE UPDATE ON public.client_prices
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
