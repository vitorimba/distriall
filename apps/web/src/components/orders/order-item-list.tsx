'use client';

import { useState, useRef, useEffect } from 'react';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { Money } from '@/components/ui/money';

function InlineInput({
  value,
  onConfirm,
  onCancel,
  inputMode = 'numeric',
  min,
  className,
}: {
  value: number;
  onConfirm: (val: number) => void;
  onCancel: () => void;
  inputMode?: 'numeric' | 'decimal';
  min?: number;
  className?: string;
}) {
  const [text, setText] = useState(String(value));
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  function handleConfirm() {
    const parsed = Number(text.replace(',', '.'));
    if (!isNaN(parsed) && (min === undefined || parsed >= min)) {
      onConfirm(parsed);
    } else {
      onCancel();
    }
  }

  return (
    <input
      ref={ref}
      type="text"
      inputMode={inputMode}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={handleConfirm}
      onKeyDown={(e) => {
        if (e.key === 'Enter') { e.preventDefault(); handleConfirm(); }
        if (e.key === 'Escape') { e.preventDefault(); onCancel(); }
      }}
      className={[
        'w-full rounded-[var(--radius-ds-sm)] border border-[var(--accent)] bg-[var(--surface-inset)] px-2 py-1 text-center text-sm tabular-nums text-foreground',
        'focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-1',
        'motion-reduce:transition-none',
        className,
      ].join(' ')}
      style={{ transitionDuration: 'var(--duration-fast)' }}
    />
  );
}

export function OrderItemList() {
  const { items, updateQuantity, updatePrice, removeItem } = useCartStore();
  const [editingQty, setEditingQty] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<string | null>(null);

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
        const isQtyEditing = editingQty === item.variantId;
        const isPriceEditing = editingPrice === item.variantId;
        const priceWasEdited = item.originalPrice != null && item.originalPrice !== item.unitPrice;

        return (
          <div
            key={item.variantId}
            className="flex items-center gap-2 rounded-lg border px-3 py-2"
          >
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{item.productName}</div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>{item.variantName}</span>
                <span>·</span>
                {isPriceEditing ? (
                  <InlineInput
                    value={item.unitPrice}
                    inputMode="decimal"
                    min={0.01}
                    onConfirm={(val) => {
                      updatePrice(item.variantId, val);
                      setEditingPrice(null);
                    }}
                    onCancel={() => setEditingPrice(null)}
                    className="max-w-[80px]"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setEditingPrice(item.variantId)}
                    className="inline-flex items-center gap-1 rounded px-0.5 min-h-[var(--touch-target)] hover:bg-[var(--surface-hover)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                    title="Editar preco"
                  >
                    {priceWasEdited && (
                      <span className="text-[var(--text-secondary)] line-through" style={{ fontSize: 'var(--fs-xs)' }}>
                        <Money value={item.originalPrice!} />
                      </span>
                    )}
                    <Money
                      value={item.unitPrice}
                      className={priceWasEdited ? 'font-medium text-[var(--accent-fg)]' : ''}
                    />
                  </button>
                )}
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

              {isQtyEditing ? (
                <InlineInput
                  value={item.quantity}
                  inputMode="numeric"
                  min={0}
                  onConfirm={(val) => {
                    if (val <= 0) {
                      removeItem(item.variantId);
                    } else {
                      updateQuantity(item.variantId, val);
                    }
                    setEditingQty(null);
                  }}
                  onCancel={() => setEditingQty(null)}
                  className="w-14"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setEditingQty(item.variantId)}
                  className="flex w-10 items-center justify-center rounded-md text-sm font-medium min-h-[var(--touch-target)] hover:bg-[var(--surface-hover)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  title="Editar quantidade"
                >
                  {item.quantity}
                </button>
              )}

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
