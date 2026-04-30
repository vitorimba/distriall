# FitCoach Squad — Blueprint Completo

**Status:** Blueprint aprovado, aguardando criação
**Data:** 2026-03-11
**Cliente:** Carlos Salvador Jr (@carlosalvadorjr) — Físico Além do Shape
**Pack:** `fitcoach`
**Slash Prefix:** `FitCoach`
**Pattern Prefix:** `FC`
**Version:** 1.0.0

---

## 1. Contexto do Cliente

### Perfil
- **Nome:** Carlos Salvador Jr
- **Instagram:** @carlosalvadorjr (verificado, 9.476 seguidores, 1.005 posts)
- **Bio:** "O melhor físico da sua vida. Sem perder a sua vida. Físico além do shape | 10x Top Coach 🏆"
- **Negócio:** Consultoria esportiva online + academia
- **WhatsApp:** 5517992722010 (DDD 17 — interior SP)
- **Marca:** Físico Além do Shape
- **Equipe:** Time de coaches
- **Conteúdo:** Transformações before/after, dicas de treino/nutrição, mindset, lifestyle
- **Destaques Instagram:** "Carlos Salva..." e "Resultados"

### Necessidades Identificadas
- Otimizar o trabalho para atender mais alunos
- Tudo pela plataforma (treino, dieta, ajustes)
- Automatizar envio de treino/dieta por WhatsApp e email
- Acompanhar progressão do aluno (fotos de evolução)
- Gamificação para engajamento
- Loja de produtos (marca própria + suplementos)
- Mais tempo + mais resultado

---

## 2. Visão da Plataforma

### Core Features
1. **Prescrição de treino** — Montar, lançar, ajustar periodização
2. **Prescrição de dieta** — Plano alimentar com macros, substituições
3. **Automação WhatsApp/Email** — Envio automático de treino/dieta, lembretes, check-ins
4. **Acompanhamento de progressão** — Fotos, medidas, peso, PRs
5. **Gamificação** — Streaks, badges, rankings, desafios
6. **E-commerce** — Produtos da marca + suplementos (loja integrada)

### Features Adicionais (aprovadas)
7. **Onboarding inteligente** — Anamnese automatizada → classificação → protocolo sugerido
8. **Check-in semanal automático** — Bot pergunta peso, fotos, aderência, humor → relatório pro coach
9. **IA de ajuste de protocolo** — Baseado nos dados do check-in, sugere ajustes (coach aprova com 1 clique)
10. **Dashboard do coach** — Visão de todos os alunos, quem precisa de atenção, quem tá evoluindo
11. **Biblioteca de exercícios com vídeo** — Aluno clica no exercício e vê a execução
12. **Comunidade/grupo** — Feed entre alunos, motivação, desafios coletivos
13. **Sistema de indicação** — Aluno indica amigo → ganha benefício
14. **Integração com wearables** — Apple Watch, Garmin → dados automáticos
15. **Landing page de captação** — Funil: Instagram → LP → Anamnese → Consultoria
16. **Gestão financeira** — Cobranças, inadimplência, relatórios

### Features dos Conselheiros (aprovadas)
17. **Periodização inteligente** — Bompa + Israetel: ciclos de treino que se auto-ajustam
18. **Prep de competição** — Rambod + Jansen: protocolos específicos pra atletas em prep
19. **Reverse dieting** — Norton: pós-competição e transições de fase
20. **Modelo de precificação** — Hormozi: transformar consultoria em programa de alto valor
21. **Métricas de retenção** — Cooper: ARM, LEG, churn rate dos alunos
22. **Loop de hábito** — Nir Eyal: check-in diário que vicia (trigger → ação → recompensa)
23. **8 drives de motivação** — Yu-kai Chou: gamificação que realmente funciona

---

## 3. Tier Structure

