# Task: Sync Template Execute

| Field | Value |
|-------|-------|
| **Task ID** | sync-template-execute |
| **Version** | 2.0.0 |
| **Executor** | Worker |
| **Execution Type** | Deterministic |
| **Estimated Time** | 5-15 min |

## Purpose

Executar o plano de sync aprovado, copiando/mergeando camadas do template para cada projeto.

## Preconditions (BLOQUEANTES)

- [ ] `preflight_result.verdict` == GO ou WARN-accepted
- [ ] `approved_plan` existe (usuário confirmou)
- [ ] Template path acessível

## Veto Conditions (BLOQUEIO FÍSICO)

| ID | Check | Action | Quando |
|----|-------|--------|--------|
| EXEC_001 | Backup criado e não-vazio | BLOCK execute | Antes de QUALQUER rsync/cp |
| EXEC_002 | never_sync paths ausentes dos comandos | BLOCK execute | Antes de QUALQUER rsync/cp |
| EXEC_003 | Idempotency — rodou há < 5min | WARN + pedir confirmação | Início da task |
| EXEC_004 | CLAUDE.md merge com markers | BLOCK merge | Se projeto tem CLAUDE.md sem markers → copiar template inteiro, WARN |
| EXEC_005 | settings.json merge produz JSON válido | BLOCK write | Após merge, antes de salvar |
| EXEC_006 | settings.local.json intocado | BLOCK execute | Verificar APÓS cada projeto |

### Implementação dos Vetos

```bash
# EXEC_001: Backup obrigatório
create_backup() {
  backup_dir="{project}/.aiox-backup/$(date +%Y%m%d-%H%M%S)"
  mkdir -p "$backup_dir"
  cp -r {project}/.aiox-core/ "$backup_dir/.aiox-core/" 2>/dev/null
  cp -r {project}/.claude/ "$backup_dir/.claude/" 2>/dev/null

  # BLOQUEIO: verificar que backup foi criado
  if [ ! -d "$backup_dir" ] || [ -z "$(ls -A $backup_dir 2>/dev/null)" ]; then
    echo "BLOCK: Backup falhou para $project — ABORTANDO este projeto"
    return 1
  fi
  echo "Backup criado: $backup_dir"
}

# EXEC_002: never_sync guard
verify_never_sync() {
  SACRED_FILES=("settings.local.json" ".env" "docs/stories" "packages" "src" "node_modules" ".git")
  for sacred in "${SACRED_FILES[@]}"; do
    if echo "$COMMAND" | grep -q "$sacred"; then
      echo "BLOCK: Comando tenta tocar em $sacred — ABORTANDO"
      return 1
    fi
  done
}

# EXEC_003: Idempotency check
check_idempotency() {
  LAST_RUN=$(stat -f %m {project}/.aiox-backup/ 2>/dev/null || echo 0)
  NOW=$(date +%s)
  DIFF=$((NOW - LAST_RUN))
  if [ "$DIFF" -lt 300 ]; then
    echo "WARN: Sync rodou há ${DIFF}s atrás. Rodar de novo?"
    # Requer confirmação se force=false
  fi
}

# EXEC_006: Post-execution sacred check
verify_sacred_untouched() {
  # settings.local.json NÃO pode ter mudado
  if [ -f "{project}/.aiox-backup/{date}/.claude/settings.local.json" ]; then
    BEFORE=$(md5 -q "{project}/.aiox-backup/{date}/.claude/settings.local.json" 2>/dev/null)
    AFTER=$(md5 -q "{project}/.claude/settings.local.json" 2>/dev/null)
    if [ "$BEFORE" != "$AFTER" ]; then
      echo "ALERT: settings.local.json FOI ALTERADO — iniciando rollback"
      return 1
    fi
  fi
}
```

## Steps (com vetos integrados)

Para cada projeto no approved_plan:

### 0. Pre-checks

```bash
check_idempotency  # EXEC_003
```

### 1. Backup (EXEC_001 — BLOQUEANTE)

```bash
create_backup || { echo "SKIP: $project (backup failed)"; continue; }
```

### 2. L1 — Framework Engine (overwrite)

```bash
rsync -av --delete \
  --exclude='node_modules/' \
  --exclude='*.local.*' \
  {template}/.aiox-core/ {project}/.aiox-core/
```

### 3. L2 — Claude Rules (overwrite)

```bash
rsync -av {template}/.claude/rules/ {project}/.claude/rules/
```

### 4. L3 — Claude Hooks (overwrite)

```bash
rsync -av {template}/.claude/hooks/ {project}/.claude/hooks/
```

### 5. L4 — Claude Commands (overwrite)

```bash
rsync -av --delete {template}/.claude/commands/ {project}/.claude/commands/
```

### 6. L5 — CLAUDE.md (MERGE com markers)

