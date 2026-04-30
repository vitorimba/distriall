---

# Workflow: Full Client Journey — Jornada Completa do Aluno

## Workflow Definition

```yaml
workflow:
  id: FC-WF-001
  name: "Full Client Journey"
  squad: fitcoach
  version: 1.0.0
  description: >-
    Jornada completa do aluno desde o primeiro contato (intake) ate resultados
    consolidados com retencao via gamificacao e Hook Model. Orquestra 7 fases
    sequenciais com checkpoints entre cada uma, garantindo qualidade e
    continuidade do servico de coaching fitness.
  type: client-lifecycle
  pattern_prefix: FC
  updated_at: 2026-03-11

  metadata:
    elicit: true
    confirmation_required: true
    estimated_duration: "Ongoing (lifecycle continuo)"
    phases: 7
    tasks_involved: 7
    recurring_phases: [4, 5, 6, 7]

  entry_conditions:
    - "Novo cliente interessado em coaching fitness"
    - "Coach com perfil configurado no sistema"
    - "Canal de comunicacao ativo (WhatsApp/email)"

  exit_conditions:
    - "Cliente encerra contrato"
    - "Coach encerra relacao"
    - "Migracao para outro workflow (ex: competition-prep)"
```

---

## Overview da Jornada

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     FULL CLIENT JOURNEY                                │
│                                                                        │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐           │
│  │  PHASE 1 │──→│  PHASE 2 │──→│  PHASE 3 │──→│  PHASE 4 │──┐       │
│  │  INTAKE  │   │ PROTOCOL │   │ DELIVERY │   │ TRACKING │  │       │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘  │       │
│                                                     ▲         │       │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐        │         │       │
│  │  PHASE 7 │←──│  PHASE 6 │←──│  PHASE 5 │←───────┘─────────┘       │
│  │RETENTION │   │GAMIFICAT.│   │ ADJUST   │                          │
│  └──────────┘   └──────────┘   └──────────┘                          │
│       │                                  ▲                            │
│       └──────────────────────────────────┘                            │
│                  (LOOP CONTINUO)                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: INTAKE — Onboarding do Cliente

### Objetivo
Coletar todos os dados do cliente, classificar seu nivel, definir objetivos SMART e rotear para o protocolo adequado.

### Task Executada
`tasks/client-intake.md` (FC-TASK-001)

### Executor
- **Primary:** intake-analyst
- **Approval:** coach (human)

### Inputs
- Dados do formulario de anamnese
- Informacoes do canal de comunicacao

### Steps Detalhados

#### 1.1 Primeiro Contato
- Cliente entra em contato (Instagram DM, WhatsApp, landing page)
- automation-engineer envia mensagem de boas-vindas automatica
- Apresentar proposta de trabalho e valores
- Se cliente aceitar: prosseguir para anamnese

```yaml
step_1_1:
  name: "Primeiro Contato"
  executor: automation-engineer
  channel: [whatsapp, instagram, landing_page]
  duration: "Variable (1h - 7 days)"
  conversion_tracking:
    source: "De onde veio o lead"
    response_time: "Tempo ate primeira resposta"
    outcome: "accepted|rejected|pending"
```

#### 1.2 Anamnese Completa
- Enviar formulario de anamnese estruturado
- Coletar dados antropometricos, historico, restricoes
- Processar e validar dados recebidos

#### 1.3 Classificacao e Objetivos
- Classificar cliente (beginner/intermediate/advanced/elite)
- Definir objetivos SMART com metricas e timeline
- Calcular baseline metabolico (TDEE, macros iniciais)

#### 1.4 Aprovacao e Routing
- Gerar resumo do intake para o coach
- Coach aprova classificacao e objetivos
- Definir routing para proxima fase (protocolo padrao, competition prep, etc.)

### Outputs
- `client_profile` — Perfil completo do cliente
- `classification_report` — Classificacao e score
- `goal_definition` — Objetivos SMART
- `routing_decision` — Para qual protocolo seguir

### Checkpoint 1 → Phase 2

```yaml
checkpoint_1:
  name: "Intake Complete Gate"
  conditions:
    - "client_profile salvo com todos os campos obrigatorios"
    - "classification_report com level definido"
    - "goal_definition no formato SMART"
    - "routing_decision aprovado pelo coach"
    - "Sem red flags medicos bloqueantes"
  on_pass: "Proceed to Phase 2"
  on_fail: "Return to Phase 1, fix issues"
  blocker: true
```

