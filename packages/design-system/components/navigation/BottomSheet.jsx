import React from 'react';
import { Icon } from '../core/Icon';

/* Bottom sheet mobile: menu de ações ancorado na base (spec 2.14).
   items: [{ label, icon?, danger?, onClick }]. */
export function BottomSheet({ open, onClose, title, items, children }) {
  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="da-sheet-scrim" onClick={onClose ? (e) => { if (e.target === e.currentTarget) onClose(); } : undefined}>
      <div className="da-sheet" role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : undefined}>
        <div className="da-sheet__grab"></div>
        {title ? <div className="da-sheet__title">{title}</div> : null}
        {items
          ? items.map((it, i) => (
              <button
                key={i}
                className={it.danger ? 'da-sheet__item da-sheet__item--danger' : 'da-sheet__item'}
                onClick={() => {
                  if (onClose) onClose();
                  if (it.onClick) it.onClick();
                }}
              >
                {it.icon ? <Icon name={it.icon} size={17} /> : null}
                {it.label}
              </button>
            ))
          : children}
      </div>
    </div>
  );
}
