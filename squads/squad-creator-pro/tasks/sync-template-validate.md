# Task: Sync Template Validate

| Field | Value |
|-------|-------|
| **Task ID** | sync-template-validate |
| **Executor** | Worker |
| **Execution Type** | Deterministic |
| **Estimated Time** | 3 min |

## Purpose

Validar que o sync foi executado corretamente em cada projeto.

## Checklist de Validação (por projeto)

### Presença

- [ ] `.aiox-core/` existe e tem estrutura do template
- [ ] `.claude/rules/` contém todos os `.md` do template
- [ ] `.claude/hooks/` contém todos os scripts do template
- [ ] `.claude/commands/` contém todos os squad dirs do template
- [ ] `.claude/CLAUDE.md` existe
- [ ] `.claude/settings.json` é JSON válido
- [ ] `squads/` contém os squads do plano

### Integridade

- [ ] `settings.json` é parseable como JSON
- [ ] `CLAUDE.md` contém seções do template + seções project-specific preservadas
- [ ] Squads novos têm `config.yaml` válido

### Não-regressão (SACRED)

- [ ] `settings.local.json` NÃO foi alterado
- [ ] `.env` NÃO foi alterado
- [ ] `node_modules/` NÃO foi alterado
- [ ] `docs/stories/` NÃO foi alterado
- [ ] `packages/` e `src/` NÃO foram alterados

## Output

```yaml
validation_result:
  projects:
    - name: "avend"
      status: "PASS"  # PASS / PARTIAL / FAIL
      checks_passed: 14
      checks_total: 14
      issues: []
    - name: "church"
      status: "PASS"
      checks_passed: 14
      checks_total: 14
      issues: []
```

## Veto

- settings.local.json foi alterado → ALERT (rollback do backup)
- .env foi alterado → ALERT (rollback do backup)
