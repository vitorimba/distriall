'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { type OrderStatus } from '@distriall/shared';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { OrderActionBar } from '@/components/orders/order-action-bar';
import { ChipFilter } from '@/components/ui/chip-filter';
import { Badge } from '@/components/ui/badge';
import { SearchField } from '@/components/ui/search-field';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Money } from '@/components/ui/money';
import { FAB } from '@/components/ui/fab';
import { ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderRow {
  id: string;
  order_number: number;
  status: OrderStatus;
  payment_method: string | null;
  subtotal: number;
  total: number;
  delivery_date: string | null;
  created_at: string;
  clients: { name: string } | null;
  order_items: { count: number }[];
}

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'lancado', label: 'Lancado' },
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'carregado', label: 'Carregado' },
  { value: 'entregue', label: 'Entregue' },
  { value: 'cancelado', label: 'Cancelado' },
];

const PAYMENT_FILTERS: { value: string; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'dinheiro', label: 'Dinheiro' },
  { value: 'pix', label: 'Pix' },
  { value: 'boleto', label: 'Boleto' },
  { value: 'vale', label: 'Vale' },
  { value: 'cartao', label: 'Cartao' },
  { value: 'misto', label: 'Misto' },
];

export function OrderList() {
  const { activeAccount } = useAccount();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loadKey, setLoadKey] = useState(0);
  const loading = loadKey === 0 && orders.length === 0;

  const loadOrders = useCallback(async () => {
    if (!activeAccount) return;

    const supabase = createClient();
    let query = supabase
      .from('orders')
      .select('id, order_number, status, payment_method, subtotal, total, delivery_date, created_at, clients(name), order_items(count)')
      .eq('account_id', activeAccount.id)
      .order('created_at', { ascending: false });

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }
    if (paymentFilter !== 'all') {
      query = query.eq('payment_method', paymentFilter);
    }

    const { data } = await query;
    let result = (data as unknown as OrderRow[]) ?? [];

    // Client-side search filter
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter((o) =>
        o.clients?.name?.toLowerCase().includes(lower) ||
        String(o.order_number).includes(lower)
      );
    }

    setOrders(result);
    setLoadKey((k) => k + 1);
  }, [activeAccount, statusFilter, paymentFilter, search]);

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => { if (!cancelled) loadOrders(); }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, [loadOrders]);

  // Realtime subscription
  useEffect(() => {
    if (!activeAccount) return;

    const supabase = createClient();
    const channel = supabase
      .channel('orders-realtime')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `account_id=eq.${activeAccount.id}`,
      }, (payload) => {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === payload.new.id
              ? { ...o, status: payload.new.status as OrderStatus }
              : o
          )
        );
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeAccount]);

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function getItemCount(order: OrderRow): number {
    return order.order_items?.[0]?.count ?? 0;
  }

  return (
    <div className="space-y-3">
      {/* Search */}
      <SearchField
        placeholder="Buscar por cliente ou numero..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch('')}
      />

      {/* Status filters */}
      <ChipFilter options={STATUS_FILTERS} selected={statusFilter} onChange={setStatusFilter} />
      <ChipFilter options={PAYMENT_FILTERS} selected={paymentFilter} onChange={setPaymentFilter} />

      {/* Order list */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="rect" className="h-16" />)}
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title={search || statusFilter !== 'all' ? 'Nenhum pedido encontrado' : 'Nenhum pedido ainda'}
          description={search || statusFilter !== 'all' ? undefined : 'Lance o primeiro pedido para ve-lo aqui.'}
        />
      ) : (
        <div className="space-y-1 pb-24">
          {orders.map((order) => {
            const isSelected = selectedIds.has(order.id);
            const itemCount = getItemCount(order);
            return (
              <div
                key={order.id}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-3 py-2.5',
                  isSelected && 'border-primary bg-primary/5'
                )}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(order.id)}
                  className="size-4 shrink-0 rounded border-input"
                />

                {/* Content */}
                <Link
                  href={`/orders/${order.id}`}
                  className="flex min-w-0 flex-1 items-center gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        #{order.order_number}
                      </span>
                      <span className="text-sm truncate">
                        {order.clients?.name ?? '—'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{itemCount} ite{itemCount !== 1 ? 'ns' : 'm'}</span>
                      {order.payment_method && (
                        <Badge variant="secondary" className="text-[10px] px-1 py-0">
                          {order.payment_method}
                        </Badge>
                      )}
                      {order.delivery_date && (
                        <span>{new Date(order.delivery_date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <Money value={order.total} className="text-sm font-medium" />
                    <OrderStatusBadge status={order.status} />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* Action bar for batch operations */}
      {selectedIds.size > 0 && (
        <OrderActionBar
          selectedIds={[...selectedIds]}
          selectedOrders={orders.filter((o) => selectedIds.has(o.id))}
          onDone={() => {
            setSelectedIds(new Set());
            loadOrders();
          }}
        />
      )}

      {/* FAB New Order */}
      {selectedIds.size === 0 && (
        <Link href="/orders/new">
          <FAB label="Novo pedido" />
        </Link>
      )}
    </div>
  );
}
