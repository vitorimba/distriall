<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: setup-gamification
  task_name: Setup Gamification
  status: active
  responsible_executor: 'gamification-designer'
  execution_type: Worker
  estimated_time: 30m
  domain: Tactical
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

<!-- SINKRA_CONTRACT:START -->
```yaml
sinkra_contract:
  Domain: Tactical
  atomic_layer: Atom
  executor: Worker
  pre_condition: "inputs e dependencias resolvidos antes de iniciar."
  post_condition: "output principal gerado e pronto para handoff."
  performance: "executar dentro do SLA, registrar erro e escalar sem falha silenciosa."
```
<!-- SINKRA_CONTRACT:END -->

---

## Execution Modes

**Escolha o modo de execucao:**

### 1. YOLO Mode - Rapido, Autonomo (0-1 prompts)
- Configura sistema de gamificacao padrao completo
- **Melhor para:** Coaches que querem implementar rapidamente o padrao

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints em cada core drive e mecanica
- Explica principios de gamificacao ao coach
- **Melhor para:** Coaches que querem entender e personalizar o sistema

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Design thinking completo antes de implementar
- Testa hipoteses de engajamento
- **Melhor para:** Coaches com base grande de clientes, lancamento de comunidade

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: setupGamification()
id: FC-TASK-007
responsavel: gamification-designer
responsavel_type: Agent
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism

advisors:
  - gamification-designer (Yu-kai Chou) — Octalysis Framework, 8 Core Drives
  - retention-engineer (Nir Eyal) — Hook Model, habit loops, variable rewards

**Entrada:**
- campo: coach_profile
  tipo: object
  origem: Coach profile / business-diagnostic
  obrigatorio: true
  validacao: Must contain niche, client_count, engagement_goals

- campo: client_personas
  tipo: array[object]
  origem: Client data / Coach input
  obrigatorio: true
  validacao: Must contain at least 1 persona with demographics and motivations

- campo: existing_systems
  tipo: object
  origem: Coach input
  obrigatorio: false
  validacao: Current engagement/reward systems in place (if any)

- campo: engagement_goals
  tipo: array[string]
  origem: Coach input
  obrigatorio: true
  validacao: |
    What the coach wants to achieve: adherence, retention, community,
    referrals, upsell, content_engagement

- campo: budget_constraint
  tipo: enum [free, low, medium, premium]
  origem: Coach input
  obrigatorio: false
  validacao: Affects complexity and tools recommended

**Saida:**
- campo: gamification_blueprint
  tipo: object
  destino: Data Store (coach/gamification/blueprint.json)
  persistido: true

- campo: achievement_system
  tipo: object
  destino: Data Store (coach/gamification/achievements.json)
  persistido: true

- campo: challenge_library
  tipo: array[object]
  destino: Data Store (coach/gamification/challenges.json)
  persistido: true

- campo: hook_model_design
  tipo: object
  destino: Data Store (coach/gamification/hooks.json)
  persistido: true

- campo: leaderboard_config
  tipo: object
  destino: Data Store (coach/gamification/leaderboard.json)
  persistido: true

- campo: implementation_guide
  tipo: markdown
  destino: Data Store (coach/gamification/implementation-guide.md)
  persistido: true
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Pelo menos 5 clientes ativos para justificar sistema de gamificacao
    tipo: pre-condition
    blocker: false
    validacao: |
      Verificar que coach tem clientes suficientes para dinamicas de grupo
    error_message: "Warning: Menos de 5 clientes, gamificacao sera limitada a individual"

  - [ ] Objetivos de engajamento definidos
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que engagement_goals esta definido com pelo menos 1 objetivo
    error_message: "Pre-condition failed: Objetivos de engajamento nao definidos"

  - [ ] Canal de comunicacao com clientes ativo
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que existe canal para comunicar gamificacao aos clientes
    error_message: "Pre-condition failed: Canal de comunicacao nao configurado"
