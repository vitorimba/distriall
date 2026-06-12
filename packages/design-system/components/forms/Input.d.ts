/** Text input. Wrap in <Field> for label/error. */
export interface InputProps {
  /** Red border + ring */
  invalid?: boolean;
  /** Leading Lucide icon */
  icon?: string;
  /** Leading text prefix (e.g. "R$") */
  prefix?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
