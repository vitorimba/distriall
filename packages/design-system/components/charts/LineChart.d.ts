interface ChartDatum {
  label: string;
  value: number;
}

/**
 * Gráfico de linha/área suavizada com pontos e tooltip no hover.
 * Uma série por gráfico; cores sempre via tokens --chart-*.
 */
export interface LineChartProps {
  /** Pontos da série, em ordem */
  data: ChartDatum[];
  /** Altura da área de plotagem em px. Padrão: 160 */
  height?: number;
  /** Preenche a área sob a linha com gradiente suave. Padrão: true */
  area?: boolean;
  /** Cor da linha (token CSS). Padrão: var(--chart-1) */
  color?: string;
  /** Formata o valor no tooltip (ex.: fmtBRL). Padrão: número pt-BR */
  formatValue?: (v: number) => string;
  /** Mostra os pontos sempre (true) ou só no hover (false). Padrão: true */
  showDots?: boolean;
}
