'use client';

import Link from 'next/link';
import { ClientList } from '@/components/clients/client-list';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ClientsPage() {
  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader
        title="Clientes"
        actions={
          <Link href="/clients/new">
            <Button size="sm">
              <Plus className="mr-1 size-4" />
              Novo cliente
            </Button>
          </Link>
        }
      />
      <ClientList />
    </div>
  );
}
