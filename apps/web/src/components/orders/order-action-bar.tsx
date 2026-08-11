'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { type OrderStatus, VALID_TRANSITIONS } from '@distriall/shared';
import { Button } from '@/components/ui/button';
import { CheckCircle, Truck, Package, Trash2 } from 'lucide-react';

interface OrderActionBarProps {
  selectedIds: string[];
  selectedOrders: { id: string; status: OrderStatus }[];
  onDone: () => void;
}

export function OrderActionBar({ selectedIds, selectedOrders, onDone }: OrderActionBarProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  function countEligible(target: OrderStatus): number {
    return selectedOrders.filter((o) =>
      VALID_TRANSITIONS[o.status]?.includes(target)
    ).length;
  }

  const confirmCount = countEligible('confirmado');
  const loadCount = countEligible('carregado');
  const deliverCount = countEligible('entregue');
  const cancelledCount = selectedOrders.filter((o) => o.status === 'cancelado').length;
  const canConfirm = confirmCount > 0;
  const canLoad = loadCount > 0;
  const canDeliver = deliverCount > 0;
  const canDelete = cancelledCount > 0;

  async function handleBatchDelete() {
    const ids = selectedOrders.filter((o) => o.status === 'cancelado').map((o) => o.id);
    if (!confirm(`Excluir ${ids.length} pedido${ids.length !== 1 ? 's' : ''} cancelado${ids.length !== 1 ? 's' : ''}? Esta ação não pode ser desfeita.`)) return;

    setLoading(true);
    setResult(null);
    const supabase = createClient();

    let deleted = 0;
    for (const id of ids) {
      await supabase.from('order_items').delete().eq('order_id', id);
      await supabase.from('payments').delete().eq('order_id', id);
      const { error } = await supabase.from('orders').delete().eq('id', id);
      if (!error) deleted++;
    }

    setLoading(false);
    setResult(`${deleted} pedido${deleted !== 1 ? 's' : ''} excluído${deleted !== 1 ? 's' : ''}`);
    setTimeout(onDone, 1500);
  }

  async function handleBatchTransition(newStatus: OrderStatus) {
    setLoading(true);
    setResult(null);

    const supabase = createClient();
    const { data, error } = await supabase.rpc('batch_transition_status', {
      p_order_ids: selectedIds,
      p_new_status: newStatus,
    });

    setLoading(false);

    if (error) {
      setResult(`Erro: ${error.message}`);
      return;
    }

    const results = data as { id: string; success: boolean; error?: string }[];
    const successes = results.filter((r) => r.success).length;
    const failures = results.filter((r) => !r.success).length;

    if (failures === 0) {
      setResult(`${successes} pedido${successes !== 1 ? 's' : ''} atualizado${successes !== 1 ? 's' : ''}`);
    } else {
      setResult(`${successes} ok, ${failures} falha${failures !== 1 ? 's' : ''}`);
    }

    setTimeout(onDone, 1500);
  }

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-50 border-t bg-background p-3 shadow-lg animate-in slide-in-from-bottom">
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <span className="text-sm font-medium">
          {selectedIds.length} selecionado{selectedIds.length !== 1 ? 's' : ''}
        </span>
        <div className="flex flex-1 justify-end gap-2">
          {canConfirm && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBatchTransition('confirmado')}
              disabled={loading}
            >
              <CheckCircle className="mr-1 size-3.5" />
              Confirmar{confirmCount < selectedIds.length ? ` (${confirmCount})` : ''}
            </Button>
          )}
          {canLoad && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBatchTransition('carregado')}
              disabled={loading}
            >
              <Package className="mr-1 size-3.5" />
              Carregar{loadCount < selectedIds.length ? ` (${loadCount})` : ''}
            </Button>
          )}
          {canDeliver && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBatchTransition('entregue')}
              disabled={loading}
            >
              <Truck className="mr-1 size-3.5" />
              Entregar{deliverCount < selectedIds.length ? ` (${deliverCount})` : ''}
            </Button>
          )}
          {canDelete && (
            <Button
              size="sm"
              variant="outline"
              className="text-destructive border-destructive/50"
              onClick={handleBatchDelete}
              disabled={loading}
            >
              <Trash2 className="mr-1 size-3.5" />
              Excluir{cancelledCount < selectedIds.length ? ` (${cancelledCount})` : ''}
            </Button>
          )}
        </div>
      </div>
      {result && (
        <p className="mt-1 text-center text-xs text-muted-foreground">{result}</p>
      )}
    </div>
  );
}
