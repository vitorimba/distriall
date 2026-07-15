-- Migration: 00025_client_addresses
-- Epic 7 Story 7.1: Client PF/PJ fields + client_addresses table + order address snapshots

-- ============================================================
-- 1. ALTER clients — add PF/PJ fields
-- ============================================================

ALTER TABLE public.clients ADD COLUMN type TEXT CHECK (type IN ('pf', 'pj')) DEFAULT 'pf';
ALTER TABLE public.clients ADD COLUMN document TEXT;
ALTER TABLE public.clients ADD COLUMN state_registration TEXT;
ALTER TABLE public.clients ADD COLUMN email TEXT;

-- ============================================================
-- 2. CREATE client_addresses table
-- ============================================================

CREATE TABLE public.client_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  label TEXT NOT NULL DEFAULT 'Principal',
  cep TEXT,
  street TEXT,
  number TEXT,
  complement TEXT,
  neighborhood TEXT,
  city TEXT,
  state TEXT,
  is_fiscal BOOLEAN DEFAULT false,
  is_default_delivery BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- 3. Indexes
-- ============================================================

CREATE INDEX idx_client_addresses_client ON public.client_addresses(client_id);
CREATE INDEX idx_client_addresses_account ON public.client_addresses(account_id);

-- Partial unique indexes: max 1 fiscal and max 1 default delivery per client (among active addresses)
CREATE UNIQUE INDEX idx_client_addresses_fiscal
  ON public.client_addresses (client_id)
  WHERE is_fiscal = true AND is_active = true;

CREATE UNIQUE INDEX idx_client_addresses_delivery
  ON public.client_addresses (client_id)
  WHERE is_default_delivery = true AND is_active = true;

-- ============================================================
-- 4. Trigger updated_at
-- ============================================================

CREATE TRIGGER on_client_addresses_updated
  BEFORE UPDATE ON public.client_addresses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- 5. RLS (same pattern as clients: SELECT=all members, INSERT/UPDATE=admin+vendedor, DELETE=admin)
-- ============================================================

ALTER TABLE public.client_addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own account client addresses"
  ON public.client_addresses FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Users can create client addresses in own accounts"
  ON public.client_addresses FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) IN ('admin', 'vendedor')
  );

CREATE POLICY "Users can update client addresses in own accounts"
  ON public.client_addresses FOR UPDATE
  USING (account_id = ANY(get_user_account_ids()))
  WITH CHECK (get_user_role_in_account(account_id) IN ('admin', 'vendedor'));

CREATE POLICY "Admins can delete client addresses"
  ON public.client_addresses FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );

-- ============================================================
-- 6. ALTER orders — add address snapshot fields
-- ============================================================

ALTER TABLE public.orders ADD COLUMN delivery_address_id UUID REFERENCES public.client_addresses(id);
ALTER TABLE public.orders ADD COLUMN delivery_address_snapshot JSONB;
ALTER TABLE public.orders ADD COLUMN fiscal_address_snapshot JSONB;

-- ============================================================
-- 7. Migrate existing client addresses to client_addresses table
-- (Story 7.2 — included here to run in single migration)
-- ============================================================

INSERT INTO public.client_addresses (client_id, account_id, label, street, neighborhood, city, is_default_delivery)
SELECT c.id, c.account_id, 'Principal', c.address, c.neighborhood, c.city, true
FROM public.clients c
WHERE c.address IS NOT NULL OR c.city IS NOT NULL OR c.neighborhood IS NOT NULL;
