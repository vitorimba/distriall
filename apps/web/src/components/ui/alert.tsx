'use client'

import { Info, CheckCircle2, TriangleAlert, AlertCircle, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const TONE_ICONS: Record<string, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
}

const TONE_STYLES: Record<string, string> = {
  info: 'bg-[var(--info-soft)] text-[var(--info)]',
  success: 'bg-[var(--success-soft)] text-[var(--success)]',
  warning: 'bg-[var(--warning-soft)] text-[var(--warning)]',
  danger: 'bg-[var(--danger-soft)] text-[var(--danger-fg)]',
}

interface AlertProps {
  tone?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  icon?: LucideIcon
  action?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function Alert({
  tone = 'info',
  title,
  icon,
  action,
  className,
  children,
}: AlertProps) {
  const IconComponent = icon || TONE_ICONS[tone]

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl p-4',
        TONE_STYLES[tone],
        className
      )}
      role={tone === 'danger' ? 'alert' : 'status'}
    >
      <IconComponent className="mt-0.5 size-4 shrink-0" />
      <div className="flex-1 text-sm">
        {title && <div className="font-semibold">{title}</div>}
        {children && <div className={cn(title && 'mt-0.5', 'text-foreground')}>{children}</div>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
