<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: priorizar-moscow
  task_name: "Priorizar Moscow"
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
task: priorizarMoscow()
responsavel: "@sprint-planner"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: items
    tipo: array
    origem: Backlog
    obrigatorio: true
    validacao: "Lista de items para priorizar"

Saida:
  - campo: prioritized_backlog
    tipo: array
    destino: Console
    persistido: false

Checklist:
  - "[ ] Listar items candidatos"
  - "[ ] Classificar cada item (Must/Should/Could/Won't)"
  - "[ ] Validar com usuário"
  - "[ ] Reordenar backlog"
---

# *priorizar-moscow

Re-prioriza backlog usando framework MoSCoW.

## Elicitation Flow

```
@sprint-planner

*priorizar-moscow

Para cada item do backlog:
? "{item_title}" ({pts} pts)
  > 1. 🔴 Must — Sem isso a sprint falha
  > 2. 🟠 Should — Importante, mas tem workaround
  > 3. 🟡 Could — Nice to have, se sobrar tempo
  > 4. ⚪ Won't — Não agora, vai pro backlog futuro

Priorizando...
```

## Execution Steps

### Step 1: Listar Items
- Carregar backlog atual
- Mostrar items com pontos e descrição curta

### Step 2: Classificar
- Para cada item, elicitar classificação MoSCoW
- Registrar justificativa se Won't

### Step 3: Reordenar
- Must → topo
- Should → meio
- Could → base
- Won't → backlog futuro

## Output Format

```
📊 PRIORIZAÇÃO MoSCoW — Concluída

🔴 MUST ({N} items, {X} pts)
  - {item 1} ({pts} pts)
  - {item 2} ({pts} pts)

🟠 SHOULD ({N} items, {X} pts)
  - {item 3} ({pts} pts)

🟡 COULD ({N} items, {X} pts)
  - {item 4} ({pts} pts)

⚪ WON'T ({N} items, {X} pts)
  - {item 5} ({pts} pts) — Motivo: {justificativa}

Total: {total_pts} pts | Capacidade: {capacity} pts
Must+Should: {must_should_pts} pts ({fit}%)
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
