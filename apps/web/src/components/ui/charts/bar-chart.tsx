'use client'

import { useState } from 'react'
import { fmtNum } from './chart-utils'
import { ChartTooltip } from './chart-tooltip'

interface DataPoint {
  label: string
  value: number
}

interface BarChartProps {
  data: DataPoint[]
  height?: number
  color?: string
  formatValue?: (v: number) => string
  showValues?: boolean
  highlightMax?: boolean
}

export function BarChart({
  data,
  height = 160,
  color = 'var(--chart-1)',
  formatValue = fmtNum,
  showValues = false,
  highlightMax = true,
}: BarChartProps) {
  const [hover, setHover] = useState<number | null>(null)
  if (data.length === 0) return null
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div>
      <div className="relative" style={{ height }}>
        <div className="flex h-full items-end gap-1">
          {data.map((d, i) => {
            const isMax = highlightMax && d.value === max
            const active = hover === i
            return (
              <div
                key={d.label}
                className="flex flex-1 flex-col items-center justify-end"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                {showValues && (
                  <span className="num mb-1 text-xs text-muted-foreground">{formatValue(d.value)}</span>
                )}
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${(d.value / max) * (showValues ? 82 : 96)}%`,
                    background: color,
                    opacity: isMax || active ? 1 : 0.5,
                    minHeight: 2,
                  }}
                />
              </div>
            )
          })}
        </div>
        {hover != null && (
          <ChartTooltip
            x={((hover + 0.5) / data.length) * 100}
            y={100 - (data[hover].value / max) * (showValues ? 82 : 96)}
            label={data[hover].label}
            value={formatValue(data[hover].value)}
          />
        )}
      </div>
      <div className="mt-2 flex text-xs text-muted-foreground">
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center">{d.label}</span>
        ))}
      </div>
    </div>
  )
}
