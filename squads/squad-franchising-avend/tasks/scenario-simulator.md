# Task: Scenario Simulator — What-If Analysis

> **Task ID:** FA-TASK-013
> **Squad:** squad-franchising-avend (Avend Franquias)
> **Executor:** @franchise-financial + @franchise-growth
> **Tipo:** Análise de Cenários e Simulação
> **Versão:** 1.0
> **Última atualização:** 2026-03-13

---

## 1. Task Anatomy

| Campo | Valor |
|-------|-------|
| **id** | FA-TASK-013 |
| **name** | scenario-simulator |
| **description** | Simulador de cenários what-if para decisões estratégicas de crescimento, pricing e operações da rede Avend |
| **executor** | @franchise-financial (lead) + @franchise-growth (co-executor) |
| **dependencies** | `data/unit-economics-avend.yaml`, `data/abf-benchmarks.yaml`, `data/franchise-fee-benchmarks.yaml` |
| **inputs** | Cenário a simular, parâmetros de variação, horizonte temporal |
| **outputs** | Tabela comparativa de cenários, análise de risco, recomendação |
| **veto_conditions** | Dados financeiros desatualizados (> 90 dias), parâmetros fora de range válido |

---

## 2. Objetivo

Executar simulações what-if para apoiar decisões estratégicas da rede Avend Franquias. O simulador permite projetar impactos financeiros, operacionais e de crescimento sob diferentes cenários, fornecendo análise de risco quantitativa para embasar decisões de expansão, pricing e operações.

---

## 3. Quando Usar

| Situação | Cenário a Simular |
|----------|-------------------|
| Planejamento de expansão | Velocidade de crescimento da rede |
| Revisão de pricing | Ajuste de royalties ou taxas |
| Gestão de risco | Impacto de churn ou crise econômica |
| Planejamento financeiro | Projeção de receita da franqueadora |
| Negociação com investidor | Cenários de retorno sobre investimento |
| Decisão de multi-unidade | Economia de escala projetada |
| Revisão de fornecedores | Impacto de variação de COGS |
| Crise de mercado | Plano de contingência financeiro |

---

## 4. Pré-condições

### 4.1 Dados Necessários

- [ ] `data/unit-economics-avend.yaml` — atualizado nos últimos 90 dias
- [ ] `data/abf-benchmarks.yaml` — referência de mercado
- [ ] `data/franchise-fee-benchmarks.yaml` — benchmarks de taxas
- [ ] Dados reais da rede (se disponíveis): faturamento médio, nº de unidades, churn rate
- [ ] Cenário específico a ser simulado (input do solicitante)

### 4.2 Veto Conditions

A task NÃO deve ser executada se:

| Condição de Veto | Motivo | Resolução |
|-------------------|--------|-----------|
| Dados financeiros > 90 dias sem atualização | Resultados imprecisos | Atualizar unit economics primeiro |
| Parâmetros de variação > 200% do baseline | Resultados sem significado | Limitar a ranges realistas |
| Horizonte temporal > 60 meses | Incerteza muito alta | Máximo 5 anos para projeções |
| Sem cenário base definido | Sem referência para comparação | Definir baseline antes |
| Dados conflitantes entre fontes | Resultados inconsistentes | Reconciliar dados primeiro |

---

## 5. Cenários Disponíveis

### 5.1 Catálogo de Cenários

| ID | Cenário | Variáveis Principais | Complexidade |
|----|---------|---------------------|-------------|
| S01 | Velocidade de Expansão | Nº novas unidades/mês, custo de aquisição | MÉDIA |
| S02 | Ajuste de Royalties | % royalty, impacto no franqueado, retenção | ALTA |
| S03 | Taxa de Churn | % saída de franqueados, custo de reposição | ALTA |
| S04 | Crise Econômica | Queda de receita %, aumento COGS %, churn | ALTA |
| S05 | Aumento de COGS | % aumento custo produtos, repasse ao franqueado | MÉDIA |
| S06 | Expansão Geográfica | Estado-alvo, custo de entrada, prazo | MÉDIA |
| S07 | Multi-unidade Acelerado | % multifranqueados, desconto, economia escala | MÉDIA |
| S08 | Mudança de Mix | Novo tipo de máquina, ticket médio, investimento | MÉDIA |
| S09 | Guerra de Preços | Concorrente reduz preço, impacto volume | ALTA |
| S10 | Cenário Composto | Combinação de 2+ cenários acima | MUITO ALTA |

---

## 6. Metodologia de Simulação

### 6.1 Framework de Análise

```
1. DEFINIR CENÁRIO BASE (Baseline)
   ├── Situação atual da rede
   ├── Unit economics vigente
   └── Premissas padrão

2. DEFINIR VARIÁVEIS DE CENÁRIO
   ├── O que muda?
   ├── Em quanto muda? (range)
   └── Em quanto tempo?

3. CALCULAR IMPACTO DIRETO
   ├── Impacto financeiro (receita, custo, lucro)
   ├── Impacto operacional (unidades, franqueados)
   └── Impacto na rede (NPS, churn, crescimento)

4. CALCULAR IMPACTO INDIRETO (2ª ordem)
   ├── Efeitos cascata
   ├── Feedback loops
   └── Externalidades

5. ANÁLISE DE SENSIBILIDADE
   ├── Monte Carlo simplificado
   ├── Tornado chart (variáveis mais impactantes)
   └── Break-even de cada variável

6. COMPARAÇÃO E RECOMENDAÇÃO
   ├── Tabela comparativa
   ├── Risk-reward matrix
   └── Recomendação com justificativa
```

### 6.2 Monte Carlo Simplificado

**Conceito:** Em vez de calcular um único resultado por cenário, simular múltiplas iterações com variação aleatória nos parâmetros dentro de ranges definidos.

**Implementação:**

```
Para cada cenário:
  1. Definir distribuição de cada variável:
     - Receita: Normal(média, desvio 15%)
     - COGS: Normal(média, desvio 10%)
     - Churn: Uniforme(min, max)
     - Crescimento: Triangular(pessimista, realista, otimista)

  2. Executar N iterações (recomendado: 100-1000)
     Para cada iteração:
       - Sortear valor de cada variável dentro da distribuição
       - Calcular resultado financeiro
       - Registrar resultado

  3. Analisar distribuição de resultados:
     - Percentil 10 (pessimista): P10
     - Percentil 50 (mediana): P50
     - Percentil 90 (otimista): P90
     - Média e desvio padrão
     - Probabilidade de resultado negativo
```

**Quando usar Monte Carlo:**
- Cenários com 3+ variáveis interdependentes
- Decisões com investimento > R$ 100.000
- Cenários onde o range de incerteza é grande

**Quando usar análise determinística (simples):**
- Cenários com 1-2 variáveis
- Análise rápida para decisões operacionais
- Variáveis com baixa incerteza

### 6.3 Horizonte Temporal

| Tipo de Decisão | Horizonte | Granularidade |
|-----------------|-----------|---------------|
| Operacional | 1-6 meses | Mensal |
| Tático | 6-18 meses | Trimestral |
| Estratégico | 18-60 meses | Semestral/Anual |

---

## 7. Cenários Detalhados

### 7.1 S01 — Velocidade de Expansão

**Objetivo:** Simular o impacto de diferentes velocidades de crescimento da rede no resultado financeiro da franqueadora.

**Variáveis:**

| Variável | Baseline | Cenário A (Conservador) | Cenário B (Moderado) | Cenário C (Agressivo) |
|----------|----------|------------------------|---------------------|----------------------|
| Novas unidades/mês | 1 | 1 | 2 | 4 |
| Custo aquisição/franqueado | R$ 5.000 | R$ 5.000 | R$ 6.000 | R$ 8.000 |
| Receita taxa franquia | R$ 15.000 | R$ 15.000 | R$ 14.000 | R$ 12.000 |
| Tempo até break-even (unidade) | 14 meses | 14 meses | 14 meses | 16 meses |
| Churn ano 1 | 8% | 6% | 10% | 15% |
| Equipe suporte necessária | 1 | 1 | 2 | 4 |
| Custo equipe/mês | R$ 8.000 | R$ 8.000 | R$ 16.000 | R$ 32.000 |

**Cálculo (12 meses):**

```
Para cada cenário, calcular:

Receita Franqueadora =
  (Novas unidades × Taxa franquia) +
  (Total unidades ativas × Faturamento médio × Royalty%) +
  (Total unidades ativas × Faturamento médio × Fundo MKT%)

Custo Franqueadora =
  (Novas unidades × Custo aquisição) +
  (Equipe suporte × Custo/mês × 12) +
  (Custos fixos franqueadora × 12) +
  (Churn × Custo de reposição)

Lucro Franqueadora = Receita - Custo

ROIC = Lucro / Investimento total (incluindo equipe)
```

**Output esperado:**

```
SIMULAÇÃO S01 — Velocidade de Expansão (12 meses)

                    | Conservador | Moderado | Agressivo |
--------------------|------------|----------|-----------|
Novas unidades      | 12         | 24       | 48        |
Unidades ativas M12 | 11         | 22       | 41        |
Receita taxas       | R$ 180k    | R$ 336k  | R$ 576k   |
Receita royalties   | R$ 46k     | R$ 92k   | R$ 172k   |
Receita fundo MKT   | R$ 18k     | R$ 37k   | R$ 69k    |
RECEITA TOTAL       | R$ 244k    | R$ 465k  | R$ 817k   |
Custo aquisição     | R$ 60k     | R$ 144k  | R$ 384k   |
Custo equipe        | R$ 96k     | R$ 192k  | R$ 384k   |
Custo churn repos.  | R$ 5k      | R$ 14k   | R$ 48k    |
CUSTO TOTAL         | R$ 161k    | R$ 350k  | R$ 816k   |
LUCRO               | R$ 83k     | R$ 115k  | R$ 1k     |
Margem              | 34%        | 25%      | 0.1%      |
Break-even rede     | Mês 5      | Mês 8    | Mês 18    |

RISCO: 🟢 Baixo      🟡 Médio     🔴 Alto
```

**Análise:**
- Conservador: menor receita, mas maior margem e menor risco
- Moderado: bom equilíbrio receita/risco
- Agressivo: receita alta, mas margem quase zero e alto risco de caixa

---

### 7.2 S02 — Ajuste de Royalties

**Objetivo:** Simular o impacto de mudanças na taxa de royalty sobre a receita da franqueadora e a retenção de franqueados.

**Variáveis:**

| Variável | Baseline (5%) | Cenário A (4%) | Cenário B (6%) | Cenário C (7%) |
|----------|--------------|---------------|---------------|---------------|
| Royalty | 5.0% | 4.0% | 6.0% | 7.0% |
| Impacto NPS franqueado | 0 | +10 | -5 | -15 |
| Impacto churn | 0% | -2pp | +1pp | +3pp |
| Impacto recrutamento | 0% | +15% leads | -5% leads | -15% leads |
| Margem franqueado | 30.8% | 32.0% | 29.5% | 28.3% |

**Modelo de elasticidade:**

```
Elasticidade de churn em relação a royalty:
  ΔChurn = β × ΔRoyalty
  β estimado: 1.5 (cada 1pp de aumento = 1.5pp de aumento em churn)

Elasticidade de recrutamento:
  ΔRecrutamento = γ × ΔRoyalty
  γ estimado: -3.0 (cada 1pp de aumento = -3% em leads qualificados)

Elasticidade de NPS:
  ΔNPS = δ × ΔRoyalty
  δ estimado: -5 (cada 1pp de aumento = -5 pontos de NPS)
```

**Horizonte:** 24 meses

**Output esperado:**

```
SIMULAÇÃO S02 — Ajuste de Royalties (24 meses, base 30 unidades)

                    | 4% Royalty | 5% (atual) | 6% Royalty | 7% Royalty |
--------------------|-----------|------------|-----------|-----------|
Royalty/unidade/mês | R$ 480    | R$ 600     | R$ 720    | R$ 840    |
Receita royalty 24m | R$ 311k   | R$ 389k    | R$ 449k   | R$ 487k   |
Unidades ativas M24 | 35        | 30         | 27        | 23        |
Churn acumulado     | 6%        | 8%         | 9.5%      | 11%       |
NPS franqueados     | 52        | 42         | 37        | 27        |
Receita TOTAL 24m   | R$ 690k   | R$ 778k    | R$ 810k   | R$ 762k   |
Custo reposição     | R$ 15k    | R$ 24k     | R$ 33k    | R$ 48k    |
LUCRO NET 24m       | R$ 520k   | R$ 570k    | R$ 565k   | R$ 480k   |

RECOMENDAÇÃO: Manter 5% (melhor equilíbrio lucro/retenção)
              Considerar 4% APENAS para multi-unidade (incentivo)
```

---

### 7.3 S03 — Taxa de Churn

**Objetivo:** Simular o impacto de diferentes taxas de saída de franqueados no resultado da rede.

**Variáveis:**

| Variável | Baseline | Cenário A | Cenário B | Cenário C |
|----------|----------|-----------|-----------|-----------|
| Churn anual | 8% | 5% (otimista) | 12% (pessimista) | 20% (crise) |
| Custo por saída | R$ 15.000 | R$ 15.000 | R$ 15.000 | R$ 20.000 |
| Tempo para repor | 3 meses | 2 meses | 4 meses | 6 meses |
| Receita perdida/vaga | R$ 600/mês | R$ 600/mês | R$ 600/mês | R$ 600/mês |

**Fórmula de impacto:**

```
Custo total do churn (anual) =
  (Nº unidades × Churn%) × (Custo por saída + Receita perdida × Meses para repor)

Unidades ativas líquidas =
  Unidades início + Novas - (Unidades início × Churn%)

Receita perdida total =
  Unidades saídas × Faturamento médio × (Royalty% + MKT%) × Meses vago
```

**Output esperado (rede de 30 unidades, 12 meses):**

```
SIMULAÇÃO S03 — Taxa de Churn (12 meses, 30 unidades)

                          | 5% Churn | 8% (atual) | 12% Churn | 20% Churn |
--------------------------|----------|-----------|-----------|-----------|
Franqueados saem          | 1.5 (~2) | 2.4 (~2)  | 3.6 (~4)  | 6.0 (~6)  |
Custo direto saídas       | R$ 30k   | R$ 36k    | R$ 60k    | R$ 120k   |
Receita perdida (vagos)   | R$ 3.6k  | R$ 4.3k   | R$ 14.4k  | R$ 21.6k  |
Custo total churn         | R$ 33.6k | R$ 40.3k  | R$ 74.4k  | R$ 141.6k |
Impacto no lucro          | -5.7%    | -6.9%     | -12.7%    | -24.2%    |
Unidades ativas M12       | 28       | 28        | 26        | 24        |
Crescimento líquido needed| 2/ano    | 2/ano     | 4/ano     | 6/ano     |
  para manter rede estável|          |           |           |           |

ALERTA: Churn > 15% torna crescimento insustentável com
        taxa de recrutamento atual (2/mês)
```

---

### 7.4 S04 — Crise Econômica (Downturn)

**Objetivo:** Simular o impacto de uma desaceleração econômica na rede Avend.

**Variáveis:**

| Variável | Baseline | Recessão Leve | Recessão Moderada | Recessão Grave |
|----------|----------|--------------|-------------------|----------------|
| Queda receita/unidade | 0% | -10% | -20% | -35% |
| Aumento COGS | 0% | +5% | +10% | +20% |
| Aumento churn | 0pp | +2pp | +5pp | +10pp |
| Queda recrutamento | 0% | -20% | -40% | -70% |
| Inflação custos fixos | 4% | 6% | 8% | 12% |
| Inadimplência royalties | 5% | 10% | 20% | 35% |

**Impacto cascata:**

```
Recessão:
├── Receita cai → Margem do franqueado comprime
│   ├── Franqueado atrasa royalties → Receita franqueadora cai
│   ├── Franqueado reduz investimento → Qualidade cai
│   └── Franqueado desiste → Churn aumenta
│
├── COGS sobe → Margem comprime mais
│   ├── Franqueado aumenta preço → Volume cai
│   └── Franqueado absorve → Lucro cai
│
├── Recrutamento cai → Crescimento desacelera
│   ├── Receita de taxas cai → Caixa franqueadora aperta
│   └── Vagas de churn não são repostas → Rede encolhe
│
└── Feedback loop negativo
    ├── Rede menor → Menos poder de negociação → COGS sobe mais
    └── NPS cai → Mais churn → Rede menor
```

**Output esperado (rede de 30 unidades, 12 meses):**

