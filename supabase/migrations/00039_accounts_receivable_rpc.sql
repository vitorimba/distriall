-- Migration: 00037_accounts_receivable_rpc
-- Story 8.2: Conta Corrente de Vales (Painel de Saldo Devedor)

-- RPC function that returns clients with outstanding voucher balance
-- Aggregates pending vouchers by client for a given account
CREATE OR REPLACE FUNCTION public.get_accounts_receivable(p_account_id UUID)
RETURNS TABLE (
  client_id UUID,
  client_name TEXT,
  total_balance NUMERIC(12,2),
  pending_count BIGINT,
  days_since_oldest INT
) AS $$
BEGIN
  -- Security check: user must have access to this account
  IF p_account_id != ALL(get_user_account_ids()) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  RETURN QUERY
  SELECT
    v.client_id,
    c.name AS client_name,
    SUM(v.amount)::NUMERIC(12,2) AS total_balance,
    COUNT(*)::BIGINT AS pending_count,
    EXTRACT(DAY FROM (now() - MIN(v.created_at)))::INT AS days_since_oldest
  FROM public.vouchers v
  JOIN public.clients c ON c.id = v.client_id
  WHERE v.account_id = p_account_id
    AND v.status = 'pendente'
  GROUP BY v.client_id, c.name
  HAVING SUM(v.amount) > 0
  ORDER BY SUM(v.amount) DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
