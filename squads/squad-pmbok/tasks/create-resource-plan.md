# Task: Criar Plano de Gerenciamento dos Recursos

## Metadata
- **id**: create-resource-plan
- **agent**: resource-manager
- **elicit**: true
- **version**: 1.0.0

## Description
Desenvolve o Plano de Gerenciamento dos Recursos do projeto, incluindo: identificação de papéis e responsabilidades, Matriz RACI (Responsible, Accountable, Consulted, Informed), calendário de recursos e estrutura da equipe. O gerenciamento eficaz de recursos garante que as pessoas certas estejam no lugar certo, na hora certa, com as competências necessárias. Estudantes aprendem a criar uma Matriz RACI profissional, a planejar alocação de recursos no tempo e a estruturar equipes de projeto de acordo com as boas práticas do PMBOK.

## Inputs
- Lista de atividades/entregas do projeto (do cronograma ou WBS)
- Papéis e competências necessárias
- Disponibilidade estimada de cada recurso
- Estrutura organizacional do contexto do projeto
- Restrições de recursos (orçamento para contratações, recursos compartilhados)
- Data de início e duração do projeto

## Elicitation

1. **Quais são as principais atividades ou entregas do projeto?** (Cole a lista do cronograma ou WBS — usaremos para montar a RACI)
2. **Quais papéis/funções são necessários no projeto?** Liste todos, mesmo que ainda não tenha pessoas definidas. (ex: Gerente de Projeto, Dev Backend, Dev Frontend, Designer UX, QA, DBA, DevOps, Analista de Negócio, Patrocinador)
3. **Para cada papel, você já tem uma pessoa identificada?** Se sim, informe o nome. Se não, marque como "A Definir".
4. **Qual é a disponibilidade de cada recurso?** Informe em % (ex: "Dev Backend: 100% dedicado", "Designer: 50% — compartilhado com outro projeto") ou horas por semana.
5. **Quais são as competências críticas necessárias para o projeto?** (ex: "Experiência com React", "Certificação AWS", "Conhecimento de LGPD")
6. **Existem recursos externos ou terceirizados?** Se sim, quais papéis serão terceirizados?
7. **Qual é a estrutura organizacional do projeto?** Escolha:
   - (A) Funcional — gerente funcional tem autoridade, GP tem pouca
   - (B) Matricial Fraca — GP tem pouca autoridade
   - (C) Matricial Balanceada — autoridade dividida
   - (D) Matricial Forte — GP tem mais autoridade
   - (E) Projetizada — GP tem autoridade total
8. **O projeto terá subequipes ou squads?** Se sim, quais e como se relacionam?
9. **Quais são os períodos de indisponibilidade previstos?** (férias, feriados regionais, outros projetos com prioridade)
10. **Há necessidade de treinamento ou onboarding para algum membro?** Qual e quando?
11. **Como será o processo de resolução de conflitos de alocação?** (Quem decide quando há disputa por um recurso compartilhado?)

## Process

1. **Listar papéis e responsabilidades** — Consolidar todos os papéis identificados com descrição de responsabilidades.
2. **Associar atividades a papéis** — Cruzar atividades/entregas do projeto com os papéis necessários.
3. **Criar Matriz RACI** — Para cada atividade/entrega principal, atribuir: R (Responsible), A (Accountable), C (Consulted), I (Informed).
4. **Verificar consistência da RACI** — Garantir: (1) toda atividade tem exatamente 1 Accountable, (2) toda atividade tem pelo menos 1 Responsible, (3) sem sobrecarga excessiva em um único recurso.
5. **Criar Organograma do Projeto** — Representar visualmente a estrutura hierárquica da equipe em formato texto.
6. **Montar Calendário de Recursos** — Distribuir alocação de cada recurso semana a semana ou por fase.
7. **Identificar pontos de sobrecarga** — Verificar se algum recurso está alocado além de 100% em algum período.
8. **Nivelamento de recursos** — Propor ajustes de cronograma ou realocação para resolver sobrecargas.
9. **Documentar necessidades de treinamento** — Criar tabela de treinamentos necessários com timeline.
10. **Montar documento final** — Consolidar RACI, organograma, calendário e plano de desenvolvimento da equipe.

## Output

