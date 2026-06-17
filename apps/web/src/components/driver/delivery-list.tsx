'use client';

import { DeliveryCard } from '@/components/driver/delivery-card';
import type { DeliveryItem } from '@/hooks/use-driver-deliveries';

interface DeliveryListProps {
  items: DeliveryItem[];
  onDelivered: (itemId: string, orderId: string, observation: string) => Promise<void>;
}

export function DeliveryList({ items, onDelivered }: DeliveryListProps) {
  const pending = items.filter((i) => i.status === 'pendente');
  const delivered = items.filter((i) => i.status === 'entregue');

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-xl text-muted-foreground font-medium">
          Sem entregas para hoje
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Aguarde o administrador montar a rota.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pendentes */}
      {pending.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground uppercase tracking-wide">
            Pendentes ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((item) => (
              <DeliveryCard key={item.id} item={item} onDelivered={onDelivered} />
            ))}
          </div>
        </section>
      )}

      {/* Entregues */}
      {delivered.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-base font-bold text-muted-foreground uppercase tracking-wide">
            Entregues ({delivered.length})
          </h2>
          <div className="space-y-3">
            {delivered.map((item) => (
              <DeliveryCard key={item.id} item={item} onDelivered={onDelivered} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
