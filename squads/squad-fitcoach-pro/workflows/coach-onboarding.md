---

# Workflow: Coach Onboarding

## Workflow Definition

```yaml
workflow:
  id: FC-WF-004
  name: "Coach Onboarding"
  squad: fitcoach
  version: 1.0.0
  description: >-
    Onboarding completo de um novo coach/personal trainer na plataforma FitCoach.
    Transforma um negocio de coaching presencial/improvisado em uma operacao
    digital estruturada com automacoes, gamificacao, e-commerce e conteudo.
    Baseado nos frameworks de Alex Hormozi ($100M Offers), Chris Cooper
    (Two-Brain Business), Nir Eyal (Hooked) e Yu-kai Chou (Octalysis).
  type: coach-lifecycle
  pattern_prefix: FC
  updated_at: 2026-03-11

  metadata:
    elicit: true
    confirmation_required: true
    estimated_duration: "2-4 semanas (14-28 dias)"
    phases: 8
    tasks_involved: 14
    recurring_phases: [8]
    target_persona: "Personal trainer / coach fitness"
    example_coach: "Carlos Salvador Jr"

  entry_conditions:
    - "Coach assinou contrato com a plataforma FitCoach"
    - "Coach possui pelo menos 5 alunos ativos"
    - "Coach tem presenca digital minima (Instagram ativo)"
    - "Coach completou formulario de pre-cadastro"
    - "Reuniao kick-off agendada com fitcoach-chief"

  exit_conditions:
    - "Coach completou 8 fases com aprovacao em todos os checkpoints"
    - "Pelo menos 80% dos alunos migrados para a plataforma"
    - "Primeiras automacoes ativas e funcionando"
    - "E-commerce configurado e primeiro produto listado"
    - "Report de resultados vs baseline entregue"

  agents_involved:
    - fitcoach-chief        # Orquestrador principal e configuracao da plataforma
    - business-diagnostician # Diagnostico de negocio e analise de gaps
    - gym-scaler            # Design de ofertas com Value Equation (Hormozi)
    - gym-operator          # Operacoes e SOPs do negocio
    - automation-engineer   # WhatsApp, email e automacoes
    - gamification-designer # Sistema de pontos, niveis e desafios
    - ecommerce-manager     # Loja, produtos e pagamentos
    - content-repurposer    # Reaproveitamento de conteudo existente
    - retention-engineer    # Hook Model e estrategias de retencao
```

---

## Overview

Pipeline completo para transformar um coach/personal trainer em um negocio digital estruturado, com automacoes, gamificacao, e-commerce e conteudo.

**O problema que este workflow resolve:**

A maioria dos personal trainers e coaches fitness opera de forma artesanal: planilhas de Excel para treinos, WhatsApp para comunicacao, pagamentos via Pix no imprevisto, e nenhum sistema de retencao. O resultado e uma operacao que nao escala, onde o coach e o gargalo de tudo. O Coach Onboarding Workflow transforma essa realidade em um negocio digital previsivel e escalavel em 8 fases estruturadas.

**Exemplo de Aplicacao — Carlos Salvador Jr:**

Carlos e personal trainer com 23 alunos presenciais em Santos/SP. Fatura R$ 18.000/mes mas trabalha 60h/semana. Usa WhatsApp para tudo, planilhas do Google para treinos, e perde alunos sem entender o motivo. Ao passar pelo Coach Onboarding Workflow, Carlos estrutura seu negocio digital, automatiza 70% das comunicacoes, e cria capacidade para atender 50+ alunos com o mesmo esforco atual.

---

## Flow Completo

```
+--------------------------------------------------------------------------------------+
|                          COACH ONBOARDING WORKFLOW -- FC-WF-004                      |
|                                                                                      |
|  +------------+   +------------+   +------------+   +------------+                  |
|  |  PHASE 1   |-->|  PHASE 2   |-->|  PHASE 3   |-->|  PHASE 4   |                  |
|  | ASSESSMENT |   |   OFFER    |   | MIGRATION  |   | PLATFORM   |                  |
|  |  (Dias 1-2)|   |  (Dias 3-5)|   | (Dias 5-7) |   | (Dias 7-10)|                  |
|  +------------+   +------------+   +------------+   +------------+                  |
|                                                             |                        |
|  +------------+   +------------+   +------------+   +------v-----+                  |
|  |  PHASE 8   |<--|  PHASE 7   |<--|  PHASE 6   |<--|  PHASE 5   |                  |
|  |   LAUNCH   |   | E-COMMERCE |   |GAMIFICATION|   | AUTOMATION |                  |
|  |(Dias 17-21)|   |(Dias 14-17)|   |(Dias 12-14)|   |(Dias 10-12)|                  |
|  +------------+   +------------+   +------------+   +------------+                  |
|         |                                                                            |
|         v                                                                            |
|  +------------+                                                                      |
|  | MONITORING |                                                                      |
|  |  (D 21+)   |                                                                      |
|  +------------+                                                                      |
|                                                                                      |
|  Checkpoint obrigatorio em cada transicao de fase                                    |
|  Veto conditions bloqueiam avanco automatico                                         |
+--------------------------------------------------------------------------------------+
```

---

## Phase 1: Business Assessment (Dias 1–2)

**Agent Responsavel:** `business-diagnostician`
**Checkpoint de Saida:** `FC-CP-ONBOARD-001`
**Duracao Estimada:** 2 dias (1 dia de coleta + 1 dia de analise)
**Task Principal:** `business-diagnostic.md`

---

### Objetivos da Fase

Antes de configurar qualquer ferramenta, e fundamental entender o negocio atual do coach com precisao cirurgica. Esta fase mapeia a realidade operacional, financeira e de marketing — criando a fotografia do estado atual (AS-IS) que servira de baseline para medir o sucesso do onboarding.

- Entender o modelo de negocio atual em todas as suas dimensoes
- Mapear a base de alunos existente com dados quantitativos e qualitativos
- Identificar os gaps operacionais criticos (onde o coach perde dinheiro ou tempo)
- Definir metas de crescimento realistas e mensuraveis (framework SMART)
- Estabelecer o baseline financeiro para calculo de ROI pos-onboarding

---

### Steps Detalhados

**Step 1.1 — Reuniao de Kick-Off (90 minutos)**

Conduzida pelo `fitcoach-chief` e `business-diagnostician` em conjunto. Objetivo: criar rapport, alinhar expectativas e coletar dados primarios.

Roteiro da reuniao:
- Apresentacao da plataforma e do processo de onboarding (15 min)
- Historia do coach: como chegou ate aqui, por que quer escalar (20 min)
- Walkthrough do negocio atual: o que oferece, para quem, como (30 min)
- Dores e frustracoes: o que mais consome tempo e energia (15 min)
- Visao de futuro: onde quer estar em 6 meses, 1 ano, 3 anos (10 min)

**Step 1.2 — Inventario de Receitas**

Mapear todas as fontes de receita com valores exatos:
- Mensalidades presenciais (por aluno, por frequencia)
- Acompanhamento online (planos mensais, trimestrais, anuais)
- Programas de emagrecimento/hipertrofia com prazo definido
- Assessoria nutricional (se aplicavel)
- Venda de suplementos ou produtos fisicos
- Conteudo (cursos, e-books, mentorias em grupo)
- Eventos (workshops, camps, bootcamps)

Calcular: ticket medio por aluno, LTV atual, MRR (Monthly Recurring Revenue).

**Step 1.3 — Mapeamento da Base de Alunos**

Para cada aluno ativo, documentar:
- Nome e contato (WhatsApp/email)
- Objetivo principal (emagrecimento, hipertrofia, condicionamento, saude)
- Tempo de relacionamento com o coach
- Valor pago mensalmente
- Frequencia de treino
- Canal de comunicacao preferido
- NPS informal (promotor, neutro, detrator — baseado na percepcao do coach)
- Historico de pagamento (adimplente, atraso ocasional, problema recorrente)

Calcular: distribuicao por segmento, Pareto (quais 20% geram 80% da receita).

**Step 1.4 — Auditoria de Ferramentas Atuais**

Inventariar todas as ferramentas em uso:

| Ferramenta | Para que usa | Frequencia | Custo/mes | Substituivel? |
|------------|-------------|------------|-----------|--------------|
| WhatsApp pessoal | Comunicacao com alunos | Diario | R$ 0 | Sim (WhatsApp Business) |
| Google Sheets | Treinos e dietas | Diario | R$ 0 | Sim (plataforma) |
| Google Forms | Anamnese | Eventual | R$ 0 | Sim |
| Instagram | Marketing | Diario | R$ 0 | Nao (complementar) |
| Outros | ... | ... | ... | ... |

Identificar: quais ferramentas serao substituidas, quais integradas, quais mantidas.

**Step 1.5 — Identificacao das TOP 3 Dores Operacionais**

Metodologia: perguntar ao coach "o que mais te faz perder tempo/dinheiro?" e entao quantificar cada dor.

Exemplos tipicos de dores de coaches:
- "Passo 3 horas por dia no WhatsApp respondendo as mesmas perguntas"
- "Alunos somem sem aviso e eu so descubro quando nao pagam"
- "Nao consigo criar treinos para mais de X alunos sem perder qualidade"
- "Nao sei quais alunos estao engajados e quais vao sair"
- "Fico no prejuizo quando aluno cancela de ultima hora"
- "Nao tenho como saber se o aluno fez o treino ou nao"
- "Cada treino que crio do zero leva 1 hora"

Para cada dor, documentar:
- Descricao detalhada
- Tempo gasto por semana com esta dor
- Impacto financeiro estimado (receita perdida + custo de oportunidade)
- Solucao atual (se houver)
- Como a plataforma resolve

**Step 1.6 — Analise de Capacidade**

Calcular:
- Capacidade atual: quantos alunos consegue atender com qualidade hoje
- Capacidade desejada: onde quer chegar em 6 meses
- Gargalo principal: o que impede de atender mais alunos
- Horas operacionais: distribuicao do tempo de trabalho por atividade

Ferramenta: Time Audit de 1 semana (coach registra atividades a cada hora).

**Step 1.7 — Definicao de Metas SMART**

Com base no diagnostico, definir metas conjuntamente com o coach:

| Dimensao | Situacao Atual | Meta 30 dias | Meta 90 dias | Meta 1 ano |
|----------|---------------|-------------|-------------|-----------|
| Numero de alunos | X | X+20% | X+50% | X*2 |
| MRR | R$ X | R$ X+15% | R$ X+40% | R$ X*2.5 |
| Horas/semana trabalhadas | X horas | -10% | -25% | -40% |
| NPS dos alunos | baseline | >30 | >50 | >70 |
| Churn rate mensal | X% | <8% | <5% | <3% |
| Ticket medio | R$ X | +10% | +20% | +50% |

