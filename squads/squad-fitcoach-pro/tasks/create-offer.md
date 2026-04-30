<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: create-offer
  task_name: Create Offer
  status: active
  responsible_executor: 'gym-scaler + gym-operator + coach approval'
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
- Gera oferta premium completa usando dados do diagnostic
- **Melhor para:** Coaches com business-diagnostic recente e dados completos

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints em cada etapa da Value Equation e pricing
- Explica frameworks de Hormozi ao coach
- **Melhor para:** Primeiro design de oferta, coaches sem experiencia em precificacao premium

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Analise profunda de mercado, concorrencia e posicionamento antes de criar oferta
- **Melhor para:** Coaches em mercado competitivo ou reposicionamento de marca

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: createOffer()
id: FC-TASK-009
responsavel: gym-scaler + gym-operator + coach approval
responsavel_type: Hybrid
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism

advisors:
  - gym-scaler (Alex Hormozi) — Value Equation, Grand Slam Offer, pricing psychology, lead magnets
  - gym-operator (Chris Cooper) — ARM target, unit economics, operacao sustentavel

**Entrada:**
- campo: current_pricing
  tipo: object
  origem: Coach Input ou business-diagnostic
  obrigatorio: true
  validacao: |
    Must contain: price_per_client, payment_model (monthly|quarterly|annual),
    what_is_included (list of services), discounts_offered

- campo: services_offered
  tipo: array[object]
  origem: Coach Input
  obrigatorio: true
  validacao: |
    Must contain at least 1 service with: name, description, delivery_method,
    time_investment_per_client, perceived_value

- campo: client_avatar
  tipo: object
  origem: Coach Input ou business-diagnostic
  obrigatorio: true
  validacao: |
    Must contain: demographics (age, gender, income_range),
    psychographics (motivations, fears, desires, objections),
    current_state (where they are), desired_state (where they want to be)

- campo: competition_analysis
  tipo: object
  origem: Coach Input ou research
  obrigatorio: true
  validacao: |
    Must contain: top_3_competitors (name, price, offer_description),
    market_positioning, gaps_identified

- campo: diagnostic_data
  tipo: object
  origem: business-diagnostic output
  obrigatorio: false
  validacao: |
    If available: business_health_score, value_equation_analysis,
    offer_analysis, core_metrics (ARM, LEG, churn, LTV)

**Saida:**
- campo: offer_document
  tipo: markdown
  destino: Data Store (coach/offers/{date}-offer.md)
  persistido: true

- campo: pricing_structure
  tipo: object
  destino: Data Store (coach/offers/{date}-pricing.json)
  persistido: true

- campo: sales_page_structure
  tipo: markdown
  destino: Data Store (coach/offers/{date}-sales-page.md)
  persistido: true

- campo: offer_score
  tipo: object
  destino: Data Store (coach/offers/{date}-score.json)
  persistido: true

- campo: unit_economics
  tipo: object
  destino: Data Store (coach/offers/{date}-economics.json)
  persistido: true
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] business-diagnostic completado e disponivel
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que diagnostic_report e business_health_score existem
      no data store do coach
    error_message: "Pre-condition failed: business-diagnostic nao completado. Execute FC-TASK-006 primeiro."

  - [ ] Coach tem pelo menos 3 clientes ativos (prova social minima)
    tipo: pre-condition
    blocker: false
    validacao: |
      Verificar numero de clientes ativos no diagnostic
    error_message: "Warning: Menos de 3 clientes ativos. Prova social sera limitada na oferta."

  - [ ] Coach disposto a reestruturar precificacao
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que coach entende e aceita potencial mudanca de preco/modelo
    error_message: "Pre-condition failed: Coach nao autorizou reestruturacao de oferta"

  - [ ] Dados de pelo menos 3 concorrentes coletados
    tipo: pre-condition
    blocker: false
    validacao: |
      Verificar que competition_analysis contem pelo menos 3 entradas
    error_message: "Warning: Analise competitiva incompleta. Posicionamento sera menos preciso."
```

---

## Post-Conditions

```yaml
post-conditions:
  - [ ] Offer document completo com todos os componentes da Grand Slam Offer
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que offer_document contem: core offer, bonus stack,
      guarantee, scarcity, urgency, naming
    error_message: "Post-condition failed: Offer document incompleto"

  - [ ] Pricing structure com pelo menos 3 tiers definidos
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que pricing_structure contem entry, standard, premium tiers
      com precos e composicao
    error_message: "Post-condition failed: Pricing structure incompleto"

  - [ ] Unit economics positivas para todos os tiers
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que margem > 50% em todos os tiers e LTV/CAC >= 3x
    error_message: "Post-condition failed: Unit economics negativas em algum tier"

  - [ ] Offer score >= 8/10 na Value Equation audit
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que offer_score.value_equation_composite >= 8.0
    error_message: "Post-condition failed: Offer score abaixo de 8/10"

  - [ ] Sales page structure completa e pronta para implementacao
    tipo: post-condition
    blocker: false
    validacao: |
      Verificar que sales_page_structure contem todas as secoes essenciais
    error_message: "Warning: Sales page incompleta. Pode ser finalizada posteriormente."
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Value Equation aplicada com score >= 8 em cada componente
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que dream_outcome, perceived_likelihood >= 8
      Assert que time_delay, effort_sacrifice <= 3 (invertidos)
      Assert que composite score >= 8.0
    error_message: "AC-1 nao atendido: Value Equation score insuficiente"

  - [ ] AC-2: Grand Slam Offer com pelo menos 5 bonus no stack
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que bonus_stack contem >= 5 bonus com valor percebido calculado
    error_message: "AC-2 nao atendido: Bonus stack insuficiente"

  - [ ] AC-3: Pricing tiers com ancoragem e decoy implementados
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que existem >= 3 tiers com anchor price, decoy positioning,
      e premium tier definidos
    error_message: "AC-3 nao atendido: Pricing tiers incompletos"

  - [ ] AC-4: ARM target >= R$500 no tier padrao (Cooper benchmark BR)
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que tier standard gera ARM >= R$500/mes
    error_message: "AC-4 nao atendido: ARM abaixo do target Cooper para mercado BR"

  - [ ] AC-5: Naming focado em transformacao, nao em servico
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que nome da oferta comunica resultado/transformacao
      e nao lista servicos ("Programa X" vs "Consultoria Online")
    error_message: "AC-5 nao atendido: Naming focado em servico, nao em transformacao"

  - [ ] AC-6: Garantia que reverte risco do cliente definida
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que guarantee esta definida com tipo, prazo e condicoes
    error_message: "AC-6 nao atendido: Garantia nao definida"

  - [ ] AC-7: Unit economics documentadas com margem, LTV, CAC projetados
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que unit_economics contem margin, ltv, cac, ltv_cac_ratio,
      break_even_clients para cada tier
    error_message: "AC-7 nao atendido: Unit economics incompletas"
