# DistriAll Design System

**DistriAll Distribuidora** é uma plataforma B2B de gestão de distribuição: pedidos, clientes, produtos, entregas (rotas + motoristas), financeiro (acertos, despesas, vales) e analytics para distribuidores. Multi-conta, papel de motorista dedicado, desktop (sidebar 240px) e mobile (bottom nav 64px). Mobile-first: os usuários são distribuidores em campo.

## Documentação

| Doc | Para quê |
|---|---|
| `readme.md` (este) | Porta de entrada: contexto, fundamentos resumidos e manifesto de arquivos |
| `PRODUCT.md` | Produto: domínio, personas, modelo de dados, mapa das 27 telas, regras de negócio |
| `DESIGN.md` | Design: temas dark/light, tipografia, catálogo de componentes, padrões de composição, don'ts |
| `CLAUDE.md` | Regras persistentes para agentes de IA que editarem este projeto |
| `SKILL.md` | Skill portátil p/ Claude Code — aponta para os docs acima |

## Sources

- `assets/distriall-logo-original.png` — logo fornecida pelo usuário (fundo branco). Derivadas: `distriall-logo-on-dark.png` (DISTRI branco) e `distriall-logo-on-light.png` (DISTRI preto), ambas com fundo transparente.
- `uploads/1.jpg`, `uploads/2.jpg` — dashboards de referência escolhidos pelo usuário (dark UI, accent laranja, cards muito arredondados, gráficos laranja). **Não são produtos DistriAll** — serviram só de direção visual.
- Especificação textual de 27 telas fornecida no briefing (rotas, conteúdo de cada tela, padrões de layout).
- Não havia codebase nem Figma. Este design system é a primeira materialização visual do produto.

## CONTENT FUNDAMENTALS

- **Idioma:** pt-BR em toda a interface. Termos do domínio sempre em português: *pedido, cliente, carregamento, entrega, acerto, vale, despesa, faturamento, lucro, ticket médio*.
- **Casing:** sentence case em tudo — botões ("Salvar pedido", "Marcar como entregue"), títulos ("Novo pedido"), labels ("Forma de pagamento"). Nunca Title Case nem ALL CAPS, exceto micro-rótulos overline (xs/600/caps com tracking largo: "SUBTOTAL", "LUCRO EST.").
- **Tom:** direto, operacional, sem floreio. Quem usa está com a mão no caminhão. Verbos no infinitivo em ações ("Imprimir", "Recalcular", "Tentar novamente"); mensagens curtas e factuais ("Email ou senha inválidos. Tente novamente.").
- **Pessoa:** o sistema fala com "você" implícito, raramente explícito. Sem "nós". Imperativo educado: "Ajuste a busca ou os filtros de status."
- **Números:** moeda sempre `R$ 1.234,56` (pt-BR), tabular-nums, alinhada à direita em tabelas. Lucro/saldo positivo em verde, negativo em vermelho com sinal. Datas curtas `12/06`; completas `12/06/2026 08:14`.
- **Códigos:** números de pedido `#1042` e SKUs em JetBrains Mono.
- **Emoji:** nunca.
- **Estados vazios:** título factual + uma frase de ação ("Nenhum cliente ainda. Cadastre o primeiro cliente para começar.").

## VISUAL FOUNDATIONS

- **Tema:** dark-first com tema claro completo. Dark: página `--gray-950 #0B0B0D`, cards `--gray-900 #121214`, elementos elevados `#17171A`, inputs em `--surface-inset #0E0E10` (mais escuros que o card — "cavados"). **Light** (`data-theme="light"` no `<html>`): off-white quente `#F6F4F0` na página, cards brancos, inset `#F0EDE8`, texto `#211E1A`. Mesmos tokens semânticos nos dois temas — só o valor muda; componentes nunca hardcodam cor.
- **Accent:** laranja da marca `--orange-500 #F97A1E` (no claro escurece um passo: `--accent` = `--orange-600`, hover 500, press 700; texto/ícone accent usa `--accent-fg`). Usado com parcimônia: 1 CTA primário por tela, item ativo da navegação, chips selecionados, dados de destaque, gráficos. Hover clareia (`--orange-400`), press escurece (`--orange-600`). Um único card "hero" por linha de stats pode usar o gradiente laranja (135deg, 500→600).
- **Cor de status:** sempre par *soft bg (13–14% alpha no dark, 9–11% no light) + texto na própria cor* — nunca fundo sólido. No tema claro os status usam tons 600/700 para contraste. Pedido: lançado=azul, confirmado=roxo, carregado=laranja, entregue=verde, cancelado=vermelho. Vale: pendente=amarelo, pago=verde, vencido=vermelho.
- **Tipo:** Archivo (400–900) para tudo; títulos bold com tracking -0.02em; corpo 14px. JetBrains Mono para códigos. Todo número de dado usa `tabular-nums` (classe `.num`).
- **Cards:** raio 16px, borda 1px `--border-subtle #222227`, sombra quase nula (`--shadow-card`). Header de card com borda inferior. Sem glow, sem gradientes decorativos (exceto o hero laranja).
- **Raios:** chips/badges 999px; inputs/botões 12px; cards 16px; modais/hero 22px.
- **Bordas:** oníricas e escuras — `#222227` sutil, `#303037` forte (inputs). Foco: borda laranja + ring `0 0 0 3px` laranja 13%.
- **Sombras:** mínimas no dark; reservadas a overlays (`--shadow-overlay`) e ao FAB/CTA (`--shadow-accent`, glow laranja 25%).
- **Hover:** fundos `rgba(branco 4%)`; linhas de tabela clicáveis idem; botões mudam só a cor de fundo. **Press:** `scale(0.96–0.98)` + cor mais escura.
- **Animação:** rápida e funcional — 120–180ms, `cubic-bezier(0.2, 0.8, 0.3, 1)`. Skeleton shimmer 1.4s. Nada de bounces ou loops decorativos; `prefers-reduced-motion` respeitado.
- **Blur/transparência:** na sticky bar inferior (`--surface-glass` + blur 12px) e em overlays — dialogs usam scrim `--overlay-scrim` (60% dark / 45% light) + `--overlay-blur` 4px; `--overlay-scrim-heavy` para foco total (foto de comprovante).
- **Recibo térmico:** tokens `--receipt-*` fixos (papel branco, tinta preta) nos dois temas; hierarquia por peso/densidade — componente `Receipt`.
- **Imagens:** o produto não usa fotografia. Avatares são iniciais coloridas (hash do nome). Ilustração: nenhuma — estados vazios usam ícone Lucide em círculo cinza.
- **Layout:** desktop = sidebar fixa 240px + conteúdo max 1200px com padding 24px; mobile = bottom nav fixa 64px + FAB. Formulários de pedido têm sticky bar inferior com totais + ação principal.
- **Gráficos:** componentes próprios em `components/charts/` (LineChart, BarChart, DonutChart, HBarList, Sparkline — SVG via tokens, hover com tooltip). Paleta `--chart-1..5` (laranja, laranja claro, azul, verde, roxo) sobre grid `--chart-grid`. Sem glow, sem gradientes multi-cor.

## ICONOGRAPHY

- **Sistema:** [Lucide](https://lucide.dev) (stroke 2, cantos arredondados) via CDN UMD — `<script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js">`. O componente `Icon` (components/core) lê de `window.lucide.icons` por nome kebab-case. *Substituição flagged: não havia icon set próprio; Lucide foi escolhido por combinar com as referências (stroke fino, geométrico).*
- **Tamanhos:** 13–15px em chips/inputs, 17–18px em botões/sidebar, 20px na bottom nav, 26px em empty states (stroke 1.6).
- **Mapeamento de domínio:** dashboard=`layout-dashboard`, clientes=`users`, produtos=`package`, pedidos=`clipboard-list`, carregamento=`forklift`, entregas=`truck`, financeiro=`wallet`, estatísticas=`chart-column`, configurações=`settings`, faturamento=`wallet`, lucro=`trending-up`, ticket=`receipt`, imprimir=`printer`, editar=`pencil`, excluir=`trash-2`.
- **Emoji/unicode como ícone:** nunca. Setas e símbolos sempre via Lucide.
- **Logos:** usar `assets/distriall-logo-on-dark.png` em fundos escuros, `-on-light` em claros. Em UI densa (sidebar), preferir o `Wordmark` (DISTRI branco + ALL laranja, Archivo 800).

## Index

| Caminho | Conteúdo |
|---|---|
| `styles.css` | Entry point — só `@import`s |
| `PRODUCT.md` / `DESIGN.md` / `CLAUDE.md` / `SKILL.md` | Documentação (ver tabela no topo) |
| `tokens/` | `colors.css`, `typography.css`, `spacing.css`, `motion.css`, `gradients.css`, `fonts.css` (Google Fonts), `layout.css`, `base.css` |
| `assets/` | Logos (original, on-dark, on-light) |
| `guidelines/` | Specimen cards: cores (12 cards), tipo (3), espaçamento (6: escala, semântico, densidade, camadas, layout, raios/sombras), motion (durações/curvas), padrões (estados de tela, formulários/validação, voz e conteúdo, acessibilidade), marca (logo + uso do logo) |
| `components/core/` | `Icon`, `Button`, `IconButton`, `Badge`, `Chip`, `Avatar`, `Skeleton`, `Dialog`, `Tooltip`, `Toast` (`ToastProvider`+`useToast`), `Alert`, `Spinner`, `ProgressBar`, `Menu` |
| `components/forms/` | `Field`, `Input`, `Select`, `Textarea`, `Checkbox`, `Switch`, `SearchField`, `RadioGroup`, `QuantityStepper` + `maskUtils` (máscaras pt-BR, mensagens canônicas `MSG`) |
| `components/data/` | `Card`, `StatCard`, `DataTable`, `Tabs`, `EmptyState`, `Money`, `Accordion` |
| `components/print/` | `Receipt` (recibo térmico P&B 58/80mm) |
| `components/charts/` | `LineChart`, `BarChart`, `DonutChart`, `HBarList`, `Sparkline` (+`chartUtils`: `fmtBRL`, `fmtNum`, `CHART_COLORS`) |
| `components/navigation/` | `Sidebar` (+`Wordmark`, `NAV_ITEMS`), `BottomNav`, `PageHeader`, `StickyBar`, `FAB`, `Pagination`, `BottomSheet` |
| `ui_kits/distriall/` | App click-through (12 telas, desktop `index.html` + mobile `mobile.html`): Login, Dashboard interativo, Pedidos (lista/detalhe com recibo/novo), Cliente, Produtos, Carregamento, Entregas (rota), Motorista, Financeiro (hub/despesas/acertos/vales), Estatísticas, Configurações — toggle claro/escuro (ver README local) |
| `templates/` | Pontos de partida p/ projetos consumidores: `tela-app`, `formulario`, `mobile`, `login` |
| `SKILL.md` | Skill p/ Claude Code |

**Fontes:** Archivo e JetBrains Mono são carregadas do Google Fonts (não há binários no projeto). Se a marca tiver fonte proprietária, substituir em `tokens/fonts.css`.