**Step 1.8 — Verificacao de Pre-Requisitos Tecnicos**

Confirmar que o coach possui:
- [ ] Smartphone com WhatsApp Business (ou disposto a criar)
- [ ] E-mail profissional (preferencialmente com dominio proprio)
- [ ] Acesso a internet estavel
- [ ] Conta bancaria PJ ou CPF para recebimentos
- [ ] CNPJ ativo (se aplicavel para nota fiscal)
- [ ] Dispositivo para gravacao de videos de exercicios (smartphone e suficiente)

---

### Inputs Requeridos

| Input | Tipo | Obrigatorio | Fonte |
|-------|------|-------------|-------|
| Nome completo do coach | Texto | Sim | Formulario pre-cadastro |
| Nome da marca/empresa | Texto | Sim | Formulario pre-cadastro |
| Instagram e outras redes | URLs | Sim | Formulario pre-cadastro |
| Numero de alunos ativos | Numero | Sim | Coach informa |
| Lista de alunos (nome + contato + valor) | Planilha | Sim | Coach exporta |
| MRR atual | Valor em R$ | Sim | Coach informa |
| Horas trabalhadas por semana | Numero | Sim | Coach estima |
| Ferramentas em uso | Lista | Sim | Coach lista |
| Objetivo de crescimento | Texto | Sim | Reuniao kick-off |
| Historico de churn (se souber) | % ou numero | Nao | Coach informa |

---

### Outputs Gerados

| Output | Arquivo | Formato | Owner |
|--------|---------|---------|-------|
| Relatorio de diagnostico completo | `business-diagnostic-report.md` | Markdown | business-diagnostician |
| Analise do estado atual (AS-IS) | `current-state-analysis.md` | Markdown | business-diagnostician |
| Rascunho do roadmap de crescimento | `growth-roadmap-draft.md` | Markdown | fitcoach-chief |
| Planilha de alunos estruturada | `client-database-raw.csv` | CSV | business-diagnostician |
| Mapa de dores operacionais | `operational-pain-map.md` | Markdown | business-diagnostician |
| Metas SMART documentadas | `smart-goals.md` | Markdown | fitcoach-chief |

---

### Veto Conditions

**VETO-001 — Base minima de alunos:**
Se o coach possui menos de 5 alunos ativos, a plataforma completa nao e justificada economicamente. Acao: apresentar versao simplificada (Tier Starter) e agendar revisao em 60 dias quando tiver mais alunos.

**VETO-002 — Presenca digital minima:**
Se o coach tem Instagram com menos de 100 seguidores E nenhuma outra presenca digital relevante, incluir Fase 0 de Branding Digital antes de continuar o onboarding. Duracao adicional: 1 semana.

**VETO-003 — Comprometimento do coach:**
Se o coach nao completou o Time Audit de 1 semana nem forneceu a lista de alunos, nao avancar para Fase 2. O diagnostico incompleto comprometeria todas as fases seguintes.

**VETO-004 — Situacao financeira critica:**
Se o MRR atual e inferior ao custo da plataforma, renegociar condicoes ou aguardar crescimento minimo antes do onboarding completo.

---

### Checkpoint FC-CP-ONBOARD-001

**Criterios de Aprovacao (todos obrigatorios):**

- [ ] Diagnostico completo preenchido com todos os campos
- [ ] Dores operacionais documentadas e quantificadas (pelo menos 3)
- [ ] Metas SMART definidas e aprovadas pelo coach
- [ ] Lista de alunos recebida e estruturada
- [ ] Baseline financeiro calculado (MRR, ticket medio, LTV)
- [ ] Capacidade atual vs desejada documentada
- [ ] Pre-requisitos tecnicos verificados
- [ ] Coach assinou termo de comprometimento com o processo
- [ ] Roadmap de crescimento aprovado pelo coach
- [ ] Nenhuma Veto Condition ativa

**Aprovadores:** `fitcoach-chief` + `business-diagnostician`
**Decisao:** GO / NO-GO / CONDITIONAL GO (com itens pendentes documentados)

---

## Phase 2: Offer Design (Dias 3–5)

**Agent Responsavel:** `gym-scaler`
**Checkpoint de Saida:** `FC-CP-ONBOARD-002`
**Duracao Estimada:** 3 dias
**Task Principal:** `offer-design.md`
**Framework Base:** Alex Hormozi — $100M Offers, Value Equation

---

### Objetivos da Fase

A maioria dos coaches precifica mal seus servicos — cobram pelo tempo (hora de treino) em vez do resultado (transformacao do aluno). Esta fase aplica o Value Equation de Hormozi para redesenhar as ofertas do coach, criando um stack de valor irrecusavel com pricing baseado em resultado, nao em commodity.

- Redesenhar ofertas usando a Value Equation de Hormozi
- Criar stack de valor com bonuses e diferenciais claros
- Definir pricing em 3 tiers (Basico, Premium, VIP)
- Criar garantia de resultado (risk-reversal)
- Calcular LTV projetado por tier e objetivo de revenue mix

---

### Steps Detalhados

**Step 2.1 — Workshop Value Equation (3 horas com o coach)**

A Value Equation de Hormozi:

```
Valor = (Dream Outcome x Perceived Likelihood of Achievement)
        / (Time Delay x Effort & Sacrifice)
```

Para maximizar valor percebido:
- **Dream Outcome:** Qual o resultado mais desejado que o coach entrega? (ex: "Perder 10kg em 90 dias e manter para sempre")
- **Perceived Likelihood:** Por que o aluno acredita que ESTE coach entrega resultado? (provas sociais, certificacoes, metodologia)
- **Time Delay:** Em quanto tempo o aluno ve o primeiro resultado? (reducao de 90 para 30 dias)
- **Effort & Sacrifice:** Quanto esforco o aluno precisa fazer? (reducao via automacao e suporte)

Para cada eixo, identificar o que o coach ja tem e o que pode melhorar.

**Step 2.2 — Inventario de Entregaveis Atuais**

Listar TUDO que o coach entrega hoje, incluindo o que considera "obvio":
- Treinos personalizados (quantos por mes? revisados com que frequencia?)
- Planilhas de dieta ou orientacao nutricional
- Acompanhamento por WhatsApp (quantas horas por semana?)
- Avaliacao fisica inicial
- Reavaliacao periodica (a cada quantas semanas?)
- Videos de exercicios gravados
- Acesso a grupos exclusivos (se existir)
- Eventos presenciais ou online
- Materiais educativos
- Acesso ao coach fora do horario de treino

Quantificar o valor de cada entregavel separadamente.

**Step 2.3 — Criacao do Offer Stack**

Estruturar os entregaveis em um stack de valor irrecusavel:

```
PLANO PREMIUM -- "Transformacao Completa" (exemplo)

CORE OFFER:
  + Treinos personalizados semanais (valor de mercado: R$ 400/mes)
  + Acompanhamento nutricional individualizado (valor: R$ 300/mes)
  + Avaliacoes mensais de composicao corporal (valor: R$ 150/mes)

BONUSES (so disponivel neste plano):
  + BONUS 1: Grupo VIP no WhatsApp com o coach (acesso direto)
  + BONUS 2: Biblioteca de 100+ videos de exercicios exclusivos (valor: R$ 197)
  + BONUS 3: Guia de Suplementacao Personalizado (valor: R$ 97)
  + BONUS 4: Sessao mensal de feedback de 30 minutos 1:1 (valor: R$ 200)

TOTAL VALOR PERCEBIDO: R$ 1.344+/mes
PRECO: R$ 497/mes (63% de desconto percebido)

GARANTIA: 30 dias de resultado ou devolucao integral
```

**Step 2.4 — Definicao dos 3 Tiers de Pricing**

**Tier 1 — Basico (Self-Guided):**
- Acesso a plataforma com treinos pre-programados
- Sem personalizacao individual
- Suporte via FAQ e comunidade
- Preco target: R$ 97-197/mes
- Objetivo: capturar leads que nao podem pagar premium, upsell futuro

**Tier 2 — Premium (Acompanhamento Ativo):**
- Treinos 100% personalizados
- Dieta personalizada
- Check-in semanal via plataforma
- Suporte por mensagem em horario comercial
- Avaliacao mensal
- Preco target: R$ 397-697/mes
- Objetivo: core do negocio, maior volume

**Tier 3 — VIP (Acesso Total):**
- Tudo do Premium mais:
- Acesso prioritario ao coach (WhatsApp direto)
- Sessoes de coaching quinzenais 1:1 (video call)
- Revisao de treino/dieta em 24h (sempre)
- Participacao em decisoes de programacao
- Convidado para eventos presenciais
- Preco target: R$ 1.197-1.997/mes
- Objetivo: poucos alunos, alta margem, testimonials de elite

**Step 2.5 — Naming Persuasivo dos Planos**

Evitar nomes genericos (Basico, Intermediario, Avancado). Criar nomes que remetem ao resultado:

Exemplos para coach de emagrecimento:
- Tier 1: "Startup Fit" ou "Primeiros Passos"
- Tier 2: "Transformacao Real" ou "Corpo Novo"
- Tier 3: "Elite Body" ou "Resultado Garantido"

Exemplos para coach de hipertrofia:
- Tier 1: "Iniciando a Jornada"
- Tier 2: "Construcao Solida"
- Tier 3: "Atleta Elite"

**Step 2.6 — Design da Garantia (Risk-Reversal)**

A garantia reduz o risco percebido do aluno e aumenta a conversao. Opcoes:

- **Garantia de Satisfacao 7 dias:** Se nao gostar da experiencia na primeira semana, devolucao total
- **Garantia de Resultado 30 dias:** Se seguir o plano e nao ver resultados, devolucao proporcional
- **Garantia de Experiencia:** Se o coach nao responder em X horas, desconto proporcional no proximo mes
- **Garantia Bold (Hormozi-style):** "Se voce seguir o protocolo por 90 dias e nao perder X kg, voce nao paga o mes seguinte"

Regras para a garantia:
- Deve ser especifica (evitar "satisfacao garantida" generico)
- Deve ser matematicamente sustentavel (calcular percentual de solicitacoes esperadas)
- Deve ter condicoes claras (ex: "se completou 80% dos treinos")

**Step 2.7 — Calculo de LTV Projetado**

Para cada tier, calcular:
- Tempo medio de retencao esperado (meses)
- Receita total durante o relacionamento
- Custo de aquisicao estimado (CAC)
- LTV/CAC ratio (saudavel: acima de 3x)

| Tier | Preco/mes | Retencao media | LTV | CAC estimado | LTV/CAC |
|------|-----------|----------------|-----|-------------|---------|
| Basico | R$ 147 | 4 meses | R$ 588 | R$ 50 | 11.7x |
| Premium | R$ 497 | 8 meses | R$ 3.976 | R$ 150 | 26.5x |
| VIP | R$ 1.497 | 14 meses | R$ 20.958 | R$ 300 | 69.9x |

