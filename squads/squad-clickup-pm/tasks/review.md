<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: review
  task_name: "Sprint Review"
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
task: sprintReview()
responsavel: "@meeting-master"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: sprint_name
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Sprint para review (default: atual)"

Saida:
  - campo: review_output
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Demo de items concluídos (20min)"
  - "[ ] Apresentar métricas (5min)"
  - "[ ] Coletar feedback (5min)"
  - "[ ] Registrar items aceitos/rejeitados"
---

# *review

Facilita Sprint Review/Demo — 30 minutos, foco em demo e feedback.

## Elicitation Flow

```
@meeting-master

*review

📦 SPRINT REVIEW — Sprint {N}

## Demo (20min)
Para cada story Done:
? "{story}" — Quem faz a demo? _________________
? Status: ✅ Done / ⚠️ Parcial? _________________
(repete para cada story)

## Feedback (5min)
? Feedback do stakeholder: _________________
? Novos items para backlog: _________________
```

## Output Format

```
📦 SPRINT REVIEW — Sprint {N}

## Demo
| Story | Demo por | Status |
|-------|----------|--------|
| {story} | {quem} | ✅ Done |

## Métricas
- Committed: {X} pts → Delivered: {Y} pts ({%})
- Velocity: {Z} (trend: ↑/↓/→)
- Spillover: {N} tasks

## Feedback
- {feedback}

## Resultado
- Items aceitos: {lista}
- Items rejeitados: {lista + motivo}
- Novos items backlog: {lista}

⏱️ Tempo: {X}min / 30min
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
