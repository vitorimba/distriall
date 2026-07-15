<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: fs-frontend-audit
  task_name: Frontend Audit
  status: active
  responsible_executor: '@web-performance-engineer'
  execution_type: Agent
  estimated_time: 2-4h
  domain: Operational
  input:
  - Consultar a secao de inputs no corpo da task
  output:
  - Consultar a secao de outputs no corpo da task
  action_items:
  - Lighthouse audit automatizado (desktop + mobile)
  - Core Web Vitals deep dive (LCP, INP, CLS)
  - Bundle analysis (webpack-bundle-analyzer, source-map-explorer)
  - Image optimization (formato, dimensoes, lazy loading)
  - Caching e compressao de assets (Cache-Control, Brotli/Gzip)
  - Avaliacao de third-party scripts (inventario, impacto, facade pattern)
  - Rendering performance (long tasks, layout thrashing, forced reflows)
  - Relatorio e recomendacoes priorizadas por impacto
  acceptance_criteria:
  - Lighthouse Performance score >= 90 (desktop)
  - Lighthouse Performance score >= 75 (mobile)
  - LCP < 2.5s
  - CLS < 0.1
  - INP < 200ms
  - Bundle size < 250KB gzipped (main bundle)
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

# FS-T-003: Frontend Audit

> Auditoria completa de performance web usando Lighthouse, Web Vitals e analise manual

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **ID** | FS-T-003 |
| **Name** | frontend-audit |
| **Agent** | frontend-performance (Pixel) |
| **Execution Type** | Agent |
| **Responsible Executor** | frontend-performance (Pixel) |
| **Mind** | addy_osmani |
| **Priority** | High |
| **Estimated Duration** | 2-4 hours |
| **Dependencies** | None |
| **Output** | `performance-audit-report.md` (frontend section) |

---

## Descricao

Executa uma auditoria completa de performance frontend cobrindo Core Web Vitals (LCP, FID/INP, CLS), bundle analysis, critical rendering path, image optimization e caching de assets. Combina Lighthouse automatizado com analise manual de code patterns.

Segue a filosofia de Addy Osmani: "The cost of JavaScript is not just download time, it's parse, compile, and execute time."

---

## Pre-Conditions

- [ ] URL ou ambiente de staging acessivel
- [ ] Chrome DevTools disponivel
- [ ] Lighthouse CLI ou extensao instalada
- [ ] Baseline de Web Vitals documentado (se existir)
- [ ] Build de producao disponivel (nao dev mode)

---

## Steps

### Step 1: Lighthouse Audit

**Objetivo:** Coletar metricas automatizadas de performance

```bash
# CLI audit
lighthouse https://example.com \
  --output=json,html \
  --output-path=./reports/lighthouse \
  --preset=desktop \
  --chrome-flags="--headless"

# Mobile audit
lighthouse https://example.com \
  --output=json,html \
  --output-path=./reports/lighthouse-mobile \
  --preset=perf \
  --emulated-form-factor=mobile
```

**Metricas alvo:**
| Metrica | Bom | Precisa melhorar | Ruim |
|---------|-----|-------------------|------|
| LCP | < 2.5s | 2.5-4.0s | > 4.0s |
| FID/INP | < 100ms | 100-300ms | > 300ms |
| CLS | < 0.1 | 0.1-0.25 | > 0.25 |
| FCP | < 1.8s | 1.8-3.0s | > 3.0s |
| TTFB | < 800ms | 800-1800ms | > 1800ms |
| TBT | < 200ms | 200-600ms | > 600ms |
| Speed Index | < 3.4s | 3.4-5.8s | > 5.8s |

### Step 2: Core Web Vitals Deep Dive

**Objetivo:** Analisar cada Core Web Vital em detalhe

**LCP (Largest Contentful Paint):**
```
Checklist:
- [ ] Elemento LCP identificado (imagem, texto, video?)
- [ ] Imagens LCP com preload hint
- [ ] Servidor respondendo < 200ms (TTFB)
- [ ] CSS critico inline ou preloaded
- [ ] Fontes com font-display: swap
- [ ] Nenhum render-blocking resource desnecessario
```

**INP (Interaction to Next Paint):**
```
Checklist:
- [ ] Event handlers otimizados (debounce, throttle)
- [ ] Long tasks identificadas e quebradas
- [ ] Third-party scripts em async/defer
- [ ] Main thread nao bloqueada > 50ms
- [ ] Web Workers para computacao pesada
```

**CLS (Cumulative Layout Shift):**
```
Checklist:
- [ ] Imagens com width/height explicitos
- [ ] Ads com espaco reservado
- [ ] Fontes com font-display: optional
- [ ] Dynamic content com espaco pre-alocado
- [ ] Nenhum inject de DOM acima do fold
```

**Heuristica aplicada:** AO_WP_001 — "Otimize o critical rendering path eliminando render-blocking resources"

### Step 3: Bundle Analysis

**Objetivo:** Analisar tamanho e composicao dos bundles JavaScript

```bash
# Webpack bundle analyzer
npx webpack-bundle-analyzer stats.json

# Source map explorer
npx source-map-explorer bundle.js

# Bundle size check
npx bundlephobia <package-name>
```

