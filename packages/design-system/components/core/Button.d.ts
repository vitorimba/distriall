/**
 * Primary action button.
 */
export interface ButtonProps {
  /** Visual style. Default "primary" (orange fill) */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Default "md" (40px). "sm"=32px, "lg"=48px */
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name rendered before the label */
  icon?: string;
  /** Shows spinner and disables */
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  className?: string;
}
