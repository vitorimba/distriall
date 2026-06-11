import { describe, it, expect } from 'vitest';
import { calculateSettlement, validateRevenueBreakdown } from '../calculations';

describe('calculateSettlement', () => {
  it('calculates gross and net profit correctly', () => {
    const result = calculateSettlement({
      total_revenue: 1000,
      total_cost: 600,
      total_expenses: 100,
      total_returns: 50,
      revenue_dinheiro: 400,
      revenue_pix: 300,
      revenue_boleto: 200,
      revenue_vale: 50,
      revenue_cartao: 50,
    });

    expect(result.gross_profit).toBe(400); // 1000 - 600
    expect(result.net_profit).toBe(250);   // 400 - 100 - 50
    expect(result.total_revenue).toBe(1000);
  });

  it('net profit is zero when expenses and returns equal gross profit', () => {
    const result = calculateSettlement({
      total_revenue: 500,
      total_cost: 300,
      total_expenses: 150,
      total_returns: 50,
      revenue_dinheiro: 500,
      revenue_pix: 0,
      revenue_boleto: 0,
      revenue_vale: 0,
      revenue_cartao: 0,
    });

    expect(result.gross_profit).toBe(200);
    expect(result.net_profit).toBe(0);
  });

  it('net profit can be negative (prejuizo)', () => {
    const result = calculateSettlement({
      total_revenue: 100,
      total_cost: 80,
      total_expenses: 50,
      total_returns: 0,
      revenue_dinheiro: 100,
      revenue_pix: 0,
      revenue_boleto: 0,
      revenue_vale: 0,
      revenue_cartao: 0,
    });

    expect(result.gross_profit).toBe(20);
    expect(result.net_profit).toBe(-30);
  });

  it('handles zero values (empty period)', () => {
    const result = calculateSettlement({
      total_revenue: 0,
      total_cost: 0,
      total_expenses: 0,
      total_returns: 0,
      revenue_dinheiro: 0,
      revenue_pix: 0,
      revenue_boleto: 0,
      revenue_vale: 0,
      revenue_cartao: 0,
    });

    expect(result.gross_profit).toBe(0);
    expect(result.net_profit).toBe(0);
  });

  it('revenue breakdown is included in result', () => {
    const result = calculateSettlement({
      total_revenue: 1000,
      total_cost: 0,
      total_expenses: 0,
      total_returns: 0,
      revenue_dinheiro: 300,
      revenue_pix: 400,
      revenue_boleto: 200,
      revenue_vale: 50,
      revenue_cartao: 50,
    });

    expect(result.revenue_breakdown.dinheiro).toBe(300);
    expect(result.revenue_breakdown.pix).toBe(400);
    expect(result.revenue_breakdown.boleto).toBe(200);
    expect(result.revenue_breakdown.vale).toBe(50);
    expect(result.revenue_breakdown.cartao).toBe(50);
  });
});

describe('validateRevenueBreakdown', () => {
  it('returns true when breakdown sums to total_revenue', () => {
    const valid = validateRevenueBreakdown(1000, {
      dinheiro: 300,
      pix: 400,
      boleto: 200,
      vale: 50,
      cartao: 50,
    });
    expect(valid).toBe(true);
  });

  it('returns false when breakdown does not sum to total_revenue', () => {
    const invalid = validateRevenueBreakdown(1000, {
      dinheiro: 300,
      pix: 400,
      boleto: 200,
      vale: 50,
      cartao: 0, // missing 50
    });
    expect(invalid).toBe(false);
  });

  it('returns true for all-zero breakdown with zero total', () => {
    const valid = validateRevenueBreakdown(0, {
      dinheiro: 0,
      pix: 0,
      boleto: 0,
      vale: 0,
      cartao: 0,
    });
    expect(valid).toBe(true);
  });

  it('rateio de gastos shared: only account split amount is used', () => {
    // Simulate: shared expense of R$300 split 60/40
    // account A gets 60% = R$180, account B gets 40% = R$120
    // The settlement for A should only count R$180, not R$300
    const sharedExpenseTotal = 300;
    const splitPercentageA = 0.60;
    const amountForA = Math.round(sharedExpenseTotal * splitPercentageA * 100) / 100;
    expect(amountForA).toBe(180);

    // Verify settlement with only split amount
    const result = calculateSettlement({
      total_revenue: 500,
      total_cost: 200,
      total_expenses: amountForA, // 180, not 300
      total_returns: 0,
      revenue_dinheiro: 500,
      revenue_pix: 0,
      revenue_boleto: 0,
      revenue_vale: 0,
      revenue_cartao: 0,
    });

    expect(result.net_profit).toBe(120); // 300 gross - 180 expenses
  });
});
