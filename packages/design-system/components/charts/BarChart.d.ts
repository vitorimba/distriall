interface ChartDatum {
  label: string;
  value: number;
}

/**
 * Barras verticais arredondadas; a maior ganha destaque, as demais ficam a 50%.
 * Tooltip no hover; rótulos no eixo X.
 */
export interface BarChartProps {
  data: ChartDatum[];
  /** Altura da área de plotagem em px. Padrão: 160 */
  height?: number;
  /** Cor das barras (token CSS). Padrão: var(--chart-1) */
  color?: string;
  formatValue?: (v: number) => string;
  /** Mostra o valor acima de cada barra. Padrão: false */
  showValues?: boolean;
  /** Destaca a barra de maior valor. Padrão: true */
  highlightMax?: boolean;
}
