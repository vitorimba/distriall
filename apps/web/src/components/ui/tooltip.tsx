import { cn } from '@/lib/utils'

interface TooltipProps {
  label: string
  position?: 'top' | 'bottom'
  children: React.ReactNode
}

export function Tooltip({ label, position = 'top', children }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        className={cn(
          'pointer-events-none absolute left-1/2 z-[var(--z-tooltip)] -translate-x-1/2 whitespace-nowrap rounded-lg bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs font-medium text-foreground shadow-lg border border-border',
          'opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
          position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
        )}
        role="tooltip"
      >
        {label}
      </span>
    </span>
  )
}
