# Pro Pipeline Execution Checklist

> MANDATORY: This checklist MUST be loaded at the start of every `*pro-pipeline` execution.
> Each phase MUST be marked [x] before proceeding to the next.
> Skipping a phase without marking it [SKIP: reason] is a VIOLATION.

---

## Gate Rules

1. **READ THIS FILE FIRST** — Before executing any phase, read this entire checklist
2. **LOAD TASK FILES** — Each phase references specific task/workflow files. You MUST read and follow them, not improvise
3. **MARK PROGRESS** — Update this checklist in real-time as you complete each phase
4. **STATE FILE** — Write `.pipeline-state.yaml` after each phase completion
5. **GATE CHECK** — Before advancing, verify the gate condition. If FAIL, enter fix cycle
6. **NO SHORTCUTS** — "Fazendo conversacionalmente" is NOT allowed. Load the task, follow the steps

---

## Pre-Execution

- [ ] **LOAD** this checklist file at start of `*pro-pipeline`
- [ ] **CREATE** `.pipeline-state.yaml` in squad dir with: squad_name, domain, mode, started_at, current_phase: init
- [ ] **CONFIRM** inputs: domain, mode (from-scratch/from-prd/from-sources), depth (simple/standard/enterprise)

---

## PRE-GATE: Duplicate Check

- [ ] **READ** squad-registry.yaml (if exists)
- [ ] **SCAN** squads/ for domain keyword matches
- [ ] **REPORT** findings to user
- [ ] **DECIDE** create new / extend existing / abort
- [ ] **UPDATE** state file: current_phase: pre_gate, status: complete

**Gate:** User confirmed "create new" → proceed

---

## F0: PRD & Deep Planning

- [ ] **LOAD** task: `plan-squad-contract.md` — Execute preflight
- [ ] **LOAD** task: `plan-squad-depth-calibration.md` — Determine simple/standard/enterprise
- [ ] **LOAD** task: `plan-squad-domain-mapping.md` — Research domain sub-areas
- [ ] **LOAD** task: `plan-squad-architecture.md` — Define tiers, agents, handoffs
- [ ] **LOAD** task: `plan-squad-challenge-reorder.md` — Devil's advocate on architecture
- [ ] **LOAD** task: `plan-squad-roadmap.md` — Sequence build phases
- [ ] **LOAD** task: `plan-squad-prd-assembly.md` — Generate formal PRD
- [ ] **SAVE** PRD to `squads/{name}/docs/PRD-{name}.md`
- [ ] **UPDATE** state file: current_phase: f0, status: complete, outputs: [prd_path]

**Gate:** PRD has: domain map, architecture, tier plan, roadmap → proceed
**Skip condition:** mode == from-prd (user provides prd_path)

---

## F1: Tool Discovery

- [ ] **LOAD** workflow: `wf-discover-tools.yaml`
- [ ] **EXECUTE** 5 discovery categories: MCPs, APIs, CLIs, Libraries, GitHub projects
- [ ] **SCORE** each tool by impact vs effort
- [ ] **SAVE** discoveries to tool-registry additions
- [ ] **UPDATE** state file: current_phase: f1, status: complete

**Gate:** At least 1 tool category discovered → proceed (advisory, not blocking)
**Skip condition:** mode == from-sources

---

## F2: Research Elite Minds

- [ ] **LOAD** workflow: `mind-research-loop.md`
- [ ] **EXECUTE** Iteration 1: Broad scan — list all candidates
- [ ] **EXECUTE** Iteration 2: Devil's advocate — cut non-framework minds
- [ ] **EXECUTE** Iteration 3: Framework validation — verify documented methods
- [ ] **EXECUTE** Iteration 4 (if needed): Final curation
- [ ] **CLASSIFY** each mind by tier (0/1/2/3)
- [ ] **PRESENT** final list to user with frameworks
- [ ] **GET APPROVAL** from user before proceeding
- [ ] **UPDATE** state file: current_phase: f2, status: complete, outputs: [minds_list]

**Gate:** Minimum minds validated (simple: 3, standard: 5, enterprise: 8) → proceed
**Skip condition:** mode == from-sources OR squad type == pipeline (no minds needed)

---

## F3: Clone DNA (per mind)

For EACH approved mind that is a real person/expert:

- [ ] **LOAD** workflow: `wf-clone-mind.yaml`
- [ ] **STEP 3.1** Brownfield check — mind already cloned?
- [ ] **STEP 3.2** Auto-acquire sources (if no materials provided)
- [ ] **STEP 3.3** Collect + validate sources — quality sufficient?
- [ ] **STEP 3.4** Extract Voice DNA — vocabulary, tone, signature phrases
- [ ] **STEP 3.5** Extract Thinking DNA — frameworks, heuristics, decisions
- [ ] **STEP 3.6** Synthesis — combine into agent block
- [ ] **STEP 3.7** Smoke test — 3 behavioral scenarios: PASS/FAIL
- [ ] **STEP 3.8** Quality dashboard — metrics for this clone
- [ ] **SAVE** DNA to `outputs/minds/{slug}/`