```
SIMULAÇÃO S04 — Crise Econômica (12 meses, 30 unidades)

                        | Normal | Leve     | Moderada | Grave    |
------------------------|--------|----------|----------|----------|
Receita/unidade/mês     | R$ 12k | R$ 10.8k | R$ 9.6k  | R$ 7.8k  |
Margem franqueado       | 30.8%  | 24.3%    | 17.1%    | 4.2%     |
Lucro franqueado/mês    | R$ 3.7k| R$ 2.1k  | R$ 920   | -R$ 430  |
Unidades ativas M12     | 30     | 28       | 24       | 18       |
Churn efetivo           | 8%     | 10%      | 13%      | 18%      |
Inadimplência royalties | 5%     | 10%      | 20%      | 35%      |
Receita franqueadora 12m| R$ 580k| R$ 450k  | R$ 310k  | R$ 165k  |
Lucro franqueadora 12m  | R$ 185k| R$ 95k   | -R$ 10k  | -R$ 135k |

PLANO DE CONTINGÊNCIA ATIVADO SE:
- Receita cair > 15%: Reduzir custos fixos, renegociar fornecedores
- Churn > 12%: Programa de retenção emergencial
- Inadimplência > 15%: Renegociar royalties temporariamente
- Lucro franqueadora negativo: Suspender expansão, modo sobrevivência
```

---

### 7.5 S05 — Aumento de COGS

**Objetivo:** Simular o impacto de aumento nos custos de produtos vendidos nas máquinas.

**Variáveis:**

| Variável | Baseline | +5% COGS | +10% COGS | +20% COGS |
|----------|----------|----------|-----------|-----------|
| COGS % receita | 40% | 42% | 44% | 48% |
| Repasse ao preço | 0% | 50% | 50% | 30% |
| Impacto volume | 0% | -2% | -5% | -10% |
| Impacto margem franqueado | 30.8% | 28.5% | 25.8% | 20.1% |

**Decision tree de resposta:**

```
COGS subiu:
│
├── Aumento <= 5%?
│   ├── Absorver parcialmente + repassar parcialmente ao preço
│   ├── Impacto na margem: ~2pp
│   └── Ação: Renegociar com fornecedores, otimizar mix
│
├── Aumento 5-15%?
│   ├── Repassar 50% ao preço + absorver 50%
│   ├── Buscar fornecedores alternativos
│   ├── Ajustar mix para produtos de maior margem
│   └── Comunicar franqueados com transparência
│
└── Aumento > 15%?
    ├── Crise de custos — ativar plano de contingência
    ├── Suspender expansão temporariamente
    ├── Renegociar royalties temporariamente (reduzir 1pp por 6 meses)
    └── Buscar fontes de receita alternativas
```

---

### 7.6 S06 — Expansão Geográfica

**Objetivo:** Comparar investimento e retorno da expansão para diferentes estados.

**Variáveis por estado:**

| Variável | SP | MG | PR | GO | BA |
|----------|-----|-----|-----|-----|-----|
| Custo de entrada | R$ 80k | R$ 55k | R$ 50k | R$ 40k | R$ 60k |
| Meta franqueados ano 1 | 12 | 8 | 6 | 5 | 5 |
| Receita média/unidade | R$ 14k | R$ 11k | R$ 12k | R$ 10k | R$ 9k |
| ICMS efetivo | 18% | 18% | 19% | 17% | 20.5% |
| Dificuldade regulatória | 3 | 2 | 2 | 2 | 3 |
| Tempo para 1ª unidade | 4 meses | 3 meses | 3 meses | 2 meses | 4 meses |

**Output:** Ranking de estados por ROI ajustado ao risco.

---

### 7.7 S07 — Multi-unidade Acelerado

**Objetivo:** Simular o impacto de acelerar a estratégia de multi-unidade.

**Variáveis:**

| Variável | Baseline | Multi Moderado | Multi Agressivo |
|----------|----------|---------------|----------------|
| % multifranqueados | 15% | 30% | 45% |
| Desconto royalty médio | 0% | -0.3pp | -0.7pp |
| Custo aquisição/unidade | R$ 5k | R$ 3k | R$ 2k |
| Churn multifranqueados | 5% | 5% | 7% |
| Velocidade de expansão | 2/mês | 3/mês | 5/mês |

---

### 7.8 S08 — Mudança de Mix de Produto

**Objetivo:** Simular o impacto de adicionar novo tipo de máquina ou produto ao portfólio.

**Cenários:**
- Adicionar máquina de café premium (ticket R$ 8-12)
- Adicionar micro-market (sem máquina, prateleira aberta)
- Adicionar máquina de produtos saudáveis (margem maior)