```

---

## Post-Conditions

```yaml
post-conditions:
  - [ ] Blueprint de gamificacao completo com 8 core drives mapeados
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que gamification_blueprint cobre todos os 8 core drives do Octalysis
    error_message: "Post-condition failed: Blueprint incompleto"

  - [ ] Sistema de achievements configurado com pelo menos 20 badges
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que achievement_system contem minimo 20 achievements definidos
    error_message: "Post-condition failed: Achievements insuficientes"

  - [ ] Hook Model desenhado com todos os 4 componentes
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que hook_model_design contem trigger, action, variable_reward, investment
    error_message: "Post-condition failed: Hook Model incompleto"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Octalysis Framework aplicado com score por core drive
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada core drive tem score 0-10 e mecanicas associadas
    error_message: "AC-1 nao atendido: Octalysis nao aplicado completamente"

  - [ ] AC-2: Sistema de achievements cobrindo jornada completa do aluno
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que achievements cobrem: onboarding, treino, dieta, progresso, social
    error_message: "AC-2 nao atendido: Achievements nao cobrem jornada completa"

  - [ ] AC-3: Hook Model desenhado para engagement diario
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que hook model tem ciclo completo para uso diario
    error_message: "AC-3 nao atendido: Hook Model sem ciclo diario"

  - [ ] AC-4: Challenges e competitions desenhados para comunidade
    tipo: acceptance-criterion
    blocker: false
    validacao: |
      Assert que challenge_library contem pelo menos 10 challenges variados
    error_message: "AC-4 nao atendido: Challenges insuficientes"

  - [ ] AC-5: Guia de implementacao pratico e acionavel
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que implementation_guide contem steps claros com timeline
    error_message: "AC-5 nao atendido: Guia de implementacao ausente"
```

---

## Tools

- **Tool:** gamification-engine
  - **Purpose:** Motor de pontos, badges, streaks, leaderboard
  - **Source:** squads/fitcoach/tools/gamification-engine

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Entender Contexto e Personas

- Carregar perfil do coach e dados de clientes
- Identificar personas de clientes (motivacoes, dores, comportamentos)
- Mapear sistemas de engajamento existentes
- Definir objetivos de gamificacao priorizados

```yaml
step_0:
  name: "Entender Contexto e Personas"
  executor: gamification-designer
  duration_expected: "5-10 min"
  persona_mapping:
    per_persona:
      - name: "Nome da persona"
      - demographics: "Idade, genero, experiencia"
      - motivation: "O que a move a treinar"
      - pain_points: "Dificuldades de aderencia"
      - reward_preference: "Que tipo de recompensa valoriza"
      - social_orientation: "Competitivo, colaborativo, independente"
  output: context_and_personas
