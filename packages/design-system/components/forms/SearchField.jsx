import React from 'react';
import { Icon } from '../core/Icon';

export function SearchField({ onClear, value, className, ...rest }) {
  return (
    <span className={['da-input-wrap', 'da-search', className || ''].filter(Boolean).join(' ')}>
      <Icon name="search" size={15} className="da-input__icon" />
      <input type="search" className="da-input" value={value} {...rest} />
      {value && onClear ? (
        <button type="button" className="da-search__clear" aria-label="Limpar busca" onClick={onClear}>
          <Icon name="x" size={13} />
        </button>
      ) : null}
    </span>
  );
}
