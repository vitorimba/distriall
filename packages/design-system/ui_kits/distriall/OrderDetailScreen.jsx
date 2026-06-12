import React from 'react';
import { Card } from '../../components/data/Card';
import { DataTable } from '../../components/data/DataTable';
import { Money } from '../../components/data/Money';
import { Badge } from '../../components/core/Badge';
import { Button } from '../../components/core/Button';
import { Dialog } from '../../components/core/Dialog';
import { Icon } from '../../components/core/Icon';
import { Receipt } from '../../components/print/Receipt';
import { PageHeader } from '../../components/navigation/PageHeader';

const ITENS = [
  { produto: 'Água mineral 510ml (cx 12)', qtd: 20, preco: 12.0, sub: 240.0 },
  { produto: 'Refrigerante cola 2L', qtd: 36, preco: 9.0, sub: 324.0 },
  { produto: 'Cerveja pilsen lata 350ml (fd 12)', qtd: 18, preco: 33.0, sub: 594.0 },
  { produto: 'Suco de uva integral 1,5L', qtd: 8, preco: 13.0, sub: 104.0 },
];

const FLOW = ['lancado', 'confirmado', 'carregado', 'entregue'];
const FLOW_LABELS = { lancado: 'Lançado', confirmado: 'Confirmado', carregado: 'Carregado', entregue: 'Entregue' };
const TIMESTAMPS = { lancado: '12/06 08:14', confirmado: '12/06 09:02', carregado: '—', entregue: '—' };

function StatusStepper({ current, onChange }) {
  const idx = FLOW.indexOf(current);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
      <Button variant="outline" size="sm" icon="arrow-left" disabled={idx === 0} onClick={() => onChange(FLOW[idx - 1])}>
        {idx > 0 ? FLOW_LABELS[FLOW[idx - 1]] : 'Voltar'}
      </Button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 var(--space-2)' }}>
        {FLOW.map((s, i) => (
          <React.Fragment key={s}>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: i <= idx ? 'var(--accent)' : 'var(--border-strong)',
                outline: i === idx ? '3px solid var(--accent-soft-border)' : 'none',
              }}
            ></span>
            {i < FLOW.length - 1 ? (
              <span style={{ width: 26, height: 2, borderRadius: 2, background: i < idx ? 'var(--accent)' : 'var(--border-strong)' }}></span>
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <Button size="sm" icon="arrow-right" disabled={idx === FLOW.length - 1} onClick={() => onChange(FLOW[idx + 1])}>
        {idx < FLOW.length - 1 ? FLOW_LABELS[FLOW[idx + 1]] : 'Concluído'}
      </Button>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: '7px 0' }}>
      <Icon name={icon} size={15} style={{ color: 'var(--text-muted)', flex: 'none' }} />
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', width: 120, flex: 'none' }}>{label}</span>
      <span style={{ fontSize: 'var(--text-base)' }}>{value}</span>
    </div>
  );
}

export function OrderDetailScreen({ order = { num: '#1042', cliente: 'Mercado São José' }, onBack, onEdit }) {
  const [status, setStatus] = React.useState('confirmado');
  const [printOpen, setPrintOpen] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader
        title={`Pedido ${order.num}`}
        subtitle={order.cliente}
        onBack={onBack}
        actions={
          <React.Fragment>
            <Button variant="outline" icon="printer" onClick={() => setPrintOpen(true)}>Imprimir</Button>
            {status !== 'entregue' ? <Button icon="pencil" onClick={onEdit}>Editar</Button> : null}
          </React.Fragment>
        }
      >
        <Badge tone={status} size="lg" />
      </PageHeader>

      <Dialog
        open={printOpen}
        onClose={() => setPrintOpen(false)}
        title={`Recibo — pedido ${order.num}`}
        width={360}
        footer={
          <React.Fragment>
            <Button variant="outline" onClick={() => setPrintOpen(false)}>Fechar</Button>
            <Button icon="printer" onClick={() => setPrintOpen(false)}>Imprimir</Button>
          </React.Fragment>
        }
      >
        <Receipt
          numero={order.num}
          cliente={order.cliente}
          data="12/06/2026 08:14"
          itens={ITENS.map((it) => ({ produto: it.produto, qtd: it.qtd, preco: it.preco }))}
          subtotal={1262}
          desconto={17}
          total={1245}
          pagamento="Pix"
        />
      </Dialog>

      <Card>
        <StatusStepper current={status} onChange={setStatus} />
      </Card>

      <div className="da-grid da-grid--main-side">
        <Card title="Itens" padded={false}>
          <DataTable
            columns={[
              { key: 'produto', label: 'Produto' },
              { key: 'qtd', label: 'Qtd', align: 'right', width: 60 },
              { key: 'preco', label: 'Preço un.', align: 'right', render: (r) => <Money value={r.preco} /> },
              { key: 'sub', label: 'Subtotal', align: 'right', render: (r) => <Money value={r.sub} /> },
            ]}
            rows={ITENS}
          />
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Card title="Resumo">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 'var(--text-base)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Subtotal</span><Money value={1262} /></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Desconto</span><Money value={-17} /></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border-subtle)', fontWeight: 700 }}>
                <span>Total</span><Money value={1245} style={{ color: 'var(--accent-fg)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-secondary)' }}>Pagamento</span><span>Pix</span></div>
            </div>
          </Card>
          <Card title="Detalhes">
            <DetailRow icon="calendar-plus" label="Criado em" value="12/06/2026 08:14" />
            <DetailRow icon="truck" label="Entrega" value="14/06/2026" />
            <DetailRow icon="message-square" label="Observações" value="Entregar pela manhã" />
            <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)' }}>
              {FLOW.map((s) => (
                <div key={s} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', padding: '3px 0' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{FLOW_LABELS[s]}</span>
                  <span className="num" style={{ color: TIMESTAMPS[s] === '—' ? 'var(--text-muted)' : 'var(--text-primary)' }}>{TIMESTAMPS[s]}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
