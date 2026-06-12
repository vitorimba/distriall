/**
 * Banner inline de aviso em contexto (persiste na tela).
 * Para confirmação efêmera de ação, use Toast.
 */
export interface AlertProps {
  /** Padrão: 'info' */
  tone?: 'info' | 'success' | 'warning' | 'danger';
  /** Título em negrito (opcional) */
  title?: React.ReactNode;
  /** Ação à direita (ex.: botão "Tentar novamente") */
  action?: React.ReactNode;
  /** Ícone Lucide custom; padrão deriva do tone */
  icon?: string;
  children?: React.ReactNode;
  className?: string;
}
