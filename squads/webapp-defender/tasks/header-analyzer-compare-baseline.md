<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: header-analyzer-compare-baseline
  task_name: Compare Baseline
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
task: compareBaseline()
responsavel: "@header-analyzer"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: current_headers
    tipo: string
    origem: HTTP response headers
    obrigatorio: true
  - campo: baseline
    tipo: string
    origem: Previous scan or standard baseline
    obrigatorio: false

Saida:
  - campo: comparison
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Parse current headers"
  - "[ ] Load baseline (default if not provided)"
  - "[ ] Compare each header"
  - "[ ] Identify regressions"
  - "[ ] Identify improvements"
  - "[ ] Output diff"
---

# Compare Headers Against Baseline

## Purpose

Compare current headers against a previous scan or standard baseline to detect regressions or improvements.

## Default Baseline

If no baseline provided, uses the OWASP recommended headers set. Useful for first-time audits.

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
