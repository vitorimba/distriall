<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: auth-inspector-check-signup-config
  task_name: Check Signup Config
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
task: checkSignupConfig()
responsavel: "@auth-inspector"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: auth_settings
    tipo: string
    origem: Supabase auth settings
    obrigatorio: true

Saida:
  - campo: signup_findings
    tipo: array
    destino: Console / Shield
    persistido: false

Checklist:
  - "[ ] Check if signup is open or restricted"
  - "[ ] Check email confirmation setting"
  - "[ ] Check allowed email domains"
  - "[ ] Check if auto-confirm is enabled"
  - "[ ] Assess risk level"
  - "[ ] Generate fix"
---

# Check Signup Configuration

## Purpose

Verify signup settings are appropriately restrictive. Open signup with auto-confirm was found in multiple audited apps.

## Risk Matrix

| Signup Open | Auto-Confirm | Risk |
|-------------|-------------|------|
| Yes | Yes | **HIGH** — Anyone creates verified accounts instantly |
| Yes | No | MEDIUM — Accounts created but unverified |
| No (invite) | N/A | LOW — Only invited users |

## Fix

```
Supabase Dashboard > Authentication > Settings:
  ✗ "Allow new users to sign up" → OFF
  ✓ "Enable email confirmations" → ON
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
