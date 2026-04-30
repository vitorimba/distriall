# FC-BL-005 — Golden Baseline: Roteamento Multi-Tier
# Agente: fitcoach-chief (Coach Prime)
# Cenário: Request complexo envolvendo múltiplos tiers simultaneamente

---

## Input do Cenário

```
Request: "Preciso escalar meu negócio. Tenho 35 alunos online, faturando
R$6.500/mês, mas trabalho 12h/dia e não consigo crescer. Além disso, tenho
uma aluna nova, Juliana, 27 anos, quer competir em bikini, mas nunca treinou
de forma séria. E o João, aluno antigo, parou de responder meus check-ins
faz 3 semanas."

Coach: Bruno Martins, 32 anos, personal trainer online, 2 anos de negócio
```

---

## Processamento do Coach Prime

### Passo 1 — Triagem e Classificação

```
REQUESTS IDENTIFICADOS (3 threads paralelas):

Thread A: "Escalar negócio" + "12h/dia" + "não consigo crescer"
  Categoria: B (DIAGNOSTICO_NEGOCIO) + E (AUTOMACAO)
  Prioridade: HIGH
  Pre-requisito: Business Health Score antes de qualquer recomendação

Thread B: "Aluna nova Juliana, 27 anos, bikini, nunca treinou sério"
  Categoria: A (ALUNO_NOVO) + C (TREINO) + D (NUTRICAO)
  Prioridade: HIGH
  Pre-requisito: Anamnese completa OBRIGATÓRIA antes de contest prep
  Gate de segurança: Classificação "competidor" exige histórico verificado

Thread C: "João parou de responder faz 3 semanas"
  Categoria: F (PROGRESSO) + E (AUTOMACAO)
  Prioridade: MEDIUM (risco de churn)
  Pre-requisito: Histórico de check-ins do João
```

---

### Passo 2 — Análise de Dependências

```
DEPENDÊNCIAS ENTRE THREADS:

Thread A → Thread B:
  NENHUMA dependência direta
  Podem ser processadas em paralelo (diferentes agentes, sem conflito)

Thread A → Thread C:
  DEPENDÊNCIA LEVE: Se automação for implementada (Thread A),
  beneficia diretamente o caso do João (Thread C)
  Sequenciamento recomendado: A antes de C

Thread B → Thread C:
  NENHUMA dependência

DECISÃO: Threads A e B em paralelo | Thread C após diagnóstico de A
```

---

### Passo 3 — Árvore de Decisão de Roteamento

```
ROTEAMENTO THREAD A (Scaling do Negócio):
  ├── Dados de negócio disponíveis? → SIM (partial)
  ├── Business Health Score calculado? → NÃO
  ├── AÇÃO: Acionar business-diagnostician PRIMEIRO
  │   → Coletar: ARM, churn, fontes de receita, horas gastas/função
  ├── Após diagnóstico:
  │   ├── Gargalo operacional → automation-engineer (Circuit)
  │   ├── ARM baixo → gym-scaler (reprecificação)
  │   └── Retenção baixa → retention-engineer (habit loops)
  └── ESTRATÉGIA: Sequential (diagnóstico → intervenção)

ROTEAMENTO THREAD B (Juliana — Nova Aluna Competidora):
  ├── Intake completo? → NÃO (aluna nova)
  ├── Classificação competidor? → NÃO VERIFICADA ainda
  ├── GATE FC-QG-001: BLOQUEADO — anamnese obrigatória
  ├── AÇÃO: Acionar intake-analyst PRIMEIRO
  │   Gate de segurança: "nunca treinou sério" + competição = avaliação rigorosa
  │   Verificar: histórico real, capacidade física, prazo de competição
  ├── Após intake:
  │   ├── SE histórico mínimo verificado → WF-004 (Contest Prep Pipeline)
  │   └── SE iniciante real → training-builder base ANTES de contest prep
  └── ESTRATÉGIA: Sequential obrigatório (intake → classificação → contest prep)

ROTEAMENTO THREAD C (João — Risco de Churn):
  ├── Histórico de check-ins disponível? → A verificar
  ├── Tipo de intervenção: Reengajamento urgente
  ├── AÇÃO: progress-tracker (verificar última atividade)
  │   + automation-engineer (trigger de reengajamento)
  ├── Protocolo Hook Model:
  │   → Identificar internal trigger do João (por que treina?)
  │   → Criar external trigger de reengajamento personalizado
  └── ESTRATÉGIA: Parallel (progress-tracker + automation-engineer)
```

