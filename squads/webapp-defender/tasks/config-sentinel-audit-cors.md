<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: config-sentinel-audit-cors
  task_name: Audit CORS
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
task: auditCors()
responsavel: "@config-sentinel"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: cors_headers
    tipo: string
    origem: HTTP response headers or vercel.json
    obrigatorio: true

Saida:
  - campo: cors_findings
    tipo: array
    destino: Console / Shield
    persistido: false

Checklist:
  - "[ ] Check Access-Control-Allow-Origin value"
  - "[ ] Check Access-Control-Allow-Methods"
  - "[ ] Check Access-Control-Allow-Headers"
  - "[ ] Check Access-Control-Allow-Credentials"
  - "[ ] Check Access-Control-Max-Age"
  - "[ ] Flag wildcards and overly permissive configs"
  - "[ ] Generate CORS fix with specific domains"
---

# Audit CORS Configuration

## Purpose

Analyze CORS headers for security misconfigurations. Wildcard CORS was found in 100% of audited applications.

## Rules

| Check | PASS | FAIL |
|-------|------|------|
| Allow-Origin | Specific domain(s) | `*` wildcard |
| Allow-Credentials with wildcard | `false` or absent | `true` (browser blocks, but still misconfigured) |
| Allow-Methods | Only needed (GET, POST, OPTIONS) | All methods or `*` |
| Allow-Headers | Only needed | `*` |

## Fix Generation

For each FAIL, generate vercel.json or server config with specific allowed origins.

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
