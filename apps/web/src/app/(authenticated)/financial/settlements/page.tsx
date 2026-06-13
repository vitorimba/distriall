'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccount } from '@/providers/account-provider';
import { useSettlements } from '@/hooks/use-settlements';
import {
  formatBRL,
  SETTLEMENT_STATUS_LABELS,
  SETTLEMENT_STATUS_COLORS,
  type SettlementStatus,
} from '@distriall/shared';
import { ChipFilter } from '@/components/ui/chip-filter';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Settlement } from '@distriall/shared';
import { PageHeader } from '@/components/ui/page-header';

const STATUS_FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'rascunho', label: 'Rascunho' },
  { value: 'conferido', label: 'Conferido' },
  { value: 'fechado', label: 'Fechado' },
];

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
}

function getWeekStart(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}

function getWeekEnd(date: Date): string {
  const start = new Date(getWeekStart(date) + 'T00:00:00');
  start.setDate(start.getDate() + 6);
  return start.toISOString().split('T')[0];
}

export default function SettlementsPage() {
  const router = useRouter();
  const { activeAccount } = useAccount();
  const { listSettlements, generateSettlement } = useSettlements();
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [periodStart, setPeriodStart] = useState('');
  const [periodEnd, setPeriodEnd] = useState('');
  const [newStart, setNewStart] = useState(getWeekStart(new Date()));
  const [newEnd, setNewEnd] = useState(getWeekEnd(new Date()));
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!activeAccount) return;
    setLoading(true);
    try {
      const data = await listSettlements({
        accountId: activeAccount.id,
        status: statusFilter,
        periodStart: periodStart || undefined,
        periodEnd: periodEnd || undefined,
      });
      setSettlements(data);
    } catch {
      setSettlements([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => { if (!cancelled) load(); }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, [activeAccount, statusFilter, periodStart, periodEnd]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleGenerate() {
    if (!activeAccount) return;
    setError(null);
    setGenerating(true);
    try {
      await generateSettlement({
        accountId: activeAccount.id,
        periodStart: newStart,
        periodEnd: newEnd,
      });
      load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader title="Acertos" onBack={() => router.back()} />

      {/* Generate form */}
      <Card>
        <CardContent className="pt-4 space-y-3">
          <p className="text-sm font-medium">Gerar Novo Acerto</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Inicio</Label>
              <Input
                type="date"
                value={newStart}
                onChange={(e) => setNewStart(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Fim</Label>
              <Input
                type="date"
                value={newEnd}
                onChange={(e) => setNewEnd(e.target.value)}
              />
            </div>
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button
            className="w-full"
            disabled={generating || !newStart || !newEnd}
            onClick={handleGenerate}
          >
            <Plus className="mr-1 size-4" />
            {generating ? 'Gerando...' : 'Gerar Acerto'}
          </Button>
        </CardContent>
      </Card>

      {/* Status filter */}
      <ChipFilter options={STATUS_FILTERS} selected={statusFilter} onChange={setStatusFilter} />

      {/* Period filter */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <Calendar className="size-3" />
        Filtrar por periodo
        {showFilters ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
      </button>

      {showFilters && (
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">De</Label>
            <Input type="date" value={periodStart} onChange={(e) => setPeriodStart(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Ate</Label>
            <Input type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} />
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Carregando...</div>
      ) : settlements.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">Nenhum acerto encontrado.</div>
      ) : (
        <div className="space-y-2">
          {settlements.map((s) => {
            const colors = SETTLEMENT_STATUS_COLORS[s.status as SettlementStatus];
            const netColor = s.net_profit >= 0 ? 'text-green-700' : 'text-red-600';

            return (
              <Link key={s.id} href={`/financial/settlements/${s.id}`}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="pt-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">
                          {formatDate(s.period_start)} – {formatDate(s.period_end)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {s.order_count} pedidos · {s.client_count} clientes
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
                            colors.bg, colors.text, colors.border
                          )}
                        >
                          {SETTLEMENT_STATUS_LABELS[s.status as SettlementStatus]}
                        </span>
                        <p className={`text-sm font-bold ${netColor}`}>{formatBRL(s.net_profit)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
