'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useCartStore } from '@/stores/cart-store';
import { useOrders } from '@/hooks/use-orders';
import { usePayments } from '@/hooks/use-payments';
import { useAccount } from '@/providers/account-provider';
import { ClientSearch } from '@/components/orders/client-search';
import { ProductCatalog } from '@/components/orders/product-catalog';
import { ClientRecentOrders } from '@/components/orders/client-recent-orders';
import { AddressSelector } from '@/components/orders/address-selector';
import { OrderItemList } from '@/components/orders/order-item-list';
import { PaymentSelector } from '@/components/financial/payment-selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Alert } from '@/components/ui/alert';
import { useToast } from '@/components/ui/toast';
import { StickyBar } from '@/components/ui/sticky-bar';
import { Money } from '@/components/ui/money';
import type { PaymentEntry } from '@/lib/validations/payment';
import { validatePaymentsTotal } from '@/lib/validations/payment';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { Repeat2 } from 'lucide-react';

export default function NewOrderPage() {
  return (
    <Suspense fallback={
      <div className="px-4 py-4 space-y-4">
        <Skeleton variant="line" className="h-8 w-32" />
        <Skeleton variant="rect" className="h-12" />
        <Skeleton variant="rect" className="h-12" />
      </div>
    }>
      <NewOrderContent />
    </Suspense>
  );
}

function NewOrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedClientId = searchParams.get('client');
  const exchangeId = searchParams.get('exchange_id');
  const exchangeCredit = searchParams.get('credit') ? Number(searchParams.get('credit')) : null;
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

  const toast = useToast();
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

      // Link to exchange if this is a replacement order
      if (exchangeId) {
        const supabase = createClient();
        await supabase.rpc('link_exchange_order', {
          p_exchange_id: exchangeId,
          p_order_id: orderId,
        });
      }

      clearCart();
      toast(exchangeId ? 'Pedido de troca salvo' : 'Pedido salvo', 'success');
      router.push(`/orders/${orderId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : (err as { message?: string })?.message ?? 'Erro ao salvar pedido';
      console.error('Erro ao salvar pedido:', err);
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  const subtotal = getSubtotal();
  const totalCost = getTotalCost();
  const profit = getProfit();

  return (
    <div className="px-4 py-4 pb-40 space-y-4">
      <PageHeader title={exchangeId ? 'Pedido de troca' : 'Novo pedido'} onBack={() => router.back()} />

      {/* Exchange credit badge */}
      {exchangeId && exchangeCredit != null && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-50 px-3 py-2">
          <Repeat2 className="size-4 text-amber-600 shrink-0" />
          <div className="text-sm">
            <span className="font-medium text-amber-700">Troca em andamento</span>
            <span className="text-amber-600"> · Credito: </span>
            <Money value={exchangeCredit} className="font-medium text-amber-700" />
          </div>
        </div>
      )}

      {/* Client */}
      <ClientSearch />

      {/* Delivery address */}
      {client && <AddressSelector clientId={client.id} />}

      {/* Recent orders from this client */}
      {client && <ClientRecentOrders clientId={client.id} />}

      {/* Product catalog */}
      {client && <ProductCatalog />}

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
            <Field label="Data de entrega">
              <Input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </Field>
            <Field label="Observacoes">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Observacoes do pedido..."
              />
            </Field>
          </CardContent>
        </Card>
      )}

      {/* Error */}
      {error && <Alert tone="danger">{error}</Alert>}

      {/* Sticky bottom summary */}
      {items.length > 0 && (
        <StickyBar
          items={[
            { label: 'Subtotal', value: <Money value={subtotal} /> },
            { label: 'Custo', value: <Money value={totalCost} /> },
            { label: 'Lucro est.', value: <Money value={profit} signed />, highlight: profit >= 0 },
          ]}
          action={
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar pedido'}
            </Button>
          }
        />
      )}
    </div>
  );
}
