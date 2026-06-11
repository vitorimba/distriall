---
paths:
  - "docs/stories/**"
  - ".aiox/**"
  - ".synapse/**"
  - "squads/**/tasks/**"
  - "squads/**/workflows/**"
  - ".aiox-core/development/**"
---

# Stories & Workflows — Sinkra Hub

Applies when working on stories in `docs/stories/`, managing task status transitions, validating readiness, or executing one of the 4 primary workflows.

> **Three nested layers:** Story Lifecycle (Draft→Done) → Task Lifecycle (gates between phases) → Workflow Execution (4 primary patterns)

---

## Section 1 — Story Lifecycle

### Story Phases

```
Draft → Ready → InProgress → InReview → Done
```

### Phase Transitions

| Status | Trigger | Agent | Action |
|--------|---------|-------|--------|
| Draft | @sm creates story | @sm | Story file created |
| Ready | @po validates (GO) | @po | **MUST update status field from Draft → Ready** |
| InProgress | @dev starts implementation | @dev | Update status field |
| InReview | @dev completes, @qa reviews | @qa | Update status field |
| Done | @qa PASS, @devops pushes | @devops | Update status field |

**CRITICAL:** The `Draft → Ready` transition is the responsibility of @po during `*validate-story-draft`. When verdict is GO (including conditional GO after fixes), @po MUST update the story's Status field to `Ready` and log the transition in the Change Log.

### Phase 1: Create (@sm)

**Task:** `create-next-story.md`
**Inputs:** PRD sharded, epic context
**Output:** `{epicNum}.{storyNum}.story.md`

### Phase 2: Validate (@po)

**Task:** `validate-next-story.md`

**10-Point Validation Checklist:**

1. Clear and objective title
2. Complete description (problem/need explained)
3. Testable acceptance criteria (Given/When/Then preferred)
4. Well-defined scope (IN and OUT clearly listed)
5. Dependencies mapped (prerequisite stories/resources)
6. Complexity estimate (points or T-shirt sizing)
7. Business value (benefit to user/business clear)
8. Risks documented (potential problems identified)
9. Criteria of Done (clear definition of complete)
10. Alignment with PRD/Epic (consistency with source docs)

**Decision:** GO (≥7/10) or NO-GO (<7/10 with required fixes)

### Phase 3: Implement (@dev)

**Task:** `dev-develop-story.md`

**Execution Modes:**

- **YOLO (autonomous):** 0-1 prompts, decisions logged in `decision-log-{story-id}.md`. Best for: simple, deterministic tasks
- **Interactive (default):** 5-10 prompts with educational checkpoints, confirmations at key decision points. Best for: learning, complex decisions
- **Pre-Flight (plan-first):** All questions upfront (10-15 prompts), generates execution plan, then zero-ambiguity execution. Best for: ambiguous requirements, critical work

### Phase 4: QA Gate (@qa)

**Task:** `qa-gate.md`

**7 Quality Checks:**

1. **Code review** — patterns, readability, maintainability
2. **Unit tests** — adequate coverage, all passing
3. **Acceptance criteria** — all met per story AC
4. **No regressions** — existing functionality preserved
5. **Performance** — within acceptable limits
6. **Security** — OWASP basics verified
7. **Documentation** — updated if necessary

**Gate Decisions:**

| Decision | Score | Action |
|----------|-------|--------|
| PASS | All checks OK | Approve, proceed to @devops push |
| CONCERNS | Minor issues | Approve with observations documented |
| FAIL | HIGH/CRITICAL issues | Return to @dev with feedback |
| WAIVED | Issues accepted | Approve with waiver documented (rare) |

### Story File Update Rules

| Section | Who Can Edit |
|---------|-------------|
| Title, Description, AC, Scope | @po only |
| File List, Dev Notes, checkboxes | @dev |
| QA Results | @qa only |
| Change Log | Any agent (append only) |

### Branch Naming

```
feat/{story-id}-short-description
fix/{story-id}-short-description
```

Example: `feat/X.Y-feature-name`

### Commit Convention

```
feat: implement user feature [Story X.Y]
fix: correct RLS policy for module [Story X.Y]
```

### Quality Gates (pre-merge)

All stories must pass before merge:
- [ ] Lint passes
- [ ] Typecheck passes
- [ ] CODEOWNERS review
- [ ] PR description references story
- [ ] Acceptance criteria checked off

### Story File Location

