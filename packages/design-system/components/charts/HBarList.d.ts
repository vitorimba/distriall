interface ChartDatum {
  label: string;
  value: number;
}

/**
 * Ranking horizontal: rótulo + barra proporcional + valor à direita.
 * Para top produtos, cidades, clientes — listas ordenadas por valor.
 */
export interface HBarListProps {
  data: ChartDatum[];
  /** Cor das barras (token CSS). Padrão: var(--chart-1) */
  color?: string;
  formatValue?: (v: number) => string;
  /** Base da escala; padrão é o maior valor da lista */
  maxValue?: number;
}
