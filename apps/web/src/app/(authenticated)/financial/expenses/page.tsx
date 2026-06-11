'use client';

import { ExpenseList } from '@/components/financial/expense-list';

export default function ExpensesPage() {
  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 text-xl font-bold">Gastos</h1>
      <ExpenseList />
    </div>
  );
}
