import React from 'react';
import { Sidebar } from '../../components/navigation/Sidebar';
import { Avatar } from '../../components/core/Avatar';
import { Icon } from '../../components/core/Icon';

export function AppShell({ active, onNavigate, theme = 'dark', onToggleTheme, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'stretch' }}>
      <Sidebar
        active={active}
        onNavigate={onNavigate}
        footer={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <button
              onClick={onToggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '8px 10px',
                background: 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15} />
              <span style={{ fontSize: 12.5, fontWeight: 500, flex: 1, textAlign: 'left' }}>
                {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
              </span>
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '8px 10px',
                background: 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <Avatar name="Conta Principal" size="sm" />
              <span style={{ fontSize: 12.5, fontWeight: 500, flex: 1, textAlign: 'left' }}>Conta Principal</span>
              <Icon name="chevrons-up-down" size={14} />
            </button>
          </div>
        }
      />
      <main style={{ flex: 1, minWidth: 0, padding: 'var(--space-6)', maxWidth: 'var(--content-max)' }}>{children}</main>
    </div>
  );
}
