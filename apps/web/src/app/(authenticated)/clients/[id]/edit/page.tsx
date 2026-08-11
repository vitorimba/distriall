'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ClientForm } from '@/components/clients/client-form';
import { ClientPricesEditor } from '@/components/clients/client-prices-editor';
import { Tabs } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Users } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

interface ClientData {
  id: string;
  name: string;
  trade_name: string | null;
  type: string | null;
  document: string | null;
  state_registration: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  neighborhood: string | null;
  phone: string | null;
  whatsapp: string | null;
  default_payment_method: string | null;
  notes: string | null;
}

export default function EditClientPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('info');

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();

      setClient(data as ClientData | null);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="px-4 py-4 space-y-4">
        <Skeleton variant="line" className="h-7 w-48" />
        <Skeleton variant="rect" className="h-64" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <EmptyState icon={Users} title="Cliente não encontrado" />
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader title={`Editar: ${client.name}`} onBack={() => router.back()} />

      <Tabs
        tabs={[
          { id: 'info', label: 'Dados' },
          { id: 'prices', label: 'Preços especiais' },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === 'info' ? (
        <ClientForm client={client} />
      ) : (
        <ClientPricesEditor clientId={client.id} />
      )}
    </div>
  );
}
