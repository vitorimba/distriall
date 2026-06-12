/**
 * Mini-tendência sem eixos nem tooltip, para StatCards e células de tabela.
 */
export interface SparklineProps {
  /** Série de valores em ordem */
  values: number[];
  /** Largura em px. Padrão: 80 */
  width?: number;
  /** Altura em px. Padrão: 24 */
  height?: number;
  /** Cor da linha (token CSS). Padrão: var(--chart-1) */
  color?: string;
  /** Preenchimento suave sob a linha. Padrão: true */
  area?: boolean;
}
