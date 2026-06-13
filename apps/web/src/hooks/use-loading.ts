import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useLoadingStore } from '@/stores/loading-store';
import type { OrderWithItems } from '@distriall/shared';

export function useLoading() {
  const { setOrders } = useLoadingStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchOrders() {
    setLoading(true);
    setError(null);
    const supabase = createClient();

    // RLS returns orders from ALL user accounts automatically
    const { data, error: fetchError } = await supabase
      .from('orders')
      .select(`
        *,
        client:clients(name),
        account:accounts(name, slug),
        items:order_items(*)
      `)
      .in('status', ['lancado', 'confirmado'])
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError('Nao foi possivel carregar os pedidos de carregamento.');
      setLoading(false);
      return;
    }
    const mapped: OrderWithItems[] = (data ?? []).map((o) => {
      const client = o.client as unknown as { name: string } | null;
      const account = o.account as unknown as { name: string; slug: string } | null;
      return {
        id: o.id,
        account_id: o.account_id,
        account_name: account?.name ?? '',
        account_slug: account?.slug ?? '',
        client_name: client?.name ?? '',
        order_number: o.order_number,
        status: o.status,
        payment_method: o.payment_method,
        subtotal: o.subtotal,
        total_cost: o.total_cost,
        profit: o.profit,
        total: o.total,
        created_at: o.created_at,
        delivery_date: o.delivery_date,
        items: (o.items as unknown as OrderWithItems['items']) ?? [],
      };
    });

    setOrders(mapped);
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => { if (!cancelled) fetchOrders(); }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { loading, error, refetch: fetchOrders };
}
