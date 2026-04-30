# Task: Emotion Mapping

> **ID:** T-GM-010
> **Type:** Design
> **Squad:** squad-gamification
> **Agents:** emotion-designer (lead), experience-designer
> **Estimated Duration:** 2-3 hours
> **Inputs:** Player journey, mechanics spec, engagement loops
> **Outputs:** `emotion-map.md`, `mechanic-emotion-matrix.yaml`

## Purpose

Mapear emoções desejadas para mecânicas de gamificação usando o framework 4 Keys to Fun (Nicole Lazzaro) e Lenses of Game Design (Jesse Schell), garantindo que cada momento da experiência evoca a emoção certa.

## Pre-Conditions

- [ ] Player journey definida
- [ ] Mecânicas propostas listadas
- [ ] Contexto emocional do produto claro

## Execution Steps

### Step 1: 4 Keys to Fun Analysis
**Agent:** emotion-designer

Aplicar os 4 Keys to Fun de Nicole Lazzaro:

**Key 1: Hard Fun (Fiero)**
- **Emotion:** Triumph over adversity, personal achievement
- **Trigger:** Challenge, obstacle, difficulty
- **Physical Signal:** Fist pump, "Yes!", raised arms
- **Mechanics:** Boss battles, difficult quests, skill challenges, puzzles
- **Design Rule:** Must be genuinely difficult but fair; fake difficulty doesn't generate fiero

**Key 2: Easy Fun (Curiosity/Wonder)**
- **Emotion:** Wonder, curiosity, surprise, exploration
- **Trigger:** Novel stimuli, hidden content, discovery
- **Physical Signal:** Leaning forward, "Ooh!", exploring
- **Mechanics:** Easter eggs, exploration rewards, mystery boxes, narrative reveals
- **Design Rule:** Must reward exploration without punishing non-exploration

**Key 3: People Fun (Amusement/Social)**
- **Emotion:** Amusement, schadenfreude, naches (pride in others), social bonding
- **Trigger:** Social interaction, cooperation, competition
- **Physical Signal:** Laughter, high-fives, communication
- **Mechanics:** Teams, gifting, social challenges, co-op missions, friendly rivalry
- **Design Rule:** Social mechanics must feel optional and natural, not forced

**Key 4: Serious Fun (Meaning/Relaxation)**
- **Emotion:** Relaxation, excitement, awe, meaning
- **Trigger:** Rhythm, collection, completion, real-world impact
- **Physical Signal:** Calm focus, satisfaction, mindful engagement
- **Mechanics:** Collections, meditation streaks, real-world impact tracking, zen modes
- **Design Rule:** Connect to values and purpose larger than the game

### Step 2: Emotional Journey Mapping
**Agent:** emotion-designer

Mapear emoções ao longo da jornada do jogador:

```yaml
emotional_journey:
  discovery:
    target_emotions: [curiosity, anticipation, wonder]
    key: easy_fun
    risk_emotions: [confusion, overwhelm, skepticism]
    mechanics:
      - "Mystery reward for first action"
      - "Story hook that reveals purpose"
      - "Easy first win to build confidence"

  onboarding:
    target_emotions: [confidence, delight, belonging]
    key: easy_fun + people_fun
    risk_emotions: [frustration, boredom, isolation]
    mechanics:
      - "Guided first steps with celebration"
      - "Social welcome (if applicable)"
      - "Quick achievement to prove competence"

  habit_building:
    target_emotions: [determination, satisfaction, pride]
    key: hard_fun + serious_fun
    risk_emotions: [monotony, fatigue, doubt]
    mechanics:
      - "Gradually increasing challenges"
      - "Streak satisfaction and consistency rewards"
      - "Visible progress and improvement tracking"

  mastery:
    target_emotions: [flow, fiero, expertise]
    key: hard_fun
    risk_emotions: [boredom, plateau frustration, arrogance]
    mechanics:
      - "Difficult optional challenges"
      - "Teaching/mentoring opportunities"
      - "Prestige systems and recognition"

  endgame:
    target_emotions: [legacy, purpose, nostalgia]
    key: serious_fun + people_fun
    risk_emotions: [emptiness, aimlessness, departure]
    mechanics:
      - "Community contribution mechanics"
      - "Legacy/mentor systems"
      - "New seasons/fresh content"
```

### Step 3: Schell's Lenses Application
**Agent:** emotion-designer

Aplicar Lenses relevantes de Jesse Schell:

**Lens #1 — The Lens of Emotion:**
- What emotions do I want the player to experience?
- What emotions are players actually experiencing?
- How can I bridge the gap?

