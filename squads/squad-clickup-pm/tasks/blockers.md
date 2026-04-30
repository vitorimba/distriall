<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: blockers
  task_name: "Show Blockers"
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
task: showBlockers()
responsavel: "@status-reporter"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada: []

Saida:
  - campo: blockers_list
    tipo: array
    destino: Console
    persistido: false

Checklist:
  - "[ ] Listar blockers ativos"
  - "[ ] Calcular aging (dias parado)"
  - "[ ] Ordenar por severity e aging"
  - "[ ] Sugerir ações de resolução"
---

# *blockers

Lista blockers ativos com aging e ações sugeridas.

## Execution Steps

### Step 1: Identificar Blockers
- Tasks com status "blocked" ou tag "blocker"
- Issues sem assignee ou sem progresso

### Step 2: Calcular Aging
- Dias desde que o blocker foi criado/identificado
- Flag: vermelho se > 3 dias

### Step 3: Priorizar
- Critical blockers primeiro
- Aging decrescente

## Output Format

```
🚫 BLOCKERS ATIVOS — {N} impedimentos

| # | Blocker | Task | Aging | Severity | Owner |
|---|---------|------|-------|----------|-------|
| 1 | {desc} | {task} | 🔴 {N}d | Critical | {quem} |
| 2 | {desc} | {task} | 🟡 {N}d | High | {quem} |
| 3 | {desc} | {task} | 🟢 {N}d | Medium | — |

Ações sugeridas:
- 🔴 #{1}: Escalar para {tech lead} — aging > SLA
- 🟡 #{2}: Follow-up com {owner} — prazo {data}
- 🟢 #{3}: Atribuir owner — sem responsável definido

Impacto: {N} tasks bloqueadas, {X} pts parados
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
