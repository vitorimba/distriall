---

# Workflow: Business Scaling — Escalar o Negocio do Coach

## Workflow Definition

```yaml
workflow:
  id: FC-WF-002
  name: "Business Scaling"
  squad: fitcoach
  version: 1.0.0
  description: >-
    Escalar o negocio do coach de consultoria individual para plataforma
    completa de coaching fitness. 8 fases sequenciais que cobrem desde o
    diagnostico inicial ate a multiplicacao do sistema, passando por design
    de oferta, funil de vendas, automacao, gamificacao, e-commerce e metricas.
    Usa frameworks de Alex Hormozi e Chris Cooper.
  type: business-lifecycle
  pattern_prefix: FC
  updated_at: 2026-03-11

  metadata:
    elicit: true
    confirmation_required: true
    estimated_duration: "12-24 weeks (full implementation)"
    phases: 8
    tasks_involved: 4
    sequential: true

  entry_conditions:
    - "Coach com pelo menos 5 clientes ativos"
    - "Coach quer escalar alem do modelo 1-on-1 puro"
    - "Coach disposto a investir tempo em construcao de sistemas"

  exit_conditions:
    - "Todas as 8 fases implementadas"
    - "Metricas de saude do negocio estabilizadas"
    - "Sistema rodando de forma autonoma com supervisao minima"
```

---

## Overview do Workflow

```
┌────────────────────────────────────────────────────────────────────────────┐
│                      BUSINESS SCALING WORKFLOW                            │
│                                                                            │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐              │
│  │ PHASE 1  │──→│ PHASE 2  │──→│ PHASE 3  │──→│ PHASE 4  │              │
│  │DIAGNOSTIC│   │  OFFER   │   │  FUNNEL  │   │AUTOMATION│              │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘              │
│                                                     │                     │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌────▼─────┐              │
│  │ PHASE 8  │←──│ PHASE 7  │←──│ PHASE 6  │←──│ PHASE 5  │              │
│  │  SCALE   │   │ METRICS  │   │ECOMMERCE │   │GAMIFICAT.│              │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘              │
│                                                                            │
│  Timeline: 12-24 semanas para implementacao completa                      │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: DIAGNOSTIC — Diagnostico do Negocio

### Objetivo
Entender o estado atual do negocio do coach, calcular metricas-chave e identificar gaps e oportunidades.

### Task Executada
`tasks/business-diagnostic.md` (FC-TASK-006)

### Executor
- **Primary:** business-diagnostician
- **Advisors:** gym-scaler (Hormozi), gym-operator (Cooper)
- **Input:** coach

### Steps Detalhados

#### 1.1 Coleta de Dados do Negocio
- Modelo de negocio atual (1on1, grupo, online, hibrido)
- Financeiro: receita, despesas, margem
- Clientes: quantidade, retencao, lifetime
- Marketing: canais, leads, conversao
- Operacoes: horas, ferramentas, equipe
- Satisfacao: NPS, depoimentos, indicacoes

#### 1.2 Calcular Metricas Core
- ARM (Average Revenue per Member)
- LEG (Length of Engagement)
- Churn Rate mensal
- LTV (Lifetime Value)
- CAC (Customer Acquisition Cost)
- LTV/CAC Ratio
- EHR (Effective Hourly Rate)
- Margem de lucro

#### 1.3 Analise Hormozi
- Value Equation aplicada ao servico
- Analise da oferta atual vs Grand Slam Offer

#### 1.4 Analise Cooper
- Metricas operacionais (EHR, time allocation)
- 4/9ths Model
- Retencao e experiencia do cliente

#### 1.5 Business Health Score
- Score composto (0-100) em 6 dimensoes
- Identificacao de areas criticas

### Outputs
- `diagnostic_report` — Report completo
- `business_health_score` — Score com breakdown
- `strategy_recommendations` — Recomendacoes priorizadas
- `action_plan` — Plano de acao 90 dias

### Checkpoint 1 → Phase 2

```yaml
checkpoint_1:
  name: "Diagnostic Complete Gate"
  conditions:
    - "Metricas core calculadas (ARM, LEG, churn, LTV, CAC)"
    - "Value Equation aplicada"
    - "Business Health Score calculado"
    - "Top 3-5 recomendacoes priorizadas"
    - "Coach revisou e concordou com diagnostico"
  on_pass: "Proceed to Phase 2"
  on_fail: "Collect missing data, re-analyze"
  blocker: true
