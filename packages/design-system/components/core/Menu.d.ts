interface MenuItem {
  label: string;
  /** Ícone Lucide (kebab-case) */
  icon?: string;
  /** Vermelho (destrutivo) */
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * Menu dropdown de ações ("..." em linhas/headers). Fecha por clique fora, Esc e seleção.
 */
export interface MenuProps {
  /** Itens ou 'separator' */
  items: (MenuItem | 'separator')[];
  /** Gatilho custom; padrão é IconButton de reticências */
  trigger?: React.ReactNode;
  /** Lado de abertura. Padrão: 'right' */
  align?: 'left' | 'right';
  /** aria-label do gatilho padrão */
  label?: string;
}
