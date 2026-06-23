'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Search, X } from 'lucide-react';
import { useCartStore, type CartClient } from '@/stores/cart-store';

type ClientRow = CartClient & { client_prices: { count: number }[] };

export function ClientSearch() {
  const { activeAccount } = useAccount();
  const { client, setClient, setPriceMap } = useCartStore();
  const [query, setQuery] = useState('');
  const [allClients, setAllClients] = useState<ClientRow[]>([]);
  const [open, setOpen] = useState(false);

  // Load all clients once on mount
  useEffect(() => {
    if (!activeAccount) return;
    let cancelled = false;

    async function loadAll() {
      const supabase = createClient();
      const { data } = await supabase
        .from('clients')
        .select('id, name, default_payment_method, client_prices(count)')
        .eq('account_id', activeAccount!.id)
        .eq('is_active', true)
        .order('name');

      if (!cancelled) {
        setAllClients((data as unknown as ClientRow[]) ?? []);
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, [activeAccount]);

  // Filter locally
  const filtered = query.trim()
    ? allClients.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : allClients;

  async function handleSelect(c: CartClient) {
    setClient(c);
    setQuery('');
    setOpen(false);

    // Load client custom prices
    if (!activeAccount) return;
    const supabase = createClient();
    const { data: prices } = await supabase
      .from('client_prices')
      .select('product_variant_id, custom_price')
      .eq('client_id', c.id);

    const map = new Map(
      (prices ?? []).map((p) => [p.product_variant_id, p.custom_price])
    );
    setPriceMap(map);
  }

  function handleClear() {
    setClient(null);
    setPriceMap(new Map());
    setQuery('');
  }

  if (client) {
    return (
      <div className="space-y-1">
        <Label>Cliente</Label>
        <div className="flex items-center gap-2 rounded-md border px-3 py-2">
          <span className="flex-1 font-medium">{client.name}</span>
          <button onClick={handleClear} className="text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-1">
      <Label>Cliente</Label>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Filtrar clientes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          className="pl-8"
        />
      </div>

      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full max-h-64 overflow-auto rounded-md border bg-background shadow-lg">
          {filtered.map((c) => {
            const priceCount = c.client_prices?.[0]?.count ?? 0;
            return (
              <button
                key={c.id}
                onMouseDown={() => handleSelect(c)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted touch-manipulation"
              >
                <span className="flex-1">{c.name}</span>
                {priceCount > 0 && (
                  <Badge variant="secondary" className="text-[10px]">
                    {priceCount} preco{priceCount !== 1 ? 's' : ''}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      )}

      {open && filtered.length === 0 && allClients.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-background p-3 text-center text-sm text-muted-foreground shadow-lg">
          Nenhum cliente encontrado
        </div>
      )}
    </div>
  );
}
