import React from 'react';

/* Tooltip por hover/foco. Envolva o alvo; todo IconButton deve ter um. */
export function Tooltip({ label, position = 'top', children }) {
  return (
    <span className="da-tooltip-wrap">
      {children}
      <span className={position === 'bottom' ? 'da-tooltip da-tooltip--bottom' : 'da-tooltip'} role="tooltip">
        {label}
      </span>
    </span>
  );
}
