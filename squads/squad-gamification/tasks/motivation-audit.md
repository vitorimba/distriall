# Task: Motivation Audit

> **ID:** T-GM-003
> **Type:** Analysis
> **Squad:** squad-gamification
> **Agents:** motivation-analyst (lead), behavior-architect
> **Estimated Duration:** 1-2 hours
> **Inputs:** Diagnostic report, current mechanics inventory, user feedback
> **Outputs:** `motivation-audit-report.md`, `motivation-balance-map.yaml`

## Purpose

Analisar o balanco entre motivacao intrinseca e extrinseca no sistema atual, identificar overjustification risks, e recomendar ajustes para sustentabilidade motivacional a longo prazo.

O Motivation Audit e a analise mais critica do squad porque determina se a gamificacao do sistema e sustentavel ou se esta a caminho de colapso motivacional. Sistemas que dependem exclusivamente de recompensas extrinsecas (pontos, badges) experimentam "reward fatigue" — usuarios precisam de recompensas cada vez maiores para o mesmo nivel de engajamento, ate que o custo se torna insustentavel.

## Pre-Conditions

- [ ] Diagnostic report disponivel (T-GM-001)
- [ ] Inventario de mecanicas atuais
- [ ] Dados de retencao disponiveis
- [ ] Contexto do produto e publico-alvo documentados

## Execution Steps

### Step 1: Mechanics Inventory and Classification
**Agent:** motivation-analyst

Antes da analise motivacional, catalogar todas as mecanicas existentes no sistema:

**Template de inventario:**

```yaml
mechanics_inventory:
  - name: "[Nome da mecanica]"
    type: "intrinsic|extrinsic|mixed"
    category: "autonomy|competence|relatedness|tangible|status|social_pressure|loss"
    description: "[O que a mecanica faz]"
    user_facing: true|false
    adoption_rate: "[% de usuarios que interagem]"
    engagement_impact: "high|medium|low|unknown"
    notes: "[Observacoes]"
```

**Classificacao detalhada:**

**Intrinsic Motivators (Self-Determination Theory):**
- **Autonomy:** Escolhas, customizacao, caminhos alternativos
- **Competence:** Desafios adequados, feedback de progresso, mastery
- **Relatedness:** Conexao social, pertencimento, proposito compartilhado

**Extrinsic Motivators:**
- **Tangible Rewards:** Pontos, moedas, premios, descontos
- **Status Symbols:** Badges, titulos, ranking positions
- **Social Pressure:** Leaderboards, comparacoes publicas, streaks visiveis
- **Loss Mechanics:** Countdown timers, expiring rewards, streak breaks

**Mixed Motivators (context-dependent):**
- **Narratives:** Podem ser intrinsecas (meaning) ou extrinsecas (progression gating)
- **Challenges:** Podem ser intrinsecas (mastery) ou extrinsecas (reward-contingent)
- **Teams:** Podem ser intrinsecas (belonging) ou extrinsecas (social pressure)

### Step 2: Octalysis Deep Analysis
**Agent:** motivation-analyst

Aplicar Octalysis Level 2 (por fase da jornada do usuario):

| Phase | CD1 | CD2 | CD3 | CD4 | CD5 | CD6 | CD7 | CD8 | Balance |
|-------|-----|-----|-----|-----|-----|-----|-----|-----|---------|
| Discovery | | | | | | | | | |
| Onboarding | | | | | | | | | |
| Scaffolding | | | | | | | | | |
| Endgame | | | | | | | | | |

**Core Drives Reference:**
- CD1: Epic Meaning & Calling
- CD2: Development & Accomplishment
- CD3: Empowerment of Creativity & Feedback
- CD4: Ownership & Possession
- CD5: Social Influence & Relatedness
- CD6: Scarcity & Impatience
- CD7: Unpredictability & Curiosity
- CD8: Loss & Avoidance

**Scoring Guidelines (1-10 per drive per phase):**

