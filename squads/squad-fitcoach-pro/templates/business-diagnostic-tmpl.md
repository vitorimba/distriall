# Business Diagnostic Template — FitCoach Squad

> **Template ID:** `business-diagnostic-tmpl`
> **Version:** 1.0
> **Última atualização:** 2026-03-11
> **Uso:** Diagnóstico completo do negócio de personal training / fitness coaching

---

## 1. Executive Summary — Resumo Executivo

### Dados do Negócio

| Campo | Valor |
|-------|-------|
| **Nome do Coach/Negócio** | `{{business_name}}` |
| **Coach Principal** | `{{coach_name}}` |
| **Tipo de Negócio** | `{{business_type}}` (Personal Trainer / Studio / Consultoria Online / Híbrido) |
| **Tempo de Atuação** | `{{years_in_business}}` anos |
| **Localização** | `{{location}}` |
| **Data do Diagnóstico** | `{{diagnostic_date}}` |
| **Responsável pelo Diagnóstico** | `{{analyst_name}}` |

### Snapshot do Negócio

| Indicador | Valor Atual | Benchmark do Mercado | Status |
|-----------|------------|---------------------|--------|
| Receita Mensal | R$ `{{monthly_revenue}}` | R$ `{{benchmark_revenue}}` | `{{revenue_status}}` |
| Número de Clientes Ativos | `{{active_clients}}` | `{{benchmark_clients}}` | `{{clients_status}}` |
| ARM (Average Revenue per Member) | R$ `{{arm}}` | R$ 200-400 | `{{arm_status}}` |
| LEG (Length of Engagement) | `{{leg}}` meses | 6-12 meses | `{{leg_status}}` |
| Churn Rate Mensal | `{{churn_rate}}` % | <8% | `{{churn_status}}` |
| Margem de Lucro | `{{profit_margin}}` % | 40-60% | `{{margin_status}}` |

### Classificação Geral

| Score Geral | Classificação | Descrição |
|------------|--------------|-----------|
| `{{overall_score}}` / 100 | `{{classification}}` | `{{classification_description}}` |

**Classificações:**
- 80-100: Negócio Maduro — Otimizar e escalar
- 60-79: Em Crescimento — Fortalecer fundamentos
- 40-59: Iniciante Estruturado — Construir sistemas
- 20-39: Pré-Estruturado — Urgência em processos básicos
- 0-19: Crítico — Intervenção imediata necessária

---

## 2. Current Metrics Dashboard — Painel de Métricas Atuais

### 2.1 Métricas Financeiras

| Métrica | Fórmula | Valor | Meta | Gap |
|---------|---------|-------|------|-----|
| **Receita Bruta Mensal** | Soma de todos os recebimentos | R$ `{{gross_revenue}}` | R$ `{{target_revenue}}` | `{{revenue_gap}}` |
| **Receita Líquida Mensal** | Bruta - Impostos - Taxas | R$ `{{net_revenue}}` | R$ `{{target_net}}` | `{{net_gap}}` |
| **ARM** | Receita / Clientes Ativos | R$ `{{arm}}` | R$ `{{target_arm}}` | `{{arm_gap}}` |
| **LTV (Lifetime Value)** | ARM × LEG | R$ `{{ltv}}` | R$ `{{target_ltv}}` | `{{ltv_gap}}` |
| **CAC (Customer Acquisition Cost)** | Investimento Marketing / Novos Clientes | R$ `{{cac}}` | R$ `{{target_cac}}` | `{{cac_gap}}` |
| **LTV:CAC Ratio** | LTV / CAC | `{{ltv_cac_ratio}}` | >3:1 | `{{ratio_gap}}` |
| **NOB (Net Operating Balance)** | Receita Líquida - Custos Operacionais | R$ `{{nob}}` | R$ `{{target_nob}}` | `{{nob_gap}}` |
| **Margem Operacional** | NOB / Receita Bruta × 100 | `{{operating_margin}}` % | 40%+ | `{{margin_gap}}` |

### 2.2 Métricas de Retenção

