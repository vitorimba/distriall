import { cn } from '@/lib/utils'

const PALETTE = ['#F97A1E', '#3B82F6', '#8B5CF6', '#22C55E', '#EAB308', '#EF4444']

const SIZES = {
  sm: 'size-7 text-[10px]',
  md: 'size-9 text-xs',
  lg: 'size-12 text-sm',
}

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const idx = (name.length + (name.charCodeAt(0) || 0)) % PALETTE.length
  const color = PALETTE[idx]

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold',
        SIZES[size],
        className
      )}
      style={{ background: color + '26', color }}
      title={name}
    >
      {initials || '?'}
    </span>
  )
}
