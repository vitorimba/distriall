'use client';

import { useState, useEffect } from 'react';
import { useAccount } from '@/providers/account-provider';
import { useVouchers } from '@/hooks/use-vouchers';
import { VOUCHER_STATUS_LABELS, VOUCHER_STATUS_COLORS, type VoucherStatus } from '@distriall/shared';
import { ChipFilter } from '@/components/ui/chip-filter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Check, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
}

function isOverdue(dueDate: string | null, status: string): boolean {
  if (!dueDate || status !== 'pendente') return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export default function VouchersPage() {
  const { activeAccount } = useAccount();
  const { listVouchers, markAsPaid } = useVouchers();
  const [vouchers, setVouchers] = useState<VoucherRow[]>([]);
  const [statusFilter, setStatusFilter] = useState('pendente');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    if (!activeAccount) return;
    setLoading(true);
    const data = await listVouchers(activeAccount.id, statusFilter);
    setVouchers(data as unknown as VoucherRow[]);
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => { if (!cancelled) load(); }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, [activeAccount, statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleMarkPaid(id: string) {
    await markAsPaid(id);
    load();
  }

  const filtered = search
    ? vouchers.filter((v) => v.clients?.name?.toLowerCase().includes(search.toLowerCase()))
    : vouchers;

  return (
    <div className="px-4 py-4 space-y-3">
      <h1 className="text-xl font-bold">Vales</h1>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <ChipFilter options={STATUS_FILTERS} selected={statusFilter} onChange={setStatusFilter} />

      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Carregando...</div>
      ) : filtered.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">Nenhum vale encontrado.</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((v) => {
            const overdue = isOverdue(v.due_date, v.status);
            const colors = overdue
              ? VOUCHER_STATUS_COLORS.vencido
              : VOUCHER_STATUS_COLORS[v.status] ?? VOUCHER_STATUS_COLORS.pendente;

            return (
              <Card key={v.id} className={overdue ? 'border-red-300' : ''}>
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">{v.clients?.name ?? '—'}</span>
                      <span
                        className={cn(
                          'ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
                          colors.bg, colors.text, colors.border
                        )}
                      >
                        {overdue ? 'Vencido' : VOUCHER_STATUS_LABELS[v.status]}
                      </span>
                    </div>
                    <span className="text-sm font-bold">{formatBRL(v.amount)}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Criado: {new Date(v.created_at).toLocaleDateString('pt-BR')}</span>
                    {v.due_date && <span className={overdue ? 'text-red-600 font-medium' : ''}>Vence: {formatDate(v.due_date)}</span>}
                    {v.paid_at && <span className="text-green-600">Pago: {new Date(v.paid_at).toLocaleDateString('pt-BR')}</span>}
                    {v.photo_url && (
                      <span className="flex items-center gap-0.5"><ImageIcon className="size-3" /> Foto</span>
                    )}
                  </div>

                  {v.status === 'pendente' && (
                    <Button size="sm" variant="outline" onClick={() => handleMarkPaid(v.id)}>
                      <Check className="mr-1 size-3.5" />
                      Marcar como Pago
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
