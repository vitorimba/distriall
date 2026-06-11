'use client';

import { useState } from 'react';
import { formatBRL } from '@distriall/shared';
import type { ProductRanking } from '@distriall/shared';

interface ProductRankingTableProps {
  data: ProductRanking[];
}

type Tab = 'value' | 'quantity';

export function ProductRankingTable({ data }: ProductRankingTableProps) {
  const [activeTab, setActiveTab] = useState<Tab>('value');

  const sorted =
    activeTab === 'value'
      ? [...data].sort((a, b) => b.total_value - a.total_value)
      : [...data].sort((a, b) => b.total_quantity - a.total_quantity);

  return (
    <div>
      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setActiveTab('value')}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            activeTab === 'value'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          Por Valor
        </button>
        <button
          onClick={() => setActiveTab('quantity')}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            activeTab === 'quantity'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          Por Quantidade
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="pb-2 pr-4 font-medium">#</th>
              <th className="pb-2 pr-4 font-medium">Produto</th>
              <th className="pb-2 pr-4 font-medium">Variante</th>
              <th className="pb-2 pr-4 text-right font-medium">Valor</th>
              <th className="pb-2 text-right font-medium">Qtd</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item, index) => (
              <tr key={`${item.product_name}-${item.variant_name}`} className="border-b last:border-0">
                <td className="py-2 pr-4 text-muted-foreground">{index + 1}</td>
                <td className="py-2 pr-4 font-medium">{item.product_name}</td>
                <td className="py-2 pr-4 text-muted-foreground">{item.variant_name}</td>
                <td className="py-2 pr-4 text-right">{formatBRL(item.total_value)}</td>
                <td className="py-2 text-right">{item.total_quantity}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-muted-foreground">
                  Nenhum produto encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
