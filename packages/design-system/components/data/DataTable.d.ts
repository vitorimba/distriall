interface DataTableColumn {
  key: string;
  label: string;
  /** Largura fixa da coluna (px) */
  width?: number;
  /** 'right' para colunas numéricas (aplica tabular-nums) */
  align?: 'left' | 'right';
  /** Render custom da célula */
  render?: (row: any, index: number) => React.ReactNode;
  /** Habilita ordenação clicável neste cabeçalho */
  sortable?: boolean;
  /** Valor usado na ordenação quando difere do row[key] (ex.: data string → número) */
  sortValue?: (row: any) => number | string;
}

/**
 * Tabela de dados com linhas clicáveis e colunas ordenáveis.
 * Clique no cabeçalho: desc → asc → sem ordenação.
 */
export interface DataTableProps {
  columns: DataTableColumn[];
  rows: any[];
  /** Torna as linhas clicáveis (hover + cursor) */
  onRowClick?: (row: any, index: number) => void;
  /** Chave única da linha (ex.: 'num') */
  rowKey?: string;
  /** Padding reduzido */
  dense?: boolean;
  /** Ordenação inicial, ex.: { key: 'fat', dir: 'desc' } */
  defaultSort?: { key: string; dir: 'asc' | 'desc' } | null;
  className?: string;
}
