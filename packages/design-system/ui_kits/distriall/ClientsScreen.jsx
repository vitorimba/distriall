import React from 'react';
import { Card } from '../../components/data/Card';
import { Avatar } from '../../components/core/Avatar';
import { Icon } from '../../components/core/Icon';
import { Button } from '../../components/core/Button';
import { SearchField } from '../../components/forms/SearchField';
import { PageHeader } from '../../components/navigation/PageHeader';
import { EmptyState } from '../../components/data/EmptyState';

export const CLIENTES = [
  { id: 1, nome: 'Mercado São José', cidade: 'Itajubá', bairro: 'Centro', telefone: '(35) 3622-1040' },
  { id: 2, nome: 'Padaria Pão Quente', cidade: 'Itajubá', bairro: 'Jd. América', telefone: '(35) 3623-8821' },
  { id: 3, nome: 'Bar do Zé', cidade: 'Piranguinho', bairro: 'Centro', telefone: '(35) 99901-2233' },
  { id: 4, nome: 'Mercearia Central', cidade: 'Itajubá', bairro: 'Varginha', telefone: '(35) 3621-4410' },
  { id: 5, nome: 'Lanchonete Sabor', cidade: 'São José do Alegre', bairro: 'Centro', telefone: '(35) 99877-1029' },
  { id: 6, nome: 'Restaurante Mineiro', cidade: 'Itajubá', bairro: 'Pinheirinho', telefone: '(35) 3622-9090' },
];

export function ClientsScreen({ onOpenClient, onNewClient }) {
  const [q, setQ] = React.useState('');
  const rows = CLIENTES.filter(
    (c) =>
      !q ||
      c.nome.toLowerCase().includes(q.toLowerCase()) ||
      c.cidade.toLowerCase().includes(q.toLowerCase()) ||
      c.bairro.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader
        title="Clientes"
        subtitle={`${rows.length} clientes`}
        actions={<Button icon="plus" onClick={onNewClient}>Novo cliente</Button>}
      />
      <div style={{ maxWidth: 320 }}>
        <SearchField placeholder="Buscar por nome, cidade ou bairro..." value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} />
      </div>
      <Card padded={false}>
        {rows.length === 0 ? (
          <EmptyState icon="users" title="Nenhum cliente encontrado" description="Ajuste o termo de busca ou cadastre um novo cliente." />
        ) : (
          rows.map((c, i) => (
            <button
              key={c.id}
              onClick={() => onOpenClient && onOpenClient(c)}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)', width: '100%',
                padding: 'var(--space-3) var(--space-4)',
                border: 'none',
                borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                background: 'none',
                cursor: 'pointer', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', textAlign: 'left',
              }}
            >
              <Avatar name={c.nome} size="sm" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-base)' }}>{c.nome}</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 1 }}>
                  {c.cidade} · {c.bairro} · {c.telefone}
                </div>
              </div>
              <Icon name="chevron-right" size={16} style={{ color: 'var(--text-muted)', flex: 'none' }} />
            </button>
          ))
        )}
      </Card>
    </div>
  );
}
