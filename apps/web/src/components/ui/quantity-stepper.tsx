'use client'

import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuantityStepperProps {
  value?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  size?: 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export function QuantityStepper({
  value = 1,
  min = 1,
  max = 9999,
  onChange,
  size = 'md',
  disabled = false,
  className,
}: QuantityStepperProps) {
  const set = (v: number) => {
    if (disabled) return
    const n = Math.min(max, Math.max(min, v))
    onChange?.(n)
  }

  const btnSize = size === 'lg' ? 'size-11' : 'size-8'
  const inputSize = size === 'lg' ? 'h-11 w-14 text-base' : 'h-8 w-10 text-sm'

  return (
    <span className={cn('inline-flex items-center rounded-[var(--radius-ds-md)] border border-input', className)}>
      <button
        type="button"
        disabled={disabled || value <= min}
        onClick={() => set(value - 1)}
        aria-label="Diminuir"
        className={cn(
          'inline-flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40',
          btnSize
        )}
      >
        <Minus className="size-3.5" aria-hidden="true" />
      </button>
      <input
        type="number"
        className={cn(
          'num border-x border-input bg-transparent text-center text-foreground outline-none focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] focus-visible:outline-offset-2',
          '[&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden',
          inputSize
        )}
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(e) => set(Number(e.target.value) || min)}
      />
      <button
        type="button"
        disabled={disabled || value >= max}
        onClick={() => set(value + 1)}
        aria-label="Aumentar"
        className={cn(
          'inline-flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40',
          btnSize
        )}
      >
        <Plus className="size-3.5" aria-hidden="true" />
      </button>
    </span>
  )
}
