interface AccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
}

/**
 * Divulgação progressiva (FAQ, troubleshooting) — um item aberto por vez.
 * Usar dentro de Card padded={false}.
 */
export interface AccordionProps {
  items: AccordionItem[];
  /** Índice aberto inicialmente. Padrão: nenhum */
  defaultOpen?: number | null;
  className?: string;
}
