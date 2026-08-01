'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { Send, Loader2, ChevronUp, ChevronDown, X, Printer } from 'lucide-react';
import { PAYMENT_METHOD_LABELS } from '@distriall/shared';
import { RouteItem } from '@/components/deliveries/route-item';
import { RouteMapLink } from '@/components/deliveries/route-map-link';
import type { RouteItem as RouteItemType } from '@/hooks/use-deliveries';

interface RouteBuilderProps {
  items: RouteItemType[];
  canEdit: boolean;
  deliverySent: boolean;
  isSending: boolean;
  onDragEnd: (event: DragEndEvent) => void;
  onRemove: (deliveryItemId: string) => void;
  onSend: () => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
}

export function RouteBuilder({
  items,
  canEdit,
  deliverySent,
  isSending,
  onDragEnd,
  onRemove,
  onSend,
  onMoveUp,
  onMoveDown,
}: RouteBuilderProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Use delivery_item_id for existing items, order id for new (not yet sent)
  const dragIds = items.map((item) => item.delivery_item_id ?? item.id);

  function handlePrintRoute() {
    const lines = items.map((item) => {
      const addr = [item.client.address, item.client.neighborhood, item.client.city]
        .filter(Boolean)
        .join(', ');
      const payment = item.payment_method
        ? (PAYMENT_METHOD_LABELS[item.payment_method] ?? item.payment_method)
        : '';
      return `
        <tr>
          <td style="padding:2px 0;font-weight:bold">${item.sequence}. ${item.client_name}</td>
        </tr>
        <tr>
          <td style="padding:0 0 2px 12px;font-size:11px">${addr || 'Sem endereco'}</td>
        </tr>
        ${payment ? `<tr><td style="padding:0 0 6px 12px;font-size:11px">Pgto: ${payment}</td></tr>` : '<tr><td style="padding:0 0 6px"></td></tr>'}
      `;
    });

    const html = `
      <html><head><title>Lista de Rota</title>
      <style>
        @page { size: 80mm auto; margin: 2mm; }
        body { font-family: monospace; font-size: 12px; margin: 0; padding: 4px; width: 76mm; }
        h2 { text-align: center; margin: 4px 0; font-size: 14px; }
        .meta { text-align: center; font-size: 11px; margin-bottom: 8px; }
        hr { border: none; border-top: 1px dashed #000; margin: 4px 0; }
        table { width: 100%; border-collapse: collapse; }
      </style></head><body>
        <h2>LISTA DE ROTA</h2>
        <div class="meta">${new Date().toLocaleDateString('pt-BR')} - ${items.length} parada${items.length !== 1 ? 's' : ''}</div>
        <hr/>
        <table>${lines.join('')}</table>
        <hr/>
        <script>window.print();</script>
      </body></html>
    `;
    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); }
  }

  const sendButton = !deliverySent && (
    <button
      onClick={onSend}
      disabled={isSending || items.length === 0}
      className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
    >
      {isSending ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Send className="size-3.5" />
      )}
      Enviar rota
    </button>
  );

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-[var(--shadow-card)]">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)]">
        <span className="font-semibold text-[var(--text-primary)] text-sm">
          Rota montada ({items.length})
        </span>
        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <button
              onClick={handlePrintRoute}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            >
              <Printer className="size-3.5" />
              Imprimir
            </button>
          )}
          {sendButton}
        </div>
      </div>

      {/* Card body */}
      {items.length === 0 ? (
        <div className="py-10 text-center text-sm text-[var(--text-muted)] px-4">
          Adicione pedidos da lista ao lado e ordene a sequencia de entrega.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={dragIds} strategy={verticalListSortingStrategy}>
            <div>
              {items.map((item, index) => {
                const itemKey = item.delivery_item_id ?? item.id;
                const isExpanded = expandedId === itemKey;
                return (
                <div
                  key={itemKey}
                  className="flex items-center gap-3 px-4 py-3 border-t border-[var(--border-subtle)] first:border-t-0 cursor-pointer active:bg-[var(--surface-hover)]"
                  onClick={() => setExpandedId(isExpanded ? null : itemKey)}
                >
                  {/* DS sequence badge */}
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--accent-soft)',
                      color: 'var(--accent-fg)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--weight-bold)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {item.sequence}
                  </span>

                  {/* Item info via RouteItem (drag-enabled) */}
                  <div className="min-w-0 flex-1">
                    <RouteItem
                      item={item}
                      dragId={itemKey}
                      canEdit={canEdit}
                      expanded={isExpanded}
                    />
                  </div>

                  {/* Controls: chevrons + remove */}
                  {canEdit && (
                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); onMoveUp?.(index); }}
                        disabled={index === 0}
                        className="rounded p-1 text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] disabled:opacity-30"
                        aria-label="Subir na rota"
                      >
                        <ChevronUp className="size-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onMoveDown?.(index); }}
                        disabled={index === items.length - 1}
                        className="rounded p-1 text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] disabled:opacity-30"
                        aria-label="Descer na rota"
                      >
                        <ChevronDown className="size-4" />
                      </button>
                      {item.delivery_item_id && item.delivery_item_status !== 'entregue' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); onRemove(item.delivery_item_id!); }}
                          className="rounded p-1 text-[var(--text-muted)] hover:bg-[var(--danger-soft)] hover:text-[var(--danger-fg)]"
                          aria-label="Remover da rota"
                        >
                          <X className="size-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {items.length > 0 && deliverySent && (
        <div className="px-4 pb-3">
          <RouteMapLink items={items} />
        </div>
      )}
    </div>
  );
}