```

---

## Tools

- **Tool:** macro-calculator
  - **Purpose:** Calculos financeiros de unit economics (margem, LTV, CAC, ROI)
  - **Source:** squads/fitcoach/tools/macro-calculator (modo business)

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 1: Audit da Oferta Atual

Avaliar a oferta atual do coach em profundidade — o que esta incluido, como e apresentado, e como o mercado percebe o valor.

#### 1.1 Mapeamento da Oferta Existente

- Listar todos os servicos/produtos incluidos
- Documentar como a oferta e apresentada (nome, descricao, pitch)
- Identificar o que o coach entrega vs o que o cliente percebe
- Mapear a jornada de compra atual do cliente

**Exemplo Concreto — Carlos Salvador (Coach Online de Bodybuilding):**

| Aspecto | Situacao Atual |
|---------|---------------|
| **Nome da oferta** | "Consultoria Online Personalizada" |
| **Preco** | R$297/mes |
| **Inclui** | Plano de treino + dieta + suporte por WhatsApp |
| **Apresentacao** | Post no Instagram com lista de itens |
| **Garantia** | Nenhuma |
| **Bonus** | Nenhum |
| **Escassez** | Nenhuma |
| **Resultado prometido** | Vago — "alcance seus objetivos" |

#### 1.2 Analise de Percepcao de Valor

- Quanto o cliente acha que vale? (valor percebido atual)
- Quanto o coach acha que vale? (value gap)
- Quanto o mercado cobra por algo similar?
- Qual o "ceiling price" que o avatar aceita pagar?

```yaml
step_1:
  name: "Audit da Oferta Atual"
  executor: gym-scaler
  advisor: gym-operator
  duration_expected: "15-20 min"
  analysis:
    current_offer:
      name: "Nome atual da oferta"
      price: "R$ preco atual"
      components: ["Lista de tudo que esta incluido"]
      presentation: "Como e apresentada ao prospect"
      perceived_value: "R$ valor percebido pelo cliente"
      actual_cost: "R$ custo real para entregar"
    gaps:
      naming: "Nome comunica servico ou transformacao?"
      value_perception: "Gap entre custo e valor percebido"
      differentiation: "O que diferencia dos concorrentes?"
      risk_reversal: "Existe garantia?"
      urgency: "Existe motivo para agir agora?"
  output: offer_audit
```

---

### Step 2: Aplicar Value Equation de Hormozi

A equacao central do livro "$100M Offers" de Alex Hormozi. Cada componente e trabalhado para maximizar o valor percebido da oferta.

#### 2.1 Formula da Value Equation

```
             Dream Outcome  x  Perceived Likelihood of Achievement
Value  =  ─────────────────────────────────────────────────────────
                   Time Delay  x  Effort & Sacrifice
```

**Objetivo:** Maximizar numerador (Dream Outcome e Perceived Likelihood) e minimizar denominador (Time Delay e Effort).

#### 2.2 Componente 1: Dream Outcome (Resultado dos Sonhos)

O que o cliente REALMENTE quer? Nao e "ficar forte" — e o que "ficar forte" SIGNIFICA para ele.

**Niveis de Dream Outcome para Fitness:**

| Nivel | Descricao | Exemplo |
|-------|-----------|---------|
| **Superficial** | O que dizem | "Quero perder peso" |
| **Funcional** | O que precisam | "Quero caber na roupa antiga" |
| **Emocional** | O que sentem | "Quero me sentir confiante sem camisa" |
| **Identitario** | Quem querem ser | "Quero ser alguem que se cuida e inspira outros" |

**Regra Hormozi:** Venda o nivel EMOCIONAL e IDENTITARIO, nao o superficial.

**Exemplo Carlos Salvador:**
- Antes: "Consultoria para ganho de massa muscular"
- Depois: "Construa o fisico que faz voce andar com a cabeca erguida em qualquer lugar"

**Score Target:** >= 8/10

**Taticas para aumentar Dream Outcome:**
- Pesquisar linguagem exata do avatar (Instagram comments, formularios)
- Usar "dream state" language no copy e naming
- Mostrar transformacoes que vao alem do fisico (confianca, disciplina, energia)
- Criar "future self" visualization no material de vendas

```yaml
step_2_2:
  name: "Dream Outcome Maximization"
  executor: gym-scaler
  duration_expected: "10-15 min"
  analysis:
    current_dream_outcome:
      description: "Como o coach descreve o resultado hoje"
      score: "[1-10]"
    improved_dream_outcome:
      description: "Resultado reposicionado no nivel emocional/identitario"
      score_target: "8-10"
    language_mapping:
      superficial: "O que o avatar diz querer"
      functional: "O que realmente precisa"
      emotional: "Como quer se sentir"
      identity: "Quem quer se tornar"
    copy_examples:
      headline: "Frase principal da oferta"
      subheadline: "Apoio ao headline"
  output: dream_outcome_design
