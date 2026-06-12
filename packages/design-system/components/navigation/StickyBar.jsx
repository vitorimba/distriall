import React from 'react';

export function StickyBar({ items = [], action, className }) {
  return (
    <div className={['da-stickybar', className || ''].filter(Boolean).join(' ')}>
      <div className="da-stickybar__items">
        {items.map((it, i) => (
          <div key={i} className="da-stickybar__item">
            <span className="da-stickybar__label">{it.label}</span>
            <span className={`da-stickybar__value num${it.highlight ? ' da-stickybar__value--accent' : ''}`}>{it.value}</span>
          </div>
        ))}
      </div>
      {action ? <div className="da-stickybar__action">{action}</div> : null}
    </div>
  );
}
