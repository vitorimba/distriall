import { cn } from "@/lib/utils"

interface SkeletonProps {
  variant?: 'line' | 'circle' | 'rect'
  className?: string
  style?: React.CSSProperties
}

export function Skeleton({ variant = 'line', className, style }: SkeletonProps) {
  return (
    <span
      className={cn(
        'block animate-pulse bg-muted',
        variant === 'line' && 'h-4 w-full rounded-md',
        variant === 'circle' && 'size-10 rounded-full',
        variant === 'rect' && 'h-20 w-full rounded-lg',
        className
      )}
      style={style}
      aria-hidden="true"
    />
  )
}
