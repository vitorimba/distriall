'use client';

import { useAuth } from '@/providers/auth-provider';
import { useDriverDeliveries } from '@/hooks/use-driver-deliveries';
import { DeliveryList } from '@/components/driver/delivery-list';

export default function DriverPage() {
  const { user } = useAuth();
  const { items, loading, error, refetch, markDelivered } = useDriverDeliveries(
    user?.id
  );
  // Realtime subscription is managed inside useDriverDeliveries
  // (scoped to this driver's delivery_id to avoid cross-driver event leakage)

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-2xl text-gray-500">Carregando entregas...</p>
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

  return (
    <DeliveryList
      items={items}
      onDelivered={markDelivered}
    />
  );
}
