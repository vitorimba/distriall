'use client';

import dynamic from 'next/dynamic';
const ClientForm = dynamic(() => import('@/components/clients/client-form').then(m => m.ClientForm), {
  loading: () => <div className="animate-pulse h-96 bg-muted rounded-lg" />,
});

export default function NewClientPage() {
  return (
    <div className="px-4 py-4">
      <ClientForm />
    </div>
  );
}
