'use client'

import { useMemo, useState } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DataTableColumn<T> {
  key: string
  label: string
  align?: 'left' | 'right'
  width?: string | number
  sortable?: boolean
  sortValue?: (row: T) => string | number
  render?: (row: T, index: number) => React.ReactNode
}

interface Sort {
  key: string
  dir: 'asc' | 'desc'
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  rows: T[]
  onRowClick?: (row: T, index: number) => void
  rowKey?: string
  dense?: boolean
  defaultSort?: Sort | null
  className?: string
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  onRowClick,
  rowKey,
  dense = false,
  defaultSort = null,
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<Sort | null>(defaultSort)

  const sorted = useMemo(() => {
    if (!sort) return rows
    const col = columns.find((c) => c.key === sort.key)
    const val = (row: T) => (col?.sortValue ? col.sortValue(row) : row[sort.key])
    const copy = [...rows]
    copy.sort((a, b) => {
      const va = val(a)
      const vb = val(b)
      let cmp: number
      if (typeof va === 'number' && typeof vb === 'number') cmp = va - vb
      else cmp = String(va ?? '').localeCompare(String(vb ?? ''), 'pt-BR', { numeric: true })
      return sort.dir === 'asc' ? cmp : -cmp
    })
    return copy
  }, [rows, sort, columns])

  const toggleSort = (col: DataTableColumn<T>) => {
    if (!col.sortable) return
    setSort((s) => {
      if (!s || s.key !== col.key) return { key: col.key, dir: 'desc' }
      if (s.dir === 'desc') return { key: col.key, dir: 'asc' }
      return null
    })
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => {
              const isSorted = sort?.key === col.key
              return (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground',
                    col.align === 'right' && 'text-right',
                    col.sortable && 'cursor-pointer select-none hover:text-foreground'
                  )}
                  style={{ width: col.width }}
                  onClick={() => toggleSort(col)}
                  aria-sort={isSorted ? (sort!.dir === 'asc' ? 'ascending' : 'descending') : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      isSorted
                        ? sort!.dir === 'asc' ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />
                        : <ChevronsUpDown className="size-3 opacity-40" />
                    )}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={rowKey ? String(row[rowKey]) : i}
              className={cn(
                'border-b border-border transition-colors',
                onRowClick && 'cursor-pointer hover:bg-[var(--surface-hover)]',
                dense ? 'h-10' : 'h-12'
              )}
              onClick={() => onRowClick?.(row, i)}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    'px-4 py-2',
                    col.align === 'right' && 'num text-right'
                  )}
                >
                  {col.render ? col.render(row, i) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
