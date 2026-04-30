<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: policy-validator-check-coverage
  task_name: Check Coverage
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
task: checkCoverage()
responsavel: "@policy-validator"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: policy_data
    tipo: object
    origem: validateRls output or SQL
    obrigatorio: true

Saida:
  - campo: coverage_matrix
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Build table × operation matrix"
  - "[ ] Calculate coverage percentage"
  - "[ ] Identify gaps"
  - "[ ] Output visual matrix"
---

# Check Policy Coverage

## Purpose

Generate a coverage matrix showing which tables have policies for which operations.

## Output

```
POLICY COVERAGE MATRIX
═══════════════════════════════════════
Table                | RLS | SEL | INS | UPD | DEL | Score
─────────────────────┼─────┼─────┼─────┼─────┼─────┼──────
voluntarios          |  ✗  |  ✗  |  ✗  |  ✗  |  ✗  | 0/5
user_profiles        |  ✓  |  ✓  |  ✓  |  ✓  |  ✓  | 5/5
quiz_rankings        |  ✓  |  ✓  |  ✗  |  ✗  |  ✓  | 3/5
user_achievements    |  ✓  |  ✓  |  ✗  |  ✗  |  ✗  | 2/5
─────────────────────┴─────┴─────┴─────┴─────┴─────┴──────
Overall coverage: 42% — FAIL (target: 100%)
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