---

## Phase 2: PROTOCOL — Criacao de Treino e Dieta

### Objetivo
Criar protocolos personalizados de treino e dieta baseados na classificacao e objetivos do cliente. As duas tasks rodam em paralelo.

### Tasks Executadas (PARALELO)
- `tasks/create-training-plan.md` (FC-TASK-002)
- `tasks/create-diet-plan.md` (FC-TASK-003)

### Executor
- **Training:** training-builder + advisors (Israetel, Bompa, Glass, Jansen)
- **Nutrition:** diet-builder + advisors (Norton, Israetel)

### Parallel Execution Model

```
                 ┌─────────────────────────┐
                 │    classification_report  │
                 │    goal_definition        │
                 │    metabolic_baseline     │
                 └───────────┬──────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
            ┌───────▼───────┐ ┌──────▼────────┐
            │  TRAINING     │ │  NUTRITION     │
            │  PLAN         │ │  PLAN          │
            │               │ │                │
            │ • Volume      │ │ • Macros       │
            │ • Periodizacao│ │ • Meal plan    │
            │ • Exercicios  │ │ • Substitucoes │
            │ • Progressao  │ │ • Suplementos  │
            └───────┬───────┘ └──────┬────────┘
                    │                 │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   SYNC CHECK    │
                    │ (timing, peri-  │
                    │  workout meals) │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ COACH REVIEW    │
                    │ (approve both)  │
                    └─────────────────┘
```

### Steps Detalhados

#### 2.1 Geracao Paralela dos Planos
- training-builder gera plano de treino consultando advisors
- diet-builder gera plano nutricional consultando advisors
- Ambos recebem os mesmos inputs do intake

#### 2.2 Sincronizacao Peri-Workout
- Apos ambos os planos gerados, sincronizar:
  - Refeicao pre-treino alinhada com horario de treino
  - Refeicao pos-treino alinhada com fim do treino
  - Carboidrato cycling alinhado com dias de treino pesado
  - Calorias de dia de treino vs descanso

```yaml
step_2_2:
  name: "Sync Peri-Workout"
  executor: diet-builder
  dependency: "Both training_plan and diet_plan must be ready"
  duration: "5-10 min"
  sync_points:
    pre_workout_meal:
      timing: "2-3h before training"
      macros: "high carb, moderate protein, low fat"
    post_workout_meal:
      timing: "within 2h after training"
      macros: "high carb, high protein, moderate fat"
    training_day_calories:
      adjustment: "+200-400 kcal vs rest day"
    rest_day_calories:
      adjustment: "-200-400 kcal vs training day"
```

#### 2.3 Quality Check Integrado
- Executar quality-checker em ambos os planos
- Validar consistencia entre treino e nutricao
- Verificar que recomendacoes nao se contradizem

#### 2.4 Revisao do Coach
- Apresentar ambos os planos ao coach
- Coach revisa, ajusta e aprova
- Registrar modificacoes do coach

### Outputs
- `training_plan` — Plano de treino completo
- `diet_plan` — Plano nutricional completo
- `training_plan_pdf` + `diet_plan_pdf` — Versoes para cliente

### Checkpoint 2 → Phase 3

```yaml
checkpoint_2:
  name: "Protocol Complete Gate"
  conditions:
    - "training_plan aprovado pelo coach"
    - "diet_plan aprovado pelo coach"
    - "Peri-workout nutrition sincronizado com treino"
    - "Quality check passed para ambos os planos"
    - "PDFs gerados com visual profissional"
  on_pass: "Proceed to Phase 3"
  on_fail: "Return to task with issues, fix and re-submit"
  blocker: true
```

---

## Phase 3: DELIVERY — Entrega ao Cliente

### Objetivo
Entregar os planos ao cliente de forma profissional, com instrucoes claras e material de suporte, garantindo que ele entenda tudo.

### Executor
- **Primary:** automation-engineer
- **Support:** coach (para duvidas complexas)

### Steps Detalhados

#### 3.1 Preparacao do Material de Entrega

