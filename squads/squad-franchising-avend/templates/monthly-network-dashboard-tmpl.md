# Dashboard Mensal da Rede — {{mes_referencia}}/{{ano_referencia}}
# Template de dashboard mensal consolidado da rede Avend Franquias
# Squad: franchising-avend
# Updated: 2026-03-13

> **Periodo:** {{data_inicio}} a {{data_fim}}
> **Rede:** Avend Franquias — Vending Machines
> **Total de franqueados ativos:** {{total_franqueados}}
> **Total de maquinas ativas:** {{total_maquinas}}
> **Network Health Score:** {{health_score}}/100 — **{{classificacao_saude}}**
> **Elaborado por:** {{elaborado_por}}
> **Data de emissao:** {{data_emissao}}

---

## Executive Summary

{{resumo_executivo}}

### Destaques do Mes

| # | Destaque | Tipo | Impacto |
|---|----------|------|---------|
| 1 | {{destaque_1}} | {{tipo_destaque_1}} | {{impacto_destaque_1}} |
| 2 | {{destaque_2}} | {{tipo_destaque_2}} | {{impacto_destaque_2}} |
| 3 | {{destaque_3}} | {{tipo_destaque_3}} | {{impacto_destaque_3}} |
| 4 | {{destaque_4}} | {{tipo_destaque_4}} | {{impacto_destaque_4}} |
| 5 | {{destaque_5}} | {{tipo_destaque_5}} | {{impacto_destaque_5}} |

### Alertas Criticos

| # | Alerta | Severidade | Responsavel | Acao Requerida |
|---|--------|-----------|-------------|---------------|
| {{alerta_1_num}} | {{alerta_1_desc}} | {{alerta_1_sev}} | {{alerta_1_resp}} | {{alerta_1_acao}} |
| {{alerta_2_num}} | {{alerta_2_desc}} | {{alerta_2_sev}} | {{alerta_2_resp}} | {{alerta_2_acao}} |
| {{alerta_3_num}} | {{alerta_3_desc}} | {{alerta_3_sev}} | {{alerta_3_resp}} | {{alerta_3_acao}} |

---

## 1. Financial KPIs — Indicadores Financeiros

### 1.1 Faturamento da Rede

| Metrica | Atual | Mes Anterior | Variacao | YTD | Meta Mensal | Status |
|---------|-------|-------------|----------|-----|------------|--------|
| Faturamento total rede | R$ {{fat_total}} | R$ {{fat_total_ant}} | {{var_fat}}% | R$ {{fat_ytd}} | R$ {{meta_fat}} | {{status_fat}} |
| Faturamento medio/franqueado | R$ {{fat_medio_franqueado}} | R$ {{fat_medio_franqueado_ant}} | {{var_fat_medio}}% | R$ {{fat_medio_ytd}} | R$ {{meta_fat_medio}} | {{status_fat_medio}} |
| Faturamento medio/maquina | R$ {{fat_medio_maquina}} | R$ {{fat_medio_maquina_ant}} | {{var_fat_maquina}}% | — | R$ {{meta_fat_maquina}} | {{status_fat_maquina}} |
| Ticket medio | R$ {{ticket_medio}} | R$ {{ticket_medio_ant}} | {{var_ticket}}% | R$ {{ticket_ytd}} | R$ {{meta_ticket}} | {{status_ticket}} |
| Vendas/maquina/dia | {{vendas_dia}} | {{vendas_dia_ant}} | {{var_vendas_dia}}% | {{vendas_dia_ytd}} | {{meta_vendas_dia}} | {{status_vendas_dia}} |

### 1.2 Receita do Franqueador

