import { createClient } from '@/lib/supabase/client';
import type { Settlement } from '@distriall/shared';

export interface SettlementOrderRow {
  id: string;
  order_id: string;
  orders: {
    id: string;
    order_number: number;
    total: number;
    total_cost: number;
    status: string;
    created_at: string;
    clients: { name: string } | null;
  } | null;
}

export interface SettlementExpenseRow {
  id: string;
  expense_id: string;
  amount: number;
  expenses: {
    id: string;
    description: string;
    amount: number;
    category: string;
    is_shared: boolean;
    expense_date: string;
  } | null;
}

interface GenerateSettlementParams {
  accountId: string;
  periodStart: string;
  periodEnd: string;
}

export function useSettlements() {
  async function generateSettlement(params: GenerateSettlementParams): Promise<Settlement> {
    const res = await fetch('/api/settlements/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        account_id: params.accountId,
        period_start: params.periodStart,
        period_end: params.periodEnd,
      }),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? 'Erro ao gerar acerto');
    return json.settlement as Settlement;
  }

  async function closeSettlement(settlementId: string): Promise<Settlement> {
    const res = await fetch(`/api/settlements/${settlementId}/close`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? 'Erro ao fechar acerto');
    return json.settlement as Settlement;
  }

  async function updateSettlementStatus(
    settlementId: string,
    status: 'rascunho' | 'conferido'
  ): Promise<Settlement> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('settlements')
      .update({ status })
      .eq('id', settlementId)
      .select('*')
      .single();

    if (error) throw error;
    return data as Settlement;
  }

  async function listSettlements(params: {
    accountId: string;
    status?: string;
    periodStart?: string;
    periodEnd?: string;
  }): Promise<Settlement[]> {
    const supabase = createClient();
    let query = supabase
      .from('settlements')
      .select('*')
      .eq('account_id', params.accountId)
      .order('period_start', { ascending: false });

    if (params.status && params.status !== 'all') {
      query = query.eq('status', params.status);
    }
    if (params.periodStart) {
      query = query.gte('period_start', params.periodStart);
    }
    if (params.periodEnd) {
      query = query.lte('period_end', params.periodEnd);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []) as Settlement[];
  }

  async function getSettlement(settlementId: string) {
    const supabase = createClient();

    const [settlementRes, ordersRes, expensesRes] = await Promise.all([
      supabase.from('settlements').select('*').eq('id', settlementId).single(),
      supabase
        .from('settlement_orders')
        .select(
          'id, order_id, orders(id, order_number, total, total_cost, status, created_at, clients(name))'
        )
        .eq('settlement_id', settlementId),
      supabase
        .from('settlement_expenses')
        .select(
          'id, expense_id, amount, expenses(id, description, amount, category, is_shared, expense_date)'
        )
        .eq('settlement_id', settlementId),
    ]);

    if (settlementRes.error) throw settlementRes.error;
    if (ordersRes.error) throw ordersRes.error;
    if (expensesRes.error) throw expensesRes.error;

    return {
      settlement: settlementRes.data as Settlement,
      orders: (ordersRes.data ?? []) as unknown as SettlementOrderRow[],
      expenses: (expensesRes.data ?? []) as unknown as SettlementExpenseRow[],
    };
  }

  async function deleteSettlement(settlementId: string): Promise<void> {
    const supabase = createClient();
    const { error } = await supabase
      .from('settlements')
      .delete()
      .eq('id', settlementId);

    if (error) throw error;
  }

  return {
    generateSettlement,
    closeSettlement,
    updateSettlementStatus,
    listSettlements,
    getSettlement,
    deleteSettlement,
  };
}
