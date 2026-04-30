# Task: vocal-hygiene-plan

> **Command:** `*vocal-hygiene-plan {patient_name}`
> **Agent:** Mara Behlau (Vocal Specialist)
> **Purpose:** Comprehensive vocal hygiene protocol addressing hydration, nasal health, vocal behavior, environment, diet, and sleep — adapted for singers with specific returning-to-performance guidelines

---

## Overview

Vocal hygiene is the foundation of all voice therapy. Without consistent hygiene practices, therapeutic gains are temporary. This protocol follows Mara Behlau's evidence-based framework (Behlau & Pontes, 1995; updated 2010) and addresses:

1. **Hydration** — systemic and surface hydration
2. **Nasal irrigation** — airway hygiene and mucosal health
3. **Vocal rest** — strategic use and parameters
4. **Environmental factors** — humidity, air quality, noise
5. **Dietary considerations** — reflux, drying agents
6. **Sleep** — vocal recovery physiology
7. **Singer-specific** — performance preparation and recovery

**VETO: Never resume singing without clinical clearance. Returning too early risks relapse or hemorrhage.**

---

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `patient_name` | Yes | Patient identifier |
| `--singer` | No | Activate singer-specific guidelines |
| `--profession` | No | `teacher`, `preacher`, `actor`, `general` — adjusts load guidelines |
| `--diagnosis` | Yes | `nodule`, `MTD`, `hyperfunctional`, `general_dysphonia` |
| `--reflux_confirmed` | No | If LPR/GERD confirmed, activates enhanced dietary protocol |
| `--climate` | No | `dry`, `humid`, `mixed` — affects humidification recommendations |

---

## Preconditions

- Vocal assessment completed
- Current medications reviewed (identify drying agents)
- Patient living situation assessed (home, work environments)
- Singer: current performance schedule documented

---

## Execution Steps

### Phase 1: Hydration Protocol

```
HYDRATION FRAMEWORK — Behlau Two-System Approach:

SYSTEM 1: Systemic Hydration (Body-Level)
  Target: 35–40 mL per kg body weight per day
  Practical minimum: 2.0–2.5 L per day
  Optimal for voice professionals: 2.5–3.0 L per day

  Timing guidance:
  - Begin hydrating 2 hours before voice use
  - Distribute evenly throughout the day (not all at once)
  - Reduce intake 2 hours before sleep (sleep quality)
  - Increase by 500 mL on days with:
    • Air conditioning exposure
    • Singing or extended speaking
    • Air travel
    • High altitude

  Best sources (ranked):
  1. Still water (best — no bloating, no carbonation)
  2. Herbal teas (no caffeine — chamomile, ginger)
  3. Diluted electrolyte drinks (if sweating heavily)
  4. Water-rich foods (cucumber, watermelon, fruits)

  Avoid as primary hydration:
  - Coffee / black tea (mild diuretic effect)
  - Carbonated beverages (bloating affects breath support)
  - Alcohol (significant drying + mucosal irritation)

SYSTEM 2: Surface Hydration (Mucosal Level)
  Target: Keep vocal fold surface moist directly

  a) Steam inhalation:
     - Pure steam only (no menthol, no eucalyptus — mucosal irritants)
     - Method: bowl of hot water + towel, OR personal facial steamer
     - Duration: 10 minutes per session
     - Frequency: 1–2× daily for active treatment; 1× daily maintenance
     - Timing: Morning and/or pre-voice use

  b) Saline nebulization (if available):
     - 0.9% isotonic saline solution
     - Ultrasonic nebulizer preferred
     - 10–15 minutes per session
     - Directly hydrates mucosal surface without systemic absorption

  c) Room humidity:
     - Target: 40–60% relative humidity
     - Use humidifier in bedroom if climate is dry
     - Monitor with hygrometer
     - Caution: > 65% humidity → mold risk

MONITORING:
  Urine color indicator (easy patient education):
  - Pale yellow = well hydrated (target)
  - Dark yellow / amber = dehydrated (add fluids)
  - Clear = over-hydrated (rare, reduce slightly)
```

