'use client';

import { useState, useMemo } from 'react';
import { useLoading } from '@/hooks/use-loading';
import { useLoadingStore } from '@/stores/loading-store';
import { LoadingOrderList } from '@/components/loading/loading-order-list';
import { LoadingActionBar } from '@/components/loading/loading-action-bar';
import { LoadingBottomSheet } from '@/components/loading/loading-bottom-sheet';
import { ChipFilter } from '@/components/ui/chip-filter';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const STATUS_FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'lancado', label: 'Lancado' },
  { value: 'confirmado', label: 'Confirmado' },
];

export default function LoadingPage() {
  const { loading, refetch } = useLoading();
  const { orders } = useLoadingStore();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [accountFilter, setAccountFilter] = useState('all');
  const [search, setSearch] = useState('');

  const accountOptions = useMemo(() => {
    const slugs = new Map<string, string>();
    for (const o of orders) {
      if (!slugs.has(o.account_id)) {
        slugs.set(o.account_id, o.account_slug?.toUpperCase() ?? '');
      }
    }
    return [
      { value: 'all', label: 'Todas' },
      ...Array.from(slugs.entries()).map(([id, slug]) => ({
        value: id,
        label: slug || 'N/A',
      })),
    ];
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let result = orders;
    if (statusFilter !== 'all') {
      result = result.filter((o) => o.status === statusFilter);
    }
    if (accountFilter !== 'all') {
      result = result.filter((o) => o.account_id === accountFilter);
    }
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.client_name.toLowerCase().includes(lower) ||
          String(o.order_number).includes(lower)
      );
    }
    return result;
  }, [orders, statusFilter, accountFilter, search]);

  return (
    <div className="px-4 py-4 pb-32 space-y-3">
      <h1 className="text-xl font-bold">Carregamento</h1>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por cliente ou numero..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="space-y-1.5">
        <ChipFilter options={STATUS_FILTERS} selected={statusFilter} onChange={setStatusFilter} />
        {accountOptions.length > 2 && (
          <ChipFilter options={accountOptions} selected={accountFilter} onChange={setAccountFilter} />
        )}
      </div>

      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Carregando pedidos...</div>
      ) : (
        <LoadingOrderList filteredOrders={filteredOrders} />
      )}

      <LoadingActionBar onOpenSheet={() => setSheetOpen(true)} />

      <LoadingBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onMarked={() => refetch()}
      />
    </div>
  );
}
