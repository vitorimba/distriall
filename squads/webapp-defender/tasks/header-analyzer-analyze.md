<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: header-analyzer-analyze
  task_name: Analyze Headers
  status: active
  responsible_executor: 'header-analyzer'
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
task: analyzeHeaders()
responsavel: "@header-analyzer"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: headers
    tipo: string
    origem: HTTP response headers (pasted or from curl)
    obrigatorio: true

Saida:
  - campo: header_report
    tipo: object
    destino: Console / Config Sentinel
    persistido: false

Checklist:
  - "[ ] Parse response headers"
  - "[ ] Check each required security header"
  - "[ ] Deep-analyze CSP directives"
  - "[ ] Check for info disclosure headers"
  - "[ ] Score (pass/fail per header)"
  - "[ ] Generate fix config"
---

# Analyze HTTP Headers

## Purpose

Parse and evaluate HTTP response headers against security baseline. Output pass/fail for each header with fix recommendations.

## Output Format

```
HEADER ANALYSIS
═══════════════════════════════════════
✓ PASS  HSTS: max-age=31536000; includeSubDomains; preload
✗ FAIL  X-Content-Type-Options: MISSING
✗ FAIL  X-Frame-Options: MISSING
⚠ WARN  CSP: contains 'unsafe-inline'
✓ PASS  Referrer-Policy: strict-origin-when-cross-origin
✗ FAIL  Permissions-Policy: MISSING

Score: 2/6 headers present, 1 warning
Overall: MEDIUM risk
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
