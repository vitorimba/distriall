# EPIC-8: Rotina do Tiago — Automacao de Processos Manuais

## Origem

Levantamento feito com o Tiago (dono da Distriall) em 5 audios de WhatsApp gravados em 10-14/ago/2026, onde ele narra sua rotina semanal completa. Os insights foram extraidos e priorizados por impacto na operacao diaria.

## Objetivo

Eliminar processos manuais que o Tiago executa diariamente (rota em papel, soma de cargas, controle de cheques, conferencia de retorno do entregador) e adicionar funcionalidades que o app ainda nao cobre mas que sao parte essencial da rotina.

## Impacto Estimado

- Economia de ~1-1.5h/dia de trabalho manual
- Reducao de erros de cobranca (vales perdidos, cheques sem rastreio)
- Visibilidade completa do contas a receber por cliente

## Stories

| # | Story | Prioridade | Esforco | Dependencias |
|---|-------|------------|---------|--------------|
| 8.1 | Forma de pagamento Cheque | Critica | M (5) | 3.1 (Done) |
| 8.2 | Conta corrente de vales — painel de saldo devedor | Critica | L (8) | 3.2 (Done) |
| 8.3 | Picking list — unificacao automatica de cargas | Alta | L (8) | 2.1, 2.3 (Done) |
| 8.4 | Acerto do entregador — checklist de retorno | Alta | M (5) | 4.1, 4.2 (Done) |
| 8.5 | Alerta de discrepancia de custo | Alta | S (3) | 1.4 (Done) |
| 8.6 | Regioes de entrega — agrupamento de pedidos | Media | M (5) | 1.5 (Done) |
| 8.7 | Impressao e compartilhamento da rota de entrega | Critica | S (3) | 4.2 (Done) |
| 8.8 | Atalho para geracao de boleto/NF (copiar dados) | Media | S (2) | 3.1 (Done) |

## Waves

### Wave 1 (parallelizable)
- **8.1** Cheque (sem dependencia intra-epic)
- **8.5** Alerta de custo (sem dependencia intra-epic)
- **8.6** Regioes (sem dependencia intra-epic)
- **8.7** Impressao da rota (sem dependencia intra-epic, lapidar Story 4.2)
- **8.8** Atalho boleto/NF (sem dependencia intra-epic)

### Wave 2 (depende de Wave 1 parcialmente)
- **8.2** Conta corrente vales (depende de 8.1 para vincular cheques a vales)
- **8.3** Picking list (depende de 8.6 para agrupar por regiao)

### Wave 3
- **8.4** Acerto do entregador (depende de 8.2 para registrar vales devolvidos)

## Fora de Escopo (neste Epic)

- Integracao DIRETA com API de NF/boleto (Squad NF completo — complexidade alta, baixo ROI agora)
- Diego lancar direto no app (JA FUNCIONA — Story 1.3 multi-conta)

## Gaps descobertos em features "Done"

- **Story 4.2 (Rota):** funciona para montar/enviar, mas NAO imprime/copia — Tiago reescreve em papel todo dia. Corrigido via **8.7**
- **Boleto/NF:** `is_third_party: true` e label "(Boa Mesa)" existem, mas zero link/atalho para o sistema externo. Corrigido via **8.8**

## Fonte de Dados

Transcricoes dos audios salvas em `transcricoes.json` (local, nao commitado).

## Development Log

| Data | Evento |
|------|--------|
| 2026-08-23 | Epic criado a partir de levantamento de campo com o Tiago |
| 2026-08-23 | Adicionadas Stories 8.7 e 8.8 apos auditoria de features "Done" (rota sem impressao, boleto sem atalho) |
