'use client'

import { cn } from '@/lib/utils'

type RadioOption = string | { value: string; label: string; disabled?: boolean }

interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  name?: string
  direction?: 'column' | 'row'
  className?: string
}

export function RadioGroup({ options, value, onChange, name, direction = 'column', className }: RadioGroupProps) {
  return (
    <div
      className={cn(
        'flex gap-3',
        direction === 'column' ? 'flex-col' : 'flex-row flex-wrap',
        className
      )}
      role="radiogroup"
    >
      {options.map((opt) => {
        const o = typeof opt === 'string' ? { value: opt, label: opt } : opt
        const isChecked = value === o.value
        return (
          <label
            key={o.value}
            className={cn(
              'inline-flex items-center gap-2 text-sm cursor-pointer select-none',
              o.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <span
              className={cn(
                'flex size-4 items-center justify-center rounded-full border-2 transition-colors',
                isChecked ? 'border-primary' : 'border-input'
              )}
            >
              {isChecked && <span className="size-2 rounded-full bg-primary" />}
            </span>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={isChecked}
              disabled={o.disabled}
              onChange={() => onChange?.(o.value)}
              className="sr-only"
            />
            {o.label}
          </label>
        )
      })}
    </div>
  )
}
