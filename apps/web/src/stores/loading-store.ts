import { create } from 'zustand';
import type { OrderWithItems } from '@distriall/shared';
import {
  consolidateProducts,
  calculateLoadingSummary,
  type ConsolidatedProduct,
  type LoadingSummary,
} from '@/lib/utils/loading-consolidation';

interface LoadingStore {
  orders: OrderWithItems[];
  selectedIds: Set<string>;
  consolidatedProducts: ConsolidatedProduct[];
  summary: LoadingSummary | null;

  setOrders: (orders: OrderWithItems[]) => void;
  toggleOrder: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  selectByAccount: (accountId: string) => void;
}

function recalculate(orders: OrderWithItems[], selectedIds: Set<string>) {
  const selected = orders.filter((o) => selectedIds.has(o.id));
  return {
    consolidatedProducts: consolidateProducts(selected),
    summary: selected.length > 0 ? calculateLoadingSummary(selected) : null,
  };
}

export const useLoadingStore = create<LoadingStore>()((set, get) => ({
  orders: [],
  selectedIds: new Set(),
  consolidatedProducts: [],
  summary: null,

  setOrders: (orders) => set({ orders }),

  toggleOrder: (id) => {
    const { selectedIds, orders } = get();
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    set({ selectedIds: next, ...recalculate(orders, next) });
  },

  selectAll: () => {
    const { orders } = get();
    const allIds = new Set(orders.map((o) => o.id));
    set({ selectedIds: allIds, ...recalculate(orders, allIds) });
  },

  deselectAll: () =>
    set({ selectedIds: new Set(), consolidatedProducts: [], summary: null }),

  selectByAccount: (accountId) => {
    const { orders } = get();
    const ids = new Set(orders.filter((o) => o.account_id === accountId).map((o) => o.id));
    set({ selectedIds: ids, ...recalculate(orders, ids) });
  },
}));
