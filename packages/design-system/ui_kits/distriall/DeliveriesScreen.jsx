import React from 'react';
import { Card } from '../../components/data/Card';
import { Money } from '../../components/data/Money';
import { Badge } from '../../components/core/Badge';
import { Button } from '../../components/core/Button';
import { IconButton } from '../../components/core/IconButton';
import { Tooltip } from '../../components/core/Tooltip';
import { Icon } from '../../components/core/Icon';
import { Field } from '../../components/forms/Field';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { PageHeader } from '../../components/navigation/PageHeader';
import { EmptyState } from '../../components/data/EmptyState';

const DISPONIVEIS = [
  { num: '#1040', cliente: 'Bar do Zé', endereco: 'Rua das Flores, 88 — Centro', total: 318.0 },
  { num: '#1043', cliente: 'Mercado São José', endereco: 'Av. Brasil, 1240 — Jd. América', total: 1245.0 },
  { num: '#1044', cliente: 'Mercearia Central', endereco: 'Rua XV de Novembro, 35 — Centro', total: 956.8 },
  { num: '#1046', cliente: 'Lanchonete Sabor', endereco: 'Rua Ipiranga, 410 — Vila Nova', total: 204.0 },
];

function RowShell({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-3) var(--space-4)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      {children}
    </div>
  );
}

function PedidoInfo({ p }) {
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
        <span style={{ fontWeight: 'var(--weight-semibold)', fontSize: 'var(--text-sm)' }}>{p.cliente}</span>
        <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{p.num}</span>
      </div>
      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>{p.endereco}</div>
    </div>
  );
}

export function DeliveriesScreen({ onOpenDriver }) {
  const [disponiveis, setDisponiveis] = React.useState(DISPONIVEIS);
  const [rota, setRota] = React.useState([]);
  const [enviada, setEnviada] = React.useState(false);

  const add = (p) => {
    setDisponiveis((d) => d.filter((x) => x.num !== p.num));
    setRota((r) => [...r, p]);
  };
  const remove = (p) => {
    setRota((r) => r.filter((x) => x.num !== p.num));
    setDisponiveis((d) => [...d, p]);
  };
  const move = (i, dir) =>
    setRota((r) => {
      const j = i + dir;
      if (j < 0 || j >= r.length) return r;
      const copy = [...r];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader
        title="Entregas"
        subtitle="Montagem de rota"
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Badge tone={enviada ? 'entregue' : 'rascunho'}>{enviada ? 'Enviada' : 'Rascunho'}</Badge>
            <Button variant="ghost" icon="smartphone" onClick={onOpenDriver}>Ver como motorista</Button>
          </div>
        }
      />

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <div style={{ width: 180 }}>
          <Field label="Data da rota"><Input type="date" defaultValue="2026-06-12" /></Field>
        </div>
        <div style={{ width: 220 }}>
          <Field label="Motorista"><Select options={['Carlos Andrade', 'Roberto Lima', 'Edson Faria']} defaultValue="Carlos Andrade" /></Field>
        </div>
      </div>

      <div className="da-grid da-grid--cols2">
        <Card title={`Pedidos disponíveis (${disponiveis.length})`} padded={false}>
          {disponiveis.length === 0 ? (
            <EmptyState icon="package-check" title="Todos na rota" description="Nenhum pedido disponível." />
          ) : (
            disponiveis.map((p) => (
              <RowShell key={p.num}>
                <PedidoInfo p={p} />
                <Money value={p.total} />
                <IconButton icon="arrow-right" label="Adicionar à rota" variant="outline" size="sm" disabled={enviada} onClick={() => add(p)} />
              </RowShell>
            ))
          )}
        </Card>

        <Card
          title={`Rota montada (${rota.length})`}
          padded={false}
          action={
            <Button size="sm" icon="send" disabled={rota.length === 0 || enviada} onClick={() => setEnviada(true)}>
              {enviada ? 'Rota enviada' : 'Enviar rota'}
            </Button>
          }
        >
          {rota.length === 0 ? (
            <EmptyState icon="route" title="Rota vazia" description="Adicione pedidos da lista ao lado e ordene a sequência de entrega." />
          ) : (
            rota.map((p, i) => (
              <RowShell key={p.num}>
                <span
                  className="num"
                  style={{
                    width: 24, height: 24, borderRadius: 'var(--radius-full)', background: 'var(--accent-soft)',
                    color: 'var(--accent-fg)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-bold)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none',
                  }}
                >
                  {i + 1}
                </span>
                <PedidoInfo p={p} />
                <div style={{ display: 'flex', gap: 2 }}>
                  <Tooltip label="Subir na rota"><IconButton icon="chevron-up" label="Subir" variant="ghost" size="sm" disabled={i === 0 || enviada} onClick={() => move(i, -1)} /></Tooltip>
                  <Tooltip label="Descer na rota"><IconButton icon="chevron-down" label="Descer" variant="ghost" size="sm" disabled={i === rota.length - 1 || enviada} onClick={() => move(i, 1)} /></Tooltip>
                  <Tooltip label="Remover da rota"><IconButton icon="x" label="Remover da rota" variant="ghost" size="sm" disabled={enviada} onClick={() => remove(p)} /></Tooltip>
                </div>
              </RowShell>
            ))
          )}
        </Card>
      </div>

      {enviada ? (
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
            padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)',
            background: 'var(--success-soft)', color: 'var(--text-positive)', fontSize: 'var(--text-sm)',
          }}
        >
          <Icon name="check-circle-2" size={16} />
          Rota enviada para Carlos Andrade — o motorista recebe os pedidos em tempo real.
        </div>
      ) : null}
    </div>
  );
}
