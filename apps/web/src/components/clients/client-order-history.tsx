'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useClientOrders, type ClientOrderFilters } from '@/hooks/use-client-orders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Field } from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import type { OrderStatus } from '@distriall/shared';
import { Money } from '@/components/ui/money';
import { ChevronRight, ClipboardList } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'lancado', label: 'Lancado' },
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'carregado', label: 'Carregado' },
  { value: 'entregue', label: 'Entregue' },
  { value: 'cancelado', label: 'Cancelado' },
];

interface ClientOrderHistoryProps {
  clientId: string;
}

export function ClientOrderHistory({ clientId }: ClientOrderHistoryProps) {
  const { orders, loading, hasMore, applyFilters, loadMore } = useClientOrders(clientId);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [status, setStatus] = useState('all');

  function handleApplyFilters() {
    const f: ClientOrderFilters = {};
    if (dateFrom) f.dateFrom = dateFrom;
    if (dateTo) f.dateTo = dateTo;
    if (status !== 'all') f.status = status;
    applyFilters(f);
  }

  function handleClearFilters() {
    setDateFrom('');
    setDateTo('');
    setStatus('all');
    applyFilters({});
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Historico de Pedidos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Filters */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">De</label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="text-sm h-8"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Ate</label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="text-sm h-8"
              />
            </div>
          </div>
          <Field label="Status">
            <Select
              options={STATUS_OPTIONS}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Field>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleApplyFilters} className="flex-1">
              Filtrar
            </Button>
            <Button size="sm" variant="outline" onClick={handleClearFilters}>
              Limpar
            </Button>
          </div>
        </div>

        {/* Orders list */}
        {loading && orders.length === 0 ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} variant="rect" className="h-12" />)}
          </div>
        ) : orders.length === 0 ? (
          <EmptyState icon={ClipboardList} title="Nenhum pedido encontrado" />
        ) : (
          <div className="divide-y">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="flex items-center justify-between py-2.5 hover:bg-muted/50 -mx-1 px-1 rounded"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">#{order.order_number}</span>
                    <OrderStatusBadge status={order.status as OrderStatus} className="text-xs px-1.5 py-0" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {new Date(order.created_at).toLocaleDateString('pt-BR')}
                    {order.payment_method && (
                      <span className="ml-2 capitalize">{order.payment_method}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Money value={order.total} className="text-sm font-medium" />
                  <ChevronRight className="size-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {hasMore && (
          <Button variant="outline" size="sm" className="w-full" onClick={loadMore} disabled={loading}>
            {loading ? 'Carregando...' : 'Ver mais pedidos'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
