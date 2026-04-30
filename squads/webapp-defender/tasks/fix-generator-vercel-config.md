<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: fix-generator-vercel-config
  task_name: Generate Vercel Config
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
task: generateVercelConfig()
responsavel: "@fix-generator"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: findings
    tipo: array
    origem: Header/CORS audit findings
    obrigatorio: true
  - campo: app_domains
    tipo: array
    origem: User Input
    obrigatorio: true

Saida:
  - campo: vercel_json
    tipo: string
    destino: Console / File
    persistido: true

Checklist:
  - "[ ] Collect allowed domains"
  - "[ ] Generate headers section"
  - "[ ] Generate CORS section"
  - "[ ] Generate rewrites/redirects if needed"
  - "[ ] Output complete vercel.json snippet"
---

# Generate Vercel Configuration Fix

## Purpose

Generate vercel.json configuration to fix security header and CORS findings.

## Elicitation

```
? What are the allowed origin domains?
  (e.g., https://app.example.com, https://admin.example.com)
> {domains}

? Does the app use an API proxy? (y/n)
> {answer}
```

## Output

Complete `vercel.json` headers section with:
- All required security headers
- CORS restricted to specified domains
- CSP tailored to app's needs (Supabase connect-src, etc.)

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
