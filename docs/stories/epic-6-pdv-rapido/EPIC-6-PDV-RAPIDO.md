# Epic 6: PDV Rapido — Catalogo Visual de Produtos

## Objetivo

Transformar a experiencia de criacao de pedidos de um modelo "busca e seleciona" para um modelo de **catalogo visual com toque rapido** (estilo PDV/caixa), otimizado para vendedores que precisam lancar pedidos com agilidade no dia a dia.

## Problema

Hoje o vendedor precisa digitar o nome do produto na busca para cada item que quer adicionar ao pedido. Isso e lento quando:
- O vendedor ja conhece todos os produtos de cor
- Precisa adicionar muitos itens rapidamente
- Esta em campo com pressa (entrega, rota)

## Solucao

- Exibir todos os produtos ativos em um grid de cards logo ao abrir a tela de novo pedido (apos selecionar cliente)
- Cada clique/toque no card = +1 na quantidade
- Cards maiores e touch-friendly para uso mobile
- Manter campo de busca como opcao complementar (filtrar o grid)
- Permitir edicao inline de quantidade e preco de venda diretamente no carrinho

## Stories

| # | Story | Pontos | Status |
|---|-------|--------|--------|
| 6.1 | Catalogo visual de produtos com toque rapido | 8 | Done |
| 6.2 | Edicao inline de preco e quantidade no carrinho | 5 | Done |
| 6.3 | Historico de ultimos pedidos do cliente na tela de pedido | 5 | Draft |

## Design System Compliance (NON-NEGOTIABLE)

Todas as stories deste epic DEVEM seguir o design system do Distriall rigorosamente:

- **Componentes UI:** Reutilizar EXCLUSIVAMENTE componentes de `components/ui/` (Card, Button, Badge, Money, SearchField, StatusBadge, Dialog, Accordion, Skeleton, EmptyState, Alert, Toast, etc.)
- **Tokens CSS:** NUNCA hardcodar cores, espacamentos, bordas ou sombras. Usar APENAS variaveis CSS do DS (`var(--surface-card)`, `var(--text-primary)`, `var(--accent)`, `var(--touch-target)`, etc.)
- **Dark/Light theme:** Usar tokens garante compatibilidade automatica. ZERO hex hardcoded.
- **Touch targets:** Minimo 44px (`var(--touch-target)`) em todos os elementos interativos — INVIOLAVEL.
- **Tipografia:** Archivo para UI, `.num` class para valores monetarios (tabular-nums).
- **3 estados:** Todo componente de dados deve ter Loading (Skeleton), Vazio (EmptyState), Erro (Alert).
- **Motion:** Apenas `transform` e `opacity`. Respeitar `prefers-reduced-motion`.
- **Referencia:** `DESIGN.md` (raiz) + `packages/design-system/tokens/` + `apps/web/src/app/globals.css`

Cada story tem secao "Design System Compliance" com componentes e tokens especificos a usar.

## Metricas de Sucesso

- Tempo medio para lancar pedido com 5+ itens reduzido em 50%+
- Vendedor consegue lancar pedido inteiro sem digitar nome de produto
- Zero regressao nas funcionalidades existentes (busca, precos customizados, pagamento)
- Zero desvio do design system (nenhum hex hardcoded, nenhum componente custom fora do DS)
