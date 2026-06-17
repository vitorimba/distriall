'use client';

import { useAuth } from '@/providers/auth-provider';
import { useDriverDeliveries } from '@/hooks/use-driver-deliveries';
import { DeliveryList } from '@/components/driver/delivery-list';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';

export default function DriverPage() {
  const { user } = useAuth();
  const toast = useToast();
  const { items, loading, error, refetch, markDelivered } = useDriverDeliveries(
    user?.id
  );

  async function handleDelivered(itemId: string, orderId: string, observation: string) {
    await markDelivered(itemId, orderId, observation);
    toast('Entrega confirmada', 'success');
  }
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
        <p className="text-lg font-medium" style={{ color: 'var(--danger-fg)' }}>Erro ao carregar entregas</p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button
          onClick={refetch}
          className="w-full h-10 font-bold"
          style={{ background: 'var(--success)', color: '#fff' }}
        >
          Tentar novamente
        </Button>
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
        onDelivered={handleDelivered}
      />
    </div>
  );
}
