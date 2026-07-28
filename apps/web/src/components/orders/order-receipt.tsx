'use client';

import { useRef, useEffect, useState } from 'react';
import { Bluetooth, Printer, Send } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Receipt } from '@/components/orders/receipt';
import { usePrinter } from '@/hooks/use-printer';

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
  const receiptRef = useRef<HTMLDivElement>(null);
  const [printSuccess, setPrintSuccess] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const { isSupported, isConnected, isConnecting, isPrinting, error, deviceName, connect, printOrder } = usePrinter();

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    if (open) {
      setPrintSuccess(false);
    }
  }, [open]);

  const receiptItens = items.map((i) => ({
    produto: `${i.product_name} – ${i.variant_name}`,
    qtd: i.quantity,
    preco: i.unit_price,
  }));

  async function handleBluetoothPrint() {
    setPrintSuccess(false);
    try {
      await printOrder(
        { order_number: orderNumber, client_name: clientName, payment_method: paymentMethod, total, items },
        accountName,
      );
      setPrintSuccess(true);
    } catch {
      // error state is handled by usePrinter hook
    }
  }

  async function handleShareImage() {
    if (!receiptRef.current) return;
    setIsSharing(true);
    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) return;

      const file = new File([blob], `recibo-${orderNumber}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `Recibo #${orderNumber}` });
      } else {
        // Fallback: download the image
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `recibo-${orderNumber}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      // user cancelled share or error
    } finally {
      setIsSharing(false);
    }
  }

  function handleForward() {
    const totalQty = items.reduce((s, i) => s + i.quantity, 0);
    const text = [
      '*Industria e Comercio Temperos Boa Mesa*',
      '+5517932254908',
      'Rua Cezar Pupin, Sao Jose do Rio Preto - SP',
      '',
      `Recibo *#${orderNumber}*`,
      `Cliente: ${clientName}`,
      `Data: ${date}`,
      `${items.length} itens (Qtd.: ${totalQty})`,
      '--------------------------------',
      ...items.map(
        (i) => `${i.quantity} x ${i.product_name} ${i.variant_name} .... R$${formatBRL(i.total)}\n  1 UN x R$${formatBRL(i.unit_price)}`
      ),
      '--------------------------------',
      `*Total: R$ ${formatBRL(total)}*`,
      paymentMethod ? `Pagamento: ${paymentMethod} R$ ${formatBRL(total)}` : '',
      '',
      'Pix: +5517997478319',
      'Ag 0825 Cc 130037722',
      '',
      '_AGRADECEMOS A PREFERENCIA_',
      date,
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="!top-4 !bottom-4 !translate-y-0 !max-h-none w-[340px] max-w-[calc(100%-2rem)] p-3 flex flex-col" showCloseButton>
        <DialogHeader>
          <DialogTitle>Cupom fiscal</DialogTitle>
        </DialogHeader>

        {/* Bluetooth printer status */}
        {isSupported && (
          <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-xs">
            <Bluetooth className={`size-3.5 shrink-0 ${isConnected ? 'text-blue-600' : 'text-muted-foreground'}`} />
            {isConnected ? (
              <span className="text-blue-600 font-medium">{deviceName ?? 'Impressora conectada'}</span>
            ) : (
              <>
                <span className="text-muted-foreground">Nenhuma impressora</span>
                <Button size="xs" variant="outline" onClick={connect} disabled={isConnecting} className="ml-auto h-6 px-2 text-[10px]">
                  {isConnecting ? 'Conectando...' : 'Conectar'}
                </Button>
              </>
            )}
          </div>
        )}

        {/* Print feedback */}
        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}
        {printSuccess && (
          <div className="rounded-md bg-green-50 border border-green-200 px-3 py-2 text-xs text-green-700">
            Recibo impresso com sucesso!
          </div>
        )}

        {/* Receipt preview */}
        <div ref={scrollRef} className="overflow-auto py-1 flex-1 min-h-0">
          <div ref={receiptRef}>
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
        </div>

        <DialogFooter>
          <Button size="sm" variant="outline" onClick={handleForward} className="flex-1">
            <Send className="mr-1 size-3.5" />
            Encaminhar
          </Button>
          {isSupported ? (
            <Button
              size="sm"
              onClick={handleBluetoothPrint}
              disabled={isPrinting || isConnecting}
              className="flex-1"
            >
              <Printer className="mr-1 size-3.5" />
              {isPrinting ? 'Imprimindo...' : 'Imprimir Cupom'}
            </Button>
          ) : (
            <Button size="sm" onClick={handleShareImage} disabled={isSharing} className="flex-1">
              <Printer className="mr-1 size-3.5" />
              {isSharing ? 'Gerando...' : 'Imprimir'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
