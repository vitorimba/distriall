'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ProductForm } from '@/components/products/product-form';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
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

      setProduct(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Carregando...
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
