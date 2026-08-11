'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAccount } from '@/providers/account-provider';
import { useToast } from '@/components/ui/toast';
import type { ClientAddress } from '@/lib/address-utils';
import { formatAddress } from '@/lib/address-utils';
import { maskCEP } from '@/lib/mask-utils';
import { AddressForm } from './address-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { MapPin, Plus, RotateCcw } from 'lucide-react';

interface ClientAddressesProps {
  clientId: string;
}

export function ClientAddresses({ clientId }: ClientAddressesProps) {
  const { activeAccount } = useAccount();
  const toast = useToast();
  const [addresses, setAddresses] = useState<ClientAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showInactive, setShowInactive] = useState(false);

  const load = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('client_addresses')
      .select('*')
      .eq('client_id', clientId)
      .order('is_default_delivery', { ascending: false })
      .order('is_fiscal', { ascending: false })
      .order('created_at');
    setAddresses((data as ClientAddress[]) ?? []);
    setLoading(false);
  }, [clientId]);

  useEffect(() => {
    let cancelled = false;
    const t = setTimeout(() => { if (!cancelled) load(); }, 0);
    return () => { cancelled = true; clearTimeout(t); };
  }, [load]);

  const activeAddresses = addresses.filter((a) => a.is_active);
  const inactiveAddresses = addresses.filter((a) => !a.is_active);

  async function clearFlag(field: 'is_fiscal' | 'is_default_delivery') {
    const supabase = createClient();
    await supabase
      .from('client_addresses')
      .update({ [field]: false })
      .eq('client_id', clientId)
      .eq('is_active', true)
      .eq(field, true);
  }

  async function handleSave(data: {
    label: string; cep: string; street: string; number: string;
    complement: string; neighborhood: string; city: string; state: string;
    is_fiscal: boolean; is_default_delivery: boolean;
  }) {
    if (!activeAccount) return;
    setSaving(true);
    const supabase = createClient();

    // Clear exclusive flags before setting new ones
    if (data.is_fiscal) await clearFlag('is_fiscal');
    if (data.is_default_delivery) await clearFlag('is_default_delivery');

    if (editingId) {
      await supabase.from('client_addresses').update(data).eq('id', editingId);
    } else {
      await supabase.from('client_addresses').insert({
        ...data,
        client_id: clientId,
        account_id: activeAccount.id,
      });
    }

    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    toast('Endereço salvo', 'success');
    load();
  }

  async function handleToggleActive(addr: ClientAddress) {
    const supabase = createClient();
    const newActive = !addr.is_active;

    // If reactivating with fiscal/delivery flags, clear existing ones first
    if (newActive && addr.is_fiscal) await clearFlag('is_fiscal');
    if (newActive && addr.is_default_delivery) await clearFlag('is_default_delivery');

    await supabase
      .from('client_addresses')
      .update({ is_active: newActive })
      .eq('id', addr.id);

    toast(newActive ? 'Endereço reativado' : 'Endereço desativado', 'success');
    load();
  }

  if (loading) {
    return <div className="space-y-2">{[1, 2].map((i) => <Skeleton key={i} variant="rect" className="h-20" />)}</div>;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Endereços</h3>
        {!showForm && (
          <Button type="button" size="sm" variant="outline" onClick={() => { setShowForm(true); setEditingId(null); }}>
            <Plus className="mr-1 h-3.5 w-3.5" /> Adicionar
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-4">
            <AddressForm
              initial={editingId ? (() => {
                const a = addresses.find((a) => a.id === editingId);
                return a ? { ...a, cep: a.cep ?? '', street: a.street ?? '', number: a.number ?? '', complement: a.complement ?? '', neighborhood: a.neighborhood ?? '', city: a.city ?? '', state: a.state ?? '' } : undefined;
              })() : undefined}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditingId(null); }}
              saving={saving}
            />
          </CardContent>
        </Card>
      )}

      {activeAddresses.length === 0 && !showForm && (
        <EmptyState icon={MapPin} title="Nenhum endereço cadastrado" />
      )}

      {activeAddresses.map((addr) => (
        <Card key={addr.id} className="relative">
          <CardContent className="py-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{addr.label}</span>
                  {addr.is_fiscal && <Badge variant="secondary" className="text-xs">Fiscal</Badge>}
                  {addr.is_default_delivery && <Badge variant="default" className="text-xs">Entrega</Badge>}
                </div>
                <p className="text-sm text-muted-foreground truncate">{formatAddress(addr)}</p>
                {addr.cep && <p className="text-xs text-muted-foreground">CEP: {maskCEP(addr.cep)}</p>}
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs"
                  onClick={() => { setEditingId(addr.id); setShowForm(true); }}
                >
                  Editar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-destructive"
                  onClick={() => handleToggleActive(addr)}
                >
                  Desativar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {inactiveAddresses.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setShowInactive(!showInactive)}
            className="text-xs text-muted-foreground underline"
          >
            {showInactive ? 'Ocultar' : 'Mostrar'} {inactiveAddresses.length} endereço(s) inativo(s)
          </button>
          {showInactive && (
            <div className="mt-2 space-y-2 opacity-60">
              {inactiveAddresses.map((addr) => (
                <Card key={addr.id}>
                  <CardContent className="py-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm">{addr.label}</span>
                        <span className="ml-2 text-xs text-muted-foreground">(inativo)</span>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs"
                        onClick={() => handleToggleActive(addr)}
                      >
                        <RotateCcw className="mr-1 h-3 w-3" /> Reativar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
