/** Fixed mobile bottom navigation (5 items, <768px). */
export interface BottomNavProps {
  /** Defaults to Dashboard, Pedidos, Clientes, Financeiro, Mais */
  items?: Array<{ id: string; label: string; icon: string }>;
  active?: string;
  onNavigate?: (id: string) => void;
}
