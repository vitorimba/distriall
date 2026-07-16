import { createClient } from '@/lib/supabase/client';
import type { PaymentEntry } from '@/lib/validations/payment';

export function usePayments() {
  async function savePayments(
    accountId: string,
    orderId: string,
    payments: PaymentEntry[]
  ) {
    const supabase = createClient();

    // Delete existing payments for this order
    await supabase.from('payments').delete().eq('order_id', orderId);

    // Insert new payments
    const rows = payments.map((p) => ({
      account_id: accountId,
      order_id: orderId,
      method: p.method,
      amount: p.amount,
      is_third_party: p.method === 'boleto',
    }));

    const { data, error } = await supabase.from('payments').insert(rows).select();
    if (error) throw error;
    return data;
  }

  async function getPayments(orderId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at');

    if (error) throw error;
    return data ?? [];
  }

  return { savePayments, getPayments };
}
