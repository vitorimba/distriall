<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: shield-generate-roadmap
  task_name: Generate Roadmap
  status: active
  responsible_executor: 'shield'
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
task: generateRoadmap()
responsavel: "@shield"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: prioritized_findings
    tipo: array
    origem: triageFindings output
    obrigatorio: true

Saida:
  - campo: roadmap
    tipo: markdown
    destino: Console / File
    persistido: true

Checklist:
  - "[ ] Group findings by phase (0-3)"
  - "[ ] Estimate effort per item"
  - "[ ] Assign responsible team/person"
  - "[ ] Generate timeline"
  - "[ ] Output roadmap document"
---

# Generate Remediation Roadmap

## Purpose

Transform prioritized findings into an actionable remediation roadmap with phases, effort estimates, and assignments.

## Phases

| Phase | Name | SLA | Criteria |
|-------|------|-----|----------|
| 0 | Emergency | 24-48h | CVSS >= 9.0 OR active PII breach |
| 1 | Urgent | 1-2 weeks | CVSS 7.0-8.9 OR auth/access control |
| 2 | Planned | 2-4 weeks | CVSS 4.0-6.9 OR configuration issues |
| 3 | Hardening | 3+ months | CVSS < 4.0 OR architectural improvements |

## Output Format

```markdown
# Remediation Roadmap — {app_name}
Generated: {date}

## Phase 0 — Emergency (24-48h)
Total effort: ~Xh

| # | Action | Effort | Finding | Owner |
|---|--------|--------|---------|-------|
| 1 | {action} | {time} | {id} | {who} |

## Phase 1 — Urgent (1-2 weeks)
...

## Phase 2 — Planned (2-4 weeks)
...

## Phase 3 — Hardening (3+ months)
...
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
