# Task: resonant-voice-therapy

> **Command:** `*resonant-voice-therapy {patient_name}`
> **Agent:** Katherine Verdolini Abbott (LMRVT)
> **Purpose:** Lessac-Madsen Resonant Voice Therapy (LMRVT) 8-session structured protocol targeting efficient, resonant phonation with minimal laryngeal trauma — specific for nodule rehabilitation

---

## Overview

Resonant Voice Therapy (Verdolini, 1998; Lessac-Madsen protocol) trains a phonatory pattern characterized by:
1. **Barely-abducted** vocal fold posture — folds touching just barely, not pressed
2. **Forward resonance** — vibrotactile sensation on alveolar ridge, hard palate, lips
3. **Easy onset** — no glottal attack, no breathiness
4. **Proprioceptive anchoring** — patient learns to self-monitor via facial vibration

This approach is evidence-based for hyperfunctional voice disorders including nodules, contact ulcers, and MTD.

**VETO: Never push past comfortable loudness. Effortful production defeats all therapeutic gains.**

---

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `patient_name` | Yes | Patient identifier |
| `--diagnosis` | Yes | `nodule`, `contact_ulcer`, `MTD`, `hyperfunctional_generic` |
| `--session_number` | No | Current session (1–8) for correct protocol phase |
| `--home_compliance` | No | Rate previous week's home practice compliance (%) |
| `--handedness` | No | For proprioceptive hand placement instructions |

---

## Preconditions

- Vocal assessment completed with GRBAS and MPT documented
- Laryngoscopy report available (for nodule cases — confirms diagnosis)
- Patient has no acute upper respiratory infection
- Adequate hydration (minimum 2L water daily, confirmed by patient)
- Patient can attend 8 sessions over 4 weeks (2/week recommended)

---

## Execution Steps

### Overview: 8-Session Arc

```
SESSION OVERVIEW:

Sessions 1–2: Foundation — establish the resonant voice "feel"
Sessions 3–4: Expansion — extend resonant voice to connected speech
Sessions 5–6: Carry-over — integrate into functional communication
Sessions 7–8: Consolidation + discharge preparation
```

---

### Session 1: Introduction to Resonant Voice

```
SESSION 1 GOALS:
- Teach patient the "barely-abducted" concept
- Establish proprioceptive reference on alveolar ridge
- Achieve first resonant tone on /m/

DURATION: 45–50 minutes

STEP 1: Conceptual Foundation (10 min)
  Explain the two common errors:
  A. Over-pressed voice (hyperfunctional)
     "Imagine your vocal folds like two lips pressing together
      hard. That pressure causes friction and damage — that's
      what nodules are."
  B. Too-breathy voice (hypofunctional)
     "The other error is pulling them apart too much — then
      air leaks through and the voice sounds weak."
  C. The Resonant Target
     "We're looking for a middle point — just touching, barely.
      And then we let the resonance do the work."

STEP 2: Alveolar Ridge Activation (10 min)
  Exercise: Place fingertips on lips and hum /mmm/
  - Lips closed gently
  - Feel vibration transfer to fingertips
  - Now move fingers to philtrum (area below nose)
  - Now place one finger on upper lip — feel buzz there
  - "That buzz IS the resonant voice. That's your target sensation."

  Explore /m/ placement:
  - Tongue tip on alveolar ridge → /n/ buzz
  - Lips together → /m/ buzz
  - "The buzz lives between these two points — that's your forward resonance."

STEP 3: First Resonant Tone (15 min)
  Target production: "mmm-EE" (m + vowel bridge)
  - Start humming /m/ (buzz established)
  - Open to /i/ vowel while maintaining buzz sensation
  - If buzz migrates to throat: return to /m/ and re-establish

  Comfort ladder (rate each production 1–10):
  1. /m/ alone: must achieve 9–10 comfort
  2. /m/ + /i/: must achieve 8–10
  3. /m/ + /a/: must achieve 7–10
  Hold at each level until comfort criterion met before advancing.

STEP 4: Home Program Assignment (10 min)
  Home target this week: /m/ alone sustain
  - 5 minutes per session
  - 3 sessions per day
  - Comfort must be 8+ always
  - Stop if throat sensation appears
  Record 3 productions on phone audio — bring to Session 2

SESSION 1 SUCCESS CRITERION:
  Patient achieves /m/ + /i/ transition with reported buzz sensation
  on alveolar ridge or lips, comfort rating 8+, no throat sensation.
```

