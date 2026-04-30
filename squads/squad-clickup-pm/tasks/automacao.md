<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: automacao
  task_name: "Criar Automacao"
  status: active
  responsible_executor: '@workflow-builder'
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
task: criarAutomacao()
responsavel: "@workflow-builder"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: trigger
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Evento que dispara a automação"
  - campo: acao
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Ação a executar quando trigger ocorre"
  - campo: condicao
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Condição opcional para filtrar trigger"

Saida:
  - campo: automation
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Definir trigger"
  - "[ ] Definir condição (se aplicável)"
  - "[ ] Definir ação"
  - "[ ] Definir fallback"
  - "[ ] Documentar automação"
  - "[ ] Dry-run antes de ativar"
---

# *automacao

Cria automação ClickUp — trigger → condição → ação.

## Elicitation Flow

```
@workflow-builder

*automacao

? Trigger (evento que dispara):
  > 1. Task muda de status
  > 2. Task criada
  > 3. Task atribuída
  > 4. Due date chegou
  > 5. Custom field alterado
  > 6. Horário agendado
  > 7. Outro: _________________

? Condição (filtro opcional): _________________
  (ex: "quando status = In Review", ou enter para pular)

? Ação a executar:
  > 1. Mover task de status
  > 2. Atribuir a pessoa
  > 3. Adicionar label/tag
  > 4. Notificar no Slack
  > 5. Criar subtask
  > 6. Atualizar custom field
  > 7. Outro: _________________

? Fallback (se ação falhar): _________________
  (ou enter para "notificar admin")

? Dry-run primeiro? (Y/n): Y

Criando automação...
```

## Output Format

```
⚙️ AUTOMAÇÃO CRIADA

Nome: {nome_auto_gerado}
Status: {🔍 Dry-run | ✅ Ativa | ⏸️ Pausada}

Trigger: {trigger_description}
Condição: {condição ou "Nenhuma"}
Ação: {ação_description}
Fallback: {fallback}

Exemplo:
  Quando: {cenário concreto}
  Então: {resultado esperado}

⚠️ Testar em ambiente seguro antes de ativar em produção.
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