**Lens #5 — The Lens of Fun:**
- What parts are fun? Why?
- What parts need to be more fun?

**Lens #9 — The Lens of the Elemental Tetrad:**
- Mechanics → Do the rules create the desired emotional experience?
- Story → Does the narrative support emotional goals?
- Aesthetics → Do visuals/sounds reinforce emotions?
- Technology → Does the platform enable emotional delivery?

**Lens #68 — The Lens of the Inner Contradiction:**
- What is the core tension that drives engagement?
- Is there a meaningful dilemma or choice?

**Lens #79 — The Lens of Freedom:**
- Does the player feel free? Where do they feel constrained?
- How can I create more meaningful choices?

**Lens #100 — The Lens of Love:**
- Do I love this project? Would I use it myself?
- What would make someone love this experience?

### Step 4: Mechanic-Emotion Matrix
**Agent:** emotion-designer

| Mechanic | Primary Emotion | Secondary Emotion | 4 Keys Category | Risk Emotion |
|----------|----------------|-------------------|-----------------|-------------|
| Points | Satisfaction | Greed | Serious Fun | Apathy (if meaningless) |
| Badges | Pride | Belonging | Hard Fun | Triviality (if too easy) |
| Leaderboards | Competition | Anxiety | Hard Fun | Shame (if poorly designed) |
| Streaks | Determination | Fear of loss | Serious Fun | Anxiety (if punitive) |
| Levels | Accomplishment | Anticipation | Hard Fun | Frustration (if grind) |
| Quests | Purpose | Curiosity | Easy Fun | Overwhelm (if too many) |
| Random Rewards | Surprise | Excitement | Easy Fun | Frustration (if unfair) |
| Teams | Belonging | Trust | People Fun | Pressure (if forced) |
| Challenges | Fiero | Flow | Hard Fun | Frustration (if unfair) |
| Narrative | Meaning | Empathy | Serious Fun | Disconnect (if forced) |
| Customization | Self-expression | Ownership | Easy Fun | Paralysis (too many options) |
| Gifting | Generosity | Connection | People Fun | Obligation (if expected) |

### Step 5: Emotional Safeguards
**Agent:** emotion-designer

Prevenir emoções negativas:

| Risk Emotion | Cause | Prevention | Recovery |
|-------------|-------|-----------|----------|
| **Frustration** | Too difficult, unfair | Adaptive difficulty, hints | "Need a hint?" prompt |
| **Anxiety** | Time pressure, loss mechanics | Opt-out for time limits | Calm mode option |
| **Shame** | Public failure, low ranking | Private by default, positive framing | Hide rankings option |
| **Guilt** | Broken streaks, missed goals | Freeze options, grace periods | "Welcome back" not "You missed X" |
| **Boredom** | Repetitive, too easy | Variety, challenge options | "Try hard mode?" |
| **Overwhelm** | Too many mechanics, information | Progressive disclosure | Simplify view option |
| **Alienation** | Forced social, competitive pressure | All social features optional | Solo mode |

### Step 6: Sensory Design Recommendations
**Agent:** emotion-designer

**Audio-Visual Emotion Cues:**
| Emotion | Sound | Visual | Animation |
|---------|-------|--------|-----------|
| Achievement | Bright chime, ascending notes | Gold burst, confetti | Scale up, bounce |
| Progress | Subtle tick, filling sound | Bar filling, number incrementing | Smooth fill |
| Surprise | Unexpected melody, "reveal" sound | Sparkle, glow, unfold | Pop, reveal |
| Social | Warm tone, connection sound | Heart, handshake, team colors | Float in, connect |
| Warning | Gentle alert, not alarm | Amber/yellow, pulse | Subtle pulse |
| Loss | Muted tone, not punishing | Gentle fade, not red/angry | Slow fade |

## Post-Conditions

- [ ] 4 Keys to Fun mapped to all mechanics
- [ ] Emotional journey per phase documented
- [ ] Schell's Lenses applied
- [ ] Mechanic-emotion matrix complete
- [ ] Emotional safeguards defined
- [ ] Sensory design recommendations included

## Quality Gate

- [ ] Every mechanic has an intended emotion AND a risk emotion
- [ ] Safeguards exist for every risk emotion
- [ ] No shame, guilt, or anxiety as primary mechanics
- [ ] 4 Keys balanced (not all Hard Fun or all Easy Fun)
- [ ] Emotional journey has no "dead zones"

## Next Tasks

- `engagement-loop-design` — Integrate emotions into loops
- `anti-pattern-audit` — Verify no emotional exploitation
- `ab-test-gamification` — Test emotional responses
