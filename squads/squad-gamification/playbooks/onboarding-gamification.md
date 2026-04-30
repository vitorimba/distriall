# Playbook: Onboarding Gamification

> **ID:** PB-GM-003
> **Objective:** Transform first-time user experience into an engaging, habit-forming journey
> **Duration:** 3-4 weeks from design to A/B tested deployment
> **Lead Agent:** behavior-architect
> **Support:** experience-designer, emotion-designer, engagement-engineer, player-profiler
> **Frameworks:** Hooked (Nir Eyal), B=MAP (BJ Fogg), Octalysis (Yu-kai Chou), Game Thinking (Amy Jo Kim), 4 Keys to Fun (Lazzaro), Peak-End Rule (Kahneman)
> **Version:** 2.0

---

## When to Use This Playbook

- Sign-up to first-action conversion below 50%
- D1 retention below 30%
- Users complete sign-up but never return within 48 hours
- Time to first value exceeds 5 minutes
- Onboarding completion rate below 40%
- Users describe first experience as "confusing", "boring", or "overwhelming"
- High acquisition spend with low activation rates (CAC increasing without LTV improvement)
- App store reviews mention "didn't understand what to do" or "too complicated"
- Heat maps show users abandoning during tutorial/setup steps

## Veto Conditions — When NOT to Use This Playbook

| Condition | Reason | Alternative |
|-----------|--------|-------------|
| Product has no clear "aha moment" | You can't gamify the path to value if value doesn't exist | Define the aha moment first with product team |
| Sign-up flow has critical technical bugs (crashes, errors) | Gamification on broken infrastructure amplifies frustration | Fix stability first |
| User acquisition is below 100 new users/week | Sample too small to measure onboarding changes | Focus on acquisition, apply this playbook when volume exists |
| Product is a single-use tool (tax filing, visa application) | Habit formation is irrelevant for single-use products | Optimize for completion and satisfaction, not retention |
| Target users are experts who resent being "tutorialized" | Gamified onboarding can feel patronizing to expert audiences | Offer "expert mode" skip, focus on advanced feature discovery |
| Onboarding involves sensitive content (medical, legal, financial) | Celebration animations during serious content feel inappropriate | Use subtle progress indicators, avoid gamification aesthetics |

**Decision Tree for Veto:**
```
Does the product have a clear "aha moment" that can be reached in < 5 minutes?
├─ NO → VETO. Define the aha moment first. Gamification cannot create value.
└─ YES → Is the product a multi-use product (users should return)?
    ├─ NO (single-use) → Use completion optimization, not habit formation.
    └─ YES → Is new user volume > 100/week?
        ├─ NO → Apply playbook without A/B testing (not enough sample).
        └─ YES → PROCEED with full playbook.
```

---

## Agent Routing

| Phase | Lead Agent | Supporting Agents | Deliverables |
|-------|-----------|-------------------|-------------|
| Phase 1: Friction Audit | behavior-architect | experience-designer | Friction audit report, step-by-step map, elimination plan |
| Phase 2: First 5 Minutes | emotion-designer | experience-designer, behavior-architect | Minute-by-minute script, celebration moments, UX spec |
| Phase 3: Day 1-7 Loop | engagement-engineer | behavior-architect, emotion-designer | Retention loop spec, notification schedule, streak integration |
| Phase 4: Scaffolding | experience-designer | behavior-architect | Transition plan, progressive disclosure timeline |
| Phase 5: Measure | motivation-analyst | engagement-engineer | A/B test results, funnel metrics, optimization report |
| Psychology Review | gamification-chief | motivation-analyst, player-profiler | Ethical review, dark pattern audit |

---

## The Science of First Impressions

Understanding these psychological principles is mandatory before designing any onboarding element. The behavior-architect ensures every design decision maps to at least one of these principles.

**Peak-End Rule (Kahneman):** Users judge an experience by its peak moment and its ending, not the average. Design a peak early (first achievement celebration at ~60 seconds) and a strong finish (session summary with "come back tomorrow for..."). A mediocre 5-minute onboarding with one spectacular moment is remembered more favorably than a consistently "good" 5-minute onboarding.

**Zeigarnik Effect:** Incomplete tasks create mental tension that motivates completion. Start a progress bar early and let it sit at 20-30% (not 0%). Users who see an incomplete progress bar feel compelled to complete it. This is why Duolingo shows "You're 20% to your first achievement" before the user does anything.

**Endowed Progress Effect (Nunes & Dreze, 2006 car wash study):** Users who receive a head start are 79% more likely to complete a goal than those starting from zero, even when the total effort required is identical. Pre-fill progress to 20% by counting sign-up as progress.

**Self-Efficacy Theory (Bandura):** Users who experience early success develop confidence ("I can do this"), which increases persistence. Design the first 3 interactions to be impossible to fail. Gradually increase difficulty after confidence is established.

