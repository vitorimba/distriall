'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useLoadingStore } from '@/stores/loading-store';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { X, Printer, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Money } from '@/components/ui/money';

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const ACCOUNT_COLORS: Record<string, string> = {
  rp: 'bg-blue-500',
  ti: 'bg-purple-500',
  vo: 'bg-orange-500',
};

interface LoadingBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onMarked: () => void;
}

export function LoadingBottomSheet({ open, onClose, onMarked }: LoadingBottomSheetProps) {
  const { selectedIds, consolidatedProducts, summary, orders, deselectAll } = useLoadingStore();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'quantity' | 'name'>('quantity');

  const selectedOrders = orders.filter((o) => selectedIds.has(o.id));

  const sortedProducts = [...consolidatedProducts].sort((a, b) =>
    sortBy === 'quantity'
      ? b.totalQuantity - a.totalQuantity
      : a.productName.localeCompare(b.productName) || a.variantName.localeCompare(b.variantName)
  );

  async function handleMarkLoaded() {
    if (selectedIds.size === 0) return;
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.rpc('batch_transition_status', {
      p_order_ids: [...selectedIds],
      p_new_status: 'carregado',
    });

    setLoading(false);

    if (!error) {
      const count = selectedIds.size;
      toast(`${count} pedido${count !== 1 ? 's' : ''} marcado${count !== 1 ? 's' : ''} como carregado`, 'success');
      deselectAll();
      onMarked();
      onClose();
    }
  }

  function handlePrint() {
    // Fallback: open printable HTML view
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const date = new Date().toLocaleDateString('pt-BR');
    const rows = sortedProducts.map((p) =>
      `<tr><td>${p.productName} ${p.variantName}</td><td style="text-align:right;font-weight:bold">${p.totalQuantity}</td></tr>`
    ).join('');

    const accountRows = summary?.accountBreakdown.map((a) =>
      `<tr><td>[${a.slug.toUpperCase()}]</td><td style="text-align:right">${formatBRL(a.revenue)} (${a.orderCount} ped)</td></tr>`
    ).join('') ?? '';

    printWindow.document.write(`
      <html><head><title>Lista de Carregamento</title>
      <style>body{font-family:monospace;max-width:400px;margin:0 auto;padding:16px}
      table{width:100%;border-collapse:collapse}td{padding:2px 4px}
      hr{border:none;border-top:1px dashed #ccc}h2,h3{margin:8px 0}</style></head>
      <body>
        <h2 style="text-align:center">LISTA DE CARREGAMENTO</h2>
        <p style="text-align:center">${date}</p>
        <p>${summary?.orderCount ?? 0} pedidos | ${summary?.accountCount ?? 0} contas</p>
        <hr>
        <table><tr><th style="text-align:left">PRODUTO</th><th style="text-align:right">QTD</th></tr>
        ${rows}</table>
        <hr>
        <p>Fat: ${formatBRL(summary?.totalRevenue ?? 0)}</p>
        <p>Lucro: ${formatBRL(summary?.totalProfit ?? 0)}</p>
        <hr>
        <table>${accountRows}</table>
        <script>window.print()</script>
      </body></html>
    `);
    printWindow.document.close();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Sheet */}
      <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] flex flex-col rounded-t-2xl bg-background shadow-xl animate-in slide-in-from-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Close */}
        <div className="flex items-center justify-between px-4 pb-2 shrink-0">
          <h2 className="text-lg font-bold">Lista de Carregamento</h2>
          <button onClick={onClose}><X className="size-5 text-muted-foreground" /></button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto min-h-0 space-y-4 px-4">
          {/* Section 1: Products */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold uppercase text-muted-foreground">Produtos para Separar</h3>
              <button
                onClick={() => setSortBy(sortBy === 'quantity' ? 'name' : 'quantity')}
                className="text-xs text-primary"
              >
                Ordenar: {sortBy === 'quantity' ? 'Qtd' : 'Nome'}
              </button>
            </div>
            <div className="rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-3 py-1.5 text-left font-normal text-xs">Produto</th>
                    <th className="px-3 py-1.5 text-right font-normal text-xs">Qtd</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((p) => (
                    <tr key={`${p.productName}|${p.variantName}`} className="border-t">
                      <td className="px-3 py-1.5">
                        {p.productName} <span className="text-muted-foreground">{p.variantName}</span>
                      </td>
                      <td className="px-3 py-1.5 text-right font-bold">{p.totalQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Financial Summary */}
          {summary && (
            <div>
              <h3 className="text-sm font-bold uppercase text-muted-foreground mb-2">Resumo Financeiro</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Faturamento</span>
                  <span className="font-medium"><Money value={summary.totalRevenue} /></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Custo mercadoria</span>
                  <span><Money value={summary.totalCost} /></span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lucro bruto</span>
                  <Money value={summary.totalProfit} signed className="font-medium" />
                </div>
              </div>

              {/* Per account */}
              <div className="mt-3 space-y-1">
                <h4 className="text-xs font-medium text-muted-foreground">Por conta:</h4>
                {summary.accountBreakdown.map((a) => {
                  const slug = a.slug.toLowerCase();
                  const color = ACCOUNT_COLORS[slug] ?? 'bg-gray-500';
                  return (
                    <div key={a.slug} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5">
                        <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white uppercase', color)}>
                          {a.slug}
                        </span>
                        {a.accountName}
                      </span>
                      <span><Money value={a.revenue} /> ({a.orderCount} ped)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 3: Included Orders */}
          <div className="pb-2">
            <h3 className="text-sm font-bold uppercase text-muted-foreground mb-2">
              Pedidos Incluidos ({selectedOrders.length})
            </h3>
            <div className="space-y-0.5">
              {selectedOrders.map((o) => {
                const slug = o.account_slug?.toLowerCase() ?? '';
                const color = ACCOUNT_COLORS[slug] ?? 'bg-gray-500';
                return (
                  <div key={o.id} className="flex items-center gap-2 text-sm py-0.5">
                    <span className={cn('rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white uppercase', color)}>
                      {o.account_slug}
                    </span>
                    <span className="flex-1 truncate">{o.client_name}</span>
                    <Money value={o.total} className="font-medium" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions — pinned at bottom */}
        <div className="shrink-0 flex gap-2 px-4 py-3 pb-safe border-t bg-background">
          <Button variant="outline" onClick={handlePrint} className="flex-1">
            <Printer className="mr-1.5 size-4" />
            Imprimir Lista
          </Button>
          <Button onClick={handleMarkLoaded} disabled={loading} className="flex-1 bg-green-600 hover:bg-green-700">
            <Truck className="mr-1.5 size-4" />
            {loading ? 'Marcando...' : 'Marcar Carregado'}
          </Button>
        </div>
      </div>
    </div>
  );
}
