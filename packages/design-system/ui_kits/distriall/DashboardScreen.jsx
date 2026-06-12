import React from 'react';
import { StatCard } from '../../components/data/StatCard';
import { Card } from '../../components/data/Card';
import { DataTable } from '../../components/data/DataTable';
import { Money } from '../../components/data/Money';
import { Chip } from '../../components/core/Chip';
import { Select } from '../../components/forms/Select';
import { Field } from '../../components/forms/Field';
import { Input } from '../../components/forms/Input';
import { PageHeader } from '../../components/navigation/PageHeader';
import { LineChart } from '../../components/charts/LineChart';
import { DonutChart } from '../../components/charts/DonutChart';
import { fmtBRL } from '../../components/charts/chartUtils';

/* Datasets por período — Personalizado reusa o mês com range editável */
const PERIODS = {
  Dia: {
    subtitle: 'Hoje, 12 jun 2026',
    series: [
      { label: '08h', value: 320 }, { label: '10h', value: 760 }, { label: '12h', value: 1140 },
      { label: '14h', value: 890 }, { label: '16h', value: 1320 }, { label: '18h', value: 540 },
    ],
    stats: { fat: 4970, lucro: 1243, ticket: 87.2, pedidos: 57, clientes: 41 },
    deltas: { fat: 1.4, lucro: 0.9, ticket: -1.2, pedidos: 2.1, clientes: 0.4 },
    pay: [
      { label: 'Pix', value: 48 }, { label: 'Dinheiro', value: 26 }, { label: 'Boleto', value: 12 },
      { label: 'Vale', value: 9 }, { label: 'Cartão', value: 5 },
    ],
    topFactor: 0.18,
  },
  Semana: {
    subtitle: 'Semana de 08–14 jun 2026',
    series: [
      { label: 'Seg', value: 3200 }, { label: 'Ter', value: 4100 }, { label: 'Qua', value: 3650 },
      { label: 'Qui', value: 5200 }, { label: 'Sex', value: 6840 }, { label: 'Sáb', value: 4480 },
      { label: 'Dom', value: 1050 },
    ],
    stats: { fat: 28520.3, lucro: 7104.12, ticket: 91.41, pedidos: 312, clientes: 148 },
    deltas: { fat: 3.2, lucro: 1.8, ticket: -0.6, pedidos: 5.4, clientes: 2.1 },
    pay: [
      { label: 'Pix', value: 42 }, { label: 'Dinheiro', value: 23 }, { label: 'Boleto', value: 18 },
      { label: 'Vale', value: 10 }, { label: 'Cartão', value: 7 },
    ],
    topFactor: 1,
  },
  Mês: {
    subtitle: 'Junho de 2026',
    series: [
      { label: 'Sem 1', value: 24800 }, { label: 'Sem 2', value: 27300 },
      { label: 'Sem 3', value: 25100 }, { label: 'Sem 4', value: 28520 },
    ],
    stats: { fat: 105720, lucro: 26430, ticket: 89.95, pedidos: 1175, clientes: 152 },
    deltas: { fat: 4.6, lucro: 3.1, ticket: 0.8, pedidos: 6.2, clientes: 2.7 },
    pay: [
      { label: 'Pix', value: 40 }, { label: 'Dinheiro', value: 21 }, { label: 'Boleto', value: 20 },
      { label: 'Vale', value: 11 }, { label: 'Cartão', value: 8 },
    ],
    topFactor: 3.7,
  },
};
PERIODS.Personalizado = { ...PERIODS['Mês'], subtitle: 'Período personalizado' };

const ACCOUNTS = { 'Conta Principal': 1, 'Filial Sul': 0.62 };