| Score | Meaning | Example |
|-------|---------|---------|
| 0 | Drive ausente | Nenhuma mecanica ativa este drive |
| 1-3 | Presenca fraca | Drive mencionado mas nao sistematizado |
| 4-6 | Presenca moderada | Mecanicas ativas mas sem otimizacao |
| 7-9 | Presenca forte | Mecanicas bem desenhadas e eficazes |
| 10 | Drive dominante | Multiplas mecanicas fortes, possivel over-reliance |

**White Hat Score (sustentavel):** CD1 + CD2 + CD3 = ?/30
**Black Hat Score (urgente):** CD6 + CD7 + CD8 = ?/30
**Left Brain (extrinsic):** CD2 + CD4 + CD6 = ?/30
**Right Brain (intrinsic):** CD3 + CD5 + CD7 = ?/30

**Interpretacao dos ratios:**

| Ratio | Ideal | Warning | Critical |
|-------|-------|---------|----------|
| White Hat : Black Hat | 2:1 ou melhor | 1:1 | 1:2 (Black Hat dominante) |
| Right Brain : Left Brain | 1.5:1 ou melhor | 1:1 | 1:2 (Left Brain dominante) |
| Total score | 40-70 | <30 (fraco) ou >80 (over-gamified) | <15 ou >90 |

### Step 3: Overjustification Effect Detection
**Agent:** motivation-analyst

Verificar se recompensas extrinsecas estao minando motivacao intrinseca:

**Sinais de Overjustification:**
- [ ] Usuarios so engajam quando ha recompensa explicita
- [ ] Remocao de rewards causa drop abrupto de engajamento
- [ ] Atividades antes prazerosas agora "parecem trabalho"
- [ ] Usuarios pedem "o que eu ganho?" para cada acao
- [ ] Qualidade das contribuicoes caiu apos introducao de pontos
- [ ] Gaming the system (acoes minimas para maximizar pontos)
- [ ] Engagement cai quando rewards sao delayed ou reduced
- [ ] Usuarios novos que nunca viram rewards engajam mais que veteranos

**Cognitive Evaluation Theory (Deci & Ryan):**
- Recompensas informacionais (feedback) -> Mantem motivacao intrinseca
- Recompensas controladoras (contingentes) -> Reduzem motivacao intrinseca
- Expected rewards -> Mais prejudiciais que unexpected rewards

**Framework de classificacao de rewards:**

| Reward Type | Impact on Intrinsic | Example | Recommendation |
|------------|-----------------------|---------|----------------|
| Informational | Positive | "You mastered skill X" | Always safe |
| Unexpected | Neutral to positive | Random bonus after good work | Use sparingly |
| Completion-contingent | Slightly negative | "Complete 5 tasks to earn badge" | Add meaning layer |
| Engagement-contingent | Negative | "Login daily for streak bonus" | Minimize or reframe |
| Performance-contingent | Variable | "Top 10% earns gold" | Risk for most users |
| Task-contingent | Most negative | "Do X to get Y" | Avoid for intrinsically motivating tasks |

**Overjustification Risk Score (0-10):**

| Score | Level | Action Required |
|-------|-------|----------------|
| 0-2 | Low | Continue monitoring |
| 3-5 | Medium | Review reward structure, add intrinsic layers |
| 6-7 | High | Immediate rebalancing needed |
| 8-10 | Critical | Emergency intervention — extrinsic dependency established |

### Step 4: Self-Determination Theory Assessment
**Agent:** behavior-architect

Avaliar satisfacao das 3 necessidades basicas (SDT):

| Need | Current Score (1-10) | Evidence | Gap |
|------|---------------------|----------|-----|
| **Autonomy** | | | |
| **Competence** | | | |
| **Relatedness** | | | |

**Autonomy Indicators:**
- Meaningful choices available
- User can set own goals
- Multiple paths to completion
- Opt-out/opt-in for gamification elements
- Customization options for experience
- User-controlled difficulty level