**O que procurar:**
- Bundles > 200KB (gzipped) = muito grande
- Duplicacao de dependencias
- Polyfills desnecessarios
- Moment.js, lodash full import (usar alternativas menores)
- Dead code nao removido pelo tree-shaking

**Acoes comuns:**
```javascript
// RUIM: Import full library
import _ from 'lodash';
// BOM: Import especifico
import debounce from 'lodash/debounce';

// RUIM: Moment.js (330KB)
import moment from 'moment';
// BOM: date-fns (tree-shakeable) ou dayjs (2KB)
import { format } from 'date-fns';

// Code splitting
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

### Step 4: Image Optimization

**Objetivo:** Garantir que imagens estao otimizadas

```
Checklist:
- [ ] Formato moderno (WebP/AVIF) com fallback
- [ ] Dimensoes corretas (nao redimensionar via CSS)
- [ ] Lazy loading para imagens below-the-fold
- [ ] srcset para responsive images
- [ ] Imagens decorativas em CSS background
- [ ] SVG otimizado (SVGO)
- [ ] Compressao adequada (quality 75-85 para JPEG)
```

**Heuristica aplicada:** AO_WP_002 — "Imagens sao o maior payload da web — otimize formato, tamanho e carregamento"

### Step 5: Caching e Compressao

**Objetivo:** Verificar estrategia de caching de assets

```
Checklist:
- [ ] Cache-Control headers configurados
- [ ] Assets estaticos com hash no filename (cache busting)
- [ ] Brotli ou Gzip habilitado
- [ ] Service Worker para cache offline (se aplicavel)
- [ ] CDN configurado para assets estaticos
- [ ] ETag headers corretos
```

```bash
# Verificar headers
curl -I https://example.com/static/bundle.js

# Verificar compressao
curl -H "Accept-Encoding: br,gzip" -I https://example.com/
```

### Step 6: Third-Party Scripts

**Objetivo:** Avaliar impacto de scripts de terceiros

```
Checklist:
- [ ] Scripts third-party inventariados
- [ ] Cada script com justificativa de negocio
- [ ] async/defer em todos os scripts nao-criticos
- [ ] Facade pattern para embeds pesados (YouTube, maps)
- [ ] Resource hints (preconnect, dns-prefetch)
- [ ] Budget de third-party: < 30% do TBT total
```

### Step 7: Rendering Performance

**Objetivo:** Analisar rendering e layout performance

```
Chrome DevTools > Performance tab:
- [ ] Gravar 5s de interacao tipica
- [ ] Identificar long tasks (> 50ms)
- [ ] Verificar layout thrashing
- [ ] Check forced reflows
- [ ] Analisar paint complexity
```

**Anti-patterns:**
```javascript
// RUIM: Layout thrashing
elements.forEach(el => {
  const height = el.offsetHeight; // read
  el.style.height = height + 10 + 'px'; // write
});

// BOM: Batch reads then writes
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px';
});
```

### Step 8: Relatorio e Recomendacoes

**Objetivo:** Consolidar achados com acoes priorizadas

**Prioridade de impacto (ordem):**
1. Critical rendering path (LCP)
2. JavaScript execution (INP/TBT)
3. Image optimization
4. Bundle size reduction
5. Caching strategy
6. Third-party optimization
7. Layout stability (CLS)

---

## Post-Conditions

- [ ] Lighthouse report gerado (desktop + mobile)
- [ ] Core Web Vitals analisados individualmente
- [ ] Bundle analysis completa
- [ ] Recomendacoes priorizadas por impacto
- [ ] Performance budget definido

---

## Veto Conditions

| ID | Condicao | Severidade |
|----|----------|------------|
| FS-V-020 | Auditoria em dev mode (nao producao build) | BLOCK |
| FS-V-021 | LCP > 4.0s sem plano de acao | BLOCK |
| FS-V-022 | Bundle > 500KB gzipped sem code splitting | WARN |
| FS-V-023 | Imagens sem lazy loading below-the-fold | WARN |
| FS-V-024 | Third-party script sem justificativa | WARN |

---

## Quality Gates

- [ ] Lighthouse Performance score >= 90 (desktop)
- [ ] Lighthouse Performance score >= 75 (mobile)
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] INP < 200ms
- [ ] Bundle size < 250KB gzipped (main bundle)

---

## Metricas de Sucesso

| Metrica | Target |
|---------|--------|
| Lighthouse Performance (desktop) | >= 90 |
| Lighthouse Performance (mobile) | >= 75 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| Main bundle size | < 250KB gzipped |
| Image optimization | 100% WebP/AVIF |

---

## Ferramentas

| Ferramenta | Uso |
|------------|-----|
| `Lighthouse` | Automated audit |
| `Chrome DevTools` | Performance profiling |
| `WebPageTest` | Real browser testing |
| `Bundle Analyzer` | Bundle composition |
| `Source Map Explorer` | Bundle visualization |
| `Bundlephobia` | Package size check |

---

## Referencia

- Addy Osmani, "Learning Patterns", 2021
- web.dev/performance — Google Web Performance docs
- Core Web Vitals: https://web.dev/vitals/

---

*Task FS-T-003 v1.0.0 — Squad FastSystem*