```
docs/stories/
  epic-{N}/
    EPIC-{N}-TITLE.md           — Epic overview
    STORY-{N}.{M}-TITLE.md      — Individual stories
```

---

## Section 2 — PoC Rule (effort ≥ 8)

Applies when drafting, validating, or promoting a story to `status: Ready`.

### Rule

Stories with `effort >= 8` points require a proof-of-concept (PoC) **before** status transitions from `Draft` to `Ready`. The PoC must prove the core technical assumption is viable.

### Why

EPIC-124 STORY-124.1 was prototyped live (rename CLI tested on real data: 32 files, 114 refs, 1.5s) **before** ACs were finalized. This caught that a backlink index was needed — which would not have been in the spec otherwise. Large stories that skip PoC produce ACs based on assumption rather than evidence, leading to mid-implementation refactors.

### PoC Scope

A PoC is NOT a full implementation. It is the minimum code needed to validate the riskiest assumption:

| Assumption Type | Example PoC |
|----------------|-------------|
| Performance | Run the core algorithm on real data; measure |
| Integration | Call the external API/tool with a real payload |
| Design | Implement the smallest end-to-end slice |
| Security | Test one attack vector against the happy-path implementation |

**Time budget:** 10-20% of the story's effort estimate. If PoC exceeds 25%, the story is too ambiguous and should be split.

### When PoC is NOT Required

- Story effort < 8 points (trivial, well-understood change)
- Story extends a pattern with an existing PoC in the same Epic
- Story is pure documentation, config, or test addition
- Story is a bug fix with a reproducer already in the ticket

### Evidence Requirement

PoC evidence must be committed or logged before the story is `Ready`:

- Prototype script (can be deleted after, but must exist during validation)
- Benchmark output (time, memory, throughput numbers from real data)
- Failing test case showing the bug (for bug fixes)
- Note in story's "Technical Notes" section linking to the PoC evidence

### PoC Anti-Patterns

- **PoC after implementation** — defeats the purpose; at that point it's just a regression test
- **PoC on mock data only** — real data uncovers edge cases mocks don't
- **PoC skipped because "obvious"** — if it's obvious, PoC takes 10 minutes; do it anyway

### PoC Validation Checklist (`@po *validate-story-draft`)

For stories with `effort >= 8`:

- [ ] Story has "Technical Notes" or "Proof of Concept" section
- [ ] Evidence linked (script path, benchmark output, issue reproducer, etc.)
- [ ] Core technical assumption explicitly named
- [ ] Measurement or observation cited (not just "it should work")

If any check fails, story stays `Draft`. Prototype first, validate after.

---

## Section 3 — Task Lifecycle (Gates)

Applies when managing task status transitions, starting tasks, or validating readiness.

**Source heuristics:**
- `PV_KE_012` — VMT como Gate Formal entre Qualified e Ready
- `PV_KE_003` — Commit Debt (uncommitted changes threshold)
- `PV_KE_121` — Close-Task Registry Update

### VMT Gate: Qualified → Ready (PV_KE_012)

Toda task passando de `qualified → ready` DEVE executar VMT (Validation-Materialization-Test):

1. **Validate:** Inputs e dependências existem e estão acessíveis
2. **Materialize:** Pré-requisitos criados/disponibilizados
3. **Test:** Readiness confirmada — task pode começar

**Regra:** Dependências DEVEM ser re-verificadas no momento da execução, não apenas na validação inicial. Dependências podem ter sido resolvidas ou invalidadas entre validação e start.

**Anti-pattern:** Assumir que dependências validadas no passado ainda são válidas. Task começa com dependência não resolvida → bloqueia durante execução.

**Auto-move:** VMT GO → task auto-move para status `ready`.

### Commit Debt Threshold (PV_KE_003)

SE sessão tem > 20 arquivos modificados sem commit OU sessão > 2h com mudanças não commitadas:
ENTÃO parar implementação e commitar antes de continuar.

**Anti-pattern:** Acumular mudanças sem checkpoint — perda de trabalho em crash, dificuldade de rollback, PRs gigantes que ninguém revisa.

### Status Transitions (Unified Workflow)

```
captured → qualified → ready → doing → review → done
                                 ↓
                              blocked → (resolve) → doing
                                 ↓
                             cancelled
```

**Transitions que requerem gates:**
- `qualified → ready`: VMT obrigatório
- `doing → review`: Testes passando, PR criado
- `review → done`: QA sign-off

