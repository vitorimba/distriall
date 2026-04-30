# Task: conversation-training

> **Command:** `*conversation-training {patient_name}`
> **Agent:** Jackie Gartner-Schmidt (CTT)
> **Purpose:** Conversation Training Therapy (CTT) — Jackie Gartner-Schmidt's 6-tenet framework using patient-driven conversation with motor learning principles to generalize resonant voice to natural communication

---

## Overview

Conversation Training Therapy (Gartner-Schmidt, 2014) is a departure from traditional hierarchical voice therapy. Instead of building from isolated sounds → words → sentences → conversation, CTT begins and ends in conversation. The therapy session IS the practice context.

Key principles:
1. **No traditional hierarchy** — conversation is the vehicle from session 1
2. **Patient-driven topics** — ecological validity through real content
3. **Motor learning principles** — variable practice, summary feedback, reduced feedback frequency
4. **Attention to sensation** — proprioceptive focus on buzz, not on production mechanics
5. **Error-free learning** — success is built in, not corrected after failure
6. **Automaticity as goal** — not voluntary control, but automatic resonant voice

This task implements all 6 CTT tenets in a structured session framework for nodule rehabilitation and hyperfunctional voice disorder generalization.

---

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `patient_name` | Yes | Patient identifier |
| `--session_number` | No | CTT session number (1–8+) for phase tracking |
| `--prior_therapy` | Yes | `lmrvt`, `vfe`, `sovt`, `none` — what has been done prior |
| `--resonant_baseline` | No | Percentage of resonant voice in spontaneous speech at start |
| `--topics_preferred` | No | Patient's preferred conversation topics for ecological validity |
| `--context_level` | No | `easy` (quiet 1:1), `medium` (phone, 2-person group), `hard` (noise, emotion) |

---

## Preconditions

- LMRVT sessions 1–4 completed (resonant voice established at phrase level)
- Patient can produce resonant voice on demand in quiet, structured contexts
- Patient understands proprioceptive target (forward buzz sensation)
- Patient has self-monitoring capacity (can identify own resonant vs. non-resonant voice)
- No acute laryngitis

---

## Execution Steps

### Overview: The 6 CTT Tenets

```
CTT TENET OVERVIEW:

Tenet 1: Abandon the hierarchy
  - No word lists, no reading passages first, no isolated sounds
  - Start talking. Conversation is the treatment.

Tenet 2: Patient-selected topics drive content
  - Ask patient: "What would you like to talk about?"
  - Topics should be personally meaningful (work, hobbies, family)
  - High emotional investment = higher ecological validity
  - Clinician is a genuine conversation partner

Tenet 3: Proprioceptive feedback as primary monitor
  - "Feel the buzz, not the sound"
  - Auditory feedback is secondary
  - Patient learns to use internal sensation as guide

Tenet 4: Motor learning feedback schedule
  - NOT: real-time feedback on every utterance
  - YES: summary feedback after a block of utterances
  - Gradually reduce feedback frequency across sessions
  - Blocked practice → random practice → no clinician feedback

Tenet 5: Error-free structure
  - Set patient up for success before they produce
  - Begin every session with SOVT prime → then speak
  - Do not ask patient to produce difficult context before easy one is solid

Tenet 6: Target automaticity
  - Goal is NOT "monitor and correct"
  - Goal IS: resonant voice happens without thinking about it
  - Achieved through high-repetition conversational practice
```

---

### Phase 1: Session Structure — All CTT Sessions

