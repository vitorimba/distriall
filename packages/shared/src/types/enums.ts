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

export const PaymentMethod = {
  DINHEIRO: 'dinheiro',
  PIX: 'pix',
  BOLETO: 'boleto',
  VALE: 'vale',
  CARTAO: 'cartao',
  MISTO: 'misto',
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
