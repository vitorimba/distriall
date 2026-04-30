# FitCoach Squad

**Plataforma de Coaching Fitness com IA**
**Versao:** 1.0.0 | **Prefix:** `FitCoach` | **Pattern:** `FC`
**Entry Agent:** `@fitcoach-chief`

Squad completo para plataforma de coaching fitness com conselheiros elite
de bodybuilding e business, automacao, gamificacao e e-commerce.
Projetado para personal trainers e coaches de fisiculturismo que fazem
consultoria online.

---

## Sumario

- [Quick Start](#quick-start)
- [Arquitetura](#arquitetura)
- [Agentes](#agentes)
- [Use Cases](#use-cases)
- [Tasks](#tasks)
- [Workflows](#workflows)
- [Templates](#templates)
- [Checklists](#checklists)
- [Quality Gates](#quality-gates)
- [Elite Minds](#elite-minds)
- [Para Carlos Salvador](#para-carlos-salvador)
- [Playbooks](#playbooks)
- [Data](#data)
- [Slash Commands](#slash-commands)

---

## Quick Start

### Ativacao do Squad

Para ativar o FitCoach Squad, use qualquer um dos metodos:

```
@fitcoach-chief              # Ativa o orquestrador principal
/FitCoach:agents:fitcoach-chief   # Via slash command
```

### Ativacao de Agentes Individuais

```
@fitcoach:{agent-id}              # Sintaxe geral
/FitCoach:agents:{agent-id}       # Via slash command

# Exemplos:
@fitcoach:hypertrophy-scientist   # Consultar Dr. Mike Israetel
@fitcoach:gym-scaler              # Consultar Alex Hormozi
@fitcoach:training-builder        # Montar protocolo de treino
@fitcoach:diet-builder            # Montar plano alimentar
```

### Primeiros Comandos

```
*help                    # Ver comandos disponiveis
*intake {nome-aluno}     # Iniciar onboarding de novo aluno
*training {aluno}        # Criar protocolo de treino
*diet {aluno}            # Criar plano alimentar
*diagnostic              # Diagnostico do negocio do coach
```

### Fluxo Padrao

```
1. Ative @fitcoach-chief
2. Descreva o que precisa (novo aluno, ajuste, consulta, negocio)
3. O chief roteia para o tier/agente correto
4. Quality gates validam cada etapa
5. Output entregue ao coach
```

---

## Arquitetura

### Tier Structure

```
ORCHESTRATOR: @fitcoach-chief
    |
    +-- TIER 0 -- DIAGNOSTICO
    |   +-- intake-analyst           Anamnese + classificacao do aluno
    |   +-- business-diagnostician   Diagnostico do negocio do coach
    |
    +-- TIER 1 -- CONSELHEIROS BODYBUILDING (Elite Minds)
    |   +-- hypertrophy-scientist    Mind: Dr. Mike Israetel
    |   +-- prep-master              Mind: Hany Rambod
    |   +-- nutrition-scientist      Mind: Dr. Layne Norton
    |   +-- periodization-architect  Mind: Tudor Bompa
    |   +-- biomechanics-coach       Mind: Charles Glass
    |   +-- elite-coach              Mind: Matt Jansen
    |
    +-- TIER 2 -- CONSELHEIROS BUSINESS (Elite Minds)
    |   +-- gym-scaler               Mind: Alex Hormozi
    |   +-- gym-operator             Mind: Chris Cooper
    |   +-- gamification-designer    Mind: Yu-kai Chou
    |   +-- retention-engineer       Mind: Nir Eyal
    |
    +-- TIER 1.5 -- ESPECIALISTAS TRANSVERSAIS
    |   +-- injury-manager           Mind: McGill/Starrett/Cook (coletivo)
    |   +-- mindset-coach            Mind: BJ Fogg/MI/SDT (coletivo)
    |
    +-- TIER 3 -- ESPECIALISTAS PLATAFORMA
    |   +-- training-builder         Monta protocolos de treino
    |   +-- diet-builder             Monta planos nutricionais
    |   +-- automation-engineer      WhatsApp/Email automacoes
    |   +-- progress-tracker         Fotos, medidas, evolucao
    |   +-- ecommerce-manager        Loja de suplementos/produtos
    |   +-- content-repurposer       Instagram -> multi-formato
    |
    +-- TOOLS
        +-- training-plan-generator  Gera planos de treino completos
        +-- macro-calculator         Calcula macros (TDEE, BF%, objetivo)
        +-- progress-comparator      Compara fotos/medidas entre periodos
        +-- gamification-engine      Pontos, badges, streaks, leaderboard
        +-- quality-checker          Valida protocolos contra evidencia
```

**Total: 21 agentes** (1 orchestrator + 2 tier-0 + 6 tier-1 + 2 tier-1.5 + 4 tier-2 + 6 tier-3) + 5 tools

**Fluxo:** User Request -> fitcoach-chief -> Tier 0 (diagnostico) -> Tier 1/2 (consulta) -> Tier 3 (execucao) -> Quality Gate -> Delivery

---

## Agentes

### Tabela Completa

| # | Agent ID | Tier | Mind | Role |
|---|----------|------|------|------|
| 1 | `fitcoach-chief` | Orchestrator | -- | Triage, routing, coordenacao entre tiers |
| 2 | `intake-analyst` | Tier 0 | -- | Anamnese, classificacao do aluno, coleta de dados |
| 3 | `business-diagnostician` | Tier 0 | -- | Diagnostico do modelo de negocio, gaps e oportunidades |
| 4 | `hypertrophy-scientist` | Tier 1 | Mike Israetel | Volume landmarks, MEV/MRV/MAV, periodizacao baseada em evidencia |
| 5 | `prep-master` | Tier 1 | Hany Rambod | Contest prep, FST-7, peak week, manipulacao agua/sodio/carb |
| 6 | `nutrition-scientist` | Tier 1 | Layne Norton | Reverse dieting, IIFYM, metabolic adaptation, evidence-based nutrition |
| 7 | `periodization-architect` | Tier 1 | Tudor Bompa | Periodizacao classica e ondulatoria, macro/meso/microciclos |
| 8 | `biomechanics-coach` | Tier 1 | Charles Glass | Biomecanica, variacoes de exercicios, ativacao muscular, forma |
| 9 | `elite-coach` | Tier 1 | Matt Jansen | Coaching de elite, intensity techniques, offseason strategy |
| 10 | `gym-scaler` | Tier 2 | Alex Hormozi | Scaling, ofertas irresistiveis, precificacao, lead generation |
| 11 | `gym-operator` | Tier 2 | Chris Cooper | Operacao de coaching business, metricas, processos, retencao |
| 12 | `gamification-designer` | Tier 2 | Yu-kai Chou | Octalysis framework, 8 core drives, gamificacao de aderencia |
| 13 | `retention-engineer` | Tier 2 | Nir Eyal | Hook model, loop de habito, trigger design, variable reward |
| 14 | `injury-manager` | Tier 1.5 | McGill/Starrett/Cook | Triagem de lesoes, modificacao de exercicios, protocolos de retorno, red flags |
| 15 | `mindset-coach` | Tier 1.5 | BJ Fogg/MI/SDT | Aderencia, formacao de habitos, motivacao intrinseca, prevencao de dropout |
| 16 | `training-builder` | Tier 3 | -- | Montagem de planilhas de treino, templates, progressao de carga |
| 17 | `diet-builder` | Tier 3 | -- | Planos alimentares, substituicoes, ajustes semanais |
| 18 | `automation-engineer` | Tier 3 | -- | Automacao WhatsApp, email sequences, onboarding flows, CRM |
| 19 | `progress-tracker` | Tier 3 | -- | Fotos, medidas, PRs, composicao corporal |
| 20 | `ecommerce-manager` | Tier 3 | -- | E-commerce de suplementos, produtos digitais, upsell/cross-sell |
| 21 | `content-repurposer` | Tier 3 | -- | Reaproveitamento de conteudo para redes sociais, blog, email |

### Interacao entre Tiers

- **Tier 0** coleta dados e classifica, roteia para Tier 1 ou 2
- **Tier 1** fornece expertise de bodybuilding para decisoes tecnicas de treino/nutricao
- **Tier 1.5** especialistas transversais — injury-manager (lesoes/reab) e mindset-coach (aderencia/habitos)
- **Tier 2** fornece expertise de business para decisoes estrategicas do negocio
- **Tier 3** executa operacoes usando as recomendacoes dos Tiers 1 e 2
- **Tools** sao consumidas por agentes de qualquer tier para calculos e validacoes

---

## Use Cases

### 14 Use Cases Suportados

| # | Use Case | Descricao | Agentes Envolvidos |
|---|----------|-----------|-------------------|
| 1 | Prescricao de treino/dieta | Protocolo completo personalizado | `hypertrophy-scientist`, `periodization-architect`, `biomechanics-coach`, `training-builder`, `diet-builder` |
| 2 | Automacao WhatsApp/email | Fluxos automatizados de comunicacao | `automation-engineer` |
| 3 | Acompanhamento com fotos | Tracking visual e metrico da evolucao | `progress-tracker` |
| 4 | Gamificacao | Sistema de engajamento com pontos e badges | `gamification-designer`, `retention-engineer`, `progress-tracker` |
| 5 | E-commerce de suplementos | Loja integrada com recomendacoes | `ecommerce-manager` |
| 6 | Consultoria com elite minds | Expertise para decisoes complexas | Qualquer agente Tier 1 ou Tier 2 |
| 7 | Scaling do negocio | Estrategias para escalar coaching online | `gym-scaler`, `gym-operator` |
| 8 | Periodizacao inteligente | Macrociclos, mesociclos e microciclos | `periodization-architect`, `hypertrophy-scientist` |
| 9 | Prep de competicao | Protocolo completo com peak week | `prep-master`, `nutrition-scientist`, `elite-coach`, `training-builder` |
| 10 | Reverse dieting | Protocolo pos-competicao ou pos-dieta | `nutrition-scientist` |
| 11 | Modelo de precificacao | Estruturacao de ofertas e pricing | `gym-scaler` |
| 12 | Metricas de retencao | Dashboard de churn, LTV, NPS | `gym-operator` |
| 13 | Loop de habito | Design de habitos com Hook Model | `retention-engineer` |
| 14 | 8 drives de motivacao | Octalysis Framework para engajamento | `gamification-designer` |

### Routing por Tipo de Demanda

```
Novo aluno        -> intake-analyst -> training-builder + diet-builder -> automation-engineer
Ajuste protocolo  -> progress-tracker -> conselheiros -> training-builder/diet-builder
Consulta treino   -> hypertrophy-scientist | periodization-architect | biomechanics-coach
Consulta nutricao -> nutrition-scientist | prep-master (se competicao)
Competicao        -> prep-master + nutrition-scientist + training-builder
Negocio           -> business-diagnostician -> gym-scaler + gym-operator
Gamificacao       -> gamification-designer + retention-engineer
Conteudo          -> content-repurposer
Produtos          -> ecommerce-manager
```

---

## Tasks

O squad possui 16 tasks executaveis, localizadas em `tasks/`.

| ID | Task | Arquivo | Executor | Descricao |
|----|------|---------|----------|-----------|
| FC-T-001 | Client Intake | `client-intake.md` | Hybrid | Onboarding completo de novo aluno. Anamnese, classificacao, coleta de dados antropometricos, historico e restricoes |
| FC-T-002 | Create Training Plan | `create-training-plan.md` | Agent | Criar protocolo de treino personalizado com periodizacao, split, exercicios, series/reps/carga/RIR |
| FC-T-003 | Create Diet Plan | `create-diet-plan.md` | Agent | Criar plano nutricional com macros, cardapio, substituicoes e fases |
| FC-T-004 | Weekly Check-in | `weekly-checkin.md` | Worker | Check-in semanal automatizado: peso, fotos, aderencia, humor. Gera relatorio pro coach |
| FC-T-005 | Adjust Protocol | `adjust-protocol.md` | Hybrid | Ajustar treino/dieta baseado nos dados do check-in e progressao do aluno |
| FC-T-006 | Business Diagnostic | `business-diagnostic.md` | Hybrid | Diagnostico completo do negocio do coach: metricas, gargalos, oportunidades |
| FC-T-007 | Setup Gamification | `setup-gamification.md` | Agent | Configurar sistema de gamificacao: pontos, badges, streaks, challenges, leaderboard |
| FC-T-008 | Competition Prep | `competition-prep.md` | Agent | Protocolo completo de prep para competicao: 16-20 semanas, peak week, reverse |
| FC-TASK-009 | Create Offer | `create-offer.md` | Hybrid | Criar oferta irresistivel usando Grand Slam Offer (Hormozi): tiers de servico, pricing, bonus stack, garantia |
| FC-T-010 | Anamnese Clinica | `anamnese-clinica.md` | Hybrid | Triagem clinica completa — historico de saude, red flags, condicoes pre-existentes, medicamentos |
| FC-T-011 | Diet Periodization | `diet-periodization.md` | Agent | Periodizacao nutricional — transicoes entre fases (cutting, bulking, manutencao), calorie cycling, refeeds |
| FC-T-012 | Deload Protocol | `deload-protocol.md` | Agent | Protocolo de deload — avaliacao de indicadores de fadiga, tipo de deload (volume/intensidade/frequencia), timing |
| FC-T-013 | Lab Results Interpreter | `lab-results-interpreter.md` | Hybrid | Interpretacao de exames laboratoriais — hemograma, lipidios, hormonais, implicacoes para treino e dieta |
| FC-T-014 | Supplement Protocol | `supplement-protocol.md` | Agent | Protocolo de suplementacao personalizado — tiers de evidencia, dosagens, timing, interacoes |
| FC-T-015 | Calculate Macros | `calculate-macros.md` | Agent | Calculo de macronutrientes — BMR (Mifflin/Harris-Benedict/Katch-McArdle), TDEE, distribuicao de macros por objetivo |
| FC-T-016 | Physical Assessment | `physical-assessment.md` | Hybrid | Avaliacao fisica completa — antropometria, composicao corporal, testes de forca, mobilidade, postura |

---

## Workflows

Os 4 workflows do squad estao em `workflows/` (formato `.md`; versoes `.yaml` executaveis tambem disponiveis).

### 1. Full Client Journey (`full-client-journey.md`)

Jornada completa do aluno desde o primeiro contato ate a retencao.

```
Phase 1: INTAKE
  intake-analyst -> anamnese -> classificacao -> routing

Phase 2: PROTOCOL (paralelo)
  training-builder -> plano de treino
  diet-builder -> plano alimentar

Phase 3: DELIVERY
  automation-engineer -> envio via WhatsApp/email

Phase 4: TRACKING (recorrente)
  progress-tracker -> check-in semanal -> relatorio

Phase 5: ADJUSTMENT (quando dados triggam)
  conselheiros Tier 1 -> ajustes -> training/diet-builder

Phase 6: ENGAGEMENT
  gamification-designer -> achievements, streaks
  retention-engineer -> Hook loops
```

### 2. Business Scaling (`business-scaling.md`)

Estrategia completa para escalar o negocio do coach.

```
Phase 1: DIAGNOSTIC
  business-diagnostician -> analise do estado atual

Phase 2: STRATEGY
  gym-scaler (Hormozi) -> offer design, pricing
  gym-operator (Cooper) -> metricas, processos

Phase 3: EXECUTION
  automation-engineer -> funil Instagram -> LP -> Anamnese
  gamification-designer -> engajamento
  ecommerce-manager -> loja de produtos

Phase 4: METRICS
  gym-operator -> ARM, LEG, churn rate -> otimizacao
```

### 3. Competition Prep Cycle (`competition-prep-cycle.md`)

Ciclo completo de preparacao para competicao de fisiculturismo.

```
Phase 1: ASSESSMENT
  intake-analyst -> avaliacao do competidor

Phase 2: OFF-SEASON
  hypertrophy-scientist (Israetel) + periodization-architect (Bompa)
  -> construcao de massa, periodizacao

Phase 3: PRE-PREP -> PREP (16-20 semanas)
  prep-master (Rambod) + nutrition-scientist (Norton)
  -> cutting, manipulacao de macros, cardio

Phase 4: PEAK WEEK
  prep-master (Rambod) -> agua, sodio, carb loading

Phase 5: SHOW DAY
  prep-master -> backstage protocol

Phase 6: REVERSE
  nutrition-scientist (Norton) -> reverse dieting pos-competicao
```

### 4. Coach Onboarding (`coach-onboarding.md`)

Onboarding estruturado do coach na plataforma FitCoach.

```
Phase 1: SETUP
  business-diagnostician -> perfil do coach, modelo de negocio

Phase 2: OFFER DESIGN
  gym-scaler (Hormozi) -> create-offer -> Grand Slam Offer, tiers, pricing

Phase 3: PLATFORM CONFIG
  automation-engineer -> WhatsApp, email, CRM, anamnese

Phase 4: GAMIFICATION SETUP
  gamification-designer + retention-engineer -> badges, streaks, Hook loops

Phase 5: GO-LIVE
  fitcoach-chief -> validacao final, primeiros alunos onboarded
```

---

## Templates

6 templates disponiveis em `templates/` para padronizar outputs.

| Template | Arquivo | Descricao |
|----------|---------|-----------|
| Training Plan | `training-plan-tmpl.md` | Plano de treino completo com split, exercicios, series, reps, carga, RIR, observacoes por grupo muscular |
| Diet Plan | `diet-plan-tmpl.md` | Plano nutricional com macros diarios, cardapio por refeicao, substituicoes, suplementacao |
| Progress Report | `progress-report-tmpl.md` | Relatorio de progresso semanal/mensal com fotos, medidas, peso, PRs, aderencia |
| Business Diagnostic | `business-diagnostic-tmpl.md` | Relatorio de diagnostico do negocio: metricas, revenue streams, gaps, recomendacoes |
| Anamnese | `anamnese-tmpl.md` | Formulario de anamnese/intake: dados pessoais, antropometricos, historico, objetivos, restricoes |
| Competition Prep | `competition-prep-tmpl.md` | Plano de prep para competicao: timeline, fases, protocolos por semana, peak week |

---

## Checklists

4 checklists de validacao em `checklists/`.

| Checklist | Arquivo | Uso |
|-----------|---------|-----|
| Intake Checklist | `intake-checklist.md` | Valida se o intake do aluno esta completo antes de prosseguir. Dados antropometricos, objetivo, historico, restricoes |
| Protocol Quality | `protocol-quality-checklist.md` | Valida qualidade do protocolo de treino/dieta antes da entrega. Volume, macros, periodizacao, contraindicacoes |
| Weekly Check-in | `weekly-checkin-checklist.md` | Valida se o check-in semanal tem todos os dados necessarios para analise |
| Business Health | `business-health-checklist.md` | Valida se o diagnostico de negocio cobriu todas as areas criticas |

---

## Quality Gates

5 quality gates controlam as transicoes entre fases do sistema.

| ID | Gate | Transicao | Checks |
|----|------|-----------|--------|
| FC-QG-001 | **Client Intake** | Input -> Tier 0 | Dados antropometricos completos (peso, altura, BF%). Objetivo definido (hipertrofia, cutting, recomp, prep). Historico de treino e lesoes informado. Restricoes alimentares declaradas |
| FC-QG-002 | **Diagnosis Complete** | Tier 0 -> Tier 1/2 | Perfil classificado (iniciante/intermediario/avancado). Modelo de negocio mapeado. Gaps e oportunidades identificados. Tier de destino definido |
| FC-QG-003 | **Protocol Review** | Draft -> Output | Volume dentro dos landmarks (MEV-MRV). Macros alinhados com objetivo e TDEE. Periodizacao com progressao logica. Sem contraindicacoes para o perfil |
| FC-QG-004 | **Business Strategy Review** | Analysis -> Recommendation | ROI estimado. Viabilidade operacional validada. Alinhamento com modelo atual. Metricas de sucesso definidas |
| FC-QG-005 | **Output Quality** | Execution -> Delivery | Formato profissional e apresentavel. Linguagem adequada ao publico-alvo. Dados validados pelo quality-checker. Sem informacoes conflitantes entre tiers |

### Fluxo dos Gates

```
Input --> [FC-QG-001] --> Tier 0 --> [FC-QG-002] --> Tier 1/2
                                                        |
                                                   Tier 3
                                                        |
                                           [FC-QG-003 ou FC-QG-004]
                                                        |
                                                  [FC-QG-005]
                                                        |
                                                    Delivery
```

---

## Elite Minds

O FitCoach Squad utiliza 10 elite minds -- personalidades reais cujo conhecimento,
frameworks e estilo de comunicacao foram modelados para os agentes conselheiros.

### Tier 1 -- Bodybuilding

| # | Mind | Agent | Expertise | Fonte |
|---|------|-------|-----------|-------|
| 1 | **Dr. Mike Israetel** | `hypertrophy-scientist` | PhD Sport Physiology. RP Strength. Volume Landmarks (MEV/MAV/MRV/MV), SRA Curve, Mesocycle Periodization | [rpstrength.com](https://rpstrength.com/pages/team/michael-israetel) |
| 2 | **Hany Rambod** | `prep-master` | "The Pro Creator". 10+ Olympia titles como coach. FST-7, Peak Week Protocol, Phil Heath, Chris Bumstead | [hanyrambod.com](https://www.hanyrambod.com/fst7/) |
| 3 | **Dr. Layne Norton** | `nutrition-scientist` | PhD Nutritional Sciences. Biolayne. Reverse Dieting, PHAT, Metabolic Adaptation, 70+ atletas pro | [biolayne.com](https://biolayne.com/coach/layne-norton/) |
| 4 | **Tudor Bompa** | `periodization-architect` | Pai da periodizacao moderna (desde 1963). 6-Phase Periodization, Annual Training Plan, 19 idiomas, 180+ paises | [humankinetics.com](https://us.humankinetics.com/products/periodization-6th-edition) |
| 5 | **Charles Glass** | `biomechanics-coach` | "The Godfather of Bodybuilding". Gold's Gym Venice. Movement Quality, Mind-Muscle Connection, Exercise Variation | [fitnessvolt.com](https://fitnessvolt.com/best-bodybuilding-coaches/) |
| 6 | **Matt Jansen** | `elite-coach` | 16 IFBB pros no Olympia. Nick Walker, Shaun Clarida. Intensity Techniques, Integrated Training-Nutrition | [fitnessvolt.com](https://fitnessvolt.com/best-bodybuilding-coaches/) |

### Tier 2 -- Business

| # | Mind | Agent | Expertise | Fonte |
|---|------|-------|-----------|-------|
| 7 | **Alex Hormozi** | `gym-scaler` | Gym Launch -> Acquisition.com. $100M em 3 anos. Value Equation, Grand Slam Offer, 4.500+ academias | [gymlaunch.com](https://www.gymlaunch.com/) |
| 8 | **Chris Cooper** | `gym-operator` | Two-Brain Business. Best-selling fitness business book. Flywheel Model, ARM/LEG metrics, Optimal Gym Model | [twobrainbusiness.com](https://twobrainbusiness.com/) |
| 9 | **Yu-kai Chou** | `gamification-designer` | Autoridade mundial em gamificacao. Octalysis Framework, 8 Core Drives, White Hat vs Black Hat gamification | [yukaichou.com](https://yukaichou.com/gamification-examples/octalysis-gamification-framework/) |
| 10 | **Nir Eyal** | `retention-engineer` | Hook Model (Trigger -> Action -> Variable Reward -> Investment). Habit Zone Matrix, Indistractable Model | [nirandfar.com](https://www.nirandfar.com/) |

---

## Para Carlos Salvador

Esta secao e dedicada ao **Carlos Salvador Jr** (@carlosalvadorjr),
fundador do **Fisico Alem do Shape**, cliente primario deste squad.

### Perfil

- **Instagram:** @carlosalvadorjr (9.476 seguidores, 1.005 posts)
- **Bio:** "O melhor fisico da sua vida. Sem perder a sua vida. Fisico alem do shape | 10x Top Coach"
- **Negocio:** Consultoria esportiva online + academia
- **WhatsApp:** 5517992722010 (DDD 17 -- interior SP)
- **Equipe:** Time de coaches
- **Conteudo:** Transformacoes before/after, dicas de treino/nutricao, mindset, lifestyle

### Necessidades Mapeadas

1. **Otimizar atendimento** -- Atender mais alunos sem perder qualidade
2. **Plataforma centralizada** -- Tudo num so lugar (treino, dieta, ajustes)
3. **Automacao** -- Envio automatico de treino/dieta por WhatsApp e email
4. **Progressao visual** -- Acompanhar evolucao com fotos e metricas
5. **Gamificacao** -- Engajar alunos com sistema de recompensas
6. **E-commerce** -- Loja de produtos (marca propria + suplementos)
7. **Mais tempo + mais resultado** -- Eficiencia operacional

### Features Planejadas (23 features aprovadas)

**Core (6):**
Prescricao de treino, prescricao de dieta, automacao WhatsApp/email,
acompanhamento de progressao, gamificacao, e-commerce.

**Adicionais (10):**
Onboarding inteligente, check-in semanal automatico, IA de ajuste de protocolo,
dashboard do coach, biblioteca de exercicios com video, comunidade/grupo,
sistema de indicacao, integracao com wearables, landing page de captacao,
gestao financeira.

**Conselheiros (7):**
Periodizacao inteligente, prep de competicao, reverse dieting, modelo de
precificacao, metricas de retencao, loop de habito, 8 drives de motivacao.

### Como Usar o Squad

```
# Novo aluno chegou
@fitcoach-chief Novo aluno: Joao, 85kg, 1.80m, 18% BF, quer hipertrofia

# Montar treino para aluno
@fitcoach:training-builder Montar treino push/pull/legs para Joao

# Montar dieta para aluno
@fitcoach:diet-builder Dieta de 2800kcal para Joao, objetivo hipertrofia

# Diagnostico do seu negocio
@fitcoach:business-diagnostician Quero analisar meu negocio

# Consultar Hormozi sobre pricing
@fitcoach:gym-scaler Como precificar minha consultoria premium?

# Configurar gamificacao
@fitcoach:gamification-designer Montar sistema de badges para meus alunos
```

---

## Playbooks

6 playbooks disponiveis em `playbooks/` para guiar fluxos completos.

| Playbook | Descricao |
|----------|-----------|
| Client Onboarding | Fluxo completo de onboarding de novo aluno — intake, anamnese clinica, avaliacao fisica, primeiro protocolo de treino e dieta |
| Cutting Phase | Playbook de fase de cutting — calculo de deficit, cardio progressivo, refeeds programados, metricas de progresso, ajustes semanais |
| Bulking Phase | Playbook de fase de bulking — superavit controlado, volume progressivo, checkpoints de composicao corporal |
| Competition Prep | Playbook de prep para competicao — 16-20 semanas, fases de dieta, peak week, manipulacao agua/sodio/carb, reverse diet |
| Injury Return | Playbook de retorno pos-lesao — triagem com injury-manager, modificacoes de exercicios, loading progressivo, criterios de alta |
| Business Launch | Playbook de lancamento do negocio do coach — design de oferta, funil de captacao, automacao, onboarding dos primeiros clientes |

---

## Data

Arquivos de dados estruturados em `data/` que alimentam agentes e tasks.

| Arquivo | Descricao |
|---------|-----------|
| `fitcoach-kb.md` | Knowledge base completa do FitCoach — dominio, mercado fitness, ciencia do treino, nutricao, negocios, competicao |
| `exercise-database.yaml` | Database de exercicios organizado por grupo muscular — dificuldade, equipamento, notas biomecanicas, erros comuns |
| `macro-formulas.yaml` | Formulas de calculo nutricional — BMR (Mifflin-St Jeor, Harris-Benedict, Katch-McArdle), TDEE, macros, deficit/superavit |
| `supplement-protocols.yaml` | Guia de suplementacao baseado em evidencia — Tier A/B/C, dosagens, timing, interacoes, stacks recomendados |
| `periodization-models.yaml` | Modelos de periodizacao — Linear (Bompa), DUP, Block (Issurin), Conjugate (Westside), RP Hypertrophy (Israetel) |

---

## Slash Commands

### Sintaxe de Ativacao

O FitCoach Squad usa o prefix `FitCoach` para slash commands.

```
/FitCoach:agents:{agent-id}     # Ativa um agente especifico
/FitCoach:tasks:{task-id}       # Executa uma task
/FitCoach:workflows:{workflow}  # Inicia um workflow
```

### Agentes via Slash Command

```
/FitCoach:agents:fitcoach-chief          # Orquestrador
/FitCoach:agents:intake-analyst          # Intake de alunos
/FitCoach:agents:business-diagnostician  # Diagnostico de negocio
/FitCoach:agents:hypertrophy-scientist   # Dr. Mike Israetel
/FitCoach:agents:prep-master             # Hany Rambod
/FitCoach:agents:nutrition-scientist     # Dr. Layne Norton
/FitCoach:agents:periodization-architect # Tudor Bompa
/FitCoach:agents:biomechanics-coach      # Charles Glass
/FitCoach:agents:elite-coach             # Matt Jansen
/FitCoach:agents:gym-scaler              # Alex Hormozi
/FitCoach:agents:gym-operator            # Chris Cooper
/FitCoach:agents:gamification-designer   # Yu-kai Chou
/FitCoach:agents:retention-engineer      # Nir Eyal
/FitCoach:agents:training-builder        # Construtor de treinos
/FitCoach:agents:diet-builder            # Construtor de dietas
/FitCoach:agents:automation-engineer     # Automacao
/FitCoach:agents:progress-tracker        # Tracker de progresso
/FitCoach:agents:ecommerce-manager       # E-commerce
/FitCoach:agents:content-repurposer      # Reaproveitamento de conteudo
/FitCoach:agents:injury-manager          # Lesoes e reabilitacao (McGill/Starrett/Cook)
/FitCoach:agents:mindset-coach           # Aderencia e mindset (BJ Fogg/MI/SDT)
```

### Tasks via Slash Command

```
/FitCoach:tasks:client-intake         # FC-T-001: Onboarding de aluno
/FitCoach:tasks:create-training-plan  # FC-T-002: Criar treino
/FitCoach:tasks:create-diet-plan      # FC-T-003: Criar dieta
/FitCoach:tasks:weekly-checkin        # FC-T-004: Check-in semanal
/FitCoach:tasks:adjust-protocol       # FC-T-005: Ajustar protocolo
/FitCoach:tasks:business-diagnostic   # FC-T-006: Diagnostico negocio
/FitCoach:tasks:setup-gamification    # FC-T-007: Gamificacao
/FitCoach:tasks:competition-prep      # FC-T-008: Prep competicao
/FitCoach:tasks:create-offer          # FC-TASK-009: Criar oferta irresistivel
/FitCoach:tasks:anamnese-clinica      # FC-T-010: Anamnese clinica
/FitCoach:tasks:diet-periodization    # FC-T-011: Periodizacao nutricional
/FitCoach:tasks:deload-protocol       # FC-T-012: Protocolo de deload
/FitCoach:tasks:lab-results-interpreter # FC-T-013: Interpretar exames
/FitCoach:tasks:supplement-protocol   # FC-T-014: Protocolo de suplementacao
/FitCoach:tasks:calculate-macros      # FC-T-015: Calcular macros
/FitCoach:tasks:physical-assessment   # FC-T-016: Avaliacao fisica
```

### Workflows via Slash Command

```
/FitCoach:workflows:full-client-journey     # Jornada completa do aluno
/FitCoach:workflows:business-scaling        # Escalar o negocio
/FitCoach:workflows:competition-prep-cycle  # Ciclo de prep
/FitCoach:workflows:coach-onboarding        # Onboarding do coach na plataforma
```

---

## Tools

5 ferramentas especializadas consumidas pelos agentes.

| Tool | Descricao | Usado Por |
|------|-----------|-----------|
| `training-plan-generator` | Gera planilhas de treino completas com periodizacao, volume e intensidade | `training-builder`, `elite-coach` |
| `macro-calculator` | Calcula macronutrientes baseado em objetivo, peso, BF%, TDEE | `diet-builder`, `nutrition-scientist` |
| `progress-comparator` | Compara fotos, medidas e metricas entre check-ins | `progress-tracker` |
| `gamification-engine` | Motor de pontos, badges, streaks, leaderboard e challenges | `gamification-designer` |
| `quality-checker` | Valida protocolos de treino/dieta contra evidencia cientifica | Todos (quality gate final) |

---

*FitCoach Squad v1.0.0 -- Synkra AIOX*
*Criado para Fisico Alem do Shape -- Carlos Salvador Jr*
*Data: 2026-03-13*
