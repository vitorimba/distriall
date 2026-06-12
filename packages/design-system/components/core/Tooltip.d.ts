/**
 * Tooltip por hover/foco. Todo IconButton deve estar envolto em um.
 */
export interface TooltipProps {
  /** Texto curto do tooltip */
  label: string;
  /** Posição. Padrão: 'top' */
  position?: 'top' | 'bottom';
  /** Elemento alvo */
  children: React.ReactNode;
}
