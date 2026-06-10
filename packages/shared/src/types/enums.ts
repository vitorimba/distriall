export const UserRole = {
  ADMIN: 'admin',
  VENDEDOR: 'vendedor',
  ENTREGADOR: 'entregador',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const AccountUserRole = {
  ADMIN: 'admin',
  VENDEDOR: 'vendedor',
  ENTREGADOR: 'entregador',
  VISUALIZADOR: 'visualizador',
} as const;
export type AccountUserRole =
  (typeof AccountUserRole)[keyof typeof AccountUserRole];

export const OrderStatus = {
  LANCADO: 'lancado',
  CONFIRMADO: 'confirmado',
  CARREGADO: 'carregado',
  ENTREGUE: 'entregue',
  CANCELADO: 'cancelado',
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  lancado: 'Lancado',
  confirmado: 'Confirmado',
  carregado: 'Carregado',
  entregue: 'Entregue',
  cancelado: 'Cancelado',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, { bg: string; text: string; border: string }> = {
  lancado:    { bg: 'bg-gray-100',   text: 'text-gray-700',   border: 'border-gray-300' },
  confirmado: { bg: 'bg-blue-100',   text: 'text-blue-800',   border: 'border-blue-300' },
  carregado:  { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  entregue:   { bg: 'bg-green-100',  text: 'text-green-800',  border: 'border-green-300' },
  cancelado:  { bg: 'bg-red-100',    text: 'text-red-800',    border: 'border-red-300' },
};

export const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  lancado:    ['confirmado', 'cancelado'],
  confirmado: ['lancado', 'carregado', 'cancelado'],
  carregado:  ['confirmado', 'entregue', 'cancelado'],
  entregue:   ['carregado'],
  cancelado:  [],
};

export const PaymentMethod = {
  DINHEIRO: 'dinheiro',
  PIX: 'pix',
  BOLETO: 'boleto',
  VALE: 'vale',
  CARTAO: 'cartao',
  MISTO: 'misto',
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
