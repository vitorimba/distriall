'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCartStore, type CartItem } from '@/stores/cart-store';
import { useOrders } from '@/hooks/use-orders';
import { ClientSearch } from '@/components/orders/client-search';
import { ProductSearch } from '@/components/orders/product-search';
import { OrderItemList } from '@/components/orders/order-item-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field } from '@/components/ui/field';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Money } from '@/components/ui/money';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditOrderPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getOrder, updateOrder } = useOrders();
  const {
    client,
    items,
    paymentMethod,
    notes,
    deliveryDate,
    setPaymentMethod,
    setNotes,
    setDeliveryDate,
    loadOrder,
    clearCart,
    getSubtotal,
    getTotalCost,
    getProfit,
  } = useCartStore();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const order = await getOrder(id);
        if (!order) {
          setError('Pedido nao encontrado');
          setLoading(false);
          return;
        }

        if (order.status === 'entregue' || order.status === 'cancelado') {
          setError(`Pedido com status "${order.status}" nao pode ser editado`);
          setLoading(false);
          return;
        }

        const clientData = order.clients as unknown as {
          id: string;
          name: string;
          default_payment_method: string | null;
        };

        const orderItems = (order.order_items as unknown as {
          product_variant_id: string;
          product_name: string;
          variant_name: string;
          quantity: number;
          unit_price: number;
          cost_price: number;
        }[]).map((oi): CartItem => ({
          variantId: oi.product_variant_id,
          productName: oi.product_name,
          variantName: oi.variant_name,
          quantity: oi.quantity,
          unitPrice: oi.unit_price,
          costPrice: oi.cost_price,
        }));

        loadOrder(
          clientData,
          orderItems,
          order.payment_method ?? '',
          order.notes ?? '',
          order.delivery_date ?? ''
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar pedido');
      } finally {
        setLoading(false);
      }
    }

    clearCart();
    load();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSave() {
    if (!client || items.length === 0) {
      setError('Cliente e pelo menos um produto sao obrigatorios');
      return;
    }

    setError('');
    setSaving(true);

    try {
      await updateOrder(id);
      clearCart();
      router.push('/orders');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar pedido');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="px-4 py-4 space-y-4">
        <Skeleton variant="line" className="h-8 w-40" />
        <Skeleton variant="rect" className="h-12" />
        <Skeleton variant="rect" className="h-48" />
        <Skeleton variant="rect" className="h-32" />
      </div>
    );
  }

  if (error && !client) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        {error}
      </div>
    );
  }

  const subtotal = getSubtotal();
  const totalCost = getTotalCost();
  const profit = getProfit();

  return (
    <div className="px-4 py-4 pb-40 space-y-4">
      <PageHeader title="Editar pedido" onBack={() => router.back()} />

      <ClientSearch />

      {client && <ProductSearch />}

      {items.length > 0 && <OrderItemList />}

      {client && (
        <Card>
          <CardContent className="space-y-3 pt-4">
            <Field label="Forma de Pagamento">
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Nenhuma</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="pix">Pix</option>
                <option value="boleto">Boleto</option>
                <option value="vale">Vale</option>
                <option value="cartao">Cartao</option>
                <option value="misto">Misto</option>
              </select>
            </Field>
            <Field label="Data de Entrega">
              <Input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </Field>
            <Field label="Observacoes">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Observacoes do pedido..."
              />
            </Field>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg">
          <div className="mx-auto max-w-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium"><Money value={subtotal} /></span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Custo</span>
              <span><Money value={totalCost} /></span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Lucro estimado</span>
              <Money value={profit} signed />
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? 'Atualizando...' : 'Atualizar Pedido'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
