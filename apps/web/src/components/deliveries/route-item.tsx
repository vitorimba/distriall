'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { PAYMENT_METHOD_LABELS, PAYMENT_METHOD_COLORS } from '@distriall/shared';
import type { RouteItem as RouteItemType } from '@/hooks/use-deliveries';

interface RouteItemProps {
  item: RouteItemType;
  onRemove?: (deliveryItemId: string) => void;
  canEdit: boolean;
  dragId: string;
}

export function RouteItem({ item, canEdit, dragId }: RouteItemProps) {
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
      className="flex items-start gap-2 min-w-0"
    >
      {/* Drag handle */}
      {canEdit && (
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 cursor-grab touch-none text-[var(--text-muted)] active:cursor-grabbing shrink-0"
          aria-label="Arrastar para reordenar"
        >
          <GripVertical className="size-4" />
        </button>
      )}

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-[var(--text-primary)] text-sm">{item.client_name}</p>
        {fullAddress && (
          <p className="truncate text-xs text-[var(--text-secondary)]">{fullAddress}</p>
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
    </div>
  );
}
