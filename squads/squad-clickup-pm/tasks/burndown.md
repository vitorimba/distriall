<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: burndown
  task_name: "Show Burndown"
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
task: showBurndown()
responsavel: "@status-reporter"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: sprint_name
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Sprint (default: atual)"

Saida:
  - campo: burndown_chart
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Carregar dados da sprint"
  - "[ ] Calcular pontos restantes por dia"
  - "[ ] Calcular linha ideal"
  - "[ ] Renderizar chart ASCII"
  - "[ ] Mostrar diagnóstico"
---

# *burndown

Gera burndown chart da sprint atual em ASCII art.

## Execution Steps

### Step 1: Dados
- Total committed points
- Pontos restantes por dia (real)
- Linha ideal (linear de committed → 0)

### Step 2: Renderizar

## Output Format

```
📉 BURNDOWN — Sprint {N}

{max} |*
      | *  .
      |  * . *
      |   *.   *
      |    .  *  *
      |   .        *
   0  |__.__________*___
       D1 D2 D3 D4 D5 D6 D7 D8 D9 D10

  * = real    . = ideal

Status: {🟢 No trilho | 🟡 Atenção | 🔴 Atrasado}
Committed: {X} pts | Restante: {Y} pts | Done: {Z} pts
Dias restantes: {N}
Projeção: {vai entregar X% do committed}
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