**Curiosity Gap (Loewenstein):** The gap between what you know and what you want to know creates a strong motivational pull. Show blurred previews of locked content, tease features they'll unlock, and hint at rewards without fully revealing them.

**Variable Ratio Reinforcement (Skinner):** Rewards delivered on an unpredictable schedule are more motivating than predictable rewards. Even in onboarding, add small variable elements: randomize celebration animations, vary XP amounts slightly, occasionally award bonus items.

**Case Study — Duolingo Onboarding:** Duolingo's onboarding is considered best-in-class in gamified onboarding. Key elements: (1) Users choose their language and daily goal before creating an account (investment before commitment). (2) First lesson starts immediately — no tutorial, no tour, just DO the thing. (3) First lesson is impossible to fail (generous hints, infinite retries). (4) First lesson ends with celebratory animation and XP. (5) Sign-up is prompted AFTER the first win, not before. (6) Progress bar starts at ~25% after first lesson. Result: >60% of users who start a lesson complete onboarding.

---

## Phase 1: Friction Audit (Day 1-2)

### Step 1: Current State Mapping

The behavior-architect maps every step from install/visit to first meaningful action. Use session recording tools (Hotjar, FullStory, Logrocket) to observe real user behavior, not assumed behavior.

| Step | Action Required | Time (seconds) | Decisions | Friction Score (1-5) | Can Eliminate? | Can Defer? |
|------|----------------|----------------|-----------|---------------------|---------------|-----------|
| 1 | Download/Open app | 3 | 0 | 1 | No | No |
| 2 | Splash/loading screen | ? | 0 | ? | Reduce to <2s | No |
| 3 | Sign-up/registration | ? | ? | ? | Defer? | YES (ghost account) |
| 4 | Email verification | ? | 1 | ? | Defer? | YES |
| 5 | Profile creation | ? | ? | ? | Partial defer | YES |
| 6 | Tutorial/walkthrough | ? | ? | ? | Replace with guided action | Simplify |
| 7 | Permission requests | ? | ? | ? | Defer to contextual | YES |
| 8 | First meaningful action | ? | ? | ? | This is the goal | No |

**Scoring Guide:**
- **1 (No friction):** Automatic, no user effort required
- **2 (Minor):** Simple single action, clear CTA, < 5 seconds
- **3 (Moderate):** Requires a decision, some cognitive load, 5-15 seconds
- **4 (Significant):** Multiple decisions, complex input, 15-60 seconds
- **5 (Severe):** Confusing, error-prone, >60 seconds, or causes drop-off spike

**Targets:**
- Total time to value: < 60 seconds
- Total decisions required before first value: < 3
- Average friction score: < 2.0
- Zero steps with friction score 5

### Step 2: Friction Elimination

For each step scoring 3 or above, apply this decision tree:

```
Can this step be ELIMINATED entirely?
├─ YES → Remove it. Nothing beats zero friction.
│   Example: Remove email verification. Use it later or replace with phone.
└─ NO → Can it be DEFERRED to after the first value moment?
    ├─ YES → Move it. Let users experience value before committing.
    │   Example: Defer profile photo, bio, preferences to later sessions.
    └─ NO → Can it be SIMPLIFIED?
        ├─ YES → Reduce choices, add smart defaults, pre-fill fields.
        │   Example: 3 options instead of 10. Detect location instead of asking.
        └─ NO → Can it be GAMIFIED (made enjoyable)?
            ├─ YES → Add progress, celebration, or narrative context.
            │   Example: "Choose your avatar!" instead of "Upload profile photo"
            └─ NO → This step MUST justify its existence with data.
                Document WHY it must remain and the cost of removing it.
```

**Rule:** Every friction point that remains in the pre-value flow must have documented justification. "We've always done it this way" is not justification.

**Case Study — Canva:** Canva reduced their sign-up-to-first-design time from 4 minutes to 23 seconds by: (1) Moving sign-up AFTER first design (ghost account). (2) Replacing "What do you want to create?" with a single pre-selected template. (3) Removing tutorial — instead, contextual tooltips appear only when needed. Result: Activation rate increased from 40% to 72%.

### Step 3: Competitive Benchmark

Before redesigning, audit 3 competitors' onboarding flows:

| Competitor | Time to Value | Steps Before Value | Friction Score | Best Element | Worst Element |
|-----------|--------------|-------------------|---------------|-------------|--------------|
| Competitor A | | | | | |
| Competitor B | | | | | |
| Competitor C | | | | | |

Steal the best elements. Avoid their mistakes. Your target is to be the fastest to value in your category.

---

## Phase 2: First 5 Minutes Design (Day 2-4)

The emotion-designer leads this phase, scripting the emotional arc of the first experience. Every screen, every second is intentional.

### Emotional Arc Design

