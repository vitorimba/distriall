import React from 'react';
import { Button } from '../../components/core/Button';
import { Field } from '../../components/forms/Field';
import { Input } from '../../components/forms/Input';

export function LoginScreen({ logoSrc, onLogin }) {
  const [error, setError] = React.useState(false);
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-5)',
        background:
          'var(--grad-glow), var(--surface-page)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 380,
          background: 'var(--surface-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          boxShadow: 'var(--shadow-raised)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-2)' }}>
          {logoSrc ? (
            <img src={logoSrc} alt="DistriAll Distribuidora" style={{ height: 56 }} />
          ) : (
            <span className="da-wordmark" style={{ fontSize: 28 }}>
              DISTRI<span className="da-wordmark__all">ALL</span>
            </span>
          )}
        </div>
        <Field label="Email">
          <Input type="email" icon="mail" placeholder="voce@distriall.com.br" invalid={error} />
        </Field>
        <Field label="Senha" error={error ? 'Email ou senha inválidos. Tente novamente.' : undefined}>
          <Input type="password" icon="lock" placeholder="••••••••" invalid={error} />
        </Field>
        <Button fullWidth size="lg" onClick={onLogin}>
          Entrar
        </Button>
        <button
          onClick={() => setError(!error)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: 'var(--text-sm)',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
          }}
        >
          Esqueci minha senha
        </button>
      </div>
    </div>
  );
}
