import React from 'react';
import { Icon } from './Icon';

export function Chip({ selected = false, count, icon, children, className, ...rest }) {
  const cls = ['da-chip', selected ? 'da-chip--selected' : '', className || ''].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} aria-pressed={selected} {...rest}>
      {icon ? <Icon name={icon} size={13} /> : null}
      {children}
      {count != null ? <span className="da-chip__count">{count}</span> : null}
    </button>
  );
}
