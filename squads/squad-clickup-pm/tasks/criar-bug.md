<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: criar-bug
  task_name: "Criar Bug"
  status: active
  responsible_executor: '@task-architect'
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
task: criarBug()
responsavel: "@task-architect"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: titulo
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Descrição do bug"
  - campo: passos
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Steps to reproduce"
  - campo: esperado
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Expected behavior"
  - campo: atual
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Actual behavior"

Saida:
  - campo: bug_report
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Título descritivo"
  - "[ ] Steps to reproduce claros"
  - "[ ] Expected vs Actual documentados"
  - "[ ] Severity classificado"
  - "[ ] Environment identificado"
---

# *criar-bug

Cria bug report estruturado com todas as informações necessárias.

## Elicitation Flow

```
@task-architect

*criar-bug

? Título do bug: _________________
? Severity:
  > 1. 🔴 Critical — Sistema down/data loss
  > 2. 🟠 High — Feature broken, sem workaround
  > 3. 🟡 Medium — Feature broken, com workaround
  > 4. 🔵 Low — Cosmético/minor
? Environment:
  > 1. Produção
  > 2. Staging
  > 3. Local
? Steps to reproduce:
  1. _________________
  2. _________________
  (enter para finalizar)
? Expected behavior: _________________
? Actual behavior: _________________
? Root cause (se conhecida): _________________ (opcional)

Criando bug report...
```

## Output Format

```
🐛 BUG REPORT CRIADO

fix: {título}
Severity: {severity} | Environment: {env}

## Steps to Reproduce
1. {passo 1}
2. {passo 2}

## Expected Behavior
{esperado}

## Actual Behavior
{atual}

## Root Cause
{root_cause ou "A investigar"}

## Fix Plan
- [ ] Investigar root cause
- [ ] Implementar fix
- [ ] Regression test
- [ ] Verificar em staging

Labels: [bug, {severity}]
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