```

### Step 1: Aplicar Octalysis Framework (Yu-kai Chou)

#### 1.1 Mapear 8 Core Drives para Fitness

Consultar gamification-designer (Yu-kai Chou) para aplicar Octalysis:

**Core Drive 1: Epic Meaning & Calling**
- "Voce esta fazendo algo maior que voce mesmo"
- Aplicacao Fitness:
  - Narrativa de transformacao pessoal
  - "Cada treino te aproxima da melhor versao de voce"
  - Comunidade com proposito compartilhado
  - Ranking como "atleta" nao apenas "aluno"
- Mecanicas: Narrativa de heroi, missao pessoal, proposito da comunidade

**Core Drive 2: Development & Accomplishment**
- "Sensacao de progresso e maestria"
- Aplicacao Fitness:
  - XP por treino completado, dieta seguida, check-in feito
  - Niveis de progressao: Novato → Guerreiro → Elite → Lenda
  - Badges por milestones (primeiro PR, 10kg perdidos, 100 treinos)
  - Barras de progresso para objetivos SMART
- Mecanicas: XP, niveis, badges, barras de progresso, leaderboard

**Core Drive 3: Empowerment of Creativity & Feedback**
- "Liberdade para experimentar e ver resultados"
- Aplicacao Fitness:
  - Escolher exercicios alternativos dentro do plano
  - Experimentar novas receitas e registrar favoritas
  - Feedback imediato de progresso (app/dashboard)
  - Personalizar perfil e avatar
- Mecanicas: Escolhas dentro do plano, feedback em tempo real, personalizacao

**Core Drive 4: Ownership & Possession**
- "Sentimento de propriedade sobre seu progresso"
- Aplicacao Fitness:
  - Portfolio de progresso (fotos, medidas, PRs ao longo do tempo)
  - Colecao de badges e achievements visivel
  - "Meu plano" personalizado
  - Streak records (meus recorde de consistencia)
- Mecanicas: Portfolio, colecao, propriedade do plano, historico

**Core Drive 5: Social Influence & Relatedness**
- "Conexao social, competicao e colaboracao"
- Aplicacao Fitness:
  - Leaderboard semanal (pontos, streaks, PRs)
  - Challenges em grupo (equipes competindo)
  - Mentoria entre alunos (avancados ajudam iniciantes)
  - Compartilhamento de conquistas
  - "Workout buddy" virtual
- Mecanicas: Leaderboard, challenges em grupo, social sharing, mentoria

**Core Drive 6: Scarcity & Impatience**
- "Querer algo que nao pode ter agora"
- Aplicacao Fitness:
  - Badges exclusivos por tempo limitado (challenge de verao)
  - Nivel desbloqueavel apos X semanas de consistencia
  - Acesso a conteudo premium apos atingir nivel
  - "Early access" para novos programas para top performers
- Mecanicas: Tempo limitado, desbloqueavel, exclusividade

**Core Drive 7: Unpredictability & Curiosity**
- "Nao saber o que vem a seguir"
- Aplicacao Fitness:
  - "Mystery challenge" semanal
  - Recompensas aleatorias por check-in (variable reward)
  - "Surprise workout" — treino especial desbloqueado aleatoriamente
  - Easter eggs escondidos em achievements
- Mecanicas: Mystery box, variable reward, surpresas, easter eggs

**Core Drive 8: Loss & Avoidance**
- "Medo de perder o que conquistou"
- Aplicacao Fitness:
  - Streak freeze (pode perder 1 dia sem quebrar streak — limitado)
  - Decaimento de pontos se inativo por 2+ semanas
  - "Badge em risco" — se nao manter performance, perde
  - Countdown para deadline de challenge
- Mecanicas: Streaks com risco, decaimento, deadlines, FOMO

```yaml
step_1_1:
  name: "Octalysis Framework (Yu-kai Chou)"
  executor: gamification-designer
  advisor: gamification-designer
  duration_expected: "20-30 min"
  per_core_drive:
    - drive_number: 1
    - drive_name: "Epic Meaning & Calling"
    - relevance_score: "[0-10]"
    - fitness_mechanics:
        - name: "Nome da mecanica"
        - description: "Como funciona"
        - implementation: "low|medium|high effort"
        - priority: "essential|important|nice_to_have"
  output: octalysis_design
