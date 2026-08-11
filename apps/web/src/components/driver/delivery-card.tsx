'use client';

import { useState } from 'react';
import { DeliveryConfirmSheet } from '@/components/driver/delivery-confirm-sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import type { DeliveryItem } from '@/hooks/use-driver-deliveries';

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  dinheiro: 'Dinheiro',
  pix: 'PIX',
  boleto: 'Boleto',
  vale: 'Vale',
  cartao: 'Cartão',
};

interface DeliveryCardProps {
  item: DeliveryItem;
  onDelivered: (itemId: string, orderId: string, observation: string) => Promise<void>;
}

export function DeliveryCard({ item, onDelivered }: DeliveryCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const { order } = item;
  const client = order.client;
  const isDelivered = item.status === 'entregue';

  const paymentLabel = order.payment_method
    ? (PAYMENT_METHOD_LABELS[order.payment_method] ?? order.payment_method)
    : null;

  const fullAddress = [client.address, client.neighborhood, client.city]
    .filter(Boolean)
    .join(', ');

  async function handleConfirm(observation: string) {
    await onDelivered(item.id, order.id, observation);
    setShowConfirm(false);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }

  return (
    <>
      <Card className={isDelivered ? 'opacity-75' : ''}>
        <CardContent className="space-y-3">
          {/* Sequence number + delivered badge */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">
              Parada {item.sequence}
            </span>
            {isDelivered && (
              <Badge
                className="gap-1"
                style={{ background: 'var(--success-soft)', color: 'var(--text-positive)' }}
              >
                <Check className="size-3" /> Entregue
              </Badge>
            )}
          </div>

          {/* Client name */}
          <h2 className="text-xl font-bold text-foreground leading-tight">
            {client.name}
          </h2>

          {/* Address */}
          {fullAddress && (
            <p className="text-sm text-muted-foreground">{fullAddress}</p>
          )}

          {/* Payment method */}
          {paymentLabel && (
            <Badge variant="outline">{paymentLabel}</Badge>
          )}

          {/* Products */}
          {order.items.length > 0 && (
            <ul className="text-sm text-foreground space-y-1">
              {order.items.map((orderItem) => (
                <li key={orderItem.id} className="flex items-center gap-2">
                  <span className="font-bold">{orderItem.quantity}x</span>
                  <span>
                    {orderItem.product_name}
                    {orderItem.variant_name ? ` (${orderItem.variant_name})` : ''}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Observation (if delivered) */}
          {isDelivered && item.observation && (
            <p className="text-sm text-muted-foreground italic">
              Obs: {item.observation}
            </p>
          )}

          {/* Action button — only for pending */}
          {!isDelivered && (
            <Button
              onClick={() => setShowConfirm(true)}
              className="w-full h-12 text-base font-bold"
              style={{ background: 'var(--success)', color: '#fff' }}
            >
              ENTREGUE
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Confirmation sheet */}
      {showConfirm && (
        <DeliveryConfirmSheet
          clientName={client.name}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* Toast */}
      {toastVisible && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg text-base font-bold text-white"
          style={{ background: 'var(--success)' }}
        >
          Entrega confirmada!
        </div>
      )}
    </>
  );
}
