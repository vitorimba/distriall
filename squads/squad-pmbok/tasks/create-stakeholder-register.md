# Task: Criar Registro de Stakeholders

## Metadata
- **id**: create-stakeholder-register
- **agent**: stakeholder-manager
- **elicit**: true
- **version**: 1.0.0

## Description
Desenvolve o Registro de Stakeholders completo, a Grade de Poder/Interesse (Power/Interest Grid) e o Plano de Engajamento de Stakeholders. Identificar e engajar as partes interessadas corretamente é crítico para o sucesso do projeto: stakeholders mal gerenciados são uma das principais causas de falha em projetos. Esta tarefa ensina estudantes a mapear todos os stakeholders, a analisar seu poder e interesse, a categorizar seu nível de engajamento atual vs. desejado (de Resistente a Líder) e a criar estratégias de engajamento personalizadas.

## Inputs
- Nome e contexto do projeto
- Lista inicial de stakeholders conhecidos
- Estrutura organizacional relevante
- Objetivos e impactos do projeto
- Histórico de projetos similares (se disponível)

## Elicitation

1. **Quem são as pessoas ou grupos que podem AFETAR ou ser AFETADOS pelo projeto?** Liste todos que vier à mente — internos e externos. (Dica: pense em quem aprova, quem executa, quem usa, quem paga, quem fiscaliza, quem pode bloquear)
2. **Para cada stakeholder, qual é o papel e a relação com o projeto?** (ex: "João Silva — Diretor de TI, Sponsor do projeto", "Equipe de Operações — usuários finais do sistema")
3. **Quais stakeholders têm PODER de influenciar ou aprovar decisões importantes do projeto?** (ex: poder de aprovar orçamento, cancelar o projeto, mudar requisitos)
4. **Quais stakeholders têm alto INTERESSE no resultado do projeto?** (quem mais se beneficia ou sofre com o projeto?)
5. **Como você avalia o nível de engajamento ATUAL de cada stakeholder?** Escolha para cada um:
   - Desinformado (Unaware) — não sabe do projeto
   - Resistente (Resistant) — sabe e se opõe
   - Neutro (Neutral) — sabe mas não apoia nem resiste
   - Apoiador (Supportive) — apoia mas não lidera
   - Líder (Champion) — apoia ativamente e engaja outros
6. **Qual é o nível de engajamento DESEJADO para cada stakeholder?** (nem sempre o máximo é o ideal — um regulador Neutro pode ser suficiente)
7. **Existem stakeholders com expectativas conflitantes entre si?** (ex: "O cliente quer mais funcionalidades, o Sponsor quer cortar orçamento")
8. **Quais stakeholders têm mais risco de resistência ao projeto?** Por que? O que pode causar oposição?
9. **Há stakeholders externos importantes?** (ex: órgãos reguladores, auditores, comunidade afetada, imprensa, parceiros estratégicos)
10. **Que informações cada stakeholder precisa receber para manter/aumentar seu engajamento?** (Isso alimentará o Plano de Comunicações)
11. **Existem relações de poder ou influência entre os stakeholders?** (ex: "O VP de Marketing tem mais influência sobre o Sponsor do que parece")

## Process

1. **Listar todos os stakeholders identificados** — Incluir internos, externos, individuais e grupos.
2. **Coletar informações básicas** — Para cada stakeholder: nome/grupo, organização, cargo, papel no projeto, informações de contato.
3. **Avaliar Poder** — Classificar o nível de poder/influência de cada stakeholder sobre o projeto (1-5 ou Alto/Médio/Baixo).
4. **Avaliar Interesse** — Classificar o nível de interesse no resultado do projeto (1-5 ou Alto/Médio/Baixo).
5. **Mapear na Grade Poder/Interesse** — Plotar cada stakeholder nos quadrantes: Gerenciar de Perto / Manter Satisfeito / Manter Informado / Monitorar.
6. **Avaliar engajamento atual e desejado** — Para cada stakeholder, registrar o gap entre situação atual e desejada.
7. **Identificar influências e relações** — Mapear influenciadores informais e relações entre stakeholders.
8. **Criar estratégias de engajamento** — Para stakeholders com gap significativo, definir ações concretas.
9. **Priorizar stakeholders** — Focar esforço nos de alto poder e/ou alto interesse.
10. **Integrar com Plano de Comunicações** — Alimentar necessidades de comunicação por stakeholder.
11. **Montar documento final** — Registro completo + Grade + Plano de Engajamento.

## Output

