import { createClient } from '@/lib/supabase/client';

export function useVouchers() {
  async function createVoucher(params: {
    accountId: string;
    paymentId: string;
    clientId: string;
    amount: number;
    dueDate?: string;
    notes?: string;
  }) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('vouchers')
      .insert({
        account_id: params.accountId,
        payment_id: params.paymentId,
        client_id: params.clientId,
        amount: params.amount,
        due_date: params.dueDate || null,
        notes: params.notes || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async function listVouchers(accountId?: string, statusFilter?: string) {
    const supabase = createClient();
    let query = supabase
      .from('vouchers')
      .select('*, clients(name)')
      .order('due_date', { ascending: true, nullsFirst: false });

    if (accountId) {
      query = query.eq('account_id', accountId);
    }
    if (statusFilter && statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async function markAsPaid(voucherId: string, paidAt?: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('vouchers')
      .update({
        status: 'pago',
        paid_at: paidAt || new Date().toISOString(),
      })
      .eq('id', voucherId);

    if (error) throw error;
  }

  async function updatePhotoUrl(voucherId: string, photoUrl: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('vouchers')
      .update({ photo_url: photoUrl })
      .eq('id', voucherId);

    if (error) throw error;
  }

  async function getClientDebt(clientId: string) {
    const supabase = createClient();

    // Vouchers pendentes
    const { data: vouchers } = await supabase
      .from('vouchers')
      .select('amount')
      .eq('client_id', clientId)
      .eq('status', 'pendente');

    const voucherDebt = (vouchers ?? []).reduce((sum: number, v: { amount: number }) => sum + Number(v.amount), 0);

    return { voucherDebt, totalDebt: voucherDebt };
  }

  return { createVoucher, listVouchers, markAsPaid, updatePhotoUrl, getClientDebt };
}
