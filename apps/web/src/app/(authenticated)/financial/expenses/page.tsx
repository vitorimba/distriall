'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const ExpenseList = dynamic(() => import('@/components/financial/expense-list').then(m => m.ExpenseList), {
  loading: () => <div className="animate-pulse h-96 bg-muted rounded-lg" />,
});
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
