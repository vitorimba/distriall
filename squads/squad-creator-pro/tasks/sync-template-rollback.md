# Task: Sync Template Rollback

| Field | Value |
|-------|-------|
| **Task ID** | sync-template-rollback |
| **Version** | 1.0.0 |
| **Executor** | Worker |
| **Execution Type** | Deterministic |
| **Estimated Time** | 2-5 min |
| **Phase** | 7 (Rollback — condicional) |

## Purpose

Restaurar projetos que falharam na validação para o estado pré-sync usando o backup criado na fase execute.

**TRIGGER:** Só executa se validation_result tem pelo menos 1 projeto com status FAIL.
Se todos PASS → esta task é SKIPPED.

## Preconditions

- [ ] Backup existe em `{project}/.aiox-backup/{date}/`
- [ ] validation_result disponível com lista de projetos FAIL

## Steps

### 1. Identificar Projetos com FAIL

```bash
# Ler validation_result e filtrar FAIL
FAILED_PROJECTS=$(echo "{validation_result}" | grep "FAIL" | awk '{print $1}')
```

### 2. Rollback por Projeto

Para cada projeto com FAIL:

```bash
backup_dir="{project}/.aiox-backup/{date}"

# Verificar que backup existe
test -d "$backup_dir" || { echo "ERRO: Backup não existe para $project — rollback impossível"; continue; }

# Restaurar .aiox-core/
if [ -d "$backup_dir/.aiox-core" ]; then
  rm -rf "{project}/.aiox-core"
  cp -r "$backup_dir/.aiox-core" "{project}/.aiox-core"
fi

# Restaurar .claude/
if [ -d "$backup_dir/.claude" ]; then
  rm -rf "{project}/.claude"
  cp -r "$backup_dir/.claude" "{project}/.claude"
fi

echo "ROLLBACK: $project restaurado do backup"
```

### 3. Verificar Rollback

```bash
# Verificar que projeto voltou ao estado anterior
test -d "{project}/.aiox-core" && echo "  .aiox-core/ OK"
test -f "{project}/.claude/settings.json" && echo "  settings.json OK"
test -f "{project}/.claude/settings.local.json" && echo "  settings.local.json OK (intacto)"
```

### 4. NÃO fazer rollback de squads

```
REGRA: Squads adicionados (novos) NÃO são removidos no rollback.
Só restaurar .aiox-core/ e .claude/.
Squads são aditivos — remover squad pode quebrar slash commands que o usuário já usou.
```

## Output

```yaml
rollback_result:
  triggered: true
  projects_rolled_back: N
  projects_no_backup: N
  details:
    - project: "nome"
      status: "rolled_back|no_backup|skipped"
      layers_restored: ["L1", "L2", "L3", "L4", "L5", "L6"]
```

## Veto Conditions

| ID | Check | Action |
|----|-------|--------|
| RB_001 | Backup não existe | WARN — rollback impossível, reportar |
| RB_002 | Tentativa de remover squads no rollback | BLOCK — squads são aditivos |

## Acceptance Criteria

- [ ] Apenas projetos FAIL recebem rollback
- [ ] Backup restaurado corretamente
- [ ] Squads NÃO removidos
- [ ] settings.local.json intacto após rollback
