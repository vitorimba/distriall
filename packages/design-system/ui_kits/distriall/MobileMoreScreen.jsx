import React from 'react';
import { Card } from '../../components/data/Card';
import { Avatar } from '../../components/core/Avatar';
import { Icon } from '../../components/core/Icon';
import { PageHeader } from '../../components/navigation/PageHeader';

const ITENS = [
  { id: 'products', label: 'Produtos', icon: 'package' },
  { id: 'loading', label: 'Carregamento', icon: 'forklift' },
  { id: 'deliveries', label: 'Entregas', icon: 'truck' },
  { id: 'stats', label: 'Estatísticas', icon: 'chart-column' },
  { id: 'settings', label: 'Configurações', icon: 'settings' },
];

function MenuRow({ icon, label, onClick, first }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-3)', width: '100%',
        minHeight: 48, padding: 'var(--space-3) var(--space-4)',
        border: 'none',
        borderTop: first ? 'none' : '1px solid var(--border-subtle)',
        background: 'none', cursor: 'pointer',
        fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', textAlign: 'left',
        fontSize: 'var(--text-base)', fontWeight: 'var(--weight-medium)',
      }}
    >
      <Icon name={icon} size={18} style={{ color: 'var(--text-secondary)', flex: 'none' }} />
      <span style={{ flex: 1 }}>{label}</span>
      <Icon name="chevron-right" size={16} style={{ color: 'var(--text-muted)', flex: 'none' }} />
    </button>
  );
}

/* Menu "Mais" da bottom nav mobile: destinos que não cabem nos 4 itens principais. */
export function MobileMoreScreen({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader title="Mais" />
      <Card padded={false}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)' }}>
          <Avatar name="Conta Principal" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 'var(--weight-semibold)' }}>Conta Principal</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Trocar de conta</div>
          </div>
          <Icon name="chevrons-up-down" size={16} style={{ color: 'var(--text-muted)' }} />
        </div>
      </Card>
      <Card padded={false}>
        {ITENS.map((item, i) => (
          <MenuRow key={item.id} icon={item.icon} label={item.label} first={i === 0} onClick={() => onNavigate && onNavigate(item.id)} />
        ))}
      </Card>
      <Card padded={false}>
        <MenuRow icon="log-out" label="Sair" first onClick={() => onNavigate && onNavigate('login')} />
      </Card>
    </div>
  );
}
