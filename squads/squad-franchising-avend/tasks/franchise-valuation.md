# Task: franchise-valuation

```yaml
task: franchise-valuation
id: FA-TASK-009
responsavel: "@franchise-financial"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - financial_statements_path: string - Path para demonstracoes financeiras (DRE, Balanco, FC)
  - network_data_path: string - Path para dados da rede (franqueados, performance)
  - market_data_path: string - Path para dados de mercado e transacoes comparaveis
  - brand_data_path: string - Path para dados da marca (registro INPI, reconhecimento)

Saida:
  - franchise-valuation-report.md: Relatorio de valuation completo
  - valuation-summary.md: Resumo executivo com range de valor
  - methodology-notes.md: Notas sobre metodologia e premissas

Checklist:
  - Valuation por DCF (Fluxo de Caixa Descontado) calculado
  - Valuation por multiplos de mercado calculado
  - Valuation por valor patrimonial ajustado
  - Valor da marca estimado (brand equity)
  - Valor do network effect estimado
  - Range de valor consolidado (min-max-medio)
  - Premissas explicitadas e justificadas
  - Analise de sensibilidade do valuation
  - Comparacao com transacoes do setor
  - Fatores de ajuste (premio/desconto) aplicados

veto_conditions:
  - Dados financeiros inexistentes ou nao confiaveis
  - Premissas de crescimento sem fundamentacao
  - Valuation sem multiplas metodologias (minimo 2)
  - Ausencia de analise de sensibilidade
  - Valuation que ignora passivos contingentes

output_examples:
  - |
    ## Valuation Summary — Avend Franquias
    | Metodologia | Valor Estimado | Peso |
    |-------------|---------------|------|
    | DCF | R$ 15.2M - R$ 22.8M | 40% |
    | Multiplos | R$ 12.5M - R$ 20.0M | 40% |
    | Patrimonial | R$ 8.0M - R$ 10.5M | 20% |
    **Range Ponderado: R$ 12.5M — R$ 19.5M**
    **Valor Medio: R$ 16.0M**
```

---

## Purpose

Calcular o **valor da franquia Avend** (marca + rede + operacao) utilizando multiplas metodologias de valuation adaptadas ao contexto de franquias. O valuation serve para:

1. **Transacoes M&A:** Venda parcial ou total da rede
2. **Captacao de investimento:** Valuation para investidores
3. **Planejamento estrategico:** Entender o valor criado e como maximiza-lo
4. **Separacao societaria:** Definir valor em caso de saida de socio
5. **Benchmarking:** Comparar com pares do setor

**Principio fundamental:** O valor de uma franquia nao e apenas o valor dos ativos fisicos ou do fluxo de caixa atual. Inclui o **valor da marca** (brand equity), o **valor da rede** (network effect), o **valor do sistema** (know-how codificado), e o **potencial de crescimento** (runway de expansao). Negligenciar esses intangiveis subestima significativamente o valor.

**Contexto Avend:** Rede com ~R$20M faturamento, 184 maquinas, 90 contratos de franquia, marca registrada, associada ABF. O valor combina ativos tangiveis (maquinas, estoque) com intangiveis significativos (marca, rede de franqueados, know-how, territorios, contratos).

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `financial_statements_path` | string | Sim | DRE, Balanco, FC dos ultimos 3-5 anos |
| `network_data_path` | string | Sim | Franqueados, maquinas, performance, churn, crescimento |
| `market_data_path` | string | Nao | Transacoes comparaveis, multiplos do setor |
| `brand_data_path` | string | Nao | Registro INPI, pesquisas de marca, reconhecimento |
| `projections_path` | string | Nao | Projecoes financeiras e de crescimento |
| `contracts_summary` | string | Nao | Resumo de contratos vigentes (franqueados, fornecedores) |

---

## Preconditions

1. **Dados financeiros confiaveis**: Minimo 3 anos de DRE e Balanco.
2. **Dados da rede atualizados**: Numero de franqueados, performance, churn.
3. **Marca registrada**: Registro INPI para fundamentar valor de marca.
4. **Objetivo do valuation**: Definir para que sera usado (M&A, investimento, etc.).
5. **Premissas macroeconomicas**: Taxa de desconto, inflacao, crescimento do setor.

