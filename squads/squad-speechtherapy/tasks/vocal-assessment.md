# Task: vocal-assessment

> **Command:** `*vocal-assessment {patient_name}`
> **Agent:** Mara Behlau (Vocal Specialist)
> **Purpose:** Complete vocal assessment protocol with perceptual evaluation, acoustic measures, and severity classification

---

## Overview

Comprehensive vocal assessment combining:
1. **Case history** — clinical anamnesis and patient complaint mapping
2. **Perceptual evaluation** — GRBAS scale (Hirano) by trained listener
3. **Vocal range** — frequency and intensity mapping
4. **Maximum phonation time** — aerodynamic efficiency measures
5. **s/z ratio** — glottic closure indicator
6. **Patient self-report** — VHI-10 or VRQoL screening

---

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `patient_name` | Yes | Full name for report identification |
| `--age` | Yes | Patient age (affects normative values) |
| `--sex` | Yes | Biological sex: `M` or `F` (affects vocal range norms) |
| `--profession` | No | Occupation — flag if voice professional (singer, teacher, actor) |
| `--complaint` | Yes | Chief complaint in patient's own words |
| `--duration` | No | Duration of current complaint (days/weeks/months) |
| `--re-eval` | No | If this is a re-evaluation, reference prior assessment date |

---

## Preconditions

- Patient has signed consent for voice recording
- Patient has rested voice for minimum 1 hour before assessment
- Room is quiet (background noise < 45 dB)
- Microphone is calibrated and positioned at 10 cm from mouth, 45-degree angle
- Patient has no acute upper respiratory infection on assessment day

---

## Execution Steps

### Phase 1: Case History (Anamnesis)

**VETO: Never skip case history. Without it, assessment is clinically invalid.**

Collect the following information systematically:

```
CASE HISTORY PROTOCOL — Mara Behlau Adapted

1. Chief complaint (verbatim)
2. Duration and onset (sudden vs. gradual)
3. Aggravating and relieving factors
4. Professional voice use (hours/day, type)
5. Singing history (genre, range, years, current activity)
6. Previous vocal training (formal, informal)
7. Previous voice therapy (dates, outcome)
8. Medical history relevant to voice:
   - GERD / LPR (laryngopharyngeal reflux)
   - Allergies / rhinitis / post-nasal drip
   - Thyroid disease
   - Neurological conditions
   - Pulmonary conditions (asthma, COPD)
   - Hormonal conditions (hypothyroid, menopause)
9. Medications affecting voice:
   - Antihistamines (drying)
   - Diuretics (drying)
   - ACE inhibitors (cough)
   - Hormones
   - Inhaled steroids
10. Hydration habits (glasses/day)
11. Caffeine intake (cups/day)
12. Alcohol consumption (units/week)
13. Tobacco use (current / former — pack years)
14. Vocal abuse behaviors:
    - Shouting frequency
    - Speaking in noise
    - Throat clearing habit
    - Coughing habit
15. Work environment (noise level, air quality, humidity)
16. Sleep quality (hours, quality, snoring)
17. Psychological stress level (1–10 self-report)
18. Previous laryngeal imaging (dates, findings if known)
```

### Phase 2: Patient Self-Report

Administer **VHI-10** (Voice Handicap Index — shortened):

```
VHI-10 Items (0 = never, 4 = always):
1. My voice makes it difficult for people to hear me.
2. People have difficulty understanding me in a noisy room.
3. My voice difficulties restrict my personal and social life.
4. I feel left out of conversations because of my voice.
5. My voice problem causes me to lose income.
6. I feel that I have to strain to produce voice.
7. The clarity of my voice is unpredictable.
8. My voice problem upsets me.
9. My voice makes me feel handicapped.
10. People ask, "What's wrong with your voice?"

Scoring:
- 0–10: Mild handicap
- 11–20: Moderate handicap
- 21–30: Moderate-severe handicap
- 31–40: Severe handicap
```

### Phase 3: Perceptual Evaluation — GRBAS Scale

Rate each parameter from 0 (normal) to 3 (severe):

```
GRBAS SCALE (Hirano, 1981):

G — Grade (overall dysphonia severity)
  0 = Normal voice
  1 = Slight dysphonia
  2 = Moderate dysphonia
  3 = Severe dysphonia

R — Roughness (irregular vibration, pitch perturbation)
  0 = No roughness
  1 = Slight roughness
  2 = Moderate roughness
  3 = Severe roughness

B — Breathiness (air leakage, incomplete glottic closure)
  0 = No breathiness
  1 = Slight breathiness
  2 = Moderate breathiness
  3 = Severe breathiness

A — Asthenia (weak, lack of power)
  0 = Normal power
  1 = Slight weakness
  2 = Moderate weakness
  3 = Severe weakness

S — Strain (hyperfunctional effort quality)
  0 = No strain
  1 = Slight strain
  2 = Moderate strain
  3 = Severe strain
```

**Procedure:**
1. Record sustained /a/ vowel (3 seconds minimum) at comfortable pitch and loudness
2. Record connected speech (Rainbow Passage or standard reading text)
3. Rate both samples independently
4. If discrepancy between samples, note and use worst rating

### Phase 4: Vocal Range Assessment

**Frequency Range:**

```
VOCAL RANGE PROTOCOL:

1. Find lowest comfortable note (note + frequency in Hz)
2. Find highest comfortable note (note + frequency in Hz)
3. Calculate range in semitones
4. Map to standard MIDI notation

Normative values (approximate):
  Untrained adult male:   E2–E4 (~2 octaves = 24 semitones)
  Untrained adult female: A3–A5 (~2 octaves = 24 semitones)
  Trained singer:         Additional octave+ expected

Flags:
  - Range < 1.5 octaves (18 semitones) = reduced range
  - Breaks or register transitions = note location
  - Aphonic spots = note exact locations
```

