---
task: analyze-responses
responsavel: "@intake-chief (Iris)"
delegated_to: ["@erika-hall", "@alan-weiss"]
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true
Entrada:
  - client_name: string
  - briefing_responses: text - Respostas do cliente ao briefing
Saida:
  - analysis-report.md: Relatório de análise completo
Checklist:
  - Completude calculada (% respondidas)
  - Consistência verificada (cruzamento de respostas)
  - Gaps classificados (CRITICAL/IMPORTANT/NICE-TO-HAVE)
  - Insights extraídos (Fato→Implicação→Ação)
  - Vieses detectados
  - Objetivos validados como outcomes (não deliverables)
---

# Task: Analyze Responses

## Purpose

Analisar respostas do briefing usando os frameworks de Erika Hall (análise pragmática, detecção de inconsistências) e Alan Weiss (validação de objetivos e valor).

## Key Activities

### 1. Calcular Completude
- Contar perguntas respondidas vs total
- Classificar respostas vazias por importância
- Score de completude: respondidas / total × 100

### 2. Análise de Consistência (Erika Hall - EH_002)
Cruzar todas as respostas entre si:
- Problema vs Budget → compatível?
- Prazo vs Escopo → realista?
- Métricas de sucesso vs Features → alinhados?
- Stakeholders mencionados vs envolvidos → gaps?

### 3. Validar Objetivos (Alan Weiss - AW_001)
- Todo objetivo é um resultado de NEGÓCIO?
- Métricas têm baseline e target?
- Valor financeiro articulado?

### 4. Detectar Vieses (Erika Hall - EH_003)
- Viés de confirmação
- Viés de ancoragem
- Viés de recência
- Viés de sobrevivência

### 5. Classificar Gaps (Erika Hall - EH_004)
- CRITICAL: bloqueia proposta
- IMPORTANT: afeta qualidade
- NICE-TO-HAVE: enriquece

### 6. Extrair Insights Acionáveis
Para cada insight: FATO → IMPLICAÇÃO → AÇÃO

### 7. Apresentar ao Usuário (Elicit)
Mostrar relatório e perguntar se quer gerar follow-up.

## Veto Conditions
- Completude < 60% sem plano de follow-up
- Gap CRITICAL ignorado
- Objetivos são deliverables, não outcomes
