# Task: financial-model

```yaml
task: financial-model
id: FA-TASK-005
responsavel: "@franchise-financial"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - actual_financials_path: string - Path para dados financeiros reais da operacao
  - franchise_model_path: string - Path para modelo de franquia (taxas, investimento)
  - market_data_path: string - Path para dados de mercado e benchmarks (opcional)
  - network_performance_path: string - Path para dados de performance da rede (opcional)

Saida:
  - financial-model-avend.md: Modelo financeiro completo com unit economics
  - scenario-analysis.md: Analise de cenarios (pessimista, realista, otimista)
  - franchisee-proforma.md: Pro-forma financeira para candidatos a franqueados
  - franchisor-economics.md: Modelo economico do franqueador

Checklist:
  - Unit economics completo por maquina e por franqueado
  - DRE projetada do franqueado (mensal e anual)
  - Investimento inicial detalhado com breakdown
  - Calculo de payback (simples e descontado)
  - Calculo de ROI e TIR
  - Ponto de equilibrio (breakeven) calculado
  - Analise de sensibilidade (variaveis criticas)
  - 3 cenarios projetados (pessimista, realista, otimista)
  - Modelo do franqueador (receita de royalties, breakeven da operacao)
  - Cash flow projetado (12-36 meses)
  - Premissas explicitadas e documentadas
  - Compliance com COF (valores devem bater)

veto_conditions:
  - Dados financeiros reais inexistentes (modelo nao pode ser 100% teorico)
  - Premissas irrealistas (faturamento acima do P90 da rede)
  - Payback calculado sem considerar capital de giro
  - Modelo sem analise de sensibilidade
  - Valores inconsistentes com a COF

output_examples:
  - |
    ## Unit Economics — Avend Franquias (por maquina)
    | Metrica | Valor Mensal |
    |---------|-------------|
    | Faturamento bruto | R$ 2.500 |
    | CMV (Custo de produtos) | R$ 1.000 (40%) |
    | Margem bruta | R$ 1.500 (60%) |
    | Custos operacionais | R$ 500 (20%) |
    | Royalties (X%) | R$ 250 (10%) |
    | Lucro operacional | R$ 750 (30%) |
```

---

## Purpose

Construir o **modelo financeiro completo** para a franquia Avend, incluindo unit economics por maquina, pro-forma do franqueado, analise de cenarios e modelo economico do franqueador. Este modelo e a base para:

1. **COF:** Os valores declarados na COF devem ser sustentados pelo modelo financeiro
2. **Screening:** Candidatos usam o modelo para avaliar a oportunidade
3. **Decisao estrategica:** Franqueador usa para precificar taxas e planejar expansao
4. **Monitoramento:** KPIs financeiros para acompanhar saude da rede

**Principio fundamental:** Um modelo financeiro de franquia deve ser **conservador, transparente e baseado em dados reais**. Projecoes otimistas demais atraem franqueados que se frustram — o que gera conflitos, litigios e danos a marca. O modelo deve mostrar a realidade, incluindo os riscos.

**Contexto Avend:** Microfranquia de vending machines, investimento ~R$50k, operacao semi-passiva. O unit economics e por maquina (unidade basica de receita). Um franqueado tipico opera N maquinas. A receita vem da venda de produtos; o custo principal e o CMV (custo dos produtos vendidos) + logistica de abastecimento.

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `actual_financials_path` | string | Sim | Dados reais: faturamento por maquina, custos, margens, historico |
| `franchise_model_path` | string | Sim | Taxas: franquia, royalties, publicidade, tecnologia |
| `market_data_path` | string | Nao | Dados ABF, benchmarks do setor, tendencias |
| `network_performance_path` | string | Nao | Performance da rede: media, mediana, quartis, dispersao |
| `equipment_costs` | string | Nao | Custos de equipamentos (maquinas, acessorios) |
| `supplier_pricing` | string | Nao | Tabelas de precos de fornecedores homologados |

---

## Preconditions

1. **Dados financeiros reais**: Minimo 12 meses de dados reais de operacao por maquina.
2. **Modelo de franquia definido**: Taxas e investimento inicial determinados.
3. **Custos operacionais mapeados**: Todos os custos do franqueado identificados.
4. **Premissas de mercado**: Dados de mercado para validar premissas.
5. **Perfil do franqueado definido**: Numero de maquinas por franqueado, dedicacao.

