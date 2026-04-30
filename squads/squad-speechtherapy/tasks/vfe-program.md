# Task: vfe-program

> **Command:** `*vfe-program {patient_name}`
> **Agent:** Joseph Stemple (Voice Function Exercise)
> **Purpose:** Implement Joseph Stemple's 4-exercise Vocal Function Exercises (VFE) program for systematic muscular re-training of the laryngeal mechanism

---

## Overview

Vocal Function Exercises (Stemple, 1994) are a systematic approach to strengthening and balancing laryngeal musculature through four specific exercises. The program targets:
1. **Warm-up** — establish easy phonation and laryngeal balance
2. **Stretch** — elongate vocal folds, activate cricothyroid
3. **Contract** — activate thyroarytenoid, establish chest register engagement
4. **Power** — integrate all register coordination across scale

Each exercise is performed **twice per set**, **twice per day** (morning and evening), 5 days per week.

**VETO: Never skip warm-up. The /i/ sustain is not optional — it primes the mechanism for all subsequent exercises.**

---

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `patient_name` | Yes | Patient identifier |
| `--week` | No | Program week (1–8) for progression tracking |
| `--condition` | Yes | `nodule`, `polyp`, `hypofunctional`, `presbyphonia`, `training` |
| `--singer` | No | Activate singer-specific adaptations (additional exercises) |
| `--sex` | Yes | `M` or `F` — determines pitch targets |
| `--starting_pitch` | No | Patient's comfortable speaking fundamental (Hz) if known |

---

## Preconditions

- Vocal assessment completed (vocal-assessment task)
- Patient understands the difference between comfortable phonation and straining
- Patient has a quiet practice space at home with 10 minutes morning + 10 minutes evening
- Patient can sustain a single pitch for at least 5 seconds without breaks
- No acute laryngitis, hemorrhage, or active post-surgical restrictions

---

## Execution Steps

### Phase 1: Orientation Session (Session 1)

```
VFE ORIENTATION PROTOCOL (30 minutes):

1. Explain the program rationale (5 min)
   "These exercises target the specific muscles that control
   your vocal folds — both the ones that stretch them (for
   high notes) and the ones that shorten them (for low notes).
   By training them systematically, we restore the balance
   that efficient voice production requires."

2. Establish comfortable pitch reference (5 min)
   - Find patient's speaking fundamental frequency (SFF)
   - Male SFF average: ~125 Hz (approximately B2)
   - Female SFF average: ~220 Hz (approximately A3)
   - Note patient's actual SFF as starting reference

3. Demonstrate all 4 exercises (10 min)
   - Clinician models each exercise
   - Patient imitates under guidance
   - Correct major errors before home program begins

4. Explain the dosage (5 min)
   "Twice each exercise per set. Two sets per day.
   Morning and evening. Five days per week.
   This is non-negotiable — consistency is the treatment."

5. Home program handout + recording (5 min)
   - Provide written instructions
   - Record audio of each exercise at correct pitch
   - Patient leaves with reference recording
```

### Phase 2: The Four Core Exercises

---

#### Exercise 1: Warm-Up — Sustained /i/ Vowel

```
WARM-UP EXERCISE:

Sound: High /i/ vowel (as in "see")
Duration: As long as possible on one comfortable breath
Pitch: Highest comfortable pitch without falsetto / head voice break

Instructions to patient:
  "Say 'ee' at your highest comfortable pitch — the highest you
   can reach without flipping into a squeaky falsetto — and hold
   it as long as you can on one breath. Keep the sound steady."

Pitch targets:
  Male: F4–A4 (349–440 Hz)
  Female: G5–B5 (784–988 Hz)
  Adjust based on individual comfortable high range

Quality target:
  - Tone should feel easy, forward, slightly bright
  - No strain, no squeeze, no falsetto flip
  - Steady pitch — no wobble or glide

Duration target:
  Week 1–2: Minimum 8 seconds
  Week 3–4: Minimum 12 seconds
  Week 5–8: Minimum 15 seconds

Repetitions: 2 per set
Dosage: 2 sets/day (morning + evening)

Purpose: Activates cricothyroid muscle, establishes longitudinal
tension, primes laryngeal system for subsequent exercises.

Clinician notes:
  - If patient flips into falsetto: lower the target pitch slightly
  - If patient strains: prompt "think bright, think forward, no push"
  - If duration is very short: check hydration and breath support
```

---

#### Exercise 2: Stretch — Low-to-High Glide on /o/

