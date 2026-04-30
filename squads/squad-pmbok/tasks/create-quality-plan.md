# Task: Criar Plano de Gerenciamento da Qualidade

## Metadata
- **id**: create-quality-plan
- **agent**: quality-manager
- **elicit**: true
- **version**: 1.0.0

## Description
Desenvolve o Plano de Gerenciamento da Qualidade, definindo os padrões de qualidade que o projeto deve atender, as métricas de medição, os processos de garantia e controle da qualidade, e o checklist de auditoria. O plano de qualidade responde a três perguntas fundamentais: O que é qualidade neste projeto? Como mediremos? Como garantiremos? Estudantes aprendem a distinguir garantia de qualidade (QA) de controle de qualidade (QC), a definir métricas SMART e a criar checklists de auditoria profissionais.

## Inputs
- Objetivos e entregas do projeto (do Escopo ou Charter)
- Padrões de qualidade aplicáveis (normas, regulamentações, padrões organizacionais)
- Critérios de aceitação das entregas
- Expectativas dos stakeholders sobre qualidade
- Métricas de qualidade desejadas
- Recursos disponíveis para atividades de qualidade

## Elicitation

1. **Quais são as principais entregas do projeto?** (Para cada entrega, definiremos critérios de qualidade)
2. **Existem normas, padrões ou regulamentações que o projeto deve seguir?** (ex: ISO 9001, LGPD, WCAG 2.1, SOX, normas da empresa, padrões de código como OWASP)
3. **Quais são os critérios de aceitação para as entregas principais?** Como o cliente definirá "aprovado"? (ex: "Taxa de defeitos < 1%", "Tempo de resposta < 2s", "Cobertura de testes > 80%")
4. **Quais são as expectativas do cliente/patrocinador em relação à qualidade?** Há aspectos de qualidade que são especialmente críticos para ele?
5. **Quais métricas de qualidade você quer acompanhar durante o projeto?** (ex: densidade de bugs, satisfação do usuário, tempo de entrega, cobertura de testes, taxa de retrabalho)
6. **Como você pretende GARANTIR a qualidade durante o processo?** (ex: revisões de código, pair programming, reuniões de revisão, auditorias periódicas)
7. **Como você pretende CONTROLAR a qualidade nos entregáveis?** (ex: testes unitários, testes de aceitação, inspeções, validações com o cliente)
8. **Com que frequência serão realizadas auditorias ou revisões de qualidade?** (ex: semanal, por sprint, por fase, ao final de cada entrega)
9. **Quem é responsável pelo processo de qualidade?** Há um QA designado, ou é responsabilidade do time todo?
10. **Quais ferramentas ou técnicas serão usadas?** (ex: SonarQube, Jest, Selenium, formulários de inspeção, testes de usuário)
11. **Qual é o custo da qualidade tolerável?** Quanto o projeto pode investir em prevenção e detecção de defeitos?

## Process

1. **Definir política de qualidade** — Estabelecer a declaração de qualidade do projeto (o que significa qualidade para este projeto).
2. **Mapear padrões aplicáveis** — Listar normas e padrões identificados pelo usuário; adicionar boas práticas de mercado relevantes.
3. **Definir métricas de qualidade** — Para cada área de entrega, criar métricas mensuráveis com valores alvo (baseline e meta).
4. **Estruturar atividades de Garantia da Qualidade (QA)** — Definir processos, revisões e auditorias planejadas com frequência e responsável.
5. **Estruturar atividades de Controle da Qualidade (QC)** — Definir inspeções, testes e validações aplicados às entregas.
6. **Criar checklist de auditoria** — Desenvolver lista de verificação para cada tipo de entrega ou fase.
7. **Definir critérios de não-conformidade** — O que acontece quando uma entrega falha no controle de qualidade? Qual é o processo de correção?
8. **Documentar ferramentas e técnicas** — Listar as ferramentas que serão usadas e quando.
9. **Calcular custo da qualidade** — Estimar: Custo de Prevenção + Custo de Avaliação + Custo de Falhas Internas + Externas.
10. **Montar o plano completo** — Consolidar todos os elementos no documento final.

## Output

