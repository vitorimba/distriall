'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import type { ClientBalance } from '@distriall/shared';
import { Money } from '@/components/ui/money';

interface ClientBalanceCardProps {
  clientId: string;
  balance: ClientBalance;
}

export function ClientBalanceCard({ clientId, balance }: ClientBalanceCardProps) {
  const hasDebt = balance.total > 0;

  if (!hasDebt) {
    return (
      <Card className="border-green-300 bg-green-50">
        <CardContent className="flex items-center gap-2 pt-4 pb-4">
          <CheckCircle className="size-4 text-green-700 shrink-0" />
          <span className="text-sm font-medium text-green-800">Sem debito pendente</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-red-300 bg-red-50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm text-red-800">
          <AlertTriangle className="size-4" />
          Saldo Devedor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {balance.vouchers_pending > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-red-700">
              Vales pendentes ({balance.vouchers_count})
            </span>
            <Money value={balance.vouchers_pending} className="font-medium text-red-800" />
          </div>
        )}
        {balance.payments_pending > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-red-700">
              Pagamentos pendentes ({balance.payments_count})
            </span>
            <Money value={balance.payments_pending} className="font-medium text-red-800" />
          </div>
        )}
        <div className="flex justify-between border-t border-red-200 pt-1 text-sm font-bold text-red-900">
          <span>Total devedor</span>
          <Money value={balance.total} />
        </div>
        {balance.vouchers_pending > 0 && (
          <div className="pt-1">
            <Link
              href={`/financial?client=${clientId}&tab=vouchers`}
              className="text-xs text-red-700 underline underline-offset-2"
            >
              Ver vales pendentes
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
