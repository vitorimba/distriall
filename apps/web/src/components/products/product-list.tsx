'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/badge';
import { SearchField } from '@/components/ui/search-field';
import { Select } from '@/components/ui/select';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert } from '@/components/ui/alert';
import { Money } from '@/components/ui/money';
import { FAB } from '@/components/ui/fab';
import { Button } from '@/components/ui/button';
import { Package, ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [loadKey, setLoadKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const loading = loadKey === 0 && products.length === 0 && !error;

  const loadProducts = useCallback(async () => {
    const supabase = createClient();

    let query = supabase
      .from('products')
      .select('*, product_variants(*)')
      .eq('is_active', true)
      .order('name');

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    if (categoryFilter) {
      query = query.eq('category', categoryFilter);
    }

    const { data, error: fetchError } = await query;
    if (fetchError) {
      setError('Nao foi possivel carregar os produtos.');
    } else {
      setError(null);
      setProducts((data as Product[]) ?? []);
    }
    setLoadKey((k) => k + 1);
  }, [search, categoryFilter]);

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => { if (!cancelled) loadProducts(); }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, [loadProducts]);

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
        <SearchField
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
          className="flex-1"
        />
        {categories.length > 0 && (
          <Select
            options={categories.map((c) => ({ value: c, label: c }))}
            placeholder="Todas categorias"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="sm:w-48"
          />
        )}
      </div>

      {/* Error alert */}
      {error && (
        <Alert
          tone="danger"
          title={error}
          action={
            <Button size="sm" variant="ghost" onClick={loadProducts}>
              <RefreshCw className="size-3.5 mr-1" />
              Tentar novamente
            </Button>
          }
        />
      )}

      {/* Product List */}
      {!error && loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} variant="rect" className="h-14" />)}
        </div>
      ) : !error && products.length === 0 ? (
        <EmptyState
          icon={Package}
          title={search ? 'Nenhum produto encontrado' : 'Nenhum produto ainda'}
          description={search ? undefined : 'Cadastre o primeiro produto para ve-lo aqui.'}
        />
      ) : !error ? (
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
                            <td className="py-0.5 text-right text-muted-foreground"><Money value={v.cost_price} /></td>
                            <td className="py-0.5 text-right font-medium"><Money value={v.sell_price} /></td>
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
      ) : null}

      {/* FAB New Product */}
      <Link href="/products/new">
        <FAB label="Novo produto" />
      </Link>
    </div>
  );
}