---

## Key Activities & Instructions

### Phase 1: Analise dos Fundamentos

**1.1 — Perfil Financeiro**

```yaml
financial_profile:
  receitas:
    receita_total_anual: 0
    composicao:
      taxas_franquia: {valor: 0, pct: 0}
      royalties: {valor: 0, pct: 0}
      taxa_publicidade: {valor: 0, pct: 0}
      venda_equipamentos: {valor: 0, pct: 0}
      outras_receitas: {valor: 0, pct: 0}
    crescimento_receita:
      ano_1: 0
      ano_2: 0
      ano_3: 0
      cagr_3_anos: 0

  lucratividade:
    ebitda: 0
    margem_ebitda: 0
    lucro_liquido: 0
    margem_liquida: 0

  ativos:
    ativos_totais: 0
    patrimonio_liquido: 0
    divida_liquida: 0
    capital_de_giro: 0
```

**1.2 — Perfil da Rede**

```yaml
network_profile:
  tamanho:
    franqueados_ativos: 90
    maquinas_totais: 184
    estados_cobertura: []
    crescimento_rede_anual: 0

  qualidade:
    nps_franqueados: 0
    taxa_churn_anual: 0
    taxa_renovacao: 0
    compliance_media: 0

  contratos:
    prazo_medio_contrato: 0  # anos
    contratos_renovacao_proximo_ano: 0
    receita_contratada_mensal: 0  # Royalties recorrentes

  potencial:
    mercado_enderecavel: 0
    penetracao_atual: 0
    territorios_disponiveis: 0
    pipeline_candidatos: 0
```

---

### Phase 2: Metodologia 1 — DCF (Fluxo de Caixa Descontado)

**O DCF e a metodologia mais robusta para valuation. Projeta fluxos de caixa futuros e traz a valor presente.**

**2.1 — Projecao de Fluxo de Caixa Livre (FCL)**

```
PROJECAO DE FCL — 5 ANOS
============================================================
| Item | Ano 1 | Ano 2 | Ano 3 | Ano 4 | Ano 5 |
|------|-------|-------|-------|-------|-------|
| Receita Total | | | | | |
| Crescimento (%) | | | | | |
| (-) Custos Operacionais | | | | | |
| (=) EBITDA | | | | | |
| Margem EBITDA (%) | | | | | |
| (-) Depreciacao | | | | | |
| (=) EBIT | | | | | |
| (-) IR/CSLL | | | | | |
| (=) NOPAT | | | | | |
| (+) Depreciacao | | | | | |
| (-) CAPEX | | | | | |
| (-) Var. Capital Giro | | | | | |
| (=) **FCL** | | | | | |
============================================================
```

**2.2 — Taxa de Desconto (WACC)**

```yaml
wacc_calculation:
  custo_equity:
    risk_free_rate: 0  # Selic ou titulo longo
    equity_risk_premium: 0  # Premio de risco Brasil
    beta: 0  # Beta comparavel (franquias listadas)
    small_cap_premium: 0  # Premio por tamanho
    specific_risk_premium: 0  # Risco especifico franquia
    custo_equity_total: 0

  custo_divida:
    taxa_juros_media: 0
    beneficio_fiscal: 0
    custo_divida_pos_ir: 0

  estrutura_capital:
    equity_pct: 0
    divida_pct: 0

  wacc: 0  # Custo medio ponderado de capital
```

**2.3 — Valor Terminal**

```yaml
terminal_value:
  metodo: "Gordon Growth Model"
  fcl_ultimo_ano: 0
  taxa_crescimento_perpetuidade: 0  # g (tipicamente 2-4% para Brasil)
  wacc: 0
  valor_terminal: 0  # FCL * (1+g) / (WACC - g)
```

**2.4 — Valuation por DCF**

