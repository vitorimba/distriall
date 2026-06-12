/** Empty list / error state with optional action. */
export interface EmptyStateProps {
  /** Lucide icon. Default "package-open" */
  icon?: string;
  title: string;
  description?: string;
  /** Renders a small action button */
  actionLabel?: string;
  onAction?: () => void;
  /** Error treatment: red alert icon + outline retry button */
  error?: boolean;
  className?: string;
}
