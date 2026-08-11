'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Money } from '@/components/ui/money';

interface VariantRow {
  variantId: string;
  productName: string;
  variantName: string;
  defaultPrice: number;
  customPrice: number | null;
  clientPriceId: string | null;
}

export function ClientPricesEditor({ clientId }: { clientId: string }) {
  const { activeAccount } = useAccount();
  const [rows, setRows] = useState<VariantRow[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!activeAccount) return;

    async function load() {
      const supabase = createClient();

      // Fetch all active product variants with their products
      const { data: variants } = await supabase
        .from('product_variants')
        .select('id, name, sell_price, products(name)')
        .eq('is_active', true);

      // Fetch account-specific prices (store prices)
      const { data: accountPrices } = await supabase
        .from('account_prices')
        .select('product_variant_id, sell_price')
        .eq('account_id', activeAccount!.id);

      const accountPriceMap = new Map(
        (accountPrices ?? []).map((ap: { product_variant_id: string; sell_price: number }) => [ap.product_variant_id, ap.sell_price])
      );

      // Fetch existing client prices
      const { data: clientPrices } = await supabase
        .from('client_prices')
        .select('id, product_variant_id, custom_price')
        .eq('client_id', clientId);

      const priceMap = new Map<string, { id: string; price: number }>(
        (clientPrices ?? []).map((cp: { product_variant_id: string; id: string; custom_price: number }) => [cp.product_variant_id, { id: cp.id, price: cp.custom_price }])
      );

      const mapped: VariantRow[] = (variants ?? []).map((v: { id: string; name: string; sell_price: number; products: unknown }) => {
        const product = v.products as unknown as { name: string } | null;
        const existing = priceMap.get(v.id);
        // Default price = account price if available, otherwise global sell_price
        const defaultPrice = accountPriceMap.get(v.id) ?? v.sell_price;
        return {
          variantId: v.id,
          productName: product?.name ?? '',
          variantName: v.name,
          defaultPrice,
          customPrice: existing?.price ?? null,
          clientPriceId: existing?.id ?? null,
        };
      });

      // Sort: products with custom price first, then alphabetical
      mapped.sort((a, b) => {
        if (a.customPrice !== null && b.customPrice === null) return -1;
        if (a.customPrice === null && b.customPrice !== null) return 1;
        const cmp = a.productName.localeCompare(b.productName);
        if (cmp !== 0) return cmp;
        return a.variantName.localeCompare(b.variantName);
      });

      setRows(mapped);
      setLoading(false);
    }

    load();
  }, [activeAccount, clientId]);

  async function savePrice(row: VariantRow, newPrice: number) {
    if (!activeAccount) return;
    setSavingIds((prev) => new Set(prev).add(row.variantId));
    const supabase = createClient();

    await supabase.from('client_prices').upsert(
      {
        account_id: activeAccount.id,
        client_id: clientId,
        product_variant_id: row.variantId,
        custom_price: newPrice,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'client_id,product_variant_id' }
    );

    setRows((prev) =>
      prev.map((r) =>
        r.variantId === row.variantId
          ? { ...r, customPrice: newPrice }
          : r
      )
    );
    setSavingIds((prev) => {
      const next = new Set(prev);
      next.delete(row.variantId);
      return next;
    });
  }

  async function removePrice(row: VariantRow) {
    if (!row.clientPriceId) return;
    setSavingIds((prev) => new Set(prev).add(row.variantId));
    const supabase = createClient();

    await supabase.from('client_prices').delete().eq('id', row.clientPriceId);

    setRows((prev) =>
      prev.map((r) =>
        r.variantId === row.variantId
          ? { ...r, customPrice: null, clientPriceId: null }
          : r
      )
    );
    setSavingIds((prev) => {
      const next = new Set(prev);
      next.delete(row.variantId);
      return next;
    });
  }

  const filtered = search
    ? rows.filter(
        (r) =>
          r.productName.toLowerCase().includes(search.toLowerCase()) ||
          r.variantName.toLowerCase().includes(search.toLowerCase())
      )
    : rows;

  if (loading) {
    return (
      <div className="space-y-2 py-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rect" className="h-10" />
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Preços Especiais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Table */}
        <div className="max-h-[60vh] overflow-y-auto rounded border">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted">
              <tr>
                <th className="px-2 py-1.5 text-left font-normal text-xs">Produto</th>
                <th className="px-2 py-1.5 text-right font-normal text-xs">Padrão</th>
                <th className="px-2 py-1.5 text-right font-normal text-xs">Especial</th>
                <th className="px-2 py-1.5 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <PriceRow
                  key={row.variantId}
                  row={row}
                  saving={savingIds.has(row.variantId)}
                  onSave={(price) => savePrice(row, price)}
                  onRemove={() => removePrice(row)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted-foreground">
          {rows.filter((r) => r.customPrice !== null).length} preço(s) especial(is) definido(s)
        </p>
      </CardContent>
    </Card>
  );
}

function PriceRow({
  row,
  saving,
  onSave,
  onRemove,
}: {
  row: VariantRow;
  saving: boolean;
  onSave: (price: number) => void;
  onRemove: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(row.customPrice?.toString() ?? '');

  function handleBlur() {
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0) {
      onSave(Math.round(num * 100) / 100);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === 'Escape') {
      setValue(row.customPrice?.toString() ?? '');
      setEditing(false);
    }
  }

  const hasCustom = row.customPrice !== null;

  return (
    <tr className={`border-t ${hasCustom ? 'bg-primary/5' : ''}`}>
      <td className="px-2 py-1.5">
        <span>{row.productName}</span>
        <span className="text-muted-foreground"> – {row.variantName}</span>
        {hasCustom && (
          <Badge variant="secondary" className="ml-1 text-[10px] px-1 py-0">
            especial
          </Badge>
        )}
      </td>
      <td className="px-2 py-1.5 text-right text-muted-foreground">
        <Money value={row.defaultPrice} />
      </td>
      <td className="px-2 py-1.5 text-right">
        {editing ? (
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-20 rounded border px-1 py-0.5 text-right text-sm"
          />
        ) : (
          <button
            onClick={() => {
              setValue(row.customPrice?.toString() ?? '');
              setEditing(true);
            }}
            disabled={saving}
            className="text-right hover:underline"
          >
            {saving
              ? '...'
              : hasCustom
                ? <Money value={row.customPrice!} />
                : '—'}
          </button>
        )}
      </td>
      <td className="px-1 py-1.5">
        {hasCustom && !editing && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={onRemove}
            disabled={saving}
          >
            <X className="size-3 text-destructive" />
          </Button>
        )}
      </td>
    </tr>
  );
}
