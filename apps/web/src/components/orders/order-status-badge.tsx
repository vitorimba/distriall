'use client';

import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, type OrderStatus } from '@distriall/shared';
import { cn } from '@/lib/utils';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const colors = ORDER_STATUS_COLORS[status] ?? ORDER_STATUS_COLORS.lancado;
  const label = ORDER_STATUS_LABELS[status] ?? status;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      {label}
    </span>
  );
}
