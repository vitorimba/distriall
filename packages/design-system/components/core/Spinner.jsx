import React from 'react';

/* Spinner de carregamento indeterminado. */
export function Spinner({ size = 18, className }) {
  return (
    <span
      className={['da-spinner', className || ''].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-label="Carregando"
    ></span>
  );
}
