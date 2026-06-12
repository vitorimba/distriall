import React from 'react';
import { Card } from '../../components/data/Card';
import { DataTable } from '../../components/data/DataTable';
import { Money } from '../../components/data/Money';
import { Badge } from '../../components/core/Badge';
import { Menu } from '../../components/core/Menu';
import { useToast } from '../../components/core/Toast';
import { Chip } from '../../components/core/Chip';
import { Button } from '../../components/core/Button';
import { SearchField } from '../../components/forms/SearchField';
import { PageHeader } from '../../components/navigation/PageHeader';
import { EmptyState } from '../../components/data/EmptyState';

const PEDIDOS = [
  { num: '#1042', cliente: 'Mercado São José', data: '12/06', total: 1245.0, status: 'confirmado' },
  { num: '#1041', cliente: 'Padaria Pão Quente', data: '12/06', total: 482.5, status: 'lancado' },
  { num: '#1040', cliente: 'Bar do Zé', data: '11/06', total: 318.0, status: 'carregado' },
  { num: '#1039', cliente: 'Mercearia Central', data: '11/06', total: 956.8, status: 'entregue' },
  { num: '#1038', cliente: 'Lanchonete Sabor', data: '10/06', total: 204.0, status: 'entregue' },
  { num: '#1037', cliente: 'Restaurante Mineiro', data: '10/06', total: 1730.4, status: 'cancelado' },
];

const STATUSES = ['lancado', 'confirmado', 'carregado', 'entregue', 'cancelado'];
const LABELS = { lancado: 'Lançado', confirmado: 'Confirmado', carregado: 'Carregado', entregue: 'Entregue', cancelado: 'Cancelado' };

export function OrdersScreen({ onOpenOrder, onNewOrder, compact = false }) {
  const toast = useToast();
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState(null);
  const rows = PEDIDOS.filter(
    (p) =>
      (!filter || p.status === filter) &&
      (!q || p.cliente.toLowerCase().includes(q.toLowerCase()) || p.num.includes(q))
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader
        title="Pedidos"
        subtitle={`${rows.length} pedidos`}
        actions={compact ? null : <Button icon="plus" onClick={onNewOrder}>Novo pedido</Button>}
      />
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ width: compact ? '100%' : 300 }}>
          <SearchField placeholder="Buscar por cliente ou número..." value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {STATUSES.map((s) => (
            <Chip
              key={s}
              selected={filter === s}
              count={PEDIDOS.filter((p) => p.status === s).length}
              onClick={() => setFilter(filter === s ? null : s)}
            >
              {LABELS[s]}
            </Chip>
          ))}
        </div>
      </div>
      <Card padded={false}>
        {rows.length === 0 ? (
          <EmptyState
            title="Nenhum pedido encontrado"
            description="Ajuste a busca ou os filtros de status."
          />
        ) : compact ? (
          rows.map((p, i) => (
            <button
              key={p.num}
              onClick={() => onOpenOrder && onOpenOrder(p)}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)', width: '100%',
                padding: 'var(--space-3) var(--space-4)',
                border: 'none',
                borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                background: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', textAlign: 'left',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                  <span style={{ fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-base)' }}>{p.cliente}</span>
                  <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{p.num}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: 3 }}>
                  <Badge tone={p.status} size="sm" />
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{p.data}</span>
                </div>
              </div>
              <Money value={p.total} style={{ fontWeight: 'var(--weight-semibold)' }} />
            </button>
          ))
        ) : (
          <DataTable
            columns={[
              { key: 'num', label: 'Nº', width: 70, sortable: true, render: (r) => <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{r.num}</span> },
              { key: 'cliente', label: 'Cliente', sortable: true },
              { key: 'data', label: 'Data', width: 90, sortable: true, sortValue: (r) => Number(r.data.split('/').reverse().join('')) },
              { key: 'total', label: 'Valor total', align: 'right', sortable: true, render: (r) => <Money value={r.total} /> },
              { key: 'status', label: 'Status', width: 130, render: (r) => <Badge tone={r.status} /> },
              {
                key: 'acoes',
                label: '',
                width: 50,
                render: (r) => (
                  <span onClick={(e) => e.stopPropagation()}>
                    <Menu
                      label={`Ações do pedido ${r.num}`}
                      items={[
                        { label: 'Ver detalhes', icon: 'eye', onClick: () => onOpenOrder && onOpenOrder(r) },
                        { label: 'Imprimir recibo', icon: 'printer', onClick: () => toast('Recibo enviado para impressão') },
                        'separator',
                        { label: 'Cancelar pedido', icon: 'x-circle', danger: true, disabled: r.status === 'entregue', onClick: () => toast(`Pedido ${r.num} cancelado`, 'danger') },
                      ]}
                    />
                  </span>
                ),
              },
            ]}
            rows={rows}
            rowKey="num"
            onRowClick={(r) => onOpenOrder && onOpenOrder(r)}
          />
        )}
      </Card>
    </div>
  );
}
