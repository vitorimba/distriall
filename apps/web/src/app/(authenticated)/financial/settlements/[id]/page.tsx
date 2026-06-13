'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useSettlements } from '@/hooks/use-settlements';
import { SettlementDetail } from '@/components/financial/settlement-detail';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import type { Settlement } from '@distriall/shared';
import type { SettlementOrderRow, SettlementExpenseRow } from '@/hooks/use-settlements';

export default function SettlementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { getSettlement } = useSettlements();
  const [settlement, setSettlement] = useState<Settlement | null>(null);
  const [orders, setOrders] = useState<SettlementOrderRow[]>([]);
  const [expenses, setExpenses] = useState<SettlementExpenseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const result = await getSettlement(id);
      setSettlement(result.settlement);
      setOrders(result.orders);
      setExpenses(result.expenses);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => { if (!cancelled) load(); }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="px-4 py-4 space-y-4">
        <Skeleton variant="line" className="h-8 w-48" />
        <div className="grid grid-cols-3 gap-3">
          <Skeleton variant="rect" className="h-24" />
          <Skeleton variant="rect" className="h-24" />
          <Skeleton variant="rect" className="h-24" />
        </div>
        <Skeleton variant="rect" className="h-64" />
        <Skeleton variant="rect" className="h-40" />
      </div>
    );
  }

  if (error || !settlement) {
    return (
      <div className="px-4 py-4 space-y-4">
        <PageHeader title="Detalhe do acerto" onBack={() => router.back()} />
        <div className="py-8 text-center text-destructive">
          {error ?? 'Acerto nao encontrado.'}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader title="Detalhe do acerto" onBack={() => router.back()} />
      <SettlementDetail
        settlement={settlement}
        orders={orders}
        expenses={expenses}
        onRefresh={load}
      />
    </div>
  );
}
