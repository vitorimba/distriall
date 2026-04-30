<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: optimize-media
  task_name: Optimize Media
  status: active
  responsible_executor: 'responsive-media-specialist'
  execution_type: Worker
  estimated_time: 30m
  domain: Tactical
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

<!-- SINKRA_CONTRACT:START -->
```yaml
sinkra_contract:
  Domain: Tactical
  atomic_layer: Atom
  executor: Worker
  pre_condition: "inputs e dependencias resolvidos antes de iniciar."
  post_condition: "output principal gerado e pronto para handoff."
  performance: "executar dentro do SLA, registrar erro e escalar sem falha silenciosa."
```
<!-- SINKRA_CONTRACT:END -->

# Task: Optimize Media

**Task ID:** optimize-media
**Version:** 1.0.0
**Executor:** responsive-media-specialist (Media)
**Type:** Hybrid (Agent draft, human review for asset decisions)
**Duration:** 30-90 min
**Output:** Optimized media setup

---

## Purpose

Otimizar imagens e media para responsividade e performance. Implementa srcset/picture para art direction, configura lazy loading, define performance budgets por breakpoint e garante que media se adapta perfeitamente a todos os viewports.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| project_path | string | Yes | Caminho do projeto |
| audit_report | file | No | responsive-audit-report.md (se disponivel) |
| media_inventory | file | No | Inventario de media existente |
| performance_budget | object | No | Budget de performance por breakpoint (default: auto-calculate) |
| image_formats | list | No | Formatos alvo (default: avif, webp, jpg/png fallback) |
| cdn_enabled | boolean | No | Se usa CDN para media (default: false) |

---

## Elicitation

> **elicit: true** — Perguntas antes da execucao.

1. **Qual o hosting de imagens?** (Local, CDN, Cloudinary, Imgix, S3, etc.)
2. **Suporte a formatos modernos?** (AVIF, WebP, ou precisa fallback legacy)
3. **Performance budget?** (Largest Contentful Paint target, total image weight per page)
4. **Imagens com art direction?** (Diferentes crops/composicoes por viewport)
5. **Video/media embedds?** (YouTube, Vimeo, media players custom)

---

## Preconditions

- [ ] Projeto acessivel com media files identificaveis
- [ ] Informacao sobre hosting/delivery de imagens
- [ ] Build pipeline acessivel para configurar otimizacoes

---

## Steps

### Step 1: Media Inventory

Catalogar toda media do projeto.

- Scan de todos os arquivos de imagem (jpg, png, gif, svg, webp, avif)
- Scan de videos e embeds
- Mapear dimensoes originais de cada imagem
- Calcular peso total de media por pagina
- Identificar imagens above-the-fold vs below-the-fold
- Detectar imagens duplicadas ou near-duplicates
- Mapear como cada imagem e referenciada (img tag, CSS background, inline SVG)

### Step 2: Responsive Image Strategy

Definir estrategia de imagem responsiva por tipo.

**Tipo 1: Resolution Switching (mesmo crop, tamanhos diferentes)**
```html
<img
  srcset="image-320w.webp 320w,
          image-640w.webp 640w,
          image-960w.webp 960w,
          image-1280w.webp 1280w,
          image-1920w.webp 1920w"
  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
  src="image-960w.jpg"
  alt="Descriptive alt text"
  loading="lazy"
  decoding="async"
  width="960"
  height="540"
>
```

**Tipo 2: Art Direction (diferentes crops por viewport)**
```html
<picture>
  <source media="(max-width: 480px)"
          srcset="hero-mobile.avif" type="image/avif">
  <source media="(max-width: 480px)"
          srcset="hero-mobile.webp" type="image/webp">
  <source media="(max-width: 1024px)"
          srcset="hero-tablet.avif" type="image/avif">
  <source media="(max-width: 1024px)"
          srcset="hero-tablet.webp" type="image/webp">
  <source srcset="hero-desktop.avif" type="image/avif">
  <source srcset="hero-desktop.webp" type="image/webp">
  <img src="hero-desktop.jpg" alt="Hero image" width="1920" height="1080">
</picture>
```

**Tipo 3: SVG (viewport-independent)**
- Verificar viewBox correto
- Otimizar com SVGO
- Inline para icons, external para complex illustrations

### Step 3: Format Optimization

Configurar formatos modernos com fallbacks.

- Gerar variantes AVIF para cada imagem (melhor compressao)
- Gerar variantes WebP (amplo suporte)
- Manter fallback JPG/PNG (legacy browsers)
- Otimizar compression quality por formato:
  - AVIF: quality 50-65 (visually equivalent to JPG quality 80-85)
  - WebP: quality 75-82
  - JPG: quality 80-85
  - PNG: lossless compression (pngquant/oxipng)
- Configurar `<picture>` com format negotiation

### Step 4: Size Generation

Gerar variantes de tamanho para cada imagem.

