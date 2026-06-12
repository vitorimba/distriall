'use client'

import { useId } from 'react'
import { smoothPath } from './chart-utils'

interface SparklineProps {
  values: number[]
  width?: number
  height?: number
  color?: string
  area?: boolean
}

export function Sparkline({
  values,
  width = 80,
  height = 24,
  color = 'var(--chart-1)',
  area = true,
}: SparklineProps) {
  const gid = useId().replace(/[^a-zA-Z0-9]/g, '')
  if (values.length < 2) return null

  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = max - min || 1
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * 100,
    92 - ((v - min) / span) * 84,
  ])
  const line = smoothPath(pts)

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      width={width}
      height={height}
      className="block overflow-visible"
      aria-hidden="true"
    >
      {area && (
        <>
          <defs>
            <linearGradient id={`spark-${gid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${line} L 100,100 L 0,100 Z`} fill={`url(#spark-${gid})`} />
        </>
      )}
      <path d={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
    </svg>
  )
}
