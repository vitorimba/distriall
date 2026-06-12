'use client';

import { useEffect, useState } from 'react';
import { useAccount } from '@/providers/account-provider';
import { useStats, type StatsFilters, type StatsPeriod } from '@/hooks/use-stats';
import { StatsCard } from '@/components/stats/stats-card';
import { RevenueChart } from '@/components/stats/revenue-chart';
import { PaymentPieChart } from '@/components/stats/payment-pie-chart';
import { ProductRankingTable } from '@/components/stats/product-ranking-table';
import { formatBRL } from '@distriall/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Tabs } from '@/components/ui/tabs';
import { Alert } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Period = StatsPeriod;

export default function DashboardPage() {
  const { accounts } = useAccount();
  const { stats, isLoading, error, fetchStats } = useStats();

  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [period, setPeriod] = useState<Period>('month');
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
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Visao geral do negocio</p>
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
          onChange={(id) => setPeriod(id as Period)}
        />

        {period === 'custom' && (
          <div className="flex items-center gap-2">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-36"
            />
            <span className="text-sm text-muted-foreground">ate</span>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-36"
            />
          </div>
        )}
      </div>

      {error && (
        <Alert tone="danger" title="Erro ao carregar estatisticas">
          {error}
        </Alert>
      )}

      {isLoading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="rect" className="h-24" />
          ))}
        </div>
      )}

      {!isLoading && stats && (
        <>
          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <StatsCard title="Faturamento" value={formatBRL(stats.revenue)} />
            <StatsCard title="Lucro" value={formatBRL(stats.profit)} />
            <StatsCard title="Ticket medio" value={formatBRL(stats.avg_ticket)} />
            <StatsCard title="Pedidos" value={String(stats.order_count)} />
            <StatsCard title="Clientes" value={String(stats.client_count)} />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evolucao semanal</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.weekly_evolution.length > 0 ? (
                  <RevenueChart data={stats.weekly_evolution} />
                ) : (
                  <EmptyState icon={BarChart3} title="Sem dados para exibir" />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formas de pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.payment_breakdown.length > 0 ? (
                  <PaymentPieChart data={stats.payment_breakdown} />
                ) : (
                  <EmptyState icon={BarChart3} title="Sem dados para exibir" />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Product ranking */}
          <Card>
            <CardHeader>
              <CardTitle>Top 10 produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductRankingTable data={stats.product_ranking} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
