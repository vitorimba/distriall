'use client';

import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useCartStore } from '@/stores/cart-store';
import { useAccount } from '@/providers/account-provider';
import { SearchField } from '@/components/ui/search-field';
import { Money } from '@/components/ui/money';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Package, RefreshCw, TrendingDown, TrendingUp } from 'lucide-react';
import { calculateMargin, getMarginLevel } from '@distriall/shared';

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

interface CatalogItem {
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  sellPrice: number;
  costPrice: number;
}

export function ProductCatalog() {
  const { activeAccount } = useAccount();
  const { addItem, items, priceMap } = useCartStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [tappedId, setTappedId] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, [activeAccount]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadProducts() {
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('products')
        .select('id, name, product_variants(id, name, sell_price, cost_price)')
        .eq('is_active', true)
        .order('name');

      if (queryError) throw queryError;

      // Load account-specific prices to override global sell_price
      if (activeAccount) {
        const { data: accountPrices } = await supabase
          .from('account_prices')
          .select('product_variant_id, sell_price')
          .eq('account_id', activeAccount.id);

        if (accountPrices && accountPrices.length > 0) {
          const apMap = new Map(accountPrices.map((ap: { product_variant_id: string; sell_price: number }) => [ap.product_variant_id, ap.sell_price]));
          // Override variant sell_price with account-specific price
          for (const product of (data ?? [])) {
            for (const variant of product.product_variants) {
              const accountPrice = apMap.get(variant.id);
              if (accountPrice != null) {
                variant.sell_price = accountPrice;
              }
            }
          }
        }
      }

      setProducts((data as Product[]) ?? []);
    } catch {
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }

  // Flatten products into catalog items (one per variant)
  const catalogItems = useMemo<CatalogItem[]>(() => {
    return products.flatMap((p) =>
      p.product_variants.map((v) => ({
        productId: p.id,
        productName: p.name,
        variantId: v.id,
        variantName: v.name,
        sellPrice: v.sell_price,
        costPrice: v.cost_price,
      }))
    );
  }, [products]);

  // Filter by search
  const filtered = useMemo(() => {
    if (!search.trim()) return catalogItems;
    const q = search.toLowerCase();
    return catalogItems.filter(
      (item) =>
        item.productName.toLowerCase().includes(q) ||
        item.variantName.toLowerCase().includes(q)
    );
  }, [catalogItems, search]);

  // Map of variantId → quantity in cart
  const qtyMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of items) {
      map.set(item.variantId, item.quantity);
    }
    return map;
  }, [items]);

  function handleTap(item: CatalogItem) {
    addItem({
      variantId: item.variantId,
      productName: item.productName,
      variantName: item.variantName,
      quantity: 1,
      costPrice: item.costPrice,
      defaultPrice: item.sellPrice,
    });

    // Visual feedback
    setTappedId(item.variantId);
    setTimeout(() => setTappedId(null), 150);
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton variant="rect" className="h-10" />
        <div className="grid grid-cols-2 gap-[var(--stack-gap)] md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rect" className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert
        tone="danger"
        action={
          <Button variant="outline" size="sm" onClick={loadProducts}>
            <RefreshCw className="mr-1.5 size-3.5" />
            Tentar novamente
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  // Empty state
  if (catalogItems.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="Nenhum produto cadastrado"
        description="Cadastre produtos para começar a lançar pedidos"
        actionLabel="Ir para Produtos"
        onAction={() => { window.location.href = '/products'; }}
      />
    );
  }

  return (
    <div className="space-y-3">
      {/* Search filter */}
      <SearchField
        placeholder="Filtrar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch('')}
      />

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-[var(--stack-gap)] md:grid-cols-3">
        {filtered.map((item) => {
          const qty = qtyMap.get(item.variantId) ?? 0;
          const effectivePrice = priceMap.get(item.variantId) ?? item.sellPrice;
          const hasCustomPrice = priceMap.has(item.variantId);
          const isTapped = tappedId === item.variantId;
          const marginLevel = item.costPrice > 0 ? getMarginLevel(effectivePrice, item.costPrice) : null;
          const margin = item.costPrice > 0 ? calculateMargin(effectivePrice, item.costPrice) : null;

          return (
            <button
              key={item.variantId}
              type="button"
              onClick={() => handleTap(item)}
              className={[
                'relative flex flex-col items-start rounded-[var(--radius-ds-md)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-[var(--card-pad)] text-left shadow-[var(--shadow-card)]',
                'min-h-[80px] transition-transform touch-manipulation',
                'active:scale-[0.97]',
                'focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2',
                'motion-reduce:transition-none motion-reduce:active:scale-100',
                isTapped ? 'scale-[0.97]' : '',
              ].join(' ')}
              style={{ transitionDuration: 'var(--duration-instant)' }}
            >
              {/* Quantity badge */}
              {qty > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex size-6 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-[var(--text-primary)] shadow-sm">
                  {qty}
                </span>
              )}

              {/* Product name */}
              <span className="text-sm font-medium text-[var(--text-primary)] leading-snug">
                {item.productName}
              </span>

              {/* Variant name */}
              <span className="mt-0.5 text-xs text-[var(--text-secondary)]">
                {item.variantName}
              </span>

              {/* Price */}
              <Money
                value={effectivePrice}
                className={[
                  'mt-auto pt-1.5 text-sm',
                  hasCustomPrice ? 'font-medium text-[var(--accent-fg)]' : 'text-[var(--text-secondary)]',
                ].join(' ')}
              />

              {/* Margin badge */}
              {marginLevel === 'negative' && margin !== null && (
                <span className="mt-1 inline-flex items-center gap-0.5 rounded-md bg-[var(--danger-soft)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--danger-fg)]">
                  <TrendingDown className="size-3" />
                  {margin.toFixed(1)}%
                </span>
              )}
              {marginLevel === 'low' && margin !== null && (
                <span className="mt-1 inline-flex items-center gap-0.5 rounded-md bg-[var(--warning-soft)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--warning)]">
                  <TrendingUp className="size-3" />
                  {margin.toFixed(1)}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* No results from filter */}
      {filtered.length === 0 && search.trim() && (
        <p className="py-6 text-center text-sm text-[var(--text-secondary)]">
          Nenhum produto encontrado para &ldquo;{search}&rdquo;
        </p>
      )}
    </div>
  );
}
