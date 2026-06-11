import { describe, it, expect } from 'vitest';
import {
  buildDeliveryStatusUpdate,
  isDeliveryTerminal,
  getDeliveryStatusLabel,
} from '../delivery';

describe('buildDeliveryStatusUpdate', () => {
  it('builds payload with required fields', () => {
    const result = buildDeliveryStatusUpdate('item-1', 'order-1');
    expect(result.itemId).toBe('item-1');
    expect(result.orderId).toBe('order-1');
    expect(result.deliveredAt).toBeTruthy();
    expect(result.observation).toBeUndefined();
  });

  it('includes trimmed observation when provided', () => {
    const result = buildDeliveryStatusUpdate('item-1', 'order-1', '  recebeu Dona Maria  ');
    expect(result.observation).toBe('recebeu Dona Maria');
  });

  it('omits observation when empty string', () => {
    const result = buildDeliveryStatusUpdate('item-1', 'order-1', '   ');
    expect(result.observation).toBeUndefined();
  });

  it('throws when itemId is missing', () => {
    expect(() => buildDeliveryStatusUpdate('', 'order-1')).toThrow('itemId is required');
  });

  it('throws when orderId is missing', () => {
    expect(() => buildDeliveryStatusUpdate('item-1', '')).toThrow('orderId is required');
  });

  it('deliveredAt is a valid ISO string', () => {
    const result = buildDeliveryStatusUpdate('item-1', 'order-1');
    const date = new Date(result.deliveredAt);
    expect(date.toISOString()).toBe(result.deliveredAt);
  });
});

describe('isDeliveryTerminal', () => {
  it('returns true for entregue', () => {
    expect(isDeliveryTerminal('entregue')).toBe(true);
  });

  it('returns true for nao_entregue', () => {
    expect(isDeliveryTerminal('nao_entregue')).toBe(true);
  });

  it('returns false for pendente', () => {
    expect(isDeliveryTerminal('pendente')).toBe(false);
  });
});

describe('getDeliveryStatusLabel', () => {
  it('returns correct label for each status', () => {
    expect(getDeliveryStatusLabel('pendente')).toBe('Pendente');
    expect(getDeliveryStatusLabel('entregue')).toBe('Entregue');
    expect(getDeliveryStatusLabel('nao_entregue')).toBe('Nao entregue');
  });
});