---

### Session 2: Stabilize the Resonant Tone

```
SESSION 2 GOALS:
- Review home practice quality (listen to recordings)
- Stabilize /m/ to vowel transition
- Extend to additional vowels (/e/, /o/, /u/)

DURATION: 45 minutes

STEP 1: Home Practice Review (10 min)
  Listen to patient recordings — identify:
  A. Is buzz present? Forward or back?
  B. Any strain audible?
  C. Any breathiness? (indicates too-abducted)
  D. Comfort ratings — pattern?

  Common corrections:
  - Buzz missing → re-establish /m/ humming before opening
  - Strain present → remind "if it's not easy, it's wrong"
  - Too quiet → slightly increase support, not laryngeal effort

STEP 2: Vowel Extension (15 min)
  Systematic progression through all vowels:
  /m/ → /i/  (high front — usually easiest)
  /m/ → /e/  (mid front)
  /m/ → /ae/ (low front — hardest for most patients)
  /m/ → /o/  (mid back)
  /m/ → /u/  (high back)

  For each vowel: achieve comfort 8+ before moving to next.
  Document which vowels are resonant and which revert to throat voice.

STEP 3: Pitch Variation on Resonant Voice (15 min)
  Once resonant tone stable at comfortable pitch:
  - Small upward glide on /mi/ (2–3 semitones)
  - Small downward glide on /mi/ (2–3 semitones)
  - Return to comfortable pitch between trials

  Goal: Maintain forward buzz through small pitch changes.
  STOP and reset if buzz moves to throat.

STEP 4: Updated Home Program (5 min)
  Add: /m/ + each vowel separately
  Maintain: /m/ alone humming as warm-up
  Frequency: 3 sessions/day, 5 min each

SESSION 2 SUCCESS CRITERION:
  Patient produces resonant voice on /m/ + all 5 vowels,
  comfort 7+ on each, buzz sensation consistently reported.
```

---

### Session 3: Words and Word Sequences

```
SESSION 3 GOALS:
- Transfer resonant voice from isolated vowels to words
- Use /m/-initiated words as bridge strategy
- Begin minimal pairs (resonant vs. non-resonant)

DURATION: 45 minutes

WORD LIST STRATEGY — /m/ onset words:
  Easy level: "me, may, moo, more, mama, moon"
  Medium level: "morning, music, moment, mother"
  Hard level: Multi-syllabic, mixed onset: "meeting, memory"

STEP 1: /m/-word Chains (15 min)
  - Hum /m/ → open to word → sustain initial vowel resonance
  - "mmmm-EE" → "me"
  - Patient rates buzz: present / partial / absent

  Success criterion: buzz present on 8/10 productions

STEP 2: Bridge to Non-/m/ Words (15 min)
  Strategy: "borrow" the /m/ buzz
  - "mmm-EE" → pause → "BEE" (maintain buzz quality into /b/ word)
  - "mmm-OO" → pause → "BLUE"

  Patient learns to transfer the resonant quality, not just the /m/ sound.

STEP 3: Contrast Practice (15 min)
  Patient produces each word twice:
  A. Old (non-resonant) voice → rate comfort + buzz
  B. New (resonant) voice → rate comfort + buzz

  Goal: Patient can reliably distinguish the two productions.
  "The one that buzzes is the one that heals."

HOME PROGRAM:
  /m/-onset word list (provided) × 3 sessions/day
  Begin noticing resonant moments in natural conversation (no production requirement yet)
```

---

### Session 4: Carrier Phrases

