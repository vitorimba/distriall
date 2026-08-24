'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useClientDetail } from '@/hooks/use-client-detail';
import { ClientBalanceCard } from '@/components/clients/client-balance';
import { ClientPurchaseFrequency } from '@/components/clients/client-purchase-frequency';
import { ClientPricesTable } from '@/components/clients/client-prices-table';
import { ClientOrderHistory } from '@/components/clients/client-order-history';
import { ClientAddresses } from '@/components/clients/client-addresses';
import { ClientAccountStatement } from '@/components/clients/client-account-statement';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PAYMENT_METHOD_LABELS } from '@distriall/shared';
import { Pencil, Plus, MapPin, Phone, MessageCircle } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { client, balance, loading } = useClientDetail(id);

  if (loading) {
    return (
      <div className="px-4 py-4 space-y-4">
        <Skeleton variant="line" className="h-8 w-48" />
        <Skeleton variant="rect" className="h-28" />
        <Skeleton variant="rect" className="h-24" />
        <Skeleton variant="rect" className="h-32" />
        <Skeleton variant="rect" className="h-48" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Cliente não encontrado.
      </div>
    );
  }

  return (
    <div className="px-4 py-4 space-y-4 pb-8">
      {/* Header */}
      <PageHeader
        title={client.name}
        subtitle={client.trade_name ?? undefined}
        onBack={() => router.back()}
        actions={
          <>
            <Link href={`/clients/${id}/edit`}>
              <Button variant="outline" size="sm">
                <Pencil className="size-3.5 mr-1" />
                Editar
              </Button>
            </Link>
            <Link href={`/orders/new?client=${id}`}>
              <Button size="sm">
                <Plus className="size-3.5 mr-1" />
                Novo pedido
              </Button>
            </Link>
          </>
        }
      />

      {/* Cadastral data */}
      <Card>
        <CardContent className="pt-4 pb-4 space-y-2">
          {(client.address || client.city || client.neighborhood) && (
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="size-4 text-muted-foreground mt-0.5 shrink-0" />
              <span>
                {[client.address, client.neighborhood, client.city].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
          {client.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="size-4 text-muted-foreground shrink-0" />
              <span>{client.phone}</span>
            </div>
          )}
          {client.whatsapp && (
            <div className="flex items-center gap-2 text-sm">
              <MessageCircle className="size-4 text-muted-foreground shrink-0" />
              <span>{client.whatsapp}</span>
            </div>
          )}
          {client.default_payment_method && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Pagamento padrão:</span>
              <span className="font-medium">
                {PAYMENT_METHOD_LABELS[client.default_payment_method] ?? client.default_payment_method}
              </span>
            </div>
          )}
          {client.notes && (
            <div className="text-sm text-muted-foreground border-t pt-2 mt-2">
              {client.notes}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Addresses */}
      <ClientAddresses clientId={id} />

      {/* Balance */}
      {balance && <ClientBalanceCard clientId={id} balance={balance} />}

      {/* Account statement timeline */}
      <ClientAccountStatement clientId={id} />

      {/* Purchase frequency */}
      <ClientPurchaseFrequency clientId={id} />

      {/* Special prices */}
      <ClientPricesTable clientId={id} />

      {/* Order history */}
      <ClientOrderHistory clientId={id} />

      {/* New order button */}
      <Link href={`/orders/new?client=${id}`}>
        <Button className="w-full">
          <Plus className="size-4 mr-2" />
          Novo Pedido
        </Button>
      </Link>
    </div>
  );
}
