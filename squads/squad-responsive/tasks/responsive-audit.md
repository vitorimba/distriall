<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: responsive-audit
  task_name: Responsive Audit
  status: active
  responsible_executor: 'responsive-auditor'
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

# Task: Responsive Audit

**Task ID:** responsive-audit
**Version:** 1.0.0
**Executor:** responsive-auditor (Scout)
**Type:** Hybrid (Agent draft, human review)
**Duration:** 30-60 min
**Output:** responsive-audit-report.md
**Tier:** opus

---

## Purpose

Realizar uma auditoria completa de design responsivo em um projeto, analisando todos os breakpoints definidos, identificando problemas de layout, tipografia, imagens e interacao. Mapeia a hierarquia de componentes via Atomic Design e gera um relatorio com issues categorizados por severidade.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| project_path | string | Yes | Caminho do projeto ou URL para auditoria |
| target_breakpoints | list | No | Breakpoints alvo em px (default: 320, 480, 768, 1024, 1280, 1440, 1920, 2560, 3440) |
| project_type | string | No | Tipo do projeto (web app, marketing site, docs, e-commerce) |
| css_framework | string | No | Framework CSS em uso (Tailwind, Bootstrap, vanilla, etc.) |
| priority_breakpoints | list | No | Breakpoints prioritarios para foco (default: all) |
| known_issues | list | No | Areas problematicas ja conhecidas |

---

## Elicitation

> **elicit: true** — As perguntas abaixo sao apresentadas ao usuario antes da execucao.

1. **Tipo do projeto?** (web app, marketing site, docs, e-commerce, dashboard, landing page)
2. **Qual framework CSS esta sendo usado?** (Tailwind CSS, Bootstrap, vanilla CSS, CSS Modules, Styled Components, outro)
3. **Breakpoints prioritarios?** (Todos por default, ou selecionar especificos: mobile-first, tablet-first, desktop-first)
4. **Areas problematicas conhecidas?** (Paginas ou componentes que ja apresentam problemas visuais)
5. **O projeto usa container queries?** (Sim/Nao — impacta a estrategia de auditoria)
6. **Qual o target de navegadores?** (Moderno only, IE11+, Safari iOS, etc.)

---

## Preconditions

- [ ] Projeto acessivel (caminho local valido ou URL ativa)
- [ ] Arquivos CSS/HTML presentes e legiveis
- [ ] Se URL, projeto rodando e acessivel via browser

---

## Steps

### Step 1: Project Reconnaissance

Scan inicial da estrutura do projeto para entender a stack e organizacao.

- Identificar framework CSS em uso (Tailwind, Bootstrap, vanilla, etc.)
- Mapear arquitetura de arquivos CSS (global, modular, CSS-in-JS)
- Detectar pre-processadores (Sass, Less, PostCSS)
- Identificar reset/normalize em uso
- Catalogar breakpoints ja definidos no projeto
- Verificar se existe design system ou token system

### Step 2: HTML Structure Analysis

Analisar a estrutura semantica e responsiva do HTML.

- Verificar `<meta viewport>` tag (presence e configuracao)
- Auditar uso de tags semanticas (header, nav, main, section, article, footer)
- Verificar hierarquia de headings (h1-h6)
- Identificar estruturas de layout (flexbox containers, grid containers)
- Mapear componentes pela taxonomia Atomic Design (atoms, molecules, organisms, templates, pages)
- Detectar elementos com largura fixa (width em px hardcoded)
- Verificar landmarks ARIA para acessibilidade responsiva

### Step 3: CSS Media Query Analysis

Auditar todas as media queries e sua eficacia.

- Catalogar TODAS as media queries existentes no projeto
- Verificar consistencia de breakpoints (mesmo valor usado consistentemente?)
- Identificar media queries orfas ou redundantes
- Verificar abordagem: mobile-first (min-width) vs desktop-first (max-width)
- Detectar conflitos entre media queries
- Verificar uso de unidades relativas vs absolutas dentro das queries
- Analisar container queries (se presentes)
- Mapear cobertura: quais breakpoints estao cobertos e quais tem gaps

### Step 4: Responsive Image Audit

Avaliar como imagens e media respondem a diferentes viewports.

- Verificar uso de `srcset` e `sizes` attributes
- Auditar `<picture>` elements com art direction
- Detectar imagens com dimensoes fixas (width/height em px)
- Verificar aspect-ratio handling (object-fit, aspect-ratio property)
- Auditar lazy loading implementation (loading="lazy", Intersection Observer)
- Verificar imagens SVG com viewBox correto
- Detectar imagens oversized servidas para mobile
- Calcular impacto de performance por breakpoint

### Step 5: Breakpoint-by-Breakpoint Testing

Testar cada breakpoint target sistematicamente.

