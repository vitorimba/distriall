'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
const ProductList = dynamic(() => import('@/components/products/product-list').then(m => m.ProductList), {
  loading: () => <div className="animate-pulse h-96 bg-muted rounded-lg" />,
});
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader
        title="Produtos"
        actions={
          <Link href="/products/new">
            <Button size="sm">
              <Plus className="mr-1 size-4" />
              Novo produto
            </Button>
          </Link>
        }
      />
      <ProductList />
    </div>
  );
}
