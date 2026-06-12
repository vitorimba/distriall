/** Loading placeholder with shimmer. */
export interface SkeletonProps {
  /** "line" (text), "block" (card/chart area), "circle" (avatar). Default "line" */
  variant?: 'line' | 'block' | 'circle';
  /** CSS width (e.g. "60%", 120) */
  width?: string | number;
  /** CSS height */
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}
