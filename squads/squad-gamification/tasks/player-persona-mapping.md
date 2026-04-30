# Task: Player Persona Mapping

> **ID:** T-GM-002
> **Type:** Analysis
> **Squad:** squad-gamification
> **Agents:** player-profiler (lead), motivation-analyst
> **Estimated Duration:** 1-3 hours
> **Inputs:** User demographics, usage data, diagnostic report
> **Outputs:** `player-personas.md`, `hexad-distribution.yaml`, `persona-mechanics-map.yaml`

## Purpose

Mapear tipos de usuario para perfis HEXAD e Octalysis, criando personas jogaveis que orientam todo o design de mecanicas. Cada persona recebe mecanicas alinhadas com seus drivers motivacionais.

Este task e fundamental porque mecanicas desalinhadas com perfis de usuario geram desmotivacao, churn e, em casos graves, anti-patterns como pointsification (mecanicas genericas que nao ressoam com nenhum tipo de usuario).

## Pre-Conditions

- [ ] Diagnostic report disponivel (T-GM-001)
- [ ] Dados de uso ou entrevistas com usuarios disponiveis
- [ ] Contexto do produto/sistema definido

## Execution Steps

### Step 1: Data Collection and Preparation
**Agent:** player-profiler

Antes de iniciar o profiling HEXAD, coletar e organizar os dados disponiveis:

**Dados quantitativos (se disponiveis):**
- Metricas de uso (DAU, sessoes, acoes por sessao)
- Padroes de navegacao (features mais usadas)
- Historico de compras/conversoes
- Dados de retencao (D1, D7, D30)
- Interacoes sociais (compartilhamentos, convites, comentarios)

**Dados qualitativos (se disponiveis):**
- Entrevistas com usuarios
- Surveys de satisfacao
- Feedback em app stores / reviews
- Tickets de suporte (padroes recorrentes)
- Dados de onboarding (onde usuarios abandonam)

**Preparacao:**
1. Consolidar dados em um dataset unico
2. Identificar segmentos naturais (clusters de comportamento)
3. Documentar lacunas nos dados (o que nao temos)
4. Definir tamanho da amostra e confiabilidade

### Step 2: HEXAD Profiling
**Agent:** player-profiler

Aplicar o modelo HEXAD de Andrzej Marczewski para categorizar a base de usuarios:

**HEXAD User Types:**

| Type | Intrinsic Motivation | Driven By | Responds To |
|------|---------------------|-----------|-------------|
| **Philanthropist** | Purpose, meaning | Altruism, contributing to something bigger | Gifting, knowledge sharing, mentoring, collection for cause |
| **Socialiser** | Relatedness | Social connections, belonging | Teams, social discovery, guilds, chat, collaboration |
| **Free Spirit** | Autonomy | Self-expression, exploration | Customization, exploration, Easter eggs, creative tools |
| **Achiever** | Mastery | Competence, challenge completion | Quests, levels, certifications, difficult challenges |
| **Player** | Extrinsic rewards | Points, prizes, tangible rewards | Points, leaderboards, prizes, lotteries, badges |
| **Disruptor** | Change | Pushing boundaries, finding loopholes | Hacking mechanics, voting systems, innovation contests |

**Procedimento de classificacao:**

1. Para cada segmento de usuarios identificado, avaliar comportamentos dominantes
2. Atribuir tipo HEXAD primario e secundario com base nos sinais comportamentais
3. Estimar percentual de distribuicao na base total
4. Validar com dados quantitativos (quando disponiveis)
5. Documentar nivel de confianca da classificacao (alto/medio/baixo)

### Step 3: Behavioral Signal Mapping
**Agent:** player-profiler

Mapear comportamentos observaveis para tipos HEXAD:

