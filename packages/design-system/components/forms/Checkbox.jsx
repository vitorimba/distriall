import React from 'react';
import { Icon } from '../core/Icon';

export function Checkbox({ label, checked, disabled = false, className, ...rest }) {
  return (
    <label className={['da-check', disabled ? 'da-check--disabled' : '', className || ''].filter(Boolean).join(' ')}>
      <input type="checkbox" className="da-check__input" checked={checked} disabled={disabled} {...rest} />
      <span className="da-check__box" aria-hidden="true">
        <Icon name="check" size={12} strokeWidth={3} />
      </span>
      {label ? <span className="da-check__label">{label}</span> : null}
    </label>
  );
}
