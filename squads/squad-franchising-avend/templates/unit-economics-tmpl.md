# Unit Economics — Modelo {{modelo_nome}}
# Template de modelo de unit economics para unidade franqueada
# Squad: Avend Franquias
# Updated: 2026-03-13

> **Modelo:** {{modelo_nome}}
> **Investimento total:** R$ {{investimento_total}}
> **Maquinas:** {{num_maquinas}} unidades
> **Data:** {{data_elaboracao}}
> **Versao:** {{versao_modelo}}

---

## 1. Investimento Inicial

### 1.1 Composicao do Investimento

| # | Item | Valor | % Total | Notas |
|---|------|-------|---------|-------|
| 1 | Taxa de franquia | R$ {{taxa_franquia}} | {{pct_taxa}}% | Pagamento unico |
| 2 | Maquinas ({{num_maquinas}} unidades) | R$ {{custo_maquinas}} | {{pct_maquinas}}% | {{tipo_maquinas}} |
| 3 | Instalacao e logistica | R$ {{custo_instalacao}} | {{pct_instalacao}}% | Transporte + setup |
| 4 | Estoque inicial | R$ {{custo_estoque}} | {{pct_estoque}}% | Primeiro carregamento |
| 5 | Capital de giro (3 meses) | R$ {{capital_giro}} | {{pct_giro}}% | Operacao inicial |
| 6 | Treinamento | R$ {{custo_treinamento}} | {{pct_treinamento}}% | {{incluido_ou_extra}} |
| 7 | Marketing inicial | R$ {{custo_mkt}} | {{pct_mkt}}% | Material + lancamento |
| 8 | Telemetria e sistemas | R$ {{custo_telemetria}} | {{pct_telemetria}}% | Hardware + setup |
| 9 | Reserva tecnica | R$ {{reserva_tecnica}} | {{pct_reserva}}% | Imprevistos |
| | **TOTAL** | **R$ {{investimento_total}}** | **100%** | |

### 1.2 Variantes do Modelo

| Variante | Maquinas | Investimento | Perfil |
|----------|----------|-------------|--------|
| Starter | {{var_starter_maq}} | R$ {{var_starter_inv}} | {{var_starter_perfil}} |
| Standard | {{var_standard_maq}} | R$ {{var_standard_inv}} | {{var_standard_perfil}} |
| Premium | {{var_premium_maq}} | R$ {{var_premium_inv}} | {{var_premium_perfil}} |

---

## 2. DRE Projetada — Mensal

### 2.1 Cenario Realista

| Linha | Valor/Mes | % Fat |
|-------|-----------|-------|
| **RECEITA BRUTA** | **R$ {{receita_bruta}}** | **100%** |
| (-) Impostos ({{regime_tributario}}) | R$ {{impostos}} | {{pct_impostos}}% |
| **RECEITA LIQUIDA** | **R$ {{receita_liquida}}** | {{pct_rec_liq}}% |
| | | |
| **CUSTO DOS PRODUTOS (CMV)** | | |
| Produtos para venda | R$ {{cmv_produtos}} | {{pct_cmv_produtos}}% |
| Perdas e vencidos ({{taxa_perdas}}%) | R$ {{cmv_perdas}} | {{pct_cmv_perdas}}% |
| **Total CMV** | **R$ {{cmv_total}}** | **{{pct_cmv}}%** |
| | | |
| **MARGEM BRUTA** | **R$ {{margem_bruta}}** | **{{pct_margem_bruta}}%** |
| | | |
| **DESPESAS OPERACIONAIS** | | |
| Royalties ({{taxa_royalties}}%) | R$ {{desp_royalties}} | {{pct_desp_royalties}}% |
| Fundo de marketing ({{taxa_fundo_mkt}}%) | R$ {{desp_fundo_mkt}} | {{pct_desp_fundo_mkt}}% |
| Aluguel de espaco (pontos de venda) | R$ {{desp_aluguel}} | {{pct_desp_aluguel}}% |
| Transporte/combustivel | R$ {{desp_transporte}} | {{pct_desp_transporte}}% |
| Manutencao (preventiva + corretiva) | R$ {{desp_manutencao}} | {{pct_desp_manutencao}}% |
| Energia eletrica (se aplicavel) | R$ {{desp_energia}} | {{pct_desp_energia}}% |
| Telecomunicacao (telemetria) | R$ {{desp_telecom}} | {{pct_desp_telecom}}% |
| Seguro | R$ {{desp_seguro}} | {{pct_desp_seguro}}% |
| Contabilidade | R$ {{desp_contabilidade}} | {{pct_desp_contabilidade}}% |
| Outras despesas | R$ {{desp_outras}} | {{pct_desp_outras}}% |
| **Total Despesas Operacionais** | **R$ {{desp_total}}** | **{{pct_desp_total}}%** |
| | | |
| **EBITDA** | **R$ {{ebitda}}** | **{{pct_ebitda}}%** |
| | | |
| (-) Depreciacao | R$ {{depreciacao}} | {{pct_depreciacao}}% |
| | | |
| **LUCRO LIQUIDO** | **R$ {{lucro_liquido}}** | **{{pct_lucro_liquido}}%** |

