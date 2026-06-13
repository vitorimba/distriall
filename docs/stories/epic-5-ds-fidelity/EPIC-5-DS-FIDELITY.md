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
| 5.4 | Formularios e Mascaras | 4 | 13 | MEDIUM |
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
