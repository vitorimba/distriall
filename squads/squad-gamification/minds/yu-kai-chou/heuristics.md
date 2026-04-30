# Heuristics — Yu-kai Chou (Octalysis Framework)

## Decision Framework

Before applying any heuristic, identify the project phase (Discovery, Onboarding, Scaffolding, Endgame) and the target Core Drives. Every recommendation must trace to at least one Core Drive with a clear rationale.

---

## H1: The Octagon Balance
- **Rule:** Always assess all 8 Core Drives before recommending any gamification design. A system that scores 0 on any Core Drive has a vulnerability. The ideal system activates at least 5 of 8 drives.
- **When to apply:** At the beginning of any gamification design or audit.
- **Example:** A fitness app scores high on CD2 (Accomplishment) and CD4 (Ownership) but zero on CD5 (Social Influence). Recommend adding team challenges or mentor systems to fill the gap.
- **[SOURCE: Yu-kai Chou, Actionable Gamification, Ch. 3]**

## H2: White Hat Sustains, Black Hat Converts
- **Rule:** Use White Hat drives (CD1 Epic Meaning, CD2 Accomplishment, CD3 Empowerment of Creativity) for long-term engagement and user satisfaction. Use Black Hat drives (CD6 Scarcity, CD7 Unpredictability, CD8 Loss & Avoidance) sparingly for short-term urgency. A system that is purely Black Hat will burn out users within 3-6 months.
- **When to apply:** When choosing between urgency tactics and sustained engagement strategies.
- **Example:** A flash sale (CD6 Scarcity + CD8 Loss) drives immediate purchases but creates anxiety. Pair it with a loyalty program (CD2 Accomplishment + CD4 Ownership) to sustain long-term engagement.
- **[SOURCE: Yu-kai Chou, Actionable Gamification, Ch. 8-15]**

## H3: Right Brain for Intrinsic, Left Brain for Extrinsic
- **Rule:** Left Brain drives (CD2 Accomplishment, CD4 Ownership, CD6 Scarcity) create extrinsic motivation — logical, goal-oriented, reward-seeking. Right Brain drives (CD3 Empowerment of Creativity, CD5 Social Influence, CD7 Unpredictability) create intrinsic motivation — creative, social, curiosity-driven. Balance both sides for a complete experience.
- **When to apply:** When a system feels too transactional (all Left Brain) or too aimless (all Right Brain).
- **Example:** An e-commerce platform with only points and discounts (Left Brain) adds a community showcase where users share creative product uses (Right Brain CD3 + CD5).
- **[SOURCE: Yu-kai Chou, Actionable Gamification, Ch. 4]**

## H4: Level 2 Octalysis — Phase Matters
- **Rule:** The same Core Drive operates differently across the four player journey phases: Discovery, Onboarding, Scaffolding, Endgame. CD7 (Unpredictability) is powerful in Discovery but annoying in Endgame. CD8 (Loss) is dangerous in Onboarding but acceptable in Endgame. Always perform Level 2 analysis (Core Drives x Journey Phase).
- **When to apply:** When designing the user lifecycle or diagnosing drop-off at specific journey stages.
- **Example:** During Onboarding, activate CD1 (Epic Meaning) with a narrative intro and CD3 (Empowerment) with early creative choices. Reserve CD6 (Scarcity) tactics for Scaffolding when users already have investment.
- **[SOURCE: Yu-kai Chou, Actionable Gamification, Ch. 16]**

## H5: The Anti-Core-Drive Test
- **Rule:** For every mechanic, ask: "What Core Drive does this activate?" If the answer is "none" or "I'm not sure," the mechanic is pointsification — cosmetic gamification with no motivational substance. Every mechanic must intentionally activate at least one Core Drive.
- **When to apply:** During design review of any proposed gamification feature.
- **Example:** A "Share to Facebook" button with no social reward structure activates no Core Drive. Redesign as a collaborative challenge (CD5) with team milestones (CD2) to give the sharing mechanic motivational substance.
- **[SOURCE: Yu-kai Chou, Octalysis Primer blog series]**

## H6: Epic Meaning is Underused
- **Rule:** CD1 (Epic Meaning & Calling) is the most underused Core Drive in commercial products. Connecting user actions to a purpose larger than themselves creates the deepest, most sustainable engagement. This drive is particularly powerful for long-term retention because it transcends individual reward.
- **When to apply:** When retention curves flatten after initial engagement features are exhausted, or when building community-oriented products.
- **Example:** Wikipedia editors contribute millions of hours because their work serves humanity's knowledge. An enterprise tool can activate CD1 by showing how individual contributions improve outcomes for the entire team or customer base.
- **[SOURCE: Yu-kai Chou, Actionable Gamification, Ch. 8]**

