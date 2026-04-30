# Task: Criar Plano de Gerenciamento das Comunicações

## Metadata
- **id**: create-communication-plan
- **agent**: communications-manager
- **elicit**: true
- **version**: 1.0.0

## Description
Desenvolve o Plano de Gerenciamento das Comunicações do projeto, estabelecendo quem recebe qual informação, em que formato, com qual frequência e por qual canal. Uma comunicação eficaz é frequentemente citada como o fator mais crítico para o sucesso do projeto: o gerente de projeto gasta até 90% do seu tempo se comunicando. Este plano elimina ambiguidades, previne falhas de comunicação e garante que os stakeholders certos estejam sempre informados. Estudantes aprendem a criar uma Matriz de Comunicação completa, a calcular canais de comunicação e a estruturar reuniões eficazes.

## Inputs
- Lista de stakeholders e seus papéis (do Registro de Stakeholders, se disponível)
- Estrutura da equipe do projeto
- Necessidades de informação por stakeholder
- Canais e ferramentas disponíveis
- Frequência desejada de comunicação
- Restrições de comunicação (confidencialidade, distância, fuso horário)

## Elicitation

1. **Quem são os stakeholders do projeto?** Liste todos: internos (equipe, gestores, áreas impactadas) e externos (clientes, fornecedores, reguladores). Para cada um, informe o papel e nível hierárquico.
2. **Para cada stakeholder, qual é a principal necessidade de informação?** O que ele PRECISA saber para cumprir seu papel ou manter seu apoio? (ex: "O Sponsor precisa saber: status geral, riscos críticos, variações de custo > 10%")
3. **Quais canais de comunicação estão disponíveis e são preferidos?** (ex: e-mail, Slack, Microsoft Teams, WhatsApp, reuniões presenciais, videoconferência, dashboard online, relatórios PDF)
4. **Com que frequência cada stakeholder deve ser comunicado?** (ex: "Diário para a equipe", "Semanal para o Sponsor", "Quinzenal para o cliente", "Mensal para a diretoria")
5. **Quais reuniões recorrentes o projeto terá?** (ex: Daily Standup, Weekly Status Meeting, Monthly Steering Committee, Sprint Review)
6. **Existe alguma restrição de comunicação?** (ex: informações confidenciais que não podem ser compartilhadas amplamente, diferentes fusos horários, idiomas distintos, políticas de segurança da informação)
7. **Quem é responsável por produzir cada tipo de comunicação?** (ex: "Status Report: Gerente de Projeto", "Ata de reunião: Scrum Master")
8. **Há necessidade de tradução ou adaptação de linguagem?** (ex: relatórios técnicos × executivos)
9. **Como serão armazenadas e acessadas as comunicações do projeto?** (ex: SharePoint, Google Drive, Confluence, repositório Git)
10. **Qual é o processo para comunicações urgentes ou de crise?** Quem aciona quem em caso de problema crítico?
11. **O projeto tem partes em fusos horários diferentes?** Se sim, quais janelas de horário são viáveis para reuniões?

## Process

1. **Calcular número de canais de comunicação** — Fórmula: `N = n(n-1)/2` onde n = número de stakeholders. Apresentar impacto.
2. **Mapear necessidades de informação** — Para cada stakeholder, consolidar: o que precisa saber, com que frequência, em qual nível de detalhe.
3. **Criar Matriz de Comunicação** — Cruzar: mensagem × destinatário × emissor × frequência × canal × formato.
4. **Estruturar reuniões recorrentes** — Para cada reunião: objetivo, participantes, duração, frequência, pauta padrão, dono.
5. **Definir formatos de relatório** — Criar templates ou descrever o formato para cada tipo de relatório.
6. **Definir diretrizes de armazenamento** — Onde ficam as comunicações, quem tem acesso, por quanto tempo.
7. **Criar protocolo de comunicação de crise** — Fluxo de escalação para problemas críticos.
8. **Definir regras de resposta** — SLA para respostas a comunicações (ex: e-mails urgentes em 4h, normais em 24h).
9. **Montar o plano completo** — Consolidar matriz, reuniões, protocolos e diretrizes.

