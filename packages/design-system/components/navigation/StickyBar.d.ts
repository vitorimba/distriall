/** Sticky bottom summary bar for order forms (subtotal/custo/lucro + main action). */
export interface StickyBarProps {
  /** Label/value pairs; highlight colors the value orange */
  items: Array<{ label: string; value: React.ReactNode; highlight?: boolean }>;
  /** Primary action slot (usually one Button) */
  action?: React.ReactNode;
  className?: string;
}
