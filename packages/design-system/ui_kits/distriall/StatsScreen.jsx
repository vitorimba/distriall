import React from 'react';
import { Card } from '../../components/data/Card';
import { DataTable } from '../../components/data/DataTable';
import { Money } from '../../components/data/Money';
import { Chip } from '../../components/core/Chip';
import { Select } from '../../components/forms/Select';
import { PageHeader } from '../../components/navigation/PageHeader';
import { Pagination } from '../../components/navigation/Pagination';

const RANKING = [
  { nome: 'Cerveja pilsen lata 350ml (fd 12)', qtd: 188, fat: 6204.0, lucro: 1241.0 },
  { nome: 'Água mineral 510ml (cx 12)', qtd: 412, fat: 4944.0, lucro: 1648.0 },
  { nome: 'Refrigerante cola 2L', qtd: 256, fat: 2304.0, lucro: 691.2 },
  { nome: 'Suco de uva integral 1,5L', qtd: 104, fat: 1352.0, lucro: 432.6 },
  { nome: 'Energético 473ml', qtd: 96, fat: 864.0, lucro: 288.0 },
  { nome: 'Carvão vegetal 3kg', qtd: 58, fat: 841.0, lucro: 312.4 },
  { nome: 'Gelo em cubos 5kg', qtd: 73, fat: 803.0, lucro: 401.5 },
  { nome: 'Copo descartável 300ml (cx 100)', qtd: 41, fat: 319.8, lucro: 127.9 },
  { nome: 'Refrigerante guaraná 2L', qtd: 34, fat: 306.0, lucro: 91.8 },
  { nome: 'Água com gás 510ml (cx 12)', qtd: 22, fat: 286.0, lucro: 95.3 },
  { nome: 'Suco de laranja 1L', qtd: 18, fat: 162.0, lucro: 48.6 },
  { nome: 'Filtro de café nº 103', qtd: 12, fat: 70.8, lucro: 28.3 },
];

const FACTORS = { Dia: 0.18, Semana: 1, 'Mês': 3.7, Personalizado: 3.7 };
const ACCOUNTS = { 'Conta Principal': 1, 'Filial Sul': 0.62 };

export function StatsScreen() {
  const [period, setPeriod] = React.useState('Mês');
  const [account, setAccount] = React.useState('Conta Principal');
  const [page, setPage] = React.useState(1);
  const PAGE_SIZE = 8;
  const f = (FACTORS[period] || 1) * (ACCOUNTS[account] || 1);
  const scaled = RANKING.map((r) => ({ ...r, qtd: Math.round(r.qtd * f), fat: r.fat * f, lucro: r.lucro * f }));
  const totalFat = scaled.reduce((a, r) => a + r.fat, 0);
  const rows = scaled.map((r, i) => ({ ...r, pos: i + 1, pct: (r.fat / totalFat) * 100 }));
  const pageRows = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader
        title="Estatísticas"
        subtitle={`Ranking completo de produtos · ${account}`}
        actions={
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {['Dia', 'Semana', 'Mês', 'Personalizado'].map((p) => (
              <Chip key={p} selected={p === period} onClick={() => setPeriod(p)}>{p}</Chip>
            ))}
          </div>
        }
      >
        <div style={{ width: 180 }}>
          <Select options={Object.keys(ACCOUNTS)} value={account} onChange={(e) => setAccount(e.target.value)} />
        </div>
      </PageHeader>

      <Card padded={false}>
        <DataTable
          columns={[
            { key: 'pos', label: '#', width: 44, render: (r) => <span className="num" style={{ color: 'var(--text-muted)' }}>{r.pos}</span> },
            { key: 'nome', label: 'Produto', sortable: true },
            { key: 'qtd', label: 'Qtd vendida', align: 'right', width: 120, sortable: true },
            { key: 'fat', label: 'Faturamento', align: 'right', width: 140, sortable: true, render: (r) => <Money value={r.fat} /> },
            { key: 'lucro', label: 'Lucro', align: 'right', width: 120, sortable: true, render: (r) => <Money value={r.lucro} style={{ color: 'var(--text-positive)' }} /> },
            {
              key: 'pct',
              label: '% do total',
              width: 160,
              sortable: true,
              render: (r) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div style={{ flex: 1, height: 5, borderRadius: 'var(--radius-full)', background: 'var(--surface-inset)', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.max(r.pct, 2)}%`, height: '100%', borderRadius: 'var(--radius-full)', background: 'var(--accent)' }}></div>
                  </div>
                  <span className="num" style={{ fontSize: 'var(--text-sm)', width: 44, textAlign: 'right' }}>{r.pct.toFixed(1)}%</span>
                </div>
              ),
            },
          ]}
          rows={pageRows}
          rowKey="pos"
        />
        <Pagination page={page} totalItems={rows.length} pageSize={PAGE_SIZE} onChange={setPage} label="produtos" />
      </Card>
    </div>
  );
}
