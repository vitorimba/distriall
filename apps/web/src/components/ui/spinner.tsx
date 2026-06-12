import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: number
  className?: string
}

export function Spinner({ size = 18, className }: SpinnerProps) {
  return (
    <span
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
        className
      )}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-label="Carregando"
    />
  )
}
