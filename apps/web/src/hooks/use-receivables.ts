import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';

export interface ReceivableRow {
  client_id: string;
  client_name: string;
  total_balance: number;
  pending_count: number;
  days_since_oldest: number;
}

export interface ReceivablesSummary {
  totalReceivable: number;
  debtorCount: number;
  avgDaysInArrears: number;
}

export function useReceivables() {
  const { activeAccount } = useAccount();
  const [receivables, setReceivables] = useState<ReceivableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!activeAccount) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: rpcError } = await supabase.rpc(
        'get_accounts_receivable',
        { p_account_id: activeAccount.id }
      );
      if (rpcError) throw rpcError;
      setReceivables((data as ReceivableRow[]) ?? []);
    } catch {
      setError('Nao foi possivel carregar as contas a receber.');
      setReceivables([]);
    } finally {
      setLoading(false);
    }
  }, [activeAccount]);

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => {
      if (!cancelled) load();
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [load]);

  const summary: ReceivablesSummary = {
    totalReceivable: receivables.reduce((sum, r) => sum + Number(r.total_balance), 0),
    debtorCount: receivables.length,
    avgDaysInArrears:
      receivables.length > 0
        ? Math.round(
            receivables.reduce((sum, r) => sum + r.days_since_oldest, 0) /
              receivables.length
          )
        : 0,
  };

  return { receivables, summary, loading, error, reload: load };
}
