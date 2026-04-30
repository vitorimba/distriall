<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: auth-inspector-review-jwt-config
  task_name: Review JWT Config
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
task: reviewJwtConfig()
responsavel: "@auth-inspector"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: jwt_config
    tipo: string
    origem: Supabase settings, JWT sample, or config
    obrigatorio: true

Saida:
  - campo: jwt_findings
    tipo: array
    destino: Console / Shield
    persistido: false

Checklist:
  - "[ ] Check JWT expiry time"
  - "[ ] Check anon key expiry"
  - "[ ] Check refresh token configuration"
  - "[ ] Check for PII in JWT payload"
  - "[ ] Check algorithm strength"
  - "[ ] Generate recommendations"
---

# Review JWT Configuration

## Purpose

Audit JWT settings for security issues. Anon JWT with ~10 year expiry was found in production.

## Checks

| Setting | Secure | Insecure |
|---------|--------|----------|
| Access token expiry | <= 1 hour | > 24 hours |
| Anon key expiry | <= 1 year | ~10 years |
| Refresh token rotation | Enabled | Disabled |
| PII in payload | Only user_id, role | Email, name, phone |
| Algorithm | HS256+ | None/weak |

## Anon Key Risk

The Supabase anon key is PUBLIC. Its risk depends entirely on RLS:
- RLS enabled + proper policies = anon key is safe
- RLS disabled = anon key = full database access

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