const TOP_BASE = [
  { nome: 'Água mineral 510ml (cx 12)', qtd: 412, fat: 4944.0, lucro: 1648.0 },
  { nome: 'Refrigerante cola 2L', qtd: 256, fat: 2304.0, lucro: 691.2 },
  { nome: 'Cerveja pilsen lata 350ml (fd 12)', qtd: 188, fat: 6204.0, lucro: 1241.0 },
  { nome: 'Suco de uva integral 1,5L', qtd: 104, fat: 1352.0, lucro: 432.6 },
  { nome: 'Energético 473ml', qtd: 96, fat: 864.0, lucro: 288.0 },
];

export function DashboardScreen() {
  const [period, setPeriod] = React.useState('Semana');
  const [account, setAccount] = React.useState('Conta Principal');
  const data = PERIODS[period];
  const k = ACCOUNTS[account] || 1;

  const series = data.series.map((p) => ({ ...p, value: Math.round(p.value * k) }));
  const sparkVals = series.map((p) => p.value);
  const top = TOP_BASE.map((t) => ({
    ...t,
    qtd: Math.round(t.qtd * data.topFactor * k),
    fat: t.fat * data.topFactor * k,
    lucro: t.lucro * data.topFactor * k,
  }));
  const s = data.stats;
  const d = data.deltas;
  const pedidos = Math.round(s.pedidos * k);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <PageHeader
        title="Dashboard"
        subtitle={`${data.subtitle} · ${account}`}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {['Dia', 'Semana', 'Mês', 'Personalizado'].map((p) => (
              <Chip key={p} selected={p === period} onClick={() => setPeriod(p)}>
                {p}
              </Chip>
            ))}
          </div>
        }
      >
        <div style={{ width: 180 }}>
          <Select options={Object.keys(ACCOUNTS)} value={account} onChange={(e) => setAccount(e.target.value)} />
        </div>
      </PageHeader>

      {period === 'Personalizado' ? (
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <div style={{ width: 170 }}><Field label="Início"><Input type="date" defaultValue="2026-05-12" /></Field></div>
          <div style={{ width: 170 }}><Field label="Fim"><Input type="date" defaultValue="2026-06-12" /></Field></div>
        </div>
      ) : null}

      <div className="da-grid da-grid--stats5">
        <StatCard icon="wallet" label="Faturamento" value={fmtBRL(s.fat * k)} delta={d.fat} spark={sparkVals} accent />
        <StatCard icon="trending-up" label="Lucro" value={fmtBRL(s.lucro * k)} delta={d.lucro} spark={sparkVals.map((v) => v * 0.25)} />
        <StatCard icon="receipt" label="Ticket médio" value={fmtBRL(s.ticket)} delta={d.ticket} />
        <StatCard icon="clipboard-list" label="Total pedidos" value={String(pedidos)} delta={d.pedidos} />
        <StatCard icon="users" label="Total clientes" value={String(Math.round(s.clientes * (k === 1 ? 1 : 0.7)))} delta={d.clientes} />
      </div>

      <div className="da-grid da-grid--main-side da-grid--stretch">
        <Card title={period === 'Dia' ? 'Faturamento por hora' : 'Evolução de faturamento'}>
          <LineChart data={series} height={150} formatValue={fmtBRL} />
        </Card>
        <Card title="Formas de pagamento">
          <DonutChart data={data.pay} size={130} centerValue={String(pedidos)} centerLabel="pedidos" />
        </Card>
      </div>

      <Card title="Top produtos" padded={false}>
        <DataTable
          columns={[
            { key: 'nome', label: 'Produto', sortable: true },
            { key: 'qtd', label: 'Qtd vendida', align: 'right', sortable: true },
            { key: 'fat', label: 'Faturamento', align: 'right', sortable: true, render: (r) => <Money value={r.fat} /> },
            { key: 'lucro', label: 'Lucro', align: 'right', sortable: true, render: (r) => <Money value={r.lucro} style={{ color: 'var(--text-positive)' }} /> },
          ]}
          rows={top}
          rowKey="nome"
          defaultSort={{ key: 'fat', dir: 'desc' }}
          onRowClick={() => {}}
        />
      </Card>
    </div>
  );
}
