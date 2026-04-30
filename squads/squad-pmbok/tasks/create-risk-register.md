# Task: Criar Registro de Riscos

## Metadata
- **id**: create-risk-register
- **agent**: risk-manager
- **elicit**: true
- **version**: 1.0.0

## Description
Realiza o planejamento completo do gerenciamento de riscos, incluindo: identificação de riscos, análise qualitativa (Matriz de Probabilidade × Impacto), priorização e estratégias de resposta. O gerenciamento proativo de riscos é um dos diferenciais entre projetos bem-sucedidos e fracassados. Estudantes aprendem a identificar ameaças e oportunidades, a calcular a pontuação de risco (Risk Score), a construir a Matriz P×I e a formular respostas eficazes para os riscos priorizados.

## Inputs
- Contexto do projeto (objetivos, escopo, cronograma, orçamento)
- Riscos já identificados pelo usuário
- Categorias de risco a explorar
- Tolerância a risco da organização/projeto (apetite de risco)
- Valor total do projeto (para calcular impacto financeiro)

## Elicitation

1. **Quais riscos você já identificou para o projeto?** Liste todos que vierem à mente, mesmo que vagos. (ex: "o fornecedor pode atrasar", "a equipe não tem experiência com a tecnologia X", "o cliente pode mudar os requisitos no meio do projeto")
2. **Qual é o orçamento total do projeto?** (Usaremos para calcular o impacto financeiro dos riscos)
3. **Qual é a tolerância a risco do projeto ou organização?** Escolha:
   - (A) Avessa — prefere evitar riscos mesmo que isso aumente custos
   - (B) Neutra — aceita riscos moderados se o retorno justificar
   - (C) Tolerante — aceita riscos altos em busca de maiores resultados
4. **Quais categorias de risco são mais relevantes para este projeto?** Marque todas que se aplicam:
   - [ ] Técnico (tecnologia, integração, desempenho)
   - [ ] Externo (mercado, regulação, fornecedores, clima)
   - [ ] Organizacional (recursos, prioridades, mudança de gestão)
   - [ ] Gerenciamento de Projeto (escopo, prazo, custo, qualidade)
   - [ ] Segurança da Informação (dados, acesso, compliance)
   - [ ] {Categoria específica do seu domínio}
5. **Existem dependências externas críticas no projeto?** (ex: aprovações regulatórias, entregas de terceiros, decisões de outros projetos)
6. **Há oportunidades (riscos positivos) que o projeto pode explorar?** (ex: "se o time aprender a tecnologia X, pode acelerar fases futuras")
7. **Qual é a escala para avaliar probabilidade?** Escolha:
   - (A) 3 níveis: Baixo (1-33%) / Médio (34-66%) / Alto (67-99%)
   - (B) 5 níveis: Muito Baixo / Baixo / Médio / Alto / Muito Alto
8. **Qual é a escala para avaliar impacto?** Escolha: mesma escala da probabilidade (3 ou 5 níveis).
9. **Quem deve ser envolvido na análise de riscos além do gerente?** (ex: especialistas técnicos, cliente, equipe)
10. **Com que frequência o registro de riscos deve ser revisado?** (ex: semanalmente, por sprint, mensalmente)

## Process

1. **Estruturar RBS (Risk Breakdown Structure)** — Organizar as categorias de risco do projeto em hierarquia.
2. **Identificar riscos por categoria** — Para cada categoria relevante, gerar lista de riscos usando: brainstorming, checklist, análise de premissas, revisão de projetos anteriores.
3. **Registrar riscos identificados** — Para cada risco: ID, descrição no formato "Causa → Risco → Impacto", categoria, data de identificação.
4. **Avaliar probabilidade** — Atribuir valor de probabilidade (P) a cada risco na escala escolhida.
5. **Avaliar impacto** — Atribuir valor de impacto (I) em cada dimensão: custo, prazo, escopo, qualidade.
6. **Calcular Risk Score** — `Score = P × I` para cada risco.
7. **Construir Matriz P×I** — Plotar riscos na matriz para visualização; identificar zona vermelha (alta prioridade), amarela (monitorar) e verde (aceitar).
8. **Priorizar riscos** — Ordenar por score decrescente; focar respostas nos top 5-10 riscos.
9. **Definir estratégias de resposta** — Para ameaças: Evitar / Transferir / Mitigar / Aceitar. Para oportunidades: Explorar / Compartilhar / Melhorar / Aceitar.
10. **Calcular Valor Monetário Esperado (VME/EMV)** — Para riscos com impacto financeiro significativo.
11. **Designar Risk Owner** — Atribuir um responsável por monitorar cada risco.
12. **Montar o Registro de Riscos completo** — Consolidar todos os dados no documento final.

