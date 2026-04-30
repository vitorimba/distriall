# Task: Debug Integration

| Field | Value |
|-------|-------|
| **Task ID** | debug-integration |
| **Executor** | Agent (integration-debugger) |
| **Execution Type** | Interactive |
| **Estimated Time** | 10-30 min |

## Inputs

- `bank`: string (required) — inter, sicoob, stone, xp
- `error_code`: integer (optional) — HTTP status code
- `error_message`: string (optional) — mensagem de erro
- `endpoint`: string (optional) — endpoint que falhou
- `frequency`: string (optional) — sempre, intermitente, primeira vez

## Steps

1. Coletar evidências (status code, body, headers, timestamp)
2. Classificar tipo de erro (auth, payload, rate limit, server, data)
3. Consultar tabela de erros cross-bank
4. Se auth issue → rotear para @auth-architect
5. Testar hipótese com curl mínimo (isolado)
6. Fornecer fix com código
7. Recomendar prevenção (monitoramento, alertas)

## Elicitation

```yaml
elicit: true
questions:
  - "Qual banco?"
  - "Qual o status code HTTP? (401, 403, 429, 500...)"
  - "Qual a mensagem de erro completa?"
  - "Qual endpoint estava chamando?"
  - "Sempre dá erro ou é intermitente?"
  - "Mudou algo recentemente? (deploy, certificado, versão)"
```

## Output

- Diagnóstico com causa raiz
- Fix com código funcional
- Curl de teste para verificar fix
- Recomendação de prevenção

## Veto Conditions

- Desabilitar SSL verify como "fix" → BLOCK (inseguro)
- Retry infinito sem backoff → BLOCK (piora rate limit)

## Acceptance Criteria

- [ ] Causa raiz identificada
- [ ] Fix funcional fornecido
- [ ] Curl de teste para verificar
- [ ] Prevenção recomendada
