# Task: Setup Bank Auth

| Field | Value |
|-------|-------|
| **Task ID** | setup-bank-auth |
| **Executor** | Agent (auth-architect) |
| **Execution Type** | Interactive |
| **Estimated Time** | 15-30 min |

## Inputs

- `bank`: string (required) — inter, sicoob, stone, xp
- `environment`: string (optional) — sandbox (default) ou production

## Steps

1. Identificar o banco alvo
2. Verificar pré-requisitos (conta PJ, portal dev, certificado)
3. Guiar criação de credenciais no portal do banco
4. Fornecer código de teste de token (curl + linguagem escolhida)
5. Validar que token foi obtido com sucesso
6. Documentar credenciais geradas (sem armazenar valores)

## Elicitation

```yaml
elicit: true
questions:
  - "Qual banco? (inter/sicoob/stone/xp)"
  - "Sandbox ou produção?"
  - "Já tem conta no portal de desenvolvedores do banco?"
  - "Linguagem de preferência? (Python/Node.js/curl)"
```

## Output

- Token de acesso obtido com sucesso
- Código de teste funcional (curl + linguagem)
- Checklist de credenciais geradas

## Veto Conditions

- Banco não suportado → BLOCK
- Tentativa de ir direto para produção sem sandbox → WARN (recomendar sandbox first)
- Credenciais hardcoded no código → BLOCK (usar env vars)

## Acceptance Criteria

- [ ] Token obtido com sucesso no ambiente escolhido
- [ ] Código de teste funcional fornecido
- [ ] Credenciais NÃO expostas no output
