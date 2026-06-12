import React from 'react';
import { Card } from '../../components/data/Card';
import { Money } from '../../components/data/Money';
import { Button } from '../../components/core/Button';
import { IconButton } from '../../components/core/IconButton';
import { Field } from '../../components/forms/Field';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { RadioGroup } from '../../components/forms/RadioGroup';
import { QuantityStepper } from '../../components/forms/QuantityStepper';
import { useToast } from '../../components/core/Toast';
import { Textarea } from '../../components/forms/Textarea';
import { SearchField } from '../../components/forms/SearchField';
import { PageHeader } from '../../components/navigation/PageHeader';
import { StickyBar } from '../../components/navigation/StickyBar';
import { Avatar } from '../../components/core/Avatar';

const INITIAL_CART = [
  { id: 1, produto: 'Água mineral 510ml (cx 12)', qtd: 20, preco: 12.0 },
  { id: 2, produto: 'Refrigerante cola 2L', qtd: 36, preco: 9.0 },
];

export function OrderNewScreen({ onBack, onSave }) {
  const [cart, setCart] = React.useState(INITIAL_CART);
  const [payment, setPayment] = React.useState('Pix');
  const toast = useToast();
  const subtotal = cart.reduce((s, i) => s + i.qtd * i.preco, 0);
  const custo = subtotal * 0.65;
  const save = () => {
    toast('Pedido salvo', 'success');
    if (onSave) onSave();
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', paddingBottom: 'var(--space-2)' }}>
      <PageHeader title="Novo pedido" onBack={onBack} />

      <Card title="Cliente">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Avatar name="Mercado São José" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>Mercado São José</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Centro, Itajubá · Pix padrão</div>
          </div>
          <Button variant="ghost" size="sm" icon="repeat">Trocar</Button>
        </div>
      </Card>

      <Card title="Produtos" action={<div style={{ width: 280 }}><SearchField placeholder="Buscar produto ou variante..." /></div>} padded={false}>
        <table className="da-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th className="da-table__right" style={{ width: 90 }}>Qtd</th>
              <th className="da-table__right">Preço un.</th>
              <th className="da-table__right">Subtotal</th>
              <th style={{ width: 50 }}></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.produto}</td>
                <td className="da-table__right">
                  <QuantityStepper
                    value={item.qtd}
                    onChange={(n) => setCart(cart.map((c) => (c.id === item.id ? { ...c, qtd: n } : c)))}
                  />
                </td>
                <td className="da-table__right num"><Money value={item.preco} /></td>
                <td className="da-table__right num"><Money value={item.qtd * item.preco} /></td>
                <td><IconButton icon="trash-2" label="Remover item" variant="danger" size="sm" onClick={() => setCart(cart.filter((c) => c.id !== item.id))} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="da-grid da-grid--cols2">
        <Card title="Pagamento e entrega">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Field label="Forma de pagamento">
              <RadioGroup
                direction="row"
                options={['Dinheiro', 'Pix', 'Boleto', 'Vale', 'Cartão', 'Misto']}
                value={payment}
                onChange={setPayment}
              />
            </Field>
            {payment === 'Misto' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                <Field label="Dinheiro"><Input prefix="R$" placeholder="0,00" /></Field>
                <Field label="Pix"><Input prefix="R$" placeholder="0,00" /></Field>
              </div>
            ) : null}
            <Field label="Data de entrega">
              <Input type="date" defaultValue="2026-06-14" />
            </Field>
          </div>
        </Card>
        <Card title="Observações">
          <Textarea placeholder="Entregar pela manhã, conferir troco..." rows={6} />
        </Card>
      </div>

      <StickyBar
        items={[
          { label: 'Subtotal', value: <Money value={subtotal} /> },
          { label: 'Custo', value: <Money value={custo} /> },
          { label: 'Lucro est.', value: <Money value={subtotal - custo} />, highlight: true },
        ]}
        action={<Button size="lg" icon="check" onClick={save}>Salvar pedido</Button>}
      />
    </div>
  );
}