---

## Key Activities & Instructions

### Phase 1: Unit Economics por Maquina

**O unit economics por maquina e o atomo do modelo financeiro. Se a maquina individual nao gera margem, nada funciona.**

**1.1 — Receita por Maquina**

```yaml
revenue_per_machine:
  faturamento_bruto_mensal:
    media_rede: 0
    mediana_rede: 0
    p25: 0  # 25% piores
    p75: 0  # 25% melhores
    desvio_padrao: 0

  composicao_receita:
    bebidas_quentes: {pct: 0, ticket_medio: 0}
    bebidas_frias: {pct: 0, ticket_medio: 0}
    snacks: {pct: 0, ticket_medio: 0}
    alimentos: {pct: 0, ticket_medio: 0}
    outros: {pct: 0, ticket_medio: 0}

  transacoes:
    media_transacoes_dia: 0
    ticket_medio: 0
    sazonalidade:
      jan: 0.0  # Indice de sazonalidade (1.0 = media)
      fev: 0.0
      # ... todos os meses
```

**1.2 — Custos por Maquina**

```yaml
costs_per_machine:
  custos_variaveis:
    cmv_produtos:
      percentual_faturamento: 0  # % do faturamento
      valor_medio_mensal: 0
    perda_produtos:
      percentual_cmv: 0  # % de perda sobre CMV
      valor_medio_mensal: 0
    embalagens_descartaveis:
      valor_medio_mensal: 0
    sistemas_pagamento:
      taxa_cartao_pct: 0
      taxa_pix_pct: 0
      custo_medio_mensal: 0

  custos_fixos_por_maquina:
    aluguel_ponto:
      modelo: "" # Fixo, % faturamento, produtos gratuitos
      valor_medio_mensal: 0
    energia_eletrica:
      consumo_kwh_mes: 0
      custo_kwh: 0
      valor_medio_mensal: 0
    seguro:
      valor_mensal: 0
    telemetria_conectividade:
      valor_mensal: 0
    depreciacao:
      valor_maquina: 0
      vida_util_meses: 0
      depreciacao_mensal: 0

  custos_operacionais:
    abastecimento:
      frequencia_semana: 0
      custo_por_visita: 0  # Combustivel, tempo, etc.
      valor_mensal: 0
    manutencao_preventiva:
      custo_medio_mensal: 0
    manutencao_corretiva:
      custo_medio_mensal: 0
```

**1.3 — Margem por Maquina**

```
UNIT ECONOMICS POR MAQUINA (Mensal)
============================================================
(+) Faturamento Bruto                    R$ _____  (100%)
(-) Impostos (Simples Nacional)          R$ _____  (___%)
(=) Faturamento Liquido                  R$ _____  (___%)
(-) CMV (Custo dos Produtos)             R$ _____  (___%)
(-) Perdas de Produto                    R$ _____  (___%)
(=) Margem Bruta                         R$ _____  (___%)
(-) Aluguel/Parceria do Ponto           R$ _____  (___%)
(-) Energia Eletrica                     R$ _____  (___%)
(-) Taxas de Pagamento (cartao/PIX)     R$ _____  (___%)
(-) Telemetria/Conectividade            R$ _____  (___%)
(-) Abastecimento (logistica)           R$ _____  (___%)
(-) Manutencao                          R$ _____  (___%)
(-) Seguro                              R$ _____  (___%)
(=) Margem Operacional (antes royalties) R$ _____  (___%)
(-) Royalties                           R$ _____  (___%)
(-) Taxa de Publicidade                 R$ _____  (___%)
(-) Taxa de Tecnologia                  R$ _____  (___%)
(=) LUCRO OPERACIONAL POR MAQUINA       R$ _____  (___%)
============================================================
```

---

### Phase 2: Pro-Forma do Franqueado

**2.1 — Investimento Inicial Detalhado**

