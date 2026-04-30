<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: velocity
  task_name: "Show Velocity"
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
task: showVelocity()
responsavel: "@status-reporter"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada: []

Saida:
  - campo: velocity_report
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Ler histórico de sprints"
  - "[ ] Calcular velocity por sprint"
  - "[ ] Calcular média e tendência"
  - "[ ] Gerar previsão"
  - "[ ] Renderizar chart ASCII"
---

# *velocity

Velocity das últimas 5 sprints + tendência + previsão.

## Execution Steps

### Step 1: Carregar Dados
- Ler data/sprints.yaml → sprint_history
- Extrair delivered_points das últimas 5 sprints

### Step 2: Calcular
- Média: Σ velocity / N
- Tendência: up/down/stable (comparar últimas 3)
- Previsão: baseado na tendência

### Step 3: Renderizar

## Output Format

```
📈 VELOCITY — Últimas 5 sprints

| Sprint | Committed | Delivered | Rate |
|--------|-----------|-----------|------|
| Sprint 5 | {X} | {Y} | {%} |
| Sprint 4 | {X} | {Y} | {%} |
| Sprint 3 | {X} | {Y} | {%} |
| Sprint 2 | {X} | {Y} | {%} |
| Sprint 1 | {X} | {Y} | {%} |

Chart:
  40 |          ■
  30 |    ■     ■  ■
  20 | ■  ■  ■
  10 |
   0 |________________
      S1 S2 S3 S4 S5

Média: {avg} pts/sprint
Tendência: {↑ Crescente | ↓ Decrescente | → Estável}
Previsão próxima sprint: ~{predicted} pts
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