| Metrica | Atual | Mes Anterior | Variacao | YTD | Status |
|---------|-------|-------------|----------|-----|--------|
| Royalties coletados | R$ {{royalties_coletados}} | R$ {{royalties_coletados_ant}} | {{var_royalties}}% | R$ {{royalties_ytd}} | {{status_royalties}} |
| Taxa de coleta de royalties | {{taxa_coleta_royalties}}% | {{taxa_coleta_ant}}% | {{var_taxa_coleta}}pp | {{taxa_coleta_ytd}}% | {{status_taxa_coleta}} |
| Receita de taxas de franquia (novas) | R$ {{receita_taxas_novas}} | R$ {{receita_taxas_novas_ant}} | — | R$ {{taxas_novas_ytd}} | {{status_taxas_novas}} |
| Receita de insumos/produtos | R$ {{receita_insumos}} | R$ {{receita_insumos_ant}} | {{var_insumos}}% | R$ {{insumos_ytd}} | {{status_insumos}} |
| Receita total franqueador | R$ {{receita_total_franqueador}} | R$ {{receita_total_franqueador_ant}} | {{var_receita_franqueador}}% | R$ {{receita_franqueador_ytd}} | {{status_receita_franqueador}} |

### 1.3 Inadimplencia

| Metrica | Atual | Mes Anterior | Variacao | Meta | Status |
|---------|-------|-------------|----------|------|--------|
| Taxa de inadimplencia | {{inadimplencia}}% | {{inadimplencia_ant}}% | {{var_inadimplencia}}pp | < 5% | {{status_inadimplencia}} |
| Franqueados inadimplentes | {{n_inadimplentes}} de {{total_franqueados}} | {{n_inadimplentes_ant}} | {{var_n_inadimplentes}} | — | {{status_n_inadimplentes}} |
| Valor total em atraso | R$ {{valor_atraso}} | R$ {{valor_atraso_ant}} | {{var_valor_atraso}}% | — | {{status_valor_atraso}} |
| Atraso medio (dias) | {{dias_atraso_medio}} | {{dias_atraso_medio_ant}} | {{var_dias_atraso}} | < 15 dias | {{status_dias_atraso}} |

### 1.4 Distribuicao de Faturamento por Franqueado

| Percentil | Faturamento/Mes | Quantidade | % da Rede |
|-----------|----------------|-----------|-----------|
| P90 (top 10%) | R$ {{p90_fat}} | {{n_p90}} | {{pct_p90}}% |
| P75 | R$ {{p75_fat}} | {{n_p75}} | {{pct_p75}}% |
| P50 (mediana) | R$ {{p50_fat}} | {{n_p50}} | {{pct_p50}}% |
| P25 | R$ {{p25_fat}} | {{n_p25}} | {{pct_p25}}% |
| P10 (bottom 10%) | R$ {{p10_fat}} | {{n_p10}} | {{pct_p10}}% |

---

## 2. Operational KPIs — Indicadores Operacionais

### 2.1 Disponibilidade e Uptime

| Metrica | Atual | Mes Anterior | Variacao | Meta | Status |
|---------|-------|-------------|----------|------|--------|
| Uptime medio da rede | {{uptime_medio}}% | {{uptime_medio_ant}}% | {{var_uptime}}pp | > 95% | {{status_uptime}} |
| Maquinas com uptime > 95% | {{n_uptime_95}}  ({{pct_uptime_95}}%) | {{n_uptime_95_ant}} | — | > 80% da rede | {{status_pct_uptime}} |
| Maquinas com uptime < 80% | {{n_uptime_baixo}} ({{pct_uptime_baixo}}%) | {{n_uptime_baixo_ant}} | — | < 5% da rede | {{status_uptime_baixo}} |
| MTBF medio (dias) | {{mtbf}} | {{mtbf_ant}} | {{var_mtbf}} | > 30 dias | {{status_mtbf}} |
| MTTR medio (horas) | {{mttr}} | {{mttr_ant}} | {{var_mttr}} | < 24h | {{status_mttr}} |

### 2.2 Abastecimento (Reposicao)

| Metrica | Atual | Mes Anterior | Variacao | Meta | Status |
|---------|-------|-------------|----------|------|--------|
| Frequencia media de reposicao | {{freq_reposicao}} dias | {{freq_reposicao_ant}} dias | {{var_freq_rep}} | 2-4 dias | {{status_freq_rep}} |
| Taxa de ruptura (stockout) | {{taxa_ruptura}}% | {{taxa_ruptura_ant}}% | {{var_ruptura}}pp | < 5% | {{status_ruptura}} |
| Desperdicio (produtos vencidos) | {{taxa_desperdicio}}% | {{taxa_desperdicio_ant}}% | {{var_desperdicio}}pp | < 2% | {{status_desperdicio}} |
| Compliance FIFO | {{compliance_fifo}}% | {{compliance_fifo_ant}}% | {{var_fifo}}pp | > 95% | {{status_fifo}} |

