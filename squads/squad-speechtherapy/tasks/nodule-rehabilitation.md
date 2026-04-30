# Task: nodule-rehabilitation

> **Command:** `*nodule-rehabilitation {patient_name}`
> **Agent:** Mara Behlau (Vocal Specialist) — Phase 1 & 3; Joseph Stemple — Phase 2; Katherine Verdolini Abbott — Phase 2
> **Purpose:** Complete 12-week vocal nodule rehabilitation protocol integrating vocal rest, hygiene, SOVT, VFE, and LMRVT with structured phase milestones and ENT coordination

---

## Overview

Vocal nodules are benign bilateral lesions at the mid-membranous portion of the vocal folds, resulting from repeated phonotrauma. Conservative management (voice therapy) is the first-line treatment and resolves the majority of nodules without surgery.

This 12-week protocol follows a phased approach:
- **Phase 1 (Weeks 1–4):** Foundation — vocal rest, hygiene, gentle SOVT
- **Phase 2 (Weeks 5–8):** Active rehabilitation — VFE + LMRVT
- **Phase 3 (Weeks 9–12):** Consolidation — CTT + graduated return to singing

---

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `patient_name` | Yes | Patient identifier |
| `--nodule_size` | Yes | `small`, `medium`, `large` (based on laryngoscopy) |
| `--nodule_type` | Yes | `soft_edematous` (more responsive) or `fibrous` (longer treatment) |
| `--singer` | No | Activate singer-specific milestones and return-to-singing track |
| `--choir` | No | Specific for worship/church choir context |
| `--vocal_load` | Yes | `professional` (teacher, preacher) / `recreational_singer` / `non-singer` |
| `--ent_confirmed` | Yes | `true` — laryngoscopy confirmation required before starting |

---

## Preconditions

- Laryngoscopy confirming bilateral nodule diagnosis
- ENT physician has cleared conservative management (no immediate surgical indication)
- Baseline vocal assessment completed (vocal-assessment task)
- Patient motivated for home program compliance (2+ daily sessions)
- Performance schedule documented (singer patients) — realistic timeline set

---

## Execution Steps

---

### PHASE 1: FOUNDATION (Weeks 1–4)

**Lead Agent:** Mara Behlau
**Primary Tasks:** vocal-hygiene-plan + nasal-irrigation-protocol + sovt-protocol (low intensity)
**Goals:** Reduce phonotrauma, establish hygiene, introduce gentle SOVT

---

#### Week 1 — Phonotrauma Reduction + Hygiene

```
WEEK 1 PROTOCOL:

Primary goals:
  - Eliminate high-impact vocal behaviors
  - Establish hydration and nasal irrigation habits
  - Patient education on nodule physiology

Clinical sessions: 2 (45 min each)

Session 1:
  [15 min] Education: What are nodules? Why do they form?
    "Nodules form like calluses — repeated impact of the vocal
     folds creates tissue buildup. Our first job is to stop the
     trauma. No amount of exercise helps if the trauma continues."
  [20 min] Vocal hygiene plan (complete vocal-hygiene-plan task)
  [10 min] Identify high-trauma behaviors (specific to patient)

Session 2:
  [15 min] Nasal irrigation technique demonstration
  [15 min] Introduction to SOVT — humming only (Week 1 level)
  [15 min] Home program review and questions

HOME PROGRAM (5 days/week):
  Morning:
    - 500 mL water immediately on waking
    - Nasal irrigation
    - 10 min humming (gentle /m/ only, comfortable pitch)
    - Steam inhalation (10 min)

  Throughout day:
    - Vocal rest except essential communication
    - No throat clearing — sip water instead
    - No whispering
    - Track water intake (target 2.5 L)

  Evening:
    - Nasal irrigation
    - 10 min humming
    - Vocal load review (how much did I talk today?)

VOCAL REST TYPE: Relative vocal rest (RVR)
  - Reduce vocal load by 50–60%
  - No singing (including humming along to music casually)
  - No shouting, calling, or talking in noise
  - No phone calls > 5 minutes

WEEK 1 MILESTONE:
  Patient can report consistent implementation of:
  □ 2.5 L water/day on 4/5 days
  □ Nasal irrigation 2×/day on 4/5 days
  □ No throat clearing episodes (or < 3/day)
  □ SOVT humming: 10 minutes without fatigue
```

