# Epic 4 — Entregas e Estatisticas

## Status
In Progress

## Progress
1/4 stories Done (25%)

## Stories

| Story | Title | Status |
|-------|-------|--------|
| 4.1 | Tela do Entregador (Joao) | Done |
| 4.2 | Lista de Rota (Admin) | Draft |
| 4.3 | Dashboard de Estatisticas | Draft |
| 4.4 | Historico de Clientes | Draft |

## Business Value

- **G8 (PRD):** Interface simples o suficiente para o entregador (Joao) usar sem dificuldade
- **G6 (PRD):** Status granulares de pedido com transicao Carregado → Entregue
- **G14/G16 (PRD):** Dashboard com resumo e estatisticas por periodo

## Wave Plan

**Wave 1 (Foundation):**
- Story 4.1: Tela do entregador — interface de entrega para Joao
- Story 4.2: Lista de rota — admin monta rota do dia

**Wave 2 (Analytics):**
- Story 4.3: Dashboard de estatisticas
- Story 4.4: Historico de clientes

---

## Development Log

### Story 4.1 — Tela do Entregador (2026-06-11)

**Built:**
- `supabase/migrations/00020_deliveries.sql` — tabelas `deliveries` (rota do dia) e `delivery_items` (pedidos na rota) com RLS policies para entregadores
- `apps/web/src/hooks/use-driver-deliveries.ts` — hook principal: busca delivery_items do dia com joins em orders/clients/order_items, subscription Realtime filtrada por delivery_id, markDelivered function
- `apps/web/src/components/driver/delivery-card.tsx` — card de entrega: nome cliente 24px bold, endereco 18px, badge forma pagamento, lista produtos sem preco, botao ENTREGUE h-16
- `apps/web/src/components/driver/delivery-confirm-sheet.tsx` — sheet de confirmacao com textarea observacao opcional
- `apps/web/src/components/driver/delivery-list.tsx` — lista separada pendentes (topo) / entregues (baixo, fundo cinza)
- `packages/shared/src/utils/delivery.ts` — utilitarios puros: buildDeliveryStatusUpdate, isDeliveryTerminal, getDeliveryStatusLabel

**Patterns established:**
- Rota `/driver` separada do route group `(authenticated)` com dupla protecao: proxy.ts server-side + layout.tsx client-side via useAuth()
- Subscription Realtime deve ser filtrada por ID especifico (delivery_id=eq.${id}) — nunca escutar tabela inteira
- Utilitarios puros de dominio em `packages/shared/src/utils/{domain}.ts` com testes em `__tests__/{domain}.test.ts`
- UI para entregador: body 18px, titulos 24px, nome cliente 28px, botoes h-16, zero valores financeiros

**Key decisions:**
- Migration das tabelas deliveries/delivery_items incluida nesta story (Task 0) — nao aguardou Story 4.2
- proxy.ts modificado (nao middleware.ts) para protecao bidirecional: entregadores → /driver, nao-entregadores bloqueados de /driver
- Subscription em delivery_items E deliveries — cobre tanto mudancas de status quanto adicao/remocao de itens da rota pelo admin
- Testes em packages/shared (Vitest configurado la) — apps/web nao tem setup de teste

**Tech debt identified:**
- I01 (MEDIUM): markDelivered executa dois UPDATEs sequenciais sem transacao atomica — criar RPC function em Story 4.2
- I02 (MEDIUM): proxy.ts faz multiplas queries de role por request — otimizar em Story 4.2
- I03 (MEDIUM): Sem testes de componente para DeliveryCard, DeliveryConfirmSheet, DeliveryList
- I04 (MEDIUM): today sem reatividade apos meia-noite — known limitation documentada
- I05 (LOW): driverOnlyPaths hardcoded em proxy.ts — derivar de PROTECTED_PATHS

**Tests:** 10 novos (delivery utils) + 16 regressao = 26 total. **Deploy:** vercel (migration pendente cloud). **CodeRabbit:** 0 iter (CLI nao disponivel)
