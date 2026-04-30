<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: fluid-tokens-setup
  task_name: Fluid Tokens Setup
  status: active
  responsible_executor: 'fluid-design-tokenizer'
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

# Task: Fluid Tokens Setup

**Task ID:** fluid-tokens-setup
**Version:** 1.0.0
**Executor:** fluid-design-tokenizer (Token)
**Type:** Agent execution (autonomous)
**Duration:** 30-60 min
**Output:** CSS custom properties file with fluid tokens

---

## Purpose

Criar um sistema de design tokens fluidos que escalam proporcionalmente entre breakpoints. Gera escalas de tipografia fluida, espacamento fluido e custom properties responsivas usando `clamp()`, eliminando a necessidade de media queries para sizing.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| design_specs | file | No | Especificacoes de design (Figma tokens, style guide, etc.) |
| existing_tokens | file | No | Arquivo de tokens existente para migrar/expandir |
| min_viewport | number | No | Viewport minimo em px (default: 320) |
| max_viewport | number | No | Viewport maximo em px (default: 1440) |
| base_font_size | number | No | Font size base em px (default: 16) |
| type_scale_ratio | number | No | Ratio da escala tipografica (default: 1.25 — Major Third) |
| space_scale_ratio | number | No | Ratio da escala de espacamento (default: 1.5) |
| output_format | string | No | Formato de saida: css (default), scss, css-in-js |

---

## Elicitation

> **elicit: true** — Perguntas antes da execucao.

1. **Existe um design system ou tokens existentes?** (Migrar vs criar do zero)
2. **Qual a escala tipografica desejada?** (Minor Third 1.2, Major Third 1.25, Perfect Fourth 1.333, Golden Ratio 1.618)
3. **Quantos niveis na escala de spacing?** (5, 7, 9, 11 niveis)
4. **Viewport range?** (Min/max viewport para calculo do clamp)
5. **Precisa de tokens de cor responsivos?** (Dark mode, high contrast, etc.)

---

## Preconditions

- [ ] Decisao sobre escala tipografica tomada
- [ ] Viewport range definido
- [ ] Se existem tokens, arquivo acessivel

---

## Steps

### Step 1: Baseline Analysis

Analisar base existente ou definir fundacao.

- Se existem tokens: parsear e catalogar todos os valores
- Se nao existem: definir base a partir dos inputs
- Calcular viewport range para formula clamp
- Definir unidade base (rem vs px vs em)
- Validar ratios escolhidos contra boas praticas

### Step 2: Fluid Typography Scale

Gerar escala tipografica fluida.

Para cada nivel da escala, calcular `clamp(min, preferred, max)`:

```css
/* Formula: clamp(minSize, calc(minSize + (maxSize - minSize) * ((100vw - minViewport) / (maxViewport - minViewport))), maxSize) */

/* Simplificado com variavel de slope */
--step--2: clamp(0.6944rem, 0.6546rem + 0.1989vw, 0.8rem);
--step--1: clamp(0.8333rem, 0.7659rem + 0.3373vw, 1rem);
--step-0:  clamp(1rem, 0.8929rem + 0.5357vw, 1.25rem);
--step-1:  clamp(1.2rem, 1.0368rem + 0.8161vw, 1.5625rem);
--step-2:  clamp(1.44rem, 1.1979rem + 1.2107vw, 1.9531rem);
--step-3:  clamp(1.728rem, 1.3756rem + 1.7621vw, 2.4414rem);
--step-4:  clamp(2.0736rem, 1.5672rem + 2.532vw, 3.0518rem);
--step-5:  clamp(2.4883rem, 1.7674rem + 3.6047vw, 3.8147rem);
```

- Gerar steps negativos (small text, captions)
- Gerar steps base (body, UI text)
- Gerar steps positivos (headings h6 → h1)
- Gerar steps extra (display, hero text)
- Validar contraste WCAG em cada step

### Step 3: Fluid Space Scale

Gerar escala de espacamento fluido.