```

#### 2.3 Componente 2: Perceived Likelihood of Achievement (Certeza de Resultado)

O quanto o cliente ACREDITA que vai funcionar para ELE especificamente.

**Boosters de Perceived Likelihood:**

| Booster | Descricao | Impacto |
|---------|-----------|---------|
| **Before/After** | Fotos reais de transformacao | ALTO |
| **Depoimentos** | Historias de clientes com detalhes | ALTO |
| **Credenciais** | Formacao, certificacoes, experiencia | MEDIO |
| **Metodologia** | Explicar o "como" de forma clara | MEDIO |
| **Garantia** | "Se nao funcionar, devolvo seu dinheiro" | MUITO ALTO |
| **Numeros** | "347 clientes transformados em 3 anos" | ALTO |
| **Especificidade** | Resultado com timeline e metricas | ALTO |
| **Social Proof** | Grupo ativo, comunidade engajada | MEDIO |

**Exemplo Carlos Salvador:**
- Antes: "Consultoria personalizada por profissional qualificado"
- Depois: "Metodologia testada em 87 alunos com 94% atingindo objetivo em 12 semanas. Garantia de resultado de 90 dias."

**Score Target:** >= 8/10

```yaml
step_2_3:
  name: "Perceived Likelihood Maximization"
  executor: gym-scaler
  duration_expected: "10-15 min"
  current_likelihood:
    score: "[1-10]"
    existing_proof: "Provas sociais existentes"
  boosters_to_implement:
    - type: "before_after"
      current: "Quantas transformacoes documentadas?"
      action: "Coletar e organizar X before/after"
    - type: "testimonials"
      current: "Quantos depoimentos estruturados?"
      action: "Gravar X depoimentos em video com estrutura STAR"
    - type: "guarantee"
      current: "Existe garantia?"
      action: "Implementar garantia de X dias"
    - type: "specificity"
      current: "Resultado prometido e especifico?"
      action: "Definir resultado com timeline e metricas"
  improved_likelihood:
    score_target: "8-10"
  output: likelihood_design
```

#### 2.4 Componente 3: Time Delay (Reducao do Tempo para Resultado)

Quanto MENOS tempo o cliente espera para ver resultados, MAIS valor percebe.

**Estrategias de Reducao de Time Delay:**

| Estrategia | Implementacao | Timeline |
|-----------|---------------|----------|
| **Quick Wins** | Ajuste de hidratacao, sono, proteina no dia 1 | 24-72h |
| **Primeiras Mudancas** | Desinchar, energia, disposicao | 7-14 dias |
| **Resultados Visiveis** | Roupa mais solta, complimentos | 4-6 semanas |
| **Transformacao Evidente** | Before/after significativo | 8-12 semanas |
| **Dashboard de Progresso** | Visualizar metricas em tempo real | Imediato |
| **Check-ins Frequentes** | Senso de progresso constante | Semanal |
| **Fotos Comparativas** | Evidencia visual de mudanca | Quinzenal |

**Exemplo Carlos Salvador:**
- Antes: "Resultados em 6-12 meses" (vago, longo)
- Depois: "Primeiras mudancas em 7 dias. Resultado visivel em 4 semanas. Transformacao completa em 12 semanas."

**Score Target:** <= 3/10 (invertido — menor delay = melhor)

```yaml
step_2_4:
  name: "Time Delay Minimization"
  executor: gym-scaler
  duration_expected: "8-12 min"
  current_time_delay:
    score: "[1-10 invertido]"
    timeline_communicated: "O que o coach promete hoje"
  quick_wins:
    day_1: "O que o cliente pode mudar HOJE"
    week_1: "Primeiros resultados tangiveis"
    week_4: "Milestone significativo"
    week_12: "Transformacao completa"
  reducers:
    - "Dashboard em tempo real com metricas de progresso"
    - "Check-ins semanais com comparativo visual"
    - "Fotos quinzenais com analise IA"
    - "Celebracao automatica de cada milestone"
  improved_time_delay:
    score_target: "2-3"
  output: time_delay_design
```

#### 2.5 Componente 4: Effort & Sacrifice (Reducao do Esforco)

Quanto MENOS esforco o cliente percebe, MAIS valor percebe. Isso NAO significa fazer menos — significa fazer parecer mais facil.

**Estrategias de Reducao de Esforco Percebido:**

| Estrategia | Implementacao | Esforco do Coach |
|-----------|---------------|-----------------|
| **Done-For-You** | Plano pronto, so seguir | Baixo (automatizado) |
| **Lista de Compras** | Supermercado simplificado | Baixo (template) |
| **Substituicoes** | "Nao gosta de X? Troque por Y" | Baixo (tabela) |
| **Receitas Simples** | Refeicoes em 15-20 min | Medio (criar banco) |
| **Treinos Eficientes** | 45-60 min, sem enrolacao | Baixo (protocolo) |
| **Suporte Rapido** | Resposta em < 2h por WhatsApp | Alto (commitment) |
| **App/Sistema** | Tudo em um lugar so | Alto (setup) |
| **Lembretes** | Notificacoes automaticas | Baixo (automacao) |

**Exemplo Carlos Salvador:**
- Antes: "Voce recebe o plano e segue por conta propria"
- Depois: "Receba tudo pronto: treino detalhado com video de cada exercicio, plano alimentar com lista de compras e 30 receitas rapidas, e suporte diario por WhatsApp"

**Score Target:** <= 3/10 (invertido — menor esforco percebido = melhor)

```yaml
step_2_5:
  name: "Effort & Sacrifice Minimization"
  executor: gym-scaler
  duration_expected: "8-12 min"
  current_effort:
    score: "[1-10 invertido]"
    pain_points: "O que os clientes reclamam que e dificil"
  reducers:
    done_for_you:
      - "Plano de treino com video de cada exercicio"
      - "Plano alimentar com lista de compras automatica"
      - "30 receitas rapidas (< 20 min)"
    simplification:
      - "Tabela de substituicoes alimentares"
      - "Treino em 45-60 min maximo"
      - "1 app para tudo (treino, dieta, progresso)"
    support:
      - "Suporte por WhatsApp com resposta em < 2h"
      - "FAQ com respostas as 50 duvidas mais comuns"
      - "Videos tutoriais para cada exercicio"
    automation:
      - "Lembretes automaticos de treino e refeicao"
      - "Check-in semanal automatizado"
      - "Reports de progresso automaticos"
  improved_effort:
    score_target: "2-3"
  output: effort_design