```
# PLANO DE GERENCIAMENTO DOS RECURSOS
## {Nome do Projeto}

**Versão:** 1.0 | **Data:** {data} | **Gerente de Projeto:** {nome}

---

## 1. PAPÉIS E RESPONSABILIDADES

| Papel                  | Nome          | Responsabilidades                                        | Dedicação |
|------------------------|---------------|----------------------------------------------------------|-----------|
| Patrocinador           | {nome}        | Aprovação de mudanças, funding, suporte executivo         | Parcial   |
| Gerente de Projeto     | {nome}        | Planejamento, execução, controle e encerramento           | 100%      |
| {Papel 1}              | {nome/TBD}    | {descrição das responsabilidades}                         | {X}%      |
| {Papel 2}              | {nome/TBD}    | {descrição das responsabilidades}                         | {X}%      |
| {Papel N}              | {nome/TBD}    | {descrição das responsabilidades}                         | {X}%      |

---

## 2. MATRIZ RACI

**Legenda:** R = Responsável (executa) | A = Aprovador/Accountable (1 por linha) | C = Consultado | I = Informado

| Atividade / Entrega              | Sponsor | GP  | {Papel1} | {Papel2} | {Papel3} | {PapelN} |
|----------------------------------|---------|-----|----------|----------|----------|----------|
| Planejamento do Projeto          | A       | R   | C        | C        | I        | I        |
| {Entrega / Atividade 1}          | I       | A   | R        | C        | C        | I        |
| {Entrega / Atividade 2}          | I       | A   | C        | R        | R        | I        |
| {Entrega / Atividade 3}          | I       | C   | I        | A        | R        | C        |
| Revisão de Qualidade             | I       | A   | R        | C        | R        | I        |
| Aprovação de Entregas            | A       | R   | C        | C        | I        | I        |
| Gerenciamento de Riscos          | I       | A/R | C        | C        | I        | I        |
| Comunicação com Stakeholders     | C       | R   | I        | I        | I        | A        |
| Encerramento do Projeto          | A       | R   | C        | C        | I        | I        |

**Verificação de consistência:**
- [ ] Toda linha tem exatamente 1 "A" (Accountable)
- [ ] Toda linha tem pelo menos 1 "R" (Responsible)
- [ ] Nenhum recurso é sobrecarregado (R excessivos em paralelo)

---

## 3. ORGANOGRAMA DO PROJETO

```
{Patrocinador — {Nome}}
        |
        | (autoridade de projeto)
        |
{Gerente de Projeto — {Nome}}
        |
   _____|___________________________________________
   |              |              |                 |
{Líder           {Líder         {QA               {Analista de
 Técnico}         de Design}     Lead}             Negócio}
   |              |              |
{Dev 1}        {Designer 1}  {QA 1}
{Dev 2}        {Designer 2}  {QA 2}
{Dev N}
```

---

## 4. CALENDÁRIO DE RECURSOS (Alocação por Fase/Período)

| Recurso / Papel        | Fase 1 ({mês}) | Fase 2 ({mês}) | Fase 3 ({mês}) | Fase 4 ({mês}) | Total |
|------------------------|----------------|----------------|----------------|----------------|-------|
| Gerente de Projeto     | 100%           | 100%           | 100%           | 100%           | {N}h  |
| {Papel 1}              | 0%             | 100%           | 100%           | 50%            | {N}h  |
| {Papel 2}              | 50%            | 100%           | 50%            | 0%             | {N}h  |
| {Papel N}              | {X}%           | {X}%           | {X}%           | {X}%           | {N}h  |

**Alertas de alocação:**
- {recurso} está alocado a 150% no Mês 2 — necessário nivelamento
- {recurso} possui férias previstas em {período} — considerar no planejamento

---

## 5. NIVELAMENTO DE RECURSOS (Ajustes Propostos)

| Conflito Identificado               | Ação Proposta                              | Impacto no Cronograma |
|-------------------------------------|--------------------------------------------|-----------------------|
| {Recurso X} alocado 150% em Mês 2  | Mover {atividade Y} para Mês 3             | +{N} dias             |
| {Recurso Z} indisponível em {data} | Contratar substituto temporário            | Custo adicional       |

---

## 6. PLANO DE DESENVOLVIMENTO DA EQUIPE

| Membro         | Necessidade de Treinamento          | Tipo           | Prazo      | Responsável |
|----------------|-------------------------------------|----------------|------------|-------------|
| {nome}         | {ex: Treinamento em LGPD}           | Curso online   | {data}     | {quem}      |
| {nome}         | {ex: Certificação AWS Associate}    | Externo        | {data}     | {quem}      |

---

## 7. POLÍTICAS DE GESTÃO DE CONFLITOS DE RECURSOS

1. Conflitos de alocação entre projetos são resolvidos pelo {cargo responsável}
2. Substituições de recursos devem ser comunicadas com {X} dias de antecedência
3. Recursos terceirizados gerenciados via {processo/ferramenta}
4. Horas extras devem ser aprovadas pelo {cargo} com antecedência de {X} dias
```

## PMBOK Reference
- **Grupo de Processos:** Planejamento (Planning Process Group)
- **Área de Conhecimento:** Gerenciamento dos Recursos do Projeto (Project Resource Management)
- **Processos PMBOK:**
  - 9.1 — Planejar o Gerenciamento dos Recursos (inclui RACI, organograma)
  - 9.2 — Estimar os Recursos das Atividades
  - 9.3 — Adquirir Recursos (referência para execução)
  - 9.4 — Desenvolver a Equipe (referência para execução)
- **Ferramentas principais:** Matriz RACI, Organograma, Histograma de Recursos, Nivelamento de Recursos
