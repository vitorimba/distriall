<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: fix-generator-supabase-config
  task_name: Generate Supabase Config
  status: active
  responsible_executor: 'fix-generator'
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
task: generateSupabaseConfig()
responsavel: "@fix-generator"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: findings
    tipo: array
    origem: Auth/config audit findings
    obrigatorio: true

Saida:
  - campo: config_steps
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Generate auth settings changes"
  - "[ ] Generate PostgREST config changes"
  - "[ ] Generate rate limiting config"
  - "[ ] Output step-by-step instructions"
---

# Generate Supabase Configuration Fix

## Purpose

Generate step-by-step Supabase Dashboard configuration changes for auth, PostgREST, and rate limiting findings.

## Output Format

```
SUPABASE CONFIGURATION FIX
═══════════════════════════════════════

1. Authentication > Settings:
   [ ] Disable signup → OFF
   [ ] Enable email confirmations → ON
   [ ] Minimum password length → 12

2. Authentication > Rate Limits:
   [ ] Email sign-in → 5/minute
   [ ] Email sign-up → 3/hour
   [ ] SMS OTP → 3/minute

3. SQL Editor (run as admin):
   ALTER ROLE authenticator SET pgrst.db_plan_enabled TO false;
   NOTIFY pgrst, 'reload config';

4. Settings > Auth:
   [ ] JWT expiry → 3600
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
