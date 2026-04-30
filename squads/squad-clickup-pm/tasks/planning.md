<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: planning
  task_name: "Sprint Planning"
  status: active
  responsible_executor: '@meeting-master'
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
task: sprintPlanning()
responsavel: "@meeting-master"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: sprint_name
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Nome da sprint (default: próxima)"

Saida:
  - campo: planning_output
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Parte 1: O QUE (30min)"
  - "[ ] Review Sprint Goal"
  - "[ ] Apresentar velocity"
  - "[ ] Calcular capacidade"
  - "[ ] Selecionar items"
  - "[ ] Commitment"
  - "[ ] Parte 2: COMO (30min)"
  - "[ ] Quebrar em tasks"
  - "[ ] Identificar dependências"
  - "[ ] Assignar tasks iniciais"
  - "[ ] Validar goal alcançável"
---

# *planning

Facilita Sprint Planning — 1 hora, 2 partes, commitment real.

## Elicitation Flow

```
@meeting-master

*planning

🎯 SPRINT PLANNING — Sprint {N}

## Parte 1: O QUE (30min)
? Sprint Goal proposto: _________________
? Velocity referência: {últimas 3 sprints}
? Capacidade: {X pts disponíveis}

Selecionando items do backlog (top-down)...
? Incluir "{item}" ({pts} pts)? (Y/n)
(repete até atingir capacidade)

? Commitment final: {total} pts — Confirma? (Y/n)

## Parte 2: COMO (30min)
Delegando para @task-architect quebrar stories...
? Dependências identificadas? _________________
? Assignar tasks iniciais? (Y/n)
? Sprint Goal alcançável com essas tasks? (Y/n)
```

## Output Format

```
🎯 SPRINT PLANNING — Sprint {N}

Sprint Goal: "{goal}"
Committed: {N} stories, {X} pontos
Capacidade: {capacity} pts ({commitment_rate}%)

| # | Story | Pontos | Assignee |
|---|-------|--------|----------|
| 1 | {story} | {pts} | {nome} |

Tasks criadas: {N}
Riscos: {lista}
Dependências: {lista}

⏱️ Tempo: {X}min / 60min
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
