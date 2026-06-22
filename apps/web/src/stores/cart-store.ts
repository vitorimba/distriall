import { create } from 'zustand';

export interface CartClient {
  id: string;
  name: string;
  default_payment_method: string | null;
}

export interface CartItem {
  variantId: string;
  productName: string;
  variantName: string;
  quantity: number;
  unitPrice: number;
  costPrice: number;
  originalPrice?: number;
}

interface CartStore {
  client: CartClient | null;
  items: CartItem[];
  priceMap: Map<string, number>;
  paymentMethod: string;
  notes: string;
  deliveryDate: string;

  // Actions
  setClient: (client: CartClient | null) => void;
  setPriceMap: (priceMap: Map<string, number>) => void;
  addItem: (item: Omit<CartItem, 'unitPrice'> & { defaultPrice: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  updatePrice: (variantId: string, price: number) => void;
  setPaymentMethod: (method: string) => void;
  setNotes: (notes: string) => void;
  setDeliveryDate: (date: string) => void;
  clearCart: () => void;
  loadOrder: (client: CartClient, items: CartItem[], paymentMethod: string, notes: string, deliveryDate: string) => void;

  // Computed
  getSubtotal: () => number;
  getTotalCost: () => number;
  getProfit: () => number;
}

export const useCartStore = create<CartStore>()((set, get) => ({
  client: null,
  items: [],
  priceMap: new Map(),
  paymentMethod: '',
  notes: '',
  deliveryDate: '',

  setClient: (client) =>
    set({
      client,
      paymentMethod: client?.default_payment_method ?? '',
    }),

  setPriceMap: (priceMap) => {
    set({ priceMap });
    // Re-price existing items
    set((state) => ({
      items: state.items.map((item) => ({
        ...item,
        unitPrice: priceMap.get(item.variantId) ?? item.unitPrice,
      })),
    }));
  },

  addItem: ({ variantId, productName, variantName, quantity, costPrice, defaultPrice }) => {
    const { items, priceMap } = get();
    const existing = items.find((i) => i.variantId === variantId);
    const unitPrice = priceMap.get(variantId) ?? defaultPrice;

    if (existing) {
      set({
        items: items.map((i) =>
          i.variantId === variantId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        ),
      });
    } else {
      set({
        items: [...items, { variantId, productName, variantName, quantity, unitPrice, costPrice }],
      });
    }
  },

  removeItem: (variantId) =>
    set((state) => ({ items: state.items.filter((i) => i.variantId !== variantId) })),

  updateQuantity: (variantId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(variantId);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.variantId === variantId ? { ...i, quantity } : i
      ),
    }));
  },

  updatePrice: (variantId, price) => {
    if (price < 0.01) return;
    set((state) => ({
      items: state.items.map((i) =>
        i.variantId === variantId
          ? { ...i, unitPrice: price, originalPrice: i.originalPrice ?? i.unitPrice }
          : i
      ),
    }));
  },

  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setNotes: (notes) => set({ notes }),
  setDeliveryDate: (deliveryDate) => set({ deliveryDate }),

  clearCart: () =>
    set({
      client: null,
      items: [],
      priceMap: new Map(),
      paymentMethod: '',
      notes: '',
      deliveryDate: '',
    }),

  loadOrder: (client, items, paymentMethod, notes, deliveryDate) =>
    set({ client, items, paymentMethod, notes, deliveryDate }),

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((sum, i) => sum + Math.round(i.quantity * i.unitPrice * 100) / 100, 0);
  },

  getTotalCost: () => {
    const { items } = get();
    return items.reduce((sum, i) => sum + Math.round(i.quantity * i.costPrice * 100) / 100, 0);
  },

  getProfit: () => get().getSubtotal() - get().getTotalCost(),
}));
