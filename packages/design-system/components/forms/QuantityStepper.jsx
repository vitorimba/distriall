import React from 'react';
import { Icon } from '../core/Icon';

/* Stepper de quantidade (− n +) com toque grande para uso em campo. */
export function QuantityStepper({ value = 1, min = 1, max = 9999, onChange, size = 'md', disabled = false }) {
  const set = (v) => {
    if (disabled) return;
    const n = Math.min(max, Math.max(min, v));
    if (onChange) onChange(n);
  };
  return (
    <span className={size === 'lg' ? 'da-qty da-qty--lg' : 'da-qty'}>
      <button type="button" className="da-qty__btn" disabled={disabled || value <= min} onClick={() => set(value - 1)} aria-label="Diminuir">
        <Icon name="minus" size={14} />
      </button>
      <input
        type="number"
        className="da-qty__input num"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(e) => set(Number(e.target.value) || min)}
      />
      <button type="button" className="da-qty__btn" disabled={disabled || value >= max} onClick={() => set(value + 1)} aria-label="Aumentar">
        <Icon name="plus" size={14} />
      </button>
    </span>
  );
}
