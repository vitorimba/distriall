# Task: singer-return-protocol

> **Command:** `*singer-return-protocol {patient_name}`
> **Agent:** Joseph Stemple + Katherine Verdolini Abbott (joint protocol)
> **Purpose:** Graduated return-to-singing protocol for singers recovering from vocal injury, with specific adaptations for worship/church choir context

---

## Overview

Return to singing after vocal injury is not a binary decision — it is a graduated process that must respect tissue healing timelines, muscular reconditioning, and the psychological readiness of the singer. This protocol provides a structured, stage-gated program that moves from single-note sustains through full repertoire performance.

Specific consideration is given to:
1. **Graduated vocal loading** — increasing duration, range, and intensity systematically
2. **Range recovery** — sequential re-expansion of usable range
3. **Stamina building** — increasing sustainable practice time
4. **Performance readiness assessment** — formal criteria before return to public performance
5. **Worship/church choir context** — unison singing, blend, acoustic demands

---

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `patient_name` | Yes | Patient identifier |
| `--injury_type` | Yes | `nodule`, `polyp`, `hemorrhage`, `MTD`, `post_surgical` |
| `--weeks_since_clearance` | Yes | Weeks since ENT clearance for return |
| `--voice_type` | Yes | `soprano`, `mezzo`, `alto`, `tenor`, `baritone`, `bass` |
| `--choir_role` | No | `section_leader`, `soloist`, `ensemble`, `worship_leader` |
| `--performance_date` | No | Target return date (informs timeline pressure) |
| `--repertoire` | No | Current repertoire type: `classical`, `contemporary_worship`, `gospel`, `mixed` |

---

## Preconditions

- ENT laryngoscopy clearance documented (written clearance in file)
- Nodule rehabilitation program (or equivalent) completed
- GRBAS-G ≤ 1 at clearance assessment
- MPT ≥ 75% of age/sex norms
- Patient has demonstrated resonant voice in conversational contexts
- Patient has received vocal hygiene plan and is compliant
- If post-hemorrhage: minimum 4 weeks complete vocal rest cleared by ENT before this protocol

---

## Execution Steps

### Phase 1: Vocal Warm-Up Reestablishment (Days 1–7)

```
PHASE 1 GOAL:
  Re-establish the voice warm-up habit using non-stressful phonation.
  No repertoire. No range extension. No performance.

Duration: 7 days
Daily time: 15 minutes total
Frequency: Once per day (morning preferred)

Day 1–2:
  [5 min]  Saline steam inhalation
  [5 min]  Nasal breathing warm-up (no phonation)
  [5 min]  Humming: /m/ on speaking pitch only
             - 5 repetitions × 5 seconds
             - Comfort must be 10/10

Day 3–4:
  [5 min]  Steam
  [5 min]  Humming warm-up
  [5 min]  Lip trills: comfortable pitch only
             - 5 repetitions × 5 seconds
             - Comfort 9–10

Day 5–7:
  [5 min]  Steam
  [5 min]  Humming + lip trills
  [5 min]  Straw phonation in air: single comfortable note
             - 5 repetitions × 5 seconds
             - No pitch variation yet
             - Comfort 9–10

PHASE 1 EXIT CRITERIA:
  □ 15-minute program completed daily for 5/7 days
  □ No fatigue after session
  □ No post-exercise vocal change (quality same before/after)
  □ Comfort 9–10 throughout
```

---

### Phase 2: Single-Note Sustains — Finding the Voice (Days 8–14)

