/** Fixed 240px desktop sidebar with logo + nav. Exports NAV_ITEMS default model and Wordmark. */
export interface SidebarProps {
  /** Defaults to the 9-item DistriAll nav (NAV_ITEMS) */
  items?: Array<{ id: string; label: string; icon: string; count?: number }>;
  /** Active item id */
  active?: string;
  onNavigate?: (id: string) => void;
  /** Optional image logo; defaults to the DISTRI/ALL text wordmark */
  logoSrc?: string;
  /** Bottom slot (account switcher, user) */
  footer?: React.ReactNode;
}