```yaml
step_3_1:
  name: "Preparar Material"
  executor: automation-engineer
  duration: "10-15 min"
  deliverables:
    training_package:
      - "Planilha de treino (PDF)"
      - "Videos de referencia para cada exercicio"
      - "Guia de aquecimento e cooldown"
      - "Glossario (RIR, RPE, tempo, etc.)"
    nutrition_package:
      - "Plano alimentar (PDF)"
      - "Lista de compras semanal"
      - "Tabela de substituicoes"
      - "Protocolo de suplementacao"
      - "Guia de meal prep"
    onboarding_package:
      - "Instrucoes de uso da plataforma"
      - "Como fazer check-in semanal"
      - "Contatos de suporte"
      - "FAQ com duvidas frequentes"
```

#### 3.2 Envio via Canal Preferido

```yaml
step_3_2:
  name: "Envio dos Planos"
  executor: automation-engineer
  channels:
    whatsapp:
      - "Mensagem de saudacao personalizada"
      - "PDFs de treino e dieta"
      - "Link para videos de exercicios"
      - "Instrucoes de check-in"
    email:
      - "Email profissional com todos os anexos"
      - "Welcome kit digital"
      - "Links uteis e FAQ"
    app:
      - "Push notification de novo plano disponivel"
      - "Plano carregado no app"
  timing: "Preferencialmente na segunda-feira de manha"
```

#### 3.3 Sessao de Onboarding (Opcional)

- Se coach oferece sessao de onboarding:
  - Agendar call de 15-30min
  - Revisar plano com o cliente
  - Responder duvidas
  - Garantir que o cliente entende cada exercicio
  - Alinhar expectativas de resultado

#### 3.4 Ativar Tracking e Gamificacao

- Configurar check-in semanal automatizado (scheduler)
- Ativar sistema de pontos e streaks para o cliente
- Enviar primeiro achievement: "Plano Ativado"
- Iniciar Hook 1 (check-in diario de treino)

```yaml
step_3_4:
  name: "Ativar Tracking"
  executor: automation-engineer
  actions:
    - "Configurar scheduler de weekly-checkin"
    - "Ativar gamification-engine para o cliente"
    - "Enviar badge 'Plano Ativado'"
    - "Configurar triggers de notificacao"
  output: tracking_activated
```

### Checkpoint 3 → Phase 4

```yaml
checkpoint_3:
  name: "Delivery Complete Gate"
  conditions:
    - "Planos entregues ao cliente via canal configurado"
    - "Cliente confirmou recebimento"
    - "Tracking automatizado ativado"
    - "Gamificacao iniciada"
    - "Proximo check-in agendado"
  on_pass: "Proceed to Phase 4"
  on_fail: "Re-send materials, verify channels"
  blocker: true
```

---

## Phase 4: TRACKING — Acompanhamento Semanal (RECORRENTE)

### Objetivo
Monitorar progresso do cliente semanalmente, detectar tendencias, gerar alertas e manter o coach informado.

### Task Executada
`tasks/weekly-checkin.md` (FC-TASK-004)

### Executor
- **Trigger:** automation-engineer (scheduler semanal)
- **Processing:** progress-tracker
- **Notification:** automation-engineer

### Ciclo Semanal

```
  ┌──────────────────────────────────────────────────┐
  │               CICLO SEMANAL                       │
  │                                                    │
  │  Domingo    → Enviar formulario de check-in       │
  │  Seg-Ter    → Aguardar resposta (timeout 48h)     │
  │  Apos resp. → Processar dados                     │
  │             → Analisar tendencias                  │
  │             → Gerar alertas                        │
  │             → Compilar report para coach           │
  │             → Atualizar gamificacao                │
  │             → Decisao: manter ou ajustar?          │
  │                                                    │
  │  SE manter  → Agendar proximo check-in            │
  │  SE ajustar → Trigger Phase 5 (ADJUSTMENT)        │
  │  SE alerta  → Notificar coach imediatamente       │
  └──────────────────────────────────────────────────┘
```

### Steps Detalhados

#### 4.1 Coleta de Dados Semanais
- Peso atual (obrigatorio)
- Aderencia treino e dieta (obrigatorio)
- Bem-estar, sono, stress (obrigatorio)
- Fotos de progresso (opcional)
- Medidas corporais (opcional)
- Training log (opcional)

#### 4.2 Analise de Tendencias
- Media movel de peso (7 dias)
- Tendencia de aderencia (4 semanas)
- Recovery score composto
- Performance (se training log fornecido)

