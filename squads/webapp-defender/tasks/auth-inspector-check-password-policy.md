<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: auth-inspector-check-password-policy
  task_name: Check Password Policy
  status: active
  responsible_executor: 'auth-inspector'
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
task: checkPasswordPolicy()
responsavel: "@auth-inspector"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: auth_settings
    tipo: string
    origem: Supabase settings or app config
    obrigatorio: true

Saida:
  - campo: password_findings
    tipo: array
    destino: Console / Shield
    persistido: false

Checklist:
  - "[ ] Check minimum password length"
  - "[ ] Check complexity requirements"
  - "[ ] Check against common passwords list"
  - "[ ] Assess policy strength"
  - "[ ] Generate recommendations"
---

# Check Password Policy

## Purpose

Evaluate password policy strength. Default Supabase minimum is 6 characters — insufficient for production.

## Recommended Policy

| Setting | Minimum | Recommended |
|---------|---------|-------------|
| Length | 8 | 12+ |
| Uppercase | 1 | Required |
| Lowercase | 1 | Required |
| Numbers | 1 | Required |
| Special chars | 0 | Recommended |

## Fix

```
Supabase Dashboard > Authentication > Settings:
  Minimum password length: 12
```

For frontend enforcement, add client-side validation matching server policy.

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