### Close-Task Registry Update (PV_KE_121)

SE task marcada como `done` → ENTÃO atualizar registries afetados ANTES de declarar conclusão.

**Regra:** Done sem registry update não é done. Registries que DEVEM ser verificados:
- `service-catalog.yaml` — se task modificou serviços/apps
- `document-registry.yaml` — se task criou/modificou documentos workspace
- `infrastructure-map.yaml` — se task afetou infraestrutura
- `clickup-tokenization.yaml` — se task materializou estruturas ClickUp
- `ecosystem-registry.yaml` — se task criou/modificou squads

**Anti-pattern:** Task "done" no ClickUp mas infrastructure-map desatualizado — serviço deployado mas não registrado. Drift silencioso acumulado.

---

## Section 4 — 4 Primary Workflows

### Task-First Principle

**Workflows are composed of connected tasks, not connected agents.** Each task defines its inputs, outputs, pre/post-conditions and execution modes. Agents are the **default executors** — but the sequence, rules and dependencies come from task definitions in `.aiox-core/development/tasks/`.

A validated task is law: it must be executed as configured, with all dependencies respected, regardless of who executes it (agent, worker, clone or human).

### 1. Story Development Cycle (SDC) — PRIMARY

**Full 4-phase workflow for all development work.**

| Phase | Agent | Task | Status |
|-------|-------|------|--------|
| 1. Create | @sm | `create-next-story.md` | Draft |
| 2. Validate | @po | `validate-next-story.md` | Draft → Ready |
| 3. Implement | @dev | `dev-develop-story.md` | Ready → InProgress |
| 4. QA Gate | @qa | `qa-gate.md` | InProgress → InReview → Done |

### 2. QA Loop — ITERATIVE REVIEW

```
@qa review → verdict → @dev fixes → re-review (max 5 iterations)
```

**Verdicts:** APPROVE → Done | REJECT → @dev fixes | BLOCKED → Escalate

**Escalation triggers:**
- `max_iterations_reached` (default: 5)
- `verdict_blocked`
- `fix_failure` (after retries)
- `manual_escalate` (user command)

### 3. Spec Pipeline — PRE-IMPLEMENTATION

Transform informal requirements into executable spec.

| Phase | Agent | Output | Skip If |
|-------|-------|--------|---------|
| 1. Gather | @pm | `requirements.json` | Never |
| 2. Assess | @architect | `complexity.json` | source=simple |
| 3. Research | @analyst | `research.json` | SIMPLE class |
| 4. Write Spec | @pm | `spec.md` | Never |
| 5. Critique | @qa | `critique.json` | Never |
| 6. Plan | @architect | `implementation.yaml` | If APPROVED |

**Complexity Classes:**

| Score | Class | Phases |
|-------|-------|--------|
| ≤ 8 | SIMPLE | gather → spec → critique (3) |
| 9-15 | STANDARD | All 6 phases |
| ≥ 16 | COMPLEX | 6 phases + revision cycle |

**Constitutional Gate (Article IV — No Invention):**
Every statement in spec.md MUST trace to FR-*, NFR-*, CON-*, or research finding. NO invented features.

### 4. Brownfield Discovery — LEGACY ASSESSMENT

**10-phase technical debt assessment for existing codebases.**

- **Data Collection (1-3):** @architect → @data-engineer → @ux-design-expert
- **Draft & Validation (4-7):** @architect → @data-engineer → @ux-design-expert → @qa
- **Finalization (8-10):** @architect → @analyst → @pm

### Workflow Selection Guide

| Situation | Workflow |
|-----------|---------|
| New story from epic | Story Development Cycle |
| QA found issues, need iteration | QA Loop |
| Complex feature needs spec | Spec Pipeline → then SDC |
| Joining existing project | Brownfield Discovery |
| Simple bug fix | SDC only (YOLO mode) |

---

## Related Skills

- `full-sdc` — orchestrates the full cycle (**preferred for new work**)
- `story-cycle` — DEPRECATED 2026-04-14 (`replaced_by: full-sdc`); retained only for workflows requiring Synapse L2 preservation via main-context agent activation

---

*Stories & Workflows v1.0 — Sinkra Hub | 2026-05-07 | Merged from story-lifecycle.md (§1) + story-prototyping.md (§2) + task-lifecycle.md (§3) + workflow-execution.md (§4) | Source heuristics: PV_KE_012, PV_KE_003, PV_KE_121*
