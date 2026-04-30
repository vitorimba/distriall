# Smoke Test Suite — Squad Gamification

> **Total Tests:** 45 (5 per agent)
> **Pass Criteria:** Agent responds with framework-accurate, persona-consistent output
> **Execution:** Manual — invoke agent and verify response quality

## gamification-chief (5 tests)

### ST-GC-001: Entry Point Routing
**Prompt:** "We have a mobile fitness app with 50K users and want to add gamification."
**Expected:** Agent initiates diagnostic task (T-GM-001), asks for current metrics, objectives, and user demographics. Does NOT jump directly to mechanics.
**Pass Criteria:** Starts with diagnostic questions, not mechanic suggestions.

### ST-GC-002: Anti-Pattern Detection
**Prompt:** "We added points for every button click and a global leaderboard. Engagement is dropping."
**Expected:** Identifies pointsification (AP-001) and leaderboard toxicity (AP-020). Recommends diagnostic audit.
**Pass Criteria:** Names specific anti-patterns with correct IDs.

### ST-GC-003: Workflow Selection
**Prompt:** "We're a company with 500 employees wanting to gamify our training program."
**Expected:** Recommends wf-enterprise-gamification or wf-learning-gamification. Justifies choice.
**Pass Criteria:** Selects appropriate workflow with rationale.

### ST-GC-004: Agent Delegation
**Prompt:** "We need to understand what motivates our users before designing mechanics."
**Expected:** Delegates to player-profiler for HEXAD profiling and motivation-analyst for Octalysis assessment.
**Pass Criteria:** Correctly identifies which agents should handle the request.

### ST-GC-005: Veto Enforcement
**Prompt:** "Let's add a feature where employees lose points if they don't log in every day, including weekends."
**Expected:** Triggers veto V-ENT-004 (No PTO Punishment) and V-MOT-005 (No Punishment-Primary). Blocks the request.
**Pass Criteria:** Cites specific veto conditions and blocks the design.

## motivation-analyst (5 tests)

### ST-MA-001: Octalysis Assessment
**Prompt:** "Analyze the gamification of Duolingo using Octalysis."
**Expected:** Scores all 8 Core Drives with evidence. Identifies White Hat dominance with Black Hat (streaks=CD8) balance.
**Pass Criteria:** All 8 CDs scored with real Duolingo features as evidence.

### ST-MA-002: Overjustification Detection
**Prompt:** "We added cash bonuses for employees who already loved mentoring new hires. Now mentoring quality dropped."
**Expected:** Identifies overjustification effect. Recommends informational rewards instead of controlling rewards.
**Pass Criteria:** Names overjustification, cites Deci & Ryan, recommends specific alternative.

### ST-MA-003: White Hat/Black Hat Balance
**Prompt:** "Our app uses countdown timers, expiring rewards, and loss of progress for missed days."
**Expected:** Diagnoses Black Hat dominance (CD6, CD7, CD8). Recommends adding White Hat mechanics.
**Pass Criteria:** Calculates imbalance, recommends specific White Hat additions.

### ST-MA-004: SDT Assessment
**Prompt:** "Employees say our training gamification feels controlling and they have no choice."
**Expected:** Identifies autonomy deficit (SDT). Recommends choice mechanisms, opt-out, self-set goals.
**Pass Criteria:** References SDT framework, identifies specific autonomy gaps.

### ST-MA-005: Core Drive Application
**Prompt:** "How do we activate CD1 (Epic Meaning) for a recycling app?"
**Expected:** Suggests narrative around environmental impact, community contribution, progress toward shared goals.
**Pass Criteria:** Provides concrete, contextual CD1 mechanics (not generic).

## behavior-architect (5 tests)

### ST-BA-001: B=MAP Analysis
**Prompt:** "Users know they should exercise but don't start. What's wrong?"
**Expected:** Applies B=MAP analysis. Likely diagnoses high motivation but low ability (too complex) or missing prompt.
**Pass Criteria:** Uses B=MAP formula, identifies which component is weakest.

### ST-BA-002: Tiny Habits Design
**Prompt:** "Design a tiny habit for users to write daily journal entries."
**Expected:** Creates anchor-behavior-celebration chain. E.g., "After I pour my morning coffee, I will write one sentence."
**Pass Criteria:** Follows Tiny Habits formula with specific anchor, tiny behavior, and celebration.

### ST-BA-003: Ability Chain Simplification
**Prompt:** "Our signup requires 12 fields, email verification, and a tutorial. Completion is 15%."
**Expected:** Identifies excessive friction. Recommends progressive profiling, social login, skip-tutorial option.
**Pass Criteria:** Addresses specific Fogg ability factors (time, mental effort, non-routine).

### ST-BA-004: Prompt Design
**Prompt:** "When should we send reminders for a meditation app?"
**Expected:** Recommends trigger during high-motivation windows (morning routine, stress moments). Distinguishes spark vs facilitator vs signal.
**Pass Criteria:** Uses Fogg prompt taxonomy, considers motivation waves.

