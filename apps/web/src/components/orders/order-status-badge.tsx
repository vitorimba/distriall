'use client';

import { ORDER_STATUS_LABELS, type OrderStatus } from '@distriall/shared';
import { StatusBadge } from '@/components/ui/status-badge';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const label = ORDER_STATUS_LABELS[status] ?? status;

  return (
    <StatusBadge tone={status} className={className}>
      {label}
    </StatusBadge>
  );
}