- Definir breakpoints de imagem: 320w, 640w, 960w, 1280w, 1920w, 2560w
- Gerar resize para cada breakpoint necessario
- Calcular `sizes` attribute correto baseado no layout
- Considerar DPR (Device Pixel Ratio): 1x, 2x, 3x
- Para hero images: gerar versoes para ultrawide (3440w)
- Remover metadata EXIF desnecessaria

### Step 5: Lazy Loading Implementation

Implementar lazy loading estrategico.

- **Above-the-fold:** `loading="eager"` + `fetchpriority="high"` (LCP candidates)
- **Below-the-fold:** `loading="lazy"` + `decoding="async"`
- Adicionar `width` e `height` attributes para CLS prevention
- Implementar placeholder strategy:
  - LQIP (Low Quality Image Placeholder)
  - BlurHash
  - Dominant color placeholder
  - Skeleton loading
- Configurar Intersection Observer para lazy loading avancado (se necessario)

### Step 6: CSS Background Images

Otimizar imagens de background CSS.

```css
/* Responsive background with modern formats */
.hero {
  background-image: url('hero-mobile.jpg');
  background-size: cover;
  background-position: center;
}

@media (min-width: 768px) {
  .hero {
    background-image: url('hero-tablet.jpg');
  }
}

@media (min-width: 1280px) {
  .hero {
    background-image: image-set(
      url('hero-desktop.avif') type('image/avif'),
      url('hero-desktop.webp') type('image/webp'),
      url('hero-desktop.jpg') type('image/jpeg')
    );
  }
}
```

### Step 7: Video & Embed Responsiveness

Otimizar video e embeds.

- Implementar responsive video containers com aspect-ratio
- Configurar poster images para videos (responsive)
- Lazy load video embeds (facade pattern)
- Implementar `<video>` com multiplas sources por viewport
- Verificar autoplay policies em mobile

```css
/* Responsive video container */
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 100%;
}

.video-container iframe,
.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Step 8: Performance Budget Enforcement

Definir e verificar budgets de performance.

| Metric | Mobile (3G) | Tablet (4G) | Desktop |
|--------|------------|-------------|---------|
| Total image weight per page | < 200KB | < 500KB | < 1MB |
| LCP image size | < 50KB | < 100KB | < 200KB |
| Number of image requests | < 10 | < 20 | < 30 |
| Largest single image | < 100KB | < 200KB | < 400KB |

- Verificar budgets para cada pagina
- Identificar violacoes
- Sugerir otimizacoes adicionais se budget excedido
- Configurar CI check para budget enforcement (se possivel)

### Step 9: Build Pipeline Integration

Integrar otimizacoes no build pipeline.

- Configurar image optimization no build (sharp, imagemin, squoosh)
- Automatizar geracao de variantes de tamanho
- Automatizar geracao de formatos (AVIF, WebP)
- Configurar cache headers recomendados
- Gerar image manifest para preloading strategy

### Step 10: Validation & Report

Validar otimizacoes e gerar relatorio.

- Comparar peso total antes vs depois
- Verificar que nenhuma imagem perdeu qualidade perceptivel
- Testar lazy loading em todos os breakpoints
- Verificar LCP nao degradou
- Verificar CLS = 0 (width/height presentes)
- Gerar relatorio de otimizacao

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| Optimized media files | Various | Imagens otimizadas em multiplos formatos e tamanhos |
| media-optimization-report.md | Markdown | Relatorio de otimizacao com metricas before/after |
| image-manifest.json | JSON | Manifesto de imagens com todas as variantes |
| build-config-patch | Config | Configuracao para build pipeline de imagens |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Nenhum projeto path fornecido | BLOCK | NON-NEGOTIABLE |
| Projeto sem imagens/media | BLOCK — nada a otimizar | NON-NEGOTIABLE |
| Sem acesso de escrita ao projeto | BLOCK — verificar permissoes | NON-NEGOTIABLE |
| Imagens protegidas por DRM/copyright | WARN — verificar licencas antes de processar | WARNING |
| Budget de performance impossivel | WARN — ajustar budget para valores realisticos | WARNING |

---

## Completion Criteria

- [ ] Inventario completo de media do projeto
- [ ] Estrategia de imagem responsiva definida por tipo (resolution switching, art direction, SVG)
- [ ] Formatos modernos gerados (AVIF, WebP) com fallbacks
- [ ] Variantes de tamanho geradas para cada breakpoint
- [ ] Lazy loading implementado com estrategia above/below fold
- [ ] `width` e `height` attributes presentes em todas as imagens (CLS = 0)
- [ ] Performance budget definido e verificado por breakpoint
- [ ] CSS background images otimizadas com `image-set()`
- [ ] Videos e embeds responsivos com aspect-ratio
- [ ] Relatorio de otimizacao com metricas before/after

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches template specification
- [ ] No critical issues in output