### 2.2 Tres Cenarios

| Linha | Pessimista | Realista | Otimista |
|-------|-----------|----------|----------|
| Receita Bruta | R$ {{fat_pessimista}} | R$ {{receita_bruta}} | R$ {{fat_otimista}} |
| CMV | R$ {{cmv_pessimista}} | R$ {{cmv_total}} | R$ {{cmv_otimista}} |
| Margem Bruta | {{mb_pct_pessimista}}% | {{pct_margem_bruta}}% | {{mb_pct_otimista}}% |
| Despesas Operacionais | R$ {{desp_pessimista}} | R$ {{desp_total}} | R$ {{desp_otimista}} |
| EBITDA | R$ {{ebitda_pessimista}} | R$ {{ebitda}} | R$ {{ebitda_otimista}} |
| Margem EBITDA | {{ebitda_pct_pessimista}}% | {{pct_ebitda}}% | {{ebitda_pct_otimista}}% |
| Lucro Liquido | R$ {{ll_pessimista}} | R$ {{lucro_liquido}} | R$ {{ll_otimista}} |

---

## 3. Metricas por Maquina

### 3.1 Performance por Maquina

| Metrica | Pessimista | Realista | Otimista |
|---------|-----------|----------|----------|
| Faturamento/maquina/mes | R$ {{fat_maq_pess}} | R$ {{fat_maq_real}} | R$ {{fat_maq_otim}} |
| Vendas/maquina/dia | {{vendas_dia_pess}} | {{vendas_dia_real}} | {{vendas_dia_otim}} |
| Ticket medio | R$ {{ticket_pess}} | R$ {{ticket_real}} | R$ {{ticket_otim}} |
| Lucro/maquina/mes | R$ {{lucro_maq_pess}} | R$ {{lucro_maq_real}} | R$ {{lucro_maq_otim}} |

### 3.2 Benchmark do Setor

| Metrica | Avend | Media Setor | vs Setor |
|---------|-------|-------------|----------|
| Fat/maquina/mes | R$ {{fat_maq_real}} | R$ {{bench_fat}} | {{vs_bench_fat}} |
| Ticket medio | R$ {{ticket_real}} | R$ {{bench_ticket}} | {{vs_bench_ticket}} |
| Margem bruta | {{pct_margem_bruta}}% | {{bench_margem}}% | {{vs_bench_margem}} |

---

## 4. Fluxo de Caixa — 24 Meses

### 4.1 Projecao Mensal (Cenario Realista)

| Mes | Receita | Custos | Fluxo Mes | Fluxo Acum |
|-----|---------|--------|-----------|------------|
| 0 | — | R$ {{investimento_total}} | -R$ {{investimento_total}} | -R$ {{investimento_total}} |
| 1 | R$ {{fc_rec_m1}} | R$ {{fc_cust_m1}} | R$ {{fc_fluxo_m1}} | R$ {{fc_acum_m1}} |
| 2 | R$ {{fc_rec_m2}} | R$ {{fc_cust_m2}} | R$ {{fc_fluxo_m2}} | R$ {{fc_acum_m2}} |
| 3 | R$ {{fc_rec_m3}} | R$ {{fc_cust_m3}} | R$ {{fc_fluxo_m3}} | R$ {{fc_acum_m3}} |
| 6 | R$ {{fc_rec_m6}} | R$ {{fc_cust_m6}} | R$ {{fc_fluxo_m6}} | R$ {{fc_acum_m6}} |
| 9 | R$ {{fc_rec_m9}} | R$ {{fc_cust_m9}} | R$ {{fc_fluxo_m9}} | R$ {{fc_acum_m9}} |
| 12 | R$ {{fc_rec_m12}} | R$ {{fc_cust_m12}} | R$ {{fc_fluxo_m12}} | R$ {{fc_acum_m12}} |
| 18 | R$ {{fc_rec_m18}} | R$ {{fc_cust_m18}} | R$ {{fc_fluxo_m18}} | R$ {{fc_acum_m18}} |
| 24 | R$ {{fc_rec_m24}} | R$ {{fc_cust_m24}} | R$ {{fc_fluxo_m24}} | R$ {{fc_acum_m24}} |