**Intensity Range:**

```
INTENSITY RANGE PROTOCOL (at comfortable pitch):

1. Softest sustainable phonation (dB SPL)
2. Loudest comfortable phonation (dB SPL)
3. Calculate dynamic range (difference)

Normative values:
  Minimum phonation threshold: 50–60 dB SPL at 30 cm
  Maximum comfortable: 80–90 dB SPL
  Range: minimum 20 dB expected
  Professional singers: 30–40 dB range expected
```

### Phase 5: Maximum Phonation Time (MPT)

```
MPT PROTOCOL:

Task: Sustain each sound as long as possible on one breath
Vowel: /a/ at comfortable pitch and loudness
Sound: /s/ (voiceless)
Sound: /z/ (voiced)

Instructions to patient:
  "Take a deep breath and sustain the sound as long as you can,
   keeping pitch and loudness steady. Do it 3 times each."

Measure 3 trials of each. Use LONGEST value.

Normative values:
  Adult male /a/: 25–35 seconds (< 10 s = severely reduced)
  Adult female /a/: 15–25 seconds (< 8 s = severely reduced)
  Adult male /s/: 25–30 seconds
  Adult female /s/: 20–25 seconds

Flag: MPT < 10 seconds always requires laryngeal imaging referral.
```

### Phase 6: s/z Ratio

```
s/z RATIO CALCULATION:

s/z ratio = MPT for /s/ ÷ MPT for /z/

Interpretation:
  0.9–1.2 = Normal (efficient glottic closure)
  > 1.2   = Suggestive of glottic closure problem
            (nodules, polyps, paralysis, bowing)
  < 0.8   = Suggestive of excessive glottic tension
            (MTD, hyperfunctional pattern)

Note: Ratio is more diagnostically meaningful than MPT alone.
The /s/ measures respiratory support; /z/ adds phonatory efficiency.
```

### Phase 7: Severity Classification

Compile all findings and assign severity:

```
SEVERITY CLASSIFICATION GRID:

| Dimension        | Mild      | Moderate     | Severe       |
|------------------|-----------|--------------|--------------|
| GRBAS-G          | 1         | 2            | 3            |
| VHI-10           | 0–10      | 11–20        | 21–40        |
| MPT /a/          | > 15 s (F) / > 20 s (M) | 8–15 s | < 8 s |
| s/z ratio        | 0.9–1.2   | 1.2–1.4      | > 1.4        |
| Vocal range      | > 1.5 oct | 1–1.5 oct    | < 1 octave   |
| Dynamic range    | > 20 dB   | 15–20 dB     | < 15 dB      |

OVERALL SEVERITY:
  Mild:     Majority of dimensions in Mild category
  Moderate: 2+ dimensions in Moderate or 1 in Severe
  Severe:   2+ dimensions in Severe, or any MPT < 5 s
```

---

## Output

### Assessment Report Structure

```markdown
# Vocal Assessment Report

**Patient:** [Name]
**Date:** [Date]
**Assessor:** [Name, credentials]
**Session type:** Initial / Re-evaluation

## Chief Complaint
[Verbatim patient complaint]
[Duration and onset]

## Case History Summary
[Key findings from anamnesis — risk factors, aggravators]
[Medications affecting voice]
[Professional voice demands]

## VHI-10
Score: [X/40]
Handicap Level: [Mild / Moderate / Moderate-Severe / Severe]

## Perceptual Evaluation (GRBAS)
G: [0–3] R: [0–3] B: [0–3] A: [0–3] S: [0–3]
Predominant quality: [describe in 1–2 sentences]

## Vocal Range
Lowest note: [note] ([Hz])
Highest note: [note] ([Hz])
Range: [semitones] = [octaves]
Dynamic range: [min dB] – [max dB]

## Maximum Phonation Time
/a/: [sec] (norm: [expected range])
/s/: [sec]
/z/: [sec]
s/z ratio: [value] → [Interpretation]

## Severity Classification
Overall: [Mild / Moderate / Severe]

## Clinical Impressions
[Hypotheses, pattern description, differential]

## Recommendations
[ ] Laryngoscopy referral (if indicated)
[ ] Voice therapy — [approach]
[ ] Vocal hygiene program
[ ] Medical referral (GERD, allergy, endocrine)
[ ] Re-evaluation date: [date]

## Therapy Goals (if applicable)
1. [Specific, measurable goal]
2. [Specific, measurable goal]
3. [Specific, measurable goal]
```

---

## Validation

| Criterion | Standard | Fail Condition |
|-----------|----------|----------------|
| Case history complete | All 18 items documented | Any required field blank |
| GRBAS rated on two samples | Sustained + connected speech | Only one sample rated |
| MPT: 3 trials each | Best of 3 used | Fewer than 3 trials |
| s/z ratio calculated | Based on best MPT values | Omitted |
| Severity classification assigned | Uses full grid | Subjective only |
| Recommendations documented | At minimum 2 action items | Empty recommendations |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Case history skipped or incomplete | BLOCK — clinical assessment is invalid without complete anamnesis | NON-NEGOTIABLE |
| Active URI / laryngitis on assessment day | RESCHEDULE — findings will be unreliable | MUST |
| Patient on vocal rest > 2 hours pre-session | Confirm tasks permitted by referring physician before proceeding | SHOULD |
| MPT < 5 seconds | Immediate laryngoscopy referral required — do not proceed with therapy before imaging | MUST |

---

**Mara says:** "A voice tells a story. Before we treat, we must listen — not just to the sound, but to the person behind it."
