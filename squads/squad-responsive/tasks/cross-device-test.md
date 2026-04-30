<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: cross-device-test
  task_name: Cross-Device Test
  status: active
  responsible_executor: 'cross-device-qa'
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

# Task: Cross-Device Test

**Task ID:** cross-device-test
**Version:** 1.0.0
**Executor:** cross-device-qa (Pixel)
**Type:** Hybrid (Agent execution + human visual verification)
**Duration:** 30-60 min
**Output:** Test report with pass/fail per breakpoint

---

## Purpose

Executar testes abrangentes cross-device em todos os 5 ranges de breakpoints, verificando visual regression, funcionalidade, acessibilidade e performance. Garante que os fixes implementados resolveram os issues da auditoria sem introduzir regressoes.

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| project_path | string | Yes | Caminho do projeto para testar |
| fix_changelog | file | Yes | fix-changelog.md da task implement-fixes |
| audit_report | file | Yes | responsive-audit-report.md original para comparacao |
| findings_json | file | No | findings.json original para validacao de fixes |
| pages_to_test | list | No | Paginas especificas para testar (default: all) |
| visual_baseline | file | No | Screenshots baseline para visual regression |

---

## Elicitation

> **elicit: true** — Perguntas antes da execucao.

1. **Quais paginas sao criticas?** (Homepage, checkout, dashboard — testar com mais rigor)
2. **Existe baseline visual?** (Screenshots anteriores para comparacao)
3. **Testar com dados reais ou mock?** (Impacta overflow de conteudo)
4. **Dispositivos reais disponiveis?** (Complementar testes de viewport com device testing)

---

## Preconditions

- [ ] Fixes implementados e build funcional
- [ ] Projeto rodando localmente ou em staging
- [ ] fix-changelog.md disponivel para saber o que foi alterado
- [ ] Audit report original disponivel para comparacao

---

## Steps

### Step 1: Test Environment Setup

Preparar ambiente de teste.

- Verificar projeto rodando e acessivel
- Carregar audit report original como baseline de issues
- Carregar fix-changelog para saber quais mudancas testar
- Preparar matriz de testes por breakpoint range
- Configurar ferramentas de screenshot/comparacao

### Step 2: Breakpoint Range Testing — Mobile (320px - 479px)

Testar range mobile em 320px e 480px boundaries.

| Test Case | Check | Result |
|-----------|-------|--------|
| Viewport 320px | Layout nao quebra, sem overflow horizontal | PASS/FAIL |
| Viewport 375px | iPhone SE/mini reference | PASS/FAIL |
| Viewport 414px | iPhone Plus reference | PASS/FAIL |
| Touch targets | Todos >= 44x44px | PASS/FAIL |
| Navigation | Menu mobile funcional, transicoes suaves | PASS/FAIL |
| Typography | Texto legivel, sem overflow | PASS/FAIL |
| Images | Correto sizing, lazy loading funcional | PASS/FAIL |
| Forms | Inputs empilhados, teclado nao obstrui | PASS/FAIL |
| Tables | Responsive (scroll/stack/collapse) | PASS/FAIL |
| Orientation | Portrait e landscape funcionais | PASS/FAIL |
| Safe areas | Notch/dynamic island handling | PASS/FAIL |

### Step 3: Breakpoint Range Testing — Phablet/Large Mobile (480px - 767px)

Testar range phablet.

| Test Case | Check | Result |
|-----------|-------|--------|
| Viewport 480px | Transicao de mobile para phablet | PASS/FAIL |
| Viewport 600px | Small tablet reference | PASS/FAIL |
| Viewport 767px | Pre-tablet boundary | PASS/FAIL |
| Grid/Flex | Layout adapta para espaco extra | PASS/FAIL |
| Navigation | Transicao hamburger → expandido | PASS/FAIL |
| Content density | Conteudo nao esparsamente distribuido | PASS/FAIL |
| Images | Tamanho correto para viewport | PASS/FAIL |
| Sidebars | Colapsados ou hidden | PASS/FAIL |

### Step 4: Breakpoint Range Testing — Tablet (768px - 1023px)

Testar range tablet.

| Test Case | Check | Result |
|-----------|-------|--------|
| Viewport 768px | iPad portrait reference | PASS/FAIL |
| Viewport 834px | iPad Air reference | PASS/FAIL |
| Viewport 1024px | iPad landscape/small laptop boundary | PASS/FAIL |
| Grid layout | 2-column layouts funcionais | PASS/FAIL |
| Navigation | Full nav ou hybrid | PASS/FAIL |
| Sidebars | Visivel ou toggle | PASS/FAIL |
| Typography | Escalada proporcional | PASS/FAIL |
| Modals/Dialogs | Tamanho adequado, nao fullscreen | PASS/FAIL |
| Hover states | Touch + hover coexistencia | PASS/FAIL |
| Orientation | Portrait e landscape | PASS/FAIL |

### Step 5: Breakpoint Range Testing — Desktop (1024px - 1919px)

