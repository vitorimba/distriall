<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: retro
  task_name: "Retrospective"
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
task: retrospective()
responsavel: "@meeting-master"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: sprint_name
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Sprint para retro (default: atual)"
  - campo: formato
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Start/Stop/Continue | 4Ls | Mad/Sad/Glad | Sailboat | Starfish"

Saida:
  - campo: retro_output
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Selecionar formato de retro"
  - "[ ] Coletar inputs do time"
  - "[ ] Definir action items com dono e prazo"
  - "[ ] Check de energia do time"
  - "[ ] Registrar tudo"
---

# *retro

Facilita Retrospectiva — 30 minutos, ações com dono, melhoria contínua.

## Elicitation Flow

```
@meeting-master

*retro

🔄 RETROSPECTIVA — Sprint {N}

? Formato:
  > 1. Start/Stop/Continue (default)
  > 2. 4L's (Liked/Learned/Lacked/Longed)
  > 3. Mad/Sad/Glad
  > 4. Sailboat
  > 5. Starfish

## {formato selecionado}

? ✅ O que foi bem? (Continue)
  - _________________
  (enter para finalizar)

? ❌ O que NÃO foi bem? (Stop)
  - _________________

? 💡 O que podemos melhorar? (Start)
  - _________________

## Action Items
? Ação: _________________
? Responsável: _________________
? Prazo: _________________
(repete para cada ação)

? Energia do time (1-5): ___
```

## Output Format

```
🔄 RETROSPECTIVA — Sprint {N}
Formato: {formato}

### ✅ O que foi bem (Continue)
- {item}

### ❌ O que NÃO foi bem (Stop)
- {item}

### 💡 O que podemos melhorar (Start)
- {item}

## Action Items
| Ação | Responsável | Prazo |
|------|-------------|-------|
| {ação} | {quem} | {quando} |

## Mood Check
Energia do time: {média}/5

⏱️ Tempo: {X}min / 30min
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
