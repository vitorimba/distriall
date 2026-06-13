'use client';

import { useRouter } from 'next/navigation';
import { ExpenseList } from '@/components/financial/expense-list';
import { PageHeader } from '@/components/ui/page-header';

export default function ExpensesPage() {
  const router = useRouter();
  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader title="Gastos" onBack={() => router.back()} />
      <ExpenseList />
    </div>
  );
}
