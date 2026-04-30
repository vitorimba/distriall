<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: integrar
  task_name: "Integrar Ferramenta"
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
task: integrarFerramenta()
responsavel: "@workflow-builder"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: ferramenta
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "GitHub | Slack | Supabase | Vercel | outro"

Saida:
  - campo: integration
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Selecionar ferramenta"
  - "[ ] Definir eventos bidirecionais"
  - "[ ] Configurar automações de sync"
  - "[ ] Documentar integration pattern"
  - "[ ] Testar conexão"
---

# *integrar

Configura integração bidirecional entre ClickUp e ferramenta externa.

## Elicitation Flow

```
@workflow-builder

*integrar

? Ferramenta para integrar:
  > 1. GitHub (branches, PRs, commits)
  > 2. Slack (notificações, comandos)
  > 3. Supabase (migrations, deploys)
  > 4. Vercel (deployments)
  > 5. Outro: _________________

Para {ferramenta} selecionada, mostra:
? Eventos para sincronizar:
  - [ ] {evento 1} → {ação ClickUp}
  - [ ] {evento 2} → {ação ClickUp}
  (marcar os desejados)

Configurando integração...
```

## Integration Patterns

### GitHub ↔ ClickUp
```
PR opened    → Task → In Review
PR merged    → Task → QA / Done
PR closed    → Task → backlog (re-open)
Commit ref   → Task comment com link
Branch name  → feat/{clickup-task-id}-{slug}
```

### Slack ↔ ClickUp
```
/clickup create → Cria task do Slack
Task assigned   → DM pro assignee
Blocker added   → Post em #blockers
Sprint report   → Post semanal em #project
```

### Supabase ↔ ClickUp
```
Migration created → Task "Review migration {name}"
Deploy completed  → Task "Validate deploy {env}"
Error spike       → Bug "Investigate {error}" (auto)
```

## Output Format

```
🔗 INTEGRAÇÃO CONFIGURADA — ClickUp ↔ {ferramenta}

Eventos configurados:
| Evento ({ferramenta}) | Ação (ClickUp) | Status |
|----------------------|----------------|--------|
| {evento} | {ação} | ✅ Ativo |

Comandos disponíveis:
- {comando 1}: {descrição}
- {comando 2}: {descrição}

⚠️ Verifique credenciais e permissões da integração.
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