## Output

```
# REGISTRO DE RISCOS DO PROJETO
## {Nome do Projeto}

**Versão:** 1.0 | **Data:** {data} | **Risk Manager:** {nome} | **Atualização:** {frequência}

---

## 1. ESTRUTURA ANALÍTICA DE RISCOS (RBS)

```
Riscos do Projeto
├── 1. Técnico
│   ├── 1.1 Tecnologia (novas tecnologias, integração)
│   ├── 1.2 Desempenho e Confiabilidade
│   └── 1.3 Segurança
├── 2. Externo
│   ├── 2.1 Fornecedores e Parceiros
│   ├── 2.2 Regulatório e Legal
│   └── 2.3 Mercado e Competidores
├── 3. Organizacional
│   ├── 3.1 Recursos Humanos
│   ├── 3.2 Prioridades e Financiamento
│   └── 3.3 Dependências Internas
└── 4. Gerenciamento de Projeto
    ├── 4.1 Escopo (Scope Creep)
    ├── 4.2 Estimativas (Cronograma e Custo)
    └── 4.3 Comunicação e Stakeholders
```

---

## 2. MATRIZ DE PROBABILIDADE × IMPACTO

**Escala: 1=Muito Baixo | 2=Baixo | 3=Médio | 4=Alto | 5=Muito Alto**

```
IMPACTO →      1-MB   2-B    3-M    4-A    5-MA
PROBABILIDADE
5 - Muito Alta | 5   | 10   | 15   | 20   | 25 |  ← CRÍTICO
4 - Alta       | 4   |  8   | 12   | 16   | 20 |  ← ALTO
3 - Média      | 3   |  6   |  9   | 12   | 15 |  ← MÉDIO
2 - Baixa      | 2   |  4   |  6   |  8   | 10 |  ← BAIXO
1 - Muito Baixa| 1   |  2   |  3   |  4   |  5 |  ← MUITO BAIXO