### 2.3 Manutencao

| Metrica | Atual | Mes Anterior | Variacao | Meta | Status |
|---------|-------|-------------|----------|------|--------|
| Chamados tecnicos abertos | {{chamados_abertos}} | {{chamados_abertos_ant}} | {{var_chamados}} | — | {{status_chamados}} |
| Chamados resolvidos no mes | {{chamados_resolvidos}} | {{chamados_resolvidos_ant}} | — | > 90% | {{status_resolvidos}} |
| SLA de manutencao (% dentro do prazo) | {{sla_manutencao}}% | {{sla_manutencao_ant}}% | {{var_sla}}pp | > 90% | {{status_sla}} |
| Custo medio de manutencao/maquina | R$ {{custo_manut_maq}} | R$ {{custo_manut_maq_ant}} | {{var_custo_manut}}% | < R$150 | {{status_custo_manut}} |
| Top 3 tipos de chamado | {{top_chamado_1}}, {{top_chamado_2}}, {{top_chamado_3}} | — | — | — | — |

### 2.4 NPS da Rede (Satisfacao dos Franqueados)

| Metrica | Atual | Mes Anterior | Variacao | Meta | Status |
|---------|-------|-------------|----------|------|--------|
| NPS medio da rede | {{nps_medio}} | {{nps_medio_ant}} | {{var_nps}} | > 50 | {{status_nps}} |
| Promotores (9-10) | {{n_promotores}} ({{pct_promotores}}%) | {{n_promotores_ant}} | — | > 50% | {{status_promotores}} |
| Neutros (7-8) | {{n_neutros}} ({{pct_neutros}}%) | {{n_neutros_ant}} | — | — | — |
| Detratores (0-6) | {{n_detratores}} ({{pct_detratores}}%) | {{n_detratores_ant}} | — | < 15% | {{status_detratores}} |
| Principal elogio | {{principal_elogio}} | — | — | — | — |
| Principal reclamacao | {{principal_reclamacao}} | — | — | — | — |

---

## 3. Growth KPIs — Indicadores de Crescimento

### 3.1 Expansao da Rede

| Metrica | Atual | Mes Anterior | Variacao | YTD | Meta Anual | Status |
|---------|-------|-------------|----------|-----|-----------|--------|
| Novas unidades (franqueados) | {{novas_unidades}} | {{novas_unidades_ant}} | — | {{novas_ytd}} | {{meta_novas_anual}} | {{status_novas}} |
| Novas maquinas instaladas | {{novas_maquinas}} | {{novas_maquinas_ant}} | — | {{maquinas_novas_ytd}} | {{meta_maquinas_anual}} | {{status_maquinas_novas}} |
| Churn (franqueados que sairam) | {{churn_mensal}} | {{churn_mensal_ant}} | — | {{churn_ytd}} | < {{meta_churn_anual}} | {{status_churn}} |
| Churn rate | {{churn_rate}}% | {{churn_rate_ant}}% | {{var_churn}}pp | {{churn_rate_ytd}}% | < 5% anual | {{status_churn_rate}} |
| Net growth (novas - churn) | {{net_growth}} | {{net_growth_ant}} | — | {{net_growth_ytd}} | +{{meta_net_growth}} | {{status_net_growth}} |

### 3.2 Pipeline de Candidatos

