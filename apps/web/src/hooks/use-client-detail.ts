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

        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('*')
          .eq('id', clientId)
          .single();

        if (clientError) throw clientError;
        if (cancelled) return;
        setClient(clientData as ClientDetail | null);

        // Fetch vouchers pendentes
        const { data: vouchers, error: vouchersError } = await supabase
          .from('vouchers')
          .select('amount')
          .eq('client_id', clientId)
          .eq('status', 'pendente');

        if (vouchersError) throw vouchersError;

        const vouchersPending = (vouchers ?? []).reduce((sum, v) => sum + Number(v.amount), 0);
        const vouchersCount = (vouchers ?? []).length;

        // Fetch pagamentos pendentes (exceto vales, que ja estao nos vouchers)
        const { data: payments, error: paymentsError } = await supabase
          .from('payments')
          .select('amount, orders!inner(client_id, account_id)')
          .eq('orders.client_id', clientId)
          .eq('orders.account_id', activeAccount!.id)
          .eq('status', 'pendente')
          .neq('method', 'vale');

        if (paymentsError) throw paymentsError;

        const paymentsPending = (payments ?? []).reduce((sum, p) => sum + Number(p.amount), 0);
        const paymentsCount = (payments ?? []).length;

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
      } catch (err) {
        console.error('Error loading client detail:', err);
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [activeAccount, clientId]);

  return { client, balance, loading };
}
