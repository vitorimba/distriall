<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: compliance-advisor-check-consent
  task_name: Check Consent
  status: active
  responsible_executor: 'compliance-advisor'
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
task: checkConsent()
responsavel: "@compliance-advisor"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: app_info
    tipo: string
    origem: App URL, code, or description
    obrigatorio: true

Saida:
  - campo: consent_findings
    tipo: array
    destino: Console / Shield
    persistido: false

Checklist:
  - "[ ] Check cookie/analytics consent banner"
  - "[ ] Check privacy policy presence and content"
  - "[ ] Check data processing terms"
  - "[ ] Check opt-out mechanism"
  - "[ ] Check data deletion request support"
  - "[ ] Generate findings"
---

# Check Consent Mechanisms

## Purpose

Verify consent mechanisms are properly implemented. Microsoft Clarity without consent was found in audited applications.

## Checks

| Item | Required | Violation Example |
|------|----------|------------------|
| Cookie banner before analytics | Yes | Clarity loads before consent |
| Privacy policy link | Yes | No link in footer |
| Opt-in (not opt-out) | Yes | Analytics active by default |
| Data deletion option | Yes | No way to request deletion |
| Consent record storage | Recommended | No audit trail of consent |

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
