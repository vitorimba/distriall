'use client';

import { useLoadingStore } from '@/stores/loading-store';

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

interface LoadingActionBarProps {
  onOpenSheet: () => void;
}

export function LoadingActionBar({ onOpenSheet }: LoadingActionBarProps) {
  const { summary } = useLoadingStore();

  if (!summary) return null;

  return (
    <button
      onClick={onOpenSheet}
      className="fixed bottom-16 left-0 right-0 z-40 bg-green-600 px-4 py-3 text-white shadow-lg transition-transform animate-in slide-in-from-bottom"
    >
      <div className="mx-auto flex max-w-lg items-center justify-between text-sm">
        <span className="font-medium">
          {summary.orderCount} pedido{summary.orderCount !== 1 ? 's' : ''} | {summary.accountCount} conta{summary.accountCount !== 1 ? 's' : ''}
        </span>
        <span>
          Fat: {formatBRL(summary.totalRevenue)} | Lucro: {formatBRL(summary.totalProfit)}
        </span>
      </div>
    </button>
  );
}
