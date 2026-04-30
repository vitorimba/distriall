# Changelog — squad-speechtherapy

Todas as mudancas relevantes do squad de fonoterapia vocal.

## [1.0.0-pro] — 2026-03-13

### Added — Governance (Pro Upgrade)
- `config/veto-conditions.yaml` — 32 condicoes de veto consolidadas de 7 agentes, organizadas por severidade (NON-NEGOTIABLE, MUST, SHOULD) + 5 cross-cutting safety vetos
- `config/quality-gates.yaml` — 8 quality gates para pipeline de reabilitacao vocal (ST-QG-001 a ST-QG-008)
- `config/heuristics.yaml` — 42 heuristicas consolidadas de 7 agentes com padroes cross-cutting
- `CHANGELOG.md` — Log de mudancas do squad
- `.state.json` — Estado inicial do squad com versao e status de validacao

### Updated
- `config.yaml` — Adicionadas secoes governance, testing e scripts

### Components (Pre-existing v1.0.0)
- **Orchestrator:** speechtherapy-chief (Vox)
- **T0 Diagnosis:** ingo-titze (SOVT Science), mara-behlau (Clinical Fono)
- **T1 Rehabilitation:** joseph-stemple (VFE), katherine-verdolini (LMRVT)
- **T2 Specialists:** jackie-gartner-schmidt (CTT), jacob-lieberman (Manual Therapy)
- **Tasks:** 10 tasks clinicas
- **Workflow:** nodule-recovery-complete
- **Checklists:** vocal-hygiene-checklist, session-progress-checklist

### Governance Summary
| Component | Count |
|-----------|-------|
| Veto conditions (NON-NEGOTIABLE) | 17 |
| Veto conditions (MUST) | 10 |
| Veto conditions (SHOULD) | 5 |
| Cross-cutting safety vetos | 5 |
| Quality gates | 8 |
| Heuristics | 42 |
| Agents | 7 |
