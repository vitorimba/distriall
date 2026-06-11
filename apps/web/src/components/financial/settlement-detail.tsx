'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatBRL, SETTLEMENT_STATUS_LABELS, SETTLEMENT_STATUS_COLORS } from '@distriall/shared';
import { SettlementSummary } from './settlement-summary';
import { RevenueBreakdown } from './revenue-breakdown';
import { SettlementOrders } from './settlement-orders';
import { SettlementExpenses } from './settlement-expenses';
import { useSettlements } from '@/hooks/use-settlements';
import { cn } from '@/lib/utils';
import type { Settlement } from '@distriall/shared';
import type { SettlementOrderRow, SettlementExpenseRow } from '@/hooks/use-settlements';

interface SettlementDetailProps {
  settlement: Settlement;
  orders: SettlementOrderRow[];
  expenses: SettlementExpenseRow[];
  onRefresh: () => void;
}

function formatDateRange(start: string, end: string) {
  const fmt = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
  return `${fmt(start)} – ${fmt(end)}`;
}

export function SettlementDetail({ settlement, orders, expenses, onRefresh }: SettlementDetailProps) {
  const router = useRouter();
  const { closeSettlement, updateSettlementStatus, deleteSettlement } = useSettlements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const statusColors = SETTLEMENT_STATUS_COLORS[settlement.status];

  async function handleMarkConferido() {
    setError(null);
    setLoading(true);
    try {
      await updateSettlementStatus(settlement.id, 'conferido');
      onRefresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleClose() {
    if (!confirm('Fechar o acerto? Esta acao e irreversivel.')) return;
    setError(null);
    setLoading(true);
    try {
      await closeSettlement(settlement.id);
      onRefresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegenerate() {
    if (!confirm('Regenerar o acerto? O acerto atual sera excluido e recalculado.')) return;
    setError(null);
    setLoading(true);
    try {
      await deleteSettlement(settlement.id);
      router.push('/financial/settlements');
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDateRange(settlement.period_start, settlement.period_end)}
          </p>
          <p className="text-lg font-bold">{formatBRL(settlement.net_profit)}</p>
        </div>
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
            statusColors.bg, statusColors.text, statusColors.border
          )}
        >
          {SETTLEMENT_STATUS_LABELS[settlement.status]}
        </span>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Summary */}
      <SettlementSummary settlement={settlement} />

      {/* Revenue breakdown */}
      <RevenueBreakdown settlement={settlement} />

      {/* Orders */}
      <SettlementOrders orders={orders} />

      {/* Expenses */}
      <SettlementExpenses expenses={expenses} />

      {/* Action buttons */}
      {settlement.status !== 'fechado' && (
        <div className="flex flex-col gap-2 pt-2">
          {settlement.status === 'rascunho' && (
            <Button
              variant="outline"
              className="w-full"
              disabled={loading}
              onClick={handleMarkConferido}
            >
              Marcar como Conferido
            </Button>
          )}
          <Button
            className="w-full"
            disabled={loading}
            onClick={handleClose}
          >
            Fechar Acerto
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            disabled={loading}
            onClick={handleRegenerate}
          >
            Regenerar
          </Button>
        </div>
      )}

      {settlement.status === 'fechado' && settlement.closed_at && (
        <p className="text-center text-xs text-muted-foreground">
          Fechado em {new Date(settlement.closed_at).toLocaleDateString('pt-BR')}
        </p>
      )}
    </div>
  );
}
