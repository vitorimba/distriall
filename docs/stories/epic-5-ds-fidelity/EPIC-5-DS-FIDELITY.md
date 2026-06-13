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
| 5.5 | Telas Faltantes e Patterns | 6 | 23 | MEDIUM |
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

## Development Log

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
