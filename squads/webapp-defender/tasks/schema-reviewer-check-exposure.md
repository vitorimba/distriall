<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: schema-reviewer-check-exposure
  task_name: Check Schema Exposure
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
task: checkSchemaExposure()
responsavel: "@schema-reviewer"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: supabase_url
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: exposure_check
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Check if OpenAPI endpoint is accessible"
  - "[ ] Check if PostgREST hints are enabled"
  - "[ ] Check auth settings endpoint"
  - "[ ] Quantify exposed information"
  - "[ ] Generate restriction recommendations"
---

# Check Schema Exposure

## Purpose

Verify which API metadata endpoints are publicly accessible and what they reveal.

## Endpoints Checked

| Endpoint | Reveals | Severity |
|----------|---------|----------|
| `/rest/v1/` (OpenAPI) | Full schema | MEDIUM-HIGH |
| `/auth/v1/settings` | Auth configuration | LOW-MEDIUM |
| Error responses with hints | Function signatures | MEDIUM |

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
