---
paths:
  - "squads/**/tasks/**"
  - "squads/**/agents/**"
  - "squads/**/skills/**"
  - "squads/sinkra-squad/**"
  - "squads/code-anatomist/**"
  - "squads/domain-decoder/**"
  - ".claude/skills/**"
  - "docs/stories/**"
  - "docs/adrs/**"
  - "outputs/**"
  - "outputs/sinkra-squad/**"
  - "outputs/code-anatomist/**"
---

# Prior-Art Search — Universal Rule

Applies to any agent, skill, or process claiming that something is missing, absent, or needs to be CREATE'd.

## Rule (NON-NEGOTIABLE)

**Before declaring any artifact, script, task, capability, or pattern as "missing" — you MUST PROVE absence with a documented search.** Unverified gaps fossilize into fictional architecture and downstream work. Burden of proof is on the claimant.

## Why

Observed in `/sinkra-map-process` run on "criacao-slides-ia" (2026-04-20):
- Process-discoverer declared 5 gaps, backed each with a Prior-Art row (Grep/Glob command, match count, verdict)
- Infrastructure-mapper declared 6 CREATE items, backed each with Prior-Art showing no existing candidate
- Score_card flagged this discipline as key reason for 92/100 map-readiness

Without Prior-Art Search:
- Agents hallucinate gaps that already have solutions (REUSE violated)
- Stories get created for work already done elsewhere (waste)
- New scripts/tasks/artifacts get CREATE'd when ADAPT would suffice (duplication)
- `.claude/rules/ids-principles.md` (REUSE > ADAPT > CREATE) becomes aspiration without mechanism

## Required Evidence Format

Every claim of "X is missing / X does not exist / X needs to be created" MUST have a Prior-Art row:

```yaml
- claim: "X is missing"
  search_performed:
    tool: Grep | Glob | Bash(find/ls)
    pattern: "<regex or glob>"
    scope: "<paths searched, e.g. squads/** scripts/** .aiox-core/**>"
  matches: <count>
  match_samples: [<top 3 paths or "none">]
  verdict: CONFIRMED_ABSENT | PARTIAL_MATCH_ADAPT | FOUND_REUSE | FOUND_ALREADY_DONE
  rationale: "<why this verdict, 1 sentence>"
```

## Where to Run

Minimum search scope before declaring absence:
1. `squads/**` (all squad definitions, agents, tasks, workflows, scripts, data)
2. `scripts/**` (repo-wide scripts)
3. `.aiox-core/**` (framework core)
4. `.claude/**` (rules, skills, agents, commands)
5. `packages/**` (if claiming a package/module is missing)
6. `apps/**` (if claiming an app/route is missing)
7. `infrastructure/**` (if claiming infra is missing)

Scopes can be reduced ONLY with justification (e.g. "business-specific artifact, scope limited to `workspace/businesses/{slug}/`").

## When Required

| Activity | Prior-Art required? |
|---|---|
| Declaring a GAP in process discovery | **Yes** — mandatory per row |
| Marking a task as CREATE in executor/infra classification | **Yes** — mandatory per task |
| Proposing a new script, package, rule, or agent | **Yes** |
| Proposing a new ADR or module | **Yes** |
| Claiming "no existing pattern exists" anywhere | **Yes** |
| Continuing existing, documented work | No |
| Bug fix where the bug is already reproduced | No |

## Admissibility

Any claim of absence WITHOUT a Prior-Art row:
- In discovery artifacts (`as_is_doc.md`, `process_map.yaml`) → MUST be removed or backed
- In gap analyses (`capability_gaps.md`, `gap_analysis.md`) → INADMISSIBLE (CREATE tag void)
- In stories (`docs/stories/`) → requires `@po` challenge during validation
- In ADRs → requires `@architect` challenge during review

## Integration

| Skill/Task | Prior-Art enforcement point |
|---|---|
| `/sinkra-map-process` P01 | `gap count declared == Prior-Art rows count` (chief check) |
| `/sinkra-map-process` P07a | `CREATE count == Prior-Art rows count` (chief check) |
| `/validate-story-draft` | PO scans story for absence claims without evidence |
| `/review-story` | QA flags CREATE stories that lack Prior-Art in context |
| `full-sdc` | Executor must cite Prior-Art before CREATE'ing any helper |

## Heuristic (for agents)

When you would write "this does not exist" / "there is no" / "we need to create":
1. STOP
2. Run the Grep/Glob/Bash search
3. Document it
4. Write the claim ONLY if the verdict supports it

## Brownfield Specifics

For brownfield investigation (process mapping, code anatomy, kaizen audit, domain decoding, squad validation), the protocol below adds case-study precision.

### The Founding Incident

A SINKRA brownfield pipeline declared `GAP-CAP-001: generate-squad-registry.js is missing — P1 CRITICAL` and built an entire architecture around creating it. The solution already existed at `squads/squad-creator/scripts/update-claude-command-registry.py` — same function, same sentinel markers, ready to wire up. Four phases (P02 Architecture → P07a Infrastructure) fossilized a fictional gap into a formal squad handoff. Compliance scored 88/100 on a false premise.

