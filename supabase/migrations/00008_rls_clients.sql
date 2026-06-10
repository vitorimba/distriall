-- Migration: 00008_rls_clients
-- Story 1.5: RLS for clients and client_prices

-- 1. Enable RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_prices ENABLE ROW LEVEL SECURITY;

-- 2. Clients policies
CREATE POLICY "Users can view own account clients"
  ON public.clients FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Users can create clients in own accounts"
  ON public.clients FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) IN ('admin', 'vendedor')
  );

CREATE POLICY "Users can update clients in own accounts"
  ON public.clients FOR UPDATE
  USING (account_id = ANY(get_user_account_ids()))
  WITH CHECK (get_user_role_in_account(account_id) IN ('admin', 'vendedor'));

CREATE POLICY "Admins can delete clients"
  ON public.clients FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );

-- 3. Client prices policies (same pattern)
CREATE POLICY "Users can view own account client prices"
  ON public.client_prices FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Users can create client prices in own accounts"
  ON public.client_prices FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) IN ('admin', 'vendedor')
  );

CREATE POLICY "Users can update client prices in own accounts"
  ON public.client_prices FOR UPDATE
  USING (account_id = ANY(get_user_account_ids()))
  WITH CHECK (get_user_role_in_account(account_id) IN ('admin', 'vendedor'));

CREATE POLICY "Admins can delete client prices"
  ON public.client_prices FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );
