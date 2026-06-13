'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { type OrderStatus, ORDER_STATUS_LABELS } from '@distriall/shared';
import { OrderStatusBadge } from '@/components/orders/order-status-badge';
import { OrderStatusStepper } from '@/components/orders/order-status-stepper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Pencil, Printer, RotateCcw } from 'lucide-react';
import { usePrinter } from '@/hooks/use-printer';
import { OrderReceipt } from '@/components/orders/order-receipt';
import { ReturnForm } from '@/components/orders/return-form';
import { PageHeader } from '@/components/ui/page-header';
import { Money } from '@/components/ui/money';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';

interface OrderItem {
  id: string;
  product_name: string;
  variant_name: string;
  quantity: number;
  unit_price: number;
  cost_price: number;
  total: number;
  is_returned: boolean;
  returned_quantity: number;
  return_reason: string | null;
  returned_at: string | null;
}

interface OrderDetail {
  id: string;
  order_number: number;
  status: OrderStatus;
  payment_method: string | null;
  subtotal: number;
  total_cost: number;
  profit: number;
  total: number;
  notes: string | null;
  delivery_date: string | null;
  created_at: string;
  confirmed_at: string | null;
  loaded_at: string | null;
  delivered_at: string | null;
  clients: { id: string; name: string } | null;
  order_items: OrderItem[];
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR');
}

function formatDateTime(d: string) {
  return new Date(d).toLocaleString('pt-BR');
}

// Get the "next" forward status
function getNextStatus(status: OrderStatus): OrderStatus | null {
  const forward: Record<string, OrderStatus> = {
    lancado: 'confirmado',
    confirmado: 'carregado',
    carregado: 'entregue',
  };
  return forward[status] ?? null;
}

