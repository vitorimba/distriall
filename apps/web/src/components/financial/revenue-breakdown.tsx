'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Money } from '@/components/ui/money';
import { formatBRL } from '@distriall/shared';
import type { Settlement } from '@distriall/shared';

interface RevenueBreakdownProps {
  settlement: Settlement;
}

const METHODS = [
  { key: 'revenue_dinheiro' as const, label: 'Dinheiro' },
  { key: 'revenue_pix' as const, label: 'Pix' },
  { key: 'revenue_boleto' as const, label: 'Boleto (Boa Mesa)' },
  { key: 'revenue_vale' as const, label: 'Vale' },
  { key: 'revenue_cartao' as const, label: 'Cartao' },
];

export function RevenueBreakdown({ settlement }: RevenueBreakdownProps) {
  const total = settlement.total_revenue;

  return (
    <Card>
      <CardContent className="pt-4 space-y-2">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Receita por Forma de Pagamento
        </h2>

        {METHODS.map(({ key, label }) => {
          const amount = settlement[key];
          const pct = total > 0 ? (amount / total) * 100 : 0;

          if (amount === 0) return null;

          return (
            <div key={key} className="space-y-0.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">
                  {formatBRL(amount)}
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({pct.toFixed(1)}%)
                  </span>
                </span>
              </div>
              <ProgressBar value={pct} />
            </div>
          );
        })}

        {total === 0 && (
          <p className="text-sm text-muted-foreground py-2">Nenhuma receita no periodo</p>
        )}
      </CardContent>
    </Card>
  );
}
