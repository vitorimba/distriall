---
task: prepare-meeting
responsavel: "@intake-chief (Iris)"
delegated_to: ["@rob-fitzpatrick", "@donna-weber"]
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Worker
optimization_note: "Template-driven com variação por indústria. Determinístico o suficiente para Worker."
elicit: false
Entrada:
  - client_name: string - Nome do cliente/empresa
  - industry (optional): string - Setor do cliente
  - project_type_hint (optional): string - Pista do tipo de projeto
  - meeting_date (optional): string - Data da reunião
Saida:
  - roteiro-reuniao.md: Roteiro com 5 blocos de perguntas Mom Test
  - welcome-email.md: Email de boas-vindas pré-reunião
Checklist:
  - Roteiro com 5 blocos e 15+ perguntas
  - Perguntas passam no Mom Test (fatos, não opiniões)
  - Email de boas-vindas com timeline
  - Customizado por indústria (se fornecida)
---

# Task: Prepare Meeting

## Purpose

Gerar roteiro de reunião e email de boas-vindas para o cliente. O roteiro segue as 3 regras do Mom Test (Rob Fitzpatrick) e o processo de Embark (Donna Weber).

## Key Activities

### 1. Gerar Email de Boas-vindas (Donna Weber - Embark)
- O que esperar da reunião (duração, temas)
- Timeline visual do processo completo de intake
- O que ter em mente antes da reunião
- Documentos úteis para trazer (se houver)

### 2. Gerar Roteiro de Reunião (Rob Fitzpatrick - Mom Test)
5 blocos, 45 min total:
- **Bloco 1 — O Negócio** (5 min): Contexto empresarial
- **Bloco 2 — O Problema** (10 min): Dor real, processo atual, impacto
- **Bloco 3 — A Solução Desejada** (10 min): Visão ideal, usuários, referências
- **Bloco 4 — Restrições** (5 min): Budget, prazo, equipe, técnico
- **Bloco 5 — Sucesso** (5 min): KPIs, métricas, próximos passos

### 3. Auditar Perguntas contra Mom Test
Cada pergunta deve:
- Focar em fatos do passado, não opiniões do futuro
- Falar sobre a vida do cliente, não sobre nossa solução
- Ser aberta, não fechada

### 4. Salvar Artefatos
- `docs/intake/{client}/roteiro-reuniao.md`
- `docs/intake/{client}/welcome-email.md`

## Veto Conditions
- Perguntas que pedem opinião sobre NOSSA ideia
- Perguntas hipotéticas ("Você usaria...?")
- Roteiro sem bloco de Restrições ou Sucesso
