import { describe, it, expect } from 'vitest';
import { calculatePurchaseFrequency } from '../calculations';

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

describe('calculatePurchaseFrequency', () => {
  it('returns novo when no orders', () => {
    const result = calculatePurchaseFrequency([]);
    expect(result.frequency).toBe('novo');
    expect(result.lastOrderDate).toBeNull();
    expect(result.daysSinceLastOrder).toBeNull();
    expect(result.avgIntervalDays).toBe(0);
  });

  it('returns novo when only 1 order', () => {
    const result = calculatePurchaseFrequency([daysAgo(5)]);
    expect(result.frequency).toBe('novo');
    expect(result.lastOrderDate).not.toBeNull();
    expect(result.daysSinceLastOrder).toBe(5);
  });

  it('classifies as semanal when avg interval <= 10 days', () => {
    const dates = [daysAgo(0), daysAgo(7), daysAgo(14), daysAgo(21)];
    const result = calculatePurchaseFrequency(dates);
    expect(result.frequency).toBe('semanal');
    expect(result.avgIntervalDays).toBe(7);
  });

  it('classifies as semanal at boundary of 10 days', () => {
    const dates = [daysAgo(0), daysAgo(10), daysAgo(20)];
    const result = calculatePurchaseFrequency(dates);
    expect(result.frequency).toBe('semanal');
    expect(result.avgIntervalDays).toBe(10);
  });

  it('classifies as quinzenal when avg interval 11-20 days', () => {
    const dates = [daysAgo(0), daysAgo(15), daysAgo(30)];
    const result = calculatePurchaseFrequency(dates);
    expect(result.frequency).toBe('quinzenal');
    expect(result.avgIntervalDays).toBe(15);
  });

  it('classifies as mensal when avg interval 21-45 days', () => {
    const dates = [daysAgo(0), daysAgo(30), daysAgo(60)];
    const result = calculatePurchaseFrequency(dates);
    expect(result.frequency).toBe('mensal');
    expect(result.avgIntervalDays).toBe(30);
  });

  it('classifies as mensal at boundary of 45 days', () => {
    const dates = [daysAgo(0), daysAgo(45), daysAgo(90)];
    const result = calculatePurchaseFrequency(dates);
    expect(result.frequency).toBe('mensal');
    expect(result.avgIntervalDays).toBe(45);
  });

  it('classifies as irregular when avg interval > 45 days', () => {
    const dates = [daysAgo(0), daysAgo(60), daysAgo(120)];
    const result = calculatePurchaseFrequency(dates);
    expect(result.frequency).toBe('irregular');
    expect(result.avgIntervalDays).toBe(60);
  });

  it('identifies the most recent order as lastOrderDate', () => {
    const newest = daysAgo(2);
    const oldest = daysAgo(20);
    const result = calculatePurchaseFrequency([oldest, newest]);
    expect(result.lastOrderDate!.getTime()).toBeCloseTo(newest.getTime(), -3);
  });

  it('correctly calculates daysSinceLastOrder', () => {
    const result = calculatePurchaseFrequency([daysAgo(3)]);
    expect(result.daysSinceLastOrder).toBe(3);
  });

  it('handles unsorted input correctly', () => {
    const dates = [daysAgo(30), daysAgo(0), daysAgo(15)];
    const result = calculatePurchaseFrequency(dates);
    expect(result.daysSinceLastOrder).toBe(0);
    expect(result.avgIntervalDays).toBe(15);
    expect(result.frequency).toBe('quinzenal');
  });
});
