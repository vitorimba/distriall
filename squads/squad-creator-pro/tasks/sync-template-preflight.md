# Task: Sync Template Pre-Flight

| Field | Value |
|-------|-------|
| **Task ID** | sync-template-preflight |
| **Version** | 1.0.0 |
| **Executor** | Worker |
| **Execution Type** | Deterministic |
| **Estimated Time** | 1 min |
| **Phase** | 0 (Pre-Flight) |

## Purpose

Verificar que TODAS as condições estão prontas ANTES de iniciar o sync.
Se qualquer condição falhar → BLOCK. Não existe "vamos tentar".

## Steps

### 1. Validar Template

```bash
# Template é AIOX?
test -d "{template_path}/.aiox-core" || BLOCK "Template não é AIOX — .aiox-core/ não existe"
test -f "{template_path}/.claude/CLAUDE.md" || BLOCK ".claude/CLAUDE.md não existe no template"
test -f "{template_path}/.claude/settings.json" || BLOCK "settings.json não existe no template"
test -d "{template_path}/squads" || BLOCK "squads/ não existe no template"
```

### 2. Validar Destino

```bash
# projects_base existe?
test -d "{projects_base}" || BLOCK "projects_base não existe: {projects_base}"

# Pelo menos 1 projeto além do aiox?
PROJECT_COUNT=$(ls -d {projects_base}*/ 2>/dev/null | grep -v "/aiox/" | wc -l)
[ "$PROJECT_COUNT" -gt 0 ] || BLOCK "Nenhum projeto encontrado em {projects_base}"
```

### 3. Verificar Permissões

```bash
# Gravável?
for p in {projects_base}*/; do
  name=$(basename "$p")
  [ "$name" = "aiox" ] && continue
  test -w "$p" || WARN "Sem permissão de escrita em: $name"
done
```

### 4. Verificar Uncommitted Changes

```bash
# Projetos com mudanças não commitadas em .claude/?
for p in {projects_base}*/; do
  name=$(basename "$p")
  [ "$name" = "aiox" ] && continue
  test -d "$p/.git" || continue
  CHANGES=$(cd "$p" && git diff --name-only .claude/ 2>/dev/null | wc -l)
  [ "$CHANGES" -gt 0 ] && WARN "$name tem $CHANGES mudanças não commitadas em .claude/"
done
```

### 5. Verificar CLAUDE.md Markers (para merge)

```bash
# Se projeto tem CLAUDE.md, tem markers para merge?
for p in {projects_base}*/; do
  name=$(basename "$p")
  [ "$name" = "aiox" ] && continue
  [ -f "$p/.claude/CLAUDE.md" ] || continue
  HAS_TEMPLATE_MARKER=$(grep -c "<!-- TEMPLATE:START -->" "$p/.claude/CLAUDE.md" 2>/dev/null)
  HAS_PROJECT_MARKER=$(grep -c "<!-- PROJECT:START -->" "$p/.claude/CLAUDE.md" 2>/dev/null)
  [ "$HAS_TEMPLATE_MARKER" -eq 0 ] && WARN "$name: CLAUDE.md sem markers TEMPLATE — merge vai tratar como template-only"
done
```

## Output

```yaml
preflight_result:
  template_valid: true|false
  projects_base_valid: true|false
  projects_found: N
  projects_writable: N
  projects_with_uncommitted: [list]
  projects_without_markers: [list]
  verdict: "GO|BLOCK|WARN"
  blocks: [list of blocking issues]
  warnings: [list of warnings]
```

## Veto Conditions

| ID | Check | Action |
|----|-------|--------|
| PF_001 | Template não é AIOX | BLOCK — abortar |
| PF_002 | projects_base não existe | BLOCK — abortar |
| PF_003 | Zero projetos encontrados | BLOCK — abortar |
| PF_004 | Projeto sem permissão escrita | WARN — listar e perguntar se continua sem ele |
| PF_005 | Projeto com uncommitted em .claude/ | WARN — listar e recomendar commit antes |
| PF_006 | CLAUDE.md sem markers | WARN — merge vai tratar como template-only |

## Acceptance Criteria

- [ ] Template validado como AIOX
- [ ] Projetos escaneados com permissões
- [ ] Uncommitted changes detectados
- [ ] CLAUDE.md markers verificados
- [ ] Verdict emitido (GO/BLOCK/WARN)