```
PHASE 2 GOAL:
  Reintroduce open-voice phonation in the safest range.
  Discover current comfortable range (may be reduced from pre-injury).

Duration: 7 days
Daily time: 20 minutes
Frequency: Once per day

Exercise sequence:
  [5 min]  SOVT warm-up (straw in air)
  [10 min] Single-note sustains on /o/ vowel:
             Start at comfortable speaking pitch
             Sustain 5 seconds per note
             Move ONE semitone at a time — up then down
             Stop if any strain or fatigue
             Map usable range: first and last comfortable note

  [5 min]  Humming cool-down

RANGE MAPPING PROCEDURE:
  Session 1: Find "safe zone" — continuous 3 notes with
             comfort 8+ and no audible tension
  Session 2–3: Expand safe zone by 1 semitone each direction/day
             Only expand if previous note still comfortable
  Session 4–7: Continue gradual expansion

Range expectations:
  Early recovery: Safe zone may be only 5–8 semitones
  End of Phase 2: Safe zone should be 1–1.5 octaves
  If safe zone < 5 semitones by Day 14 → extend Phase 2 / consult clinician

NOTATION:
  Document daily: [lowest safe note] — [highest safe note]
  Track expansion rate over the 7 days
```

---

### Phase 3: Simple Melodic Patterns (Days 15–21)

```
PHASE 3 GOAL:
  Move from single-note sustains to simple melodic movement.
  Introduce step-wise motion within the safe zone.

Duration: 7 days
Daily time: 25 minutes
Frequency: Once per day

Exercise sequence:
  [5 min]  SOVT warm-up (straw in water + in air)
  [5 min]  Single-note check (confirm safe zone still intact)
  [12 min] Melodic patterns within safe zone:

  Day 1–2: 3-note patterns (do-re-mi-re-do) on /o/
  Day 3–4: 5-note scales (do-re-mi-fa-sol) on /o/ and /a/
  Day 5–6: Arpeggios (1-3-5) on /o/
  Day 7: Full 8-note scale within safe zone on /o/ and /a/

  [3 min]  Humming cool-down

QUALITY TARGETS:
  - No register breaks in safe zone
  - Resonant voice quality (forward buzz) maintained
  - No compensatory tension (self-monitor via throat sensation)
  - Comfort 8+ throughout

SINGER SELF-CHECK AFTER EACH SESSION:
  "Is my voice the same or better than when I started?"
  Same or better → safe to continue
  Worse → STOP and contact clinician

Worship context adaptation:
  Use familiar worship melody fragments as melodic patterns
  (instead of generic scales):
  "How Great is Our God" melody: use as 8-note pattern in safe zone
  "Good Good Father": stepwise excerpts in safe zone
```

---

### Phase 4: Repertoire Introduction (Days 22–35)

```
PHASE 4 GOAL:
  Begin singing actual repertoire, starting with easiest pieces.
  Introduce choir blend and unison singing (if applicable).

Duration: 14 days
Daily practice time: 30 minutes (maximum)
Frequency: Once per day (not consecutive 7 days — rest one day in 7)

REPERTOIRE SELECTION CRITERIA (ranked easiest → hardest):
  Tier 1 (start here):
  - Mid-range tessiture (avoids passaggio and extremes)
  - Slow to moderate tempo (no sustained high notes)
  - Simple harmonics (unison or easy intervals)
  - No dramatic climax phrases
  Examples (worship): "Oceans" (Chris Tomlin — lower key),
                       "What a Beautiful Name" (verse only, not chorus peak)

  Tier 2 (week 2 of phase):
  - Slightly wider range
  - Small climactic moments within safe zone
  - Add choral blend (rehearsal with section)

  Tier 3 (if progressing well, last 3–4 days):
  - Normal tessiture for voice type
  - Moderate dynamic variation
  - First full song run-through

DAILY SESSION STRUCTURE:
  [10 min] SOVT + VFE warm-up (reduced — 1 set each)
  [5 min]  Scales / arpeggios in singing register
  [15 min] Repertoire practice (Tier 1 → 2 → 3 progression)
             15 minutes = approximately 3–4 songs maximum
             Do NOT practice more — endurance builds slowly
  [5 min]  Cool-down humming

CHOIR REINTEGRATION (worship/church choir):
  Day 22–28: Attend rehearsal as observer — do not sing
             "Listen to blend, watch director, feel the music"
             This is not passive — it is active ear training
  Day 29–32: Sing softly in unison passages only (pp dynamic)
             No part-singing yet
             Sit next to strong, healthy section member
  Day 33–35: Sing at moderate dynamic
             Section leader monitors for any strain signs
             Clinician informed of first rehearsal performance
```

