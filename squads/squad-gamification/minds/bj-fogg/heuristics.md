# Heuristics — BJ Fogg (B=MAP / Tiny Habits)

## Decision Framework

When diagnosing why a behavior is not happening, always check all three components of B=MAP in order: (1) Is there a Prompt? (2) Is the person Able? (3) Is there sufficient Motivation? Fix the simplest component first. Prompts are cheapest to fix; motivation is most expensive and least reliable.

---

## H1: Simplify Before You Motivate
- **Rule:** When a behavior is not happening, the instinct is to increase motivation. Resist this. Instead, make the behavior easier first. Simplification is more reliable, more scalable, and does not wear off like motivation does.
- **When to apply:** Whenever a design team proposes motivational campaigns (emails, inspirational content, rewards) as the first solution to low adoption.
- **Example:** Users are not completing their profile. Instead of sending reminder emails (motivation), reduce the profile from 12 fields to 3 (ability). Completion rate typically jumps 3-5x.
- **[SOURCE: BJ Fogg, Tiny Habits, Ch. 3]**

## H2: B=MAP — All Three Must Converge
- **Rule:** Behavior happens when Motivation, Ability, and Prompt converge at the same moment in time. If any one is missing or insufficient, the behavior will not occur. Diagnose which component is weakest before designing solutions.
- **When to apply:** As the first diagnostic step for any behavior that is not occurring at the desired frequency.
- **Example:** A user wants to meditate (Motivation exists), knows how (Ability exists), but has no cue in their daily routine (Prompt missing). Adding "After I sit down with my morning coffee" as an anchor prompt solves the issue without touching motivation or ability.
- **[SOURCE: BJ Fogg, Tiny Habits, Ch. 2; Behavior Model website]**

## H3: Start Ridiculously Small
- **Rule:** The Tiny Habits approach: make the target behavior so small it is almost impossible to fail. The initial behavior should take less than 30 seconds and require almost zero motivation. Success with tiny behaviors builds the identity and automaticity foundation for bigger behaviors.
- **When to apply:** When designing onboarding flows, habit-formation features, or any behavior where consistency matters more than intensity.
- **Example:** "Floss one tooth." "Do two push-ups." "Write one sentence." "Open the app" as the first daily goal. Once the tiny behavior is automatic, naturally grow it — but never start big.
- **[SOURCE: BJ Fogg, Tiny Habits, Ch. 4]**

## H4: Anchor to Existing Behavior
- **Rule:** New behaviors stick best when attached to existing routines. The anchor provides the prompt naturally, within an established behavioral context. The formula: "After I [existing behavior], I will [tiny new behavior]."
- **When to apply:** When designing habit-formation sequences or notification timing strategies.
- **Example:** "After I pour my morning coffee, I will open the learning app." "After I close my laptop for lunch, I will log one reflection." The existing behavior is the most reliable prompt because it already happens consistently.
- **[SOURCE: BJ Fogg, Tiny Habits, Ch. 5]**

## H5: Celebrate Immediately
- **Rule:** The moment immediately after completing a behavior is the critical window for habit formation. Immediate celebration (even a silent internal affirmation or a small physical gesture) wires the behavior to positive emotion. This is not about external rewards — it is about creating the internal feeling of success, which Fogg calls "Shine."
- **When to apply:** When designing feedback moments, post-action screens, or micro-interactions after task completion.
- **Example:** After a user completes a daily check-in, show a brief, warm confirmation with a subtle animation. The feeling of accomplishment — not the animation itself — is what creates the habit wiring. Avoid delayed rewards (end-of-week summaries do not create Shine).
- **[SOURCE: BJ Fogg, Tiny Habits, Ch. 6]**

