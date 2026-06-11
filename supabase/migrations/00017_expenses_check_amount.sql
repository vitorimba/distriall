-- Migration: 00017_expenses_check_amount
-- Story 3.3 QA fix: Add CHECK (amount > 0) constraints

ALTER TABLE public.expenses ADD CONSTRAINT expenses_amount_positive CHECK (amount > 0);
ALTER TABLE public.expense_splits ADD CONSTRAINT expense_splits_amount_positive CHECK (amount > 0);
