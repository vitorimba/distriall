import React from 'react';

export function Card({ title, action, padded = true, className, children, ...rest }) {
  const cls = ['da-card', className || ''].filter(Boolean).join(' ');
  return (
    <section className={cls} {...rest}>
      {title || action ? (
        <header className="da-card__header">
          {title ? <h3 className="da-card__title">{title}</h3> : <span></span>}
          {action ? <div className="da-card__action">{action}</div> : null}
        </header>
      ) : null}
      <div className={padded ? 'da-card__body' : 'da-card__body da-card__body--flush'}>{children}</div>
    </section>
  );
}
