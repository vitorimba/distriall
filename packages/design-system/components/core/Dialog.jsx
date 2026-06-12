import React from 'react';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

/* Dialog modal sobre scrim. Fecha por Esc, clique no scrim ou botão X. */
export function Dialog({ open, onClose, title, width = 480, footer, children }) {
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
    <div className="da-scrim" onClick={onClose ? (e) => { if (e.target === e.currentTarget) onClose(); } : undefined}>
      <div className="da-dialog" style={{ width, maxWidth: 'calc(100vw - 32px)' }} role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : undefined}>
        <div className="da-dialog__head">
          <span className="da-dialog__title">{title}</span>
          {onClose ? <IconButton icon="x" label="Fechar" size="sm" onClick={onClose} /> : null}
        </div>
        <div className="da-dialog__body">{children}</div>
        {footer ? <div className="da-dialog__foot">{footer}</div> : null}
      </div>
    </div>
  );
}