```

### Step 2: Aplicar Hook Model (Nir Eyal)

#### 2.1 Desenhar Habit Loops para Fitness

Consultar retention-engineer (Nir Eyal) para desenhar hooks de engajamento:

**Hook 1: Check-in Diario de Treino**
- **Trigger (Externo):** Push notification "Hora do treino" no horario habitual
- **Trigger (Interno):** Culpa/ansiedade de quebrar streak
- **Action:** Abrir app/mensagem → Confirmar que treinou → Registrar carga
- **Variable Reward:**
  - Tipo Social: "Voce esta no top 5 da semana!"
  - Tipo Conquista: "Novo badge desbloqueado: Guerreiro de Ferro"
  - Tipo Material: "Sorteio semanal entre quem completou todos os treinos"
- **Investment:** Registrar RPE, notas, emojis → aumenta dados do perfil

**Hook 2: Check-in de Dieta/Refeicao**
- **Trigger (Externo):** Lembrete de refeicao no horario programado
- **Trigger (Interno):** Habito de registrar alimentacao
- **Action:** Marcar refeicao como "dentro do plano" ou registrar variacao
- **Variable Reward:**
  - "Streak de dieta: 14 dias consecutivos!"
  - "Badge: Mestre da Nutricao (30 dias de aderencia)"
  - "Desconto de 10% na proxima compra de suplemento"
- **Investment:** Adicionar foto da refeicao, avaliar sabor, sugerir substituicao

**Hook 3: Check-in Semanal**
- **Trigger (Externo):** Formulario automatico no dia configurado
- **Trigger (Interno):** Curiosidade de ver progresso semanal
- **Action:** Preencher check-in (peso, fotos, aderencia, humor)
- **Variable Reward:**
  - Report personalizado com insights
  - "Comparativo de fotos — voce esta evoluindo!"
  - XP bonus por check-in completo com fotos
- **Investment:** Dados contribuem para analise de tendencia e ajuste de protocolo

**Hook 4: Interacao Comunitaria**
- **Trigger (Externo):** Notificacao de novo challenge ou post de colega
- **Trigger (Interno):** Desejo de conexao e reconhecimento
- **Action:** Participar de challenge, comentar, dar like, compartilhar conquista
- **Variable Reward:**
  - "3 colegas curtiram seu PR de supino!"
  - "Voce subiu para 2o lugar no challenge da semana!"
  - "Badge exclusivo: Social Butterfly"
- **Investment:** Contribuir com conteudo, ajudar colegas, construir reputacao

```yaml
step_2_1:
  name: "Hook Model (Nir Eyal)"
  executor: gamification-designer
  advisor: retention-engineer
  duration_expected: "15-20 min"
  per_hook:
    - hook_name: "Nome do hook"
    - frequency: "daily|weekly|event_based"
    - trigger_external: "Descricao do trigger externo"
    - trigger_internal: "Descricao do trigger interno"
    - action: "O que o usuario faz"
    - action_difficulty: "very_easy|easy|medium"
    - variable_rewards:
        - type: "social|achievement|material"
        - description: "Descricao da recompensa"
        - probability: "always|frequent|rare"
    - investment: "O que o usuario contribui de volta"
  output: hook_model_design
```

### Step 3: Criar Sistema de Achievements

#### 3.1 Biblioteca de Badges e Conquistas

Criar pelo menos 30 achievements organizados por categoria:

**Categoria: Onboarding (5 badges)**
- Primeiro Passo: Completou anamnese
- Plano Ativado: Recebeu primeiro plano de treino
- Primeira Sessao: Completou primeiro treino
- Primeira Refeicao: Registrou primeira refeicao
- Setup Completo: Completou todo o onboarding

**Categoria: Treino (8 badges)**
- Iron Warrior: 10 treinos completados
- Century Club: 100 treinos completados
- PR Hunter: Primeiro personal record
- PR Legend: 10 personal records
- Volume King: Maior volume semanal
- Consistency Machine: 4 semanas sem faltar treino
- Iron Marathon: 12 meses treinando sem parar
- Beast Mode: Completou treino RIR 0 em todos os exercicios

**Categoria: Nutricao (6 badges)**
- Macro Master: 7 dias batendo macros (5% margem)
- Meal Prep Pro: Registrou 30 dias de refeicoes
- Clean Eating: 30 dias com 80%+ alimentos integrais
- Hydration Hero: 30 dias de hidratacao adequada
- Cooking Ninja: Compartilhou 10 receitas no grupo
- Diet Discipline: 90 dias de aderencia > 85%

**Categoria: Progresso (6 badges)**
- First Blood: Primeira mudanca visivel nas fotos
- Transformation: Progresso evidente em 12 semanas
- Weight Milestone: Atingiu peso-alvo intermediario
- Body Recomp: Reduziu BF% mantendo ou ganhando peso
- Stage Ready: Atingiu condicao de competicao
- Goal Achieved: Completou objetivo SMART principal

**Categoria: Social (5 badges)**
- Social Butterfly: Interagiu com 10 colegas
- Mentor: Ajudou 3 iniciantes com dicas
- Challenge Champion: Venceu challenge em grupo
- Referral King: Indicou 3 novos clientes
- Community Leader: Mais ativo do mes no grupo

```yaml
step_3_1:
  name: "Sistema de Achievements"
  executor: gamification-designer
  duration_expected: "15-20 min"
  per_achievement:
    - id: "FC-ACH-001"
    - name: "Nome do badge"
    - category: "onboarding|training|nutrition|progress|social"
    - description: "O que precisa fazer para ganhar"
    - icon: "Descricao do icone/emoji"
    - rarity: "common|uncommon|rare|epic|legendary"
    - xp_reward: 50-500
    - condition: "Condicao programatica para desbloquear"
    - visible: true  # ou hidden (easter egg)
  output: achievement_system