**Step 2.8 — Construcao do Revenue Mix Target**

Definir a distribuicao ideal de alunos por tier para atingir as metas de MRR:

```
Meta MRR em 6 meses: R$ 30.000 (exemplo para Carlos Salvador Jr)

Revenue Mix:
- 40 alunos Basico x R$ 147  = R$  5.880 (19.6%)
- 30 alunos Premium x R$ 497 = R$ 14.910 (49.7%)
-  6 alunos VIP x R$ 1.497   = R$  8.982 (30.0%)
                       TOTAL  = R$ 29.772 ~= R$ 30.000
```

---

### Inputs Requeridos

| Input | Tipo | Fonte |
|-------|------|-------|
| business-diagnostic-report.md | Documento | Phase 1 |
| current-state-analysis.md | Documento | Phase 1 |
| Precificacao atual de todos os servicos | Dados | Coach |
| Depoimentos de alunos (screenshots) | Imagens/texto | Coach |
| Certificacoes e formacoes do coach | Lista | Coach |
| Provas sociais disponiveis | Lista | Coach |
| Margem operacional aceitavel | Percentual | Coach + fitcoach-chief |

---

### Outputs Gerados

| Output | Arquivo | Descricao |
|--------|---------|-----------|
| Stack de ofertas detalhado | `offer-stack.md` | Cada plano com todos os entregaveis e valores |
| Estrategia de pricing | `pricing-strategy.md` | Justificativa de precos e projecoes |
| Termos da garantia | `guarantee-terms.md` | Garantia detalhada com condicoes |
| Copy da pagina de vendas | `sales-page-copy-draft.md` | Rascunho do texto de vendas para cada plano |
| Calculadora de LTV | `ltv-calculator.xlsx` | Projecoes de receita por tier |
| Revenue mix target | `revenue-mix-target.md` | Distribuicao ideal de alunos por tier |

---

### Veto Conditions

**VETO-005 — Precificacao abaixo do custo:**
Se o Tier 1 (Basico) for precificado abaixo dos custos operacionais do coach (plataforma + tempo), recalcular antes de avancar. Coach nao pode crescer a prejuizo.

**VETO-006 — Ausencia de garantia:**
Garantia e obrigatoria para qualquer plano listado na plataforma. Definir pelo menos uma garantia de satisfacao de 7 dias antes de avancar para Phase 3.

**VETO-007 — Excesso de tiers:**
Se o coach insiste em ter mais de 5 opcoes de plano, bloquear. Mais opcoes geram o paradoxo da escolha e reduzem a conversao. Maximo absoluto: 3 tiers.

**VETO-008 — LTV/CAC abaixo de 3x:**
Se as projecoes mostram LTV/CAC < 3x em qualquer tier, revisar preco ou estrategia de reducao de churn antes de avancar.

---

### Checkpoint FC-CP-ONBOARD-002

**Criterios de Aprovacao:**

- [ ] 3 tiers de pricing definidos e documentados
- [ ] Offer stack completo para cada tier (core + bonuses)
- [ ] Garantia definida com condicoes claras
- [ ] Naming dos planos criado e aprovado pelo coach
- [ ] LTV projetado calculado para cada tier
- [ ] Revenue mix target alinhado com metas da Fase 1
- [ ] Copy de vendas rascunhado para pelo menos o tier Premium
- [ ] Coach aprovou a nova estrutura de precos
- [ ] Nenhuma Veto Condition ativa

**Aprovadores:** `gym-scaler` + `fitcoach-chief`

---

## Phase 3: Client Migration (Dias 5–7)

**Agents Responsaveis:** `fitcoach-chief` + `automation-engineer`
**Checkpoint de Saida:** `FC-CP-ONBOARD-003`
**Duracao Estimada:** 3 dias
**Tasks Principais:** `client-migration.md`, `communication-templates.md`

---

### Objetivos da Fase

Migrar a base de alunos existente para a plataforma sem perder alunos e sem criar atrito. Esta e a fase mais delicada do onboarding — alunos sao criaturas de habito e qualquer mudanca pode gerar resistencia. A comunicacao cuidadosa e o suporte intensivo sao essenciais.

- Migrar 100% dos alunos ativos para a plataforma
- Preservar historico de treinos, dietas e progresso
- Comunicar a transicao de forma positiva (beneficio para o aluno, nao mudanca burocratica)
- Manter ou aumentar engajamento durante a transicao
- Identificar e tratar casos de resistencia individualmente

---

### Steps Detalhados

**Step 3.1 — Segmentacao da Base para Migracao**

Dividir os alunos em 3 grupos com estrategias diferentes:

**Grupo A — Evangelistas (TOP 20%):**
Alunos mais engajados, que ja referem outros alunos, pagam em dia, NPS altissimo.
- Estrategia: migrar PRIMEIRO, usar como beta testers, coletar feedback prioritario
- Comunicacao: convidar para "programa exclusivo de pioneiros"
- Beneficio extra: 1 mes de desconto ou upgrade temporario de plano

**Grupo B — Ativos Satisfeitos (60%):**
Alunos regulares, pagam em dia, engajamento normal.
- Estrategia: migrar na sequencia do Grupo A, comunicacao padrao
- Comunicacao: e-mail + WhatsApp com beneficios da mudanca

**Grupo C — Em Risco (20%):**
Alunos com engajamento baixo, pagamentos atrasados, ou sinais de churn.
- Estrategia: migrar por ultimo, com atencao especial
- Comunicacao: chamada 1:1 com o coach antes da migracao
- Objetivo: usar a migracao como oportunidade de reengajamento

**Step 3.2 — Criacao dos Templates de Comunicacao**

Para cada canal, criar templates personalizaveis:

Template WhatsApp — Anuncio Inicial:
```
Ola [NOME]! Tenho uma novidade incrivel pra te contar.

Depois de meses planejando, finalmente estou lancando minha plataforma exclusiva
de acompanhamento fitness.

Isso significa que voce vai ter:
- Seus treinos organizados em um app dedicado (sem planilha!)
- Dieta com substituicoes faceis
- Acompanhamento dos seus resultados em tempo real
- Contato direto comigo pela plataforma
- [BENEFICIO ESPECIFICO DO PLANO DO ALUNO]

E voce, por ser meu aluno ha [TEMPO], vai ser um dos primeiros a ter acesso!

Posso te enviar o link de cadastro?
```

Template WhatsApp — Follow-up (se nao respondeu em 24h):
```
Oi [NOME]! Seguindo up sobre a novidade que compartilhei ontem.
Vi que voce ainda nao viu — normal, a vida e corrida!
Posso te mandar um audio explicando rapidinho?
```

**Step 3.3 — Mapeamento de Dados por Aluno**

Para cada aluno, coletar e estruturar:
- Dados pessoais (nome, idade, contato, dados de saude relevantes)
- Objetivo principal e secundario
- Restricoes (lesoes, alergias alimentares, medicamentos)
- Historico de treinos (ultimas 4 semanas de treinos)
- Historico de dieta (protocolo atual)
- Historico de avaliacoes (peso, medidas, fotos — com permissao)
- Preferencias (horario de treino, dias preferidos, exercicios favoritos/odiados)

Formato de saida: um arquivo JSON por aluno para importacao em lote na plataforma.

**Step 3.4 — Configuracao de Perfis na Plataforma**

Para cada aluno, o `fitcoach-chief` configura:
- Criacao de usuario com e-mail e senha temporaria
- Associacao ao plano correto (Basico/Premium/VIP)
- Upload de foto de perfil (se disponivel)
- Preenchimento de anamnese com dados ja coletados
- Vinculacao ao treino atual
- Historico de avaliacoes (pelo menos ultima avaliacao)

Automatizar via bulk import onde possivel. Manual para casos especiais.

**Step 3.5 — Importacao de Dados Historicos**

Prioridade para importar (em ordem):
1. Avaliacao fisica mais recente (obrigatorio)
2. Treino atual (obrigatorio)
3. Dieta atual (obrigatorio)
4. Ultimas 4 avaliacoes anteriores (se disponivel)
5. Fotos de progresso (com permissao explicita do aluno)
6. Historico completo de treinos (opcional, se o coach tiver registrado)

**Step 3.6 — Envio de Mensagens de Boas-Vindas**

Para cada aluno migrado:
- Enviar link de acesso com senha temporaria via WhatsApp
- Enviar e-mail de boas-vindas com tutorial de primeiro acesso
- Verificar que o aluno conseguiu acessar em 24h
- Se nao acessou: ligar ou mandar audio no WhatsApp

**Step 3.7 — Calls de Transicao com Top 20%**

Para os alunos do Grupo A (evangelistas):
- Agendar video call de 30 minutos com o coach
- Objetivo: mostrar a plataforma ao vivo, coletar feedback, fortalecer relacionamento
- Aproveitar para pedir indicacao (referral program)

**Step 3.8 — Periodo de Suporte Intensivo (7 dias)**

Durante os 7 dias apos a migracao:
- Coach disponivel para suporte em horario estendido
- `automation-engineer` monitora erros tecnicos e responde em menos de 2h
- Checklist diario de alunos que ainda nao acessaram (follow-up ativo)
- Daily standup interno de 15 minutos para identificar problemas

---

### Inputs Requeridos

| Input | Tipo | Fonte |
|-------|------|-------|
| client-database-raw.csv | Planilha | Phase 1 |
| offer-stack.md | Documento | Phase 2 |
| Historico de treinos por aluno | Planilhas/fotos | Coach |
| Historico de avaliacoes por aluno | Planilhas/fotos | Coach |
| Fotos de progresso (com permissao) | Imagens | Coach + alunos |
| Dados de anamnese existentes | Formularios | Coach |

---

### Outputs Gerados

| Output | Arquivo | Descricao |
|--------|---------|-----------|
| Plano de migracao detalhado | `migration-plan.md` | Cronograma e responsaveis por aluno |
| Templates de comunicacao | `communication-templates/` | WhatsApp, email, scripts de ligacao |
| Base de alunos estruturada | `client-database-structured.csv` | Pronta para importacao |
| Arquivos JSON de alunos | `client-profiles/*.json` | Um por aluno, para importacao em lote |
| Relatorio de migracao | `migration-report.md` | Status por aluno, taxa de sucesso |
| Feedback coletado | `migration-feedback.md` | Respostas dos alunos Grupo A |

---

### Veto Conditions

**VETO-009 — Perda excessiva na migracao:**
Se mais de 10% dos alunos cancelarem durante a migracao, pausar a fase imediatamente, analisar causa raiz, e corrigir antes de continuar. Causas possiveis: preco novo mais alto, resistencia a tecnologia, comunicacao inadequada.

