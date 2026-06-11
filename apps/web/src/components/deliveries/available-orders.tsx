'use client';

import { MapPin, Plus } from 'lucide-react';
import { PAYMENT_METHOD_LABELS, PAYMENT_METHOD_COLORS } from '@distriall/shared';
import type { AvailableOrder } from '@/hooks/use-deliveries';

interface AvailableOrdersProps {
  orders: AvailableOrder[];
  routeOrderIds: Set<string>;
  onAdd: (order: AvailableOrder) => void;
  loading: boolean;
}

export function AvailableOrders({ orders, routeOrderIds, onAdd, loading }: AvailableOrdersProps) {
  const pending = orders.filter((o) => !routeOrderIds.has(o.id));

  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    );
  }

  if (pending.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center text-sm text-gray-400">
        Todos os pedidos carregados ja foram adicionados a rota
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {pending.map((order) => {
        const { client } = order;
        const fullAddress = [client.address, client.neighborhood, client.city]
          .filter(Boolean)
          .join(', ');
        const paymentLabel = order.payment_method
          ? (PAYMENT_METHOD_LABELS[order.payment_method] ?? order.payment_method)
          : null;
        const paymentColor = order.payment_method
          ? (PAYMENT_METHOD_COLORS[order.payment_method] ?? 'bg-gray-100 text-gray-800')
          : 'bg-gray-100 text-gray-800';

        return (
          <div
            key={order.id}
            className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
          >
            <MapPin className="mt-0.5 size-4 shrink-0 text-gray-400" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-gray-900">{order.client_name}</p>
              {fullAddress && (
                <p className="truncate text-sm text-gray-500">{fullAddress}</p>
              )}
              <div className="mt-1 flex flex-wrap items-center gap-2">
                {paymentLabel && (
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${paymentColor}`}>
                    {paymentLabel}
                  </span>
                )}
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  {order.account_name}
                </span>
              </div>
            </div>
            <button
              onClick={() => onAdd(order)}
              className="ml-1 mt-0.5 rounded-lg p-1.5 text-gray-400 hover:bg-primary/10 hover:text-primary"
              aria-label={`Adicionar ${order.client_name} a rota`}
            >
              <Plus className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
