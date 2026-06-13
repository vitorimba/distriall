'use client';

import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { Money } from '@/components/ui/money';

export function OrderItemList() {
  const { items, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-muted-foreground">
        Nenhum produto adicionado.
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const lineTotal = Math.round(item.quantity * item.unitPrice * 100) / 100;
        return (
          <div
            key={item.variantId}
            className="flex items-center gap-2 rounded-lg border px-3 py-2"
          >
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{item.productName}</div>
              <div className="text-xs text-muted-foreground">
                {item.variantName} · <Money value={item.unitPrice} />
              </div>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                className="flex size-10 items-center justify-center rounded-md border hover:bg-muted active:bg-muted/80"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                className="flex size-10 items-center justify-center rounded-md border hover:bg-muted active:bg-muted/80"
              >
                <Plus className="size-4" />
              </button>
            </div>

            {/* Line total */}
            <div className="w-20 text-right text-sm font-medium">
              <Money value={lineTotal} />
            </div>

            {/* Remove */}
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => removeItem(item.variantId)}
            >
              <X className="size-3.5 text-destructive" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