| Métrica | Fórmula | Valor | Meta | Gap |
|---------|---------|-------|------|-----|
| **LEG** | Média de meses ativo | `{{leg}}` meses | 8+ meses | `{{leg_gap}}` |
| **Churn Rate** | Cancelamentos / Base × 100 | `{{churn_rate}}` % | <8% | `{{churn_gap}}` |
| **Retention Rate** | 100 - Churn | `{{retention_rate}}` % | >92% | `{{retention_gap}}` |
| **NPS (Net Promoter Score)** | Promotores - Detratores | `{{nps}}` | >50 | `{{nps_gap}}` |
| **Reactivation Rate** | Ex-clientes reativados / Total ex-clientes | `{{reactivation}}` % | >10% | `{{react_gap}}` |

### 2.3 Métricas Operacionais

| Métrica | Valor | Capacidade | Utilização |
|---------|-------|-----------|-----------|
| **Clientes ativos** | `{{active_clients}}` | `{{max_capacity}}` | `{{utilization}}` % |
| **Sessões/semana** | `{{weekly_sessions}}` | `{{max_sessions}}` | `{{session_utilization}}` % |
| **Horas trabalhadas/semana** | `{{weekly_hours}}` | `{{max_hours}}` | `{{hours_utilization}}` % |
| **Receita por hora** | R$ `{{revenue_per_hour}}` | R$ `{{target_rph}}` | `{{rph_utilization}}` % |
| **No-show rate** | `{{noshow_rate}}` % | <5% | `{{noshow_status}}` |

---

## 3. Revenue Stream Analysis — Análise de Fontes de Receita

### Fontes de Receita Atuais

| Fonte | Receita Mensal | % do Total | Clientes | ARM por Fonte | Margem |
|-------|---------------|-----------|----------|--------------|--------|
| Personal presencial (1:1) | R$ `{{rev_personal}}` | `{{pct_personal}}` % | `{{clients_personal}}` | R$ `{{arm_personal}}` | `{{margin_personal}}` % |
| Personal semi (2:1, 3:1) | R$ `{{rev_semi}}` | `{{pct_semi}}` % | `{{clients_semi}}` | R$ `{{arm_semi}}` | `{{margin_semi}}` % |
| Grupo / Turmas | R$ `{{rev_group}}` | `{{pct_group}}` % | `{{clients_group}}` | R$ `{{arm_group}}` | `{{margin_group}}` % |
| Consultoria online | R$ `{{rev_online}}` | `{{pct_online}}` % | `{{clients_online}}` | R$ `{{arm_online}}` | `{{margin_online}}` % |
| Planos digitais (app) | R$ `{{rev_digital}}` | `{{pct_digital}}` % | `{{clients_digital}}` | R$ `{{arm_digital}}` | `{{margin_digital}}` % |
| Suplementos / Revenda | R$ `{{rev_supplements}}` | `{{pct_supplements}}` % | — | — | `{{margin_supplements}}` % |
| Outros | R$ `{{rev_other}}` | `{{pct_other}}` % | — | — | `{{margin_other}}` % |
| **TOTAL** | **R$ `{{total_revenue}}`** | **100%** | **`{{total_clients}}`** | **R$ `{{total_arm}}`** | **`{{total_margin}}`%** |

### Análise de Concentração de Receita

| Indicador | Valor | Status |
|-----------|-------|--------|
| Maior fonte como % do total | `{{concentration_pct}}` % | `{{concentration_status}}` |
| Número de fontes >10% do total | `{{diversification_count}}` | `{{diversification_status}}` |
| Dependência de único cliente | `{{single_client_pct}}` % | `{{dependency_status}}` |

> **Risco de concentração:** Se >70% vem de uma única fonte, o negócio é vulnerável.
> **Meta:** Ao menos 2 fontes representando >20% cada.

### Oportunidades de Revenue Streams Adicionais