```yaml
behavioral_signals:
  philanthropist:
    - "Helps others without being asked"
    - "Shares content/knowledge frequently"
    - "Participates in community forums"
    - "Reports bugs/issues proactively"
    - "Writes reviews to help other users"
    - "Volunteers for beta testing"
  socialiser:
    - "Invites friends to the platform"
    - "Active in group features"
    - "High message/comment volume"
    - "Forms/joins teams when available"
    - "Engages with social feed consistently"
    - "Creates or participates in group events"
  free_spirit:
    - "Explores all available features"
    - "Customizes profile/avatar extensively"
    - "Uses features in unexpected ways"
    - "Resists mandated paths"
    - "Seeks hidden content or Easter eggs"
    - "Creates user-generated content"
  achiever:
    - "Completes all available challenges"
    - "Seeks harder difficulty levels"
    - "Tracks personal progress obsessively"
    - "Returns to master unfinished content"
    - "Compares personal bests over time"
    - "Pursues completionist goals (100% completion)"
  player:
    - "Checks rewards/points frequently"
    - "Motivated by visible progress bars"
    - "Compares scores with others"
    - "Engages primarily when rewards available"
    - "Seeks deals, discounts, or bonus offers"
    - "Responds strongly to limited-time promotions"
  disruptor:
    - "Finds edge cases and loopholes"
    - "Provides unsolicited feedback on systems"
    - "Tries to break mechanics"
    - "Suggests radical changes"
    - "Tests boundaries of rules and systems"
    - "Champions systemic improvements"
```

**Para cada sinal, documentar:**
- Frequencia observada na base de usuarios
- Correlacao com outros sinais (clusters)
- Relevancia para o contexto do produto

### Step 4: Octalysis Cross-Reference
**Agent:** motivation-analyst

Cruzar HEXAD types com Core Drives do Octalysis:

| HEXAD Type | Primary Core Drives | Secondary Core Drives |
|-----------|--------------------|-----------------------|
| Philanthropist | CD1 (Epic Meaning), CD5 (Social Influence) | CD4 (Ownership) |
| Socialiser | CD5 (Social Influence) | CD3 (Creativity), CD7 (Unpredictability) |
| Free Spirit | CD3 (Creativity & Feedback) | CD7 (Unpredictability) |
| Achiever | CD2 (Accomplishment) | CD6 (Scarcity), CD4 (Ownership) |
| Player | CD2 (Accomplishment), CD4 (Ownership) | CD6 (Scarcity), CD8 (Loss) |
| Disruptor | CD3 (Creativity), CD7 (Unpredictability) | CD8 (Loss), CD1 (Epic Meaning) |

**Analise aprofundada por tipo:**

Para cada tipo dominante na base, o motivation-analyst deve:
1. Identificar os Core Drives primarios e secundarios
2. Avaliar o balanco White Hat vs Black Hat para aquele tipo
3. Verificar se as mecanicas existentes atendem aos Core Drives relevantes
4. Identificar gaps motivacionais (Core Drives desatendidos)
5. Mapear riscos de overjustification para tipos extrinsic-heavy (Player)
6. Recomendar mecanicas especificas por Core Drive

**White Hat vs Black Hat por tipo:**

| HEXAD Type | White Hat Dominant? | Black Hat Risk | Recommendation |
|-----------|--------------------|----|----------------|
| Philanthropist | Yes (CD1) | Low | Safe — focus on meaning and social impact |
| Socialiser | Yes (CD5) | Low-Medium | Monitor social pressure mechanics |
| Free Spirit | Yes (CD3) | Low | Safe — focus on autonomy and creativity |
| Achiever | Mixed (CD2 + CD6) | Medium | Balance achievement with scarcity carefully |
| Player | No (CD4 + CD8) | High | Risk of overjustification — add intrinsic layers |
| Disruptor | Mixed (CD3 + CD8) | Medium | Channel disruption constructively |

### Step 5: Persona Creation
**Agent:** player-profiler

Para cada tipo dominante na base de usuarios, criar persona completa:

```markdown
## Persona: [Name]
**HEXAD Type:** [Primary] / [Secondary]
**Octalysis Profile:** CD[X] dominant, CD[Y] secondary
**Demographics:** [Age, context, role]
**Goals:** What they want to achieve
**Frustrations:** What demotivates them
**Engagement Pattern:** When/how they engage
**Mechanic Affinity:**
  - High: [mechanics that resonate]
  - Medium: [mechanics they tolerate]
  - Low: [mechanics that repel them]
**Risk:** What causes this persona to churn
**Sample Quote:** "[Something this persona would say]"
**Retention Strategy:** [Specific actions to retain this persona]
**Progression Preference:** [How this persona prefers to progress]
```

**Diretrizes para criacao de personas:**
- Usar nomes reais (nao genericos como "User A")
- Incluir dados concretos baseados nos sinais coletados
- Evitar estereotipos — personas devem refletir dados reais
- Cada persona deve ter pelo menos 3 mecanicas de alta afinidade
- Documentar o "anti-persona" (o que repele esse tipo)

