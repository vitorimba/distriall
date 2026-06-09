# Distriall - UX/UI Specification

> **Versao:** 1.0
> **Data:** 2026-06-08
> **Autor:** Uma (UX Design Expert Agent)
> **Fonte:** PRD v1.0, Intake Report, Screenshots Kite
> **Status:** Draft

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [Design Tokens](#2-design-tokens)
3. [Component Library](#3-component-library)
4. [Wireframes](#4-wireframes)
5. [Navigation Flows](#5-navigation-flows)
6. [Responsive Breakpoints](#6-responsive-breakpoints)
7. [Accessibility](#7-accessibility)
8. [UX Prioritization](#8-ux-prioritization)

---

## 1. Design Principles

### P1: Familiaridade com o Kite

Tiago usa o Kite diariamente. O novo sistema deve manter a mesma logica mental: catalogo > pedido > confirmar > estatisticas. Nao reinventar fluxos que ja funcionam. Manter a disposicao visual de informacoes financeiras similar (Faturamento, Vendas, Ticket Medio, Lucro em cards verticais com valores em destaque verde, como no Kite).

### P2: Simplicidade Extrema para o Entregador

Joao tem baixa familiaridade com tecnologia (red flag RF1 do intake). A tela dele deve ser um checklist gigante: fonte grande, botao unico por acao, sem menus aninhados, sem configuracoes visiveis. Maximo de 2 toques para qualquer acao. Zero ambiguidade.

### P3: Mobile-First, Campo-First

O app e usado na rua, no sol, dentro da van, na fabrica. Tudo precisa funcionar com uma mao, com tela brilhante, com pressa. Botoes grandes (minimo 48px), contrastes altos, informacoes densas mas organizadas.

### P4: Acao Principal Sempre Visivel

Os dois botoes mais usados ("Novo Pedido" e "Carregar Selecionados") devem estar sempre acessiveis sem scroll ou navegacao. FAB (Floating Action Button) para novo pedido. Barra de acao fixa no bottom quando ha selecao ativa.

### P5: Feedback Imediato

Toda acao deve ter confirmacao visual instantanea. Status mudam de cor, totais recalculam em tempo real, checkboxes animam. O usuario nunca deve se perguntar "funcionou?".

### P6: Contexto de Conta Sempre Visivel

O switcher de conta deve estar sempre visivel no header. A cor de fundo ou accent pode variar sutilmente por conta para reforcar qual esta ativa. Nunca deixar o usuario operar na conta errada.

### P7: Progressao Disclosure

Mostrar apenas o necessario no momento. Detalhes financeiros complexos ficam em telas dedicadas. A lista de pedidos mostra o essencial (cliente, valor, status). Detalhes aparecem ao tocar.

---

## 2. Design Tokens

### 2.1 Color Palette

Inspirada no Kite (verde/branco) com ajustes para alto contraste em campo.

```
CORES PRIMARIAS
--color-primary:          #16A34A   (verde — acao principal, valores positivos)
--color-primary-light:    #22C55E   (verde claro — hover, backgrounds leves)
--color-primary-dark:     #15803D   (verde escuro — texto sobre fundo claro)
--color-primary-surface:  #F0FDF4   (verde pastel — fundo de cards de destaque)

CORES NEUTRAS
--color-white:            #FFFFFF
--color-gray-50:          #F9FAFB   (fundo da pagina)
--color-gray-100:         #F3F4F6   (fundo de cards, separadores)
--color-gray-200:         #E5E7EB   (bordas)
--color-gray-300:         #D1D5DB   (bordas ativas)
--color-gray-400:         #9CA3AF   (texto placeholder)
--color-gray-500:         #6B7280   (texto secundario)
--color-gray-700:         #374151   (texto principal)
--color-gray-900:         #111827   (titulos, texto enfatico)

CORES DE STATUS (badges de pedido)
--color-status-lancado:   #9CA3AF   (cinza — neutro, rascunho)
--color-status-confirmado:#3B82F6   (azul — comprometido)
--color-status-carregado: #F59E0B   (amarelo — em transito)
--color-status-entregue:  #16A34A   (verde — completo)

CORES DE CONTA (sutis, apenas accent)
--color-conta-rp:         #3B82F6   (azul — Distrial Rio Preto)
--color-conta-tiago:      #8B5CF6   (roxo — Tiago pessoal)
--color-conta-voto:       #F97316   (laranja — Votoporanga)
--color-conta-all:        #16A34A   (verde — Consolidado)

CORES SEMANTICAS
--color-success:          #16A34A
--color-warning:          #F59E0B
--color-error:            #EF4444
--color-info:             #3B82F6

CORES FINANCEIRAS
--color-revenue:          #16A34A   (faturamento — verde como no Kite)
--color-expense:          #EF4444   (gastos — vermelho)
--color-profit:           #16A34A   (lucro — verde)
--color-cost:             #F59E0B   (custo — amarelo)
```

### 2.2 Typography

```
FONTE
--font-family:            'Inter', system-ui, -apple-system, sans-serif
--font-family-mono:       'JetBrains Mono', monospace   (valores monetarios)

TAMANHOS
--font-xs:                12px / 0.75rem   (labels menores)
--font-sm:                14px / 0.875rem  (texto secundario, badges)
--font-base:              16px / 1rem      (texto padrao — NUNCA menor que isso em mobile)
--font-lg:                18px / 1.125rem  (subtitulos)
--font-xl:                20px / 1.25rem   (titulos de secao)
--font-2xl:               24px / 1.5rem    (titulos de pagina)
--font-3xl:               30px / 1.875rem  (valores financeiros em destaque)
--font-4xl:               36px / 2.25rem   (numeros hero no dashboard)

PESOS
--font-normal:            400
--font-medium:            500
--font-semibold:          600
--font-bold:              700

LINE-HEIGHT
--leading-tight:          1.25
--leading-normal:         1.5
--leading-relaxed:        1.75

TELA DO ENTREGADOR (override)
--font-entregador-base:   20px / 1.25rem
--font-entregador-lg:     24px / 1.5rem
--font-entregador-xl:     28px / 1.75rem
```

### 2.3 Spacing

```
--space-1:    4px   / 0.25rem
--space-2:    8px   / 0.5rem
--space-3:    12px  / 0.75rem
--space-4:    16px  / 1rem
--space-5:    20px  / 1.25rem
--space-6:    24px  / 1.5rem
--space-8:    32px  / 2rem
--space-10:   40px  / 2.5rem
--space-12:   48px  / 3rem
--space-16:   64px  / 4rem
```

### 2.4 Border Radius

```
--radius-sm:    4px
--radius-md:    8px
--radius-lg:    12px
--radius-xl:    16px
--radius-full:  9999px  (badges, avatares)
```

### 2.5 Shadows

```
--shadow-sm:    0 1px 2px rgba(0,0,0,0.05)
--shadow-md:    0 4px 6px rgba(0,0,0,0.07)
--shadow-lg:    0 10px 15px rgba(0,0,0,0.1)
--shadow-card:  0 1px 3px rgba(0,0,0,0.08)   (card padrao)
--shadow-fab:   0 4px 12px rgba(0,0,0,0.15)   (floating action button)
--shadow-modal: 0 20px 60px rgba(0,0,0,0.15)  (modals, bottom sheets)
```

### 2.6 Z-Index Scale

```
--z-base:       0
--z-card:       10
--z-sticky:     100    (headers, bottom nav)
--z-fab:        200    (floating action button)
--z-overlay:    300    (backdrop de modals)
--z-modal:      400    (modals, bottom sheets)
--z-toast:      500    (notificacoes toast)
```

---

## 3. Component Library

### 3.1 Buttons

| Componente | Uso | Specs |
|-----------|-----|-------|
| `ButtonPrimary` | Acao principal (Salvar, Confirmar, Carregar) | bg: primary, text: white, h: 48px, radius-md, font-medium |
| `ButtonSecondary` | Acao secundaria (Cancelar, Voltar) | bg: white, border: gray-300, text: gray-700, h: 48px |
| `ButtonDanger` | Acao destrutiva (Excluir) | bg: error, text: white, h: 48px |
| `ButtonGhost` | Acoes em listas (Editar, Imprimir) | bg: transparent, text: primary, h: 40px |
| `ButtonIcon` | Acao com icone (Filtro, Busca) | bg: transparent, icon: 24px, tap: 48x48px |
| `FAB` | Novo Pedido (flutuante) | bg: primary, icon: +, 56x56px, radius-full, shadow-fab |
| `ButtonEntregador` | Botao do Joao | bg: primary, text: white, h: 64px, font: 20px bold, radius-lg |

### 3.2 Cards

| Componente | Uso | Specs |
|-----------|-----|-------|
| `CardPedido` | Item na lista de pedidos | bg: white, shadow-card, radius-md, padding: space-4. Inclui: checkbox, nome cliente, valor, status badge, conta badge |
| `CardEstatistica` | Metrica no dashboard (como Kite) | bg: white, shadow-card, radius-md. Label cinza topo, valor verde grande, sublabel cinza |
| `CardProdutoCarregamento` | Item na lista de carregamento | bg: white. Produto nome, quantidade total bold, unidade |
| `CardCliente` | Item na lista de clientes | bg: white. Nome, endereco, ultimo pedido, saldo devedor |
| `CardEntrega` | Item na lista do entregador | bg: white, shadow-md, radius-lg, padding: space-6. Nome GRANDE, endereco, forma pgto, botao Entregue |
| `CardGasto` | Item na lista de gastos | bg: white. Descricao, valor, categoria badge, conta |
| `CardAcerto` | Resumo do acerto semanal | bg: primary-surface, border: primary. Total vendido, custos, gastos, lucro liquido |

### 3.3 Badges

| Componente | Uso | Specs |
|-----------|-----|-------|
| `BadgeStatus` | Status do pedido | Pill shape, radius-full, padding: 4px 12px, font-sm. Cor conforme status |
| `BadgeConta` | Indicador de qual conta | Pill shape, cor da conta, font-xs, uppercase |
| `BadgePagamento` | Forma de pagamento | Pill outline, text: gray-700, border: gray-300 |
| `BadgeQuantidade` | Quantidade em carregamento | bg: primary-surface, text: primary-dark, font-bold, radius-md |

### 3.4 Inputs

| Componente | Uso | Specs |
|-----------|-----|-------|
| `InputText` | Campos gerais | h: 48px, border: gray-300, radius-md, padding: space-3, font-base |
| `InputSearch` | Busca de produtos/clientes | h: 48px, icon lupa esquerda, clear button direita, radius-full |
| `InputNumber` | Quantidade, valores | h: 48px, botoes +/- nas laterais (touch-friendly), font-lg |
| `InputCurrency` | Valores em reais | h: 48px, prefixo "R$", alinhamento direita, font-mono |
| `TextArea` | Observacoes, motivo devolucao | min-h: 96px, resize vertical, radius-md |

### 3.5 Selection Controls

| Componente | Uso | Specs |
|-----------|-----|-------|
| `Checkbox` | Selecao de pedidos | 24x24px min, tap area 48x48px, animacao de check |
| `CheckboxPedido` | Checkbox integrada ao CardPedido | Area de toque no lado esquerdo inteiro do card |
| `RadioGroup` | Forma de pagamento, filtros | 24px circle, tap area 48px, label ao lado |
| `Switch` | Gasto compartilhado on/off | 48x28px, thumb 24px, animacao slide |
| `Select` | Selecao de conta, periodo | h: 48px, dropdown nativo no mobile, bottom sheet custom |
| `ChipFilter` | Filtros rapidos (status, conta) | Pill, toggleable, bg muda quando ativo |

### 3.6 Navigation

| Componente | Uso | Specs |
|-----------|-----|-------|
| `BottomNav` | Navegacao principal (admin) | 5 items max, h: 64px, icon 24px + label 10px, bg: white, shadow-md |
| `AccountSwitcher` | Troca de conta no header | Dropdown compacto, mostra nome da conta + dot de cor, tap para menu |
| `Header` | Topo de cada tela | h: 56px, titulo centralizado, back button esquerda, acoes direita |
| `DrawerNav` | Menu lateral (secundario) | w: 280px, overlay, items com icon + label |
| `TabBar` | Sub-navegacao (ex: estatisticas) | Horizontal scrollable, underline indicator, font-medium |

### 3.7 Feedback

| Componente | Uso | Specs |
|-----------|-----|-------|
| `Toast` | Confirmacao de acao (salvo, imprimindo) | bg: gray-900, text: white, radius-lg, aparece bottom, 3s auto-dismiss |
| `BottomSheet` | Filtros, acoes em lote, detalhes | bg: white, radius-xl topo, handle bar, max-h: 80vh |
| `Modal` | Confirmacao destrutiva | bg: white, overlay: black/50%, radius-xl, padding: space-6 |
| `EmptyState` | Listas vazias | Icone ilustrativo 64px, texto descritivo, CTA se aplicavel |
| `LoadingSkeleton` | Carregamento de dados | Retangulos cinza pulsando, layout identico ao conteudo real |
| `ActionBar` | Barra fixa ao selecionar items | bg: primary, text: white, h: 56px, fixed bottom, mostra contagem + acoes |

### 3.8 Data Display

| Componente | Uso | Specs |
|-----------|-----|-------|
| `DataRow` | Linha de dados em tabelas/listas | h: 48px, label esquerda (gray-500), valor direita (gray-900), separador bottom |
| `SummaryBlock` | Totais em carregamento/acerto | bg: primary-surface, radius-lg. Label + valor grande |
| `RankingRow` | Ranking de produtos | # posicao, nome produto, valor, quantidade. Alternating bg |
| `ProgressBar` | Progresso de rota/entregas | h: 8px, bg: gray-200, fill: primary, radius-full |
| `ChartPie` | Meios de pagamento | Similar ao Kite (circulo com percentuais) |
| `ChartLine` | Evolucao semanal | Linha simples, faturamento + lucro, eixo X = semanas |

---

## 4. Wireframes

### 4.1 Login / Selecao de Conta

```
+------------------------------------------+
|              DISTRIALL                    |
|           [Logo ou Icone]                 |
|                                           |
|  +--------------------------------------+ |
|  |  Email                                | |
|  +--------------------------------------+ |
|                                           |
|  +--------------------------------------+ |
|  |  Senha                           [o] | |
|  +--------------------------------------+ |
|                                           |
|  +--------------------------------------+ |
|  |          ENTRAR                       | |
|  +--------------------------------------+ |
|                                           |
|  [ ] Manter conectado                    |
|                                           |
+------------------------------------------+

--- Apos login (se multi-conta) ---

+------------------------------------------+
|  <- Selecionar Conta                      |
|                                           |
|  Qual conta deseja acessar?              |
|                                           |
|  +--------------------------------------+ |
|  | [*] Distrial Rio Preto               | |
|  |     12 pedidos hoje                   | |
|  +--------------------------------------+ |
|                                           |
|  +--------------------------------------+ |
|  | [*] Tiago                             | |
|  |     8 pedidos hoje                    | |
|  +--------------------------------------+ |
|                                           |
|  +--------------------------------------+ |
|  | [*] Distrial Votoporanga             | |
|  |     5 pedidos hoje                    | |
|  +--------------------------------------+ |
|                                           |
|  +--------------------------------------+ |
|  | [=] Todas as Contas (consolidado)    | |
|  +--------------------------------------+ |
|                                           |
+------------------------------------------+
```

**Notas:**
- Login simples, email + senha
- Apos login, se usuario tem acesso a multiplas contas, mostra selecao
- Cada conta mostra quantitativo rapido (pedidos do dia)
- Opcao "Todas as Contas" para visualizacao consolidada
- Entregador (Joao) pula esta tela - vai direto para tela de entregas

---

### 4.2 Dashboard

```
+------------------------------------------+
| [=] Dashboard          [Distrial RP v]   |
|                         (account switch)  |
+------------------------------------------+
|                                           |
|  Hoje, 08 Jun 2026                       |
|                                           |
|  +------------------+  +----------------+ |
|  | Faturamento      |  | Lucro          | |
|  | R$ 3.250,00      |  | R$ 812,50      | |
|  | +12% vs semana   |  | +8% vs semana  | |
|  +------------------+  +----------------+ |
|                                           |
|  +------------------+  +----------------+ |
|  | Pedidos          |  | Ticket Medio   | |
|  | 14               |  | R$ 232,14      | |
|  | 3 pendentes      |  |                | |
|  +------------------+  +----------------+ |
|                                           |
|  +--------------------------------------+ |
|  | Meio de Pagamento         [ver mais]  | |
|  |  Dinheiro ====== 45%                  | |
|  |  Pix     ====   25%                   | |
|  |  Boleto  ===    20%                   | |
|  |  Vale    =      10%                   | |
|  +--------------------------------------+ |
|                                           |
|  +--------------------------------------+ |
|  | Ultimos Pedidos           [ver todos] | |
|  | Acougue Espanha   R$526  [Confirmado] | |
|  | Rest. Sabor       R$380  [Lancado]    | |
|  | Frigorifico Norte R$210  [Entregue]   | |
|  +--------------------------------------+ |
|                                           |
+------------------------------------------+
|  [Home] [Pedidos] [+] [Stats] [Menu]    |
+------------------------------------------+
```

**Notas:**
- Header: titulo + account switcher (dropdown com cor da conta)
- Cards de metricas em grid 2x2, valores em verde grande (como Kite)
- Meios de pagamento em barra horizontal simplificada
- Ultimos pedidos com status badge colorido
- FAB central no bottom nav para "Novo Pedido"
- Dados respondem ao filtro de conta no switcher

---

### 4.3 Lista de Pedidos

```
+------------------------------------------+
| <- Pedidos             [Distrial RP v]   |
+------------------------------------------+
| +--------------------------------------+ |
| | [Buscar cliente ou pedido...]     [Q] | |
| +--------------------------------------+ |
|                                           |
| [Todos] [Lancado] [Confirmado] [Carreg.] |
|                                           |
| Hoje, 08 Jun                             |
|                                           |
| +--------------------------------------+ |
| |[x] Acougue Espanha                    | |
| |    R$ 526,00   Boleto    [Confirmado] | |
| |    RP  8 itens                        | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |[ ] Rest. Sabor & Cia                  | |
| |    R$ 380,00   Pix       [Lancado]    | |
| |    RP  5 itens                        | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |[x] Dona Maria Temperos                | |
| |    R$ 152,00   Dinheiro  [Confirmado] | |
| |    TI  3 itens                        | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |[ ] Bar do Ze                           | |
| |    R$ 89,00    Vale      [Lancado]    | |
| |    VO  2 itens                        | |
| +--------------------------------------+ |
|                                           |
+------------------------------------------+
| [2 selecionados]  [Carregar] [Confirmar] |
+------------------------------------------+
|  [Home] [Pedidos] [+] [Stats] [Menu]    |
+------------------------------------------+
```

**Notas:**
- Barra de busca no topo
- Chips de filtro por status (horizontal scrollable)
- Cada card de pedido tem: checkbox (esquerda), nome cliente (bold), valor, forma pgto, status badge, badge de conta (RP/TI/VO), contagem de itens
- Quando "Todas as Contas" selecionado, pedidos de todas aparecem com badge de conta
- ActionBar fixa no bottom quando ha selecao: mostra contagem + botoes de acao em lote (Carregar, Confirmar)
- Swipe right no card: acao rapida (Imprimir)
- Tap no card: abre detalhe do pedido
- Tap no checkbox: seleciona para carregamento/acoes em lote

---

### 4.4 Novo/Editar Pedido

```
+------------------------------------------+
| <- Novo Pedido         [Distrial RP]     |
+------------------------------------------+
|                                           |
| Cliente                                   |
| +--------------------------------------+ |
| | [Buscar cliente...]              [+]  | |
| +--------------------------------------+ |
| > Acougue Espanha (selecionado)          |
|   Preco especial: 12 produtos            |
|   Pgto padrao: Boleto                    |
|                                           |
| Produtos                                 |
| +--------------------------------------+ |
| | [Buscar produto...]                    | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| | Alho descascado 500g                   | |
| | R$ 19,50/un          [-] 17 [+]       | |
| |                       R$ 331,50        | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| | Tempero caseiro 500g (completo)        | |
| | R$ 3,87/un           [-]  5 [+]       | |
| |                       R$ 19,35         | |
| +--------------------------------------+ |
|                                           |
| [+ Adicionar Produto]                    |
|                                           |
|  ---------------------------------------- |
| | Subtotal:         R$ 350,85            | |
| | Custo:            R$ 265,00            | |
| | Lucro estimado:   R$ 85,85            | |
|  ---------------------------------------- |
|                                           |
| Forma de Pagamento                       |
| (o) Boleto  ( ) Pix  ( ) Dinh.  ( ) Vale |
|                                           |
| Observacoes                              |
| +--------------------------------------+ |
| | (opcional)                             | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |         SALVAR PEDIDO                  | |
| +--------------------------------------+ |
|                                           |
+------------------------------------------+
```

**Notas:**
- Busca de cliente com autocomplete; ao selecionar, precos customizados sao carregados
- Badge indicando quantos precos especiais o cliente tem
- Forma de pagamento pre-selecionada com o padrao do cliente
- Busca de produto com autocomplete; ao selecionar, adiciona a lista
- Quantidade com botoes +/- grandes e tap-friendly
- Preco unitario e subtotal por linha
- Resumo financeiro sticky no bottom: subtotal, custo, lucro estimado
- Em modo edicao: mesmo layout, titulo muda para "Editar Pedido #123"
- Botao salvar muda texto conforme contexto: "Salvar Pedido" (novo), "Atualizar Pedido" (edicao)

---

### 4.5 Carregamento Seletivo (DOR PRINCIPAL - DETALHAMENTO MAXIMO)

Esta e a tela mais critica do sistema. Resolve a dor D1/D3 do Tiago: soma manual entre 3 apps.

#### 4.5.1 Visao Geral do Fluxo

```
1. Selecionar pedidos (checkboxes) --> 2. Ver consolidado em tempo real --> 3. Confirmar carregamento
```

#### 4.5.2 Wireframe - Estado Inicial (nenhum pedido selecionado)

```
+------------------------------------------+
| <- Carregamento        [Todas Contas v]  |
+------------------------------------------+
|                                           |
| +--------------------------------------+ |
| | [Buscar cliente...]              [F]  | |
| +--------------------------------------+ |
|                                           |
| Filtros:                                  |
| [Todos] [Lancado] [Confirmado]           |
| [Hoje v] [Todas Contas v]               |
|                                           |
| ========================================= |
| SELECIONE OS PEDIDOS PARA CARREGAR       |
| Marque os pedidos que irao na van hoje   |
| ========================================= |
|                                           |
| +--------------------------------------+ |
| |[ ] Acougue Espanha                    | |
| |    R$ 526,00  [Confirmado]  [RP]      | |
| |    8 itens - Boleto                    | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |[ ] Rest. Sabor & Cia                  | |
| |    R$ 380,00  [Lancado]     [RP]      | |
| |    5 itens - Pix                       | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |[ ] Dona Maria Temperos                | |
| |    R$ 152,00  [Confirmado]  [TI]      | |
| |    3 itens - Dinheiro                  | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |[ ] Casa de Carnes Norte               | |
| |    R$ 410,00  [Confirmado]  [VO]      | |
| |    6 itens - Pix                       | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |[ ] Bar do Ze                           | |
| |    R$ 89,00   [Lancado]     [TI]      | |
| |    2 itens - Vale                      | |
| +--------------------------------------+ |
|                                           |
+------------------------------------------+
|  [Home] [Pedidos] [+] [Stats] [Menu]    |
+------------------------------------------+
```

#### 4.5.3 Wireframe - Com Pedidos Selecionados (estado ativo)

```
+------------------------------------------+
| <- Carregamento        [Todas Contas v]  |
+------------------------------------------+
| +--------------------------------------+ |
| | [Buscar cliente...]              [F]  | |
| +--------------------------------------+ |
|                                           |
| [Todos] [Lancado] [Confirmado]           |
|                                           |
| +--------------------------------------+ |
| |[x] Acougue Espanha                    | |
| |    R$ 526,00  [Confirmado]  [RP]      | |
| |    8 itens - Boleto                    | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |[ ] Rest. Sabor & Cia                  | |
| |    R$ 380,00  [Lancado]     [RP]      | |
| |    5 itens - Pix                       | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |[x] Dona Maria Temperos                | |
| |    R$ 152,00  [Confirmado]  [TI]      | |
| |    3 itens - Dinheiro                  | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |[x] Casa de Carnes Norte               | |
| |    R$ 410,00  [Confirmado]  [VO]      | |
| |    6 itens - Pix                       | |
| +--------------------------------------+ |
|                                           |
+------------------------------------------+
| RESUMO: 3 pedidos | 3 contas             |
| Fat: R$ 1.088,00 | Lucro: R$ 272,00     |
| [Ver Lista de Carregamento]       [>>>]  |
+------------------------------------------+
```

**Notas sobre a ActionBar:**
- Aparece FIXO no bottom assim que 1+ pedidos selecionados
- Mostra contagem de pedidos, contas envolvidas, faturamento e lucro totais
- Recalcula em TEMPO REAL a cada check/uncheck
- Botao "Ver Lista de Carregamento" abre BottomSheet com consolidado
- Swipe up no ActionBar tambem abre o BottomSheet

#### 4.5.4 Wireframe - BottomSheet: Lista Consolidada de Carregamento

```
+------------------------------------------+
|          ____  (handle bar)               |
|                                           |
| LISTA DE CARREGAMENTO                    |
| 3 pedidos de 3 contas                    |
|                                           |
| ========================================= |
| PRODUTOS PARA SEPARAR                    |
| ========================================= |
|                                           |
| +--------------------------------------+ |
| | Alho descascado 500g          x 22   | |
| +--------------------------------------+ |
| | Tempero caseiro 500g (comp.)  x 72   | |
| +--------------------------------------+ |
| | Mezabom 500gr                 x 15   | |
| +--------------------------------------+ |
| | Creme de cebola kg            x 10   | |
| +--------------------------------------+ |
| | Ervas mistas 250gr            x  8   | |
| +--------------------------------------+ |
| | Coloral kg                    x  5   | |
| +--------------------------------------+ |
| | Caldo de galinha 1010kg       x  5   | |
| +--------------------------------------+ |
| | Trigo p/kibe 3kg              x  3   | |
| +--------------------------------------+ |
|                                           |
| ========================================= |
| RESUMO FINANCEIRO                        |
| ========================================= |
|                                           |
| Faturamento total:      R$ 1.088,00     |
| Custo mercadoria:       R$ 816,00       |
| Lucro bruto:            R$ 272,00       |
|                                           |
| Por conta:                               |
|  [RP] Distrial RP:     R$ 526,00        |
|  [TI] Tiago:           R$ 152,00        |
|  [VO] Votoporanga:     R$ 410,00        |
|                                           |
| ========================================= |
| PEDIDOS INCLUIDOS                        |
| ========================================= |
|                                           |
| [RP] Acougue Espanha      R$ 526,00     |
| [TI] Dona Maria           R$ 152,00     |
| [VO] Casa de Carnes Norte R$ 410,00     |
|                                           |
| +--------------------------------------+ |
| | [Imprimir Lista]  [Marcar Carregado] | |
| +--------------------------------------+ |
|                                           |
+------------------------------------------+
```

#### 4.5.5 Detalhes Criticos da Tela de Carregamento

**Comportamento da lista de produtos consolidada:**
- Produtos com mesmo nome/variacao sao SOMADOS entre pedidos de contas diferentes
- Exibicao: nome do produto + quantidade total (bold, grande)
- Ordenacao padrao: por quantidade (maior primeiro) - facilita separacao na fabrica
- Opcao de ordenar por nome (alfabetica)
- Produtos agrupados por categoria (se cadastrada) como opcao

**Selecao de pedidos:**
- Checkbox grande (24px icone, 48px area de toque)
- Selecao funciona com pedidos em QUALQUER status (Lancado, Confirmado)
- "Selecionar todos" como opcao no topo
- "Selecionar todos de uma conta" como filtro rapido
- Ao desmarcar, recalcula instantaneamente

**ActionBar (barra de resumo fixa):**
- Sticky no bottom, acima da bottom nav
- Animacao slide-up ao selecionar primeiro pedido
- Animacao slide-down ao desmarcar ultimo
- Conteudo: "[N] pedidos | [N] contas | Fat: R$ X | Lucro: R$ Y"
- Tap ou swipe up: abre BottomSheet com lista completa

**Acoes no BottomSheet:**
- "Imprimir Lista": imprime lista consolidada na impressora termica (lista de separacao para a fabrica)
- "Marcar como Carregado": muda status de TODOS os pedidos selecionados para "Carregado"
- Confirmacao antes de marcar: "Marcar 3 pedidos como Carregado?"
- Apos marcar, pedidos saem da lista "a carregar" e vao para "carregados"

**Performance:**
- Calculo em tempo real no client-side (sem round-trip ao servidor)
- Debounce de 100ms nos calculos ao marcar/desmarcar rapido
- Lista de produtos consolidada renderizada como virtual list se > 50 items

**Atalhos:**
- Long-press em um card: seleciona e ativa modo de selecao
- Tap no badge de conta: filtra para mostrar apenas pedidos daquela conta
- Pull-to-refresh: recarrega pedidos do servidor

---

### 4.6 Estatisticas

```
+------------------------------------------+
| <- Estatisticas        [Distrial RP v]   |
+------------------------------------------+
|                                           |
| +------< Ontem: 01 Junho >---------+    |
|   (navegacao por data, como no Kite)     |
|                                           |
| [Dia] [Semana] [Mes] [Personalizado]    |
|                                           |
| +--------------------------------------+ |
| | Faturamento                            | |
| | R$ 1.504,00                            | |
| | Melhor dia: 01 Jun               >    | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| | Vendas                                 | |
| | 6                                      | |
| | Melhor dia: 01 Jun               >    | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| | Ticket Medio                           | |
| | R$ 250,67                              | |
| | Melhor dia: 01 Jun               >    | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| | Lucro                                  | |
| | R$ 318,70                              | |
| | Melhor dia: 01 Jun               >    | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| | Meio de Pagamento                      | |
| | 100%  (O)                              | |
| | Usam Dinheiro                     >    | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| | Ranking de Produtos               >    | |
| | Alho descascado                        | |
| +--------------------------------------+ |
|                                           |
+------------------------------------------+
|  [Home] [Pedidos] [+] [Stats] [Menu]    |
+------------------------------------------+
```

**Notas:**
- Layout IDENTICO ao Kite para familiaridade (P1)
- Navegacao por setas < > para trocar data/periodo
- Tabs para alternar entre Dia, Semana, Mes, Personalizado
- Account switcher no header para filtrar por conta ou ver consolidado
- Cards clicaveis com ">" que expandem para detalhes
- Ranking de Produtos abre tela dedicada (como no Kite)
- Diferencial vs Kite: funciona por PERIODO (nao apenas dia) e por SELECAO de pedidos

---

### 4.7 Acerto Semanal

```
+------------------------------------------+
| <- Acerto Semanal      [Distrial RP v]   |
+------------------------------------------+
|                                           |
| Semana: 02-08 Jun 2026     [<] [>]      |
| Status: [Rascunho]                       |
|                                           |
| ========================================= |
|  RECEITAS                                |
| ========================================= |
|                                           |
| +--------------------------------------+ |
| | Dinheiro (12 pedidos)    R$ 4.200,00  | |
| | Pix (8 pedidos)          R$ 3.150,00  | |
| | Boleto (6 pedidos)       R$ 2.800,00  | |
| | Vale (3 pedidos)         R$ 890,00    | |
| | Cartao (1 pedido)        R$ 210,00    | |
| |                    ------------------  | |
| | TOTAL VENDIDO:           R$ 11.250,00 | |
| +--------------------------------------+ |
|                                           |
| ========================================= |
|  CUSTOS                                  |
| ========================================= |
|                                           |
| +--------------------------------------+ |
| | Custo mercadoria (30 ped) R$ 8.437,50 | |
| +--------------------------------------+ |
|                                           |
| ========================================= |
|  GASTOS                                  |
| ========================================= |
|                                           |
| +--------------------------------------+ |
| | Impostos (fixo)          R$ 320,00    | |
| | Gasolina (rateio 50%)    R$ 250,00    | |
| | Manutencao               R$ 80,00     | |
| |                    ------------------  | |
| | TOTAL GASTOS:            R$ 650,00    | |
| +--------------------------------------+ |
|                                           |
| ========================================= |
|  RESULTADO                               |
| ========================================= |
|                                           |
| +--------------------------------------+ |
| |                                        | |
| |  LUCRO LIQUIDO                         | |
| |  R$ 2.162,50                           | |
| |                                        | |
| |  Vendido - Custo - Gastos = Lucro     | |
| |  11.250 - 8.437 - 650 = 2.162         | |
| |                                        | |
| +--------------------------------------+ |
|                                           |
| Vales pendentes: 3 (R$ 890,00)    [>]   |
| Devolucoes: 1 (R$ 45,00)          [>]   |
|                                           |
| +--------------------------------------+ |
| |  [Conferir]        [Fechar Acerto]    | |
| +--------------------------------------+ |
|                                           |
+------------------------------------------+
```

**Notas:**
- Organizado em secoes: Receitas, Custos, Gastos, Resultado
- Cada secao expansivel para ver detalhe (lista de pedidos, gastos individuais)
- Receitas agrupadas por forma de pagamento com contagem
- Gastos mostram se sao fixos, variaveis, ou rateados
- Lucro liquido em card de destaque (bg verde, fonte grande)
- Formula visivel: Vendido - Custo - Gastos = Lucro
- Links para vales pendentes e devolucoes
- Workflow: Rascunho > Conferido > Fechado
- Conta "Tiago" visivel APENAS para Tiago (permissao RLS)

---

### 4.8 Clientes (Lista + Detalhe)

#### Lista de Clientes

```
+------------------------------------------+
| <- Clientes            [Distrial RP v]   |
+------------------------------------------+
| +--------------------------------------+ |
| | [Buscar cliente...]                    | |
| +--------------------------------------+ |
|                                           |
| [Todos] [Com fiado] [Inativos]           |
|                                           |
| +--------------------------------------+ |
| | Acougue Espanha                        | |
| | Av. Brasil, 1234 - Centro             | |
| | Ultimo pedido: 07 Jun | Boleto        | |
| | Fiado: R$ 0,00                         | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| | Dona Maria Temperos                    | |
| | R. das Flores, 56 - Jd. America      | |
| | Ultimo pedido: 05 Jun | Dinheiro      | |
| | Fiado: R$ 450,00                  [!] | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| | Bar do Ze                              | |
| | R. Sao Paulo, 789 - Vila Nova        | |
| | Ultimo pedido: 01 Jun | Vale          | |
| | Fiado: R$ 1.200,00               [!] | |
| +--------------------------------------+ |
|                                           |
|                        [+ Novo Cliente]  |
+------------------------------------------+
```

#### Detalhe do Cliente

```
+------------------------------------------+
| <- Acougue Espanha                       |
+------------------------------------------+
|                                           |
| DADOS                                    |
| Nome: Acougue Espanha                    |
| Endereco: Av. Brasil, 1234 - Centro     |
| Telefone: (17) 99999-8888          [W]  |
| Pgto padrao: Boleto                      |
| Conta: Distrial RP                       |
|                                           |
| PRECOS ESPECIAIS (12 produtos)     [>]   |
|                                           |
| RESUMO                                   |
| +------------------+  +----------------+ |
| | Ultimo pedido    |  | Frequencia     | |
| | 07 Jun 2026      |  | Semanal        | |
| +------------------+  +----------------+ |
|                                           |
| +------------------+  +----------------+ |
| | Total comprado   |  | Saldo devedor  | |
| | R$ 12.450,00     |  | R$ 0,00        | |
| +------------------+  +----------------+ |
|                                           |
| HISTORICO DE PEDIDOS              [filtro]|
| +--------------------------------------+ |
| | 07 Jun  R$ 526,00  [Entregue]  Boleto | |
| | 01 Jun  R$ 480,00  [Entregue]  Boleto | |
| | 25 Mai  R$ 310,00  [Entregue]  Pix    | |
| | 18 Mai  R$ 526,00  [Entregue]  Boleto | |
| +--------------------------------------+ |
|                                           |
| [Editar]  [Novo Pedido]  [WhatsApp]     |
+------------------------------------------+
```

**Notas:**
- Lista com busca, filtro por situacao (fiado, inativos)
- Indicador visual [!] para clientes com fiado pendente
- Detalhe mostra dados, precos especiais, resumo, historico
- Botao WhatsApp abre conversa direto (link wa.me)
- "Novo Pedido" ja pre-seleciona o cliente
- Historico com filtro por periodo e status

---

### 4.9 Produtos

```
+------------------------------------------+
| <- Produtos            [Distrial RP v]   |
+------------------------------------------+
| +--------------------------------------+ |
| | [Buscar produto...]                    | |
| +--------------------------------------+ |
|                                           |
| [Todos] [A-Z] [Preco] [Mais vendidos]   |
|                                           |
| +--------------------------------------+ |
| | Alho descascado                        | |
| | 500g | Custo: R$ 12,00                 | |
| | Venda: R$ 19,50 | Lucro: R$ 7,50      | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| | Tempero caseiro (completo)             | |
| |   500g  Venda: R$ 3,87                | |
| |   1kg   Venda: R$ 7,20                | |
| |   5kg   Venda: R$ 32,00               | |
| |   25kg  Venda: R$ 145,00              | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| | Creme de cebola                        | |
| |   1kg   Venda: R$ 18,00               | |
| |   25kg  Venda: R$ 380,00              | |
| +--------------------------------------+ |
|                                           |
| Mostrando 48 de 200 produtos            |
|                                           |
| [Editar Precos em Lote]                  |
| [+ Novo Produto]                         |
+------------------------------------------+
```

**Notas:**
- Produtos com variacoes mostram todas inline (expandido)
- Mostra custo, venda e margem
- Filtros por ordenacao
- Edicao em lote: seleciona N produtos, ajusta % ou valor fixo
- Infinite scroll para 200 produtos
- Cada conta tem catalogo independente

---

### 4.10 Gastos

```
+------------------------------------------+
| <- Gastos               [Distrial RP v]  |
+------------------------------------------+
|                                           |
| Semana: 02-08 Jun 2026     [<] [>]      |
|                                           |
| Total: R$ 650,00                         |
|                                           |
| FIXOS                                    |
| +--------------------------------------+ |
| | Impostos              R$ 320,00       | |
| | Semanal | Exclusivo RP          [ed]  | |
| +--------------------------------------+ |
|                                           |
| VARIAVEIS                                |
| +--------------------------------------+ |
| | Gasolina              R$ 500,00       | |
| | Compartilhado: RP 50% | TI 50%      | |
| | Sua parte:            R$ 250,00  [ed] | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| | Manutencao freio      R$ 80,00       | |
| | Unico | Exclusivo RP            [ed]  | |
| +--------------------------------------+ |
|                                           |
| [+ Novo Gasto]                           |
|                                           |
+------------------------------------------+
```

**Notas:**
- Agrupados por tipo (Fixos/Variaveis)
- Gastos compartilhados mostram rateio e valor da parte da conta ativa
- Indicador de recorrencia (semanal, mensal, unico)
- Edicao inline rapida
- Novo gasto: formulario simples com campo de rateio se compartilhado

---

### 4.11 Tela do Entregador (Joao) - EXTREMAMENTE SIMPLES

Esta tela segue principio P2: simplicidade extrema. Joao ve APENAS o que precisa.

```
+------------------------------------------+
|                                           |
|  ENTREGAS HOJE                           |
|  8 de Jun | 12 entregas                  |
|                                           |
|  Progresso: ======----  7/12             |
|                                           |
+------------------------------------------+
|                                           |
| +--------------------------------------+ |
| |                                        | |
| |  1. ACOUGUE ESPANHA                   | |
| |                                        | |
| |  Av. Brasil, 1234 - Centro            | |
| |  Pagamento: BOLETO                     | |
| |                                        | |
| |  Alho descascado x17                  | |
| |  Tempero caseiro x5                   | |
| |  Mezabom x3                           | |
| |                                        | |
| |  +----------------------------------+ | |
| |  |                                    | | |
| |  |        ENTREGUE                    | | |
| |  |                                    | | |
| |  +----------------------------------+ | |
| |                                        | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |                                        | |
| |  2. DONA MARIA TEMPEROS               | |
| |                                        | |
| |  R. das Flores, 56 - Jd. America     | |
| |  Pagamento: DINHEIRO                   | |
| |                                        | |
| |  Tempero caseiro x10                  | |
| |  Ervas mistas x4                     | |
| |                                        | |
| |  +----------------------------------+ | |
| |  |                                    | | |
| |  |        ENTREGUE                    | | |
| |  |                                    | | |
| |  +----------------------------------+ | |
| |                                        | |
| +--------------------------------------+ |
|                                           |
| +--------------------------------------+ |
| |  [ja entregue - fundo verde]           | |
| |  3. REST. SABOR & CIA         [done]  | |
| |  Entregue as 10:42                    | |
| +--------------------------------------+ |
|                                           |
+------------------------------------------+
```

**Detalhes criticos da tela do entregador:**

- **SEM bottom nav** - Joao nao navega para lugar nenhum
- **SEM header complexo** - apenas titulo "ENTREGAS HOJE" e data
- **SEM account switcher** - ele nao precisa trocar conta
- **SEM busca** - ele segue a lista sequencialmente
- **Fonte base: 20px** (override do 16px padrao)
- **Nomes de clientes: 24px bold, UPPERCASE**
- **Botao ENTREGUE: 64px de altura, verde, texto 20px bold**
- **Cards grandes com muito padding** (space-6 = 24px)
- **Barra de progresso no topo** mostra quanto falta
- **Itens ja entregues** ficam colapsados com fundo verde e horario
- **Scroll vertical unico** - sem tabs, sem filtros
- **Ao clicar ENTREGUE**: confirmacao simples ("Confirmar entrega para Acougue Espanha?") com botao GRANDE "SIM"
- **Campo de observacao**: aparece como opcional APOS confirmar entrega (bottom sheet simples com textarea grande)
- **Link para Maps**: tap no endereco abre Google Maps com navegacao
- **Offline**: entregas podem ser marcadas offline, sincroniza quando tiver internet

---

### 4.12 Configuracoes

```
+------------------------------------------+
| <- Configuracoes                         |
+------------------------------------------+
|                                           |
| CONTA                                    |
| +--------------------------------------+ |
| | Perfil                            >   | |
| | Contas de Negocio                 >   | |
| | Usuarios e Permissoes             >   | |
| +--------------------------------------+ |
|                                           |
| IMPRESSORA                               |
| +--------------------------------------+ |
| | Impressora Bluetooth             >    | |
| | Conectada: Printer-58mm               | |
| | Testar impressao                      | |
| +--------------------------------------+ |
|                                           |
| FINANCEIRO                               |
| +--------------------------------------+ |
| | Gastos recorrentes               >    | |
| | Rateio entre contas              >    | |
| | Categorias de gasto              >    | |
| +--------------------------------------+ |
|                                           |
| DADOS                                    |
| +--------------------------------------+ |
| | Importar produtos (CSV)          >    | |
| | Importar clientes (CSV)          >    | |
| | Exportar dados                   >    | |
| +--------------------------------------+ |
|                                           |
| SOBRE                                    |
| +--------------------------------------+ |
| | Versao 1.0.0                          | |
| | Suporte                          >    | |
| +--------------------------------------+ |
|                                           |
| [Sair]                                   |
|                                           |
+------------------------------------------+
```

**Notas:**
- Agrupado por secao logica
- Impressora: pareamento Bluetooth, teste de impressao
- Importacao CSV para migracao do Kite (migracao manual dos ~200 produtos e clientes)
- Permissoes: definir quais contas cada usuario acessa e com qual role

---

## 5. Navigation Flows

### 5.1 Bottom Navigation (Admin/Vendedor)

```
+-------+--------+-----+-------+------+
| Home  | Pedidos| (+) | Stats | Menu |
+-------+--------+-----+-------+------+
   |        |       |      |       |
   |        |       |      |       +-> Drawer Menu:
   |        |       |      |           - Carregamento
   |        |       |      |           - Acerto Semanal
   |        |       |      |           - Clientes
   |        |       |      |           - Produtos
   |        |       |      |           - Gastos
   |        |       |      |           - Configuracoes
   |        |       |      |
   |        |       |      +-> Estatisticas
   |        |       |
   |        |       +-> Novo Pedido (FAB)
   |        |
   |        +-> Lista de Pedidos
   |
   +-> Dashboard
```

### 5.2 Navigation Structure

```
Login
  |
  +-> Selecao de Conta (se multi-conta)
       |
       +-> App Principal
            |
            +-> Dashboard (Home)
            |     +-> Card pedido -> Detalhe pedido
            |     +-> Ver todos -> Lista pedidos
            |
            +-> Lista de Pedidos
            |     +-> Tap pedido -> Detalhe pedido
            |     |     +-> Editar pedido
            |     |     +-> Imprimir
            |     |     +-> Registrar devolucao
            |     +-> Checkbox -> ActionBar -> Carregar/Confirmar
            |     +-> FAB (+) -> Novo Pedido
            |
            +-> Novo/Editar Pedido
            |     +-> Buscar cliente
            |     +-> Buscar produto
            |     +-> Salvar -> Volta para lista
            |
            +-> Carregamento (via Menu)
            |     +-> Selecao de pedidos
            |     +-> BottomSheet consolidado
            |     |     +-> Imprimir lista
            |     |     +-> Marcar carregado
            |
            +-> Estatisticas
            |     +-> Ranking produtos (sub-tela)
            |     +-> Detalhes por metrica
            |
            +-> Acerto Semanal (via Menu)
            |     +-> Detalhe por forma pgto
            |     +-> Vales pendentes
            |     +-> Fechar acerto
            |
            +-> Clientes (via Menu)
            |     +-> Detalhe cliente
            |     |     +-> Historico pedidos
            |     |     +-> Precos especiais
            |     |     +-> Novo pedido (pre-selecionado)
            |     +-> Novo cliente
            |
            +-> Produtos (via Menu)
            |     +-> Editar produto
            |     +-> Edicao em lote
            |     +-> Novo produto
            |
            +-> Gastos (via Menu)
            |     +-> Editar gasto
            |     +-> Novo gasto
            |
            +-> Configuracoes (via Menu)
                  +-> Sub-telas de config
```

### 5.3 Entregador Navigation

```
Login
  |
  +-> Tela de Entregas (UNICA TELA)
       |
       +-> Tap "ENTREGUE" -> Confirmacao -> Observacao (opcional)
       +-> Tap endereco -> Google Maps
       +-> Nenhuma outra navegacao
```

### 5.4 Account Switcher Flow

```
[Header: Account Switcher]
  |
  +-> Dropdown mostra todas contas acessiveis
  |     +-> Distrial Rio Preto [*]
  |     +-> Tiago
  |     +-> Distrial Votoporanga
  |     +-> Todas as Contas (consolidado)
  |
  +-> Selecionar conta -> TODOS os dados da tela atual recarregam
  |     +-> Dashboard mostra dados da nova conta
  |     +-> Pedidos filtra para nova conta
  |     +-> Estatisticas recalcula para nova conta
  |
  +-> Cor accent do header muda sutilmente conforme conta
```

### 5.5 Quick Actions (Shortcuts)

| De onde | Acao | Para onde |
|---------|------|----------|
| Dashboard > Card pedido | Tap | Detalhe pedido |
| Lista pedidos > Checkbox | Selecionar | ActionBar com acoes em lote |
| Detalhe cliente > "Novo Pedido" | Tap | Novo pedido com cliente pre-selecionado |
| Qualquer tela > FAB (+) | Tap | Novo pedido |
| Detalhe pedido > "Imprimir" | Tap | Impressao Bluetooth |
| Detalhe cliente > Telefone | Tap | WhatsApp |
| Tela entregador > Endereco | Tap | Google Maps |

---

## 6. Responsive Breakpoints

### 6.1 Breakpoints

```
MOBILE (PRIMARY TARGET)
--bp-mobile:     320px - 480px    (smartphones Android, uso principal)

MOBILE LARGE
--bp-mobile-lg:  481px - 640px    (smartphones grandes)

TABLET
--bp-tablet:     641px - 1024px   (tablets, uso secundario)

DESKTOP
--bp-desktop:    1025px - 1440px  (Diego no computador)

DESKTOP LARGE
--bp-desktop-lg: 1441px+          (monitores grandes)
```

### 6.2 Layout Adaptations

| Componente | Mobile (320-640) | Tablet (641-1024) | Desktop (1025+) |
|-----------|-----------------|-------------------|-----------------|
| Bottom Nav | Visivel, 5 items | Visivel, 5 items | Sidebar fixa (esquerda) |
| Cards metricas | 2 colunas | 4 colunas | 4 colunas + graficos maiores |
| Lista pedidos | Full width, cards | Full width, cards | Tabela com colunas |
| Novo pedido | Full screen | Full screen | Modal ou split-view |
| Carregamento BottomSheet | Full height | 70% height | Panel lateral direito |
| Account switcher | Dropdown compacto | Dropdown | Sidebar com lista de contas |
| FAB | Bottom right, 56px | Bottom right, 56px | Botao no header |
| Drawer Menu | Full overlay | 280px side | Integrado na sidebar |
| Tela entregador | Full screen (APENAS) | Full screen | N/A (nao usa desktop) |

### 6.3 Touch vs Pointer

| Dispositivo | Tap target min | Hover states | Tooltips |
|------------|---------------|--------------|----------|
| Mobile | 48x48px | Nao | Nao |
| Tablet | 48x48px | Nao | Nao |
| Desktop | 36x36px | Sim (hover cards, botoes) | Sim (icones sem label) |

---

## 7. Accessibility

### 7.1 Visual

| Requisito | Especificacao | Motivo |
|----------|---------------|--------|
| Contraste minimo | 4.5:1 (texto), 3:1 (elementos grandes) | Uso ao sol, em campo |
| Fonte minima (admin) | 16px | Legibilidade mobile |
| Fonte minima (entregador) | 20px | Joao - baixa familiaridade tech |
| Cor de status | Cor + texto (nunca apenas cor) | Daltonismo |
| Tap target minimo | 48x48px | Uso com uma mao, dedos grandes |
| Tap target entregador | 64px altura (botoes) | Simplicidade maxima |
| Espacamento entre tap targets | Minimo 8px | Evitar toque acidental |

### 7.2 Interaction

| Requisito | Especificacao |
|----------|---------------|
| Max toques para acao principal | 2 (admin), 1 (entregador) |
| Feedback tatil | Haptic ao confirmar acoes criticas |
| Loading states | Skeleton screens (nunca tela em branco) |
| Erro de rede | Toast com opcao de retry |
| Offline | Indicador persistente no header quando offline |
| Undo | Toast com undo para acoes reversiveis (excluir gasto, desmarcar entrega) |

### 7.3 Status Badges - Acessibilidade por Cor + Texto

```
[Lancado]    -> bg: gray-100, text: gray-700, border: gray-300
[Confirmado] -> bg: blue-100, text: blue-800, border: blue-300
[Carregado]  -> bg: yellow-100, text: yellow-800, border: yellow-300
[Entregue]   -> bg: green-100, text: green-800, border: green-300
```

Cada badge tem COR DE FUNDO + TEXTO + BORDA, garantindo legibilidade mesmo em condicoes adversas (sol direto, daltonismo).

### 7.4 Fontes e Pesos por Contexto

| Contexto | Fonte | Peso | Tamanho |
|---------|-------|------|---------|
| Valores monetarios | Mono (JetBrains) | Bold | 24-36px |
| Nomes de cliente | Inter | Semibold | 16-18px |
| Labels | Inter | Normal | 14px |
| Botoes | Inter | Medium | 16px |
| Entregador - nomes | Inter | Bold | 24px |
| Entregador - botoes | Inter | Bold | 20px |

---

## 8. UX Prioritization

### 8.1 Ranking de Criticidade das Telas

| Prioridade | Tela | Justificativa | Esforco UX |
|-----------|------|---------------|------------|
| **P0** | Carregamento Seletivo | DOR PRINCIPAL (D1/D3). Resolve soma manual entre 3 apps. | Maximo |
| **P0** | Lista de Pedidos | Base para selecao de carregamento. Checkboxes, filtros, acoes em lote. | Alto |
| **P1** | Novo/Editar Pedido | Operacao mais frequente do dia. Preco por cliente, busca rapida. | Alto |
| **P1** | Dashboard | Primeira tela que o Tiago ve. Precisa transmitir confianca. | Medio |
| **P1** | Tela Entregador | Red flag RF1 (Joao). Se for complexa, fracassa. | Medio (simplicidade e complexa de fazer) |
| **P2** | Estatisticas | Familiaridade com Kite. Layout quase identico, adiciona periodo. | Medio |
| **P2** | Acerto Semanal | Resolve D9 (acerto manual). Calculo correto e crucial. | Medio |
| **P2** | Clientes | Cadastro + historico + fiado. Importante mas menos frequente. | Medio |
| **P3** | Produtos | Cadastro basico. Variacoes e edicao em lote. | Baixo |
| **P3** | Gastos | Registro simples. Rateio e o diferencial. | Baixo |
| **P3** | Login / Conta | Fluxo padrao. Account switcher e o diferencial. | Baixo |
| **P3** | Configuracoes | Uso raro. Setup e esquece. | Baixo |

### 8.2 Metricas de Sucesso UX

| Metrica | Target | Como medir |
|---------|--------|-----------|
| Tempo para gerar lista de carregamento | < 30s (vs ~15min manual) | Timer do momento que abre a tela ate clicar "Marcar Carregado" |
| Erros de carregamento (produto faltante) | Zero | Comparar lista consolidada vs conferencia na fabrica |
| Satisfacao do Joao | "Consigo usar sem pedir ajuda" | Teste com usuario real |
| Tempo para lancar pedido | < 2min | Timer |
| Tempo para fazer acerto semanal | < 5min (vs ~30min manual) | Timer |
| Adocao | Tiago para de usar o Kite em 2 semanas | Entrevista |

### 8.3 Riscos UX

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|--------------|---------|-----------|
| Tiago achar "diferente demais" do Kite | Media | Alto | Manter layout de estatisticas identico, cores verdes, fluxo similar |
| Joao nao conseguir usar | Alta | Medio | Teste presencial antes de deploy. Tela dedicada ultra-simples |
| Bluetooth falhar no PWA | Media | Alto | Fallback: mostrar cupom em tela para screenshot/compartilhamento |
| Performance ruim com 200 produtos | Baixa | Medio | Virtual list, busca com debounce, lazy loading |
| Selecao de pedidos confusa em multi-conta | Media | Alto | Badge de conta colorido em cada pedido, filtro rapido por conta |

---

## Appendix A: Kite Visual Reference

Baseado nos screenshots analisados do Kite:

**Tela Estatisticas do Kite:**
- Fundo branco limpo
- Cards verticais full-width com: label cinza no topo, valor verde grande (tipo R$ 1.504,00), sublabel cinza (Melhor dia: 01 Jun), seta ">" a direita
- Navegacao de data com setas < > ("Ontem: 01 Junho")
- Menu hamburger (tres linhas) no canto superior esquerdo
- Botao compartilhar no canto superior direito
- Cores: verde (#16A34A aproximado) para valores, cinza para labels, branco para fundo

**Tela Ranking de Produtos do Kite:**
- Header: "Ranking de Produtos" com back arrow e compartilhar
- Navegacao de data identica
- Tabela simples: #, NOME, VALOR, QTD
- Linhas com separador fino
- Sem cores nos valores (texto escuro)
- Fonte regular, sem bold excessivo

**Decisao UX:** Manter a estrutura visual do Kite para Estatisticas (P1 - Familiaridade). Adicionar filtros de periodo e conta como INCREMENTO, nao como substituicao.

---

## Appendix B: Account Color System

Para diferenciar visualmente a conta ativa:

```
+------------------------------------------+
|  [*] Distrial RP          <- Header azul |
|      borda-top: 3px solid #3B82F6       |
+------------------------------------------+

+------------------------------------------+
|  [*] Tiago                <- Header roxo |
|      borda-top: 3px solid #8B5CF6       |
+------------------------------------------+

+------------------------------------------+
|  [*] Votoporanga        <- Header laranja |
|      borda-top: 3px solid #F97316       |
+------------------------------------------+

+------------------------------------------+
|  [=] Todas as Contas      <- Header verde |
|      borda-top: 3px solid #16A34A       |
+------------------------------------------+
```

Uma borda fina colorida no topo do header e suficiente para indicar a conta ativa sem poluir a interface. O badge de conta nos pedidos usa a mesma cor.

---

*Uma (UX Design Expert) | Synkra AIOX | 2026-06-08*