| Metrica | Atual | Mes Anterior | Variacao | Meta | Status |
|---------|-------|-------------|----------|------|--------|
| Leads recebidos | {{leads_total}} | {{leads_total_ant}} | {{var_leads}}% | {{meta_leads}} | {{status_leads}} |
| Leads qualificados | {{leads_qualificados}} ({{taxa_qualificacao}}%) | {{leads_qualificados_ant}} | {{var_leads_qual}}% | > 25% | {{status_leads_qual}} |
| Em due diligence | {{em_dd}} | {{em_dd_ant}} | — | — | — |
| Aprovados aguardando onboarding | {{aprovados_aguardando}} | {{aprovados_aguardando_ant}} | — | — | — |
| Taxa de conversao (lead to franqueado) | {{taxa_conversao}}% | {{taxa_conversao_ant}}% | {{var_conversao}}pp | 15-25% | {{status_conversao}} |
| Custo de aquisicao (CAF) | R$ {{caf}} | R$ {{caf_ant}} | {{var_caf}}% | < R$ {{meta_caf}} | {{status_caf}} |

### 3.3 Cobertura Territorial

| Metrica | Atual | Mes Anterior | Variacao | Meta | Status |
|---------|-------|-------------|----------|------|--------|
| Territorios ativos | {{territorios_ativos}} | {{territorios_ativos_ant}} | — | {{meta_territorios}} | {{status_territorios}} |
| Territorios disponiveis | {{territorios_disponiveis}} | {{territorios_disponiveis_ant}} | — | — | — |
| Estados com presenca | {{estados_presenca}} | {{estados_presenca_ant}} | — | {{meta_estados}} | {{status_estados}} |
| Cidades com franqueados | {{cidades_presenca}} | {{cidades_presenca_ant}} | — | {{meta_cidades}} | {{status_cidades}} |
| Saturacao media por territorio | {{saturacao_media}}% | {{saturacao_media_ant}}% | {{var_saturacao}}pp | 60-80% | {{status_saturacao}} |

### 3.4 Multi-Franqueados

| Metrica | Atual | Mes Anterior | Variacao | Meta | Status |
|---------|-------|-------------|----------|------|--------|
| Franqueados com 2+ contratos | {{multi_franqueados}} ({{pct_multi}}%) | {{multi_franqueados_ant}} | — | > 20% | {{status_multi}} |
| Media de maquinas/franqueado | {{media_maquinas_franqueado}} | {{media_maquinas_franqueado_ant}} | {{var_media_maq}} | > 3 | {{status_media_maq}} |
| Novas maquinas de franqueados existentes | {{maquinas_existentes}} | {{maquinas_existentes_ant}} | — | — | — |

---

## 4. Per-Cluster Breakdown — Segmentacao por Regiao

### 4.1 Performance por Estado/Regiao

| Estado/Regiao | Franqueados | Maquinas | Faturamento Total | Fat/Maquina | Uptime | NPS | Status |
|--------------|------------|----------|-------------------|-------------|--------|-----|--------|
| {{regiao_1}} | {{r1_franqueados}} | {{r1_maquinas}} | R$ {{r1_fat}} | R$ {{r1_fat_maq}} | {{r1_uptime}}% | {{r1_nps}} | {{r1_status}} |
| {{regiao_2}} | {{r2_franqueados}} | {{r2_maquinas}} | R$ {{r2_fat}} | R$ {{r2_fat_maq}} | {{r2_uptime}}% | {{r2_nps}} | {{r2_status}} |
| {{regiao_3}} | {{r3_franqueados}} | {{r3_maquinas}} | R$ {{r3_fat}} | R$ {{r3_fat_maq}} | {{r3_uptime}}% | {{r3_nps}} | {{r3_status}} |
| {{regiao_4}} | {{r4_franqueados}} | {{r4_maquinas}} | R$ {{r4_fat}} | R$ {{r4_fat_maq}} | {{r4_uptime}}% | {{r4_nps}} | {{r4_status}} |
| {{regiao_5}} | {{r5_franqueados}} | {{r5_maquinas}} | R$ {{r5_fat}} | R$ {{r5_fat_maq}} | {{r5_uptime}}% | {{r5_nps}} | {{r5_status}} |
| {{regiao_6}} | {{r6_franqueados}} | {{r6_maquinas}} | R$ {{r6_fat}} | R$ {{r6_fat_maq}} | {{r6_uptime}}% | {{r6_nps}} | {{r6_status}} |
| {{regiao_7}} | {{r7_franqueados}} | {{r7_maquinas}} | R$ {{r7_fat}} | R$ {{r7_fat_maq}} | {{r7_uptime}}% | {{r7_nps}} | {{r7_status}} |
| **TOTAL** | **{{total_franqueados}}** | **{{total_maquinas}}** | **R$ {{fat_total}}** | **R$ {{fat_medio_maquina}}** | **{{uptime_medio}}%** | **{{nps_medio}}** | — |

