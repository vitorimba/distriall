<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: schema-reviewer-generate-fix
  task_name: Generate Schema Fix
  status: active
  responsible_executor: 'schema-reviewer'
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
task: generateSchemaFix()
responsavel: "@schema-reviewer"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: exposure_findings
    tipo: array
    origem: Schema analysis results
    obrigatorio: true

Saida:
  - campo: fix_config
    tipo: string
    destino: Console / File
    persistido: true

Checklist:
  - "[ ] Generate PostgREST hint disable SQL"
  - "[ ] Generate API proxy recommendation"
  - "[ ] Generate schema restriction config"
---

# Generate Schema Restriction Fix

## Purpose

Generate configurations to restrict API schema exposure.

## Fixes

### Disable PostgREST Hints
```sql
ALTER ROLE authenticator SET pgrst.db_plan_enabled TO false;
NOTIFY pgrst, 'reload config';
```

### Server-Side Proxy (Vercel)
Recommend moving API calls through Vercel serverless functions to hide Supabase URL and schema from client.

### Restrict Schema Access
Configure API gateway or proxy to block OpenAPI schema endpoint for unauthenticated requests.

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