```
# REGISTRO DE STAKEHOLDERS E PLANO DE ENGAJAMENTO
## {Nome do Projeto}

**Versão:** 1.0 | **Data:** {data} | **Gerente de Projeto:** {nome}

---

## 1. REGISTRO DE STAKEHOLDERS

| ID  | Nome / Grupo              | Organização / Área   | Cargo / Papel            | Tipo     | Contato              | Papel no Projeto              |
|-----|---------------------------|----------------------|--------------------------|----------|----------------------|-------------------------------|
| S01 | {Nome}                    | {empresa/depto}      | {cargo}                  | Interno  | {email/telefone}     | Patrocinador — decisões finais|
| S02 | {Nome / Grupo}            | {empresa/depto}      | {cargo}                  | Interno  | {email/telefone}     | Equipe — execução do projeto  |
| S03 | {Nome}                    | {empresa/depto}      | {cargo}                  | Externo  | {email/telefone}     | Cliente — receptor das entregas|
| S04 | {Nome / Grupo}            | {empresa/depto}      | {cargo}                  | Externo  | {email/telefone}     | Regulador — fiscalização      |
| S0N | {Nome / Grupo}            | {empresa/depto}      | {cargo}                  | {tipo}   | {email/telefone}     | {papel}                       |

---

## 2. ANÁLISE DE PODER E INTERESSE

| ID  | Stakeholder           | Poder (1-5) | Interesse (1-5) | Quadrante           | Estratégia Geral          |
|-----|-----------------------|-------------|-----------------|---------------------|---------------------------|
| S01 | {Patrocinador}        | 5           | 5               | GERENCIAR DE PERTO  | Engajamento máximo, decisões compartilhadas |
| S02 | {Equipe do Projeto}   | 3           | 5               | GERENCIAR DE PERTO  | Comunicação frequente, alinhamento diário |
| S03 | {Cliente Final}       | 4           | 5               | GERENCIAR DE PERTO  | Validações regulares, demos frequentes |
| S04 | {Diretor de Área}     | 5           | 2               | MANTER SATISFEITO   | Comunicações executivas, relatórios de status |
| S05 | {Usuários Finais}     | 2           | 5               | MANTER INFORMADO    | Newsletters, demos, treinamentos |
| S06 | {Regulador / Auditor} | 4           | 2               | MANTER SATISFEITO   | Conformidade, relatórios de auditoria |
| S07 | {Equipe de TI Infra}  | 2           | 2               | MONITORAR           | Comunicação pontual, informar mudanças relevantes |

**Quadrantes da Grade Poder/Interesse:**
- **GERENCIAR DE PERTO** (Alto Poder + Alto Interesse): Envolver ativamente, comunicação frequente
- **MANTER SATISFEITO** (Alto Poder + Baixo Interesse): Informar sobre impactos, evitar insatisfação
- **MANTER INFORMADO** (Baixo Poder + Alto Interesse): Comunicar regularmente, coletar feedback
- **MONITORAR** (Baixo Poder + Baixo Interesse): Acompanhar passivamente, comunicação básica

---

## 3. GRADE PODER / INTERESSE (Visual)

```
PODER
  ^
5 | [S06 Regulador]    [S04 Dir. Área]   | [S01 Sponsor]    [S03 Cliente]
  |  MANTER SATISFEITO                    | GERENCIAR DE PERTO
4 |                                       |
  |                                       |
3 |                                       | [S02 Equipe]
  |                                       |
2 | [S07 TI Infra]                        | [S05 Usuários Finais]
  |  MONITORAR                            | MANTER INFORMADO
1 |                                       |
  +------------------------------------------------> INTERESSE
  1         2         3         4         5
