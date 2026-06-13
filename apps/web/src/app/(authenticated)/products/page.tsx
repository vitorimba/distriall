'use client';

import Link from 'next/link';
import { ProductList } from '@/components/products/product-list';
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