```

---

## Phase 2: OFFER DESIGN — Design da Oferta Irresistivel

### Objetivo
Redesenhar a oferta do coach usando o framework de Grand Slam Offer de Hormozi para maximizar valor percebido e conversao.

### Task Executada
`tasks/create-offer.md` (FC-TASK-009)

### Executor
- **Primary:** business-diagnostician
- **Advisor:** gym-scaler (Alex Hormozi)
- **Input:** coach

### Steps Detalhados

#### 2.1 Hormozi Value Equation — Redesign

Aplicar os 4 componentes da Value Equation para redesenhar a oferta:

**Maximizar Dream Outcome:**
- Definir transformacao especifica e desejavel
- Criar naming poderoso para o programa
- Exemplos: "Protocolo Elite 90 Dias", "Transformacao Total 12 Semanas"
- Prova social: before/after, depoimentos, numeros

**Maximizar Perceived Likelihood:**
- Garantia de resultado (ex: "Se nao ver mudancas em 30 dias, devolvemos")
- Cases de sucesso documentados
- Metodologia clara e transparente
- Credenciais e autoridade do coach

**Minimizar Time Delay:**
- Resultados visiveis nas primeiras 2-4 semanas
- Quick wins no inicio (ajuste de dieta, hidratacao, sono)
- Dashboard de progresso em tempo real
- Fotos comparativas frequentes

**Minimizar Effort & Sacrifice:**
- Sistema "done for you" (planos prontos, lista de compras)
- Substituicoes faceis na dieta
- Treinos eficientes (otimizar tempo)
- Suporte continuo (tirar duvidas rapidamente)

```yaml
step_2_1:
  name: "Redesign Value Equation"
  executor: business-diagnostician
  advisor: gym-scaler
  duration: "30-45 min"
  components:
    dream_outcome:
      current_score: "[from diagnostic]"
      target_score: "8-10"
      improvements: ["Lista de melhorias"]
    perceived_likelihood:
      current_score: "[from diagnostic]"
      target_score: "8-10"
      improvements: ["Lista de melhorias"]
    time_delay:
      current_score: "[from diagnostic]"
      target_score: "8-10"
      improvements: ["Lista de melhorias"]
    effort_sacrifice:
      current_score: "[from diagnostic]"
      target_score: "8-10"
      improvements: ["Lista de melhorias"]
```

#### 2.2 Grand Slam Offer Stack

Construir oferta completa com stack de bonus:

**Oferta Core:**
- Plano de treino personalizado com periodizacao
- Plano nutricional com substituicoes
- Acompanhamento semanal com report detalhado
- Ajustes baseados em dados (AI-assisted)

**Bonus Stack:**
- Bonus 1: Guia de Meal Prep (valor: R$97)
- Bonus 2: Acesso ao grupo exclusivo de comunidade (valor: R$197)
- Bonus 3: Sessao de posing/avaliacao mensal (valor: R$147)
- Bonus 4: Ebook de receitas fitness (valor: R$47)
- Bonus 5: Consultoria de suplementacao (valor: R$97)
- Bonus 6: Acesso ao sistema de gamificacao (valor: R$97)

**Pricing Strategy (Hormozi):**
- Ancorar no valor total (core + bonus = R$X)
- Preço real = fração do valor total
- Mostrar economia vs comprar separadamente
- Pagamento facilitado (12x, etc.)

**Escassez e Urgencia:**
- Vagas limitadas (real, nao artificial): "Aceito apenas X novos alunos/mes"
- Bonus disponivel apenas nos primeiros 7 dias
- Lista de espera quando lotado

**Garantia:**
- Garantia de satisfacao de 30 dias
- Ou garantia de resultado: "Se voce seguir 80%+ e nao ver resultados em 90 dias..."

```yaml
step_2_2:
  name: "Grand Slam Offer Stack"
  executor: business-diagnostician
  advisor: gym-scaler
  duration: "20-30 min"
  offer:
    core:
      items: ["Lista de itens da oferta core"]
      value: "R$ valor percebido"
    bonuses:
      - name: "Nome do bonus"
        value: "R$ valor percebido"
        delivery: "Como e entregue"
        cost_to_deliver: "R$ custo real"
    pricing:
      anchor_value: "R$ total"
      actual_price: "R$ preco cobrado"
      payment_options: ["a vista", "12x"]
    scarcity: "Descricao da escassez"
    urgency: "Descricao da urgencia"
    guarantee: "Tipo e termos da garantia"
  output: offer_design
