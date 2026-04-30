<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: policy-validator-detect-gaps
  task_name: Detect Gaps
  status: active
  responsible_executor: 'policy-validator'
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
task: detectGaps()
responsavel: "@policy-validator"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: coverage_matrix
    tipo: object
    origem: checkCoverage output
    obrigatorio: true

Saida:
  - campo: gap_report
    tipo: array
    destino: Console / Fix Generator
    persistido: false

Checklist:
  - "[ ] Identify all tables with RLS disabled"
  - "[ ] Identify all missing operation policies"
  - "[ ] Prioritize by PII sensitivity"
  - "[ ] Generate fix requests for Fix Generator"
---

# Detect Policy Gaps

## Purpose

From the coverage matrix, extract all gaps and prioritize them for remediation. Feeds results to Fix Generator for SQL generation.

## Priority Order

1. Tables with PII + no RLS → CRITICAL
2. Tables with PII + partial coverage → HIGH
3. Tables without PII + no RLS → MEDIUM
4. Tables with permissive policies → MEDIUM
5. Missing FORCE ROW LEVEL SECURITY → LOW

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
