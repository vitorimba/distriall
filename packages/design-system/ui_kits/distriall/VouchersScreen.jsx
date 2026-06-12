import React from 'react';
import { Card } from '../../components/data/Card';
import { Money } from '../../components/data/Money';
import { Badge } from '../../components/core/Badge';
import { Chip } from '../../components/core/Chip';
import { Button } from '../../components/core/Button';
import { Icon } from '../../components/core/Icon';
import { SearchField } from '../../components/forms/SearchField';
import { useToast } from '../../components/core/Toast';
import { PageHeader } from '../../components/navigation/PageHeader';
import { EmptyState } from '../../components/data/EmptyState';

const INICIAL = [
  { id: 1, cliente: 'Bar do Zé', valor: 318.0, vencimento: '05/06/2026', status: 'vencido', foto: true },
  { id: 2, cliente: 'Mercado São José', valor: 540.0, vencimento: '18/06/2026', status: 'pendente', foto: true },
  { id: 3, cliente: 'Lanchonete Sabor', valor: 204.0, vencimento: '22/06/2026', status: 'pendente', foto: false },
  { id: 4, cliente: 'Padaria Pão Quente', valor: 482.5, vencimento: '02/06/2026', status: 'pago', foto: true },
];

const LABELS = { pendente: 'Pendente', pago: 'Pago', vencido: 'Vencido' };

export function VouchersScreen({ onBack }) {
  const [vales, setVales] = React.useState(INICIAL);
  const [filter, setFilter] = React.useState(null);
  const [q, setQ] = React.useState('');
  const toast = useToast();

  const rows = vales.filter(
    (v) => (!filter || v.status === filter) && (!q || v.cliente.toLowerCase().includes(q.toLowerCase()))
  );
  const pagar = (id) => {
    setVales((vs) => vs.map((v) => (v.id === id ? { ...v, status: 'pago' } : v)));
    toast('Vale marcado como pago');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader title="Vales" subtitle={`${rows.length} vales`} onBack={onBack} />

      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {['pendente', 'pago', 'vencido'].map((s) => (
            <Chip key={s} selected={filter === s} count={vales.filter((v) => v.status === s).length} onClick={() => setFilter(filter === s ? null : s)}>
              {LABELS[s]}
            </Chip>
          ))}
        </div>
        <div style={{ width: 260 }}>
          <SearchField placeholder="Buscar por cliente..." value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} />
        </div>
      </div>

      {rows.length === 0 ? (
        <Card><EmptyState icon="ticket" title="Nenhum vale encontrado" description="Ajuste os filtros ou a busca." /></Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {rows.map((v) => (
            <div
              key={v.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)',
                background: v.status === 'vencido' ? 'var(--status-vencido-soft)' : 'var(--surface-card)',
                border: `1px solid ${v.status === 'vencido' ? 'var(--status-vencido)' : 'var(--border-subtle)'}`,
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontWeight: 'var(--weight-bold)' }}>{v.cliente}</span>
                  {v.foto ? (
                    <span title="Foto anexada" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-muted)' }}>
                      <Icon name="paperclip" size={14} />
                    </span>
                  ) : null}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 2 }}>
                  Vence em {v.vencimento}
                </div>
              </div>
              <Money value={v.valor} style={{ fontWeight: 'var(--weight-bold)', fontSize: 'var(--text-md)' }} />
              <Badge tone={v.status} />
              {v.status !== 'pago' ? (
                <Button size="sm" variant="outline" icon="check" onClick={() => pagar(v.id)}>Marcar como pago</Button>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
