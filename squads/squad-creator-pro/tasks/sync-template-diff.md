# Task: Sync Template Compute Diff

| Field | Value |
|-------|-------|
| **Task ID** | sync-template-diff |
| **Executor** | Agent |
| **Execution Type** | Deterministic |
| **Estimated Time** | 3 min |

## Purpose

Calcular o diff entre template e cada projeto, determinando a ação por camada.

## Steps

1. Para cada projeto × camada, comparar template_manifest vs projects_manifest
2. Determinar ação:
   - `COPY` — camada não existe no projeto (nova instalação)
   - `UPDATE` — camada existe mas template é mais novo
   - `MERGE` — L5 (CLAUDE.md) e L6 (settings.json) requerem merge
   - `SKIP` — projeto já está atualizado
   - `ADD_SQUADS` — L7: novos squads para adicionar (não remover existentes)
3. Para L7, listar squads por ação: NEW / UPDATE / UP_TO_DATE
4. Gerar `sync_plan.yaml`

## Output

```yaml
sync_plan:
  generated: "2026-04-14T..."
  projects:
    - name: "avend"
      actions:
        L1: UPDATE
        L2: UPDATE
        L3: UPDATE
        L4: UPDATE
        L5: MERGE
        L6: MERGE
        L7:
          action: ADD_SQUADS
          new_squads: ["squad-banking-api", "squad-security"]
          update_squads: ["copy", "hormozi"]
          up_to_date: ["brand"]
      estimated_files: N
      estimated_time: "2 min"
```

## Veto

- Tentativa de calcular diff sem manifests → BLOCK
