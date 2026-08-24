'use client';

import { PAYMENT_METHOD_LABELS } from '@distriall/shared';
import type { RouteItem } from '@/hooks/use-deliveries';

interface RoutePrintViewProps {
  items: RouteItem[];
  driverName: string;
  date: string;
}

export function RoutePrintView({ items, driverName, date }: RoutePrintViewProps) {
  const [year, month, day] = date.split('-');
  const dateLabel = `${day}/${month}/${year}`;

  return (
    <div className="route-print-view hidden print:block print:p-4">
      <div className="mb-4 border-b pb-2">
        <h1 className="text-lg font-bold">Rota de Entregas</h1>
        <p className="text-sm">
          Data: {dateLabel} &nbsp;|&nbsp; Entregador: {driverName} &nbsp;|&nbsp; {items.length} parada{items.length !== 1 ? 's' : ''}
        </p>
      </div>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="py-1 text-left w-8">#</th>
            <th className="py-1 text-left">Cliente</th>
            <th className="py-1 text-left">Endereco</th>
            <th className="py-1 text-left w-24">Pagamento</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const address = [item.client.address, item.client.neighborhood, item.client.city]
              .filter(Boolean)
              .join(', ');
            const paymentLabel = item.payment_method
              ? (PAYMENT_METHOD_LABELS[item.payment_method] ?? item.payment_method)
              : '';

            return (
              <tr key={item.delivery_item_id ?? item.id} className="border-b border-gray-300">
                <td className="py-1.5 font-bold">{item.sequence}</td>
                <td className="py-1.5">{item.client_name}</td>
                <td className="py-1.5 text-xs">{address}</td>
                <td className="py-1.5">{paymentLabel}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