#### 4.3 Sistema de Alertas
- **Vermelho:** Acao imediata (perda rapida, recovery critico)
- **Amarelo:** Atencao (plateau, aderencia caindo)
- **Verde:** Informativo (PRs, milestones)

#### 4.4 Report do Coach
- Resumo executivo com status geral
- Metricas detalhadas com tendencias
- Comparativo de fotos (se disponivel)
- Recomendacao: manter ou ajustar

#### 4.5 Gamificacao
- Processar pontos do check-in
- Atualizar streaks
- Verificar achievements desbloqueados
- Atualizar leaderboard

### Routing pos-Check-in

```yaml
routing:
  maintain:
    condition: "Sem alertas ou apenas verdes"
    action: "Agendar proximo weekly-checkin"
    next_phase: "Phase 4 (loop)"
  adjust:
    condition: "Alertas amarelos ou estagnacao"
    action: "Trigger Phase 5 (ADJUSTMENT)"
    next_phase: "Phase 5"
  escalate:
    condition: "Alertas vermelhos"
    action: "Notificacao imediata ao coach"
    next_phase: "Phase 5 (urgente)"
  celebrate:
    condition: "Milestone ou PR atingido"
    action: "Enviar celebracao + gamification reward"
    next_phase: "Phase 4 (loop) + Phase 6 integration"
```

### Checkpoint 4 → Phase 5 (condicional)

```yaml
checkpoint_4:
  name: "Weekly Check-in Gate"
  conditions:
    - "Check-in processado com sucesso"
    - "Report do coach gerado e enviado"
    - "Gamificacao atualizada"
    - "Routing decision definido"
  on_maintain: "Loop back to Phase 4 next week"
  on_adjust: "Proceed to Phase 5"
  on_escalate: "Proceed to Phase 5 with urgency flag"
  recurring: true
```

---

## Phase 5: ADJUSTMENT — Ajuste de Protocolo (CONDICIONAL)

### Objetivo
Ajustar treino e/ou dieta baseado em dados de progressao quando triggers sao ativados.

### Task Executada
`tasks/adjust-protocol.md` (FC-TASK-005)

### Executor
- **Analysis:** training-builder + diet-builder
- **Advisors:** Israetel, Norton, Bompa, Glass
- **Approval:** coach (human)

### Triggers de Ativacao

| Trigger | Condicao | Urgencia |
|---------|----------|----------|
| Weight Plateau | Peso estagnado 3+ semanas com aderencia > 80% | MEDIUM |
| Strength Loss | Regressao em compostos 2+ semanas | HIGH |
| Adherence Decline | Queda > 10% em 3 semanas | MEDIUM |
| Recovery Compromised | Recovery score < 5 por 2+ semanas | HIGH |
| Phase Transition | Mesociclo/fase completado | LOW |
| Coach Request | Coach solicita ajuste manualmente | VARIABLE |
| Red Alert | Qualquer alerta vermelho do check-in | CRITICAL |

### Steps Detalhados

#### 5.1 Diagnostico
- Analisar dados de tendencia
- Identificar tipo de problema/oportunidade
- Classificar urgencia

#### 5.2 Consulta aos Advisors
- Treino: Israetel (volume), Glass (exercicios), Bompa (periodizacao)
- Nutricao: Norton (macros, refeeds, diet breaks)

#### 5.3 Compilar Sugestoes
- Gerar adjustment report com justificativas
- Priorizar ajustes por impacto

#### 5.4 Aprovacao do Coach
- Coach revisa e aprova/modifica sugestoes
- Registrar decisao

#### 5.5 Aplicar e Notificar
- Atualizar planos
- Notificar cliente com explicacao das mudancas

### Checkpoint 5 → Phase 4 (volta ao loop)

```yaml
checkpoint_5:
  name: "Adjustment Complete Gate"
  conditions:
    - "Ajustes aprovados pelo coach"
    - "Planos atualizados e salvos"
    - "Cliente notificado das mudancas"
    - "Historico de ajuste registrado"
  on_pass: "Return to Phase 4 (tracking loop)"
  on_rebuild: "Return to Phase 2 (new protocol from scratch)"
  blocker: true
```

---

## Phase 6: GAMIFICATION — Engajamento Continuo (INTEGRADO)

### Objetivo
Manter o cliente engajado e motivado atraves de mecanicas de gamificacao integradas em todas as interacoes.

### Task Executada
`tasks/setup-gamification.md` (FC-TASK-007)

