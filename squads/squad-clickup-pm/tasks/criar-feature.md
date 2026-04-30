<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: criar-feature
  task_name: "Criar Feature"
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
task: criarFeature()
responsavel: "@task-architect"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: titulo
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Título da feature"
  - campo: user_story
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Como {persona}, quero {ação} para {benefício}"
  - campo: acceptance_criteria
    tipo: array
    origem: User Input
    obrigatorio: true
    validacao: "Lista de critérios verificáveis"

Saida:
  - campo: feature_task
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] User story no formato correto"
  - "[ ] AC verificáveis e testáveis"
  - "[ ] Subtasks definidas"
  - "[ ] DoD checklist incluído"
  - "[ ] Pontos estimados"
---

# *criar-feature

Cria feature com user story e acceptance criteria.

## Elicitation Flow

```
@task-architect

*criar-feature

? Título: _________________
? User Story:
  Como _________________ (persona)
  quero _________________ (ação)
  para _________________ (benefício)
? Acceptance Criteria:
  - AC-1: _________________
  - AC-2: _________________
  (enter para finalizar)
? Story Points: _________________ (1/2/3/5/8/13)
? Subtasks sugeridas? (Y/n): Y

Criando feature...
```

## Output Format

```
✅ FEATURE CRIADA

feat: {título}
Pontos: {pts} | Priority: {priority}

## User Story
Como {persona}, quero {ação} para {benefício}.

## Acceptance Criteria
- [ ] AC-1: {critério}
- [ ] AC-2: {critério}

## Subtasks
- [ ] {subtask 1}
- [ ] {subtask 2}
- [ ] Escrever testes
- [ ] Atualizar docs

## DoD Checklist
- [ ] Código revisado (PR approved)
- [ ] Testes passando (unit + integration)
- [ ] Lint/typecheck limpo
- [ ] Docs atualizados
- [ ] Testado em staging

Labels: [feature]
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