### Step 6: Mechanics-Persona Alignment Matrix
**Agent:** player-profiler + motivation-analyst

Gerar matriz de alinhamento:

| Mechanic | Philanthropist | Socialiser | Free Spirit | Achiever | Player | Disruptor |
|----------|---------------|-----------|-------------|---------|--------|-----------|
| Points | Low | Low | Low | Medium | High | Low |
| Badges | Medium | Medium | Low | High | High | Low |
| Leaderboards | Low | Medium | Low | High | High | Medium |
| Quests | Medium | Medium | High | High | Medium | Medium |
| Streaks | Low | Low | Low | Medium | High | Low |
| Teams/Guilds | High | High | Medium | Medium | Low | Medium |
| Customization | Medium | Medium | High | Low | Low | High |
| Gifting | High | High | Medium | Low | Low | Low |
| Random Rewards | Low | Medium | High | Low | Medium | High |
| Creative Tools | Medium | Low | High | Medium | Low | High |
| Challenges | Medium | Medium | Medium | High | High | High |
| Narratives | High | Medium | High | Medium | Low | Medium |
| Mentoring | High | Medium | Low | Medium | Low | Low |
| Voting/Feedback | High | Medium | Medium | Low | Low | High |
| Exploration | Low | Low | High | Medium | Low | High |
| Collections | Medium | Low | Medium | High | High | Low |

**Para cada celula da matriz, documentar:**
- Nivel de afinidade (High/Medium/Low)
- Justificativa baseada em framework (HEXAD type + Octalysis Core Drive)
- Exemplos concretos de implementacao para o contexto do produto

### Step 7: Segmentation Strategy
**Agent:** player-profiler

Recomendar estrategia de segmentacao:

- **Adaptive:** System detects user type dynamically and adjusts mechanics
- **Onboarding Quiz:** Ask users preferences during onboarding
- **Behavioral:** Track behavior signals and classify after N interactions
- **Hybrid:** Quiz + behavioral adjustment over time

**Avaliacao de cada estrategia:**

| Strategy | Accuracy | Implementation Cost | User Experience | Best For |
|----------|----------|-------------------|-----------------|----------|
| Adaptive | High (over time) | High | Seamless | Products with rich usage data |
| Onboarding Quiz | Medium | Low | Interrupts flow | Products with short first sessions |
| Behavioral | High | Medium | Seamless | Products with diverse interactions |
| Hybrid | Highest | Medium-High | Balanced | Most products (recommended default) |

**Recomendacao padrao: Hybrid**
1. Quick onboarding quiz (3-5 perguntas, <30 segundos)
2. Behavioral tracking nos primeiros 7 dias
3. Reclassificacao automatica a cada 30 dias
4. Opcao para usuario ver/editar seu perfil de jogador

## Output Examples

### hexad-distribution.yaml

```yaml
hexad_distribution:
  sample_size: 5000
  confidence: "medium"
  distribution:
    achiever: 28%
    socialiser: 22%
    player: 18%
    free_spirit: 15%
    philanthropist: 10%
    disruptor: 7%
  dominant_type: achiever
  secondary_type: socialiser
  notes:
    - "High achiever concentration suggests strong response to mastery mechanics"
    - "Socialiser presence supports team-based features"
    - "Low disruptor count reduces need for innovation mechanics"
```

### persona-mechanics-map.yaml

```yaml
persona_mechanics_map:
  - persona: "Carlos the Achiever"
    hexad_primary: achiever
    hexad_secondary: player
    recommended_mechanics:
      high_priority:
        - name: "Skill-based challenges"
          core_drive: CD2
          implementation: "Weekly difficulty-scaling challenges"
        - name: "Mastery badges"
          core_drive: CD2
          implementation: "Badges for completing skill milestones"
      medium_priority:
        - name: "Personal leaderboard"
          core_drive: CD2
          implementation: "Track personal bests over time"
      avoid:
        - name: "Random rewards"
          reason: "Achievers prefer skill-based outcomes"
```

## Post-Conditions

