/** Surface card — the basic container of every screen. */
export interface CardProps {
  /** Header title (left) */
  title?: string;
  /** Header action slot (right) — buttons, selects */
  action?: React.ReactNode;
  /** Default true; false removes body padding (for tables/lists) */
  padded?: boolean;
  children?: React.ReactNode;
  className?: string;
}