```

#### 2.3 Tiers de Servico

Criar 3 tiers de servico para capturar diferentes perfis:

| Tier | Nome | Preco Sugerido | Inclui |
|------|------|---------------|--------|
| **Silver** | Protocolo Guiado | R$297-497/mes | Plano treino+dieta, check-in quinzenal, grupo geral |
| **Gold** | Acompanhamento Completo | R$697-997/mes | Tudo do Silver + check-in semanal, ajustes IA, gamificacao |
| **Platinum** | Elite Coaching | R$1497-2997/mes | Tudo do Gold + call semanal, competition prep, prioridade |

```yaml
step_2_3:
  name: "Design de Tiers"
  executor: business-diagnostician
  advisor: gym-scaler
  duration: "15-20 min"
  tiers:
    - name: "Silver"
      price_range: "R$297-497"
      target_persona: "Iniciante, quer orientacao basica"
      margin: "Alta (escala)"
      capacity: "Ilimitado (mais automatizado)"
    - name: "Gold"
      price_range: "R$697-997"
      target_persona: "Intermediario, quer resultados reais"
      margin: "Media"
      capacity: "30-50 clientes"
    - name: "Platinum"
      price_range: "R$1497-2997"
      target_persona: "Avancado/Elite, quer atencao total"
      margin: "Media-Alta (valor premium)"
      capacity: "10-15 clientes"
  output: tier_design
```

### Checkpoint 2 → Phase 3

```yaml
checkpoint_2:
  name: "Offer Design Complete Gate"
  conditions:
    - "Value Equation redesenhada com scores melhorados"
    - "Grand Slam Offer montada com bonus stack"
    - "Tiers de servico definidos com pricing"
    - "Garantia definida"
    - "Coach aprovou a oferta"
  on_pass: "Proceed to Phase 3"
  on_fail: "Iterate on offer design"
  blocker: true
```

---

## Phase 3: FUNNEL — Funil de Vendas

### Objetivo
Criar funil de aquisicao de clientes do Instagram ate a conversao.

### Executor
- **Primary:** business-diagnostician
- **Advisor:** gym-scaler (Hormozi), gym-operator (Cooper)
- **Execution:** automation-engineer

### Funil Structure

```
                    ┌──────────────────┐
                    │   INSTAGRAM      │ ← Conteudo diario
                    │   (Topo do       │    Reels, Stories
                    │    funil)        │    Provas sociais
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   LANDING PAGE   │ ← Oferta clara
                    │   (Captura)      │    VSL ou copy
                    │                  │    CTA forte
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   ANAMNESE       │ ← Formulario qualificador
                    │   (Qualificacao) │    Filtra leads serios
                    │                  │    Coleta dados iniciais
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   CONSULTORIA    │ ← Call/WhatsApp
                    │   (Conversao)    │    Diagnostico gratuito
                    │                  │    Apresentar oferta
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │   ONBOARDING     │ ← Client intake
                    │   (Entrega)      │    Full client journey
                    └──────────────────┘
```

### Steps Detalhados

#### 3.1 Estrategia de Conteudo (Topo do Funil)

**Pilares de Conteudo:**
- **Educacional (40%):** Dicas de treino, nutricao, mitos desmascarados
- **Prova Social (30%):** Before/after, depoimentos, cases
- **Entretenimento (20%):** Humor fitness, trends, day-in-the-life
- **Venda (10%):** CTA direto para consultoria/oferta

**Frequencia:**
- Stories: 5-10/dia
- Reels: 3-5/semana
- Posts feed: 3-5/semana
- Lives: 1/semana (opcional)

```yaml
step_3_1:
  name: "Estrategia de Conteudo"
  executor: content-repurposer
  advisor: gym-scaler
  duration: "20-30 min"
  content_pillars:
    educational: 40
    social_proof: 30
    entertainment: 20
    sales: 10
  frequency:
    stories_daily: "5-10"
    reels_weekly: "3-5"
    posts_weekly: "3-5"
    lives_weekly: "0-1"
  output: content_strategy
