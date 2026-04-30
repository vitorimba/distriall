# Task: Normalize Bank Data

| Field | Value |
|-------|-------|
| **Task ID** | normalize-bank-data |
| **Executor** | Agent (data-normalizer) |
| **Execution Type** | Interactive |
| **Estimated Time** | 10-20 min |

## Inputs

- `banks`: list (required) — quais bancos normalizar
- `data_type`: string (required) — extrato, saldo, transacoes
- `raw_data`: object (optional) — dados brutos para normalizar

## Steps

1. Identificar bancos envolvidos
2. Aplicar mapping rules por banco (reais→centavos, datas→ISO8601)
3. ATENÇÃO: Stone Online já usa centavos — NÃO multiplicar por 100
4. Classificar transações por categoria unificada
5. Merge e ordenar por data
6. Fornecer código de normalização

## Veto Conditions

- Float para valores monetários → BLOCK (usar integer centavos)
- Stone centavos * 100 → BLOCK (já é centavos)

## Acceptance Criteria

- [ ] Schema TypeScript UnifiedTransaction aplicado
- [ ] Valores em centavos (integer)
- [ ] Datas em ISO 8601 UTC
- [ ] Categoria classificada ou 'other'
