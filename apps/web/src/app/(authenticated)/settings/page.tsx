'use client';

import { usePrinter } from '@/hooks/use-printer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bluetooth, Check, X, Printer } from 'lucide-react';

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
      <h1 className="text-xl font-bold">Configuracoes</h1>

      {/* Printer section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bluetooth className="size-4" />
            Impressora Bluetooth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Web Bluetooth support check */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Web Bluetooth:</span>
            {isSupported ? (
              <span className="flex items-center gap-1 text-green-600">
                <Check className="size-3.5" /> Suportado
              </span>
            ) : (
              <span className="flex items-center gap-1 text-destructive">
                <X className="size-3.5" /> Nao suportado
              </span>
            )}
          </div>

          {/* Connection status */}
          {isSupported && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Status:</span>
                {isConnected ? (
                  <span className="text-green-600">Conectada: {deviceName ?? 'Desconhecida'}</span>
                ) : (
                  <span className="text-muted-foreground">Nao configurada</span>
                )}
              </div>

              <div className="flex gap-2">
                {!isConnected ? (
                  <Button size="sm" onClick={connect} disabled={isConnecting}>
                    <Bluetooth className="mr-1 size-3.5" />
                    {isConnecting ? 'Conectando...' : 'Conectar Impressora'}
                  </Button>
                ) : (
                  <>
                    <Button size="sm" variant="outline" onClick={testPrint} disabled={isPrinting}>
                      <Printer className="mr-1 size-3.5" />
                      {isPrinting ? 'Imprimindo...' : 'Testar Impressao'}
                    </Button>
                    <Button size="sm" variant="outline" onClick={disconnect}>
                      Desconectar
                    </Button>
                  </>
                )}
              </div>

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              <div className="text-xs text-muted-foreground space-y-1 border-t pt-2">
                <p className="font-medium">Troubleshooting:</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>Ligue a impressora e ative o Bluetooth do celular</li>
                  <li>A impressora deve ser BLE (Bluetooth Low Energy)</li>
                  <li>Se nao aparecer na lista, desligue e religue a impressora</li>
                  <li>Use apenas Android Chrome ou Windows Chrome/Edge</li>
                </ul>
              </div>
            </>
          )}

          {!isSupported && (
            <p className="text-xs text-muted-foreground">
              Web Bluetooth nao e suportado neste navegador. Use Android Chrome ou Windows Chrome/Edge.
              Cupons podem ser visualizados em tela como alternativa.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