```

#### 2.6 Calcular Value Equation Score Composto

```yaml
step_2_6:
  name: "Value Equation Score"
  executor: gym-scaler
  duration_expected: "5 min"
  formula: |
    Composite Score = (Dream Outcome + Perceived Likelihood) / 2
                    - (Time Delay + Effort Sacrifice) / 2
    Normalizado para escala 0-10
  scoring:
    dream_outcome: "[1-10]"
    perceived_likelihood: "[1-10]"
    time_delay: "[1-10 invertido]"
    effort_sacrifice: "[1-10 invertido]"
    composite: "[calculado]"
  threshold:
    minimum: 8.0
    ideal: 9.0
  output: value_equation_score
```

---

### Step 3: Design da Grand Slam Offer (Hormozi)

Construir a oferta completa com todos os componentes que a tornam "irresistivel" conforme framework do livro "$100M Offers".

#### 3.1 Oferta Core — O Que o Cliente Recebe

**Princípio Hormozi:** A oferta core deve resolver o problema PRINCIPAL do avatar de forma completa e sistematica.

**Template de Oferta Core para Coaching Fitness:**

| Componente | Descricao | Entrega |
|-----------|-----------|---------|
| Plano de Treino Personalizado | Periodizado, com progressao, exercicios com video | Semanal/Mesociclo |
| Plano Nutricional Completo | Macros calculados, refeicoes, substituicoes | Semanal |
| Acompanhamento Semanal | Check-in com analise de dados e ajustes | Semanal |
| Suporte por WhatsApp | Duvidas respondidas em ate 2h | Diario |
| Dashboard de Progresso | Metricas, graficos, tendencias | Tempo real |

**Exemplo Carlos Salvador — Oferta Core Redesenhada:**

```
PROGRAMA FISICO ALEM DO SHAPE — Transformacao 12 Semanas

Tudo que voce recebe:
- Protocolo de treino personalizado com periodizacao inteligente
- Plano alimentar com 30 receitas e lista de compras
- Acompanhamento semanal com analise detalhada
- Suporte prioritario por WhatsApp (resposta em 2h)
- Dashboard de progresso em tempo real
- Acesso a comunidade exclusiva de alunos
```

#### 3.2 Bonus Stack — Amplificadores de Valor

**Princípio Hormozi:** Bonus devem resolver objecoes e problemas ADJACENTES ao problema principal. Cada bonus deve ter valor percebido claro.

**Regra de Ouro:** O valor total dos bonus deve ser >= 2x o preco da oferta.

| Bonus | Resolve Qual Objecao? | Valor Percebido | Custo Real |
|-------|----------------------|-----------------|-----------|
| Guia de Meal Prep Semanal | "Nao tenho tempo de cozinhar" | R$97 | R$0 (digital) |
| Banco de 50 Receitas Fitness | "Nao sei cozinhar saudavel" | R$147 | R$0 (digital) |
| Grupo Exclusivo de Comunidade | "Vou me sentir sozinho" | R$197 | R$0 (grupo existente) |
| Guia de Suplementacao | "Nao sei que suplemento tomar" | R$97 | R$0 (digital) |
| Sessao de Avaliacao Mensal | "Sera que estou evoluindo?" | R$197 | 30min/mes |
| Acesso ao Sistema de Gamificacao | "Vou perder motivacao" | R$97 | R$0 (sistema existente) |
| Ebook "Mindset do Shape" | "Nao consigo manter disciplina" | R$47 | R$0 (digital) |

**Total Valor Percebido dos Bonus:** R$879

```yaml
step_3_2:
  name: "Bonus Stack Design"
  executor: gym-scaler
  advisor: gym-operator
  duration_expected: "15-20 min"
  per_bonus:
    - name: "Nome do bonus"
      objection_solved: "Qual objecao este bonus resolve"
      perceived_value: "R$ valor percebido"
      actual_cost: "R$ custo real de entrega"
      delivery_method: "digital|physical|service"
      creation_effort: "low|medium|high"
  rules:
    total_perceived_value: ">= 2x offer price"
    min_bonuses: 5
    max_bonuses: 8
    each_bonus_value: ">= R$47"
  output: bonus_stack
```

#### 3.3 Garantia — Reversao de Risco

**Princípio Hormozi:** A garantia e o elemento que transforma "talvez" em "sim". Ela transfere o risco do cliente para o coach.

**Tipos de Garantia para Coaching Fitness:**

| Tipo | Descricao | Risco para Coach | Impacto na Conversao |
|------|-----------|------------------|---------------------|
| **Incondicional** | "Devolvo 100% em 30 dias, sem perguntas" | Alto | Muito Alto |
| **Condicional** | "Se seguir 80%+ por 90 dias e nao ver resultados..." | Baixo | Alto |
| **Performance** | "Se nao atingir X resultado em Y semanas..." | Medio | Alto |
| **Extended** | "Se nao gostar em 7 dias, devolvo. Se nao funcionar em 90 dias, continuo gratis." | Medio | Muito Alto |
| **Stack** | Combinacao de garantias | Medio | Muito Alto |

**Recomendacao para Coaches Fitness:** Garantia CONDICIONAL de 90 dias.

**Exemplo Carlos Salvador:**
```
GARANTIA TRIPLA DE RESULTADO:

