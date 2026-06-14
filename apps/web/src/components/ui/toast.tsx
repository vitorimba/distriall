'use client'

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Toast {
  id: number
  message: string
  tone: 'success' | 'danger' | 'info'
}

type PushToast = (message: string, tone?: Toast['tone'], duration?: number) => void

const ToastCtx = createContext<PushToast>(() => {})

const TONE_ICONS = {
  success: CheckCircle2,
  danger: AlertCircle,
  info: Info,
}

const TONE_STYLES = {
  success: 'text-[var(--success)]',
  danger: 'text-[var(--danger-fg)]',
  info: 'text-[var(--info)]',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push: PushToast = useCallback((message, tone = 'success', duration = 3200) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, tone }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration)
  }, [])

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div
        className="fixed bottom-4 left-1/2 z-[var(--z-toast)] flex -translate-x-1/2 flex-col gap-2"
        aria-live="polite"
      >
        {toasts.map((t) => {
          const Icon = TONE_ICONS[t.tone]
          return (
            <div
              key={t.id}
              className={cn(
                'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-lg',
                'bg-[var(--surface-raised)] text-foreground border border-border',
                'animate-in slide-in-from-bottom-2 fade-in duration-[var(--duration-base)]'
              )}
            >
              <Icon className={cn('size-4 shrink-0', TONE_STYLES[t.tone])} />
              {t.message}
            </div>
          )
        })}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast(): PushToast {
  return useContext(ToastCtx)
}