### 4.2 Analise Regional

**Melhor regiao do mes:** {{melhor_regiao}} — {{motivo_melhor_regiao}}

**Pior regiao do mes:** {{pior_regiao}} — {{motivo_pior_regiao}}

**Tendencias regionais:**
- {{tendencia_regional_1}}
- {{tendencia_regional_2}}
- {{tendencia_regional_3}}

---

## 5. Top/Bottom 5 Franqueados

### 5.1 Top 5 Franqueados (Melhor Performance)

| Ranking | Franqueado | Regiao | Maquinas | Faturamento | Fat/Maq | Uptime | NPS | Destaques |
|---------|-----------|--------|----------|-------------|---------|--------|-----|-----------|
| 1 | {{top1_nome}} | {{top1_regiao}} | {{top1_maq}} | R$ {{top1_fat}} | R$ {{top1_fat_maq}} | {{top1_uptime}}% | {{top1_nps}} | {{top1_destaque}} |
| 2 | {{top2_nome}} | {{top2_regiao}} | {{top2_maq}} | R$ {{top2_fat}} | R$ {{top2_fat_maq}} | {{top2_uptime}}% | {{top2_nps}} | {{top2_destaque}} |
| 3 | {{top3_nome}} | {{top3_regiao}} | {{top3_maq}} | R$ {{top3_fat}} | R$ {{top3_fat_maq}} | {{top3_uptime}}% | {{top3_nps}} | {{top3_destaque}} |
| 4 | {{top4_nome}} | {{top4_regiao}} | {{top4_maq}} | R$ {{top4_fat}} | R$ {{top4_fat_maq}} | {{top4_uptime}}% | {{top4_nps}} | {{top4_destaque}} |
| 5 | {{top5_nome}} | {{top5_regiao}} | {{top5_maq}} | R$ {{top5_fat}} | R$ {{top5_fat_maq}} | {{top5_uptime}}% | {{top5_nps}} | {{top5_destaque}} |

**O que os Top 5 tem em comum:**
- {{padrao_top_1}}
- {{padrao_top_2}}
- {{padrao_top_3}}

### 5.2 Bottom 5 Franqueados (Menor Performance)

| Ranking | Franqueado | Regiao | Maquinas | Faturamento | Fat/Maq | Uptime | NPS | Status Turnaround |
|---------|-----------|--------|----------|-------------|---------|--------|-----|-------------------|
| 1 | {{bot1_nome}} | {{bot1_regiao}} | {{bot1_maq}} | R$ {{bot1_fat}} | R$ {{bot1_fat_maq}} | {{bot1_uptime}}% | {{bot1_nps}} | {{bot1_turnaround}} |
| 2 | {{bot2_nome}} | {{bot2_regiao}} | {{bot2_maq}} | R$ {{bot2_fat}} | R$ {{bot2_fat_maq}} | {{bot2_uptime}}% | {{bot2_nps}} | {{bot2_turnaround}} |
| 3 | {{bot3_nome}} | {{bot3_regiao}} | {{bot3_maq}} | R$ {{bot3_fat}} | R$ {{bot3_fat_maq}} | {{bot3_uptime}}% | {{bot3_nps}} | {{bot3_turnaround}} |
| 4 | {{bot4_nome}} | {{bot4_regiao}} | {{bot4_maq}} | R$ {{bot4_fat}} | R$ {{bot4_fat_maq}} | {{bot4_uptime}}% | {{bot4_nps}} | {{bot4_turnaround}} |
| 5 | {{bot5_nome}} | {{bot5_regiao}} | {{bot5_maq}} | R$ {{bot5_fat}} | R$ {{bot5_fat_maq}} | {{bot5_uptime}}% | {{bot5_nps}} | {{bot5_turnaround}} |

**Causas comuns de underperformance:**
- {{causa_bottom_1}}
- {{causa_bottom_2}}
- {{causa_bottom_3}}