| Oportunidade | Receita Potencial | Investimento | ROI Estimado | Prioridade |
|-------------|------------------|-------------|-------------|-----------|
| Consultoria online | R$ `{{opp_online}}` | R$ `{{inv_online}}` | `{{roi_online}}` % | `{{pri_online}}` |
| Programa em grupo online | R$ `{{opp_group_online}}` | R$ `{{inv_group_online}}` | `{{roi_group_online}}` % | `{{pri_group_online}}` |
| Infoproduto (curso gravado) | R$ `{{opp_course}}` | R$ `{{inv_course}}` | `{{roi_course}}` % | `{{pri_course}}` |
| Programa de indicação | R$ `{{opp_referral}}` | R$ `{{inv_referral}}` | `{{roi_referral}}` % | `{{pri_referral}}` |
| Revenda de suplementos | R$ `{{opp_suppl}}` | R$ `{{inv_suppl}}` | `{{roi_suppl}}` % | `{{pri_suppl}}` |

---

## 4. Client Journey Mapping — Mapeamento da Jornada do Cliente

### Funil Atual

| Etapa | Volume | Conversão | Tempo Médio | Gargalo? |
|-------|--------|-----------|------------|---------|
| **Awareness** (descoberta) | `{{awareness_vol}}` leads/mês | — | — | `{{awareness_bottleneck}}` |
| **Interest** (contato) | `{{interest_vol}}` | `{{interest_conv}}` % | `{{interest_time}}` dias | `{{interest_bottleneck}}` |
| **Consideration** (avaliação/aula experimental) | `{{consideration_vol}}` | `{{consideration_conv}}` % | `{{consideration_time}}` dias | `{{consideration_bottleneck}}` |
| **Purchase** (fechamento) | `{{purchase_vol}}` | `{{purchase_conv}}` % | `{{purchase_time}}` dias | `{{purchase_bottleneck}}` |
| **Onboarding** (primeiras 2 semanas) | `{{onboarding_vol}}` | `{{onboarding_conv}}` % | 14 dias | `{{onboarding_bottleneck}}` |
| **Retention** (mensal) | `{{retention_vol}}` | `{{retention_conv}}` % | ongoing | `{{retention_bottleneck}}` |
| **Advocacy** (indicação) | `{{advocacy_vol}}` | `{{advocacy_conv}}` % | — | `{{advocacy_bottleneck}}` |

### Touchpoints por Etapa

| Etapa | Canais | Automação? | Qualidade (1-10) |
|-------|--------|-----------|-----------------|
| Awareness | `{{awareness_channels}}` | `{{awareness_auto}}` | `{{awareness_quality}}` |
| Interest | `{{interest_channels}}` | `{{interest_auto}}` | `{{interest_quality}}` |
| Consideration | `{{consideration_channels}}` | `{{consideration_auto}}` | `{{consideration_quality}}` |
| Purchase | `{{purchase_channels}}` | `{{purchase_auto}}` | `{{purchase_quality}}` |
| Onboarding | `{{onboarding_channels}}` | `{{onboarding_auto}}` | `{{onboarding_quality}}` |
| Retention | `{{retention_channels}}` | `{{retention_auto}}` | `{{retention_quality}}` |
| Advocacy | `{{advocacy_channels}}` | `{{advocacy_auto}}` | `{{advocacy_quality}}` |

---

## 5. Digital Maturity Score — Score de Maturidade Digital

### Avaliação por Dimensão

| Dimensão | Score (0-10) | Peso | Ponderado | Nível |
|----------|-------------|------|----------|-------|
| **Presença online** (site, Instagram, Google) | `{{online_presence}}` | 20% | `{{op_weighted}}` | `{{op_level}}` |
| **Captação digital** (leads, funil, ads) | `{{digital_capture}}` | 20% | `{{dc_weighted}}` | `{{dc_level}}` |
| **Entrega digital** (app, planilhas, vídeos) | `{{digital_delivery}}` | 20% | `{{dd_weighted}}` | `{{dd_level}}` |
| **Automação** (agendamento, pagamentos, follow-up) | `{{automation}}` | 15% | `{{auto_weighted}}` | `{{auto_level}}` |
| **Dados e métricas** (tracking, dashboards) | `{{data_metrics}}` | 15% | `{{dm_weighted}}` | `{{dm_level}}` |
| **Segurança e LGPD** (dados do cliente) | `{{security}}` | 10% | `{{sec_weighted}}` | `{{sec_level}}` |
| **TOTAL** | — | **100%** | **`{{digital_maturity_score}}`** | **`{{digital_maturity_level}}`** |