```
INVESTIMENTO INICIAL — FRANQUIA AVEND
============================================================
| Item | Qtd | Valor Unit. | Valor Total |
|------|-----|-------------|-------------|
| Taxa de Franquia | 1 | R$ | R$ |
| Maquina(s) | N | R$ | R$ |
| Estoque Inicial | - | - | R$ |
| Capital de Giro (3 meses) | - | - | R$ |
| Treinamento | 1 | R$ | R$ |
| Marketing Inaugural | 1 | R$ | R$ |
| Uniformes/EPIs | - | - | R$ |
| Ferramentas/Acessorios | - | - | R$ |
| Reserva de Contingencia | - | - | R$ |
|------|-----|-------------|-------------|
| **TOTAL** | | | **R$ ___** |
============================================================
```

**2.2 — DRE Projetada do Franqueado (Mensal)**

Para um franqueado com N maquinas:

```
DRE MENSAL — FRANQUEADO AVEND (N maquinas)
============================================================
(+) RECEITA BRUTA TOTAL                 R$ _____
(-) Deducoes (impostos)                 R$ _____
(=) RECEITA LIQUIDA                     R$ _____

(-) CUSTOS VARIAVEIS
    CMV - Produtos                      R$ _____
    Perdas                              R$ _____
    Taxas de pagamento                  R$ _____
(=) MARGEM DE CONTRIBUICAO             R$ _____  (___%)

(-) CUSTOS FIXOS OPERACIONAIS
    Aluguel/Parceria pontos            R$ _____
    Energia eletrica                    R$ _____
    Combustivel/logistica              R$ _____
    Manutencao                         R$ _____
    Seguro                             R$ _____
    Telemetria                         R$ _____
    Contador                           R$ _____
    Telefone/internet                  R$ _____
    Material de limpeza                R$ _____

(-) TAXAS DE FRANQUIA
    Royalties                          R$ _____
    Taxa de publicidade                R$ _____
    Taxa de tecnologia                 R$ _____

(=) LUCRO OPERACIONAL (EBITDA)         R$ _____  (___%)
(-) Depreciacao                        R$ _____
(=) LUCRO ANTES IR                     R$ _____
(-) IR/CSLL (Simples Nacional)         R$ _____
(=) LUCRO LIQUIDO                      R$ _____  (___%)
============================================================
```

**2.3 — Fluxo de Caixa Projetado (36 meses)**

```
FLUXO DE CAIXA — FRANQUEADO AVEND
============================================================
| Mes | Receita | Custos | Investimento | FC Mensal | FC Acumulado |
|-----|---------|--------|-------------|-----------|-------------|
| 0 | 0 | 0 | (R$ Invest.) | (R$ Invest.) | (R$ Invest.) |
| 1 | R$ | R$ | 0 | R$ | R$ |
| 2 | R$ | R$ | 0 | R$ | R$ |
| ... | | | | | |
| 36 | R$ | R$ | 0 | R$ | R$ |

Premissas de ramp-up:
- Mes 1: 60% da capacidade
- Mes 2: 70% da capacidade
- Mes 3: 80% da capacidade
- Mes 4+: 90-100% da capacidade
============================================================
```

**2.4 — Indicadores Financeiros**

```yaml
financial_indicators:
  payback_simples:
    formula: "Investimento Total / Lucro Liquido Mensal"
    valor_meses: 0
    classificacao: "" # Excelente (<12), Bom (12-18), Aceitavel (18-24), Atencao (>24)

  payback_descontado:
    taxa_desconto_mensal: 0  # % ao mes (custo de oportunidade)
    valor_meses: 0

  roi_anual:
    formula: "(Lucro Liquido Anual / Investimento Total) x 100"
    valor_pct: 0

  tir:
    formula: "Taxa Interna de Retorno (36 meses)"
    valor_pct_mensal: 0
    valor_pct_anual: 0

  vpl:
    formula: "Valor Presente Liquido (36 meses)"
    taxa_desconto: 0
    valor_r: 0

  breakeven:
    formula: "Custos Fixos / Margem de Contribuicao Unitaria"
    faturamento_minimo_mensal: 0
    numero_minimo_transacoes_dia: 0

  margem_seguranca:
    formula: "(Faturamento Real - Breakeven) / Faturamento Real"
    valor_pct: 0
```

---

### Phase 3: Analise de Cenarios

**3.1 — Definicao de Cenarios**

