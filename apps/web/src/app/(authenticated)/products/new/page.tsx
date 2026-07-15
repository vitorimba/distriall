'use client';

import dynamic from 'next/dynamic';
const ProductForm = dynamic(() => import('@/components/products/product-form').then(m => m.ProductForm), {
  loading: () => <div className="animate-pulse h-96 bg-muted rounded-lg" />,
});

export default function NewProductPage() {
  return (
    <div className="px-4 py-4">
      <ProductForm />
    </div>
  );
}
