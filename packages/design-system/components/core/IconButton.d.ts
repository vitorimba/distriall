/** Square icon-only button (edit pencil, row actions, header actions). */
export interface IconButtonProps {
  /** Lucide icon name */
  icon: string;
  /** Accessible label (required) */
  label: string;
  /** Default "ghost" */
  variant?: 'ghost' | 'outline' | 'primary' | 'danger';
  /** Default "md" (36px). "sm"=28px */
  size?: 'sm' | 'md';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}
