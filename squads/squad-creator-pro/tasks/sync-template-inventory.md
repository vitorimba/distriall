# Task: Sync Template Inventory

| Field | Value |
|-------|-------|
| **Task ID** | sync-template-inventory |
| **Executor** | Worker |
| **Execution Type** | Deterministic |
| **Estimated Time** | 2 min |

## Purpose

Mapear TUDO que existe no template AIOX por camada (L1-L7).

## Steps

1. Para cada camada (L1-L7), contar arquivos e calcular timestamp mais recente
2. Para L7 (squads), listar cada squad com versão e contagem de componentes
3. Gerar `template_manifest.yaml`

## Output

```yaml
template_manifest:
  template_path: "from .aiox/sync-config.yaml → template_path"
  timestamp: "2026-04-14T..."
  layers:
    L1: {path: ".aiox-core/", files: N, last_modified: "..."}
    L2: {path: ".claude/rules/", files: N, last_modified: "..."}
    L3: {path: ".claude/hooks/", files: N, last_modified: "..."}
    L4: {path: ".claude/commands/", dirs: N, last_modified: "..."}
    L5: {path: ".claude/CLAUDE.md", exists: true, last_modified: "..."}
    L6: {path: ".claude/settings.json", exists: true, last_modified: "..."}
    L7:
      path: "squads/"
      total_squads: N
      squads:
        - {name: "squad-banking-api", version: "1.0.0", agents: 8, tasks: 7}
        - ...
```

## Veto

- Template path não existe → BLOCK
- .aiox-core/ não existe no template → BLOCK (não é AIOX)
