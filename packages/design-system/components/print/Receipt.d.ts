interface ReceiptItem {
  produto: string;
  qtd: number;
  preco: number;
}

/**
 * Recibo térmico P&B (58mm) — preview em tela e base para impressão Bluetooth.
 * Sempre papel branco + tinta preta nos dois temas; hierarquia por peso, nunca cor.
 */
export interface ReceiptProps {
  /** Número do pedido (ex.: "#1042") */
  numero: string;
  cliente: string;
  /** Data formatada (ex.: "12/06/2026 08:14") */
  data: string;
  itens: ReceiptItem[];
  subtotal?: number;
  /** Valor absoluto do desconto */
  desconto?: number;
  total: number;
  /** Forma de pagamento (ex.: "Pix") */
  pagamento?: string;
  /** Mensagem final. Padrão: "Obrigado pela preferência!" */
  rodape?: string;
  /** Largura do papel. Padrão: '58mm' */
  largura?: '58mm' | '80mm';
}
