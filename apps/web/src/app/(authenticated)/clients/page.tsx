'use client';

import { ClientList } from '@/components/clients/client-list';

export default function ClientsPage() {
  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 text-xl font-bold">Clientes</h1>
      <ClientList />
    </div>
  );
}
