'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { ProductForm } from '@/components/products/product-form';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { activeAccount } = useAccount();
  const [product, setProduct] = useState<{
    id: string;
    name: string;
    description: string | null;
    category: string | null;
    unit: string;
    product_variants: {
      id: string;
      name: string;
      weight_grams: number | null;
      cost_price: number;
      sell_price: number;
      sku: string | null;
    }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('products')
        .select('*, product_variants(*)')
        .eq('id', id)
        .single();

      // Override sell_price with account-specific prices
      if (data && activeAccount) {
        const variantIds = data.product_variants.map((v: { id: string }) => v.id);
        if (variantIds.length > 0) {
          const { data: accountPrices } = await supabase
            .from('account_prices')
            .select('product_variant_id, sell_price')
            .eq('account_id', activeAccount.id)
            .in('product_variant_id', variantIds);

          if (accountPrices && accountPrices.length > 0) {
            const apMap = new Map(accountPrices.map((ap: { product_variant_id: string; sell_price: number }) => [ap.product_variant_id, ap.sell_price]));
            for (const variant of data.product_variants) {
              const accountPrice = apMap.get(variant.id);
              if (accountPrice != null) {
                variant.sell_price = accountPrice;
              }
            }
          }
        }
      }

      setProduct(data);
      setLoading(false);
    }
    load();
  }, [id, activeAccount]);

  if (loading) {
    return (
      <div className="px-4 py-4 space-y-4">
        <Skeleton variant="line" className="h-8 w-40" />
        <Skeleton variant="rect" className="h-48" />
        <Skeleton variant="rect" className="h-48" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Produto nao encontrado.
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <ProductForm product={product} />
    </div>
  );
}
