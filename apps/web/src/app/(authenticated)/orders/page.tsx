'use client';

import Link from 'next/link';
import { OrderList } from '@/components/orders/order-list';
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
