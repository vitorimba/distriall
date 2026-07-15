'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
const OrderList = dynamic(() => import('@/components/orders/order-list').then(m => m.OrderList), {
  loading: () => <div className="animate-pulse h-96 bg-muted rounded-lg" />,
});
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader
        title="Pedidos"
        actions={
          <Link href="/orders/new">
            <Button size="sm">
              <Plus className="mr-1 size-4" />
              Novo pedido
            </Button>
          </Link>
        }
      />
      <OrderList />
    </div>
  );
}
