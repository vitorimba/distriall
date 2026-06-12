# DistriAll — DESIGN.md

Guia de design completo. Para o domínio/regras de negócio, ver `PRODUCT.md`. Para o manifesto de arquivos, ver `readme.md`.

## Princípios

1. **Operacional, não decorativo.** Quem usa está com a mão no caminhão. Densidade média, hierarquia clara, zero ornamento.
2. **Laranja com parcimônia.** 1 CTA primário por tela. O laranja marca ação e estado ativo — nunca é fundo decorativo.
3. **Mesmos tokens, dois temas.** Componentes nunca hardcodam cor; tudo via `var(--*)`. O tema troca os valores, não os nomes.
4. **Número é dado.** Toda cifra usa `tabular-nums` (classe `.num`), alinhada à direita em tabelas, formato pt-BR.

## Temas

O tema é controlado por `data-theme` no `<html>`. Sem atributo = **dark** (padrão). `data-theme="light"` = claro.

| Token | Dark | Light |
|---|---|---|
| `--surface-page` | `#0B0B0D` | `#F6F4F0` (off-white quente) |
| `--surface-card` | `#121214` | `#FFFFFF` |
| `--surface-raised` | `#17171A` | `#FBFAF7` |
| `--surface-inset` (inputs) | `#0E0E10` | `#F0EDE8` |
| `--border-subtle` | `#222227` | `#E9E5DE` |
| `--text-primary` | `#F4F4F6` | `#211E1A` |
| `--text-secondary` | `#A0A0AA` | `#5F5A52` |
| `--accent` | `--orange-500 #F97A1E` | `--orange-600 #E2640D` |
| `--accent-fg` (texto/ícone accent) | `--orange-400` | `--orange-600` |
| Status (texto) | tons 400 | tons 600/700 |
| Status (soft bg) | 13–14% alpha | 9–11% alpha |
| Sombras | quase nulas | suaves e presentes |

Regras dos temas:
- No claro, o laranja **escurece um passo** (500→600) para manter contraste em fundo branco; hover clareia (500), press escurece (700).
- Texto accent em superfícies usa sempre `--accent-fg`, nunca `--orange-400` direto.
- Inputs são "cavados": mais escuros que o card no dark, mais bege que o card no light (`--surface-inset`).
- Vidro/blur: só na sticky bar (`--surface-glass` + blur 12px) e overlays.
- Overlays: scrim padrão `--overlay-scrim` (60% dark / 45% light) + `--overlay-blur` 4px atrás de dialogs; `--overlay-scrim-heavy` (75% / 65%) para foco total (foto de comprovante).
- Recibo térmico: tokens `--receipt-*` fixos (papel branco, tinta preta) nos dois temas — impressora não tem cor; hierarquia por peso/densidade.

## Tipografia

- **Archivo** (400–900) para tudo; **JetBrains Mono** para códigos (`#1042`, SKUs). Google Fonts (substituição — sem binários próprios).
- Escala: `--text-xs` 11 · `sm` 12.5 · `base` 14 · `md` 16 · `lg` 20 · `xl` 24 · `display` 32.
- Títulos: bold, tracking −0.02em. Micro-rótulos overline: xs/600/UPPERCASE/tracking largo ("SUBTOTAL", "LUCRO EST.").
- Corpo padrão 14px. Em slides/print, nunca abaixo de 12pt.

## Espaçamento, raios, sombras

- Escala de 4px: `--space-1..12` = 4/8/12/16/20/24/32/40/48.
- **Semânticos (prefira-os à escala crua):** `--page-pad` 24 (16 no mobile via `--page-pad-mobile`) · `--section-gap` 16 entre cards/seções · `--card-pad` 20 · `--stack-gap` 12 dentro de cards · `--inline-gap` 8 entre botões/chips · `--field-gap` 6 label→input.
- **Densidade:** controles 32/40/48 (`--control-h-*`) · linha de tabela `--row-h-table` 48 · linha de lista `--row-h-list` 56 · alvo de toque mínimo `--touch-target` 44 (mobile, inviolável).
- **Ícones:** `--icon-xs..xl` = 13/15/18/20/26 — chips/botões sm/botões+sidebar/bottom nav/empty states.
- Raios: chips/badges/pills `999px` · botões/inputs `12px` · cards `16px` · modais/hero `22px`.
- Sombras dark: quase nulas (`--shadow-card`), reservadas a overlays e ao glow do CTA (`--shadow-accent`). Light: suaves, definidas no bloco do tema.
- **Camadas:** sempre `z-index: var(--z-*)` — escada fixa: tip 5 · sticky 40 · fab 49 · nav 50 · tooltip 60 · popover 80 · overlay 100 · toast 200. Nunca números mágicos; camada nova = token novo primeiro.
- **Breakpoint único:** 768px (`--bp-mobile`). Grids `.da-grid--*` em `tokens/layout.css` empilham abaixo dele.

