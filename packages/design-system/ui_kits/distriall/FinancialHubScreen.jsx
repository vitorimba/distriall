import React from 'react';
import { Card } from '../../components/data/Card';
import { Icon } from '../../components/core/Icon';
import { PageHeader } from '../../components/navigation/PageHeader';

const SECOES = [
  { id: 'settlements', icon: 'scale', titulo: 'Acertos', desc: 'Fechamento por período: faturamento, custos, despesas e lucro líquido.' },
  { id: 'expenses', icon: 'receipt', titulo: 'Despesas', desc: 'Lançamento e acompanhamento de despesas operacionais.' },
  { id: 'vouchers', icon: 'ticket', titulo: 'Vales', desc: 'Vales de clientes: pendentes, pagos e vencidos.' },
];

export function FinancialHubScreen({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <PageHeader title="Financeiro" subtitle="Acertos, despesas e vales" />
      <div className="da-grid da-grid--cols3">
        {SECOES.map((s) => (
          <Card key={s.id}>
            <button
              onClick={() => onNavigate && onNavigate(s.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-3)',
                width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', textAlign: 'left',
              }}
            >
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40, borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-soft)', color: 'var(--accent-fg)',
                }}
              >
                <Icon name={s.icon} size={20} />
              </span>
              <span style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--weight-bold)' }}>{s.titulo}</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-normal)' }}>{s.desc}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--accent-fg)' }}>
                Abrir
                <Icon name="arrow-right" size={14} />
              </span>
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