### Níveis de Maturidade

| Score | Nível | Descrição |
|-------|-------|-----------|
| 8.0-10.0 | Digital First | Operação predominantemente digital, dados orientam decisões |
| 6.0-7.9 | Digitalmente Ativo | Usa ferramentas digitais, mas com gaps |
| 4.0-5.9 | Em Transição | Mix de digital e analógico, processos inconsistentes |
| 2.0-3.9 | Analógico Digital | Presença digital mínima, operação manual |
| 0.0-1.9 | Analógico Puro | Sem presença ou ferramentas digitais |

---

## 6. Bottleneck Identification — Identificação de Gargalos

### Gargalos Identificados (ordenados por impacto)

| # | Gargalo | Área | Impacto (1-10) | Urgência (1-10) | Score | Solução Proposta |
|---|---------|------|---------------|-----------------|-------|-----------------|
| 1 | `{{bottleneck_1}}` | `{{area_1}}` | `{{impact_1}}` | `{{urgency_1}}` | `{{score_1}}` | `{{solution_1}}` |
| 2 | `{{bottleneck_2}}` | `{{area_2}}` | `{{impact_2}}` | `{{urgency_2}}` | `{{score_2}}` | `{{solution_2}}` |
| 3 | `{{bottleneck_3}}` | `{{area_3}}` | `{{impact_3}}` | `{{urgency_3}}` | `{{score_3}}` | `{{solution_3}}` |
| 4 | `{{bottleneck_4}}` | `{{area_4}}` | `{{impact_4}}` | `{{urgency_4}}` | `{{score_4}}` | `{{solution_4}}` |
| 5 | `{{bottleneck_5}}` | `{{area_5}}` | `{{impact_5}}` | `{{urgency_5}}` | `{{score_5}}` | `{{solution_5}}` |

### Matriz Impacto × Urgência

```
Alta Urgência
     |
  Q2 |  Q1
IMPOR|  CRÍTICO
TANTE|  (Fazer agora)
     |
-----+------------ Alto Impacto
     |
  Q4 |  Q3
PODE |  AGENDAR
ESPE |  (Planejar)
RAR  |
     |
Baixa Urgência
```

---

## 7. Growth Opportunities — Oportunidades de Crescimento (Hormozi Framework)

### Value Equation Analysis

> **Value = (Dream Outcome × Perceived Likelihood) / (Time Delay × Effort & Sacrifice)**

| Componente | Score Atual (1-10) | Score Ideal | Gap | Ação |
|-----------|-------------------|------------|-----|------|
| **Dream Outcome** (o resultado que o cliente quer) | `{{dream_score}}` | 9+ | `{{dream_gap}}` | `{{dream_action}}` |
| **Perceived Likelihood** (chance de alcançar) | `{{likelihood_score}}` | 8+ | `{{likelihood_gap}}` | `{{likelihood_action}}` |
| **Time Delay** (tempo até ver resultados) | `{{time_score}}` | 3- | `{{time_gap}}` | `{{time_action}}` |
| **Effort & Sacrifice** (dificuldade percebida) | `{{effort_score}}` | 3- | `{{effort_gap}}` | `{{effort_action}}` |

### Grand Slam Offer Design

| Elemento | Atual | Proposta | Impacto Esperado |
|----------|-------|---------|-----------------|
| **Core Offer** | `{{current_offer}}` | `{{proposed_offer}}` | `{{offer_impact}}` |
| **Bonuses** | `{{current_bonuses}}` | `{{proposed_bonuses}}` | `{{bonus_impact}}` |
| **Urgência** | `{{current_urgency}}` | `{{proposed_urgency}}` | `{{urgency_impact}}` |
| **Garantia** | `{{current_guarantee}}` | `{{proposed_guarantee}}` | `{{guarantee_impact}}` |
| **Naming** | `{{current_naming}}` | `{{proposed_naming}}` | `{{naming_impact}}` |

### Lead Generation — 4 Core Ways

