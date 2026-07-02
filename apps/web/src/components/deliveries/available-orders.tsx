'use client';

import { useState } from 'react';
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-[var(--shadow-card)]">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)]">
        <span className="font-semibold text-[var(--text-primary)] text-sm">
          Pedidos disponiveis ({loading ? '…' : pending.length})
        </span>
      </div>

      {/* Card body */}
      {loading ? (
        <div className="space-y-0">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse border-t border-[var(--border-subtle)] bg-[var(--surface-hover)]" />
          ))}
        </div>
      ) : pending.length === 0 ? (
        <div className="py-10 text-center text-sm text-[var(--text-muted)] px-4">
          Todos os pedidos carregados ja foram adicionados a rota
        </div>
      ) : (
        <div>
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

            const isExpanded = expandedId === order.id;

            return (
              <div
                key={order.id}
                className="flex items-center gap-3 px-4 py-3 border-t border-[var(--border-subtle)] first:border-t-0 cursor-pointer active:bg-[var(--surface-hover)]"
                onClick={() => setExpandedId(isExpanded ? null : order.id)}
              >
                <MapPin className="size-4 shrink-0 text-[var(--text-muted)]" />
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="truncate font-semibold text-[var(--text-primary)] text-sm">{order.client_name}</p>
                  {fullAddress && (
                    <p className={`text-xs text-[var(--text-secondary)] ${isExpanded ? 'whitespace-normal break-words' : 'truncate'}`}>
                      {fullAddress}
                    </p>
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
                  onClick={(e) => { e.stopPropagation(); onAdd(order); }}
                  className="ml-1 shrink-0 rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-fg)]"
                  aria-label={`Adicionar ${order.client_name} a rota`}
                >
                  <Plus className="size-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
