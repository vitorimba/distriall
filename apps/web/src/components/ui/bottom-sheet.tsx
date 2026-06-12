'use client'

import { useEffect, type ReactNode } from 'react'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BottomSheetItem {
  label: string
  icon?: LucideIcon
  danger?: boolean
  onClick?: () => void
}

interface BottomSheetProps {
  open: boolean
  onClose?: () => void
  title?: string
  items?: BottomSheetItem[]
  children?: ReactNode
}

export function BottomSheet({ open, onClose, title, items, children }: BottomSheetProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[var(--z-overlay)] bg-[var(--overlay-scrim)] backdrop-blur-[var(--overlay-blur)]"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.() }}
    >
      <div
        className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-[var(--surface-raised)] pb-safe animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mx-auto my-3 h-1 w-8 rounded-full bg-muted-foreground/30" />
        {title && <div className="px-5 pb-2 text-sm font-semibold text-foreground">{title}</div>}
        {items
          ? items.map((item, i) => {
              const Icon = item.icon
              return (
                <button
                  key={i}
                  className={cn(
                    'flex w-full items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-[var(--surface-hover)]',
                    item.danger ? 'text-[var(--danger-fg)]' : 'text-foreground'
                  )}
                  onClick={() => { onClose?.(); item.onClick?.() }}
                >
                  {Icon && <Icon className="size-[17px]" />}
                  {item.label}
                </button>
              )
            })
          : children}
      </div>
    </div>
  )
}