```
ORCHESTRATOR: @fitcoach-chief
    │
    ├── TIER 0 — DIAGNÓSTICO
    │   ├── intake-analyst (Anamnese + classificação do aluno)
    │   └── business-diagnostician (Diagnóstico do negócio do coach)
    │
    ├── TIER 1 — CONSELHEIROS BODYBUILDING
    │   ├── hypertrophy-scientist (Mind: Dr. Mike Israetel)
    │   ├── prep-master (Mind: Hany Rambod)
    │   ├── nutrition-scientist (Mind: Dr. Layne Norton)
    │   ├── periodization-architect (Mind: Tudor Bompa)
    │   ├── biomechanics-coach (Mind: Charles Glass)
    │   └── elite-coach (Mind: Matt Jansen)
    │
    ├── TIER 2 — CONSELHEIROS BUSINESS
    │   ├── gym-scaler (Mind: Alex Hormozi)
    │   ├── gym-operator (Mind: Chris Cooper)
    │   ├── gamification-designer (Mind: Yu-kai Chou)
    │   └── retention-engineer (Mind: Nir Eyal)
    │
    ├── TIER 3 — ESPECIALISTAS PLATAFORMA
    │   ├── training-builder (Monta protocolos de treino)
    │   ├── diet-builder (Monta planos nutricionais)
    │   ├── automation-engineer (WhatsApp/Email automações)
    │   ├── progress-tracker (Fotos, medidas, evolução)
    │   ├── ecommerce-manager (Loja de suplementos/produtos)
    │   └── content-repurposer (Instagram → multi-formato)
    │
    └── TOOLS
        ├── training-plan-generator
        ├── macro-calculator
        ├── progress-comparator (antes/depois)
        ├── gamification-engine
        └── quality-checker
```

**Total: ~20 agents** (1 orchestrator + 2 tier-0 + 6 tier-1 + 4 tier-2 + 6 tier-3 + 5 tools)

---

## 4. Conselheiros Bodybuilding (Tier 1) — Minds Pesquisados

### 4.1 Dr. Mike Israetel — Hypertrophy Scientist
- **Organização:** RP Strength (Renaissance Periodization)
- **Credenciais:** PhD em Sport Physiology (East Tennessee State University)
- **Expertise:** Hipertrofia baseada em ciência, volume landmarks, periodização
- **Frameworks:**
  - Volume Landmarks System (MEV/MAV/MRV/MV)
  - SRA Curve (Stimulus-Recovery-Adaptation)
  - Hypertrophy Training Variables (volume, intensity, frequency, exercise selection)
  - Mesocycle Periodization
  - Fatigue Management
- **Publicações:** Renaissance Diet 2.0, Scientific Principles of Hypertrophy Training, Scientific Principles of Strength Training, e mais
- **Voice:** Científico mas acessível, usa dados e estudos, direto, às vezes humorístico/sarcástico, evidence-based sempre
- **Fonte:** https://rpstrength.com/pages/team/michael-israetel

### 4.2 Hany Rambod — Prep Master ("The Pro Creator")
- **Título:** 10+ títulos Olympia como coach
- **Atletas:** Phil Heath (7x Mr. Olympia), Jay Cutler (4x), Chris Bumstead, Hadi Choopan, Dana Linn Bailey, The Rock
- **Frameworks:**
  - FST-7 (Fascia Stretch Training — 7 sets finais para pump máximo)
  - Peak Week Protocol
  - Competition Prep Timeline (16-20 semanas)
  - Physique Assessment Matrix
  - Recovery Protocol
- **Filosofia:** A fascia mais larga = maior potencial de crescimento. Treino pesado (8-12 reps) + pump volumization
- **Voice:** Autoritário, calma confiança, metódico, protetor da saúde dos atletas
- **Fonte:** https://www.hanyrambod.com/fst7/

### 4.3 Dr. Layne Norton — Nutrition Scientist (Biolayne)
- **Credenciais:** PhD em Nutritional Sciences (com foco em metabolismo proteico)
- **Resultados:** 70+ atletas transformados em pro
- **Frameworks:**
  - Reverse Dieting Protocol
  - Metabolic Adaptation Management
  - Protein Distribution Model
  - PHAT Training System (Power Hypertrophy Adaptive Training)
  - Evidence-Based Nutrition Hierarchy
- **Publicações:** Biolayne Nutrition Certification, podcast, múltiplos artigos científicos
- **Voice:** Evidence-based, no-BS, desafia bro-science, apaixonado por ciência, confrontacional com desinformação
- **Fonte:** https://biolayne.com/coach/layne-norton/