```

---

## 4. ANÁLISE DE ENGAJAMENTO

**Escala:** D=Desinformado | R=Resistente | N=Neutro | A=Apoiador | L=Líder

| ID  | Stakeholder           | Engajamento ATUAL | Engajamento DESEJADO | Gap | Urgência |
|-----|-----------------------|-------------------|----------------------|-----|----------|
| S01 | {Patrocinador}        | A (Apoiador)      | L (Líder)            | +1  | Média    |
| S02 | {Equipe do Projeto}   | A (Apoiador)      | L (Líder)            | +1  | Alta     |
| S03 | {Cliente Final}       | N (Neutro)        | A (Apoiador)         | +2  | Alta     |
| S04 | {Diretor de Área}     | D (Desinformado)  | N (Neutro)           | +2  | Média    |
| S05 | {Usuários Finais}     | R (Resistente)    | A (Apoiador)         | +3  | CRÍTICA  |
| S06 | {Regulador}           | N (Neutro)        | N (Neutro)           | 0   | Baixa    |

*Gap positivo = precisa aumentar engajamento. Gap negativo = stakeholder muito engajado (pode querer controlar em excesso).*

---

## 5. PLANO DE ENGAJAMENTO DE STAKEHOLDERS

| ID  | Stakeholder           | Gap | Estratégias de Engajamento                                                  | Responsável | Prazo      |
|-----|-----------------------|-----|-----------------------------------------------------------------------------|-------------|------------|
| S05 | {Usuários Finais}     | +3  | 1. Workshops de co-criação nos primeiros 30 dias. 2. Demonstrações mensais. 3. Canal direto de feedback. 4. Envolver na validação de protótipos. | GP | {data} |
| S03 | {Cliente Final}       | +2  | 1. Reunião de alinhamento semanal. 2. Acesso ao painel de progresso. 3. Sprint Reviews com demos ao vivo. | GP | {data} |
| S04 | {Diretor de Área}     | +2  | 1. Briefing executivo no kickoff. 2. Relatório mensal de status (1 página). 3. Comunicar impactos antes que cheguem ao seu nível. | GP | {data} |
| S01 | {Patrocinador}        | +1  | 1. Incluir nas decisões estratégicas. 2. Compartilhar riscos abertamente. 3. Pedir advocacy interno. | GP | {data} |
| S02 | {Equipe do Projeto}   | +1  | 1. Cerimônias de sprint regulares. 2. Reconhecimento de conquistas. 3. Autonomia e tomada de decisão técnica. | GP | {data} |

---

## 6. RISCOS DE STAKEHOLDERS

| ID  | Stakeholder       | Risco de Engajamento                              | Impacto | Ação Preventiva                             |
|-----|-------------------|---------------------------------------------------|---------|---------------------------------------------|
| S05 | {Usuários Finais} | Resistência ao change management pode bloquear adoção | Alto  | Programa de gestão de mudança desde o início|
| S04 | {Diretor de Área} | Falta de informação pode virar oposição ativa    | Alto    | Briefing regular, não deixar ser surpreso   |
| S0N | {Stakeholder N}   | {risco específico}                                | {nível} | {ação preventiva}                           |

---

## 7. MAPA DE INFLUÊNCIAS

Relações de influência entre stakeholders relevantes para o projeto:

- {Sponsor S01} tem influência direta sobre → {Diretor de Área S04}
- {Cliente S03} influencia expectativas de → {Usuários Finais S05}
- {Regulador S06} define restrições que afetam → todos os stakeholders
- {Usuários Finais S05}: formadores de opinião internos, influenciam a adoção

*Estratégia: Usar {S01 Sponsor} para influenciar {S04 Diretor de Área}. Envolver {S03 Cliente} como aliado para converter {S05 Usuários}.*

---

## 8. INTEGRAÇÃO COM PLANO DE COMUNICAÇÕES

| Stakeholder           | Canal Preferido         | Frequência    | Tipo de Conteúdo                       |
|-----------------------|-------------------------|---------------|----------------------------------------|
| {Patrocinador}        | E-mail + reunião mensal | Semanal       | Status executivo, riscos críticos      |
| {Equipe}              | Slack / Teams + daily   | Diária        | Tarefas, bloqueios, atualizações técnicas|
| {Cliente}             | Videoconferência        | Quinzenal     | Demonstrações, validações, feedback    |
| {Diretor de Área}     | E-mail                  | Mensal        | Relatório de 1 página, impactos        |
| {Usuários Finais}     | Newsletter + workshops  | Mensal        | Benefícios, como usar, novidades       |
| {Regulador}           | Documentação formal     | Por exigência | Relatórios de conformidade             |
```

## PMBOK Reference
- **Grupo de Processos:** Iniciação e Planejamento
- **Área de Conhecimento:** Gerenciamento dos Stakeholders do Projeto (Project Stakeholder Management)
- **Processos PMBOK:**
  - 13.1 — Identificar os Stakeholders (Identify Stakeholders) — gera o Registro de Stakeholders
  - 13.2 — Planejar o Engajamento dos Stakeholders (Plan Stakeholder Engagement) — gera o Plano de Engajamento
  - 13.3 — Gerenciar o Engajamento dos Stakeholders (referência para execução)
  - 13.4 — Monitorar o Engajamento dos Stakeholders (referência para controle)
- **Ferramentas principais:** Grade Poder/Interesse, Modelo de Classificação de Stakeholders, Matriz de Avaliação de Engajamento
- **Insight-chave:** Stakeholders devem ser identificados o mais cedo possível — mais difícil e custoso engajá-los depois que o projeto já começou
