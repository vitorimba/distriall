'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, MapPin, Phone } from 'lucide-react';
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
  cartao: 'Cartao',
};

export function ClientList() {
  const { activeAccount } = useAccount();
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState('');
  const [loadKey, setLoadKey] = useState(0);
  const loading = loadKey === 0 && clients.length === 0;

  useEffect(() => {
    if (!activeAccount) return;

    let cancelled = false;

    async function load() {
      const supabase = createClient();

      let query = supabase
        .from('clients')
        .select('*, client_prices(count)')
        .eq('account_id', activeAccount!.id)
        .eq('is_active', true)
        .order('name');

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data } = await query;
      if (!cancelled) {
        setClients((data as unknown as Client[]) ?? []);
        setLoadKey((k) => k + 1);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [activeAccount, search]);

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
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Client List */}
      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Carregando...</div>
      ) : clients.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          {search ? 'Nenhum cliente encontrado.' : 'Nenhum cliente cadastrado.'}
        </div>
      ) : (
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
      )}

      {/* FAB New Client */}
      <Link
        href="/clients/new"
        className={cn(
          'fixed bottom-20 right-4 z-40 flex size-14 items-center justify-center',
          'rounded-full bg-primary text-primary-foreground shadow-lg',
          'transition-transform hover:scale-105 active:scale-95'
        )}
      >
        <Plus className="size-6" />
      </Link>
    </div>
  );
}
