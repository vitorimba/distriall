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

  const periods: { label: string; value: Period }[] = [
    { label: 'Hoje', value: 'day' },
    { label: 'Semana', value: 'week' },
    { label: 'Mês', value: 'month' },
    { label: 'Customizado', value: 'custom' },
  ];

  return (
    <div className="space-y-6 p-4 pb-20">
      <div>
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Visão geral do negócio</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Account filter */}
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

        {/* Period selector */}
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

        {/* Custom date range */}
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      )}

      {!isLoading && stats && (
        <>
          {/* Metric cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <StatsCard title="Faturamento" value={formatBRL(stats.revenue)} />
            <StatsCard title="Lucro" value={formatBRL(stats.profit)} />
            <StatsCard
              title="Ticket Médio"
              value={formatBRL(stats.avg_ticket)}
            />
            <StatsCard
              title="Pedidos"
              value={String(stats.order_count)}
            />
            <StatsCard
              title="Clientes"
              value={String(stats.client_count)}
            />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evolução Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.weekly_evolution.length > 0 ? (
                  <RevenueChart data={stats.weekly_evolution} />
                ) : (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Sem dados para exibir
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formas de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.payment_breakdown.length > 0 ? (
                  <PaymentPieChart data={stats.payment_breakdown} />
                ) : (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    Sem dados para exibir
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Product ranking */}
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Produtos</CardTitle>
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
