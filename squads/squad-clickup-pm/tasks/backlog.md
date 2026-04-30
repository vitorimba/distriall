<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: backlog
  task_name: "Show Backlog"
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
task: showBacklog()
responsavel: "@sprint-planner"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: filter
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Filtro opcional: priority, assignee, label"

Saida:
  - campo: backlog_view
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Ler items do backlog"
  - "[ ] Ordenar por prioridade"
  - "[ ] Exibir com pontos e status"
---

# *backlog

Mostra backlog priorizado com pontos, status e assignee.

## Execution Steps

### Step 1: Ler Backlog
- Carregar items do backlog atual
- Aplicar filtros se fornecidos

### Step 2: Ordenar
- Ordenar por prioridade (Must > Should > Could > Won't)
- Dentro da mesma prioridade, por WSJF score

### Step 3: Exibir

## Output Format

```
📋 BACKLOG — {projeto}
Ordenado por: prioridade | {N} items | {total_pts} pts

| # | Item | Pontos | Priority | Status | Assignee |
|---|------|--------|----------|--------|----------|
| 1 | {item} | {pts} | 🔴 Must | Ready | {nome} |
| 2 | {item} | {pts} | 🟡 Should | Draft | — |
| 3 | {item} | {pts} | 🟢 Could | Draft | — |

Refinados: {N}/{total} ({%})
Estimados: {N}/{total} ({%})
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
