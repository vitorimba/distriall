'use client';

import { useState } from 'react';
import { usePickingList } from '@/hooks/use-picking-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Money } from '@/components/ui/money';
import { useToast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { ClipboardCopy, Printer, Package } from 'lucide-react';
import { usePrinter } from '@/hooks/use-printer';
import type { ConsolidatedProduct, LoadingSummary } from '@/lib/utils/loading-consolidation';

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

function formatPickingText(items: { product_name: string; variant_name: string; total_quantity: number; unit_cost: number; total_cost: number }[]) {
  const lines = ['PICKING LIST - CARREGAMENTO', ''];
  for (const item of items) {
    const label = item.variant_name ? `${item.product_name} (${item.variant_name})` : item.product_name;
    lines.push(`${label} x ${item.total_quantity} = R$ ${item.total_cost.toFixed(2)}`);
  }
  const totalQty = items.reduce((s, i) => s + i.total_quantity, 0);
  const totalCost = items.reduce((s, i) => s + i.total_cost, 0);
  lines.push('');
  lines.push(`TOTAL: ${items.length} produtos, ${totalQty} unidades, R$ ${totalCost.toFixed(2)}`);
  return lines.join('\n');
}

export default function PickingListPage() {
  const router = useRouter();
  const toast = useToast();
  const [date, setDate] = useState(todayISO());
  const { items, loading, error } = usePickingList(date);
  const { printLoadingList, isPrinting } = usePrinter();

  const totalQty = items.reduce((s, i) => s + i.total_quantity, 0);
  const totalCost = items.reduce((s, i) => s + i.total_cost, 0);

  async function handleShare() {
    const text = formatPickingText(items);
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch { /* fallback to clipboard */ }
    }
    await navigator.clipboard.writeText(text);
    toast('Picking list copiada!', 'success');
  }

  async function handlePrint() {
    const products: ConsolidatedProduct[] = items.map((i) => ({
      productName: i.product_name,
      variantName: i.variant_name,
      totalQuantity: i.total_quantity,
    }));
    const summary: LoadingSummary = {
      totalRevenue: 0,
      totalCost,
      totalProfit: 0,
      orderCount: items.reduce((s, i) => s + i.order_count, 0),
      accountCount: 1,
      accountBreakdown: [],
    };
    await printLoadingList(products, summary);
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader title="Picking List" onBack={() => router.back()} />

      {/* Date selector */}
      <Card>
        <CardContent className="py-3">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Data:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="space-y-2">
          <Skeleton variant="rect" className="h-12" />
          <Skeleton variant="rect" className="h-12" />
          <Skeleton variant="rect" className="h-12" />
        </div>
      ) : error ? (
        <Card><CardContent className="py-6 text-center text-sm text-destructive">{error}</CardContent></Card>
      ) : items.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhum pedido confirmado"
          description={`Nao ha pedidos confirmados para ${new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')}.`}
        />
      ) : (
        <>
          {/* Summary */}
          <Card>
            <CardContent className="py-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{items.length} produtos</span>
                <span className="text-muted-foreground">{totalQty} unidades</span>
                <span className="font-medium">Total: <Money value={totalCost} /></span>
              </div>
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Produtos para carregar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {items.map((item) => (
                  <div key={item.product_variant_id} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{item.product_name}</div>
                      {item.variant_name && (
                        <div className="text-xs text-muted-foreground">{item.variant_name}</div>
                      )}
                      <div className="text-xs text-muted-foreground">
                        {item.order_count} {item.order_count === 1 ? 'pedido' : 'pedidos'} · Custo unit.: <Money value={item.unit_cost} />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium tabular-nums">x {item.total_quantity}</div>
                      <div className="text-xs text-muted-foreground"><Money value={item.total_cost} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <ClipboardCopy className="mr-1 size-3.5" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint} disabled={isPrinting}>
              <Printer className="mr-1 size-3.5" />
              {isPrinting ? 'Imprimindo...' : 'Imprimir'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
