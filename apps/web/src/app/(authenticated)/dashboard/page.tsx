'use client';

import { useEffect, useState } from 'react';
import { useAccount } from '@/providers/account-provider';
import { useStats, type StatsFilters, type StatsPeriod } from '@/hooks/use-stats';
import { StatsCard } from '@/components/stats/stats-card';
import { PaymentPieChart } from '@/components/stats/payment-pie-chart';
import { BarChart } from '@/components/ui/charts/bar-chart';
import { fmtBRL } from '@/components/ui/charts/chart-utils';
import { ProductRankingTable } from '@/components/stats/product-ranking-table';
import { Money } from '@/components/ui/money';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { ChipFilter } from '@/components/ui/chip-filter';
import { Alert } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/ui/page-header';

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

  const periodOptions = [
    { value: 'day', label: 'Hoje' },
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mes' },
    { value: 'custom', label: 'Customizado' },
  ];

  return (
    <div className="space-y-6 p-4 pb-20">
      <PageHeader title="Dashboard" subtitle="Visao geral do negocio" />

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

        <ChipFilter
          options={periodOptions}
          selected={period}
          onChange={(value) => setPeriod(value as Period)}
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
            <StatsCard title="Faturamento" value={<Money value={stats.revenue} />} />
            <StatsCard title="Lucro" value={<Money value={stats.profit} signed />} />
            <StatsCard title="Ticket medio" value={<Money value={stats.avg_ticket} />} />
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
                  <div className="space-y-4">
                    <div>
                      <p className="mb-1 text-xs font-medium text-muted-foreground">Faturamento</p>
                      <BarChart
                        data={stats.weekly_evolution.map((d) => ({
                          label: d.week.slice(5).replace('-', '/'),
                          value: d.revenue,
                        }))}
                        color="var(--chart-1)"
                        formatValue={fmtBRL}
                        highlightMax
                      />
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium text-muted-foreground">Lucro</p>
                      <BarChart
                        data={stats.weekly_evolution.map((d) => ({
                          label: d.week.slice(5).replace('-', '/'),
                          value: d.profit,
                        }))}
                        color="var(--chart-3)"
                        formatValue={fmtBRL}
                        highlightMax
                        height={100}
                      />
                    </div>
                  </div>
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
