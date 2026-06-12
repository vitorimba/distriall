'use client';

import { useEffect, useState } from 'react';
import { useAccount } from '@/providers/account-provider';
import { useStats, type StatsFilters, type StatsPeriod } from '@/hooks/use-stats';
import { ProductRankingTable } from '@/components/stats/product-ranking-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Tabs } from '@/components/ui/tabs';
import { Alert } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

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

  const periodTabs = [
    { id: 'day', label: 'Hoje' },
    { id: 'week', label: 'Semana' },
    { id: 'month', label: 'Mes' },
    { id: 'custom', label: 'Customizado' },
  ];

  return (
    <div className="space-y-6 p-4 pb-20">
      <div>
        <h1 className="text-xl font-bold">Estatisticas</h1>
        <p className="text-sm text-muted-foreground">Ranking completo de produtos</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-3">
        <Select
          options={[
            { value: '', label: 'Todas as contas' },
            ...accounts.map((a) => ({ value: a.id, label: a.name })),
          ]}
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
          className="w-48"
        />

        <Tabs
          tabs={periodTabs}
          active={period}
          onChange={(id) => setPeriod(id as StatsPeriod)}
        />

        {period === 'custom' && (
          <div className="flex items-center gap-2">
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-36" />
            <span className="text-sm text-muted-foreground">ate</span>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-36" />
          </div>
        )}
      </div>

      {error && <Alert tone="danger">{error}</Alert>}

      {isLoading && <Skeleton variant="rect" className="h-48" />}

      {!isLoading && stats && (
        <Card>
          <CardHeader>
            <CardTitle>Ranking completo de produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductRankingTable data={stats.product_ranking} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
