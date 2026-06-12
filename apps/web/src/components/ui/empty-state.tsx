'use client'

import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  error?: boolean
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  error = false,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <span
        className={cn(
          'mb-4 flex size-14 items-center justify-center rounded-2xl',
          error
            ? 'bg-[var(--danger-soft)] text-[var(--danger-fg)]'
            : 'bg-muted text-muted-foreground'
        )}
      >
        <Icon className="size-7" strokeWidth={1.6} />
      </span>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description && (
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button
          variant={error ? 'outline' : 'default'}
          size="sm"
          onClick={onAction}
          className="mt-4"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
