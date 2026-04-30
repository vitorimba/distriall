<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: shield-audit-report
  task_name: Audit Report
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
task: auditReport()
responsavel: "@shield"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: app_name
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: findings
    tipo: array
    origem: Audit results
    obrigatorio: true
  - campo: roadmap
    tipo: markdown
    origem: generateRoadmap output
    obrigatorio: false

Saida:
  - campo: report
    tipo: markdown
    destino: File (assets/audits/)
    persistido: true

Checklist:
  - "[ ] Collect all findings from agents"
  - "[ ] Generate executive summary"
  - "[ ] Include OWASP/NIST mapping"
  - "[ ] Include LGPD assessment"
  - "[ ] Attach remediation roadmap"
  - "[ ] Output final report"
---

# Generate Audit Report

## Purpose

Consolidate all findings from a passive security audit into a structured report with executive summary, detailed findings, compliance mapping, and remediation roadmap.

## Report Structure

1. **Executive Summary** — Score, finding count, PII impact
2. **Scope** — App, stack, methodology (passive only)
3. **Findings Table** — ID, title, severity, CVSS, OWASP, NIST
4. **Finding Details** — Description, evidence, impact, fix
5. **Compliance** — LGPD/OWASP/NIST mapping
6. **Remediation Roadmap** — Phased plan with effort estimates
7. **Conclusion** — Overall assessment and next steps

## Severity Scoring

Overall app score = highest active CVSS finding, adjusted by:
- Number of CRITICAL findings
- PII exposure scope
- Active breach status

## Constraints

- Report MUST be in PT-BR with proper accents
- Report MUST follow SAIOS template format
- Every finding MUST include remediation steps
- NEVER include intrusive test results (this is passive-only)

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
