# Epic 5: Fidelidade ao Design System

## Visao geral

Alinhar o codigo do app (`apps/web`) ao Design System exportado do Claude Design (`packages/design-system/`). O DS define tokens, componentes, patterns e telas completas. O app diverge em componentes improvisados, patterns inconsistentes e telas incompletas.

## Fonte de verdade

- `packages/design-system/DESIGN.md` — fundacoes visuais, tokens, catalogo de componentes
- `packages/design-system/PRODUCT.md` — dominio, personas, mapa de telas
- `packages/design-system/ui_kits/distriall/` — 22 telas de referencia (JSX)
- `packages/design-system/components/` — componentes canonicos (core, forms, data, navigation, charts, print)
- `DESIGN.md` e `PRODUCT.md` na raiz do projeto (copias de referencia rapida)

## Gap analysis

53 gaps identificados via `/impeccable polish` (2026-06-13):
- 10 CRITICAL (bloqueiam fidelidade visual)
- 15 HIGH (divergencia perceptivel)
- 20 MEDIUM (polish)
- 8 LOW (nice-to-have)

## Sub-epics

| # | Sub-epic | Stories | Pontos | Prioridade |
|---|----------|---------|--------|------------|
| 5.1 | Fundacao de Fidelidade ao DS | 8 | 26 | CRITICAL |
| 5.2 | Charts SVG e Recharts | 5 | 12 | HIGH |
| 5.3 | States Canonicos | 4 | 16 | HIGH |
| 5.4 | Formularios e Mascaras ✓ COMPLETE | 4 | 13 | MEDIUM |
| 5.5 | Telas Faltantes e Patterns ✓ COMPLETE | 6 | 23 | MEDIUM |
| 5.6 | Polish Visual Final | 5 | 12 | LOW |
| | **Total** | **32** | **102** | |

## Criterio de conclusao

- Todas as telas do app usam componentes do DS (nenhum improvisado)
- Tokens do DS aplicados em todo CSS (zero hardcoded hex/rgba fora de tokens)
- 4 estados canonicos (loading/empty/error/success) em toda tela com dados remotos
- Mascaras pt-BR em todos os inputs de telefone, CEP, CPF/CNPJ e moeda
- Charts SVG custom no lugar de Recharts
- Theme toggle dark/light funcionando
- Build limpo sem warnings

## Ordem de execucao recomendada

5.1 → 5.2 → 5.3 → 5.4 → 5.5 → 5.6 (sequencial por prioridade)

## Progresso

| Story | Titulo | Status | Data |
|-------|--------|--------|------|
| 5.1.1 | Adicionar PageHeader em todas as paginas | Done | 2026-06-13 |
| 5.1.2 | Substituir formatBRL por Money component em todo o app | Done | 2026-06-13 |
| 5.1.3 | Chip filters para periodo no dashboard e stats | Done | 2026-06-12 |
| 5.1.4 | Login com grad-glow, icones e link esqueci senha | Done | 2026-06-12 |
| 5.1.5 | Driver page com header verde e layout proprio | Done | 2026-06-12 |
| 5.1.6 | Sidebar active item com fundo laranja e texto branco | Done | 2026-06-12 |
| 5.1.7 | Field wrapper em todos os formularios | Done | 2026-06-12 |
| 5.1.8 | Vales vencidos com borda e fundo de status | Done | 2026-06-12 |
| 5.2.1 | Substituir RevenueChart (Recharts) por BarChart SVG | Done | 2026-06-12 |
| 5.2.2 | Substituir PaymentPieChart (Recharts) por DonutChart SVG | Done | 2026-06-12 |
| 5.2.3 | HBarList para ranking de produtos no dashboard | Done | 2026-06-12 |
| 5.2.4 | Enriquecer StatsCard com delta, deltaLabel e Sparkline | Done | 2026-06-12 |
| 5.2.5 | Remover dependencia recharts | Done | 2026-06-12 |
| 5.3.1 | Skeleton espelhando layout real em todas as telas | Done | 2026-06-12 |
| 5.3.2 | EmptyState universal | Done | 2026-06-13 |
| 5.3.3 | Error Alert + retry | Done | 2026-06-13 |
| 5.3.4 | Toast em todas as acoes | Done | 2026-06-13 |
| 5.4.1 | maskUtils.ts com mascaras pt-BR | Done | 2026-06-13 |
| 5.4.2 | Aplicar mascaras nos formularios | Done | 2026-06-13 |
| 5.4.3 | Validacao no blur e submit, nunca a cada tecla | Done | 2026-06-13 |
| 5.4.4 | Inputs de moeda com prefixo R$ e classe .num | Done | 2026-06-13 |
| 5.5.1 | Order detail com stepper visual de status | Done | 2026-06-13 |
| 5.5.2 | Receipt para impressao termica + Dialog de preview | Done | 2026-06-13 |
| 5.5.3 | Deliveries com layout 2 colunas e reorder | Done | 2026-06-13 |
| 5.5.4 | Financial hub com grid 3 colunas e icones | Done | 2026-06-13 |
| 5.5.5 | Settings com Accordion FAQ e Alert compatibilidade | Done | 2026-06-14 |
| 5.5.6 | Theme toggle dark/light | Done | 2026-06-14 |

