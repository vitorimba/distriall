import { cn } from "@/lib/utils"

const TONE_MAP: Record<string, string> = {
  // pedidos
  lancado: 'lancado',
  confirmado: 'confirmado',
  carregado: 'carregado',
  entregue: 'entregue',
  cancelado: 'cancelado',
  // vales / acertos
  pendente: 'pendente',
  pago: 'pago',
  vencido: 'vencido',
  rascunho: 'neutral',
  conferido: 'confirmado',
  fechado: 'entregue',
  // generic
  success: 'entregue',
  danger: 'cancelado',
  warning: 'pendente',
  info: 'lancado',
  accent: 'carregado',
  neutral: 'neutral',
}

const LABEL_MAP: Record<string, string> = {
  lancado: 'Lançado',
  confirmado: 'Confirmado',
  carregado: 'Carregado',
  entregue: 'Entregue',
  cancelado: 'Cancelado',
  pendente: 'Pendente',
  pago: 'Pago',
  vencido: 'Vencido',
  rascunho: 'Rascunho',
  conferido: 'Conferido',
  fechado: 'Fechado',
}

const TONE_STYLES: Record<string, string> = {
  lancado: 'bg-[var(--status-lancado-soft)] text-[var(--status-lancado)]',
  confirmado: 'bg-[var(--status-confirmado-soft)] text-[var(--status-confirmado)]',
  carregado: 'bg-[var(--status-carregado-soft)] text-[var(--status-carregado)]',
  entregue: 'bg-[var(--status-entregue-soft)] text-[var(--status-entregue)]',
  cancelado: 'bg-[var(--status-cancelado-soft)] text-[var(--status-cancelado)]',
  pendente: 'bg-[var(--status-pendente-soft)] text-[var(--status-pendente)]',
  pago: 'bg-[var(--status-pago-soft)] text-[var(--status-pago)]',
  vencido: 'bg-[var(--status-vencido-soft)] text-[var(--status-vencido)]',
  neutral: 'bg-muted text-muted-foreground',
}

interface StatusBadgeProps {
  tone: string
  dot?: boolean
  className?: string
  children?: React.ReactNode
}

export function StatusBadge({ tone, dot = true, className, children }: StatusBadgeProps) {
  const mapped = TONE_MAP[tone] || 'neutral'
  const toneStyle = TONE_STYLES[mapped] || TONE_STYLES.neutral
  const label = children || LABEL_MAP[tone] || tone

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        toneStyle,
        className
      )}
    >
      {dot && (
        <span
          className="size-1.5 rounded-full bg-current"
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  )
}