### ST-BA-005: Motivation Wave Analysis
**Prompt:** "Users are very motivated in January but drop off by March."
**Expected:** Identifies motivation wave pattern. Recommends using high-motivation periods for hard behaviors and low-motivation periods for easy behaviors.
**Pass Criteria:** References motivation waves, provides seasonal engagement strategy.

## experience-designer (5 tests)

### ST-ED-001: Scaffolding Design
**Prompt:** "New users are overwhelmed by all the features. How do we introduce gamification gradually?"
**Expected:** Designs 3-level scaffolding (Guided → Supported → Independent) with specific mechanics per level.
**Pass Criteria:** Clear progressive complexity with defined transition triggers.

### ST-ED-002: Flow Channel
**Prompt:** "Users at level 15-20 are churning. Success rate is 35%."
**Expected:** Diagnoses anxiety zone (too hard). Recommends reducing difficulty to 60-70% success rate.
**Pass Criteria:** References Flow Theory, identifies zone, provides specific difficulty adjustment.

### ST-ED-003: Progression Design
**Prompt:** "Design XP curve for a language learning app with 30 levels."
**Expected:** Provides formula, sample curve, unlock pacing, and anti-stagnation mechanisms.
**Pass Criteria:** Mathematical XP formula with justified parameters.

### ST-ED-004: Endgame Design
**Prompt:** "Our most dedicated users hit max level and are leaving."
**Expected:** Recommends endgame strategy (prestige, mastery tracks, mentorship, content creation).
**Pass Criteria:** Provides 2+ endgame options with pros/cons.

### ST-ED-005: Leaderboard Design
**Prompt:** "Our global leaderboard has 10,000 users but only the top 50 care about it."
**Expected:** Identifies 90-9-1 problem. Recommends relative positioning, cohort-based, or multi-dimensional boards.
**Pass Criteria:** Names the problem, provides 2+ alternative leaderboard designs.

## engagement-engineer (5 tests)

### ST-EE-001: Hook Model Design
**Prompt:** "Design an engagement loop for a task management app."
**Expected:** Designs complete Trigger→Action→Variable Reward→Investment cycle with all 4 components.
**Pass Criteria:** All 4 Hook components present and connected (investment loads next trigger).

### ST-EE-002: Variable Reward Design
**Prompt:** "Our rewards are always the same 10 XP per task. Users are bored."
**Expected:** Introduces variable reward schedule with Tribe, Hunt, and Self rewards.
**Pass Criteria:** Uses Nir Eyal's 3 reward categories with specific examples.

### ST-EE-003: Habit Zone Assessment
**Prompt:** "Our app is used weekly for 20 minutes. Is it habit-forming?"
**Expected:** Assesses against Habit Zone (frequency × perceived utility). Weekly may be insufficient for habit.
**Pass Criteria:** References Habit Zone, assesses both axes, recommends frequency strategy.

### ST-EE-004: Trigger Transition
**Prompt:** "We send 5 push notifications a day and users are complaining."
**Expected:** Diagnoses notification fatigue. Recommends reducing to 1-2, transitioning to internal triggers.
**Pass Criteria:** Identifies fatigue, plans external→internal trigger transition.

### ST-EE-005: A/B Test Design
**Prompt:** "We want to test if streaks improve retention."
**Expected:** Designs proper A/B test with hypothesis, sample size, primary/guardrail metrics, and duration.
**Pass Criteria:** Statistically rigorous test plan with guardrail metrics.

## player-profiler (5 tests)

### ST-PP-001: HEXAD Profiling
**Prompt:** "Profile the users of a knowledge-sharing platform."
**Expected:** Maps to HEXAD types. Likely Philanthropist-heavy with Achiever and Socialiser segments.
**Pass Criteria:** All 6 types assessed with platform-specific behavioral signals.

### ST-PP-002: Persona Creation
**Prompt:** "Create a player persona for a 'Socialiser' type user of a fitness app."
**Expected:** Creates persona with name, demographics, goals, frustrations, mechanic affinity, and churn risk.
**Pass Criteria:** Complete persona following player persona template structure.

### ST-PP-003: Persona-Mechanic Alignment
**Prompt:** "Which mechanics work for Free Spirits?"
**Expected:** Recommends customization, exploration, Easter eggs, creative tools. Warns against rigid paths.
**Pass Criteria:** Correct mechanic recommendations aligned with Free Spirit motivation (autonomy).

### ST-PP-004: Segmentation Strategy
**Prompt:** "How do we determine each user's type without asking them?"
**Expected:** Recommends behavioral signal mapping with examples of observable behaviors per type.
**Pass Criteria:** Provides specific behavioral signals for at least 4 HEXAD types.

### ST-PP-005: Distribution Analysis
**Prompt:** "Our analytics show 80% of engagement comes from leaderboard-focused users."
**Expected:** Identifies Player-dominant distribution. Warns about alienating other types. Recommends diversifying mechanics.
**Pass Criteria:** Identifies risk of single-type dominance, recommends specific mechanics for underserved types.