## H7: Scarcity Amplifies, Not Creates
- **Rule:** CD6 (Scarcity & Impatience) makes existing desire stronger — it does not create desire from nothing. If users do not want something, making it scarce will not help. Scarcity works best when combined with CD4 (Ownership & Possession) or CD2 (Development & Accomplishment).
- **When to apply:** When considering time-limited offers, exclusive access, or artificial constraints.
- **Example:** An invite-only feature (CD6) works for Gmail when users already want email. The same tactic fails for an unknown product nobody desires yet. Build desire with CD1 or CD5 first, then amplify with CD6.
- **[SOURCE: Yu-kai Chou, Actionable Gamification, Ch. 13]**

## H8: The Octalysis Score Threshold
- **Rule:** A product with an Octalysis total score below 30 (out of 80 max, 10 per drive) needs fundamental redesign, not incremental improvement. A score above 50 indicates a well-gamified system. Products recognized as world-class in engagement typically score 55-70.
- **When to apply:** When performing a full Octalysis audit to determine investment level needed.
- **Example:** A corporate LMS scores 18 total (mostly CD2 and CD8). Recommendation: do not add more badges — redesign the core experience to activate CD1, CD3, and CD5 before iterating on existing mechanics.
- **[SOURCE: Yu-kai Chou, Octalysis tool and scoring methodology]**

## H9: Game Techniques Are Not Interchangeable
- **Rule:** Each of the 70+ Game Techniques in the Octalysis catalog maps to specific Core Drives. "Milestone Unlocks" (GT #19) activates CD2, not CD3. "Blank Fills" (GT #21) activates CD3, not CD2. Choosing the wrong technique for the intended Core Drive produces zero motivational effect.
- **When to apply:** When selecting specific implementation mechanics for a target Core Drive.
- **Example:** To activate CD3 (Empowerment of Creativity), use "Boosters" (GT #31) or "Voluntary Autonomy" (GT #47), not "Progress Bar" (GT #4) which serves CD2.
- **[SOURCE: Yu-kai Chou, Game Technique catalog, Octalysis Prime]**

## H10: The Social Core Drives Require Real Networks
- **Rule:** CD5 (Social Influence & Relatedness) cannot be faked with bot interactions or manufactured social proof at scale. Users detect artificial social dynamics within 2-3 interactions. Social mechanics require genuine peer connections, mentorship structures, or community contributions.
- **When to apply:** When designing social features for products with small or cold-start user bases.
- **Example:** Instead of fake "X users are viewing this now" notifications, build genuine group challenges where 3-5 real users collaborate toward a shared goal (CD5 + CD1).
- **[SOURCE: Yu-kai Chou, Actionable Gamification, Ch. 12]**

## H11: Unpredictability Has a Shelf Life
- **Rule:** CD7 (Unpredictability & Curiosity) is the most powerful short-term engagement driver but degrades fastest. Mystery boxes, random rewards, and surprise events lose their impact after 5-8 occurrences unless the variation space is genuinely large. Refresh unpredictability mechanics on a regular cycle.
- **When to apply:** When engagement metrics show declining returns on surprise-based features.
- **Example:** A "daily surprise reward" loses impact after 2 weeks if the reward pool has only 10 items. Expand to 50+ meaningfully different outcomes, or rotate the mechanic entirely every month.
- **[SOURCE: Yu-kai Chou, Octalysis Prime, Advanced CD7 module]**

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Core Drive Violated |
|---|---|---|
| Points-Badges-Leaderboards only | Activates only CD2 superficially; no depth | Ignores CD1, CD3, CD5, CD7 |
| Pure Black Hat system | Creates urgency without satisfaction; users feel manipulated | Overloads CD6/CD7/CD8 |
| Scarcity without prior desire | Restricting access to something nobody wants yet | CD6 misapplied |
| Social features without real users | Manufactured social proof feels hollow | CD5 requires authenticity |
| Same mechanics across all journey phases | Onboarding tactics annoy Endgame users; Endgame tactics overwhelm new users | Level 2 Octalysis ignored |
| Copy competitor mechanics without Core Drive analysis | Mechanics serve different Core Drives in different contexts | Violates H5 Anti-Core-Drive Test |
| Over-reliance on CD2 progress bars | Creates grinding; no creativity or social dimension | Left Brain imbalance |
