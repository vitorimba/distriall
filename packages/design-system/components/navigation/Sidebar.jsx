import React from 'react';
import { Icon } from '../core/Icon';

/* Default nav model for the DistriAll back office */
export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { id: 'clients', label: 'Clientes', icon: 'users' },
  { id: 'products', label: 'Produtos', icon: 'package' },
  { id: 'orders', label: 'Pedidos', icon: 'clipboard-list' },
  { id: 'loading', label: 'Carregamento', icon: 'forklift' },
  { id: 'deliveries', label: 'Entregas', icon: 'truck' },
  { id: 'financial', label: 'Financeiro', icon: 'wallet' },
  { id: 'stats', label: 'Estatísticas', icon: 'chart-column' },
  { id: 'settings', label: 'Configurações', icon: 'settings' },
];

export function Wordmark({ size = 20 }) {
  return (
    <span className="da-wordmark" style={{ fontSize: size }}>
      DISTRI<span className="da-wordmark__all">ALL</span>
    </span>
  );
}

export function Sidebar({ items = NAV_ITEMS, active, onNavigate, logoSrc, footer }) {
  return (
    <aside className="da-sidebar">
      <div className="da-sidebar__logo">
        {logoSrc ? <img src={logoSrc} alt="DistriAll" style={{ height: 30 }} /> : <Wordmark />}
      </div>
      <nav className="da-sidebar__nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={item.id === active ? 'da-sidebar__item da-sidebar__item--active' : 'da-sidebar__item'}
            onClick={() => onNavigate && onNavigate(item.id)}
          >
            <Icon name={item.icon} size={17} />
            {item.label}
            {item.count != null ? <span className="da-sidebar__count num">{item.count}</span> : null}
          </button>
        ))}
      </nav>
      {footer ? <div className="da-sidebar__footer">{footer}</div> : null}
    </aside>
  );
}
