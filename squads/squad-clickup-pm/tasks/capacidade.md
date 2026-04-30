<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: capacidade
  task_name: "Calcular Capacidade"
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
task: calcularCapacidade()
responsavel: "@sprint-planner"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: sprint_name
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Sprint para calcular (default: próxima)"
  - campo: ausencias
    tipo: array
    origem: User Input
    obrigatorio: false
    validacao: "Dias de ausência por membro"

Saida:
  - campo: capacity_report
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Ler data/team.yaml"
  - "[ ] Calcular dias úteis da sprint"
  - "[ ] Subtrair ausências"
  - "[ ] Aplicar buffer (20%)"
  - "[ ] Mostrar capacidade por membro e total"
---

# *capacidade

Calcula capacidade real do time para a sprint.

## Elicitation Flow

```
@sprint-planner

*capacidade

? Sprint: _________________ (default: próxima)
? Algum membro com ausência?
  - {nome}: {N} dias ausente
  - (enter para pular)

Calculando...
```

## Execution Steps

### Step 1: Ler Team Data
- Carregar data/team.yaml
- Listar membros com capacity_points_per_sprint

### Step 2: Calcular
- Dias úteis = working_days_per_sprint
- Capacidade bruta = Σ capacity_points_per_sprint
- Ausências = redução proporcional por membro
- Buffer = 20% (configurável)
- Capacidade efetiva = (bruta - ausências) × (1 - buffer)

## Output Format

```
📊 CAPACIDADE — {sprint_name}

| Membro | Base | Ausência | Disponível |
|--------|------|----------|------------|
| {nome} | {pts} | -{N}d ({pts}) | {pts} pts |

Bruta: {total} pts
Ausências: -{ausencia} pts
Buffer (20%): -{buffer} pts
━━━━━━━━━━━━━━━━━━━━
Efetiva: {effective} pts

Recomendação: Comprometer máx {effective} pts
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