// Get the "previous" reverse status
function getPrevStatus(status: OrderStatus): OrderStatus | null {
  const reverse: Record<string, OrderStatus> = {
    confirmado: 'lancado',
    carregado: 'confirmado',
    entregue: 'carregado',
  };
  return reverse[status] ?? null;
}

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const toast = useToast();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const { isSupported, isPrinting, printOrder } = usePrinter();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('orders')
        .select('*, clients(id, name), order_items(*)')
        .eq('id', id)
        .single();

      setOrder(data as unknown as OrderDetail | null);
      setLoading(false);
    }
    load();
  }, [id]);

  async function reloadOrder() {
    const supabase = createClient();
    const { data } = await supabase
      .from('orders')
      .select('*, clients(id, name), order_items(*)')
      .eq('id', id)
      .single();
    setOrder(data as unknown as OrderDetail | null);
  }

  async function handleTransition(newStatus: OrderStatus) {
    setTransitioning(true);
    const supabase = createClient();
    const { error } = await supabase.rpc('transition_order_status', {
      p_order_id: id,
      p_new_status: newStatus,
    });

    if (error) {
      setTransitioning(false);
      return;
    }

    // Reload
    const { data } = await supabase
      .from('orders')
      .select('*, clients(id, name), order_items(*)')
      .eq('id', id)
      .single();

    const updated = data as unknown as OrderDetail | null;
    setOrder(updated);
    setTransitioning(false);
    if (updated) {
      if (newStatus === 'cancelado') {
        toast('Pedido cancelado', 'danger');
      } else {
        toast(`Pedido ${ORDER_STATUS_LABELS[newStatus].toLowerCase()}`, 'success');
      }
    }
  }

  if (loading) {
    return (
      <div className="px-4 py-4 space-y-4">
        <Skeleton variant="line" className="h-8 w-40" />
        <div className="flex gap-2">
          <Skeleton variant="rect" className="h-9 w-24" />
          <Skeleton variant="rect" className="h-9 w-24" />
          <Skeleton variant="rect" className="h-9 w-24" />
        </div>
        <Skeleton variant="rect" className="h-48" />
        <Skeleton variant="rect" className="h-32" />
        <Skeleton variant="rect" className="h-28" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Pedido nao encontrado.
      </div>
    );
  }

  const nextStatus = getNextStatus(order.status);
  const prevStatus = getPrevStatus(order.status);
  const canEdit = order.status !== 'entregue' && order.status !== 'cancelado';

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header */}
      <PageHeader
        title={`Pedido #${order.order_number}`}
        onBack={() => router.back()}
        actions={<OrderStatusBadge status={order.status} className="text-sm px-3 py-1" />}
      >
        {order.clients ? (
          <Link href={`/clients/${order.clients.id}`} className="text-sm text-primary underline underline-offset-2">
            {order.clients.name}
          </Link>
        ) : (
          <p className="text-sm text-muted-foreground">—</p>
        )}
      </PageHeader>

      {/* Status Stepper */}
      <Card>
        <CardContent className="py-3">
          <OrderStatusStepper status={order.status} />
        </CardContent>
      </Card>

      {/* Status transition buttons */}
      <div className="flex gap-2">
        {prevStatus && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleTransition(prevStatus)}
            disabled={transitioning}
          >
            <ArrowLeft className="mr-1 size-3.5" />
            Voltar: {ORDER_STATUS_LABELS[prevStatus]}
          </Button>
        )}
        {nextStatus && (
          <Button
            size="sm"
            onClick={() => handleTransition(nextStatus)}
            disabled={transitioning}
          >
            {ORDER_STATUS_LABELS[nextStatus]}
            <ArrowRight className="ml-1 size-3.5" />
          </Button>
        )}
        {canEdit && (
          <Link href={`/orders/${order.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="mr-1 size-3.5" />
              Editar
            </Button>
          </Link>
        )}
        {isSupported ? (
          <Button
            variant="outline"
            size="sm"
            disabled={isPrinting}
            onClick={async () => {
              try {
                await printOrder(
                  { ...order, client_name: order.clients?.name ?? '', items: order.order_items },
                  'Distriall'
                );
              } catch {
                setShowReceipt(true);
              }
            }}
          >
            <Printer className="mr-1 size-3.5" />
            {isPrinting ? 'Imprimindo...' : 'Imprimir'}
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setShowReceipt(true)}>
            <Printer className="mr-1 size-3.5" />
            Ver Cupom
          </Button>
        )}
        {order.status === 'entregue' && (
          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-destructive/50"
            onClick={() => setShowReturnForm(true)}
          >
            <RotateCcw className="mr-1 size-3.5" />
            Devolucao
          </Button>
        )}
      </div>

      {/* Return form */}
      {showReturnForm && order && (
        <ReturnForm
          orderId={order.id}
          items={order.order_items}
          onClose={() => setShowReturnForm(false)}
          onReturned={reloadOrder}
        />
      )}

      {/* Receipt dialog (preview + print fallback) */}
      {order && (
        <OrderReceipt
          open={showReceipt}
          onClose={() => setShowReceipt(false)}
          orderNumber={order.order_number}
          clientName={order.clients?.name ?? ''}
          accountName="Distriall"
          paymentMethod={order.payment_method}
          total={order.total}
          subtotal={order.subtotal}
          items={order.order_items}
        />
      )}

      {/* Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Itens ({order.order_items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {order.order_items.map((item) => {
              const hasReturn = item.returned_quantity > 0;
              return (
                <div key={item.id} className={`py-1 text-sm ${hasReturn ? 'bg-red-50 rounded px-2 -mx-2' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{item.product_name}</span>
                      <span className="text-muted-foreground"> – {item.variant_name}</span>
                      <span className="text-muted-foreground"> x{item.quantity}</span>
                      {item.is_returned && (
                        <span className="ml-1 rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-800 border border-red-300">
                          Devolvido
                        </span>
                      )}
                      {hasReturn && !item.is_returned && (
                        <span className="ml-1 rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-800 border border-red-300">
                          Dev. parcial: {item.returned_quantity}
                        </span>
                      )}
                    </div>
                    <span className={`font-medium ${hasReturn ? 'line-through text-muted-foreground' : ''}`}>
                      <Money value={item.total} />
                    </span>
                  </div>
                  {hasReturn && (
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.return_reason && <span>Motivo: {item.return_reason}</span>}
                      {item.returned_at && <span> · {formatDateTime(item.returned_at)}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardContent className="pt-4 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium"><Money value={order.subtotal} /></span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Custo total</span>
            <span><Money value={order.total_cost} /></span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Lucro</span>
            <Money value={order.profit} signed />
          </div>
          <div className="border-t pt-1 flex justify-between text-sm font-bold">
            <span>Total</span>
            <span><Money value={order.total} /></span>
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <Card>
        <CardContent className="pt-4 space-y-1 text-sm">
          {order.payment_method && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pagamento</span>
              <span className="capitalize">{order.payment_method}</span>
            </div>
          )}
          {order.delivery_date && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Entrega</span>
              <span>{formatDate(order.delivery_date + 'T00:00:00')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Criado em</span>
            <span>{formatDateTime(order.created_at)}</span>
          </div>
          {order.confirmed_at && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Confirmado em</span>
              <span>{formatDateTime(order.confirmed_at)}</span>
            </div>
          )}
          {order.loaded_at && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Carregado em</span>
              <span>{formatDateTime(order.loaded_at)}</span>
            </div>
          )}
          {order.delivered_at && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Entregue em</span>
              <span>{formatDateTime(order.delivered_at)}</span>
            </div>
          )}
          {order.notes && (
            <div className="border-t pt-2">
              <span className="text-muted-foreground">Notas: </span>
              <span>{order.notes}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
