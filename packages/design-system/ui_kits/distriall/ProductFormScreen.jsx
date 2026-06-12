import React from 'react';
import { Card } from '../../components/data/Card';
import { Button } from '../../components/core/Button';
import { IconButton } from '../../components/core/IconButton';
import { Field } from '../../components/forms/Field';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { Textarea } from '../../components/forms/Textarea';
import { PageHeader } from '../../components/navigation/PageHeader';

const EDIT_DATA = {
  nome: 'Água mineral 510ml (cx 12)',
  descricao: 'Caixa com 12 garrafas de 510ml, sem gás.',
  categoria: 'Bebidas',
  unidade: 'Caixa',
  variantes: [
    { nome: 'Sem gás', peso: '6,1 kg', custo: '8,00', venda: '12,00', sku: 'AGUA-510-SG' },
    { nome: 'Com gás', peso: '6,1 kg', custo: '8,60', venda: '13,00', sku: 'AGUA-510-CG' },
  ],
};

const EMPTY_VARIANT = { nome: '', peso: '', custo: '', venda: '', sku: '' };

export function ProductFormScreen({ mode = 'new', onBack, onSave }) {
  const editing = mode === 'edit';
  const data = editing ? EDIT_DATA : { nome: '', descricao: '', categoria: '', unidade: '', variantes: [{ ...EMPTY_VARIANT }] };
  const [variantes, setVariantes] = React.useState(data.variantes);

  const setV = (i, key, value) =>
    setVariantes((vs) => vs.map((v, j) => (j === i ? { ...v, [key]: value } : v)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 860 }}>
      <PageHeader title={editing ? 'Editar produto' : 'Novo produto'} subtitle={editing ? data.nome : 'Cadastro de produto e variantes'} onBack={onBack} />

      <Card title="Dados do produto">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label="Nome" required><Input defaultValue={data.nome} placeholder="Ex.: Água mineral 510ml (cx 12)" /></Field>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label="Descrição"><Textarea defaultValue={data.descricao} placeholder="Detalhes do produto..." rows={2} /></Field>
          </div>
          <Field label="Categoria" required>
            <Select defaultValue={data.categoria} options={['Bebidas', 'Mercearia', 'Congelados', 'Descartáveis']} placeholder="Selecionar..." />
          </Field>
          <Field label="Unidade" required>
            <Select defaultValue={data.unidade} options={['Unidade', 'Caixa', 'Fardo', 'Saco']} placeholder="Selecionar..." />
          </Field>
        </div>
      </Card>

      <Card
        title="Variantes"
        action={<Button size="sm" variant="outline" icon="plus" onClick={() => setVariantes((vs) => [...vs, { ...EMPTY_VARIANT }])}>Adicionar variante</Button>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {variantes.map((v, i) => (
            <div
              key={i}
              className="da-grid da-grid--variant"
              style={{
                padding: 'var(--space-3)',
                background: 'var(--surface-inset)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <Field label="Nome da variante"><Input value={v.nome} onChange={(e) => setV(i, 'nome', e.target.value)} placeholder="Ex.: Com gás" /></Field>
              <Field label="Peso"><Input value={v.peso} onChange={(e) => setV(i, 'peso', e.target.value)} placeholder="kg" /></Field>
              <Field label="Custo (R$)"><Input value={v.custo} onChange={(e) => setV(i, 'custo', e.target.value)} placeholder="0,00" /></Field>
              <Field label="Venda (R$)"><Input value={v.venda} onChange={(e) => setV(i, 'venda', e.target.value)} placeholder="0,00" /></Field>
              <Field label="SKU"><Input value={v.sku} onChange={(e) => setV(i, 'sku', e.target.value)} placeholder="SKU" /></Field>
              <IconButton
                icon="trash-2"
                label="Remover variante"
                variant="ghost"
                disabled={variantes.length === 1}
                onClick={() => setVariantes((vs) => vs.filter((_, j) => j !== i))}
              />
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <Button icon="check" onClick={onSave}>Salvar</Button>
        <Button variant="outline" onClick={onBack}>Cancelar</Button>
      </div>
    </div>
  );
}
