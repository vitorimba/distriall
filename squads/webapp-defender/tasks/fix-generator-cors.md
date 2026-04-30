<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: fix-generator-cors
  task_name: Generate CORS Fix
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
task: generateCorsFix()
responsavel: "@fix-generator"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: allowed_origins
    tipo: array
    origem: User Input
    obrigatorio: true
  - campo: platform
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "vercel | netlify | nginx | supabase"

Saida:
  - campo: cors_config
    tipo: string
    destino: Console / File
    persistido: true

Checklist:
  - "[ ] Collect allowed origins"
  - "[ ] Determine platform"
  - "[ ] Generate platform-specific CORS config"
  - "[ ] Include allowed methods and headers"
  - "[ ] Output ready-to-apply config"
---

# Generate CORS Fix

## Purpose

Generate platform-specific CORS restriction configuration. Replaces wildcard `*` with specific allowed domains.

## Elicitation

```
? Allowed origins (comma-separated):
  e.g., https://app.example.com, https://admin.example.com
> {origins}

? Platform:
  1. Vercel (vercel.json)
  2. Netlify (_headers)
  3. Nginx (nginx.conf)
  4. Supabase (Edge Functions)
> {choice}
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
