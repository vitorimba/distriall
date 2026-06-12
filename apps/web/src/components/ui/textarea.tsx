import { cn } from '@/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export function Textarea({ invalid, className, ...rest }: TextareaProps) {
  return (
    <textarea
      rows={3}
      className={cn(
        'w-full rounded-[var(--radius-ds-md)] border bg-[var(--surface-inset)] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors',
        'focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] focus-visible:outline-offset-2',
        invalid ? 'border-[var(--danger)]' : 'border-input',
        className
      )}
      {...rest}
    />
  )
}
