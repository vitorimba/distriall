-- Migration: 00015_vouchers
-- Story 3.2: Controle de Vales e Fiado

-- 1. Vouchers table
CREATE TABLE public.vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  payment_id UUID NOT NULL REFERENCES public.payments(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id),
  amount NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'pago', 'vencido', 'cancelado')),
  photo_url TEXT,
  due_date DATE,
  paid_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_vouchers_account ON public.vouchers(account_id);
CREATE INDEX idx_vouchers_client ON public.vouchers(client_id);
CREATE INDEX idx_vouchers_status ON public.vouchers(account_id, status);
CREATE INDEX idx_vouchers_payment ON public.vouchers(payment_id);

-- 2. Updated_at trigger
CREATE TRIGGER on_vouchers_updated
  BEFORE UPDATE ON public.vouchers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 3. RLS
ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own account vouchers"
  ON public.vouchers FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Users can create vouchers in own accounts"
  ON public.vouchers FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) IN ('admin', 'vendedor')
  );

CREATE POLICY "Users can update vouchers in own accounts"
  ON public.vouchers FOR UPDATE
  USING (account_id = ANY(get_user_account_ids()))
  WITH CHECK (get_user_role_in_account(account_id) IN ('admin', 'vendedor'));

CREATE POLICY "Admins can delete vouchers"
  ON public.vouchers FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );

-- 4. Storage bucket (must be created via Supabase Dashboard or CLI)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('voucher-photos', 'voucher-photos', false);

-- 5. Storage RLS policies
-- These must be applied after bucket creation:
-- CREATE POLICY "Account members can view voucher photos"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'voucher-photos' AND (storage.foldername(name))[1]::uuid = ANY(get_user_account_ids()));
-- CREATE POLICY "Account members can upload voucher photos"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'voucher-photos' AND (storage.foldername(name))[1]::uuid = ANY(get_user_account_ids()));
