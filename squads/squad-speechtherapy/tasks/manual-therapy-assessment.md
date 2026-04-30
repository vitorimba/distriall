# Task: manual-therapy-assessment

> **Command:** `*manual-therapy-assessment {patient_name}`
> **Agent:** Mara Behlau (Vocal Specialist) — with manual therapy training
> **Purpose:** Lieberman Protocol laryngeal manual therapy assessment — laryngeal palpation, muscle tension evaluation, joint mobility, MTD screening, tension map generation, and therapy recommendation

---

## Overview

Manual therapy assessment of the larynx evaluates extrinsic laryngeal muscle tension patterns, laryngeal position and mobility, and joint articulations of the laryngeal framework. This assessment is indicated whenever:
1. Hyperfunctional voice disorder is suspected (MTD — Muscle Tension Dysphonia)
2. Voice therapy progress has plateaued despite adequate technique
3. Patient reports laryngeal discomfort or pain with phonation
4. Cervical/shoulder tension patterns are visually evident

Based on the Lieberman Manual Circumlaryngeal Therapy protocol (Roy et al., 1997; Van Lierde, 2004) adapted for diagnostic use.

---

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `patient_name` | Yes | Patient identifier |
| `--voice_complaint` | Yes | Primary voice complaint — affects palpation focus |
| `--pain_location` | No | Patient-reported pain location (neck, larynx, shoulders) |
| `--chronicity` | No | Duration of tension pattern: `acute` (< 3 months) or `chronic` (> 3 months) |
| `--prior_throat_surgery` | No | Flag if prior laryngeal or thyroid surgery |
| `--singer_type` | No | Singing genre — affects tension pattern expectations |

---

## Preconditions

- Standard vocal assessment (vocal-assessment) completed
- No active infection of head/neck structures
- No recent laryngeal surgery (< 3 months — requires surgeon clearance)
- No suspected laryngeal fracture or trauma
- Patient has provided informed consent for manual contact assessment
- Clinician has manual therapy training in laryngeal techniques

---

## Execution Steps

### Phase 1: Postural and Visual Assessment

```
VISUAL OBSERVATION PROTOCOL:

POSTURE ASSESSMENT:
  Observe patient from:
  1. Front view:
     - Head position: forward head posture (chin jutting) → increases
       sternohyoid and sternothyroid tension → larynx elevated
     - Shoulder height symmetry: one shoulder elevated → ipsilateral
       sternocleidomastoid and scalene tension
     - Jaw position at rest: clenched / tense / relaxed

  2. Side profile:
     - Ear-to-shoulder angle (normal: ear directly above shoulder)
     - Forward head posture: measure chin-to-chest distance vs. occiput-to-wall
     - Laryngeal height at rest: visually note thyroid cartilage position

  3. During phonation:
     - Does larynx rise excessively on high notes? (normal: small rise)
     - Do strap muscles (sternohyoid) visibly contract?
     - Is there jaw tension or temporomandibular involvement?
     - Does the neck/larynx visibly tighten during voice use?

LARYNGEAL HEIGHT CLASSIFICATION:
  Low larynx: Thyroid notch below hyoid — hypofunctional pattern
  Neutral: Thyroid notch at or near hyoid level — normal
  Elevated: Thyroid notch above hyoid — suspect hyperfunctional / MTD

NECK TENSION PATTERNS:
  Sternocleidomastoid: visible or palpable tension along lateral neck
  Trapezius: elevation of shoulder girdle
  Suprahyoid group: visible tightening under chin/jaw
  Infrahyoid group: visible sternohyoid tension with phonation
```

---

### Phase 2: Extrinsic Laryngeal Muscle Palpation

