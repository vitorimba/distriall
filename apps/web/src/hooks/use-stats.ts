import { useState, useCallback } from 'react';
import type { DashboardStats } from '@distriall/shared';

export type StatsPeriod = 'day' | 'week' | 'month' | 'custom';

export interface StatsFilters {
  accountId?: string;
  period: StatsPeriod;
  startDate?: string;
  endDate?: string;
}

export function useStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
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

      setStats(json as DashboardStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { stats, isLoading, error, fetchStats };
}