**VETO-010 — Dados historicos criticos incompletos:**
Se o coach nao tem nenhum registro de treinos anteriores dos alunos, completar a anamnese digital com cada aluno antes de migrar. Migrar sem dados e migrar um shell vazio, o que nao gera valor.

**VETO-011 — Aluno nao deu permissao explicita para dados sensíveis:**
Fotos de progresso e dados de saude sensiveis so podem ser importados com consentimento explicito do aluno. Coletar compliance LGPD antes de importar.

---

### Checkpoint FC-CP-ONBOARD-003

**Criterios de Aprovacao:**

- [ ] 100% dos alunos com perfil criado na plataforma
- [ ] Pelo menos 80% dos alunos acessaram a plataforma ao menos uma vez
- [ ] Todos os alunos tem treino atual carregado na plataforma
- [ ] Templates de comunicacao aprovados pelo coach
- [ ] Taxa de cancelamento durante migracao menor que 10%
- [ ] Calls com Top 20% realizadas
- [ ] Relatorio de migracao produzido
- [ ] Suporte intensivo de 7 dias concluido
- [ ] Compliance LGPD verificada para dados sensiveis

**Aprovadores:** `fitcoach-chief` + `automation-engineer`

---

## Phase 4: Platform Setup (Dias 7–10)

**Agent Responsavel:** `fitcoach-chief`
**Checkpoint de Saida:** `FC-CP-ONBOARD-004`
**Duracao Estimada:** 4 dias
**Tasks Principais:** `platform-config.md`, `exercise-library-setup.md`, `branding-setup.md`

---

### Objetivos da Fase

Configurar a plataforma de forma completa e personalizada para o coach. O objetivo e que a plataforma seja uma extensao digital da marca do coach — com seu visual, sua metodologia, seus videos e seus templates.

- Personalizar a plataforma com branding do coach (logo, cores, tipografia)
- Construir biblioteca de exercicios com videos proprios
- Criar templates de treino por objetivo e frequencia
- Criar templates de dieta por perfil nutricional
- Configurar formulario de anamnese completo
- Setup de dashboard de metricas e KPIs
- Testar fluxo completo como aluno-teste

---

### Steps Detalhados

**Step 4.1 — Setup de Branding**

Coletar e configurar os elementos visuais da marca do coach:
- Logo em alta resolucao (PNG transparente, SVG)
- Paleta de cores principal (primaria, secundaria, acento)
- Tipografia (fonte principal e secundaria)
- Tom de voz (formal, informal, motivacional, cientifico)
- Foto profissional do coach para o perfil

Aplicar na plataforma:
- Header com logo e cores
- Emails automaticos com branding
- Notificacoes push com identidade visual
- Pagina de onboarding do aluno com foto do coach

**Step 4.2 — Construcao da Biblioteca de Exercicios**

Para cada exercicio na biblioteca:
- Nome do exercicio
- Grupo muscular primario e secundario
- Nivel de dificuldade (iniciante/intermediario/avancado)
- Equipamento necessario
- Video de execucao (gravar com o proprio coach — autentico)
- Instrucoes de execucao em texto (3-5 pontos)
- Erros mais comuns (2-3 pontos)
- Variacoes e progressoes

Protocolo de gravacao de videos:
- Ambiente limpo e bem iluminado
- Camera na altura do peito
- Demonstracao clara do inicio, meio e fim do movimento
- Duracao ideal: 30-90 segundos por exercicio
- Formato: MP4 horizontal (16:9) ou vertical (9:16) para mobile
- Qualidade minima: 1080p

Prioridade para gravar:
1. Exercicios mais prescriados pelo coach (Top 20 = 80% dos treinos)
2. Exercicios com maior risco de execucao incorreta
3. Exercicios com variacoes especificas da metodologia do coach

**Step 4.3 — Criacao de Templates de Treino**

Criar templates base para cada objetivo, que o coach depois personaliza por aluno:

Por Objetivo:
- Emagrecimento (aerobico + forcado metabolico)
- Hipertrofia (forca, volume, frequencia)
- Condicionamento fisico geral
- Manutencao (pos-resultado)
- Reabilitacao (baixa intensidade, foco em mobilidade)
- Competicao (periodizacao especifica)

Por Frequencia Semanal:
- 2x por semana (minimo para sedentarios)
- 3x por semana (body split A/B/C)
- 4x por semana (Upper/Lower ou Push/Pull)
- 5-6x por semana (atletas e dedicados)

Por Equipamento Disponivel:
- Academia completa
- Academia basica (pesos livres e maquinas principais)
- Em casa sem equipamento
- Em casa com equipamento basico (halteres, elastico, barra)

Cada template deve ter: lista de exercicios, series, repeticoes, tempo de descanso, ordem de execucao, e notas de progressao.

**Step 4.4 — Criacao de Templates de Dieta/Nutricao**

(Apenas se o coach tambem oferece orientacao nutricional)

Templates base por perfil:
- Deficit calorico para emagrecimento (protocolo classico)
- Superavit para hipertrofia
- Manutencao (calculada por TDEE)
- Low-carb/Keto (se o coach usa)
- Vegetariano/Vegano
- Intolerante a lactose/gluten

Cada template com: macros target, lista de alimentos permitidos, sugestoes de refeicoes, e opcoes de substituicao.

**Step 4.5 — Configuracao da Anamnese Digital**

Formulario completo de anamnese cobrindo 5 blocos:

Bloco 1 — Dados Pessoais:
- Nome completo, data de nascimento, genero
- Peso atual, altura, objetivo de peso
- Ocupacao e disponibilidade de horarios

Bloco 2 — Historico de Saude:
- Doencas pre-existentes (diabetes, hipertensao, etc.)
- Medicamentos em uso
- Lesoes atuais ou recentes
- Cirurgias relevantes
- Restricoes alimentares e alergias

Bloco 3 — Experiencia Fitness:
- Nivel de atividade fisica atual
- Historico de academia (nunca, parou, ativo)
- Esportes praticados
- Frequencia de treino atual (se existir)
- Exercicios preferidos e evitados

Bloco 4 — Objetivos:
- Objetivo principal (unico, especifico)
- Prazo desejado
- Motivacao principal
- O que ja tentou e nao funcionou

Bloco 5 — Logistica:
- Onde vai treinar (academia especifica, em casa, ao ar livre)
- Equipamentos disponiveis
- Horarios preferiveis de treino
- Acesso a alimentacao saudavel (trabalha fora? tem cozinha?)

**Step 4.6 — Setup do Dashboard de Metricas**

Configurar visualizacoes para o coach monitorar:
- Alunos ativos vs total cadastrado
- Taxa de engajamento (percentual que acessou nos ultimos 7 dias)
- Check-ins completados na semana
- Alunos em risco de churn (nao acessa ha X dias)
- MRR atual vs meta
- Alunos por tier
- Aniversarios da semana (para mensagem personalizada)
- Renovacoes vencendo nos proximos 30 dias

**Step 4.7 — Teste de Fluxo Completo**

Criar um aluno-teste ficticio e simular toda a jornada:
1. Cadastro e acesso inicial
2. Preenchimento da anamnese
3. Recebimento do primeiro treino
4. Check-in de treino
5. Envio de foto de progresso
6. Comunicacao via plataforma com o coach
7. Visualizacao de metricas pessoais
8. Acesso a biblioteca de exercicios
9. Notificacao de lembrete de treino
10. Renovacao simulada de plano

Documentar: qualquer bug encontrado, fluxo confuso ou etapa que gerou duvida.

---

### Inputs Requeridos

| Input | Tipo | Fonte |
|-------|------|-------|
| Logo e materiais de branding | Arquivos | Coach |
| Videos de exercicios gravados | MP4 | Coach |
| Lista de exercicios mais usados | Documento | Fase 1 + Coach |
| Modelos de treino existentes | Planilhas | Coach |
| Modelos de dieta existentes | Planilhas | Coach |
| business-diagnostic-report.md | Documento | Phase 1 |

---

### Outputs Gerados

| Output | Arquivo | Descricao |
|--------|---------|-----------|
| Relatorio de configuracao | `platform-setup-report.md` | Status de todos os itens configurados |
| Biblioteca de exercicios | (plataforma) | Todos os exercicios com videos e instrucoes |
| Templates de treino | (plataforma) | Por objetivo e frequencia |
| Templates de dieta | (plataforma) | Por perfil nutricional |
| Anamnese digital | (plataforma) | Formulario configurado e testado |
| Relatorio de testes | `qa-test-report.md` | Bugs e melhorias identificadas |

---

### Veto Conditions

**VETO-012 — Biblioteca de exercicios vazia:**
Se o coach nao gravou nenhum video proprio, configurar com videos de placeholder (biblioteca generica) temporariamente, mas agendar sessao de gravacao na semana seguinte. Plataforma sem videos do proprio coach e generica e nao diferencia a marca.

**VETO-013 — Branding incompleto:**
Se o coach nao tem logo definida, utilizar foto profissional mais nome como identidade temporaria. Recomendar criacao de identidade visual como acao paralela.

**VETO-014 — Bugs criticos no teste de fluxo:**
Se o teste de fluxo completo identificar erros que impedem acao critica do aluno (cadastro, acesso a treino, check-in), corrigir antes de avancar para Fase 5.

---

### Checkpoint FC-CP-ONBOARD-004

**Criterios de Aprovacao:**

- [ ] Branding configurado na plataforma (logo, cores, foto)
- [ ] Pelo menos 20 exercicios com video na biblioteca
- [ ] Pelo menos 6 templates de treino criados (2 por objetivo principal)
- [ ] Anamnese configurada com todos os 5 blocos
- [ ] Dashboard de metricas configurado e funcionando
- [ ] Teste de fluxo completo executado sem bugs criticos
- [ ] Coach aprovou a aparencia e navegacao da plataforma
- [ ] Alunos existentes tem treinos e dietas ativos na plataforma

**Aprovadores:** `fitcoach-chief`

---

## Phase 5: Automation Config (Dias 10–12)

**Agent Responsavel:** `automation-engineer`
**Checkpoint de Saida:** `FC-CP-ONBOARD-005`
**Duracao Estimada:** 3 dias
**Tasks Principais:** `setup-whatsapp-automation.md`, `setup-email-marketing.md`

---

### Objetivos da Fase

Automatizar as comunicacoes repetitivas para liberar o tempo do coach. O objetivo e que o coach nunca mais precise responder manualmente as mesmas perguntas ou enviar os mesmos lembretes — a plataforma faz isso automaticamente, mantendo o toque pessoal.

- Integrar API do WhatsApp Business com a plataforma
- Criar fluxos de mensagens automaticas para todos os eventos relevantes
- Configurar triggers de check-in semanal
- Setup de email marketing segmentado
- Automacao de lembretes de treino e dieta
- Configurar alertas proativos para o coach

---

### Steps Detalhados

**Step 5.1 — Integracao WhatsApp Business API**

