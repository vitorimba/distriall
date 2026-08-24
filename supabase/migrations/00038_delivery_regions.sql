-- Migration: 00038_delivery_regions
-- Story 8.6: Regioes de Entrega

-- 1. Delivery regions table
CREATE TABLE public.delivery_regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  cities TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(account_id, name)
);

CREATE INDEX idx_delivery_regions_account ON public.delivery_regions(account_id);

-- Updated_at trigger
CREATE TRIGGER on_delivery_regions_updated
  BEFORE UPDATE ON public.delivery_regions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 2. Add region_id FK to clients
ALTER TABLE public.clients ADD COLUMN region_id UUID REFERENCES public.delivery_regions(id) ON DELETE SET NULL;

CREATE INDEX idx_clients_region ON public.clients(region_id);

-- 3. RLS for delivery_regions
ALTER TABLE public.delivery_regions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view regions of their accounts"
  ON public.delivery_regions FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Admins can create regions"
  ON public.delivery_regions FOR INSERT
  WITH CHECK (get_user_role_in_account(account_id) = 'admin');

CREATE POLICY "Admins can update regions"
  ON public.delivery_regions FOR UPDATE
  USING (get_user_role_in_account(account_id) = 'admin');

CREATE POLICY "Admins can delete regions"
  ON public.delivery_regions FOR DELETE
  USING (get_user_role_in_account(account_id) = 'admin');
