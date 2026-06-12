import React from 'react';

export function Switch({ label, checked, disabled = false, className, ...rest }) {
  return (
    <label className={['da-switch', disabled ? 'da-switch--disabled' : '', className || ''].filter(Boolean).join(' ')}>
      <input type="checkbox" role="switch" className="da-switch__input" checked={checked} disabled={disabled} {...rest} />
      <span className="da-switch__track" aria-hidden="true">
        <span className="da-switch__thumb"></span>
      </span>
      {label ? <span className="da-switch__label">{label}</span> : null}
    </label>
  );
}
