import { describe, it, expect } from 'vitest';

// Stats calculation helpers (pure functions extracted from API logic)
function calcAvgTicket(revenue: number, orderCount: number): number {
  return orderCount > 0 ? revenue / orderCount : 0;
}

function calcPaymentPercentages(
  paymentTotals: Record<string, number>
): Array<{ method: string; amount: number; percentage: number }> {
  const total = Object.values(paymentTotals).reduce((s, v) => s + v, 0);
  return Object.entries(paymentTotals).map(([method, amount]) => ({
    method,
    amount,
    percentage: total > 0 ? Math.round((amount / total) * 1000) / 10 : 0,
  }));
}

describe('calcAvgTicket', () => {
  it('calculates avg ticket correctly', () => {
    expect(calcAvgTicket(3000, 10)).toBe(300);
  });

  it('returns 0 when order_count is 0', () => {
    expect(calcAvgTicket(0, 0)).toBe(0);
  });

  it('calculates fractional avg ticket', () => {
    expect(calcAvgTicket(100, 3)).toBeCloseTo(33.333, 2);
  });

  it('handles single order', () => {
    expect(calcAvgTicket(500, 1)).toBe(500);
  });
});

describe('calcPaymentPercentages', () => {
  it('calculates percentages for two methods', () => {
    const result = calcPaymentPercentages({ pix: 700, dinheiro: 300 });
    const pix = result.find((r) => r.method === 'pix');
    const dinheiro = result.find((r) => r.method === 'dinheiro');
    expect(pix?.percentage).toBe(70);
    expect(dinheiro?.percentage).toBe(30);
  });

  it('returns 0 percentage when total is 0', () => {
    const result = calcPaymentPercentages({ pix: 0 });
    expect(result[0].percentage).toBe(0);
  });

  it('handles single payment method at 100%', () => {
    const result = calcPaymentPercentages({ pix: 1000 });
    expect(result[0].percentage).toBe(100);
  });

  it('percentages sum to 100 for two equal methods', () => {
    const result = calcPaymentPercentages({ pix: 500, dinheiro: 500 });
    const total = result.reduce((s, r) => s + r.percentage, 0);
    expect(total).toBe(100);
  });
});
