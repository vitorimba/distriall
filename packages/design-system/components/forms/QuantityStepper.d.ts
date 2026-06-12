/**
 * Stepper de quantidade (− n +) com alvos de toque grandes — uso em campo.
 */
export interface QuantityStepperProps {
  value: number;
  /** Padrão: 1 */
  min?: number;
  /** Padrão: 9999 */
  max?: number;
  onChange?: (value: number) => void;
  /** 'lg' = alvos 44px (mobile). Padrão: 'md' */
  size?: 'md' | 'lg';
  disabled?: boolean;
}
