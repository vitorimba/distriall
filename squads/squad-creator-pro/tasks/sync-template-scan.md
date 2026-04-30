# Task: Sync Template Scan Projects

| Field | Value |
|-------|-------|
| **Task ID** | sync-template-scan |
| **Executor** | Worker |
| **Execution Type** | Deterministic |
| **Estimated Time** | 2 min |

## Purpose

Mapear todos os projetos destino e seu estado atual por camada.

## Steps

1. Listar projetos em `projects_base` (excluir aiox = template)
2. Para cada projeto, verificar existência de cada camada
3. Para L7 (squads), listar squads instalados com versão
4. Classificar cada projeto: `full` / `partial` / `empty` / `never_installed`
5. Gerar `projects_manifest.yaml`

## Output

```yaml
projects_manifest:
  projects_base: "from .aiox/sync-config.yaml → projects_base"
  total_projects: N
  projects:
    - name: "avend"
      path: "from .aiox/sync-config.yaml → projects_baseavend"
      status: "partial"
      layers:
        L1: {exists: true, files: N}
        L2: {exists: true, files: N}
        L3: {exists: true, files: N}
        L4: {exists: true, dirs: N}
        L5: {exists: true}
        L6: {exists: true}
        L7: {exists: true, squads: 3, list: ["copy", "hormozi", "brand"]}
    - name: "church"
      status: "never_installed"
      layers:
        L1: {exists: false}
        ...
```

## Veto

- projects_base não existe → BLOCK
