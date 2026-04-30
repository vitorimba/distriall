# Heuristics — Nir Eyal (Hooked Model)

## Decision Framework

Every habit-forming product follows a cycle: Trigger, Action, Variable Reward, Investment. Before designing any engagement feature, map the complete Hook cycle. If any step is missing or weak, the habit will not form. Always start by identifying the internal trigger (the emotion or situation that initiates usage).

---

## H1: The Four-Step Hook Must Be Complete
- **Rule:** Every habit-forming product runs a cycle: Trigger, Action, Variable Reward, Investment. If any step is broken or missing, the habit will not form. The investment must load the next trigger — this is what closes the loop and creates a self-reinforcing cycle.
- **When to apply:** When designing any product feature intended to create habitual usage.
- **Example:** Twitter's hook: Internal trigger (boredom/FOMO), Action (open app and scroll), Variable Reward (unpredictable mix of news/social/entertainment), Investment (follow new accounts, tweet, build reputation — loads next trigger with more relevant content).
- **[SOURCE: Nir Eyal, Hooked, Ch. 1]**

## H2: Internal Triggers Are the Goal
- **Rule:** External triggers (notifications, emails, ads) start the habit formation process. Internal triggers (emotions, routines, situations) sustain it. A product that still relies primarily on external triggers after 3 months has not successfully formed a habit. Design with the internal trigger end-state in mind from day one.
- **When to apply:** When evaluating whether a product has achieved true habit formation or is still dependent on push notifications.
- **Example:** Instagram initially used email notifications (external trigger) to bring users back. The goal was to associate the emotion of boredom or loneliness (internal trigger) with opening Instagram automatically. Once users opened Instagram reflexively when bored, the habit was formed.
- **[SOURCE: Nir Eyal, Hooked, Ch. 2]**

## H3: Variable Rewards Beat Fixed Rewards
- **Rule:** The brain responds more strongly to unpredictable rewards than predictable ones (variable ratio reinforcement). Design three types of variable rewards: Rewards of the Tribe (social validation, connection), Rewards of the Hunt (material resources, information, deals), and Rewards of the Self (mastery, competency, completion). Include at least two types for a robust reward system.
- **When to apply:** When designing reward systems, feed algorithms, or content discovery experiences.
- **Example:** Stack Overflow combines Tribe rewards (reputation, peer recognition), Hunt rewards (finding the answer you need), and Self rewards (the satisfaction of mastering a topic and earning expert status). This triple-variable reward system creates deep habit formation.
- **[SOURCE: Nir Eyal, Hooked, Ch. 4]**

## H4: The Habit Zone Test
- **Rule:** Plot your product on two axes: Frequency of Use (how often) and Perceived Utility (how valuable). Products in the Habit Zone (high frequency + sufficient perceived utility) form habits. Products outside the Habit Zone do not, regardless of gamification. Know where your product stands before investing in habit-forming design.
- **When to apply:** Before starting any habit-formation design initiative — verify the product is in or near the Habit Zone.
- **Example:** Email is high frequency + high perceived utility = strong Habit Zone. An annual tax filing app is low frequency — no amount of Hook design will make it habitual. Focus instead on making the annual interaction as efficient as possible.
- **[SOURCE: Nir Eyal, Hooked, Ch. 1]**

## H5: Investment Stores Value, Not Extracts It
- **Rule:** The investment phase is not about extraction — it is about the user storing value that makes the product better for their next visit. Data, content, social connections, reputation, skill progress, customization. Each investment raises switching costs naturally and loads the next trigger. The key insight: investment comes after the reward, when the user is most positively disposed.
- **When to apply:** When designing post-reward interactions and value accumulation mechanics.
- **Example:** Pinterest's investment: after receiving the reward (discovering beautiful content), users pin items to boards (investment). This stored value personalizes future recommendations (loads next trigger) and raises switching cost (cannot migrate boards easily).
- **[SOURCE: Nir Eyal, Hooked, Ch. 5]**