---

#### Weeks 2–3 — SOVT Introduction + Hygiene Consolidation

```
WEEKS 2–3 PROTOCOL:

Clinical sessions: 2 per week (4 sessions total)

SOVT progression (execute sovt-protocol Week 1–2 levels):
  Week 2: Add lip trills to SOVT program
  Week 3: Introduce straw phonation in air (6mm straw)

  All SOVT: Comfort must stay at 8+ at all times
  Duration per session: 15–20 minutes
  No pitch extension beyond comfortable range yet

Vocal load management:
  Week 2: Continue RVR — no singing
  Week 3: Allow very gentle solo humming (familiar songs only,
           humming through closed lips, no open-voice singing)

Home program additions (Week 2):
  + Lip trills: 5 min daily
  + Straw in air: 5 min daily (Week 3 only)

WEEKS 2–3 MILESTONE:
  □ SOVT: lip trills sustainable 10+ seconds
  □ SOVT: straw in air — steady tone 5 seconds, 5 repetitions
  □ Hygiene compliance maintained
  □ Perceptual improvement: clinician notes GRBAS change if any
```

---

#### Week 4 — SOVT Consolidation + Phase 1 Assessment

```
WEEK 4 PROTOCOL:

Clinical sessions: 2 (one mid-week, one end-of-week assessment)

SOVT: Complete Week 2 level (see sovt-protocol):
  - Humming
  - Lip trills
  - Straw in air: scale patterns (do-re-mi)
  - Straw in water: 3 cm depth (introduce)

Mid-week session: Continue SOVT + any hygiene troubleshooting
End-of-week session: Phase 1 checkpoint assessment

PHASE 1 CHECKPOINT ASSESSMENT:
  [ ] Repeat GRBAS — document change from baseline
  [ ] MPT /a/ — compare to baseline
  [ ] s/z ratio — compare to baseline
  [ ] Laryngoscopy re-referral? (if no improvement or worsening)
  [ ] Patient self-report: VHI-10 progress
  [ ] Hygiene adherence: rate 1–10

PHASE 1 → PHASE 2 GATE:
  Minimum criteria to advance:
  ✓ Any measurable improvement in ≥2 of: GRBAS, MPT, s/z ratio
  ✓ Hygiene compliance ≥ 70%
  ✓ SOVT technique established (comfort 8+ on all exercises)
  ✓ No acute laryngitis or hemorrhage

  If NOT met: Extend Phase 1 by 2 weeks, re-assess gate criteria.
```

---

### PHASE 2: ACTIVE REHABILITATION (Weeks 5–8)

**Lead Agents:** Joseph Stemple (VFE) + Katherine Verdolini Abbott (LMRVT)
**Primary Tasks:** vfe-program + resonant-voice-therapy
**Goals:** Active muscular rehabilitation, resonant voice establishment

---

#### Weeks 5–6 — VFE Program Initiation

```
WEEKS 5–6 PROTOCOL:

Execute vfe-program Week 1–2 levels:
  Clinical sessions: 2/week (50 min each)

Session structure (50 min):
  [10 min] SOVT warm-up (straw in water, current level)
  [25 min] VFE — all 4 exercises supervised
  [10 min] LMRVT introduction (Session 5 = Session 1 of LMRVT)
  [5 min]  Home program review

Home program (daily):
  Morning:
    - 10 min SOVT (humming + lip trills)
    - 10 min VFE (full 4-exercise set — 1 set)

  Evening:
    - 10 min VFE (full 4-exercise set — 1 set)
    - 5 min humming cool-down

LMRVT track (parallel to VFE):
  Week 5: LMRVT Sessions 1–2 (foundation + stabilize)
  Week 6: LMRVT Sessions 3–4 (words + phrases)

VFE milestones:
  Week 5: Warm-up /i/ ≥ 8 seconds; all 4 exercises performed
  Week 6: Warm-up ≥ 10 seconds; clean glides (≤ 1 break each)
```

