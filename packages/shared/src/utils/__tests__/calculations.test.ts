import { describe, it, expect } from 'vitest';
import { calculateSplits } from '../calculations';

describe('calculateSplits', () => {
  it('equal split 50/50 on R$500', () => {
    const result = calculateSplits(500, [
      { accountId: 'a1', percentage: 50 },
      { accountId: 'a2', percentage: 50 },
    ]);
    expect(result).toHaveLength(2);
    expect(result[0].amount).toBe(250);
    expect(result[1].amount).toBe(250);
    expect(result[0].amount + result[1].amount).toBe(500);
  });

  it('unequal split 70/30 on R$100', () => {
    const result = calculateSplits(100, [
      { accountId: 'a1', percentage: 70 },
      { accountId: 'a2', percentage: 30 },
    ]);
    expect(result[0].amount).toBe(70);
    expect(result[1].amount).toBe(30);
    expect(result[0].amount + result[1].amount).toBe(100);
  });

  it('three-way split with rounding (33.33/33.33/33.34) on R$100', () => {
    const result = calculateSplits(100, [
      { accountId: 'a1', percentage: 33.33 },
      { accountId: 'a2', percentage: 33.33 },
      { accountId: 'a3', percentage: 33.34 },
    ]);
    expect(result).toHaveLength(3);
    const total = result.reduce((sum, s) => sum + s.amount, 0);
    expect(Math.round(total * 100) / 100).toBe(100);
  });

  it('single account with 100% on R$1000', () => {
    const result = calculateSplits(1000, [
      { accountId: 'a1', percentage: 100 },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0].amount).toBe(1000);
    expect(result[0].accountId).toBe('a1');
    expect(result[0].percentage).toBe(100);
  });

  it('rounding correction ensures total of splits always equals totalAmount', () => {
    // 3 equal parts of R$10 — each would be 3.33 without correction
    const result = calculateSplits(10, [
      { accountId: 'a1', percentage: 33.33 },
      { accountId: 'a2', percentage: 33.33 },
      { accountId: 'a3', percentage: 33.34 },
    ]);
    const total = result.reduce((sum, s) => sum + s.amount, 0);
    expect(Math.round(total * 100) / 100).toBe(10);
  });

  it('empty splits array returns empty array', () => {
    const result = calculateSplits(500, []);
    expect(result).toEqual([]);
  });

  it('preserves accountId and percentage in result', () => {
    const result = calculateSplits(200, [
      { accountId: 'acc-xyz', percentage: 60 },
      { accountId: 'acc-abc', percentage: 40 },
    ]);
    expect(result[0].accountId).toBe('acc-xyz');
    expect(result[0].percentage).toBe(60);
    expect(result[1].accountId).toBe('acc-abc');
    expect(result[1].percentage).toBe(40);
  });
});