```

### Step 4: Criar Challenges e Competitions

#### 4.1 Biblioteca de Challenges

Criar pelo menos 12 challenges variados:

**Challenges Individuais:**
- 30-Day Streak: 30 dias sem faltar treino
- Macro Precision: 7 dias batendo macros com < 3% erro
- Step Challenge: 10.000 passos/dia por 14 dias
- Sleep Challenge: 7-9h de sono por 21 dias
- Water Challenge: 3L+ agua por 30 dias

**Challenges em Grupo:**
- Team Tonnage: Equipe com maior volume total na semana
- Transformation Challenge: Maior evolucao em 8 semanas (fotos)
- Consistency Battle: Equipe com maior aderencia media
- PR Race: Qual equipe bate mais PRs em 4 semanas
- Knowledge Quiz: Quiz semanal sobre treino/nutricao

**Challenges Sazonais:**
- Summer Shred: Challenge de cutting de 8 semanas antes do verao
- New Year Resolution: Janeiro de aderencia maxima

```yaml
step_4_1:
  name: "Biblioteca de Challenges"
  executor: gamification-designer
  duration_expected: "10-15 min"
  per_challenge:
    - id: "FC-CHL-001"
    - name: "Nome do challenge"
    - type: "individual|team|seasonal"
    - duration: "7|14|21|30|60 days"
    - description: "Regras do challenge"
    - metric: "O que e medido"
    - reward: "Pontos, badge, premio"
    - min_participants: 1
    - max_participants: null
    - recurrence: "one_time|monthly|quarterly|seasonal"
  output: challenge_library
```

### Step 5: Configurar Streaks e Leaderboard

#### 5.1 Sistema de Streaks

- **Training Streak:** Dias consecutivos de treino (respeita rest days programados)
- **Diet Streak:** Dias consecutivos de aderencia > 80%
- **Check-in Streak:** Semanas consecutivas com check-in enviado
- **Combined Streak:** Dias com treino + dieta em dia

**Streak Mechanics:**
- Streak freeze: 1 uso por semana (nao quebra streak se faltar 1 dia)
- Streak milestones: 7, 14, 30, 60, 90, 180, 365 dias
- Streak reset: Perde streak mas mantem "best streak" como record

#### 5.2 Leaderboard

- **Semanal:** Pontos totais da semana (reset toda segunda)
- **Mensal:** Pontos acumulados no mes
- **All-time:** Ranking geral desde o inicio
- **Por Categoria:** Treino, Dieta, Social, Challenges

**Regras do Leaderboard:**
- Agrupamento por nivel de experiencia (para fairness)
- Top 3 recebem badge e reconhecimento
- Ultimo lugar nunca e exposto publicamente (evitar desmotivacao)

```yaml
step_5:
  name: "Streaks e Leaderboard"
  executor: gamification-designer
  tool: gamification-engine
  duration_expected: "8-12 min"
  streaks:
    types: [training, diet, checkin, combined]
    freeze_per_week: 1
    milestones: [7, 14, 30, 60, 90, 180, 365]
    decay: "after 14 days inactive, streak history preserved but active streak = 0"
  leaderboard:
    periods: [weekly, monthly, all_time]
    categories: [training, nutrition, social, challenges, overall]
    display: "top 10 only, user always sees their position"
    grouping: "by experience level"
  output: leaderboard_config
