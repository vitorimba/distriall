<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: auth-inspector-review-auth-flow
  task_name: Review Auth Flow
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
task: reviewAuthFlow()
responsavel: "@auth-inspector"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: auth_config
    tipo: string
    origem: Supabase config, code, or description
    obrigatorio: true

Saida:
  - campo: auth_findings
    tipo: array
    destino: Console / Shield
    persistido: false

Checklist:
  - "[ ] Identify auth provider (Supabase Auth, custom, etc.)"
  - "[ ] Check signup flow (open vs invite-only)"
  - "[ ] Check email confirmation requirement"
  - "[ ] Check password policy"
  - "[ ] Check rate limiting on auth endpoints"
  - "[ ] Check JWT configuration"
  - "[ ] Check session management"
  - "[ ] Review RBAC implementation"
  - "[ ] Generate findings with fixes"
---

# Review Authentication Flow

## Purpose

Comprehensive review of the authentication and authorization flow. Covers signup, login, session management, RBAC, and JWT configuration.

## Elicitation

```
? What auth provider does the app use?
  1. Supabase Auth
  2. NextAuth / Auth.js
  3. Custom implementation
  4. Firebase Auth
  5. Other
> {choice}

? Can you provide the auth configuration? (Supabase settings, code snippet, or describe the flow)
```

## Checks by Provider

### Supabase Auth
- `disable_signup` setting
- `mailer.autoconfirm` setting
- Password minimum length
- Rate limits configuration
- JWT expiry
- External providers enabled
- MFA configuration

### General (any provider)
- Login brute force protection
- Account lockout policy
- Session timeout
- Token refresh mechanism
- Password reset flow security
- RBAC enforcement on API calls

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