```
PALPATION PROTOCOL — Systematic Region-by-Region:

INFORMED CONSENT CHECK:
  Before any contact: "I'm going to gently feel your neck and throat
  area. Please tell me immediately if you feel any pain, discomfort,
  or want me to stop. Anything you feel during this assessment is
  diagnostic information — there are no wrong answers."

RATING SCALE:
  0 = No tension / No pain
  1 = Mild tension, no pain
  2 = Moderate tension, mild tenderness
  3 = Significant tension with pain on palpation
  4 = Severe tension, significant pain, guarding

REGION 1: Suboccipital / Posterior Cervical
  Technique: Patient seated, clinician posterior
  Contact: Fingerpads on suboccipital muscles bilaterally
  Assess: Tension, tenderness, point tenderness (trigger points)
  Normal: Mild tension, no tenderness
  Abnormal: Tenderness 2+ suggests cervicogenic component

REGION 2: Sternocleidomastoid (SCM)
  Technique: Grasp SCM between thumb and fingers (pinch grip)
  Start: At mastoid process → follow to clavicular attachment
  Assess: Trigger points (rope-like band in muscle), tenderness
  Sides: Both right and left independently
  Note: Asymmetry is significant — document right vs. left rating

REGION 3: Suprahyoid Muscle Group
  Location: Floor of mouth / under chin
  Technique: Clinician in front, fingerpads flat under mandible
  Move posteriorly from chin to hyoid bone
  Muscles: Mylohyoid, geniohyoid, anterior digastric
  Assess: Tension, tenderness, resistance to gentle downward pressure
  Normal: Soft, pliable, non-tender
  Abnormal (MTD indicator): Hard, rope-like tension, tenderness 2+

REGION 4: Hyoid Bone
  Location: Midline, above thyroid cartilage
  Technique: Grasp hyoid body between thumb and forefinger (gentle)
  Assess:
  a. Position: Normal (slightly superior to thyroid notch)
     Elevated: Suspect MTD or singing tension pattern
     Asymmetric: One side higher → unilateral tension
  b. Mobility: Gently rock hyoid left-right
     Normal: 0.5–1 cm lateral excursion each side, smooth
     Restricted: < 0.5 cm, or guarding/pain → positive MTD sign
  c. Tenderness: Gentle pressure on body and greater cornu
  Report: Hyoid position + mobility + tenderness rating

REGION 5: Thyrohyoid Space
  Location: Space between hyoid and superior thyroid cartilage
  Technique: Fingerpads on thyrohyoid membrane bilaterally
  Assess: Pliability of membrane, distance between structures
  Normal: Visible gap, pliable, non-tender
  Narrowed gap (< 5 mm): Indicates laryngeal elevation / MTD
  Tenderness: Note if asymmetric

REGION 6: Thyroid Cartilage
  Technique: Grasp thyroid laminae between thumb and finger
  Assess:
  a. Position: Midline vs. deviated (may indicate scar or asymmetry)
  b. Mobility: Rock laterally with gentle oscillating pressure
     Normal: 0.5–1 cm lateral mobility each direction
     Restricted: May indicate perilaryngeal fibrosis or extreme tension
  c. Tenderness on lamina surfaces
  d. Superior cornu: Palpate for adhesion or tenderness

REGION 7: Cricothyroid Joint
  Location: Space between inferior thyroid and superior cricoid
  Technique: Index finger on anterior midline cricothyroid membrane
  Assess:
  a. Tenderness of joint bilaterally
  b. Palpate for point tenderness at joint margin
  Note: Cricothyroid muscle tenderness is common in singers with
  excessive head voice use or pitch abuse

REGION 8: Cricoid Cartilage
  Location: Complete ring below thyroid cartilage
  Technique: Palpate arch anteriorly, posterior lamina more difficult
  Assess: Tenderness, position (midline vs. deviated)
  Note: Cricoid deviation uncommon — if present, ENT referral

REGION 9: Infrahyoid Muscles (Strap Muscles)
  Location: Anterior neck, lateral to trachea
  Muscles: Sternohyoid, sternothyroid, thyrohyoid, omohyoid
  Technique: Longitudinal palpation from hyoid to sternum
  Assess: Tightness along muscle belly, tenderness, asymmetry
  During phonation: Do muscles contract visibly? (abnormal if excessive)
```

---

### Phase 3: Joint Mobility Assessment