```
UNIVERSAL SESSION STRUCTURE (40–50 minutes):

[5 min] WARM-UP AND PRIME
  - SOVT: straw phonation in air (3 × 5 seconds)
  - Humming: /m/ on comfortable pitch (10 reps × 3 seconds)
  - Bridge: /m/ → vowel → first word of conversation
  Purpose: Establish resonant quality before conversation begins

[5 min] SELF-RATING CHECK-IN
  Patient rates:
  - Voice quality today (1–10)
  - Resonant voice in daily life since last session (0–100%)
  - Contexts where it was easiest / hardest

[25–35 min] CONVERSATION BLOCK(S)
  Structure depends on session number (see phases below)
  Core format:
    Patient chooses topic
    Patient talks, clinician listens and participates genuinely
    Clinician provides summary feedback per motor learning schedule

[5 min] COOL-DOWN AND DEBRIEF
  - Patient rates resonant voice % during session
  - Clinician provides session-level summary
  - Home assignment: "Notice resonance in one conversation daily"
  - Next session preview
```

---

### Phase 2: Sessions 1–2 — Introduction and First Conversation

```
SESSIONS 1–2 GOALS:
  - Introduce CTT framework to patient
  - Establish patient topic selection as norm
  - Achieve resonant voice in 1-minute continuous conversation
  - Establish feedback schedule: summary after every 3–5 utterances

SESSION 1 DETAILED:

[10 min] CTT Introduction
  Explain the departure from traditional therapy:
  "In most voice therapy, we start with single sounds, then words.
   We're going to do something different — we're going to start by
   talking. That's because your voice needs to learn in real contexts,
   not in exercises that don't match real life."

  Patient orientation:
  "I'm going to be your conversation partner today. You choose what
   we talk about. I'll occasionally give you feedback — but not
   after every sentence. After a few sentences, I'll check in."

[5 min] Topic Selection Ritual
  Ask patient: "What's something you'd like to tell me about?
   Something that's been on your mind, something from your week,
   a project, a person, anything."
  Write down topic — document in session record.
  This is the content of today's session.

[20 min] First Conversation Block
  Patient talks. Clinician responds genuinely.
  Every 3–5 patient utterances, clinician gives summary feedback:
    "Those last three — I heard the buzz on [specific phrase].
     The buzz dropped on [other phrase]. What were you noticing?"
  Patient self-rates: "Where do you feel it in your face right now?"

  If resonant voice absent: DO NOT correct mid-utterance.
  After the block: "Before the next block, let's reset with /m/ — then
                    you pick up where you left off."

[5 min] Debrief
  "What % of that conversation felt resonant to you?"
  "What made it easier? What made it harder?"
  Home: "Notice one conversation this week where you feel the buzz."

SESSION 2:
  Review home observation first (did patient notice buzz anywhere?)
  Add: 2-minute continuous conversation block (no feedback interruptions)
  Add: Phone simulation (one block with patient speaking as if on phone)
```

---

### Phase 3: Sessions 3–4 — Extended Blocks and Feedback Reduction

```
SESSIONS 3–4 GOALS:
  - 5-minute continuous conversation blocks
  - Reduce feedback to every 6–8 utterances (from every 3–5)
  - Introduce medium-demand context (slightly louder, more animated)
  - Measure resonant voice % in standardized sample

MOTOR LEARNING FEEDBACK PROGRESSION:

  Sessions 1–2: Summary feedback every 3–5 utterances
  Sessions 3–4: Summary feedback every 6–8 utterances
  Sessions 5–6: Summary feedback every 10–15 utterances
  Sessions 7–8: Summary feedback once per block (end only)
  Post-therapy: No clinician feedback — self-monitoring only

CONTEXT LADDER (sessions 3–4):

  Introduce context variation within same session:
  Block 1: Quiet 1:1 (familiar — easy)
  Block 2: Topic with more emotional content (more animation)
  Block 3: Patient stands while talking (posture change — medium)

  Observation: Where does resonance drop first?
  Answer: Note in session record → this is the priority target for sessions 5–6

STANDARDIZED MEASUREMENT (session 4):
  Record 5-minute spontaneous speech sample
  Rate: % utterances with clearly resonant voice (clinician + patient both rate)
  Document as "CTT Baseline %" — will measure progress here

  Also re-rate GRBAS from sample (not from isolated /a/)
```

