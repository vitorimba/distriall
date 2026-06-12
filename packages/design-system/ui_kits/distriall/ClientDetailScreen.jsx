import React from 'react';
import { Card } from '../../components/data/Card';
import { DataTable } from '../../components/data/DataTable';
import { Money } from '../../components/data/Money';
import { Badge } from '../../components/core/Badge';
import { Button } from '../../components/core/Button';
import { IconButton } from '../../components/core/IconButton';
import { Icon } from '../../components/core/Icon';
import { Avatar } from '../../components/core/Avatar';
import { PageHeader } from '../../components/navigation/PageHeader';

const HISTORICO = [
  { num: '#1042', data: '12/06', total: 1245.0, status: 'confirmado' },
  { num: '#1027', data: '05/06', total: 980.5, status: 'entregue' },
  { num: '#1011', data: '29/05', total: 1102.0, status: 'entregue' },
  { num: '#0998', data: '22/05', total: 874.2, status: 'entregue' },
];

const PRECOS = [
  { produto: 'Água mineral 510ml (cx 12)', padrao: 13.5, especial: 12.0 },
  { produto: 'Refrigerante cola 2L', padrao: 9.8, especial: 9.0 },
];

function ContactRow({ icon, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: '6px 0' }}>
      <Icon name={icon} size={15} style={{ color: 'var(--text-muted)', flex: 'none' }} />
      <span style={{ fontSize: 'var(--text-base)' }}>{value}</span>
    </div>
  );
}

export function ClientDetailScreen({ onBack, onNewOrder, onEdit }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader
        title="Mercado São José"
        subtitle="Cliente desde mar 2024 · 42 pedidos"
        onBack={onBack}
        actions={
          <React.Fragment>
            <IconButton icon="pencil" label="Editar cliente" variant="outline" onClick={onEdit} />
            <Button icon="plus" onClick={onNewOrder}>Novo pedido</Button>
          </React.Fragment>
        }
      >
        <Avatar name="Mercado São José" size="lg" />
      </PageHeader>

      <div className="da-grid da-grid--client-top da-grid--stretch">
        <Card title="Saldo da conta">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Money value={-350} signed style={{ fontSize: 'var(--text-stat)', fontWeight: 700 }} />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>1 vale pendente de R$ 350,00</span>
            <div style={{ marginTop: 'var(--space-2)' }}><Badge tone="pendente">Vale vence 18/06</Badge></div>
          </div>
        </Card>
        <Card title="Frequência de compra">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span className="num" style={{ fontSize: 'var(--text-stat)', fontWeight: 700 }}>7</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>dias entre pedidos</span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 1, 1, 1, 0.5, 0.2].map((v, i) => (
                <span key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: v > 0.6 ? 'var(--accent)' : v > 0.3 ? 'var(--accent-soft-border)' : 'var(--border-strong)' }}></span>
              ))}
            </div>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-positive)' }}>Comprador frequente</span>
          </div>
        </Card>
        <Card title="Contato">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 'var(--space-4)' }}>
            <ContactRow icon="map-pin" value="Rua das Flores 120 — Centro, Itajubá" />
            <ContactRow icon="phone" value="(35) 3622-1040" />
            <ContactRow icon="message-circle" value="(35) 99812-4455" />
            <ContactRow icon="credit-card" value="Pix (padrão)" />
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Obs: receber na porta dos fundos após as 7h.</p>
        </Card>
      </div>

      <div className="da-grid da-grid--side-main">
        <Card title="Preços especiais" action={<Button variant="ghost" size="sm" icon="plus">Adicionar</Button>} padded={false}>
          <DataTable
            columns={[
              { key: 'produto', label: 'Produto' },
              { key: 'padrao', label: 'Padrão', align: 'right', render: (r) => <Money value={r.padrao} style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }} /> },
              { key: 'especial', label: 'Especial', align: 'right', render: (r) => <Money value={r.especial} style={{ color: 'var(--accent-fg)', fontWeight: 600 }} /> },
            ]}
            rows={PRECOS}
            dense
          />
        </Card>
        <Card title="Histórico de pedidos" padded={false}>
          <DataTable
            columns={[
              { key: 'num', label: 'Nº', width: 70, render: (r) => <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{r.num}</span> },
              { key: 'data', label: 'Data', width: 80 },
              { key: 'total', label: 'Valor', align: 'right', render: (r) => <Money value={r.total} /> },
              { key: 'status', label: 'Status', width: 130, render: (r) => <Badge tone={r.status} /> },
            ]}
            rows={HISTORICO}
            rowKey="num"
            onRowClick={() => {}}
          />
        </Card>
      </div>
    </div>
  );
}
