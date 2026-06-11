import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';

export interface ClientOrder {
  id: string;
  order_number: number;
  status: string;
  total: number;
  payment_method: string | null;
  created_at: string;
  delivery_date: string | null;
}

export interface ClientOrderFilters {
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}

const PAGE_SIZE = 20;

export function useClientOrders(clientId: string) {
  const { activeAccount } = useAccount();
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState<ClientOrderFilters>({});
  const pageRef = useRef(0);

  useEffect(() => {
    if (!activeAccount || !clientId) return;

    let cancelled = false;
    pageRef.current = 0;

    async function load() {
      setLoading(true);
      const supabase = createClient();

      let query = supabase
        .from('orders')
        .select('id, order_number, status, total, payment_method, created_at, delivery_date')
        .eq('client_id', clientId)
        .eq('account_id', activeAccount!.id)
        .order('created_at', { ascending: false })
        .range(0, PAGE_SIZE);

      if (filters.dateFrom) {
        query = query.gte('created_at', filters.dateFrom);
      }
      if (filters.dateTo) {
        const endDate = new Date(filters.dateTo);
        endDate.setDate(endDate.getDate() + 1);
        query = query.lt('created_at', endDate.toISOString().split('T')[0]);
      }
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      const { data } = await query;
      if (cancelled) return;

      const rows = (data ?? []) as ClientOrder[];
      setOrders(rows.slice(0, PAGE_SIZE));
      setHasMore(rows.length > PAGE_SIZE);
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [activeAccount, clientId, filters]);

  async function loadMore() {
    if (!activeAccount || !clientId) return;

    pageRef.current += 1;
    const nextPage = pageRef.current;
    setLoading(true);

    const supabase = createClient();

    let query = supabase
      .from('orders')
      .select('id, order_number, status, total, payment_method, created_at, delivery_date')
      .eq('client_id', clientId)
      .eq('account_id', activeAccount.id)
      .order('created_at', { ascending: false })
      .range(nextPage * PAGE_SIZE, (nextPage + 1) * PAGE_SIZE);

    if (filters.dateFrom) {
      query = query.gte('created_at', filters.dateFrom);
    }
    if (filters.dateTo) {
      const endDate = new Date(filters.dateTo);
      endDate.setDate(endDate.getDate() + 1);
      query = query.lt('created_at', endDate.toISOString().split('T')[0]);
    }
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    const { data } = await query;
    const rows = (data ?? []) as ClientOrder[];
    setOrders((prev) => [...prev, ...rows.slice(0, PAGE_SIZE)]);
    setHasMore(rows.length > PAGE_SIZE);
    setLoading(false);
  }

  function applyFilters(newFilters: ClientOrderFilters) {
    setFilters(newFilters);
  }

  return { orders, loading, hasMore, filters, applyFilters, loadMore };
}
