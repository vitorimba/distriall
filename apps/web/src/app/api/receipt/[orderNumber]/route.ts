import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const COMPANY = {
  name: 'Ind. e Com. Temperos Boa Mesa',
  phone: '+5517932254908',
  address: 'R. Cezar Pupin, S.J. Rio Preto-SP',
  pixKey: '+5517997478319',
  pixInfo: 'Ag 0825 Cc 130037722',
  pixBRCode:
    '00020126490014br.gov.bcb.pix0114+55179974783190209Distriall5204000053039865802BR5917TEMPEROS BOA MESA6013S J RIO PRETO62070503***63041EBD',
};

function fmt(v: number): string {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function stripAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Thermer JSON format:
// type: 0=text, 1=image, 2=barcode, 3=QR
// bold: 0|1, align: 0=left 1=center 2=right
// format: 0=normal, 1=doubleH, 2=doubleH+W, 3=doubleW, 4=small
type ThermerEntry = {
  type: number;
  content?: string;
  bold?: number;
  align?: number;
  format?: number;
  value?: string;
  size?: number;
  path?: string;
};

function text(content: string, opts: { bold?: number; align?: number; format?: number } = {}): ThermerEntry {
  return { type: 0, content: stripAccents(content), bold: opts.bold ?? 0, align: opts.align ?? 0, format: opts.format ?? 0 };
}

function separator(char = '-', width = 32): ThermerEntry {
  return text(char.repeat(width));
}

function row(left: string, right: string, width = 32): ThermerEntry {
  const l = stripAccents(left);
  const r = stripAccents(right);
  const pad = Math.max(1, width - l.length - r.length);
  return text(l + ' '.repeat(pad) + r);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const { orderNumber } = await params;
  const num = parseInt(orderNumber, 10);
  if (isNaN(num)) {
    return NextResponse.json({ error: 'Invalid order number' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from('orders')
    .select('order_number, total, subtotal, payment_method, created_at, clients(name), order_items(product_name, variant_name, quantity, unit_price, total)')
    .eq('order_number', num)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const clientRaw = order.clients as unknown;
  const client = Array.isArray(clientRaw) ? (clientRaw[0] as { name: string } | undefined) : (clientRaw as { name: string } | null);
  const items = (order.order_items ?? []) as {
    product_name: string;
    variant_name: string;
    quantity: number;
    unit_price: number;
    total: number;
  }[];
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const date = new Date(order.created_at).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const entries: ThermerEntry[] = [];

  // Header
  entries.push(text(COMPANY.name, { bold: 1, align: 1 }));
  entries.push(text(COMPANY.phone, { align: 1, format: 4 }));
  entries.push(text(COMPANY.address, { align: 1, format: 4 }));
  entries.push(separator('='));

  // Order info
  entries.push(row('Recibo:', `#${order.order_number}`));
  entries.push(row('Cliente:', stripAccents(client?.name ?? '')));
  entries.push(row('Data:', date));
  entries.push(text(`${items.length} itens (Qtd.: ${totalQty})`, { align: 1, format: 4 }));
  entries.push(separator());

  // Items
  for (const item of items) {
    const name = stripAccents(`${item.product_name} ${item.variant_name}`).slice(0, 20);
    entries.push(row(`${item.quantity} x ${name}`, `R$ ${fmt(item.total)}`));
    entries.push(text(`  1 UN x R$ ${fmt(item.unit_price)}`, { format: 4 }));
  }
  entries.push(separator());

  // Totals
  if (order.subtotal != null) {
    entries.push(row('Subtotal:', `R$ ${fmt(order.subtotal)}`));
  }
  entries.push(text(' '));
  entries.push(row('Total:', `R$ ${fmt(order.total)}`));

  if (order.payment_method) {
    entries.push(text('Pagamento:'));
    entries.push(row(stripAccents(order.payment_method), `R$ ${fmt(order.total)}`));
  }
  entries.push(separator('='));

  // Pix QR Code
  entries.push(text('Pix', { bold: 1, align: 1 }));
  entries.push({ type: 3, value: COMPANY.pixBRCode, size: 40, align: 1 });
  entries.push(text(`Chave: ${COMPANY.pixKey}`, { align: 1, format: 4 }));
  entries.push(text(COMPANY.pixInfo, { align: 1, format: 4 }));
  entries.push(separator('='));

  // Footer
  entries.push(text('AGRADECEMOS A PREFERENCIA', { align: 1 }));
  entries.push(text(date, { align: 1, format: 4 }));
  entries.push(text(' '));
  entries.push(text(' '));

  return NextResponse.json(entries);
}
