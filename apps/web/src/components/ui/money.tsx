import { cn } from "@/lib/utils"

interface MoneyProps {
  value: number | string
  signed?: boolean
  className?: string
}

export function Money({ value, signed = false, className }: MoneyProps) {
  const n = Number(value) || 0
  const formatted = n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const text = signed && n > 0 ? `+${formatted}` : formatted

  return (
    <span
      className={cn(
        'num',
        signed && n > 0 && 'text-[var(--text-positive)]',
        signed && n < 0 && 'text-[var(--text-negative)]',
        className
      )}
    >
      {text}
    </span>
  )
}
