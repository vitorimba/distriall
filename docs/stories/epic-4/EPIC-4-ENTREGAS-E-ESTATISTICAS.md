# Epic 4 — Entregas e Estatisticas

## Status
In Progress

## Progress
2/4 stories Done (50%)

## Stories

| Story | Title | Status |
|-------|-------|--------|
| 4.1 | Tela do Entregador (Joao) | Done |
| 4.2 | Lista de Rota (Admin) | Done |
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

### Story 4.2 — Lista de Rota / Montar Rota (2026-06-11)

**Built:**
- `apps/web/src/app/(authenticated)/deliveries/page.tsx` — tela "Montar Rota": seletor de data/entregador, lista de pedidos disponiveis, area de rota com drag-and-drop
- `apps/web/src/components/deliveries/route-builder.tsx` — orquestra drag-and-drop via @dnd-kit/sortable; draft-state local antes do envio
- `apps/web/src/components/deliveries/route-item.tsx` — card de item: sequencia, nome cliente, endereco, badge pagamento, botao remover, indicador status
- `apps/web/src/components/deliveries/available-orders.tsx` — lista de pedidos com status "carregado" disponíveis para adicionar à rota
- `apps/web/src/components/deliveries/route-map-link.tsx` — link Google Maps com waypoints ordenados por sequencia
- `apps/web/src/hooks/use-deliveries.ts` — hook CRUD: createDelivery, updateDelivery, addItemToDelivery, removeItemFromDelivery, reorderDeliveryItems; subscription Realtime
- `apps/web/src/lib/delivery-utils.ts` — re-export de buildGoogleMapsUrl e reassignSequences
- `supabase/migrations/00021_mark_delivery_item_delivered.sql` — RPC atomica `mark_delivery_item_delivered(item_id, observation)` com SECURITY DEFINER; resolve tech debt I01 da Story 4.1
- `supabase/migrations/00022_protect_delivered_items.sql` — RLS policy: bloqueia DELETE de delivery_items com status != 'pendente'; proteção backend de regra de negocio
- `packages/shared/src/types/models.ts` — interfaces Delivery, DeliveryItem adicionadas
- `packages/shared/src/types/enums.ts` — DeliveryStatus, DeliveryItemStatus + PAYMENT_METHOD_LABELS/COLORS como exportacoes canonicas (dedupado do componente)
- `packages/shared/src/utils/delivery.ts` — buildGoogleMapsUrl, reassignSequences adicionados; REUSE de isDeliveryTerminal/getDeliveryStatusLabel existentes
- `packages/shared/src/utils/__tests__/google-maps-url.test.ts` — 5 testes unitarios (1 endereco, multiplos, caracteres especiais, URL vazia)
- `packages/shared/src/utils/__tests__/route-sequence.test.ts` — 6 testes unitarios (reordenacao, normalizacao de sequencia, gaps)
- `apps/web/src/hooks/use-driver-deliveries.ts` — refatorado: markDelivered usa RPC mark_delivery_item_delivered em vez de 2 UPDATEs sequenciais

**Patterns established:**
- Draft-state pattern: estado local da rota antes do envio (pendingItems, pendingSequence) vs. DB-state apos createDelivery — evita roundtrips desnecessarios
- PAYMENT_METHOD_LABELS/COLORS em `packages/shared/src/types/enums.ts` — fonte canonica; componentes importam de `@distriall/shared` (nao duplicar localmente)
- RPC SECURITY DEFINER pattern: `SET search_path = ''`, `auth.uid()` check explicito, `GRANT EXECUTE to authenticated` — padrao estabelecido em 00021 e 00022
- Protecao de regra de negocio em RLS (nao apenas frontend): bloquear operacoes proibidas diretamente na policy

**Key decisions:**
- @dnd-kit/core + @dnd-kit/sortable escolhido sobre react-beautiful-dnd (leve, acessivel, suporte touch nativo) — campo numerico de sequencia (Task 3.6) nao implementado; DnD touch considerado suficiente para MVP
- createDelivery nao-atomico (2 inserts): deliberadamente deferido para story futura (M02) — risco aceitavel para MVP
- Tech debt I01 (markDelivered) resolvido via RPC 00021 — padrao a seguir para operacoes compostas futuras

**Tech debt identified:**
- M02 (MEDIUM): createDelivery faz 2 inserts sequenciais sem transacao — criar RPC createDeliveryWithItems em story futura
- M03 (MEDIUM): reorderDeliveryItems faz N roundtrips individuais — otimizar via upsert batch ou RPC em story futura
- L01 (LOW): buildGoogleMapsUrl sem limite de waypoints — Google Maps aceita max 10; adicionar aviso ao usuario
- AC2-gap (MEDIUM): campo numerico de sequencia (Task 3.6) nao implementado — avaliar necessidade real apos feedback de uso

**Tests:** 11 novos (11 unit + 0 integration) + 26 regressao = 37 total. **Deploy:** vercel (migrations 00021+00022 pendentes aplicacao cloud via @devops). **CodeRabbit:** 0 iter (CLI nao disponivel no ambiente Windows)
