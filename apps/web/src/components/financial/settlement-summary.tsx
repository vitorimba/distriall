'use client';

import { Card, CardContent } from '@/components/ui/card';
import { formatBRL } from '@distriall/shared';
import type { Settlement } from '@distriall/shared';

interface SettlementSummaryProps {
  settlement: Settlement;
}

export function SettlementSummary({ settlement }: SettlementSummaryProps) {
  const netColor = settlement.net_profit >= 0 ? 'text-green-700' : 'text-red-600';

  return (
    <Card>
      <CardContent className="pt-4 space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Resumo do Acerto</h2>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Vendido</p>
            <p className="font-semibold">{formatBRL(settlement.total_revenue)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Custo Mercadoria</p>
            <p className="font-semibold text-orange-600">- {formatBRL(settlement.total_cost)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Gastos</p>
            <p className="font-semibold text-orange-600">- {formatBRL(settlement.total_expenses)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Devolucoes</p>
            <p className="font-semibold text-orange-600">- {formatBRL(settlement.total_returns)}</p>
          </div>
        </div>

        <div className="border-t pt-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Lucro Bruto</p>
            <p className="font-semibold">{formatBRL(settlement.gross_profit)}</p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-base font-bold">Lucro Liquido</p>
            <p className={`text-lg font-bold ${netColor}`}>{formatBRL(settlement.net_profit)}</p>
          </div>
        </div>

        <div className="border-t pt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{settlement.order_count} pedido{settlement.order_count !== 1 ? 's' : ''}</span>
          <span>{settlement.client_count} cliente{settlement.client_count !== 1 ? 's' : ''}</span>
        </div>

        {settlement.pending_vouchers_count > 0 && (
          <div className="rounded-md bg-yellow-50 border border-yellow-200 p-2 text-xs">
            <span className="font-medium text-yellow-800">
              {settlement.pending_vouchers_count} vale{settlement.pending_vouchers_count !== 1 ? 's' : ''} pendente{settlement.pending_vouchers_count !== 1 ? 's' : ''}:
            </span>{' '}
            <span className="text-yellow-700">{formatBRL(settlement.pending_vouchers_amount)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
