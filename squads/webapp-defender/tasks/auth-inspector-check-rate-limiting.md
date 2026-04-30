<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: auth-inspector-check-rate-limiting
  task_name: Check Rate Limiting
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
task: checkRateLimiting()
responsavel: "@auth-inspector"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: auth_config
    tipo: string
    origem: Supabase settings or server config
    obrigatorio: true

Saida:
  - campo: rate_limit_findings
    tipo: array
    destino: Console / Shield
    persistido: false

Checklist:
  - "[ ] Check login endpoint rate limiting"
  - "[ ] Check signup endpoint rate limiting"
  - "[ ] Check password reset rate limiting"
  - "[ ] Check API endpoint rate limiting"
  - "[ ] Check bot protection (Turnstile/reCAPTCHA)"
  - "[ ] Generate recommendations"
---

# Check Rate Limiting

## Purpose

Verify rate limiting is configured on all authentication and critical API endpoints. Zero rate limiting was found in multiple audited applications.

## Recommended Limits

| Endpoint | Limit | Per |
|----------|-------|-----|
| Login | 5 attempts | IP/minute |
| Signup | 3 attempts | IP/hour |
| Password reset | 3 attempts | Email/hour |
| OTP/SMS | 3 attempts | Phone/minute |
| API calls | 100 requests | User/minute |

## Implementation Options

1. **Supabase built-in** — Dashboard > Auth > Rate Limits
2. **Cloudflare Turnstile** — Frontend bot protection
3. **Vercel Edge Middleware** — Custom rate limiting
4. **pgbouncer** — Connection-level limiting

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
