'use client';

import { useState, useRef, useCallback } from 'react';
import { BluetoothPrinter } from '@/lib/bluetooth/printer';
import { buildOrderReceipt, buildLoadingListReceipt } from '@/lib/bluetooth/receipt';
import { ESCPOSBuilder } from '@/lib/bluetooth/escpos';
import type { ConsolidatedProduct, LoadingSummary } from '@/lib/utils/loading-consolidation';

interface OrderForPrint {
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

export function usePrinter() {
  const printerRef = useRef<BluetoothPrinter | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deviceName, setDeviceName] = useState<string | null>(null);

  const isSupported = BluetoothPrinter.isSupported();

  const connect = useCallback(async () => {
    setError(null);
    setIsConnecting(true);

    try {
      const printer = new BluetoothPrinter();
      await printer.connect();
      printerRef.current = printer;
      setIsConnected(true);
      setDeviceName(printer.deviceName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar');
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    printerRef.current?.disconnect();
    printerRef.current = null;
    setIsConnected(false);
    setDeviceName(null);
  }, []);

  async function ensureConnected(): Promise<BluetoothPrinter> {
    if (printerRef.current?.isConnected) {
      return printerRef.current;
    }
    // Try reconnect
    await connect();
    if (!printerRef.current?.isConnected) {
      throw new Error('Impressora nao conectada');
    }
    return printerRef.current;
  }

  const printOrder = useCallback(async (order: OrderForPrint, accountName: string) => {
    setError(null);
    setIsPrinting(true);

    try {
      const printer = await ensureConnected();

      // Via 1 - Cliente
      const via1 = buildOrderReceipt(order, accountName, 1);
      await printer.print(via1);

      // Delay between vias
      await new Promise((r) => setTimeout(r, 500));

      // Via 2 - Controle
      const via2 = buildOrderReceipt(order, accountName, 2);
      await printer.print(via2);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao imprimir');
      throw err;
    } finally {
      setIsPrinting(false);
    }
  }, [connect]); // eslint-disable-line react-hooks/exhaustive-deps

  const printLoadingList = useCallback(async (products: ConsolidatedProduct[], summary: LoadingSummary) => {
    setError(null);
    setIsPrinting(true);

    try {
      const printer = await ensureConnected();
      const data = buildLoadingListReceipt(products, summary);
      await printer.print(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao imprimir');
      throw err;
    } finally {
      setIsPrinting(false);
    }
  }, [connect]); // eslint-disable-line react-hooks/exhaustive-deps

  const testPrint = useCallback(async () => {
    setError(null);
    setIsPrinting(true);

    try {
      const printer = await ensureConnected();
      const b = new ESCPOSBuilder();
      b.init()
        .align('center')
        .bold(true)
        .doubleSize(true)
        .text('DISTRIALL')
        .newline()
        .doubleSize(false)
        .bold(false)
        .text('Teste de Impressao')
        .newline()
        .fullSeparator()
        .text('Impressora configurada!')
        .newline()
        .text(new Date().toLocaleString('pt-BR'))
        .newline()
        .fullSeparator()
        .cut();
      await printer.print(b.build());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao imprimir');
      throw err;
    } finally {
      setIsPrinting(false);
    }
  }, [connect]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isSupported,
    isConnected,
    isConnecting,
    isPrinting,
    error,
    deviceName,
    connect,
    disconnect,
    printOrder,
    printLoadingList,
    testPrint,
  };
}