The first 5 minutes should follow this emotional curve:
```
Emotion Level
    ▲
    │     ★ PEAK (First Achievement)
    │    / \
    │   /   \    ★ SECOND PEAK (Preview/Aspiration)
    │  /     \  / \
    │ /       \/   \  ★ CLOSING HIGH (Goal Set)
    │/              \/
    ├─── Curiosity → Competence → Aspiration → Purpose ──►
    │  0:00    1:00    2:00    3:00    4:00    5:00
    Time
```

### Minute 0-1: The Hook

**Goal:** Spark curiosity + first micro-action. Motivation is at maximum (they just installed).

```yaml
minute_0_to_1:
  screen_1_splash:
    duration: "2-3 seconds max"
    content: "Engaging visual + one-line value proposition (not mission statement)"
    emotion: "Anticipation, curiosity"
    action_required: "None (passive)"
    design_rules:
      - "No loading spinner — use animated logo or skeleton screens"
      - "Value proposition uses outcome language: 'Create X' not 'Welcome to Y'"
      - "If load time > 3s, add progress indicator with tip"

  screen_2_personalization:
    duration: "10-15 seconds"
    content: "Choose ONE preference (max 3 options, large visual tiles)"
    emotion: "Autonomy, identity expression"
    action_required: "Single tap on preferred option"
    gamification:
      - "Profile starts at 20% complete (endowed progress)"
      - "Choice immediately affects what they see next (real personalization)"
    design_rules:
      - "Options must be visually distinct (images, not text-only)"
      - "No 'wrong' answer — every option leads to good experience"
      - "Include 'Surprise me' option for users who hate choosing"
    psychology: "Endowed Progress + Autonomy (SDT)"

  screen_3_first_action:
    duration: "15-20 seconds"
    content: "Complete one micro-task (guided, impossible to fail)"
    emotion: "Competence, delight"
    action_required: "Guided interaction with highlighted UI elements"
    gamification:
      - "First XP earned: +10 XP with number animation"
      - "Celebration: confetti particles + subtle sound + haptic feedback"
      - "'Welcome, [Name]! Your journey begins.'"
    design_rules:
      - "Use progressive disclosure — show only the 1 element they need to interact with"
      - "Dim everything else (spotlight effect)"
      - "If they hesitate > 5 seconds, show hint arrow"
      - "Task MUST succeed — auto-correct errors, accept any input"
    psychology: "Self-Efficacy (Bandura) + Peak-End Rule (create peak)"
```

**Decision Tree — Sign-Up Timing:**
```
Is the core value demonstrable without an account?
├─ YES → Defer sign-up until AFTER first value moment (ghost account pattern).
│   Show value → Celebrate → "Save your progress — create an account"
│   Case studies: Canva, Duolingo, Notion
└─ NO (requires account, e.g., social app, team tool) →
    Is social login available (Google, Apple, SSO)?
    ├─ YES → One-tap sign-up, no forms. Go straight to value.
    └─ NO → Minimize form to email + password only. Everything else deferred.
```

### Minute 1-2: The Win

**Goal:** First real achievement + competence boost. This is the PEAK moment.

```yaml
minute_1_to_2:
  action: "Complete second task (slightly more complex than first, but still guided)"
  guidance: "Highlighted UI with contextual tooltip — not a separate tutorial overlay"
  reward:
    badge: "'Quick Starter' — your first badge"
    xp: "+25 XP (bonus for completing within first 2 minutes)"
    feedback: "Full badge animation (1.5s) + 'You're a natural!' message"
  progress: "Profile now 40% complete — visible progress bar moves"
  emotion: "Pride, accomplishment, growing confidence"
  design_rules:
    - "Badge animation must feel premium — not cheap clip art"
    - "Sound design matters: satisfying 'ding' or 'level up' tone"
    - "Show badge in context: 'Quick Starter — earned by 60% of new users' (social proof)"
    - "If task takes > 60 seconds, break into 2 smaller steps with mini-celebrations between"
  psychology: "Self-Efficacy confirmation + CD2 Accomplishment (Octalysis)"
```

### Minute 2-3: The Preview

**Goal:** Show what's possible + create curiosity gap (Loewenstein). Transition from doing to aspiring.

```yaml
minute_2_to_3:
  action: "Brief showcase of advanced capabilities (passive viewing, 15-20 seconds)"
  content:
    - "'In 7 days, you'll be able to [impressive outcome]' with visual preview"
    - "Show a power user's result: 'Sarah created this after 2 weeks'"
    - "Quick scroll through 3-5 locked features with blurred previews"
  reward: "Unlock preview of customization options (see them, can't use yet)"
  curiosity_hooks:
    - "Blurred content labeled 'Unlocks at Level 3'"
    - "Counter: '3 features waiting to be discovered'"
    - "Teaser animation of an advanced feature"
  emotion: "Curiosity, aspiration, excitement about the future"
  design_rules:
    - "This is NOT a feature tour — it's aspiration building"
    - "Show outcomes, not feature lists"
    - "Maximum 20 seconds — don't bore them with features they can't use"
    - "End with clear CTA back to action: 'Ready for your next challenge?'"
  psychology: "Curiosity Gap + CD6 Scarcity (Octalysis) + Amy Jo Kim's 'Player Journey' aspiration phase"
```

