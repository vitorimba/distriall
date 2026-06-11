# Complete Findings Resolution — Sinkra Hub

Applies when any review, audit, or analysis produces a list of findings, gaps, fixes, or actions.

## Non-Negotiable Rule

**ALL findings from ANY review must be resolved. No exceptions.**

When a review tool (Roundtable, Advisory Council, Three-Brain, CodeRabbit, Codex, @architect, @qa, or any analysis) returns N findings, ALL N must be addressed. Cherry-picking "blockers only" is a process violation.

## What "Resolved" Means

Each finding must be in ONE of these states:

| State | Meaning | Allowed? |
|-------|---------|----------|
| **FIXED** | Applied to the artifact | YES |
| **WON'T_FIX** | Explicitly rejected with written justification | YES (rare) |
| **DEFERRED** | Tracked in a story/task with owner and deadline | YES (with tracking) |

**NOT allowed:**
- Silently omitted (finding exists but no action taken)
- "Follow-up" without a tracked story/task
- "Non-blocking" used as justification to skip

## Prioritization vs Omission

Prioritization determines ORDER of execution, not WHETHER to execute:

```
CORRECT:
  1. Apply CRITICAL findings first
  2. Apply HIGH findings second
  3. Apply MEDIUM findings third
  4. Apply LOW findings fourth
  → Result: 31/31 resolved

WRONG:
  1. Apply 6 "blocking" findings
  2. "The rest can go as follow-up"
  → Result: 6/31 resolved, 25 abandoned
```

## Anti-Patterns

1. **"Apply blockers, defer the rest"** — "defer" without tracking = abandon
2. **"Non-blocking, can go in Wave 2"** — Wave 2 without a story = never
3. **"These are just MEDIUM/LOW"** — severity determines order, not inclusion
4. **"We'll get to those later"** — later without a task = never
5. **Presenting only top-N findings** — if the tool found 31, report 31

## Where This Applies

- Roundtable verdicts and conditions
- Advisory Council findings
- CodeRabbit review findings
- Codex adversarial reviews
- Three-Brain audit outputs
- QA gate findings (review-story, sinkra-review)
- Any agent analysis that produces an action list

## Enforcement

This rule is GOVERNANCE — enforced by agent compliance, not hooks.

Every review skill output MUST include:
```
## Resolution Tracking
| Finding | Status | Action |
| F01     | FIXED  | Applied in v1.5.0 |
| F02     | FIXED  | Applied in v1.5.0 |
| ...     | ...    | ... |
Total: {resolved}/{total} ({percentage}%)
```

100% resolution is the only acceptable outcome. Partial resolution requires explicit justification per finding.

---

*Complete Findings Resolution v1.0 — Sinkra Hub*
*Source: Feedback PV-2026-05-07 — cherry-picking findings is process debt*
