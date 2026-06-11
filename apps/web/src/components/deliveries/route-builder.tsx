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
import { Send, Loader2 } from 'lucide-react';
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
}

export function RouteBuilder({
  items,
  canEdit,
  deliverySent,
  isSending,
  onDragEnd,
  onRemove,
  onSend,
}: RouteBuilderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Use delivery_item_id for existing items, order id for new (not yet sent)
  const dragIds = items.map((item) => item.delivery_item_id ?? item.id);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">
          Rota ({items.length} paradas)
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">
          Adicione pedidos a rota usando o botao + abaixo
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={dragIds} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {items.map((item) => (
                <RouteItem
                  key={item.delivery_item_id ?? item.id}
                  item={item}
                  dragId={item.delivery_item_id ?? item.id}
                  canEdit={canEdit}
                  onRemove={canEdit ? onRemove : undefined}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {items.length > 0 && deliverySent && (
        <RouteMapLink items={items} />
      )}

      {!deliverySent && items.length > 0 && (
        <button
          onClick={onSend}
          disabled={isSending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {isSending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          Enviar para Entregador
        </button>
      )}
    </div>
  );
}
