# Task: Sync Template Report

| Field | Value |
|-------|-------|
| **Task ID** | sync-template-report |
| **Executor** | Worker |
| **Execution Type** | Deterministic |
| **Estimated Time** | 1 min |

## Purpose

Gerar relatório consolidado do sync e salvar em outputs/.

## Steps

1. Consolidar sync_result + validation_result
2. Renderizar tabela por projeto com status
3. Calcular totais (projetos, arquivos, merges, erros)
4. Salvar em `outputs/sync-reports/sync-{date}.md`

## Output

```markdown
# Sync Template Report — {date}

Template: aiox
Projects synced: {N}/{total}
Layers: {list}

| Project | Status | L1 | L2 | L3 | L4 | L5 | L6 | L7 | Squads +/- |
|---------|--------|----|----|----|----|----|----|----|-----------:|

Totals:
  Files copied: N
  Merges performed: N
  Backups created: N
  Errors: N
```
