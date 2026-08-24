// Delivery utility functions
// DeliveryItemStatus is now the canonical enum from enums.ts
import type { DeliveryItemStatus } from '../types/enums';
import { PAYMENT_METHOD_LABELS } from '../types/enums';
export type { DeliveryItemStatus };

/**
 * Generates a Google Maps URL with ordered waypoints.
 * Format: https://www.google.com/maps/dir/{addr1}/{addr2}/...
 */
export function buildGoogleMapsUrl(addresses: string[]): string {
  if (addresses.length === 0) return 'https://www.google.com/maps';
  const encoded = addresses.map((a) => encodeURIComponent(a));
  return `https://www.google.com/maps/dir/${encoded.join('/')}`;
}

/**
 * Reassigns sequence numbers to a list of items starting from 1,
 * preserving the existing order.
 */
export function reassignSequences<T extends { sequence: number }>(items: T[]): T[] {
  return items.map((item, index) => ({ ...item, sequence: index + 1 }));
}

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

export interface RouteTextItem {
  sequence: number;
  client_name: string;
  client: { address: string | null; neighborhood: string | null; city: string | null };
  payment_method: string | null;
}

/**
 * Formats a delivery route as a plain-text list for clipboard/WhatsApp sharing.
 *
 * Output example:
 *   Rota 23/08 - Joao (3 paradas)
 *   1. Cliente A - Rua X, 123, Centro - PIX
 *   2. Cliente B - Rua Y, 456 - Dinheiro
 */
export function formatRouteAsText(
  items: RouteTextItem[],
  driverName: string,
  date: string,
): string {
  const [year, month, day] = date.split('-');
  const dateLabel = `${day}/${month}`;
  const header = `Rota ${dateLabel} - ${driverName} (${items.length} parada${items.length !== 1 ? 's' : ''})`;

  const lines = items.map((item) => {
    const address = [item.client.address, item.client.neighborhood, item.client.city]
      .filter(Boolean)
      .join(', ');
    const payment = item.payment_method ? PAYMENT_METHOD_LABELS[item.payment_method] ?? item.payment_method : '';
    const parts = [item.client_name, address, payment].filter(Boolean);
    return `${item.sequence}. ${parts.join(' - ')}`;
  });

  return [header, ...lines].join('\n');
}
