'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useReceivables, type ReceivableRow } from '@/hooks/use-receivables';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { SearchField } from '@/components/ui/search-field';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert } from '@/components/ui/alert';
import { Money } from '@/components/ui/money';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, RefreshCw, ArrowUpDown } from 'lucide-react';

type SortField = 'balance' | 'days';

export default function ReceivablesPage() {
  const router = useRouter();
  const { receivables, summary, loading, error, reload } = useReceivables();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('balance');

  const filtered = search
    ? receivables.filter((r) =>
        r.client_name.toLowerCase().includes(search.toLowerCase())
      )
    : receivables;

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'days') return b.days_since_oldest - a.days_since_oldest;
    return Number(b.total_balance) - Number(a.total_balance);
  });

  function toggleSort() {
    setSortBy((prev) => (prev === 'balance' ? 'days' : 'balance'));
  }

  return (
    <div className="px-4 py-4 space-y-3">
      <PageHeader
        title="Contas a Receber"
        onBack={() => router.back()}
      />

      {/* Summary cards */}
      {!loading && !error && receivables.length > 0 && (
        <div className="da-grid da-grid--cols3">
          <Card>
            <CardContent className="pt-4 pb-3">
              <span
                className="block text-xs text-muted-foreground"
                style={{ marginBottom: 4 }}
              >
                Total a receber
              </span>
              <Money
                value={summary.totalReceivable}
                className="text-lg font-bold"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-3">
              <span
                className="block text-xs text-muted-foreground"
                style={{ marginBottom: 4 }}
              >
                Devedores
              </span>
              <span className="text-lg font-bold num">
                {summary.debtorCount}
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-3">
              <span
                className="block text-xs text-muted-foreground"
                style={{ marginBottom: 4 }}
              >
                Dias em atraso (media)
              </span>
              <span className="text-lg font-bold num">
                {summary.avgDaysInArrears}d
              </span>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search + sort */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <SearchField
            placeholder="Buscar cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
        </div>
        <Button variant="outline" size="sm" onClick={toggleSort}>
          <ArrowUpDown className="size-3.5 mr-1" />
          {sortBy === 'balance' ? 'Saldo' : 'Dias'}
        </Button>
      </div>

      {/* Error */}
      {error && (
        <Alert
          tone="danger"
          title={error}
          action={
            <Button size="sm" variant="ghost" onClick={reload}>
              <RefreshCw className="size-3.5 mr-1" />
              Tentar novamente
            </Button>
          }
        />
      )}

      {/* Loading */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rect" className="h-20" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <EmptyState
          icon={Users}
          title={
            search
              ? 'Nenhum cliente encontrado'
              : 'Nenhuma conta a receber'
          }
          description={
            search
              ? undefined
              : 'Todos os vales estao quitados.'
          }
        />
      ) : (
        <div className="space-y-2">
          {sorted.map((row: ReceivableRow) => (
            <Link
              key={row.client_id}
              href={`/clients/${row.client_id}`}
            >
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="pt-4 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">
                          {row.client_name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {row.pending_count} vale
                          {row.pending_count !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Ha {row.days_since_oldest} dia
                        {row.days_since_oldest !== 1 ? 's' : ''} desde o
                        mais antigo
                      </div>
                    </div>
                    <Money
                      value={row.total_balance}
                      className="text-sm font-bold text-[var(--text-negative)]"
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