## Gradientes

- **Só via tokens** (`tokens/gradients.css`): `--grad-accent` (hero/CTA — máx. 1 por tela; escurece um passo no claro) · `--grad-driver` (header verde do motorista) · `--grad-glow` (ambiência de topo, compor: `var(--grad-glow), var(--surface-page)`) · `--grad-scrim-bottom` (proteção de texto sobre imagem) · `--grad-shimmer` (skeleton; par próprio no tema claro).
- Regras: sempre tom-sobre-tom da mesma família; nunca multi-cor (azul→roxo), nunca neon/vidro, nunca fundo de página inteira; gradiente novo = token novo primeiro.

## Movimento e estados interativos

- **Escada de durações** (`tokens/motion.css`): `--duration-instant` 80 (hover/press) · `fast` 120 (menus, tooltips, scrim) · `base` 180 (dialogs, toasts) · `slow` 240 (bottom sheets) · `deliberate` 400 (progress, barras de gráfico). Nunca duração hardcoded.
- **Curvas nomeadas:** `--ease-out` (padrão — entradas, hovers) · `--ease-in` (saídas) · `--ease-in-out` (movimento contínuo) · `--ease-spring` (enfática — FAB, confirmações; usar com parcimônia).
- **Padrões de entrada:** dialog = fade + translateY(8) + scale(0.98) · toast = fade + translateY(8) · menu = fade + translateY(−3) da origem · sheet = desliza de baixo (40%) · scrim = só fade. Saídas são mais rápidas que entradas ou instantâneas.
- **Regras:** animar só `transform` e `opacity` · skeleton shimmer 1.4s · sem bounce decorativo, sem loops infinitos · sempre `@media (prefers-reduced-motion: reduce)` desligando ou reduzindo.
- **Hover:** fundo `--surface-hover` (4% no dark); botões só mudam cor de fundo. **Press:** `scale(0.96–0.98)` + cor mais escura. **Foco:** outline 2px `--focus-ring`.

## Iconografia

- **Lucide** via CDN UMD (`lucide@0.460.0`), componente `Icon` lê `window.lucide.icons` por nome kebab-case.
- Tamanhos: 13–15 em chips/inputs · 17–18 em botões/sidebar · 20 na bottom nav · 26 em empty states.
- Domínio: dashboard `layout-dashboard` · clientes `users` · produtos `package` · pedidos `clipboard-list` · carregamento `forklift` · entregas `truck` · motorista `smartphone`/`map-pin` · financeiro `wallet` · acertos `scale` · despesas `receipt` · vales `ticket` · estatísticas `chart-column` · configurações `settings` · imprimir `printer`.
- Emoji e unicode como ícone: **nunca**.

## Catálogo de componentes (`components/`)