### Minute 3-4: The Social Proof

**Goal:** Create belonging + social validation. Reduce the "am I doing this right?" anxiety.

```yaml
minute_3_to_4:
  action: "Optional social connection or social proof display"
  content_options:
    option_a_friends:
      condition: "User has contacts using the app"
      display: "'Your friend [Name] is here! They're Level 12.'"
      action: "Connect with 1 tap"
      reward: "'Connected' badge + 10 XP"
    option_b_community:
      condition: "No friends found"
      display: "'Join 50,000 people who [value statement]'"
      action: "Browse community highlights (passive, 10 seconds)"
      reward: "Social proof reduces uncertainty"
    option_c_skip:
      condition: "User prefers solo"
      display: "'Skip for now' clearly visible, no penalty"
      action: "None"
      reward: "Respecting autonomy IS the reward"
  emotion: "Belonging (if connected) or autonomy (if skipped)"
  design_rules:
    - "NEVER make social connection mandatory"
    - "NEVER import contacts without explicit permission"
    - "Show real numbers, not fake social proof"
    - "If showing friends, show their achievements (aspirational)"
  psychology: "CD5 Social Influence (Octalysis) + Relatedness (SDT)"
```

### Minute 4-5: The Contract

**Goal:** Set expectations + create first investment (Hooked Model). The user commits to something, making the next session more likely.

```yaml
minute_4_to_5:
  action: "Set one personal goal OR accept a daily challenge"
  content:
    prompt: "'What would you like to achieve this week?'"
    options: 3  # max, with clear outcome descriptions
    examples:
      - "'Learn the basics' (recommended for beginners)"
      - "'Complete 5 challenges' (for ambitious users)"
      - "'Explore everything' (for curious explorers)"
  reward:
    immediate: "'Great choice! We'll help you get there.' + goal tracker appears"
    future: "Tomorrow's first notification references their chosen goal"
  investment:
    - "User has now personalized their experience (switching cost created)"
    - "Goal is stored and referenced in future sessions (continuity)"
    - "Progress toward goal starts at 10% (Endowed Progress, again)"
  emotion: "Purpose, commitment, anticipation for tomorrow"
  closing:
    - "Session summary: 'In 5 minutes, you earned X XP, 1 badge, and set your first goal'"
    - "Clear next step: 'Come back tomorrow for your Day 2 challenge'"
    - "Optional: set notification time (let THEM choose when)"
  psychology: "Investment phase (Hooked) + Commitment/Consistency (Cialdini) + CD1 Epic Meaning (Octalysis)"
```

**Case Study — Headspace Onboarding:** Headspace's onboarding is a masterclass in minute-by-minute emotional design. (1) Minute 0-1: Calming animation, one question ("What brings you here?"). (2) Minute 1-3: First guided meditation (the core value, immediately). (3) Minute 3-4: "How do you feel?" survey (investment). (4) Minute 4-5: "Set your meditation goal" (contract). The entire flow takes exactly 5 minutes and ends with users having experienced the product, set a goal, and scheduled their next session. D1 retention: 50%+ for users who complete onboarding.

---

## Phase 3: Day 1-7 Retention Loop (Day 4-7)

The engagement-engineer designs the day-by-day retention sequence. Each day builds on the previous, creating escalating commitment.

### Day-by-Day Retention Script

**Day 1 (4 hours after first session):**
```yaml
day_1:
  trigger:
    type: "Push notification"
    timing: "4 hours after first session ended"
    fallback: "If push disabled, in-app banner on next open"
  content:
    message: "Your [goal from minute 5] is waiting. Quick 2-minute check-in?"
    personalization: "Reference their chosen goal and first badge"
  on_return:
    reward: "Day 1 streak started! 🔥1 + 15 XP"
    action: "One quick task (< 2 minutes, easy, related to their goal)"
    celebration: "Streak flame appears on home screen"
  if_no_return:
    action: "No follow-up today. Wait for Day 2."
    note: "Never send 2 notifications on Day 1. Desperation kills trust."
```

**Day 2:**
```yaml
day_2:
  trigger:
    type: "Push notification"
    timing: "Same time as Day 1 session (consistency builds habit)"
  content:
    message: "Streak day 2! Complete one [action] to keep it going"
    personalization: "Reference yesterday's activity: 'Yesterday you [did X]'"
  on_return:
    reward: "🔥2 streak + 20 XP + 'Building momentum!'"
    action: "Slightly harder task + introduce one new feature"
    new_feature: "Contextual reveal: 'By the way, did you know you can also [feature]?'"
  if_no_return:
    wait: "6 hours after expected time"
    message: "Your 2-day streak is at risk! Quick 1-minute action to save it."
    tone: "Encouraging, not guilt-tripping"
```

