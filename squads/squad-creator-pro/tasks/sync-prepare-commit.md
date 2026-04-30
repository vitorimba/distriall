# Task: Sync Prepare Commit

| Field | Value |
|-------|-------|
| **Task ID** | sync-prepare-commit |
| **Version** | 1.0.0 |
| **Executor** | Worker |
| **Execution Type** | Deterministic |
| **Estimated Time** | 2 min (all projects) |

## Purpose

Auto-commit mudanças não-commitadas em `.claude/` de TODOS os projetos ANTES do sync.
Sem commit → sync sobrescreve e mudanças somem pra sempre.
Com commit → dev pode recuperar via `git log` qualquer momento.

**Idempotente:** Se não tem uncommitted, skip. Se não tem git, skip.

## Inputs

| Parameter | Type | Required | Default |
|-----------|------|----------|---------|
| `projects_base` | string | Yes | `from .aiox/sync-config.yaml → projects_base` |

## Steps

Para CADA projeto em projects_base (exceto aiox):

### 1. Verificar se tem git

```bash
if [ ! -d "{project}/.git" ]; then
  echo "SKIP: {project} — sem git"
  continue
fi
```

### 2. Verificar se tem uncommitted em .claude/

```bash
cd "{project}"
CHANGES=$(git diff --name-only .claude/ 2>/dev/null | wc -l | tr -d ' ')
UNTRACKED=$(git ls-files --others --exclude-standard .claude/ 2>/dev/null | wc -l | tr -d ' ')
TOTAL=$((CHANGES + UNTRACKED))

if [ "$TOTAL" -eq 0 ]; then
  echo "SKIP: {project} — .claude/ limpo"
  continue
fi
```

### 3. Stage + Commit

```bash
cd "{project}"

# Stage APENAS .claude/ (não tocar no resto do projeto)
git add .claude/

# Commit com mensagem padronizada
git commit -m "chore: pre-sync snapshot of .claude/ config

Auto-commit by sync-prepare before AIOX template sync.
Preserves local changes for recovery if needed.
Files: ${TOTAL} changed in .claude/

Co-Authored-By: AIOX Sync <noreply@aiox.dev>"

echo "COMMITTED: {project} — ${TOTAL} files in .claude/"
```

### 4. NÃO fazer push

```
REGRA: Commit LOCAL apenas. NUNCA push.
O dev decide quando fazer push.
```

## Output

```yaml
commit_result:
  projects_processed: N
  committed: 
    - {project: "bmpro", files: 18, commit_hash: "abc123"}
    - {project: "licitationpro", files: 33, commit_hash: "def456"}
  skipped_clean: [list]   # sem uncommitted
  skipped_no_git: [list]  # sem .git/
```

## Veto Conditions

| ID | Check | Action |
|----|-------|--------|
| CM_001 | Tentativa de git push | BLOCK — commit local only |
| CM_002 | Tentativa de commitar fora de .claude/ | BLOCK — scope é só .claude/ |
| CM_003 | Projeto sem .git/ | SKIP (não é erro, projeto pode não usar git) |

## Acceptance Criteria

- [ ] Todos projetos com git + uncommitted em .claude/ recebem commit
- [ ] Mensagem padronizada com contagem de files
- [ ] NENHUM push executado
- [ ] NENHUM arquivo fora de .claude/ commitado
- [ ] Projetos sem git skipados sem erro
