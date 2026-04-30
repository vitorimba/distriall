# Network Health Report — Q{{quarter}} {{ano}}
# Template de relatorio de saude da rede
# Squad: Avend Franquias
# Updated: 2026-03-13

> **Periodo:** {{data_inicio}} a {{data_fim}}
> **Total de franqueados:** {{total_franqueados}}
> **Total de maquinas ativas:** {{total_maquinas}}
> **Health Score:** {{health_score}}/100 — **{{classificacao_saude}}**
> **Elaborado por:** {{elaborado_por}}

---

## Executive Summary

{{resumo_executivo}}

### Indicadores-Chave

| Indicador | Atual | Anterior | Variacao | Status |
|-----------|-------|----------|----------|--------|
| Faturamento total rede | R$ {{fat_total}} | R$ {{fat_total_ant}} | {{var_fat}}% | {{status_fat}} |
| Faturamento medio/franqueado | R$ {{fat_medio}} | R$ {{fat_medio_ant}} | {{var_fat_medio}}% | {{status_fat_medio}} |
| NPS medio | {{nps}} | {{nps_ant}} | {{var_nps}} | {{status_nps}} |
| Uptime medio | {{uptime}}% | {{uptime_ant}}% | {{var_uptime}}pp | {{status_uptime}} |
| Churn | {{churn}}% | {{churn_ant}}% | {{var_churn}}pp | {{status_churn}} |
| Inadimplencia | {{inadimplencia}}% | {{inadimplencia_ant}}% | {{var_inadimplencia}}pp | {{status_inadimplencia}} |

---

## 1. Health Score Detalhado

### 1.1 Score por Dimensao

| Dimensao | Peso | Score | Ponderado | Status |
|----------|------|-------|-----------|--------|
| Performance Financeira | 30% | {{score_financeiro}}/100 | {{pond_financeiro}} | {{status_financeiro}} |
| Saude Operacional | 25% | {{score_operacional}}/100 | {{pond_operacional}} | {{status_operacional}} |
| Satisfacao da Rede | 25% | {{score_satisfacao}}/100 | {{pond_satisfacao}} | {{status_satisfacao}} |
| Crescimento | 20% | {{score_crescimento}}/100 | {{pond_crescimento}} | {{status_crescimento}} |
| **TOTAL** | **100%** | | **{{health_score}}/100** | **{{classificacao_saude}}** |

### 1.2 Evolucao do Health Score

| Trimestre | Score | Classificacao |
|-----------|-------|--------------|
| Q{{q_3_antes}} | {{score_q3}} | {{class_q3}} |
| Q{{q_2_antes}} | {{score_q2}} | {{class_q2}} |
| Q{{q_1_antes}} | {{score_q1}} | {{class_q1}} |
| **Q{{quarter}} (atual)** | **{{health_score}}** | **{{classificacao_saude}}** |

---

## 2. Performance Financeira

### 2.1 Faturamento da Rede

| Metrica | Valor | Benchmark | Status |
|---------|-------|-----------|--------|
| Faturamento total | R$ {{fat_total}} | — | — |
| Medio por franqueado | R$ {{fat_medio}} | R$ 25k-50k | {{status_fat_bench}} |
| Medio por maquina | R$ {{fat_maquina}} | R$ 3k-8k | {{status_maq_bench}} |
| Ticket medio | R$ {{ticket_medio}} | R$ 5-12 | {{status_ticket}} |
| Vendas/maquina/dia | {{vendas_dia}} | 15-40 | {{status_vendas_dia}} |

### 2.2 Distribuicao de Faturamento

| Percentil | Valor | Franqueados |
|-----------|-------|-------------|
| P90 (top 10%) | R$ {{p90}} | {{franqueados_p90}} |
| P75 | R$ {{p75}} | {{franqueados_p75}} |
| P50 (mediana) | R$ {{p50}} | {{franqueados_p50}} |
| P25 | R$ {{p25}} | {{franqueados_p25}} |
| P10 (bottom 10%) | R$ {{p10}} | {{franqueados_p10}} |

