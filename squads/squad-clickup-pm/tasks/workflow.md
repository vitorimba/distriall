<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: workflow
  task_name: "Criar Workflow"
  status: active
  responsible_executor: '@workflow-builder'
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
task: criarWorkflow()
responsavel: "@workflow-builder"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: nome
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Nome do workflow"
  - campo: passos
    tipo: array
    origem: User Input
    obrigatorio: true
    validacao: "Lista de automações encadeadas"

Saida:
  - campo: workflow
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Definir nome e objetivo"
  - "[ ] Mapear passos sequenciais"
  - "[ ] Definir trigger para cada passo"
  - "[ ] Identificar pontos de falha"
  - "[ ] Documentar workflow completo"
---

# *workflow

Cria workflow multi-step — sequência de automações encadeadas.

## Elicitation Flow

```
@workflow-builder

*workflow

? Nome do workflow: _________________
? Objetivo: _________________
? Template base:
  > 1. Dev Task Flow (PR → Review → QA → Done)
  > 2. Bug Triage (Create → Triage → Assign → Track)
  > 3. Sprint Lifecycle (Start → Daily → End → Report)
  > 4. Custom (definir do zero)

Se Custom:
? Passo 1:
  Trigger: _________________
  Ação: _________________
? Passo 2:
  Trigger: _________________
  Ação: _________________
(enter para finalizar)

Criando workflow...
```

## Output Format

```
⚙️ WORKFLOW CRIADO — {nome}

Objetivo: {objetivo}
Passos: {N}

Flow:
  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
  │ {trigger 1}  │ ──→ │ {trigger 2}  │ ──→ │ {trigger 3}  │
  │ {ação 1}     │     │ {ação 2}     │     │ {ação 3}     │
  └─────────────┘     └─────────────┘     └─────────────┘

Detalhes:
| # | Trigger | Ação | Fallback |
|---|---------|------|----------|
| 1 | {trigger} | {ação} | {fallback} |
| 2 | {trigger} | {ação} | {fallback} |

⚠️ Rode *dry-run "{nome}" para simular antes de ativar.
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
