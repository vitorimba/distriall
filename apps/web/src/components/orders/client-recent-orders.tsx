'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { useCartStore } from '@/stores/cart-store';
import { useOrders } from '@/hooks/use-orders';
import { StatusBadge } from '@/components/ui/status-badge';
import { Money } from '@/components/ui/money';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { ChevronDown, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentOrder {
  id: string;
  order_number: number;
  status: string;
  total: number;
  created_at: string;
  item_count: number;
}

interface OrderItemDetail {
  product_variant_id: string;
  product_name: string;
  variant_name: string;
  quantity: number;
  unit_price: number;
  cost_price: number;
}

export function ClientRecentOrders({ clientId }: { clientId: string }) {
  const { activeAccount } = useAccount();
  const { getOrder } = useOrders();
  const { items: cartItems, addItem, clearCart, client, priceMap } = useCartStore();
  const toast = useToast();

  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<OrderItemDetail[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);
  const [repeating, setRepeating] = useState(false);

  useEffect(() => {
    if (!activeAccount || !clientId) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      const supabase = createClient();
      const { data } = await supabase
        .from('orders')
        .select('id, order_number, status, total, created_at, order_items(count)')
        .eq('client_id', clientId)
        .eq('account_id', activeAccount!.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (cancelled) return;

      const rows = (data ?? []).map((o: { id: string; order_number: number; status: string; total: number; created_at: string; order_items: unknown }) => ({
        id: o.id as string,
        order_number: o.order_number as number,
        status: o.status as string,
        total: o.total as number,
        created_at: o.created_at as string,
        item_count: Array.isArray(o.order_items) ? (o.order_items[0] as { count: number })?.count ?? 0 : 0,
      }));

      setOrders(rows);
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [activeAccount, clientId]);

  async function handleExpand(orderId: string) {
    if (expandedId === orderId) {
      setExpandedId(null);
      return;
    }

    setExpandedId(orderId);
    setLoadingItems(true);

    try {
      const order = await getOrder(orderId);
      const items = (order.order_items as unknown as OrderItemDetail[]) ?? [];
      setExpandedItems(items);
    } catch {
      setExpandedItems([]);
    } finally {
      setLoadingItems(false);
    }
  }

  function handleRepeatClick(orderId: string) {
    if (cartItems.length > 0) {
      setPendingOrderId(orderId);
      setConfirmOpen(true);
    } else {
      executeRepeat(orderId);
    }
  }

  function handleConfirmRepeat() {
    setConfirmOpen(false);
    if (pendingOrderId) {
      executeRepeat(pendingOrderId);
    }
  }

  async function executeRepeat(orderId: string) {
    setRepeating(true);

    try {
      const order = await getOrder(orderId);
      const orderItems = (order.order_items as unknown as OrderItemDetail[]) ?? [];

      // Check which products are still active
      const supabase = createClient();
      const variantIds = orderItems.map((i) => i.product_variant_id);
      const { data: activeVariants } = await supabase
        .from('product_variants')
        .select('id')
        .in('id', variantIds)
        .eq('products.is_active', true);

      // Fallback: if join doesn't work, just use all variants
      const activeSet = new Set(
        activeVariants ? activeVariants.map((v: { id: string }) => v.id) : variantIds
      );

      // Keep client, clear items only
      const currentClient = client;
      const currentPriceMap = priceMap;
      clearCart();
      if (currentClient) {
        useCartStore.getState().setClient(currentClient);
        useCartStore.getState().setPriceMap(currentPriceMap);
      }

      let skipped = 0;
      for (const item of orderItems) {
        if (!activeSet.has(item.product_variant_id)) {
          skipped++;
          continue;
        }
        addItem({
          variantId: item.product_variant_id,
          productName: item.product_name,
          variantName: item.variant_name,
          quantity: item.quantity,
          costPrice: item.cost_price,
          defaultPrice: item.unit_price,
        });
      }

      if (skipped > 0) {
        toast(`${skipped} produto(s) removido(s) por estarem inativos`, 'info');
      } else {
        toast('Pedido carregado no carrinho', 'success');
      }
    } catch {
      toast('Erro ao repetir pedido', 'danger');
    } finally {
      setRepeating(false);
    }
  }

  // AC#5: no orders → don't render
  if (!loading && orders.length === 0) return null;

  // Loading
  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton variant="line" className="h-5 w-32" />
        <Skeleton variant="rect" className="h-16" />
        <Skeleton variant="rect" className="h-16" />
      </div>
    );
  }

  return (
    <>
      <div className="rounded-[var(--radius-ds-md)] border border-[var(--border-subtle)] bg-[var(--surface-card)]">
        {/* Collapsible header */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center gap-2 px-[var(--card-pad)] py-3 text-left"
        >
          <span className="flex-1 text-sm font-semibold text-[var(--text-primary)]">
            Ultimos Pedidos ({orders.length})
          </span>
          <ChevronDown
            className={cn(
              'size-4 text-muted-foreground transition-transform',
              !collapsed && 'rotate-180'
            )}
            style={{ transitionDuration: 'var(--duration-slow)' }}
          />
        </button>

        {/* Order list */}
        {!collapsed && (
          <div className="space-y-2 px-[var(--card-pad)] pb-[var(--card-pad)]">
            {orders.map((order) => {
              const isExpanded = expandedId === order.id;
              const date = new Date(order.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
              });

              return (
                <div
                  key={order.id}
                  className="rounded-[var(--radius-ds-sm)] bg-[var(--surface-raised)] p-[var(--inline-gap)]"
                >
                  {/* Order summary row */}
                  <button
                    type="button"
                    onClick={() => handleExpand(order.id)}
                    className="flex w-full items-center gap-2 text-left min-h-[var(--touch-target)]"
                  >
                    <span className="text-xs text-[var(--text-secondary)]">
                      #{order.order_number} · {date}
                    </span>
                    <StatusBadge tone={order.status} className="text-[10px]" />
                    <span className="flex-1" />
                    <span className="text-xs text-[var(--text-secondary)]">
                      {order.item_count} {order.item_count === 1 ? 'item' : 'itens'}
                    </span>
                    <Money value={order.total} className="text-xs font-medium" />
                    <ChevronDown
                      className={cn(
                        'size-3.5 text-muted-foreground transition-transform',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* Expanded items */}
                  {isExpanded && (
                    <div className="mt-2 space-y-1 border-t border-[var(--border-subtle)] pt-2">
                      {loadingItems ? (
                        <>
                          <Skeleton variant="line" className="h-3 w-48" />
                          <Skeleton variant="line" className="h-3 w-36" />
                        </>
                      ) : (
                        <>
                          {expandedItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-[var(--text-secondary)]"
                              style={{ fontSize: 'var(--fs-xs)' }}
                            >
                              <span>
                                {item.product_name} — {item.variant_name}
                              </span>
                              <span className="tabular-nums">
                                {item.quantity}x <Money value={item.unit_price} className="text-inherit" />
                              </span>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRepeatClick(order.id)}
                            disabled={repeating}
                            className="mt-2 w-full"
                          >
                            <RotateCcw className="mr-1.5 size-3.5" />
                            {repeating ? 'Carregando...' : 'Repetir pedido'}
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Substituir itens atuais?</DialogTitle>
            <DialogDescription>
              O carrinho ja tem {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}.
              Ao repetir o pedido, os itens atuais serao substituidos.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmRepeat}>
              Substituir e carregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
