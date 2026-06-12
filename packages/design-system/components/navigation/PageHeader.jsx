import React from 'react';
import { IconButton } from '../core/IconButton';

export function PageHeader({ title, subtitle, onBack, actions, children, className }) {
  return (
    <header className={['da-pageheader', className || ''].filter(Boolean).join(' ')}>
      <div className="da-pageheader__main">
        {onBack ? <IconButton icon="arrow-left" label="Voltar" onClick={onBack} /> : null}
        <div className="da-pageheader__titles">
          <h1 className="da-pageheader__title">{title}</h1>
          {subtitle ? <p className="da-pageheader__subtitle">{subtitle}</p> : null}
        </div>
        {children}
      </div>
      {actions ? <div className="da-pageheader__actions">{actions}</div> : null}
    </header>
  );
}
