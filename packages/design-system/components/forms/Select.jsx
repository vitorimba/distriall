import React from 'react';
import { Icon } from '../core/Icon';

export function Select({ options = [], placeholder, invalid = false, className, ...rest }) {
  const cls = ['da-input-wrap', 'da-select-wrap', invalid ? 'da-input-wrap--invalid' : '', className || '']
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls}>
      <select className="da-input da-select" defaultValue={rest.value === undefined ? '' : undefined} {...rest}>
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((o) => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
      <Icon name="chevron-down" size={15} className="da-select__chev" />
    </span>
  );
}