## enterprise-strategist (5 tests)

### ST-ES-001: 6D Framework Application
**Prompt:** "We want to gamify our sales team's CRM usage."
**Expected:** Applies 6D Framework: Define objectives, Delineate behaviors, Describe players, Devise cycles, Don't forget ethics, Deploy.
**Pass Criteria:** All 6 steps addressed with enterprise-appropriate mechanics.

### ST-ES-002: ROI Projection
**Prompt:** "What ROI can we expect from gamifying employee training?"
**Expected:** Provides ROI framework with investment categories, expected returns, and industry benchmarks.
**Pass Criteria:** Quantitative framework with realistic ranges based on case studies.

### ST-ES-003: Legal/Ethics Review
**Prompt:** "We want to track employee computer usage and gamify productivity."
**Expected:** Flags surveillance concern (V-ENT-004). Recommends outcome-based tracking, not activity tracking.
**Pass Criteria:** Identifies legal/ethical risks, recommends compliant alternative.

### ST-ES-004: Pilot Design
**Prompt:** "How should we pilot gamification for our 2,000-person organization?"
**Expected:** Designs pilot (50-100 people, 4-6 weeks, control group, success criteria, go/no-go framework).
**Pass Criteria:** Complete pilot plan with measurable success criteria.

### ST-ES-005: Change Management
**Prompt:** "Employees are skeptical about gamification. They think it's childish."
**Expected:** Addresses resistance with change management plan: communication, champion network, opt-in approach.
**Pass Criteria:** Addresses resistance specifically, not generically. Includes concrete tactics.

## learning-designer (5 tests)

### ST-LD-001: Bloom's Mapping
**Prompt:** "Map game mechanics to Bloom's Taxonomy for a programming course."
**Expected:** Maps each Bloom level to appropriate mechanics (flashcards for Remember, simulations for Apply, etc.)
**Pass Criteria:** All 6 Bloom levels addressed with justified mechanic selections.

### ST-LD-002: Spaced Repetition Design
**Prompt:** "Students forget material after the exam. How do we gamify retention?"
**Expected:** Designs spaced repetition system with gamification overlay (memory strength meter, review XP).
**Pass Criteria:** SRS algorithm specified with gamification layer that encourages regular review.

### ST-LD-003: Failure Design
**Prompt:** "Students are afraid to answer quiz questions because wrong answers lose points."
**Expected:** Redesigns to safe failure: no permanent point loss, instructional feedback, retry encouraged.
**Pass Criteria:** References growth mindset, eliminates punishment, adds instructional feedback.

### ST-LD-004: Assessment Gamification
**Prompt:** "Our final exam is a 100-question multiple choice test. Students hate it."
**Expected:** Transforms to gamified assessment: boss battle format, progressive difficulty, partial credit, multiple attempts.
**Pass Criteria:** Maintains assessment validity while adding engagement mechanics.

### ST-LD-005: Learning Outcome Verification
**Prompt:** "Engagement is up 40% after gamification but test scores haven't changed."
**Expected:** Flags that engagement without learning is failure. Diagnoses potential overjustification or distraction.
**Pass Criteria:** Identifies the critical issue (engagement ≠ learning), recommends investigation.

## emotion-designer (5 tests)

### ST-EMD-001: 4 Keys Mapping
**Prompt:** "Map the emotional experience of a fitness challenge app."
**Expected:** Maps Hard Fun (challenge), Easy Fun (discovery), People Fun (teams), Serious Fun (health impact).
**Pass Criteria:** All 4 Keys addressed with specific app feature examples.

### ST-EMD-002: Emotional Safeguard
**Prompt:** "Users feel ashamed when they appear at the bottom of the leaderboard."
**Expected:** Identifies shame risk. Recommends private-by-default, relative positioning, positive framing.
**Pass Criteria:** Names specific safeguard mechanics for the shame risk.

### ST-EMD-003: Schell Lens Application
**Prompt:** "Apply the Lens of Emotion to our onboarding experience."
**Expected:** Applies Schell's Lens: what emotions do we want? What are users actually feeling? How to bridge the gap?
**Pass Criteria:** Structured lens analysis with gap identification and specific design recommendations.

### ST-EMD-004: Fiero Design
**Prompt:** "Design a moment of fiero (triumph) for completing a difficult certification."
**Expected:** Designs multi-sensory celebration: visual (confetti, badge), audio (triumphant sound), social (shareable achievement).
**Pass Criteria:** Multi-sensory design with specific UI/UX recommendations.

### ST-EMD-005: Emotional Journey
**Prompt:** "Map the emotional journey from new user to power user."
**Expected:** Maps curiosity → confidence → determination → flow → mastery → purpose across journey stages.
**Pass Criteria:** Complete emotional arc with target and risk emotions per stage.
