-- Migration: 00014_payments
-- Story 3.1: Formas de Pagamento no Pedido

-- 1. Payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  method TEXT NOT NULL CHECK (method IN ('dinheiro', 'pix', 'boleto', 'vale', 'cartao')),
  amount NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'confirmado', 'cancelado')),
  is_third_party BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_account ON public.payments(account_id);
CREATE INDEX idx_payments_order ON public.payments(order_id);
CREATE INDEX idx_payments_method ON public.payments(account_id, method);
CREATE INDEX idx_payments_status ON public.payments(status);

-- 2. Updated_at trigger
CREATE TRIGGER on_payments_updated
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 3. RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own account payments"
  ON public.payments FOR SELECT
  USING (account_id = ANY(get_user_account_ids()));

CREATE POLICY "Users can create payments in own accounts"
  ON public.payments FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) IN ('admin', 'vendedor')
  );

CREATE POLICY "Users can update payments in own accounts"
  ON public.payments FOR UPDATE
  USING (account_id = ANY(get_user_account_ids()))
  WITH CHECK (get_user_role_in_account(account_id) IN ('admin', 'vendedor'));

CREATE POLICY "Admins can delete payments"
  ON public.payments FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );
