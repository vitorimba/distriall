# Task: Estimar Custos e Orçamento do Projeto

## Metadata
- **id**: estimate-costs
- **agent**: cost-manager
- **elicit**: true
- **version**: 1.0.0

## Description
Realiza a estimativa de custos de cada atividade e recurso do projeto, consolida o orçamento total e estabelece a linha de base de custos (Cost Baseline) com reservas de contingência. O gerenciamento de custos garante que o projeto seja completado dentro do orçamento aprovado. Estudantes aprendem a distinguir tipos de custos, aplicar técnicas de estimativa, calcular o orçamento acumulado e entender o conceito de Earned Value Management (EVM) como ferramenta de controle.

## Inputs
- Lista de atividades com durações (vinda do cronograma)
- Recursos necessários por atividade (mão de obra, materiais, equipamentos, serviços)
- Taxas de custo dos recursos (custo/hora, custo unitário)
- Método de estimativa preferido
- Orçamento de alto nível já aprovado (se existir)
- Moeda do projeto e taxa de câmbio (se aplicável)
- Política organizacional para reservas

## Elicitation

1. **Qual é a moeda do projeto?** (ex: BRL — Real Brasileiro, USD — Dólar, EUR — Euro)
2. **Já existe um orçamento aprovado de alto nível?** Se sim, qual é o valor? Isso ajudará a calibrar as estimativas.
3. **Quais são as atividades ou pacotes de trabalho do projeto?** (Cole a lista do cronograma ou informe as principais entregas com suas atividades)
4. **Para cada atividade, quais recursos são necessários?** Informe: tipo de recurso (pessoa, ferramenta, serviço), quantidade e tempo de utilização.
   - Exemplos: "Dev sênior — 40h", "Licença de software — 3 meses a R$ 500/mês", "Servidor cloud — 6 meses a R$ 800/mês"
5. **Quais são as taxas de custo dos recursos humanos?** (ex: "Dev sênior: R$ 80/h", "QA: R$ 50/h", "Designer: R$ 60/h"). Se não souber, posso usar médias de mercado.
6. **Qual método de estimativa você prefere?**
   - (A) Estimativa Análoga — baseada em projeto similar
   - (B) Estimativa Paramétrica — custo por unidade de medida (ex: R$ X por tela desenvolvida)
   - (C) Estimativa Bottom-Up — soma de cada atividade individualmente (mais precisa)
   - (D) Estimativa de Três Pontos (PERT) — otimista, mais provável, pessimista
7. **Existem custos fixos ou indiretos?** (ex: aluguel de escritório, equipamentos compartilhados, overhead organizacional)
8. **Há itens de aquisição/terceirização previstos?** (ex: "Contratar empresa de design por R$ 15.000")
9. **Qual é a política para reserva de contingência?** (ex: "10% do custo total", "reserva específica por risco") Se não souber, usarei 10% como padrão.
10. **O projeto tem algum custo de qualidade previsto?** (ex: auditorias, ferramentas de teste, treinamentos)
11. **Como os custos serão distribuídos no tempo?** Existe sazonalidade ou grandes pagamentos pontuais?

## Process

1. **Importar atividades** — Estruturar lista de atividades com seus recursos associados.
2. **Calcular custo por atividade (Bottom-Up)** — Para cada atividade: `Custo = Σ (Quantidade × Taxa de Custo × Duração)`.
3. **Aplicar estimativa de três pontos (se selecionado)** — `CE = (Co + 4×Cm + Cp) / 6` onde Co=Otimista, Cm=Mais Provável, Cp=Pessimista.
4. **Agregar custos por pacote de trabalho** — Somar atividades dentro de cada WBS Package.
5. **Adicionar custos indiretos e overhead** — Incluir custos não diretamente atribuíveis a atividades específicas.
6. **Calcular reserva de contingência** — Baseada nos riscos identificados (se disponível) ou percentual definido.
7. **Calcular orçamento base (Cost Baseline)** — Custo direto + indireto + contingência = linha de base.
8. **Adicionar reserva gerencial** — Buffer extra sob controle do sponsor, geralmente 5-10% adicional.
9. **Gerar orçamento acumulado (S-curve)** — Distribuir custos ao longo do tempo do projeto.
10. **Verificar contra orçamento aprovado** — Comparar estimativa com budget já definido; sinalizar variações.
11. **Entregar tabela de custos, orçamento e análise**.

## Output

