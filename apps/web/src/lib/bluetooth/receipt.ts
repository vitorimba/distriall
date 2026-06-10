import { ESCPOSBuilder } from './escpos';
import type { ConsolidatedProduct, LoadingSummary } from '@/lib/utils/loading-consolidation';

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
  return new Date().toLocaleDateString('pt-BR');
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

  b.init()
    .align('center')
    .bold(true)
    .doubleSize(true)
    .text('DISTRIALL')
    .newline()
    .doubleSize(false)
    .text(accountName)
    .newline()
    .bold(false)
    .align('left')
    .fullSeparator()
    .columns('Cliente:', truncate(order.client_name, 20))
    .columns('Data:', formatDate())
    .columns('Pedido:', `#${order.order_number}`)
    .columns('Pgto:', order.payment_method ?? '—')
    .separator();

  // Header
  b.threeColumns('Produto', 'Qtd', 'Valor');
  b.separator();

  // Items
  for (const item of order.items) {
    const name = truncate(`${item.product_name} ${item.variant_name}`, 20);
    const qty = String(item.quantity);
    const val = formatBRL(item.total);
    b.threeColumns(name, qty, val);
  }

  b.separator()
    .bold(true)
    .columns('TOTAL:', `R$ ${formatBRL(order.total)}`)
    .bold(false)
    .fullSeparator()
    .align('center')
    .text(via === 1 ? '1a VIA - CLIENTE' : '2a VIA - CONTROLE')
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
