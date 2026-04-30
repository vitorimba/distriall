# Task: sovt-protocol

> **Command:** `*sovt-protocol {patient_name}`
> **Agent:** Ingo Titze (Voice Science)
> **Purpose:** Semi-occluded vocal tract (SOVT) exercise protocol for vocal rehabilitation and training, based on Titze's inertive reactance framework

---

## Overview

Semi-Occluded Vocal Tract (SOVT) exercises work by creating inertive reactance at the vocal tract output, which:
1. Reduces collision forces on the vocal folds
2. Lowers phonation threshold pressure
3. Enhances vibratory efficiency
4. Promotes favorable source-filter interaction

Techniques include straw phonation, lip trills, humming, and tongue trills. This protocol follows a 4-week progressive program from low to high resistance.

**VETO: Never start with high resistance. Always begin low and progress gradually.**

---

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `patient_name` | Yes | Patient identifier |
| `--week` | No | Current week (1–4) for progression level |
| `--condition` | Yes | `nodule`, `polyp`, `MTD`, `hypofunctional`, `training`, `post-surgical` |
| `--singer` | No | Flag for singer-specific progressions |
| `--mode` | No | `rehab` (therapeutic, default) or `training` (healthy voice optimization) |

---

## Preconditions

- Patient has completed vocal assessment (vocal-assessment task)
- No acute laryngitis or hemorrhage
- Patient understands that SOVT is effort-free — no pushing or straining
- Adequate hydration: minimum 500 mL water consumed in the 2 hours prior
- Patient has performed gentle nasal breathing warm-up (2 minutes)

---

## Execution Steps

### Phase 1: Patient Education (First Session Only)

```
PATIENT EDUCATION POINTS:

1. What is SOVT?
   "These exercises create a back-pressure that massages your vocal folds
   gently from the outside in. They should feel easy — like the sound
   is riding on a cushion of air."

2. The Effort Paradox:
   "The less effort you feel, the better the exercise is working.
   If you feel strain, you are using it incorrectly."

3. Key sensation to seek:
   "A gentle buzz or vibration in your lips, nose, and face.
   That vibration tells you the exercise is working."

4. Monitoring comfort:
   "Rate comfort 1–10. We stay at 8–10 at all times.
   Anything below 7 → we stop and modify."
```

### Phase 2: Straw Selection

```
STRAW RESISTANCE PROGRESSION:

Level 1 (Weeks 1–2, rehabilitation start):
  - Standard cocktail straw (narrow bore, ~3mm diameter)
  - Provides moderate resistance
  - Suitable for MTD, nodules, post-surgical

Level 2 (Week 3, mid-program):
  - Standard drinking straw (~6mm diameter)
  - Slightly less resistance
  - Good for consolidation phase

Level 3 (Week 4 and training mode):
  - Coffee stirrer (very narrow, ~2mm)
  - Maximum resistance
  - Only for patients with established technique

Water Depth Resistance (additional variable):
  - Surface only: minimal resistance boost
  - 3 cm depth: light resistance
  - 7 cm depth: moderate resistance
  - 12 cm depth: high resistance

Rule: Always start with surface or 3 cm depth.
```

### Phase 3: Core SOVT Exercises — 4-Technique Battery

#### Exercise 1: Humming

```
HUMMING PROTOCOL:

Technique:
  - Close lips gently (no pressure)
  - Teeth slightly apart inside
  - Jaw relaxed
  - Hum on comfortable pitch
  - Feel vibration in nose and upper lip

Targets:
  - Nasal resonance activation
  - Low-effort phonation
  - Warm-up function

Duration per set:
  - 5 repetitions × 5 seconds sustained
  - Rest 5 seconds between reps

Pitch targets:
  Week 1: Comfortable speaking pitch only
  Week 2: Comfortable pitch ± 3 semitones
  Week 3: Glide up and down by comfortable range
  Week 4: Cover full functional range

Common errors:
  - Humming too loudly → reduce
  - Nasal resonance absent → open nasal passages, relax soft palate
  - Jaw tension → remind to relax
```

#### Exercise 2: Lip Trills (Lip Bubbles)