**Competence Indicators:**
- Challenge-skill balance (Flow Theory)
- Clear feedback loops
- Visible progress indicators
- Difficulty scaling
- Skill trees or mastery paths
- Meaningful failure (learning from mistakes)

**Relatedness Indicators:**
- Social features present
- Team/group mechanics
- Mentoring/helping systems
- Shared narratives
- Community spaces
- Recognition by peers (not just system)

**SDT Diagnostic Questions:**

| Need | Diagnostic Question | Low Score Indicator |
|------|--------------------|--------------------|
| Autonomy | "Can users choose HOW they engage?" | Single linear path, no choices |
| Autonomy | "Can users opt out of gamification?" | Forced participation |
| Competence | "Is difficulty matched to skill?" | One difficulty for all users |
| Competence | "Is feedback timely and informative?" | Delayed or generic feedback |
| Relatedness | "Do users feel part of something?" | Isolated individual experience |
| Relatedness | "Can users help each other?" | No peer interaction mechanics |

### Step 5: B=MAP Motivation Assessment
**Agent:** behavior-architect

Para cada comportamento-chave, avaliar componente motivacional:

```
B = M x A x P
```

| Behavior | Motivation Type | Motivation Level | Sustainability | Risk |
|----------|----------------|-----------------|----------------|------|
| | Intrinsic/Extrinsic/Mixed | 1-10 | High/Medium/Low | |

**Motivation Wave Analysis (Fogg):**
- Peak motivation moments (when users are most motivated)
- Motivation troughs (when motivation drops)
- Trigger effectiveness during low-motivation periods

**Detailed B=MAP audit per behavior:**

```yaml
behavior_audit:
  - behavior: "[Nome do comportamento]"
    motivation:
      type: "intrinsic|extrinsic|mixed"
      level: 1-10
      source: "[O que motiva: curiosidade, reward, social, etc.]"
      sustainability: "high|medium|low"
      risk: "[Risco de queda motivacional]"
    ability:
      level: 1-10
      barriers: ["[Barreira 1]", "[Barreira 2]"]
      simplification_opportunities: ["[Oportunidade 1]"]
    prompt:
      type: "internal|external|action"
      effectiveness: 1-10
      timing: "[Quando o prompt ocorre]"
    overall_assessment:
      current_performance: "strong|adequate|weak|failing"
      priority: "high|medium|low"
      recommendation: "[Acao recomendada]"
```

**Motivation sustainability tiers:**

| Tier | Duration | Source | Example | Vulnerability |
|------|----------|--------|---------|---------------|
| Tier 1: Novelty | 1-7 days | Curiosity, new experience | First use excitement | Fades rapidly |
| Tier 2: Achievement | 1-3 months | Progress, rewards | Completing onboarding | Plateaus after goals met |
| Tier 3: Social | 3-12 months | Relationships, identity | Team belonging | Depends on community health |
| Tier 4: Mastery | 1+ years | Deep skill, autonomy | Expert-level engagement | Most sustainable |

### Step 6: Balance Recommendations
**Agent:** motivation-analyst

Gerar recomendacoes de rebalanceamento:

**Se Extrinsic-Heavy (Left Brain dominant):**
1. Introduce autonomy mechanics (choices, customization)
2. Add narrative layer (Epic Meaning)
3. Create social meaning around actions (Relatedness)
4. Shift from controlling to informational rewards
5. Introduce variable ratio schedules (Unpredictability)
6. Replace task-contingent rewards with unexpected recognition
7. Add mastery paths that don't require extrinsic incentives

**Se Intrinsic-Only (missing urgency):**
1. Add streak mechanics (moderate Loss Avoidance)
2. Introduce time-limited events (Scarcity)
3. Add visible progress systems (Accomplishment)
4. Create collection mechanics (Ownership)
5. Add social comparison options (Social Influence)
6. Implement seasonal competitions with soft resets
7. Add progress milestones with celebration moments

