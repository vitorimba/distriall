<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: implement-fixes
  task_name: Implement Fixes
  status: active
  responsible_executor: 'css-layout-engineer'
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

# Task: Implement Fixes

**Task ID:** implement-fixes
**Version:** 1.0.0
**Executor:** css-layout-engineer (Grid) + mobile-first-architect (Flux)
**Type:** Agent execution (autonomous with checkpoints)
**Duration:** 1-8 hours (depends on fix plan scope)
**Output:** Modified CSS/HTML files

---

## Purpose

Implementar as correcoes responsivas conforme o plano de fix definido. Aplica correcoes por componente usando CSS moderno (Grid, Flexbox, Container Queries, clamp(), logical properties), testa cada fix individualmente e garante zero regressoes.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| fix_plan | file | Yes | fix-plan.md da task create-fix-plan |
| execution_order | file | Yes | execution-order.json com ordem de execucao |
| project_path | string | Yes | Caminho do projeto para aplicar fixes |
| fluid_tokens | file | No | Tokens fluidos (se gerados pela task fluid-tokens-setup) |
| phase_filter | string | No | Executar apenas uma fase especifica (1, 2, 3, 4 ou all) |
| mode | string | No | interactive (default), yolo (sem confirmacao), dry-run (preview only) |

---

## Preconditions

- [ ] Fix plan disponivel e validado
- [ ] Projeto acessivel para escrita
- [ ] Backup ou git branch criado antes de iniciar
- [ ] Dependencias de build instaladas (se aplicavel)

---

## Steps

### Step 1: Environment Preparation

Preparar o ambiente para implementacao segura.

- Verificar acesso de escrita ao projeto
- Criar branch de trabalho (`fix/responsive-audit-{date}`)
- Instalar dependencias se necessario
- Verificar build pipeline funcional
- Carregar fluid tokens se disponiveis

### Step 2: Foundation Fixes

Corrigir problemas de base que afetam todo o projeto.

- Verificar/adicionar `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Aplicar box-sizing reset: `*, *::before, *::after { box-sizing: border-box; }`
- Configurar base responsive com unidades relativas
- Estabelecer breakpoint variables/tokens se ausentes
- Configurar fluid typography base com `clamp()`

```css
/* Exemplo: Foundation responsive */
:root {
  --bp-xs: 320px;
  --bp-sm: 480px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1440px;
  --bp-3xl: 1920px;
  --bp-4xl: 2560px;
  --bp-ultra: 3440px;
}
```

### Step 3: Layout Structure Fixes

Corrigir problemas estruturais de layout.

- Converter layouts fixos para Grid/Flexbox responsivo
- Aplicar `flex-wrap: wrap` onde necessario
- Implementar grid areas com fallbacks
- Usar `min()`, `max()`, `clamp()` para sizing fluido
- Aplicar logical properties (`inline-size`, `block-size`, `margin-inline`, etc.)
- Implementar container queries para componentes auto-contidos

```css
/* Exemplo: Layout responsivo moderno */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--space-md);
}
```

### Step 4: Component-Level Fixes

Aplicar fixes por componente seguindo a ordem do plano.

Para CADA componente no fix plan:
1. Identificar o issue e breakpoints afetados
2. Aplicar fix usando CSS moderno
3. Verificar que o fix nao causa regressao em outros breakpoints
4. Testar em breakpoints adjacentes (acima e abaixo)
5. Documentar a mudanca

**Tecnicas prioritarias:**
- CSS Grid para layouts 2D
- Flexbox para layouts 1D
- `clamp()` para sizing fluido
- Container queries para componentes independentes
- `aspect-ratio` para media
- `overflow-wrap: break-word` para text safety
- `scroll-snap` para carousels/sliders

### Step 5: Navigation Responsiveness

Corrigir navegacao para todos os breakpoints.

- Implementar/corrigir mobile menu (hamburger, slide-out, bottom nav)
- Garantir transicao suave entre layouts de nav
- Verificar touch targets >= 44x44px
- Testar keyboard navigation em todos os viewports
- Implementar focus-visible para acessibilidade

### Step 6: Typography & Spacing Fixes

Corrigir tipografia e espacamento responsivo.

- Aplicar fluid typography usando `clamp()`
- Corrigir line-height para legibilidade em todos os viewports
- Ajustar spacing scale para ser proporcional
- Verificar texto nao overflow em nenhum breakpoint
- Implementar `text-wrap: balance` onde aplicavel

```css
/* Exemplo: Fluid typography */
.heading-1 {
  font-size: clamp(1.75rem, 1.5rem + 1.5vw, 3.5rem);
  line-height: 1.1;
}
```

### Step 7: Table & Form Responsiveness

Corrigir tabelas e formularios para mobile.

- Implementar responsive tables (horizontal scroll, card layout, ou collapse)
- Corrigir form layout para stacking em mobile
- Verificar input sizes e touch targets
- Testar select/dropdown em todos os viewports

### Step 8: Defensive CSS Application

Aplicar patterns de Defensive CSS em todo o projeto.

- `overflow: hidden` ou `overflow: auto` em containers
- `min-width: 0` em flex/grid children
- `max-width: 100%` em images e media
- `word-break: break-word` em text containers
- `scrollbar-gutter: stable` em layouts com scroll
- `safe` keyword em alignment quando suportado
- `env(safe-area-inset-*)` para notch handling

### Step 9: Per-Fix Validation

Validar cada fix individualmente.

- Testar fix no breakpoint problematico original
- Verificar breakpoints adjacentes (sem regressao)
- Validar HTML semantico preservado
- Verificar acessibilidade nao degradada
- Rodar lint check no CSS modificado

### Step 10: Integration Verification

Verificar integracao de todos os fixes.

- Build completo do projeto sem erros
- Verificar que todos os fixes coexistem sem conflito
- Testar paginas completas (nao apenas componentes isolados)
- Gerar diff dos arquivos modificados
- Commit das mudancas com mensagem descritiva

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| Modified CSS/HTML files | Various | Arquivos do projeto com fixes aplicados |
| fix-changelog.md | Markdown | Log detalhado de cada fix aplicado |
| regression-notes.md | Markdown | Notas sobre areas que precisam teste adicional |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Fix plan ausente | BLOCK — executar create-fix-plan primeiro | NON-NEGOTIABLE |
| Projeto sem acesso de escrita | BLOCK — verificar permissoes | NON-NEGOTIABLE |
| Sem branch/backup criado | BLOCK — criar branch antes de modificar | NON-NEGOTIABLE |
| Build quebrado antes de iniciar | BLOCK — resolver build issues primeiro | NON-NEGOTIABLE |
| Fix causa regressao em >3 breakpoints | REVERT — reverter fix e replanejar | HIGH |

---

## Completion Criteria

- [ ] Todos os fixes do plano aplicados (ou justificados se omitidos)
- [ ] Cada fix validado no breakpoint problematico original
- [ ] Zero regressoes em breakpoints adjacentes
- [ ] Build do projeto passa sem erros
- [ ] CSS lint passa sem erros criticos
- [ ] fix-changelog.md gerado com detalhes de cada correcao
- [ ] Mudancas commitadas em branch dedicado
- [ ] Pronto para handoff ao cross-device-test

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches template specification
- [ ] No critical issues in output