### Phase 2: Nasal Irrigation Protocol

```
NASAL IRRIGATION FOR VOCAL HEALTH:

Rationale:
  Post-nasal drip is one of the most common aggravators of vocal
  pathology. Mucus dripping onto the vocal folds triggers chronic
  throat clearing, which traumatizes the vocal fold epithelium.
  Nasal irrigation clears allergens, pathogens, and excess mucus
  from the nasal passages, breaking this cycle.

SOLUTION PREPARATION:
  Option A — Prepared saline (preferred):
  - 240 mL (1 cup) lukewarm distilled or boiled water
  - 2.5 mL (½ teaspoon) non-iodized salt
  - 1.25 mL (¼ teaspoon) baking soda (optional — buffers pH)
  - Mix until dissolved

  Option B — Commercial pre-made isotonic saline:
  - Sterimar, Simply Saline, NeilMed saline sachets
  - Use as directed on packaging

  NEVER use:
  - Tap water (infection risk in immunocompromised patients)
  - Iodized salt (mucosal irritant)
  - Hypertonic solution > 3% (dries mucosa)

TECHNIQUE:
  Equipment: Neti pot, squeeze bottle, or nasal irrigation system

  Steps:
  1. Stand over sink, head tilted 45° to one side
  2. Insert tip of neti pot / bottle into upper nostril
  3. Open mouth to breathe — DO NOT hold breath
  4. Gently pour/squeeze solution
  5. Let solution flow through nasal passage and out lower nostril
  6. Gently blow nose (do not force-blow)
  7. Repeat on other side

  Frequency:
  - Active infection / allergy season: 2× daily (morning + evening)
  - Maintenance: 1× daily (morning preferred)
  - Pre-performance: 1× approximately 2 hours before performance

  Connection to vocal health:
  - Reduces post-nasal drip → less throat clearing
  - Improves nasal breathing → better humidification of inhaled air
  - Reduces allergen load → less mucosal inflammation
  - Decreases Eustachian tube congestion → improves resonance perception
```

### Phase 3: Vocal Rest Guidelines

```
VOCAL REST FRAMEWORK:

TYPES OF VOCAL REST:

1. COMPLETE VOCAL REST (CVR)
   Definition: No phonation whatsoever — no whispering, no mouthing
   When used:
   - Post-surgical (surgeon-prescribed duration)
   - Acute hemorrhagic lesion
   - Acute laryngitis with significant edema
   Duration: Surgeon/ENT specified — typically 5–10 days
   Important: Whispering is NOT vocal rest — it increases
   laryngeal muscle tension more than normal voice.

2. RELATIVE VOCAL REST (RVR)
   Definition: Reduce voice use to essential communication only
   When used:
   - Active nodule rehabilitation
   - Post-performance recovery
   - Acute dysphonia without hemorrhage
   Target: Reduce vocal load by 50–70%
   Practical guidelines:
   - No social talking (keep conversations to need)
   - No background noise talking
   - No phone conversations unless essential
   - Text/write when possible

3. STRATEGIC VOCAL REST (SVR) — For Performance Professionals
   Definition: Planned rest periods within performance schedule
   Model: Rest before → perform → recover after
   Pre-performance: 30–60 minutes minimal voice use
   Post-performance: 2 hours no voice, then gradual return

WHAT TO AVOID ALWAYS (with or without formal rest):
  - Throat clearing (substitute: silent swallow + sip water)
  - Whispering (counter-intuitive but harmful)
  - Shouting or calling across rooms
  - Talking over loud music/noise
  - Coughing forcefully when possible to suppress
  - Laughing/crying in extreme ways when voice is compromised
```

### Phase 4: Environmental Factors