## Development Log

### Story 5.5.3 — Deliveries com layout 2 colunas e reorder (2026-06-13)

**Built:**
- (ADAPT) `apps/web/src/app/(authenticated)/deliveries/page.tsx` — layout refatorado de coluna unica para `da-grid da-grid--cols2`; AvailableOrders no painel esquerdo, RouteBuilder no painel direito
- (ADAPT) `apps/web/src/components/deliveries/route-builder.tsx` — badge sequencial com tokens DS (`var(--accent-soft)`, `var(--accent-fg)`, `var(--radius-full)`); setas `ChevronUp`/`ChevronDown` para reorder; botao "Enviar rota" + toast; titulo do painel "Rota montada (N)"
- (ADAPT) `apps/web/src/components/deliveries/available-orders.tsx` — titulo "Pedidos disponiveis (N)" adicionado; layout alinhado ao painel esquerdo do DS
- (ADAPT) `apps/web/src/app/globals.css` — `@import` de `layout.css` do DS adicionado (ativa `.da-grid`, `.da-grid--cols2`, media query 768px)

**Patterns established:**
- `da-grid da-grid--cols2` e o padrao canonico de layout 2 colunas no app — requer `@import "../../../../packages/design-system/tokens/layout.css"` em globals.css para funcionar
- Badge sequencial numerado: `inline-flex` 24x24px com tokens `var(--accent-soft)` + `var(--accent-fg)` + `var(--radius-full)` — seguir DeliveriesScreen.jsx como referencia
- Import de CSS do DS em globals.css e o padrao correto (nao copiar as classes em Tailwind) — consistente com print.css da story 5.5.2
- Empilhamento mobile via layout.css media query (<768px) — sem necessidade de classe Tailwind adicional

**Key decisions:**
- Opcao A (import layout.css) escolhida sobre Opcao B (Tailwind grid) — mantem fidelidade com o DS e aproveita todos os utilitarios de grid (da-grid--cols3, --stats5, etc.) para uso futuro
- `AvailableOrders` e `RouteBuilder` mantidos como componentes separados (nao fundidos em um unico) — separacao de responsabilidades preservada

**Tech debt identified:**
- Badges de `account_name` em route-item.tsx e available-orders.tsx usam `bg-gray-100 text-gray-600` (Tailwind hardcoded) em vez de tokens DS — visual inconsistencia minor
- Sem testes automatizados para fluxo de reorder (reassignSequences ja tem logica testavel)
- Draft route items nao persistem em sessionStorage — perda ao recarregar pagina (comportamento existente, nao regressao)

**Tests:** 0 novos (62 existentes passando). **Deploy:** Vercel — commits a69cf0a + e90bc21, https://distriall.vercel.app. **CodeRabbit:** 0 iter (WSL indisponivel). **QA Gate:** PASS (87/100).

### Story 5.4.1 — Criar maskUtils.ts com mascaras pt-BR (2026-06-13)

**Built:**
- `apps/web/src/lib/mask-utils.ts` — 7 funcoes utilitarias pt-BR: `maskPhone`, `maskCEP`, `maskCpfCnpj`, `maskMoney`, `parseMoney`, `isPhoneComplete` + `MSG` object com mensagens canonicas (62 linhas)
- `apps/web/src/lib/mask-utils.test.ts` — 33 testes Vitest cobrindo todas as funcoes, edge cases (string vazia, partial, overflow)
- `apps/web/vitest.config.ts` — configuracao Vitest adicionada ao projeto

**Patterns established:**
- Mascaras recebem `string | number` e retornam `string` mascarada (sem side effects)
- `maskCpfCnpj`: deteccao por contagem de digitos limpos (<=11 = CPF, 12+ = CNPJ)
- `parseMoney` retorna `0` em input invalido — sem throw, graceful
- `MSG as const` para narrowing de tipo TypeScript — padrao a seguir em outros objetos de mensagens
- Import padrao: `import { maskPhone, maskCEP, maskCpfCnpj, maskMoney, parseMoney, isPhoneComplete, MSG } from '@/lib/mask-utils'`

**Key decisions:**
- `maskMoney` usa `toLocaleString('pt-BR')` internamente para garantir separador de milhar correto (ponto) e decimal (virgula)
- Biblioteca pura: zero dependencias externas, zero I/O, funcoes exportadas individualmente (tree-shakeable)

**Tech debt identified:**
- CPF/CNPJ checksum (mod-11) nao implementado — apenas formatacao. Se validacao de digito verificador for necessaria, criar story separada em 5.4.x ou epic posterior.
- Pre-existing lint warning em `donut-chart.tsx` (react-hooks/immutability) nao relacionado a esta story.

**Tests:** 33 novos (0 regression). **Deploy:** Vercel — commit f659148, https://distriall.vercel.app. **CodeRabbit:** 0 iter (WSL indisponivel na maquina).

### Story 5.4.2 — Aplicar mascaras nos formularios (2026-06-13)

**Built:**
- (ADAPT) `apps/web/src/components/clients/client-form.tsx` — maskPhone em phone e whatsapp; inputMode="tel"; type="text"
- (ADAPT) `apps/web/src/components/products/product-form.tsx` — VariantUIState introducido para separar string mascarada de number; maskMoney em cost_price e sell_price; parseMoney no submit
- (ADAPT) `apps/web/src/components/financial/expense-form.tsx` — maskMoney em amount; parseMoney no submit; inicializacao correta para edicao (amount * 100 → maskMoney)
- (ADAPT) `apps/web/src/components/financial/payment-selector.tsx` — MixedPaymentUI com amountDisplay string separado de amount numerico; maskMoney no onChange; parseMoney no useEffect emit e autoFillLast

**Patterns established:**
- Padrao de mascara React: estado armazena string mascarada; parseMoney converte para numero no submit/emit — NAO no estado
- type="number" DEVE ser removido de inputs com mascara (conflito com browser nativo); substituir por type="text" + inputMode
- inputMode="tel" para telefone/CEP; inputMode="numeric" para moeda
- Quando componente tem interface publica numerica (ex: PaymentSelector.onChange emite number), criar campo display separado (amountDisplay) para o estado mascarado
- VariantUIState pattern: type local com campos string para UI que mapeia para ProductVariantInput com fields numericos no submit

**Key decisions:**
- PaymentSelector manteve interface publica (`amount: number` no PaymentEntry) — criado `amountDisplay: string` como campo de UI interno. Separacao limpa entre camada de apresentacao e contrato de API.
- product-form introducio `VariantUIState` (type local) vs reusar `ProductVariantInput` — decisao correta pois o schema de validacao exige number, nao string.

**Tech debt identified:**
- Import `ProductVariantInput` nao utilizado em product-form.tsx (linha 7) — pre-existente, nao introduzido por esta story. Cleanup recomendado.
- Pre-existing ESLint error em donut-chart.tsx (react-hooks/immutability) — nao relacionado.

**Tests:** 0 novos (33 existentes passando — contrato maskUtils verificado). **Deploy:** Vercel — commit ce58a50, https://distriall.vercel.app. **CodeRabbit:** 0 iter (WSL indisponivel).

### Story 5.4.3 — Validacao no blur e submit, nunca a cada tecla (2026-06-13)

