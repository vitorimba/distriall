interface RadioOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

/**
 * Escolha única visível (3–6 opções). Mais opções: use Select.
 */
export interface RadioGroupProps {
  /** Strings ou objetos { value, label, disabled } */
  options: (string | RadioOption)[];
  value?: string;
  onChange?: (value: string) => void;
  /** name do grupo (forms nativos) */
  name?: string;
  /** Padrão: 'column' */
  direction?: 'column' | 'row';
  className?: string;
}