```
ENVIRONMENT MANAGEMENT:

WORKPLACE:
  - Request humidifier if workplace air is dry
  - Position away from air conditioning direct flow
  - Use a desk fan on face cautiously — blows dry air
  - Keep water bottle visible and accessible
  - Identify quiet times for important voice tasks (avoid after noise)

HOME:
  - Bedroom humidifier: 40–55% humidity target
  - Avoid sleeping with mouth open (dehydrates vocal tract)
  - Change HVAC / air purifier filters regularly
  - Reduce dust exposure (nasal irritation)
  - Do not use wood-burning fireplace or candles regularly
    (smoke particles are mucosal irritants)

TRAVEL:
  - Airplane cabins: ~10–15% relative humidity — bring saline nasal spray
  - Use saline nasal spray every 2 hours during flight
  - Drink extra 500 mL water per hour of flight
  - Avoid alcohol and caffeine during flight
  - Use personal steam inhaler after landing

NOISE EXPOSURE:
  - Venues with background noise above 70 dB: use FM system or avoid
  - If must speak over noise: come closer, don't raise pitch
  - Hearing protection in loud environments (reduces shouting impulse)
```

### Phase 5: Dietary Recommendations

```
DIET FOR VOCAL HEALTH — Behlau Protocol:

REFLUX MANAGEMENT (LPR/GERD):
  All voice patients should reduce reflux risk:

  Avoid or minimize:
  - Spicy foods (capsaicin irritates larynx directly)
  - Citrus fruits and juices (acidic pH)
  - Tomato-based sauces
  - Carbonated beverages
  - Fatty / fried foods (delay gastric emptying)
  - Chocolate (relaxes lower esophageal sphincter)
  - Peppermint (relaxes LES)
  - Coffee and alcohol (both increase acid production)
  - Eating within 3 hours of sleep

  Helpful additions:
  - Alkaline water (pH 8–9) for LPR patients
  - Honey (mucosal coating, anti-inflammatory)
  - Ginger tea (anti-inflammatory, prokinetic)
  - Slippery elm tea (mucilaginous coating)

DRYING AGENTS TO LIMIT:
  - Antihistamines (if avoidable — discuss with physician)
  - Alcohol — dehydrates systemically and irritates mucosa
  - Caffeine — moderate consumption OK (< 2 cups/day)
  - Diuretics — flag with prescribing physician

MUCOSAL HEALTH SUPPORT:
  - Omega-3 fatty acids (salmon, chia, flaxseed) — anti-inflammatory
  - Vitamin C (wound healing, immune support)
  - Zinc (mucosal repair)
  - Adequate protein (tissue repair)
```

### Phase 6: Sleep and Recovery

```
SLEEP PROTOCOL FOR VOCAL HEALTH:

Why sleep matters:
  During sleep, the larynx produces protective secretions and
  tissue repair processes occur. Inadequate sleep increases
  cortisol (inflammatory) and reduces tissue healing.

TARGETS:
  Minimum: 7 hours per night
  Optimal for voice professionals: 8–9 hours
  Pre-performance: 9 hours if possible

SLEEP HYGIENE FOR VOICE:
  - Humidify bedroom (40–55% relative humidity)
  - Avoid speaking within 30 minutes of sleep (rest the larynx)
  - Avoid alcohol before bed (disrupts sleep architecture + drying)
  - Side or back sleeping preferred over stomach (acid reflux risk)
  - Elevate head of bed 10–15 cm if reflux confirmed

VOICE AFTER SLEEP:
  - Morning voice is normal (edema from lying horizontal)
  - Do NOT force morning voice
  - Hydrate 500 mL water before any significant voice use
  - Gentle hum warm-up (5 minutes) before teaching/performing
```

### Phase 7: Singer-Specific Guidelines