## Output

```
# PLANO DE GERENCIAMENTO DAS COMUNICAÇÕES
## {Nome do Projeto}

**Versão:** 1.0 | **Data:** {data} | **Responsável:** {GP}

---

## 1. ANÁLISE DE CANAIS DE COMUNICAÇÃO

**Total de stakeholders:** {n}
**Número de canais potenciais:** n(n-1)/2 = {n}({n}-1)/2 = **{resultado} canais**

*Quanto maior o número de canais, maior o esforço de comunicação. Com {n} stakeholders, o GP deve gerenciar {resultado} canais potenciais de comunicação.*

---

## 2. NECESSIDADES DE INFORMAÇÃO POR STAKEHOLDER

| Stakeholder               | Papel          | O que precisa saber                               | Nível de Detalhe | Frequência    |
|---------------------------|----------------|---------------------------------------------------|------------------|---------------|
| {Patrocinador}            | Sponsor        | Status geral, riscos críticos, variações de custo | Executivo        | Semanal       |
| {Cliente / Usuário Final} | Receptor final | Progresso das entregas, datas, como usar           | Funcional        | Quinzenal     |
| {Equipe de Dev}           | Executores     | Tarefas, bloqueios, mudanças técnicas              | Técnico/Detalhado| Diário        |
| {Stakeholder N}           | {papel}        | {necessidade}                                      | {nível}          | {frequência}  |

---

## 3. MATRIZ DE COMUNICAÇÃO

| # | Comunicação                   | Conteúdo                                          | Emissor       | Destinatários              | Canal          | Frequência    | Formato          | Dono         |
|---|-------------------------------|---------------------------------------------------|---------------|----------------------------|----------------|---------------|------------------|--------------|
| 1 | Status Report Semanal         | Progresso, riscos, próximos passos, variações     | GP            | Sponsor, Stakeholders-chave | E-mail / PDF   | Semanal       | Relatório 1 página | GP          |
| 2 | Daily Standup                 | O que fiz, o que farei, bloqueios                 | Equipe        | Equipe de projeto          | Videoconferência | Diário (15min) | Verbal / Ata   | Scrum Master |
| 3 | Reunião de Status (Steering)  | KPIs, riscos críticos, decisões executivas        | GP            | Diretoria, Sponsor          | Videoconferência | Mensal       | Apresentação PPT | GP          |
| 4 | Sprint Review / Demo          | Demonstração de entregas, feedback                | Equipe + GP   | Cliente, Stakeholders       | Videoconferência | Por sprint   | Demo ao vivo     | GP          |
| 5 | Registro de Riscos Atualizado | Novos riscos, status dos existentes               | GP + Risk Mgr | Equipe, Sponsor             | SharePoint/Drive | Semanal     | Planilha / PDF   | GP          |
| 6 | Comunicado de Mudança         | Solicitação de mudança, impacto, decisão          | GP            | Sponsor, Comitê de Mudanças | E-mail formal  | Sob demanda   | Formulário CCB   | GP          |
| 7 | Ata de Reunião                | Decisões tomadas, ações, responsáveis, prazos     | Secretário    | Todos os participantes      | E-mail         | Após cada reunião | Documento Word/MD | Scrum Master |
| 8 | Relatório de Encerramento     | Resultados, lições aprendidas, aceite formal      | GP            | Todos os stakeholders       | E-mail + reunião | Fim do projeto | Relatório formal | GP         |
| N | {comunicação específica}      | {conteúdo}                                        | {quem}        | {destinatários}             | {canal}        | {frequência}  | {formato}        | {dono}       |

---

## 4. REUNIÕES RECORRENTES

| Reunião                     | Objetivo                                   | Participantes               | Duração | Frequência | Dia/Horário     | Dono     |
|-----------------------------|--------------------------------------------|-----------------------------|---------|------------|-----------------|----------|
| Daily Standup               | Sincronização diária da equipe             | Equipe de projeto           | 15 min  | Diária     | {dias, horário} | Scrum Master |
| Weekly Status               | Status do projeto, bloqueios, decisões     | GP + Líderes de área        | 1h      | Semanal    | {dia, horário}  | GP       |
| Sprint Review / Demo        | Demonstrar entregas, coletar feedback      | Equipe + Cliente + Sponsor  | 2h      | Quinzenal  | {dia, horário}  | GP       |
| Steering Committee          | Decisões executivas, aprovações, riscos    | GP + Diretoria + Sponsor    | 1h      | Mensal     | {dia, horário}  | Sponsor  |
| Retrospectiva               | Melhorar processos internos da equipe      | Equipe de projeto           | 1h      | Por sprint | {dia, horário}  | Scrum Master |

**Pauta Padrão — Weekly Status:**
1. Abertura e confirmação de quórum (2 min)
2. Status das atividades da semana anterior (10 min)
3. Bloqueios e riscos (10 min)
4. Planejamento da próxima semana (10 min)
5. Tomada de decisões pendentes (15 min)
6. Próximos passos e encerramento (3 min)

---

## 5. DIRETRIZES DE ARMAZENAMENTO E ACESSO

| Tipo de Documento              | Local de Armazenamento     | Acesso                    | Retenção    |
|--------------------------------|----------------------------|---------------------------|-------------|
| Planos de Gerenciamento        | {SharePoint/Drive/Pasta}   | Equipe do projeto         | Permanente  |
| Atas de reunião                | {local}                    | Participantes + GP        | Duração+1 ano |
| Status Reports                 | {local}                    | Equipe + Stakeholders     | Duração do projeto |
| Comunicações com clientes      | {local}                    | GP + Sponsor              | Permanente  |
| Documentação técnica           | {Confluence/Git/local}     | Equipe técnica            | Permanente  |

---

## 6. PROTOCOLO DE COMUNICAÇÃO DE CRISE

Quando um problema crítico é identificado:

1. **Identificação** — Qualquer membro da equipe pode iniciar o protocolo
2. **Notificação imediata** — Alertar o GP via {canal de urgência} em até 1 hora
3. **Avaliação do GP** — GP avalia severidade em até 2 horas
4. **Escalação** — Se CRÍTICO: notificar Sponsor em até 4 horas por telefone + e-mail
5. **Comunicado aos stakeholders** — GP envia comunicado formal em até 24 horas
6. **War Room** — Reunião de crise convocada em até 24 horas com decisores

**Severidade de Crise:**
- CRÍTICO: Risco ao prazo/custo > 20% ou impacto legal/reputacional
- ALTO: Risco ao prazo/custo entre 10-20%
- MÉDIO: Problema técnico sem impacto imediato no prazo

---

## 7. SLA DE RESPOSTAS

| Canal           | Mensagem Urgente | Mensagem Normal | Não Urgente  |
|-----------------|------------------|-----------------|--------------|
| Telefone        | Imediato         | N/A             | N/A          |
| {Chat/Slack}    | 1 hora           | 4 horas         | 24 horas     |
| E-mail          | 4 horas          | 24 horas        | 48 horas     |
| Formulários     | N/A              | 48 horas        | 5 dias úteis |
```

## PMBOK Reference
- **Grupo de Processos:** Planejamento (Planning Process Group)
- **Área de Conhecimento:** Gerenciamento das Comunicações do Projeto (Project Communications Management)
- **Processos PMBOK:**
  - 10.1 — Planejar o Gerenciamento das Comunicações (Plan Communications Management)
  - 10.2 — Gerenciar as Comunicações (referência para execução)
  - 10.3 — Monitorar as Comunicações (referência para controle)
- **Fórmula fundamental:** Canais = n(n-1)/2 onde n = número de stakeholders
- **Dado-chave:** Gerentes de projeto gastam cerca de 90% do tempo se comunicando (PMBOK Guide, 6ª ed.)