```
JOINT AND STRUCTURAL MOBILITY PROTOCOL:

HYOID MOBILIZATION TEST:
  Technique: Grasp hyoid as above; apply lateral oscillation
  Test: 5 gentle oscillations each direction
  Measure: Approximate lateral excursion (cm)
  Response: Does tension decrease with sustained gentle pressure?
  Positive MTD sign: Restricted mobility + voice quality improves
                     with sustained lateral mobilization

LARYNGEAL VERTICAL MOBILITY:
  Technique: Index and middle finger on superior thyroid notch
             Apply gentle inferior traction (downward pressure)
  Assess: Does larynx descend from elevated position?
  Normal: 0.5–1 cm downward mobility
  Restricted: < 0.5 cm or pain on inferior traction → MTD sign
  Voice correlation: Attempt phonation during inferior traction
                    → voice quality improves = MTD confirmed

THYROHYOID SPACE PALPATION:
  Technique: Bilateral simultaneous pressure into thyrohyoid space
             Gentle inferior compression of hyoid toward thyroid
  Assess: Space pliability, tenderness
  If space is < 3 mm: Severe MTD indicator

TEMPOROMANDIBULAR JOINT (TMJ) SCREEN:
  Technique: Fingertips at TMJ bilaterally, patient opens/closes jaw
  Assess: Clicking, crepitus, pain, restricted opening, asymmetric path
  Connection: TMJ tension → pterygoid and masseter tension
              → tongue base tension → extrinsic laryngeal tension
  Positive screen: Refer to dentist or oral surgeon if indicated
```

---

### Phase 4: MTD Screening — Diagnostic Integration

```
MTD SCREENING CRITERIA (Aronson, Morrison & Rammage):

PRIMARY INDICATORS:
  □ Elevated laryngeal position at rest (visual)
  □ Restricted laryngeal vertical mobility (< 0.5 cm downward)
  □ Restricted hyoid lateral mobility (< 0.5 cm each side)
  □ Suprahyoid tension ≥ 2 on palpation scale
  □ Voice improves immediately with laryngeal lowering (manipulation test)
  □ GRBAS: Strained quality (S ≥ 2) predominant
  □ Patient reports laryngeal pain or fatigue with voice use

SECONDARY INDICATORS:
  □ Elevated larynx during phonation (visual)
  □ Sternohyoid tension during phonation
  □ SCM tension asymmetry
  □ Forward head posture > 2 cm
  □ Jaw tension / TMJ involvement
  □ Shoulder elevation during phonation

MTD CLASSIFICATION:
  Primary MTD (no organic lesion):
  - All above on a structurally normal larynx
  - Treatment: Manual therapy + voice therapy (NOT surgery)

  Secondary MTD (compensation for organic lesion):
  - MTD pattern ON TOP of nodule, polyp, or paralysis
  - Treatment: Address both simultaneously or organic lesion first

  Episodic Laryngeal Breathing Disorder (paradoxical motion):
  - Episodic pattern, inspiratory stridor
  - Requires laryngoscopy to confirm
  - Different management pathway

SCORING MATRIX:
  Primary indicators: 1 point each
  Secondary indicators: 0.5 points each

  0–1.5 points: MTD unlikely
  2–3 points: Possible MTD — trial manual therapy
  3.5–5 points: Probable MTD — manual therapy indicated
  5+ points: Definitive MTD presentation
```

---

### Phase 5: Tension Map Generation

```
TENSION MAP DOCUMENTATION:

Create a body diagram of the anterior neck and mark:

TENSION MAP TEMPLATE:

  POSTERIOR HEAD
  ┌─────────────────────────────┐
  │ Suboccipital R:[_] L:[_]   │
  │ SCM R:[_] L:[_]            │
  ├─────────────────────────────┤
  │ HYOID                       │
  │ Position: [Normal/Elevated/Asymm] │
  │ Mobility: [_] cm L / [_] cm R    │
  │ Tenderness: [0-4]               │
  ├─────────────────────────────┤
  │ SUPRAHYOID                  │
  │ Tension: R[_] L[_]         │
  │ Tenderness: [0-4]          │
  ├─────────────────────────────┤
  │ THYROHYOID SPACE            │
  │ Space (mm): [_]             │
  │ Tenderness: R[_] L[_]      │
  ├─────────────────────────────┤
  │ THYROID CARTILAGE           │
  │ Position: [Midline/Deviated _] │
  │ Mobility: [Normal/Restricted]  │
  │ Tenderness: R[_] L[_]      │
  ├─────────────────────────────┤
  │ CRICOTHYROID JOINT          │
  │ Tenderness: R[_] L[_]      │
  ├─────────────────────────────┤
  │ INFRAHYOID STRAP MUSCLES    │
  │ Tension: R[_] L[_]         │
  │ During phonation: [+/-]     │
  └─────────────────────────────┘
  MTD SCORE: [_] / 8
  PATTERN: [Symmetric / Right-dominant / Left-dominant / Superior-predominant]
```

