---
task: generate-intake-report
responsavel: "@intake-chief (Iris)"
delegated_to: ["@donna-weber"]
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Worker
optimization_note: "Consolidação mecânica de artefatos no template 9 pontos. Determinístico."
elicit: true
Entrada:
  - client_name: string
  - all_intake_artifacts: object - Todos os artefatos das fases anteriores
Saida:
  - intake-report.md: Relatório consolidado final
  - handoff-summary.md: Resumo para handoff
Checklist:
  - Todas as seções do relatório presentes
  - Score de completude >= 85%
  - Zero gaps CRITICAL pendentes
  - Handoff summary pronto para squad-pm
  - Recomendação de próximos passos
---

# Task: Generate Intake Report

## Purpose

Consolidar todas as informações do intake em um relatório final. O relatório serve como artefato de handoff para o squad-pm (discovery-session ou write-prd).

## Key Activities

### 1. Consolidar Dados
Reunir artefatos de todas as fases:
- Notas da reunião (fase 2)
- Respostas do briefing (fase 3)
- Relatório de análise (fase 4)
- Follow-up (fase 5)
- Classificação do projeto (fase 6)

### 2. Gerar Relatório no Formato 9 Pontos (Alan Weiss)

```markdown
# Intake Report — {client_name}
**Data:** {date}
**Score de Completude:** {score}%
**Classificação:** {type} | {complexity}

## 1. Situação Atual
{contexto do negócio e problema}

## 2. Objetivos
{outcomes de negócio mensuráveis}

## 3. Medidas de Sucesso
{KPIs com baseline e target}

## 4. Valor
{impacto financeiro de resolver}

## 5. Escopo Desejado
{features priorizadas MoSCoW}

## 6. Restrições
{budget, prazo, equipe, técnico}

## 7. Riscos Identificados
{top 3 riscos com mitigação}

## 8. Classificação do Projeto
{tipo, complexidade, abordagem recomendada}

## 9. Próximos Passos
{recomendações e timeline}
```

### 3. Gerar Handoff Summary
Resumo executivo para o próximo squad:
- O que foi feito
- Decisões tomadas
- O que precisa ser feito a seguir
- Artefatos disponíveis e seus paths
- Red flags que requerem atenção

### 4. Validar Completude
- Score >= 85%: PASS
- Score 70-84%: PASS com flags
- Score < 70%: BLOCK — voltar para follow-up

### 5. Apresentar ao Usuário (Elicit)
Mostrar relatório e confirmar handoff.

## Veto Conditions
- Score de completude < 70%
- Gaps CRITICAL pendentes
- Relatório sem seção de Valor
- Handoff sem próximos passos definidos
