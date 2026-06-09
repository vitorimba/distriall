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

export interface AccountUser {
  id: string;
  account_id: string;
  user_id: string;
  role: 'admin' | 'vendedor' | 'entregador' | 'visualizador';
  can_view_financial: boolean;
  is_active: boolean;
  created_at: string;
}
