/** Label + control + error/hint wrapper for any form control. */
export interface FieldProps {
  label?: string;
  /** Inline error message (red). Wins over hint */
  error?: string;
  hint?: string;
  /** Shows orange asterisk */
  required?: boolean;
  children?: React.ReactNode;
  className?: string;
}
