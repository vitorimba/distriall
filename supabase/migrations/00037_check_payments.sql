-- Migration: 00037_check_payments
-- Story 8.1: Forma de Pagamento Cheque

-- 1. Add 'cheque' to orders.payment_method CHECK constraint
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_payment_method_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_payment_method_check
  CHECK (payment_method IN ('dinheiro', 'pix', 'boleto', 'vale', 'cartao', 'misto', 'cheque'));

-- 2. Add 'cheque' to payments.method CHECK constraint
ALTER TABLE public.payments DROP CONSTRAINT IF EXISTS payments_method_check;
ALTER TABLE public.payments ADD CONSTRAINT payments_method_check
  CHECK (method IN ('dinheiro', 'pix', 'boleto', 'vale', 'cartao', 'cheque'));

-- 3. Check payments table
CREATE TABLE public.check_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  payment_id UUID NOT NULL REFERENCES public.payments(id) ON DELETE CASCADE,
  check_number TEXT NOT NULL,
  bank TEXT NOT NULL,
  compensation_date DATE,
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'compensado', 'devolvido')),
  compensated_at TIMESTAMPTZ,
  returned_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_check_payments_account ON public.check_payments(account_id);
CREATE INDEX idx_check_payments_payment ON public.check_payments(payment_id);
CREATE INDEX idx_check_payments_status ON public.check_payments(account_id, status);

-- 4. Updated_at trigger
CREATE TRIGGER on_check_payments_updated
  BEFORE UPDATE ON public.check_payments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 5. Check-voucher links table
CREATE TABLE public.check_voucher_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  check_payment_id UUID NOT NULL REFERENCES public.check_payments(id) ON DELETE CASCADE,
  voucher_id UUID NOT NULL REFERENCES public.vouchers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (check_payment_id, voucher_id)
);

CREATE INDEX idx_check_voucher_links_check ON public.check_voucher_links(check_payment_id);
CREATE INDEX idx_check_voucher_links_voucher ON public.check_voucher_links(voucher_id);

-- 6. RLS for check_payments
ALTER TABLE public.check_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own account check payments"
  ON public.check_payments FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Users can create check payments in own accounts"
  ON public.check_payments FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) IN ('admin', 'vendedor')
  );

CREATE POLICY "Users can update check payments in own accounts"
  ON public.check_payments FOR UPDATE
  USING (account_id = ANY(get_user_account_ids()))
  WITH CHECK (get_user_role_in_account(account_id) IN ('admin', 'vendedor'));

CREATE POLICY "Admins can delete check payments"
  ON public.check_payments FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );

-- 7. RLS for check_voucher_links
ALTER TABLE public.check_voucher_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view check voucher links via check_payments"
  ON public.check_voucher_links FOR SELECT
  USING (
    check_payment_id IN (
      SELECT id FROM public.check_payments
      WHERE account_id = ANY(get_user_account_ids())
    )
  );

CREATE POLICY "Users can create check voucher links via check_payments"
  ON public.check_voucher_links FOR INSERT
  WITH CHECK (
    check_payment_id IN (
      SELECT id FROM public.check_payments
      WHERE account_id = ANY(get_user_account_ids())
        AND get_user_role_in_account(account_id) IN ('admin', 'vendedor')
    )
  );

CREATE POLICY "Users can delete check voucher links via check_payments"
  ON public.check_voucher_links FOR DELETE
  USING (
    check_payment_id IN (
      SELECT id FROM public.check_payments
      WHERE account_id = ANY(get_user_account_ids())
        AND get_user_role_in_account(account_id) = 'admin'
    )
  );
