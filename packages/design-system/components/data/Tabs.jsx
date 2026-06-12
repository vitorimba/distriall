import React from 'react';

export function Tabs({ tabs = [], active, onChange, className }) {
  return (
    <div className={['da-tabs', className || ''].filter(Boolean).join(' ')} role="tablist">
      {tabs.map((tab) => {
        const t = typeof tab === 'string' ? { id: tab, label: tab } : tab;
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={isActive}
            className={isActive ? 'da-tabs__tab da-tabs__tab--active' : 'da-tabs__tab'}
            onClick={() => onChange && onChange(t.id)}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
