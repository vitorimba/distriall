'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatBRL } from '@distriall/shared';
import type { WeeklyEvolution } from '@distriall/shared';

interface RevenueChartProps {
  data: WeeklyEvolution[];
}

function formatWeekLabel(week: string): string {
  // week is a date string like '2026-06-02' (Monday of the week)
  const d = new Date(week + 'T00:00:00');
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    weekLabel: formatWeekLabel(d.week),
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <XAxis dataKey="weekLabel" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
            width={60}
          />
          <Tooltip
            formatter={(value) => [formatBRL(Number(value)), '']}
            labelFormatter={(label) => `Semana de ${label}`}
          />
          <Legend />
          <Bar dataKey="revenue" fill="#22c55e" name="Faturamento" radius={[2, 2, 0, 0]} />
          <Bar dataKey="profit" fill="#3b82f6" name="Lucro" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
