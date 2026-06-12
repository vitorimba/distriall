'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpen?: number | null
  className?: string
}

export function Accordion({ items, defaultOpen = null, className }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen)

  return (
    <div className={className}>
      {items.map((item, i) => (
        <div key={i} className={cn(i > 0 && 'border-t border-border')}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-[var(--surface-hover)]"
          >
            <span className="flex-1">{item.title}</span>
            <ChevronDown
              className={cn(
                'size-4 text-muted-foreground transition-transform',
                open === i && 'rotate-180'
              )}
            />
          </button>
          {open === i && (
            <div className="px-4 pb-3 text-sm leading-relaxed text-muted-foreground">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