Pre-requisitos:
- Coach com numero dedicado para o negocio (nao pessoal)
- Meta Business Manager configurado
- Numero verificado no WhatsApp Business API

Configurar:
- Webhook de recebimento de mensagens
- Templates de mensagem aprovados pela Meta (prazo: 24-48h)
- Fluxos de resposta automatica
- Horario de atendimento automatico (dentro/fora do horario comercial)

**Step 5.2 — Criacao dos 10 Fluxos de Automacao Principais**

**Fluxo 1 — Boas-Vindas ao Novo Aluno:**
Trigger: Aluno completa cadastro e anamnese
Delay: imediato
Mensagem: boas-vindas personalizada com nome e acesso inicial
Action: Agendar call de orientacao (se plano Premium ou VIP)

**Fluxo 2 — Lembrete de Treino:**
Trigger: Dia de treino do aluno (baseado na frequencia configurada)
Horario: 2h antes do horario preferido de treino
Mensagem: "Oi [NOME]! Hoje e dia de [GRUPO MUSCULAR]! Seu treino esta pronto na plataforma. Vamos nessa?"

**Fluxo 3 — Confirmacao de Treino Realizado:**
Trigger: Aluno marca check-in na plataforma
Mensagem: "Show [NOME]! Mais um treino no bolso! Voce esta na [X] semana consecutiva. Continua assim!"
Action: Atribuir pontos de gamificacao

**Fluxo 4 — Alerta de Treino Perdido:**
Trigger: Dia de treino passou e aluno nao fez check-in
Delay: 2h apos horario usual de treino
Mensagem: "Oi [NOME], tudo bem? Notei que nao treinou hoje. Aconteceu algo? Me avisa para reagendarmos!"

**Fluxo 5 — Inatividade (2 dias sem acesso):**
Trigger: Aluno nao acessa a plataforma por 2 dias consecutivos
Mensagem: "Oi [NOME]! Estou passando para saber como voce esta. Me conta como foi a semana?"
Action: Marcar aluno como "atencao" no dashboard do coach

**Fluxo 6 — Inatividade Critica (5 dias sem acesso):**
Trigger: Aluno nao acessa a plataforma por 5 dias
Action: ALERTA para o coach no dashboard e WhatsApp pessoal
Mensagem para coach: "ATENCAO: [NOME ALUNO] esta inativo ha 5 dias. Recomendo contato pessoal urgente."

**Fluxo 7 — Check-in Semanal:**
Trigger: Domingo, 18h (configuravel por coach)
Mensagem: "Oi [NOME]! Hora do check-in semanal! Como foi a semana? Preenche o formulario rapido aqui: [LINK]"

**Fluxo 8 — Renovacao Proxima (15 dias antes):**
Trigger: 15 dias antes do vencimento do plano
Mensagem: "Oi [NOME]! Seu plano vence em 15 dias. Ja renovei com as mesmas condicoes — e so confirmar aqui: [LINK]"

**Fluxo 9 — Aniversario do Aluno:**
Trigger: Data de aniversario do aluno (coletada na anamnese)
Mensagem: "FELIZ ANIVERSARIO [NOME]! Para comemorar, preparei um presente especial para voce. Acessa a plataforma para ver a surpresa!"
Action: Liberar bonus de pontos ou desconto especial no dia

**Fluxo 10 — Conquista Desbloqueada:**
Trigger: Aluno alcanca milestone (1 mes, 3 meses, primeiro desafio concluido, etc.)
Mensagem: "PARABENS [NOME]! Voce acabou de desbloquear [CONQUISTA]! Isso e resultado do seu esforco. Voce e incrivel!"

**Step 5.3 — Configuracao de Email Marketing**

Sequencia de boas-vindas (Drip Campaign):

| Email | Quando | Assunto | Objetivo |
|-------|--------|---------|----------|
| Email 1 | Imediato | Bem-vindo ao [NOME DA MARCA]! | Confirmacao e acesso |
| Email 2 | Dia 2 | Seu plano de 30 dias comeca aqui | Orientacao inicial |
| Email 3 | Dia 5 | Como usar a plataforma (tutorial) | Educacao do usuario |
| Email 4 | Dia 10 | Seus primeiros 10 dias de resultado | Engajamento |
| Email 5 | Dia 21 | Ja imaginou onde voce estara em 90 dias? | Retencao |
| Email 6 | Dia 30 | 1 mes de jornada — hora de avaliar! | Feedback + renovacao |

Newsletter mensal para todos os alunos ativos:
- Dica de treino do mes
- Receita saudavel da semana
- Destaque de aluno (com permissao)
- Preview de novidades da plataforma
- Desafio do mes

**Step 5.4 — Automacao de Envio de Treinos e Dietas**

Configurar envio automatico:
- Novo treino disponivel: notificacao push + WhatsApp + email
- Dieta da semana: domingo a noite, para planejamento da semana seguinte
- Revisao de treino (apos X semanas): notificacao ao coach e ao aluno

**Step 5.5 — Configuracao de Alertas para o Coach**

Alertas automaticos que o coach recebe:
- Aluno inativo ha 2 dias (WhatsApp)
- Aluno inativo ha 5 dias (WhatsApp + email — URGENTE)
- Aluno solicitou suporte (ticket aberto)
- Plano vencendo em 3 dias sem renovacao
- Novo aluno cadastrado
- Pagamento nao processado
- Aluno completou 10 treinos consecutivos (oportunidade de upgrade)
- Aluno atingiu meta de peso (oportunidade de upsell para nova meta)

**Step 5.6 — Configuracao de Respostas Automaticas para FAQs**

As 10 perguntas mais frequentes de alunos (coletar com o coach na Fase 1):
1. "Posso substituir [exercicio] por [outro]?"
2. "Quantas calorias devo consumir?"
3. "Posso treinar com dor muscular?"
4. "Como acesso meu treino?"
5. "Como marco o check-in?"
6. "Posso pular um dia de treino?"
7. "Quais suplementos voce recomenda?"
8. "Como mudar o horario de lembrete?"
9. "Como entro em contato com [NOME COACH]?"
10. "Como cancelo meu plano?"

Para cada pergunta: resposta automatica completa com link para conteudo relevante, e escalada para o coach se necessario.

---

### Inputs Requeridos

| Input | Tipo | Fonte |
|-------|------|-------|
| Numero WhatsApp Business do coach | Contato | Coach |
| Acesso ao Meta Business Manager | Credenciais | Coach |
| Top 10 FAQs dos alunos | Lista | Coach + diagnostico Fase 1 |
| Horarios de treino por aluno | Dados | Plataforma (Fase 4) |
| Datas de aniversario dos alunos | Dados | Anamnese (Fase 4) |

---

### Outputs Gerados

| Output | Arquivo | Descricao |
|--------|---------|-----------|
| Mapa de automacoes | `automation-map.md` | Todos os fluxos e triggers documentados |
| Templates de WhatsApp aprovados | `whatsapp-templates/` | Templates submetidos e aprovados pela Meta |
| Sequencia de email | (plataforma de email) | Drip campaign configurada |
| Documentacao de FAQ | `faq-responses.md` | Respostas automaticas documentadas |
| Relatorio de testes de automacao | `automation-test-report.md` | Cada fluxo testado e validado |

---

### Veto Conditions

**VETO-015 — API WhatsApp nao aprovada:**
Se a Meta nao aprovar os templates de mensagem em 5 dias uteis, usar solucao alternativa (Telegram bot ou SMS) temporariamente e escalar aprovacao com suporte Meta.

**VETO-016 — Automacoes nao testadas:**
Nenhuma automacao pode entrar em producao sem ter sido testada com conta de aluno-teste. Bloquear ativacao ate todos os fluxos principais serem validados.

---

### Checkpoint FC-CP-ONBOARD-005

**Criterios de Aprovacao:**

- [ ] WhatsApp Business API integrado e funcionando
- [ ] Pelo menos 10 fluxos de automacao configurados
- [ ] Fluxo de check-in automatico funcionando end-to-end
- [ ] Alertas de inatividade testados e funcionando
- [ ] Email marketing configurado com sequencia de boas-vindas
- [ ] Todos os fluxos testados com aluno-teste
- [ ] Coach recebeu treinamento de como monitorar as automacoes
- [ ] FAQ automatico configurado com pelo menos 5 respostas

**Aprovadores:** `automation-engineer` + `fitcoach-chief`

---

## Phase 6: Gamification Setup (Dias 12–14)

**Agents Responsaveis:** `gamification-designer` + `retention-engineer`
**Checkpoint de Saida:** `FC-CP-ONBOARD-006`
**Duracao Estimada:** 3 dias
**Tasks Principais:** `setup-gamification.md`, `hook-model-config.md`
**Frameworks Base:** Yu-kai Chou — Octalysis Framework, Nir Eyal — Hooked (Hook Model)

---

### Objetivos da Fase

Transformar o acompanhamento de treino em uma experiencia viciante (no bom sentido). A gamificacao, quando bem implementada, aumenta o engajamento em 40-60% e reduz o churn a menos da metade. Esta fase aplica os principios do Octalysis Framework (Yu-kai Chou) e do Hook Model (Nir Eyal) para criar um sistema de retencao comportamental.

- Implementar sistema de pontos com logica de progressao clara
- Criar niveis de evolucao (do iniciante ao atleta elite)
- Configurar desafios mensais motivadores
- Setup de rankings e leaderboards (com opcoes de privacidade)
- Criar sistema de badges e conquistas significativas
- Integrar com o Hook Model para criar habitos de uso

---

### Steps Detalhados

**Step 6.1 — Design do Sistema de Pontos (Core Drive: Accomplishment)**

Definir quais acoes geram pontos e quantos:

| Acao | Pontos | Frequencia Maxima | Notas |
|------|--------|-------------------|-------|
| Completar treino e fazer check-in | 100 pts | 1x/dia | Base da gamificacao |
| Completar sequencia de 7 dias | 500 pts | 1x/semana | Bonus de streak |
| Completar sequencia de 30 dias | 2.500 pts | 1x/mes | Super bonus |
| Preencher check-in semanal | 50 pts | 1x/semana | Engajamento com o coach |
| Registrar avaliacao de peso | 75 pts | 1x/semana | Rastreamento de resultado |
| Fazer upload de foto de progresso | 150 pts | 1x/semana | Prova social + motivacao |
| Completar anamnese | 200 pts | 1x | Onboarding completo |
| Responder pesquisa NPS | 100 pts | 1x/trimestre | Feedback para o coach |
| Indicar um amigo (que assina) | 1.000 pts | Ilimitado | Referral program |
| Completar desafio mensal | 1.500 pts | 1x/mes | Missao especial |
| Primeiro treino da semana | 25 pts bonus | 1x/semana | Reativar apos pausa |

**Step 6.2 — Criacao dos Niveis de Progressao**