**Built:**
- (ADAPT) `apps/web/src/components/clients/client-form.tsx` — onBlur para nome (required) e telefone (isPhoneComplete); submit re-valida; fieldErrors `Record<string,string>`; aria-invalid nos inputs
- (ADAPT) `apps/web/src/components/products/product-form.tsx` — onBlur para nome e preco por variante; `variantErrors Record<number,Record<string,string>>`; helpers `setVariantError`/`clearVariantError`
- (ADAPT) `apps/web/src/components/financial/expense-form.tsx` — onBlur para descricao e amount > 0; fieldErrors; aria-invalid
- `apps/web/src/app/(authenticated)/orders/new/page.tsx` — Task 4 N/A: Alert global para erros de fluxo mantido; campos Data/Observacoes nao requerem blur validation

**Patterns established:**
- Padrao de blur validation: `onBlur` seta `fieldErrors[campo]` com MSG canonico; `onChange` nao valida — apenas atualiza valor ou aplica mascara (5.4.2)
- `Record<string, string>` para fieldErrors em forms simples; `Record<number, Record<string, string>>` para forms com arrays de itens (variantes)
- `aria-invalid={!!fieldErrors.campo}` no `<Input>` (nao no `<Field>`) — Input.tsx usa `aria-invalid:border-destructive` via Tailwind attribute selector
- Submit re-valida todos os campos required antes de prosseguir (double guard: blur + submit)
- Erros de fluxo (cliente nao selecionado, carrinho vazio) permanecem como Alert global — nao convertidos para Field error

**Key decisions:**
- helpers `setVariantError`/`clearVariantError` criados em product-form para reduzir duplicacao ao lidar com array de variantes
- Task 4 (order/new) N/A confirmada: campos do form nao tem validacao de campo individual — erros sao de fluxo (Alert) ja existentes

**Tech debt identified:**
- Sem testes RTL para blur validation nos 3 forms — apenas Vitest (mask-utils.ts). Testes de componente recomendados pela QA.
- `MSG.required` usado para `amount <= 0` em expense-form — tecnicamente correto mas semanticamente impreciso. Candidato a `MSG.valueInvalid` em story futura.

**Tests:** 0 novos (33 existentes passando). **Deploy:** Vercel — commit 9908969, https://distriall.vercel.app. **CodeRabbit:** 0 iter (WSL indisponivel).

### Story 5.4.4 — Inputs de moeda com prefixo R$ e classe .num (2026-06-13)

**Built:**
- (ADAPT) `apps/web/src/components/ui/input.tsx` — prop `prefix?: React.ReactNode` adicionada com `Omit<React.ComponentProps<"input">, "prefix">` para evitar conflito com atributo HTML nativo; wrapper condicional `div > span + InputPrimitive` aplicado apenas quando prefix presente
- (ADAPT) `apps/web/src/components/financial/expense-form.tsx` — `prefix="R$" className="num"` no campo amount
- (ADAPT) `apps/web/src/components/financial/payment-selector.tsx` — `prefix="R$" className="num"` no input amountDisplay (modo misto)
- (ADAPT) `apps/web/src/components/products/product-form.tsx` — `prefix="R$" className="num"` nos campos cost_price e sell_price por variante

**Patterns established:**
- `Omit<React.ComponentProps<"input">, "prefix">` e o padrao correto ao adicionar props a wrappers de elementos HTML nativos — evita conflito com atributos DOM existentes
- Wrapper prefix: `span` com `h-8 inline-flex items-center rounded-l-lg border border-r-0 border-input bg-muted px-2.5 text-sm select-none` + Input com `rounded-l-none`; `select-none` garante nao editabilidade via interacao
- `.num` ja definida em `apps/web/src/app/globals.css` com `font-variant-numeric: tabular-nums` e `font-feature-settings: 'tnum'` — usar `className="num"` diretamente, sem duplicar em Tailwind

**Key decisions:**
- Wrapper condicional: sem prefix → comportamento identico ao anterior (zero impacto em consumers existentes)
- `Omit` em vez de `React.ComponentProps<"input">` direto — necessario porque `prefix` ja existe como atributo HTML (namespace XML, obsoleto mas presente no tipo)

**Tech debt identified:**
- Testes RTL para Input com prefix ausentes (verificar span, texto "R$", select-none, rounded-l-none) — carry-over da serie 5.4.x
- Import `ProductVariantInput` nao utilizado em product-form.tsx linha 7 — pre-existente, nao introduzido por 5.4.x

**Sub-epic 5.4 COMPLETE (4/4):** maskUtils → mascaras nos forms → blur validation → prefixo R$ + .num. Todos os criterios de formularios e mascaras do Epic 5 atendidos.

