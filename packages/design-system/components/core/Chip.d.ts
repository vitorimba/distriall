/** Filter chip (status filters above lists). Toggleable. */
export interface ChipProps {
  /** Filled accent state when active */
  selected?: boolean;
  /** Optional trailing count bubble */
  count?: number;
  /** Optional Lucide icon */
  icon?: string;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  className?: string;
}
