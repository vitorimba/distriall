'use client'

import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onClear?: () => void
}

export function SearchField({ value, onClear, className, ...rest }: SearchFieldProps) {
  return (
    <span className={cn('relative inline-flex w-full', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <input
        type="search"
        value={value}
        className={cn(
          'w-full rounded-[var(--radius-ds-md)] border border-input bg-[var(--surface-inset)] py-2 pl-9 pr-8 text-sm text-foreground placeholder:text-muted-foreground transition-colors',
          'focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] focus-visible:outline-offset-2',
          '[&::-webkit-search-cancel-button]:hidden'
        )}
        {...rest}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
          aria-label="Limpar busca"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      )}
    </span>
  )
}
