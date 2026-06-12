'use client'

import { useState } from 'react'
import { fmtNum } from './chart-utils'

interface DataPoint {
  label: string
  value: number
}

interface HBarListProps {
  data: DataPoint[]
  color?: string
  formatValue?: (v: number) => string
  maxValue?: number
}

export function HBarList({
  data,
  color = 'var(--chart-1)',
  formatValue = fmtNum,
  maxValue,
}: HBarListProps) {
  const [hover, setHover] = useState<number | null>(null)
  const max = maxValue || Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="flex flex-col gap-2.5">
      {data.map((d, i) => (
        <div
          key={d.label}
          className="flex items-center gap-3"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
        >
          <span
            className="w-24 shrink-0 truncate text-xs transition-colors"
            style={{ color: hover === i ? 'var(--text-primary)' : 'var(--text-secondary)' }}
          >
            {d.label}
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${(d.value / max) * 100}%`,
                background: color,
                opacity: hover == null || hover === i ? 1 : 0.45,
              }}
            />
          </div>
          <span className="num w-16 shrink-0 text-right text-xs font-semibold text-foreground">
            {formatValue(d.value)}
          </span>
        </div>
      ))}
    </div>
  )
}