| Componente | Uso | Variantes-chave |
|---|---|---|
| `Button` | Ações | `primary` / `outline` / `ghost` / `danger` · `sm/md` · `icon`, `loading`, `fullWidth` |
| `IconButton` | Ação só-ícone (sempre com `label`) | `ghost` / `outline` · `sm/md` |
| `Badge` | Status (tone mapeia cor + rótulo pt-BR) | tones: lancado, confirmado, carregado, entregue, cancelado, pendente, pago, vencido, rascunho, conferido, fechado |
| `Chip` | Filtros selecionáveis | `selected`, `count` |
| `Avatar` | Iniciais coloridas (hash do nome) | `sm/md/lg` |
| `Skeleton` | Loading | text/rect/circle |
| `Dialog` | Modal sobre scrim (`--overlay-scrim` + blur) | `title`, `width`, `footer`; fecha por Esc/fora/X |
| `Card` | Container universal | `title`, `action`, `padded={false}` p/ tabelas |
| `StatCard` | KPI do dashboard | `accent` (hero laranja — máx. 1 por linha) · `spark` (sparkline na base) · `loading` |
| `DataTable` | Tabelas (linhas clicáveis, cabeçalhos ordenáveis) | `columns[{key,label,align,width,render,sortable,sortValue}]`, `defaultSort`, `onRowClick` |
| `Tabs` | Abas (ex.: Dados / Preços especiais) | — |
| `EmptyState` | Lista vazia | `icon`, `title`, `description`, `action` |
| `Accordion` | FAQ/troubleshooting — um aberto por vez | `items[{title,content}]`, `defaultOpen` |
| `Tooltip` | Rótulo de botões só-ícone (hover/foco) | `position` top/bottom |
| `ToastProvider` + `useToast` | Confirmação efêmera de ação (~3s) | tones success/danger/info |
| `Alert` | Banner inline persistente | tones info/success/warning/danger · `action` p/ retry |
| `Spinner` | Loading indeterminado curto | embutido em `Button loading` |
| `ProgressBar` | Progresso determinado (rota) | `tone="success"` ao completar |
| `Menu` | Dropdown de ações "..." | `items` + 'separator', `danger` por último |
| `RadioGroup` | Escolha única visível (3–6 opções) | `direction` row/column |
| `QuantityStepper` | Qtd no carrinho (− n +) | `size="lg"` p/ mobile 44px |
| `Pagination` | Tabelas >25 linhas, abaixo da DataTable | `totalItems`+`pageSize` ou `totalPages` |
| `BottomSheet` | Ações sobre seleção no mobile (spec 2.14) | `items` ou children livre |
| `Money` | Valor monetário pt-BR `.num` | cor por contexto (positivo verde, negativo vermelho) |
| `Field` + `Input`/`Select`/`Textarea`/`Checkbox`/`Switch`/`SearchField` | Formulários | `label`, `required`, `error`, `hint` |
| `Sidebar` (+`Wordmark`, `NAV_ITEMS`) | Nav desktop | item ativo = fundo laranja + texto branco |
| `LineChart` | Evolução temporal (faturamento) | `area`, `showDots`, tooltip no hover |
| `BarChart` | Comparação entre categorias | `showValues`, destaque automático do máximo |
| `DonutChart` | Distribuição proporcional (pagamentos) | stat central, legenda interativa, máx. ~5 segmentos |
| `HBarList` | Ranking horizontal (top produtos) | rótulo + barra + valor |
| `Sparkline` | Mini-tendência em StatCards/tabelas | sem eixos nem tooltip |
| `Receipt` | Recibo térmico P&B (58/80mm) — preview de impressão | tokens `--receipt-*`, idêntico nos dois temas |
| `BottomNav` | Nav mobile (5 itens) | — |
| `PageHeader` | Título + subtítulo + voltar + ações | `onBack` |
| `StickyBar` | Totais + ação principal fixa | `items[{label,value,highlight}]`, `action` |
| `FAB` | "+" flutuante mobile | — |

## Gráficos

- **Componentes próprios em `components/charts/`** (SVG + React, sem libs): LineChart, BarChart, DonutChart, HBarList, Sparkline. Produção pode usar Recharts, mas seguindo exatamente esta aparência.
- Cores **somente** da paleta `--chart-1..5` (laranja é sempre a série principal); grid `--chart-grid`; valores em pt-BR (`fmtBRL`/`fmtNum` de `chartUtils`).
- Tooltip padrão no hover (surface-raised + borda forte); legenda interativa no donut; barra máxima destacada, demais a 50% de opacidade.
- **Filtros vivos:** chips de período e seletor de conta devem trocar os dados de verdade (gráficos, KPIs e tabelas re-renderizam) — nunca decorativos. Tabelas analíticas usam `sortable` nas colunas numéricas.
- **Proibido nos gráficos:** glow/neon, gradientes multi-cor (azul→roxo), 3D, animações em loop. O único gradiente permitido é o preenchimento sutil sob a linha (22%→2%).
- Máximo ~5 categorias por donut (agrupar "Outros"); uma série por LineChart.

## Formulários e validação

- **Máscaras pt-BR** (`components/forms/maskUtils.jsx`): `maskPhone` (fixo/celular pelo tamanho), `maskCEP`, `maskCpfCnpj`, `maskMoney` (dígitos viram centavos: `123456` → `1.234,56`; `parseMoney` para converter de volta). Aplicar no `onChange`; inputs numéricos usam `inputMode="tel|numeric"`.
- **Validação:** no blur do campo e no submit — nunca a cada tecla. Erro = `invalid` no Input (borda) + `error` no Field (mensagem abaixo); nunca só cor. Mensagens canônicas em `maskUtils.MSG` ("Campo obrigatório", "Telefone incompleto"...) — sem variações.
- **Obrigatório:** asterisco no label via `Field required`; campos opcionais não recebem marcação.
- **Moeda em input:** sempre prefixo `R$` via `prefix` + classe `.num`.

