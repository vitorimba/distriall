import React from 'react';
import { Card } from '../../components/data/Card';
import { Money } from '../../components/data/Money';
import { Badge } from '../../components/core/Badge';
import { Button } from '../../components/core/Button';
import { Icon } from '../../components/core/Icon';
import { Avatar } from '../../components/core/Avatar';
import { ProgressBar } from '../../components/core/ProgressBar';
import { Spinner } from '../../components/core/Spinner';

const ENTREGAS = [
  { num: '#1043', cliente: 'Mercado São José', endereco: 'Av. Brasil, 1240 — Jd. América', itens: '12× Água cx · 4× Refri 2L · 2× Fardo pilsen', total: 1245.0 },
  { num: '#1040', cliente: 'Bar do Zé', endereco: 'Rua das Flores, 88 — Centro', itens: '4× Fardo pilsen · 2× Gelo 5kg', total: 318.0 },
  { num: '#1044', cliente: 'Mercearia Central', endereco: 'Rua XV de Novembro, 35 — Centro', itens: '8× Fardo pilsen · 3× Carvão 3kg', total: 956.8 },
];

export function DriverScreen({ onExit }) {
  const [entregues, setEntregues] = React.useState([]);
  const done = (num) => setEntregues((e) => [...e, num]);
  const restantes = ENTREGAS.length - entregues.length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-page)' }}>
      {/* Header verde — papel de motorista, visual distinto do back office */}
      <header
        style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
          padding: 'var(--space-4) var(--space-5)',
          background: 'var(--grad-driver)',
          color: '#fff',
        }}
      >
        <Avatar name="Carlos Andrade" size="md" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 'var(--weight-bold)', fontSize: 'var(--text-md)' }}>Carlos Andrade</div>
          <div style={{ fontSize: 'var(--text-sm)', opacity: 0.85 }}>Rota de 12/06/2026 · {restantes} entrega{restantes === 1 ? '' : 's'} restante{restantes === 1 ? '' : 's'}</div>
        </div>
        <button
          onClick={onExit}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.16)', color: '#fff', border: 'none',
            borderRadius: 'var(--radius-sm)', padding: '8px 12px', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)',
          }}
        >
          <Icon name="log-out" size={15} />
          Sair
        </button>
      </header>

      <main style={{ maxWidth: 560, margin: '0 auto', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            <span>Progresso da rota</span>
            <span className="num">{entregues.length} de {ENTREGAS.length}</span>
          </div>
          <ProgressBar value={entregues.length} max={ENTREGAS.length} tone={restantes === 0 ? 'success' : 'accent'} label="Entregas concluídas" />
        </div>

        {ENTREGAS.map((e) => {
          const ok = entregues.includes(e.num);
          return (
            <Card key={e.num}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 'var(--weight-bold)', fontSize: 'var(--text-md)' }}>{e.cliente}</span>
                      <span className="num" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{e.num}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      <Icon name="map-pin" size={14} />
                      {e.endereco}
                    </div>
                  </div>
                  {ok ? <Badge tone="entregue" /> : <Money value={e.total} />}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', padding: 'var(--space-2) var(--space-3)', background: 'var(--surface-inset)', borderRadius: 'var(--radius-sm)' }}>
                  {e.itens}
                </div>
                {!ok ? (
                  <Button icon="check" fullWidth onClick={() => done(e.num)}>Marcar como entregue</Button>
                ) : null}
              </div>
            </Card>
          );
        })}

        {restantes === 0 ? (
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-2)', justifyContent: 'center',
              padding: 'var(--space-4)', borderRadius: 'var(--radius-md)',
              background: 'var(--success-soft)', color: 'var(--text-positive)', fontWeight: 'var(--weight-semibold)',
            }}
          >
            <Icon name="party-popper" size={18} />
            Rota concluída! Boa viagem de volta.
          </div>
        ) : null}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
          <Spinner size={12} />
          Atualização em tempo real — novas entregas aparecem automaticamente
        </div>
      </main>
    </div>
  );
}