---

### Phase 4: Sessions 5–6 — Generalization and Hard Contexts

```
SESSIONS 5–6 GOALS:
  - 10-minute continuous conversation blocks
  - Target hard-demand contexts from patient's real life
  - Introduce emotional content topics deliberately
  - Measure: resonance % in hard vs. easy contexts

CONTEXT PROGRESSION:

Hard contexts for sessions 5–6 (customize per patient):
  A. Background noise simulation:
     Clinician plays ambient noise (coffee shop, office) at ~55–60 dB
     Patient maintains resonance while adapting to noise
     Key: increase air, NOT laryngeal pressure, for loudness

  B. Emotional topic simulation:
     Ask patient to discuss something they feel passionate about
     (not distressing — passionate, engaged)
     Observe: Does resonance hold under emotional arousal?

  C. Phone call simulation:
     Patient speaks as if on phone call (to imaginary party)
     No visual feedback from clinician
     Test: Can patient self-monitor without seeing clinician's face?

  D. Storytelling simulation:
     Patient tells a story with characters, dialogue, action
     Dynamic prosody challenge → resonance under pitch/rate variation

MOTOR LEARNING RANDOMIZATION:
  Sessions 5–6: Randomize context order within session
  Not: Easy → Medium → Hard (blocked)
  Yes: Hard → Easy → Medium → Hard → Easy (random)
  Randomization accelerates automaticity acquisition

SELF-MONITORING PROTOCOL (sessions 5–6):
  After each context block, patient rates (without clinician input):
  "What % of that block felt resonant?"
  Then: Clinician reveals own rating
  Goal: Patient and clinician ratings within 10% of each other
  If large discrepancy: Patient is not yet monitoring accurately → re-train
```

---

### Phase 5: Sessions 7–8 — Independence and Maintenance

```
SESSIONS 7–8 GOALS:
  - 15–20 minute conversation with minimal clinician feedback
  - Patient manages own resonance without cues
  - Establish post-therapy maintenance conversation habit
  - Final outcome measurement

SESSION 7 — Near-Independent:
  [5 min] Warm-up (patient conducts own — clinician observes)
  [35 min] Conversation — clinician provides NO real-time feedback
             Clinician is genuine partner only — responds to content
             At session end: patient gives self-assessment FIRST
             Then clinician gives single summary (one paragraph)

  KEY SHIFT: "I am no longer your voice therapist in these conversations.
              I am your conversation partner. Your voice is your
              responsibility now — I'm just here to talk."

SESSION 8 — Discharge:
  [5 min] Final warm-up (patient independent)
  [20 min] Conversation sample (recorded for outcome measurement)
  [10 min] Formal re-evaluation:
             GRBAS from conversation sample
             MPT re-measure
             VHI-10 final
             Resonant voice % (compare to session 4 baseline %)
  [10 min] Maintenance plan discussion:
             "Your homework now is daily 10-minute conversations
              where you notice resonance — not practice sessions,
              just conversations you already have."
  [5 min] Discharge criteria check (see Validation)
```

---

### Phase 6: Motor Learning Principles — Implementation Guide

