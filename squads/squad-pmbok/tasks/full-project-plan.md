# Task: Plano Completo de Gerenciamento do Projeto

## Metadata
- **id**: full-project-plan
- **agent**: pm-chief
- **elicit**: true
- **version**: 1.0.0

## Description
Tarefa orquestradora que coordena a criação de um Plano de Gerenciamento do Projeto completo, acionando sequencialmente todas as 10 áreas de conhecimento do PMBOK. O pm-chief age como gerente de projeto sênior, consolidando os outputs de cada área em um plano integrado e coeso. Esta tarefa é o ponto de entrada principal para estudantes que desejam praticar o planejamento completo de um projeto do zero.

## Inputs
- Nome e descrição do projeto
- Objetivo principal (o que deve ser alcançado)
- Prazo geral (data de início e término esperados)
- Orçamento estimado disponível (ou "a definir")
- Principais stakeholders conhecidos
- Restrições e premissas iniciais
- Nível de complexidade do projeto (pequeno / médio / grande)

## Elicitation

1. **Qual é o nome do seu projeto?** (ex: "Sistema de Gestão de Estoque", "Construção de API de Pagamentos")
2. **Descreva o objetivo principal do projeto em 2-3 frases.** O que será entregue ao final? Qual problema resolve?
3. **Quais são as datas previstas de início e término?** Se não souber, forneça uma duração estimada (ex: "6 meses").
4. **Qual é o orçamento disponível?** Informe o valor ou faixa, ou diga "a definir" se ainda não foi estabelecido.
5. **Quem são os principais stakeholders?** Liste pelo menos: patrocinador, cliente/usuário final, e time de execução.
6. **Existem restrições conhecidas?** (ex: tecnologia obrigatória, regulamentações, datas fixas, limitação de equipe)
7. **Quais são as premissas do projeto?** (ex: "o cliente fornece os dados", "infraestrutura já existe")
8. **Qual é a complexidade esperada?** Escolha: Pequeno (< 3 meses, 1-3 pessoas) / Médio (3-12 meses, 4-10 pessoas) / Grande (> 12 meses, 10+ pessoas)
9. **Há riscos iniciais já conhecidos?** Liste os 3 principais, se souber.
10. **Quais áreas do plano têm maior prioridade para detalhar?** (ex: riscos, cronograma, custos)

## Process

1. **Coleta e validação de inputs** — Confirmar todas as respostas do usuário e solicitar esclarecimentos se necessário.
2. **Geração do Termo de Abertura (Charter)** — Invocar tarefa `create-project-charter` com os dados coletados.
3. **Definição do Escopo** — Invocar `define-scope` usando o charter gerado como input.
4. **Criação do Cronograma** — Invocar `create-schedule` usando a WBS do escopo como input.
5. **Estimativa de Custos** — Invocar `estimate-costs` usando atividades e recursos do cronograma.
6. **Plano de Qualidade** — Invocar `create-quality-plan` com objetivos e critérios do escopo.
7. **Plano de Recursos** — Invocar `create-resource-plan` com papéis identificados nas etapas anteriores.
8. **Plano de Comunicações** — Invocar `create-communication-plan` com stakeholders mapeados.
9. **Registro de Riscos** — Invocar `create-risk-register` com contexto completo do projeto.
10. **Plano de Aquisições** — Invocar `create-procurement-plan` com necessidades de recursos externos.
11. **Registro de Stakeholders** — Invocar `create-stakeholder-register` para análise de engajamento.
12. **Consolidação** — Integrar todos os outputs em um documento unificado com sumário executivo.
13. **Revisão de consistência** — Verificar alinhamento entre escopo, cronograma, custos e riscos.
14. **Entrega do plano consolidado** — Apresentar o Plano Integrado de Gerenciamento do Projeto.

## Output

```
# PLANO DE GERENCIAMENTO DO PROJETO
## {Nome do Projeto}

**Versão:** 1.0
**Data:** {data}
**Gerente do Projeto:** {nome}
**Patrocinador:** {nome}

---

## SUMÁRIO EXECUTIVO
{Visão geral do projeto, objetivo, prazo e orçamento}

---

## 1. TERMO DE ABERTURA
{Output de create-project-charter}

## 2. GERENCIAMENTO DO ESCOPO
{Output de define-scope — Declaração de Escopo + WBS}

## 3. GERENCIAMENTO DO CRONOGRAMA
{Output de create-schedule — Atividades + Gantt + Caminho Crítico}

## 4. GERENCIAMENTO DOS CUSTOS
{Output de estimate-costs — Estimativas + Baseline + Reservas}

## 5. GERENCIAMENTO DA QUALIDADE
{Output de create-quality-plan — Métricas + Checklist de Auditoria}

## 6. GERENCIAMENTO DOS RECURSOS
{Output de create-resource-plan — RACI + Calendário + Estrutura}

## 7. GERENCIAMENTO DAS COMUNICAÇÕES
{Output de create-communication-plan — Matriz de Comunicação}

## 8. GERENCIAMENTO DOS RISCOS
{Output de create-risk-register — Registro + Matriz P×I + Respostas}

## 9. GERENCIAMENTO DAS AQUISIÇÕES
{Output de create-procurement-plan — Plano + Análise Make-or-Buy}

## 10. GERENCIAMENTO DOS STAKEHOLDERS
{Output de create-stakeholder-register — Registro + Grade + Engajamento}

---

## APROVAÇÕES
| Papel              | Nome | Assinatura | Data |
|--------------------|------|------------|------|
| Patrocinador       |      |            |      |
| Gerente do Projeto |      |            |      |
| Cliente Principal  |      |            |      |
```

## PMBOK Reference
- **Grupo de Processos:** Planejamento (Planning Process Group)
- **Área de Conhecimento:** Gerenciamento da Integração do Projeto (Project Integration Management)
- **Processos PMBOK:** 4.2 — Desenvolver o Plano de Gerenciamento do Projeto
- **Nota:** Esta tarefa é um orquestrador que cobre todos os 10 grupos de conhecimento do PMBOK 6ª Edição