---

#### Weeks 7–8 — VFE + LMRVT Integration

```
WEEKS 7–8 PROTOCOL:

Execute vfe-program Week 3–4 + LMRVT Sessions 5–8:
  Clinical sessions: 2/week

Session structure (55 min):
  [10 min] SOVT warm-up
  [20 min] VFE — full program (expanding range)
  [20 min] LMRVT — functional conversation contexts
  [5 min]  Resonant voice transfer to singing (SINGERS ONLY — brief)

LMRVT focus (weeks 7–8):
  - Spontaneous speech resonance
  - High-demand contexts
  - Near-independent practice

VFE milestones:
  Week 7: Full octave on Power exercise; break-free glides
  Week 8: 15 sec warm-up /i/; octave scale accurate ±½ semitone

PHASE 2 CHECKPOINT ASSESSMENT (end of Week 8):
  [ ] Repeat GRBAS
  [ ] Repeat MPT + s/z ratio
  [ ] LMRVT: % resonant voice in conversation
  [ ] VFE: all 4 exercise quality ratings
  [ ] Laryngoscopy re-referral recommended for nodule re-imaging

PHASE 2 → PHASE 3 GATE:
  ✓ GRBAS-G improved by ≥ 1 point from Phase 1 checkpoint
  ✓ MPT improved by ≥ 20% from baseline
  ✓ Resonant voice present in ≥ 60% of spontaneous speech
  ✓ VFE Power: octave scale without pitch breaks
  ✓ LMRVT Sessions 1–8 complete

  If NOT met: Add 2 weeks bridge program (VFE/LMRVT extension),
  then reassess gate.
```

---

### PHASE 3: CONSOLIDATION (Weeks 9–12)

**Lead Agent:** Jackie Gartner-Schmidt (CTT) / Mara Behlau (return protocol)
**Primary Tasks:** conversation-training + singer-return-protocol
**Goals:** Generalize resonant voice, graduated return to full vocal use

---

#### Weeks 9–10 — Conversation Training (CTT)

```
WEEKS 9–10 PROTOCOL:

Execute conversation-training task (CTT — Gartner-Schmidt):
  Clinical sessions: 2/week

CTT principles applied:
  - Patient-driven conversation topics (high ecological validity)
  - No traditional hierarchy (not "word → phrase → sentence")
  - Motor learning principles (variable practice, reduced feedback)
  - Clinician as conversation partner, not instructor

Session structure (50 min):
  [10 min] VFE warm-up (maintenance set)
  [35 min] CTT conversation session
  [5 min]  Self-monitoring review

Singing reintroduction (singers only — Week 9):
  Prerequisite: Phase 2 gate passed + laryngoscopy re-imaging result reviewed
  Week 9: SOVT vocal warm-up → single-note sustains in mid-range → 3-note patterns
  Week 10: 5-note patterns → simple hymn excerpts (mid-range only)

Week 9–10 milestones:
  □ 80% resonant voice in 10-minute CTT conversation
  □ Self-monitoring reliable (patient can identify lapses)
  □ Singers: mid-range notes sustainable without fatigue
```

---

#### Weeks 11–12 — Graduated Return + Discharge Preparation

