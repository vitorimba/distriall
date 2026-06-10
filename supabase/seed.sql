-- Seed: Story 1.2 - Initial users
-- Note: In Supabase local dev, auth.users can be seeded directly.
-- In production, use Supabase Dashboard or Auth Admin API.
-- The trigger `on_auth_user_created` auto-creates public.users entries.

-- Create users in auth.users (local dev only - uses supabase_auth_admin role)
-- Passwords: distriall123 for all users

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
  'authenticated',
  'authenticated',
  now(),
  now()
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
  'authenticated',
  'authenticated',
  now(),
  now()
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
  'authenticated',
  'authenticated',
  now(),
  now()
);

-- Note: The trigger on_auth_user_created will auto-insert into public.users
-- with the name and role from raw_user_meta_data
