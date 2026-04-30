<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: config-sentinel-audit-postgrest-hints
  task_name: Audit PostgREST Hints
  status: active
  responsible_executor: 'config-sentinel'
  execution_type: Worker
  estimated_time: 30m
  domain: Tactical
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

<!-- SINKRA_CONTRACT:START -->
```yaml
sinkra_contract:
  Domain: Tactical
  atomic_layer: Atom
  executor: Worker
  pre_condition: "inputs e dependencias resolvidos antes de iniciar."
  post_condition: "output principal gerado e pronto para handoff."
  performance: "executar dentro do SLA, registrar erro e escalar sem falha silenciosa."
```
<!-- SINKRA_CONTRACT:END -->

---
task: auditPostgrestHints()
responsavel: "@config-sentinel"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: api_responses
    tipo: string
    origem: API error responses or config
    obrigatorio: true

Saida:
  - campo: hints_findings
    tipo: array
    destino: Console / Shield
    persistido: false

Checklist:
  - "[ ] Check for hint/details fields in error responses"
  - "[ ] Count functions with exposed signatures"
  - "[ ] Assess information disclosure level"
  - "[ ] Generate disable config"
---

# Audit PostgREST Hints

## Purpose

Check if PostgREST hints are enabled, revealing function signatures and internal details in error messages.

## Detection

If API error responses contain `hint` or `details` fields with function signatures:
```json
{ "hint": "If a new function was created...", "details": "Searched for public.func_name..." }
```
→ Hints are ENABLED → Information disclosure

## Fix

```sql
ALTER ROLE authenticator SET pgrst.db_plan_enabled TO false;
NOTIFY pgrst, 'reload config';
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
