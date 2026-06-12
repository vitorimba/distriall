/**
 * Dialog modal centrado sobre scrim (--overlay-scrim + blur).
 * Fecha por Esc, clique fora ou X. Montar condicionalmente via `open`.
 */
export interface DialogProps {
  /** Controla a exibição */
  open: boolean;
  /** Chamado por Esc, clique no scrim e botão X; omitir torna o dialog não-dispensável */
  onClose?: () => void;
  /** Título no cabeçalho */
  title?: React.ReactNode;
  /** Largura em px. Padrão: 480 */
  width?: number;
  /** Rodapé (geralmente botões alinhados à direita) */
  footer?: React.ReactNode;
  children?: React.ReactNode;
}
