<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: report-sprint
  task_name: "Report Sprint"
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
task: reportSprint()
responsavel: "@status-reporter"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: sprint_name
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Sprint para report (default: atual)"
  - campo: tipo
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "semanal | sprint | mensal | executivo"

Saida:
  - campo: report
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Selecionar tipo de report"
  - "[ ] Coletar métricas relevantes"
  - "[ ] Gerar narrativa acionável"
  - "[ ] Incluir próximos passos"
---

# *report

Gera relatório de sprint com métricas, highlights e ações.

## Elicitation Flow

```
@status-reporter

*report

? Tipo de report:
  > 1. Semanal — progresso, riscos, próximos passos
  > 2. Sprint — velocity, commitment vs delivered, highlights
  > 3. Mensal — tendências, OKRs, roadmap status
  > 4. Executivo — 1 página, high-level, decisões

Gerando report...
```

## Output Format (Sprint)

```
📊 SPRINT REPORT — Sprint {N}
{start_date} → {end_date}

## Resultado
- Goal: "{sprint_goal}" — {✅ Alcançado | ⚠️ Parcial | ❌ Não alcançado}
- Committed: {X} pts → Delivered: {Y} pts ({commitment_rate}%)
- Velocity: {Z} pts (trend: {↑/↓/→} vs média {avg})

## Highlights
- ✅ {highlight 1}
- ✅ {highlight 2}

## Problemas
- ⚠️ {problema 1}
- ⚠️ {problema 2}

## Métricas
| Métrica | Valor | Alvo | Status |
|---------|-------|------|--------|
| Velocity | {X} | {Y} | {🟢/🟡/🔴} |
| Commitment Rate | {%} | ≥80% | {🟢/🟡/🔴} |
| Bug Rate | {%} | ≤10% | {🟢/🟡/🔴} |
| Spillover | {N} | 0 | {🟢/🟡/🔴} |

## Spillover
- {task 1} ({pts} pts) — motivo: {motivo}

## Ações para próxima sprint
- {ação 1}
- {ação 2}
```

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches specification
- [ ] No critical issues in output