### Executor
- **Design:** gamification-designer (Yu-kai Chou)
- **Hooks:** retention-engineer (Nir Eyal)
- **Engine:** gamification-engine (tool)

### Mecanicas Ativas Continuamente

#### 6.1 Sistema de Pontos e XP
- Pontos por treino completado
- Pontos por aderencia a dieta
- Pontos por check-in
- Bonus por PRs e milestones
- XP acumulativo para subir de nivel

#### 6.2 Streaks
- Training streak (dias consecutivos)
- Diet streak (aderencia > 80%)
- Check-in streak (semanas consecutivas)
- Streak freeze disponivel (1/semana)

#### 6.3 Achievements e Badges
- 30+ badges organizados por categoria
- Raridades: common, uncommon, rare, epic, legendary
- Badges visiveis no perfil do cliente
- Notificacao ao desbloquear

#### 6.4 Challenges
- Challenges individuais e em grupo
- Challenges sazonais (Summer Shred, New Year)
- Leaderboard semanal, mensal, all-time

#### 6.5 Hook Model — Loops Diarios

```
Hook 1: Check-in de Treino (diario)
  Trigger → Action → Variable Reward → Investment

Hook 2: Check-in de Dieta (diario)
  Trigger → Action → Variable Reward → Investment

Hook 3: Check-in Semanal (semanal)
  Trigger → Action → Variable Reward → Investment

Hook 4: Interacao Comunitaria (diario)
  Trigger → Action → Variable Reward → Investment
```

### Checkpoint 6 (Continuo)

```yaml
checkpoint_6:
  name: "Gamification Health Check"
  frequency: "monthly"
  conditions:
    - "Taxa de engajamento com gamificacao > 50%"
    - "Streaks ativos para maioria dos clientes"
    - "Challenges com participacao adequada"
    - "Hook completion rate > 30%"
  on_low_engagement: "Review and adjust mechanics"
  on_high_engagement: "Add new features and challenges"
```

---

## Phase 7: RETENTION — Retencao e Fidelizacao (CONTINUO)

### Objetivo
Manter o cliente engajado a longo prazo usando Hook Model, community building e valor continuo.

### Executor
- **Strategy:** retention-engineer (Nir Eyal)
- **Execution:** automation-engineer

### Estrategias de Retencao

#### 7.1 Hook Model Engagement Loops

**Loop 1: Habito de Treino**
- Trigger interno: horario do treino (habito formado)
- Acao automatica: abrir plano, registrar treino
- Recompensa variavel: XP, badges, posicao no leaderboard
- Investimento: dados acumulados, historico, streak

**Loop 2: Comunidade**
- Trigger externo: notificacao de novo post/challenge
- Trigger interno: desejo de conexao
- Acao: participar, interagir, compartilhar
- Recompensa: reconhecimento social, badges sociais
- Investimento: reputacao, relacoes construidas

**Loop 3: Progresso**
- Trigger: check-in semanal ou notificacao de milestone
- Acao: ver report, comparar fotos, celebrar
- Recompensa: visualizar transformacao, badges de progresso
- Investimento: portfolio de progresso acumulado

#### 7.2 Prevencao de Churn

```yaml
churn_prevention:
  early_warning_signals:
    - "Check-in missed por 2 semanas"
    - "Aderencia < 50% por 3 semanas"
    - "Sem interacao no grupo por 2 semanas"
    - "Streak quebrado apos longo periodo"

  intervention_protocol:
    week_1_missed:
      action: "Lembrete automatico carinhoso"
      executor: automation-engineer
    week_2_missed:
      action: "Mensagem personalizada do coach"
      executor: coach (manual)
    week_3_missed:
      action: "Call do coach para entender situacao"
      executor: coach (manual)
    week_4_missed:
      action: "Oferta de pausa (freeze) ao inves de cancelamento"
      executor: coach (manual)

  re_engagement:
    - "Welcome back badge ao retornar"
    - "Plano atualizado sem custo adicional"
    - "Desafio de re-engajamento de 7 dias"
    - "Streak restart com bonus XP"
```

#### 7.3 Upsell e Cross-sell

- Competition prep para clientes avancados
- Produtos digitais (ebooks, cursos)
- Suplementos (e-commerce integrado)
- Planos premium com mais acompanhamento
- Consultoria de grupo com desconto

#### 7.4 Referral Program

