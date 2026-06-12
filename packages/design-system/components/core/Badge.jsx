import React from 'react';

const TONE_MAP = {
  // pedidos
  lancado: 'lancado',
  confirmado: 'confirmado',
  carregado: 'carregado',
  entregue: 'entregue',
  cancelado: 'cancelado',
  // vales / acertos
  pendente: 'pendente',
  pago: 'pago',
  vencido: 'vencido',
  rascunho: 'neutral',
  conferido: 'confirmado',
  fechado: 'entregue',
  // generic
  success: 'entregue',
  danger: 'cancelado',
  warning: 'pendente',
  info: 'lancado',
  accent: 'carregado',
  neutral: 'neutral',
};

const LABEL_MAP = {
  lancado: 'Lançado',
  confirmado: 'Confirmado',
  carregado: 'Carregado',
  entregue: 'Entregue',
  cancelado: 'Cancelado',
  pendente: 'Pendente',
  pago: 'Pago',
  vencido: 'Vencido',
  rascunho: 'Rascunho',
  conferido: 'Conferido',
  fechado: 'Fechado',
};

export function Badge({ tone = 'neutral', size = 'md', dot = true, children, className }) {
  const mapped = TONE_MAP[tone] || 'neutral';
  const cls = ['da-badge', `da-badge--${mapped}`, `da-badge--${size}`, className || '']
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls}>
      {dot ? <span className="da-badge__dot" aria-hidden="true"></span> : null}
      {children || LABEL_MAP[tone] || tone}
    </span>
  );
}