**Day 3 — First Meaningful Milestone:**
```yaml
day_3:
  trigger:
    type: "Push notification"
    timing: "Same time"
  content:
    message: "3 days in a row! You've earned something special"
    personalization: "Preview the Day 3 reward (create anticipation)"
  on_return:
    reward: "Meaningful unlock: new feature, cosmetic, or content piece"
    badge: "'3-Day Warrior' badge"
    celebration: "Enhanced animation (bigger than Day 1-2)"
    social_prompt: "Share your streak? (optional, pre-made shareable image)"
  if_no_return:
    message: "We saved your reward from yesterday! Come claim it."
    scarcity: "Reward available for 24 hours only"
```

**Day 4 — Quiet Day:**
```yaml
day_4:
  trigger:
    type: "In-app only (no push notification)"
    rationale: "Give them a break from push. Overnotification is Day 4-7 churn cause #1."
  on_return:
    reward: "🔥4 + 25 XP + 'Consistent!' message"
    action: "Introduce social element (see other users, join group)"
  if_no_return:
    action: "Nothing. No notification. Trust the streak mechanic."
```

**Day 5:**
```yaml
day_5:
  trigger:
    type: "Push notification"
    timing: "Same time"
  content:
    message: "5 days! You're in the top 20% of new users"
    personalization: "Show progress toward their week 1 goal"
  on_return:
    reward: "Status badge + preview of Day 7 reward (create anticipation)"
    progress: "Profile now 70% complete"
    investment: "Prompt to customize: 'Make this space yours — choose [option]'"
  if_no_return:
    message: "5-day streak at risk! You're so close to the exclusive Day 7 reward."
```

**Day 6 — Quiet Day:**
```yaml
day_6:
  trigger:
    type: "In-app only"
    rationale: "Build anticipation for Day 7 without annoying"
  on_return:
    reward: "🔥6 + 30 XP + 'Tomorrow is the big day!'"
    teaser: "Show locked Day 7 reward with countdown: '1 day to go'"
```

**Day 7 — The Graduation:**
```yaml
day_7:
  trigger:
    type: "Push notification"
    timing: "Same time"
  content:
    message: "ONE WEEK! 🎉 Your exclusive reward is ready."
  on_return:
    reward: "Week 1 completion badge (Gold tier) + significant feature unlock"
    celebration: "Full celebration: unique animation, sound, confetti, achievement card"
    summary: "'Your first week: [total XP earned], [badges earned], [actions completed]'"
    shareable: "Auto-generated 'My First Week' infographic"
    transition: "Exit scaffolded onboarding → enter core experience"
    message: "'You've graduated! The full experience awaits. Here's what's next...'"
  if_no_return:
    message: "Your 7-day reward expires in 24 hours. One action to claim it!"
    last_chance: true
```

**Notification Frequency Strategy:**
| Day | Push Notification | In-App | Rationale |
|-----|------------------|--------|-----------|
| 1 | 1 (4h after first session) | Yes | Strike while iron is hot |
| 2 | 1 (same time as Day 1) | Yes | Build consistency |
| 3 | 1 (same time) | Yes | Reward milestone |
| 4 | 0 | Yes | Rest day, prevent fatigue |
| 5 | 1 (same time) | Yes | Social proof + Day 7 teaser |
| 6 | 0 | Yes | Build anticipation |
| 7 | 1 (same time) | Yes | Graduation celebration |
| **Total** | **5 push in 7 days** | **7 in-app** | **< 1/day average push** |

**Case Study — Calm App:** Calm uses a "Daily Calm" streak that sends exactly 1 notification per day at the user's chosen time. They found that users who maintained a 7-day streak in their first week had 4.2x higher D30 retention than those who didn't. The Day 7 celebration is a "7-Day Badge" that is visible on the user's profile and shareable. Calm credits their streak mechanic for contributing to 40%+ D7 retention.

---

## Phase 4: Scaffolding Transition (Day 8-30)

The experience-designer designs the gradual removal of onboarding support. Too abrupt = confusion and churn. Too slow = patronizing and boring.

### Progressive Disclosure Framework

```yaml
scaffolding_transition:
  week_1:  # GUIDED MODE
    guidance_level: "Step-by-step prompts for every new action"
    choice_complexity: "2-3 options maximum per decision"
    feedback_intensity: "Immediate, detailed, encouraging after every action"
    failure_handling: "Cannot fail — auto-correct, generous hints, retry without penalty"
    new_features_per_session: 0-1
    gamification: "High celebration intensity, frequent rewards, small XP amounts"

  week_2:  # SUPPORTED MODE
    guidance_level: "Hint icons available but not automatic (user must tap)"
    choice_complexity: "3-5 options per decision"
    feedback_intensity: "Immediate but less hand-holding ('Great job!' not 'Click here next')"
    failure_handling: "Can fail, but recovery is easy and encouraged"
    new_features_per_session: 1-2
    gamification: "Moderate celebrations, standard XP amounts, daily challenges introduced"

  week_3:  # AUTONOMOUS MODE
    guidance_level: "Help section available on demand only"
    choice_complexity: "Full feature set accessible"
    feedback_intensity: "Standard feedback loops (notifications for achievements, not for basic actions)"
    failure_handling: "Normal difficulty, failure is learning"
    new_features_per_session: "User-directed exploration"
    gamification: "Mature system — streaks, challenges, social, progression"

  week_4:  # MASTERY MODE
    guidance_level: "Tips for advanced features only"
    choice_complexity: "Full autonomy"
    feedback_intensity: "Milestone-based (not every-action-based)"
    failure_handling: "Expected and part of growth"
    new_features_per_session: "Self-driven discovery with 'Did you know?' prompts"
    gamification: "Full engagement system from PB-GM-001"
```

