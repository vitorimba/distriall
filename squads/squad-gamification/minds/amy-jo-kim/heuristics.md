# Heuristics — Amy Jo Kim (Game Thinking)

## Decision Framework

Always start with the player, not the mechanics. Before selecting any game element, answer: "Who is our player, and what are they trying to become?" The mastery journey defines the entire design — mechanics are just tools to support that journey.

---

## H1: Players Before Mechanics
- **Rule:** Never start with "we need a leaderboard." Start with "who are our players and what are they trying to become?" The mechanics follow naturally from understanding the player's mastery journey. Mechanics without player understanding are decoration.
- **When to apply:** At the start of every gamification design project, before any brainstorming of features.
- **Example:** A language learning app team says "we need badges." Ask: "What is the learner trying to become? A confident conversationalist? A grammar expert? A cultural explorer?" Each answer leads to completely different mechanics.
- **[SOURCE: Amy Jo Kim, Game Thinking, Ch. 1]**

## H2: Skill-Building is the Core Loop
- **Rule:** The most engaging games teach you something. Design your core loop around skill development — each interaction should make the player slightly more competent. Products that only reward time-spent create grinding, not engagement. The core loop must have a learning component.
- **When to apply:** When designing or auditing the fundamental interaction cycle of any product.
- **Example:** Duolingo's core loop teaches vocabulary through spaced repetition (skill-building), not just through daily login streaks (time-spent). The skill-building is what creates lasting engagement; the streak just adds consistency.
- **[SOURCE: Amy Jo Kim, Game Thinking, Core Learning Loop concept]**

## H3: Scaffold the Journey in Three Phases
- **Rule:** New players need guidance. Experienced players need freedom. Design three phases: Guided (onboarding), Supported (habit building), and Independent (mastery). Phase transitions should be based on demonstrated skill, not time elapsed. Advancing a player who has not demonstrated competence creates frustration.
- **When to apply:** When designing progression systems, unlocking mechanics, or level structures.
- **Example:** A project management tool: Guided phase uses templates and wizards. Supported phase offers suggestions but allows customization. Independent phase provides a blank canvas with power tools. Transition when the user demonstrates proficiency, not after 30 days.
- **[SOURCE: Amy Jo Kim, Game Thinking, Player Journey model]**

## H4: The Super Fan Filter
- **Rule:** Design for your most passionate 10% (Super Fans), not the average user. Super Fans will tell you what is working and what is not. They will evangelize your product. They represent the aspirational state that mainstream users want to reach. Build for them first, then simplify for broader adoption.
- **When to apply:** When prioritizing features, selecting beta testers, or designing advanced mechanics.
- **Example:** Figma designed for power designers (Super Fans) first, then simplified the experience for casual users. The Super Fans created templates, tutorials, and community content that attracted mainstream adoption.
- **[SOURCE: Amy Jo Kim, Game Thinking, Super Fan concept]**

## H5: Smart Gamification vs Dumb Gamification
- **Rule:** Smart gamification designs a system where meaningful activity leads to mastery and social connection. Dumb gamification sprinkles points and badges on top of an unchanged experience. The litmus test: if removing the gamification layer does not change the core experience, it is dumb gamification.
- **When to apply:** When evaluating any gamification proposal — apply the removal test.
- **Example:** Khan Academy's mastery system (smart): removing it changes how students learn and progress. A corporate intranet's badge system where badges are given for logging in (dumb): removing it changes nothing about how people use the intranet.
- **[SOURCE: Amy Jo Kim, Game Thinking workshops and talks]**

## H6: Social Learning Loops
- **Rule:** The most powerful engagement loops involve learning from and with others. Peer teaching, collaborative challenges, shared discovery, and community knowledge-building create both competence and connection simultaneously. Solo mastery is valuable; social mastery is transformative.
- **When to apply:** When designing community features, collaborative mechanics, or multiplayer elements.
- **Example:** GitHub's pull request review system is a social learning loop: contributors learn from reviewers, reviewers deepen their understanding by teaching, and the codebase improves. All three outcomes from one mechanic.
- **[SOURCE: Amy Jo Kim, Game Thinking, Social Learning Loops]**

## H7: Progressive Complexity, Not Progressive Difficulty
- **Rule:** Do not just make things harder — make them richer. Add new dimensions, new tools, new possibilities. Complexity gives players more ways to express mastery; difficulty just makes the same thing harder. Players quit when things get harder; they stay when things get deeper.
- **When to apply:** When designing level progression, difficulty curves, or advanced features.
- **Example:** Chess does not get "harder" — it gets more complex as you learn openings, middle-game strategy, and endgame theory. Each layer adds richness, not just difficulty. Apply this principle to product progression.
- **[SOURCE: Amy Jo Kim, Game Thinking, Progressive Mastery concept]**

## H8: Test with Real Players Early
- **Rule:** Do not design the full mastery journey in isolation. Prototype the core learning loop, test it with 5-10 real potential players, and iterate before building the full system. Player testing reveals assumptions about mastery that the design team got wrong. Every mastery journey has surprises.
- **When to apply:** Before committing to a full implementation of any gamification system.
- **Example:** Before building a full onboarding gamification system, create a paper prototype of the first 5 interactions. Test with real users. If they do not feel a sense of progress after 5 interactions, the core loop is broken — fix it before building.
- **[SOURCE: Amy Jo Kim, Game Thinking, MVP Player Journey]**

## H9: The Mastery Path Must Be Visible
- **Rule:** Players need to see where they are going, where they have been, and what comes next. An invisible mastery path creates uncertainty and abandonment. Show the journey — not just the current position — so players can anticipate growth and feel motivated by progress.
- **When to apply:** When designing progress indicators, dashboards, or journey maps.
- **Example:** LinkedIn's profile strength indicator shows both current completeness and the next steps. Duolingo's skill tree shows the full path with locked and unlocked nodes. Both make the mastery path visible and navigable.
- **[SOURCE: Amy Jo Kim, Game Thinking, Mastery Path visualization]**

## H10: Innovation Games Require Different Design
- **Rule:** Products in the innovation phase (pre-product-market fit) need different gamification than products in the optimization phase. Innovation products should gamify experimentation and discovery. Optimization products should gamify efficiency and mastery. Applying optimization gamification to innovation products kills creativity.
- **When to apply:** When determining the gamification strategy based on product lifecycle stage.
- **Example:** A startup validating a new concept should reward users for trying different features and providing feedback (innovation). A mature SaaS should reward users for mastering workflows and achieving outcomes (optimization).
- **[SOURCE: Amy Jo Kim, Game Thinking, Innovation vs Optimization]**

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Game Thinking Diagnosis |
|---|---|---|
| Starting with mechanics instead of players | Mechanics without player understanding are arbitrary decoration | Violates H1: Players Before Mechanics |
| Rewarding time-spent instead of skill-gained | Creates grinding, not mastery; users feel busy but not competent | Core loop lacks skill-building (H2) |
| Same difficulty for beginners and experts | Beginners are overwhelmed; experts are bored | No journey scaffolding (H3) |
| Designing for the average user | Average users are not passionate enough to generate useful feedback | Ignores Super Fan filter (H4) |
| Gamification that can be removed without impact | Proves the gamification is superficial, not structural | Dumb gamification (H5) |
| Solo-only progression systems | Misses the multiplier effect of social learning | No social learning loops (H6) |
| Making things harder instead of richer | Players quit at difficulty walls; they persist through complexity | Difficulty vs Complexity confusion (H7) |
