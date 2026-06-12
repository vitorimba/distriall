import { cn } from "@/lib/utils"

interface StickyBarItem {
  label: string
  value: string
  highlight?: boolean
}

interface StickyBarProps {
  items: StickyBarItem[]
  action?: React.ReactNode
  className?: string
}

export function StickyBar({ items, action, className }: StickyBarProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-[var(--z-sticky)] flex items-center justify-between gap-4 border-t border-border px-[var(--page-pad)] py-3',
        'bg-[var(--surface-glass)] backdrop-blur-[12px]',
        className
      )}
    >
      <div className="flex items-center gap-6">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-xs text-muted-foreground">{item.label}</span>
            <span
              className={cn(
                'num text-sm font-semibold',
                item.highlight ? 'text-[var(--accent-fg)]' : 'text-foreground'
              )}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
