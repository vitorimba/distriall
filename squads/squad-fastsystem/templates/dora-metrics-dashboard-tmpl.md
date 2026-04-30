# DORA Metrics Dashboard

> **Time/Squad:** {{team_name}}
> **Periodo:** {{period}}
> **Data:** {{date}}
> **Autor:** {{agent_name}}

---

## Executive Summary

**Classificacao geral:** {{classification}} (Elite | High | Medium | Low)

{{executive_summary}}

---

## 4 Key Metrics

### 1. Deployment Frequency

> Com que frequencia o time faz deploy em producao?

| Periodo | Valor | Classificacao |
|---------|-------|--------------|
| Esta semana | {{df_week}} deploys | {{df_class}} |
| Este mes | {{df_month}} deploys | {{df_class}} |
| Media (30d) | {{df_avg}} deploys/semana | {{df_class}} |

**Benchmark:**
| Nivel | Frequencia |
|-------|-----------|
| Elite | On-demand (multiplas vezes/dia) |
| High | 1/dia a 1/semana |
| Medium | 1/semana a 1/mes |
| Low | 1/mes a 1/6 meses |

**Trend:** {{df_trend}} (melhorando | estavel | piorando)

---

### 2. Lead Time for Changes

> Quanto tempo do commit ate producao?

| Periodo | Valor | Classificacao |
|---------|-------|--------------|
| Media (30d) | {{lt_avg}} | {{lt_class}} |
| p50 | {{lt_p50}} | {{lt_class}} |
| p95 | {{lt_p95}} | {{lt_class}} |

**Breakdown:**
| Fase | Tempo Medio | % do Total |
|------|------------|------------|
| Code review | {{cr_time}} | {{cr_pct}}% |
| CI pipeline | {{ci_time}} | {{ci_pct}}% |
| QA/Testing | {{qa_time}} | {{qa_pct}}% |
| Deploy | {{deploy_time}} | {{deploy_pct}}% |
| **Total** | **{{total_lt}}** | **100%** |

**Benchmark:**
| Nivel | Lead Time |
|-------|-----------|
| Elite | < 1 hora |
| High | 1 dia a 1 semana |
| Medium | 1 semana a 1 mes |
| Low | 1 a 6 meses |

**Bottleneck:** {{lt_bottleneck}}
**Trend:** {{lt_trend}}

---

### 3. Mean Time to Restore (MTTR)

> Quanto tempo para restaurar servico apos incidente?

| Periodo | Valor | Classificacao |
|---------|-------|--------------|
| Media (90d) | {{mttr_avg}} | {{mttr_class}} |
| Ultimo incidente | {{mttr_last}} | {{mttr_class}} |
| Melhor caso | {{mttr_best}} | — |
| Pior caso | {{mttr_worst}} | — |

**Incidentes recentes:**
| Data | Descricao | Deteccao | Mitigacao | Resolucao | MTTR |
|------|----------|----------|-----------|-----------|------|
| {{date_1}} | {{desc}} | {{detect}} | {{mitigate}} | {{resolve}} | {{mttr}} |

**Benchmark:**
| Nivel | MTTR |
|-------|------|
| Elite | < 1 hora |
| High | < 1 dia |
| Medium | 1 dia a 1 semana |
| Low | > 6 meses |

**Trend:** {{mttr_trend}}

---

### 4. Change Failure Rate

> Qual % de deploys causam falha em producao?

| Periodo | Deploys | Falhas | Taxa |Classificacao |
|---------|---------|--------|------|-------------|
| Este mes | {{deploys_month}} | {{failures_month}} | {{cfr_month}}% | {{cfr_class}} |
| Ultimo trimestre | {{deploys_quarter}} | {{failures_quarter}} | {{cfr_quarter}}% | {{cfr_class}} |

**Tipos de falha:**
| Tipo | Count | % |
|------|-------|---|
| Rollback necessario | {{rollback_count}} | {{rollback_pct}}% |
| Hotfix necessario | {{hotfix_count}} | {{hotfix_pct}}% |
| Degradacao de performance | {{perf_count}} | {{perf_pct}}% |
| Bug em producao | {{bug_count}} | {{bug_pct}}% |

**Benchmark:**
| Nivel | Change Failure Rate |
|-------|-------------------|
| Elite | 0-15% |
| High | 16-30% |
| Medium | 16-30% |
| Low | 46-60% |

**Trend:** {{cfr_trend}}

---

## Score Card

| Metrica | Valor | Target | Status | Classificacao |
|---------|-------|--------|--------|--------------|
| Deployment Frequency | {{df_value}} | {{df_target}} | {{df_status}} | {{df_class}} |
| Lead Time | {{lt_value}} | {{lt_target}} | {{lt_status}} | {{lt_class}} |
| MTTR | {{mttr_value}} | {{mttr_target}} | {{mttr_status}} | {{mttr_class}} |
| Change Failure Rate | {{cfr_value}} | {{cfr_target}} | {{cfr_status}} | {{cfr_class}} |

---

## Recomendacoes

### Para melhorar Deployment Frequency:
1. {{df_rec_1}}
2. {{df_rec_2}}

### Para melhorar Lead Time:
1. {{lt_rec_1}}
2. {{lt_rec_2}}

### Para melhorar MTTR:
1. {{mttr_rec_1}}
2. {{mttr_rec_2}}

### Para melhorar Change Failure Rate:
1. {{cfr_rec_1}}
2. {{cfr_rec_2}}

---

## Historico (Ultimos 6 meses)

| Mes | Deploy Freq | Lead Time | MTTR | CFR | Classificacao |
|-----|------------|-----------|------|-----|--------------|
| {{month_1}} | {{df}} | {{lt}} | {{mttr}} | {{cfr}} | {{class}} |
| {{month_2}} | {{df}} | {{lt}} | {{mttr}} | {{cfr}} | {{class}} |
| {{month_3}} | {{df}} | {{lt}} | {{mttr}} | {{cfr}} | {{class}} |
| {{month_4}} | {{df}} | {{lt}} | {{mttr}} | {{cfr}} | {{class}} |
| {{month_5}} | {{df}} | {{lt}} | {{mttr}} | {{cfr}} | {{class}} |
| {{month_6}} | {{df}} | {{lt}} | {{mttr}} | {{cfr}} | {{class}} |

---

## Proxima Revisao

**Data:** {{next_review_date}}
**Foco:** {{next_review_focus}}

---

*Gerado por Squad FastSystem — Baseado em "Accelerate" (Forsgren, Humble, Kim, 2018)*