1. Garantia de 7 dias: Se nao ficar 100% satisfeito com a qualidade
   do material nos primeiros 7 dias, devolvo seu investimento integralmente.

2. Garantia de 90 dias: Se voce seguir 80% ou mais do protocolo por 90 dias
   e nao apresentar resultados mensuráveis, eu continuo te acompanhando
   GRATUITAMENTE ate voce atingir o objetivo.

3. Garantia de melhoria: Se em algum momento voce sentir que a qualidade
   do acompanhamento caiu, fale comigo e ajustaremos imediatamente.
```

```yaml
step_3_3:
  name: "Guarantee Design"
  executor: gym-scaler
  duration_expected: "8-10 min"
  guarantee:
    type: "unconditional|conditional|performance|extended|stack"
    duration: "7|30|60|90 days"
    conditions: "O que o cliente precisa fazer para acionar"
    coach_risk: "low|medium|high"
    expected_activation_rate: "1-5%"
    copy: "Texto exato da garantia"
  output: guarantee_design
```

#### 3.4 Escassez e Urgencia

**Princípio Hormozi:** Escassez e urgencia devem ser GENUINAS, nao artificiais. Fake scarcity destrói confianca.

**Escassez Real para Coaching:**
- "Aceito apenas 20 novos alunos por mes" (real: capacidade limitada)
- "Turma fecha dia X" (real: precisa de grupo para comecar junto)
- "Bonus X disponivel apenas para os primeiros 10" (real: recurso limitado)

**Urgencia Real para Coaching:**
- "Inscricoes abertas ate sexta" (real: precisa iniciar segunda)
- "Preco promocional de lancamento valido por 72h" (real: preco vai subir)
- "Bônus de avaliacao gratuita para quem entrar nesta semana" (real: agenda limitada)

```yaml
step_3_4:
  name: "Scarcity & Urgency Design"
  executor: gym-scaler
  duration_expected: "5-8 min"
  scarcity:
    type: "capacity|cohort|bonus|combination"
    description: "Descricao da escassez"
    is_genuine: true  # MUST be true — fake scarcity violates trust
    capacity_limit: "Numero real de vagas"
  urgency:
    type: "deadline|price_increase|bonus_expiry|combination"
    description: "Descricao da urgencia"
    is_genuine: true  # MUST be true
    deadline: "Data ou prazo real"
  output: scarcity_urgency_design
```

---

### Step 4: Criar Offer Stack Completo

Montar a apresentacao completa da oferta com ancoragem de preco.

#### 4.1 Ancoragem de Preco (Pricing Psychology)

**Princípio Hormozi:** O preco nunca e apresentado sozinho. Sempre e apresentado em CONTEXTO de valor.

**Tecnica de Ancoragem:**
```
O valor total de tudo que voce recebe:

- Programa de Treino Personalizado 12 Semanas  ........ R$1.497
- Plano Nutricional com 30 Receitas  .................. R$  997
- Acompanhamento Semanal Completo  .................... R$1.197
- Suporte por WhatsApp Prioritario  ................... R$  497
- Bonus #1: Guia de Meal Prep  ........................ R$   97
- Bonus #2: Banco de 50 Receitas Fitness  ............. R$  147
- Bonus #3: Comunidade Exclusiva (lifetime)  .......... R$  197
- Bonus #4: Guia de Suplementacao  .................... R$   97
- Bonus #5: Avaliacao Mensal  ......................... R$  197
- Bonus #6: Sistema de Gamificacao  ................... R$   97
- Bonus #7: Ebook Mindset do Shape  ................... R$   47
                                                    ──────────
VALOR TOTAL:                                        R$ 5.067

SEU INVESTIMENTO HOJE: R$ 697/mes (ou 12x de R$69,70)
```

**Economia percebida:** 86% de desconto sobre valor individual

```yaml
step_4_1:
  name: "Price Anchoring"
  executor: gym-scaler
  duration_expected: "10-12 min"
  anchor:
    individual_values:
      - item: "Nome do componente"
        perceived_value: "R$X"
    total_anchor: "R$ soma dos valores individuais"
    actual_price: "R$ preco cobrado"
    savings_percent: "% economia percebida"
    presentation: "Stack visual com valores listados"
  output: price_anchor