Para CADA breakpoint (320, 480, 768, 1024, 1280, 1440, 1920, 2560, 3440):
- Verificar overflow horizontal (conteudo vazando)
- Testar typography scaling (font-size, line-height, letter-spacing)
- Verificar spacing consistency (margins, paddings)
- Testar navigation behavior (hamburger, dropdown, full)
- Verificar touch targets (min 44x44px em mobile)
- Testar form elements responsiveness
- Verificar tabelas (scroll horizontal, stacking, collapse)
- Testar modals/dialogs em cada viewport

### Step 6: Defensive CSS Violations

Identificar violacoes de Defensive CSS patterns.

- Verificar flexbox wrapping (flex-wrap presente onde necessario?)
- Auditar min/max width/height constraints
- Detectar overflow handling ausente
- Verificar text-overflow e word-break/overflow-wrap
- Identificar long-word/URL breaking issues
- Verificar scrollbar-gutter handling
- Auditar gap fallbacks para browsers antigos
- Detectar z-index stacking issues em diferentes viewports
- Verificar safe area insets (notch handling para mobile)

### Step 7: Component Hierarchy Mapping (Atomic Design)

Mapear componentes pela hierarquia Atomic Design e seu comportamento responsivo.

- **Atoms:** Buttons, inputs, labels, icons — verificar sizing responsivo
- **Molecules:** Search bars, cards, form groups — verificar layout adaptation
- **Organisms:** Headers, footers, sidebars, grids — verificar structural changes
- **Templates:** Page layouts — verificar grid/column behavior
- **Pages:** Full pages — verificar composicao responsiva end-to-end
- Documentar quais componentes "quebram" em quais breakpoints
- Identificar componentes que precisam de variantes por viewport

### Step 8: Severity Scoring & Issue Cataloging

Compilar todos os issues encontrados com scoring de severidade.

**Severity Levels:**
| Level | Score | Criteria |
|-------|-------|----------|
| Critical | 4 | Content inacessivel, layout completamente quebrado, funcionalidade perdida |
| High | 3 | Overflow visivel, elementos sobrepostos, touch targets inacessiveis |
| Medium | 2 | Spacing inconsistente, tipografia desalinhada, imagens distorcidas |
| Low | 1 | Melhorias esteticas, otimizacoes de performance, polish |

Para cada issue:
- Descricao clara do problema
- Breakpoint(s) afetado(s)
- Componente/pagina afetado(a)
- Screenshot ou descricao visual
- Sugestao de fix
- Estimativa de esforco (S/M/L)

### Step 9: Generate Audit Report

Compilar o relatorio final usando template.

- Usar template: audit-report-tmpl.md
- Incluir summary executivo com scores por categoria
- Listar issues ordenados por severidade (critical first)
- Incluir breakpoint coverage matrix
- Gerar component health map
- Adicionar recomendacoes priorizadas
- Incluir quick wins (fixes de alto impacto e baixo esforco)

### Step 10: Handoff Preparation

Preparar output para a proxima task do pipeline (create-fix-plan).

- Gerar `findings.json` com dados estruturados para routing
- Marcar issues que podem ser resolvidos em paralelo
- Identificar dependencias entre fixes
- Calcular score geral de responsividade (0-100)

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| responsive-audit-report.md | Markdown | Relatorio completo de auditoria com scores e recomendacoes |
| findings.json | JSON | Dados estruturados dos issues para routing entre agents |
| breakpoint-matrix.md | Markdown | Matriz de cobertura por breakpoint |
| component-health-map.md | Markdown | Mapa de saude dos componentes via Atomic Design |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Nenhum project path fornecido | BLOCK | NON-NEGOTIABLE |
| Projeto nao possui CSS (0 arquivos CSS/styled) | BLOCK — recomendar comecar do zero | NON-NEGOTIABLE |
| Projeto inacessivel (path invalido ou URL down) | BLOCK — solicitar path/URL valido | NON-NEGOTIABLE |
| Apenas 1 breakpoint solicitado | WARN — auditoria parcial, resultado limitado | WARNING |
| Framework CSS nao identificado | WARN — proceder com analise vanilla | WARNING |

---

## Completion Criteria

- [ ] Todos os breakpoints target testados (9 por default ou os selecionados)
- [ ] Issues categorizados por severidade (critical/high/medium/low)
- [ ] Score geral de responsividade calculado (0-100)
- [ ] Cada issue tem descricao, breakpoint afetado e sugestao de fix
- [ ] Component health map gerado via Atomic Design taxonomy
- [ ] Breakpoint coverage matrix completa
- [ ] Defensive CSS violations catalogadas
- [ ] findings.json gerado para handoff ao create-fix-plan
- [ ] Relatorio gerado usando template audit-report-tmpl.md

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches template specification
- [ ] No critical issues in output