### 4.4 Tudor Bompa — Periodization Architect
- **Título:** Pai da periodização moderna (desde 1963)
- **Impacto:** Livros traduzidos em 19 idiomas, usado em 180+ países
- **Frameworks:**
  - 6-Phase Periodization: anatomical adaptation → hypertrophy → maximum strength → conversion → maintenance → peaking
  - Annual Training Plan (macrociclo/mesociclo/microciclo)
  - Biomotor Abilities Framework
  - Load Progression Principles
  - Volume-Intensity Relationship
- **Princípios:** Multilateral development, individualization, load progression, training sequence
- **Voice:** Acadêmico, sistemático, estruturado, autoridade de 60+ anos de ciência esportiva
- **Fonte:** https://us.humankinetics.com/products/periodization-6th-edition

### 4.5 Charles Glass — Biomechanics Coach ("The Godfather of Bodybuilding")
- **Local:** Gold's Gym Venice (lendário)
- **Atletas:** Flex Wheeler, Ben Pakulski, Steve Cook, Guy Cisternino
- **Frameworks:**
  - Movement Quality Assessment
  - Mind-Muscle Connection Protocol
  - Exercise Variation Matrix
  - Injury Prevention Checklist
  - Form Correction Hierarchy
- **Expertise:** Biomecânica de exercícios, correção de movimento, variações de exercícios, prevenção de lesões
- **Voice:** Prático, hands-on, comunicação visual, old-school wisdom + entendimento moderno, paciente mas exigente na forma
- **Fonte:** https://fitnessvolt.com/best-bodybuilding-coaches/

### 4.6 Matt Jansen — Elite Coach
- **Resultados:** 16 IFBB pros ao palco do Olympia
- **Atletas:** Nick Walker, Shaun Clarida, Iain Valliere, Nathan DeAsha, Charles Griffen
- **Frameworks:**
  - Integrated Training-Nutrition Protocol
  - Athlete Assessment Framework
  - Progressive Intensity Model
  - Competition Timeline Management
  - Client Communication System
- **Abordagem:** Periodização intuitiva + nutrição integrada, ponte entre old school e new school
- **Voice:** Intenso, apaixonado, sem desculpas, experiência competitiva atual, adaptativo e prático
- **Fonte:** https://fitnessvolt.com/best-bodybuilding-coaches/

---

## 5. Conselheiros Business (Tier 2) — Minds Pesquisados

### 5.1 Alex Hormozi — Gym Scaler
- **Empresa:** Gym Launch → Acquisition.com
- **Resultados:** De 1 academia falindo a $100M em 3 anos. 4.500+ academias em 13 países
- **Frameworks:**
  - Value Equation: Dream Outcome × Perceived Likelihood / Time Delay × Effort & Sacrifice
  - Grand Slam Offer design
  - Lead → Nurture → Close → Deliver → Retain pipeline
  - Pricing Strategy (premium positioning)
  - 6-Week Challenge Model
  - Three Growth Levers: more customers, more value per customer, longer retention
- **Livros:** $100M Offers, $100M Leads, Gym Launch Secrets
- **Voice:** Direto, no-fluff, agressivo mas inteligente, usa números pra provar tudo, energia empreendedora, contrarian
- **Fonte:** https://www.gymlaunch.com/

### 5.2 Chris Cooper — Gym Operator (Two-Brain Business)
- **Empresa:** Two-Brain Business (maior mentoria de academias do mundo)
- **Resultados:** Best-selling fitness business book de todos os tempos
- **Frameworks:**
  - Flywheel Growth Model
  - Key Metrics: ARM ($205+), LEG (13+ meses), EHR, NOB, ROI
  - Optimal Gym Model: 150 clientes, $205 ARM, 13+ meses retenção, despesas fixas <30%, staff <44%
  - Staff Hiring & Delegation Framework
  - Client Journey: No Sweat Intro → On-ramp → Group → PT → Nutrition
  - Revenue Stream Diversification
- **Filosofia:** Simplicidade escala. Auditar o que funciona, encontrar o core, definir a visão, simplificar, duplicar
- **Voice:** Metódico, data-driven, calor de mentor, ênfase em simplicidade sobre complexidade
- **Fonte:** https://twobrainbusiness.com/

