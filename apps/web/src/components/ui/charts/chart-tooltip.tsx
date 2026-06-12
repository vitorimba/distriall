interface ChartTooltipProps {
  x: number
  y: number
  label: string
  value: string
}

export function ChartTooltip({ x, y, label, value }: ChartTooltipProps) {
  return (
    <div
      className="pointer-events-none absolute z-[var(--z-tip)] -translate-x-1/2 rounded-lg border border-border bg-[var(--surface-raised)] px-2.5 py-1.5 text-xs shadow-lg"
      style={{ left: `${x}%`, top: `${y}%`, marginTop: -36 }}
    >
      <span className="text-muted-foreground">{label}</span>
      <span className="num ml-1.5 font-semibold text-foreground">{value}</span>
    </div>
  )
}
