'use client'

import { useState } from 'react'
import { CHART_COLORS, fmtNum } from './chart-utils'

interface DataPoint {
  label: string
  value: number
  color?: string
}

interface DonutChartProps {
  data: DataPoint[]
  size?: number
  thickness?: number
  centerValue?: string
  centerLabel?: string
  formatValue?: (v: number) => string
  showPercent?: boolean
}

export function DonutChart({
  data,
  size = 130,
  thickness = 14,
  centerValue,
  centerLabel,
  formatValue = fmtNum,
  showPercent = true,
}: DonutChartProps) {
  const [active, setActive] = useState<number | null>(null)
  const total = data.reduce((a, d) => a + d.value, 0)
  if (!total) return null

  const r = 50 - thickness / 2
  const C = 2 * Math.PI * r
  let acc = 0
  const segs = data.map((d, i) => {
    const frac = d.value / total
    const seg = { ...d, i, frac, offset: acc, segColor: d.color || CHART_COLORS[i % CHART_COLORS.length] }
    acc += frac
    return seg
  })

  const current = active != null ? segs[active] : null

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {segs.map((s) => (
            <circle
              key={s.i}
              cx="50" cy="50" r={r}
              fill="none"
              stroke={s.segColor}
              strokeWidth={active === s.i ? thickness + 3 : thickness}
              strokeDasharray={`${Math.max(s.frac * C - 1.5, 0.5)} ${C}`}
              strokeDashoffset={-s.offset * C}
              opacity={active == null || active === s.i ? 1 : 0.3}
              className="transition-all cursor-pointer"
              onMouseEnter={() => setActive(s.i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="num text-lg font-bold text-foreground">
            {current
              ? showPercent ? `${Math.round(current.frac * 100)}%` : formatValue(current.value)
              : centerValue}
          </span>
          <span className="text-xs text-muted-foreground">
            {current ? current.label : centerLabel}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {segs.map((s) => (
          <button
            key={s.i}
            className="flex items-center gap-2 text-left text-xs transition-opacity"
            style={{ opacity: active != null && active !== s.i ? 0.4 : 1 }}
            onMouseEnter={() => setActive(s.i)}
            onMouseLeave={() => setActive(null)}
          >
            <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.segColor }} />
            <span className="text-muted-foreground">{s.label}</span>
            <span className="num font-semibold text-foreground">
              {showPercent ? `${Math.round(s.frac * 100)}%` : formatValue(s.value)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