## Estados de tela (padrão canônico)

Toda tela com dados remotos implementa os 4 estados. Componentes e copy são fixos:

| Estado | Componente | Copy canônica |
|---|---|---|
| **Loading** | `Skeleton` espelhando o layout real (nunca spinner de página; `Spinner` só inline em botões/células) | — |
| **Vazio** | `EmptyState` com ícone + título + próximo passo (ação primária quando fizer sentido) | "Nenhum pedido ainda" + "Lance o primeiro pedido para vê-lo aqui." |
| **Erro** | `Alert tone="danger"` + botão `Tentar novamente` (icon `refresh-cw`) | "Não foi possível carregar os pedidos" — sempre nomeia o que falhou; nunca código de erro cru |
| **Sucesso** | `Toast` curto, some sozinho | "Pedido #1047 salvo" — substantivo + ação no particípio |

**Quando usar o quê:** toast = confirmação passageira de ação concluída · alert = estado persistente da tela (erro, aviso de vencimento) · dialog = decisão que bloqueia (confirmar cancelamento, ação destrutiva — botão `danger` à direita).

## Padrões de composição

- **Feedback de ação:** toda ação que muda dados dispara `useToast()` ("Pedido salvo"); avisos persistentes usam `Alert`; erro com retry = `Alert tone="danger"` + botão "Tentar novamente".
- **Tela padrão:** `PageHeader` → linha de busca/filtros (`SearchField` + `Chip`s) → `Card padded={false}` com `DataTable` ou lista de linhas.
- **Formulário:** cards por seção, grid 2 colunas, `Field` em tudo; rodapé `Salvar` (primary) + `Cancelar` (outline).
- **Seleção em lote:** linhas com `Checkbox` + `StickyBar` aparece quando há seleção.
- **Status:** sempre `Badge`; nunca texto puro nem fundo sólido.
- **Item vencido/crítico:** card com borda na cor do status + fundo soft (ver Vales).
- **Motorista:** layout próprio, header com gradiente verde (`--green-600 → #15803D`), conteúdo max 560px centrado.

## Voz e conteúdo

- **Glossário fixo do domínio:** é *pedido* (nunca ordem/venda), *acerto* (nunca fechamento), *vale* (nunca crédito/fiado), *lançar pedido* (nunca criar/registrar), *carregamento* (nunca expedição), *rota/entrega* (nunca romaneio).
- **Botões:** verbo no infinitivo ("Salvar", "Marcar como pago", "Tentar novamente"). Nada de "OK", "Sim".
- **Confirmação destrutiva:** título com o objeto ("Cancelar pedido #1042?"), consequência em 1 frase, botão de saída seguro nomeado ("Manter pedido") + ação destrutiva nomeada ("Cancelar pedido", variant danger).
- **Formatos:** moeda `R$ 1.234,56` · data `12/06/2026` (curta `12/06`) · período `01–07 jun 2026` · código `#1042` em mono.
- Sentence case sempre; sem emoji; sem exclamações e sem "Ops!".

## Acessibilidade

- Foco visível sempre: `outline 2px var(--focus-ring)` offset 2; nunca remover sem substituto.
- Dialog prende foco, fecha com Esc e devolve o foco ao gatilho; Menu fecha com Esc.
- `IconButton` exige `label` (vira `aria-label`); ícones decorativos e Skeleton com `aria-hidden`.
- Alvo de toque ≥ 44px no mobile; contraste AA 4.5:1 (pares vetados no card de Colors); status nunca só por cor — badge sempre carrega texto.

## Don'ts

- Não inventar cores fora dos tokens; gradientes só os nomeados em `tokens/gradients.css` (`--grad-*`) — nunca um `linear-gradient` solto.
- Não usar emoji, Title Case ou ALL CAPS (fora dos overlines).
- Não colocar 2 CTAs primários na mesma tela.
- Não reimplementar primitivos dentro de telas — compor `components/`.
- Não esquecer os 3 estados: loading (Skeleton), empty (EmptyState), error (mensagem + retry).
