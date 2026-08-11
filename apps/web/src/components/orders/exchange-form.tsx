'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Minus, Plus, X } from 'lucide-react';
import { Money } from '@/components/ui/money';

interface OrderItemForExchange {
  id: string;
  product_name: string;
  variant_name: string;
  quantity: number;
  returned_quantity: number;
  unit_price: number;
}

interface ExchangeFormProps {
  orderId: string;
  clientId: string;
  items: OrderItemForExchange[];
  onClose: () => void;
  onExchangeCreated: () => void;
}

export function ExchangeForm({ orderId, clientId, items, onClose, onExchangeCreated }: ExchangeFormProps) {
  const router = useRouter();
  const [returnQtys, setReturnQtys] = useState<Record<string, number>>({});
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const availableItems = items.filter((i) => i.quantity - i.returned_quantity > 0);

  function getReturnQty(itemId: string): number {
    return returnQtys[itemId] ?? 0;
  }

  function setQty(itemId: string, qty: number) {
    setReturnQtys((prev) => ({ ...prev, [itemId]: qty }));
  }

  const totalCreditValue = availableItems.reduce((sum, item) => {
    const qty = getReturnQty(item.id);
    return sum + Math.round(qty * item.unit_price * 100) / 100;
  }, 0);

  const hasSelection = Object.values(returnQtys).some((q) => q > 0);

  async function handleSubmit() {
    if (!hasSelection) {
      setError('Selecione pelo menos um item para trocar');
      return;
    }
    if (reason.trim().length < 5) {
      setError('Motivo deve ter pelo menos 5 caracteres');
      return;
    }

    setError('');
    setSaving(true);

    const exchangeItems = Object.entries(returnQtys)
      .filter(([, qty]) => qty > 0)
      .map(([order_item_id, returned_quantity]) => ({
        order_item_id,
        returned_quantity,
      }));

    const supabase = createClient();
    const { data, error: rpcError } = await supabase.rpc('create_exchange', {
      p_order_id: orderId,
      p_items: JSON.stringify(exchangeItems),
      p_reason: reason.trim(),
    });

    setSaving(false);

    if (rpcError) {
      setError(rpcError.message);
      return;
    }

    const result = data as { exchange_id: string; credit_amount: number };

    onExchangeCreated();
    onClose();

    // Redirect to new order page with exchange context
    router.push(`/orders/new?client=${clientId}&exchange_id=${result.exchange_id}&credit=${result.credit_amount}`);
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-background shadow-xl animate-in slide-in-from-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>

        <div className="flex items-center justify-between px-4 pb-2">
          <h2 className="text-lg font-bold">Registrar Troca</h2>
          <button onClick={onClose}><X className="size-5 text-muted-foreground" /></button>
        </div>

        <div className="space-y-4 px-4 pb-6">
          <p className="text-sm text-muted-foreground">
            Selecione os itens que o cliente está devolvendo. Você será redirecionado para criar o novo pedido de troca.
          </p>

          {/* Items */}
          <div className="space-y-2">
            {availableItems.map((item) => {
              const available = item.quantity - item.returned_quantity;
              const qty = getReturnQty(item.id);
              return (
                <div key={item.id} className="rounded-lg border p-3">
                  <div className="text-sm font-medium">{item.product_name}</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {item.variant_name} · Qtd original: {item.quantity}
                    {item.returned_quantity > 0 && ` · Já devolvido: ${item.returned_quantity}`}
                    {' '}· Disponível: {available}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Devolver:</span>
                    <button
                      onClick={() => setQty(item.id, Math.max(0, qty - 1))}
                      className="flex size-10 items-center justify-center rounded-md border hover:bg-muted"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{qty}</span>
                    <button
                      onClick={() => setQty(item.id, Math.min(available, qty + 1))}
                      className="flex size-10 items-center justify-center rounded-md border hover:bg-muted"
                    >
                      <Plus className="size-4" />
                    </button>
                    {qty > 0 && (
                      <span className="ml-auto text-sm font-medium text-amber-600">
                        <Money value={qty * item.unit_price} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reason */}
          <div className="space-y-1">
            <Label>Motivo da troca *</Label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Ex: produto errado, danificado, cliente quer outro sabor"
            />
          </div>

          {/* Credit summary */}
          {hasSelection && (
            <div className="rounded-md border border-amber-500/30 bg-amber-50 p-3 text-sm">
              <div className="flex justify-between font-medium text-amber-700">
                <span>Crédito de troca:</span>
                <span><Money value={totalCreditValue} /></span>
              </div>
              <p className="text-xs text-amber-600 mt-1">
                Este valor será exibido como referência no novo pedido.
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={saving || !hasSelection}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
            >
              {saving ? 'Processando...' : 'Confirmar e criar pedido'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
