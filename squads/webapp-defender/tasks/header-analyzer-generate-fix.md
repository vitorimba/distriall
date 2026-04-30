<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: header-analyzer-generate-fix
  task_name: Generate Header Fix
  status: active
  responsible_executor: 'header-analyzer'
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
task: generateHeaderFix()
responsavel: "@header-analyzer"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: missing_headers
    tipo: array
    origem: analyzeHeaders output
    obrigatorio: true
  - campo: platform
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "vercel | netlify | nginx | apache | cloudflare"

Saida:
  - campo: fix_config
    tipo: string
    destino: Console / File
    persistido: true

Checklist:
  - "[ ] Identify platform"
  - "[ ] Generate platform-specific config"
  - "[ ] Include all missing headers"
  - "[ ] Output ready-to-apply config"
---

# Generate Header Fix

## Purpose

Generate platform-specific configuration to add missing security headers.

## Elicitation

```
? Which hosting platform?
  1. Vercel (vercel.json)
  2. Netlify (netlify.toml / _headers)
  3. Nginx (nginx.conf)
  4. Apache (.htaccess)
  5. Cloudflare (Page Rules / Transform Rules)
```

Generates ready-to-copy config for the selected platform.

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
