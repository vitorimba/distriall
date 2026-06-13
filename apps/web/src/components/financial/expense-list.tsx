'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAccount } from '@/providers/account-provider';
import { useExpenses } from '@/hooks/use-expenses';
import {
  EXPENSE_CATEGORY_LABELS,
  EXPENSE_TYPE_LABELS,
  EXPENSE_RECURRENCE_LABELS,
  type ExpenseCategory,
  type ExpenseType,
  type ExpenseRecurrence,
} from '@distriall/shared';
import { Money } from '@/components/ui/money';
import { ChipFilter } from '@/components/ui/chip-filter';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Plus, Trash2, ChevronDown, ChevronUp, Calendar, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { DollarSign } from 'lucide-react';

interface SplitRow {
  id: string;
  account_id: string;
  percentage: number;
  amount: number;
  accounts: { name: string } | null;
}

interface ExpenseRow {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  type: ExpenseType | null;
  recurrence: ExpenseRecurrence | null;
  is_shared: boolean;
  expense_date: string;
  created_at: string;
  expense_splits: SplitRow[];
}

const CATEGORY_FILTERS = [
  { value: 'all', label: 'Todas' },
  { value: 'fixo', label: 'Fixo' },
  { value: 'variavel', label: 'Variavel' },
];

const TYPE_FILTERS = [
  { value: 'all', label: 'Todos' },
  { value: 'impostos', label: 'Impostos' },
  { value: 'gasolina', label: 'Gasolina' },
  { value: 'manutencao', label: 'Manutencao' },
  { value: 'outros', label: 'Outros' },
];

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
}

export function ExpenseList() {
  const { activeAccount } = useAccount();
  const { listExpenses, deleteExpense } = useExpenses();
  const [expenses, setExpenses] = useState<ExpenseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  async function load() {
    if (!activeAccount) return;
    setLoading(true);
    setLoadError(null);
    try {
      const data = await listExpenses({
        accountId: activeAccount.id,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
        category: categoryFilter,
        type: typeFilter,
      });
      setExpenses(
        (data ?? []).map((row: Record<string, unknown>) => ({
          id: row.id as string,
          description: row.description as string,
          amount: Number(row.amount),
          category: row.category as ExpenseCategory,
          type: (row.type as ExpenseType) ?? null,
          recurrence: (row.recurrence as ExpenseRecurrence) ?? null,
          is_shared: row.is_shared as boolean,
          expense_date: row.expense_date as string,
          created_at: row.created_at as string,
          expense_splits: Array.isArray(row.expense_splits)
            ? (row.expense_splits as SplitRow[])
            : [],
        }))
      );
    } catch {
      setLoadError('Nao foi possivel carregar os gastos.');
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => { if (!cancelled) load(); }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, [activeAccount, categoryFilter, typeFilter, dateFrom, dateTo]); // eslint-disable-line react-hooks/exhaustive-deps

  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm('Confirma exclusao do gasto?')) return;
    setDeleteError(null);
    try {
      await deleteExpense(id);
      load();
    } catch (err) {
      setDeleteError((err as Error).message || 'Erro ao excluir gasto');
    }
  }

  const totalSum = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="space-y-3">
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
      {deleteError && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3">
          <p className="text-sm text-destructive">{deleteError}</p>
        </div>
      )}

      {/* Summary card */}
      <Card>
        <CardContent className="flex items-center justify-between pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Total no periodo</p>
            <Money value={totalSum} className="text-lg font-bold" />
          </div>
          <p className="text-sm text-muted-foreground">{expenses.length} gasto{expenses.length !== 1 ? 's' : ''}</p>
        </CardContent>
      </Card>

      {/* Category filter */}
      <ChipFilter options={CATEGORY_FILTERS} selected={categoryFilter} onChange={setCategoryFilter} />

      {/* Toggle date / type filters */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <Calendar className="size-3" />
        Mais filtros
        {showFilters ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
      </button>

      {showFilters && (
        <div className="space-y-2">
          <ChipFilter options={TYPE_FILTERS} selected={typeFilter} onChange={setTypeFilter} />
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">De</Label>
              <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Ate</Label>
              <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rect" className="h-20" />
          ))}
        </div>
      ) : expenses.length === 0 ? (
        <EmptyState
          icon={DollarSign}
          title="Nenhum gasto ainda"
          description="Registre o primeiro gasto operacional."
        />
      ) : (
        <div className="space-y-2">
          {expenses.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <Card key={exp.id}>
                <CardContent className="space-y-2 pt-4">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{exp.description}</span>
                        {exp.is_shared && (
                          <Badge variant="secondary" className="text-xs">Compartilhado</Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatDate(exp.expense_date)}</span>
                        <span>{EXPENSE_CATEGORY_LABELS[exp.category]}</span>
                        {exp.type && <span>{EXPENSE_TYPE_LABELS[exp.type]}</span>}
                        {exp.recurrence && exp.recurrence !== 'unico' && (
                          <Badge variant="outline" className="text-xs">
                            {EXPENSE_RECURRENCE_LABELS[exp.recurrence]}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Money value={exp.amount} className="text-sm font-bold" />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDelete(exp.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Shared splits expandable */}
                  {exp.is_shared && exp.expense_splits.length > 0 && (
                    <>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        {isExpanded ? 'Ocultar rateio' : 'Ver rateio'}
                        {isExpanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                      </button>
                      {isExpanded && (
                        <div className="rounded-md border bg-muted/30 p-2 text-xs">
                          {exp.expense_splits.map((split) => (
                            <div key={split.id} className="flex justify-between py-0.5">
                              <span>{split.accounts?.name ?? split.account_id}</span>
                              <span>
                                {split.percentage}% — <Money value={split.amount} />
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* FAB New Expense */}
      <Link
        href="/financial/expenses/new"
        className={cn(
          'fixed bottom-20 right-4 z-40 flex size-14 items-center justify-center',
          'rounded-full bg-primary text-primary-foreground shadow-lg',
          'transition-transform hover:scale-105 active:scale-95'
        )}
      >
        <Plus className="size-6" />
      </Link>
    </div>
  );
}
