<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: daily
  task_name: "Daily Standup"
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
task: dailyStandup()
responsavel: "@meeting-master"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: data
    tipo: string
    origem: System
    obrigatorio: false
    validacao: "Data da daily (default: hoje)"

Saida:
  - campo: daily_report
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Coletar update de cada membro"
  - "[ ] Identificar blockers"
  - "[ ] Definir ações para blockers"
  - "[ ] Registrar em formato padronizado"
  - "[ ] Verificar timebox (15min)"
---

# *daily

Facilita Daily Standup — 15 minutos, 3 perguntas, foco em blockers.

## Elicitation Flow

```
@meeting-master

*daily

🕐 DAILY STANDUP — {data}

Para cada membro do time:
? {nome} — O que fez ontem? _________________
? {nome} — O que vai fazer hoje? _________________
? {nome} — Tem algum blocker? _________________ (ou "não")

(repete para cada membro)
```

## Execution Steps

### Step 1: Iniciar
- Ler data/team.yaml para lista de membros
- Registrar data e hora de início
- Mostrar template de daily

### Step 2: Coletar Updates
- Para cada membro: 3 perguntas (2min max)
- Registrar respostas na tabela

### Step 3: Blockers
- Listar blockers identificados
- Para cada blocker: definir quem resolve e prazo

### Step 4: Finalizar
- Mostrar resumo
- Registrar tempo total

## Output Format

```
🕐 DAILY STANDUP — {data}

📝 Registro:
| Pessoa | Ontem | Hoje | Blocker |
|--------|-------|------|---------|
| {nome} | {fez} | {vai} | {blocker/—} |

🚫 Blockers ({N}):
- {blocker} → Ação: {quem resolve} até {quando}

⏱️ Tempo: {X}min / 15min
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
