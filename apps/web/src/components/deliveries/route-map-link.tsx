'use client';

import { Map } from 'lucide-react';
import type { RouteItem } from '@/hooks/use-deliveries';
import { buildGoogleMapsUrl } from '@/lib/delivery-utils';

interface RouteMapLinkProps {
  items: RouteItem[];
}

export function RouteMapLink({ items }: RouteMapLinkProps) {
  const addresses = items
    .sort((a, b) => a.sequence - b.sequence)
    .map((item) => {
      const { client } = item;
      return [client.address, client.neighborhood, client.city].filter(Boolean).join(', ');
    })
    .filter(Boolean);

  if (addresses.length === 0) return null;

  const mapsUrl = buildGoogleMapsUrl(addresses);

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 py-3 text-sm font-medium text-blue-700 hover:bg-blue-100"
    >
      <Map className="size-4" />
      Abrir no Maps
    </a>
  );
}
