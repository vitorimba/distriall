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
