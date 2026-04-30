<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: quebrar
  task_name: "Quebrar Story"
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
task: quebrarStory()
responsavel: "@task-architect"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: story
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Story ou epic para quebrar em tasks"

Saida:
  - campo: work_breakdown
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Analisar story/epic"
  - "[ ] Identificar tasks principais"
  - "[ ] Quebrar em subtasks atômicas (< 4h)"
  - "[ ] Definir AC por task"
  - "[ ] Adicionar DoD checklist"
  - "[ ] Mapear dependências"
  - "[ ] Estimar pontos"
---

# *quebrar

Quebra story/epic em tasks + subtasks + checklists seguindo WBS.

## Elicitation Flow

```
@task-architect

*quebrar

? Story/Epic para quebrar: _________________
? Nível de detalhe:
  > 1. Tasks only (rápido)
  > 2. Tasks + Subtasks (recomendado)
  > 3. Tasks + Subtasks + Checklists (completo)

Analisando e quebrando...
```

## Execution Steps

### Step 1: Analisar Story
- Ler AC da story
- Identificar componentes técnicos
- Mapear domínios (frontend, backend, database, infra)

### Step 2: Quebrar em Tasks
- 1 task por componente/domínio
- Cada task: 2-3 pontos (max 5)
- Título: verbo + objeto

### Step 3: Subtasks Atômicas
- Cada subtask < 4h de trabalho
- 1 ação por subtask
- Verificável como done/not-done

### Step 4: Dependências
- Mapear ordem de execução
- Identificar bloqueios cruzados

## Output Format

```
🧱 WORK BREAKDOWN — {story}

{story} ({total_pts} pts)
├── Task 1: {título} ({pts} pts)
│   ├── [ ] Subtask 1.1: {ação} (2h)
│   ├── [ ] Subtask 1.2: {ação} (3h)
│   └── DoD: [code review] [tests] [lint]
├── Task 2: {título} ({pts} pts)
│   ├── [ ] Subtask 2.1: {ação} (2h)
│   ├── [ ] Subtask 2.2: {ação} (4h)
│   └── DoD: [code review] [tests] [lint]
└── Task 3: {título} ({pts} pts)
    ├── [ ] Subtask 3.1: {ação} (1h)
    └── DoD: [code review] [docs]

Total: {N} tasks, {M} subtasks, {total_pts} pts
Dependências: Task 2 → Task 1, Task 3 → Task 2
Estimativa: {dias} dias ({horas}h)
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
