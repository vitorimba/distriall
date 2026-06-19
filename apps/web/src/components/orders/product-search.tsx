'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { Money } from '@/components/ui/money';

interface ProductVariant {
  id: string;
  name: string;
  sell_price: number;
  cost_price: number;
}

interface Product {
  id: string;
  name: string;
  product_variants: ProductVariant[];
}

export function ProductSearch() {
  const { addItem, priceMap } = useCartStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;

    if (query.length < 1) {
      const t = setTimeout(() => { if (!cancelled) setResults([]); }, 0);
      return () => { cancelled = true; clearTimeout(t); };
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('products')
        .select('id, name, product_variants(id, name, sell_price, cost_price)')
        .eq('is_active', true)
        .ilike('name', `%${query}%`)
        .limit(10);

      if (!cancelled) {
        setResults((data as Product[]) ?? []);
        setOpen(true);
      }
    }, 300);

    return () => {
      cancelled = true;
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function handleSelectVariant(product: Product, variant: ProductVariant) {
    addItem({
      variantId: variant.id,
      productName: product.name,
      variantName: variant.name,
      quantity: 1,
      costPrice: variant.cost_price,
      defaultPrice: variant.sell_price,
    });
    setQuery('');
    setOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div className="relative space-y-1">
      <Label>Adicionar Produto</Label>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Buscar produto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          className="pl-8"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 mt-1 max-h-64 w-full overflow-y-auto rounded-md border bg-background shadow-lg">
          {results.map((product) => (
            <div key={product.id}>
              <div className="px-3 py-1 text-xs font-medium text-muted-foreground bg-muted/50">
                {product.name}
              </div>
              {product.product_variants.map((v) => {
                const effectivePrice = priceMap.get(v.id) ?? v.sell_price;
                const hasCustom = priceMap.has(v.id);
                return (
                  <button
                    key={v.id}
                    onMouseDown={() => handleSelectVariant(product, v)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    <span className="flex-1 pl-2">{v.name}</span>
                    <Money
                      value={effectivePrice}
                      className={hasCustom ? 'font-medium text-primary' : 'text-muted-foreground'}
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