```
LIP TRILL PROTOCOL:

Technique:
  - Gentle contact between upper and lower lip
  - Blow air to create bilateral lip flutter
  - Voice simultaneously (bilabial trill + phonation)
  - Head slightly forward, neck relaxed
  - Do NOT press lips together — feather contact only

Targets:
  - Bilabial occlusion creates low-resistance SOVT
  - Promotes even airflow
  - Loosens facial/lip tension

Duration per set:
  - 5 repetitions × 5 seconds
  - Gradually extend to 10 seconds by week 3

Pitch variations:
  Week 1: Comfortable pitch, level tone
  Week 2: Gentle portamento slides (up only)
  Week 3: Arpeggios within comfortable range
  Week 4: Full range glides

Troubleshooting:
  Lips won't trill:
    → Use fingers to gently hold cheeks toward center
    → Reduce air pressure
    → Try single lip trill first (only upper or lower)
  Lip tension: → Remind to use minimum contact
  Breaks in voicing: → Indicate inadequate air support — address posture
```

#### Exercise 3: Straw Phonation in Air

```
STRAW PHONATION IN AIR PROTOCOL:

Setup:
  - Standard straw (see straw selection phase)
  - Lips sealed around straw with gentle contact
  - Head upright, posture neutral

Technique:
  - Inhale through nose
  - Exhale through straw while vocalizing
  - Sound exits through straw only
  - Maintain steady, easy tone

Session structure:
  Set 1: Sustained tones (5 × 5 seconds)
    - Comfortable pitch, moderate loudness
    - Goal: steady, buzz-forward quality

  Set 2: Glides (5 repetitions)
    - Slide from comfortable pitch UP through range
    - 5-second glide each
    - Do not force high range

  Set 3: Simple melody (1 pattern, 5 repetitions)
    Week 1: 3-note stepwise pattern (do-re-mi)
    Week 2: 5-note scale
    Week 3: 8-note scale
    Week 4: Arpeggios (1-3-5-3-1)

Rest between sets: 30 seconds
Total straw-in-air time: 10–15 minutes per session
```

#### Exercise 4: Straw Phonation in Water

```
STRAW PHONATION IN WATER PROTOCOL:

Setup:
  - Cup with 10–15 cm of water
  - Straw submerged to prescribed depth (see straw selection)
  - Patient holds cup at chin level
  - Head level — do not tilt to submerge straw deeper

Technique:
  - Inhale through nose
  - Submerge straw to prescribed depth
  - Exhale through straw to create CONTINUOUS bubble stream
  - Vocalize simultaneously
  - Bubbles must be steady and continuous — no popping or silence

Bubble quality target:
  GOOD: Steady, fine bubbles, no breaks
  MODIFY: Large/irregular bubbles → reduce air pressure
  STOP: No bubbles or patient strains → technique error, re-educate

Session structure:
  Set 1: Sustained tone (5 × 5 seconds with bubbles)
  Set 2: Glides (5 × upward slide)
  Set 3: Conversational pitch variations (2 minutes free phonation through straw in water)

Depth progression:
  Week 1: 3 cm depth
  Week 2: 5 cm depth
  Week 3: 7 cm depth
  Week 4: 10–12 cm depth (clinician judgment)

Important: Water exercises done AFTER in-air exercises, not before.
```

---

## 4-Week Progressive Program

### Week 1 — Foundation (Low Resistance)

```
WEEK 1 PROTOCOL:

Goal: Establish technique, reduce hyperfunctional patterns,
      introduce easy phonation concept.

Session frequency: Daily (home program) + 2 clinical sessions/week

Daily home program (15 minutes):
  [5 min]  Humming: 5 reps × 5 seconds at comfortable pitch
  [5 min]  Lip trills: 5 reps × 5 seconds, level tone
  [5 min]  Straw in air: 5 reps × 5 seconds sustained

Clinical sessions (30 minutes each):
  [5 min]  Education + technique check
  [5 min]  Humming with pitch variation
  [10 min] Straw in air — all sets
  [7 min]  Straw in water (3 cm depth)
  [3 min]  Transfer to open voice: "ee" vowel

Straw: Standard straw, 6 mm diameter
Water depth: 3 cm
Comfort threshold: Must maintain 8+ at all times

Milestone: Patient can sustain steady bubble stream 5 seconds consistently.
```

### Week 2 — Consolidation (Building Range)

```
WEEK 2 PROTOCOL:

Goal: Extend pitch range, add upward glides, introduce scale patterns.

Daily home program (20 minutes):
  [5 min]  Humming: pitch variation ± 3 semitones
  [5 min]  Lip trills: gentle upward glides
  [5 min]  Straw in air: scale patterns (do-re-mi-re-do)
  [5 min]  Straw in water: 5 cm depth, sustained tones

Clinical sessions (30 minutes):
  [5 min]  Progress check, comfort ratings review
  [5 min]  Humming arpeggios (1-3-5)
  [10 min] Straw in air — scale progressions
  [7 min]  Straw in water — 5 cm, add upward glides
  [3 min]  Transfer: bridge straw voice to open /a/ vowel

Milestone: Patient can slide up 5 semitones through straw without effort.
```

