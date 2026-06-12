import React from 'react';
import { Icon } from '../core/Icon';

/* Accordion de divulgação progressiva (FAQ, troubleshooting).
   items: [{ title, content }] — um aberto por vez. */
export function Accordion({ items = [], defaultOpen = null, className }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className={className}>
      {items.map((it, i) => (
        <div key={i} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-3)', width: '100%',
              padding: 'var(--space-3) var(--space-4)', background: 'none', border: 'none',
              cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)',
              fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)', textAlign: 'left',
            }}
          >
            <span style={{ flex: 1 }}>{it.title}</span>
            <span style={{ display: 'inline-flex', transition: 'transform 0.15s ease', transform: open === i ? 'rotate(180deg)' : 'none', color: 'var(--text-muted)' }}>
              <Icon name="chevron-down" size={16} />
            </span>
          </button>
          {open === i ? (
            <div style={{ padding: '0 var(--space-4) var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-normal)' }}>
              {it.content}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
