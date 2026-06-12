import React from 'react';
import { Icon } from '../core/Icon';

export const BOTTOM_NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { id: 'orders', label: 'Pedidos', icon: 'clipboard-list' },
  { id: 'clients', label: 'Clientes', icon: 'users' },
  { id: 'financial', label: 'Financeiro', icon: 'wallet' },
  { id: 'more', label: 'Mais', icon: 'menu' },
];

export function BottomNav({ items = BOTTOM_NAV_ITEMS, active, onNavigate }) {
  return (
    <nav className="da-bottomnav">
      {items.map((item) => (
        <button
          key={item.id}
          className={item.id === active ? 'da-bottomnav__item da-bottomnav__item--active' : 'da-bottomnav__item'}
          onClick={() => onNavigate && onNavigate(item.id)}
        >
          <Icon name={item.icon} size={20} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