```
STRETCH EXERCISE:

Sound: /o/ vowel (as in "go") — semi-occluded
Direction: Glide from lowest comfortable pitch UP to highest possible pitch
Duration: Slow continuous glide, 4–6 seconds upward
No register breaks allowed — smooth portamento

Instructions to patient:
  "Start at your lowest comfortable note and slide your voice
   all the way up to the highest note you can reach — like a
   siren, but on the 'oh' sound. Make it one continuous slide
   with no jumps or breaks."

Pitch targets:
  Male: Start ~C2–E2, glide to A4 or higher
  Female: Start ~A3–C4, glide to C6 or higher

Quality target:
  - Smooth, connected portamento — no register breaks
  - Slight /o/ rounding of lips
  - No pitch plateau at top — reach as high as possible
  - If break occurs: note where and work to smooth it

Repetitions: 2 per set
Dosage: 2 sets/day

Purpose: Elongates vocal folds via cricothyroid stretch through
full pitch range. The upward glide is the primary stretch vector.
Chest-to-head register coordination develops over weeks.

Clinician notes:
  - Note the register transition point — document in semitones
  - Goal is to eliminate or smooth transition by week 6–8
  - Singer adaptation: extend upper range goal by additional 5th
```

---

#### Exercise 3: Contract — High-to-Low Glide on /o/

```
CONTRACT EXERCISE:

Sound: /o/ vowel (as in "go")
Direction: Glide from highest comfortable pitch DOWN to lowest possible pitch
Duration: Slow continuous glide, 4–6 seconds downward
No register breaks allowed — smooth portamento

Instructions to patient:
  "This time, start at your highest note and slide all the way
   down to your lowest note. Same sound — 'oh' — but going down.
   Keep it connected all the way through."

Pitch targets:
  Male: Start ~A4, glide down to C2 or lower (full chest/modal)
  Female: Start ~C6, glide down to A3 or lower

Quality target:
  - Smooth portamento through full range downward
  - No abrupt pitch drops or glottal stops
  - Rich, chest resonance at the bottom of the range
  - Maintain /o/ vowel shape throughout

Repetitions: 2 per set
Dosage: 2 sets/day

Purpose: Activates thyroarytenoid (vocalis) muscle as folds
shorten and thicken. Develops chest register musculature and
improves cricoarytenoid/thyroarytenoid coordination.

Clinician notes:
  - Patients with hypofunctional voice may have weak bottom of range
  - Encourage reaching for fullness at the bottom, not loudness
  - Note if patient avoids lower range (common in females with MTD)
```

---

#### Exercise 4: Power — Sustained Scale Notes on /o/

```
POWER EXERCISE:

Sound: /o/ vowel (as in "go")
Pattern: Sustain each note of a C major scale sequentially
Notes: C–D–E–F–G (5-note ascending scale minimum; continue to C5/C6 if range allows)
Duration: 5 seconds sustained per note
Pitch: Each note held individually, not glided

Instructions to patient:
  "Hold each note steadily for 5 seconds, like singing one note
   at a time on 'oh'. Start at a comfortable middle note and go
   up the scale step by step."

Scale targets:
  Male: C3–D3–E3–F3–G3–(A3–B3–C4 if able)
  Female: C4–D4–E4–F4–G4–(A4–B4–C5 if able)

Quality target:
  - Pitch accuracy: each note precisely on target
  - Duration: 5 seconds per note, steady
  - Volume: moderate, consistent — not crescendo
  - Tone: /o/ vowel well-formed, resonant

Repetitions: 2 per set (each set = full scale)
Dosage: 2 sets/day

Purpose: The integration exercise. Combines precise muscular
coordination across the full scale with sustained effort.
Develops pitch accuracy, phonatory stability, and endurance.
The held notes require fine neuromuscular coordination of both
CT and TA muscles simultaneously.

Singer adaptation:
  - Extend scale to full octave C–C
  - Add chromatic scale as additional set in week 6+
  - Add sostenuto crescendo/decrescendo on held notes

Clinician notes:
  - Use keyboard or tuner app for pitch feedback
  - Track which notes are consistently flat/sharp — diagnostic value
  - Patients with nodules: notes around F–G may be breathy initially
```

---

### Phase 3: Weekly Progression Guide

