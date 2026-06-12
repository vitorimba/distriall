/**
 * Card de KPI do dashboard: ícone, valor grande, label, delta % e sparkline opcional.
 * No máximo 1 card `accent` (hero laranja) por linha.
 */
export interface StatCardProps {
  /** Nome do ícone Lucide (kebab-case) */
  icon?: string;
  /** Rótulo pequeno abaixo do valor */
  label: string;
  /** Valor formatado (ex.: "R$ 28.520,30") */
  value: React.ReactNode;
  /** Variação percentual; positivo = verde, negativo = vermelho */
  delta?: number;
  /** Sufixo do delta (ex.: "vs semana ant.") */
  deltaLabel?: string;
  /** Série para mini-tendência (Sparkline) na base do card */
  spark?: number[];
  /** Hero laranja com gradiente — máx. 1 por linha */
  accent?: boolean;
  /** Skeleton de carregamento */
  loading?: boolean;
  className?: string;
}