---

### 7.9 S09 — Guerra de Preços

**Objetivo:** Simular o impacto de um concorrente reduzindo preços agressivamente.

**Variáveis:**

| Variável | Baseline | Concorrente -10% | Concorrente -20% |
|----------|----------|------------------|------------------|
| Impacto volume Avend | 0% | -8% | -18% |
| Necessidade de resposta | Não | Parcial | Urgente |
| Custo de resposta/mês | R$ 0 | R$ 2k/unidade | R$ 4k/unidade |

---

### 7.10 S10 — Cenário Composto

**Objetivo:** Combinar 2+ cenários para análise de estresse.

**Exemplos de combinações:**

| Combinação | Cenários | Probabilidade |
|-----------|----------|---------------|
| Tempestade perfeita | S04 (grave) + S05 (+20%) | 5% |
| Expansão arriscada | S01 (agressivo) + S03 (12% churn) | 15% |
| Oportunidade com risco | S06 (3 estados) + S04 (leve) | 20% |
| Best case | S01 (moderado) + S07 (multi moderado) | 25% |

---

## 8. Análise de Sensibilidade (Tornado Chart)

### 8.1 Variáveis Ordenadas por Impacto

Para o cenário base (30 unidades, 12 meses), cada variável é variada em +/- 20% para medir impacto no lucro da franqueadora:

```
TORNADO CHART — Impacto no Lucro da Franqueadora (variação ±20%)

Faturamento/unidade     |████████████████████| ±R$ 69.600
Nº de unidades ativas   |██████████████████  | ±R$ 62.000
Taxa de churn           |████████████████    | ±R$ 48.000
COGS percentual         |██████████████      | ±R$ 41.700
Royalty percentual      |████████████        | ±R$ 33.400
Custo de equipe         |██████████          | ±R$ 23.000
Taxa de franquia        |████████            | ±R$ 18.000
Fundo de marketing      |██████              | ±R$ 13.400
Custo de aquisição      |████                | ±R$ 7.200
```

**Interpretação:**
- Faturamento por unidade e número de unidades ativas são as variáveis mais impactantes
- COGS e churn são os maiores riscos de downside
- Royalty e taxa de franquia são as maiores alavancas de upside

### 8.2 Break-even de Cada Variável

| Variável | Valor Atual | Break-even (lucro = 0) | Margem de Segurança |
|----------|-------------|----------------------|---------------------|
| Faturamento/unidade | R$ 12.000 | R$ 6.200 | 48% |
| Nº unidades | 30 | 14 | 53% |
| COGS | 40% | 58% | 18pp |
| Churn | 8% | 28% | 20pp |
| Royalty | 5% | 2.1% | 2.9pp |
| Custo equipe | R$ 8.000/mês | R$ 23.500/mês | 194% |

---

## 9. Framework de Monte Carlo Detalhado

### 9.1 Distribuições de Probabilidade

| Variável | Distribuição | Parâmetros |
|----------|-------------|-----------|
| Faturamento/unidade | Normal | μ=12000, σ=1800 |
| COGS % | Normal | μ=40, σ=4 |
| Churn anual | Beta | α=2, β=23 (média ~8%) |
| Novas unidades/mês | Poisson | λ=2 |
| Taxa de franquia recebida | Constante | 15000 |
| Custo aquisição/franqueado | Uniforme | [3000, 8000] |
| Tempo break-even (meses) | Triangular | min=8, mode=14, max=24 |

### 9.2 Correlações Entre Variáveis

| Par de Variáveis | Correlação | Explicação |
|------------------|-----------|------------|
| COGS ↑ × Faturamento ↓ | -0.3 | Repasse parcial reduz volume |
| Churn ↑ × NPS ↓ | -0.7 | Insatisfação leva a saída |
| Faturamento ↓ × Churn ↑ | -0.5 | Baixa receita desmotiva |
| COGS ↑ × Churn ↑ | 0.4 | Custo alto pressiona franqueado |
| Unidades ↑ × Custo suporte ↑ | 0.8 | Mais unidades = mais suporte |

### 9.3 Output do Monte Carlo (Exemplo — 1000 iterações)

