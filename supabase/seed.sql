-- Seed: Story 1.2 + 1.3 - Users, Accounts, Permissions
-- For Supabase local dev. Production: use Dashboard or Auth Admin API.
-- Passwords: distriall123 for all users

-- ============================================================
-- 1. AUTH USERS (local dev only)
-- ============================================================

-- Tiago (admin)
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, role, aud, created_at, updated_at
) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '00000000-0000-0000-0000-000000000000',
  'tiago@distriall.com',
  crypt('distriall123', gen_salt('bf')),
  now(),
  '{"name": "Tiago", "role": "admin"}'::jsonb,
  'authenticated', 'authenticated', now(), now()
);

-- Diego (vendedor)
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, role, aud, created_at, updated_at
) VALUES (
  'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  '00000000-0000-0000-0000-000000000000',
  'diego@distriall.com',
  crypt('distriall123', gen_salt('bf')),
  now(),
  '{"name": "Diego", "role": "vendedor"}'::jsonb,
  'authenticated', 'authenticated', now(), now()
);

-- Joao (entregador)
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, role, aud, created_at, updated_at
) VALUES (
  'c3d4e5f6-a7b8-9012-cdef-123456789012',
  '00000000-0000-0000-0000-000000000000',
  'joao@distriall.com',
  crypt('distriall123', gen_salt('bf')),
  now(),
  '{"name": "Joao", "role": "entregador"}'::jsonb,
  'authenticated', 'authenticated', now(), now()
);

-- Note: Trigger on_auth_user_created auto-inserts into public.users

-- ============================================================
-- 2. ACCOUNTS (Story 1.3)
-- ============================================================

INSERT INTO public.accounts (id, name, slug, owner_id) VALUES
  ('aaaaaaaa-0001-0001-0001-000000000001', 'Distrial Rio Preto', 'distrial-rp', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
  ('aaaaaaaa-0001-0001-0001-000000000002', 'Tiago', 'tiago', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'),
  ('aaaaaaaa-0001-0001-0001-000000000003', 'Distrial Votoporanga', 'distrial-votoporanga', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890');

-- ============================================================
-- 3. ACCOUNT USERS / PERMISSIONS (Story 1.3)
-- ============================================================

-- Tiago: admin in all 3 accounts
INSERT INTO public.account_users (account_id, user_id, role, can_view_financial) VALUES
  ('aaaaaaaa-0001-0001-0001-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin', true),
  ('aaaaaaaa-0001-0001-0001-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin', true),
  ('aaaaaaaa-0001-0001-0001-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin', true);

-- Diego: vendedor in RP (financial=true) + Votoporanga (financial=false)
-- NO access to "Tiago" account (no row = zero access)
INSERT INTO public.account_users (account_id, user_id, role, can_view_financial) VALUES
  ('aaaaaaaa-0001-0001-0001-000000000001', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'vendedor', true),
  ('aaaaaaaa-0001-0001-0001-000000000003', 'b2c3d4e5-f6a7-8901-bcde-f12345678901', 'vendedor', false);

-- Joao: entregador in RP only
INSERT INTO public.account_users (account_id, user_id, role, can_view_financial) VALUES
  ('aaaaaaaa-0001-0001-0001-000000000001', 'c3d4e5f6-a7b8-9012-cdef-123456789012', 'entregador', false);
