import React from 'react';
import { Icon } from './Icon';

export function IconButton({ icon, label, variant = 'ghost', size = 'md', disabled = false, className, ...rest }) {
  const cls = ['da-iconbtn', `da-iconbtn--${variant}`, `da-iconbtn--${size}`, className || '']
    .filter(Boolean)
    .join(' ');
  return (
    <button className={cls} aria-label={label} title={label} disabled={disabled} {...rest}>
      <Icon name={icon} size={size === 'sm' ? 15 : 18} />
    </button>
  );
}