```
# PLANO DE GERENCIAMENTO DA QUALIDADE
## {Nome do Projeto}

**Versão:** 1.0 | **Data:** {data} | **Responsável pela Qualidade:** {nome}

---

## 1. POLÍTICA DE QUALIDADE
{Declaração formal do compromisso do projeto com a qualidade. O que "qualidade" significa para este projeto e como ela será alcançada.}

## 2. PADRÕES E REFERÊNCIAS DE QUALIDADE
| Padrão / Norma               | Área de Aplicação                  | Obrigatório? |
|------------------------------|------------------------------------|--------------|
| {ex: WCAG 2.1 AA}            | {ex: Acessibilidade da interface}  | Sim          |
| {ex: OWASP Top 10}           | {ex: Segurança da aplicação}       | Sim          |
| {ex: Padrão de código X}     | {ex: Desenvolvimento}              | Recomendado  |

---

## 3. MÉTRICAS DE QUALIDADE

| ID  | Métrica                         | Descrição                                  | Baseline  | Meta       | Frequência  | Responsável |
|-----|---------------------------------|--------------------------------------------|-----------|------------|-------------|-------------|
| Q01 | Taxa de Defeitos                | Bugs encontrados / funcionalidades entregues | {atual}  | < {X}%     | Por sprint  | {nome}      |
| Q02 | Cobertura de Testes             | % do código coberto por testes automatizados | {atual}  | > {X}%     | Contínua    | {nome}      |
| Q03 | Satisfação do Cliente           | Score NPS ou escala 1-10 nas revisões      | {atual}   | > {X}      | Por entrega | {nome}      |
| Q04 | Taxa de Retrabalho              | % de atividades refeitas após conclusão    | {atual}   | < {X}%     | Mensal      | {nome}      |
| Q05 | {Métrica específica}            | {descrição}                                | {atual}   | {meta}     | {frequência}| {nome}      |

---

## 4. GARANTIA DA QUALIDADE (QA) — PROCESSOS

| # | Atividade de QA                  | Descrição                                       | Frequência     | Responsável | Entrega      |
|---|----------------------------------|-------------------------------------------------|----------------|-------------|--------------|
| 1 | Revisão de Código (Code Review)  | Revisão por pares antes de merge                | Por PR/commit  | {nome}      | Pull Request aprovado |
| 2 | Auditoria de Qualidade           | Revisão de conformidade com padrões do plano    | {frequência}   | {nome}      | Relatório de Auditoria |
| 3 | Reunião de Revisão de Sprint     | Demonstração e feedback do cliente              | Por sprint     | {nome}      | Ata de revisão |
| 4 | {Atividade QA específica}        | {descrição}                                     | {frequência}   | {nome}      | {saída}      |

---

## 5. CONTROLE DA QUALIDADE (QC) — INSPEÇÕES E TESTES

| # | Atividade de QC                  | Técnica                  | Quando aplicar               | Critério de Aprovação       |
|---|----------------------------------|--------------------------|------------------------------|-----------------------------|
| 1 | Testes Unitários                 | Automatizados (Jest/etc) | Antes do merge               | Cobertura > {X}%, 0 falhas  |
| 2 | Testes de Integração             | Automatizados            | Após integração de módulos   | 0 falhas críticas           |
| 3 | Teste de Aceitação do Usuário    | UAT com cliente          | Antes da entrega final       | Aceite formal do cliente    |
| 4 | Inspeção de Documentação         | Revisão manual           | Ao finalizar cada entrega    | Checklist abaixo preenchido |
| 5 | {QC específico}                  | {técnica}                | {quando}                     | {critério}                  |

---

## 6. CHECKLIST DE AUDITORIA DE QUALIDADE

### 6.1 Checklist — Entregas de Software
- [ ] Código revisado por pelo menos 1 par antes do merge
- [ ] Cobertura de testes automatizados ≥ {X}%
- [ ] Nenhum bug crítico ou bloqueante em aberto
- [ ] Documentação técnica atualizada (README, API docs)
- [ ] Testes de segurança realizados (OWASP verificado)
- [ ] Acessibilidade verificada (se aplicável)
- [ ] Performance testada (tempo de resposta ≤ {X}ms)
- [ ] Critérios de aceitação do cliente atendidos
- [ ] Deploy realizado em ambiente de staging antes de produção

### 6.2 Checklist — Processo de Gerenciamento
- [ ] Todos os marcos do cronograma foram entregues no prazo
- [ ] Variações de custo dentro do limite aprovado (CPI ≥ 0.95)
- [ ] Riscos monitorados e respostas executadas
- [ ] Stakeholders informados conforme plano de comunicações
- [ ] Mudanças de escopo aprovadas formalmente
- [ ] Lições aprendidas documentadas ao final de cada fase

### 6.3 Checklist — Critérios Específicos do Projeto
- [ ] {Critério 1 específico}
- [ ] {Critério 2 específico}
- [ ] {Critério N específico}

---

## 7. PROCESSO DE NÃO-CONFORMIDADE

Quando uma entrega não atende aos critérios de qualidade:

1. **Registrar** a não-conformidade com descrição, severidade e data
2. **Analisar causa raiz** (5 Porquês ou Diagrama de Ishikawa)
3. **Definir ação corretiva** com responsável e prazo
4. **Reenviar para controle de qualidade** após correção
5. **Fechar a não-conformidade** após aprovação

Severidade: CRÍTICA (bloqueia entrega) | ALTA (correção urgente) | MÉDIA | BAIXA

---

## 8. CUSTO DA QUALIDADE (COQ)

| Categoria              | Exemplos                                  | Estimativa     |
|------------------------|-------------------------------------------|----------------|
| Prevenção (Prevention) | Treinamentos, revisões de design, padrões | R$ {valor}     |
| Avaliação (Appraisal)  | Testes, auditorias, inspeções             | R$ {valor}     |
| Falhas Internas        | Retrabalho, correção de bugs internos     | R$ {valor}     |
| Falhas Externas        | Reclamações, suporte, garantia            | R$ {valor}     |
| **Total COQ**          |                                           | **R$ {valor}** |

*Referência: Custo de Prevenção + Avaliação geralmente representa 1-5% do orçamento total.*
```

## PMBOK Reference
- **Grupo de Processos:** Planejamento (Planning Process Group)
- **Área de Conhecimento:** Gerenciamento da Qualidade do Projeto (Project Quality Management)
- **Processos PMBOK:**
  - 8.1 — Planejar o Gerenciamento da Qualidade (Plan Quality Management)
  - 8.2 — Gerenciar a Qualidade / Garantia da Qualidade (Manage Quality / QA) — referência
  - 8.3 — Controlar a Qualidade (Control Quality / QC) — referência
- **Técnicas principais:** Diagrama de Ishikawa, 5 Porquês, Custo da Qualidade (COQ), Checklist de Qualidade, Benchmarking
- **Conceito central:** Qualidade é planejada e construída no projeto, não inspecionada ao final
