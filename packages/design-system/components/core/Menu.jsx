import React from 'react';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

/* Menu dropdown de ações. items: [{ label, icon?, danger?, disabled?, onClick }] ou 'separator'. */
export function Menu({ items = [], trigger, align = 'right', label = 'Mais ações' }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <span className="da-menu-wrap" ref={ref}>
      {trigger ? (
        <span onClick={() => setOpen((v) => !v)}>{trigger}</span>
      ) : (
        <IconButton icon="ellipsis-vertical" label={label} onClick={() => setOpen((v) => !v)} />
      )}
      {open ? (
        <div className="da-menu" style={align === 'left' ? { right: 'auto', left: 0 } : undefined} role="menu">
          {items.map((it, i) =>
            it === 'separator' ? (
              <div key={i} className="da-menu__sep"></div>
            ) : (
              <button
                key={i}
                className={it.danger ? 'da-menu__item da-menu__item--danger' : 'da-menu__item'}
                disabled={it.disabled}
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  if (it.onClick) it.onClick();
                }}
              >
                {it.icon ? <Icon name={it.icon} size={14} /> : null}
                {it.label}
              </button>
            )
          )}
        </div>
      ) : null}
    </span>
  );
}
