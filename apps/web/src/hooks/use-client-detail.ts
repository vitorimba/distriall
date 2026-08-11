import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import type { ClientDetail, ClientBalance } from '@distriall/shared';

export function useClientDetail(clientId: string) {
  const { activeAccount } = useAccount();
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [balance, setBalance] = useState<ClientBalance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeAccount || !clientId) return;

    let cancelled = false;

    async function load() {
      try {
        const supabase = createClient();

        // Run all 3 queries in parallel
        const [clientResult, vouchersResult, paymentsResult] = await Promise.all([
          supabase
            .from('clients')
            .select('*')
            .eq('id', clientId)
            .single(),
          supabase
            .from('vouchers')
            .select('amount')
            .eq('client_id', clientId)
            .eq('status', 'pendente'),
          supabase
            .from('payments')
            .select('amount, orders!inner(client_id, account_id)')
            .eq('orders.client_id', clientId)
            .eq('orders.account_id', activeAccount!.id)
            .eq('status', 'pendente')
            .neq('method', 'vale'),
        ]);

        if (clientResult.error) throw clientResult.error;
        if (cancelled) return;
        setClient(clientResult.data as ClientDetail | null);

        if (vouchersResult.error) throw vouchersResult.error;
        const vouchers = vouchersResult.data ?? [];
        const vouchersPending = vouchers.reduce((sum: number, v: { amount: number }) => sum + Number(v.amount), 0);
        const vouchersCount = vouchers.length;

        if (paymentsResult.error) throw paymentsResult.error;
        const payments = paymentsResult.data ?? [];
        const paymentsPending = payments.reduce((sum: number, p: { amount: number }) => sum + Number(p.amount), 0);
        const paymentsCount = payments.length;

        if (!cancelled) {
          setBalance({
            vouchers_pending: vouchersPending,
            vouchers_count: vouchersCount,
            payments_pending: paymentsPending,
            payments_count: paymentsCount,
            total: vouchersPending + paymentsPending,
          });
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [activeAccount, clientId]);

  return { client, balance, loading };
}
