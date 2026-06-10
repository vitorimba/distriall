-- Migration: 00004_rls_policies
-- Story 1.3: RLS for accounts and account_users

-- 1. Enable RLS
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.account_users ENABLE ROW LEVEL SECURITY;

-- 2. Accounts policies
CREATE POLICY "Users can view accounts they belong to"
  ON public.accounts FOR SELECT
  USING (id = ANY(get_user_account_ids()));

-- 3. Account users policies (separate per operation to avoid conflicts)
CREATE POLICY "Users can view memberships of their accounts"
  ON public.account_users FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Admins can insert account memberships"
  ON public.account_users FOR INSERT
  WITH CHECK (get_user_role_in_account(account_id) = 'admin');

CREATE POLICY "Admins can update account memberships"
  ON public.account_users FOR UPDATE
  USING (get_user_role_in_account(account_id) = 'admin');

CREATE POLICY "Admins can delete account memberships"
  ON public.account_users FOR DELETE
  USING (get_user_role_in_account(account_id) = 'admin');

-- 4. Expand users RLS: allow users to see members of their accounts
-- (needed for header to show user names, etc.)
CREATE POLICY "Users can view members of their accounts"
  ON public.users FOR SELECT
  USING (
    id IN (
      SELECT au.user_id FROM public.account_users au
      WHERE au.account_id = ANY(get_user_account_ids())
        AND au.is_active = true
    )
  );
