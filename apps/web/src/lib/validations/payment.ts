import { z } from 'zod/v4';

export const paymentEntrySchema = z.object({
  method: z.enum(['dinheiro', 'pix', 'boleto', 'vale', 'cartao']),
  amount: z.number().positive('Valor deve ser maior que 0'),
});

export type PaymentEntry = z.infer<typeof paymentEntrySchema>;

export function validatePaymentsTotal(payments: PaymentEntry[], orderTotal: number): string | null {
  const sum = payments.reduce((s, p) => s + Math.round(p.amount * 100) / 100, 0);
  const rounded = Math.round(sum * 100) / 100;
  const expected = Math.round(orderTotal * 100) / 100;
  if (rounded !== expected) {
    return `Soma dos pagamentos (R$ ${rounded.toFixed(2)}) diferente do total (R$ ${expected.toFixed(2)})`;
  }
  return null;
}