```yaml
scenarios:
  pessimista:
    descricao: "Operacao abaixo da media da rede (P25)"
    premissas:
      faturamento_por_maquina: "" # P25 da rede
      taxa_ocupacao: "" # % do tempo com maquina ativa
      ticket_medio: "" # Abaixo da media
      custo_operacional: "" # Acima da media
      ramp_up: "" # Mais lento
    probabilidade: "25%"

  realista:
    descricao: "Operacao na mediana da rede (P50)"
    premissas:
      faturamento_por_maquina: "" # Mediana da rede
      taxa_ocupacao: ""
      ticket_medio: ""
      custo_operacional: ""
      ramp_up: ""
    probabilidade: "50%"

  otimista:
    descricao: "Operacao acima da media da rede (P75)"
    premissas:
      faturamento_por_maquina: "" # P75 da rede
      taxa_ocupacao: ""
      ticket_medio: ""
      custo_operacional: ""
      ramp_up: ""
    probabilidade: "25%"
```

**3.2 — Comparativo de Cenarios**

```
COMPARATIVO DE CENARIOS — FRANQUEADO AVEND (N maquinas)
============================================================
| Metrica | Pessimista | Realista | Otimista |
|---------|-----------|---------|----------|
| Faturamento mensal | R$ | R$ | R$ |
| Lucro liquido mensal | R$ | R$ | R$ |
| Margem liquida | % | % | % |
| Payback (meses) | | | |
| ROI anual | % | % | % |
| TIR (anual) | % | % | % |
| VPL (36 meses) | R$ | R$ | R$ |
| Breakeven (meses) | | | |
============================================================
```

**3.3 — Analise de Sensibilidade**

Identificar as variaveis mais impactantes e simular variacao:

```
ANALISE DE SENSIBILIDADE
============================================================
| Variavel | -20% | -10% | Base | +10% | +20% |
|----------|------|------|------|------|------|
| Faturamento/maquina | | | R$ | | |
| CMV (%) | | | % | | |
| Numero de maquinas | | | N | | |
| Royalties (%) | | | % | | |
| Aluguel de ponto | | | R$ | | |
| Preco medio | | | R$ | | |
| Transacoes/dia | | | N | | |

Impacto no Lucro Liquido:
| Variavel | -20% | -10% | Base | +10% | +20% |
|----------|------|------|------|------|------|
| [Resultado] | | | | | |
============================================================
```

**Variaveis criticas (maior impacto):**
1. Faturamento por maquina (diretamente proporcional)
2. CMV / custo de produtos (inversamente proporcional)
3. Numero de maquinas (escala)
4. Localizacao/qualidade do ponto (afeta faturamento)

---

### Phase 4: Modelo Economico do Franqueador

**4.1 — Receitas do Franqueador**

```yaml
franchisor_revenue:
  one_time:
    taxa_franquia:
      valor_unitario: 0
      frequencia: "Por novo franqueado"
    taxa_renovacao:
      valor_unitario: 0
      frequencia: "A cada renovacao"

  recurring:
    royalties:
      base: "" # % ou fixo por franqueado
      valor_medio_mensal_por_franqueado: 0
      valor_total_mensal_rede: 0
    taxa_publicidade:
      base: ""
      valor_medio_mensal: 0
    taxa_tecnologia:
      base: ""
      valor_medio_mensal: 0

  indirect:
    markup_fornecimento:
      descricao: "Margem em produtos fornecidos/intermediados"
      valor_medio_mensal: 0
    venda_equipamentos:
      margem: 0
      volume_mensal: 0
```

**4.2 — Custos do Franqueador**

```yaml
franchisor_costs:
  estrutura:
    equipe_sede: 0  # Salarios + encargos
    aluguel_sede: 0
    tecnologia_sistemas: 0
    contabilidade_juridico: 0

  suporte_rede:
    consultores_campo: 0
    treinamento: 0
    central_atendimento: 0
    viagens: 0

  marketing:
    institucional: 0
    captacao_franqueados: 0
    convencoes_eventos: 0

  desenvolvimento:
    novos_produtos: 0
    melhorias_tecnologia: 0
    pesquisa: 0
```

**4.3 — Breakeven do Franqueador**

```
Quantos franqueados sao necessarios para o franqueador cobrir seus custos?

Receita recorrente por franqueado = R$ ___ /mes
Custos fixos do franqueador = R$ ___ /mes
Custo variavel por franqueado = R$ ___ /mes (suporte proporcional)

Breakeven = Custos Fixos / (Receita por franqueado - Custo variavel por franqueado)
Breakeven = ___ franqueados

A Avend tem 90 franqueados atualmente. Esta [ACIMA/ABAIXO] do breakeven.
```

