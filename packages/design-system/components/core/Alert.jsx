import React from 'react';
import { Icon } from './Icon';

const TONE_ICON = { info: 'info', success: 'check-circle-2', warning: 'triangle-alert', danger: 'alert-circle' };

/* Banner inline de aviso/erro em contexto — não confundir com Toast (efêmero). */
export function Alert({ tone = 'info', title, action, icon, children, className }) {
  const cls = ['da-alert', `da-alert--${tone}`, className || ''].filter(Boolean).join(' ');
  return (
    <div className={cls} role={tone === 'danger' ? 'alert' : 'status'}>
      <span className="da-alert__icon">
        <Icon name={icon || TONE_ICON[tone]} size={16} />
      </span>
      <div className="da-alert__body">
        {title ? <div className="da-alert__title">{title}</div> : null}
        {children ? <div className="da-alert__desc">{children}</div> : null}
      </div>
      {action ? <div className="da-alert__action">{action}</div> : null}
    </div>
  );
}