### 5.3 Yu-kai Chou — Gamification Designer
- **Título:** Autoridade mundial em gamificação
- **Frameworks:**
  - Octalysis Framework — 8 Core Drives:
    1. Epic Meaning & Calling (propósito maior)
    2. Development & Accomplishment (progresso visível)
    3. Empowerment of Creativity & Feedback (autonomia)
    4. Ownership & Possession (posse e customização)
    5. Social Influence & Relatedness (comunidade)
    6. Scarcity & Impatience (escassez e urgência)
    7. Unpredictability & Curiosity (surpresa)
    8. Loss & Avoidance (medo de perder)
  - Left Brain (Extrinsic) vs Right Brain (Intrinsic) drives
  - White Hat (positivo) vs Black Hat (urgência) gamification
  - Level 2 Octalysis (player types)
- **Livro:** Actionable Gamification: Beyond Points, Badges and Leaderboards
- **Aplicação fitness:** mHealth apps, wellness programs, community challenges
- **Voice:** Criativo, entusiasta sobre psicologia humana, fala por exemplos e histórias, visionário mas prático
- **Fonte:** https://yukaichou.com/gamification-examples/octalysis-gamification-framework/

### 5.4 Nir Eyal — Retention Engineer
- **Frameworks:**
  - Hook Model (4 fases):
    1. Trigger (Internal/External) — o que inicia o comportamento
    2. Action (Fogg Behavior Model: motivation + ability + trigger) — ação mínima
    3. Variable Reward (Tribe, Hunt, Self) — recompensa variável
    4. Investment (stored value, loading next trigger) — investimento que carrega próximo trigger
  - Habit Zone Matrix (frequency × perceived utility)
  - Internal Trigger Discovery (5 Whys method)
  - Manipulation Matrix (ethical framework)
  - Indistractable Model (traction vs distraction)
- **Livros:** Hooked: How to Build Habit-Forming Products, Indistractable
- **Voice:** Reflexivo, metódico, profundidade psicológica, usa exemplos de produtos reais
- **Fonte:** https://www.nirandfar.com/

---

## 6. Agents Tier 0 — Diagnóstico

### 6.1 intake-analyst
- **Role:** Analista de intake e classificação de alunos
- **Purpose:** Primeiro contato. Anamnese completa, classifica nível, objetivos, restrições, direciona pro tier correto
- **Frameworks:**
  - Client Classification Matrix (level × goal × restrictions)
  - Anamnesis Protocol (medical, training, nutrition, lifestyle)
  - Goal-to-Tier Routing Map
  - Red Flag Detection (injuries, contraindications)
- **Classificações:** Iniciante / Intermediário / Avançado / Competidor
- **Output:** Perfil classificado + routing recommendation

### 6.2 business-diagnostician
- **Role:** Diagnosticador de negócio fitness
- **Purpose:** Analisa o negócio do coach. Identifica gargalos, oportunidades, métricas, recomenda estratégias
- **Frameworks:**
  - Business Health Score (0-100)
  - Revenue Stream Matrix
  - Digital Maturity Assessment
  - Bottleneck Identification Framework
  - Growth Readiness Score
- **Output:** Diagnóstico + score + recomendações dos conselheiros business

---

## 7. Agents Tier 3 — Especialistas Plataforma

### 7.1 training-builder
- **Role:** Construtor de protocolos de treino
- **Consome:** Volume Landmarks (Israetel), FST-7 (Rambod), Periodização (Bompa), Biomecânica (Glass), PHAT (Norton)
- **Output:** Plano de treino completo com periodização, split, exercícios, séries/reps/carga/RIR

### 7.2 diet-builder
- **Role:** Construtor de planos nutricionais
- **Consome:** Reverse Dieting (Norton), Nutrition Periodization (Israetel), Peak Week Nutrition (Rambod)
- **Output:** Plano alimentar com macros, cardápio, substituições, fases

### 7.3 automation-engineer
- **Role:** Engenheiro de automação de comunicação
- **Expertise:** WhatsApp Business API, email automation, chatbot flows, check-ins automáticos
- **Output:** Automações configuradas e funcionando

### 7.4 progress-tracker
- **Role:** Tracker de progressão do aluno
- **Expertise:** Composição corporal, fotos before/after, medidas, tendências, alertas de estagnação
- **Output:** Relatórios de progresso, alertas pra coach

### 7.5 ecommerce-manager
- **Role:** Gerente de e-commerce
- **Expertise:** Catálogo, precificação, estoque, recomendações personalizadas, upsell/cross-sell
- **Output:** Loja de produtos funcional e integrada

