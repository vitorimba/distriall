import type { OrderWithItems } from '@distriall/shared';

export interface ConsolidatedProduct {
  productName: string;
  variantName: string;
  totalQuantity: number;
}

export interface LoadingSummary {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  orderCount: number;
  accountCount: number;
  accountBreakdown: { accountName: string; slug: string; revenue: number; orderCount: number }[];
}

export function consolidateProducts(orders: OrderWithItems[]): ConsolidatedProduct[] {
  const map = new Map<string, ConsolidatedProduct>();

  for (const order of orders) {
    for (const item of order.items) {
      if (item.is_returned) continue;
      const key = `${item.product_name}|${item.variant_name}`;
      const qty = Number(item.quantity) - Number(item.returned_quantity || 0);
      if (qty <= 0) continue;

      const existing = map.get(key);
      if (existing) {
        existing.totalQuantity += qty;
      } else {
        map.set(key, {
          productName: item.product_name,
          variantName: item.variant_name,
          totalQuantity: qty,
        });
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => b.totalQuantity - a.totalQuantity);
}

export function calculateLoadingSummary(orders: OrderWithItems[]): LoadingSummary {
  const accountMap = new Map<string, { name: string; slug: string; revenue: number; count: number }>();

  let totalRevenue = 0;
  let totalCost = 0;

  for (const order of orders) {
    totalRevenue += Number(order.total);
    totalCost += Number(order.total_cost);

    const existing = accountMap.get(order.account_id);
    if (existing) {
      existing.revenue += Number(order.total);
      existing.count++;
    } else {
      accountMap.set(order.account_id, {
        name: order.account_name,
        slug: order.account_slug,
        revenue: Number(order.total),
        count: 1,
      });
    }
  }

  return {
    totalRevenue,
    totalCost,
    totalProfit: totalRevenue - totalCost,
    orderCount: orders.length,
    accountCount: accountMap.size,
    accountBreakdown: Array.from(accountMap.values()).map((a) => ({
      accountName: a.name,
      slug: a.slug,
      revenue: a.revenue,
      orderCount: a.count,
    })),
  };
}