---

### Passo 4 — Workflow Sequenciado Final

```
PLANO DE EXECUÇÃO MULTI-THREAD

IMEDIATO (paralelo):
  [Thread A] → business-diagnostician
    Tempo estimado: 30-45 minutos (coleta de dados + diagnóstico)
    Output: Business Health Score + mapa de gargalos

  [Thread B] → intake-analyst (Juliana)
    Tempo estimado: 20-30 minutos (anamnese completa)
    Output: student_profile + classificação + routing

  [Thread C] → progress-tracker (João)
    Tempo estimado: 5 minutos (verificar histórico)
    Output: último check-in + padrão de resposta + risco de churn

APÓS RESULTADOS PARALELOS:
  [Thread A pós-diagnóstico]:
    SE gargalo = operações → automation-engineer (prioridade 1)
    SE ARM < R$200 → gym-scaler (repricing)
    SE churn > 10% → retention-engineer

  [Thread B pós-intake]:
    SE histórico < 1 ano consistente → training-builder base (3-4 semanas) → depois prep
    SE histórico adequado → WF-004 Contest Prep (prazo a definir)

  [Thread C pós-tracker]:
    → automation-engineer: mensagem de reengajamento personalizada
    → Protocolo: não "sumiu", "notamos que você não apareceu"
    → Oferta de reconexão sem pressão
```

---

### Output do Coach Prime para o Usuário

```
Coach Prime: Bruno, identifiquei 3 situações distintas que requerem atenção
simultânea. Vou coordenar tudo, mas é importante separar para não misturar
as prioridades.

SITUACAO 1: Scaling do seu negócio
  Antes de qualquer estratégia de crescimento, preciso entender os números
  reais. Vou acionar o Pulse (business-diagnostician) agora.

  Pergunta inicial: Qual é sua taxa de churn atual (quantos alunos você
  perde por mês em média)?

SITUACAO 2: Juliana (nova aluna, bikini)
  Ótima oportunidade — mas conte prep requer avaliação cuidadosa.
  "Nunca treinou sério" + "quer competir" = precisamos de anamnese
  completa antes de qualquer coisa.

  Scout (intake-analyst) vai conduzir a avaliação. Juliana está disponível
  agora para responder as perguntas?

SITUACAO 3: João (3 semanas sem resposta)
  Risco real de churn. Compass (progress-tracker) vai verificar o histórico
  dele agora.

  Enquanto isso: você tem alguma informação de contexto? Ele mencionou
  algo nas últimas sessões?

ORDEM DE EXECUÇÃO:
  1. Inicio Pulse (diagnóstico de negócio) — você e eu agora
  2. Paralelamente: Scout aguarda Juliana
  3. Compass verifica João → Circuit prepara mensagem de reengajamento

Começando pelo seu negócio. Qual é o churn atual?
```

---

## Metadados do Output

```yaml
created_by: fitcoach-chief
coach: Bruno Martins
threads_identificadas: 3
estrategia: Parallel (A + B + C) com Sequential interno por thread
frameworks_aplicados:
  - Request Classification Matrix (Categories A, B, C, E, F)
  - Routing Decision Tree
  - Coordination Strategies (Parallel + Sequential)
  - HEU-CHIEF-001 (Pre-Requisite Resolution)
  - HEU-CHIEF-002 (Conflict Detection)
  - HEU-CHIEF-003 (Escalation Intelligence)
quality_gates_verificados:
  - FC-QG-001: Bloqueado para Juliana — intake obrigatório antes de qualquer prescrição
  - FC_CH_V001: Contexto suficiente para classificação — APROVADO
  - FC_CH_V002: Pre-requisitos verificados antes de rotear — APROVADO
agentes_acionados:
  - business-diagnostician (Thread A)
  - intake-analyst (Thread B)
  - progress-tracker (Thread C)
  - automation-engineer (Thread C pós-tracker)
```