```bash
if [ ! -f "{project}/.claude/CLAUDE.md" ]; then
  # Projeto não tem → copiar template inteiro
  cp {template}/.claude/CLAUDE.md {project}/.claude/CLAUDE.md

elif grep -q "<!-- PROJECT:START -->" "{project}/.claude/CLAUDE.md"; then
  # Tem markers → merge inteligente
  # 1. Extrair seções PROJECT do arquivo atual
  PROJECT_SECTIONS=$(sed -n '/<!-- PROJECT:START -->/,/<!-- PROJECT:END -->/p' "{project}/.claude/CLAUDE.md")
  # 2. Copiar template
  cp {template}/.claude/CLAUDE.md {project}/.claude/CLAUDE.md
  # 3. Append seções PROJECT ao final
  echo "" >> {project}/.claude/CLAUDE.md
  echo "$PROJECT_SECTIONS" >> {project}/.claude/CLAUDE.md

else
  # Sem markers → WARN e copiar template (perde conteúdo local)
  echo "WARN: $project CLAUDE.md sem markers — copiando template inteiro"
  cp {template}/.claude/CLAUDE.md {project}/.claude/CLAUDE.md
fi
```

### 7. L6 — settings.json (MERGE)

```python
import json

template_settings = json.load(open("{template}/.claude/settings.json"))
project_settings = json.load(open("{project}/.claude/settings.json"))

# MERGE rules:
merged = template_settings.copy()

# allowedTools: UNION
merged["allowedTools"] = list(set(
    template_settings.get("allowedTools", []) +
    project_settings.get("allowedTools", [])
))

# env: PRESERVAR do projeto
if "env" in project_settings:
    merged["env"] = project_settings["env"]

# permissions do projeto: PRESERVAR
for key in ["customPermissions", "projectPermissions"]:
    if key in project_settings:
        merged[key] = project_settings[key]

# EXEC_005: validar JSON antes de salvar
try:
    json.dumps(merged)  # parseable?
    with open("{project}/.claude/settings.json", "w") as f:
        json.dump(merged, f, indent=2)
except:
    print("BLOCK: Merged settings.json inválido — rollback")
```

### 8. L7 — Squads (overwrite per squad, PRESERVAR locais)

```bash
for squad in {template}/squads/*/; do
  squad_name=$(basename "$squad")
  [ "$squad_name" = "index.js" ] && continue
  [ "$squad_name" = "README.md" ] && continue

  if [ -d "{project}/squads/$squad_name" ]; then
    # Squad existe no projeto — verificar se é do template ou local
    # Preservar arquivos que existem no projeto mas NÃO no template
    LOCAL_ONLY=$(comm -23 \
      <(cd "{project}/squads/$squad_name" && find . -type f | sort) \
      <(cd "$squad" && find . -type f | sort) \
    )

    # Backup dos arquivos locais
    for local_file in $LOCAL_ONLY; do
      mkdir -p "{project}/squads/$squad_name/.local-preserve/$(dirname $local_file)"
      cp "{project}/squads/$squad_name/$local_file" "{project}/squads/$squad_name/.local-preserve/$local_file"
    done

    # Overwrite com template
    rsync -av --delete "$squad/" "{project}/squads/$squad_name/"

    # Restaurar arquivos locais
    if [ -d "{project}/squads/$squad_name/.local-preserve" ]; then
      cp -r "{project}/squads/$squad_name/.local-preserve/"* "{project}/squads/$squad_name/" 2>/dev/null
      rm -rf "{project}/squads/$squad_name/.local-preserve"
    fi
  else
    # Squad novo — copiar inteiro
    cp -r "$squad" "{project}/squads/$squad_name"
  fi
done

# NÃO remover squads do projeto que não existem no template
```

### 9. Post-execution Sacred Check (EXEC_006)

```bash
verify_sacred_untouched || { echo "ALERT: Iniciando rollback de $project"; rollback "$project"; }
```

### 10. Log

```yaml
sync_log:
  project: "{project_name}"
  timestamp: "..."
  layers_synced: [L1, L2, L3, L4, L5, L6, L7]
  backup_path: "{backup_dir}"
  squads_added: [list]
  squads_updated: [list]
  squads_preserved_local: [list]
  merge_performed: [L5, L6]
  sacred_check: PASS|FAIL
```

## Obrigações (NON-NEGOTIABLE)

- [ ] **BACKUP antes de QUALQUER overwrite** — EXEC_001 bloqueia se falhar
- [ ] **NEVER touch never_sync paths** — EXEC_002 bloqueia se detectar
- [ ] **Idempotency check** — EXEC_003 avisa se rodou recentemente
- [ ] **CLAUDE.md merge com markers** — EXEC_004 usa markers ou copia template
- [ ] **settings.json merge produz JSON válido** — EXEC_005 bloqueia se inválido
- [ ] **settings.local.json INTOCADO** — EXEC_006 faz rollback se alterado
- [ ] **Squads locais preservados** — L7 não remove squads que não existem no template
- [ ] **Log de cada ação** em sync-log
- [ ] **Tratar erros sem parar** — log + continue com próximo projeto

## Acceptance Criteria

- [ ] Todos os veto conditions implementados como bloqueios físicos
- [ ] Backup verificável antes de cada projeto
- [ ] never_sync paths intactos pós-execução
- [ ] Merge de CLAUDE.md preservou seções PROJECT
- [ ] Merge de settings.json preservou env e permissions locais
- [ ] Squads locais preservados
- [ ] Log completo gerado
