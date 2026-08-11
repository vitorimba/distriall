'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Money } from '@/components/ui/money';
import { EmptyState } from '@/components/ui/empty-state';
import { ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import type { SettlementExpenseRow } from '@/hooks/use-settlements';

interface SettlementExpensesProps {
  expenses: SettlementExpenseRow[];
}

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('pt-BR');
}

export function SettlementExpenses({ expenses }: SettlementExpensesProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardContent className="pt-4 space-y-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between"
        >
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Gastos ({expenses.length})
          </h2>
          {expanded ? <ChevronUp className="size-4 text-muted-foreground" /> : <ChevronDown className="size-4 text-muted-foreground" />}
        </button>

        {expanded && (
          <div className="space-y-1 pt-1">
            {expenses.length === 0 ? (
              <EmptyState icon={DollarSign} title="Nenhum gasto no período" />
            ) : (
              expenses.map((row) => {
                const expense = row.expenses;
                if (!expense) return null;
                return (
                  <div
                    key={row.id}
                    className="flex items-center justify-between rounded-md border bg-muted/20 px-3 py-2 text-sm"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{expense.description}</span>
                        {expense.is_shared && (
                          <Badge variant="secondary" className="text-xs shrink-0">Rateado</Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{formatDate(expense.expense_date)}</span>
                    </div>
                    <div className="flex flex-col items-end shrink-0 ml-2">
                      <Money value={row.amount} className="font-medium" />
                      {expense.is_shared && expense.amount !== row.amount && (
                        <span className="text-xs text-muted-foreground">de <Money value={expense.amount} /></span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
