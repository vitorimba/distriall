/** Search input with magnifier icon and clear button. */
export interface SearchFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Shows an × clear button while value is non-empty */
  onClear?: () => void;
  className?: string;
}
