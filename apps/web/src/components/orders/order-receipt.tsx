'use client';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { Money } from '@/components/ui/money';

interface ReceiptItem {
  product_name: string;
  variant_name: string;
  quantity: number;
  total: number;
}

interface OrderReceiptProps {
  orderNumber: number;
  clientName: string;
  accountName: string;
  paymentMethod: string | null;
  total: number;
  items: ReceiptItem[];
  onClose: () => void;
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function OrderReceipt({
  orderNumber,
  clientName,
  accountName,
  paymentMethod,
  total,
  items,
  onClose,
}: OrderReceiptProps) {
  const date = new Date().toLocaleDateString('pt-BR');

  async function handleShare() {
    const text = [
      'DISTRIALL',
      accountName,
      '================================',
      `Cliente: ${clientName}`,
      `Data: ${date}  Pedido: #${orderNumber}`,
      `Pgto: ${paymentMethod ?? '—'}`,
      '--------------------------------',
      ...items.map((i) => `${i.product_name} ${i.variant_name} x${i.quantity} R$${formatBRL(i.total)}`),
      '--------------------------------',
      `TOTAL: R$ ${formatBRL(total)}`,
      '================================',
    ].join('\n');

    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="mx-4 max-w-[320px] rounded-lg bg-white p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="font-mono text-xs leading-relaxed text-gray-900">
          <div className="text-center">
            <div className="text-sm font-bold">DISTRIALL</div>
            <div>{accountName}</div>
          </div>
          <div className="my-1 border-t-2 border-double border-gray-400" />
          <div>Cliente: {clientName}</div>
          <div>Data: {date} &nbsp; Pedido: #{orderNumber}</div>
          <div>Pgto: {paymentMethod ?? '—'}</div>
          <div className="my-1 border-t border-dashed border-gray-300" />
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>Produto</span>
            <span>Qtd &nbsp; Valor</span>
          </div>
          <div className="my-0.5 border-t border-dashed border-gray-300" />
          {items.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span className="truncate flex-1">{item.product_name} {item.variant_name}</span>
              <span className="ml-2 shrink-0">{item.quantity} &nbsp; <Money value={item.total} /></span>
            </div>
          ))}
          <div className="my-1 border-t border-dashed border-gray-300" />
          <div className="flex justify-between font-bold">
            <span>TOTAL:</span>
            <span>R$ <Money value={total} /></span>
          </div>
          <div className="my-1 border-t-2 border-double border-gray-400" />
        </div>

        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="outline" onClick={handleShare} className="flex-1">
            <Share2 className="mr-1 size-3.5" />
            {'share' in navigator ? 'Compartilhar' : 'Copiar'}
          </Button>
          <Button size="sm" onClick={onClose} className="flex-1">
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
}
