import React from 'react';
import { Card } from '../../components/data/Card';
import { Tabs } from '../../components/data/Tabs';
import { Money } from '../../components/data/Money';
import { Button } from '../../components/core/Button';
import { IconButton } from '../../components/core/IconButton';
import { Field } from '../../components/forms/Field';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { Textarea } from '../../components/forms/Textarea';
import { PageHeader } from '../../components/navigation/PageHeader';
import { maskPhone, isPhoneComplete, MSG } from '../../components/forms/maskUtils';

const EDIT_DATA = {
  nome: 'Mercado São José',
  fantasia: 'São José',
  endereco: 'Rua das Flores, 120',
  cidade: 'Itajubá',
  bairro: 'Centro',
  telefone: '(35) 3622-1040',
  whatsapp: '(35) 99812-4455',
  pagamento: 'Pix',
  obs: 'Receber na porta dos fundos após as 7h.',
};

const PRECOS_INICIAIS = [
  { id: 1, produto: 'Água mineral 510ml (cx 12)', padrao: 13.5, especial: '12,00' },
  { id: 2, produto: 'Refrigerante cola 2L', padrao: 9.8, especial: '9,00' },
];

function DadosTab({ data }) {
  const [telefone, setTelefone] = React.useState(data.telefone);
  const [whatsapp, setWhatsapp] = React.useState(data.whatsapp);
  const [telTouched, setTelTouched] = React.useState(false);
  const telErro = telTouched && telefone && !isPhoneComplete(telefone) ? MSG.telefoneInvalido : null;
  return (
    <Card title="Dados do cliente">
      <div className="da-grid da-grid--cols2">
        <Field label="Nome" required><Input defaultValue={data.nome} placeholder="Razão social ou nome" /></Field>
        <Field label="Nome fantasia"><Input defaultValue={data.fantasia} placeholder="Como o cliente é conhecido" /></Field>
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Endereço" required><Input defaultValue={data.endereco} placeholder="Rua, número" /></Field>
        </div>
        <Field label="Cidade" required><Input defaultValue={data.cidade} /></Field>
        <Field label="Bairro"><Input defaultValue={data.bairro} /></Field>
        <Field label="Telefone" error={telErro}>
          <Input
            value={telefone}
            invalid={!!telErro}
            inputMode="tel"
            onChange={(e) => setTelefone(maskPhone(e.target.value))}
            onBlur={() => setTelTouched(true)}
            placeholder="(00) 0000-0000"
          />
        </Field>
        <Field label="WhatsApp">
          <Input value={whatsapp} inputMode="tel" onChange={(e) => setWhatsapp(maskPhone(e.target.value))} placeholder="(00) 00000-0000" />
        </Field>
        <Field label="Forma de pagamento padrão">
          <Select defaultValue={data.pagamento} options={['Dinheiro', 'Pix', 'Boleto', 'Vale', 'Cartão']} placeholder="Selecionar..." />
        </Field>
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Observações"><Textarea defaultValue={data.obs} placeholder="Horário de recebimento, instruções de entrega..." rows={3} /></Field>
        </div>
      </div>
    </Card>
  );
}

function PrecosTab() {
  const [precos, setPrecos] = React.useState(PRECOS_INICIAIS);
  const setEspecial = (id, value) => setPrecos((ps) => ps.map((p) => (p.id === id ? { ...p, especial: value } : p)));
  return (
    <Card
      title="Preços especiais"
      action={
        <Button size="sm" variant="outline" icon="plus" onClick={() => setPrecos((ps) => [...ps, { id: Date.now(), produto: 'Cerveja pilsen lata 350ml (fd 12)', padrao: 33.0, especial: '' }])}>
          Adicionar produto
        </Button>
      }
      padded={false}
    >
      <table className="da-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th className="da-table__right" style={{ width: 110 }}>Preço padrão</th>
            <th className="da-table__right" style={{ width: 130 }}>Preço especial</th>
            <th style={{ width: 50 }}></th>
          </tr>
        </thead>
        <tbody>
          {precos.map((p) => (
            <tr key={p.id}>
              <td>{p.produto}</td>
              <td className="da-table__right num"><Money value={p.padrao} style={{ color: 'var(--text-muted)' }} /></td>
              <td className="da-table__right">
                <input
                  value={p.especial}
                  onChange={(e) => setEspecial(p.id, e.target.value)}
                  placeholder="0,00"
                  style={{
                    width: 90, height: 32, textAlign: 'right',
                    background: 'var(--surface-inset)', border: '1px solid var(--border-input)',
                    borderRadius: 'var(--radius-sm)', color: 'var(--accent-fg)', fontWeight: 600,
                    fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', padding: '0 8px',
                  }}
                />
              </td>
              <td><IconButton icon="trash-2" label="Remover preço especial" variant="danger" size="sm" onClick={() => setPrecos((ps) => ps.filter((x) => x.id !== p.id))} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export function ClientFormScreen({ mode = 'new', onBack, onSave }) {
  const editing = mode === 'edit';
  const [tab, setTab] = React.useState('dados');
  const data = editing ? EDIT_DATA : { nome: '', fantasia: '', endereco: '', cidade: '', bairro: '', telefone: '', whatsapp: '', pagamento: '', obs: '' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 860 }}>
      <PageHeader title={editing ? 'Editar cliente' : 'Novo cliente'} subtitle={editing ? data.nome : 'Cadastro de cliente'} onBack={onBack} />

      {editing ? (
        <Tabs
          tabs={[{ id: 'dados', label: 'Dados' }, { id: 'precos', label: 'Preços especiais' }]}
          active={tab}
          onChange={setTab}
        />
      ) : null}

      {!editing || tab === 'dados' ? <DadosTab data={data} /> : <PrecosTab />}

      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <Button icon="check" onClick={onSave}>Salvar</Button>
        <Button variant="outline" onClick={onBack}>Cancelar</Button>
      </div>
    </div>
  );
}
