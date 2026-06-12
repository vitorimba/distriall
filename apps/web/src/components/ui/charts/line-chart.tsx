'use client'

import { useId, useState } from 'react'
import { smoothPath, fmtNum } from './chart-utils'
import { ChartTooltip } from './chart-tooltip'

interface DataPoint {
  label: string
  value: number
}

interface LineChartProps {
  data: DataPoint[]
  height?: number
  area?: boolean
  color?: string
  formatValue?: (v: number) => string
  showDots?: boolean
}

export function LineChart({
  data,
  height = 160,
  area = true,
  color = 'var(--chart-1)',
  formatValue = fmtNum,
  showDots = true,
}: LineChartProps) {
  const [hover, setHover] = useState<number | null>(null)
  const gid = useId().replace(/[^a-zA-Z0-9]/g, '')

  if (data.length < 2) return null

  const max = Math.max(...data.map((d) => d.value)) * 1.08
  const x = (i: number) => (i / (data.length - 1)) * 100
  const y = (v: number) => 100 - (v / max) * 100
  const pts = data.map((d, i) => [x(i), y(d.value)])
  const line = smoothPath(pts)
  const areaPath = `${line} L 100,100 L 0,100 Z`

  return (
    <div>
      <div className="relative" style={{ height }}>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible"
        >
          {[25, 50, 75].map((g) => (
            <line key={g} x1="0" x2="100" y1={g} y2={g} stroke="var(--chart-grid, var(--border))" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          {area && (
            <>
              <defs>
                <linearGradient id={`fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill={`url(#fill-${gid})`} />
            </>
          )}
          <path d={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
        </svg>

        {data.map((d, i) => (
          <div
            key={i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="absolute top-0 bottom-0"
            style={{
              left: `${x(i)}%`,
              width: `${100 / data.length}%`,
              transform: 'translateX(-50%)',
            }}
          >
            {(showDots || hover === i) && (
              <span
                className="absolute left-1/2 rounded-full border-2 -translate-x-1/2 -translate-y-1/2 transition-all"
                style={{
                  top: `${y(d.value)}%`,
                  width: hover === i ? 9 : 6,
                  height: hover === i ? 9 : 6,
                  background: hover === i ? color : 'var(--card)',
                  borderColor: color,
                }}
              />
            )}
          </div>
        ))}
        {hover != null && (
          <ChartTooltip
            x={x(hover)}
            y={y(data[hover].value)}
            label={data[hover].label}
            value={formatValue(data[hover].value)}
          />
        )}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  )
}
