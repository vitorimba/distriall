-- Migration: 00003_rls_functions
-- Story 1.3: Helper functions for multi-tenant RLS

-- Returns all account IDs the authenticated user has access to
CREATE OR REPLACE FUNCTION public.get_user_account_ids()
RETURNS UUID[] AS $$
  SELECT ARRAY(
    SELECT account_id
    FROM public.account_users
    WHERE user_id = auth.uid()
      AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Returns the role of the current user in a specific account
CREATE OR REPLACE FUNCTION public.get_user_role_in_account(p_account_id UUID)
RETURNS TEXT AS $$
  SELECT role
  FROM public.account_users
  WHERE user_id = auth.uid()
    AND account_id = p_account_id
    AND is_active = true
  LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if user has financial visibility in an account
CREATE OR REPLACE FUNCTION public.can_view_financial(p_account_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS(
    SELECT 1
    FROM public.account_users
    WHERE user_id = auth.uid()
      AND account_id = p_account_id
      AND is_active = true
      AND (role = 'admin' OR can_view_financial = true)
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;
