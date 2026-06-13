'use client';
import React from 'react';
import { type OrderStatus, ORDER_STATUS_LABELS } from '@distriall/shared';

const FLOW: OrderStatus[] = ['lancado', 'confirmado', 'carregado', 'entregue'];

export function OrderStatusStepper({ status }: { status: OrderStatus }) {
  const idx = FLOW.indexOf(status);
  const isCancelled = status === 'cancelado';

  return (
    <div className="flex items-center gap-1.5 flex-wrap py-2">
      {FLOW.map((s, i) => (
        <React.Fragment key={s}>
          <div className="flex flex-col items-center gap-1">
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                background:
                  !isCancelled && i <= idx ? 'var(--accent)' : 'var(--border-strong)',
                outline:
                  !isCancelled && i === idx
                    ? '3px solid var(--accent-soft-border)'
                    : 'none',
              }}
            />
            <span
              className={`text-[10px] ${
                !isCancelled && i === idx
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {ORDER_STATUS_LABELS[s]}
            </span>
          </div>
          {i < FLOW.length - 1 && (
            <span
              style={{
                width: 26,
                height: 2,
                borderRadius: 2,
                background:
                  !isCancelled && i < idx ? 'var(--accent)' : 'var(--border-strong)',
                marginBottom: 14,
              }}
            />
          )}
        </React.Fragment>
      ))}
      {isCancelled && (
        <span className="text-[10px] text-destructive ml-2 font-medium">Cancelado</span>
      )}
    </div>
  );
}
