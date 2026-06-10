'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ClientForm } from '@/components/clients/client-form';
import { ClientPricesEditor } from '@/components/clients/client-prices-editor';

interface ClientData {
  id: string;
  name: string;
  trade_name: string | null;
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
  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'info' | 'prices'>('info');

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
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Cliente nao encontrado.
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <h1 className="text-xl font-bold">{client.name}</h1>

      {/* Tab switcher */}
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        <button
          onClick={() => setTab('info')}
          className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            tab === 'info' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Dados
        </button>
        <button
          onClick={() => setTab('prices')}
          className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            tab === 'prices' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Precos Especiais
        </button>
      </div>

      {tab === 'info' ? (
        <ClientForm client={client} />
      ) : (
        <ClientPricesEditor clientId={client.id} />
      )}
    </div>
  );
}