```
WEEKS 11–12 PROTOCOL:

Clinical sessions: 2/week (reducing to 1/week in week 12)

Week 11:
  [10 min] VFE maintenance + SOVT warm-up
  [30 min] CTT advanced contexts (phone, noisy simulation, emotional)
  [10 min] Return-to-singing program (singers): execute singer-return-protocol
           Level: mid-range repertoire, 10 minutes practice/day
           Choir: introduce unison singing with group (observer first, then participate)

Week 12:
  Formal discharge session:
  [20 min] Final vocal assessment (full repeat)
  [20 min] Patient demonstrates independence across all exercises
  [10 min] Discharge planning + maintenance program written

FINAL OUTCOME ASSESSMENT:
  [ ] GRBAS compared to all three time points (baseline, Phase 1 CP, Phase 2 CP)
  [ ] MPT + s/z ratio
  [ ] VHI-10 final score
  [ ] Laryngoscopy re-referral for final imaging (ENT letter)

DISCHARGE CRITERIA:
  ✓ GRBAS-G ≤ 1 (mild or normal)
  ✓ MPT ≥ 80% of age/sex norms
  ✓ VHI-10 ≤ 10 (mild or no handicap)
  ✓ Resonant voice in ≥ 80% spontaneous speech
  ✓ Independent home maintenance program established
  ✓ Singers: cleared for repertoire by ENT imaging + clinician
```

---

## Phase Summary Table

| Phase | Weeks | Lead | Key Tasks | Gate Criteria |
|-------|-------|------|-----------|---------------|
| 1: Foundation | 1–4 | Mara Behlau | hygiene-plan + nasal-irrigation + SOVT | Hygiene 70%, SOVT established, any measurable improvement |
| 2: Active Rehab | 5–8 | Stemple + Verdolini | vfe-program + resonant-voice-therapy | GRBAS +1pt, MPT +20%, 60% resonant voice |
| 3: Consolidation | 9–12 | CTT + Return | conversation-training + singer-return | GRBAS ≤ 1, MPT 80% norm, VHI-10 ≤ 10 |

---

## Output

### 12-Week Progress Summary Report

```markdown
# Nodule Rehabilitation — 12-Week Summary

**Patient:** [Name]
**Protocol Dates:** [Start] – [End]
**Diagnosis:** Bilateral vocal nodules ([size], [type])

## Outcome Measures

| Measure | Baseline | Phase 1 CP (W4) | Phase 2 CP (W8) | Discharge (W12) |
|---------|----------|-----------------|-----------------|-----------------|
| GRBAS-G | | | | |
| MPT /a/ (sec) | | | | |
| s/z ratio | | | | |
| VHI-10 | | | | |

## Gate Compliance
Phase 1 → 2: [Met / Extended by X weeks]
Phase 2 → 3: [Met / Extended by X weeks]

## Singer Track
Return-to-singing status: [Not applicable / Cleared / Pending ENT]
Repertoire level at discharge: [description]

## Maintenance Plan
[Written plan — exercises, frequency, self-monitoring strategy]

## Recommendations
[ ] ENT follow-up laryngoscopy: [date]
[ ] Return to therapy if: [criteria]
[ ] Choir director communication: [needed / not needed]
```

---

## Validation

| Criterion | Standard | Fail Condition |
|-----------|----------|----------------|
| Phase gate checked before advancing | Formal gate assessment at W4 and W8 | Automatic progression without gate |
| ENT confirmation before protocol start | Laryngoscopy diagnosis documented | Starting without confirmed diagnosis |
| Singer return: no singing before clearance | Written ENT clearance in file | Singer returning before clearance |
| All three task modules executed | SOVT + VFE + LMRVT all documented | Any module skipped |
| Maintenance program written at discharge | Document in patient file | Verbal only |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Starting Phase 2 exercises without Phase 1 gate passed | BLOCK — must establish hygiene and SOVT before muscular rehabilitation | NON-NEGOTIABLE |
| Any singing (open-voice) during Phase 1 | BLOCK — even "light" singing traumatizes nodules during rest phase | NON-NEGOTIABLE |
| Skipping laryngoscopy re-imaging before singer return | BLOCK — singer return without imaging risks hemorrhage | NON-NEGOTIABLE |
| Patient reports sudden voice loss or throat pain | STOP ALL EXERCISE — refer to ENT same day | NON-NEGOTIABLE |
| Fibrous nodules not resolving by week 10 | FLAG for ENT surgical consultation — conservative management may be insufficient | MUST |

---

**Protocol note:** "There are no shortcuts to nodule rehabilitation. Twelve weeks of consistent work beats twelve months of partial effort. The folds need time, gentleness, and systems — not heroics."
