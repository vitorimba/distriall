import { ESCPOSBuilder } from './escpos';
import type { ConsolidatedProduct, LoadingSummary } from '@/lib/utils/loading-consolidation';

const COMPANY = {
  name: 'Ind. e Com. Temperos Boa Mesa',
  phone: '+5517932254908',
  address: 'R. Cezar Pupin, S.J. Rio Preto-SP',
  pixKey: '+5517997478319',
  pixInfo: 'Ag 0825 Cc 130037722',
  pixBRCode: '00020126490014br.gov.bcb.pix0114+55179974783190209Distriall5204000053039865802BR5917TEMPEROS BOA MESA6013S J RIO PRETO62070503***63041EBD',
};

interface OrderForReceipt {
  order_number: number;
  client_name: string;
  payment_method: string | null;
  total: number;
  items: {
    product_name: string;
    variant_name: string;
    quantity: number;
    unit_price: number;
    total: number;
  }[];
}

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) : str;
}

function formatDate(): string {
  const now = new Date();
  return `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

/**
 * Build ESC/POS receipt for a single order (1 via).
 */
export function buildOrderReceipt(
  order: OrderForReceipt,
  accountName: string,
  via: 1 | 2
): Uint8Array {
  const b = new ESCPOSBuilder();
  const totalQty = order.items.reduce((s, i) => s + i.quantity, 0);

  b.init()
    .align('center')
    .bold(true)
    .text(COMPANY.name)
    .newline()
    .bold(false)
    .text(COMPANY.phone)
    .newline()
    .text(COMPANY.address)
    .newline()
    .align('left')
    .fullSeparator()
    .columns('Recibo:', `#${order.order_number}`)
    .columns('Cliente:', truncate(order.client_name, 20))
    .columns('Data:', formatDate())
    .newline()
    .align('center')
    .text(`${order.items.length} itens (Qtd.: ${totalQty})`)
    .newline()
    .align('left')
    .separator();

  // Items
  for (const item of order.items) {
    const name = truncate(`${item.product_name} ${item.variant_name}`, 20);
    b.columns(`${item.quantity} x ${name}`, `R$ ${formatBRL(item.total)}`);
    b.text(`  1 UN x R$ ${formatBRL(item.unit_price)}`);
    b.newline();
  }

  b.separator()
    .bold(true)
    .columns('Total:', `R$ ${formatBRL(order.total)}`)
    .bold(false);

  if (order.payment_method) {
    b.text(`Pagamento:`)
      .newline()
      .columns(order.payment_method, `R$ ${formatBRL(order.total)}`);
  }

  b.fullSeparator()
    .align('center')
    .bold(true)
    .text('Pix')
    .newline()
    .bold(false)
    .qrCode(COMPANY.pixBRCode, 6)
    .newline()
    .text('Chave: ' + COMPANY.pixKey)
    .newline()
    .text(COMPANY.pixInfo)
    .newline()
    .fullSeparator()
    .text(via === 1 ? '1a VIA - CLIENTE' : '2a VIA - CONTROLE')
    .newline()
    .text('AGRADECEMOS A PREFERÊNCIA')
    .newline()
    .text(formatDate())
    .newline()
    .fullSeparator()
    .cut();

  return b.build();
}

/**
 * Build ESC/POS receipt for loading list (consolidated products).
 */
export function buildLoadingListReceipt(
  products: ConsolidatedProduct[],
  summary: LoadingSummary
): Uint8Array {
  const b = new ESCPOSBuilder();

  b.init()
    .align('center')
    .bold(true)
    .text('LISTA DE CARREGAMENTO')
    .newline()
    .bold(false)
    .text(formatDate())
    .newline()
    .align('left')
    .fullSeparator()
    .text(`${summary.orderCount} pedidos | ${summary.accountCount} contas`)
    .newline()
    .separator();

  // Header
  b.columns('PRODUTO', 'QTD');
  b.separator();

  // Products
  for (const p of products) {
    const name = truncate(`${p.productName} ${p.variantName}`, 24);
    b.columns(name, String(p.totalQuantity));
  }

  b.separator()
    .columns('Fat:', `R$ ${formatBRL(summary.totalRevenue)}`)
    .columns('Lucro:', `R$ ${formatBRL(summary.totalProfit)}`)
    .fullSeparator();

  // Account breakdown
  for (const a of summary.accountBreakdown) {
    b.columns(`[${a.slug.toUpperCase()}]`, `R$ ${formatBRL(a.revenue)} (${a.orderCount} ped)`);
  }

  b.fullSeparator().cut();

  return b.build();
}
