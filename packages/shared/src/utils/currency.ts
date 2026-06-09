/**
 * Format a number as Brazilian Real (BRL) currency.
 * @example formatBRL(1234.5) => "R$ 1.234,50"
 */
export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
