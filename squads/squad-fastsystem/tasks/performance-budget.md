# FS-T-012: Performance Budget

> Definicao e enforcement de performance budgets

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **ID** | FS-T-012 |
| **Name** | performance-budget |
| **Agent** | performance-lead (Blaze) |
| **Execution Type** | Agent |
| **Responsible Executor** | performance-lead (Blaze) |
| **Mind** | — |
| **Priority** | High |
| **Estimated Duration** | 1-2 hours |
| **Dependencies** | FS-T-001, FS-T-003 |
| **Output** | Performance budget document |

---

## Descricao

Define performance budgets quantitativos para cada camada do sistema e implementa mecanismos automaticos de enforcement. Budgets cobrem frontend (bundle size, Web Vitals), backend (latency, throughput), database (query time) e infraestrutura (resource usage).

---

## Pre-Conditions

- [ ] Baseline de performance documentado
- [ ] Requisitos de negocio/UX definidos
- [ ] Benchmarks da industria consultados
- [ ] Stakeholders alinhados sobre targets

---

## Steps

### Step 1: Definir Budgets por Camada

**Objetivo:** Estabelecer limites quantitativos

```yaml
frontend_budgets:
  bundle_size:
    main_js: "< 200KB gzipped"
    total_js: "< 400KB gzipped"
    total_css: "< 100KB gzipped"
    total_images: "< 500KB per page"
  web_vitals:
    lcp: "< 2.5s (p75)"
    inp: "< 200ms (p75)"
    cls: "< 0.1 (p75)"
    fcp: "< 1.8s (p75)"
    ttfb: "< 800ms (p75)"
  lighthouse:
    performance: ">= 90 (desktop)"
    performance_mobile: ">= 75 (mobile)"

backend_budgets:
  api_latency:
    p50: "< 100ms"
    p95: "< 500ms"
    p99: "< 1000ms"
  throughput:
    min_rps: "> 100 req/s per instance"
  error_rate:
    max: "< 0.1%"

database_budgets:
  query_time:
    p95: "< 50ms"
    p99: "< 200ms"
  connections:
    max_utilization: "< 80%"
  sequential_scans:
    hot_path: "0 (tabelas > 10K rows)"

infrastructure_budgets:
  cpu:
    sustained: "< 70%"
    peak: "< 90%"
  memory:
    sustained: "< 80%"
    peak: "< 90%"
  disk_io:
    latency: "< 10ms (SSD)"
```

### Step 2: Configurar Enforcement Automatico

**Objetivo:** Bloquear violacoes em CI/CD

```yaml
# GitHub Actions example
- name: "Check bundle size"
  run: |
    npx bundlesize
  env:
    BUNDLESIZE_GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

# bundlesize.config.json
{
  "files": [
    {
      "path": "dist/main.*.js",
      "maxSize": "200 kB",
      "compression": "gzip"
    },
    {
      "path": "dist/vendor.*.js",
      "maxSize": "150 kB",
      "compression": "gzip"
    }
  ]
}
```

```yaml
# Lighthouse CI
- name: "Lighthouse CI"
  run: npx lhci autorun

# lighthouserc.js
module.exports = {
  ci: {
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
  },
};
```

### Step 3: Configurar Alertas de Producao

**Objetivo:** Alertar quando budgets sao violados em producao

```yaml
alerts:
  - name: "API Latency Budget Exceeded"
    condition: "api_p95_latency > 500ms for 5 min"
    severity: warning
    channel: "#performance-alerts"

  - name: "Error Rate Budget Exceeded"
    condition: "error_rate > 0.1% for 5 min"
    severity: critical
    channel: "#incidents"

  - name: "LCP Budget Exceeded"
    condition: "lcp_p75 > 2500ms"
    severity: warning
    channel: "#performance-alerts"
```

### Step 4: Dashboard de Budget

**Objetivo:** Visibilidade continua do estado dos budgets

```
Dashboard panels:
1. Budget compliance score (% dentro do budget)
2. Trend de cada metrica (last 30 days)
3. Violations history
4. Top violators (endpoints, pages)
5. Budget vs actual (bar chart)
```

### Step 5: Processo de Review

**Objetivo:** Definir processo para mudancas que impactam budget

```
Fluxo de review:
1. PR com impacto em bundle size > 10KB → review obrigatorio
2. Nova dependencia → bundlephobia check
3. Novo endpoint → latency test obrigatorio
4. Schema change → query performance test

Budget exception process:
1. Justificativa documentada
2. Plano de compensacao (otimizar outra area)
3. Aprovacao do performance-lead
4. Deadline para voltar ao budget
```

### Step 6: Documentacao

**Objetivo:** Documentar todos os budgets em local acessivel

---

## Post-Conditions

- [ ] Budgets definidos para todas as camadas
- [ ] Enforcement automatico no CI/CD
- [ ] Alertas de producao configurados
- [ ] Dashboard de compliance criado
- [ ] Processo de review documentado

---

## Veto Conditions

| ID | Condicao | Severidade |
|----|----------|------------|
| FS-V-110 | Deploy sem verificacao de budget | WARN |
| FS-V-111 | Bundle size > 2x budget sem exception | BLOCK |
| FS-V-112 | LCP > 4.0s sem plano de correcao | BLOCK |
| FS-V-113 | Budget definido sem enforcement automatico | WARN |

---

## Quality Gates

- [ ] Budgets quantitativos para todas as camadas
- [ ] CI/CD enforcement ativo
- [ ] Alertas de producao configurados
- [ ] Compliance > 90% em todas as metricas
- [ ] Processo de exception documentado

---

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| `bundlesize` | Bundle size gates |
| `Lighthouse CI` | Web Vitals gates |
| `k6` | API latency gates |
| `Grafana` | Compliance dashboards |
| `PagerDuty` | Alert routing |

---

*Task FS-T-012 v1.0.0 — Squad FastSystem*
