import React from 'react';
import { Icon } from '../core/Icon';

export function Input({ invalid = false, icon, prefix, className, ...rest }) {
  const cls = ['da-input-wrap', invalid ? 'da-input-wrap--invalid' : '', className || ''].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      {icon ? <Icon name={icon} size={15} className="da-input__icon" /> : null}
      {prefix ? <span className="da-input__prefix">{prefix}</span> : null}
      <input className="da-input" {...rest} />
    </span>
  );
}