### 2.3 Margem e Rentabilidade

| Metrica | Medio | Min | Max |
|---------|-------|-----|-----|
| Margem bruta | {{margem_bruta}}% | {{margem_bruta_min}}% | {{margem_bruta_max}}% |
| Margem liquida | {{margem_liq}}% | {{margem_liq_min}}% | {{margem_liq_max}}% |

### 2.4 Receita da Franqueadora

| Fonte | Valor | % Total |
|-------|-------|---------|
| Royalties | R$ {{receita_royalties}} | {{pct_royalties}}% |
| Taxas de franquia | R$ {{receita_taxas}} | {{pct_taxas}}% |
| Outras receitas | R$ {{receita_outras}} | {{pct_outras}}% |
| **Total** | **R$ {{receita_total}}** | **100%** |

---

## 3. Saude Operacional

### 3.1 KPIs Operacionais

| Metrica | Valor | Benchmark | Status |
|---------|-------|-----------|--------|
| Uptime medio | {{uptime}}% | >95% | {{status_uptime}} |
| Ruptura de estoque | {{ruptura}}% | <5% | {{status_ruptura}} |
| Tempo medio reparo | {{tmr}}h | <24h | {{status_tmr}} |
| Freq. abastecimento | {{freq_abast}} dias | 2-4 dias | {{status_freq}} |

### 3.2 Top 5 Problemas Operacionais

| # | Problema | Frequencia | Impacto | Acao |
|---|----------|-----------|---------|------|
| 1 | {{problema_1}} | {{freq_1}} | {{impacto_1}} | {{acao_1}} |
| 2 | {{problema_2}} | {{freq_2}} | {{impacto_2}} | {{acao_2}} |
| 3 | {{problema_3}} | {{freq_3}} | {{impacto_3}} | {{acao_3}} |
| 4 | {{problema_4}} | {{freq_4}} | {{impacto_4}} | {{acao_4}} |
| 5 | {{problema_5}} | {{freq_5}} | {{impacto_5}} | {{acao_5}} |

---

## 4. Satisfacao da Rede

### 4.1 NPS e CSAT

| Metrica | Score | Anterior | Tendencia |
|---------|-------|----------|-----------|
| NPS | {{nps}} | {{nps_ant}} | {{tendencia_nps}} |
| CSAT geral | {{csat}}/5 | {{csat_ant}}/5 | {{tendencia_csat}} |
| Suporte tecnico | {{csat_suporte}}/5 | | |
| Consultor campo | {{csat_consultor}}/5 | | |
| Sistemas | {{csat_sistemas}}/5 | | |
| Retorno financeiro | {{csat_financeiro}}/5 | | |

### 4.2 Distribuicao NPS

| Categoria | Quantidade | % |
|-----------|-----------|---|
| Promotores (9-10) | {{promotores}} | {{pct_promotores}}% |
| Neutros (7-8) | {{neutros}} | {{pct_neutros}}% |
| Detratores (0-6) | {{detratores}} | {{pct_detratores}}% |

### 4.3 Principais Feedbacks Qualitativos

**Pontos positivos:**
1. {{feedback_pos_1}}
2. {{feedback_pos_2}}
3. {{feedback_pos_3}}

**Pontos de melhoria:**
1. {{feedback_neg_1}}
2. {{feedback_neg_2}}
3. {{feedback_neg_3}}

---

## 5. Crescimento

### 5.1 Expansao da Rede

| Metrica | Trimestre | Acumulado Ano |
|---------|-----------|---------------|
| Novos franqueados | {{novos_franqueados}} | {{novos_acum}} |
| Desligamentos | {{desligamentos}} | {{deslig_acum}} |
| Saldo liquido | {{saldo_liquido}} | {{saldo_acum}} |
| Novas maquinas | {{novas_maquinas}} | {{maq_acum}} |
| Pipeline de candidatos | {{pipeline}} | — |

