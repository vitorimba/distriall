'use client';

import { useState, useMemo } from 'react';
import { useLoading } from '@/hooks/use-loading';
import { useLoadingStore } from '@/stores/loading-store';
import { LoadingOrderList } from '@/components/loading/loading-order-list';
import { LoadingActionBar } from '@/components/loading/loading-action-bar';
import { LoadingBottomSheet } from '@/components/loading/loading-bottom-sheet';
import { ChipFilter } from '@/components/ui/chip-filter';
import { SearchField } from '@/components/ui/search-field';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

const STATUS_FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'lancado', label: 'Lançado' },
  { value: 'confirmado', label: 'Confirmado' },
];

export default function LoadingPage() {
  const { loading, error: loadError, refetch } = useLoading();
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
      <PageHeader title="Carregamento" />

      <SearchField
        placeholder="Buscar por cliente ou número..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch('')}
      />

      <div className="space-y-1.5">
        <ChipFilter options={STATUS_FILTERS} selected={statusFilter} onChange={setStatusFilter} />
        {accountOptions.length > 2 && (
          <ChipFilter options={accountOptions} selected={accountFilter} onChange={setAccountFilter} />
        )}
      </div>

      {loadError && (
        <Alert
          tone="danger"
          title={loadError}
          action={
            <Button size="sm" variant="ghost" onClick={refetch}>
              <RefreshCw className="size-3.5 mr-1" />
              Tentar novamente
            </Button>
          }
        />
      )}

      {!loadError && loading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} variant="rect" className="h-16" />)}
        </div>
      ) : !loadError ? (
        <LoadingOrderList filteredOrders={filteredOrders} />
      ) : null}

      <LoadingActionBar onOpenSheet={() => setSheetOpen(true)} />

      <LoadingBottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onMarked={() => refetch()}
      />
    </div>
  );
}
