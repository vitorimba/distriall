# Task: Criar Cronograma do Projeto

## Metadata
- **id**: create-schedule
- **agent**: schedule-manager
- **elicit**: true
- **version**: 1.0.0

## Description
Desenvolve o cronograma completo do projeto a partir dos pacotes de trabalho da WBS, incluindo: lista de atividades com durações, sequenciamento lógico com dependências, análise do caminho crítico (CPM), marcos do projeto e um Gantt em formato texto. O cronograma é a linha de base temporal do projeto e permite ao gerente monitorar se o projeto está no prazo. Estudantes aprendem a decompor entregas em atividades, estimar durações, identificar dependências e calcular o caminho crítico manualmente.

## Inputs
- Entregas e pacotes de trabalho da WBS (ou lista de deliverables se não houver WBS formal)
- Estimativas de duração por atividade (ou dados para estimá-las)
- Dependências entre atividades
- Recursos disponíveis e suas restrições de disponibilidade
- Data de início do projeto
- Marcos obrigatórios (datas fixas)
- Calendário do projeto (dias úteis, feriados, horários)

## Elicitation

1. **Quais são as entregas principais ou pacotes de trabalho do projeto?** (Cole a WBS se já tiver, ou liste as grandes entregas)
2. **Qual é a data de início prevista do projeto?**
3. **Existe uma data de término obrigatória (deadline fixo)?** Se sim, qual?
4. **Como você prefere estimar as durações?** Escolha:
   - (A) Estimativa análoga — baseada em projetos similares anteriores
   - (B) Estimativa paramétrica — usando uma métrica (ex: X horas por tela de sistema)
   - (C) Estimativa de três pontos — otimista, mais provável, pessimista (PERT)
   - (D) Eu vou informar as durações diretamente
5. **Para cada entrega principal, estime a duração total.** (ex: "Módulo de Login: 2 semanas", "Testes de integração: 5 dias")
6. **Quais atividades podem ser feitas em paralelo?** E quais têm dependência obrigatória (uma precisa terminar antes da outra começar)?
7. **Quais são os marcos obrigatórios do projeto?** (ex: "Aprovação do design: 15/04", "Go-live: 01/07")
8. **Qual é o calendário de trabalho?** (ex: "Segunda a sexta, 8h/dia" ou "Segunda a sábado, com feriados X e Y")
9. **Existem recursos com disponibilidade limitada que afetam o cronograma?** (ex: "Dev sênior disponível apenas 50% do tempo", "Cliente disponível apenas às terças para revisões")
10. **Qual nível de detalhe você precisa no Gantt?** Escolha: Semanal / Quinzenal / Por sprint (2 semanas) / Mensal

## Process

1. **Importar ou criar lista de pacotes de trabalho** — Usar a WBS se disponível, ou estruturar a partir das entregas informadas.
2. **Decompor em atividades** — Para cada pacote de trabalho, definir as atividades necessárias (decomposição adicional quando necessário).
3. **Estimar durações** — Aplicar o método escolhido pelo usuário para cada atividade; usar PERT se três pontos forem fornecidos: `DE = (O + 4M + P) / 6`.
4. **Sequenciar atividades** — Definir dependências (FS, FF, SS, SF) e identificar o tipo: mandatória, discricionária ou externa.
5. **Calcular datas de início/término** — Aplicar o algoritmo de Forward Pass (cálculo para frente) para datas ES/EF.
6. **Calcular folgas (Float)** — Aplicar Backward Pass (cálculo para trás) para datas LS/LF e calcular Total Float = LS - ES.
7. **Identificar Caminho Crítico** — Listar atividades com Float = 0 (são as atividades do caminho crítico).
8. **Verificar marcos** — Confirmar que datas obrigatórias são atendidas; alertar se houver conflito.
9. **Gerar Gantt textual** — Criar representação visual em texto com semanas/sprints como colunas.
10. **Calcular duração total** — Somar do início ao fim pelo caminho crítico.
11. **Entregar cronograma completo** — Lista de atividades + Gantt + análise do caminho crítico.

## Output

```
# CRONOGRAMA DO PROJETO
## {Nome do Projeto}

**Data de Início:** {data} | **Data de Término Prevista:** {data} | **Duração Total:** {N semanas/meses}

---

## 1. LISTA DE ATIVIDADES

| ID  | Atividade                        | Duração | Predecessores | ES         | EF         | LS         | LF         | Float | Crítica? |
|-----|----------------------------------|---------|---------------|------------|------------|------------|------------|-------|----------|
| A1  | {nome da atividade}              | {Nd}    | —             | {data}     | {data}     | {data}     | {data}     | 0d    | SIM      |
| A2  | {nome da atividade}              | {Nd}    | A1            | {data}     | {data}     | {data}     | {data}     | 2d    | NÃO      |
| ...                                                                                                                                |

**Legenda:** ES=Início Cedo | EF=Fim Cedo | LS=Início Tarde | LF=Fim Tarde | Float=Folga Total | d=dias

---

## 2. MARCOS DO PROJETO

| Marco                           | Data Prevista | Status    | Observação               |
|---------------------------------|---------------|-----------|--------------------------|
| M1 — Kickoff realizado          | {data}        | Pendente  |                          |
| M2 — {marco}                    | {data}        | Pendente  |                          |
| MN — Encerramento formal        | {data}        | Pendente  |                          |

---

## 3. CAMINHO CRÍTICO

**Sequência:** {A1} → {A3} → {A5} → {A7} → {A9}
**Duração do Caminho Crítico:** {N dias/semanas}
**Interpretação:** Qualquer atraso nestas atividades atrasará a data de término do projeto.

---

## 4. CRONOGRAMA — GRÁFICO DE GANTT (Texto)

```
Atividade                    | Sem1 | Sem2 | Sem3 | Sem4 | Sem5 | Sem6 | SemN |
-----------------------------|------|------|------|------|------|------|------|
{A1} {nome}                  | ████ | ████ |      |      |      |      |      |
{A2} {nome}                  |      | ██   | ████ |      |      |      |      |
{A3} {nome} [CRÍTICA]        |      |      | ████ | ████ |      |      |      |
{A4} {nome}                  |      |      |      | ██   | ██   |      |      |
{M1} MARCO: {nome}           |      |      |      | ◆    |      |      |      |
{A5} {nome} [CRÍTICA]        |      |      |      |      | ████ | ████ |      |

Legenda: ████ = trabalho ativo | ◆ = marco | [CRÍTICA] = caminho crítico
```

---

## 5. ANÁLISE DE RESERVAS
- **Reserva de Contingência:** {N dias} ({X}% da duração total) — para riscos identificados
- **Reserva Gerencial:** {N dias} — para incertezas desconhecidas (sob autoridade do sponsor)
- **Data de Término com Reservas:** {data ajustada}
```

## PMBOK Reference
- **Grupo de Processos:** Planejamento (Planning Process Group)
- **Área de Conhecimento:** Gerenciamento do Cronograma do Projeto (Project Schedule Management)
- **Processos PMBOK:**
  - 6.1 — Planejar o Gerenciamento do Cronograma
  - 6.2 — Definir as Atividades (lista de atividades)
  - 6.3 — Sequenciar as Atividades (dependências e PDM)
  - 6.4 — Estimar as Durações das Atividades (analogia, paramétrica, PERT)
  - 6.5 — Desenvolver o Cronograma (CPM, Gantt, linha de base)
  - 6.6 — Controlar o Cronograma (referência para fase de execução)
- **Técnicas principais:** Método do Caminho Crítico (CPM), PERT, Diagrama de Precedência (PDM)