### 7.6 content-repurposer
- **Role:** Repurposador de conteúdo multi-formato
- **Expertise:** Vídeo → carrossel, newsletter, artigo, script, email marketing
- **Output:** Conteúdo multiplicado em múltiplos formatos

---

## 8. Tools

| Tool | Purpose |
|------|---------|
| training-plan-generator | Gera plano de treino a partir de parâmetros |
| macro-calculator | Calcula macros baseado em peso, BF%, objetivo, fase |
| progress-comparator | Compara fotos/medidas between períodos |
| gamification-engine | Gerencia pontos, streaks, badges, rankings |
| quality-checker | Valida qualidade de protocolos antes do envio |

---

## 9. Tasks (8 tasks)

| ID | Task | Executor | Purpose |
|----|------|----------|---------|
| FC-T-001 | client-intake | Hybrid | Onboarding completo de novo aluno |
| FC-T-002 | create-training-plan | Agent | Criar protocolo de treino personalizado |
| FC-T-003 | create-diet-plan | Agent | Criar plano nutricional personalizado |
| FC-T-004 | weekly-checkin | Worker | Check-in semanal automatizado |
| FC-T-005 | adjust-protocol | Hybrid | Ajustar treino/dieta baseado em dados |
| FC-T-006 | business-diagnostic | Hybrid | Diagnóstico completo do negócio |
| FC-T-007 | setup-gamification | Agent | Configurar sistema de gamificação |
| FC-T-008 | competition-prep | Agent | Protocolo de prep para competição |

---

## 10. Workflows (3 workflows)

### 10.1 full-client-journey
**Purpose:** Jornada completa do aluno
```
INTAKE → PROTOCOL (treino + dieta parallel) → DELIVERY (WhatsApp/email)
    → TRACKING (check-in semanal) → ADJUSTMENT (quando dados triggam)
    → GAMIFICATION (achievements, streaks) → RETENTION (Hook loops)
```

### 10.2 business-scaling
**Purpose:** Escalar o negócio do coach
```
DIAGNOSTIC → OFFER DESIGN (Hormozi) → FUNNEL (Instagram→LP→Anamnese)
    → AUTOMATION → GAMIFICATION → ECOMMERCE → METRICS (ARM/LEG)
    → SCALE
```

### 10.3 competition-prep-cycle
**Purpose:** Ciclo completo de prep para competição
```
ASSESSMENT → OFF-SEASON (Israetel+Bompa) → PRE-PREP → PREP 16-20wk (Rambod+Norton)
    → PEAK WEEK (Rambod) → SHOW DAY → REVERSE (Norton)
```

---

## 11. Templates (6 templates)

| Template | Purpose |
|----------|---------|
| training-plan-tmpl | Plano de treino completo |
| diet-plan-tmpl | Plano nutricional completo |
| progress-report-tmpl | Relatório de progresso semanal/mensal |
| business-diagnostic-tmpl | Relatório de diagnóstico de negócio |
| anamnese-tmpl | Formulário de anamnese/intake |
| competition-prep-tmpl | Plano de preparação para competição |

---

## 12. Checklists (4 checklists)

| Checklist | Purpose |
|-----------|---------|
| intake-checklist | Quality gate para intake completo |
| protocol-quality-checklist | Quality gate para entrega de protocolo |
| weekly-checkin-checklist | Quality gate para check-in semanal |
| business-health-checklist | Quality gate para diagnóstico de negócio |

---

## 13. Knowledge Base

**Arquivo:** `data/fitcoach-kb.md`

**Seções:**
1. Domain Overview (fitness coaching 2025-2026)
2. Key Concepts (glossário: hipertrofia, periodização, macros, RPE, RIR, MEV, MRV, etc.)
3. Best Practices (dos 10 minds pesquisados)
4. Common Patterns (splits de treino, fases de dieta, modelos de negócio)
5. Anti-Patterns (overtraining, crash diets, underpricing)
6. Regulatório (CREF no Brasil, ANVISA para suplementos)
7. Market Data (indústria fitness no Brasil)
8. Tech Stack (plataformas, APIs, integrações)
9. Análise Competitiva (Trainerize, TrueCoach, Everfit)

---

## 14. Quality Gates

