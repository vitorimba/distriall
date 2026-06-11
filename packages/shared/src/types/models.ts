// Domain models - placeholders for Story 1.1
// Will be populated as database schema is implemented in subsequent stories

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'vendedor' | 'entregador';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Account {
  id: string;
  name: string;
  owner_id: string;
  slug: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  product_name: string;
  variant_name: string;
  quantity: number;
  unit_price: number;
  cost_price: number;
  total: number;
  total_cost: number;
  is_returned: boolean;
  returned_quantity: number;
}

export interface OrderWithItems {
  id: string;
  account_id: string;
  account_name: string;
  account_slug: string;
  client_name: string;
  order_number: number;
  status: string;
  payment_method: string | null;
  subtotal: number;
  total_cost: number;
  profit: number;
  total: number;
  created_at: string;
  delivery_date: string | null;
  items: OrderItem[];
}

export interface Payment {
  id: string;
  account_id: string;
  order_id: string;
  method: 'dinheiro' | 'pix' | 'boleto' | 'vale' | 'cartao';
  amount: number;
  status: 'pendente' | 'confirmado' | 'cancelado';
  is_third_party: boolean;
  notes: string | null;
  confirmed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Voucher {
  id: string;
  account_id: string;
  payment_id: string;
  client_id: string;
  amount: number;
  status: 'pendente' | 'pago' | 'vencido' | 'cancelado';
  photo_url: string | null;
  due_date: string | null;
  paid_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccountUser {
  id: string;
  account_id: string;
  user_id: string;
  role: 'admin' | 'vendedor' | 'entregador' | 'visualizador';
  can_view_financial: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Expense {
  id: string;
  account_id: string;
  description: string;
  amount: number;
  category: 'fixo' | 'variavel';
  type: 'impostos' | 'gasolina' | 'manutencao' | 'outros' | null;
  recurrence: 'unico' | 'semanal' | 'mensal' | null;
  is_shared: boolean;
  expense_date: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ExpenseSplit {
  id: string;
  expense_id: string;
  account_id: string;
  percentage: number;
  amount: number;
  created_at: string;
}

export interface Settlement {
  id: string;
  account_id: string;
  period_start: string;
  period_end: string;
  status: 'rascunho' | 'conferido' | 'fechado';

  total_revenue: number;
  revenue_dinheiro: number;
  revenue_pix: number;
  revenue_boleto: number;
  revenue_vale: number;
  revenue_cartao: number;

  total_cost: number;
  total_expenses: number;
  total_returns: number;

  gross_profit: number;
  net_profit: number;

  order_count: number;
  client_count: number;
  pending_vouchers_count: number;
  pending_vouchers_amount: number;

  notes: string | null;
  closed_by: string | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SettlementOrder {
  id: string;
  settlement_id: string;
  order_id: string;
  created_at: string;
}

export interface SettlementExpense {
  id: string;
  settlement_id: string;
  expense_id: string;
  amount: number;
  created_at: string;
}

export interface Delivery {
  id: string;
  account_id: string;
  driver_id: string;
  delivery_date: string;
  status: 'pendente' | 'em_rota' | 'concluida';
  notes: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeliveryItem {
  id: string;
  delivery_id: string;
  order_id: string;
  sequence: number;
  status: 'pendente' | 'entregue' | 'nao_entregue';
  observation: string | null;
  delivered_at: string | null;
  created_at: string;
}

export interface PaymentBreakdown {
  method: string;
  amount: number;
  percentage: number;
}

export interface ProductRanking {
  product_name: string;
  variant_name: string;
  total_value: number;
  total_quantity: number;
}

export interface WeeklyEvolution {
  week: string;
  revenue: number;
  profit: number;
}

export interface DashboardStats {
  revenue: number;
  cost: number;
  profit: number;
  order_count: number;
  client_count: number;
  avg_ticket: number;
  payment_breakdown: PaymentBreakdown[];
  product_ranking: ProductRanking[];
  weekly_evolution: WeeklyEvolution[];
}
