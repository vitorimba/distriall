import { cn } from "@/lib/utils"

interface FieldProps {
  label?: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

export function Field({ label, error, hint, required, className, children }: FieldProps) {
  return (
    <label className={cn('flex flex-col', className)} style={{ gap: 'var(--field-gap)' }}>
      {label && (
        <span className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-[var(--danger-fg)]"> *</span>}
        </span>
      )}
      {children}
      {error ? (
        <span className="text-xs text-[var(--danger-fg)]">{error}</span>
      ) : hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  )
}