---

### Phase 5: Premissas e Documentacao

**5.1 — Registro de Premissas**

TODA premissa utilizada no modelo DEVE ser documentada:

```yaml
premises:
  mercado:
    - premissa: "Mercado de vending cresce 15% ao ano no Brasil"
      fonte: "ABF / ABVA"
      data_referencia: ""
      confianca: "Media"

  operacionais:
    - premissa: "Faturamento medio por maquina de R$ X.XXX/mes"
      fonte: "Dados internos rede Avend (ultimos 12 meses)"
      data_referencia: ""
      confianca: "Alta"

  financeiras:
    - premissa: "Inflacao projetada de X% ao ano"
      fonte: "Boletim Focus/BCB"
      data_referencia: ""
      confianca: "Media"

  tributarias:
    - premissa: "Franqueado opera no Simples Nacional, faixa X"
      fonte: "Tabela Simples Nacional vigente"
      data_referencia: ""
      confianca: "Alta"
```

**5.2 — Limitacoes do Modelo**

```
LIMITACOES E RESSALVAS
============================================================
1. Este modelo e uma ESTIMATIVA baseada em dados historicos e premissas.
   Resultados reais podem variar significativamente.

2. O modelo NAO constitui promessa de ganho ou garantia de resultado.
   Conforme Lei 13.966/2019, a COF nao pode conter promessas de ganho.

3. Fatores externos (crise economica, mudanca regulatoria, concorrencia)
   podem impactar os resultados projetados.

4. O desempenho individual depende fortemente da gestao do franqueado,
   qualidade dos pontos comerciais e dedicacao operacional.

5. Os cenarios apresentados sao ilustrativos e baseados em dados
   historicos da rede — nao representam garantia de performance futura.
============================================================
```

---

## Validation

### Criterios de Qualidade do Modelo Financeiro

| Criterio | Requisito | Verificacao |
|----------|-----------|-------------|
| Baseado em dados reais | Dados de pelo menos 12 meses | [ ] |
| Premissas documentadas | Toda premissa com fonte e confianca | [ ] |
| Cenarios completos | 3 cenarios com probabilidades | [ ] |
| Sensibilidade | Variaveis criticas identificadas | [ ] |
| Consistencia com COF | Valores batem com COF | [ ] |
| Conservadorismo | Cenario realista nao e otimista | [ ] |
| Unit economics | Margem por maquina calculada | [ ] |
| Modelo franqueador | Breakeven do franqueador calculado | [ ] |
| Indicadores | Payback, ROI, TIR, VPL calculados | [ ] |
| Ressalvas | Limitacoes e avisos incluidos | [ ] |

### Checklist de Entrega

- [ ] `financial-model-avend.md` gerado
- [ ] `scenario-analysis.md` gerado
- [ ] `franchisee-proforma.md` gerado
- [ ] `franchisor-economics.md` gerado
- [ ] Unit economics por maquina calculado
- [ ] DRE projetada do franqueado
- [ ] Fluxo de caixa 36 meses
- [ ] 3 cenarios com comparativo
- [ ] Analise de sensibilidade
- [ ] Premissas todas documentadas
- [ ] Modelo do franqueador com breakeven
- [ ] Compliance com COF verificado

---

## References

- **ABF.** Relatorio de Desempenho do Franchising Brasileiro.
- **ABVA (Associacao Brasileira de Vending Automatico).** Dados de mercado.
- **Siebert, Mark.** "Franchise Your Business." — Capitulo sobre Financial Modeling.
- **Bradach, Jeffrey.** "Franchise Organizations." — Unit economics frameworks.
- **Damodaran, Aswath.** "Investment Valuation." — Metodologias de valuation e DCF.
- **Lei 13.966/2019.** Art. 2o, VII e VIII — Disclosure financeiro na COF.
- **Receita Federal.** Tabela do Simples Nacional — regime tributario aplicavel.
- **BCB.** Boletim Focus — premissas macroeconomicas.

---

*Task version 1.0.0 — Squad Franchising Avend — FA-TASK-005*
