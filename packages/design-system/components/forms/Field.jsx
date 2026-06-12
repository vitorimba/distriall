import React from 'react';

export function Field({ label, error, hint, required, children, className }) {
  return (
    <label className={['da-field', className || ''].filter(Boolean).join(' ')}>
      {label ? (
        <span className="da-field__label">
          {label}
          {required ? <span className="da-field__req"> *</span> : null}
        </span>
      ) : null}
      {children}
      {error ? <span className="da-field__error">{error}</span> : hint ? <span className="da-field__hint">{hint}</span> : null}
    </label>
  );
}