```
VALUATION DCF
============================================================
VP dos FCL projetados (Anos 1-5):  R$ ___
VP do Valor Terminal:              R$ ___
(=) Enterprise Value:              R$ ___
(-) Divida Liquida:                R$ ___
(+) Caixa e Equivalentes:         R$ ___
(=) EQUITY VALUE:                  R$ ___

Range (sensibilidade WACC +/- 2pp):
  Conservador: R$ ___
  Base:        R$ ___
  Otimista:    R$ ___
============================================================
```

---

### Phase 3: Metodologia 2 — Multiplos de Mercado

**3.1 — Multiplos Relevantes para Franquias**

| Multiplo | Formula | Referencia |
|----------|---------|-----------|
| EV/EBITDA | Enterprise Value / EBITDA | Principal para franquias |
| EV/Receita | Enterprise Value / Receita | Para empresas em crescimento |
| P/L | Preco / Lucro Liquido | Complementar |
| EV/Franqueado | Enterprise Value / Numero de franqueados | Especifico franquias |
| EV/Unidade | Enterprise Value / Total unidades | Especifico franquias |

**3.2 — Multiplos Comparaveis**

```
MULTIPLOS DE REFERENCIA — FRANQUIAS BRASIL
============================================================
| Comparavel | EV/EBITDA | EV/Receita | EV/Franqueado |
|-----------|-----------|-----------|--------------|
| Franquia A (alimentacao) | X | X | R$ X |
| Franquia B (servicos) | X | X | R$ X |
| Franquia C (vending) | X | X | R$ X |
| Media setor (ABF) | X | X | R$ X |
| Mediana | X | X | R$ X |

Fontes: ABF, transacoes publicas, pesquisas especializadas
============================================================
```

**3.3 — Valuation por Multiplos**

```
VALUATION POR MULTIPLOS
============================================================
| Multiplo | Base Avend | Multiplo | Valor Implicito |
|----------|-----------|---------|----------------|
| EV/EBITDA | R$ (EBITDA) | X.Xx | R$ ___ |
| EV/Receita | R$ (Receita) | X.Xx | R$ ___ |
| EV/Franqueado | 90 | R$ Xk | R$ ___ |
| EV/Maquina | 184 | R$ Xk | R$ ___ |

Media dos multiplos: R$ ___
Mediana: R$ ___
Range: R$ ___ — R$ ___
============================================================
```

---

### Phase 4: Metodologia 3 — Valor Patrimonial Ajustado

**4.1 — Ativos Tangiveis**

| Ativo | Valor Contabil | Valor de Mercado | Ajuste |
|-------|---------------|-----------------|--------|
| Maquinas (proprias) | R$ | R$ | R$ |
| Estoque | R$ | R$ | R$ |
| Imoveis (se houver) | R$ | R$ | R$ |
| Veiculos | R$ | R$ | R$ |
| Outros ativos | R$ | R$ | R$ |
| **Total Tangiveis** | R$ | R$ | R$ |

**4.2 — Ativos Intangiveis**

| Intangivel | Metodologia de Avaliacao | Valor Estimado |
|-----------|------------------------|---------------|
| **Marca Avend** | Relief from Royalty (economia de royalties) | R$ ___ |
| **Contratos de Franquia** | Valor presente dos royalties futuros | R$ ___ |
| **Know-how / Sistema** | Custo de replicacao | R$ ___ |
| **Base de Clientes (pontos)** | Custo de aquisicao | R$ ___ |
| **Tecnologia (telemetria)** | Custo de desenvolvimento | R$ ___ |
| **Total Intangiveis** | | R$ ___ |

**4.3 — Valor Patrimonial Ajustado**

```
VALOR PATRIMONIAL AJUSTADO
============================================================
(+) Ativos tangiveis (valor mercado)    R$ ___
(+) Ativos intangiveis                  R$ ___
(-) Passivos totais                     R$ ___
(-) Passivos contingentes               R$ ___
(=) PATRIMONIO LIQUIDO AJUSTADO         R$ ___
============================================================
```

---

### Phase 5: Ajustes e Premios/Descontos

**5.1 — Fatores de Ajuste**

