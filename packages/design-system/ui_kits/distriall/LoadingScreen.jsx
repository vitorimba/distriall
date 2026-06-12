import React from 'react';
import { Card } from '../../components/data/Card';
import { Money } from '../../components/data/Money';
import { Badge } from '../../components/core/Badge';
import { Chip } from '../../components/core/Chip';
import { Button } from '../../components/core/Button';
import { Checkbox } from '../../components/forms/Checkbox';
import { Select } from '../../components/forms/Select';
import { SearchField } from '../../components/forms/SearchField';
import { PageHeader } from '../../components/navigation/PageHeader';
import { StickyBar } from '../../components/navigation/StickyBar';
import { BottomSheet } from '../../components/navigation/BottomSheet';
import { useToast } from '../../components/core/Toast';
import { EmptyState } from '../../components/data/EmptyState';

const INICIAL = [
  { num: '#1042', cliente: 'Mercado São José', itens: '12× Água cx, 4× Refri 2L, 2× Fardo pilsen', total: 1245.0, status: 'confirmado' },
  { num: '#1041', cliente: 'Padaria Pão Quente', itens: '6× Água cx, 2× Suco uva', total: 482.5, status: 'lancado' },
  { num: '#1044', cliente: 'Mercearia Central', itens: '8× Fardo pilsen, 3× Carvão 3kg', total: 956.8, status: 'confirmado' },
  { num: '#1045', cliente: 'Bar do Zé', itens: '4× Fardo pilsen, 2× Gelo 5kg', total: 318.0, status: 'confirmado' },
  { num: '#1046', cliente: 'Lanchonete Sabor', itens: '3× Refri 2L, 1× Copo cx', total: 204.0, status: 'lancado' },
];

const LABELS = { lancado: 'Lançado', confirmado: 'Confirmado' };

export function LoadingScreen() {
  const [pedidos, setPedidos] = React.useState(INICIAL);
  const [filter, setFilter] = React.useState(null);
  const [q, setQ] = React.useState('');
  const [sel, setSel] = React.useState([]);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const toast = useToast();

  const rows = pedidos.filter(
    (p) =>
      p.status !== 'carregado' &&
      (!filter || p.status === filter) &&
      (!q || p.cliente.toLowerCase().includes(q.toLowerCase()) || p.num.includes(q))
  );
  const toggle = (num) => setSel((s) => (s.includes(num) ? s.filter((n) => n !== num) : [...s, num]));
  const selTotal = pedidos.filter((p) => sel.includes(p.num)).reduce((acc, p) => acc + p.total, 0);

  const marcarCarregado = () => {
    setPedidos((ps) => ps.map((p) => (sel.includes(p.num) ? { ...p, status: 'carregado' } : p)));
    toast(`${sel.length} pedido${sel.length > 1 ? 's' : ''} marcado${sel.length > 1 ? 's' : ''} como carregado`);
    setSel([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', minHeight: '100%' }}>
      <PageHeader title="Carregamento" subtitle={`${rows.length} pedidos aguardando carga`} />

      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {['lancado', 'confirmado'].map((s) => (
            <Chip key={s} selected={filter === s} onClick={() => setFilter(filter === s ? null : s)}>
              {LABELS[s]}
            </Chip>
          ))}
        </div>
        <div style={{ width: 170 }}>
          <Select options={['Todas as contas', 'Conta Principal', 'Filial Sul']} />
        </div>
        <div style={{ width: 260 }}>
          <SearchField placeholder="Buscar pedido..." value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} />
        </div>
      </div>

      <Card padded={false}>
        {rows.length === 0 ? (
          <EmptyState icon="forklift" title="Tudo carregado" description="Nenhum pedido aguardando carregamento." />
        ) : (
          <div>
            {rows.map((p, i) => (
              <div
                key={p.num}
                onClick={() => toggle(p.num)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  background: sel.includes(p.num) ? 'var(--accent-soft)' : 'transparent',
                }}
              >
                <span onClick={(e) => e.stopPropagation()}>
                  <Checkbox checked={sel.includes(p.num)} onChange={() => toggle(p.num)} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 'var(--weight-semibold)' }}>{p.cliente}</span>
                    <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{p.num}</span>
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.itens}</div>
                </div>
                <Money value={p.total} />
                <Badge tone={p.status} />
              </div>
            ))}
          </div>
        )}
      </Card>

      {sel.length > 0 ? (
        <StickyBar
          items={[
            { label: 'Selecionados', value: `${sel.length} pedido${sel.length > 1 ? 's' : ''}` },
            { label: 'Valor total', value: selTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), highlight: true },
          ]}
          action={
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Button variant="outline" icon="ellipsis-vertical" onClick={() => setSheetOpen(true)}>Mais ações</Button>
              <Button icon="forklift" onClick={marcarCarregado}>Marcar como carregado</Button>
            </div>
          }
        />
      ) : null}

      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={`${sel.length} pedido${sel.length > 1 ? 's' : ''} selecionado${sel.length > 1 ? 's' : ''}`}
        items={[
          { label: 'Marcar como carregado', icon: 'forklift', onClick: marcarCarregado },
          { label: 'Imprimir romaneio', icon: 'printer', onClick: () => toast('Romaneio enviado para impressão') },
          { label: 'Limpar seleção', icon: 'x', danger: true, onClick: () => setSel([]) },
        ]}
      />
    </div>
  );
}