### Week 3 — Expansion (Full Range & Transfer)

```
WEEK 3 PROTOCOL:

Goal: Full comfortable range through straw, begin transfer to open voice.

Daily home program (20 minutes):
  [5 min]  Humming: full comfortable range glides
  [5 min]  Lip trills: arpeggios and scale runs
  [5 min]  Straw in air: 8-note scales + arpeggios
  [5 min]  Straw in water: 7 cm depth + glides

Clinical sessions (35 minutes):
  [5 min]  Progress review — MPT re-measure if appropriate
  [5 min]  Humming to /m/ words to open vowels (transfer)
  [10 min] Straw in air — full range work + songs/melodies
  [7 min]  Straw in water — 7 cm, scale patterns
  [8 min]  Transfer sequences: straw → lip trill → open vowel

Milestone: Patient successfully transfers resonant quality from straw to open /a/ and /i/.
```

### Week 4 — Integration (Transfer & Maintenance)

```
WEEK 4 PROTOCOL:

Goal: Integrate SOVT gains into speech and singing, establish maintenance.

Daily home program (20 minutes):
  [3 min]  Humming warm-up
  [5 min]  Lip trills: full range
  [5 min]  Straw in air: preferred patterns for maintenance
  [5 min]  Straw in water: 10–12 cm if tolerated
  [2 min]  Transfer to speech: connected sentences through /m/ onset

Clinical sessions (40 minutes):
  [5 min]  Final assessment comparison
  [5 min]  Humming to speech transfer
  [10 min] Straw full-range work
  [10 min] Transfer sequences to singing repertoire (if singer)
  [10 min] Patient-led practice with coaching

Maintenance program (post-protocol):
  Daily: 10 minutes humming + lip trills
  Weekly: 15 minutes straw work
  Monthly: Clinical check-in

Milestone: Patient performs SOVT independently and reports carryover to daily voice.
```

---

## Output

### Session Report Template

```markdown
# SOVT Session Report

**Patient:** [Name]
**Date:** [Date]
**Session #:** [X] of [Program Week X]
**Clinician:** Ingo Titze / [Therapist name]

## Exercises Completed
| Exercise | Sets | Duration | Comfort (1–10) | Quality |
|----------|------|----------|----------------|---------|
| Humming  | 5 | 5 sec ea | [X] | [notes] |
| Lip trill | 5 | 5 sec ea | [X] | [notes] |
| Straw in air | [sets] | [duration] | [X] | [notes] |
| Straw in water | [sets] | [depth] cm | [X] | [notes] |

## Patient Comfort Ratings
Lowest comfort reported: [X/10]
Highest comfort: [X/10]

## Technique Quality
Bubble stream quality: [steady / intermittent / absent]
Lip trill quality: [bilateral / unilateral / unable]
Transfer to open voice: [successful / partial / not attempted]

## Adjustments Made
[Any changes to straw diameter, depth, pitch range, exercise duration]

## Home Program Assigned
[Exercises, reps, duration, frequency]

## Next Session Plan
[Progression step, goals]
```

---

## Validation

| Criterion | Standard | Fail Condition |
|-----------|----------|----------------|
| Exercises sequenced low-to-high resistance | Humming before straw, in-air before in-water | High-resistance exercise first |
| Comfort monitored each exercise | Patient rates comfort before and after each set | Comfort not assessed |
| Bubble stream quality documented | Steady / intermittent / absent recorded | Not documented |
| Weekly progression criteria met before advancing | Milestone checklist checked | Advancing without meeting milestone |
| Transfer to open voice attempted (week 3+) | At least 3 minutes transfer per session | SOVT isolated — no transfer |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Starting with coffee stirrer (narrow straw) or deep water before technique established | BLOCK — never start with maximum resistance; causes vocal strain and defeats purpose | NON-NEGOTIABLE |
| Patient reports discomfort > 3 (comfort rating < 7/10) | STOP exercise immediately — modify or revert to lower resistance | MUST |
| Active hemorrhagic lesion | CONTRAINDICATED — no straw work until ENT clearance | NON-NEGOTIABLE |
| Acute laryngitis | POSTPONE — reschedule session, no voice exercises | MUST |
| Patient pushing volume or effort | STOP — re-educate: effort is the enemy of SOVT benefit | MUST |

---

**Ingo says:** "The vocal tract is a resonator. When you work with its physics instead of against them, the voice heals itself. Force is the enemy — physics is the ally."
