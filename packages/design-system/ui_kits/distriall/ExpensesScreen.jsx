import React from 'react';
import { Card } from '../../components/data/Card';
import { DataTable } from '../../components/data/DataTable';
import { Money } from '../../components/data/Money';
import { Button } from '../../components/core/Button';
import { Field } from '../../components/forms/Field';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { PageHeader } from '../../components/navigation/PageHeader';

const INICIAL = [
  { id: 1, descricao: 'Combustível — caminhão MB 710', categoria: 'Transporte', valor: 420.0, data: '11/06' },
  { id: 2, descricao: 'Manutenção empilhadeira', categoria: 'Manutenção', valor: 380.0, data: '10/06' },
  { id: 3, descricao: 'Almoço equipe de entrega', categoria: 'Alimentação', valor: 96.5, data: '10/06' },
  { id: 4, descricao: 'Pedágio rota litoral', categoria: 'Transporte', valor: 54.2, data: '09/06' },
  { id: 5, descricao: 'Material de escritório', categoria: 'Administrativo', valor: 78.9, data: '08/06' },
];

export function ExpensesScreen({ onBack }) {
  const [despesas, setDespesas] = React.useState(INICIAL);
  const [showForm, setShowForm] = React.useState(false);
  const [desc, setDesc] = React.useState('');
  const [valor, setValor] = React.useState('');

  const salvar = () => {
    setDespesas((d) => [
      { id: Date.now(), descricao: desc || 'Nova despesa', categoria: 'Administrativo', valor: parseFloat(valor.replace(',', '.')) || 0, data: '12/06' },
      ...d,
    ]);
    setDesc('');
    setValor('');
    setShowForm(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader
        title="Despesas"
        subtitle={`${despesas.length} lançamentos`}
        onBack={onBack}
        actions={<Button icon="plus" onClick={() => setShowForm((v) => !v)}>Nova despesa</Button>}
      />

      {showForm ? (
        <Card title="Nova despesa">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--space-3)', alignItems: 'end' }}>
            <Field label="Descrição" required><Input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Ex.: Combustível" /></Field>
            <Field label="Categoria" required><Select options={['Transporte', 'Manutenção', 'Alimentação', 'Administrativo']} /></Field>
            <Field label="Valor (R$)" required><Input value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0,00" /></Field>
            <Field label="Data"><Input type="date" defaultValue="2026-06-12" /></Field>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
            <Button icon="check" onClick={salvar}>Salvar</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
          </div>
        </Card>
      ) : null}

      <Card padded={false}>
        <DataTable
          columns={[
            { key: 'descricao', label: 'Descrição' },
            { key: 'categoria', label: 'Categoria', width: 150 },
            { key: 'valor', label: 'Valor', align: 'right', width: 110, render: (r) => <Money value={r.valor} style={{ color: 'var(--text-negative)' }} /> },
            { key: 'data', label: 'Data', width: 80 },
          ]}
          rows={despesas}
          rowKey="id"
        />
      </Card>
    </div>
  );
}
