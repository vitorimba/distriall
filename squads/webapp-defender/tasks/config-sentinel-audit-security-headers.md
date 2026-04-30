<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: config-sentinel-audit-security-headers
  task_name: Audit Security Headers
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
task: auditSecurityHeaders()
responsavel: "@config-sentinel"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: response_headers
    tipo: string
    origem: HTTP response headers or config file
    obrigatorio: true

Saida:
  - campo: header_findings
    tipo: array
    destino: Console / Shield
    persistido: false

Checklist:
  - "[ ] Check HSTS presence and config"
  - "[ ] Check X-Content-Type-Options"
  - "[ ] Check X-Frame-Options"
  - "[ ] Check CSP (analyze directives)"
  - "[ ] Check Referrer-Policy"
  - "[ ] Check Permissions-Policy"
  - "[ ] Check for information disclosure headers"
  - "[ ] Score and generate fixes"
---

# Audit Security Headers

## Purpose

Analyze HTTP response headers against security best practices. Generate findings for missing or misconfigured headers.

## Required Headers

| Header | Required Value | Severity if Missing |
|--------|---------------|-------------------|
| Strict-Transport-Security | `max-age=31536000; includeSubDomains; preload` | HIGH |
| X-Content-Type-Options | `nosniff` | MEDIUM |
| X-Frame-Options | `DENY` | MEDIUM |
| Content-Security-Policy | No unsafe-eval, minimal unsafe-inline | HIGH |
| Referrer-Policy | `strict-origin-when-cross-origin` | LOW |
| Permissions-Policy | Restrict unused features | LOW |

## CSP Deep Analysis

Flag these CSP directives:
- `unsafe-eval` → HIGH (XSS via eval)
- `unsafe-inline` in script-src → MEDIUM
- `*` wildcard → MEDIUM
- `data:` in script-src → MEDIUM
- Missing `frame-ancestors` → MEDIUM
- Missing `base-uri` → LOW

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