ZONA VERMELHA (Score ≥ 15): Resposta imediata
ZONA AMARELA (Score 8-12): Monitorar ativamente
ZONA VERDE (Score ≤ 6): Aceitar / monitorar passivamente
```

---

## 3. REGISTRO DE RISCOS

| ID   | Descrição do Risco                                    | Cat. | Causa               | Impacto Potencial              | P  | I  | Score | Zona    | Tipo      |
|------|-------------------------------------------------------|------|---------------------|--------------------------------|----|----|-------|---------|-----------|
| R001 | {Causa X} pode levar a {evento Y} resultando em {Z}  | Téc  | {causa raiz}        | Atraso de {N} semanas          | 4  | 4  | 16    | VERM.   | Ameaça    |
| R002 | {Causa A} pode resultar em {evento B} impactando {C} | Ext  | {causa raiz}        | Custo adicional de R$ {valor}  | 3  | 4  | 12    | AMAR.   | Ameaça    |
| R003 | {Oportunidade}                                        | Org  | {gatilho positivo}  | Redução de custo em {X}%       | 2  | 4  | 8     | AMAR.   | Oportunid.|
| R004 | {risco}                                               | GP   | {causa}             | {impacto}                      | 2  | 2  | 4     | VERDE   | Ameaça    |
| R0NN | ...                                                   | ...  | ...                 | ...                            | ...| ...| ...   | ...     | ...       |

**Legenda P (Probabilidade):** 1=Muito Baixa (<10%) | 2=Baixa (11-30%) | 3=Média (31-50%) | 4=Alta (51-70%) | 5=Muito Alta (>70%)
**Legenda I (Impacto):** 1=Muito Baixo | 2=Baixo | 3=Médio | 4=Alto | 5=Muito Alto

---

## 4. PLANO DE RESPOSTA AOS RISCOS (TOP Prioritários)

| ID   | Risco (Resumo)             | Score | Estratégia  | Ação de Resposta                                          | Risk Owner | Prazo      | Custo Est.    |
|------|----------------------------|-------|-------------|-----------------------------------------------------------|------------|------------|---------------|
| R001 | {resumo}                   | 16    | Mitigar     | {ação concreta: ex: "Iniciar capacitação da equipe em X com 4 semanas de antecedência"} | {nome} | {data} | R$ {valor} |
| R002 | {resumo}                   | 12    | Transferir  | {ex: "Incluir cláusula de SLA no contrato com fornecedor, com multa por atraso"}        | {nome} | {data} | N/A        |
| R003 | {oportunidade}             | 8     | Melhorar    | {ex: "Alocar 20% do time para aprender tecnologia X nas primeiras 2 semanas"}           | {nome} | {data} | R$ {valor} |

**Estratégias para Ameaças:**
- **Evitar (Avoid):** Eliminar a ameaça mudando o plano do projeto
- **Transferir (Transfer):** Passar o impacto para terceiro (seguro, contrato)
- **Mitigar (Mitigate):** Reduzir probabilidade e/ou impacto
- **Aceitar (Accept):** Reconhecer e monitorar, com ou sem reserva de contingência

**Estratégias para Oportunidades:**
- **Explorar (Exploit):** Garantir que a oportunidade se materialize
- **Compartilhar (Share):** Parceria para capturar a oportunidade
- **Melhorar (Enhance):** Aumentar probabilidade ou impacto positivo
- **Aceitar (Accept):** Aproveitar se acontecer, sem ação ativa

---

## 5. VALOR MONETÁRIO ESPERADO (EMV) — Riscos de Alto Impacto Financeiro

| ID   | Risco                     | Probabilidade | Impacto Financeiro | EMV = P × I       |
|------|---------------------------|---------------|--------------------|-------------------|
| R001 | {risco}                   | {X}%          | R$ {valor}         | R$ {resultado}    |
| R002 | {risco}                   | {X}%          | R$ {valor}         | R$ {resultado}    |
| **Total EMV de Ameaças**  |               |                    | **R$ {total}**    |
| R003 | {oportunidade}            | {X}%          | R$ {valor+}        | R$ {resultado}    |
| **Reserva de Contingência sugerida:**  |          |                    | **R$ {total ameaças}** |

---

## 6. GATILHOS (RISK TRIGGERS)

| ID   | Risco             | Gatilho (Sinal de Alerta)                                        |
|------|-------------------|------------------------------------------------------------------|
| R001 | {risco}           | {ex: "Fornecedor não confirma entrega até {data X}"}             |
| R002 | {risco}           | {ex: "Variação de custo > 10% por 2 semanas consecutivas"}       |

---

## 7. RISCOS RESIDUAIS E SECUNDÁRIOS

- **Risco Residual:** Risco remanescente após a aplicação da resposta planejada
- **Risco Secundário:** Novo risco gerado pela própria ação de resposta

| ID Original | Resposta Aplicada   | Risco Residual                    | Risco Secundário               |
|-------------|---------------------|-----------------------------------|--------------------------------|
| R001        | {resposta}          | {o que ainda pode acontecer}      | {novo risco criado}            |
```

## PMBOK Reference
- **Grupo de Processos:** Planejamento (Planning Process Group)
- **Área de Conhecimento:** Gerenciamento dos Riscos do Projeto (Project Risk Management)
- **Processos PMBOK:**
  - 11.1 — Planejar o Gerenciamento dos Riscos
  - 11.2 — Identificar os Riscos (Brainstorming, Checklists, Análise de Premissas)
  - 11.3 — Realizar a Análise Qualitativa dos Riscos (Matriz P×I)
  - 11.4 — Realizar a Análise Quantitativa dos Riscos (EMV, Simulação Monte Carlo) — referência
  - 11.5 — Planejar as Respostas aos Riscos (Evitar/Transferir/Mitigar/Aceitar)
- **Conceitos-chave:** Risk Appetite, Risk Threshold, EMV, Riscos Residuais, Riscos Secundários, RBS
