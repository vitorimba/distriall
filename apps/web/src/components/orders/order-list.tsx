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
import { Alert } from '@/components/ui/alert';
import { Money } from '@/components/ui/money';
import { FAB } from '@/components/ui/fab';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { ClipboardList, RefreshCw, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 25;
const PENDING_STATUSES = ['lancado', 'confirmado', 'carregado'];

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

type PeriodTab = 'hoje' | 'ontem' | '7dias' | 'mes' | 'custom';

const PERIOD_TABS: { value: PeriodTab; label: string }[] = [
  { value: 'hoje', label: 'Hoje' },
  { value: 'ontem', label: 'Ontem' },
  { value: '7dias', label: '7 dias' },
  { value: 'mes', label: 'Mes' },
  { value: 'custom', label: 'Personalizado' },
];

function getDateRange(tab: PeriodTab): { start: string; end: string } | null {
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().split('T')[0];

  switch (tab) {
    case 'hoje':
      return { start: fmt(today), end: fmt(today) };
    case 'ontem': {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      return { start: fmt(yesterday), end: fmt(yesterday) };
    }
    case '7dias': {
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 6);
      return { start: fmt(weekAgo), end: fmt(today) };
    }
    case 'mes': {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      return { start: fmt(monthStart), end: fmt(today) };
    }
    case 'custom':
      return null; // handled by custom date inputs
  }
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
  const [periodTab, setPeriodTab] = useState<PeriodTab>('hoje');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [totalCount, setTotalCount] = useState(0);
  const [loadKey, setLoadKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const loading = loadKey === 0 && orders.length === 0 && !error;

  const loadOrders = useCallback(async () => {
    if (!activeAccount) return;
    if (periodTab === 'custom' && (!customStart || !customEnd)) return;

    const supabase = createClient();

    // Date range from period tab
    const range = periodTab === 'custom'
      ? { start: customStart, end: customEnd }
      : getDateRange(periodTab);

    // For "hoje" tab: also include pending orders from any date
    // Query: (created within range) OR (status is pending)
    if (periodTab === 'hoje' && statusFilter === 'all') {
      // Use or() to include pending orders from any date + today's orders
      let query = supabase
        .from('orders')
        .select('id, order_number, status, payment_method, subtotal, total, delivery_date, created_at, clients(name), order_items(count)', { count: 'exact' })
        .eq('account_id', activeAccount.id)
        .or(`created_at.gte.${range!.start}T00:00:00,status.in.(${PENDING_STATUSES.join(',')})`)
        .order('created_at', { ascending: false });

      if (paymentFilter !== 'all') {
        query = query.eq('payment_method', paymentFilter);
      }
      if (search) {
        const isNumeric = /^\d+$/.test(search);
        if (isNumeric) {
          query = query.eq('order_number', Number(search));
        } else {
          query = query.ilike('clients.name', `${search}%`);
        }
      }

      const offset = (page - 1) * PAGE_SIZE;
      query = query.range(offset, offset + PAGE_SIZE - 1);

      const { data, count, error: fetchError } = await query;
      if (fetchError) {
        setError('Nao foi possivel carregar os pedidos.');
        setLoadKey((k) => k + 1);
        return;
      }
      setError(null);
      setOrders((data as unknown as OrderRow[]) ?? []);
      setTotalCount(count ?? 0);
      setLoadKey((k) => k + 1);
      return;
    }

    // Standard query for other tabs
    let query = supabase
      .from('orders')
      .select('id, order_number, status, payment_method, subtotal, total, delivery_date, created_at, clients(name), order_items(count)', { count: 'exact' })
      .eq('account_id', activeAccount.id)
      .order('created_at', { ascending: false });

    if (range) {
      query = query.gte('created_at', `${range.start}T00:00:00`).lte('created_at', `${range.end}T23:59:59`);
    }

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }
    if (paymentFilter !== 'all') {
      query = query.eq('payment_method', paymentFilter);
    }
    if (search) {
      const isNumeric = /^\d+$/.test(search);
      if (isNumeric) {
        query = query.eq('order_number', Number(search));
      } else {
        query = query.ilike('clients.name', `${search}%`);
      }
    }

    const offset = (page - 1) * PAGE_SIZE;
    query = query.range(offset, offset + PAGE_SIZE - 1);

    const { data, count, error: fetchError } = await query;
    if (fetchError) {
      setError('Nao foi possivel carregar os pedidos.');
      setLoadKey((k) => k + 1);
      return;
    }
    setError(null);
    setOrders((data as unknown as OrderRow[]) ?? []);
    setTotalCount(count ?? 0);
    setLoadKey((k) => k + 1);
  }, [activeAccount, periodTab, customStart, customEnd, statusFilter, paymentFilter, search, page]);

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => { if (!cancelled) loadOrders(); }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, [loadOrders]);

  useEffect(() => { setPage(1); }, [periodTab, customStart, customEnd, statusFilter, paymentFilter, search]);

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
      }, (payload: { new: Record<string, unknown> }) => {
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

  const pageOrders = orders;

  return (
    <div className="space-y-3">
      {/* Search */}
      <SearchField
        placeholder="Buscar por cliente ou numero..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch('')}
      />

      {/* Period tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {PERIOD_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setPeriodTab(tab.value)}
            className={cn(
              'shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              periodTab === tab.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {tab.value === 'custom' && <Calendar className="inline size-3 mr-1 -mt-0.5" />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Custom date range */}
      {periodTab === 'custom' && (
        <div className="flex gap-2">
          <input
            type="date"
            value={customStart}
            onChange={(e) => setCustomStart(e.target.value)}
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm"
            placeholder="De"
          />
          <input
            type="date"
            value={customEnd}
            onChange={(e) => setCustomEnd(e.target.value)}
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm"
            placeholder="Ate"
          />
        </div>
      )}

      {/* Status & payment filters — compact dropdowns on mobile, chips on desktop */}
      <div className="flex gap-2 md:hidden">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
        >
          {STATUS_FILTERS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Status: {opt.label}
            </option>
          ))}
        </select>
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
        >
          {PAYMENT_FILTERS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Pgto: {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden md:block space-y-2">
        <ChipFilter options={STATUS_FILTERS} selected={statusFilter} onChange={setStatusFilter} />
        <ChipFilter options={PAYMENT_FILTERS} selected={paymentFilter} onChange={setPaymentFilter} />
      </div>

      {/* Error alert */}
      {error && (
        <Alert
          tone="danger"
          title={error}
          action={
            <Button size="sm" variant="ghost" onClick={loadOrders}>
              <RefreshCw className="size-3.5 mr-1" />
              Tentar novamente
            </Button>
          }
        />
      )}

      {/* Order list */}
      {!error && loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="rect" className="h-16" />)}
        </div>
      ) : !error && orders.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title={search || statusFilter !== 'all' || periodTab !== 'hoje' ? 'Nenhum pedido encontrado' : 'Nenhum pedido hoje'}
          description={search || statusFilter !== 'all' || periodTab !== 'hoje' ? 'Tente ajustar os filtros ou o periodo.' : 'Lance o primeiro pedido para ve-lo aqui.'}
        />
      ) : !error ? (
        <div className="space-y-1 pb-24">
          {/* Select all / clear */}
          {orders.length > 0 && (
            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                checked={pageOrders.length > 0 && pageOrders.every((o) => selectedIds.has(o.id))}
                onChange={() => {
                  const pageIds = pageOrders.map((o) => o.id);
                  const allSelected = pageIds.every((id) => selectedIds.has(id));
                  if (allSelected) {
                    setSelectedIds((prev) => {
                      const next = new Set(prev);
                      pageIds.forEach((id) => next.delete(id));
                      return next;
                    });
                  } else {
                    setSelectedIds((prev) => {
                      const next = new Set(prev);
                      pageIds.forEach((id) => next.add(id));
                      return next;
                    });
                  }
                }}
                className="size-4 shrink-0 rounded border-input"
              />
              <span className="text-xs text-muted-foreground">
                {selectedIds.size > 0
                  ? `${selectedIds.size} selecionado${selectedIds.size !== 1 ? 's' : ''}`
                  : 'Selecionar todos'}
              </span>
              {selectedIds.size > 0 && (
                <button
                  onClick={() => setSelectedIds(new Set())}
                  className="text-xs text-primary underline underline-offset-2"
                >
                  Limpar
                </button>
              )}
            </div>
          )}
          {pageOrders.map((order) => {
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
      ) : null}

      {!error && totalCount > PAGE_SIZE && (
        <Pagination page={page} totalItems={totalCount} pageSize={PAGE_SIZE} onChange={setPage} label="pedidos" />
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
