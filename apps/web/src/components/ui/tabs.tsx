'use client'

import { cn } from '@/lib/utils'

type Tab = string | { id: string; label: string }

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange?: (id: string) => void
  className?: string
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-1 border-b border-border', className)} role="tablist">
      {tabs.map((tab) => {
        const t = typeof tab === 'string' ? { id: tab, label: tab } : tab
        const isActive = t.id === active
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={isActive}
            className={cn(
              'relative px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => onChange?.(t.id)}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
