# Test Case: Orchestrator Routing

- **ID:** FC-TC-005
- **Agent Under Test:** fitcoach-chief (Coach Prime)
- **Category:** integration
- **Priority:** P0

## Objective

Validar que o fitcoach-chief classifica corretamente requests nas categorias A-H e X, aplica o tier routing adequado (incluindo resolução de pre-requisitos), inicia workflows multi-agente com estratégia correta (sequential, parallel, iterative), e preserva contexto entre handoffs sem perda de informação crítica.

## Preconditions

- fitcoach-chief ativo como orchestrator do squad
- Todos os agentes do squad registrados e disponíveis
- fitcoach_context inicializado (pode estar vazio para testes de novo usuário)

---

## Test Scenarios

### Scenario 1: Routing correto para cada categoria de request

**Input (multiple):**
> A) "Tenho um novo aluno, Tiago, 22 anos, quer ganhar massa."
> B) "Quero entender por que meu faturamento parou de crescer."
> C) "Monta um treino para a Ana." (sem perfil da Ana no contexto)
> D) "Monta um treino para o Carlos." (com student_profile do Carlos já no contexto)

**Expected Behavior:**
- [ ] Request A: Coach Prime classifica como Category A (ALUNO_NOVO) e roteia para intake-analyst com handoff artifact correto
- [ ] Request B: Coach Prime classifica como Category B (DIAGNOSTICO_NEGOCIO) e roteia para business-diagnostician
- [ ] Request C: Coach Prime classifica como Category C (TREINO) com pre-requisite NÃO atendido, redireciona para intake-analyst primeiro com mensagem explicando o motivo, salva o request original para retomada
- [ ] Request D: Coach Prime classifica como Category C com pre-requisite atendido e roteia diretamente para training-builder com student_profile do Carlos

**Pass Criteria:**
- 100% de acerto na classificação de categoria para os 4 requests
- Request C gera mensagem de redirecionamento explicando o pre-requisito faltante
- Request D aciona handoff direto para training-builder com dados do Carlos transferidos

---

### Scenario 2: Workflow multi-agente com preservação de contexto entre handoffs

**Input:**
> Coach Prime, inicia o Student Onboarding completo para a Sofia. Ela tem 28 anos, quer emagrecer, nunca treinou consistentemente.

**Expected Behavior:**
- [ ] Coach Prime ativa WF-001 (Student Onboarding) com strategy SEQUENTIAL
- [ ] Handoff para intake-analyst com dados iniciais da Sofia (nome, idade, objetivo)
- [ ] Após intake-analyst concluir, Coach Prime recebe student_profile e roteia para training-builder com o perfil completo
- [ ] Após training-builder concluir, Coach Prime passa student_profile + training_protocol para diet-builder
- [ ] Contexto da Sofia (classification, goal, restrictions) é preservado em cada handoff sem truncamento
- [ ] Handoff artifacts respeitam limite de 500 tokens (conforme agent-handoff protocol)

**Pass Criteria:**
- Sequência de handoffs correta: intake-analyst → training-builder → diet-builder → automation-engineer
- Cada agente recebe o output do agente anterior como input
- student_profile não é truncado entre handoffs
- fitcoach_context.active_student atualizado após cada etapa com campos relevantes

---

### Scenario 3: Coordenação multi-tier com consultoria de Tier 1 e Tier 2

**Input:**
> Coach Prime, preciso de uma estratégia completa para o meu negócio. Tenho alunos de nível avançado que precisam de treino de elite, e meu negócio está crescendo mas preciso de orientação de scaling.

**Expected Behavior:**
- [ ] Coach Prime classifica como Category X (MULTI_TIER): bodybuilding (Tier 1) + business (Tier 2)
- [ ] Ativa *consult-bb para consultar conselheiros de Tier 1 sobre treino de elite (elite-coach, hypertrophy-scientist)
- [ ] Ativa *consult-biz para consultar conselheiros de Tier 2 sobre scaling (gym-scaler)
- [ ] Strategy CONSULTATIVE aplicada com consolidação de insights de múltiplos conselheiros
- [ ] Output consolida recomendações de Tier 1 e Tier 2 sem contradições

**Pass Criteria:**
- Pelo menos 1 conselheiro de Tier 1 consultado para a parte bodybuilding
- Pelo menos 1 conselheiro de Tier 2 consultado para a parte business
- Output final consolidado apresenta recomendações de ambos os tiers de forma coerente
- Nenhuma contradição entre recomendações de treino e de negócio no output final

---

## Veto Test (must REJECT)

**Input:**
> Coach: Quero montar logo a dieta do Pedro. Pula o intake, eu sei que ele quer cutting, tem 30 anos e treina 3x/semana.

**Expected:**
- [ ] Coach Prime REJECTS o request de pular o intake
- [ ] Cita veto FC_CH_V002: roteamento para Tier 3 sem pre-requisitos atendidos é bloqueado
- [ ] Coach Prime explica por que o intake é necessário: dados médicos, restrições alimentares, carga de treino real
- [ ] Sugere alternativa: intake express (dados mínimos para desbloquear prescrição segura) ou anamnese completa
- [ ] Nenhum handoff para diet-builder ocorre sem student_profile válido com intake_complete = true

---

## Source References

[SOURCE: fitcoach-chief REQUEST CLASSIFICATION MATRIX — Categories A-H e X com pre-requisites e gates]
[SOURCE: fitcoach-chief ROUTING DECISION TREE — lógica de resolução de pre-requisitos em cascata]
[SOURCE: fitcoach-chief COORDINATION STRATEGIES — Sequential, Parallel, Iterative, Consultative]
[SOURCE: agent-handoff.md — Protocolo de compactação de contexto e limite de 500 tokens por handoff artifact]
[SOURCE: fitcoach-chief Veto Conditions FC_CH_V001, FC_CH_V002, FC_CH_V003]
