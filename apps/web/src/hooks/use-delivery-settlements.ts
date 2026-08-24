'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface DeliverySettlement {
  id: string;
  account_id: string;
  delivery_id: string;
  settled_by: string;
  settled_at: string;
  status: 'aberto' | 'fechado';
  cash_expected: number;
  cash_received: number;
  vouchers_expected: number;
  vouchers_returned: number;
  has_discrepancy: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SettlementItemRow {
  id: string;
  settlement_id: string;
  order_id: string;
  payment_method: string | null;
  expected_amount: number;
  received_amount: number | null;
  voucher_returned: boolean;
  boleto_returned: boolean;
  check_number: string | null;
  check_amount: number | null;
  status: 'pendente' | 'conferido' | 'divergencia';
  notes: string | null;
}

export interface DeliveryOrderForSettlement {
  order_id: string;
  order_number: number;
  client_name: string;
  payment_method: string | null;
  total: number;
  delivery_item_status: string;
}

export function useDeliverySettlements() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch the delivery for a given driver+date+account, including its items with order details.
   */
  const fetchDeliveryOrders = useCallback(async (
    driverId: string,
    date: string,
    accountId: string
  ): Promise<{ deliveryId: string; orders: DeliveryOrderForSettlement[] } | null> => {
    const supabase = createClient();
    setLoading(true);
    setError(null);

    try {
      // Find the delivery for this driver+date
      const { data: delivery, error: delError } = await supabase
        .from('deliveries')
        .select('id')
        .eq('driver_id', driverId)
        .eq('delivery_date', date)
        .eq('account_id', accountId)
        .maybeSingle();

      if (delError) throw delError;
      if (!delivery) return null;

      // Get delivery items with order data
      const { data: items, error: itemsError } = await supabase
        .from('delivery_items')
        .select(`
          id,
          status,
          order_id,
          orders!inner(
            id,
            order_number,
            total,
            payment_method,
            clients!inner(name)
          )
        `)
        .eq('delivery_id', delivery.id)
        .order('sequence', { ascending: true });

      if (itemsError) throw itemsError;

      const orders: DeliveryOrderForSettlement[] = (items ?? []).map((item: Record<string, unknown>) => {
        const order = item.orders as Record<string, unknown>;
        const client = order.clients as { name: string };
        return {
          order_id: order.id as string,
          order_number: order.order_number as number,
          client_name: client.name,
          payment_method: order.payment_method as string | null,
          total: Number(order.total) || 0,
          delivery_item_status: item.status as string,
        };
      });

      return { deliveryId: delivery.id, orders };
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Check if a settlement already exists for a delivery
   */
  const fetchExistingSettlement = useCallback(async (
    deliveryId: string
  ): Promise<{ settlement: DeliverySettlement; items: SettlementItemRow[] } | null> => {
    const supabase = createClient();

    const { data: settlement, error: settError } = await supabase
      .from('delivery_settlements')
      .select('*')
      .eq('delivery_id', deliveryId)
      .maybeSingle();

    if (settError) throw settError;
    if (!settlement) return null;

    const { data: items, error: itemsError } = await supabase
      .from('settlement_items')
      .select('*')
      .eq('settlement_id', settlement.id);

    if (itemsError) throw itemsError;

    return {
      settlement: settlement as DeliverySettlement,
      items: (items ?? []) as SettlementItemRow[],
    };
  }, []);

  /**
   * Create or update a settlement (Fechar Acerto)
   */
  async function closeSettlement(params: {
    accountId: string;
    deliveryId: string;
    items: Array<{
      order_id: string;
      payment_method: string | null;
      expected_amount: number;
      received_amount: number | null;
      voucher_returned: boolean;
      boleto_returned: boolean;
      check_number: string | null;
      check_amount: number | null;
    }>;
    notes: string;
    existingSettlementId?: string;
  }): Promise<DeliverySettlement> {
    const supabase = createClient();

    // Calculate totals
    let cashExpected = 0;
    let cashReceived = 0;
    let vouchersExpected = 0;
    let vouchersReturned = 0;
    let hasDiscrepancy = false;

    for (const item of params.items) {
      const method = (item.payment_method ?? '').toLowerCase();

      if (method === 'dinheiro') {
        cashExpected += item.expected_amount;
        cashReceived += Number(item.received_amount) || 0;
        if (Math.abs(item.expected_amount - (Number(item.received_amount) || 0)) > 0.01) {
          hasDiscrepancy = true;
        }
      }

      if (method === 'vale') {
        vouchersExpected += 1;
        if (item.voucher_returned) vouchersReturned += 1;
        else hasDiscrepancy = true;
      }

      if (method === 'boleto' && !item.boleto_returned) {
        hasDiscrepancy = true;
      }

      if (method === 'cheque') {
        if (!item.check_number || (Number(item.check_amount) || 0) !== item.expected_amount) {
          hasDiscrepancy = true;
        }
      }
    }

    let settlementId = params.existingSettlementId;

    if (settlementId) {
      // Update existing settlement
      const { data, error: updError } = await supabase
        .from('delivery_settlements')
        .update({
          status: 'fechado',
          cash_expected: cashExpected,
          cash_received: cashReceived,
          vouchers_expected: vouchersExpected,
          vouchers_returned: vouchersReturned,
          has_discrepancy: hasDiscrepancy,
          notes: params.notes || null,
        })
        .eq('id', settlementId)
        .select('*')
        .single();

      if (updError) throw updError;

      // Delete old items and re-insert
      await supabase.from('settlement_items').delete().eq('settlement_id', settlementId);

      const itemRows = params.items.map((item) => {
        const method = (item.payment_method ?? '').toLowerCase();
        let status: 'pendente' | 'conferido' | 'divergencia' = 'conferido';

        if (method === 'dinheiro' && Math.abs(item.expected_amount - (Number(item.received_amount) || 0)) > 0.01) {
          status = 'divergencia';
        }
        if (method === 'vale' && !item.voucher_returned) status = 'divergencia';
        if (method === 'boleto' && !item.boleto_returned) status = 'divergencia';
        if (method === 'cheque' && (!item.check_number || (Number(item.check_amount) || 0) !== item.expected_amount)) {
          status = 'divergencia';
        }

        return {
          settlement_id: settlementId!,
          order_id: item.order_id,
          payment_method: item.payment_method,
          expected_amount: item.expected_amount,
          received_amount: item.received_amount,
          voucher_returned: item.voucher_returned,
          boleto_returned: item.boleto_returned,
          check_number: item.check_number,
          check_amount: item.check_amount,
          status,
        };
      });

      const { error: insError } = await supabase.from('settlement_items').insert(itemRows);
      if (insError) throw insError;

      return data as DeliverySettlement;
    } else {
      // Create new settlement
      const { data, error: insError } = await supabase
        .from('delivery_settlements')
        .insert({
          account_id: params.accountId,
          delivery_id: params.deliveryId,
          status: 'fechado',
          cash_expected: cashExpected,
          cash_received: cashReceived,
          vouchers_expected: vouchersExpected,
          vouchers_returned: vouchersReturned,
          has_discrepancy: hasDiscrepancy,
          notes: params.notes || null,
        })
        .select('*')
        .single();

      if (insError) throw insError;

      const itemRows = params.items.map((item) => {
        const method = (item.payment_method ?? '').toLowerCase();
        let status: 'pendente' | 'conferido' | 'divergencia' = 'conferido';

        if (method === 'dinheiro' && Math.abs(item.expected_amount - (Number(item.received_amount) || 0)) > 0.01) {
          status = 'divergencia';
        }
        if (method === 'vale' && !item.voucher_returned) status = 'divergencia';
        if (method === 'boleto' && !item.boleto_returned) status = 'divergencia';
        if (method === 'cheque' && (!item.check_number || (Number(item.check_amount) || 0) !== item.expected_amount)) {
          status = 'divergencia';
        }

        return {
          settlement_id: data.id,
          order_id: item.order_id,
          payment_method: item.payment_method,
          expected_amount: item.expected_amount,
          received_amount: item.received_amount,
          voucher_returned: item.voucher_returned,
          boleto_returned: item.boleto_returned,
          check_number: item.check_number,
          check_amount: item.check_amount,
          status,
        };
      });

      const { error: itemsError } = await supabase.from('settlement_items').insert(itemRows);
      if (itemsError) throw itemsError;

      return data as DeliverySettlement;
    }
  }

  /**
   * List past settlements for an account, with optional date filter
   */
  const listSettlements = useCallback(async (params: {
    accountId: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<DeliverySettlement[]> => {
    const supabase = createClient();

    let query = supabase
      .from('delivery_settlements')
      .select('*')
      .eq('account_id', params.accountId)
      .order('settled_at', { ascending: false });

    if (params.dateFrom) {
      query = query.gte('settled_at', params.dateFrom + 'T00:00:00');
    }
    if (params.dateTo) {
      query = query.lte('settled_at', params.dateTo + 'T23:59:59');
    }

    const { data, error: queryError } = await query;
    if (queryError) throw queryError;

    return (data ?? []) as DeliverySettlement[];
  }, []);

  return {
    loading,
    error,
    fetchDeliveryOrders,
    fetchExistingSettlement,
    closeSettlement,
    listSettlements,
  };
}
