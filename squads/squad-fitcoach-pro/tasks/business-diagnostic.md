<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: business-diagnostic
  task_name: Business Diagnostic
  status: active
  responsible_executor: 'business-diagnostician + coach input'
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
- Gera diagnostico rapido baseado em dados fornecidos
- **Melhor para:** Coaches com metricas ja organizadas

### 2. Interactive Mode - Balanceado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints em cada area de analise
- Explica frameworks e metricas ao coach
- **Melhor para:** Primeiro diagnostico, coaches sem experiencia em business

### 3. Pre-Flight Planning - Planejamento Completo Antecipado
- Analise profunda de todas as dimensoes do negocio
- **Melhor para:** Coaches planejando transicao de modelo ou scaling significativo

**Parameter:** `mode` (optional, default: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: businessDiagnostic()
id: FC-TASK-006
responsavel: business-diagnostician + coach input
responsavel_type: Hybrid
squad: fitcoach
pattern_prefix: FC
atomic_layer: Organism

advisors:
  - gym-scaler (Alex Hormozi) — Scaling, ofertas, precificacao, lead generation
  - gym-operator (Chris Cooper) — Operacao, metricas, processos, retencao

**Entrada:**
- campo: coach_profile
  tipo: object
  origem: Coach Input
  obrigatorio: true
  validacao: |
    Must contain: name, years_in_business, current_model (1on1|group|hybrid|online),
    niche (bodybuilding|fitness|health|performance)

- campo: financial_data
  tipo: object
  origem: Coach Input
  obrigatorio: true
  validacao: |
    Must contain: monthly_revenue, monthly_expenses, num_active_clients,
    price_per_client, retention_rate_monthly

- campo: client_metrics
  tipo: object
  origem: Coach Input ou System
  obrigatorio: true
  validacao: |
    Must contain: total_clients, active_clients, churned_last_90d,
    average_client_lifetime_months, new_clients_last_90d

- campo: marketing_data
  tipo: object
  origem: Coach Input
  obrigatorio: false
  validacao: |
    Optional: social_followers, leads_per_month, conversion_rate,
    marketing_spend, channels_used

- campo: operations_data
  tipo: object
  origem: Coach Input
  obrigatorio: false
  validacao: |
    Optional: hours_per_week, tools_used, automations_in_place,
    team_size, delegation_level

- campo: satisfaction_data
  tipo: object
  origem: Coach Input
  obrigatorio: false
  validacao: |
    Optional: nps_score, client_testimonials_count, referral_rate

**Saida:**
- campo: diagnostic_report
  tipo: markdown
  destino: Data Store (coach/diagnostics/{date}-report.md)
  persistido: true

- campo: business_health_score
  tipo: object
  destino: Data Store (coach/diagnostics/{date}-score.json)
  persistido: true

- campo: strategy_recommendations
  tipo: array[object]
  destino: Data Store (coach/diagnostics/{date}-strategies.json)
  persistido: true

- campo: action_plan
  tipo: object
  destino: Data Store (coach/diagnostics/{date}-action-plan.md)
  persistido: true
```

---

## Pre-Conditions

```yaml
pre-conditions:
  - [ ] Coach disposto a compartilhar dados financeiros e operacionais
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que coach entende e aceita compartilhar dados de negocio
    error_message: "Pre-condition failed: Coach nao autorizou compartilhamento de dados"

  - [ ] Minimo de dados financeiros basicos disponíveis
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar que revenue, expenses e client count estao disponiveis
    error_message: "Pre-condition failed: Dados financeiros minimos nao disponiveis"
```

---

## Post-Conditions

```yaml
post-conditions:
  - [ ] Business Health Score calculado com todas as dimensoes
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que score composto foi calculado com breakdown por dimensao
    error_message: "Post-condition failed: Health Score nao calculado"

  - [ ] Recomendacoes estrategicas priorizadas geradas
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que strategy_recommendations contem pelo menos 3 recomendacoes priorizadas
    error_message: "Post-condition failed: Recomendacoes nao geradas"

  - [ ] Plano de acao com timeline definido
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que action_plan contem steps com prazos
    error_message: "Post-condition failed: Plano de acao sem timeline"
```

---

## Acceptance Criteria

```yaml
acceptance-criteria:
  - [ ] AC-1: Metricas ARM, LEG e churn calculadas corretamente
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que ARM (Average Revenue per Member), LEG (Length of Engagement),
      e churn rate estao calculados com formulas corretas
    error_message: "AC-1 nao atendido: Metricas core nao calculadas"

  - [ ] AC-2: Analise Hormozi (Value Equation) aplicada ao modelo do coach
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que Value Equation foi aplicada com todos os 4 componentes
    error_message: "AC-2 nao atendido: Value Equation nao aplicada"

  - [ ] AC-3: Analise Cooper (Two-Brain) aplicada as operacoes
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que framework Cooper foi aplicado com metricas operacionais
    error_message: "AC-3 nao atendido: Analise Cooper nao aplicada"

  - [ ] AC-4: Business Health Score composto gerado (0-100)
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que health_score esta calculado com breakdown por dimensao
    error_message: "AC-4 nao atendido: Health Score nao gerado"

  - [ ] AC-5: Plano de acao com prioridades e ROI estimado
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert que cada recomendacao tem prioridade, esforco e ROI estimado
    error_message: "AC-5 nao atendido: Plano sem prioridades/ROI"
```

---

## Tools

- **Tool:** macro-calculator
  - **Purpose:** Calculos financeiros (usado em modo metricas de negocio)
  - **Source:** squads/fitcoach/tools/macro-calculator (adaptado para business)

---

## SEQUENTIAL Task Execution (Nao prosseguir ate a Task atual estar completa)

### Step 0: Coleta de Dados do Negocio

- Apresentar questionario de diagnostico ao coach
- Coletar dados em 6 categorias:
  1. **Modelo de Negocio:** Tipo de servico, nicho, diferenciais
  2. **Financeiro:** Receita, despesas, margem, pricing
  3. **Clientes:** Quantidade, retencao, lifetime value
  4. **Marketing:** Canais, leads, conversao, custo de aquisicao
  5. **Operacoes:** Horas trabalhadas, ferramentas, automacao, equipe
  6. **Satisfacao:** NPS, depoimentos, indicacoes

```yaml
step_0:
  name: "Coleta de Dados do Negocio"
  executor: business-diagnostician
  duration_expected: "15-30 min"
  categories:
    business_model:
      - "Tipo de servico (1on1, grupo, hibrido, online)"
      - "Nicho de atuacao"
      - "Diferenciais competitivos"
      - "Anos de experiencia"
    financial:
      - "Receita mensal bruta"
      - "Despesas mensais fixas e variaveis"
      - "Preco medio por cliente/mes"
      - "Ticket medio de entrada"
    clients:
      - "Total de clientes ativos"
      - "Novos clientes nos ultimos 90 dias"
      - "Clientes perdidos nos ultimos 90 dias"
      - "Tempo medio de permanencia (meses)"
    marketing:
      - "Seguidores nas redes sociais"
      - "Leads por mes"
      - "Taxa de conversao lead→cliente"
      - "Investimento mensal em marketing"
    operations:
      - "Horas trabalhadas por semana"
      - "Ferramentas utilizadas"
      - "Nivel de automacao"
      - "Tamanho da equipe"
    satisfaction:
      - "NPS score (se disponivel)"
      - "Numero de depoimentos/reviews"
      - "Taxa de indicacao"
  output: business_data
```

### Step 1: Calcular Metricas Core

#### 1.1 ARM (Average Revenue per Member)

```
ARM = Receita Mensal Total / Numero de Clientes Ativos
```

**Benchmarks Cooper:**
- ARM < R$200: Subprecificado — urgente revisar precificacao
- ARM R$200-500: Abaixo do ideal para coaching personalizado
- ARM R$500-1000: Adequado para mercado brasileiro online
- ARM R$1000-2000: Bom — servico premium
- ARM > R$2000: Excelente — servico de elite

#### 1.2 LEG (Length of Engagement)

```
LEG = 1 / Churn Rate Mensal (em meses)
```

**Benchmarks Cooper:**
- LEG < 3 meses: Critico — retencao muito baixa
- LEG 3-6 meses: Abaixo do ideal
- LEG 6-12 meses: Adequado
- LEG 12-24 meses: Bom
- LEG > 24 meses: Excelente

#### 1.3 Churn Rate

```
Churn Rate = Clientes Perdidos no Periodo / Clientes Ativos no Inicio do Periodo
```

**Benchmarks:**
- Churn > 15%/mes: Critico
- Churn 10-15%/mes: Alto
- Churn 5-10%/mes: Aceitavel
- Churn 3-5%/mes: Bom
- Churn < 3%/mes: Excelente

#### 1.4 LTV (Lifetime Value)

```
LTV = ARM * LEG
```

#### 1.5 CAC (Customer Acquisition Cost)

```
CAC = Investimento em Marketing / Novos Clientes no Periodo
```

**Regra:** LTV/CAC deve ser >= 3x para negocio saudavel

#### 1.6 Margem de Lucro

```
Margem = (Receita - Despesas) / Receita * 100
```

**Benchmarks:**
- Margem < 20%: Inviavel a longo prazo
- Margem 20-40%: Aceitavel
- Margem 40-60%: Bom
- Margem > 60%: Excelente (tipico de coaching online puro)

```yaml
step_1:
  name: "Calcular Metricas Core"
  executor: business-diagnostician
  duration_expected: "5-10 min"
  metrics:
    - arm: "revenue / active_clients"
    - leg: "1 / monthly_churn_rate"
    - churn: "churned_clients / start_clients"
    - ltv: "arm * leg"
    - cac: "marketing_spend / new_clients"
    - ltv_cac_ratio: "ltv / cac"
    - profit_margin: "(revenue - expenses) / revenue"
    - mre: "monthly_recurring_expenses"
    - runway: "cash_reserves / mre"
  output: core_metrics
```

### Step 2: Analise com Framework Hormozi

#### 2.1 Value Equation (Equacao de Valor)

Aplicar a Value Equation de Alex Hormozi ao servico do coach:

```
Value = (Dream Outcome * Perceived Likelihood of Achievement) /
        (Time Delay * Effort & Sacrifice)
```

**Dream Outcome:** O que o cliente realmente quer? (nao so "ficar forte")
- Corpo que gera confianca
- Disciplina que transborda para outras areas
- Saude e longevidade
- Estetica para competicao
- Autoestima elevada

**Perceived Likelihood:** O quanto o cliente acredita que vai funcionar?
- Prova social (before/after)
- Credenciais do coach
- Metodologia clara
- Garantia de resultado
- Depoimentos

**Time Delay:** Quanto tempo leva para ver resultados?
- Primeiras mudancas visiveis em 4-8 semanas
- Resultados significativos em 12-16 semanas
- Transformacao completa em 6-12 meses

**Effort & Sacrifice:** Quanto esforco o cliente precisa fazer?
- Seguir plano de treino (3-6x/semana)
- Seguir dieta (diariamente)
- Check-ins semanais
- Mudanca de habitos

**Avaliacao:** Score 1-10 para cada componente, calcular Value Score composto

```yaml
step_2_1:
  name: "Value Equation (Hormozi)"
  executor: business-diagnostician
  advisor: gym-scaler
  duration_expected: "10-15 min"
  components:
    dream_outcome:
      score: "[1-10]"
      evidence: "Como o coach comunica o resultado desejado"
    perceived_likelihood:
      score: "[1-10]"
      evidence: "Prova social, credenciais, garantias"
    time_delay:
      score: "[1-10 invertido — menor tempo = maior score]"
      evidence: "Timeline comunicada vs real"
    effort_sacrifice:
      score: "[1-10 invertido — menor esforco = maior score]"
      evidence: "Quao simples e o processo para o cliente"
  output: value_equation_analysis
```

#### 2.2 Oferta Irresistivel (Grand Slam Offer)

Analisar a oferta atual do coach vs framework de Grand Slam Offer:

**Componentes da Grand Slam Offer Hormozi:**
1. **Oferta Core:** O servico principal (consultoria, plano, acompanhamento)
2. **Bonus Stack:** Adicionais que aumentam valor percebido
3. **Urgencia:** Motivo para agir agora
4. **Escassez:** Limitacao de vagas
5. **Garantia:** Reversao de risco
6. **Naming:** Nome da oferta que comunica valor

**Analise da Oferta Atual:**
- O coach tem uma oferta clara e nomeada?
- Os bonus aumentam valor percebido significativamente?
- Existe urgencia e escassez genuinas?
- Existe garantia que reduz risco do cliente?
- O preco esta ancorado corretamente?

```yaml
step_2_2:
  name: "Grand Slam Offer (Hormozi)"
  executor: business-diagnostician
  advisor: gym-scaler
  duration_expected: "8-12 min"
  analysis:
    current_offer:
      components: "Listar o que o coach oferece atualmente"
      pricing: "Preco atual e como e apresentado"
      bonuses: "Bonus atuais (se existirem)"
      guarantee: "Garantia atual (se existir)"
      urgency: "Elementos de urgencia atuais"
    gaps:
      - "O que esta faltando na oferta?"
      - "Como melhorar valor percebido sem aumentar custo?"
      - "Que garantia poderia ser adicionada?"
  output: offer_analysis
```

### Step 3: Analise com Framework Cooper (Two-Brain Business)

#### 3.1 Metricas Operacionais Cooper

Aplicar framework Two-Brain Business de Chris Cooper:

**Effective Hourly Rate (EHR):**
```
EHR = Lucro Mensal / Horas Trabalhadas por Mes
```

**Benchmarks Cooper:**
- EHR < R$50/h: Coach esta se auto-explorando
- EHR R$50-150/h: Abaixo do potencial
- EHR R$150-300/h: Adequado
- EHR > R$300/h: Otimizado

**4/9ths Model (Alocacao de Tempo):**
- 4/9 do tempo em coaching direto
- 2/9 do tempo em marketing/vendas
- 2/9 do tempo em operacoes/admin
- 1/9 do tempo em desenvolvimento pessoal/profissional

**Avaliacao:** Comparar distribuicao atual vs ideal

```yaml
step_3_1:
  name: "Metricas Operacionais (Cooper)"
  executor: business-diagnostician
  advisor: gym-operator
  duration_expected: "8-12 min"
  metrics:
    ehr:
      formula: "profit / hours_worked_monthly"
      benchmark: "R$150-300/h ideal"
    time_allocation:
      coaching: "% do tempo em atendimento direto"
      marketing: "% do tempo em marketing/vendas"
      operations: "% do tempo em admin/operacoes"
      development: "% do tempo em aprendizado"
    capacity:
      current_clients: "Numero atual"
      max_capacity: "Maximo sem comprometer qualidade"
      utilization: "current / max * 100"
  output: operational_metrics
```

#### 3.2 Retencao e Experiencia do Cliente (Cooper)

Analisar a jornada do cliente usando framework Cooper:

**No Sweat Intro (NSI):**
- O coach tem um processo de intake estruturado?
- A primeira impressao gera confianca?
- O prospect entende exatamente o que vai receber?

**Goal Review Sessions:**
- O coach faz revisoes regulares de objetivo?
- Existe um sistema de check-in padronizado?
- O cliente sente que esta progredindo?

**Bright Spots:**
- O coach celebra vitorias do cliente?
- Existe sistema de reconhecimento (gamificacao)?
- O cliente se sente parte de uma comunidade?

```yaml
step_3_2:
  name: "Retencao e Experiencia (Cooper)"
  executor: business-diagnostician
  advisor: gym-operator
  duration_expected: "8-10 min"
  analysis:
    intake_quality:
      score: "[1-10]"
      notes: "Qualidade do processo de onboarding"
    goal_reviews:
      frequency: "Com que frequencia"
      formalized: "Estruturado ou informal?"
    client_experience:
      personalization: "[1-10]"
      communication: "[1-10]"
      results_tracking: "[1-10]"
      community: "[1-10]"
  output: retention_analysis
```

### Step 4: Calcular Business Health Score

#### 4.1 Score Composto por Dimensao

Calcular Business Health Score (0-100) baseado em 6 dimensoes:

| Dimensao | Peso | Metricas |
|----------|------|----------|
| **Financeira** | 25% | ARM, margem, LTV/CAC ratio |
| **Retencao** | 20% | Churn rate, LEG, NPS |
| **Aquisicao** | 15% | Leads/mes, conversao, CAC |
| **Operacional** | 15% | EHR, automacao, eficiencia |
| **Oferta** | 15% | Value Equation score |
| **Escalabilidade** | 10% | Capacity, delegation, sistemas |

**Score por Dimensao:** 0-100 baseado nos benchmarks de cada metrica
**Score Total:** Media ponderada das dimensoes

**Classificacao:**
- 80-100: Negocio saudavel e escalavel
- 60-79: Bom com areas de melhoria
- 40-59: Precisa atencao em areas criticas
- 20-39: Situacao preocupante, mudancas urgentes
- 0-19: Negocio insustentavel no modelo atual

```yaml
step_4_1:
  name: "Business Health Score"
  executor: business-diagnostician
  duration_expected: "5-8 min"
  dimensions:
    financial:
      weight: 0.25
      metrics: [arm, profit_margin, ltv_cac_ratio]
    retention:
      weight: 0.20
      metrics: [churn_rate, leg, nps]
    acquisition:
      weight: 0.15
      metrics: [leads_per_month, conversion_rate, cac]
    operational:
      weight: 0.15
      metrics: [ehr, automation_level, efficiency]
    offer:
      weight: 0.15
      metrics: [value_equation_score]
    scalability:
      weight: 0.10
      metrics: [capacity_utilization, delegation, systems]
  output: business_health_score
```

### Step 5: Gerar Recomendacoes Estrategicas

#### 5.1 Priorizar Areas de Melhoria

Baseado no Health Score, identificar top 3-5 areas de melhoria:

Para cada recomendacao:
- **O que:** Descricao clara da acao
- **Por que:** Justificativa baseada nos dados
- **Como:** Steps praticos para implementar
- **Esforco:** Baixo / Medio / Alto
- **Impacto:** Baixo / Medio / Alto
- **ROI Estimado:** Retorno esperado em R$ ou % de melhoria
- **Timeline:** Quando implementar e quando esperar resultados

**Priorizar usando Matriz Esforco x Impacto:**
1. **Quick Wins:** Baixo esforco + Alto impacto (FAZER PRIMEIRO)
2. **Projetos Estrategicos:** Alto esforco + Alto impacto (PLANEJAR)
3. **Fill-ins:** Baixo esforco + Baixo impacto (SE SOBRAR TEMPO)
4. **Evitar:** Alto esforco + Baixo impacto (NAO FAZER)

```yaml
step_5_1:
  name: "Recomendacoes Estrategicas"
  executor: business-diagnostician
  advisors: [gym-scaler, gym-operator]
  duration_expected: "10-15 min"
  per_recommendation:
    - what: "Descricao da acao"
    - why: "Justificativa com dados"
    - how: "Steps praticos"
    - effort: "low|medium|high"
    - impact: "low|medium|high"
    - roi_estimated: "R$ ou %"
    - timeline: "Implementacao + resultados"
    - priority_quadrant: "quick_win|strategic|fill_in|avoid"
  output: strategy_recommendations
```

### Step 6: Gerar Report e Plano de Acao

#### 6.1 Compilar Report Completo

Gerar diagnostic report profissional com todas as analises:

**Estrutura do Report:**
```
# Diagnostico de Negocio — {coach_name} — {date}

## Business Health Score: {score}/100 ({classification})
{grafico spider das 6 dimensoes}

## Metricas Core
- ARM: R${value}/mes ({benchmark_status})
- LEG: {value} meses ({benchmark_status})
- Churn: {value}% ({benchmark_status})
- LTV: R${value} ({benchmark_status})
- CAC: R${value} ({benchmark_status})
- LTV/CAC: {ratio}x ({benchmark_status})
- EHR: R${value}/h ({benchmark_status})
- Margem: {value}% ({benchmark_status})

## Analise Hormozi — Value Equation
{resultados da value equation}

## Analise Cooper — Operacoes
{resultados operacionais}

## Recomendacoes (por prioridade)
1. [QUICK WIN] {recomendacao} — ROI: {roi}
2. [QUICK WIN] {recomendacao} — ROI: {roi}
3. [ESTRATEGICO] {recomendacao} — ROI: {roi}

## Plano de Acao — 90 Dias
{timeline com milestones}
```

```yaml
step_6_1:
  name: "Compilar Report e Plano de Acao"
  executor: business-diagnostician
  duration_expected: "10-15 min"
  outputs:
    - diagnostic_report: "Report completo em markdown"
    - action_plan: "Plano de acao 90 dias"
    - strategy_recommendations: "Lista priorizada"
    - business_health_score: "Score com breakdown"
```

---

## Error Handling

**Strategy:** request_data + estimate

**Common Errors:**

1. **Error:** Dados Financeiros Incompletos
   - **Cause:** Coach nao tem controle financeiro detalhado
   - **Resolution:** Usar estimativas e indicar margem de erro
   - **Recovery:** Recomendar implementacao de controle financeiro como acao prioritaria

2. **Error:** Metricas de Marketing Indisponiveis
   - **Cause:** Coach nao rastreia leads e conversao
   - **Resolution:** Pular analise de aquisicao, focar em retencao e operacoes
   - **Recovery:** Incluir setup de tracking como recomendacao

3. **Error:** NPS/Satisfacao Nao Medidos
   - **Cause:** Coach nunca fez pesquisa de satisfacao
   - **Resolution:** Usar proxies (retencao, indicacoes, depoimentos)
   - **Recovery:** Recomendar implementacao de NPS como acao

---

## Performance

```yaml
duration_expected: "45-90 min (coleta + analise + report)"
cost_estimated: "$0.03-0.10"
token_usage: "~12,000-30,000 tokens"
advisor_consultations: 2 (Hormozi, Cooper)
```

---

## Metadata

```yaml
task_id: FC-TASK-006
name: business-diagnostic
version: 1.0.0
squad: fitcoach
dependencies:
  - gym-scaler (advisor — Hormozi)
  - gym-operator (advisor — Cooper)
tags:
  - business
  - diagnostic
  - metrics
  - strategy
  - scaling
updated_at: 2026-03-11
```

---

## Handoff

```yaml
next_task:
  scaling:
    workflow: "business-scaling"
    condition: "Coach quer escalar baseado no diagnostico"
  offer:
    task: "setup-gamification"
    condition: "Recomendacao de gamificacao identificada"
  intake:
    task: "client-intake"
    condition: "Coach quer otimizar processo de onboarding"
```