**Se Black Hat Heavy (unsustainable):**
1. Replace FOMO with JOMO (Joy of Missing Out options)
2. Convert loss mechanics to gain mechanics
3. Add opt-out for pressure mechanics
4. Introduce meaningful narrative (Epic Meaning)
5. Create mastery paths (Accomplishment)
6. Remove countdown timers on essential features
7. Audit all notification patterns for manipulation

**Se Over-Gamified (score >80):**
1. Remove redundant mechanics (too many systems competing for attention)
2. Simplify progression (fewer parallel tracks)
3. Consolidate reward types
4. Focus on 3-4 core mechanics instead of 10+
5. Ensure core product value exists without gamification

**Prioritization Matrix:**

| Recommendation | Impact | Effort | Priority |
|---------------|--------|--------|----------|
| [Rec 1] | High/Medium/Low | High/Medium/Low | P1/P2/P3 |

## Output Examples

### motivation-audit-report.md (excerpt)

```markdown
## Motivation Audit Report

### Executive Summary
The system shows significant extrinsic over-reliance (Left Brain score 24/30 vs Right Brain 12/30). Overjustification risk is HIGH (7/10) — users demonstrate reward dependency. Immediate rebalancing recommended.

### Octalysis Level 2

| Phase | WH Score | BH Score | Balance |
|-------|----------|----------|---------|
| Discovery | 18/30 | 6/30 | Healthy |
| Onboarding | 12/30 | 14/30 | WARNING |
| Scaffolding | 8/30 | 20/30 | CRITICAL |
| Endgame | 6/30 | 22/30 | CRITICAL |

### Top 3 Recommendations
1. **P1:** Add mastery paths to scaffolding phase (CD2+CD3, shift from CD6+CD8)
2. **P1:** Convert daily login reward to unexpected recognition
3. **P2:** Introduce opt-out for streak pressure mechanics
```

### motivation-balance-map.yaml (excerpt)

```yaml
motivation_balance:
  overall:
    white_hat: 14
    black_hat: 22
    ratio: "0.64:1"
    verdict: "BLACK_HAT_HEAVY"
  sdt:
    autonomy: 4
    competence: 6
    relatedness: 3
    verdict: "RELATEDNESS_GAP"
  overjustification:
    risk_score: 7
    evidence:
      - "70% of users only engage when daily reward is available"
      - "Quality of contributions dropped 30% after points introduction"
    verdict: "HIGH_RISK"
  recommendations:
    p1:
      - action: "Add mastery paths"
        target_drives: [CD2, CD3]
        expected_impact: "Shift scaffolding from BH to WH"
      - action: "Convert daily login to unexpected recognition"
        target_drives: [CD7]
        expected_impact: "Reduce overjustification risk by 2 points"
    p2:
      - action: "Add opt-out for streak mechanics"
        target_drives: [CD1]
        expected_impact: "Increase autonomy score from 4 to 6"
```

## Post-Conditions

- [ ] Balanco intrinsic/extrinsic quantificado
- [ ] Octalysis Level 2 por fase documentado
- [ ] Overjustification risks identificados
- [ ] SDT assessment completo
- [ ] Recomendacoes de rebalanceamento priorizadas
- [ ] B=MAP audit por comportamento-chave
- [ ] Output files gerados nos formatos especificados

## Veto Conditions

| ID | Condition | Severity | Action |
|----|-----------|----------|--------|
| V-GM-003-01 | Overjustification score >= 8 sem plano de mitigacao | Critical | BLOCK — Sistema em risco de colapso motivacional |
| V-GM-003-02 | Black Hat : White Hat ratio > 2:1 sem justificativa | Critical | BLOCK — Gamificacao insustentavel |
| V-GM-003-03 | SDT assessment incompleto (falta 1+ necessidade) | High | BLOCK — Analise insuficiente |
| V-GM-003-04 | Nenhum Core Drive analisado por fase | High | BLOCK — Octalysis Level 2 obrigatorio |
| V-GM-003-05 | Recomendacoes sem priorizacao | Medium | WARN — Adicionar impact/effort matrix |
| V-GM-003-06 | Mecanicas de loss aversion sem opt-out | Critical | BLOCK — Viola autonomia (SDT) |
| V-GM-003-07 | Sistema over-gamified (>80) sem plano de simplificacao | High | BLOCK — Complexidade excessiva |

