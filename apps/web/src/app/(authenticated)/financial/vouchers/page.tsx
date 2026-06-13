'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from '@/providers/account-provider';
import { useVouchers } from '@/hooks/use-vouchers';
import { VOUCHER_STATUS_LABELS, type VoucherStatus } from '@distriall/shared';
import { ChipFilter } from '@/components/ui/chip-filter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SearchField } from '@/components/ui/search-field';
import { StatusBadge } from '@/components/ui/status-badge';
import { Money } from '@/components/ui/money';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert } from '@/components/ui/alert';
import { useToast } from '@/components/ui/toast';
import { Check, Image as ImageIcon, Ticket, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

interface VoucherRow {
  id: string;
  amount: number;
  status: VoucherStatus;
  photo_url: string | null;
  due_date: string | null;
  paid_at: string | null;
  created_at: string;
  clients: { name: string } | null;
}

const STATUS_FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'pendente', label: 'Pendente' },
  { value: 'pago', label: 'Pago' },
  { value: 'vencido', label: 'Vencido' },
];

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
}

function isOverdue(dueDate: string | null, status: string): boolean {
  if (!dueDate || status !== 'pendente') return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export default function VouchersPage() {
  const router = useRouter();
  const { activeAccount } = useAccount();
  const { listVouchers, markAsPaid } = useVouchers();
  const toast = useToast();
  const [vouchers, setVouchers] = useState<VoucherRow[]>([]);
  const [statusFilter, setStatusFilter] = useState('pendente');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  async function load() {
    if (!activeAccount) return;
    setLoading(true);
    setLoadError(null);
    try {
      const data = await listVouchers(activeAccount.id, statusFilter);
      setVouchers(data as unknown as VoucherRow[]);
    } catch {
      setLoadError('Nao foi possivel carregar os vales.');
      setVouchers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => { if (!cancelled) load(); }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, [activeAccount, statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleMarkPaid(id: string) {
    await markAsPaid(id);
    toast('Vale marcado como pago', 'success');
    load();
  }

  const filtered = search
    ? vouchers.filter((v) => v.clients?.name?.toLowerCase().includes(search.toLowerCase()))
    : vouchers;

  return (
    <div className="px-4 py-4 space-y-3">
      <PageHeader title="Vales" onBack={() => router.back()} />

      <SearchField
        placeholder="Buscar por cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch('')}
      />

      <ChipFilter options={STATUS_FILTERS} selected={statusFilter} onChange={setStatusFilter} />

      {loadError && (
        <Alert
          tone="danger"
          title={loadError}
          action={
            <Button size="sm" variant="ghost" onClick={load}>
              <RefreshCw className="size-3.5 mr-1" />
              Tentar novamente
            </Button>
          }
        />
      )}

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} variant="rect" className="h-24" />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Ticket} title="Nenhum vale encontrado" />
      ) : (
        <div className="space-y-2">
          {filtered.map((v) => {
            const overdue = isOverdue(v.due_date, v.status);
            const tone = overdue ? 'vencido' : v.status;

            return (
              <Card
                key={v.id}
                className={overdue ? 'border-[var(--status-vencido)]' : ''}
                style={overdue ? { background: 'var(--status-vencido-soft)' } : undefined}
              >
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{v.clients?.name ?? '—'}</span>
                      <StatusBadge tone={tone}>
                        {overdue ? 'Vencido' : VOUCHER_STATUS_LABELS[v.status]}
                      </StatusBadge>
                    </div>
                    <Money value={v.amount} className="text-sm font-bold" />
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Criado: {new Date(v.created_at).toLocaleDateString('pt-BR')}</span>
                    {v.due_date && <span className={overdue ? 'text-[var(--status-vencido)] font-medium' : ''}>Vence: {formatDate(v.due_date)}</span>}
                    {v.paid_at && <span className="text-[var(--success)]">Pago: {new Date(v.paid_at).toLocaleDateString('pt-BR')}</span>}
                    {v.photo_url && (
                      <span className="flex items-center gap-0.5"><ImageIcon className="size-3" /> Foto</span>
                    )}
                  </div>

                  {v.status === 'pendente' && (
                    <Button size="sm" variant="outline" onClick={() => handleMarkPaid(v.id)}>
                      <Check className="mr-1 size-3.5" />
                      Marcar como pago
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
