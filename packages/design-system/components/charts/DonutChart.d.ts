interface DonutDatum {
  label: string;
  value: number;
  /** Token CSS; padrão cicla --chart-1..5 */
  color?: string;
}

/**
 * Donut com stat central e legenda interativa — hover destaca o segmento
 * e troca o centro para o valor dele.
 */
export interface DonutChartProps {
  data: DonutDatum[];
  /** Diâmetro em px. Padrão: 130 */
  size?: number;
  /** Espessura do anel (em unidades do viewBox 100). Padrão: 14 */
  thickness?: number;
  /** Valor exibido no centro quando nada está em hover (ex.: "312") */
  centerValue?: React.ReactNode;
  /** Rótulo abaixo do valor central (ex.: "pedidos") */
  centerLabel?: React.ReactNode;
  formatValue?: (v: number) => string;
  /** Legenda e hover mostram % (true) ou valor formatado (false). Padrão: true */
  showPercent?: boolean;
}
