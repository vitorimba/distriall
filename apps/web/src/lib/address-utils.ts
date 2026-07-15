export interface ClientAddress {
  id: string;
  client_id: string;
  account_id: string;
  label: string;
  cep: string | null;
  street: string | null;
  number: string | null;
  complement: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  is_fiscal: boolean;
  is_default_delivery: boolean;
  is_active: boolean;
}

export function getEffectiveFiscalAddress(addresses: ClientAddress[]): ClientAddress | null {
  const active = addresses.filter((a) => a.is_active);
  const fiscal = active.find((a) => a.is_fiscal);
  if (fiscal) return fiscal;
  return active[0] ?? null;
}

export function getDefaultDeliveryAddress(addresses: ClientAddress[]): ClientAddress | null {
  const active = addresses.filter((a) => a.is_active);
  const delivery = active.find((a) => a.is_default_delivery);
  if (delivery) return delivery;
  return active[0] ?? null;
}

export function formatAddress(addr: ClientAddress): string {
  const parts = [addr.street, addr.number, addr.complement, addr.neighborhood, addr.city, addr.state]
    .filter(Boolean);
  return parts.join(', ');
}

export function formatAddressShort(addr: ClientAddress): string {
  const parts = [addr.neighborhood, addr.city].filter(Boolean);
  return parts.join(', ');
}