```
SESSION 4 GOALS:
- Extend resonant voice to short phrases
- Maintain proprioceptive monitoring in connected speech
- Introduce loudness variation at resonant quality

DURATION: 45 minutes

CARRIER PHRASE SET 1 — /m/ initiated:
  "My name is ___."
  "More please."
  "Make it easy."
  "Moments like these..."

CARRIER PHRASE SET 2 — Bridged initiation:
  "I need more time."
  "Please come here."
  "Every morning I..."

STEP 1: Phrase Production (20 min)
  Each phrase: hum onset → phrase
  Check: buzz present at start AND maintained through phrase
  Common error: buzz present on first word only → fade
  Correction: "Keep the face buzzing through the whole phrase"

STEP 2: Loudness Ladder (15 min)
  At resonant quality, practice phrase at 3 loudness levels:
  - Soft (pp): buzz must still be present
  - Comfortable (mf): reference level
  - Louder (f): increase airflow, NOT laryngeal pressure

  KEY LESSON: "Louder comes from more air — never from squeezing."

STEP 3: Rate Variation (10 min)
  Practice phrases at:
  - Slow rate (clear articulation)
  - Normal rate
  - Fast rate (advanced — buzz harder to maintain)

HOME PROGRAM:
  Carrier phrases list (10 phrases) × 3 sessions/day
  Record 3 phrases each session on phone — self-monitor buzz
```

---

### Session 5: Functional Conversation Targets

```
SESSION 5 GOALS:
- Apply resonant voice to actual communicative situations
- Identify highest-risk contexts (loud, emotional, noisy)
- Develop self-monitoring strategy for daily life

DURATION: 50 minutes

STEP 1: Hierarchy Mapping (10 min)
  Build patient's personal hierarchy — easiest to hardest contexts:
  Easy: Talking to therapist in quiet room ← start here
  Medium: Phone call with familiar person
  Medium-Hard: Meeting / group conversation
  Hard: Talking over noise (restaurant, party)
  Hardest: Emotional conversation (argument, strong emotion)

STEP 2: Role-Play Easy Context (20 min)
  Simulate: "Tell me about your week."
  - Patient gives 3–4 sentence response using resonant voice
  - Clinician provides real-time feedback
  - Re-take if throat voice detected
  - Goal: 80% resonant voice in 3-minute conversation

STEP 3: Introduction of Hard Context (15 min)
  Simulate a slightly louder / more animated exchange:
  - Clinician introduces mild background noise (phone/audio)
  - Patient must increase loudness while maintaining resonance
  - Strategy: add air support, maintain forward buzz

STEP 4: Self-Monitoring Protocol (5 min)
  Teach: "Resonance Check"
  - Touch philtrum or upper lip lightly with fingertip during conversation
  - If you feel buzz: you're on target
  - If no buzz: pause, reset on /m/, re-enter
```

---

### Session 6: High-Demand Contexts

```
SESSION 6 GOALS:
- Extend resonant voice to reading aloud and extended speech
- Practice singing introduction (if singer)
- Address specific vocal demands of patient's profession

DURATION: 50 minutes

STEP 1: Reading Aloud — Rainbow Passage (15 min)
  Read Rainbow Passage in resonant voice
  Clinician marks deviations on text
  Targets:
  - 80% of sentences with forward resonance
  - No glottal attack on vowel-initiated words
  - No throat voice on emotionally loaded words

STEP 2: Spontaneous Speech (20 min)
  Patient describes complex topic (job, project, life event)
  Clinician: track resonance %, note fatigue, note context where voice shifts

STEP 3: Singing Bridge (singer patients only) (15 min)
  First singing attempt at resonant quality:
  - Single note sustain on /m/ → /o/
  - Simple 3-note melody in mid-range
  - Patient rates sensation vs. spoken resonant voice
  - Similarity check: "Does it feel the same?"

SESSION 6 CRITERION:
  70%+ resonant voice in 5-minute spontaneous speech sample.
```

---

### Session 7: Near-Independent Practice

