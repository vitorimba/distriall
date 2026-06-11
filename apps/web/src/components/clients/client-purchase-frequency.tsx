'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { Card, CardContent } from '@/components/ui/card';
import { calculatePurchaseFrequency } from '@distriall/shared';
import { Calendar, TrendingUp } from 'lucide-react';

const FREQUENCY_LABELS: Record<string, string> = {
  semanal: 'Semanal',
  quinzenal: 'Quinzenal',
  mensal: 'Mensal',
  irregular: 'Irregular',
  novo: 'Novo cliente',
};

interface ClientPurchaseFrequencyProps {
  clientId: string;
}

export function ClientPurchaseFrequency({ clientId }: ClientPurchaseFrequencyProps) {
  const { activeAccount } = useAccount();
  const [data, setData] = useState<{
    frequency: string;
    avgIntervalDays: number;
    lastOrderDate: Date | null;
    daysSinceLastOrder: number | null;
  } | null>(null);

  useEffect(() => {
    if (!activeAccount || !clientId) return;

    let cancelled = false;

    async function load() {
      const supabase = createClient();

      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      const { data: orders } = await supabase
        .from('orders')
        .select('created_at')
        .eq('client_id', clientId)
        .eq('account_id', activeAccount!.id)
        .neq('status', 'cancelado')
        .gte('created_at', threeMonthsAgo.toISOString())
        .order('created_at', { ascending: false });

      if (cancelled) return;

      const dates = (orders ?? []).map((o) => new Date(o.created_at));
      const result = calculatePurchaseFrequency(dates);
      setData(result);
    }

    load();
    return () => { cancelled = true; };
  }, [activeAccount, clientId]);

  if (!data) return null;

  const label = FREQUENCY_LABELS[data.frequency] ?? data.frequency;

  return (
    <Card>
      <CardContent className="pt-4 pb-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="size-4 text-muted-foreground shrink-0" />
          <span className="text-muted-foreground">Ultimo pedido:</span>
          {data.lastOrderDate ? (
            <span className="font-medium">
              {data.lastOrderDate.toLocaleDateString('pt-BR')}
              {data.daysSinceLastOrder !== null && (
                <span className="text-muted-foreground font-normal">
                  {' '}(ha {data.daysSinceLastOrder} {data.daysSinceLastOrder === 1 ? 'dia' : 'dias'})
                </span>
              )}
            </span>
          ) : (
            <span className="text-muted-foreground">Nenhum pedido</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="size-4 text-muted-foreground shrink-0" />
          <span className="text-muted-foreground">Frequencia:</span>
          <span className="font-medium">{label}</span>
          {data.avgIntervalDays > 0 && (
            <span className="text-muted-foreground">(~{data.avgIntervalDays} dias)</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