```
# ESTIMATIVA DE CUSTOS E ORÇAMENTO DO PROJETO
## {Nome do Projeto}

**Moeda:** {moeda} | **Data:** {data} | **Método:** {método utilizado}

---

## 1. ESTIMATIVA DE CUSTOS POR ATIVIDADE

| ID  | Atividade / Pacote         | Recurso                 | Qtd  | Taxa         | Duração | Custo Total    |
|-----|----------------------------|-------------------------|------|--------------|---------|----------------|
| A1  | {nome}                     | Dev Sênior              | 1    | R$ 80/h      | 40h     | R$ 3.200,00    |
| A1  | {nome}                     | Licença Ferramenta X    | 1    | R$ 500/mês   | 2 meses | R$ 1.000,00    |
| A2  | {nome}                     | Designer                | 1    | R$ 60/h      | 20h     | R$ 1.200,00    |
| ... | ...                        | ...                     | ...  | ...          | ...     | ...            |

**Subtotal Custos Diretos: R$ {valor}**

---

## 2. RESUMO DE CUSTOS POR CATEGORIA

| Categoria                     | Valor           | % do Total |
|-------------------------------|-----------------|------------|
| Mão de Obra (internos)        | R$ {valor}      | {X}%       |
| Serviços Terceirizados        | R$ {valor}      | {X}%       |
| Licenças e Ferramentas        | R$ {valor}      | {X}%       |
| Infraestrutura / Hospedagem   | R$ {valor}      | {X}%       |
| Custos Indiretos (Overhead)   | R$ {valor}      | {X}%       |
| **Subtotal**                  | **R$ {valor}**  | **100%**   |

---

## 3. ORÇAMENTO DO PROJETO (BUDGET)

| Componente                              | Valor           |
|-----------------------------------------|-----------------|
| Custo Direto Total                      | R$ {valor}      |
| Custos Indiretos                        | R$ {valor}      |
| **Subtotal (Custo do Projeto)**         | **R$ {valor}**  |
| Reserva de Contingência ({X}%)          | R$ {valor}      |
| **LINHA DE BASE DE CUSTOS (Baseline)**  | **R$ {valor}**  |
| Reserva Gerencial ({X}%)                | R$ {valor}      |
| **ORÇAMENTO TOTAL AUTORIZADO (BAC)**    | **R$ {valor}**  |

---

## 4. ANÁLISE DE RESERVAS

| Tipo                  | Base de Cálculo                        | Valor        |
|-----------------------|----------------------------------------|--------------|
| Contingência          | {método: X% ou risco específico}       | R$ {valor}   |
| Gerencial             | {X}% do custo do projeto               | R$ {valor}   |

---

## 5. DISTRIBUIÇÃO TEMPORAL DOS CUSTOS (S-Curve)

| Período        | Custo Previsto | Custo Acumulado | % do Total Acumulado |
|----------------|----------------|-----------------|----------------------|
| Mês 1          | R$ {valor}     | R$ {valor}      | {X}%                 |
| Mês 2          | R$ {valor}     | R$ {valor}      | {X}%                 |
| Mês N          | R$ {valor}     | R$ {valor}      | 100%                 |

---

## 6. COMPARAÇÃO COM ORÇAMENTO APROVADO

| Métrica                  | Valor               |
|--------------------------|---------------------|
| Orçamento Aprovado (Alto Nível) | R$ {valor}   |
| Estimativa Bottom-Up     | R$ {valor}          |
| Variação                 | R$ {valor} ({X}%)   |
| Status                   | DENTRO / ACIMA / ABAIXO do orçamento |

{Se acima: "ALERTA: Estimativa excede orçamento aprovado em R$ {valor}. Recomendações: [1] Reduzir escopo, [2] Negociar orçamento adicional, [3] Revisar estimativas"}

---

## 7. REFERÊNCIA EVM — INDICADORES DE CONTROLE FUTURO
Durante a execução, monitorar:
- **PV (Planned Value):** Custo orçado do trabalho planejado
- **EV (Earned Value):** Custo orçado do trabalho realizado
- **AC (Actual Cost):** Custo real incorrido
- **CPI (Cost Performance Index):** EV/AC — alvo > 1.0
- **SPI (Schedule Performance Index):** EV/PV — alvo > 1.0
```

## PMBOK Reference
- **Grupo de Processos:** Planejamento (Planning Process Group)
- **Área de Conhecimento:** Gerenciamento dos Custos do Projeto (Project Cost Management)
- **Processos PMBOK:**
  - 7.1 — Planejar o Gerenciamento dos Custos
  - 7.2 — Estimar os Custos (Bottom-Up, Análoga, Paramétrica, Três Pontos)
  - 7.3 — Determinar o Orçamento (Cost Baseline, BAC, S-Curve)
  - 7.4 — Controlar os Custos (EVM — referência para execução)
- **Conceitos-chave:** BAC, Cost Baseline, Reserva de Contingência, Reserva Gerencial, EVM
