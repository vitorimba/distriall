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
import { useState, useCallback } from 'react';
import { Send, Loader2, ChevronUp, ChevronDown, X, Printer, Copy } from 'lucide-react';
import { RouteItem } from '@/components/deliveries/route-item';
import { RouteMapLink } from '@/components/deliveries/route-map-link';
import { RoutePrintView } from '@/components/deliveries/route-print-view';
import { formatRouteAsText } from '@/lib/delivery-utils';
import type { RouteItem as RouteItemType } from '@/hooks/use-deliveries';

interface RouteBuilderProps {
  items: RouteItemType[];
  canEdit: boolean;
  deliverySent: boolean;
  isSending: boolean;
  driverName: string;
  date: string;
  onDragEnd: (event: DragEndEvent) => void;
  onRemove: (deliveryItemId: string) => void;
  onSend: () => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  onToast?: (message: string, type?: 'success' | 'danger') => void;
}

export function RouteBuilder({
  items,
  canEdit,
  deliverySent,
  isSending,
  driverName,
  date,
  onDragEnd,
  onRemove,
  onSend,
  onMoveUp,
  onMoveDown,
  onToast,
}: RouteBuilderProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (items.length === 0) return;
    const text = formatRouteAsText(items, driverName, date);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for non-HTTPS contexts
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (!ok) {
        onToast?.('Erro ao copiar lista', 'danger');
        return;
      }
    }
    setCopied(true);
    onToast?.('Lista copiada!', 'success');
    setTimeout(() => setCopied(false), 2000);
  }, [items, driverName, date, onToast]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Use delivery_item_id for existing items, order id for new (not yet sent)
  const dragIds = items.map((item) => item.delivery_item_id ?? item.id);

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
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)] print:hidden">
        <span className="font-semibold text-[var(--text-primary)] text-sm">
          Rota montada ({items.length})
        </span>
        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                aria-label="Copiar rota"
              >
                <Copy className="size-3.5" />
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
                aria-label="Imprimir rota"
              >
                <Printer className="size-3.5" />
                Imprimir
              </button>
            </>
          )}
          {sendButton}
        </div>
      </div>

      {/* Card body */}
      {items.length === 0 ? (
        <div className="py-10 text-center text-sm text-[var(--text-muted)] px-4 print:hidden">
          Adicione pedidos da lista ao lado e ordene a sequência de entrega.
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
        <div className="px-4 pb-3 print:hidden">
          <RouteMapLink items={items} />
        </div>
      )}

      {/* Print-only view */}
      {items.length > 0 && (
        <RoutePrintView items={items} driverName={driverName} date={date} />
      )}
    </div>
  );
}
