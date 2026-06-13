'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Money } from '@/components/ui/money';
import { EmptyState } from '@/components/ui/empty-state';
import { ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import type { SettlementOrderRow } from '@/hooks/use-settlements';

interface SettlementOrdersProps {
  orders: SettlementOrderRow[];
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR');
}

export function SettlementOrders({ orders }: SettlementOrdersProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardContent className="pt-4 space-y-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between"
        >
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Pedidos ({orders.length})
          </h2>
          {expanded ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
        </button>

        {expanded && (
          <div className="space-y-1 pt-1">
            {orders.length === 0 ? (
              <EmptyState icon={ShoppingCart} title="Nenhum pedido no periodo" />
            ) : (
              orders.map((row) => {
                const order = row.orders;
                if (!order) return null;
                return (
                  <div
                    key={row.id}
                    className="flex items-center justify-between rounded-md border bg-muted/20 px-3 py-2 text-sm"
                  >
                    <div className="min-w-0">
                      <span className="font-medium">#{order.order_number}</span>
                      <span className="ml-2 text-muted-foreground truncate">{order.client_name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground">{formatDate(order.created_at)}</span>
                      <Money value={order.total} className="font-medium" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
