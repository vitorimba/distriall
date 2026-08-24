import { describe, it, expect } from 'vitest';
import { formatRouteAsText } from '../delivery';

describe('formatRouteAsText', () => {
  const baseItems = [
    {
      sequence: 1,
      client_name: 'Restaurante Sabor',
      client: { address: 'Rua A, 100', neighborhood: 'Centro', city: 'Rio Preto' },
      payment_method: 'pix',
    },
    {
      sequence: 2,
      client_name: 'Hotel Michelangelo',
      client: { address: 'Av B, 200', neighborhood: 'Jardim', city: 'Rio Preto' },
      payment_method: 'boleto',
    },
    {
      sequence: 3,
      client_name: 'Frigorifico Espanha',
      client: { address: 'Rua C, 300', neighborhood: null, city: 'Rio Preto' },
      payment_method: 'dinheiro',
    },
  ];

  it('formats header with date, driver name and stop count', () => {
    const result = formatRouteAsText(baseItems, 'Joao', '2026-08-23');
    const header = result.split('\n')[0];
    expect(header).toBe('Rota 23/08 - Joao (3 paradas)');
  });

  it('formats each item with sequence, name, address and payment', () => {
    const result = formatRouteAsText(baseItems, 'Joao', '2026-08-23');
    const lines = result.split('\n');
    expect(lines[1]).toBe('1. Restaurante Sabor - Rua A, 100, Centro, Rio Preto - PIX');
    expect(lines[2]).toBe('2. Hotel Michelangelo - Av B, 200, Jardim, Rio Preto - Boleto');
    expect(lines[3]).toBe('3. Frigorifico Espanha - Rua C, 300, Rio Preto - Dinheiro');
  });

  it('handles single stop (singular "parada")', () => {
    const result = formatRouteAsText([baseItems[0]], 'Diego', '2026-01-05');
    expect(result.split('\n')[0]).toBe('Rota 05/01 - Diego (1 parada)');
  });

  it('handles null payment method', () => {
    const items = [{ ...baseItems[0], payment_method: null }];
    const result = formatRouteAsText(items, 'Joao', '2026-08-23');
    expect(result.split('\n')[1]).toBe('1. Restaurante Sabor - Rua A, 100, Centro, Rio Preto');
  });

  it('handles null address fields', () => {
    const items = [{
      sequence: 1,
      client_name: 'Cliente X',
      client: { address: null, neighborhood: null, city: null },
      payment_method: 'vale',
    }];
    const result = formatRouteAsText(items, 'Joao', '2026-08-23');
    expect(result.split('\n')[1]).toBe('1. Cliente X - Vale');
  });

  it('handles empty items list', () => {
    const result = formatRouteAsText([], 'Joao', '2026-08-23');
    expect(result).toBe('Rota 23/08 - Joao (0 paradas)');
  });
});