```

---

### Step 5: Definir Pricing Tiers

Criar minimo 3 tiers seguindo psicologia de pricing (anchoring, decoy effect, premium positioning).

#### 5.1 Tier Structure

**Psicologia de Pricing — 3 Principios:**

1. **Anchoring:** O tier mais caro ancora o valor (faz os outros parecerem acessiveis)
2. **Decoy Effect:** O tier do meio e desenhado para ser a "melhor escolha obvvia"
3. **Premium Positioning:** O tier premium existe para quem quer o melhor (e para validar o mid-tier)

**Tiers para Coaching Fitness (Mercado Brasileiro):**

| Tier | Nome Sugerido | Faixa de Preco | Target | ARM Cooper |
|------|--------------|---------------|--------|-----------|
| **Entry** | Protocolo Guiado | R$297-397/mes | Autonomo, baixo budget | R$347 |
| **Standard** | Transformacao Completa | R$597-797/mes | Quer resultado, quer suporte | R$697 |
| **Premium** | Elite Coaching | R$997-1.497/mes | Quer atencao maxima | R$1.197 |
| **VIP** | Mentoria VIP | R$2.497-4.997/mes | High-ticket, exclusivo | R$3.497 |

**Nota Cooper ARM Target:** Chris Cooper recomenda ARM de $205 USD para gyms. Adaptando para mercado brasileiro de coaching online: ARM minimo de R$500 no tier standard.

#### 5.2 Composicao por Tier

**Entry — Protocolo Guiado (R$347/mes):**
- Plano de treino padrao (por template, ajustado)
- Plano nutricional com macros
- Check-in quinzenal
- Grupo geral no WhatsApp
- Acesso a gamificacao basica

**Standard — Transformacao Completa (R$697/mes) [DECOY — MELHOR CUSTO-BENEFICIO]:**
- Tudo do Entry MAIS:
- Plano de treino 100% personalizado com periodizacao
- Plano nutricional com receitas e lista de compras
- Check-in semanal com report detalhado
- Suporte por WhatsApp (resposta em 4h)
- Todos os 7 bonus
- Gamificacao completa com leaderboard
- Comunidade exclusiva

**Premium — Elite Coaching (R$1.197/mes):**
- Tudo do Standard MAIS:
- Call mensal de 30min com o coach
- Ajustes ilimitados de protocolo
- Suporte prioritario (resposta em 2h)
- Analise de posing/fisico mensal
- Conteudo exclusivo avancado
- Prioridade em vagas de competicao

**VIP — Mentoria VIP (R$3.497/mes):**
- Tudo do Premium MAIS:
- Call semanal de 60min com o coach
- Acompanhamento diario
- Plano de periodizacao anual completo
- Preparacao de competicao incluida
- Assessoria de imagem fitness
- Canal direto com o coach (telefone)

```yaml
step_5:
  name: "Pricing Tiers Design"
  executor: gym-scaler
  advisor: gym-operator
  duration_expected: "15-20 min"
  tiers:
    entry:
      name: "Protocolo Guiado"
      price: "R$347/mes"
      components: ["Lista de itens"]
      arm_generated: "R$347"
      target_clients: "30-50% da base"
      margin: "85%+ (altamente automatizado)"
      coach_time: "15min/semana por cliente"
    standard:
      name: "Transformacao Completa"
      price: "R$697/mes"
      components: ["Lista de itens — inclui tudo do entry"]
      arm_generated: "R$697"
      target_clients: "40-50% da base (tier principal)"
      margin: "70-80%"
      coach_time: "30min/semana por cliente"
      decoy_positioning: "Melhor custo-beneficio — escolha obvia"
    premium:
      name: "Elite Coaching"
      price: "R$1.197/mes"
      components: ["Lista de itens — inclui tudo do standard"]
      arm_generated: "R$1.197"
      target_clients: "10-15% da base"
      margin: "60-70%"
      coach_time: "60min/semana por cliente"
    vip:
      name: "Mentoria VIP"
      price: "R$3.497/mes"
      components: ["Lista de itens — inclui tudo do premium"]
      arm_generated: "R$3.497"
      target_clients: "3-5% da base"
      margin: "50-60%"
      coach_time: "3h/semana por cliente"
  arm_weighted_average:
    formula: "(entry_clients * entry_price + standard * standard_price + ...) / total_clients"
    target: ">= R$500 (Cooper benchmark BR)"
  output: pricing_structure
```

---

### Step 6: Criar Naming Focado em Transformacao

O nome da oferta e a primeira impressao. Deve comunicar RESULTADO, nao servico.

#### 6.1 Princípios de Naming (Hormozi)

**ERRADO (Focado em Servico):**
- "Consultoria Online Personalizada"
- "Plano de Treino + Dieta"
- "Acompanhamento Fitness"
- "Personal Online"

**CERTO (Focado em Transformacao):**
- "Programa Fisico Alem do Shape"
- "Protocolo Elite 90 Dias"
- "Transformacao Total 12 Semanas"
- "Operacao Shape de Verao"
- "Projeto Novo Eu"

**Formula de Naming:**
```
[Acao/Metodo] + [Resultado Desejado] + [Tempo/Especificidade]

Exemplos:
- "Protocolo" + "Shape Definido" + "12 Semanas"
- "Programa" + "Fisico de Elite" + "90 Dias"
- "Metodo" + "Transformacao Total" + "Turma Exclusiva"
```

**Exemplo Carlos Salvador:**
- Oferta Entry: "Protocolo Guiado — Seu Shape no Piloto Automatico"
- Oferta Standard: "Programa Fisico Alem do Shape — Transformacao 12 Semanas"
- Oferta Premium: "Elite Coaching — Performance e Estetica Sem Limites"
- Oferta VIP: "Mentoria VIP — Seu Coach Pessoal 24/7"

```yaml
step_6:
  name: "Offer Naming"
  executor: gym-scaler
  duration_expected: "8-10 min"
  naming:
    principles:
      - "Comunicar resultado, nao servico"
      - "Usar linguagem do avatar"
      - "Incluir especificidade (tempo, numero)"
      - "Evocar emocao e aspiracao"
    per_tier:
      - tier: "entry"
        name: "Nome da oferta entry"
        tagline: "Subtitulo complementar"
      - tier: "standard"
        name: "Nome da oferta standard"
        tagline: "Subtitulo complementar"
      - tier: "premium"
        name: "Nome da oferta premium"
        tagline: "Subtitulo complementar"
      - tier: "vip"
        name: "Nome da oferta vip"
        tagline: "Subtitulo complementar"
  output: offer_naming
