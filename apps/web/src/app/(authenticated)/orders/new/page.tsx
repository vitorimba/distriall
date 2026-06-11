'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useCartStore } from '@/stores/cart-store';
import { useOrders } from '@/hooks/use-orders';
import { usePayments } from '@/hooks/use-payments';
import { useAccount } from '@/providers/account-provider';
import { ClientSearch } from '@/components/orders/client-search';
import { ProductSearch } from '@/components/orders/product-search';
import { OrderItemList } from '@/components/orders/order-item-list';
import { PaymentSelector } from '@/components/financial/payment-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import type { PaymentEntry } from '@/lib/validations/payment';
import { validatePaymentsTotal } from '@/lib/validations/payment';

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function NewOrderPage() {
  return (
    <Suspense fallback={<div className="px-4 py-4"><p>Carregando...</p></div>}>
      <NewOrderContent />
    </Suspense>
  );
}

function NewOrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedClientId = searchParams.get('client');
  const { createOrder } = useOrders();
  const { savePayments } = usePayments();
  const { activeAccount } = useAccount();
  const {
    client,
    items,
    notes,
    deliveryDate,
    setPaymentMethod,
    setNotes,
    setDeliveryDate,
    setClient,
    setPriceMap,
    clearCart,
    getSubtotal,
    getTotalCost,
    getProfit,
  } = useCartStore();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [payments, setPayments] = useState<PaymentEntry[]>([]);
  const [isMixed, setIsMixed] = useState(false);

  // Clear cart on mount for new orders, then pre-select client if provided
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!preselectedClientId || !activeAccount) return;

    async function preloadClient() {
      const supabase = createClient();
      const { data } = await supabase
        .from('clients')
        .select('id, name, default_payment_method')
        .eq('id', preselectedClientId!)
        .single();

      if (!data) return;
      setClient({ id: data.id, name: data.name, default_payment_method: data.default_payment_method });

      const { data: prices } = await supabase
        .from('client_prices')
        .select('product_variant_id, custom_price')
        .eq('client_id', preselectedClientId!);

      setPriceMap(new Map((prices ?? []).map((p) => [p.product_variant_id, p.custom_price])));
    }

    preloadClient();
  }, [preselectedClientId, activeAccount]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSave() {
    if (!client) {
      setError('Selecione um cliente');
      return;
    }
    if (items.length === 0) {
      setError('Adicione pelo menos um produto');
      return;
    }

    // Validate payments total
    const subtotalVal = getSubtotal();
    if (payments.length > 0 && isMixed) {
      const payErr = validatePaymentsTotal(payments, subtotalVal);
      if (payErr) {
        setError(payErr);
        return;
      }
    }

    setError('');
    setSaving(true);

    try {
      // Set payment method on cart store for create_order
      setPaymentMethod(isMixed ? 'misto' : (payments[0]?.method ?? ''));
      const orderId = await createOrder();

      // Save payment records
      if (activeAccount && payments.length > 0) {
        await savePayments(activeAccount.id, orderId, payments);
      }

      clearCart();
      router.push('/orders');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar pedido');
    } finally {
      setSaving(false);
    }
  }

  const subtotal = getSubtotal();
  const totalCost = getTotalCost();
  const profit = getProfit();

  return (
    <div className="px-4 py-4 pb-40 space-y-4">
      <h1 className="text-xl font-bold">Novo Pedido</h1>

      {/* Client */}
      <ClientSearch />

      {/* Product search */}
      {client && <ProductSearch />}

      {/* Items */}
      {items.length > 0 && <OrderItemList />}

      {/* Payment + Notes + Delivery */}
      {client && (
        <Card>
          <CardContent className="space-y-3 pt-4">
            <PaymentSelector
              defaultMethod={client?.default_payment_method ?? undefined}
              orderTotal={getSubtotal()}
              onChange={(p, mixed) => { setPayments(p); setIsMixed(mixed); }}
            />
            <div className="space-y-1">
              <Label>Data de Entrega</Label>
              <Input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Observacoes</Label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Observacoes do pedido..."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Sticky bottom summary */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg">
          <div className="mx-auto max-w-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatBRL(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Custo</span>
              <span>{formatBRL(totalCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Lucro estimado</span>
              <span className={profit >= 0 ? 'text-green-600 font-medium' : 'text-destructive font-medium'}>
                {formatBRL(profit)}
              </span>
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? 'Salvando...' : 'Salvar Pedido'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
