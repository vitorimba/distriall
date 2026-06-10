'use client';

import { useLoadingStore } from '@/stores/loading-store';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import type { OrderStatus, OrderWithItems } from '@distriall/shared';
import { cn } from '@/lib/utils';

const ACCOUNT_COLORS: Record<string, string> = {
  rp: 'bg-blue-500',
  ti: 'bg-purple-500',
  vo: 'bg-orange-500',
};

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

interface LoadingOrderListProps {
  filteredOrders: OrderWithItems[];
}

export function LoadingOrderList({ filteredOrders }: LoadingOrderListProps) {
  const { selectedIds, toggleOrder, deselectAll } = useLoadingStore();

  const allSelected = filteredOrders.length > 0 && filteredOrders.every((o) => selectedIds.has(o.id));

  if (filteredOrders.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        Nenhum pedido para carregar.
      </div>
    );
  }

  function handleSelectAll() {
    if (allSelected) {
      deselectAll();
    } else {
      // Toggle on all visible that aren't already selected
      for (const o of filteredOrders) {
        if (!selectedIds.has(o.id)) toggleOrder(o.id);
      }
    }
  }

  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={handleSelectAll}
          className="size-4 rounded border-input"
        />
        Selecionar todos ({filteredOrders.length})
      </label>

      {filteredOrders.map((order) => {
        const isSelected = selectedIds.has(order.id);
        const slug = order.account_slug?.toLowerCase() ?? '';
        const accountColor = ACCOUNT_COLORS[slug] ?? 'bg-gray-500';
        const itemCount = order.items?.length ?? 0;

        return (
          <button
            key={order.id}
            onClick={() => toggleOrder(order.id)}
            className={cn(
              'flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-left',
              isSelected && 'border-primary bg-primary/5'
            )}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleOrder(order.id)}
              onClick={(e) => e.stopPropagation()}
              className="size-4 shrink-0 rounded border-input"
            />

            <span className={cn('shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white uppercase', accountColor)}>
              {order.account_slug}
            </span>

            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">{order.client_name}</div>
              <div className="text-xs text-muted-foreground">
                #{order.order_number} · {itemCount} ite{itemCount !== 1 ? 'ns' : 'm'}
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-medium">{formatBRL(order.total)}</span>
              <OrderStatusBadge status={order.status as OrderStatus} />
            </div>
          </button>
        );
      })}
    </div>
  );
}
