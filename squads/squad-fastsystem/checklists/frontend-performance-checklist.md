# Frontend Performance Checklist

> Checklist de performance frontend focado em Core Web Vitals
> Severidade: CRITICAL | HIGH | MEDIUM

---

## 1. Core Web Vitals

### LCP (Largest Contentful Paint) — Target: < 2.5s

#### CRITICAL
- [ ] Elemento LCP identificado e otimizado
- [ ] TTFB < 800ms
- [ ] Nenhum render-blocking CSS/JS no critical path
- [ ] LCP image com preload hint

#### HIGH
- [ ] Server-side rendering ou static generation para paginas criticas
- [ ] CSS critico inline no `<head>`
- [ ] Fontes com preconnect para CDN de fontes
- [ ] Third-party scripts nao bloqueiam LCP

#### MEDIUM
- [ ] Priority hints em recursos criticos (`fetchpriority="high"`)
- [ ] Preconnect para origens de terceiros

### INP (Interaction to Next Paint) — Target: < 200ms

#### CRITICAL
- [ ] Nenhum long task > 50ms no main thread
- [ ] Event handlers nao bloqueiam por mais de 100ms
- [ ] Third-party scripts em async/defer

#### HIGH
- [ ] Debounce/throttle em event handlers frequentes
- [ ] Web Workers para computacao pesada
- [ ] requestAnimationFrame para updates visuais
- [ ] Code splitting por rota

#### MEDIUM
- [ ] React.memo / useMemo para re-renders caros
- [ ] Virtualizacao para listas longas (> 100 items)

### CLS (Cumulative Layout Shift) — Target: < 0.1

#### CRITICAL
- [ ] Imagens com width e height explicitos
- [ ] Nenhum conteudo injetado acima do fold sem espaco reservado
- [ ] Fontes com font-display: optional ou swap

#### HIGH
- [ ] Ad slots com dimensao reservada
- [ ] Dynamic content com placeholder/skeleton
- [ ] Nenhum resize de iframe sem dimensoes fixas

#### MEDIUM
- [ ] Animacoes usando transform (nao width/height/top/left)
- [ ] Embeds de terceiros com aspect-ratio reservado

---

## 2. JavaScript

### CRITICAL
- [ ] Main bundle < 200KB gzipped
- [ ] Total JS < 400KB gzipped
- [ ] Code splitting por rota implementado
- [ ] Tree-shaking funcionando

### HIGH
- [ ] Dynamic import para componentes pesados
- [ ] Nenhum import de library inteira (lodash, moment)
- [ ] Polyfills apenas para browsers alvo
- [ ] Module/nomodule pattern para browsers modernos

### MEDIUM
- [ ] Bundle analyzer revisado
- [ ] Nenhuma dependencia > 50KB sem justificativa
- [ ] Dead code eliminado

---

## 3. Imagens

### CRITICAL
- [ ] Formato moderno (WebP/AVIF) com fallback
- [ ] Dimensoes corretas (nao escalar via CSS)
- [ ] Lazy loading para below-the-fold

### HIGH
- [ ] srcset para responsive images
- [ ] Compressao adequada (quality 75-85 JPEG)
- [ ] SVGs otimizados (SVGO)
- [ ] Imagens decorativas como CSS background

### MEDIUM
- [ ] CDN para delivery de imagens
- [ ] Image optimization pipeline automatizado
- [ ] Blur-up placeholder para imagens grandes

---

## 4. CSS

### CRITICAL
- [ ] Total CSS < 100KB gzipped
- [ ] CSS critico inline para above-the-fold
- [ ] Nenhum CSS nao utilizado em paginas criticas

### HIGH
- [ ] CSS modules ou scoped CSS (no global pollution)
- [ ] Nenhum @import em CSS (usar link)
- [ ] Media queries para CSS condicional

### MEDIUM
- [ ] PurgeCSS ou similar para remover unused CSS
- [ ] CSS custom properties para temas

---

## 5. Fontes

### CRITICAL
- [ ] font-display: swap ou optional
- [ ] Preload para fontes criticas
- [ ] Apenas formatos WOFF2

### HIGH
- [ ] Subset de fontes (apenas caracteres necessarios)
- [ ] Maximo 2-3 font families
- [ ] Self-hosted (evitar latencia de CDN externo)

### MEDIUM
- [ ] Variable fonts se multiplos weights
- [ ] Fallback font com metricas similares

---

## 6. Caching & Network

### CRITICAL
- [ ] Cache-Control headers para assets estaticos
- [ ] Assets com content hash (cache busting)
- [ ] Brotli ou Gzip habilitado

### HIGH
- [ ] CDN para assets estaticos
- [ ] Service Worker para offline (se aplicavel)
- [ ] HTTP/2 ou HTTP/3 habilitado
- [ ] dns-prefetch para dominios de terceiros

### MEDIUM
- [ ] Stale-while-revalidate para API responses
- [ ] ETag headers corretos
- [ ] Preconnect para CDN principal

---

## 7. Third-Party Scripts

### CRITICAL
- [ ] Todos third-party scripts inventariados
- [ ] Scripts nao criticos em async/defer
- [ ] Nenhum script third-party bloqueando LCP

### HIGH
- [ ] Facade pattern para embeds pesados
- [ ] Third-party budget: < 30% do TBT
- [ ] Resource hints para origens third-party

### MEDIUM
- [ ] Cada script com justificativa de negocio
- [ ] Monitoramento de impacto de third-party

---

## Ferramentas de Validacao

- [ ] Lighthouse (desktop + mobile) executado
- [ ] Chrome DevTools Performance tab analisado
- [ ] WebPageTest executado
- [ ] PageSpeed Insights consultado
- [ ] Bundle analyzer executado

---

## Resultado

| Metrica | Valor | Target | Status |
|---------|-------|--------|--------|
| LCP | | < 2.5s | |
| INP | | < 200ms | |
| CLS | | < 0.1 | |
| FCP | | < 1.8s | |
| TTFB | | < 800ms | |
| TBT | | < 200ms | |
| Lighthouse (desktop) | | >= 90 | |
| Lighthouse (mobile) | | >= 75 | |
| Main bundle | | < 200KB gz | |
| Total JS | | < 400KB gz | |

---

*Squad FastSystem — Frontend Performance Checklist v1.0.0*