```yaml
referral:
  reward_for_referrer:
    - "Badge: Referral King"
    - "500 XP bonus"
    - "Desconto de 10% no proximo mes"
  reward_for_referred:
    - "Desconto de 10% no primeiro mes"
    - "Badge: Indicado por Amigo"
    - "Fast track no onboarding"
  tracking:
    - "Codigo unico por cliente"
    - "Dashboard de indicacoes"
    - "Metricas: indicacoes feitas, convertidas, valor gerado"
```

### Checkpoint 7 (Continuo)

```yaml
checkpoint_7:
  name: "Retention Health Check"
  frequency: "monthly"
  metrics:
    churn_rate: "< 5% mensal = healthy"
    nps_score: "> 50 = healthy"
    referral_rate: "> 10% = healthy"
    average_lifetime: "> 6 months = healthy"
    engagement_rate: "> 60% = healthy"
  on_healthy: "Continue current strategy"
  on_warning: "Review and adjust retention tactics"
  on_critical: "Emergency retention meeting with coach"
```

---

## Workflow Configuration

```yaml
configuration:
  automation:
    check_in_day: "sunday"
    check_in_time: "08:00"
    reminder_intervals: ["12h", "24h"]
    report_delivery: "tuesday_morning"
    gamification_update: "after_each_checkin"

  thresholds:
    adjustment_trigger_weeks: 3
    plateau_definition_weeks: 3
    adherence_warning_percent: 70
    recovery_warning_score: 5
    churn_warning_missed_checkins: 2

  notifications:
    coach_channel: [email, whatsapp]
    client_channel: [whatsapp, email]
    red_alert: "immediate_push"
    yellow_alert: "include_in_report"
    green_alert: "celebration_message"

  gamification:
    enabled: true
    leaderboard: true
    challenges: true
    hooks: true
    achievements: true
    streaks: true
```

---

## Error Handling Global

```yaml
error_handling:
  phase_failure:
    strategy: "retry + escalate_to_coach"
    max_retries: 2
    escalation: "After 2 retries, notify coach for manual intervention"

  communication_failure:
    strategy: "fallback_channel"
    primary: whatsapp
    fallback: email
    last_resort: "Notify coach for direct contact"

  data_loss:
    strategy: "backup + recover"
    backup_frequency: "after_each_checkin"
    recovery: "Load from last backup"

  client_unresponsive:
    strategy: "escalating_outreach"
    sequence: ["automated_reminder", "coach_message", "coach_call", "freeze_offer"]
```

---

## Metricas de Sucesso do Workflow

```yaml
success_metrics:
  client_satisfaction:
    nps: "> 50"
    retention_6_months: "> 70%"
    referral_rate: "> 10%"

  results:
    goal_achievement_rate: "> 60% of clients achieve primary goal"
    average_progress: "Measurable improvement every 4 weeks"

  operational:
    check_in_completion_rate: "> 80%"
    coach_response_time: "< 24h for reports"
    adjustment_turnaround: "< 48h from trigger to implementation"

  engagement:
    gamification_participation: "> 50% of clients"
    streak_average: "> 14 days"
    challenge_participation: "> 30% per challenge"
```

---

## Metadata

```yaml
workflow_id: FC-WF-001
name: full-client-journey
version: 1.0.0
squad: fitcoach
tasks:
  - client-intake (FC-TASK-001)
  - create-training-plan (FC-TASK-002)
  - create-diet-plan (FC-TASK-003)
  - weekly-checkin (FC-TASK-004)
  - adjust-protocol (FC-TASK-005)
  - setup-gamification (FC-TASK-007)
agents:
  - fitcoach-chief (orchestrator)
  - intake-analyst
  - training-builder
  - diet-builder
  - automation-engineer
  - progress-tracker
  - gamification-designer
  - retention-engineer
advisors:
  - hypertrophy-scientist (Israetel)
  - nutrition-scientist (Norton)
  - periodization-architect (Bompa)
  - biomechanics-coach (Glass)
  - elite-coach (Jansen)
  - gamification-designer (Yu-kai Chou)
  - retention-engineer (Nir Eyal)
tools:
  - training-plan-generator
  - macro-calculator
  - progress-comparator
  - gamification-engine
  - quality-checker
tags:
  - lifecycle
  - client-journey
  - end-to-end
  - retention
  - gamification
updated_at: 2026-03-11
```