### 4.2 Breakeven e Payback

| Metrica | Pessimista | Realista | Otimista |
|---------|-----------|----------|----------|
| Breakeven operacional | Mes {{be_pess}} | Mes {{be_real}} | Mes {{be_otim}} |
| Payback do investimento | Mes {{pb_pess}} | Mes {{pb_real}} | Mes {{pb_otim}} |
| ROI 12 meses | {{roi12_pess}}% | {{roi12_real}}% | {{roi12_otim}}% |
| ROI 24 meses | {{roi24_pess}}% | {{roi24_real}}% | {{roi24_otim}}% |

---

## 5. Analise de Sensibilidade

### 5.1 Variaveis-Chave

| Variavel | Base | -20% | -10% | +10% | +20% | Impacto no Lucro |
|----------|------|------|------|------|------|-----------------|
| Faturamento | R$ {{receita_bruta}} | R$ {{sens_fat_m20}} | R$ {{sens_fat_m10}} | R$ {{sens_fat_p10}} | R$ {{sens_fat_p20}} | {{sens_fat_imp}} |
| CMV (%) | {{pct_cmv}}% | {{sens_cmv_m20}}% | {{sens_cmv_m10}}% | {{sens_cmv_p10}}% | {{sens_cmv_p20}}% | {{sens_cmv_imp}} |
| Aluguel pontos | R$ {{desp_aluguel}} | — | — | R$ {{sens_alug_p10}} | R$ {{sens_alug_p20}} | {{sens_alug_imp}} |
| Combustivel | R$ {{desp_transporte}} | — | — | R$ {{sens_comb_p10}} | R$ {{sens_comb_p20}} | {{sens_comb_imp}} |

### 5.2 Ponto de Equilibrio

| Metrica | Valor |
|---------|-------|
| Fat. minimo para breakeven | R$ {{fat_breakeven}} |
| Vendas/dia/maquina minimas | {{vendas_breakeven}} |
| Num minimo de maquinas ativas | {{maq_breakeven}} |

---

## 6. Premissas

### 6.1 Premissas de Receita

- Dias de operacao/mes: {{dias_operacao}}
- Horas de operacao/dia: {{horas_operacao}}
- Sazonalidade: {{sazonalidade}}
- Crescimento mensal (ramp-up): {{crescimento_rampup}}%
- Meses ate maturidade: {{meses_maturidade}}

### 6.2 Premissas de Custo

- Regime tributario: {{regime_tributario}}
- Aliquota efetiva: {{aliquota}}%
- Markup medio produtos: {{markup}}%
- Taxa de perda/vencimento: {{taxa_perdas}}%
- Depreciacao (vida util): {{vida_util}} meses

### 6.3 Premissas Macro

- Inflacao projetada: {{inflacao}}%
- Reajuste de aluguel: {{reajuste_aluguel}}
- Reajuste de produtos: {{reajuste_produtos}}

---

## 7. Disclaimer

> **AVISO IMPORTANTE:** Este modelo de unit economics e uma PROJECAO
> baseada em dados historicos e premissas informadas. Os resultados
> reais podem variar significativamente dependendo de fatores como
> localizacao, dedicacao do franqueado, condicoes economicas, sazonalidade,
> concorrencia local e outros. Este documento NAO constitui garantia
> de resultado financeiro. O candidato deve realizar sua propria analise
> e consultar profissionais financeiros antes de tomar a decisao de
> investimento.

---

*Avend Franquias — Unit Economics v{{versao_modelo}}*
*Squad Franchising v1.0.0-pro*
