import { useState, useCallback } from 'react';
import type { DashboardStats } from '@distriall/shared';

export type StatsPeriod = 'day' | 'week' | 'month' | 'custom';

export interface StatsFilters {
  accountId?: string;
  period: StatsPeriod;
  startDate?: string;
  endDate?: string;
}

export interface StatsWithDelta {
  current: DashboardStats;
  revenueDelta: number | null;
  profitDelta: number | null;
  orderDelta: number | null;
  spark: number[];
}

function getPrevDateRange(
  period: StatsPeriod,
  startDate?: string,
  endDate?: string,
): { start: string; end: string } | null {
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().split('T')[0];

  if (period === 'day') {
    const prev = new Date(today);
    prev.setDate(today.getDate() - 1);
    return { start: fmt(prev), end: fmt(prev) };
  }

  if (period === 'week') {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay() - 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start: fmt(start), end: fmt(end) };
  }

  if (period === 'month') {
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    return { start: fmt(start), end: fmt(end) };
  }

  if (period === 'custom' && startDate && endDate) {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = e.getTime() - s.getTime();
    const prevEnd = new Date(s.getTime() - 1);
    const prevStart = new Date(prevEnd.getTime() - diff);
    return { start: fmt(prevStart), end: fmt(prevEnd) };
  }

  return null;
}

function calcDelta(current: number, prev: number): number | null {
  if (prev === 0) return null;
  return ((current - prev) / prev) * 100;
}

export function useStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [delta, setDelta] = useState<{
    revenue: number | null;
    profit: number | null;
    orders: number | null;
    spark: number[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (filters: StatsFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.accountId) params.set('account_id', filters.accountId);
      params.set('period', filters.period);
      if (filters.startDate) params.set('start_date', filters.startDate);
      if (filters.endDate) params.set('end_date', filters.endDate);

      const res = await fetch(`/api/stats?${params.toString()}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? 'Erro ao buscar estatísticas');
      }

      const current = json as DashboardStats;
      setStats(current);

      // Fetch previous period for delta calculation
      const prevRange = getPrevDateRange(filters.period, filters.startDate, filters.endDate);
      if (prevRange) {
        const prevParams = new URLSearchParams();
        if (filters.accountId) prevParams.set('account_id', filters.accountId);
        prevParams.set('period', 'custom');
        prevParams.set('start_date', prevRange.start);
        prevParams.set('end_date', prevRange.end);
        // Só precisamos de revenue/profit/order_count do período anterior para o delta.
        // delta_only evita as agregações pesadas no servidor. O spark vem do período atual.
        prevParams.set('delta_only', '1');

        const prevRes = await fetch(`/api/stats?${prevParams.toString()}`);
        if (prevRes.ok) {
          const prev = (await prevRes.json()) as DashboardStats;
          const spark = current.weekly_evolution.slice(-8).map((w) => w.revenue);
          setDelta({
            revenue: calcDelta(current.revenue, prev.revenue),
            profit: calcDelta(current.profit, prev.profit),
            orders: calcDelta(current.order_count, prev.order_count),
            spark,
          });
        }
      } else {
        setDelta(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setStats(null);
      setDelta(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { stats, delta, isLoading, error, fetchStats };
}
