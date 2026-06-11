'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

export interface DeliveryOrderItem {
  id: string;
  product_name: string;
  variant_name: string | null;
  quantity: number;
}

export interface DeliveryClient {
  name: string;
  address: string | null;
  neighborhood: string | null;
  city: string | null;
}

export interface DeliveryOrder {
  id: string;
  status: string;
  payment_method: string | null;
  client: DeliveryClient;
  items: DeliveryOrderItem[];
}

export interface DeliveryItem {
  id: string;
  sequence: number;
  status: 'pendente' | 'entregue' | 'nao_entregue';
  observation: string | null;
  delivered_at: string | null;
  order: DeliveryOrder;
  delivery: {
    id: string;
    delivery_date: string;
    driver_id: string;
  };
}

export function useDriverDeliveries(userId: string | undefined) {
  const [items, setItems] = useState<DeliveryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // deliveryId used for scoped realtime subscription on delivery_items
  const [deliveryId, setDeliveryId] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const fetchDeliveries = useCallback(async () => {
    if (!userId) return;
    const supabase = createClient();
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('delivery_items')
        .select(`
          id,
          sequence,
          status,
          observation,
          delivered_at,
          order:orders!inner(
            id,
            status,
            payment_method,
            client:clients!inner(
              name,
              address,
              neighborhood,
              city
            ),
            items:order_items(
              id,
              product_name,
              variant_name,
              quantity
            )
          ),
          delivery:deliveries!inner(
            id,
            delivery_date,
            driver_id
          )
        `)
        .eq('delivery.driver_id', userId)
        .eq('delivery.delivery_date', today)
        .order('sequence', { ascending: true });

      if (fetchError) throw fetchError;

      const fetchedItems = (data ?? []) as unknown as DeliveryItem[];
      setItems(fetchedItems);
      // Capture deliveryId for scoped realtime subscription
      if (fetchedItems.length > 0 && fetchedItems[0].delivery?.id) {
        setDeliveryId(fetchedItems[0].delivery.id);
      }
    } catch (err) {
      setError((err as Error).message || 'Erro ao carregar entregas');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [userId, today]);

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => { if (!cancelled) fetchDeliveries(); }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, [fetchDeliveries]);

  // Scoped realtime subscription: only listen to delivery_items of THIS driver's delivery
  const refetchRef = useRef(fetchDeliveries);
  refetchRef.current = fetchDeliveries;

  useEffect(() => {
    if (!userId || !deliveryId) return;

    const supabase = createClient();
    const channel = supabase
      .channel(`driver-delivery-items-${deliveryId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'delivery_items',
          filter: `delivery_id=eq.${deliveryId}`,
        },
        () => { refetchRef.current(); }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'deliveries',
          filter: `driver_id=eq.${userId}`,
        },
        () => { refetchRef.current(); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId, deliveryId]);

  async function markDelivered(itemId: string, orderId: string, observation?: string) {
    const supabase = createClient();

    const { error: itemError } = await supabase
      .from('delivery_items')
      .update({
        status: 'entregue',
        delivered_at: new Date().toISOString(),
        observation: observation ?? null,
      })
      .eq('id', itemId);

    if (itemError) throw itemError;

    const { error: orderError } = await supabase
      .from('orders')
      .update({
        status: 'entregue',
        delivered_at: new Date().toISOString(),
      })
      .eq('id', orderId);

    if (orderError) throw orderError;

    await fetchDeliveries();
  }

  return { items, loading, error, refetch: fetchDeliveries, markDelivered };
}
