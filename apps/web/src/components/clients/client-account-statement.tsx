'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Money } from '@/components/ui/money';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

interface StatementEntry {
  id: string;
  type: 'debit' | 'credit';
  description: string;
  amount: number;
  date: string;
  running_balance: number;
}

interface ClientAccountStatementProps {
  clientId: string;
}

export function ClientAccountStatement({ clientId }: ClientAccountStatementProps) {
  const [entries, setEntries] = useState<StatementEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const timeline: StatementEntry[] = [];

      // Fetch pending and paid vouchers (debits)
      const { data: vouchers } = await supabase
        .from('vouchers')
        .select('id, amount, status, created_at')
        .eq('client_id', clientId)
        .order('created_at', { ascending: true });

      // Fetch payments linked to client orders (credits)
      const { data: payments } = await supabase
        .from('payments')
        .select('id, amount, method, created_at, orders!inner(client_id)')
        .eq('orders.client_id', clientId)
        .order('created_at', { ascending: true });

      for (const v of vouchers ?? []) {
        timeline.push({
          id: `v-${v.id}`,
          type: 'debit',
          description: `Vale ${v.status === 'pendente' ? '(pendente)' : '(pago)'}`,
          amount: Number(v.amount),
          date: v.created_at,
          running_balance: 0,
        });
      }

      for (const p of payments ?? []) {
        timeline.push({
          id: `p-${p.id}`,
          type: 'credit',
          description: `Pagamento (${p.method})`,
          amount: Number(p.amount),
          date: p.created_at,
          running_balance: 0,
        });
      }

      // Sort by date and compute running balance
      timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      let balance = 0;
      for (const entry of timeline) {
        if (entry.type === 'debit') {
          balance += entry.amount;
        } else {
          balance -= entry.amount;
        }
        entry.running_balance = Math.round(balance * 100) / 100;
      }

      setEntries(timeline.slice(-20)); // last 20 entries
      setLoading(false);
    }
    load();
  }, [clientId]);

  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-base">Conta Corrente</CardTitle></CardHeader>
        <CardContent><Skeleton variant="rect" className="h-24" /></CardContent>
      </Card>
    );
  }

  if (entries.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Conta Corrente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
              {entry.type === 'debit' ? (
                <ArrowDownCircle className="size-4 text-destructive shrink-0" />
              ) : (
                <ArrowUpCircle className="size-4 text-emerald-600 shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <div className="font-medium">{entry.description}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(entry.date).toLocaleDateString('pt-BR')}
                </div>
              </div>
              <div className="text-right">
                <div className={entry.type === 'debit' ? 'text-destructive font-medium' : 'text-emerald-600 font-medium'}>
                  {entry.type === 'debit' ? '+' : '-'}<Money value={entry.amount} />
                </div>
                <div className="text-xs text-muted-foreground">
                  Saldo: <Money value={entry.running_balance} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
