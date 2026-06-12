/**
 * Barra de progresso determinada.
 */
export interface ProgressBarProps {
  /** Valor atual */
  value: number;
  /** Padrão: 100 */
  max?: number;
  /** 'success' pinta de verde (ex.: rota concluída). Padrão: 'accent' */
  tone?: 'accent' | 'success';
  /** aria-label */
  label?: string;
  className?: string;
}
