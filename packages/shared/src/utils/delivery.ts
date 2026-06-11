// Delivery utility functions

export type DeliveryItemStatus = 'pendente' | 'entregue' | 'nao_entregue';

export interface DeliveryStatusTransition {
  itemId: string;
  orderId: string;
  observation?: string;
  deliveredAt: string;
}

/**
 * Validates and builds the payload for marking a delivery as delivered.
 */
export function buildDeliveryStatusUpdate(
  itemId: string,
  orderId: string,
  observation?: string
): DeliveryStatusTransition {
  if (!itemId) throw new Error('itemId is required');
  if (!orderId) throw new Error('orderId is required');

  return {
    itemId,
    orderId,
    observation: observation?.trim() || undefined,
    deliveredAt: new Date().toISOString(),
  };
}

/**
 * Checks if a delivery item is in a terminal state.
 */
export function isDeliveryTerminal(status: DeliveryItemStatus): boolean {
  return status === 'entregue' || status === 'nao_entregue';
}

/**
 * Returns display label for delivery status.
 */
export function getDeliveryStatusLabel(status: DeliveryItemStatus): string {
  const labels: Record<DeliveryItemStatus, string> = {
    pendente: 'Pendente',
    entregue: 'Entregue',
    nao_entregue: 'Nao entregue',
  };
  return labels[status];
}
