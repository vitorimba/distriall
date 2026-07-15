'use client';

import { useRef, useEffect } from 'react';
import { Printer, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Receipt } from '@/components/orders/receipt';

interface ReceiptItem {
  product_name: string;
  variant_name: string;
  quantity: number;
  unit_price: number;
  total: number;
}

interface OrderReceiptProps {
  open: boolean;
  onClose: () => void;
  orderNumber: number;
  clientName: string;
  accountName: string;
  paymentMethod: string | null;
  total: number;
  subtotal?: number;
  items: ReceiptItem[];
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Dialog de preview do recibo térmico.
 * — Receipt DS (tokens --receipt-*) para preview visual em 58mm
 * — Botão "Imprimir" usa window.print() (CSS @media print mostra apenas .da-receipt)
 * — Botão "Compartilhar" usa Web Share API / clipboard
 * — Bluetooth (usePrinter) é gerenciado pelo pai (orders/[id]/page.tsx); este dialog
 *   é o fallback quando Bluetooth não está disponível ou falha.
 */
export function OrderReceipt({
  open,
  onClose,
  orderNumber,
  clientName,
  accountName,
  paymentMethod,
  total,
  subtotal,
  items,
}: OrderReceiptProps) {
  const date = new Date().toLocaleString('pt-BR');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open]);

  const receiptItens = items.map((i) => ({
    produto: `${i.product_name} – ${i.variant_name}`,
    qtd: i.quantity,
    preco: i.unit_price,
  }));

  async function handleShare() {
    const totalQty = items.reduce((s, i) => s + i.quantity, 0);
    const text = [
      'Industria e Comercio Temperos Boa Mesa',
      '+5517932254908',
      'Rua Cezar Pupin, Sao Jose do Rio Preto - SP',
      '================================',
      `Recibo #${orderNumber}`,
      `Cliente: ${clientName}`,
      `Data: ${date}`,
      `${items.length} itens (Qtd.: ${totalQty})`,
      '--------------------------------',
      ...items.map(
        (i) => `${i.quantity} x ${i.product_name} ${i.variant_name}....R$${formatBRL(i.total)}\n  1 UN x R$${formatBRL(i.unit_price)}`
      ),
      '--------------------------------',
      `Total: R$ ${formatBRL(total)}`,
      paymentMethod ? `Pagamento:\n${paymentMethod}: R$ ${formatBRL(total)}` : '',
      '================================',
      'Pix: +5517997478319',
      'Ag 0825 Cc 130037722',
      '================================',
      'AGRADECEMOS A PREFERENCIA',
      date,
    ].filter(Boolean).join('\n');

    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="max-w-[320px] p-4" showCloseButton>
        <DialogHeader>
          <DialogTitle>Cupom fiscal</DialogTitle>
        </DialogHeader>

        {/* Receipt preview — styled via da-receipt CSS classes */}
        <div ref={scrollRef} className="overflow-auto py-1 max-h-[75vh]">
          <Receipt
            numero={`#${orderNumber}`}
            cliente={clientName}
            data={date}
            itens={receiptItens}
            subtotal={subtotal}
            total={total}
            pagamento={paymentMethod ?? undefined}
          />
        </div>

        <DialogFooter>
          <Button size="sm" variant="outline" onClick={handleShare} className="flex-1">
            <Share2 className="mr-1 size-3.5" />
            {'share' in navigator ? 'Compartilhar' : 'Copiar'}
          </Button>
          <Button size="sm" onClick={() => window.print()} className="flex-1">
            <Printer className="mr-1 size-3.5" />
            Imprimir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
