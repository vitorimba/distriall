# UI Kit — DistriAll App

Recriação hi-fi do app de gestão DistriAll (back office do distribuidor), montada a partir da especificação de telas do briefing + direção visual das referências (dark, accent laranja). **Não havia produto existente para copiar** — este kit É a primeira materialização visual do produto.

## Telas incluídas (`index.html` é click-through)

| Tela | Arquivo | Spec |
|---|---|---|
| Login | `LoginScreen.jsx` | 2.1 |
| Dashboard (KPIs, gráficos, top produtos) | `DashboardScreen.jsx` | 2.2 |
| Lista de pedidos (busca + chips de status) | `OrdersScreen.jsx` | 2.10 |
| Detalhe do pedido (stepper de status) | `OrderDetailScreen.jsx` | 2.12 |
| Novo pedido (carrinho + sticky bar) | `OrderNewScreen.jsx` | 2.11 |
| Detalhe do cliente (saldo, preços especiais) | `ClientDetailScreen.jsx` | 2.5 |
| Lista de clientes | `ClientsScreen.jsx` | 2.3 |
| Novo/editar cliente (tabs Dados / Preços especiais) | `ClientFormScreen.jsx` | 2.4, 2.6 |
| Lista de produtos | `ProductsScreen.jsx` | 2.7 |
| Novo/editar produto (variantes) | `ProductFormScreen.jsx` | 2.8–2.9 |
| Carregamento (seleção em lote + sticky bar) | `LoadingScreen.jsx` | 2.14 |
| Entregas / montagem de rota (2 colunas, ordenar) | `DeliveriesScreen.jsx` | 2.15 |
| Interface do motorista (header verde, standalone) | `DriverScreen.jsx` | 2.16 |
| Hub financeiro (3 cards) | `FinancialHubScreen.jsx` | 2.17 |
| Despesas (lista + form inline) | `ExpensesScreen.jsx` | 2.18–2.19 |
| Acertos (lista + detalhe com cálculo) | `SettlementsScreen.jsx` | 2.20–2.21 |
| Vales (status + marcar como pago) | `VouchersScreen.jsx` | 2.22 |
| Estatísticas (ranking completo + % do total) | `StatsScreen.jsx` | 2.23 |
| Configurações (impressora, accordion) | `SettingsScreen.jsx` | 2.24 |
| Shell (sidebar + toggle claro/escuro) | `AppShell.jsx` | Parte 3 |
| Shell mobile (app bar + bottom nav + FAB) | `MobileShell.jsx` | Parte 3 |
| Menu "Mais" (mobile) | `MobileMoreScreen.jsx` | Parte 3 |

Todas as telas da spec estão recriadas. **Click-throughs:** `index.html` (desktop, sidebar) e `mobile.html` (390px, bottom nav + FAB — mesmas telas, grids empilham via `tokens/layout.css`).

## Temas

O kit roda em dark (padrão) e light (`data-theme="light"` no `<html>`). O toggle fica no rodapé da sidebar e persiste em `localStorage` (`distriall-kit-theme`).

## Convenções usadas

- Telas compõem os primitivos de `components/` — nunca reimplementam Button/Input/etc.
- Dados são mock estáticos dentro de cada tela.
- Gráficos: componentes de `components/charts/` (LineChart, DonutChart etc.) — produção usaria Recharts com a mesma aparência.
- Navegação: estado React simples em `index.html`, persistida em localStorage.
