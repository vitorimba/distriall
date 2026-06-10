'use client';

import { ProductList } from '@/components/products/product-list';

export default function ProductsPage() {
  return (
    <div className="px-4 py-4">
      <h1 className="mb-4 text-xl font-bold">Produtos</h1>
      <ProductList />
    </div>
  );
}
