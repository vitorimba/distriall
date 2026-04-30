<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: dashboard
  task_name: "Show Dashboard"
  status: active
  responsible_executor: '@status-reporter'
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
task: showDashboard()
responsavel: "@status-reporter"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: sprint_name
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Sprint para dashboard (default: atual)"

Saida:
  - campo: dashboard
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Carregar dados da sprint"
  - "[ ] Calcular métricas"
  - "[ ] Gerar burndown"
  - "[ ] Listar blockers"
  - "[ ] Renderizar dashboard ASCII"
---

# *dashboard

Dashboard completo da sprint atual com métricas, burndown e blockers.

## Execution Steps

### Step 1: Carregar Dados
- Ler data/sprints.yaml (sprint atual)
- Ler data/team.yaml (capacidade)
- Calcular progresso (done/total)

### Step 2: Métricas
- Progresso: % tasks/pontos concluídos
- Velocity: pontos entregues na sprint
- Commitment rate: done/committed
- WIP: tasks em andamento

### Step 3: Burndown
- Pontos restantes por dia
- Linha ideal vs real
- Renderizar em ASCII

### Step 4: Blockers & Riscos
- Listar blockers ativos com aging
- Identificar riscos (scope creep, velocity baixa)

## Output Format

```
╔══════════════════════════════════════════════════╗
║  📊 SPRINT DASHBOARD — Sprint {N}               ║
╠══════════════════════════════════════════════════╣
║  🎯 Goal: {sprint goal}                         ║
║  📅 {start} → {end} ({dias restantes}d)         ║
╠══════════════════════════════════════════════════╣
║  PROGRESSO         VELOCITY        COMMITMENT   ║
║  ████████░░ {%}    {X} pts/sprint  {Y}/{Z} ({%})║
╠══════════════════════════════════════════════════╣
║  BURNDOWN                                       ║
║  {max}|*                                        ║
║      | * *                                      ║
║      |    * *  ← ideal                          ║
║      |       *                                  ║
║    0 |________*___                              ║
║      D1 D2 D3 D4 D5 D6 D7 D8 D9 D10           ║
╠══════════════════════════════════════════════════╣
║  🚫 BLOCKERS ({N})  ⚠️ RISCOS ({N})            ║
║  - {blocker} ({aging}d)  - {risco}              ║
╚══════════════════════════════════════════════════╝
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