## H6: Simplify the Action Phase
- **Rule:** The action phase must be the simplest possible behavior done in anticipation of reward. Apply Fogg's ability factors: reduce time, money, physical effort, mental effort, social deviance, and non-routine. The lower the action threshold, the higher the conversion rate. Every additional step between trigger and reward is a leak in the funnel.
- **When to apply:** When optimizing the core interaction between trigger and reward.
- **Example:** Google's action: type a query and press enter. Two actions. Compare to early search engines that required category navigation. The simplest possible path from trigger (curiosity/question) to reward (answer) wins.
- **[SOURCE: Nir Eyal, Hooked, Ch. 3]**

## H7: The Manipulation Matrix — Ethical Self-Check
- **Rule:** Before designing a Hook, answer two questions: (1) Would I use this product myself? (2) Does this product materially improve the user's life? If yes to both, you are a Facilitator. If no to both, you are a Dealer. Facilitators build products they believe in for users they care about. Dealers manipulate people for profit.
- **When to apply:** At the start of every habit-formation design project and at every ethical review checkpoint.
- **Example:** A meditation app that the founder uses daily and that evidence shows reduces anxiety = Facilitator. A slot machine app designed to exploit compulsive behavior that the designer would never use = Dealer. The matrix forces honesty.
- **[SOURCE: Nir Eyal, Hooked, Ch. 8]**

## H8: The Hook Canvas Before Building
- **Rule:** Before building, map your complete hook on a canvas: What internal trigger does this address? What external trigger brings users in? What is the simplest action? What variable reward types follow? What investment loads the next trigger? If you cannot fill in every box, the design is incomplete.
- **When to apply:** During the design phase of any new feature or product that aims to create habitual usage.
- **Example:** Slack's Hook Canvas: Internal trigger (anxiety about missing team communication), External trigger (notification), Action (open and read message), Variable Reward (Tribe: team connection + Hunt: information needed + Self: being responsive), Investment (send replies, customize channels, build conversation history).
- **[SOURCE: Nir Eyal, Hooked, Hook Canvas tool]**

## H9: External Triggers Must Earn Their Place
- **Rule:** External triggers should be used to build the association with internal triggers, then gradually reduced. A product that increases external trigger frequency over time is compensating for a weak Hook, not building a strong one. Notification fatigue is a symptom of failed habit formation.
- **When to apply:** When planning notification strategy and trigger frequency over the user lifecycle.
- **Example:** A well-designed app sends frequent onboarding notifications in week 1, reduces to daily in weeks 2-4, and by month 3 the user opens the app before any notification arrives. If notification frequency must increase over time, the Hook cycle is broken.
- **[SOURCE: Nir Eyal, Hooked, Ch. 2; Indistractable, trigger management]**

## H10: Indistractable Design — The Ethical Complement
- **Rule:** The same psychology that makes products habit-forming can be used to help users manage their attention. Ethical product design includes giving users tools to control their relationship with the product — scheduled do-not-disturb, usage reports, session limits. This builds trust and long-term retention.
- **When to apply:** When designing any habit-forming system — always include user control mechanisms.
- **Example:** Apple's Screen Time, YouTube's "Take a Break" reminders, and Instagram's activity dashboard all give users control over their habits. Products that include these features signal trustworthiness and reduce regulatory risk.
- **[SOURCE: Nir Eyal, Indistractable, Ch. on designing for focus]**

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Hook Diagnosis |
|---|---|---|
| All external triggers, no internal trigger strategy | Product depends on notifications forever; users eventually mute them | Trigger phase incomplete |
| Fixed, predictable rewards | Brain habituates quickly; engagement declines within weeks | Variable reward missing |
| Complex action required | Every friction point between trigger and reward loses users | Action phase not simplified |
| No investment after reward | No stored value means no switching cost and no trigger loading | Investment phase missing |
| Investment before reward | Asking users to invest before they receive value feels extractive | Hook sequence out of order |
| Ignoring the Habit Zone | Trying to create habits for low-frequency products | Product is outside the Habit Zone |
| Dealer design posture | Building addictive patterns the designer would not use themselves | Manipulation Matrix violation |