---

### Phase 5: Stamina Building (Days 36–50)

```
PHASE 5 GOAL:
  Gradually increase daily practice duration toward pre-injury capacity.
  Expand dynamic range and safe zone to full voice type range.

Duration: 15 days
Frequency: Once per day, 6 days/week (one full rest day)

Week 1 of Phase 5 (Days 36–42):
  Daily practice: 35 minutes
  Structure:
    [10 min] Full SOVT + VFE warm-up
    [20 min] Repertoire — Tier 2–3 material
    [5 min] Cool-down

  Range: Push safe zone gently toward full voice type range
    Soprano: aim for F4–G5 comfortable by end of week
    Alto: aim for A3–D5
    Tenor: aim for B2–D4
    Baritone: aim for G2–B3

Week 2 of Phase 5 (Days 43–50):
  Daily practice: 40–45 minutes
  Structure:
    [10 min] Warm-up
    [30 min] Repertoire — Tier 3 + some Tier 4 (climactic phrases)
    [5 min]  Cool-down

  Dynamic range:
    Introduce pp → mf → f → ff (only if voice is fully supported)
    "Louder from airflow, never from throat pressure"

STAMINA TRACKING:
  Track each day:
  - Practice duration completed
  - Any fatigue onset (at what minute?)
  - Voice quality at end (same / better / worse)
  - Recovery time (how long to return to baseline quality)

  Red flags requiring protocol pause:
  - Fatigue onset before 20 minutes
  - Voice worse than start after cool-down
  - Recovery time > 2 hours
```

---

### Phase 6: Performance Readiness Assessment (Days 51–60)

```
PHASE 6 GOAL:
  Formal assessment of readiness for public performance.
  Final ENT laryngoscopy recommended before professional performance.

Duration: 10 days (2 sessions/week + assessment session)

PRE-PERFORMANCE REHEARSAL SIMULATION:
  Days 51–56:
    Simulate performance conditions:
    - Full repertoire run-through (as if in performance)
    - Perform full set with minimal stops
    - Record audio for review
    - Evaluate: fatigue onset, quality consistency, range coverage

  Days 57–59: Address any remaining gaps
  Day 60: Formal assessment session

PERFORMANCE READINESS ASSESSMENT — 6-Domain Check:

1. RANGE COVERAGE
   □ Full usable range for voice type restored (≥ 80% pre-injury)
   □ No major aphonic notes in repertoire range
   □ Safe zone covers all repertoire requirements

2. STAMINA
   □ Can complete full set (45–90 min) without fatigue
   □ Voice same or better quality at end of practice vs. start
   □ Recovery time < 30 minutes post-practice

3. DYNAMIC RANGE
   □ pp sustainable (resonant, not breathy)
   □ ff sustainable (airflow, not laryngeal pressure)
   □ Dynamic variation expressive, not functional limitation

4. RESONANCE QUALITY
   □ Forward resonance (buzz) present in 80%+ of singing
   □ No compensatory throat tension
   □ GRBAS-G ≤ 1 during singing sample

5. SELF-MONITORING
   □ Patient can self-identify when voice is "on" vs. "compensating"
   □ Patient has reset strategy (SOVT → open voice)
   □ Patient knows when to stop and call clinician

6. HYGIENE COMPLIANCE
   □ Pre-performance hygiene ritual established
   □ Post-performance recovery routine established
   □ Triggers identified and managed

PERFORMANCE CLEARANCE DECISION:
  ALL 6 domains check = CLEARED for return to performance
  Any domain failing = CONTINUE protocol / address specific gap
  Surgical follow-up required: fibrous nodule, any new lesion signs
```