```

#### 3.2 Landing Page

```yaml
step_3_2:
  name: "Landing Page Design"
  executor: automation-engineer
  advisor: gym-scaler
  duration: "30-60 min"
  sections:
    hero:
      headline: "Transformacao especifica e desejavel"
      subheadline: "Beneficio principal"
      cta: "Agendar Consultoria Gratuita"
    social_proof:
      before_after: "3-5 transformacoes"
      testimonials: "5-10 depoimentos"
      numbers: "X clientes transformados"
    offer:
      what_you_get: "Lista clara da oferta"
      bonuses: "Stack de bonus"
      pricing: "Preco ancorado"
      guarantee: "Garantia"
    faq:
      questions: "10 perguntas mais comuns"
    final_cta:
      urgency: "Vagas limitadas"
      action: "Preencher anamnese inicial"
```

#### 3.3 Anamnese de Qualificacao (Lead Magnet)

- Formulario mais curto que o intake completo
- Objetivo: qualificar o lead e coletar dados basicos
- Campos: nome, objetivo, nivel de experiencia, urgencia, orcamento
- Automacao: enviar email/WhatsApp de follow-up baseado nas respostas

#### 3.4 Consultoria de Conversao

- Script de consultoria gratuita (30min)
- Diagnostico rapido do estado atual
- Mostrar o gap entre onde esta e onde quer chegar
- Apresentar a oferta como ponte para o resultado
- Objecoes e respostas preparadas
- Close: fechamento suave com prazo de decisao

```yaml
step_3_4:
  name: "Script de Consultoria"
  executor: business-diagnostician
  advisor: gym-scaler
  duration: "15-20 min"
  script_phases:
    rapport: "5 min — Conexao pessoal"
    diagnostic: "10 min — Onde esta e onde quer chegar"
    gap: "5 min — Mostrar o gap"
    offer: "5 min — Apresentar solucao"
    close: "5 min — Fechamento + objecoes"
  output: sales_script
```

### Checkpoint 3 → Phase 4

```yaml
checkpoint_3:
  name: "Funnel Complete Gate"
  conditions:
    - "Estrategia de conteudo definida e calendarizada"
    - "Landing page criada ou blueprint definido"
    - "Formulario de qualificacao configurado"
    - "Script de consultoria documentado"
    - "Automacoes de follow-up configuradas"
  on_pass: "Proceed to Phase 4"
  on_fail: "Complete missing funnel components"
  blocker: true
```

---

## Phase 4: AUTOMATION — Automacao Completa

### Objetivo
Automatizar todas as comunicacoes e processos para escalar sem aumentar horas de trabalho.

### Executor
- **Primary:** automation-engineer
- **Advisor:** gym-operator (Cooper)

### Automacoes a Implementar

#### 4.1 Automacao de Lead Nurturing
- Email sequence pos-lead captura (5-7 emails em 14 dias)
- WhatsApp follow-up automatico
- Retargeting para leads que nao converteram

#### 4.2 Automacao de Onboarding
- Welcome message automatica apos pagamento
- Envio de formulario de anamnese completa
- Agendamento de call de onboarding
- Envio de material de boas-vindas

#### 4.3 Automacao de Acompanhamento
- Check-in semanal automatizado
- Lembretes de treino e dieta
- Notificacoes de gamificacao
- Reports automaticos para o coach

#### 4.4 Automacao de Retencao
- Deteccao de churn risk automatizada
- Mensagens de re-engajamento
- Celebracao automatica de milestones
- Pesquisa de satisfacao periodica (NPS)

#### 4.5 Automacao de Cobranca
- Billing recorrente automatizado
- Dunning management (cobranca de inadimplentes)
- Upgrade/downgrade de plano
- Cancelamento com oferta de retencao

```yaml
step_4:
  name: "Setup Automacoes"
  executor: automation-engineer
  advisor: gym-operator
  duration: "2-3 semanas"
  automations:
    lead_nurturing:
      channel: [email, whatsapp]
      sequence_length: "5-7 touchpoints over 14 days"
      tools: ["Mailchimp/ActiveCampaign", "WhatsApp Business API"]
    onboarding:
      channel: [whatsapp, email]
      triggers: ["payment_confirmed", "form_submitted", "call_scheduled"]
    tracking:
      channel: [whatsapp, email, push]
      triggers: ["scheduled_checkin", "missed_checkin", "milestone"]
    retention:
      channel: [whatsapp, email]
      triggers: ["churn_risk_detected", "milestone_achieved", "nps_due"]
    billing:
      platform: "Stripe/Hotmart/Kiwify"
      features: ["recurring", "dunning", "upgrade_downgrade"]
  output: automation_setup
