export interface SettlementInput {
  total_revenue: number;
  total_cost: number;
  total_expenses: number;
  total_returns: number;
  revenue_dinheiro: number;
  revenue_pix: number;
  revenue_boleto: number;
  revenue_vale: number;
  revenue_cartao: number;
}

export interface SettlementResult {
  gross_profit: number;
  net_profit: number;
  total_revenue: number;
  revenue_breakdown: {
    dinheiro: number;
    pix: number;
    boleto: number;
    vale: number;
    cartao: number;
  };
}

/**
 * Calculate settlement totals from raw inputs.
 * gross_profit = total_revenue - total_cost
 * net_profit   = gross_profit - total_expenses - total_returns
 */
export function calculateSettlement(input: SettlementInput): SettlementResult {
  const gross_profit = round2(input.total_revenue - input.total_cost);
  const net_profit = round2(gross_profit - input.total_expenses - input.total_returns);
  return {
    gross_profit,
    net_profit,
    total_revenue: input.total_revenue,
    revenue_breakdown: {
      dinheiro: input.revenue_dinheiro,
      pix: input.revenue_pix,
      boleto: input.revenue_boleto,
      vale: input.revenue_vale,
      cartao: input.revenue_cartao,
    },
  };
}

/**
 * Validate that revenue breakdown by payment method sums correctly.
 * Returns true if the sum of breakdown values equals total_revenue (within floating point tolerance).
 */
export function validateRevenueBreakdown(
  total_revenue: number,
  breakdown: { dinheiro: number; pix: number; boleto: number; vale: number; cartao: number }
): boolean {
  const sum = round2(
    breakdown.dinheiro + breakdown.pix + breakdown.boleto + breakdown.vale + breakdown.cartao
  );
  return Math.abs(sum - total_revenue) < 0.02;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Calculate expense splits with rounding adjustment.
 * The last split absorbs any rounding difference to ensure
 * the sum of split amounts equals the total amount exactly.
 */
export function calculateSplits(
  totalAmount: number,
  splits: { accountId: string; percentage: number }[]
): { accountId: string; percentage: number; amount: number }[] {
  const result = splits.map((s) => ({
    accountId: s.accountId,
    percentage: s.percentage,
    amount: Math.round((totalAmount * s.percentage / 100) * 100) / 100,
  }));

  // Adjust last split for rounding difference
  const sumAmounts = result.reduce((sum, s) => sum + s.amount, 0);
  const diff = Math.round((totalAmount - sumAmounts) * 100) / 100;
  if (diff !== 0 && result.length > 0) {
    result[result.length - 1].amount += diff;
  }

  return result;
}
