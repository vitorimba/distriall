# Task: Learning Gamification

> **ID:** T-GM-009
> **Type:** Design
> **Squad:** squad-gamification
> **Agents:** learning-designer (lead), emotion-designer
> **Estimated Duration:** 2-4 hours
> **Inputs:** Learning objectives, content structure, learner demographics
> **Outputs:** `learning-gamification-spec.md`, `mechanic-content-map.yaml`

## Purpose

Gamificar experiências educacionais e de treinamento usando princípios de Karl Kapp (Gamification of Learning), Bloom's Taxonomy alinhada com mecânicas de jogo, e design emocional para maximizar retenção de conhecimento.

## Pre-Conditions

- [ ] Objetivos de aprendizagem definidos (Bloom's levels)
- [ ] Conteúdo/currículo estruturado
- [ ] Perfil dos aprendizes disponível

## Execution Steps

### Step 1: Learning Objective Mapping
**Agent:** learning-designer

Mapear objetivos para níveis de Bloom e mecânicas:

| Bloom's Level | Learning Objective | Game Mechanic | Assessment |
|--------------|-------------------|---------------|-----------|
| **Remember** | Recall facts, terms, concepts | Flashcard battles, matching games, spaced repetition | Quiz with points |
| **Understand** | Explain ideas, interpret | Story-based scenarios, concept maps | Explain-to-earn XP |
| **Apply** | Use knowledge in new situations | Simulations, sandbox challenges | Practical challenges |
| **Analyze** | Draw connections, organize | Detective/mystery mechanics, data puzzles | Case study quests |
| **Evaluate** | Justify decisions, critique | Peer review with rubrics, debate mechanics | Judge scenarios |
| **Create** | Produce original work | Building tools, content creation, teaching others | Create + peer rating |

### Step 2: Knowledge Retention Mechanics
**Agent:** learning-designer

**Spaced Repetition System (SRS):**
```yaml
spaced_repetition:
  algorithm: "SM-2 modified"
  initial_interval: "1 day"
  intervals: [1, 3, 7, 14, 30, 60, 120]  # days
  ease_factor:
    correct_easy: 2.5
    correct_hard: 1.8
    incorrect: 1.0  # reset interval
  gamification_layer:
    strength_meter: true  # "Memory Strength: 85%"
    decay_visual: true    # Show knowledge "fading"
    review_rewards: true  # XP for timely reviews
    streak_bonus: true    # Bonus for daily review consistency
```

**Retrieval Practice (Testing Effect):**
- Quiz-based challenges instead of passive review
- Interleaved practice (mix topics, not blocked)
- Generation effect (fill-in > multiple choice)
- Difficulty desirably increased over time

### Step 3: Narrative & Context Design
**Agent:** learning-designer

Criar narrativa que contextualiza o aprendizado:

**Narrative Frameworks for Learning:**
| Framework | Structure | Best For |
|-----------|----------|----------|
| **Quest Chain** | Sequential missions building on each other | Linear curricula |
| **Open World** | Multiple available quests, learner chooses | Self-paced learning |
| **Mystery** | Uncover knowledge to solve a larger puzzle | Critical thinking |
| **Hero's Journey** | Learner is the hero, content is the challenge | Transformative programs |
| **Simulation** | Real-world scenario with consequences | Applied skills |
| **Mentorship** | Master-apprentice relationship | Coaching programs |

### Step 4: Social Learning Mechanics
**Agent:** learning-designer

**Collaborative Learning Gamification:**
- **Study Groups:** Team XP for group achievements
- **Peer Teaching:** Bonus XP for explaining concepts to others (Protege Effect)
- **Knowledge Sharing:** Points for contributing to study wiki
- **Accountability Partners:** Paired streaks (both must complete to earn bonus)
- **Group Challenges:** Solve problems together, collective rewards

**Competitive Learning Gamification:**
- **Quiz Battles:** Head-to-head on same topic
- **Time Trials:** Complete exercises against the clock (optional)
- **Cohort Leaderboards:** Compare with same-class/cohort only
- **Knowledge Tournaments:** Bracket-style elimination (voluntary)

### Step 5: Assessment Gamification
**Agent:** learning-designer

Transformar avaliações em experiências engajantes:

| Traditional Assessment | Gamified Version | Mechanic |
|-----------------------|-----------------|----------|
| Multiple choice exam | Boss Battle (progressive difficulty) | Health bar, power-ups |
| Essay | Quest completion (rubric as quest objectives) | Checklist completion |
| Practical exam | Simulation challenge | Real-world scenario with score |
| Peer review | Guild review quest | Team-based evaluation |
| Self-assessment | Skill tree self-mapping | Visual skill progression |
| Final exam | Final Boss + Portfolio defense | Combined assessment |

**Failure Design (critical for learning):**
- Failure = XP loss, not game over (can retry)
- Show what was wrong and why (instructional feedback)
- "Continue?" mechanic (encourages persistence)
- Track improvement across attempts
- Celebrate improvement, not just perfection

### Step 6: Emotional Design for Learning
**Agent:** emotion-designer

Mapear emoções para fases do aprendizado:

| Learning Phase | Desired Emotion | Mechanic | Lazzaro Key |
|---------------|----------------|----------|-------------|
| Introduction | Curiosity, excitement | Mystery reveal, story hook | Easy Fun |
| Acquisition | Focus, confidence | Guided practice, small wins | Hard Fun |
| Practice | Determination, flow | Increasing challenge, streaks | Hard Fun |
| Struggle | Resilience (not frustration) | Hints, "nudge" system, peer help | Hard Fun |
| Mastery | Pride, accomplishment | Badges, certificates, teaching others | People Fun |
| Review | Satisfaction, nostalgia | Progress visualization, "journey" review | Serious Fun |

### Step 7: Adaptive Difficulty
**Agent:** learning-designer

```yaml
adaptive_difficulty:
  algorithm: "zone_of_proximal_development"
  parameters:
    mastery_threshold: 0.80  # 80% correct = mastered
    frustration_threshold: 0.40  # below 40% = too hard
    flow_zone: [0.50, 0.80]  # sweet spot
  actions:
    above_mastery:
      - "Increase difficulty"
      - "Introduce new concepts"
      - "Offer teaching opportunities"
    in_flow_zone:
      - "Maintain current difficulty"
      - "Add variety (same level, different format)"
    below_frustration:
      - "Reduce difficulty"
      - "Offer scaffolding/hints"
      - "Review prerequisite material"
      - "Pair with peer tutor"
```

## Post-Conditions

- [ ] Learning objectives mapped to Bloom's levels
- [ ] Game mechanics aligned per Bloom's level
- [ ] Spaced repetition system designed
- [ ] Narrative framework selected
- [ ] Assessment gamification specified
- [ ] Adaptive difficulty parameters defined
- [ ] Emotional journey mapped

## Quality Gate

- [ ] Every learning objective has a corresponding mechanic
- [ ] Failure is safe and instructive (no permanent punishment)
- [ ] Social mechanics are optional (no forced collaboration)
- [ ] Adaptive difficulty prevents both boredom and frustration
- [ ] Mechanics serve learning, not the other way around

## Next Tasks

- `emotion-mapping` — Deep emotional design for learning
- `progression-design` — Skill trees and mastery paths
- `ab-test-gamification` — Test learning mechanics effectiveness