Repeat for each mind. Then:

- [ ] **UPDATE** state file: current_phase: f3, status: complete, outputs: [mind_dna_collection]

**Gate:** Each mind: smoke tests 3/3 PASS, voice quality >= 8/10 → proceed
**Skip condition:** Squad type == pipeline (no minds, agents are functional)

---

## F4: Build Squad

- [ ] **LOAD** workflow: `wf-create-squad.yaml`
- [ ] **CREATE** config.yaml — SSOT with ALL components listed
- [ ] **CREATE** config/ — coding-standards.md, tech-stack.md, source-tree.md (if standard+)
- [ ] **CREATE** agents/ — chief (direct) + mind clones (with DNA) + functional agents
- [ ] **CREATE** tasks/ — all tasks referenced in config
- [ ] **CREATE** workflows/ — all workflows referenced in config
- [ ] **CREATE** templates/ — all templates referenced in config
- [ ] **CREATE** checklists/ — all checklists referenced in config
- [ ] **CREATE** data/ — KBs, catalogs, reference files
- [ ] **CREATE** scripts/ — if needed
- [ ] **VERIFY** SSOT: every file in every directory is listed in config.yaml
- [ ] **VERIFY** naming: config filenames EXACTLY match disk filenames (NO abbreviations)
- [ ] **UPDATE** state file: current_phase: f4, status: complete

**Gate:** config.yaml valid, all files exist, SSOT check passes → proceed

---

## F4.5: Documentation

- [ ] **LOAD** task: `create-documentation.md`
- [ ] **CREATE** README.md — overview, agents table, commands, pipeline diagram, requirements
- [ ] **CREATE** docs/ guides (if enterprise depth)
- [ ] **UPDATE** state file: current_phase: f4_5, status: complete

**Gate:** README.md exists and documents all components → proceed

---

## F5: Validate (5 subtasks)

- [ ] **LOAD** task: `validate-squad-deterministic.md`
  - [ ] Type detection (expert/pipeline/hybrid)
  - [ ] Structure validation (config, entry agent, dirs)
  - [ ] Security scan (secrets, eval, injection)
  - [ ] Coverage analysis (checklists, orphans, data usage)

- [ ] **LOAD** task: `validate-squad-cross-references.md`
  - [ ] Config → agents (all exist?)
  - [ ] Config → tasks (all exist? names match?)
  - [ ] Config → workflows (all exist?)
  - [ ] Config → templates, checklists, data (all exist?)
  - [ ] Tasks → agents/templates referenced exist?
  - [ ] Workflows → tasks referenced exist?

- [ ] **LOAD** task: `validate-squad-quality.md`
  - [ ] Agent quality: YAML block, whenToUse, activation-instructions, commands
  - [ ] Task quality: inputs, outputs, steps, acceptance criteria
  - [ ] Template quality: placeholders, structure

- [ ] **LOAD** task: `validate-squad-contextual.md`
  - [ ] Overlap with installed squads?
  - [ ] Integration opportunities?
  - [ ] Conflicts?

- [ ] **LOAD** task: `validate-squad-verdict.md`
  - [ ] Calculate score per dimension
  - [ ] Check veto conditions
  - [ ] Emit verdict: PASS (>= 8.0) / CONCERNS (7.0-7.9) / FAIL (< 7.0)

- [ ] **SAVE** validation report
- [ ] **UPDATE** state file: current_phase: f5, status: complete, score: {X}

**Gate:** Score >= 7.0, zero veto conditions → proceed. If FAIL → F5.5

---

## F5.5: QA Fix Cycle

- [ ] **LOAD** task: `qa-after-creation.md`
- [ ] **READ** issues from F5 validation
- [ ] **FIX** each issue (max 3 iterations):
  - [ ] Iteration 1: Fix all issues
  - [ ] Re-validate (re-run F5 checks)
  - [ ] Iteration 2 (if needed): Fix remaining
  - [ ] Re-validate
  - [ ] Iteration 3 (if needed): Fix or escalate
- [ ] **VERIFY** score >= 7.0 after fixes
- [ ] **UPDATE** state file: current_phase: f5_5, status: complete, post_fix_score: {X}

**Gate:** Post-fix score >= 7.0 → proceed. After 3 iterations still failing → ESCALATE

---

## F6: Optimize

