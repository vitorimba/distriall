import React from 'react';
import { BottomNav } from '../../components/navigation/BottomNav';
import { Wordmark } from '../../components/navigation/Sidebar';
import { IconButton } from '../../components/core/IconButton';

/* Shell mobile: app bar fina (wordmark + tema) + conteúdo + bottom nav fixa.
   Os títulos de página vêm do PageHeader de cada tela, como no desktop. */
export function MobileShell({ active, onNavigate, theme = 'dark', onToggleTheme, fab, children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 45,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'var(--space-3) var(--space-4)',
          background: 'var(--surface-glass)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <Wordmark size={17} />
        <IconButton
          icon={theme === 'dark' ? 'sun' : 'moon'}
          label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          variant="ghost"
          size="sm"
          onClick={onToggleTheme}
        />
      </header>
      <main style={{ flex: 1, padding: 'var(--space-4)', paddingBottom: 'calc(var(--bottomnav-h) + var(--space-8))' }}>
        {children}
      </main>
      {fab}
      <BottomNav active={active} onNavigate={onNavigate} />
    </div>
  );
}
