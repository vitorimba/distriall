import { createClient } from '@/lib/supabase/client';
import { calculateSplits } from '@distriall/shared';

interface CreateExpenseParams {
  accountId: string;
  description: string;
  amount: number;
  category: 'fixo' | 'variavel';
  type?: string;
  recurrence?: string;
  is_shared: boolean;
  expense_date: string;
  created_by: string;
  splits?: { accountId: string; percentage: number }[];
}

interface UpdateExpenseParams extends CreateExpenseParams {
  id: string;
}

export function useExpenses() {
  async function createExpense(params: CreateExpenseParams) {
    const supabase = createClient();

    const { data: expense, error } = await supabase
      .from('expenses')
      .insert({
        account_id: params.accountId,
        description: params.description,
        amount: params.amount,
        category: params.category,
        type: params.type || null,
        recurrence: params.recurrence || null,
        is_shared: params.is_shared,
        expense_date: params.expense_date,
        created_by: params.created_by,
      })
      .select()
      .single();

    if (error) throw error;

    // Insert splits for shared expenses
    if (params.is_shared && params.splits && params.splits.length > 0) {
      const calculated = calculateSplits(params.amount, params.splits);
      const splitRows = calculated.map((s) => ({
        expense_id: expense.id,
        account_id: s.accountId,
        percentage: s.percentage,
        amount: s.amount,
      }));

      const { error: splitError } = await supabase
        .from('expense_splits')
        .insert(splitRows);

      if (splitError) throw splitError;
    }

    return expense;
  }

  async function updateExpense(params: UpdateExpenseParams) {
    const supabase = createClient();

    const { error } = await supabase
      .from('expenses')
      .update({
        description: params.description,
        amount: params.amount,
        category: params.category,
        type: params.type || null,
        recurrence: params.recurrence || null,
        is_shared: params.is_shared,
        expense_date: params.expense_date,
      })
      .eq('id', params.id);

    if (error) throw error;

    // Delete old splits and insert new ones
    const { error: deleteError } = await supabase
      .from('expense_splits')
      .delete()
      .eq('expense_id', params.id);

    if (deleteError) throw deleteError;

    if (params.is_shared && params.splits && params.splits.length > 0) {
      const calculated = calculateSplits(params.amount, params.splits);
      const splitRows = calculated.map((s) => ({
        expense_id: params.id,
        account_id: s.accountId,
        percentage: s.percentage,
        amount: s.amount,
      }));

      const { error: splitError } = await supabase
        .from('expense_splits')
        .insert(splitRows);

      if (splitError) throw splitError;
    }
  }

  async function deleteExpense(expenseId: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', expenseId);

    if (error) throw error;
  }

  async function listExpenses(params: {
    accountId: string;
    dateFrom?: string;
    dateTo?: string;
    category?: string;
    type?: string;
  }) {
    const supabase = createClient();
    let query = supabase
      .from('expenses')
      .select('*, expense_splits(id, account_id, percentage, amount, accounts(name))')
      .eq('account_id', params.accountId)
      .order('expense_date', { ascending: false });

    if (params.dateFrom) {
      query = query.gte('expense_date', params.dateFrom);
    }
    if (params.dateTo) {
      query = query.lte('expense_date', params.dateTo);
    }
    if (params.category && params.category !== 'all') {
      query = query.eq('category', params.category);
    }
    if (params.type && params.type !== 'all') {
      query = query.eq('type', params.type);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  }

  async function getExpense(expenseId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('expenses')
      .select('*, expense_splits(id, account_id, percentage, amount)')
      .eq('id', expenseId)
      .single();

    if (error) throw error;
    return data;
  }

  return { createExpense, updateExpense, deleteExpense, listExpenses, getExpense };
}
