'use client'

import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'

interface PageHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
  actions?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function PageHeader({ title, subtitle, onBack, actions, children, className }: PageHeaderProps) {
  return (
    <header className={cn('flex items-center justify-between gap-4', className)}>
      <div className="flex items-center gap-3">
        {onBack && (
          <Tooltip label="Voltar" position="bottom">
            <Button variant="ghost" size="icon" onClick={onBack} aria-label="Voltar">
              <ArrowLeft className="size-5" aria-hidden="true" />
            </Button>
          </Tooltip>
        )}
        <div>
          <h1
            className="font-bold tracking-tight text-foreground"
            style={{ fontSize: 'var(--text-2xl)' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
}
