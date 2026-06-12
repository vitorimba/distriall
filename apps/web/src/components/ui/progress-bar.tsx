import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value?: number
  max?: number
  tone?: 'accent' | 'success'
  label?: string
  className?: string
}

export function ProgressBar({ value = 0, max = 100, tone = 'accent', label, className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div
      className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      aria-label={label}
    >
      <div
        className={cn(
          'h-full rounded-full transition-all duration-300',
          tone === 'success' ? 'bg-[var(--success)]' : 'bg-primary'
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
