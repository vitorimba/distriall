'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Money } from '@/components/ui/money';

interface ClientPrice {
  variantId: string;
  productName: string;
  variantName: string;
  defaultPrice: number;
  customPrice: number;
}

interface ClientPricesTableProps {
  clientId: string;
}

export function ClientPricesTable({ clientId }: ClientPricesTableProps) {
  const { activeAccount } = useAccount();
  const [prices, setPrices] = useState<ClientPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeAccount || !clientId) return;

    let cancelled = false;

    async function load() {
      const supabase = createClient();

      const { data } = await supabase
        .from('client_prices')
        .select('id, custom_price, product_variant_id, product_variants(id, name, sell_price, products(name))')
        .eq('client_id', clientId)
        .eq('account_id', activeAccount!.id);

      if (cancelled) return;

      const rows: ClientPrice[] = (data ?? []).map((cp) => {
        const variant = cp.product_variants as unknown as {
          id: string;
          name: string;
          sell_price: number;
          products: { name: string } | null;
        } | null;

        return {
          variantId: cp.product_variant_id,
          productName: variant?.products?.name ?? '',
          variantName: variant?.name ?? '',
          defaultPrice: variant?.sell_price ?? 0,
          customPrice: Number(cp.custom_price),
        };
      });

      rows.sort((a, b) => a.productName.localeCompare(b.productName));
      setPrices(rows);
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [activeAccount, clientId]);

  if (loading) return null;
  if (prices.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          Precos Especiais
          <Badge variant="secondary" className="text-xs">
            {prices.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {prices.map((p) => (
            <div key={p.variantId} className="flex items-center justify-between py-2 text-sm">
              <div className="min-w-0">
                <span className="font-medium">{p.productName}</span>
                <span className="text-muted-foreground"> – {p.variantName}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Money value={p.defaultPrice} className="text-muted-foreground line-through text-xs" />
                <Money value={p.customPrice} className="font-medium text-primary" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