```
WEEKLY PROGRESSION TARGETS:

Week 1 — Establish technique
  Target: Patient can perform all 4 exercises consistently
  Warm-up: 8 seconds /i/ sustain
  Stretch: Smooth slide with one tolerated break
  Contract: Smooth slide with one tolerated break
  Power: C–G scale, pitch ± 1 semitone accuracy
  Home compliance: Introduce twice-daily habit

Week 2 — Consolidation
  Target: Home practice established, technique stable
  Warm-up: 10 seconds /i/ sustain
  Stretch: Slide with no more than one break
  Contract: No more than one break
  Power: C–G with < ½ semitone pitch drift
  Progress check: Re-measure MPT if not done at week 1

Week 3 — Extension
  Target: Begin extending range and duration
  Warm-up: 12 seconds sustained
  Stretch / Contract: Break-free through full range
  Power: Extend to full octave (C–C) if male; (C–C) if female
  Add: Humming cool-down (5 minutes after PM session)

Week 4 — Building Stamina
  Target: Consistent quality across both daily sets
  Warm-up: 15 seconds minimum
  Stretch / Contract: Smooth, break-free, full range
  Power: Full octave, ½ semitone accuracy
  Review: Are gains transferring to speech voice?

Week 5–6 — Refinement
  Target: Perceptual improvement in connected speech
  Additions (singers): Repertoire excerpts with VFE warm-up
  Re-evaluate with GRBAS — document change from baseline
  Progress report: Clinician documents all 4 exercises quality

Week 7–8 — Maintenance Transition
  Target: Patient independent, quality maintained
  Warm-up: 15–20 seconds /i/
  Stretch / Contract: Full clean range
  Power: Full scale, optional chromatic extension
  Discharge criteria review (see Validation)
```

---

### Phase 4: Singer Adaptations

```
SINGER-SPECIFIC ADDITIONS (activate with --singer flag):

A. Extended Warm-Up Set
   Add after Exercise 1:
   - Sustained /i/ also at low comfortable pitch (opposite extreme)
   - 5 seconds × 2 reps
   - Purpose: full register coverage in warm-up

B. Scale Extension (Power exercise)
   - Week 5+: Use full chromatic scale instead of C major
   - Week 7+: Add arpeggios (1-3-5-8-5-3-1) on /o/

C. Messa di voce Preparation
   Week 6+:
   - Sustain single note on /o/
   - Slowly crescendo from pp to ff (5 seconds)
   - Slowly decrescendo back to pp (5 seconds)
   - 2 reps per session (not a full set — supplemental only)

D. Registration Bridge Work (Week 7+)
   - Identify passaggio location from Stretch/Contract recordings
   - Targeted work: 3-note patterns centered on bridge
   - Report bridge stability to clinician

E. Repertoire Bridge
   - Apply VFE voice to first phrases of patient's repertoire
   - In clinical session only — not home program
   - Use easiest repertoire first (midrange, simple melody)
```

---

## Output

### Session Progress Report

```markdown
# VFE Progress Report

**Patient:** [Name]
**Date:** [Date]
**Program Week:** [X]
**Session #:** [X]

## Exercise Performance

| Exercise | Duration/Quality | Comfort (1–10) | Notes |
|----------|------------------|----------------|-------|
| Warm-up /i/ | [sec] | [X] | |
| Stretch ↑ | [break: yes/no, where] | [X] | |
| Contract ↓ | [break: yes/no, where] | [X] | |
| Power C–G/C–C | [accuracy: ±X semitones] | [X] | |

## Home Program Compliance
Sessions completed this week: [X] of 10 target

## Perceptual Assessment
GRBAS today: G[ ] R[ ] B[ ] A[ ] S[ ]
Change from baseline: [Better / Same / Worse — specific]

## Range Notes
Register break location: [note/Hz]
Change from last session: [better/same/worse]

## Next Session Goals
[Specific targets for next visit]
```

---

## Validation

| Criterion | Standard | Fail Condition |
|-----------|----------|----------------|
| All 4 exercises performed in order | Warm-up → Stretch → Contract → Power | Any exercise skipped |
| Warm-up first, always | /i/ sustain precedes all other exercises | Another exercise performed first |
| Dosage achieved | 2 reps per exercise, 2 sets per day documented | Single set only |
| Weekly milestone met before advancing | Duration, range, and accuracy criteria per week | Advancing without meeting criteria |
| Progress documented using perceptual measures | GRBAS scored at minimum every 2 weeks | Subjective progress only |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Skipping warm-up (/i/ sustain) | BLOCK — warm-up is not optional; primes CT and prevents compensatory tension | NON-NEGOTIABLE |
| Patient reports vocal fatigue after Power exercise | REDUCE scale range — fatigue means overload, not progress | MUST |
| Active hemorrhagic lesion or post-surgical < 4 weeks | CONTRAINDICATED — consult laryngologist before initiating | NON-NEGOTIABLE |
| Patient practicing more than 2 sets/day without approval | STOP additional sets — more is not better; VFE causes cumulative fatigue | SHOULD |
| Home compliance < 50% over 2 weeks | Review barriers, modify program — no point advancing if patient cannot complete | MUST |

---

**Joseph says:** "The voice is a muscle system. Like any muscle system, it responds to systematic, progressive exercise — not to random practice, not to willpower, and certainly not to force."
