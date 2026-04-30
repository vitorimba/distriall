---
task: classify-project
responsavel: "@intake-chief (Iris)"
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Hybrid
optimization_note: "Scoring 5 dimensões é Worker. Classificação de risco e recomendação é Agent."
elicit: true
Entrada:
  - all_intake_data: object - Todos os dados coletados no intake
Saida:
  - project-classification.md: Classificação do projeto
Checklist:
  - Tipo de projeto definido
  - Complexidade classificada (simple/standard/enterprise)
  - Riscos identificados
  - Recomendação de abordagem
---

# Task: Classify Project

## Purpose

Classificar o projeto baseado nos dados do intake. Define tipo, complexidade e riscos para informar a proposta e o planejamento.

## Key Activities

### 1. Classificar Tipo de Projeto
Baseado nas respostas, confirmar/ajustar tipo:
- web-app | mobile-app | website | automation | saas | ecommerce | custom

### 2. Calcular Complexidade (5 dimensões, 1-5 cada)

| Dimensão | Critério |
|----------|---------|
| Escopo | Nº de features must-have, integrações |
| Técnico | Stack, infra, compliance |
| Stakeholders | Nº de decisores, alinhamento |
| Timeline | Prazo vs escopo realista |
| Risco | Budget, equipe, dependências externas |

**Score:**
- <= 10: SIMPLE (MVP, projeto focado)
- 11-18: STANDARD (projeto médio, equipe completa)
- 19-25: ENTERPRISE (projeto complexo, múltiplos stakeholders)

### 3. Identificar Riscos Top 3
Para cada risco:
- Descrição
- Probabilidade (alta/média/baixa)
- Impacto (alto/médio/baixo)
- Mitigação sugerida

### 4. Gerar Recomendação de Abordagem
- Faseamento sugerido (MVP → v1 → v2)
- Metodologia (ágil, waterfall, híbrido)
- Equipe recomendada (perfis necessários)
- Timeline realista

### 5. Apresentar ao Usuário (Elicit)
Mostrar classificação e perguntar se concorda.

## Veto Conditions
- Classificação sem dados suficientes (completude < 70%)
- Complexidade enterprise sem stakeholder decisor identificado
