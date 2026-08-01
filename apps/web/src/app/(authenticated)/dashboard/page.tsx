'use client';

import { useEffect, useState } from 'react';
import { useAccount } from '@/providers/account-provider';
import { useStats, type StatsFilters, type StatsPeriod } from '@/hooks/use-stats';
import { StatsCard } from '@/components/stats/stats-card';
import { BarChart } from '@/components/ui/charts/bar-chart';
import { DonutChart } from '@/components/ui/charts/donut-chart';
import { HBarList } from '@/components/ui/charts/hbar-list';
import { fmtBRL, CHART_COLORS } from '@/components/ui/charts/chart-utils';
import { PAYMENT_METHOD_LABELS } from '@distriall/shared';
import { Money } from '@/components/ui/money';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { ChipFilter } from '@/components/ui/chip-filter';
import { Alert } from '@/components/ui/alert';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/ui/page-header';

type Period = StatsPeriod;

export default function DashboardPage() {
  const { accounts } = useAccount();
  const { stats, delta, isLoading, error, fetchStats } = useStats();

  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  const [period, setPeriod] = useState<Period>('day');
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
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <StatsCard title="Faturamento" value="" accent loading />
            <StatsCard title="Lucro" value="" loading />
            <StatsCard title="Ticket medio" value="" loading />
            <StatsCard title="Pedidos" value="" loading />
            <StatsCard title="Clientes" value="" loading />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Skeleton variant="rect" className="h-64" />
            <Skeleton variant="rect" className="h-64" />
          </div>
          <Skeleton variant="rect" className="h-48" />
        </div>
      )}

      {!isLoading && stats && (
        <>
          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <StatsCard
              title="Faturamento"
              value={<Money value={stats.revenue} />}
              accent
              delta={delta?.revenue ?? undefined}
              deltaLabel="vs periodo ant."
              spark={delta?.spark}
            />
            <StatsCard
              title="Lucro"
              value={<Money value={stats.profit} signed />}
              delta={delta?.profit ?? undefined}
              deltaLabel="vs periodo ant."
            />
            <StatsCard title="Ticket medio" value={<Money value={stats.avg_ticket} />} />
            <StatsCard
              title="Pedidos"
              value={String(stats.order_count)}
              delta={delta?.orders ?? undefined}
              deltaLabel="vs periodo ant."
            />
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
                  <DonutChart
                    data={stats.payment_breakdown
                      .slice(0, 5)
                      .map((d, i) => ({
                        label: PAYMENT_METHOD_LABELS[d.method] ?? d.method,
                        value: d.amount,
                        color: CHART_COLORS[i % CHART_COLORS.length],
                      }))}
                    centerValue={fmtBRL(stats.payment_breakdown.reduce((a, d) => a + d.amount, 0))}
                    centerLabel="Total"
                    formatValue={fmtBRL}
                    showPercent={false}
                  />
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
              {stats.product_ranking.length > 0 ? (
                <HBarList
                  data={stats.product_ranking.slice(0, 10).map((p) => ({
                    label: p.product_name,
                    value: p.total_value,
                  }))}
                  color="var(--chart-1)"
                  formatValue={fmtBRL}
                />
              ) : (
                <EmptyState icon={BarChart3} title="Sem dados para exibir" />
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