Testar range desktop.

| Test Case | Check | Result |
|-----------|-------|--------|
| Viewport 1024px | Small laptop boundary | PASS/FAIL |
| Viewport 1280px | Standard laptop | PASS/FAIL |
| Viewport 1440px | Large laptop/small desktop | PASS/FAIL |
| Viewport 1920px | Full HD reference | PASS/FAIL |
| Full layout | Todas as colunas visiveis | PASS/FAIL |
| Navigation | Full horizontal nav | PASS/FAIL |
| Content width | Max-width respeitado, sem stretch | PASS/FAIL |
| Sidebars | Totalmente expandidos | PASS/FAIL |
| Whitespace | Espacamento proporcional | PASS/FAIL |
| Mouse interactions | Hover, focus, active states | PASS/FAIL |

### Step 6: Breakpoint Range Testing — Ultrawide (1920px+)

Testar range ultrawide.

| Test Case | Check | Result |
|-----------|-------|--------|
| Viewport 2560px | QHD/1440p reference | PASS/FAIL |
| Viewport 3440px | Ultrawide 21:9 reference | PASS/FAIL |
| Content centering | Conteudo centralizado com max-width | PASS/FAIL |
| Background/bleed | Backgrounds full-width, conteudo contido | PASS/FAIL |
| Typography | Nao excessivamente grande | PASS/FAIL |
| Images | Nao distorcidas ou pixeladas | PASS/FAIL |
| Grid | Nao excessivamente espaçado | PASS/FAIL |
| Empty space | Sem voids excessivos | PASS/FAIL |

### Step 7: Visual Regression Testing

Comparar estado atual com baseline (se disponivel).

- Capturar screenshots em cada breakpoint key (320, 768, 1024, 1440, 1920)
- Comparar com baseline visual pixel-by-pixel (se existir)
- Identificar diferencas inesperadas
- Categorizar diferencas: intencional (fix aplicado) vs regressao
- Documentar regressoes visuais com screenshots

### Step 8: Functional Edge Cases

Testar edge cases funcionais.

- Conteudo longo: titulos com 100+ caracteres
- Conteudo vazio: componentes sem dados
- Conteudo dinamico: listas com 0, 1, 5, 50+ itens
- Texto em multiplos idiomas (diferentes comprimentos)
- Zoom do navegador: 50%, 100%, 150%, 200%
- Reducao de movimento (`prefers-reduced-motion`)
- High contrast mode (`prefers-contrast: more`)
- Dark mode (se aplicavel)
- Print layout (se aplicavel)

### Step 9: Performance Verification

Verificar performance responsiva.

- Medir LCP em mobile (target < 2.5s em 3G)
- Medir CLS em todos os breakpoints (target = 0)
- Medir FID/INP (target < 200ms)
- Verificar total image weight por breakpoint
- Verificar lazy loading funcional (network waterfall)
- Verificar que media queries nao causam FOUC

### Step 10: Report Generation

Compilar relatorio de testes.

- Score de aprovacao por breakpoint range (% de tests passando)
- Score geral de responsividade
- Lista de regressoes encontradas (se houver)
- Comparacao: issues do audit original vs estado atual
- Issues resolvidos vs issues remanescentes
- Novas issues encontradas (se houver)
- Recomendacoes para proximos passos
- Verdict final: PASS / PASS WITH CONCERNS / FAIL

---

## Outputs

| Output | Format | Description |
|--------|--------|-------------|
| test-report.md | Markdown | Relatorio completo com pass/fail por breakpoint |
| screenshots/ | PNG | Screenshots em cada breakpoint key |
| regression-diff/ | PNG | Diferencas visuais identificadas (se baseline existir) |
| performance-metrics.json | JSON | Metricas de performance por breakpoint |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Projeto nao rodando/acessivel | BLOCK — fazer build/deploy primeiro | NON-NEGOTIABLE |
| fix-changelog ausente | BLOCK — nao sabe o que testar | NON-NEGOTIABLE |
| Audit report original ausente | WARN — teste sem baseline de comparacao | WARNING |
| Breakpoint range com 100% fail | BLOCK — regressao critica, reverter fixes | HIGH |

---

## Completion Criteria

- [ ] Todos os 5 breakpoint ranges testados (Mobile, Phablet, Tablet, Desktop, Ultrawide)
- [ ] Cada test case marcado como PASS ou FAIL
- [ ] Visual regression verificada (com ou sem baseline)
- [ ] Edge cases funcionais testados
- [ ] Performance metrics coletadas por breakpoint
- [ ] Score geral de responsividade calculado
- [ ] Comparacao com audit original: issues resolvidos vs remanescentes
- [ ] Verdict final emitido: PASS / PASS WITH CONCERNS / FAIL
- [ ] Screenshots capturados em breakpoints key
- [ ] Relatorio completo gerado

## Acceptance Criteria

- [ ] All required inputs provided and validated
- [ ] Primary output artifact generated
- [ ] Output format matches template specification
- [ ] No critical issues in output
