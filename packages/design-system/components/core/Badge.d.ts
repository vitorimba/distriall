/** Status badge / colored chip. Knows DistriAll domain statuses by name. */
export interface BadgeProps {
  /** Domain status ("lancado" | "confirmado" | "carregado" | "entregue" | "cancelado" | "pendente" | "pago" | "vencido" | "rascunho" | "conferido" | "fechado") or generic tone ("success" | "danger" | "warning" | "info" | "accent" | "neutral"). Default "neutral" */
  tone?: string;
  /** Default "md". "lg" for order-detail headers */
  size?: 'sm' | 'md' | 'lg';
  /** Leading status dot. Default true */
  dot?: boolean;
  /** Custom label; omit to auto-label domain statuses in pt-BR */
  children?: React.ReactNode;
  className?: string;
}