Nomenclatura alinhada com a marca do coach — personalizar por coach:

Exemplo para coach de funcional/crossfit:
- Nivel 1: Recruta (0 - 999 pts)
- Nivel 2: Soldado (1.000 - 2.999 pts)
- Nivel 3: Cabo (3.000 - 6.999 pts)
- Nivel 4: Sargento (7.000 - 14.999 pts)
- Nivel 5: Tenente (15.000 - 29.999 pts)
- Nivel 6: Capitao (30.000 - 59.999 pts)
- Nivel 7: Coronel (60.000 - 99.999 pts)
- Nivel 8: General (100.000+ pts)

Exemplo para coach de emagrecimento/saude:
- Nivel 1: Iniciante
- Nivel 2: Consistente
- Nivel 3: Dedicado
- Nivel 4: Comprometido
- Nivel 5: Transformado
- Nivel 6: Inspiracao
- Nivel 7: Exemplo
- Nivel 8: Lenda

Para cada nivel definir:
- Nome e descricao
- Pontos necessarios
- Badge visual exclusivo
- Beneficio real (ex: Nivel 5 = 1 mes de desconto; Nivel 8 = acesso VIP por 30 dias)

**Step 6.3 — Configuracao do Sistema de Badges**

Criar badges para momentos-chave da jornada:

Badges de Frequencia:
- "Primeiro Treino" — Completou o primeiro treino na plataforma
- "7 Seguidos" — 7 treinos consecutivos
- "Maratonista" — 30 treinos em um mes
- "Iron Will" — 3 meses sem falha

Badges de Resultado:
- "Primeiros 5kg" — Perdeu 5kg desde o inicio
- "Primeiro Centimetro" — Primeira reducao de medidas registrada
- "Metamorfose" — Enviou fotos antes/depois com mais de 90 dias de diferenca

Badges de Engajamento:
- "Aluno Nota 10" — Respondeu todos os check-ins por 4 semanas
- "Deu o Feedback" — Respondeu pesquisa NPS
- "Comunidade" — Indicou 1 amigo que assinou

Badges Exclusivos do Coach (marca):
- Personalizar com a metodologia e historia do coach
- Exemplo: "Carlos Approved" — Treino avaliado e elogiado pelo Carlos pessoalmente

**Step 6.4 — Configuracao de Rankings e Leaderboards**

Tipos de ranking:
- Ranking Geral: Top 10 alunos por pontos totais (todos os tempos)
- Ranking do Mes: Top 10 por pontos acumulados no mes atual (reset mensal)
- Ranking de Consistencia: Top 10 por maior sequencia de treinos consecutivos
- Ranking do Desafio: Especifico para cada desafio mensal

Privacidade:
- Aluno pode optar por aparecer no ranking com apelido ou iniciais
- Aluno pode se retirar completamente dos rankings publicos
- Coach ve todos os dados, mas so publica o que o aluno autorizou

**Step 6.5 — Design do Primeiro Desafio Mensal**

Estrutura de um Desafio FitCoach:

```
DESAFIO: "30 Dias de Transformacao"

OBJETIVO: Completar 20 treinos em 30 dias
           + Preencher todos os check-ins semanais
           + Registrar avaliacao no inicio e no fim

RECOMPENSA:
  - Todos que completam: Badge + 1.500 pts
  - Top 3 do ranking: Premio fisico ou desconto exclusivo
  - Coach faz post dedicado no Instagram parabenizando os campeoes

REGRAS:
  - Qualquer tipo de treino conta (plataforma ou off-platform com check-in manual)
  - Nao precisa ser dias consecutivos
  - Coach valida os resultados

COMUNICACAO:
  - Lancamento no dia 1 do mes (WhatsApp broadcast)
  - Atualizacao do ranking toda segunda-feira
  - Contagem regressiva na ultima semana
  - Celebracao publica dos vencedores
```

**Step 6.6 — Implementacao do Hook Model (Nir Eyal)**

O Hook Model cria habitos de uso em 4 etapas:

1. Trigger (Gatilho):
   - Externo: Notificacao push, WhatsApp, email ("Hoje e dia de treino!")
   - Interno (construir com o tempo): O proprio aluno pensa na plataforma ao ver a academia, ao acordar, ao passar do peso alvo

2. Action (Acao):
   - Tornar as acoes o mais simples possivel
   - Check-in com 1 toque
   - Upload de foto diretamente pelo app
   - Acesso ao treino em menos de 3 taps da tela inicial

3. Variable Reward (Recompensa Variavel):
   - Pontos em quantidade variavel (100 pontos, mais bonus surpresa ocasional)
   - Badge surpresa aparecendo inesperadamente ("Voce desbloqueou uma conquista secreta!")
   - Posicao no ranking que muda a cada dia (suspense)
   - Mensagem personalizada do coach aparecendo aleatoriamente

4. Investment (Investimento):
   - Quanto mais o aluno usa, mais valor tem (historico, pontos, nivel)
   - Fotos de progresso acumulando — nao quer perder o historico
   - Nivel e pontos — custo de saida aumenta com o tempo
   - Streak de treinos — aluno reluta em quebrar a sequencia

**Step 6.7 — Calibracao de Dificuldade (Flow State)**

O sistema nao pode ser facil demais (tedio) nem dificil demais (frustracao). Calibrar para manter o aluno no estado de flow (Csikszentmihalyi):

- Nivel 1 para Nivel 2: 1-2 semanas de uso regular (rapido, para enganchar)
- Nivel 2 para Nivel 3: 3-4 semanas (consolidando o habito)
- Nivel 3 em diante: progressivamente mais lento (mantendo o desafio)
- Primeiro badge: dentro da primeira semana (quick win)
- Primeiro desafio completado: dentro do primeiro mes

---

### Inputs Requeridos

| Input | Tipo | Fonte |
|-------|------|-------|
| Identidade visual do coach | Assets | Fase 4 |
| Nome e tom de voz da marca | Documento | Fase 4 |
| Lista de comportamentos desejados dos alunos | Lista | Coach + business-diagnostician |
| Orcamento para premios do desafio mensal | Valor | Coach |

---

### Outputs Gerados

| Output | Arquivo | Descricao |
|--------|---------|-----------|
| Especificacao do sistema de pontos | `gamification-spec.md` | Logica completa de pontos e niveis |
| Lista de badges | `badges-catalog.md` | Todos os badges com criterios de desbloqueio |
| Design do primeiro desafio | `first-challenge.md` | Desafio mensal pronto para lancar |
| Configuracao do Hook Model | `hook-model-config.md` | Triggers, actions e rewards configurados |
| Relatorio de testes | `gamification-test-report.md` | Validacao de funcionamento |

---

### Veto Conditions

**VETO-017 — Sistema de pontos sem recompensas reais:**
Pontos sem nenhuma recompensa tangivel (desconto, brinde, acesso exclusivo) perdem valor rapidamente. Pelo menos 3 recompensas concretas devem estar configuradas antes de ativar a gamificacao.

**VETO-018 — Ranking sem opcao de privacidade:**
Expor nome completo de alunos em rankings publicos sem consentimento e violacao de privacidade. Implementar opcao de apelido ou opt-out antes de ativar rankings.

---

### Checkpoint FC-CP-ONBOARD-006

**Criterios de Aprovacao:**

- [ ] Sistema de pontos configurado com pelo menos 8 tipos de acoes
- [ ] Pelo menos 6 niveis de progressao criados com nomes personalizados
- [ ] Pelo menos 10 badges criados com criterios claros
- [ ] Primeiro desafio mensal configurado e pronto para lancar
- [ ] Rankings configurados com opcao de privacidade
- [ ] Hook Model implementado (triggers externos funcionando)
- [ ] Sistema testado com aluno-teste — pontos e badges funcionando
- [ ] Coach foi treinado em como usar gamificacao no discurso com alunos

**Aprovadores:** `gamification-designer` + `retention-engineer`

---

## Phase 7: E-commerce Setup (Dias 14–17)

**Agent Responsavel:** `ecommerce-manager`
**Checkpoint de Saida:** `FC-CP-ONBOARD-007`
**Duracao Estimada:** 4 dias
**Tasks Principais:** `ecommerce-setup.md`, `product-catalog.md`, `payment-config.md`

---

### Objetivos da Fase

Criar um canal de receita adicional para o coach atraves de e-commerce integrado a plataforma. Alunos que ja confiam no coach sao os melhores clientes para comprar suplementos, produtos da marca, programas digitais e outros itens complementares.

- Configurar loja integrada na plataforma
- Catalogar e listar os primeiros produtos (fisicos e digitais)
- Integrar gateways de pagamento
- Configurar logistica para produtos fisicos
- Configurar sistema de comissionamento (se aplicavel)
- Criar primeira campanha de lancamento da loja

---

### Steps Detalhados

**Step 7.1 — Definicao do Mix de Produtos**

Levantar com o coach quais categorias de produto fazem sentido para sua marca:

Categoria A — Produtos Digitais (margem alta, sem logistica):
- Programas de treino em PDF/video (ex: "Programa Verao 12 semanas")
- E-books de nutricao
- Planilhas de dieta personalizadas (modelos)
- Workshops gravados
- Mentorias em grupo (assinatura mensal)
- Consultorias avulsas (por hora)

Categoria B — Suplementos Revenda (margem media, logistica):
- Proteinas (whey, caseina, vegano)
- Creatina, glutamina, BCAAs
- Pre-treinos
- Vitaminas e minerais
- Barras de proteina
- (Verificar: coach tem revenda autorizada? CNPJ necessario?)

Categoria C — Produtos da Marca do Coach (identidade de marca):
- Camisetas e vestuario esportivo
- Garrafinhas e coqueteleiras personalizadas
- Acessorios de treino (luvas, elasticos)
- Bones, moletons
- (Verificar: producao por demanda ou estoque proprio?)

Categoria D — Servicos Avulsos (sem estoque):
- Avaliacao fisica presencial avulsa
- Revisao de treino e dieta para aluno externo
- Plano de treino para viagem
- Treino especial para evento (casamento, formatura)

**Step 7.2 — Cadastro dos Primeiros Produtos**

Para cada produto, preencher:
- Nome comercial (persuasivo, nao tecnico)
- Descricao focada em beneficios, nao em caracteristicas
- Preco e preco "de" para ancoragem
- Fotos ou mockups (minimo 3 imagens por produto)
- Estoque (para fisicos) ou acesso imediato (para digitais)
- Categoria e tags
- Produtos relacionados (cross-sell)
- Testemunhos (se disponivel)

Regra de lancamento: comecar com 5-10 produtos de alta demanda. Nao listar tudo de uma vez — melhor curar o catalogo.

**Step 7.3 — Configuracao de Gateways de Pagamento**

