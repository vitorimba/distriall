<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: compliance-advisor-generate-anpd-report
  task_name: Generate ANPD Report
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
task: generateAnpdReport()
responsavel: "@compliance-advisor"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: incident_details
    tipo: object
    origem: Audit findings with PII exposure
    obrigatorio: true

Saida:
  - campo: anpd_report
    tipo: markdown
    destino: File
    persistido: true

Checklist:
  - "[ ] Assess if notification is required (Art. 48)"
  - "[ ] Count affected data subjects"
  - "[ ] Classify data types exposed"
  - "[ ] Document timeline of exposure"
  - "[ ] Generate ANPD notification draft"
---

# Generate ANPD Notification Report

## Purpose

Assess whether an incident requires ANPD notification and generate the notification draft if needed.

## Notification Criteria (Art. 48)

```
REQUIRED if:
  ✓ Involves personal data
  ✓ May cause relevant risk/harm to data subjects
  ✓ Significant number of people OR sensitive data

Assessment:
  [ ] PII involved? → Type and count
  [ ] Publicly accessible? → Active exposure
  [ ] Sensitive data? → Psychometric, health, financial
  [ ] Vulnerable population? → Children, disaster victims
  [ ] Duration of exposure? → Since when
  [ ] Already fixed? → Current status
```

## Draft Structure

1. Identificacao do controlador
2. Encarregado (DPO) contato
3. Descricao do incidente
4. Dados pessoais afetados
5. Numero de titulares
6. Medidas adotadas
7. Riscos ao titular
8. Medidas de mitigacao

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
