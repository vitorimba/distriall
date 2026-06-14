'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

function pageList(page: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (page <= 4) return [1, 2, 3, 4, 5, '…', total]
  if (page >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '…', page - 1, page, page + 1, '…', total]
}

interface PaginationProps {
  page?: number
  totalPages?: number
  totalItems?: number
  pageSize?: number
  onChange?: (page: number) => void
  label?: string
  className?: string
}

export function Pagination({
  page = 1,
  totalPages,
  totalItems,
  pageSize = 25,
  onChange,
  label = 'itens',
  className,
}: PaginationProps) {
  const total = totalPages || Math.max(1, Math.ceil((totalItems || 0) / pageSize))
  const go = (p: number) => onChange?.(Math.min(total, Math.max(1, p)))

  const summary = totalItems
    ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, totalItems)} de ${totalItems.toLocaleString('pt-BR')} ${label}`
    : `Página ${page} de ${total}`

  const btnBase = 'inline-flex size-8 items-center justify-center rounded-lg text-sm transition-colors disabled:opacity-40 hover:bg-[var(--surface-hover)]'

  return (
    <div className={cn('flex items-center justify-between px-4 py-3', className)}>
      <span className="num text-xs text-muted-foreground">{summary}</span>
      <div className="flex items-center gap-1">
        <button className={btnBase} disabled={page === 1} onClick={() => go(page - 1)} aria-label="Página anterior">
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        {pageList(page, total).map((p, i) =>
          p === '…' ? (
            <span key={`e${i}`} className="px-1 text-xs text-muted-foreground">…</span>
          ) : (
            <button
              key={p}
              className={cn(
                btnBase,
                'num',
                p === page && 'bg-primary text-primary-foreground hover:bg-primary/80'
              )}
              onClick={() => go(p as number)}
            >
              {p}
            </button>
          )
        )}
        <button className={btnBase} disabled={page === total} onClick={() => go(page + 1)} aria-label="Próxima página">
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
