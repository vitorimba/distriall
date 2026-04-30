# Task: Extract Financial Data

| Field | Value |
|-------|-------|
| **Task ID** | extract-financial-data |
| **Executor** | Agent ({banco}-specialist) |
| **Execution Type** | Interactive |
| **Estimated Time** | 10-20 min |

## Inputs

- `bank`: string (required) — inter, sicoob, stone, xp
- `data_type`: string (required) — extrato, saldo, transacoes, posicao
- `date_range`: object (optional) — {inicio, fim}
- `auth_configured`: boolean (required) — MUST be true

## Steps

1. Verificar que auth está configurado (auth_configured == true)
2. Identificar banco e tipo de dado
3. Rotear para o specialist correto
4. Fornecer código funcional para extração (Node.js + Python)
5. Incluir tratamento de paginação se aplicável
6. Oferecer normalização via @data-normalizer se multi-banco

## Elicitation

```yaml
elicit: true
questions:
  - "Qual banco?"
  - "Que tipo de dado? (extrato/saldo/transações/posição)"
  - "Período? (ex: últimos 30 dias)"
  - "Auth já configurado? (precisa de token válido)"
  - "Precisa normalizar com dados de outros bancos?"
```

## Output

- Código funcional para extração (Node.js + Python)
- Exemplo de response esperado
- Notas sobre paginação e rate limits

## Veto Conditions

- auth_configured == false → BLOCK (rotear para setup-bank-auth primeiro)
- data_type não disponível no banco → WARN (XP não tem extrato bancário, tem posição)

## Acceptance Criteria

- [ ] Código funcional fornecido em pelo menos 1 linguagem
- [ ] Paginação tratada se endpoint retorna listas
- [ ] Rate limit documentado
- [ ] Formato de resposta exemplificado
