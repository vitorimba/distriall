import React from 'react';
import { Card } from '../../components/data/Card';
import { Button } from '../../components/core/Button';
import { Icon } from '../../components/core/Icon';
import { Alert } from '../../components/core/Alert';
import { PageHeader } from '../../components/navigation/PageHeader';
import { Accordion } from '../../components/data/Accordion';

const COMPAT = [
  { nome: 'Chrome no Android', ok: true },
  { nome: 'Edge no Android', ok: true },
  { nome: 'Chrome no desktop (Windows / macOS)', ok: true },
  { nome: 'Safari no iOS', ok: false },
  { nome: 'Firefox', ok: false },
];

const FAQ = [
  {
    q: 'A impressora não aparece na lista de pareamento',
    a: 'Verifique se a impressora está ligada e em modo de pareamento (LED piscando). Mantenha-a a menos de 1 metro do aparelho e tente novamente.',
  },
  {
    q: 'O recibo sai em branco ou cortado',
    a: 'Confirme a largura do papel nas opções da impressora (58mm ou 80mm). Recibos cortados geralmente indicam configuração de largura errada.',
  },
  {
    q: 'A conexão cai durante a impressão',
    a: 'Bluetooth de baixa energia pode hibernar. Desative a economia de bateria para o navegador nas configurações do Android.',
  },
];

export function SettingsScreen() {
  const [conectada, setConectada] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 720 }}>
      <PageHeader title="Configurações" subtitle="Impressora e dispositivo" />

      <Card title="Impressora térmica">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flex: 1, minWidth: 220 }}>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, borderRadius: 'var(--radius-md)',
                background: conectada ? 'var(--success-soft)' : 'var(--surface-inset)',
                color: conectada ? 'var(--text-positive)' : 'var(--text-muted)',
              }}
            >
              <Icon name="printer" size={20} />
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 'var(--weight-semibold)' }}>
                <span
                  style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: conectada ? 'var(--success)' : 'var(--text-muted)',
                    flex: 'none',
                  }}
                ></span>
                {conectada ? 'Conectada — MPT-II (58mm)' : 'Desconectada'}
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 2 }}>
                {conectada ? 'Pronta para imprimir recibos via Bluetooth' : 'Pareie uma impressora Bluetooth para imprimir recibos'}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button
              variant={conectada ? 'outline' : 'primary'}
              icon={conectada ? 'bluetooth-off' : 'bluetooth'}
              onClick={() => setConectada((v) => !v)}
            >
              {conectada ? 'Desconectar' : 'Conectar'}
            </Button>
            <Button variant="outline" icon="file-text" disabled={!conectada}>Teste de impressão</Button>
          </div>
        </div>
      </Card>

      <Card title="Compatibilidade">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {COMPAT.map((c) => (
            <div key={c.nome} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: c.ok ? 'var(--text-positive)' : 'var(--text-negative)', display: 'inline-flex' }}>
                <Icon name={c.ok ? 'check' : 'x'} size={15} />
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>{c.nome}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-3)' }}>
          <Alert tone="warning" title="Safari e Firefox não suportam Web Bluetooth">
            Para imprimir recibos, use Chrome ou Edge no Android.
          </Alert>
        </div>
      </Card>

      <Card title="Solução de problemas" padded={false}>
        <Accordion items={FAQ.map((f) => ({ title: f.q, content: f.a }))} />
      </Card>

      <Card title="Solução de problemas" padded={false}>
        {FAQ.map((f, i) => (
          <div key={i} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)', width: '100%',
                padding: 'var(--space-3) var(--space-4)', background: 'none', border: 'none',
                cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)',
                fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)', textAlign: 'left',
              }}
            >
              <span style={{ flex: 1 }}>{f.q}</span>
              <span style={{ display: 'inline-flex', transition: 'transform 0.15s ease', transform: openFaq === i ? 'rotate(180deg)' : 'none', color: 'var(--text-muted)' }}>
                <Icon name="chevron-down" size={16} />
              </span>
            </button>
            {openFaq === i ? (
              <p style={{ margin: 0, padding: '0 var(--space-4) var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-normal)' }}>
                {f.a}
              </p>
            ) : null}
          </div>
        ))}
      </Card>
    </div>
  );
}