## Troubleshooting

### Problema: Dados insuficientes para Octalysis scoring

**Sintoma:** Nao ha dados quantitativos para pontuar Core Drives com precisao.

**Solucao:**
1. Usar analise qualitativa baseada em mecanicas implementadas
2. Entrevistar 3-5 usuarios representativos
3. Marcar scores como "estimados" com nivel de confianca
4. Planejar reavaliacao com dados reais em 30 dias
5. Focar na presenca/ausencia de drives em vez de scores exatos

### Problema: Stakeholders resistem a remover mecanicas extrinsecas

**Sintoma:** Time nao quer remover pontos/badges mesmo com overjustification alto.

**Solucao:**
1. Apresentar dados de "reward fatigue" (custo crescente de rewards)
2. Propor transicao gradual (nao remocao abrupta)
3. Mostrar case studies de overjustification em produtos similares
4. Sugerir A/B test: grupo com rewards reduzidos vs. controle
5. Reframe: "nao estamos removendo rewards, estamos adicionando meaning"

### Problema: Conflito entre Octalysis e SDT assessment

**Sintoma:** Octalysis mostra balance saudavel mas SDT mostra gaps.

**Solucao:**
1. Octalysis mede intensidade de drives; SDT mede satisfacao de necessidades
2. E possivel ter CD2 (Accomplishment) alto mas Competence (SDT) baixo se challenges nao sao adequados ao skill
3. Usar SDT como "ground truth" para necessidades humanas basicas
4. Usar Octalysis como mapa tatico para mecanicas especificas
5. Documentar a discrepancia como insight (gap de implementacao)

### Problema: Sistema sem nenhuma gamificacao (scores todos zero)

**Sintoma:** Produto nao tem mecanicas de gamificacao implementadas.

**Solucao:**
1. Nao e um audit — e um opportunity assessment
2. Reclassificar como input para gamification-diagnostic (T-GM-001)
3. Identificar mecanicas "naturais" que ja existem (ex: progress bars, notifications)
4. Mapear Core Drives que o produto naturalmente ativa
5. Usar como baseline para design de novo sistema

## Framework References

- **Chou, Y.** — *Actionable Gamification* (Octalysis Framework, 8 Core Drives, Level 2 analysis)
- **Deci, E. & Ryan, R.** — *Self-Determination Theory* (Intrinsic motivation, Autonomy/Competence/Relatedness, Cognitive Evaluation Theory)
- **Fogg, BJ** — *Tiny Habits* (B=MAP model, Motivation Waves)
- **Lepper, M. & Greene, D.** — *The Hidden Costs of Reward* (Overjustification Effect research)
- **Pink, D.** — *Drive* (Autonomy, Mastery, Purpose as motivation pillars)
- **Csikszentmihalyi, M.** — *Flow* (Challenge-skill balance, optimal experience)
- **Kohn, A.** — *Punished by Rewards* (Critique of extrinsic reward systems)

## Quality Gate

Applies: `GM-QG-003` (Motivation Balance Quality Gate)

- [ ] White Hat / Black Hat ratio calculado
- [ ] Left Brain / Right Brain ratio calculado
- [ ] SDT assessment para as 3 necessidades
- [ ] Overjustification risk assessment completo
- [ ] Recomendacoes alinhadas com player personas

## Next Tasks

- `engagement-loop-design` — Se loops precisam rebalanceamento
- `progression-design` — Se sistemas de progressao desalinhados
- `anti-pattern-audit` — Se overjustification detectado
- `emotion-mapping` — Se emotional engagement baixo
