/**
 * Formats order data as structured text for pasting into external
 * invoice / boleto systems (e.g. Boa Mesa).
 *
 * Story 8.8 — Atalho para Geracao de Boleto e Nota Fiscal
 */

export interface InvoiceOrderItem {
  product_name: string;
  variant_name: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface InvoiceClient {
  name: string;
  document: string | null;
  address: string | null;
  city: string | null;
  neighborhood: string | null;
}

export interface InvoiceOrder {
  order_number: number;
  total: number;
  created_at: string;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR');
}

export function formatOrderForInvoice(
  order: InvoiceOrder,
  client: InvoiceClient | null,
  items: InvoiceOrderItem[],
): string {
  const lines: string[] = [];

  lines.push('DADOS PARA NF/BOLETO');
  lines.push(`Cliente: ${client?.name ?? '[nao disponivel]'}`);
  lines.push(
    `CPF/CNPJ: ${client?.document ? client.document : '[nao cadastrado]'}`,
  );

  const addressParts = [
    client?.address,
    client?.neighborhood,
    client?.city,
  ].filter(Boolean);
  lines.push(
    `Endereco: ${addressParts.length > 0 ? addressParts.join(', ') : '[nao disponivel]'}`,
  );

  lines.push('');
  lines.push('ITENS:');
  for (const item of items) {
    const label = item.variant_name
      ? `${item.product_name} (${item.variant_name})`
      : item.product_name;
    lines.push(`- ${label} x ${item.quantity} = ${formatCurrency(item.total)}`);
  }

  lines.push('');
  lines.push(`TOTAL: ${formatCurrency(order.total)}`);
  lines.push(`Pedido #: ${order.order_number}`);
  lines.push(`Data: ${formatDate(order.created_at)}`);

  return lines.join('\n');
}