**Decision Tree — When to Advance a User's Scaffolding Level:**
```
Has the user completed all week N core tasks?
├─ YES → Has the user returned for 5+ of 7 days?
│   ├─ YES → Advance to week N+1 guidance level.
│   └─ NO (returned 3-4 days) → Keep current level but introduce 1 element from next level.
└─ NO → Keep current level. Add encouraging prompt about remaining tasks.
    Has the user been inactive for 3+ days?
    ├─ YES → Reset to beginning of current level (not week 1). Send re-engagement notification.
    └─ NO → Continue at current level with daily nudges.
```

### Feature Discovery Prompts (Week 2-4)

Don't dump all features on users. Reveal them strategically:

```yaml
feature_discovery:
  method: "Contextual reveal — introduce a feature when the user's behavior suggests they'd benefit"
  examples:
    - trigger: "User creates 3rd project"
      reveal: "'Pro tip: Organize projects into folders! Try it →'"
      reward: "'Organizer' badge progress (1/3)"
    - trigger: "User shares content for first time"
      reveal: "'Share with friends and earn Social XP!'"
      reward: "10 XP + 'Social Butterfly' badge progress"
    - trigger: "User completes 5 daily challenges"
      reveal: "'You're ready for Weekly Quests — bigger challenges, bigger rewards'"
      reward: "Access to weekly quest system"
  frequency: "Maximum 1 feature reveal per session"
  format: "Non-blocking tooltip or bottom sheet (never modal popup)"
```

---

## Phase 5: Measure & Iterate (Week 3-4)

The motivation-analyst leads measurement. Every design decision from Phases 1-4 must be validated with data.

### A/B Tests for Onboarding

| Test | Control | Treatment | Primary Metric | Secondary Metric | Duration | Min Sample |
|------|---------|-----------|---------------|-----------------|----------|-----------|
| Endowed progress | 0% start | 20% start | Onboarding completion | D1 retention | 1 week | 500/group |
| Celebration intensity | Text-only "Good job!" | Animation + sound + confetti | D1 retention | Session rating | 1 week | 500/group |
| Personalization | No choice in minute 1 | 1 choice (3 options) | D7 retention | Feature engagement | 2 weeks | 500/group |
| Streak messaging | Generic "Day 2!" | Personalized "You [did X] yesterday, Day 2!" | D7 streak rate | Push open rate | 2 weeks | 1000/group |
| Social proof | None | "X people active now" + "Y completed this" | Signup → first action | D3 retention | 1 week | 500/group |
| Sign-up timing | Pre-value sign-up | Post-value sign-up (ghost account) | Signup → first action | D7 retention | 2 weeks | 1000/group |
| Tutorial style | Step-by-step overlay | Interactive guided action | Onboarding completion | Time to value | 1 week | 500/group |
| Notification timing | Standard time (10am) | User's first session time | Push open rate | D7 retention | 2 weeks | 1000/group |

**Testing Protocol:**
1. Run only 1-2 tests simultaneously to avoid interaction effects.
2. Require p < 0.05 for statistical significance.
3. Monitor guardrails during every test: uninstall rate, support tickets, app rating.
4. If a variant wins, ship it to 100% before starting the next test.
5. Document every test result (including failures) in a test log for institutional knowledge.

### Metrics & KPIs Dashboard

