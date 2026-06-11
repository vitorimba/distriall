'use client';

import { useState } from 'react';
import { DeliveryConfirmSheet } from '@/components/driver/delivery-confirm-sheet';
import type { DeliveryItem } from '@/hooks/use-driver-deliveries';

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  dinheiro: 'Dinheiro',
  pix: 'PIX',
  boleto: 'Boleto',
  vale: 'Vale',
  cartao: 'Cartao',
};

const PAYMENT_METHOD_COLORS: Record<string, string> = {
  dinheiro: 'bg-green-100 text-green-800',
  pix: 'bg-blue-100 text-blue-800',
  boleto: 'bg-yellow-100 text-yellow-800',
  vale: 'bg-purple-100 text-purple-800',
  cartao: 'bg-orange-100 text-orange-800',
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
  const paymentColor = order.payment_method
    ? (PAYMENT_METHOD_COLORS[order.payment_method] ?? 'bg-gray-100 text-gray-800')
    : 'bg-gray-100 text-gray-800';

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
      <div
        className={`border-2 rounded-2xl p-5 shadow-sm transition-colors ${
          isDelivered ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
        }`}
      >
        {/* Sequence number + delivered badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-semibold text-gray-500">
            Parada {item.sequence}
          </span>
          {isDelivered && (
            <span className="flex items-center gap-1 bg-green-100 text-green-800 text-base font-bold px-3 py-1 rounded-full">
              <span>✓</span> Entregue
            </span>
          )}
        </div>

        {/* Client name — GIGANTE */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
          {client.name}
        </h2>

        {/* Address */}
        {fullAddress && (
          <p className="text-lg text-gray-600 mb-3">{fullAddress}</p>
        )}

        {/* Payment method */}
        {paymentLabel && (
          <span
            className={`inline-block text-base font-semibold px-3 py-1 rounded-full mb-3 ${paymentColor}`}
          >
            {paymentLabel}
          </span>
        )}

        {/* Products — apenas nome e quantidade, SEM precos */}
        {order.items.length > 0 && (
          <ul className="text-base text-gray-700 mb-4 space-y-1">
            {order.items.map((orderItem) => (
              <li key={orderItem.id} className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{orderItem.quantity}x</span>
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
          <p className="text-base text-gray-500 italic mb-3">
            Obs: {item.observation}
          </p>
        )}

        {/* BOTAO GIGANTE — apenas para pendentes */}
        {!isDelivered && (
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full h-16 bg-green-600 hover:bg-green-700 text-white text-2xl font-bold rounded-xl active:scale-95 transition-transform"
          >
            ENTREGUE
          </button>
        )}
      </div>

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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-green-700 text-white text-xl font-bold px-8 py-4 rounded-2xl shadow-lg">
          Entrega confirmada!
        </div>
      )}
    </>
  );
}