---

## Output

### Manual Therapy Assessment Report

```markdown
# Manual Therapy Assessment Report

**Patient:** [Name]
**Date:** [Date]
**Assessor:** [Name, credentials]
**Referral indication:** [reason]

## Postural Findings
Forward head posture: [measurement]
Shoulder asymmetry: [right/left elevated / symmetric]
Laryngeal height at rest: [low/neutral/elevated]
Visual findings during phonation: [description]

## Tension Map Summary

| Region | Right | Left | Notes |
|--------|-------|------|-------|
| Suboccipital | [0–4] | [0–4] | |
| SCM | [0–4] | [0–4] | |
| Suprahyoid | [0–4] | [0–4] | |
| Thyrohyoid space | [mm] | [mm] | |
| Thyroid cartilage | [mobility] | [mobility] | |
| Cricothyroid joint | [0–4] | [0–4] | |
| Infrahyoid | [0–4] | [0–4] | |

## Hyoid Assessment
Position: [Normal / Elevated Xmm / Asymmetric]
Lateral mobility: [R: X cm, L: X cm]
Tenderness: [0–4]

## MTD Screening Result
Primary indicators positive: [X] / 7
Secondary indicators positive: [X] / 7
MTD Score: [X] / 8
Classification: [MTD unlikely / Possible / Probable / Definitive]
MTD Type: [Primary / Secondary / Episodic]

## Voice Response to Manipulation
Laryngeal lowering test: [Voice improved / No change / Worsened]
Hyoid mobilization: [Voice improved / No change]

## Recommendations
[ ] Manual circumlaryngeal therapy — [frequency, duration]
[ ] Referral to physiotherapist (cervical spine component)
[ ] Referral to dentist (TMJ component)
[ ] Continue with standard voice therapy — no manual therapy indicated
[ ] ENT referral (suspicious mobility restriction requiring imaging)

## Therapy Plan
[Specific manual therapy approach, session frequency]
```

---

## Validation

| Criterion | Standard | Fail Condition |
|-----------|----------|----------------|
| All 9 regions palpated and documented | Tension rating recorded for each region | Any region omitted |
| Tension map generated | Graphical or tabular map in report | Narrative description only |
| MTD screening score calculated | Numeric score using both primary and secondary indicators | Subjective impression only |
| Voice response to manipulation documented | Laryngeal lowering test performed | Assumed without testing |
| Recommendation specified | Therapy plan or referral — never "monitor" as sole recommendation | Vague disposition |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Assessing without informed consent for manual contact | BLOCK — informed consent required before any palpation | NON-NEGOTIABLE |
| Palpating within 3 months of laryngeal surgery without surgeon clearance | BLOCK — contraindicated post-surgical period | NON-NEGOTIABLE |
| Active infection, abscess, or acute trauma in assessment area | POSTPONE — reschedule when resolved | MUST |
| Applying therapeutic manipulation without completing diagnostic assessment first | BLOCK — assess before treating; tension map must precede intervention | NON-NEGOTIABLE |
| Attempting manipulation of laryngeal cartilages if calcification suspected (elderly patients) | REFER to manual physiotherapist trained in laryngeal work | MUST |

---

**Protocol note:** "The larynx does not exist in isolation. What I find in the suprahyoid muscles connects to the jaw, to the shoulders, to the posture. The voice is the whole body — the assessment must be too."
