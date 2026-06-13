'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import { useAccount } from '@/providers/account-provider';
import { useExpenses } from '@/hooks/use-expenses';
import { expenseSchema, type ExpenseInput } from '@/lib/validations/expense';
import { maskMoney, parseMoney, MSG } from '@/lib/mask-utils';
import { ExpenseSplitEditor } from '@/components/financial/expense-split-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import {
  EXPENSE_CATEGORY_LABELS,
  EXPENSE_TYPE_LABELS,
  EXPENSE_RECURRENCE_LABELS,
  type ExpenseCategory,
  type ExpenseType,
  type ExpenseRecurrence,
} from '@distriall/shared';

interface SplitEntry {
  accountId: string;
  accountName: string;
  percentage: number;
}

interface ExpenseFormProps {
  expense?: {
    id: string;
    description: string;
    amount: number;
    category: string;
    type: string | null;
    recurrence: string | null;
    is_shared: boolean;
    expense_date: string;
    expense_splits?: {
      id: string;
      account_id: string;
      percentage: number;
      amount: number;
    }[];
  };
}

export function ExpenseForm({ expense }: ExpenseFormProps) {
  const isEdit = !!expense;
  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();
  const { activeAccount, accounts } = useAccount();
  const { createExpense, updateExpense } = useExpenses();

  const [description, setDescription] = useState(expense?.description ?? '');
  const [amount, setAmount] = useState(
    expense?.amount ? maskMoney(String(Math.round(expense.amount * 100))) : ''
  );
  const [expenseDate, setExpenseDate] = useState(
    expense?.expense_date ?? new Date().toISOString().split('T')[0]
  );
  const [category, setCategory] = useState(expense?.category ?? 'variavel');
  const [type, setType] = useState(expense?.type ?? '');
  const [recurrence, setRecurrence] = useState(expense?.recurrence ?? 'unico');
  const [isShared, setIsShared] = useState(expense?.is_shared ?? false);
  const [splits, setSplits] = useState<SplitEntry[]>(() => {
    if (expense?.is_shared && expense.expense_splits) {
      return expense.expense_splits.map((s) => {
        const acc = accounts.find((a) => a.id === s.account_id);
        return {
          accountId: s.account_id,
          accountName: acc?.name ?? s.account_id,
          percentage: s.percentage,
        };
      });
    }
    return accounts.map((a) => ({
      accountId: a.id,
      accountName: a.name,
      percentage: 0,
    }));
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  function handleSharedToggle(checked: boolean) {
    setIsShared(checked);
    if (checked && accounts.length > 0 && splits.every((s) => s.percentage === 0)) {
      // Default: distribute equally
      const equal = Math.round((100 / accounts.length) * 100) / 100;
      setSplits(
        accounts.map((a, i) => ({
          accountId: a.id,
          accountName: a.name,
          percentage: i === accounts.length - 1
            ? Math.round((100 - equal * (accounts.length - 1)) * 100) / 100
            : equal,
        }))
      );
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);

    const newFieldErrors: Record<string, string> = {};
    if (!description.trim()) newFieldErrors.description = MSG.required;
    if (parseMoney(amount) <= 0) newFieldErrors.amount = MSG.required;
    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return;
    }

    const parsedAmount = parseMoney(amount);
    const input: ExpenseInput = {
      description,
      amount: parsedAmount,
      expense_date: expenseDate,
      category: category as 'fixo' | 'variavel',
      type: type ? (type as ExpenseInput['type']) : undefined,
      recurrence: recurrence ? (recurrence as ExpenseInput['recurrence']) : undefined,
      is_shared: isShared,
      splits: isShared
        ? splits.filter((s) => s.percentage > 0).map((s) => ({
            accountId: s.accountId,
            percentage: s.percentage,
          }))
        : undefined,
    };

    const result = expenseSchema.safeParse(input);
    if (!result.success) {
      setErrors(result.error.issues.map((i) => i.message));
      return;
    }

    if (!activeAccount || !user) return;
    setSaving(true);

    try {
      const params = {
        accountId: activeAccount.id,
        description,
        amount: parsedAmount,
        category: category as 'fixo' | 'variavel',
        type: type || undefined,
        recurrence: recurrence || undefined,
        is_shared: isShared,
        expense_date: expenseDate,
        created_by: user.id,
        splits: isShared
          ? splits.filter((s) => s.percentage > 0).map((s) => ({
              accountId: s.accountId,
              percentage: s.percentage,
            }))
          : undefined,
      };

      if (isEdit && expense) {
        await updateExpense({ ...params, id: expense.id });
      } else {
        await createExpense(params);
      }

      toast('Gasto registrado', 'success');
      router.push('/financial/expenses');
    } catch (err) {
      setErrors([(err as Error).message || 'Erro ao salvar gasto']);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Editar Gasto' : 'Novo Gasto'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Field label="Descricao" required error={fieldErrors.description}>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => {
                if (!description.trim()) setFieldErrors((prev) => ({ ...prev, description: MSG.required }));
                else setFieldErrors((prev) => { const { description: _, ...rest } = prev; return rest; });
              }}
              aria-invalid={!!fieldErrors.description}
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Valor" required error={fieldErrors.amount}>
              <Input
                id="amount"
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(maskMoney(e.target.value))}
                onBlur={() => {
                  if (parseMoney(amount) <= 0) setFieldErrors((prev) => ({ ...prev, amount: MSG.required }));
                  else setFieldErrors((prev) => { const { amount: _, ...rest } = prev; return rest; });
                }}
                aria-invalid={!!fieldErrors.amount}
                placeholder="0,00"
                prefix="R$"
                className="num"
                required
              />
            </Field>
            <Field label="Data" required>
              <Input
                id="expense_date"
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                required
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Categoria" required>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {(Object.entries(EXPENSE_CATEGORY_LABELS) as [ExpenseCategory, string][]).map(
                  ([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  )
                )}
              </select>
            </Field>
            <Field label="Tipo">
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Nenhum</option>
                {(Object.entries(EXPENSE_TYPE_LABELS) as [ExpenseType, string][]).map(
                  ([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  )
                )}
              </select>
            </Field>
          </div>

          <Field label="Recorrencia">
            <select
              id="recurrence"
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {(Object.entries(EXPENSE_RECURRENCE_LABELS) as [ExpenseRecurrence, string][]).map(
                ([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                )
              )}
            </select>
          </Field>

          {/* Shared toggle — checkbox com Label inline, nao usa Field */}
          <div className="flex items-center gap-2 pt-2">
            <input
              id="is_shared"
              type="checkbox"
              checked={isShared}
              onChange={(e) => handleSharedToggle(e.target.checked)}
              className="size-4 rounded border-input"
            />
            <Label htmlFor="is_shared" className="cursor-pointer">
              Gasto compartilhado (rateio entre contas)
            </Label>
          </div>

          {/* Splits editor */}
          {isShared && (
            <ExpenseSplitEditor
              splits={splits}
              totalAmount={parseMoney(amount) || 0}
              onChange={setSplits}
            />
          )}
        </CardContent>
      </Card>

      {errors.length > 0 && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3">
          {errors.map((err, i) => (
            <p key={i} className="text-sm text-destructive">{err}</p>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Button type="submit" className="flex-1" disabled={saving}>
          {saving ? 'Salvando...' : isEdit ? 'Salvar Alteracoes' : 'Criar Gasto'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
