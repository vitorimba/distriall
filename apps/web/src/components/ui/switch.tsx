'use client'

import { cn } from '@/lib/utils'

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function Switch({ label, disabled, className, ...rest }: SwitchProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 text-sm cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span className="relative inline-flex">
        <input
          type="checkbox"
          role="switch"
          disabled={disabled}
          className="peer absolute inset-0 size-full cursor-pointer appearance-none disabled:cursor-not-allowed"
          {...rest}
        />
        <span className="flex h-5 w-9 items-center rounded-full bg-input transition-colors peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus-ring)] peer-focus-visible:outline-offset-2">
          <span className="size-3.5 translate-x-0.5 rounded-full bg-foreground shadow transition-transform peer-checked:translate-x-4 peer-checked:bg-primary-foreground" />
        </span>
      </span>
      {label && <span>{label}</span>}
    </label>
  )
}