**Acoes em andamento:**
- {{acao_bottom_1}}
- {{acao_bottom_2}}
- {{acao_bottom_3}}

---

## 6. Month-over-Month Trends — Tendencias MoM

### 6.1 Evolucao dos Ultimos 6 Meses

| Metrica | {{m6_nome}} | {{m5_nome}} | {{m4_nome}} | {{m3_nome}} | {{m2_nome}} | {{m1_nome}} (atual) | Tendencia |
|---------|-----------|-----------|-----------|-----------|-----------|-------------------|-----------|
| Faturamento total | R$ {{m6_fat}} | R$ {{m5_fat}} | R$ {{m4_fat}} | R$ {{m3_fat}} | R$ {{m2_fat}} | R$ {{m1_fat}} | {{trend_fat}} |
| Fat/maquina | R$ {{m6_fat_maq}} | R$ {{m5_fat_maq}} | R$ {{m4_fat_maq}} | R$ {{m3_fat_maq}} | R$ {{m2_fat_maq}} | R$ {{m1_fat_maq}} | {{trend_fat_maq}} |
| Uptime | {{m6_uptime}}% | {{m5_uptime}}% | {{m4_uptime}}% | {{m3_uptime}}% | {{m2_uptime}}% | {{m1_uptime}}% | {{trend_uptime}} |
| NPS | {{m6_nps}} | {{m5_nps}} | {{m4_nps}} | {{m3_nps}} | {{m2_nps}} | {{m1_nps}} | {{trend_nps}} |
| Franqueados | {{m6_franq}} | {{m5_franq}} | {{m4_franq}} | {{m3_franq}} | {{m2_franq}} | {{m1_franq}} | {{trend_franq}} |
| Maquinas | {{m6_maq}} | {{m5_maq}} | {{m4_maq}} | {{m3_maq}} | {{m2_maq}} | {{m1_maq}} | {{trend_maq}} |
| Inadimplencia | {{m6_inad}}% | {{m5_inad}}% | {{m4_inad}}% | {{m3_inad}}% | {{m2_inad}}% | {{m1_inad}}% | {{trend_inad}} |
| Churn | {{m6_churn}} | {{m5_churn}} | {{m4_churn}} | {{m3_churn}} | {{m2_churn}} | {{m1_churn}} | {{trend_churn}} |

### 6.2 Analise de Tendencias

**Tendencias positivas:**
- {{tendencia_positiva_1}}
- {{tendencia_positiva_2}}
- {{tendencia_positiva_3}}

**Tendencias de atencao:**
- {{tendencia_atencao_1}}
- {{tendencia_atencao_2}}
- {{tendencia_atencao_3}}

**Tendencias negativas:**
- {{tendencia_negativa_1}}
- {{tendencia_negativa_2}}

### 6.3 Sazonalidade

| Fator Sazonal | Impacto Este Mes | Expectativa Proximo Mes |
|--------------|-----------------|------------------------|
| {{fator_sazonal_1}} | {{impacto_sazonal_1}} | {{expectativa_sazonal_1}} |
| {{fator_sazonal_2}} | {{impacto_sazonal_2}} | {{expectativa_sazonal_2}} |
| {{fator_sazonal_3}} | {{impacto_sazonal_3}} | {{expectativa_sazonal_3}} |

---

## 7. Action Items — Plano de Acao

### 7.1 Acoes Prioritarias (P0/P1)

| # | Acao | Prioridade | Responsavel | Deadline | Status | Dependencias |
|---|------|-----------|-------------|----------|--------|-------------|
| 1 | {{acao_p1_1}} | {{prio_1}} | {{resp_1}} | {{deadline_1}} | {{status_1}} | {{dep_1}} |
| 2 | {{acao_p1_2}} | {{prio_2}} | {{resp_2}} | {{deadline_2}} | {{status_2}} | {{dep_2}} |
| 3 | {{acao_p1_3}} | {{prio_3}} | {{resp_3}} | {{deadline_3}} | {{status_3}} | {{dep_3}} |
| 4 | {{acao_p1_4}} | {{prio_4}} | {{resp_4}} | {{deadline_4}} | {{status_4}} | {{dep_4}} |
| 5 | {{acao_p1_5}} | {{prio_5}} | {{resp_5}} | {{deadline_5}} | {{status_5}} | {{dep_5}} |

