'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import { PAYMENT_METHOD_LABELS, PAYMENT_METHOD_COLORS } from '@distriall/shared';
import type { RouteItem as RouteItemType } from '@/hooks/use-deliveries';

interface RouteItemProps {
  item: RouteItemType;
  onRemove?: (deliveryItemId: string) => void;
  canEdit: boolean;
  dragId: string;
}

export function RouteItem({ item, onRemove, canEdit, dragId }: RouteItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: dragId,
    disabled: !canEdit,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const { client } = item;
  const fullAddress = [client.address, client.neighborhood, client.city]
    .filter(Boolean)
    .join(', ');

  const paymentLabel = item.payment_method
    ? (PAYMENT_METHOD_LABELS[item.payment_method] ?? item.payment_method)
    : null;
  const paymentColor = item.payment_method
    ? (PAYMENT_METHOD_COLORS[item.payment_method] ?? 'bg-gray-100 text-gray-800')
    : 'bg-gray-100 text-gray-800';

  const isDelivered = item.delivery_item_status === 'entregue';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start gap-3 rounded-xl border p-3 shadow-sm ${
        isDelivered ? 'bg-gray-50 border-gray-200 opacity-70' : 'bg-white border-gray-200'
      }`}
    >
      {/* Drag handle */}
      {canEdit && (
        <button
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab touch-none text-gray-400 active:cursor-grabbing"
          aria-label="Arrastar para reordenar"
        >
          <GripVertical className="size-5" />
        </button>
      )}

      {/* Sequence number */}
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {item.sequence}
      </span>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-gray-900">{item.client_name}</p>
        {fullAddress && (
          <p className="truncate text-sm text-gray-500">{fullAddress}</p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {paymentLabel && (
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${paymentColor}`}>
              {paymentLabel}
            </span>
          )}
          {item.account_name && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {item.account_name}
            </span>
          )}
          {isDelivered && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              Entregue
            </span>
          )}
        </div>
      </div>

      {/* Remove button */}
      {canEdit && onRemove && item.delivery_item_id && !isDelivered && (
        <button
          onClick={() => onRemove(item.delivery_item_id!)}
          className="ml-1 mt-0.5 rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
          aria-label="Remover da rota"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
