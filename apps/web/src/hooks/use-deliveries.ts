'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface AvailableOrderClient {
  name: string;
  address: string | null;
  neighborhood: string | null;
  city: string | null;
}

export interface AvailableOrder {
  id: string;
  account_id: string;
  account_name: string;
  client_name: string;
  payment_method: string | null;
  delivery_date: string | null;
  client: AvailableOrderClient;
}

export interface RouteItem extends AvailableOrder {
  sequence: number;
  delivery_item_id?: string;
  delivery_item_status?: 'pendente' | 'entregue' | 'nao_entregue';
}

export interface DeliveryWithItems {
  id: string;
  account_id: string;
  driver_id: string;
  delivery_date: string;
  status: 'pendente' | 'em_rota' | 'concluida';
  notes: string | null;
  items: RouteItem[];
}

export function useDeliveries() {
  const [availableOrders, setAvailableOrders] = useState<AvailableOrder[]>([]);
  const [currentDelivery, setCurrentDelivery] = useState<DeliveryWithItems | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deliveryIdRef = useRef<string | null>(null);

  const fetchAvailableOrders = useCallback(async (date: string, accountIds: string[]) => {
    if (accountIds.length === 0) return;
    const supabase = createClient();
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select(`
          id,
          account_id,
          payment_method,
          delivery_date,
          accounts!inner(name),
          clients!inner(
            name,
            address,
            neighborhood,
            city
          )
        `)
        .eq('status', 'carregado')
        .in('account_id', accountIds)
        .or(`delivery_date.eq.${date},delivery_date.is.null`)
        .order('clients(name)', { ascending: true });

      if (fetchError) throw fetchError;

      const mapped: AvailableOrder[] = (data ?? []).map((row: Record<string, unknown>) => {
        const acc = row.accounts as { name: string };
        const cli = row.clients as AvailableOrderClient;
        return {
          id: row.id as string,
          account_id: row.account_id as string,
          account_name: acc.name,
          client_name: cli.name,
          payment_method: row.payment_method as string | null,
          delivery_date: row.delivery_date as string | null,
          client: cli,
        };
      });

      setAvailableOrders(mapped);
    } catch (err) {
      setError((err as Error).message || 'Erro ao carregar pedidos disponiveis');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCurrentDelivery = useCallback(async (driverId: string, date: string, accountId: string) => {
    const supabase = createClient();
    setLoading(true);
    setError(null);

    try {
      const { data: deliveries, error: deliveryError } = await supabase
        .from('deliveries')
        .select('id, account_id, driver_id, delivery_date, status, notes')
        .eq('driver_id', driverId)
        .eq('delivery_date', date)
        .eq('account_id', accountId)
        .in('status', ['pendente', 'em_rota'])
        .maybeSingle();

      if (deliveryError) throw deliveryError;

      if (!deliveries) {
        setCurrentDelivery(null);
        deliveryIdRef.current = null;
        return;
      }

      const { data: items, error: itemsError } = await supabase
        .from('delivery_items')
        .select(`
          id,
          sequence,
          status,
          order_id,
          orders!inner(
            id,
            account_id,
            payment_method,
            delivery_date,
            accounts!inner(name),
            clients!inner(
              name,
              address,
              neighborhood,
              city
            )
          )
        `)
        .eq('delivery_id', deliveries.id)
        .order('sequence', { ascending: true });

      if (itemsError) throw itemsError;

      const routeItems: RouteItem[] = (items ?? []).map((item: Record<string, unknown>) => {
        const order = item.orders as Record<string, unknown>;
        const acc = order.accounts as { name: string };
        const cli = order.clients as AvailableOrderClient;
        return {
          id: order.id as string,
          account_id: order.account_id as string,
          account_name: acc.name,
          client_name: cli.name,
          payment_method: order.payment_method as string | null,
          delivery_date: order.delivery_date as string | null,
          client: cli,
          sequence: item.sequence as number,
          delivery_item_id: item.id as string,
          delivery_item_status: item.status as 'pendente' | 'entregue' | 'nao_entregue',
        };
      });

      setCurrentDelivery({
        id: deliveries.id,
        account_id: deliveries.account_id,
        driver_id: deliveries.driver_id,
        delivery_date: deliveries.delivery_date,
        status: deliveries.status as 'pendente' | 'em_rota' | 'concluida',
        notes: deliveries.notes,
        items: routeItems,
      });

      deliveryIdRef.current = deliveries.id;
    } catch (err) {
      setError((err as Error).message || 'Erro ao carregar rota atual');
    } finally {
      setLoading(false);
    }
  }, []);

  async function createDelivery(params: {
    accountId: string;
    driverId: string;
    date: string;
    routeItems: AvailableOrder[];
  }) {
    const supabase = createClient();

    const { data: delivery, error: createError } = await supabase
      .from('deliveries')
      .insert({
        account_id: params.accountId,
        driver_id: params.driverId,
        delivery_date: params.date,
        status: 'pendente',
      })
      .select('id')
      .single();

    if (createError) throw createError;

    const deliveryItems = params.routeItems.map((order, index) => ({
      delivery_id: delivery.id,
      order_id: order.id,
      sequence: index + 1,
      status: 'pendente',
    }));

    const { error: itemsError } = await supabase
      .from('delivery_items')
      .insert(deliveryItems);

    if (itemsError) throw itemsError;

    return delivery.id;
  }

  async function addItemToDelivery(deliveryId: string, order: AvailableOrder, sequence: number) {
    const supabase = createClient();

    const { error } = await supabase
      .from('delivery_items')
      .insert({
        delivery_id: deliveryId,
        order_id: order.id,
        sequence,
        status: 'pendente',
      });

    if (error) throw error;
  }

  async function removeItemFromDelivery(deliveryItemId: string) {
    const supabase = createClient();

    const { error } = await supabase
      .from('delivery_items')
      .delete()
      .eq('id', deliveryItemId);

    if (error) throw error;
  }

  async function reorderDeliveryItems(deliveryId: string, orderedItems: Array<{ id: string; sequence: number }>) {
    const supabase = createClient();

    const updates = orderedItems.map(({ id, sequence }) =>
      supabase
        .from('delivery_items')
        .update({ sequence })
        .eq('id', id)
        .eq('delivery_id', deliveryId)
    );

    const results = await Promise.all(updates);
    const firstError = results.find((r) => r.error)?.error;
    if (firstError) throw firstError;
  }

  return {
    availableOrders,
    currentDelivery,
    loading,
    error,
    fetchAvailableOrders,
    fetchCurrentDelivery,
    createDelivery,
    addItemToDelivery,
    removeItemFromDelivery,
    reorderDeliveryItems,
  };
}

export function useDeliveryRealtime(deliveryId: string | null, onUpdate: () => void) {
  const callbackRef = useRef(onUpdate);

  useEffect(() => {
    callbackRef.current = onUpdate;
  });

  useEffect(() => {
    if (!deliveryId) return;

    const supabase = createClient();
    const channel = supabase
      .channel(`delivery-items-${deliveryId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'delivery_items',
          filter: `delivery_id=eq.${deliveryId}`,
        },
        () => { callbackRef.current(); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [deliveryId]);
}
