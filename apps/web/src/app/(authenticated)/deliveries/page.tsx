'use client';

import { useState, useEffect, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/providers/auth-provider';
import { useAccount } from '@/providers/account-provider';
import { useDeliveries, useDeliveryRealtime } from '@/hooks/use-deliveries';
import type { AvailableOrder, RouteItem } from '@/hooks/use-deliveries';
import { RouteBuilder } from '@/components/deliveries/route-builder';
import { AvailableOrders } from '@/components/deliveries/available-orders';
import { reassignSequences } from '@/lib/delivery-utils';
import { PageHeader } from '@/components/ui/page-header';
import { Alert } from '@/components/ui/alert';
import { useToast } from '@/components/ui/toast';

interface Driver {
  id: string;
  name: string;
}

export default function DeliveriesPage() {
  const { user } = useAuth();
  const { accounts, activeAccount } = useAccount();

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  // Local route items used only before delivery is sent (draft state)
  const [draftRouteItems, setDraftRouteItems] = useState<RouteItem[]>([]);
  const [isSending, setIsSending] = useState(false);
  const pushToast = useToast();

  const {
    availableOrders,
    currentDelivery,
    loading,
    error: deliveryError,
    fetchAvailableOrders,
    fetchCurrentDelivery,
    createDelivery,
    addItemToDelivery,
    removeItemFromDelivery,
    reorderDeliveryItems,
  } = useDeliveries();

  const accountIds = accounts.map((a) => a.id);
  const adminAccountId = activeAccount?.id ?? '';

  // Derive route items: from DB when delivery exists, from draft otherwise
  const routeItems: RouteItem[] = currentDelivery ? currentDelivery.items : draftRouteItems;
  const deliverySent = currentDelivery !== null;
  const canEdit = !currentDelivery || currentDelivery.status === 'pendente';

  function showToast(message: string, tone: 'success' | 'danger' | 'info' = 'info') {
    pushToast(message, tone);
  }

  // Load drivers (entregadores) from account_users
  useEffect(() => {
    if (!adminAccountId) return;
    const supabase = createClient();

    supabase
      .from('account_users')
      .select('user_id, users!inner(id, name)')
      .eq('account_id', adminAccountId)
      .eq('role', 'entregador')
      .eq('is_active', true)
      .then(({ data }) => {
        if (!data) return;
        const mapped = data.map((row: Record<string, unknown>) => {
          const u = row.users as { id: string; name: string };
          return { id: u.id, name: u.name };
        });
        setDrivers(mapped);
        if (mapped.length > 0 && !selectedDriverId) {
          setSelectedDriverId(mapped[0].id);
        }
      });
  }, [adminAccountId, selectedDriverId]);

  // Load available orders when date/accounts change
  const accountIdsKey = accountIds.join(',');
  useEffect(() => {
    if (accountIds.length > 0 && selectedDate) {
      fetchAvailableOrders(selectedDate, accountIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, accountIdsKey, fetchAvailableOrders]);

  // Load existing delivery for selected driver+date
  const loadCurrentDelivery = useCallback(() => {
    if (selectedDriverId && selectedDate && adminAccountId) {
      fetchCurrentDelivery(selectedDriverId, selectedDate, adminAccountId);
    }
  }, [selectedDriverId, selectedDate, adminAccountId, fetchCurrentDelivery]);

  useEffect(() => {
    loadCurrentDelivery();
  }, [loadCurrentDelivery]);

  useDeliveryRealtime(currentDelivery?.id ?? null, loadCurrentDelivery);

  const routeOrderIds = new Set(routeItems.map((item) => item.id));

  function handleAddOrder(order: AvailableOrder) {
    if (currentDelivery && canEdit) {
      const sequence = routeItems.length + 1;
      addItemToDelivery(currentDelivery.id, order, sequence)
        .then(() => loadCurrentDelivery())
        .catch((err: Error) => showToast('Erro ao adicionar: ' + err.message));
    } else if (!currentDelivery) {
      const newItem: RouteItem = { ...order, sequence: draftRouteItems.length + 1 };
      setDraftRouteItems((prev) => [...prev, newItem]);
    }
  }

  function handleRemoveItem(deliveryItemId: string) {
    if (currentDelivery) {
      removeItemFromDelivery(deliveryItemId)
        .then(() => loadCurrentDelivery())
        .catch((err: Error) => showToast('Erro ao remover: ' + err.message));
    } else {
      setDraftRouteItems((prev) =>
        reassignSequences(prev.filter((item) => item.delivery_item_id !== deliveryItemId))
      );
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = routeItems.findIndex(
      (item) => (item.delivery_item_id ?? item.id) === active.id
    );
    const newIndex = routeItems.findIndex(
      (item) => (item.delivery_item_id ?? item.id) === over.id
    );
    if (oldIndex === -1 || newIndex === -1) return;

    applyReorder(arrayMove(routeItems, oldIndex, newIndex));
  }

  function handleMoveUp(index: number) {
    if (index === 0) return;
    applyReorder(arrayMove(routeItems, index, index - 1));
  }

  function handleMoveDown(index: number) {
    if (index === routeItems.length - 1) return;
    applyReorder(arrayMove(routeItems, index, index + 1));
  }

  function applyReorder(reordered: RouteItem[]) {
    const reassigned = reassignSequences(reordered);

    if (currentDelivery) {
      reorderDeliveryItems(
        currentDelivery.id,
        reassigned
          .filter((item) => item.delivery_item_id)
          .map((item) => ({ id: item.delivery_item_id!, sequence: item.sequence }))
      )
        .then(() => loadCurrentDelivery())
        .catch((err: Error) => showToast('Erro ao reordenar: ' + err.message));
    } else {
      setDraftRouteItems(reassigned);
    }
  }

  async function handleSend() {
    if (!selectedDriverId || !adminAccountId || draftRouteItems.length === 0) return;
    setIsSending(true);
    try {
      await createDelivery({
        accountId: adminAccountId,
        driverId: selectedDriverId,
        date: selectedDate,
        routeItems: draftRouteItems,
      });
      const driverName = drivers.find((d) => d.id === selectedDriverId)?.name ?? 'entregador';
      showToast(`Rota enviada para ${driverName}`, 'success');
      setDraftRouteItems([]);
      loadCurrentDelivery();
    } catch (err) {
      showToast('Erro ao enviar rota: ' + (err as Error).message, 'danger');
    } finally {
      setIsSending(false);
    }
  }

  if (!user) return null;

  return (
    <div className="space-y-4 px-4 py-4">
      <PageHeader title="Entregas" />

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Data</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => { setSelectedDate(e.target.value); setDraftRouteItems([]); }}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Entregador</label>
          <select
            value={selectedDriverId}
            onChange={(e) => { setSelectedDriverId(e.target.value); setDraftRouteItems([]); }}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {drivers.length === 0 && (
              <option value="">Nenhum entregador</option>
            )}
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Delivery error */}
      {deliveryError && (
        <Alert tone="danger" title="Nao foi possivel carregar as entregas." />
      )}

      {/* 2-column layout: available orders (left) + route builder (right) */}
      <div className="da-grid da-grid--cols2">
        <AvailableOrders
          orders={availableOrders}
          routeOrderIds={routeOrderIds}
          onAdd={handleAddOrder}
          loading={loading}
        />

        <RouteBuilder
          items={routeItems}
          canEdit={canEdit}
          deliverySent={deliverySent}
          isSending={isSending}
          onDragEnd={handleDragEnd}
          onRemove={handleRemoveItem}
          onSend={handleSend}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
        />
      </div>
    </div>
  );
}
