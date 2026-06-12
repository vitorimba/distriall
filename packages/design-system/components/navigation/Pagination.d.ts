/**
 * Paginação de tabelas longas. Renderizar abaixo da DataTable, dentro do Card.
 * Informe totalItems + pageSize (mostra "1–25 de 312 itens") ou totalPages.
 */
export interface PaginationProps {
  page: number;
  totalPages?: number;
  totalItems?: number;
  /** Padrão: 25 */
  pageSize?: number;
  onChange?: (page: number) => void;
  /** Substantivo do resumo. Padrão: 'itens' */
  label?: string;
}