```css
/* Space scale com clamp */
--space-3xs: clamp(0.25rem, 0.2232rem + 0.1339vw, 0.3125rem);
--space-2xs: clamp(0.5rem, 0.4464rem + 0.2679vw, 0.625rem);
--space-xs:  clamp(0.75rem, 0.6696rem + 0.4018vw, 0.9375rem);
--space-s:   clamp(1rem, 0.8929rem + 0.5357vw, 1.25rem);
--space-m:   clamp(1.5rem, 1.3393rem + 0.8036vw, 1.875rem);
--space-l:   clamp(2rem, 1.7857rem + 1.0714vw, 2.5rem);
--space-xl:  clamp(3rem, 2.6786rem + 1.6071vw, 3.75rem);
--space-2xl: clamp(4rem, 3.5714rem + 2.1429vw, 5rem);
--space-3xl: clamp(6rem, 5.3571rem + 3.2143vw, 7.5rem);
```

- Gerar pares de espacamento (one-up pairs para spacing assimetrico)
- Calcular space pairs: `--space-s-m`, `--space-m-l`, etc.
- Validar que a menor medida e funcional em 320px
- Validar que a maior medida nao e excessiva em ultrawide

### Step 4: Responsive Custom Properties

Gerar custom properties responsivas para layout.

```css
/* Layout tokens */
--content-max-width: clamp(16rem, 93vw, 75rem);
--sidebar-width: clamp(12rem, 20vw, 20rem);
--grid-gutter: var(--space-s-m);
--container-padding: var(--space-m-l);

/* Border radius fluid */
--radius-s: clamp(0.125rem, 0.1rem + 0.125vw, 0.25rem);
--radius-m: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
--radius-l: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);
```

- Content max-widths fluidos
- Container paddings fluidos
- Grid gaps fluidos
- Border radius proporcionais
- Icon sizes proporcionais

### Step 5: Utility Class Generation

Gerar classes utilitarias baseadas nos tokens.

```css
/* Fluid typography utilities */
.text-step--2 { font-size: var(--step--2); }
.text-step--1 { font-size: var(--step--1); }
.text-step-0  { font-size: var(--step-0); }
/* ... etc */

/* Fluid space utilities */
.mt-space-s  { margin-top: var(--space-s); }
.mb-space-m  { margin-bottom: var(--space-m); }
.p-space-l   { padding: var(--space-l); }
.gap-space-m { gap: var(--space-m); }
/* ... etc */
```

### Step 6: Token Documentation

Documentar todos os tokens gerados.

- Tabela de referencia com todos os tokens e seus ranges
- Visual scale preview (markup para visualizar a escala)
- Usage guidelines para cada token
- Mapping de tokens antigos → novos (se migracao)
- Exemplos de uso em componentes

### Step 7: Integration Setup

Preparar tokens para integracao no projeto.

- Gerar arquivo CSS principal com todos os tokens
- Gerar arquivo SCSS se necessario ($variavel mapping)
- Gerar tema JSON para CSS-in-JS se necessario
- Verificar nao-conflito com tokens existentes do projeto
- Criar import snippet para inclusao no projeto

### Step 8: Validation

Validar tokens gerados.

- Verificar que clamp() calcula corretamente em min e max viewport
- Testar em 320px (nenhum valor abaixo do minimo)
- Testar em viewport max (nenhum valor acima do maximo)
- Verificar acessibilidade: font-size minimo >= 12px
- Verificar que escalas sao percetptualmente proporcionais
- Lint do CSS gerado

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| fluid-tokens.css | CSS | Custom properties com tokens fluidos completos |
| fluid-tokens.scss | SCSS | Versao SCSS (se solicitado) |
| token-reference.md | Markdown | Documentacao de referencia dos tokens |
| token-migration-map.md | Markdown | Mapeamento tokens antigos → novos (se migracao) |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Viewport range invalido (min >= max) | BLOCK — corrigir range | NON-NEGOTIABLE |
| Scale ratio < 1.0 | BLOCK — ratio deve ser > 1.0 | NON-NEGOTIABLE |
| Base font size < 12px | BLOCK — viola acessibilidade minima | NON-NEGOTIABLE |
| Mais de 15 steps na type scale | WARN — escala excessivamente granular | WARNING |

---

## Completion Criteria

- [ ] Escala tipografica fluida gerada com todos os steps
- [ ] Escala de espacamento fluida gerada com todos os niveis
- [ ] Space pairs calculados para transicoes suaves
- [ ] Custom properties de layout geradas
- [ ] Todos os tokens usam `clamp()` com valores validados
- [ ] Valores minimos e maximos testados nos extremos do viewport
- [ ] Acessibilidade validada (font-size minimo >= 12px)
- [ ] Documentacao de referencia gerada
- [ ] Arquivo CSS pronto para integracao

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches template specification
- [ ] No critical issues in output
