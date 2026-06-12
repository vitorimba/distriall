/** Native select styled to match Input. */
export interface SelectProps {
  /** Strings or {value,label} pairs */
  options: Array<string | { value: string; label: string }>;
  /** Disabled first option shown until a choice is made */
  placeholder?: string;
  invalid?: boolean;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}