### 7.2 Acoes de Melhoria (P2/P3)

| # | Acao | Prioridade | Responsavel | Deadline | Status |
|---|------|-----------|-------------|----------|--------|
| 1 | {{acao_p2_1}} | {{prio_p2_1}} | {{resp_p2_1}} | {{deadline_p2_1}} | {{status_p2_1}} |
| 2 | {{acao_p2_2}} | {{prio_p2_2}} | {{resp_p2_2}} | {{deadline_p2_2}} | {{status_p2_2}} |
| 3 | {{acao_p2_3}} | {{prio_p2_3}} | {{resp_p2_3}} | {{deadline_p2_3}} | {{status_p2_3}} |
| 4 | {{acao_p2_4}} | {{prio_p2_4}} | {{resp_p2_4}} | {{deadline_p2_4}} | {{status_p2_4}} |
| 5 | {{acao_p2_5}} | {{prio_p2_5}} | {{resp_p2_5}} | {{deadline_p2_5}} | {{status_p2_5}} |

### 7.3 Followup de Acoes do Mes Anterior

| # | Acao (mes anterior) | Status | Resultado | Observacao |
|---|-------------------|--------|-----------|------------|
| 1 | {{followup_1_acao}} | {{followup_1_status}} | {{followup_1_resultado}} | {{followup_1_obs}} |
| 2 | {{followup_2_acao}} | {{followup_2_status}} | {{followup_2_resultado}} | {{followup_2_obs}} |
| 3 | {{followup_3_acao}} | {{followup_3_status}} | {{followup_3_resultado}} | {{followup_3_obs}} |
| 4 | {{followup_4_acao}} | {{followup_4_status}} | {{followup_4_resultado}} | {{followup_4_obs}} |
| 5 | {{followup_5_acao}} | {{followup_5_status}} | {{followup_5_resultado}} | {{followup_5_obs}} |

---

## 8. Programa de Turnaround — Status

### 8.1 Turnarounds Ativos

| Franqueado | Inicio | Fase Atual | Gate Mais Recente | Resultado Gate | Proximo Gate | Prognostico |
|-----------|--------|-----------|------------------|---------------|-------------|-------------|
| {{ta_1_nome}} | {{ta_1_inicio}} | {{ta_1_fase}} | {{ta_1_gate}} | {{ta_1_resultado}} | {{ta_1_prox_gate}} | {{ta_1_prognostico}} |
| {{ta_2_nome}} | {{ta_2_inicio}} | {{ta_2_fase}} | {{ta_2_gate}} | {{ta_2_resultado}} | {{ta_2_prox_gate}} | {{ta_2_prognostico}} |
| {{ta_3_nome}} | {{ta_3_inicio}} | {{ta_3_fase}} | {{ta_3_gate}} | {{ta_3_resultado}} | {{ta_3_prox_gate}} | {{ta_3_prognostico}} |

### 8.2 Metricas do Programa

| Metrica | Valor | Meta | Status |
|---------|-------|------|--------|
| Turnarounds ativos | {{turnarounds_ativos}} | — | — |
| Taxa de recuperacao (historico) | {{taxa_recuperacao}}% | > 65% | {{status_taxa_recuperacao}} |
| Tempo medio de recuperacao | {{tempo_medio_recuperacao}} dias | < 75 dias | {{status_tempo_recuperacao}} |
| Custo medio por turnaround | R$ {{custo_medio_turnaround}} | < R$5k | {{status_custo_turnaround}} |

---

## 9. Pipeline de Expansao — Status

### 9.1 Candidatos em Due Diligence

