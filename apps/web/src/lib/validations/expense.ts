import { z } from 'zod/v4';

export const expenseSplitSchema = z.object({
  accountId: z.string().uuid(),
  percentage: z.number().min(0.01, 'Percentual deve ser > 0').max(100, 'Percentual maximo 100%'),
});

export const expenseSchema = z.object({
  description: z.string().min(1, 'Descricao obrigatoria'),
  amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
  expense_date: z.string().min(1, 'Data obrigatoria'),
  category: z.enum(['fixo', 'variavel']),
  type: z.enum(['impostos', 'gasolina', 'manutencao', 'outros']).optional(),
  recurrence: z.enum(['unico', 'semanal', 'mensal']).optional(),
  is_shared: z.boolean(),
  splits: z.array(expenseSplitSchema).optional(),
}).refine(
  (data) => {
    if (!data.is_shared) return true;
    if (!data.splits || data.splits.length === 0) return false;
    const sum = data.splits.reduce((s, sp) => s + sp.percentage, 0);
    return Math.abs(sum - 100) < 0.01;
  },
  { message: 'Percentuais dos rateios devem somar 100%' }
);

export type ExpenseInput = z.infer<typeof expenseSchema>;
