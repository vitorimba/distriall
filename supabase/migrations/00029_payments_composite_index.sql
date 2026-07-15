-- Performance optimization: composite index for payment queries
-- Covers common query pattern: WHERE account_id = X AND status = 'pendente'
-- Used by: use-client-detail.ts, financial views

CREATE INDEX IF NOT EXISTS idx_payments_account_status
  ON public.payments(account_id, status);

-- Also covers: WHERE account_id = X AND status = 'pendente' AND method != 'vale'
-- The existing idx_payments_method(account_id, method) doesn't help with status filter