Root cause: discovery agent scanned framework-level paths hinted by the prompt but never grepped across squads. The solution lived in a squad's `scripts/` folder, invisible to a framework-only search.

### When Prior-Art Search is Required (brownfield)

| Activity | Required | Rationale |
|----------|----------|-----------|
| Brownfield process mapping (P01 of `/sinkra-map-process`) | YES | Upstream of all architecture |
| Infrastructure mapping (P07a of `/sinkra-map-process`) | YES | Last catch before fossilization |
| Code anatomy (9-phase pipeline) | YES | Business rule extraction must distinguish missing from uncovered |
| Kaizen ecosystem audits | YES | Topology gaps vs. undiscovered components |
| Domain decoding for any existing system | YES | Brownfield by definition |
| Greenfield process mapping | NO | By definition no prior art |
| Skill/agent creation scaffolding | Recommended | Canonical solutions often exist |

### Brownfield 5-Step Protocol

Before declaring `GAP-CAP-*`, `missing_script`, `missing_task`, `missing_agent`, `missing_capability`, `status: CREATE`, or `component does not exist`:

**Step 1 — Name-based grep across the full repo**
```
Grep -r "<proposed_artifact_name>" squads/ scripts/ .aiox-core/ .claude/
```
Record match count and inspect contents. Match with unrelated semantics is still evidence of name collision needing disambiguation.

**Step 2 — Semantic grep**
```
Grep -r "<function_description_keywords>" squads/ scripts/ .aiox-core/ .claude/
```
Example: searching for a CLAUDE.md registry generator → grep for `activation registry`, `CLAUDE.md generation`, `sentinel markers`, `BEGIN GENERATED`.

**Step 3 — Functional glob**
```
Glob squads/*/scripts/*.{py,js,sh}
Glob squads/*/tasks/*.md
```
Filter results by semantic intent and READ the candidates — do not just count.

**Step 4 — Consult canonical registries**
- `squads/sinkra-squad/data/ecosystem-registry.yaml`
- `squads/infra-ops-squad/data/service-catalog.yaml` (if present)
- `CLAUDE.md` — Generated Squad Activation Registry, Tool Selection, Paridade Local-CI

**Step 5 — Document evidence** in the relevant artifact (`as_is_doc.md`, `gap_analysis.md`, `capability_gaps.md`):

```markdown
## Prior-Art Search

| Claim | Search performed | Matches | Verdict |
|-------|------------------|---------|---------|
| `script X is missing` | `Grep -r "X" squads/ scripts/`; `Glob squads/*/scripts/*.py` | 3 | `squad-creator/scripts/update-claude-command-registry.py` does exactly this — not a gap, ADAPT |
| `task Y does not exist` | `Grep "Y" squads/*/tasks/`; semantic grep on "Y purpose" | 0 | confirmed missing |
```

Minimum two search vectors per claim:
- name-grep + semantic-grep OR
- name-grep + functional-glob

### Brownfield Anti-Patterns

- **AP-1 — Tunneled search (framework paths only):** Looking only at `.aiox-core/`, `.claude/hooks/`, `scripts/` while ignoring `squads/*/scripts/` and `squads/*/tasks/`. Solutions often live in the squad that owns the domain.
- **AP-2 — Inheriting upstream confidence:** Trusting a well-formatted `capability_gaps.md` as ground truth. Reformatting is not verification. Re-grep for each claim.
- **AP-3 — Counting instead of reading:** Running grep, seeing "0 matches" for the exact name, concluding absence — without semantic search or functional glob. Artifacts often have different names than the concept.
- **AP-4 — Declaring absence in greenfield reasoning within a brownfield context:** Treating a brownfield process as if nothing existed, because the discovery prompt asked for TO-BE design. AS-IS comes first; TO-BE design must respect what exists.

### Brownfield Enforcement Embedding

Active enforcement in:
- `squads/sinkra-squad/agents/process-discoverer.md` § PRIOR-ART SEARCH PROTOCOL
- `squads/sinkra-squad/agents/infrastructure-mapper.md` § PRIOR-ART SEARCH PROTOCOL
- `squads/sinkra-squad/agents/quality-gatekeeper.md` heuristic "PRIOR-ART AUDIT"
- `squads/sinkra-squad/tasks/discover-process.md` Post-conditions
- `squads/sinkra-squad/tasks/map-infrastructure.md` Post-conditions
- `.claude/skills/sinkra-map-process/SKILL.md` P01 and P07a spawn prompts

## Related

- `squads/sinkra-squad/tasks/discover-process.md` — P01 prior-art protocol (first formalization)
- `squads/sinkra-squad/tasks/map-infrastructure.md` — P07a prior-art protocol

## Anti-Patterns

- **"I think X is missing"** — opinion without search. Inadmissible.
- **"Grep returned 0 results in squads/sinkra-squad/"** — scope too narrow; not repo-wide.
- **"It's new, so no prior-art"** — novelty doesn't exempt; search for similar patterns that could ADAPT.
- **"Obviously missing"** — obvious to whom? Document search anyway; 10 minutes saves a week.

---

*Origin: DEV-2026-001 review + criacao-slides-ia score_card.yaml findings (2026-04-20).*
