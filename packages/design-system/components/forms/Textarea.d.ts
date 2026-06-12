/** Multiline text input (observações). */
export interface TextareaProps {
  invalid?: boolean;
  rows?: number;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}