```

---

### Step 7: Design de Escassez e Urgencia

Criar elementos genuinos de escassez e urgencia para cada tier.

#### 7.1 Escassez por Tier

| Tier | Tipo de Escassez | Justificativa Real |
|------|-----------------|-------------------|
| Entry | Sem limite | Altamente automatizado |
| Standard | 30 vagas/mes | Coach review semanal limita capacidade |
| Premium | 15 vagas fixas | Call mensal + suporte prioritario |
| VIP | 5 vagas fixas | Call semanal + acompanhamento diario |

#### 7.2 Urgencia por Campanha

| Campanha | Urgencia | Duracao |
|----------|---------|---------|
| Lancamento | Preco de fundador (30% off) | 7 dias |
| Trimestral | Bonus exclusivo para quem entrar no periodo | 72h |
| Turma Fechada | Inscricoes ate data X | 14 dias |
| Black Friday | Desconto anual unico | 24-48h |

```yaml
step_7:
  name: "Scarcity & Urgency Design"
  executor: gym-scaler
  duration_expected: "8-10 min"
  scarcity_per_tier:
    entry: { limit: null, justification: "Automatizado" }
    standard: { limit: 30, justification: "Capacidade de review semanal" }
    premium: { limit: 15, justification: "Tempo de call + suporte" }
    vip: { limit: 5, justification: "Acompanhamento diario" }
  urgency_campaigns:
    - name: "Lancamento"
      type: "founder_price"
      discount: "30%"
      duration: "7 dias"
    - name: "Turma Fechada"
      type: "deadline"
      duration: "14 dias"
  output: scarcity_urgency_plan
```

---

### Step 8: Calcular Unit Economics

Validar que a oferta e financeiramente sustentavel e lucrativa em todos os tiers.

#### 8.1 Metricas por Tier

```
Para cada tier calcular:

LTV = ARM x LEG (meses de permanencia media)
CAC = Investimento em marketing / Novos clientes
LTV/CAC Ratio = LTV / CAC (target: >= 3x)
Margem = (ARM - Custo por cliente) / ARM * 100
Break-even clients = Custos fixos / (ARM - Custo variavel por cliente)
Payback Period = CAC / (ARM * Margem)
```

**Exemplo Carlos Salvador — Unit Economics Projetadas:**

| Metrica | Entry | Standard | Premium | VIP |
|---------|-------|----------|---------|-----|
| ARM | R$347 | R$697 | R$1.197 | R$3.497 |
| LEG estimado | 4 meses | 8 meses | 12 meses | 6 meses |
| LTV | R$1.388 | R$5.576 | R$14.364 | R$20.982 |
| CAC estimado | R$150 | R$200 | R$300 | R$500 |
| LTV/CAC | 9.3x | 27.9x | 47.9x | 42.0x |
| Margem | 85% | 75% | 65% | 55% |
| Break-even | 5 clients | 3 clients | 2 clients | 1 client |
| Revenue Target (30 clients) | R$10.410/mes | R$20.910/mes | R$35.910/mes | R$104.910/mes |

**ARM Medio Ponderado (Mix Otimizado: 40% Entry, 40% Standard, 15% Premium, 5% VIP):**
```
ARM medio = (0.40 * 347) + (0.40 * 697) + (0.15 * 1197) + (0.05 * 3497)
ARM medio = 138.8 + 278.8 + 179.55 + 174.85
ARM medio = R$772/mes (acima do target Cooper de R$500)
```

```yaml
step_8:
  name: "Unit Economics Calculation"
  executor: gym-operator
  advisor: gym-scaler
  duration_expected: "10-15 min"
  per_tier:
    - tier: "entry"
      arm: "R$"
      leg_estimated: "X meses"
      ltv: "R$"
      cac_estimated: "R$"
      ltv_cac_ratio: "Xx"
      margin: "X%"
      break_even_clients: "X"
      cost_per_client: "R$/mes"
    # ... repeat for each tier
  weighted_arm:
    formula: "sum(tier_share * tier_arm)"
    result: "R$"
    cooper_target: "R$500"
    status: "ABOVE|BELOW target"
  viability_check:
    all_margins_positive: true
    all_ltv_cac_above_3x: true
    arm_above_target: true
  output: unit_economics
```

---

### Step 9: Criar Sales Page Structure

Definir a estrutura da pagina de vendas que apresenta a oferta.

#### 9.1 Estrutura da Sales Page

```
1. HERO SECTION
   - Headline: Dream Outcome em uma frase
   - Subheadline: Como o programa entrega esse resultado
   - CTA: "Quero Minha Transformacao"
   - Visual: Before/after impactante

2. PROBLEMA
   - Agitar o problema do avatar
   - "Voce ja tentou X e nao deu certo?"
   - "Voce sente que faz tudo certo mas nao ve resultado?"
   - Empatia: "Eu sei como e porque ja passei por isso"

3. SOLUCAO
   - Apresentar o programa como a ponte
   - Metodologia resumida (3-5 pilares)
   - "O que faz diferente dos outros"

4. PROVA SOCIAL
   - 5-10 before/after com historia
   - Depoimentos em texto e video
   - Numeros: "X clientes transformados"

5. OFERTA COMPLETA
   - Stack de valor com ancoragem
   - Cada componente com valor individual
   - Bonus com valor individual
   - Preco real vs valor total

6. TIERS
   - 3-4 opcoes lado a lado
   - Tier recomendado destacado
   - Comparativo de features

7. GARANTIA
   - Garantia em destaque
   - Explicacao clara dos termos
   - "Zero risco para voce"

8. FAQ
   - 10-15 perguntas mais comuns
   - Objecoes respondidas

9. CTA FINAL
   - Urgencia (prazo)
   - Escassez (vagas)
   - "Comece sua transformacao hoje"

10. COACH BIO
    - Historia pessoal do coach
    - Credenciais e experiencia
    - Conexao emocional