```

### Checkpoint 4 → Phase 5

```yaml
checkpoint_4:
  name: "Automation Complete Gate"
  conditions:
    - "Lead nurturing sequence ativa e testada"
    - "Onboarding automatizado end-to-end"
    - "Check-in semanal automatizado"
    - "Retencao automatizada com deteccao de churn"
    - "Billing recorrente configurado"
  on_pass: "Proceed to Phase 5"
  on_fail: "Complete missing automations"
  blocker: true
```

---

## Phase 5: GAMIFICATION — Sistema de Engajamento

### Objetivo
Implementar sistema completo de gamificacao para maximizar aderencia e retencao.

### Task Executada
`tasks/setup-gamification.md` (FC-TASK-007)

### Executor
- **Primary:** gamification-designer (Yu-kai Chou)
- **Hooks:** retention-engineer (Nir Eyal)

### Resumo da Implementacao
- Octalysis Framework com 8 core drives mapeados para fitness
- Hook Model com 4 loops diarios
- 30+ achievements e badges
- Challenges individuais e em grupo
- Leaderboard semanal, mensal e all-time
- Streaks com freeze mechanics

### Checkpoint 5 → Phase 6

```yaml
checkpoint_5:
  name: "Gamification Complete Gate"
  conditions:
    - "Octalysis aplicado e core drives definidos"
    - "Hook Model desenhado com 4 loops"
    - "Achievement system com 30+ badges"
    - "Challenges library com 12+ challenges"
    - "Leaderboard configurado"
    - "Gamification engine operacional"
  on_pass: "Proceed to Phase 6"
  on_fail: "Complete gamification setup"
  blocker: true
```

---

## Phase 6: ECOMMERCE — Loja de Produtos

### Objetivo
Criar canal adicional de receita com produtos fisicos e digitais relacionados ao fitness.

### Executor
- **Primary:** ecommerce-manager
- **Advisor:** gym-scaler (Hormozi)

### Steps Detalhados

#### 6.1 Catalogo de Produtos

**Produtos Digitais (Margem Alta):**
- Ebooks de receitas fitness (R$27-47)
- Guias de treino especificos (R$37-67)
- Curso em video de posing (R$97-197)
- Templates de planilha de treino (R$17-37)
- Masterclass gravada de nutricao (R$97-197)

**Produtos Fisicos (Parcerias/Dropshipping):**
- Suplementos (whey, creatina, pre-treino) — parceria com marcas
- Acessorios de treino (straps, cintos, luvas)
- Vestuario fitness (camisetas, shorts, leggings)
- Shakers e meal prep containers

**Integracao com Gamificacao:**
- Descontos como recompensa de gamificacao
- Produtos exclusivos para niveis altos
- Challenge prizes com produtos da loja

```yaml
step_6_1:
  name: "Catalogo de Produtos"
  executor: ecommerce-manager
  duration: "1-2 semanas"
  categories:
    digital:
      - type: "ebook"
        margin: "90%+"
        delivery: "automatica"
      - type: "curso"
        margin: "95%+"
        delivery: "plataforma de curso"
    physical:
      - type: "suplementos"
        margin: "20-40%"
        delivery: "parceiro/dropship"
      - type: "acessorios"
        margin: "30-50%"
        delivery: "parceiro/dropship"
  output: product_catalog
```

#### 6.2 Recomendacao Personalizada

- Sugerir suplementos baseados no plano nutricional
- Cross-sell de produtos baseados no objetivo do cliente
- Upsell de nivel de servico baseado em engajamento

#### 6.3 Setup da Loja

- Plataforma: Shopify, Hotmart, ou integracao propria
- Pagamento: PIX, cartao, boleto
- Logistica: Parceiro de fulfillment ou dropshipping

### Checkpoint 6 → Phase 7

```yaml
checkpoint_6:
  name: "Ecommerce Complete Gate"
  conditions:
    - "Catalogo de produtos definido (min 5 produtos)"
    - "Loja online operacional"
    - "Pagamento e logistica configurados"
    - "Integracao com gamificacao ativa"
    - "Recomendacao personalizada funcionando"
  on_pass: "Proceed to Phase 7"
  on_fail: "Complete ecommerce setup"
  blocker: false  # Ecommerce e opcional para scaling