```yaml
onboarding_metrics:
  funnel:
    install_to_open: "%"              # TARGET: >90% (platform-dependent)
    open_to_first_action: "%"          # TARGET: >70%
    first_action_to_first_badge: "%"   # TARGET: >60%
    first_badge_to_second_session: "%"  # TARGET: >50%
    second_session_to_day_3: "%"       # TARGET: >40%
    day_3_to_day_7: "%"               # TARGET: >60%

  time:
    time_to_first_value: "seconds"     # TARGET: <60
    time_to_first_achievement: "seconds"  # TARGET: <120
    time_to_profile_complete: "minutes"   # TARGET: <5 (across multiple sessions)
    onboarding_completion_time: "minutes"  # TARGET: <5 (first session)

  quality:
    d1_retention: "%"                  # TARGET: >35%
    d3_retention: "%"                  # TARGET: >25%
    d7_retention: "%"                  # TARGET: >20%
    d14_retention: "%"                 # TARGET: >15%
    streak_start_rate: "%"             # TARGET: >50%
    day_7_streak_survival: "%"         # TARGET: >30%

  satisfaction:
    onboarding_nps: "score"            # TARGET: >40
    first_session_rating: "1-5"        # TARGET: >4.0
    "confusing" mentions_in_reviews: "#"  # TARGET: decreasing
    support_tickets_from_new_users: "#"   # TARGET: decreasing

  benchmarks:
    industry_d1_retention:
      gaming: "35-40%"
      social: "25-30%"
      productivity: "20-25%"
      ecommerce: "15-20%"
      health_fitness: "25-30%"
    industry_d7_retention:
      gaming: "15-20%"
      social: "12-18%"
      productivity: "10-15%"
      ecommerce: "8-12%"
      health_fitness: "12-18%"
```

### Optimization Cadence

- **Daily (during launch week):** Monitor funnel conversion at each step, check for unexpected drop-offs
- **Weekly:** Review retention cohorts, A/B test progress, support ticket themes
- **Bi-weekly:** Analyze session recordings of users who dropped off (what did they do last?)
- **Monthly:** Full onboarding health review: is D7 retention trending up or down?
- **Quarterly:** Redesign lowest-performing onboarding step based on accumulated data

---

## Timeline Summary

| Day/Week | Phase | Key Activities | Deliverables | Gate |
|----------|-------|---------------|-------------|------|
| Day 1-2 | Friction Audit | Map current flow, score friction, benchmark competitors | Friction audit report | All steps scored, top friction points identified |
| Day 2-4 | First 5 Minutes | Design minute-by-minute emotional arc, celebration moments | UX spec for first 5 minutes | Every minute scripted with emotion + gamification |
| Day 4-7 | Day 1-7 Loop | Design retention notifications, streak system, daily progression | Retention loop spec, notification schedule | All 7 days scripted with triggers and rewards |
| Week 2 | Scaffolding | Design progressive disclosure, feature discovery prompts | Transition plan (week 1→4) | Clear criteria for advancing users |
| Week 2-3 | Implementation | Build and deploy onboarding flow (Feature flag for A/B) | Working onboarding behind feature flag | Tested in staging, no critical bugs |
| Week 3-4 | Testing | Run A/B tests, collect metrics, optimize | A/B results, optimized flow | Primary metrics improved vs. control |

---

## Expected Outcomes

| Metric | Before | After (Conservative) | After (Optimistic) |
|--------|--------|---------------------|-------------------|
| Sign-up to first action | <50% | 65% | 80% |
| D1 retention | <30% | 40% | 55% |
| D3 retention | <20% | 30% | 40% |
| D7 retention | <15% | 25% | 35% |
| Time to first value | >5 min | <2 min | <1 min |
| Onboarding completion | <40% | 65% | 80% |
| Streak initiation (Day 1) | 0% | 40% | 60% |
| Day 7 streak survival | 0% | 20% | 35% |
| First session rating | <3.5 | 4.0 | 4.5 |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Users open app but don't take first action | First screen unclear, CTA buried, too many options | Simplify to single CTA, add spotlight animation, reduce choices to 1 |
| Users complete first action but don't reach minute 2 | Post-first-action experience is confusing or underwhelming | Add immediate celebration + clear "next step" arrow |
| Onboarding completion high but D1 retention low | Onboarding is good but there's no reason to return tomorrow | Strengthen Day 1 notification, add compelling Day 2 content/reward |
| Streak starts but breaks on Day 3-4 | Day 3-4 content not compelling enough, notification fatigue | Reduce Day 4 notifications (quiet day), make Day 3 reward more meaningful |
| Users skip social step entirely | Social features feel invasive or irrelevant during onboarding | Defer social to Day 3-5, make less prominent, show value first |
| Ghost account users don't convert to real accounts | Sign-up prompt comes too late or isn't compelling | Test sign-up at different moments, add "Save your progress" framing |
| Tutorial completion high but feature usage low | Tutorial teaches by showing, not doing | Replace passive tutorials with interactive guided tasks |
| Celebrations feel annoying to experienced users | One-size-fits-all celebration intensity | Add "reduced celebration" setting, auto-reduce after Day 7 |
| Push notification opt-out rate high during onboarding | Asking for permission too early or too aggressively | Ask contextually ("Get reminded of your streak?" not "Enable notifications") |
| Users report "too much gamification" | Over-designed, too many popups, feels like a game not a tool | Audit: reduce celebrations, make gamification layer optional/subtle |
| A/B tests inconclusive | Sample too small or test duration too short | Increase sample (reduce number of simultaneous tests), extend duration |

---

## Output Examples

