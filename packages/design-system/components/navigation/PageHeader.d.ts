/** Page title row: back button, title/subtitle, action slot. */
export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Renders a back arrow */
  onBack?: () => void;
  /** Right slot — buttons, selects, badges */
  actions?: React.ReactNode;
  /** Extra inline content after the title (e.g. a Badge) */
  children?: React.ReactNode;
  className?: string;
}