```

---

## Phase 7: METRICS — Dashboard de Metricas

### Objetivo
Implementar tracking completo de todas as metricas do negocio para tomada de decisao data-driven.

### Executor
- **Primary:** business-diagnostician
- **Advisor:** gym-operator (Cooper)

### Dashboard de Metricas

#### 7.1 Metricas Financeiras (Diario/Semanal)
- MRR (Monthly Recurring Revenue)
- ARM (Average Revenue per Member)
- Receita total (recorrente + avulsa + ecommerce)
- Margem de lucro
- Cash flow

#### 7.2 Metricas de Clientes (Semanal)
- Total de clientes ativos
- Novos clientes no periodo
- Churn rate mensal
- LEG (Length of Engagement)
- LTV (Lifetime Value)

#### 7.3 Metricas de Aquisicao (Semanal)
- Leads gerados
- Taxa de conversao lead → cliente
- CAC (Customer Acquisition Cost)
- LTV/CAC ratio
- Fonte de leads (Instagram, referral, organic)

#### 7.4 Metricas de Engajamento (Semanal)
- Check-in completion rate
- Gamification participation rate
- Average streak length
- Challenge participation rate
- Community engagement rate

#### 7.5 Metricas de Resultado (Mensal)
- % de clientes atingindo objetivos
- Progresso medio dos clientes
- NPS score
- Referral rate

```yaml
step_7:
  name: "Setup Dashboard de Metricas"
  executor: business-diagnostician
  advisor: gym-operator
  duration: "1-2 semanas"
  dashboard:
    financial:
      frequency: "daily/weekly"
      metrics: [mrr, arm, total_revenue, margin, cash_flow]
    clients:
      frequency: "weekly"
      metrics: [active_clients, new_clients, churn, leg, ltv]
    acquisition:
      frequency: "weekly"
      metrics: [leads, conversion_rate, cac, ltv_cac, lead_source]
    engagement:
      frequency: "weekly"
      metrics: [checkin_rate, gamification_rate, streak_avg, challenge_rate]
    results:
      frequency: "monthly"
      metrics: [goal_achievement, avg_progress, nps, referral_rate]
  alerts:
    - "Churn > 10%: alerta vermelho"
    - "LTV/CAC < 3: alerta amarelo"
    - "NPS < 30: alerta vermelho"
    - "MRR caindo 2+ meses: alerta vermelho"
  output: metrics_dashboard
```

### Checkpoint 7 → Phase 8

```yaml
checkpoint_7:
  name: "Metrics Complete Gate"
  conditions:
    - "Dashboard operacional com dados em tempo real"
    - "Alertas automaticos configurados"
    - "Coach sabe interpretar cada metrica"
    - "Processo de review mensal definido"
  on_pass: "Proceed to Phase 8"
  on_fail: "Complete metrics setup"
  blocker: true
```

---

## Phase 8: SCALE — Multiplicar o Sistema

### Objetivo
Com todos os sistemas em funcionamento, escalar o negocio multiplicando a capacidade sem multiplicar as horas de trabalho.

### Executor
- **Primary:** business-diagnostician
- **Advisors:** gym-scaler (Hormozi), gym-operator (Cooper)

### Estrategias de Scaling

#### 8.1 Escalar Clientes sem Escalar Horas

**Modelo de Scaling Hormozi:**
- Tier Silver: totalmente automatizado (capacidade ilimitada)
- Tier Gold: semi-automatizado (AI + check-ins) (30-50 clientes)
- Tier Platinum: high-touch (10-15 clientes)

**Formula de Capacidade:**
```
Horas Disponiveis = 40h/semana (ideal)
Tempo por Cliente:
  - Silver: 15min/semana (automatizado)
  - Gold: 30min/semana (check-in + ajustes)
  - Platinum: 2h/semana (calls + atencao especial)

Exemplo de Mix Otimizado:
  - 100 Silver × 15min = 25h/semana
  - 30 Gold × 30min = 15h/semana
  - 0 Platinum = 0h/semana (coach delega)
  Total: 40h/semana, 130 clientes, receita alta