```
SINGER HYGIENE PROTOCOL:

PERFORMANCE PREPARATION (48-hour window):
  48 hours before performance:
  - No alcohol
  - Reduce spicy foods
  - Extra hydration (+500 mL/day)
  - Sleep 8+ hours both nights
  - No shouting or extended social talking

  12 hours before:
  - Saline steam inhalation (10 min)
  - Nasal irrigation
  - Quiet conversation only
  - Final large water intake 2 hours before

  2 hours before:
  - No food (reduces reflux risk + supports breath management)
  - 500 mL water
  - 15-minute vocal warm-up (gentle humming → SOVT → repertoire)
  - Nasal saline spray if backstage air is dry

PERFORMANCE:
  - Room temperature water backstage (cold constricts)
  - Small water sips between sets (do not gulp)
  - No ice, no cold drinks during performance

POST-PERFORMANCE RECOVERY:
  Immediately after:
  - Remain warm (cool down causes constriction)
  - Silent 15 minutes (no talking backstage)
  - Saline nebulization if available

  Same evening:
  - Relative vocal rest
  - Extra hydration
  - Elevate head (reflux prevention)
  - No late-night eating

  Recovery day (day after performance):
  - Complete relative vocal rest
  - Steam inhalation 2× that day
  - Reassess voice quality before any vocal use

RETURNING TO SINGING AFTER INJURY:
  VETO: Never resume singing without clinical clearance.
  Clearance criteria:
  - Laryngoscopy confirming resolution or stable lesion
  - GRBAS within normal limits (G ≤ 1)
  - MPT within 80% of pre-injury baseline
  - Therapy team agreement
  - Graduated return schedule agreed with physician
```

---

## Output

### Hygiene Plan Document (Patient Copy)

```markdown
# Vocal Hygiene Plan — [Patient Name]

**Date:** [Date]
**Prepared by:** [Clinician]
**Diagnosis:** [Diagnosis]

## My Daily Targets
- Water today: ______ L (goal: 2.5 L)
- Nasal irrigation: Morning [ ] Evening [ ]
- Steam/nebulization: [ ] Done
- Vocal rest compliance: [ ] Yes / [ ] Modified

## My Key Restrictions
[Personalized list based on assessment — e.g., "No throat clearing",
"No talking in the car", "No singing until [date/clearance"]

## Dietary Notes
[Personalized — e.g., "No coffee after 2 PM, no spicy food"]

## Emergency Contacts
Voice therapist: [name + phone]
ENT physician: [name + phone]
"When to call": sudden severe worsening, aphonia, pain with phonation
```

---

## Validation

| Criterion | Standard | Fail Condition |
|-----------|----------|----------------|
| Hydration target individualized by weight | Calculated 35 mL/kg — not generic "drink more water" | Generic advice only |
| Nasal irrigation technique demonstrated | Patient performs technique in clinic at least once | Instructions only, no demonstration |
| Vocal rest type specified | CVR / RVR / SVR documented — not "rest your voice" generically | Vague rest advice |
| Dietary review includes medications | Drying medications flagged and discussed with physician | Only food addressed |
| Singer clearance protocol documented | Written criteria for return — signed by patient | Verbal agreement only |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Singer returning to performance without laryngoscopy clearance | BLOCK — risk of hemorrhage into lesion; no exceptions | NON-NEGOTIABLE |
| Whispering prescribed as "vocal rest" | CORRECT immediately — whispering increases MTD pattern and is NOT rest | NON-NEGOTIABLE |
| Tap water recommended for nasal irrigation | CORRECT immediately — risk of Naegleria fowleri infection in some regions | MUST |
| Patient using menthol steam or eucalyptus inhalation | STOP — mucosal drying and irritant effect; plain steam only | MUST |
| Hygiene plan not written / only verbal | REQUIRE written document — compliance doubles with written instructions | SHOULD |

---

**Mara says:** "You cannot build a house on sand. Every therapy we do fails without hygiene. The voice lives in the body — and the body needs to be ready to receive it."