| Canal | Status Atual | Volume/Mês | CPL | Qualidade Leads | Ação |
|-------|-------------|-----------|-----|----------------|------|
| **Warm Outreach** (contatos pessoais) | `{{warm_status}}` | `{{warm_vol}}` | `{{warm_cpl}}` | `{{warm_quality}}` | `{{warm_action}}` |
| **Content** (Instagram, YouTube, TikTok) | `{{content_status}}` | `{{content_vol}}` | `{{content_cpl}}` | `{{content_quality}}` | `{{content_action}}` |
| **Cold Outreach** (DMs, parcerias) | `{{cold_status}}` | `{{cold_vol}}` | `{{cold_cpl}}` | `{{cold_quality}}` | `{{cold_action}}` |
| **Paid Ads** (Meta Ads, Google Ads) | `{{ads_status}}` | `{{ads_vol}}` | `{{ads_cpl}}` | `{{ads_quality}}` | `{{ads_action}}` |

---

## 8. Operational Efficiency — Eficiência Operacional (Cooper Framework)

### Análise de Tempo

| Atividade | Horas/Semana | % do Total | Valor/Hora | Delegável? | Automatizável? |
|-----------|-------------|-----------|-----------|-----------|---------------|
| Treinar clientes (sessões) | `{{session_hours}}` | `{{session_pct}}` % | R$ `{{session_value}}` | Parcialmente | Não |
| Criar protocolos | `{{protocol_hours}}` | `{{protocol_pct}}` % | R$ `{{protocol_value}}` | Sim (AI) | Parcialmente |
| Atendimento WhatsApp | `{{whatsapp_hours}}` | `{{whatsapp_pct}}` % | R$ `{{whatsapp_value}}` | Sim | Sim (chatbot) |
| Criação de conteúdo | `{{content_hours}}` | `{{content_pct}}` % | R$ `{{content_value}}` | Sim | Parcialmente |
| Administrativo/Financeiro | `{{admin_hours}}` | `{{admin_pct}}` % | R$ `{{admin_value}}` | Sim | Sim |
| Marketing/Vendas | `{{marketing_hours}}` | `{{marketing_pct}}` % | R$ `{{marketing_value}}` | Parcialmente | Parcialmente |
| Estudo/Capacitação | `{{study_hours}}` | `{{study_pct}}` % | — | Não | Não |
| **TOTAL** | **`{{total_hours}}`** | **100%** | — | — | — |

### Potencial de Otimização

| Categoria | Horas Atuais | Horas Otimizadas | Economia | Método |
|-----------|-------------|-----------------|---------|--------|
| Automação de processos | `{{auto_current}}` h | `{{auto_optimized}}` h | `{{auto_saved}}` h | `{{auto_method}}` |
| Delegação | `{{deleg_current}}` h | `{{deleg_optimized}}` h | `{{deleg_saved}}` h | `{{deleg_method}}` |
| AI-assisted | `{{ai_current}}` h | `{{ai_optimized}}` h | `{{ai_saved}}` h | `{{ai_method}}` |
| Eliminação | `{{elim_current}}` h | `{{elim_optimized}}` h | `{{elim_saved}}` h | `{{elim_method}}` |
| **TOTAL ECONOMIZADO** | — | — | **`{{total_saved}}`** h/sem | — |

---

## 9. Action Plan — Plano de Ação com Prioridades

### Ações Imediatas (Semana 1-2)

| # | Ação | Responsável | Prazo | Impacto Esperado | Investimento |
|---|------|-----------|-------|-----------------|-------------|
| 1 | `{{immediate_1}}` | `{{resp_1}}` | `{{deadline_1}}` | `{{impact_1}}` | R$ `{{invest_1}}` |
| 2 | `{{immediate_2}}` | `{{resp_2}}` | `{{deadline_2}}` | `{{impact_2}}` | R$ `{{invest_2}}` |
| 3 | `{{immediate_3}}` | `{{resp_3}}` | `{{deadline_3}}` | `{{impact_3}}` | R$ `{{invest_3}}` |

### Ações de Curto Prazo (Semana 3-4)