```

#### 8.2 Construir Equipe

**Modelo Cooper de Delegacao:**

| Funcao | Quando Contratar | Custo Estimado | ROI |
|--------|------------------|----------------|-----|
| Assistente Virtual | 30+ clientes | R$1500-3000/mes | Alto (libera tempo do coach) |
| Nutricionista | 50+ clientes | R$3000-5000/mes | Medio (permite aceitar mais clientes) |
| Outro Coach | 80+ clientes | R$4000-8000/mes | Alto (duplica capacidade) |
| Social Media | Qualquer momento | R$1500-3000/mes | Variavel (depende da estrategia) |
| Customer Success | 100+ clientes | R$2500-4000/mes | Alto (retencao) |

#### 8.3 Multiplicar Ofertas

- Criar programas em grupo (8-12 semanas, preco menor, escala maior)
- Criar curso online (produto digital, escala infinita)
- Franquear metodo para outros coaches
- Criar comunidade paga (membership recorrente)
- Eventos presenciais (workshops, retiros fitness)

#### 8.4 Expandir Canais

- YouTube como segundo canal de topo de funil
- Podcast para autoridade
- Parcerias com outros coaches (niches complementares)
- Ads pagos (Facebook, Instagram, Google) quando unit economics saudavel

```yaml
step_8:
  name: "Plano de Scaling"
  executor: business-diagnostician
  advisors: [gym-scaler, gym-operator]
  duration: "Ongoing"
  scaling_strategies:
    capacity:
      method: "Tier mix optimization"
      target: "100+ clients with 40h/week"
    team:
      first_hire: "Virtual assistant at 30 clients"
      second_hire: "Nutritionist at 50 clients"
      third_hire: "Junior coach at 80 clients"
    offers:
      group_programs: "Lancamento semestral"
      online_course: "Construir quando tiver autoridade"
      community: "Membership pos-100 clientes"
    channels:
      primary: "Instagram (organico)"
      secondary: "YouTube + Podcast"
      paid: "Ads quando LTV/CAC > 5x"
  output: scaling_plan
```

### Checkpoint 8 (Continuo)

```yaml
checkpoint_8:
  name: "Scaling Health Check"
  frequency: "quarterly"
  conditions:
    - "Revenue growing month-over-month"
    - "EHR increasing or stable"
    - "Client satisfaction maintained (NPS > 50)"
    - "Coach hours not increasing proportionally to revenue"
    - "Team performing well (if hired)"
  on_healthy: "Continue scaling"
  on_plateau: "Review and optimize specific phase"
  on_decline: "Emergency diagnostic — return to Phase 1"
```

---

## Workflow Configuration

```yaml
configuration:
  timeline:
    phase_1_diagnostic: "Week 1-2"
    phase_2_offer: "Week 2-4"
    phase_3_funnel: "Week 4-6"
    phase_4_automation: "Week 6-9"
    phase_5_gamification: "Week 9-12"
    phase_6_ecommerce: "Week 12-16"
    phase_7_metrics: "Week 16-18"
    phase_8_scale: "Week 18+ (ongoing)"

  reviews:
    frequency: "monthly"
    participants: [coach, business-diagnostician]
    agenda: ["Metricas review", "What's working", "What's not", "Next actions"]

  success_definition:
    revenue: "3x revenue in 12 months"
    clients: "3x clients in 12 months"
    hours: "Same or fewer hours worked"
    satisfaction: "NPS > 50 maintained"
```

---

## Metadata

```yaml
workflow_id: FC-WF-002
name: business-scaling
version: 1.0.0
squad: fitcoach
tasks:
  - business-diagnostic (FC-TASK-006)
  - setup-gamification (FC-TASK-007)
  - create-offer (FC-TASK-009)
agents:
  - business-diagnostician
  - automation-engineer
  - ecommerce-manager
  - content-repurposer
  - gamification-designer
  - retention-engineer
advisors:
  - gym-scaler (Hormozi)
  - gym-operator (Cooper)
  - gamification-designer (Yu-kai Chou)
  - retention-engineer (Nir Eyal)
tags:
  - business
  - scaling
  - hormozi
  - cooper
  - funnel
  - automation
  - ecommerce
updated_at: 2026-03-11
```
