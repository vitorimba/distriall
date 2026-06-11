-- Migration: 00016_expenses
-- Story 3.3: Registro de Gastos por Conta

-- 1. Expenses table
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('fixo', 'variavel')),
  type TEXT, -- 'impostos', 'gasolina', 'manutencao', 'outros'
  recurrence TEXT CHECK (recurrence IN ('unico', 'semanal', 'mensal')),
  is_shared BOOLEAN NOT NULL DEFAULT false,
  expense_date DATE NOT NULL,
  created_by UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_expenses_account ON public.expenses(account_id);
CREATE INDEX idx_expenses_date ON public.expenses(expense_date);
CREATE INDEX idx_expenses_category ON public.expenses(account_id, category);
CREATE INDEX idx_expenses_shared ON public.expenses(is_shared) WHERE is_shared = true;

-- 2. Updated_at trigger (reuses handle_updated_at from earlier migrations)
CREATE TRIGGER on_expenses_updated
  BEFORE UPDATE ON public.expenses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 3. Expense splits table
CREATE TABLE public.expense_splits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_id UUID NOT NULL REFERENCES public.expenses(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  percentage NUMERIC(5,2) NOT NULL CHECK (percentage > 0 AND percentage <= 100),
  amount NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(expense_id, account_id)
);

CREATE INDEX idx_expense_splits_expense ON public.expense_splits(expense_id);
CREATE INDEX idx_expense_splits_account ON public.expense_splits(account_id);

-- 4. RLS for expenses
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Financial visibility required for expenses"
  ON public.expenses FOR SELECT
  USING (
    account_id = ANY(get_user_account_ids())
    AND can_view_financial(account_id)
  );

CREATE POLICY "Admins can create expenses"
  ON public.expenses FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );

CREATE POLICY "Admins can update expenses"
  ON public.expenses FOR UPDATE
  USING (account_id = ANY(get_user_account_ids()))
  WITH CHECK (get_user_role_in_account(account_id) = 'admin');

CREATE POLICY "Admins can delete expenses"
  ON public.expenses FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );

-- 5. RLS for expense_splits
ALTER TABLE public.expense_splits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Financial visibility for expense splits"
  ON public.expense_splits FOR SELECT
  USING (
    account_id = ANY(get_user_account_ids())
    AND can_view_financial(account_id)
  );

CREATE POLICY "Admins can insert expense splits"
  ON public.expense_splits FOR INSERT
  WITH CHECK (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );

CREATE POLICY "Admins can delete expense splits"
  ON public.expense_splits FOR DELETE
  USING (
    account_id = ANY(get_user_account_ids())
    AND get_user_role_in_account(account_id) = 'admin'
  );
