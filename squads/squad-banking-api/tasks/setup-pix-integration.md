# Task: Setup Pix Integration

| Field | Value |
|-------|-------|
| **Task ID** | setup-pix-integration |
| **Executor** | Agent ({banco}-specialist) |
| **Execution Type** | Interactive |
| **Estimated Time** | 15-30 min |

## Inputs

- `bank`: string (required) — inter, sicoob, stone
- `direction`: string (required) — receive, send, both
- `webhook_url`: string (optional) — URL para notificações

## Steps

1. Verificar auth configurado + escopo Pix ativo
2. Identificar banco e direção (envio, recebimento, ambos)
3. Fornecer código para criar cobrança Pix (se receive)
4. Fornecer código para enviar Pix (se send)
5. Configurar webhook se URL fornecida
6. Testar com transação de R$ 0,01 no sandbox

## Veto Conditions

- XP não tem Pix operacional → BLOCK (redirecionar para alternativa)
- Webhook sem HTTPS → BLOCK

## Acceptance Criteria

- [ ] Cobrança Pix criada com sucesso (QR code gerado)
- [ ] Webhook configurado e respondendo 200 OK
- [ ] Código funcional em Node.js ou Python
