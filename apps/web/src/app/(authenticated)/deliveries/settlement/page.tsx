'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from '@/providers/account-provider';
import { useDeliverySettlements, type DeliveryOrderForSettlement, type DeliverySettlement } from '@/hooks/use-delivery-settlements';
import { SettlementItemCard, type SettlementItemData } from '@/components/deliveries/settlement-item-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Money } from '@/components/ui/money';
import { useToast } from '@/components/ui/toast';
import { ClipboardCheck, History } from 'lucide-react';

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

export default function SettlementPage() {
  const router = useRouter();
  const toast = useToast();
  const { activeAccount } = useAccount();
  const { loading, error, fetchDeliveryOrders, fetchExistingSettlement, closeSettlement, listSettlements } = useDeliverySettlements();

  const [date, setDate] = useState(todayISO());
  const [deliveryId, setDeliveryId] = useState<string | null>(null);
  const [items, setItems] = useState<SettlementItemData[]>([]);
  const [settled, setSettled] = useState(false);
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState<DeliverySettlement[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [drivers, setDrivers] = useState<{ id: string; driver_id: string; driver_name: string }[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  // Load available drivers/deliveries for the date
  useEffect(() => {
    async function loadDrivers() {
      if (!activeAccount) return;
      setLoadingOrders(true);
      setDrivers([]);
      setSelectedDriverId(null);
      setItems([]);
      setDeliveryId(null);
      setSettled(false);

      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      const { data: dayDeliveries } = await supabase
        .from('deliveries')
        .select('id, driver_id, users!inner(raw_user_meta_data)')
        .eq('account_id', activeAccount.id)
        .eq('delivery_date', date);

      if (!dayDeliveries || dayDeliveries.length === 0) {
        setLoadingOrders(false);
        return;
      }

      const driverList = dayDeliveries.map((d: Record<string, unknown>) => {
        const user = d.users as Record<string, unknown> | null;
        const meta = user?.raw_user_meta_data as Record<string, unknown> | null;
        return {
          id: d.id as string,
          driver_id: d.driver_id as string,
          driver_name: (meta?.name as string) ?? (meta?.full_name as string) ?? 'Entregador',
        };
      });

      setDrivers(driverList);
      // Auto-select first if only one
      if (driverList.length === 1) {
        setSelectedDriverId(driverList[0].driver_id);
      } else {
        setLoadingOrders(false);
      }
    }
    loadDrivers();
  }, [activeAccount, date]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load orders for selected driver
  useEffect(() => {
    async function load() {
      if (!activeAccount || !selectedDriverId) return;
      setLoadingOrders(true);
      setSettled(false);
      setItems([]);
      setDeliveryId(null);

      const result = await fetchDeliveryOrders(selectedDriverId, date, activeAccount.id);
      if (result) {
        setDeliveryId(result.deliveryId);

        // Check if settlement already exists
        const existing = await fetchExistingSettlement(result.deliveryId);
        if (existing) {
          setSettled(true);
          setItems(existing.items.map((si) => {
            const order = result.orders.find((o) => o.order_id === si.order_id);
            return {
              order_id: si.order_id,
              order_number: order?.order_number ?? 0,
              client_name: order?.client_name ?? '',
              payment_method: si.payment_method,
              expected_amount: Number(si.expected_amount),
              received_amount: si.received_amount !== null ? Number(si.received_amount) : null,
              voucher_returned: si.voucher_returned,
              boleto_returned: si.boleto_returned,
              check_number: si.check_number,
              check_amount: si.check_amount !== null ? Number(si.check_amount) : null,
            };
          }));
        } else {
          setItems(result.orders.map((o) => ({
            order_id: o.order_id,
            order_number: o.order_number,
            client_name: o.client_name,
            payment_method: o.payment_method,
            expected_amount: o.total,
            received_amount: null,
            voucher_returned: false,
            boleto_returned: false,
            check_number: null,
            check_amount: null,
          })));
        }
      }
      setLoadingOrders(false);
    }
    load();
  }, [activeAccount, selectedDriverId, date]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load history
  useEffect(() => {
    async function loadHistory() {
      if (!activeAccount || !showHistory) return;
      const settlements = await listSettlements({ accountId: activeAccount.id, dateFrom: date, dateTo: date });
      setHistory(settlements);
    }
    loadHistory();
  }, [activeAccount, showHistory, date]); // eslint-disable-line react-hooks/exhaustive-deps

  function updateItem(index: number, updated: SettlementItemData) {
    setItems(items.map((it, i) => (i === index ? updated : it)));
  }

  // Totals
  const cashItems = items.filter((i) => (i.payment_method ?? '').toLowerCase() === 'dinheiro');
  const cashExpected = cashItems.reduce((s, i) => s + i.expected_amount, 0);
  const cashReceived = cashItems.reduce((s, i) => s + (Number(i.received_amount) || 0), 0);
  const valeItems = items.filter((i) => (i.payment_method ?? '').toLowerCase() === 'vale');
  const valesExpected = valeItems.length;
  const valesReturned = valeItems.filter((i) => i.voucher_returned).length;

  async function handleClose() {
    if (!activeAccount || !deliveryId) return;
    setSaving(true);
    try {
      await closeSettlement({
        accountId: activeAccount.id,
        deliveryId,
        items: items.map((i) => ({
          order_id: i.order_id,
          payment_method: i.payment_method,
          expected_amount: i.expected_amount,
          received_amount: i.received_amount,
          voucher_returned: i.voucher_returned,
          boleto_returned: i.boleto_returned,
          check_number: i.check_number,
          check_amount: i.check_amount,
        })),
        notes: '',
      });
      setSettled(true);
      toast('Acerto fechado com sucesso!', 'success');
    } catch {
      toast('Erro ao fechar acerto', 'danger');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <PageHeader title="Acerto do Dia" onBack={() => router.back()} />

      {/* Date + driver selector */}
      <Card>
        <CardContent className="py-3 space-y-2">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Data:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History className="mr-1 size-3.5" />
              {showHistory ? 'Voltar' : 'Historico'}
            </Button>
          </div>
          {drivers.length > 1 && (
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">Entregador:</label>
              <select
                value={selectedDriverId ?? ''}
                onChange={(e) => setSelectedDriverId(e.target.value || null)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm flex-1"
              >
                <option value="">Selecione...</option>
                {drivers.map((d) => (
                  <option key={d.driver_id} value={d.driver_id}>{d.driver_name}</option>
                ))}
              </select>
            </div>
          )}
        </CardContent>
      </Card>

      {showHistory ? (
        <Card>
          <CardHeader><CardTitle className="text-base">Historico de Acertos</CardTitle></CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum acerto registrado.</p>
            ) : (
              <div className="space-y-1">
                {history.map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                    <div>
                      <div className="font-medium">
                        {new Date(s.settled_at ?? s.created_at).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Dinheiro: <Money value={s.cash_received} /> / <Money value={s.cash_expected} />
                        {' · '}Vales: {s.vouchers_returned}/{s.vouchers_expected}
                      </div>
                    </div>
                    {s.has_discrepancy && (
                      <span className="text-xs text-destructive font-medium">Divergencia</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : loadingOrders ? (
        <div className="space-y-2">
          <Skeleton variant="rect" className="h-12" />
          <Skeleton variant="rect" className="h-24" />
          <Skeleton variant="rect" className="h-24" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={ClipboardCheck}
          title="Nenhuma entrega encontrada"
          description={`Nao ha entregas para ${new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')}.`}
        />
      ) : (
        <>
          {/* Totals */}
          <Card>
            <CardContent className="py-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dinheiro esperado</span>
                <Money value={cashExpected} className="font-medium" />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Dinheiro recebido</span>
                <Money value={cashReceived} className={cashReceived < cashExpected ? 'text-destructive font-medium' : 'text-emerald-600 font-medium'} />
              </div>
              {valesExpected > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vales devolvidos</span>
                  <span className={valesReturned < valesExpected ? 'text-destructive font-medium' : 'text-emerald-600 font-medium'}>
                    {valesReturned} / {valesExpected}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Items */}
          <div className="space-y-2">
            {items.map((item, i) => (
              <SettlementItemCard
                key={item.order_id}
                item={item}
                onChange={(updated) => updateItem(i, updated)}
                disabled={settled}
              />
            ))}
          </div>

          {/* Close button */}
          {!settled ? (
            <Button onClick={handleClose} disabled={saving} className="w-full">
              <ClipboardCheck className="mr-2 size-4" />
              {saving ? 'Fechando...' : 'Fechar Acerto'}
            </Button>
          ) : (
            <Card>
              <CardContent className="py-3 text-center text-sm text-emerald-600 font-medium">
                Acerto fechado com sucesso
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
