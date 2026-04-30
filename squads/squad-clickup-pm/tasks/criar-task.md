<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: criar-task
  task_name: "Criar Task"
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
task: criarTask()
responsavel: "@task-architect"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: titulo
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Formato: verbo + objeto (ex: Implementar login OAuth)"
  - campo: lista
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Lista/Sprint destino"
  - campo: pontos
    tipo: number
    origem: User Input
    obrigatorio: false
    validacao: "Story points (1, 2, 3, 5, 8, 13)"
  - campo: assignee
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Membro do time"
  - campo: priority
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Urgente/Alta/Media/Baixa"

Saida:
  - campo: task
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Título claro (verbo + objeto)"
  - "[ ] Descrição com contexto"
  - "[ ] Acceptance Criteria definidos"
  - "[ ] DoD checklist incluído"
  - "[ ] Labels atribuídos"
  - "[ ] Pontos estimados"
---

# *criar-task

Cria task completa e estruturada no formato ClickUp.

## Elicitation Flow

```
@task-architect

*criar-task

? Título: _________________ (verbo + objeto)
? Tipo:
  > 1. Feature
  > 2. Bug
  > 3. Chore
  > 4. Spike
? Descrição: _________________
? Acceptance Criteria:
  - AC-1: _________________
  - AC-2: _________________
  (enter para finalizar)
? Story Points: _________________ (1/2/3/5/8/13)
? Priority: (default: Média)
  > 1. Urgente
  > 2. Alta
  > 3. Média
  > 4. Baixa
? Assignee: _________________ (opcional)
? Lista/Sprint: _________________ (opcional)

Criando task...
```

## Execution Steps

### Step 1: Validar Título
- Formato: verbo + objeto
- Rejeitar títulos vagos ("Login", "Bug", "Fix")

### Step 2: Carregar Template
- Ler data/templates-clickup.yaml
- Selecionar template pelo tipo (feature/bug/chore/spike)

### Step 3: Compor Task
- Preencher template com inputs
- Gerar DoD checklist padrão
- Atribuir labels por tipo

### Step 4: Exibir

## Output Format

```
✅ TASK CRIADA

📌 {título}
Tipo: {tipo} | Pontos: {pts} | Priority: {priority}
Lista: {lista} | Assignee: {assignee}

## Descrição
{descrição}

## Acceptance Criteria
- [ ] AC-1: {critério}
- [ ] AC-2: {critério}

## DoD Checklist
- [ ] Código revisado (PR approved)
- [ ] Testes passando
- [ ] Lint/typecheck limpo
- [ ] Docs atualizados

Labels: [{tipo}, {área}]
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
