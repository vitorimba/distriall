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
 * Calculate margin percentage between sell price and cost price.
 * Returns null when cost is 0 or negative (cannot compute margin).
 * Formula: ((price - cost) / price) * 100
 */
export function calculateMargin(price: number, cost: number): number | null {
  if (cost <= 0 || price <= 0) return null;
  return round2(((price - cost) / price) * 100);
}

export type MarginLevel = 'negative' | 'low' | 'healthy';

/**
 * Classify margin into alert level.
 * - negative: price < cost (margin < 0)
 * - low: margin >= 0 but < 10%
 * - healthy: margin >= 10%
 */
export function getMarginLevel(price: number, cost: number): MarginLevel {
  const margin = calculateMargin(price, cost);
  if (margin === null) return 'healthy'; // no cost info, no alert
  if (margin < 0) return 'negative';
  if (margin < 10) return 'low';
  return 'healthy';
}

/**
 * Calculate cost variation percentage between old and new cost.
 * Returns absolute percentage change.
 */
export function calculateCostVariation(oldCost: number, newCost: number): number {
  if (oldCost <= 0) return 0;
  return round2(Math.abs((newCost - oldCost) / oldCost) * 100);
}

export type PurchaseFrequency = 'semanal' | 'quinzenal' | 'mensal' | 'irregular' | 'novo';

export interface PurchaseFrequencyResult {
  frequency: PurchaseFrequency;
  avgIntervalDays: number;
  lastOrderDate: Date | null;
  daysSinceLastOrder: number | null;
}

export function calculatePurchaseFrequency(orderDates: Date[]): PurchaseFrequencyResult {
  if (orderDates.length === 0) {
    return { frequency: 'novo', avgIntervalDays: 0, lastOrderDate: null, daysSinceLastOrder: null };
  }

  const sorted = [...orderDates].sort((a, b) => b.getTime() - a.getTime());
  const lastOrderDate = sorted[0];
  const daysSinceLastOrder = Math.floor((Date.now() - lastOrderDate.getTime()) / (1000 * 60 * 60 * 24));

  if (sorted.length < 2) {
    return { frequency: 'novo', avgIntervalDays: 0, lastOrderDate, daysSinceLastOrder };
  }

  const intervals: number[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const diff = Math.floor((sorted[i].getTime() - sorted[i + 1].getTime()) / (1000 * 60 * 60 * 24));
    intervals.push(diff);
  }

  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

  let frequency: PurchaseFrequency;
  if (avgInterval <= 10) frequency = 'semanal';
  else if (avgInterval <= 20) frequency = 'quinzenal';
  else if (avgInterval <= 45) frequency = 'mensal';
  else frequency = 'irregular';

  return { frequency, avgIntervalDays: Math.round(avgInterval), lastOrderDate, daysSinceLastOrder };
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