## H6: Motivation Waves Are Predictable
- **Rule:** Motivation is not constant. It surges (New Year's, after an inspiring event, after a health scare) and crashes (mid-February, after a setback, during routine fatigue). Design hard behaviors for peak motivation windows. Design easy behaviors for low motivation periods. Never rely on sustained high motivation.
- **When to apply:** When planning feature releases, campaign timing, or behavior complexity across a user journey.
- **Example:** Launch a challenging 30-day program in January (motivation peak). In March, switch to "maintain your streak with just 1 minute per day" (motivation trough). The motivation wave is a natural force; design with it, not against it.
- **[SOURCE: BJ Fogg, Tiny Habits, Ch. 3; Stanford Behavior Design Lab]**

## H7: The Ability Chain Has Six Links
- **Rule:** Six factors determine ability: Time, Money, Physical Effort, Mental Effort, Social Deviance, and Non-Routine. The weakest link breaks the entire chain. Identify the single weakest factor and address that one first — fixing the strongest link adds nothing.
- **When to apply:** When a behavior seems "easy" but users still are not doing it. One hidden friction factor is usually the bottleneck.
- **Example:** A health survey takes 3 minutes (Time is fine), costs nothing (Money is fine), requires no physical effort, but asks sensitive questions about mental health in an open office (Social Deviance is the bottleneck). Making the survey private resolves the weakest link.
- **[SOURCE: BJ Fogg, Behavior Model, Ability factors]**

## H8: Three Types of Prompts Match Three States
- **Rule:** Sparks (motivate + prompt) for users who are able but unmotivated. Facilitators (enable + prompt) for users who are motivated but unable. Signals (pure reminder) for users who have both motivation and ability. Match the prompt type to the user's current state — a wrong prompt type is wasted or counterproductive.
- **When to apply:** When designing notification strategies, onboarding nudges, or in-app guidance systems.
- **Example:** A motivated beginner who does not know how to start needs a Facilitator (tutorial + prompt), not a Spark (inspirational quote). An expert who forgot their daily session needs a Signal (simple reminder), not a Facilitator.
- **[SOURCE: BJ Fogg, Behavior Model, Prompt types]**

## H9: Behavior Design, Not Behavior Modification
- **Rule:** Design the environment and the experience so the desired behavior becomes natural. Never manipulate, guilt, or coerce. If users feel controlled, the design has failed regardless of whether the behavior occurs. Behavior design respects autonomy; behavior modification overrides it.
- **When to apply:** When evaluating any proposed gamification mechanic — especially loss aversion, streaks with penalties, or social pressure tactics.
- **Example:** A streak counter that says "Don't break your streak!" uses guilt (behavior modification). A streak counter that says "You've built 14 days of momentum — nice work!" uses celebration (behavior design). Same mechanic, fundamentally different approach.
- **[SOURCE: BJ Fogg, Tiny Habits, Introduction; Stanford Behavior Design Lab philosophy]**

## H10: Help People Do What They Already Want To Do
- **Rule:** Effective behavior design amplifies existing aspirations. It does not create new desires or override preferences. If users do not want to do something, no amount of design will create lasting behavior. Start by understanding what users genuinely want, then remove barriers.
- **When to apply:** Before designing any behavior change system. If user research reveals the target behavior conflicts with user goals, redesign the behavior target, not the motivation strategy.
- **Example:** Employees do not want to fill out time sheets. No gamification makes time sheets desirable. Instead, redesign: auto-capture time from calendar events and ask for a 10-second confirmation. The behavior changes from "fill out time sheets" to "confirm your day" — something people are willing to do.
- **[SOURCE: BJ Fogg, Tiny Habits, Ch. 1]**

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | B=MAP Diagnosis |
|---|---|---|
| Relying on willpower for sustained behavior | Motivation fluctuates; willpower is a finite resource | M is unreliable long-term |
| Designing big behaviors first | High ability threshold means most users fail early | A is too low |
| Delayed rewards (weekly summaries, month-end prizes) | Celebration must be immediate to wire the habit | No Shine at the behavior moment |
| One-size-fits-all notifications | Wrong prompt type for the user's current M/A state | P type mismatched |
| Guilt-based streak penalties | Creates anxiety, not habits; users quit rather than fail publicly | Violates behavior design ethics |
| Ignoring Social Deviance factor | Users avoid behaviors that make them look odd to peers | A chain weakest link ignored |
| Adding motivation to a prompt-less system | High M + high A but no P still equals no behavior | P is missing entirely |
