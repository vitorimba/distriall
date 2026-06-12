import React from 'react';
import { Card } from '../../components/data/Card';
import { DataTable } from '../../components/data/DataTable';
import { Money } from '../../components/data/Money';
import { Badge } from '../../components/core/Badge';
import { Chip } from '../../components/core/Chip';
import { Button } from '../../components/core/Button';
import { Field } from '../../components/forms/Field';
import { Input } from '../../components/forms/Input';
import { PageHeader } from '../../components/navigation/PageHeader';

const ACERTOS = [
  { id: 3, periodo: '01–07 jun 2026', pedidos: 286, clientes: 92, lucro: 6840.2, status: 'rascunho' },
  { id: 2, periodo: '25–31 mai 2026', pedidos: 301, clientes: 97, lucro: 7212.9, status: 'conferido' },
  { id: 1, periodo: '18–24 mai 2026', pedidos: 274, clientes: 88, lucro: 6105.4, status: 'fechado' },
];

const PEDIDOS_PERIODO = [
  { num: '#1029', cliente: 'Mercado São José', valor: 1245.0, custo: 871.5 },
  { num: '#1028', cliente: 'Padaria Pão Quente', valor: 482.5, custo: 333.0 },
  { num: '#1027', cliente: 'Mercearia Central', valor: 956.8, custo: 660.2 },
  { num: '#1026', cliente: 'Bar do Zé', valor: 318.0, custo: 219.4 },
];

const DESPESAS_PERIODO = [
  { descricao: 'Combustível', valor: 420.0 },
  { descricao: 'Pedágio', valor: 54.2 },
  { descricao: 'Manutenção', valor: 380.0 },
];

const NEXT = { rascunho: 'conferido', conferido: 'fechado' };
const NEXT_LABEL = { rascunho: 'Marcar como conferido', conferido: 'Fechar acerto' };

function SettlementDetail({ acerto, onBack }) {
  const [status, setStatus] = React.useState(acerto.status);
  const fat = PEDIDOS_PERIODO.reduce((a, p) => a + p.valor, 0);
  const custos = PEDIDOS_PERIODO.reduce((a, p) => a + p.custo, 0);
  const despesas = DESPESAS_PERIODO.reduce((a, d) => a + d.valor, 0);
  const lucro = fat - custos - despesas;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader
        title={`Acerto — ${acerto.periodo}`}
        onBack={onBack}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
            <Button variant="outline" icon="refresh-cw">Recalcular</Button>
            {NEXT[status] ? (
              <Button icon="check" onClick={() => setStatus(NEXT[status])}>{NEXT_LABEL[status]}</Button>
            ) : null}
          </div>
        }
      >
        <Badge tone={status} size="lg" />
      </PageHeader>

      <Card title="Resumo do período">
        <div className="da-grid da-grid--cols4">
          {[
            { label: 'Faturamento', value: fat },
            { label: 'Custos', value: -custos },
            { label: 'Despesas', value: -despesas },
            { label: 'Lucro líquido', value: lucro, accent: true },
          ].map((it) => (
            <div key={it.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--text-muted)', fontWeight: 'var(--weight-semibold)' }}>{it.label}</span>
              <Money value={it.value} style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-bold)', color: it.accent ? 'var(--text-positive)' : undefined }} />
            </div>
          ))}
        </div>
        <p style={{ margin: 'var(--space-4) 0 0', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
          Faturamento − Custos − Despesas = <strong style={{ color: 'var(--text-positive)' }}>Lucro líquido</strong>
        </p>
      </Card>

      <div className="da-grid da-grid--main-side">
        <Card title="Pedidos do período" padded={false}>
          <DataTable
            columns={[
              { key: 'num', label: 'Nº', width: 70, render: (r) => <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{r.num}</span> },
              { key: 'cliente', label: 'Cliente' },
              { key: 'valor', label: 'Valor', align: 'right', render: (r) => <Money value={r.valor} /> },
              { key: 'custo', label: 'Custo', align: 'right', render: (r) => <Money value={r.custo} style={{ color: 'var(--text-muted)' }} /> },
            ]}
            rows={PEDIDOS_PERIODO}
            rowKey="num"
          />
        </Card>
        <Card title="Despesas do período" padded={false}>
          <DataTable
            columns={[
              { key: 'descricao', label: 'Descrição' },
              { key: 'valor', label: 'Valor', align: 'right', render: (r) => <Money value={r.valor} style={{ color: 'var(--text-negative)' }} /> },
            ]}
            rows={DESPESAS_PERIODO}
            rowKey="descricao"
          />
        </Card>
      </div>
    </div>
  );
}

export function SettlementsScreen({ onBack }) {
  const [filter, setFilter] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);
  const [open, setOpen] = React.useState(null);

  if (open) return <SettlementDetail acerto={open} onBack={() => setOpen(null)} />;

  const rows = ACERTOS.filter((a) => !filter || a.status === filter);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader
        title="Acertos"
        subtitle="Fechamentos por período"
        onBack={onBack}
        actions={<Button icon="plus" onClick={() => setShowForm((v) => !v)}>Gerar novo acerto</Button>}
      />

      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        {['rascunho', 'conferido', 'fechado'].map((s) => (
          <Chip key={s} selected={filter === s} onClick={() => setFilter(filter === s ? null : s)}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Chip>
        ))}
      </div>

      {showForm ? (
        <Card title="Novo acerto">
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ width: 180 }}><Field label="Início"><Input type="date" defaultValue="2026-06-08" /></Field></div>
            <div style={{ width: 180 }}><Field label="Fim"><Input type="date" defaultValue="2026-06-14" /></Field></div>
            <Button icon="calculator" onClick={() => setShowForm(false)}>Gerar</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </Card>
      ) : null}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {rows.map((a) => (
          <Card key={a.id}>
            <button
              onClick={() => setOpen(a)}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-5)', width: '100%',
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', textAlign: 'left',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'var(--weight-bold)' }}>{a.periodo}</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 2 }}>
                  {a.pedidos} pedidos · {a.clientes} clientes
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', color: 'var(--text-muted)', fontWeight: 'var(--weight-semibold)' }}>Lucro líquido</div>
                <Money value={a.lucro} style={{ fontWeight: 'var(--weight-bold)', color: 'var(--text-positive)' }} />
              </div>
              <Badge tone={a.status} />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
