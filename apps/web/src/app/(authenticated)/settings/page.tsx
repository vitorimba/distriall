'use client';

import Link from 'next/link';
import { usePrinter } from '@/hooks/use-printer';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion } from '@/components/ui/accordion';
import { Alert } from '@/components/ui/alert';
import { Bluetooth, Check, X, Printer, MapPin, ChevronRight } from 'lucide-react';

const FAQ = [
  {
    title: 'A impressora não aparece na lista de pareamento',
    content:
      'Verifique se a impressora está ligada e em modo de pareamento (LED piscando). Mantenha-a a menos de 1 metro do aparelho e tente novamente.',
  },
  {
    title: 'O recibo sai em branco ou cortado',
    content:
      'Confirme a largura do papel nas opções da impressora (58mm ou 80mm). Recibos cortados geralmente indicam configuração de largura errada.',
  },
  {
    title: 'A conexão cai durante a impressão',
    content:
      'Bluetooth de baixa energia pode hibernar. Desative a economia de bateria para o navegador nas configurações do Android.',
  },
];

const COMPAT = [
  { nome: 'Chrome no Android', ok: true },
  { nome: 'Edge no Android', ok: true },
  { nome: 'Chrome no desktop (Windows / macOS)', ok: true },
  { nome: 'Safari no iOS', ok: false },
  { nome: 'Firefox', ok: false },
];

export default function SettingsPage() {
  const {
    isSupported,
    isConnected,
    isConnecting,
    isPrinting,
    error,
    deviceName,
    connect,
    disconnect,
    testPrint,
  } = usePrinter();

  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader title="Configurações" />

      {/* Regioes de entrega */}
      <Link href="/settings/regions">
        <Card>
          <CardContent className="flex items-center gap-3 py-4">
            <span
              className="inline-flex items-center justify-center rounded-lg"
              style={{ width: 40, height: 40, background: 'var(--surface-inset)', color: 'var(--text-muted)' }}
            >
              <MapPin className="size-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">Regioes de Entrega</p>
              <p className="text-xs text-muted-foreground">
                Gerenciar regioes para agrupar clientes e pedidos
              </p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </CardContent>
        </Card>
      </Link>

      {/* Impressora termica */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bluetooth className="size-4" />
            Impressora térmica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Printer status with dot */}
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center rounded-lg"
              style={{
                width: 40,
                height: 40,
                background: isConnected
                  ? 'var(--success-soft)'
                  : 'var(--surface-inset)',
                color: isConnected
                  ? 'var(--text-positive)'
                  : 'var(--text-muted)',
              }}
            >
              <Printer className="size-5" />
            </span>
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span
                  className="shrink-0 rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: isConnected
                      ? 'var(--success)'
                      : 'var(--text-muted)',
                  }}
                />
                {isConnected
                  ? `Conectada — ${deviceName ?? 'Desconhecida'}`
                  : 'Desconectada'}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {isConnected
                  ? 'Pronta para imprimir recibos via Bluetooth'
                  : 'Pareie uma impressora Bluetooth para imprimir recibos'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {!isConnected ? (
              <Button size="sm" onClick={connect} disabled={isConnecting}>
                <Bluetooth className="mr-1 size-3.5" />
                {isConnecting ? 'Conectando...' : 'Conectar'}
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={testPrint}
                  disabled={isPrinting}
                >
                  <Printer className="mr-1 size-3.5" />
                  {isPrinting ? 'Imprimindo...' : 'Teste de impressão'}
                </Button>
                <Button size="sm" variant="outline" onClick={disconnect}>
                  Desconectar
                </Button>
              </>
            )}
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}

          {!isSupported && (
            <p className="text-xs text-muted-foreground">
              Web Bluetooth não é suportado neste navegador. Use Android Chrome
              ou Windows Chrome/Edge.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Compatibilidade */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Compatibilidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-2">
            {COMPAT.map((c) => (
              <div
                key={c.nome}
                className="flex items-center gap-2 text-sm"
              >
                <span
                  className="inline-flex"
                  style={{
                    color: c.ok
                      ? 'var(--text-positive)'
                      : 'var(--text-negative)',
                  }}
                >
                  {c.ok ? (
                    <Check className="size-4" />
                  ) : (
                    <X className="size-4" />
                  )}
                </span>
                <span className="text-muted-foreground">{c.nome}</span>
              </div>
            ))}
          </div>

          <Alert
            tone="warning"
            title="Safari e Firefox não suportam Web Bluetooth"
          >
            Para imprimir recibos, use Chrome ou Edge no Android.
          </Alert>
        </CardContent>
      </Card>

      {/* Solucao de problemas */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Solução de problemas</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Accordion items={FAQ} />
        </CardContent>
      </Card>
    </div>
  );
}
