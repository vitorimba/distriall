/** Floating action button (mobile "+ novo"). Sits above the BottomNav. */
export interface FABProps {
  /** Lucide icon. Default "plus" */
  icon?: string;
  /** Accessible label (required) */
  label: string;
  onClick?: () => void;
  className?: string;
}