- [ ] **LOAD** workflow: `wf-optimize-squad.yaml`
- [ ] **ANALYZE** executor distribution (Worker vs Agent per task)
- [ ] **ANALYZE** workflow parallelization opportunities
- [ ] **ANALYZE** gap-zero (handoff coverage)
- [ ] **APPLY** optimizations (if --implement flag)
- [ ] **SAVE** optimization report
- [ ] **UPDATE** state file: current_phase: f6, status: complete

**Gate:** Report generated → proceed
**Skip condition:** depth == simple

---

## F7: Lifecycle + Save

- [ ] **LOAD** workflow: `lifecycle-squad.yaml`
- [ ] **INSTALL** squad to squads/ + slash commands to .claude/commands/
- [ ] **VALIDATE** via lifecycle (5 subtasks — can use F5 results if recent)
- [ ] **UPGRADE** apply fixes if needed
- [ ] **CERTIFY** write `.lifecycle-certified.json` with score, verdict, metadata
- [ ] **SAVE** zip to source path (replace if exists)
- [ ] **VERIFY** zip integrity: `unzip -t`
- [ ] **UPDATE** state file: current_phase: f7, status: complete

**Gate:** Lifecycle score >= 8.0, verdict != FAIL, zip valid → proceed

---

## F8: Context Stack

- [ ] **LOAD** workflow: `wf-install-context-stack.yaml`
- [ ] **AUDIT** what the squad needs for activation
- [ ] **GENERATE** greeting script (if applicable)
- [ ] **REGISTER** all agents as slash commands in `.claude/commands/{squad}/`
- [ ] **VERIFY** heading check: each command file starts with `# {agent-name}`
- [ ] **TEST** activation: invoke chief agent and verify greeting displays
- [ ] **UPDATE** state file: current_phase: f8, status: complete

**Gate:** All slash commands registered, chief activates correctly → proceed

---

## F9: Handoff

- [ ] **LOAD** task: `refresh-registry.md` — Update squad-registry.yaml
- [ ] **EXECUTE** slash command sync (if IDE skills apply)
- [ ] **LOAD** task: `briefing-squad.md` — Generate briefing
  - [ ] Save to `outputs/squad-briefings/{name}-briefing-{date}.md`
- [ ] **RUN** squad-analytics for the new squad
- [ ] **SMOKE TEST E2E** — Activate chief, test 3 scenarios:
  - [ ] Scenario 1: Chief activation — greeting displays correctly?
  - [ ] Scenario 2: Routing — chief routes to correct agent?
  - [ ] Scenario 3: Task execution — primary task works?
- [ ] **GENERATE** pipeline report
  - [ ] Save to `outputs/squad-pipeline/{name}-pipeline-{date}.md`
- [ ] **UPDATE** state file: current_phase: f9, status: complete
- [ ] **MARK** state file: pipeline_status: COMPLETE

**Gate:** Smoke test passes, reports generated → PIPELINE COMPLETE

---

## Pipeline State File Format

Save at `squads/{name}/.pipeline-state.yaml` after each phase:

```yaml
pipeline:
  id: wf-squad-pro-pipeline
  squad_name: "{name}"
  domain: "{domain}"
  mode: "{mode}"
  depth: "{depth}"
  started_at: "{timestamp}"
  last_updated: "{timestamp}"
  current_phase: "{phase_id}"
  pipeline_status: "in_progress | complete | failed | paused"
  phases:
    pre_gate: { status: complete, timestamp: "..." }
    f0: { status: complete, timestamp: "...", outputs: ["prd_path"] }
    f1: { status: complete, timestamp: "..." }
    f2: { status: complete | skipped, timestamp: "..." }
    f3: { status: complete | skipped, timestamp: "..." }
    f4: { status: complete, timestamp: "...", files_created: N }
    f4_5: { status: complete, timestamp: "..." }
    f5: { status: complete, timestamp: "...", score: X.X }
    f5_5: { status: complete | skipped, timestamp: "...", fixes: N }
    f6: { status: complete | skipped, timestamp: "..." }
    f7: { status: complete, timestamp: "...", certified_score: X.X }
    f8: { status: complete, timestamp: "...", commands_registered: N }
    f9: { status: complete, timestamp: "...", smoke_test: "pass | fail" }
  scores:
    pre_fix: X.X
    post_fix: X.X
    lifecycle: X.X
    final: X.X
```

---

## Enforcement Rules

1. **NEVER proceed to next phase without marking current phase [x]**
2. **NEVER skip loading a task file** — read it, follow its steps
3. **NEVER generate config.yaml separately from file creation** — create files FIRST, then list them in config
4. **ALWAYS verify SSOT** after F4: `ls {dir}/ | sort` must match config entries
5. **ALWAYS run 5 subtasks in F5** — no "just counting files"
6. **ALWAYS write state file** — enables pause/resume across sessions
7. **ALWAYS run smoke test in F9** — activate the chief and test 3 scenarios
8. **If a gate FAILS**, enter fix cycle — never mark as PASS and continue