Integrar os principais meios de pagamento:
- Cartao de credito (ate 12x sem juros para planos anuais)
- Cartao de debito
- PIX (processamento imediato)
- Boleto bancario (para quem nao tem cartao)

Gateway recomendado: Mercado Pago, PagSeguro, ou Stripe (dependendo da necessidade).

Configurar:
- Taxa de antecipacao aceitavel pelo coach
- Prazo de recebimento preferido (D+2 para PIX, D+14 para cartao)
- Politica de reembolso (prazo e processo)
- Nota fiscal automatica (se CNPJ ativo)

**Step 7.4 — Configuracao de Logistica (Produtos Fisicos)**

Para coaches com produtos fisicos:
- Definir local de armazenagem (casa, deposito, parceiro)
- Configurar tabela de fretes (Correios, transportadoras)
- Calcular limite para frete gratis (incentiva ticket maior)
- Definir prazo de envio e comunicacao ao cliente
- Configurar rastreamento automatico por e-mail/WhatsApp

**Step 7.5 — Sistema de Comissionamento (Affiliates)**

Se o coach quiser ter afiliados ou embaixadores:
- Configurar links de indicacao personalizados por afiliado
- Definir comissao (5-15% e comum para este segmento)
- Configurar painel de afiliados com metricas
- Criar materiais de divulgacao prontos para uso pelos afiliados

**Step 7.6 — Configuracao de Upsell e Cross-sell**

Na plataforma, configurar:
- Sugestao de produto apos check-in de treino ("Que tal repor com whey de qualidade?")
- Produto relacionado na pagina de cada item
- Bundle com desconto (ex: "Programa de Treino + E-book de Dieta = 20% de desconto")
- Email automatico apos 2 semanas sem compra ("Novidade na loja!")

**Step 7.7 — Primeira Campanha de Lancamento**

Planejar o lancamento da loja com o coach:
- Data de lancamento (idealmente coincide com o Full Launch da Fase 8)
- Oferta especial de inauguracao (ex: frete gratis por 7 dias, 10% de desconto)
- Comunicacao via WhatsApp broadcast + email + Instagram Stories
- Meta de vendas para a primeira semana

---

### Inputs Requeridos

| Input | Tipo | Fonte |
|-------|------|-------|
| Lista de produtos que o coach quer vender | Lista | Coach |
| Fotos dos produtos | Imagens | Coach |
| Precificacao desejada | Valores | Coach |
| CNPJ e dados bancarios PJ | Documentos | Coach |
| Politica de reembolso | Texto | Coach + ecommerce-manager |

---

### Outputs Gerados

| Output | Arquivo | Descricao |
|--------|---------|-----------|
| Catalogo de produtos | `product-catalog.md` | Todos os produtos com descricao e preco |
| Configuracao de pagamentos | `payment-config.md` | Gateways, taxas e prazos |
| Plano de logistica | `logistics-plan.md` | Processo de envio de produtos fisicos |
| Plano de lancamento da loja | `store-launch-plan.md` | Campanha de inauguracao |
| Relatorio de setup | `ecommerce-setup-report.md` | Status de todos os itens configurados |

---

### Veto Conditions

**VETO-019 — Gateway de pagamento sem teste:**
Nenhum produto pode ser listado publicamente antes de pelo menos 1 transacao de teste completa (checkout, pagamento, confirmacao). Executar teste com valor minimo (R$ 1,00) antes de avancar.

**VETO-020 — Produto fisico sem logistica definida:**
Produto fisico listado sem processo de envio definido vai gerar reclamacao de alunos. Definir logistica antes de listar qualquer produto fisico.

---

### Checkpoint FC-CP-ONBOARD-007

**Criterios de Aprovacao:**

- [ ] Loja configurada e acessivel na plataforma
- [ ] Pelo menos 5 produtos listados e com fotos
- [ ] Gateway de pagamento configurado e testado
- [ ] PIX e cartao de credito funcionando
- [ ] Politica de reembolso publicada
- [ ] Upsell de pelo menos 1 produto configurado
- [ ] Plano de lancamento da loja criado
- [ ] Coach treinado em como gerenciar pedidos

**Aprovadores:** `ecommerce-manager` + `fitcoach-chief`

---

## Phase 8: Launch & Monitoring (Dias 17–21)

**Agents Responsaveis:** `fitcoach-chief` + `gym-operator`
**Checkpoint de Saida:** `FC-CP-ONBOARD-008`
**Duracao Estimada:** 5 dias + monitoramento continuo por 30 dias
**Tasks Principais:** `soft-launch.md`, `full-launch.md`, `monitoring-setup.md`

---

### Objetivos da Fase

Lancar a plataforma para todos os alunos de forma estruturada — primeiro com beta testers para ajustar qualquer problema, depois com o lancamento completo. Monitorar as metricas por 30 dias e entregar o relatorio final de resultados vs baseline.

- Executar soft launch com 5-10 alunos beta
- Coletar feedback estruturado e ajustar
- Planejar e executar full launch com comunicacao impactante
- Monitorar metricas por 30 dias
- Entregar relatorio de resultados vs baseline da Fase 1

---

### Steps Detalhados

**Step 8.1 — Selecao dos Beta Testers**

Criterios de selecao dos 5-10 alunos para o beta:
- Representatividade: incluir pelo menos 1 de cada tier (Basico, Premium, VIP)
- Diversidade: tecnologicos e menos tecnologicos, jovens e mais velhos
- Confianca: alunos que dao feedback honesto (nao apenas elogios)
- Comprometimento: confirmaram disponibilidade de 48h para testar

**Step 8.2 — Briefing com Beta Testers**

Reuniao de 30 minutos (video call ou presencial) com os betas:
- Explicar o que e esperado deles (usar a plataforma por 5 dias, reportar problemas)
- Dar acesso antecipado exclusivo (cria senso de privilegio)
- Fornecer checklist de atividades a testar
- Abrir canal direto com o `fitcoach-chief` para feedback (WhatsApp grupo especifico)

Checklist de atividades para o beta tester:
- [ ] Fazer login e completar perfil
- [ ] Acessar e executar o primeiro treino
- [ ] Fazer check-in na plataforma
- [ ] Verificar se o treino esta correto e atualizado
- [ ] Responder o check-in semanal
- [ ] Acessar a loja e navegar pelos produtos
- [ ] Testar notificacoes de lembrete de treino
- [ ] Testar chat com o coach pela plataforma
- [ ] Avaliar a experiencia geral (NPS de 0 a 10)

**Step 8.3 — Monitoramento do Soft Launch (5 dias)**

Durante os 5 dias de beta:
- Daily standup interno de 15 minutos para revisar feedback
- `fitcoach-chief` monitora dashboard em tempo real
- Qualquer bug critico: corrigido em menos de 4 horas
- Qualquer UX confuso: documentado e priorizado para ajuste
- Feedback quantitativo: NPS coletado no dia 5

**Step 8.4 — Ajustes Pos-Beta**

Com base no feedback dos betas:
- Listar todos os ajustes necessarios
- Priorizar por impacto vs esforco (matriz 2x2)
- Executar ajustes criticos antes do full launch
- Documentar ajustes futuros no backlog

**Step 8.5 — Preparacao do Full Launch**

Semana antes do Launch:
- Criar teaser nas redes sociais do coach ("Novidade vem ai!")
- Preparar email de lancamento para todos os alunos
- Preparar WhatsApp broadcast
- Preparar Instagram Stories e Feed post
- Definir oferta especial de lancamento

Materiais necessarios:
- Video do coach apresentando a plataforma (1-2 minutos, gravado no celular, autentico)
- Screenshots de depoimentos dos beta testers
- Tutorial em video de como se cadastrar (2-3 minutos)
- FAQ de lancamento (resposta para as 5 duvidas mais comuns)

**Step 8.6 — Execucao do Full Launch (Dia D)**

Horario recomendado: terca ou quarta-feira, entre 10h e 12h (maior abertura de mensagens).

- 09:00 — `fitcoach-chief` confere que plataforma esta 100% funcional
- 10:00 — WhatsApp broadcast enviado para todos os alunos existentes
- 10:05 — E-mail de lancamento disparado
- 10:30 — Coach posta no Instagram Stories e Feed
- 11:00 — Coach faz Instagram Live de 20 minutos apresentando a plataforma ao vivo
- 14:00 — WhatsApp follow-up para alunos que nao acessaram ainda

**Step 8.7 — Monitoramento de KPIs (7 dias)**

Monitorar diariamente por 7 dias apos o launch:

| KPI | Target Dia 1 | Target Dia 3 | Target Dia 7 |
|-----|-------------|-------------|-------------|
| Alunos que acessaram a plataforma | 30% | 60% | 80% |
| Check-ins completados | 20% | 40% | 60% |
| Mensagens via plataforma | 10+ | 30+ | 50+ |
| Vendas na loja | 1+ | 3+ | 5+ |
| Cancelamentos/reclamacoes | 0 | menos de 2 | menos de 3 |
| NPS (alunos que avaliaram) | N/A | N/A | mais de 30 |

**Step 8.8 — Monitoramento Continuo (30 dias)**

Relatorio semanal gerado automaticamente pelo `gym-operator`:

- Semana 1: Foco em adocao (quantos acessaram, bugs, UX)
- Semana 2: Foco em engajamento (check-ins, streaks, pontos)
- Semana 3: Foco em retencao (quem esta em risco de churn)
- Semana 4: Foco em resultados (NPS, renovacoes, upsell)

**Step 8.9 — Relatorio Final de Onboarding**

Ao final de 30 dias, produzir o relatorio final `onboarding-results-report.md`:

Secao 1 — Resultados vs Baseline:
Comparar cada metrica do estado atual (Fase 1) com o estado apos 30 dias.

Secao 2 — O que funcionou:
Top 3 decisoes que mais impactaram positivamente.

Secao 3 — O que ajustar:
Top 3 melhorias identificadas para o proximo trimestre.

Secao 4 — Proximos passos:
Roadmap de evolucao da plataforma para os proximos 3 meses.

---

### Metricas de Sucesso

| Metrica | Baseline (Dia 0) | Meta Dia 7 | Meta Dia 30 | Meta Dia 90 |
|---------|-----------------|------------|------------|------------|
| Alunos na plataforma | 0% | 80% | 95% | 100% |
| Engagement rate semanal | 0% | 55% | 70% | 75% |
| Check-in completion rate | 0% | 40% | 60% | 70% |
| Churn rate mensal | baseline | menos de 8% | menos de 5% | menos de 3% |
| NPS da base | baseline | mais de 30 | mais de 45 | mais de 60 |
| Ticket medio | R$ X | +5% | +15% | +25% |
| MRR | R$ X | +5% | +20% | +50% |
| Horas/semana do coach | X horas | -10% | -25% | -40% |
| Vendas no e-commerce | R$ 0 | R$ 500+ | R$ 2.000+ | R$ 5.000+ |
| Pontuacao media de gamificacao | 0 | 300+ | 800+ | 2.000+ |

