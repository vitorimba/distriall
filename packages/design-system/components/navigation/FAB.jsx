import React from 'react';
import { Icon } from '../core/Icon';

export function FAB({ icon = 'plus', label, onClick, className }) {
  return (
    <button className={['da-fab', className || ''].filter(Boolean).join(' ')} aria-label={label} title={label} onClick={onClick}>
      <Icon name={icon} size={22} />
    </button>
  );
}
