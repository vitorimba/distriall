# DistriAll — PRODUCT.md

Documentação de produto. O que o sistema faz, para quem, com que modelo de dados e regras de negócio. Para o design (cores, componentes, padrões visuais), ver `DESIGN.md`.

## Visão geral

DistriAll é uma plataforma B2B de gestão de distribuição. Um distribuidor (bebidas, mercearia, congelados…) gerencia o ciclo completo: cadastro de clientes e produtos → lançamento de pedidos → carregamento do caminhão → montagem de rota e entrega → financeiro (acertos, despesas, vales) → analytics.

- **Multi-conta:** um usuário pode operar mais de uma conta/filial (ex.: "Conta Principal", "Filial Sul"). Seletor de conta no rodapé da sidebar e nos filtros de dashboard/estatísticas.
- **Mobile-first:** a maioria dos usuários está em campo. Desktop usa sidebar fixa (240px); mobile usa bottom nav (5 itens) + FAB.
- **Papel de motorista separado:** interface dedicada, simplificada, sem sidebar/bottom nav (header verde) — o motorista só vê suas entregas do dia.

## Personas

| Persona | Uso |
|---|---|
| **Dono/gestor do distribuidor** | Dashboard, estatísticas, financeiro, cadastros. Decide preço, confere acertos. |
| **Operador/vendedor** | Lança pedidos (muitas vezes no celular, na frente do cliente), consulta saldo e preços especiais do cliente. |
| **Equipe de carregamento** | Tela de carregamento: confere pedidos confirmados e marca em lote como carregados. |
| **Motorista** | Interface própria (`/driver`): lista de entregas da rota, marca como entregue. Recebe rotas em tempo real. |

## Modelo de domínio

### Pedido
- Número sequencial (`#1042`), cliente, itens (produto/variante, qtd, preço unitário), forma de pagamento, data de entrega, observações.
- **Status (máquina de estados):** `lançado → confirmado → carregado → entregue`, com `cancelado` possível antes de entregue. Cada transição registra timestamp. Status pode retroceder um passo (correção).
- Pagamento: dinheiro, pix, boleto, vale, cartão, **misto** (divide o valor entre métodos).
- Pedido entregue ou cancelado **não pode ser editado**; entregue aceita **devoluções** por item.
- Cada pedido carrega custo e lucro estimado (venda − custo), exibidos na sticky bar ao criar/editar.

### Cliente
- Nome, nome fantasia, endereço (cidade, bairro), telefone, WhatsApp, forma de pagamento padrão, observações.
- **Saldo de conta** (positivo = crédito, negativo = deve), **frequência de compra**, **preços especiais** por produto (sobrepõem o preço padrão ao lançar pedido).

### Produto
- Nome, descrição, categoria, unidade (Unidade/Caixa/Fardo/Saco).
- **Variantes:** cada produto tem ≥1 variante com nome, peso, preço de custo, preço de venda e SKU. O pedido referencia a variante.

### Financeiro
- **Despesa:** descrição, categoria (Transporte, Manutenção, Alimentação, Administrativo), valor, data.
- **Acerto:** fechamento por período. `Faturamento − Custos − Despesas = Lucro líquido`. Status: `rascunho → conferido → fechado`. Pode ser recalculado enquanto não fechado.
- **Vale:** crédito concedido a cliente. Valor, vencimento, foto anexada (comprovante). Status: `pendente` (amarelo), `pago` (verde), `vencido` (vermelho, com destaque visual de alerta).

### Entrega / Rota
- Montada por data + motorista: pedidos carregados entram na rota em sequência ordenável (drag-and-drop / setas).
- Estados da rota: `rascunho` (editável) → `enviada` (motorista recebeu; trava edição).
- Motorista marca cada entrega como entregue → status do pedido vira `entregue`.

## Mapa de telas (spec de 27 páginas)

| Rota | Tela | Spec | No UI kit |
|---|---|---|---|
| `/login` | Login (card central, sem nav) | 2.1 | ✅ `LoginScreen` |
| `/dashboard` | KPIs (5 cards), gráficos, top 10 produtos | 2.2 | ✅ `DashboardScreen` |
| `/clients` | Lista de clientes (busca + FAB) | 2.3 | ✅ `ClientsScreen` |
| `/clients/new` | Novo cliente (formulário) | 2.4 | ✅ `ClientFormScreen` |
| `/clients/[id]` | Detalhe: saldo, frequência, preços especiais, histórico | 2.5 | ✅ `ClientDetailScreen` |
| `/clients/[id]/edit` | Editar (tabs Dados / Preços especiais) | 2.6 | ✅ `ClientFormScreen` |
| `/products` | Lista de produtos | 2.7 | ✅ `ProductsScreen` |
| `/products/new` · `/products/[id]` | Form com variantes | 2.8–2.9 | ✅ `ProductFormScreen` |
| `/orders` | Lista com chips de status | 2.10 | ✅ `OrdersScreen` |
| `/orders/new` | Carrinho + pagamento + sticky bar | 2.11 | ✅ `OrderNewScreen` |
| `/orders/[id]` | Detalhe com stepper de status, imprimir, devoluções | 2.12 | ✅ `OrderDetailScreen` |
| `/orders/[id]/edit` | Edição (bloqueada se entregue/cancelado) | 2.13 | ✅ (reusa `OrderNewScreen`) |
| `/loading` | Carregamento: seleção em lote → "Marcar como carregado" | 2.14 | ✅ `LoadingScreen` |
| `/deliveries` | Montagem de rota (2 colunas, ordenável, enviar) | 2.15 | ✅ `DeliveriesScreen` |
| `/driver` | Interface do motorista (header verde, tempo real) | 2.16 | ✅ `DriverScreen` |
| `/financial` | Hub: Acertos / Despesas / Vales | 2.17 | ✅ `FinancialHubScreen` |
| `/financial/expenses` (+`/new`) | Despesas | 2.18–2.19 | ✅ `ExpensesScreen` |
| `/financial/settlements` (+`/[id]`) | Acertos: lista + detalhe com cálculo | 2.20–2.21 | ✅ `SettlementsScreen` |
| `/financial/vouchers` | Vales | 2.22 | ✅ `VouchersScreen` |
| `/stats` | Ranking completo de produtos (% do total) | 2.23 | ✅ `StatsScreen` |
| `/settings` | Impressora Bluetooth, compatibilidade, troubleshooting | 2.24 | ✅ `SettingsScreen` |

## Padrões de produto (recorrentes em todo o sistema)

- **Mobile:** `ui_kits/distriall/mobile.html` é o click-through de 390px — bottom nav (Dashboard, Pedidos, Clientes, Financeiro, Mais) + FAB; mesmas telas, grids empilham em <768px.
- **Lista → Detalhe → Edição** (master-detail) em todas as entidades.
- **Busca + chips de filtro + lista** em clientes, produtos, pedidos, carregamento, vales, acertos.
- **Formulários em cards** agrupando campos relacionados; Salvar (primary) + Cancelar (outline).
- **Sticky bar inferior** com totais + ação principal em formulários de pedido e seleção em lote.
- **Status sempre como badge colorido** (par soft-bg + texto na cor).
- **Estados obrigatórios em toda tela:** loading (skeleton), empty (ícone + título + ação), error (mensagem + "Tentar novamente").
- **Impressão de recibo** via Bluetooth (Web Bluetooth, Chrome/Edge Android) com fallback em tela.

## Fora de escopo (por enquanto)

Estoque, NF-e/fiscal, pagamentos online, multi-idioma (o produto é pt-BR), apps nativos (é web/PWA).