```
SESSION 7 GOALS:
- Patient manages resonant voice with minimal cueing
- Establish maintenance home program
- Identify remaining difficult contexts

DURATION: 45 minutes

STEP 1: Clinician-Reduced Feedback (20 min)
  Clinician provides NO real-time feedback during conversation
  Patient self-monitors exclusively
  Post-conversation debrief: patient rates own performance
  Compare to clinician observation

STEP 2: Problem Context Drilling (15 min)
  Address hardest remaining context from Session 5 hierarchy
  Targeted practice with gradual cueing withdrawal

STEP 3: Maintenance Program Design (10 min)
  Draft patient's own maintenance plan:
  Daily: 5 minutes humming warm-up + 3 phrases
  Weekly: 15-minute full session (solo)
  Monthly: Check-in with clinician (optional)
```

---

### Session 8: Discharge and Long-Term Plan

```
SESSION 8 GOALS:
- Final outcome assessment
- Formal re-evaluation (GRBAS, MPT, VHI-10)
- Discharge criteria check
- Long-term self-management plan

DURATION: 50 minutes

STEP 1: Formal Re-Evaluation (20 min)
  Repeat vocal assessment:
  - GRBAS rating
  - MPT /a/, /s/, /z/
  - s/z ratio
  - VHI-10 self-report
  Compare to baseline — document all changes

STEP 2: Functional Assessment (20 min)
  - 5-minute conversation sample (GRBAS rate)
  - Reading passage
  - High-demand simulation

STEP 3: Discharge Documentation (10 min)
  Discharge criteria check (see Validation)
  Long-term plan provided in writing
  Schedule laryngoscopy follow-up (referral if nodules present)
  Re-treatment criteria: if GRBAS returns to baseline level → re-refer
```

---

## Output

### Discharge Summary Template

```markdown
# LMRVT Discharge Summary

**Patient:** [Name]
**Protocol:** 8-session LMRVT
**Dates:** [Start] – [End]
**Diagnosis:** [nodule / MTD / hyperfunctional]

## Outcome Measures

| Measure | Baseline | Discharge | Change |
|---------|----------|-----------|--------|
| GRBAS-G | [X] | [X] | [±X] |
| MPT /a/ | [sec] | [sec] | [±X] |
| s/z ratio | [X] | [X] | [±X] |
| VHI-10 | [X] | [X] | [±X] |

## Resonant Voice Achievement
Spontaneous speech resonance: [X]%
Hard-context resonance: [X]%

## Maintenance Plan
[Written plan summary]

## Follow-Up
ENT follow-up scheduled: [date]
Singing return clearance: [pending / cleared / not applicable]
```

---

## Validation

| Criterion | Standard | Fail Condition |
|-----------|----------|----------------|
| 8 sessions completed | All sessions with documented goals achieved | Session skipped without make-up plan |
| Proprioceptive sensation documented | Buzz location noted every session | Assumed without patient report |
| Comfort never < 7/10 | All exercises comfort-monitored | Effort/strain sessions allowed to continue |
| Outcome measures compared to baseline | GRBAS + MPT at session 8 | Only subjective assessment at discharge |
| Maintenance plan in writing | Patient leaves with written plan | Verbal instructions only |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Patient reports throat sensation during exercise | STOP immediately — reset to /m/ humming only; review technique | NON-NEGOTIABLE |
| Patient pushing for louder production | BLOCK — remind that loudness via pressure defeats resonance | NON-NEGOTIABLE |
| No proprioceptive buzz reported by session 3 | ESCALATE — reassess technique, check for hearing impairment affecting self-monitoring | MUST |
| Singing return before laryngoscopy re-check (nodule cases) | BLOCK — no singing return without ENT clearance after nodule diagnosis | NON-NEGOTIABLE |
| Fatigue reported after sessions | REDUCE session duration — LMRVT should never cause fatigue when done correctly | MUST |

---

**Katherine says:** "The resonant voice lives in the face, not in the throat. When patients feel the buzz, they've found the voice that heals itself."