```

### Step 6: Gerar Guia de Implementacao

#### 6.1 Compilar Blueprint e Guia

Gerar documento completo para implementacao:

**Fases de Implementacao:**

**Fase 1 — Fundacao (Semana 1-2):**
- Configurar pontos e XP
- Criar primeiros 10 achievements (onboarding + basicos)
- Implementar streaks de treino e dieta
- Comunicar sistema aos clientes atuais

**Fase 2 — Engajamento (Semana 3-4):**
- Ativar leaderboard semanal
- Lancar primeiro challenge
- Implementar hooks diarios (notificacoes + recompensas)
- Coletar feedback dos clientes

**Fase 3 — Comunidade (Semana 5-8):**
- Ativar challenges em grupo
- Implementar sistema social (compartilhamento, likes)
- Adicionar achievements sociais
- Lancar programa de mentoria

**Fase 4 — Otimizacao (Semana 9-12):**
- Analisar dados de engajamento
- Ajustar dificuldade e recompensas
- Adicionar achievements avancados
- Implementar elementos de escassez e FOMO

```yaml
step_6_1:
  name: "Guia de Implementacao"
  executor: gamification-designer
  duration_expected: "10-15 min"
  phases:
    foundation:
      duration: "2 weeks"
      tasks: ["XP system", "basic achievements", "streaks", "client comm"]
    engagement:
      duration: "2 weeks"
      tasks: ["leaderboard", "first challenge", "daily hooks", "feedback"]
    community:
      duration: "4 weeks"
      tasks: ["group challenges", "social features", "mentorship"]
    optimization:
      duration: "4 weeks"
      tasks: ["analytics", "tuning", "advanced features", "scarcity"]
  output: implementation_guide
```

---

## Error Handling

**Strategy:** simplify + iterate

**Common Errors:**

1. **Error:** Base de Clientes Muito Pequena para Leaderboard
   - **Cause:** Menos de 5 clientes ativos
   - **Resolution:** Focar em gamificacao individual, desativar leaderboard
   - **Recovery:** Ativar leaderboard quando atingir 5+ clientes

2. **Error:** Engajamento Baixo com Sistema de Pontos
   - **Cause:** Recompensas nao sao percebidas como valiosas
   - **Resolution:** Pesquisar clientes sobre preferencias de recompensa
   - **Recovery:** Ajustar tipos de recompensa (mais social, mais tangivel)

3. **Error:** Gamificacao Gerando Comportamento Negativo
   - **Cause:** Competicao excessiva ou comparacao destrutiva
   - **Resolution:** Reduzir elementos competitivos, aumentar colaborativos
   - **Recovery:** Implementar agrupamento por nivel, focar em melhoria pessoal

4. **Error:** Overcomplication — Sistema Muito Complexo
   - **Cause:** Muitas mecanicas implementadas ao mesmo tempo
   - **Resolution:** Simplificar para core mechanics (XP + streaks + badges)
   - **Recovery:** Adicionar complexidade gradualmente baseado em adocao

---

## Performance

```yaml
duration_expected: "60-90 min (design completo)"
cost_estimated: "$0.03-0.08"
token_usage: "~10,000-25,000 tokens"
advisor_consultations: 2 (Yu-kai Chou, Nir Eyal)
```

---

## Metadata

```yaml
task_id: FC-TASK-007
name: setup-gamification
version: 1.0.0
squad: fitcoach
dependencies:
  - gamification-designer (advisor — Yu-kai Chou)
  - retention-engineer (advisor — Nir Eyal)
  - gamification-engine (tool)
tags:
  - gamification
  - engagement
  - retention
  - octalysis
  - hook-model
  - community
updated_at: 2026-03-11
```

---

## Handoff

```yaml
next_task:
  integration:
    workflow: "full-client-journey Phase 6 (GAMIFICATION)"
    condition: "Sistema de gamificacao configurado e pronto"
  business:
    workflow: "business-scaling Phase 5 (GAMIFICATION)"
    condition: "Gamificacao como parte da estrategia de scaling"
  weekly:
    task: "weekly-checkin"
    integration: "Gamification points processed during check-in"
```