### First 5 Minutes UX Script (Abbreviated)
```
[0:00] App opens → Logo animation (2s) → "Create beautiful [things] in minutes"
[0:03] "What are you most interested in?" → 3 visual tiles → User taps one
[0:15] Profile bar appears: ████░░░░░░ 20% → "Let's try your first [action]"
[0:20] Spotlight on main CTA → User taps → Guided interaction begins
[0:40] First action complete → 🎉 CONFETTI + "+10 XP!" → "Welcome! You're a natural"
[1:00] "Nice start! Now try this..." → Second guided task
[1:30] Second task complete → 🏆 BADGE: "Quick Starter" → Badge animation (1.5s)
[2:00] "In one week, you'll be able to..." → Preview scroll (15s)
[2:30] "50,000 people are creating with you" → Social proof
[3:00] "What's your goal this week?" → 3 options → User selects
[3:30] Goal set → "We'll help you get there" → Progress tracker appears
[4:00] Session summary → "Come back tomorrow for Day 2!" → Notification opt-in
[4:30] App stays open on home screen → User explores freely or exits
```

### Friction Audit Report Template
```markdown
# Friction Audit — [App Name] — [Date]

## Summary
- Current time to first value: 4 min 32 sec
- Steps before first value: 8
- Average friction score: 3.2 (target: <2.0)
- Biggest friction point: Email verification (step 4, score 5)

## Step-by-Step Analysis
| # | Step | Time | Friction | Recommendation |
|---|------|------|---------|---------------|
| 1 | App open | 3s | 1 | OK |
| 2 | Splash screen | 5s | 2 | Reduce to 2s |
| 3 | Sign-up form | 45s | 4 | Defer to post-value |
| 4 | Email verification | 120s | 5 | ELIMINATE — verify later |
| 5 | Profile setup | 60s | 4 | Defer all except 1 choice |
| 6 | Tutorial (5 screens) | 90s | 3 | Replace with guided action |
| 7 | Permission requests | 15s | 3 | Defer to contextual |
| 8 | First action | 30s | 2 | Good — preserve |

## Proposed Flow (4 steps, 45 seconds)
| # | Step | Time | Friction |
|---|------|------|---------|
| 1 | App open + splash | 3s | 1 |
| 2 | Choose 1 preference | 10s | 2 |
| 3 | Guided first action | 20s | 1 |
| 4 | Celebration + sign-up | 12s | 2 |

## Expected Impact
- Time to value: 4:32 → 0:33 (87% reduction)
- Steps: 8 → 4 (50% reduction)
- Projected activation lift: +30-50%
```

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It Fails | Alternative |
|-------------|-------------|-------------|
| **Forced tutorial** (no skip option) | Power users resent it, anxious users rush through it | Let users skip (they can always revisit). Track skip rate as metric. |
| **Information overload** (show 20 things at once) | Cognitive overload kills action | Show 1-2 things per screen. Reveal features over days, not minutes. |
| **Delayed gratification** (first reward after 5+ minutes) | Users leave before getting hooked | First reward within 60 seconds. No exceptions. |
| **Generic experience** (same onboarding for everyone) | Kills relevance and personal connection | Personalize based on at least 1 user choice in minute 1. |
| **Social pressure** (mandatory social during onboarding) | Privacy-conscious users bounce, introverts feel pushed | All social elements optional during onboarding. Introduce socially on Day 3-5. |
| **Dark onboarding** (trick users into enabling notifications) | Short-term gain, long-term trust destruction. App store review risk. | Ask contextually, explain value, accept "no" gracefully. |
| **Over-gamification** (every tap has confetti) | Becomes noise, feels childish, distracts from core value | Celebrate milestones, not micro-actions. Reduce intensity after week 1. |
| **Copying Duolingo exactly** (badges for everything) | Your product isn't Duolingo; your users aren't language learners | Extract principles (fast to value, impossible to fail, celebrate wins), adapt to YOUR context. |

---

## Final Checklist

Before marking this playbook complete, verify:

- [ ] Friction audit completed with scored step-by-step map
- [ ] Time to first value reduced to < 60 seconds
- [ ] Decisions before first value reduced to < 3
- [ ] Minute-by-minute emotional arc designed and scripted
- [ ] First achievement occurs within 120 seconds
- [ ] Endowed progress implemented (start at 20%, not 0%)
- [ ] Celebration moments feel premium (animation + sound + haptic)
- [ ] Day 1-7 retention loop designed with per-day scripts
- [ ] Push notification schedule respects daily limits (max 5 in 7 days)
- [ ] Streak system integrated with graceful break handling
- [ ] Scaffolding transition plan defined (week 1 → week 4 guidance levels)
- [ ] Feature discovery prompts are contextual, not intrusive
- [ ] A/B tests defined with primary metrics, sample sizes, and durations
- [ ] All social elements are opt-in during onboarding
- [ ] No dark patterns (notification tricks, hidden opt-outs, FOMO manipulation)
- [ ] Metrics dashboard configured with targets and benchmarks
