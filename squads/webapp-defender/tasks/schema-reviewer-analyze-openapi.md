<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: schema-reviewer-analyze-openapi
  task_name: Analyze OpenAPI
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
task: analyzeOpenapi()
responsavel: "@schema-reviewer"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: openapi_json
    tipo: string
    origem: OpenAPI schema JSON
    obrigatorio: true

Saida:
  - campo: schema_analysis
    tipo: object
    destino: Console / Config Sentinel
    persistido: false

Checklist:
  - "[ ] Count definitions/tables"
  - "[ ] Count paths/endpoints"
  - "[ ] Identify PII tables"
  - "[ ] Identify destructive operations"
  - "[ ] List exposed RPCs with signatures"
  - "[ ] Assess exposure severity"
---

# Analyze OpenAPI Schema

## Purpose

Deep analysis of an OpenAPI schema to quantify information disclosure and identify high-risk exposures.

## Metrics Extracted

- Total tables/definitions exposed
- Total paths/endpoints
- PII-related tables (name, email, phone patterns)
- Destructive RPCs (delete, drop, remove patterns)
- Admin-only tables visible to public
- Function parameter types revealed

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
