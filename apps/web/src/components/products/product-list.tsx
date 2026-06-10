'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductVariant {
  id: string;
  name: string;
  weight_grams: number | null;
  cost_price: number;
  sell_price: number;
  sku: string | null;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  unit: string;
  product_variants: ProductVariant[];
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function ProductList() {
  const { activeAccount } = useAccount();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [loadKey, setLoadKey] = useState(0);
  const loading = loadKey === 0 && products.length === 0;

  useEffect(() => {
    if (!activeAccount) return;

    let cancelled = false;

    async function load() {
      const supabase = createClient();

      let query = supabase
        .from('products')
        .select('*, product_variants(*)')
        .eq('account_id', activeAccount!.id)
        .eq('is_active', true)
        .order('name');

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }
      if (categoryFilter) {
        query = query.eq('category', categoryFilter);
      }

      const { data } = await query;
      if (!cancelled) {
        setProducts((data as Product[]) ?? []);
        setLoadKey((k) => k + 1);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [activeAccount, search, categoryFilter]);

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))] as string[];

  function toggleExpand(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function getPriceRange(variants: ProductVariant[]) {
    const active = variants.filter((v) => v.sell_price > 0);
    if (active.length === 0) return '—';
    const min = Math.min(...active.map((v) => v.sell_price));
    const max = Math.max(...active.map((v) => v.sell_price));
    if (min === max) return formatBRL(min);
    return `${formatBRL(min)} – ${formatBRL(max)}`;
  }

  return (
    <div className="space-y-4">
      {/* Search + Filter */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        {categories.length > 0 && (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">Todas categorias</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}
      </div>

      {/* Product List */}
      {loading ? (
        <div className="py-8 text-center text-muted-foreground">Carregando...</div>
      ) : products.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          {search ? 'Nenhum produto encontrado.' : 'Nenhum produto cadastrado.'}
        </div>
      ) : (
        <div className="space-y-1">
          {products.map((product) => {
            const expanded = expandedIds.has(product.id);
            const variants = product.product_variants ?? [];
            return (
              <div key={product.id} className="rounded-lg border">
                <button
                  onClick={() => toggleExpand(product.id)}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/50"
                >
                  {expanded ? (
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{product.name}</span>
                      {product.category && (
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {variants.length} variacao{variants.length !== 1 ? 'es' : ''} · {getPriceRange(variants)}
                    </div>
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-primary hover:underline"
                  >
                    Editar
                  </Link>
                </button>

                {expanded && variants.length > 0 && (
                  <div className="border-t bg-muted/30 px-3 py-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-xs text-muted-foreground">
                          <th className="pb-1 text-left font-normal">Variacao</th>
                          <th className="pb-1 text-right font-normal">Custo</th>
                          <th className="pb-1 text-right font-normal">Venda</th>
                        </tr>
                      </thead>
                      <tbody>
                        {variants.map((v) => (
                          <tr key={v.id}>
                            <td className="py-0.5">{v.name}</td>
                            <td className="py-0.5 text-right text-muted-foreground">{formatBRL(v.cost_price)}</td>
                            <td className="py-0.5 text-right font-medium">{formatBRL(v.sell_price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* FAB New Product */}
      <Link
        href="/products/new"
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
