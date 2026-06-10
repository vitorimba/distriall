'use client';

import { OrderList } from '@/components/orders/order-list';

export default function OrdersPage() {
  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 text-xl font-bold">Pedidos</h1>
      <OrderList />
    </div>
  );
}
