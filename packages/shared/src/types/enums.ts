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

export const VoucherStatus = {
  PENDENTE: 'pendente',
  PAGO: 'pago',
  VENCIDO: 'vencido',
  CANCELADO: 'cancelado',
} as const;
export type VoucherStatus = (typeof VoucherStatus)[keyof typeof VoucherStatus];

export const VOUCHER_STATUS_LABELS: Record<VoucherStatus, string> = {
  pendente: 'Pendente',
  pago: 'Pago',
  vencido: 'Vencido',
  cancelado: 'Cancelado',
};

export const VOUCHER_STATUS_COLORS: Record<VoucherStatus, { bg: string; text: string; border: string }> = {
  pendente:  { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  pago:      { bg: 'bg-green-100',  text: 'text-green-800',  border: 'border-green-300' },
  vencido:   { bg: 'bg-red-100',    text: 'text-red-800',    border: 'border-red-300' },
  cancelado: { bg: 'bg-gray-100',   text: 'text-gray-700',   border: 'border-gray-300' },
};

export const ExpenseCategory = {
  FIXO: 'fixo',
  VARIAVEL: 'variavel',
} as const;
export type ExpenseCategory = (typeof ExpenseCategory)[keyof typeof ExpenseCategory];

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  fixo: 'Fixo',
  variavel: 'Variavel',
};

export const ExpenseType = {
  IMPOSTOS: 'impostos',
  GASOLINA: 'gasolina',
  MANUTENCAO: 'manutencao',
  OUTROS: 'outros',
} as const;
export type ExpenseType = (typeof ExpenseType)[keyof typeof ExpenseType];

export const EXPENSE_TYPE_LABELS: Record<ExpenseType, string> = {
  impostos: 'Impostos',
  gasolina: 'Gasolina',
  manutencao: 'Manutencao',
  outros: 'Outros',
};

export const ExpenseRecurrence = {
  UNICO: 'unico',
  SEMANAL: 'semanal',
  MENSAL: 'mensal',
} as const;
export type ExpenseRecurrence = (typeof ExpenseRecurrence)[keyof typeof ExpenseRecurrence];

export const EXPENSE_RECURRENCE_LABELS: Record<ExpenseRecurrence, string> = {
  unico: 'Unico',
  semanal: 'Semanal',
  mensal: 'Mensal',
};

export const SettlementStatus = {
  RASCUNHO: 'rascunho',
  CONFERIDO: 'conferido',
  FECHADO: 'fechado',
} as const;
export type SettlementStatus = (typeof SettlementStatus)[keyof typeof SettlementStatus];

export const SETTLEMENT_STATUS_LABELS: Record<SettlementStatus, string> = {
  rascunho: 'Rascunho',
  conferido: 'Conferido',
  fechado: 'Fechado',
};

export const SETTLEMENT_STATUS_COLORS: Record<SettlementStatus, { bg: string; text: string; border: string }> = {
  rascunho:  { bg: 'bg-gray-100',   text: 'text-gray-700',   border: 'border-gray-300' },
  conferido: { bg: 'bg-blue-100',   text: 'text-blue-800',   border: 'border-blue-300' },
  fechado:   { bg: 'bg-green-100',  text: 'text-green-800',  border: 'border-green-300' },
};
