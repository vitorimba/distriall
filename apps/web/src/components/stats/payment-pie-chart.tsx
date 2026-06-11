'use client';

import type { PieLabelRenderProps } from 'recharts';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PAYMENT_METHOD_LABELS } from '@distriall/shared';
import { formatBRL } from '@distriall/shared';
import type { PaymentBreakdown } from '@distriall/shared';

// Chart-specific hex colors for each payment method (separate from bg/text CSS classes in enums)
const PIE_COLORS: Record<string, string> = {
  dinheiro: '#22c55e',
  pix: '#3b82f6',
  boleto: '#eab308',
  vale: '#a855f7',
  cartao: '#f97316',
  misto: '#6b7280',
};

interface PaymentPieChartProps {
  data: PaymentBreakdown[];
}

export function PaymentPieChart({ data }: PaymentPieChartProps) {
  const chartData = data.map((d) => ({
    name: PAYMENT_METHOD_LABELS[d.method] ?? d.method,
    value: d.amount,
    percentage: d.percentage,
    method: d.method,
  }));

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            label={(props: PieLabelRenderProps) => {
              const pct = (props as unknown as { percentage: number }).percentage;
              return `${pct}%`;
            }}
            labelLine={false}
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.method}
                fill={PIE_COLORS[entry.method] ?? '#6b7280'}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [formatBRL(Number(value)), 'Valor']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
