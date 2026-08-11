'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { ClientAddress } from '@/lib/address-utils';
import { formatAddress, getDefaultDeliveryAddress, getEffectiveFiscalAddress } from '@/lib/address-utils';
import { maskCEP } from '@/lib/mask-utils';
import { useCartStore } from '@/stores/cart-store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';

interface AddressSelectorProps {
  clientId: string;
}

export function AddressSelector({ clientId }: AddressSelectorProps) {
  const [addresses, setAddresses] = useState<ClientAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const { deliveryAddressId, setDeliveryAddressId } = useCartStore();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from('client_addresses')
        .select('*')
        .eq('client_id', clientId)
        .eq('is_active', true)
        .order('is_default_delivery', { ascending: false })
        .order('created_at');

      const addrs = (data as ClientAddress[]) ?? [];
      setAddresses(addrs);
      setLoading(false);

      // Pre-select default delivery address
      if (!deliveryAddressId && addrs.length > 0) {
        const defaultAddr = getDefaultDeliveryAddress(addrs);
        if (defaultAddr) setDeliveryAddressId(defaultAddr.id);
      }
    }
    load();
  }, [clientId, deliveryAddressId, setDeliveryAddressId]);

  if (loading) return <Skeleton variant="rect" className="h-16" />;
  if (addresses.length === 0) return null;

  const fiscalAddr = getEffectiveFiscalAddress(addresses);

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
        <MapPin className="h-3 w-3" /> Endereço de entrega
      </p>

      {addresses.map((addr) => (
        <Card
          key={addr.id}
          className={`cursor-pointer transition-colors ${
            deliveryAddressId === addr.id
              ? 'border-primary bg-primary/5'
              : 'hover:border-muted-foreground/30'
          }`}
          onClick={() => setDeliveryAddressId(addr.id)}
        >
          <CardContent className="py-2 px-3">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">{addr.label}</span>
                  {addr.is_default_delivery && <Badge variant="default" className="text-[10px] px-1 py-0">Padrão</Badge>}
                  {addr.is_fiscal && <Badge variant="secondary" className="text-[10px] px-1 py-0">Fiscal</Badge>}
                </div>
                <p className="text-xs text-muted-foreground truncate">{formatAddress(addr)}</p>
                {addr.cep && <p className="text-[10px] text-muted-foreground">CEP: {maskCEP(addr.cep)}</p>}
              </div>
              {deliveryAddressId === addr.id && (
                <div className="h-3 w-3 rounded-full bg-primary shrink-0" />
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {fiscalAddr && fiscalAddr.id !== deliveryAddressId && (
        <p className="text-[10px] text-muted-foreground">
          NF-e: {fiscalAddr.label} ({formatAddress(fiscalAddr)})
        </p>
      )}
    </div>
  );
}