**Tests:** 0 novos (62 existentes passando — 33 mask-utils + 29 outros). **Deploy:** Vercel — commits 1956f8d+89b7e45, https://distriall.vercel.app. **CodeRabbit:** 0 iter (WSL indisponivel).

### Story 5.5.1 — Order detail com stepper visual de status (2026-06-13)

**Built:**
- (CREATE) `apps/web/src/components/orders/order-status-stepper.tsx` — componente puro `OrderStatusStepper({ status: OrderStatus })`. Renderiza 4 dots (9px) + linhas (26px x 2px) com tokens `var(--accent)` para passos concluidos e `var(--border-strong)` para futuros. Outline `3px solid var(--accent-soft-border)` no passo atual. Caso `cancelado`: todos dots cinza + label "Cancelado" em `text-destructive`. Labels `text-[10px]` abaixo de cada dot.
- (ADAPT) `apps/web/src/app/(authenticated)/orders/[id]/page.tsx` — stepper integrado em `<Card><CardContent>` logo apos o `<PageHeader>`, antes dos botoes de transicao. Badge `<OrderStatusBadge>` preservado no `actions` do PageHeader. `canEdit` intacto.

**Patterns established:**
- Componente de status visual segue estrutura do DS ui_kit (`OrderDetailScreen.jsx` linhas 23-53) como referencia canonica — nao reimplementar, seguir o padrao de dots
- Tokens `var(--accent)`, `var(--border-strong)`, `var(--accent-soft-border)` sao os tokens canônicos para steppers de status — confirmados em `packages/design-system/tokens/colors.css` nos temas dark e light
- Estado `cancelado` tratado como estado lateral (fora do FLOW linear) — `FLOW.indexOf('cancelado')` retorna `-1`, logo `i <= -1` e sempre false, todos dots ficam cinza automaticamente
- Componente puro sem estado proprio — recebe `status` via props do page, sem side effects

**Key decisions:**
- AC 3 posicionamento do label "Cancelado": WONT_FIX — implementacao coloca label inline apos ultimo dot (ml-2) em vez de abaixo do ultimo passo atingido. Decisao do PO: simplificacao aceita, rastreamento de ultimo status pre-cancelamento seria over-engineering para o caso de uso atual.
- Badge `<OrderStatusBadge>` no PageHeader mantido sem alteracao — o stepper e complementar, nao substituto.

**Tech debt identified:**
- Sem testes unitarios para `OrderStatusStepper` (5 cenarios de status sem cobertura automatizada) — I02 do gate QA. Deferred para story tecnica futura em 5.x.
- `infrastructure/infrastructure-map.json` nao existe no projeto — I03 do gate QA. N/A para o workflow atual (deploy direto via Vercel CLI).

**Tests:** 0 novos (33 existentes passando). **Deploy:** Vercel — commit 2d8af57, https://distriall.vercel.app. **CodeRabbit:** 0 iter (WSL indisponivel). **QA Gate:** CONCERNS (76/100) — aceito pelo PO, nao-bloqueante.

### Story 5.5.4 — Financial hub com grid 3 colunas e icones (2026-06-13)

**Built:**
- (ADAPT) `apps/web/src/app/(authenticated)/financial/page.tsx` — refatorado de lista vertical (`space-y-2`) para `da-grid da-grid--cols3`. Icones Scale/Receipt/Ticket (lucide-react, 20px) com wrapper 40x40 usando tokens DS (`var(--accent-soft)`, `var(--accent-fg)`, `var(--radius-md)`). Labels: Acertos / Despesas / Vales conforme DS reference. Links: `/financial/settlements`, `/financial/expenses`, `/financial/vouchers`.

**Patterns established:**
- `da-grid da-grid--cols3` disponivel via layout.css (ja importado na 5.5.3) — padrao para grids de 3 colunas sem novo import
- Icones hub de navegacao: wrapper `inline-flex 40x40` com `var(--accent-soft)` + `var(--accent-fg)` + `var(--radius-md)` — padrão confirmado em FinancialHubScreen.jsx e consistente com DS
- Hub page como ADAPT puro: pagina existente refatorada sem criar novos componentes — padrão para hubs simples de navegacao

**Key decisions:**
- Label "Despesas" (DS) adotado em vez de "Gastos" (draft original) — conformidade com DS reference
- `var(--radius-md)` adotado em vez de `radius-full` (circulo) — seguir DS em vez do AC original
- "contagem de itens" removida do AC — elemento nao existe no DS reference (Article IV compliance)

**Tech debt identified:**
- Sem testes E2E para grid + navegacao (I02 QA) — componente puramente declarativo, risco baixo
- `infrastructure-map.json` ausente — reincidencia de I01/I03 das stories 5.5.1-5.5.3

**Tests:** 0 novos (62 existentes passando). **Deploy:** Vercel — commit 3c2efa2, https://distriall.vercel.app. **CodeRabbit:** 0 iter (WSL indisponivel). **QA Gate:** PASS (88/100).

### Story 5.5.2 — Receipt para impressao termica + Dialog de preview (2026-06-13)

**Built:**
- (CREATE) `apps/web/src/components/orders/receipt.tsx` — TypeScript port fiel do DS canonical `Receipt.jsx`. Mesmas classes `da-receipt`, mesmo `fmt()`, mesma estrutura JSX. Tokens `--receipt-paper`, `--receipt-ink`, `--receipt-ink-soft`, `--receipt-rule`.
- (ADAPT) `apps/web/src/components/orders/order-receipt.tsx` — substituido modal improvised (bg-white hardcoded) por Dialog DS (`@base-ui/react/dialog`) + Receipt DS. Bluetooth gerenciado pelo pai (page.tsx) para evitar dupla instancia do hook `usePrinter`. `handleShare` com fallback clipboard.
- (ADAPT) `apps/web/src/app/(authenticated)/orders/[id]/page.tsx` — prop `open={showReceipt}` + `subtotal` adicionados ao OrderReceipt. Componente sempre montado (nao condicional) para animacoes do Dialog base-ui.
- (ADAPT) `apps/web/src/app/globals.css` — `@import` do `print.css` do DS no topo (ativa classes `da-receipt`) + `@media print` ao final (oculta nav, header, aside, footer, `[data-slot="sidebar"]`, `[data-slot="page-header"]`).

**Patterns established:**
- Port de componente DS: manter mesma API de props, mesmas classes CSS, mesma logica — apenas adicionar tipos TypeScript
- Dialog DS sempre montado (nao conditional render) — necessario para animacoes de abertura/fechamento do `@base-ui/react/dialog`
- Bluetooth no pai, Dialog = fallback `window.print()` — separacao limpa de responsabilidades
- `@import` de CSS do DS em `globals.css` — padrao canonico para importar estilos de componentes do design system

**Key decisions:**
- AC3 interpretado como "BT no pai, Dialog = fallback" — arquitetura tecnicamente superior (evita dupla instancia de hook), diverge da leitura literal do AC. Aceito pelo PO.
- `usePrinter` REUSE confirmado — hook nao re-implementado, apenas referenciado em page.tsx
- Tokens `--receipt-paper/#FFFFFF`, `--receipt-ink/#18181B` em `:root` (nao `.dark`) — identicos nos dois temas (AC5)

**Tech debt identified:**
- Sem testes automatizados para `receipt.tsx` e `order-receipt.tsx` — I01 do gate QA
- `new Date()` nao memoizado em `order-receipt.tsx` — I04 (low severity)
- `infrastructure-map.json` ausente — reincidencia de I03 (5.5.1)

**Tests:** 0 novos (62 existentes passando). **Deploy:** Vercel — commits 1bb0d04+ce79a79+ef552c8, https://distriall.vercel.app. **CodeRabbit:** 0 iter (WSL indisponivel). **QA Gate:** CONCERNS (76/100) — aceito pelo usuario, nao-bloqueante.

### Story 5.5.5 — Settings com Accordion FAQ e Alert compatibilidade (2026-06-14)

**Built:**
- (ADAPT) `apps/web/src/app/(authenticated)/settings/page.tsx` — pagina refatorada: adicionado Card "Compatibilidade" com lista de 5 browsers (Check/X icons usando `var(--text-positive)` e `var(--text-negative)`), Alert tone="warning" para Safari/Firefox, Card "Solucao de problemas" com Accordion FAQ (3 items canonicos do DS), e dot de status da impressora 8px com `var(--success)` / `var(--text-muted)` + icone wrapper 40x40 com `var(--success-soft)` / `var(--surface-inset)`

**Patterns established:**
- REUSE de componentes existentes (`Accordion`, `Alert`) sem modificacao — padrao preferido para stories de fidelidade DS
- Dados canonicos extraidos do DS reference (`SettingsScreen.jsx`) e declarados como constantes fora do componente — evita recriacao a cada render
- Indicador de status com dot colorido: `width: 8px, height: 8px, border-radius: 50%` com cores condicionais via tokens DS — padrao para status visual inline

**Key decisions:**
- FAQ items usam `{title, content}` (API do Accordion app) adaptado do `{q, a}` do DS — mapeamento correto sem alterar o componente
- Layout 3 Cards (Impressora → Compatibilidade → FAQ) segue ordem logica do DS SettingsScreen
- Nenhum componente novo criado — pure ADAPT da pagina existente com REUSE de componentes UI

**Tech debt identified:**
- Sem testes automatizados para Settings page (I01 QA, LOW) — componente puramente declarativo com dados estaticos, risco baixo
- `infrastructure-map.json` ausente — reincidencia de I01/I03 das stories 5.5.1-5.5.4

**Tests:** 0 novos (62 existentes passando). **Deploy:** Vercel — commit a66c653, https://distriall.vercel.app. **CodeRabbit:** 0 iter (WSL indisponivel). **QA Gate:** PASS (92/100).

### Story 5.5.6 — Theme toggle dark/light (2026-06-14)

**Built:**
- (CREATE) `apps/web/src/hooks/use-theme.ts` — hook `useTheme` com toggle dark/light, persistencia localStorage (`distriall-theme`), SSR-safe (leitura em useEffect, estado inicial `dark`). Funcao `applyTheme` isolada: gerencia classe `dark` no `<html>` e atributo `data-theme="light"`. `toggleTheme` com `useCallback` para estabilidade referencial.
- (ADAPT) `apps/web/src/components/layout/sidebar.tsx` — botao toggle Sun/Moon (lucide-react) posicionado apos nav, antes do fim do aside. Logo condicional: `distriall-logo-on-dark.png` (dark) / `distriall-logo-on-light.png` (light) via ternario no `src` do Image.
- (ADAPT) `apps/web/src/app/layout.tsx` — anti-flash inline script no `<head>` (le localStorage antes do first paint, remove `dark` e seta `data-theme="light"` se necessario). `suppressHydrationWarning` no `<html>`. Classe `dark` mantida como default server-side.

**Patterns established:**
- Hook de tema SSR-safe: estado inicial seguro (`dark`), leitura de localStorage apenas em `useEffect`, anti-flash script inline no layout para evitar FOUC — padrao canonico para qualquer preferencia client-side persistida
- `suppressHydrationWarning` no `<html>` quando atributos sao modificados por inline script antes do React hidratar — necessario para evitar warnings de hydration mismatch
- `data-theme="light"` e o seletor CSS para tokens light do DS extendido (surfaces, borders, text, accent, feedback, status, shadows, gradients) — ja definido em globals.css e colors.css

**Key decisions:**
- Anti-flash via inline script (nao via cookie/SSR) — mais simples, adequado para SPA sem server-side theme detection
- Toggle apenas no sidebar desktop — mobile sem pagina "Mais" no BottomNav, escopo limitado intencionalmente
- Nenhum CSS novo necessario — tokens `[data-theme="light"]` ja completos em globals.css (linhas 333-384)

**Tech debt identified:**
- Sem testes automatizados para `useTheme` (carry-over da serie 5.5.x — risco baixo por ser UI-only)
- Toggle mobile ausente — depende de futura pagina "Mais" no BottomNav
- `prefers-color-scheme` nao detectado — tema sempre inicia como dark, usuario precisa alternar manualmente

**Sub-epic 5.5 COMPLETE (6/6):** stepper → receipt → deliveries 2-col → financial hub → settings → theme toggle. Todos os criterios de telas faltantes e patterns do Epic 5 atendidos. Theme toggle dark/light marca o ultimo item no criterio de conclusao do Epic.

**Tests:** 0 novos (62 existentes passando). **Deploy:** Vercel — commit 26bb1f4, https://distriall.vercel.app. **CodeRabbit:** 0 iter (WSL indisponivel). **QA Gate:** PASS (95/100).