### 5.2 Metas vs Realizado

| Meta | Target | Realizado | % |
|------|--------|-----------|---|
| Novos franqueados | {{meta_franqueados}} | {{real_franqueados}} | {{pct_meta_franq}}% |
| Faturamento rede | R$ {{meta_fat}} | R$ {{real_fat}} | {{pct_meta_fat}}% |
| NPS | {{meta_nps}} | {{real_nps}} | {{pct_meta_nps}}% |

---

## 6. Classificacao dos Franqueados

### 6.1 Clusters

| Cluster | Criterio | Quantidade | % | Acao |
|---------|----------|-----------|---|------|
| Stars | Fat > P75 E Margem > P75 | {{stars}} | {{pct_stars}}% | Estudar e replicar |
| Promising | Fat > P50 E crescente | {{promising}} | {{pct_promising}}% | Acelerar |
| Stable | Fat P25-P75 E margem + | {{stable}} | {{pct_stable}}% | Manter |
| At Risk | Fat < P25 OU margem - | {{at_risk}} | {{pct_at_risk}}% | Plano de recuperacao |

### 6.2 Top 3 Franqueados

| # | Franqueado | Faturamento | Margem | NPS |
|---|-----------|-------------|--------|-----|
| 1 | {{top_1}} | R$ {{fat_top_1}} | {{margem_top_1}}% | {{nps_top_1}} |
| 2 | {{top_2}} | R$ {{fat_top_2}} | {{margem_top_2}}% | {{nps_top_2}} |
| 3 | {{top_3}} | R$ {{fat_top_3}} | {{margem_top_3}}% | {{nps_top_3}} |

### 6.3 Franqueados At Risk

| # | Franqueado | Problema Principal | Acao Proposta |
|---|-----------|-------------------|---------------|
{{lista_at_risk}}

---

## 7. Plano de Acao

### 7.1 Quick Wins (30 dias)

| # | Acao | Responsavel | Prazo | KPI |
|---|------|-------------|-------|-----|
| 1 | {{qw_1}} | {{resp_qw_1}} | {{prazo_qw_1}} | {{kpi_qw_1}} |
| 2 | {{qw_2}} | {{resp_qw_2}} | {{prazo_qw_2}} | {{kpi_qw_2}} |
| 3 | {{qw_3}} | {{resp_qw_3}} | {{prazo_qw_3}} | {{kpi_qw_3}} |

### 7.2 Melhorias Operacionais (90 dias)

| # | Acao | Responsavel | Prazo | KPI |
|---|------|-------------|-------|-----|
| 1 | {{mo_1}} | {{resp_mo_1}} | {{prazo_mo_1}} | {{kpi_mo_1}} |
| 2 | {{mo_2}} | {{resp_mo_2}} | {{prazo_mo_2}} | {{kpi_mo_2}} |
| 3 | {{mo_3}} | {{resp_mo_3}} | {{prazo_mo_3}} | {{kpi_mo_3}} |

### 7.3 Investimentos Estrategicos (180 dias)

| # | Acao | Responsavel | Investimento | ROI Esperado |
|---|------|-------------|-------------|-------------|
| 1 | {{ie_1}} | {{resp_ie_1}} | R$ {{inv_ie_1}} | {{roi_ie_1}} |
| 2 | {{ie_2}} | {{resp_ie_2}} | R$ {{inv_ie_2}} | {{roi_ie_2}} |

---

## 8. Proxima Review

- **Data prevista:** {{data_proxima_review}}
- **Metas para proximo trimestre:**
  - {{meta_prox_1}}
  - {{meta_prox_2}}
  - {{meta_prox_3}}

---

*Avend Franquias — Network Health Report Q{{quarter}} {{ano}}*
*Squad Franchising v1.0.0-pro*
