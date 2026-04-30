---
task: detect-gaps
responsavel: "@intake-chief (Iris)"
delegated_to: ["@rob-fitzpatrick"]
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Worker
optimization_note: "Mecânico: gap CRITICAL → pergunta Mom Test. Mapeamento direto."
elicit: false
Entrada:
  - analysis_report_path: string - Path do relatório de análise
Saida:
  - followup-questions.md: Perguntas de follow-up para gaps
Checklist:
  - Todos os gaps CRITICAL têm perguntas de follow-up
  - Perguntas passam no Mom Test
  - Máximo 10 perguntas de follow-up
  - Priorizadas por impacto
---

# Task: Detect Gaps & Generate Follow-up

## Purpose

Gerar perguntas de follow-up específicas para gaps detectados na análise do briefing. As perguntas seguem o Mom Test (Rob Fitzpatrick) — factuais, sem viés.

## Key Activities

### 1. Carregar Gaps do Relatório de Análise
- Ler gaps classificados
- Priorizar: CRITICAL primeiro, depois IMPORTANT

### 2. Gerar Perguntas de Follow-up
Para cada gap:
- Formular pergunta factual (não hipotética)
- Explicar por que precisamos dessa informação
- Sugerir formato de resposta (range, exemplo, lista)

### 3. Auditar contra Mom Test
- Todas as perguntas pedem FATOS, não opiniões
- Nenhuma pergunta sugere resposta
- Linguagem acessível

### 4. Salvar
- `docs/intake/{client}/followup-questions.md`

## Veto Conditions
- Follow-up com mais de 10 perguntas (fadiga do cliente)
- Pergunta que viola Mom Test
- Gap CRITICAL sem pergunta correspondente