- [ ] Minimo 3 personas criadas (cobrindo 80%+ da base)
- [ ] Matriz persona-mecanicas completa
- [ ] Distribuicao HEXAD estimada documentada
- [ ] Estrategia de segmentacao recomendada
- [ ] Cross-reference com Octalysis validada
- [ ] Sinais comportamentais mapeados para cada tipo
- [ ] Output files gerados nos formatos especificados

## Veto Conditions

Este task possui as seguintes condicoes de veto:

| ID | Condition | Severity | Action |
|----|-----------|----------|--------|
| V-GM-002-01 | Menos de 3 personas criadas | High | BLOCK — Insuficiente para design de mecanicas |
| V-GM-002-02 | Distribuicao HEXAD nao soma 100% | Critical | BLOCK — Dados inconsistentes |
| V-GM-002-03 | Persona sem dados concretos (generica) | High | BLOCK — Refazer com dados reais |
| V-GM-002-04 | Nenhuma mecanica de alta afinidade por persona | High | BLOCK — Alignment matrix incompleta |
| V-GM-002-05 | Tipo HEXAD ignorado na analise | Medium | WARN — Todos os 6 tipos devem ser avaliados |
| V-GM-002-06 | Overjustification risk nao avaliado para Players | High | BLOCK — Risco critico de design |
| V-GM-002-07 | Segmentacao sem plano de implementacao | Medium | WARN — Adicionar detalhes de implementacao |

## Troubleshooting

### Problema: Dados insuficientes para profiling

**Sintoma:** Poucos dados de uso, produto novo, ou amostra pequena.

**Solucao:**
1. Usar dados qualitativos (entrevistas, surveys) como fonte primaria
2. Aplicar distribuicao HEXAD de referencia do dominio como baseline
3. Marcar nivel de confianca como "baixo"
4. Planejar reclassificacao apos 30 dias de dados reais
5. Considerar onboarding quiz como estrategia inicial de segmentacao

### Problema: Tipos HEXAD muito equilibrados

**Sintoma:** Nenhum tipo dominante (distribuicao proxima de 16.6% para cada).

**Solucao:**
1. Verificar se a granularidade dos dados e suficiente
2. Considerar que a base e genuinamente diversa
3. Projetar sistema "buffet" com mecanicas para todos os tipos
4. Priorizar mecanicas que atendam multiplos tipos (ex: quests atendem Achievers e Free Spirits)

### Problema: Conflito entre HEXAD e Octalysis

**Sintoma:** HEXAD sugere tipo X, mas Octalysis Core Drives apontam tipo Y.

**Solucao:**
1. Priorizar dados comportamentais observados
2. Considerar que o usuario pode ter tipo primario e secundario diferentes entre frameworks
3. Documentar a discrepancia e usar como insight (usuario em transicao?)
4. Escalar para gamification-chief se conflito persistir

### Problema: Persona nao se encaixa em nenhum tipo HEXAD puro

**Sintoma:** Segmento de usuarios com sinais de multiplos tipos sem dominancia clara.

**Solucao:**
1. Criar persona "hibrida" com tipo primario e secundario
2. Usar Octalysis como tiebreaker (qual Core Drive domina?)
3. Verificar se o segmento deveria ser dividido em dois
4. Considerar o tipo "Player" como default para usuarios sem sinais claros (pois respondem a mecanicas extrinsecas universais)

## Framework References

- **Marczewski, A.** — *Even Ninja Monkeys Like to Play* (HEXAD User Types)
- **Chou, Y.** — *Actionable Gamification* (Octalysis Framework, 8 Core Drives)
- **Deci, E. & Ryan, R.** — *Self-Determination Theory* (Intrinsic motivation, Autonomy/Competence/Relatedness)
- **Fogg, BJ** — *Tiny Habits* (Behavioral signals and classification)
- **Kim, A.J.** — *Game Thinking* (Player journey mapping and scaffolding)

## Quality Gate

Applies: `GM-QG-002` (Player Profiling Quality Gate)

- [ ] Todos os 6 tipos HEXAD avaliados
- [ ] Personas tem dados concretos (nao genericos)
- [ ] Mecanicas alinhadas com motivacoes reais
- [ ] Distribuicao soma 100%
- [ ] Riscos de churn por persona identificados

## Next Tasks

- `progression-design` — Design systems aligned with persona needs
- `engagement-loop-design` — Hook cycles per persona
- `leaderboard-design` — Social mechanics if Socialisers/Players dominant
- `emotion-mapping` — Emotional experience per persona
