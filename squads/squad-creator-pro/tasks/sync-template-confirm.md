# Task: Sync Template Confirm Plan

| Field | Value |
|-------|-------|
| **Task ID** | sync-template-confirm |
| **Executor** | Agent |
| **Execution Type** | Interactive (elicit: true) |
| **Estimated Time** | 2 min |

## Purpose

Mostrar o plano de sync ao usuário e obter aprovação antes de executar.

## Elicitation (OBRIGATÓRIO)

```yaml
elicit: true
format: table + numbered_options
question: |
  Plano de sincronização:

  ┌─────────────── SYNC PLAN ───────────────────────────┐
  │ Project        │ L1   │ L2  │ L3  │ L4  │ L5   │ L6   │ L7         │
  │────────────────│──────│─────│─────│─────│──────│──────│────────────│
  │ {project}      │ {act}│{act}│{act}│{act}│{act} │{act} │{+N squads} │
  └─────────────────────────────────────────────────────┘

  Legenda: COPY=novo, UPD=atualizar, MRG=merge, OK=up-to-date, +N=squads novos

  Opções:
  1. Aprovar tudo — executar plano completo
  2. Selecionar projetos — escolher quais projetos
  3. Selecionar camadas — escolher quais camadas (ex: só L7 squads)
  4. Dry-run — ver o que seria feito sem executar
  5. Cancelar
```

## Steps

1. Renderizar tabela do sync_plan
2. Mostrar totais (projetos, arquivos, merges)
3. Perguntar ao usuário
4. Se "selecionar projetos": listar e deixar escolher
5. Se "selecionar camadas": listar L1-L7 e deixar escolher
6. Gerar approved_plan (subconjunto aprovado do sync_plan)

## Veto

- Executar sem confirmação (e force=false) → BLOCK
- Plano vazio (nada para sincronizar) → SKIP com mensagem "All up-to-date"
