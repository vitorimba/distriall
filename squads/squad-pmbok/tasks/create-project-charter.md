# Task: Criar Termo de Abertura do Projeto

## Metadata
- **id**: create-project-charter
- **agent**: integration-manager
- **elicit**: true
- **version**: 1.0.0

## Description
Gera o Termo de Abertura do Projeto (Project Charter), o documento formal que autoriza a existência do projeto e concede ao gerente de projeto a autoridade para aplicar recursos organizacionais às atividades do projeto. É o primeiro documento formal criado no ciclo de vida do projeto e serve como base para todo o planejamento subsequente. Estudantes aprendem a identificar os elementos essenciais de um charter profissional alinhado ao PMBOK.

## Inputs
- Propósito e justificativa do projeto
- Objetivos mensuráveis e critérios de sucesso
- Requisitos de alto nível
- Premissas e restrições iniciais
- Riscos de alto nível identificados
- Resumo do cronograma de marcos
- Orçamento estimado em alto nível
- Lista de stakeholders-chave
- Gerente de projeto designado
- Nome e cargo do patrocinador

## Elicitation

1. **Qual é o nome oficial do projeto?**
2. **Por que este projeto está sendo iniciado?** Descreva o problema ou oportunidade de negócio que o projeto endereça. (ex: "Reduzir o tempo de processamento de pedidos de 48h para 4h")
3. **Quais são os objetivos SMART do projeto?** Liste de 2 a 5 objetivos mensuráveis. (ex: "Entregar sistema funcional em produção até 30/06/2026 com uptime de 99,9%")
4. **Quais são os requisitos de alto nível?** O que o projeto DEVE entregar ou satisfazer? (não detalhe técnico — apenas o essencial)
5. **Quem é o patrocinador do projeto (Sponsor)?** Informe nome, cargo e área/departamento.
6. **Quem será o gerente do projeto?** Informe nome e, se aplicável, nível de autoridade (total / parcial / limitada).
7. **Quais são as premissas iniciais?** (ex: "A equipe de TI estará disponível em período integral", "O orçamento está aprovado")
8. **Quais são as restrições conhecidas?** (ex: "O sistema deve usar AWS", "Deadline é imutável em 15/12/2026", "Budget máximo de R$ 200.000")
9. **Quais são os marcos principais (milestones) do projeto?** Liste as entregas-chave com datas aproximadas.
10. **Qual é o orçamento estimado de alto nível?** Informe o valor aprovado ou estimado (pode ser uma faixa).
11. **Quais são os riscos de alto nível já visíveis?** Liste os 2-4 maiores riscos conhecidos neste momento.
12. **Quais são as principais partes interessadas (stakeholders)?** Liste com nome/grupo e seu papel no projeto.

## Process

1. **Validar inputs** — Confirmar que todos os campos essenciais foram coletados; solicitar complementação se necessário.
2. **Estruturar justificativa** — Elaborar a seção de propósito e justificativa de negócio com base nas respostas.
3. **Formatar objetivos** — Revisar e formatar objetivos no padrão SMART (Específico, Mensurável, Alcançável, Relevante, Temporal).
4. **Consolidar requisitos de alto nível** — Agrupar e priorizar os requisitos fornecidos.
5. **Definir autoridade do gerente** — Documentar claramente o escopo de autoridade do gerente de projeto.
6. **Estruturar cronograma de marcos** — Criar tabela de marcos com datas e critérios de conclusão.
7. **Compilar premissas e restrições** — Listar e categorizar (técnicas, orçamentárias, legais, temporais).
8. **Documentar riscos iniciais** — Registrar riscos identificados com categoria básica.
9. **Redigir o documento completo** — Montar o Termo de Abertura no formato padrão.
10. **Adicionar bloco de aprovação** — Incluir campos de assinatura para patrocinador e gerente.

## Output

```
# TERMO DE ABERTURA DO PROJETO
## {Nome do Projeto}

**Versão:** 1.0
**Data de Emissão:** {data}
**ID do Projeto:** {código ou N/A}

---

## 1. IDENTIFICAÇÃO DO PROJETO
| Campo                  | Informação                          |
|------------------------|-------------------------------------|
| Nome do Projeto        | {nome}                              |
| Patrocinador           | {nome, cargo, departamento}         |
| Gerente do Projeto     | {nome}                              |
| Data de Início Prevista| {data}                              |
| Data de Término Prevista| {data}                             |
| Orçamento Estimado     | {valor}                             |

---

## 2. PROPÓSITO E JUSTIFICATIVA
{Descrição do problema/oportunidade de negócio e por que este projeto é a solução adequada}

## 3. OBJETIVOS DO PROJETO
| # | Objetivo               | Indicador de Sucesso          | Prazo       |
|---|------------------------|-------------------------------|-------------|
| 1 | {objetivo SMART}       | {métrica}                     | {data}      |
| 2 | {objetivo SMART}       | {métrica}                     | {data}      |

## 4. REQUISITOS DE ALTO NÍVEL
- {Requisito 1}
- {Requisito 2}
- {Requisito N}

## 5. PREMISSAS
- {Premissa 1}
- {Premissa 2}

## 6. RESTRIÇÕES
| Tipo          | Restrição                        |
|---------------|----------------------------------|
| Temporal      | {ex: Deadline imutável em ...}   |
| Orçamentária  | {ex: Budget máximo de R$...}     |
| Técnica       | {ex: Uso obrigatório de ...}     |
| Regulatória   | {ex: Conformidade com LGPD}      |

## 7. RISCOS DE ALTO NÍVEL
| # | Risco                        | Categoria     | Nível Inicial |
|---|------------------------------|---------------|---------------|
| 1 | {descrição}                  | {tipo}        | Alto/Médio/Baixo |

## 8. CRONOGRAMA DE MARCOS
| Marco                         | Data Prevista | Critério de Conclusão    |
|-------------------------------|---------------|--------------------------|
| Kickoff do Projeto            | {data}        | Reunião realizada        |
| {Marco 1}                     | {data}        | {critério}               |
| {Marco N}                     | {data}        | {critério}               |
| Encerramento do Projeto       | {data}        | Aceite formal assinado   |

## 9. AUTORIDADE DO GERENTE DE PROJETO
{Descrição do nível de autoridade para tomada de decisão, aprovação de gastos, e alocação de recursos}

## 10. PRINCIPAIS STAKEHOLDERS
| Nome / Grupo           | Papel no Projeto          | Nível de Influência |
|------------------------|---------------------------|---------------------|
| {Patrocinador}         | Aprovador / Financiador   | Alto                |
| {Cliente}              | {papel}                   | {nível}             |

---

## APROVAÇÃO E AUTORIZAÇÃO
| Papel              | Nome | Assinatura | Data |
|--------------------|------|------------|------|
| Patrocinador       |      |            |      |
| Gerente do Projeto |      |            |      |

*Ao assinar este documento, o Patrocinador autoriza formalmente o início do projeto e delega autoridade ao Gerente do Projeto.*
```

## PMBOK Reference
- **Grupo de Processos:** Iniciação (Initiating Process Group)
- **Área de Conhecimento:** Gerenciamento da Integração do Projeto (Project Integration Management)
- **Processo PMBOK:** 4.1 — Desenvolver o Termo de Abertura do Projeto (Develop Project Charter)
- **Entradas principais:** Business Case, Acordos, Fatores Ambientais da Empresa, Ativos de Processos Organizacionais
- **Saídas principais:** Termo de Abertura do Projeto, Registro de Premissas