```

```yaml
step_9:
  name: "Sales Page Structure"
  executor: gym-scaler
  duration_expected: "15-20 min"
  sections:
    hero:
      headline: "Copy principal"
      subheadline: "Copy de apoio"
      cta: "Texto do botao"
    problem: "3-5 pain points do avatar"
    solution: "3-5 pilares da metodologia"
    social_proof: "Tipos e quantidade de provas"
    offer_stack: "Apresentacao completa com ancoragem"
    tiers: "Comparativo visual de tiers"
    guarantee: "Copy da garantia"
    faq: "10-15 perguntas e respostas"
    final_cta: "Urgencia + escassez + acao"
    coach_bio: "Historia e credenciais"
  output: sales_page_structure
```

---

### Step 10: Definir Metricas de Sucesso da Oferta

Estabelecer como medir se a oferta esta funcionando apos lancamento.

#### 10.1 Metricas de Performance da Oferta

| Metrica | Target | Frequencia | Alerta |
|---------|--------|-----------|--------|
| Taxa de Conversao (lead → cliente) | >= 10% | Semanal | < 5% |
| ARM Medio | >= R$500 | Mensal | < R$400 |
| Tier Distribution | 40/40/15/5 | Mensal | Concentracao > 70% em entry |
| Churn Rate 30 dias | < 10% | Mensal | > 15% |
| NPS da Oferta | >= 8/10 | Trimestral | < 7 |
| Margem Media | >= 65% | Mensal | < 50% |
| LTV/CAC | >= 5x | Trimestral | < 3x |
| Refund Rate (garantia) | < 5% | Mensal | > 10% |
| Upsell Rate (entry → standard) | >= 20% | Trimestral | < 10% |

#### 10.2 Review Cycle

- **Semanal:** Conversao e novos clientes por tier
- **Mensal:** ARM, churn, margem, tier distribution
- **Trimestral:** LTV/CAC, NPS, refund rate, upsell rate
- **Semestral:** Revisao completa da oferta e ajustes de pricing

```yaml
step_10:
  name: "Offer Success Metrics"
  executor: gym-operator
  advisor: gym-scaler
  duration_expected: "8-10 min"
  metrics:
    conversion_rate: { target: ">=10%", alert: "<5%", frequency: "weekly" }
    arm_average: { target: ">=R$500", alert: "<R$400", frequency: "monthly" }
    tier_distribution: { target: "40/40/15/5", alert: "concentration >70%", frequency: "monthly" }
    churn_30d: { target: "<10%", alert: ">15%", frequency: "monthly" }
    nps: { target: ">=8", alert: "<7", frequency: "quarterly" }
    margin: { target: ">=65%", alert: "<50%", frequency: "monthly" }
    ltv_cac: { target: ">=5x", alert: "<3x", frequency: "quarterly" }
    refund_rate: { target: "<5%", alert: ">10%", frequency: "monthly" }
    upsell_rate: { target: ">=20%", alert: "<10%", frequency: "quarterly" }
  review_cycle:
    weekly: ["conversion", "new_clients_per_tier"]
    monthly: ["arm", "churn", "margin", "distribution"]
    quarterly: ["ltv_cac", "nps", "refund", "upsell"]
    semiannual: ["full_offer_review", "pricing_adjustment"]
  output: offer_metrics
```

---

## Error Handling

**Strategy:** iterate + coach_review

**Common Errors:**

1. **Error:** Value Equation Score Abaixo de 8
   - **Cause:** Um ou mais componentes com score baixo
   - **Resolution:** Revisar componente com menor score, adicionar boosters especificos
   - **Recovery:** Iterar no componente fraco ate atingir score minimo

2. **Error:** ARM Abaixo do Target Cooper
   - **Cause:** Pricing muito baixo ou concentracao em tier entry
   - **Resolution:** Ajustar precos ou adicionar mais valor ao tier standard
   - **Recovery:** Rever composicao dos tiers e bonus para justificar preco maior

3. **Error:** Unit Economics Negativas em Algum Tier
   - **Cause:** Custo de entrega maior que receita
   - **Resolution:** Reduzir custo (automatizar mais) ou aumentar preco
   - **Recovery:** Redesenhar tier com foco em margem sustentavel

4. **Error:** Coach Resiste a Aumentar Precos
   - **Cause:** Medo de perder clientes atuais
   - **Resolution:** Grandfathering (clientes atuais mantem preco) + novos entram no novo preco
   - **Recovery:** Implementacao gradual com testes A/B

5. **Error:** Naming Generico ou Focado em Servico
   - **Cause:** Coach pensa em termos de servico, nao de resultado
   - **Resolution:** Workshop de naming com foco em linguagem do avatar
   - **Recovery:** Testar 3-5 nomes com audiencia real antes de decidir

---

## Performance

```yaml
duration_expected: "60-120 min (design completo da oferta)"
cost_estimated: "$0.05-0.15"
token_usage: "~15,000-40,000 tokens"
advisor_consultations: 2 (Hormozi, Cooper)
```

---

## Metadata

```yaml
task_id: FC-TASK-009
name: create-offer
version: 1.0.0
squad: fitcoach
dependencies:
  - business-diagnostic (FC-TASK-006) — pre-condition
  - gym-scaler (advisor — Alex Hormozi)
  - gym-operator (advisor — Chris Cooper)
tags:
  - offer
  - pricing
  - hormozi
  - value-equation
  - grand-slam-offer
  - premium
  - scaling
  - unit-economics
updated_at: 2026-03-11
```

---

## Handoff

```yaml
next_task:
  funnel:
    workflow: "business-scaling Phase 3 (FUNNEL)"
    condition: "Oferta criada, preciso de funil de vendas"
  onboarding:
    workflow: "coach-onboarding Phase 2 → Phase 3"
    condition: "Coach novo com oferta pronta, seguir para setup da plataforma"
  scaling:
    workflow: "business-scaling Phase 2 complete"
    condition: "Oferta criada como parte do workflow de scaling"
  optimization:
    task: "business-diagnostic"
    condition: "Oferta ja lancada, preciso re-diagnosticar para otimizar"
```
