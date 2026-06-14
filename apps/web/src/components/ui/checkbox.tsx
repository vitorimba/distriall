'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function Checkbox({ label, disabled, className, ...rest }: CheckboxProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 text-sm cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span className="relative flex size-4 items-center justify-center">
        <input
          type="checkbox"
          disabled={disabled}
          className="peer absolute inset-0 size-full cursor-pointer appearance-none rounded border border-input bg-[var(--surface-inset)] transition-colors checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] focus-visible:outline-offset-2 disabled:cursor-not-allowed"
          {...rest}
        />
        <Check className="pointer-events-none relative size-3 text-primary-foreground opacity-0 peer-checked:opacity-100" strokeWidth={3} aria-hidden="true" />
      </span>
      {label && <span>{label}</span>}
    </label>
  )
}