```
MOTOR LEARNING FRAMEWORK:

PRACTICE VARIABILITY (Magill & Hall, 1990):
  Apply contextual interference — vary conditions within session:
  Same session should include:
  - Different topics (semantic variability)
  - Different loudness levels (amplitude variability)
  - Different contexts (listener, phone, group)
  High variability → slower acquisition but better retention
  Low variability → faster acquisition but poor retention

FEEDBACK FREQUENCY:
  100% feedback (after every attempt): learning appears fast,
    retention poor, patient dependent on external monitoring
  Reduced feedback (every 5–10 attempts): slower apparent learning,
    better retention, patient develops internal monitoring

  CTT target: Reduce feedback frequency across sessions 1→8
  Never return to high-frequency feedback unless patient plateau

SUMMARY FEEDBACK CONTENT:
  Describe WHAT was resonant, not just HOW MUCH:
  POOR: "That was about 60% resonant."
  BETTER: "The first two sentences were resonant — I heard it especially
           on 'when I was' and 'because of'. The last sentence, on
           [specific phrase], the buzz dropped. What were you feeling
           in that moment?"

KNOWLEDGE OF RESULTS (KR) vs. KNOWLEDGE OF PERFORMANCE (KP):
  KR: Outcome information ("You achieved resonance 70% of that block")
  KP: Process information ("Your lips buzzed on that sentence")
  Use BOTH — KR for session tracking, KP for technique calibration
  In later sessions (7–8): KP only, no KR (transition to self-monitoring)

PRACTICE SCHEDULE:
  Massed practice (all at once): not appropriate for voice
  Distributed practice (spread across day): better retention
  Home recommendation: 3 × 5-minute "resonance conversations" daily
  > 1 × 15-minute practice session
```

---

## Output

### Session Record Template

```markdown
# CTT Session Record

**Patient:** [Name] | **Session:** [#] | **Date:** [Date]
**Prior therapy completed:** [LMRVT / VFE / SOVT]

## Warm-Up
SOVT prime: [completed / modified]
Resonant voice quality at session start: [%]

## Conversation Blocks

| Block | Topic | Duration | Context | Resonance % (Patient) | Resonance % (Clinician) | Notes |
|-------|-------|----------|---------|----------------------|------------------------|-------|
| 1 | [topic] | [min] | quiet 1:1 | [%] | [%] | |
| 2 | [topic] | [min] | [context] | [%] | [%] | |
| 3 | [topic] | [min] | [context] | [%] | [%] | |

## Feedback Schedule Used
Feedback every: [X utterances]
Total clinician feedback events: [X]

## Self-Monitoring Accuracy
Patient vs. clinician agreement: [within 10% / > 10% discrepancy]
Discrepancy pattern: [patient over-rates / under-rates resonance]

## Hard Context Performance
Easiest context: [description]
Hardest context: [description]
Resonance % in hardest: [%]

## Progress vs. Last Session
Resonance overall: [better / same / worse]
Self-monitoring accuracy: [better / same / worse]

## Home Assignment
[specific, concrete, achievable]

## Next Session Plan
[context focus, feedback schedule, goals]
```

---

## Validation

| Criterion | Standard | Fail Condition |
|-----------|----------|----------------|
| No isolated word/sound exercises | All practice in conversation context | Word lists or reading passages used as primary method |
| Patient selects conversation topics | Topic choice documented each session | Clinician-assigned topics only |
| Feedback schedule follows motor learning progression | Documented reduction across sessions 1→8 | Same feedback frequency throughout |
| Context variation within sessions (sessions 3+) | At least 2 different contexts per session | Single context all session |
| Self-monitoring measured independently | Patient rates BEFORE hearing clinician | Clinician rates first, patient confirms |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Using CTT before resonant voice established at phrase level | BLOCK — CTT requires a pre-existing resonant target to generalize; use LMRVT first | NON-NEGOTIABLE |
| Giving real-time interrupting feedback (correcting mid-utterance) | STOP — this is the antithesis of CTT; wait for block end | NON-NEGOTIABLE |
| Returning to word-level or isolated sound practice | BLOCK — regression to hierarchy defeats CTT rationale | MUST |
| Patient's self-monitoring accuracy not improving by session 5 | REASSESS — may need additional KP training before proceeding | MUST |
| Skipping hard contexts through sessions 5–6 | FLAG — generalization requires exposure to difficult contexts; avoiding them means therapy is incomplete | MUST |

---

**Jackie says:** "The voice does not live in the therapy room. It lives in conversations — at the dinner table, in the meeting, on the phone. So that's exactly where we practice it."
