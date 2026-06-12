import React from 'react';
import { Icon } from './Icon';

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  fullWidth = false,
  disabled = false,
  children,
  className,
  ...rest
}) {
  const cls = [
    'da-btn',
    `da-btn--${variant}`,
    `da-btn--${size}`,
    fullWidth ? 'da-btn--full' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button className={cls} disabled={disabled || loading} {...rest}>
      {loading ? (
        <span className="da-spinner" aria-hidden="true"></span>
      ) : icon ? (
        <Icon name={icon} size={size === 'sm' ? 14 : 16} />
      ) : null}
      {children}
    </button>
  );
}
