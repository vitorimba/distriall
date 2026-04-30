<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: planejar-sprint
  task_name: "Planejar Sprint"
  status: active
  responsible_executor: '@sprint-planner'
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
task: planejarSprint()
responsavel: "@sprint-planner"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: sprint_name
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Nome da sprint (default: próxima sequencial)"

Saida:
  - campo: sprint_plan
    tipo: object
    destino: Console + data/sprints.yaml
    persistido: true

Checklist:
  - "[ ] Review velocity histórica"
  - "[ ] Calcular capacidade real do time"
  - "[ ] Definir Sprint Goal"
  - "[ ] Selecionar items do backlog (top-down)"
  - "[ ] Refinar items selecionados (AC, pontos, deps)"
  - "[ ] Commitment do time (pontos <= capacidade)"
  - "[ ] Quebrar em tasks (@task-architect)"
  - "[ ] Validar: Sprint Goal alcançável?"
---

# *planejar-sprint

Planejamento completo de sprint: do backlog ao commitment.

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] data/sprints.yaml existe com histórico
    tipo: pre-condition
    blocker: false
  - [ ] data/team.yaml com capacidade do time
    tipo: pre-condition
    blocker: true
```

## Elicitation Flow

```
@sprint-planner

*planejar-sprint

? Nome da sprint: _________________ (default: Sprint {N+1})
? Sprint Goal: _________________
? Duração: (default: 2 semanas)
  > 1. 1 semana
  > 2. 2 semanas (default)
  > 3. 3 semanas

Calculando capacidade...
```

## Execution Steps

### Step 1: Review Velocity
- Ler data/sprints.yaml
- Calcular velocity média das últimas 3-5 sprints
- Mostrar tendência (up/down/stable)

### Step 2: Calcular Capacidade
- Ler data/team.yaml
- Aplicar: capacidade_real = total - buffer(20%)
- Considerar férias, feriados, ausências

### Step 3: Sprint Goal
- Elicitar goal do usuário
- Validar: goal é específico e alcançável?

### Step 4: Selecionar Items
- Listar backlog priorizado
- Selecionar top-down até atingir capacidade
- Cada item deve ter AC definida

### Step 5: Commitment
- Confirmar pontos totais <= capacidade
- Listar items comprometidos
- Identificar riscos

### Step 6: Estruturar Tasks
- Delegar para @task-architect: quebrar stories em tasks
- Cada task com AC, DoD, subtasks atômicas

### Step 7: Validar
- Sprint Goal alcançável com tasks comprometidas?
- Dependências mapeadas?
- Riscos documentados?

## Output Format

```
🎯 SPRINT PLAN — {sprint_name}

Goal: {sprint_goal}
Duração: {start_date} → {end_date}
Capacidade: {effective_capacity} pts
Committed: {total_points} pts ({commitment_rate}%)

Items comprometidos:
| # | Story | Pontos | Assignee | Priority |
|---|-------|--------|----------|----------|
| 1 | {story} | {pts} | {nome} | {priority} |

Riscos:
- {risco 1}

Dependências:
- {dep 1}
```

## Post-Conditions

```yaml
post-conditions:
  - [ ] Sprint registrada em data/sprints.yaml
  - [ ] Items com assignee e pontos definidos
  - [ ] Sprint Goal documentado
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
