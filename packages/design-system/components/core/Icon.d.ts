/** Lucide icon by kebab-case name (e.g. "truck", "shopping-cart"). Requires lucide UMD on the page. */
export interface IconProps {
  /** Lucide icon name, kebab-case (e.g. "package", "chevron-right") */
  name: string;
  /** Pixel size. Default 18 */
  size?: number;
  /** Stroke width. Default 2 */
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}
