import React from 'react';

export function Money({ value, signed = false, className, style }) {
  const n = Number(value) || 0;
  const formatted = n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const tone = signed ? (n > 0 ? 'da-money--pos' : n < 0 ? 'da-money--neg' : '') : '';
  const text = signed && n > 0 ? '+' + formatted : formatted;
  return (
    <span className={['ds-money', 'da-money', tone, className || ''].filter(Boolean).join(' ')} style={style}>
      {text}
    </span>
  );
}