| ID | Gate | Transição | Tipo |
|----|------|-----------|------|
| FC-QG-001 | Client Intake | Input → Tier 0 | routing |
| FC-QG-002 | Diagnosis Complete | Tier 0 → Tier 1/2 | blocking |
| FC-QG-003 | Protocol Review | Draft → Output | blocking |
| FC-QG-004 | Business Strategy Review | Analysis → Recommendation | blocking |
| FC-QG-005 | Output Quality | Execution → Delivery | blocking |

---

## 15. Routing Rules

```yaml
default_flow:
  1. User request → fitcoach-chief
  2. fitcoach-chief classifica e roteia
  3. Tier 0 faz diagnóstico/intake
  4. Tier 1/2 consulta especializada
  5. Tier 3 executa operação
  6. Tools validam output
  7. Entrega ao usuário

routing_by_type:
  novo_aluno: intake-analyst → training-builder + diet-builder → automation-engineer
  ajuste_protocolo: progress-tracker → conselheiros → training-builder/diet-builder
  consulta_treino: hypertrophy-scientist | periodization-architect | biomechanics-coach | elite-coach
  consulta_nutrição: nutrition-scientist | prep-master (se competição)
  competição: prep-master + nutrition-scientist + training-builder
  negócio: business-diagnostician → gym-scaler + gym-operator
  gamificação: gamification-designer + retention-engineer
  conteúdo: content-repurposer
  produtos: ecommerce-manager
```

---

## 16. Próximos Passos

1. **Criar todos os agents** (20 arquivos .md, 300-400 linhas cada)
2. **Criar todas as tasks** (8 arquivos .md com Task Anatomy completa)
3. **Criar todos os workflows** (3 arquivos .md, 500+ linhas cada)
4. **Criar todos os templates** (6 arquivos .md, 200+ linhas cada)
5. **Criar todos os checklists** (4 arquivos .md, 150+ linhas cada)
6. **Criar knowledge base** (1 arquivo .md, 500+ linhas)
7. **Criar README.md** do squad
8. **Rodar squad-checklist** para validação
9. **Scoring de qualidade** (quality-dimensions-framework)

**Estimativa de artefatos:** ~40 arquivos, ~12.000+ linhas total

---

## 17. Fontes da Pesquisa

- [Best Bodybuilding Coaches - Fitness Volt](https://fitnessvolt.com/best-bodybuilding-coaches/)
- [5 Best Coaches - Generation Iron](https://generationiron.com/best-bodybuilding-coaches/)
- [Dr. Mike Israetel - RP Strength](https://rpstrength.com/pages/team/michael-israetel)
- [Scientific Principles of Hypertrophy - RP](https://rpstrength.com/products/the-scientific-principles-of-hypertrophy-training)
- [FST-7 Training - Hany Rambod](https://www.hanyrambod.com/fst7/)
- [FST-7 Explained - BarBend](https://barbend.com/fst7/)
- [Layne Norton - Biolayne](https://biolayne.com/coach/layne-norton/)
- [PHAT Training - Biolayne](https://biolayne.com/phat/)
- [Tudor Bompa - Periodization 6th Edition](https://us.humankinetics.com/products/periodization-6th-edition)
- [Charles Glass - Fitness Volt](https://fitnessvolt.com/best-bodybuilding-coaches/)
- [Matt Jansen - Fitness Volt](https://fitnessvolt.com/best-bodybuilding-coaches/)
- [Alex Hormozi - Gym Launch](https://www.gymlaunch.com/)
- [Alex Hormozi - Maxim](https://www.maxim.com/partner/how-gym-mogul-alex-hormozi-built-a-100-million-business/)
- [Chris Cooper - Two-Brain Business](https://twobrainbusiness.com/)
- [Two-Brain Flywheel - Glofox](https://www.glofox.com/blog/chris-cooper-using-the-gym-business-flywheel-to-make-gyms-profitable/)
- [Yu-kai Chou - Octalysis Framework](https://yukaichou.com/gamification-examples/octalysis-gamification-framework/)
- [Octalysis - Wikipedia](https://en.wikipedia.org/wiki/Octalysis)
- [Top 5 Fitness Business Coaches - Yahoo Finance](https://finance.yahoo.com/news/top-5-fitness-business-coaches-121500659.html)
- [Trainerize vs TrueCoach](https://tempokit.com/blog/trainerize-vs-truecoach/)

---

_Blueprint v1.0 — FitCoach Squad para Físico Além do Shape_
_Gerado em: 2026-03-11_
