'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cart-store';
import { useOrders } from '@/hooks/use-orders';
import { ClientSearch } from '@/components/orders/client-search';
import { ProductSearch } from '@/components/orders/product-search';
import { OrderItemList } from '@/components/orders/order-item-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function NewOrderPage() {
  const router = useRouter();
  const { createOrder } = useOrders();
  const {
    client,
    items,
    paymentMethod,
    notes,
    deliveryDate,
    setPaymentMethod,
    setNotes,
    setDeliveryDate,
    clearCart,
    getSubtotal,
    getTotalCost,
    getProfit,
  } = useCartStore();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Clear cart on mount for new orders
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  async function handleSave() {
    if (!client) {
      setError('Selecione um cliente');
      return;
    }
    if (items.length === 0) {
      setError('Adicione pelo menos um produto');
      return;
    }

    setError('');
    setSaving(true);

    try {
      await createOrder();
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
            <div className="space-y-1">
              <Label>Forma de Pagamento</Label>
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
            </div>
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
