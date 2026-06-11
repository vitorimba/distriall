'use client';

import { useEffect, useState } from 'react';
import { useAccount } from '@/providers/account-provider';
import { useStats, type StatsFilters, type StatsPeriod } from '@/hooks/use-stats';
import { ProductRankingTable } from '@/components/stats/product-ranking-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StatsPage() {
  const { accounts } = useAccount();
  const { stats, isLoading, error, fetchStats } = useStats();

  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [period, setPeriod] = useState<StatsPeriod>('month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const filters: StatsFilters = {
      period,
      accountId: selectedAccountId || undefined,
      startDate: period === 'custom' ? startDate : undefined,
      endDate: period === 'custom' ? endDate : undefined,
    };
    fetchStats(filters);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAccountId, period, startDate, endDate]);

  const periods: { label: string; value: StatsPeriod }[] = [
    { label: 'Hoje', value: 'day' },
    { label: 'Semana', value: 'week' },
    { label: 'Mês', value: 'month' },
    { label: 'Customizado', value: 'custom' },
  ];

  return (
    <div className="space-y-6 p-4 pb-20">
      <div>
        <h1 className="text-xl font-bold">Estatísticas</h1>
        <p className="text-sm text-muted-foreground">Ranking completo de produtos</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          className="rounded-md border bg-background px-3 py-1.5 text-sm"
        >
          <option value="">Todas as contas</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>

        <div className="flex gap-1">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                period === p.value
                  ? 'bg-primary text-primary-foreground'
                  : 'border text-muted-foreground hover:bg-muted'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {period === 'custom' && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-md border bg-background px-3 py-1.5 text-sm"
            />
            <span className="text-sm text-muted-foreground">até</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-md border bg-background px-3 py-1.5 text-sm"
            />
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
      )}

      {!isLoading && stats && (
        <Card>
          <CardHeader>
            <CardTitle>Ranking Completo de Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductRankingTable data={stats.product_ranking} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