---

### Inputs Requeridos

| Input | Tipo | Fonte |
|-------|------|-------|
| Todos os outputs das fases 1-7 | Documentos | Fases anteriores |
| Lista de alunos beta | Nomes e contatos | Coach |
| Video de apresentacao da plataforma | MP4 | Coach |
| Ofertas de lancamento definidas | Documento | gym-scaler |

---

### Outputs Gerados

| Output | Arquivo | Descricao |
|--------|---------|-----------|
| Relatorio de beta testing | `beta-test-report.md` | Feedback dos betas e ajustes feitos |
| Plano de full launch | `full-launch-plan.md` | Cronograma detalhado do dia D |
| Relatorio de metricas dia 7 | `metrics-report-d7.md` | KPIs da primeira semana |
| Relatorio de metricas dia 30 | `metrics-report-d30.md` | KPIs do primeiro mes |
| Relatorio final de onboarding | `onboarding-results-report.md` | Resultados vs baseline + proximos passos |

---

### Veto Conditions

**VETO-021 — Beta NPS abaixo de 20:**
Se o NPS dos beta testers e inferior a 20, nao avancar para o full launch. Investigar o que esta errado, corrigir e executar um segundo ciclo de beta antes de lancar para todos os alunos.

**VETO-022 — Taxa de acesso no dia 3 abaixo de 30%:**
Se menos de 30% dos alunos acessaram a plataforma ate o terceiro dia apos o launch, ativar protocolo de suporte intensivo: coach liga pessoalmente para cada aluno que nao acessou.

---

### Checkpoint FC-CP-ONBOARD-008

**Criterios de Aprovacao:**

- [ ] Soft launch executado com pelo menos 5 beta testers
- [ ] NPS do beta maior ou igual a 20
- [ ] Ajustes criticos implementados apos o beta
- [ ] Full launch executado conforme plano
- [ ] Pelo menos 80% dos alunos acessaram a plataforma em 7 dias
- [ ] Relatorio de metricas dia 7 produzido
- [ ] Relatorio de metricas dia 30 produzido
- [ ] Relatorio final de onboarding entregue ao coach
- [ ] Coach apto a operar a plataforma de forma independente
- [ ] Proximo trimestre planejado (roadmap)

**Aprovadores:** `fitcoach-chief` + `gym-operator`

---

## Visao Geral dos Checkpoints

| Checkpoint | Fase | Agent Aprovador | Criterios Minimos |
|-----------|------|----------------|-------------------|
| FC-CP-ONBOARD-001 | Assessment | business-diagnostician + fitcoach-chief | Diagnostico + metas aprovados |
| FC-CP-ONBOARD-002 | Offer Design | gym-scaler + fitcoach-chief | 3 tiers + garantia definidos |
| FC-CP-ONBOARD-003 | Migration | fitcoach-chief + automation-engineer | 80% alunos migrados |
| FC-CP-ONBOARD-004 | Platform Setup | fitcoach-chief | Plataforma configurada e testada |
| FC-CP-ONBOARD-005 | Automation | automation-engineer + fitcoach-chief | 10 fluxos ativos e testados |
| FC-CP-ONBOARD-006 | Gamification | gamification-designer + retention-engineer | Sistema de pontos + primeiro desafio |
| FC-CP-ONBOARD-007 | E-commerce | ecommerce-manager + fitcoach-chief | Loja com 5+ produtos, pagamento OK |
| FC-CP-ONBOARD-008 | Launch | fitcoach-chief + gym-operator | 80% adocao + relatorio entregue |

---

## Veto Conditions Consolidadas

| ID | Fase | Condicao | Acao |
|----|------|----------|------|
| VETO-001 | 1 | Menos de 5 alunos ativos | Versao simplificada (Tier Starter) |
| VETO-002 | 1 | Instagram com menos de 100 seguidores | Incluir Fase 0 de Branding |
| VETO-003 | 1 | Diagnostico incompleto | Nao avancar para Fase 2 |
| VETO-004 | 1 | MRR menor que custo da plataforma | Renegociar ou aguardar crescimento |
| VETO-005 | 2 | Preco abaixo do custo operacional | Recalcular pricing |
| VETO-006 | 2 | Sem garantia definida | Obrigatorio ter risk-reversal |
| VETO-007 | 2 | Mais de 3 tiers | Simplificar para maximo 3 |
| VETO-008 | 2 | LTV/CAC menor que 3x | Revisar estrategia |
| VETO-009 | 3 | Perda maior que 10% de alunos | Pausar e investigar |
| VETO-010 | 3 | Sem historico de treinos | Completar anamnese primeiro |
| VETO-011 | 3 | Sem consentimento LGPD | Coletar permissao explicita |
| VETO-012 | 4 | Biblioteca de exercicios vazia | Usar genericos + agendar gravacao |
| VETO-013 | 4 | Sem branding | Usar foto profissional temporaria |
| VETO-014 | 4 | Bugs criticos nos testes | Corrigir antes de avancar |
| VETO-015 | 5 | API WhatsApp nao aprovada | Usar alternativa temporaria |
| VETO-016 | 5 | Automacoes nao testadas | Bloquear ativacao |
| VETO-017 | 6 | Pontos sem recompensas reais | Minimo 3 recompensas concretas |
| VETO-018 | 6 | Ranking sem privacidade | Implementar opt-out antes de ativar |
| VETO-019 | 7 | Pagamento sem teste | Executar transacao de R$ 1 |
| VETO-020 | 7 | Produto fisico sem logistica | Definir processo antes de listar |
| VETO-021 | 8 | Beta NPS menor que 20 | Segundo ciclo de beta |
| VETO-022 | 8 | Adocao D3 menor que 30% | Suporte intensivo coach para alunos |

---

## Cronograma Resumido

```
SEMANA 1 (Dias 1-7)
  Dia 1-2:   [FASE 1] Business Assessment
  Dia 3-5:   [FASE 2] Offer Design
  Dia 5-7:   [FASE 3] Client Migration (inicio)

SEMANA 2 (Dias 7-14)
  Dia 7-10:  [FASE 4] Platform Setup
  Dia 10-12: [FASE 5] Automation Config
  Dia 12-14: [FASE 6] Gamification Setup

SEMANA 3 (Dias 14-21)
  Dia 14-17: [FASE 7] E-commerce Setup
  Dia 17:    [SOFT LAUNCH] Beta Testers
  Dia 17-19: Ajustes pos-beta
  Dia 21:    [FULL LAUNCH] Todos os alunos

SEMANA 4+ (Dias 21-51)
  Dia 21-28: Monitoramento intensivo (semana 1 pos-launch)
  Dia 28-51: Monitoramento regular (semanas 2-4)
  Dia 51:    Relatorio final de onboarding
```

---

## Templates de Handoff Entre Agentes

Ao final de cada fase, o agent responsavel deve gerar um handoff para o proximo:

```yaml
handoff:
  from_agent: "{agent_atual}"
  to_agent: "{proximo_agent}"
  story_context:
    coach_name: "{nome do coach}"
    onboarding_id: "FC-WF-004-{data}"
    current_phase: "{fase atual}"
    next_phase: "{proxima fase}"
  completed_outputs:
    - "{output 1 gerado}"
    - "{output 2 gerado}"
  key_decisions:
    - "{decisao importante tomada}"
  open_items:
    - "{item pendente para o proximo agent}"
  blockers: []
  next_action: "{primeira acao do proximo agent}"
```

---

## Recursos Necessarios

**Ferramentas da Plataforma FitCoach:**
- Modulo de gestao de alunos
- Editor de treinos e dietas
- Plataforma de automacao (WhatsApp + email)
- Modulo de gamificacao
- E-commerce integrado
- Dashboard de metricas

**Ferramentas Externas:**
- Meta Business Manager (WhatsApp Business API)
- Gateway de pagamento (Mercado Pago / Stripe)
- Plataforma de email marketing (integrada ou Mailchimp/ActiveCampaign)
- Google Drive / Notion (documentacao do processo)
- Loom (gravacao de tutoriais para o coach)

**Equipe Interna:**
- `fitcoach-chief`: Presente em todas as fases (orquestrador)
- `business-diagnostician`: Fase 1 (~40h estimadas)
- `gym-scaler`: Fase 2 (~24h estimadas)
- `automation-engineer`: Fases 3 e 5 (~32h estimadas)
- `gamification-designer`: Fase 6 (~20h estimadas)
- `retention-engineer`: Fase 6 (~16h estimadas)
- `ecommerce-manager`: Fase 7 (~24h estimadas)
- `gym-operator`: Fase 8 (~20h estimadas)
- `content-repurposer`: Suporte nas Fases 2 e 8 (~12h estimadas)

Total estimado: 188h de trabalho distribuidas entre agents trabalhando em paralelo.

---

## Source References

```
[SOURCE: Alex Hormozi - $100M Offers]
Capitulos: Value Equation, Offer Stacking, Risk Reversal (Guarantees)
Aplicacao: Fase 2 — Offer Design, pricing tiers, garantias

[SOURCE: Chris Cooper - Two-Brain Business]
Capitulos: Gym Owner Onboarding, Client Avatar, Revenue per Member
Aplicacao: Fase 1 — Business Assessment, Fase 3 — Client Migration

[SOURCE: Nir Eyal - Hooked: How to Build Habit-Forming Products]
Capitulos: Hook Model (Trigger, Action, Variable Reward, Investment)
Aplicacao: Fase 6 — Gamification Setup, retencao comportamental

[SOURCE: Yu-kai Chou - Actionable Gamification: Beyond Points, Badges, and Leaderboards]
Capitulos: Octalysis Framework, 8 Core Drives, White Hat vs Black Hat
Aplicacao: Fase 6 — Design do sistema de gamificacao e niveis

[SOURCE: Mihaly Csikszentmihalyi - Flow: The Psychology of Optimal Experience]
Capitulos: Flow State, desafio vs habilidade
Aplicacao: Fase 6 — Calibracao de dificuldade do sistema de gamificacao

[SOURCE: Dan Kennedy - No B.S. Guide to Maximum Referrals and Customer Retention]
Capitulos: Client retention systems, referral programs
Aplicacao: Fase 8 — Referral program e monitoramento de retencao

[SOURCE: Lei Geral de Protecao de Dados — LGPD (Lei 13.709/2018)]
Artigos: 7 (bases legais), 11 (dados sensiveis), 18 (direitos do titular)
Aplicacao: Fase 3 — Consentimento de migracao de dados pessoais
```

---

*Workflow criado pelo Squad FitCoach — Synkra AIOX*
*Versao: 1.0.0 | Atualizado em: 2026-03-11*
*Aplicacao de referencia: Carlos Salvador Jr — Personal Trainer, Santos/SP*