```
RESULTADO MONTE CARLO — Lucro Franqueadora 12 meses

Iterações: 1.000
Horizonte: 12 meses
Base: 30 unidades

Estatísticas:
  Média:     R$ 178.500
  Mediana:   R$ 182.000
  Desvio:    R$ 45.200
  P10:       R$ 118.000  (pessimista)
  P25:       R$ 148.000
  P50:       R$ 182.000  (mais provável)
  P75:       R$ 210.000
  P90:       R$ 238.000  (otimista)
  Mínimo:    R$ 32.000
  Máximo:    R$ 342.000

Probabilidade de lucro negativo: 2.3%
Probabilidade de lucro > R$ 200k: 38%
Probabilidade de lucro > R$ 150k: 68%

Intervalo de confiança 80%: [R$ 118k — R$ 238k]
```

---

## 10. Formato de Output

### 10.1 Relatório Padrão

Todo cenário simulado deve gerar um relatório com esta estrutura:

```markdown
# Relatório de Simulação — [CENÁRIO]

## Resumo Executivo
[1-2 parágrafos com conclusão principal]

## Parâmetros
| Variável | Baseline | Cenário A | Cenário B | Cenário C |
|----------|----------|-----------|-----------|-----------|
| ... | ... | ... | ... | ... |

## Resultados
| Métrica | Baseline | Cenário A | Cenário B | Cenário C |
|---------|----------|-----------|-----------|-----------|
| ... | ... | ... | ... | ... |

## Análise de Risco
| Risco | Probabilidade | Impacto | Mitigação |
|-------|-------------|---------|-----------|
| ... | ... | ... | ... |

## Sensibilidade
[Tornado chart ou tabela de sensibilidade]

## Recomendação
[Recomendação clara com justificativa baseada nos dados]

## Premissas e Limitações
[Listar todas as premissas e limitações do modelo]
```

### 10.2 Tabela Comparativa de Cenários

```
COMPARATIVO DE CENÁRIOS — [TEMA]

                    | Baseline | Cen. A | Cen. B | Cen. C |
--------------------|----------|--------|--------|--------|
Receita 12m         |          |        |        |        |
Custo 12m           |          |        |        |        |
Lucro 12m           |          |        |        |        |
ROI                 |          |        |        |        |
Risco               |          |        |        |        |
NPS estimado        |          |        |        |        |
Unidades ativas M12 |          |        |        |        |

Risk-Reward Score:
  Cenário A: [score] — [classificação]
  Cenário B: [score] — [classificação]
  Cenário C: [score] — [classificação]

RECOMENDAÇÃO: [Cenário X] porque [justificativa].
```

### 10.3 Risk-Reward Matrix

```
        Alto Retorno
             │
    ARRISCAR │ IDEAL
    (avaliar │ (priorizar)
     cuidado)│
─────────────┼─────────────
    EVITAR   │ SEGURO
    (alto    │ (conservador)
     risco,  │
     baixo   │
     retorno)│
             │
        Alto Risco ──────── Baixo Risco
```

---

## 11. Processo de Execução da Task

### 11.1 Workflow de Execução

```
Passo 1: RECEBER SOLICITAÇÃO
├── Qual cenário simular?
├── Quais parâmetros variar?
├── Qual horizonte temporal?
└── Qual nível de detalhe? (rápido / detalhado / Monte Carlo)

Passo 2: VALIDAR PRÉ-CONDIÇÕES
├── Dados atualizados?
├── Parâmetros dentro do range?
├── Veto conditions? → Se SIM, PARAR e informar
└── Se OK → Prosseguir

Passo 3: DEFINIR CENÁRIO BASE
├── Carregar unit-economics-avend.yaml
├── Carregar dados reais da rede (se disponíveis)
└── Estabelecer baseline

Passo 4: CONFIGURAR CENÁRIOS
├── Definir variáveis por cenário
├── Definir distribuições (se Monte Carlo)
└── Validar com solicitante

Passo 5: EXECUTAR SIMULAÇÃO
├── Calcular impactos diretos
├── Calcular impactos indiretos
├── Análise de sensibilidade
└── Monte Carlo (se aplicável)

Passo 6: GERAR OUTPUT
├── Tabela comparativa
├── Análise de risco
├── Recomendação
└── Premissas e limitações

Passo 7: APRESENTAR RESULTADOS
├── @franchise-financial: Validar números
├── @franchise-growth: Validar premissas de mercado
└── Entregar ao solicitante
```

### 11.2 Elicitation Points

