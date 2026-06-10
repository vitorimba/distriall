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