---

## Worship/Church Choir Specific Guidance

```
WORSHIP CONTEXT ADAPTATIONS:

Acoustic considerations:
  - Contemporary worship amplification: microphone work reduces
    need for projected classical technique — advantage for healing
  - In-ear monitors (IEMs): allow hearing yourself clearly,
    reduces tendency to push for audibility
  - Live-room monitoring: if IEMs unavailable, work with sound
    tech to ensure fold-back is adequate

Choir blend protocol:
  Week 1 back: Sing at 60% of normal volume
               Blend into section — do not lead
               If section leader, temporarily step to ensemble role

  Week 2 back: Sing at 80%
               Can re-assume section leadership role (non-solo)

  Week 3 back: Full integration if assessment passed

Worship leader return:
  More demanding than choir — solo role, emotive expression,
  spoken transitions, extended set length
  Add 2 additional weeks to Phase 5 before worship leader return
  First return service: abbreviated set (20–25 min max)
  Worship leader should have SOVT warm-up backstage

Sunday morning voice:
  "Morning voice is physiologically unprepared for performance"
  Protocol:
  - Wake 90 minutes before service (not 20 minutes before!)
  - 500 mL water on waking
  - Nasal irrigation
  - 15-minute SOVT warm-up minimum
  - No cold beverages, no dairy morning of performance
```

---

## Output

### Return-to-Singing Progress Log

```markdown
# Singer Return Protocol — Progress Log

**Patient:** [Name] | **Voice type:** [type] | **Choir role:** [role]
**Injury:** [type] | **Clearance date:** [date]

## Phase Progress

| Phase | Target Duration | Start Date | Exit Date | Exit Criteria Met |
|-------|----------------|------------|-----------|-------------------|
| 1: Warm-up | 7 days | | | □ |
| 2: Single notes | 7 days | | | □ |
| 3: Patterns | 7 days | | | □ |
| 4: Repertoire | 14 days | | | □ |
| 5: Stamina | 15 days | | | □ |
| 6: Assessment | 10 days | | | □ |

## Performance Readiness Assessment
Date: [date]
Range: □ Pass / □ Fail
Stamina: □ Pass / □ Fail
Dynamic: □ Pass / □ Fail
Resonance: □ Pass / □ Fail
Self-monitoring: □ Pass / □ Fail
Hygiene: □ Pass / □ Fail

Overall: □ CLEARED □ EXTEND — [notes]

## Return Performance Date
[date]
```

---

## Validation

| Criterion | Standard | Fail Condition |
|-----------|----------|----------------|
| Phase gate criteria checked before advancing | Documented exit criteria for each phase | Automatic time-based progression |
| ENT clearance in file before Protocol start | Written clearance document | Verbal clearance only |
| Range documentation daily in Phase 2 | Lowest and highest safe note logged | General impression only |
| Performance readiness: all 6 domains | Formal checklist signed | Subjective clearance |
| Choir director notified of return plan | Written communication sent | Surprise return without coordination |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Returning to performance before Phase 6 assessment | BLOCK — premature return risks reinjury before tissue has healed | NON-NEGOTIABLE |
| Singing at full volume in Phases 1–2 | BLOCK — graduated loading means quiet first; full volume is a Phase 5+ goal | NON-NEGOTIABLE |
| Worship leader returning without abbreviated set agreement | BLOCK — full-length service return is a Phase 6 exit, not Phase 5 | MUST |
| Voice worsening during any phase | STOP all singing — contact clinician same day; do not push through | NON-NEGOTIABLE |
| Patient reports "practicing extra" to catch up faster | INTERVENE — overload at any phase resets progress; more is not better | MUST |

---

**Stemple & Verdolini say:** "The singer who returns slowly returns fully. The singer who rushes often returns permanently diminished."