| # | Ação | Responsável | Prazo | Impacto Esperado | Investimento |
|---|------|-----------|-------|-----------------|-------------|
| 1 | `{{short_1}}` | `{{resp_s1}}` | `{{deadline_s1}}` | `{{impact_s1}}` | R$ `{{invest_s1}}` |
| 2 | `{{short_2}}` | `{{resp_s2}}` | `{{deadline_s2}}` | `{{impact_s2}}` | R$ `{{invest_s2}}` |

### Ações de Médio Prazo (Mês 2-3)

| # | Ação | Responsável | Prazo | Impacto Esperado | Investimento |
|---|------|-----------|-------|-----------------|-------------|
| 1 | `{{medium_1}}` | `{{resp_m1}}` | `{{deadline_m1}}` | `{{impact_m1}}` | R$ `{{invest_m1}}` |
| 2 | `{{medium_2}}` | `{{resp_m2}}` | `{{deadline_m2}}` | `{{impact_m2}}` | R$ `{{invest_m2}}` |

---

## 10. 90-Day Roadmap — Roadmap de 90 Dias

### Mês 1 — Fundação

| Semana | Foco | Entregáveis | KPI |
|--------|------|------------|-----|
| 1 | `{{m1w1_focus}}` | `{{m1w1_deliverables}}` | `{{m1w1_kpi}}` |
| 2 | `{{m1w2_focus}}` | `{{m1w2_deliverables}}` | `{{m1w2_kpi}}` |
| 3 | `{{m1w3_focus}}` | `{{m1w3_deliverables}}` | `{{m1w3_kpi}}` |
| 4 | `{{m1w4_focus}}` | `{{m1w4_deliverables}}` | `{{m1w4_kpi}}` |

### Mês 2 — Crescimento

| Semana | Foco | Entregáveis | KPI |
|--------|------|------------|-----|
| 5 | `{{m2w1_focus}}` | `{{m2w1_deliverables}}` | `{{m2w1_kpi}}` |
| 6 | `{{m2w2_focus}}` | `{{m2w2_deliverables}}` | `{{m2w2_kpi}}` |
| 7 | `{{m2w3_focus}}` | `{{m2w3_deliverables}}` | `{{m2w3_kpi}}` |
| 8 | `{{m2w4_focus}}` | `{{m2w4_deliverables}}` | `{{m2w4_kpi}}` |

### Mês 3 — Escala

| Semana | Foco | Entregáveis | KPI |
|--------|------|------------|-----|
| 9 | `{{m3w1_focus}}` | `{{m3w1_deliverables}}` | `{{m3w1_kpi}}` |
| 10 | `{{m3w2_focus}}` | `{{m3w2_deliverables}}` | `{{m3w2_kpi}}` |
| 11 | `{{m3w3_focus}}` | `{{m3w3_deliverables}}` | `{{m3w3_kpi}}` |
| 12 | `{{m3w4_focus}}` | `{{m3w4_deliverables}}` | `{{m3w4_kpi}}` |

### Metas do Roadmap

| Meta | Baseline | Target 30d | Target 60d | Target 90d |
|------|---------|-----------|-----------|-----------|
| Receita mensal | R$ `{{rev_baseline}}` | R$ `{{rev_30d}}` | R$ `{{rev_60d}}` | R$ `{{rev_90d}}` |
| Clientes ativos | `{{clients_baseline}}` | `{{clients_30d}}` | `{{clients_60d}}` | `{{clients_90d}}` |
| ARM | R$ `{{arm_baseline}}` | R$ `{{arm_30d}}` | R$ `{{arm_60d}}` | R$ `{{arm_90d}}` |
| Churn rate | `{{churn_baseline}}` % | `{{churn_30d}}` % | `{{churn_60d}}` % | `{{churn_90d}}` % |
| Digital maturity | `{{dm_baseline}}` | `{{dm_30d}}` | `{{dm_60d}}` | `{{dm_90d}}` |

---

## 11. Histórico de Versões

| Versão | Data | Alteração | Analista |
|--------|------|-----------|---------|
| 1.0 | `{{diagnostic_date}}` | Diagnóstico inicial | `{{analyst_name}}` |
| — | — | — | — |

---

> **Gerado pelo FitCoach Squad — Synkra AIOX**
> Template: `business-diagnostic-tmpl` v1.0