| Candidato | Fase | Score Atual | Territorio Pretendido | Previsao Conclusao | Status |
|----------|------|-------------|----------------------|-------------------|--------|
| {{dd_1_nome}} | {{dd_1_fase}} | {{dd_1_score}} | {{dd_1_territorio}} | {{dd_1_previsao}} | {{dd_1_status}} |
| {{dd_2_nome}} | {{dd_2_fase}} | {{dd_2_score}} | {{dd_2_territorio}} | {{dd_2_previsao}} | {{dd_2_status}} |
| {{dd_3_nome}} | {{dd_3_fase}} | {{dd_3_score}} | {{dd_3_territorio}} | {{dd_3_previsao}} | {{dd_3_status}} |
| {{dd_4_nome}} | {{dd_4_fase}} | {{dd_4_score}} | {{dd_4_territorio}} | {{dd_4_previsao}} | {{dd_4_status}} |
| {{dd_5_nome}} | {{dd_5_fase}} | {{dd_5_score}} | {{dd_5_territorio}} | {{dd_5_previsao}} | {{dd_5_status}} |

### 9.2 Onboarding em Andamento

| Franqueado | Fase Onboarding | Data Inicio | Previsao Operacao | Maquinas | Status |
|-----------|----------------|-------------|-------------------|----------|--------|
| {{ob_1_nome}} | {{ob_1_fase}} | {{ob_1_inicio}} | {{ob_1_previsao}} | {{ob_1_maq}} | {{ob_1_status}} |
| {{ob_2_nome}} | {{ob_2_fase}} | {{ob_2_inicio}} | {{ob_2_previsao}} | {{ob_2_maq}} | {{ob_2_status}} |
| {{ob_3_nome}} | {{ob_3_fase}} | {{ob_3_inicio}} | {{ob_3_previsao}} | {{ob_3_maq}} | {{ob_3_status}} |

---

## 10. Proximo Mes — Previsoes e Metas

### 10.1 Metas para {{proximo_mes}}

| KPI | Meta | Base (atual) | Crescimento Necessario |
|-----|------|-------------|----------------------|
| Faturamento total | R$ {{meta_prox_fat}} | R$ {{fat_total}} | {{crescimento_fat}}% |
| Novas unidades | {{meta_prox_novas}} | — | — |
| Uptime | > {{meta_prox_uptime}}% | {{uptime_medio}}% | {{crescimento_uptime}}pp |
| NPS | > {{meta_prox_nps}} | {{nps_medio}} | +{{crescimento_nps}} |
| Inadimplencia | < {{meta_prox_inad}}% | {{inadimplencia}}% | -{{reducao_inad}}pp |
| Leads qualificados | {{meta_prox_leads}} | {{leads_qualificados}} | {{crescimento_leads}}% |

### 10.2 Eventos e Marcos Importantes

| Data | Evento/Marco | Impacto Esperado | Responsavel |
|------|-------------|-----------------|-------------|
| {{evento_1_data}} | {{evento_1_desc}} | {{evento_1_impacto}} | {{evento_1_resp}} |
| {{evento_2_data}} | {{evento_2_desc}} | {{evento_2_impacto}} | {{evento_2_resp}} |
| {{evento_3_data}} | {{evento_3_desc}} | {{evento_3_impacto}} | {{evento_3_resp}} |

### 10.3 Riscos para o Proximo Mes

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|--------------|---------|-----------|
| {{risco_1}} | {{prob_1}} | {{imp_1}} | {{mit_1}} |
| {{risco_2}} | {{prob_2}} | {{imp_2}} | {{mit_2}} |
| {{risco_3}} | {{prob_3}} | {{imp_3}} | {{mit_3}} |

---

## Legenda de Status

| Icone | Significado | Criterio |
|-------|------------|---------|
| ON TRACK | Meta atingida ou acima | >= 100% da meta |
| WARNING | Proximo da meta, atencao necessaria | 80-99% da meta |
| OFF TRACK | Abaixo da meta, acao requerida | < 80% da meta |
| CRITICAL | Situacao critica, intervencao imediata | < 60% da meta ou deterioracao rapida |
| N/A | Nao aplicavel ou sem dados | Dados indisponiveis |

## Notas e Observacoes

{{notas_adicionais}}

---

> **Proximo dashboard:** {{data_proximo_dashboard}}
> **Distribuicao:** {{lista_distribuicao}}
> **Classificacao:** {{classificacao_documento}}
