'use client';

import { useState, useEffect } from 'react';
import { useVouchers } from '@/hooks/use-vouchers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { Money } from '@/components/ui/money';

export function ClientDebtSummary({ clientId }: { clientId: string }) {
  const { getClientDebt } = useVouchers();
  const [debt, setDebt] = useState<{ voucherDebt: number; totalDebt: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(async () => {
      if (cancelled) return;
      const d = await getClientDebt(clientId);
      if (!cancelled) setDebt(d);
    }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, [clientId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!debt || debt.totalDebt === 0) return null;

  return (
    <Card className="border-yellow-300 bg-yellow-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm text-yellow-800">
          <AlertTriangle className="size-4" />
          Saldo Devedor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 text-sm">
          {debt.voucherDebt > 0 && (
            <div className="flex justify-between">
              <span className="text-yellow-700">Vales pendentes</span>
              <Money value={debt.voucherDebt} className="font-medium text-yellow-800" />
            </div>
          )}
          <div className="flex justify-between border-t border-yellow-200 pt-1 font-bold text-yellow-900">
            <span>Total devedor</span>
            <Money value={debt.totalDebt} className="font-bold" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
