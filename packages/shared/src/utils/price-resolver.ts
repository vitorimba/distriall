/**
 * Resolve effective price for a product variant given optional client custom pricing.
 * Used by order creation (Story 2.1) and client price editor (Story 1.5).
 */
export function resolveEffectivePrice(
  variantSellPrice: number,
  clientCustomPrice: number | null | undefined
): number {
  return clientCustomPrice ?? variantSellPrice;
}

export interface VariantWithEffectivePrice {
  variantId: string;
  productName: string;
  variantName: string;
  defaultPrice: number;
  customPrice: number | null;
  effectivePrice: number;
  costPrice: number;
}

/**
 * Map raw query results (product_variants LEFT JOIN client_prices)
 * into a list with effective prices resolved.
 */
export function mapVariantsWithPrices(
  rows: {
    variant_id: string;
    product_name: string;
    variant_name: string;
    default_price: number;
    custom_price: number | null;
    cost_price: number;
  }[]
): VariantWithEffectivePrice[] {
  return rows.map((r) => ({
    variantId: r.variant_id,
    productName: r.product_name,
    variantName: r.variant_name,
    defaultPrice: r.default_price,
    customPrice: r.custom_price,
    effectivePrice: resolveEffectivePrice(r.default_price, r.custom_price),
    costPrice: r.cost_price,
  }));
}
