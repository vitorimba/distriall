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
import { Send, Loader2, ChevronUp, ChevronDown, X } from 'lucide-react';
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
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)]">
        <span className="font-semibold text-[var(--text-primary)] text-sm">
          Rota montada ({items.length})
        </span>
        {sendButton}
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
              {items.map((item, index) => (
                <div
                  key={item.delivery_item_id ?? item.id}
                  className="flex items-center gap-3 px-4 py-3 border-t border-[var(--border-subtle)] first:border-t-0"
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
                      dragId={item.delivery_item_id ?? item.id}
                      canEdit={canEdit}
                    />
                  </div>

                  {/* Controls: chevrons + remove */}
                  {canEdit && (
                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        onClick={() => onMoveUp?.(index)}
                        disabled={index === 0}
                        className="rounded p-1 text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] disabled:opacity-30"
                        aria-label="Subir na rota"
                      >
                        <ChevronUp className="size-4" />
                      </button>
                      <button
                        onClick={() => onMoveDown?.(index)}
                        disabled={index === items.length - 1}
                        className="rounded p-1 text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] disabled:opacity-30"
                        aria-label="Descer na rota"
                      >
                        <ChevronDown className="size-4" />
                      </button>
                      {item.delivery_item_id && item.delivery_item_status !== 'entregue' && (
                        <button
                          onClick={() => onRemove(item.delivery_item_id!)}
                          className="rounded p-1 text-[var(--text-muted)] hover:bg-[var(--danger-soft)] hover:text-[var(--danger-fg)]"
                          aria-label="Remover da rota"
                        >
                          <X className="size-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
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