| Fator | Tipo | Percentual | Justificativa |
|-------|------|-----------|---------------|
| Premio de marca | Premio | +X% | Marca reconhecida, selo ABF |
| Premio de crescimento | Premio | +X% | Mercado em expansao, runway |
| Desconto de liquidez | Desconto | -X% | Empresa fechada, sem liquidez |
| Desconto de pessoa-chave | Desconto | -X% | Dependencia do fundador |
| Desconto de concentracao | Desconto | -X% | Concentracao geografica |
| Premio de rede | Premio | +X% | Network effect, 90 franqueados |

**5.2 — Valuation Ajustado**

```
CONSOLIDACAO DO VALUATION
============================================================
| Metodologia | Valor Base | Ajustes | Valor Final | Peso |
|-------------|-----------|---------|-------------|------|
| DCF | R$ | +/-X% | R$ | 40% |
| Multiplos | R$ | +/-X% | R$ | 40% |
| Patrimonial | R$ | +/-X% | R$ | 20% |

VALOR PONDERADO: R$ ___

RANGE FINAL:
  Minimo:  R$ ___
  Medio:   R$ ___
  Maximo:  R$ ___

============================================================
```

---

### Phase 6: Analise de Sensibilidade

**6.1 — Sensibilidade ao WACC e Crescimento**

```
SENSIBILIDADE — VALOR DCF (R$ Milhoes)
============================================================
         | g = 2% | g = 3% | g = 4% | g = 5% |
---------|--------|--------|--------|--------|
WACC 12% | | | | |
WACC 14% | | | | |
WACC 16% | | | | |
WACC 18% | | | | |
WACC 20% | | | | |
============================================================
```

**6.2 — Sensibilidade ao Numero de Franqueados**

```
IMPACTO DO CRESCIMENTO DA REDE NO VALOR
============================================================
| Cenario | Franqueados (5 anos) | Valor DCF | Valor Multiplos |
|---------|---------------------|-----------|----------------|
| Estagnacao | 90 (sem crescimento) | R$ | R$ |
| Conservador | 120 (+33%) | R$ | R$ |
| Base | 165 (+83%) | R$ | R$ |
| Otimista | 220 (+144%) | R$ | R$ |
============================================================
```

---

## Validation

### Criterios de Qualidade do Valuation

| Criterio | Requisito | Verificacao |
|----------|-----------|-------------|
| Multiplas metodologias | Minimo 2, idealmente 3 | [ ] |
| Dados confiaveis | Demonstracoes financeiras verificadas | [ ] |
| Premissas documentadas | Toda premissa justificada | [ ] |
| Sensibilidade | Analise de sensibilidade incluida | [ ] |
| Comparaveis | Multiplos de mercado referenciados | [ ] |
| Intangiveis | Marca e rede valorados | [ ] |
| Ajustes | Premios/descontos justificados | [ ] |
| Range | Faixa de valor (nao valor unico) | [ ] |
| Contingencias | Passivos contingentes considerados | [ ] |
| Independencia | Valuation imparcial | [ ] |

### Checklist de Entrega

- [ ] `franchise-valuation-report.md` gerado
- [ ] `valuation-summary.md` gerado
- [ ] `methodology-notes.md` gerado
- [ ] DCF calculado com projecao 5 anos
- [ ] Multiplos de mercado aplicados
- [ ] Valor patrimonial ajustado calculado
- [ ] Intangiveis (marca, rede) valorados
- [ ] Analise de sensibilidade completa
- [ ] Range de valor consolidado
- [ ] Premissas documentadas

---

## References

- **Damodaran, Aswath.** "Investment Valuation." Wiley. — DCF methodology.
- **Damodaran, Aswath.** "The Dark Side of Valuation." Wiley. — Valuing intangibles.
- **ABF.** Dados de transacoes e multiplos do setor de franquias.
- **CVM.** Instrucoes sobre laudos de avaliacao.
- **Siebert, Mark.** "Franchise Your Business." — Franchise valuation principles.
- **Brealey, Myers & Allen.** "Principles of Corporate Finance." — WACC e DCF.
- **Brand Finance.** Metodologia de avaliacao de marcas (brand equity).
- **IBCPF.** Metodologias de valuation para empresas brasileiras.

---

*Task version 1.0.0 — Squad Franchising Avend — FA-TASK-009*
