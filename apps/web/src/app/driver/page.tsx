'use client';

import { useAuth } from '@/providers/auth-provider';
import { useDriverDeliveries } from '@/hooks/use-driver-deliveries';
import { DeliveryList } from '@/components/driver/delivery-list';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Skeleton } from '@/components/ui/skeleton';

export default function DriverPage() {
  const { user } = useAuth();
  const { items, loading, error, refetch, markDelivered } = useDriverDeliveries(
    user?.id
  );
  // Realtime subscription is managed inside useDriverDeliveries
  // (scoped to this driver's delivery_id to avoid cross-driver event leakage)

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton variant="rect" className="h-6 w-48" />
        <Skeleton variant="rect" className="h-3" />
        <Skeleton variant="rect" className="h-28" />
        <Skeleton variant="rect" className="h-28" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center space-y-4">
        <p className="text-xl text-red-600 font-medium">Erro ao carregar entregas</p>
        <p className="text-lg text-gray-500">{error}</p>
        <button
          onClick={refetch}
          className="w-full h-14 bg-green-600 text-white text-xl font-bold rounded-xl"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  const delivered = items.filter((i) => i.status === 'entregue').length;
  const total = items.length;

  return (
    <div className="space-y-4">
      {total > 0 && (
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">
            Entregas: {delivered}/{total}
          </p>
          <ProgressBar value={delivered} max={total} tone="success" label="Progresso de entregas" />
        </div>
      )}

      <DeliveryList
        items={items}
        onDelivered={markDelivered}
      />
    </div>
  );
}