| Ponto | Pergunta | Default |
|-------|----------|---------|
| Cenário | Qual cenário (S01-S10)? | Obrigatório |
| Horizonte | Quantos meses projetar? | 12 meses |
| Rede | Quantas unidades considerar como base? | Dados reais ou 30 |
| Detalhe | Análise rápida ou detalhada? | Rápida |
| Monte Carlo | Executar simulação probabilística? | Não (apenas se detalhada) |
| Combinação | Combinar com outro cenário? | Não |

---

## 12. Manutenção do Modelo

### 12.1 Atualização de Dados

| Dado | Frequência de Atualização | Responsável |
|------|--------------------------|-------------|
| Unit economics | Trimestral (com dados reais) | @franchise-financial |
| Benchmarks ABF | Anual (publicação ABF) | @franchise-growth |
| Fee benchmarks | Semestral | @franchise-financial |
| Dados da rede | Mensal (automático) | Sistema de telemetria |
| Premissas macro | Trimestral | @franchise-financial |

### 12.2 Validação do Modelo

| Tipo de Validação | Frequência | Método |
|-------------------|-----------|--------|
| Backtesting | Trimestral | Comparar projeções passadas com resultados reais |
| Stress test | Semestral | Executar cenários extremos, validar coerência |
| Peer review | Anual | Revisão por consultor externo |
| Calibração | Trimestral | Ajustar parâmetros com dados reais |

### 12.3 Indicadores de Qualidade do Modelo

| Indicador | Meta |
|-----------|------|
| Erro médio de projeção (3 meses) | < 15% |
| Erro médio de projeção (12 meses) | < 25% |
| % de resultados reais dentro do intervalo P10-P90 | > 80% |
| Coerência entre cenários | Ranking mantido em 90%+ dos backtests |

---

## 13. Exemplos de Output Completo

### 13.1 Exemplo: "Devo expandir para MG agora ou esperar 6 meses?"

```
SIMULAÇÃO: Expansão MG — Agora vs. 6 meses

CENÁRIO A: Expandir agora
├── Investimento: R$ 55.000
├── Tempo até 1ª unidade: 3 meses
├── Unidades em 12 meses: 5
├── Receita incremental 12m: R$ 42.000
├── Lucro incremental 12m: R$ 12.000
├── Risco: MÉDIO (sem dados locais, primeiro estado novo)
└── ROI 12m: 21.8%

CENÁRIO B: Esperar 6 meses
├── Investimento: R$ 55.000 (mesmos custos)
├── Tempo até 1ª unidade: 9 meses (6 espera + 3 setup)
├── Unidades em 12 meses: 2
├── Receita incremental 12m: R$ 10.800
├── Lucro incremental 12m: -R$ 2.000 (ainda amortizando)
├── Risco: BAIXO (mais dados, rede mais madura)
└── ROI 12m: -3.6% (positivo no mês 15)

CENÁRIO C: Expandir agora com piloto menor (R$ 35k)
├── Investimento: R$ 35.000
├── Tempo até 1ª unidade: 3 meses
├── Unidades em 12 meses: 2 (apenas piloto)
├── Receita incremental 12m: R$ 16.800
├── Lucro incremental 12m: R$ 4.200
├── Risco: BAIXO-MÉDIO (investimento menor, teste controlado)
└── ROI 12m: 12.0%

RECOMENDAÇÃO: CENÁRIO C — Expandir agora com piloto menor.
Menor investimento, testa o mercado, gera dados para decisão
de escala em 6 meses com informações reais.
```

---

## 14. Referências

- `data/unit-economics-avend.yaml` — Modelo financeiro base
- `data/abf-benchmarks.yaml` — Benchmarks de mercado
- `data/franchise-fee-benchmarks.yaml` — Benchmarks de taxas
- `data/regulatory-by-state.yaml` — Dados regulatórios por estado
- `playbooks/expansao-novo-estado.md` — Processo de expansão
- `playbooks/multifranqueado.md` — Gestão multi-unidade
- Monte Carlo Simulation — Vose, D. "Risk Analysis" (referência metodológica)
- Franchise Valuation — Seid, R. "Franchise Management" (referência setorial)

---

*Task mantida por @franchise-financial + @franchise-growth*
*Revisão do modelo: trimestral com dados reais da rede*
*Calibração: a cada backtesting trimestral*
