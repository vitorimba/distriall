'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { Badge } from '@/components/ui/badge';
import { SearchField } from '@/components/ui/search-field';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert } from '@/components/ui/alert';
import { FAB } from '@/components/ui/fab';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Phone, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Client {
  id: string;
  name: string;
  trade_name: string | null;
  city: string | null;
  neighborhood: string | null;
  phone: string | null;
  whatsapp: string | null;
  default_payment_method: string | null;
  is_active: boolean;
  client_prices: { count: number }[];
}

const PAYMENT_LABELS: Record<string, string> = {
  dinheiro: 'Dinheiro',
  pix: 'Pix',
  boleto: 'Boleto',
  vale: 'Vale',
  cartao: 'Cartão',
};

export function ClientList() {
  const { activeAccount } = useAccount();
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [loadKey, setLoadKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const loading = loadKey === 0 && clients.length === 0 && !error;

  const loadClients = useCallback(async () => {
    if (!activeAccount) return;

    const supabase = createClient();

    let query = supabase
      .from('clients')
      .select('*, client_prices(count)')
      .eq('account_id', activeAccount.id)
      .eq('is_active', true)
      .order('name');

    if (search) {
      query = query.ilike('name', `${search}%`);
    }

    const { data, error: fetchError } = await query;
    if (fetchError) {
      setError('Não foi possível carregar os clientes.');
    } else {
      setError(null);
      setClients((data as unknown as Client[]) ?? []);
    }
    setLoadKey((k) => k + 1);
  }, [activeAccount, search]);

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => { if (!cancelled) loadClients(); }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, [loadClients]);

  function getLocation(client: Client) {
    const parts = [client.neighborhood, client.city].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : null;
  }

  function getPriceCount(client: Client): number {
    if (!client.client_prices || client.client_prices.length === 0) return 0;
    return client.client_prices[0]?.count ?? 0;
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <SearchField
        placeholder="Buscar cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch('')}
      />

      {/* Error alert */}
      {error && (
        <Alert
          tone="danger"
          title={error}
          action={
            <Button size="sm" variant="ghost" onClick={loadClients}>
              <RefreshCw className="size-3.5 mr-1" />
              Tentar novamente
            </Button>
          }
        />
      )}

      {/* Client List */}
      {!error && loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="rect" className="h-14" />)}
        </div>
      ) : !error && clients.length === 0 ? (
        <EmptyState
          icon={Users}
          title={search ? 'Nenhum cliente encontrado' : 'Nenhum cliente ainda'}
          description={search ? undefined : 'Cadastre o primeiro cliente para vê-lo aqui.'}
        />
      ) : !error ? (
        <div className="space-y-1">
          {clients.map((client) => {
            const location = getLocation(client);
            const priceCount = getPriceCount(client);
            return (
              <Link
                key={client.id}
                href={`/clients/${client.id}`}
                className="flex items-center gap-3 rounded-lg border px-3 py-2.5 hover:bg-muted/50"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{client.name}</span>
                    {client.default_payment_method && (
                      <Badge variant="secondary" className="text-xs">
                        {PAYMENT_LABELS[client.default_payment_method] ?? client.default_payment_method}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {location && (
                      <span className="flex items-center gap-0.5">
                        <MapPin className="size-3" />
                        {location}
                      </span>
                    )}
                    {(client.phone || client.whatsapp) && (
                      <span className="flex items-center gap-0.5">
                        <Phone className="size-3" />
                        {client.whatsapp || client.phone}
                      </span>
                    )}
                    {priceCount > 0 && (
                      <span>{priceCount} preco{priceCount !== 1 ? 's' : ''} especial{priceCount !== 1 ? 'is' : ''}</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}

      {/* FAB New Client */}
      <Link href="/clients/new">
        <FAB label="Novo cliente" />
      </Link>
    </div>
  );
}
