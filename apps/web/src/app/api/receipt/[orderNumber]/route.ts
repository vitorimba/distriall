import { NextResponse } from 'next/server';

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

type ThermerEntry = {
  type: number;
  content?: string;
  bold?: number;
  align?: number;
  format?: number;
  value?: string;
  size?: number;
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

interface ReceiptData {
  order_number: number;
  client_name: string;
  payment_method: string | null;
  total: number;
  subtotal?: number;
  date: string;
  items: { product_name: string; variant_name: string; quantity: number; unit_price: number; total: number }[];
}

function buildReceipt(data: ReceiptData): ThermerEntry[] {
  const totalQty = data.items.reduce((s, i) => s + i.quantity, 0);
  const entries: ThermerEntry[] = [];

  // Header
  entries.push(text(COMPANY.name, { bold: 1, align: 1 }));
  entries.push(text(COMPANY.phone, { align: 1, format: 4 }));
  entries.push(text(COMPANY.address, { align: 1, format: 4 }));
  entries.push(separator('='));

  // Order info
  entries.push(row('Recibo:', `#${data.order_number}`));
  entries.push(row('Cliente:', stripAccents(data.client_name)));
  entries.push(row('Data:', data.date));
  entries.push(text(`${data.items.length} itens (Qtd.: ${totalQty})`, { align: 1, format: 4 }));
  entries.push(separator());

  // Items
  for (const item of data.items) {
    const name = stripAccents(`${item.product_name} ${item.variant_name}`).slice(0, 20);
    entries.push(row(`${item.quantity} x ${name}`, `R$ ${fmt(item.total)}`));
    entries.push(text(`  1 UN x R$ ${fmt(item.unit_price)}`, { format: 4 }));
  }
  entries.push(separator());

  // Totals
  if (data.subtotal != null) {
    entries.push(row('Subtotal:', `R$ ${fmt(data.subtotal)}`));
  }
  entries.push(text(' '));
  entries.push(row('Total:', `R$ ${fmt(data.total)}`));

  if (data.payment_method) {
    entries.push(text('Pagamento:'));
    entries.push(row(stripAccents(data.payment_method), `R$ ${fmt(data.total)}`));
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
  entries.push(text(data.date, { align: 1, format: 4 }));
  entries.push(text(' '));
  entries.push(text(' '));

  return entries;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const { orderNumber } = await params;
  const { searchParams } = new URL(request.url);
  const dataParam = searchParams.get('d');

  if (!dataParam) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  try {
    const decoded = Buffer.from(dataParam, 'base64url').toString('utf-8');
    const data: ReceiptData = JSON.parse(decoded);

    // Validate order number matches
    if (String(data.order_number) !== orderNumber) {
      return NextResponse.json({ error: 'Order number mismatch' }, { status: 400 });
    }

    const entries = buildReceipt(data);
    // Thermer expects JSON_FORCE_OBJECT format: {"0": {...}, "1": {...}, ...}
    const obj: Record<string, ThermerEntry> = {};
    entries.forEach((e, i) => { obj[String(i)] = e; });
    return NextResponse.json(obj);
  } catch {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}
