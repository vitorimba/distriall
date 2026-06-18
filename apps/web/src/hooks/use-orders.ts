import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { useCartStore } from '@/stores/cart-store';

export function useOrders() {
  const { activeAccount } = useAccount();

  async function createOrder() {
    const { client, items, paymentMethod, notes, deliveryDate } = useCartStore.getState();

    if (!activeAccount || !client || items.length === 0) {
      throw new Error('Dados incompletos para criar pedido');
    }

    const supabase = createClient();
    const { data, error } = await supabase.rpc('create_order', {
      p_account_id: activeAccount.id,
      p_client_id: client.id,
      p_items: items.map((i) => ({ variant_id: i.variantId, quantity: i.quantity })),
      p_payment_method: paymentMethod || null,
      p_notes: notes || null,
      p_delivery_date: deliveryDate || null,
    });

    if (error) throw error;
    return data as string;
  }

  async function updateOrder(orderId: string) {
    const { client, items, paymentMethod, notes, deliveryDate } = useCartStore.getState();

    if (!client || items.length === 0) {
      throw new Error('Dados incompletos para atualizar pedido');
    }

    const supabase = createClient();
    const { data, error } = await supabase.rpc('update_order', {
      p_order_id: orderId,
      p_client_id: client.id,
      p_items: items.map((i) => ({ variant_id: i.variantId, quantity: i.quantity })),
      p_payment_method: paymentMethod || null,
      p_notes: notes || null,
      p_delivery_date: deliveryDate || null,
    });

    if (error) throw error;
    return data as string;
  }

  async function getOrder(orderId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*, clients(id, name, default_payment_method), order_items(*)')
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  }

  async function listOrders() {
    if (!activeAccount) return [];

    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*, clients(name), order_items(count)')
      .eq('account_id', activeAccount.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  return { createOrder, updateOrder, getOrder, listOrders };
}
