# Task: Setup Billing

| Field | Value |
|-------|-------|
| **Task ID** | setup-billing |
| **Executor** | Agent ({banco}-specialist) |
| **Execution Type** | Interactive |
| **Estimated Time** | 15-30 min |

## Inputs

- `bank`: string (required) — inter, sicoob
- `billing_type`: string (required) — boleto, pix_cobranca
- `pagador`: object (required) — {cpfCnpj, nome}

## Steps

1. Verificar auth + escopo de cobrança
2. Identificar tipo (boleto ou Pix cobrança)
3. Fornecer código para emissão
4. Incluir consulta de status e PDF (se boleto)
5. Testar no sandbox

## Veto Conditions

- Stone não emite boleto próprio → WARN (pode pagar boletos de outros bancos)
- XP não tem cobrança → BLOCK

## Acceptance Criteria

- [ ] Cobrança criada com sucesso no sandbox
- [ ] PDF ou QR code gerado
- [ ] Status consultável
