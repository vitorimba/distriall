'use client'

import { Plus, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FABProps {
  icon?: LucideIcon
  label: string
  onClick?: () => void
  className?: string
}

export function FAB({ icon: Icon = Plus, label, onClick, className }: FABProps) {
  return (
    <button
      className={cn(
        'fixed bottom-20 right-4 z-[var(--z-fab)] flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform active:scale-95 md:hidden',
        'hover:shadow-[var(--shadow-accent)]',
        className
      )}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <Icon className="size-6" />
    </button>
  )
}
