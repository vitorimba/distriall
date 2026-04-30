# Task: Sync Prepare Markers

| Field | Value |
|-------|-------|
| **Task ID** | sync-prepare-markers |
| **Version** | 1.0.0 |
| **Executor** | Worker |
| **Execution Type** | Deterministic |
| **Estimated Time** | 2 min (all projects) |

## Purpose

Instalar markers TEMPLATE/PROJECT no CLAUDE.md de TODOS os projetos que não têm.
Sem markers → merge é impossível. Com markers → merge é determinístico.

**Idempotente:** Se markers já existem, skip. Pode rodar 100x sem problema.

## Inputs

| Parameter | Type | Required | Default |
|-----------|------|----------|---------|
| `projects_base` | string | Yes | `from .aiox/sync-config.yaml → projects_base` |
| `template_path` | string | Yes | `from .aiox/sync-config.yaml → template_path` |

## Steps

Para CADA projeto em projects_base (exceto aiox):

### 1. Projeto NÃO tem CLAUDE.md

```bash
if [ ! -f "{project}/.claude/CLAUDE.md" ]; then
  # Copiar template com markers já incluídos
  mkdir -p "{project}/.claude"
  cp "{template}/.claude/CLAUDE.md" "{project}/.claude/CLAUDE.md"
  # Append marker de projeto vazio
  cat >> "{project}/.claude/CLAUDE.md" << 'EOF'

<!-- PROJECT:START -->
<!-- Project-specific instructions below this line are PRESERVED during sync -->

<!-- PROJECT:END -->
EOF
  echo "CREATED: {project} — CLAUDE.md com markers"
fi
```

### 2. Projeto TEM CLAUDE.md mas SEM markers

```bash
if [ -f "{project}/.claude/CLAUDE.md" ]; then
  HAS_TEMPLATE=$(grep -c "<!-- TEMPLATE:START -->" "{project}/.claude/CLAUDE.md")
  HAS_PROJECT=$(grep -c "<!-- PROJECT:START -->" "{project}/.claude/CLAUDE.md")

  if [ "$HAS_TEMPLATE" -eq 0 ] && [ "$HAS_PROJECT" -eq 0 ]; then
    # Guardar conteúdo atual (pode ter customizações)
    CURRENT_CONTENT=$(cat "{project}/.claude/CLAUDE.md")

    # Ler template
    TEMPLATE_CONTENT=$(cat "{template}/.claude/CLAUDE.md")

    # Montar novo CLAUDE.md com markers
    cat > "{project}/.claude/CLAUDE.md" << ENDOFFILE
<!-- TEMPLATE:START -->
${TEMPLATE_CONTENT}
<!-- TEMPLATE:END -->

<!-- PROJECT:START -->
<!-- Project-specific instructions below this line are PRESERVED during sync -->
<!-- Original project content preserved below: -->

${CURRENT_CONTENT}
<!-- PROJECT:END -->
ENDOFFILE

    echo "MIGRATED: {project} — conteúdo antigo movido para PROJECT section"
  else
    echo "SKIP: {project} — markers já existem"
  fi
fi
```

### 3. Projeto TEM CLAUDE.md COM markers

```bash
echo "SKIP: {project} — já tem markers (idempotente)"
```

## Output

```yaml
markers_result:
  projects_processed: N
  created: [list]    # não tinham CLAUDE.md
  migrated: [list]   # tinham CLAUDE.md sem markers
  skipped: [list]    # já tinham markers
```

## Veto Conditions

| ID | Check | Action |
|----|-------|--------|
| MK_001 | Template CLAUDE.md não existe | BLOCK — não tem source |
| MK_002 | Projeto .claude/ não é gravável | SKIP projeto + WARN |

## Acceptance Criteria

- [ ] Todos os projetos com .claude/ têm CLAUDE.md com markers
- [ ] Conteúdo original dos projetos preservado na section PROJECT
- [ ] Template content na section TEMPLATE
- [ ] Idempotente — rodar 2x não duplica markers
