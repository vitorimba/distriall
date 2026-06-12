import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type SelectOption = string | { value: string; label: string }

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: SelectOption[]
  placeholder?: string
  invalid?: boolean
}

export function Select({ options, placeholder, invalid, className, ...rest }: SelectProps) {
  return (
    <span className={cn('relative inline-flex w-full', className)}>
      <select
        className={cn(
          'w-full appearance-none rounded-[var(--radius-ds-md)] border bg-[var(--surface-inset)] px-3 py-2 pr-8 text-sm text-foreground transition-colors',
          'focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] focus-visible:outline-offset-2',
          invalid ? 'border-[var(--danger)]' : 'border-input'
        )}
        defaultValue={rest.value === undefined ? '' : undefined}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        })}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </span>
  )
}
