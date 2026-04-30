<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: refinar
  task_name: "Refinar Story"
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
task: refinarStory()
responsavel: "@sprint-planner"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: story
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Story para refinar"

Saida:
  - campo: refined_story
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Revisar descrição da story"
  - "[ ] Definir/validar Acceptance Criteria"
  - "[ ] Estimar story points"
  - "[ ] Mapear dependências"
  - "[ ] Identificar riscos"
  - "[ ] Confirmar story é Ready"
---

# *refinar

Refina story: AC, pontos, dependências, riscos — prepara para sprint.

## Elicitation Flow

```
@sprint-planner

*refinar

? Story para refinar: _________________

Analisando story...

? AC estão claras e testáveis? (revisar/confirmar)
  - AC-1: _________________ ✅/❌
  - AC-2: _________________ ✅/❌
  - Adicionar AC: _________________

? Story Points (Planning Poker):
  Sugestão: {N} pts — {justificativa}
  Concordar? (Y/n/outro valor): ___

? Dependências:
  - _________________ (ou "nenhuma")

? Riscos:
  - _________________ (ou "nenhum")

Refinamento completo.
```

## Output Format

```
✅ STORY REFINADA

{story_title}
Status: Ready ✅
Pontos: {pts}

## Acceptance Criteria
- [ ] AC-1: {critério} ✅
- [ ] AC-2: {critério} ✅

## Dependências
- {dep ou "Nenhuma"}

## Riscos
- {risco ou "Nenhum identificado"}

Pronta para entrar na próxima sprint.
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
