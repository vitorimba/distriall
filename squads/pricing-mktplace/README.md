# Squad Pricing Marketplace 💰

Squad especializado em **regras de precificação de todos os marketplaces brasileiros**. Cada agente domina 100% da estrutura de custos do seu marketplace: comissões, taxas fixas, frete, fulfillment, ads e programas especiais.

**Dados base:** 07/04/2026 | **Auto-atualização:** `*atualizar-regras`

---

## Quick Start

```
@pricing:pricing-chief          # Comparar custos entre marketplaces
@pricing:pricing-chief *simular-margem 150 eletronicos
@pricing:shopee-pricing *faixa 50
@pricing:pricing-updater *atualizar-regras
```

---

## Agentes (15)

### Tier 0 — Orquestração
| Agente | Ativação | Função |
|--------|----------|--------|
| **Pricing Strategist** | `@pricing:pricing-chief` | Comparação cross-marketplace, simulação de margem |
| **Pricing Updater** | `@pricing:pricing-updater` | Auto-atualização de regras via web research |

### Tier 1 — Big 4
| Agente | Ativação | Marketplace | Comissão |
|--------|----------|-------------|----------|
| **ML Pricing** | `@pricing:ml-pricing` | Mercado Livre | 11-19% + custo op. variável |
| **Shopee Pricing** | `@pricing:shopee-pricing` | Shopee | 14-50% faixas escalonadas |
| **Amazon Pricing** | `@pricing:amazon-pricing` | Amazon BR | 8-17% + FBA |
| **Magalu Pricing** | `@pricing:magalu-pricing` | Magazine Luiza | 12-20% + R$3 fixo |

### Tier 2 — Players Relevantes
| Agente | Ativação | Marketplace | Comissão |
|--------|----------|-------------|----------|
| **Casas Bahia** | `@pricing:casasbahia-pricing` | GCB | 17-21% (3 bandeiras) |
| **Americanas** | `@pricing:americanas-pricing` | Americanas | 16-19% (+1% semanal) |
| **SHEIN** | `@pricing:shein-pricing` | SHEIN BR | 20% + R$5 fixo |
| **Netshoes** | `@pricing:netshoes-pricing` | Netshoes/Zattini | 15-30% (negociada) |
| **TikTok Shop** | `@pricing:tiktokshop-pricing` | TikTok Shop | 6% + 6% frete + afiliados |
| **Meta Commerce** | `@pricing:meta-pricing` | FB + IG | 0% (custo em ads) |

### Tier 3 — Verticais & Hubs
| Agente | Ativação | Marketplace | Comissão |
|--------|----------|-------------|----------|
| **Mirakl** | `@pricing:mirakl-pricing` | Carrefour + Leroy | 16% / 18% + R$49/mês |
| **Verticais** | `@pricing:verticais-pricing` | Dafiti + KaBuM! + MM | 25-30% / 18% / 14-21% |
| **Olist** | `@pricing:olist-pricing` | Olist Hub | 19-21% all-inclusive |

---

## Comandos Principais

### Pricing Chief (Comparação)
| Comando | Descrição |
|---------|-----------|
| `*simular-margem {preço} {categoria}` | Simular margem em TODOS os marketplaces |
| `*comparar {mkt1} {mkt2} {preço} {cat}` | Comparar 2 marketplaces |
| `*ranking-custo {categoria}` | Ranking menor a maior custo |
| `*custo-total {mkt} {preço} {cat}` | Custo total detalhado |
| `*melhor-para {tipo} {faixa}` | Recomendar melhor marketplace |
| `*resumo-taxas` | Tabela resumida de todas as taxas |

### Pricing Updater (Atualização)
| Comando | Descrição |
|---------|-----------|
| `*atualizar-regras` | Full scan de todos os marketplaces |
| `*atualizar {marketplace}` | Atualizar marketplace específico |
| `*verificar-mudancas` | Checar mudanças sem atualizar |
| `*diff-report` | Última atualização e mudanças |

---

## Tabela Comparativa Rápida (Abril 2026)

| Marketplace | Comissão | Taxa Fixa | Mensalidade | Frete Grátis |
|------------|----------|-----------|-------------|--------------|
| Mercado Livre | 11-19% | Variável (<R$79) | Não | Subsidiado >R$79 |
| Shopee | 14-50% (faixas) | R$0-26 | Não | Obrigatório |
| Amazon BR | 8-17% | R$2 (Individual) | R$19 (Pro) | Prime (FBA) |
| Magalu | 12-20% | R$3 (>R$10) | Não | Campanhas |
| Casas Bahia | 17-21% | Não | Não | Parcial |
| Americanas | 16-19% | Não | Não | Subsidiado |
| SHEIN | 20% | R$5/produto | Não | Via SFS |
| Netshoes | 15-30% | R$2,49 | Não | Variável |
| TikTok Shop | 6% + 6% frete | R$2 (>R$79 isento) | Não | Subsidiado |
| Meta Commerce | 0% | Não | Não | N/A |
| Carrefour | 16% | R$4 (<R$500) | Não | Vendedor |
| Leroy Merlin | 18% | Não | R$49/mês | Vendedor |
| MadeiraMadeira | 14-21% | Não | Não | BulkyLog |
| Dafiti | 25-30% | Não | R$299/mês | Dafiti Envios |
| KaBuM! | 18% | Não | Não | Vendedor |
| Olist | 19-21% | R$5/item | R$29,90-249,90 | Via canais |

---

## Dados e Atualização

- **Arquivo de dados:** `data/pricing-rules.yaml`
- **Última atualização:** 2026-04-07
- **Para atualizar:** `@pricing:pricing-updater *atualizar-regras`
- **Fontes:** Sites oficiais de cada marketplace + blogs especializados

### Fontes Oficiais
- ML: mercadolivre.com.br/ajuda/tarifas-de-venda
- Shopee: seller.shopee.com.br/edu/article/26839
- Amazon: venda.amazon.com.br/precos
- Magalu: universo.magalu.com
- Casas Bahia: casasbahia.com.br/marketplace
- Americanas: info.americanasmarketplace.com.br/taxas-de-comissao
- SHEIN: br.shein.com/SHEIN-Commission-Policy
- TikTok Shop: seller.tiktok.com
- E mais 8 fontes (ver pricing-updater para lista completa)

---

## Integração com Outros Squads

| Squad | Integração |
|-------|-----------|
| `squad-marketplaces` | APIs de cada marketplace (integração técnica) |
| `squad-shopee` | Estratégias específicas de Shopee (listing, ads, algoritmo) |

---

*Squad Pricing Marketplace v1.0.0 — Synkra AIOX*
*Dados: 07/04/2026 — Clone minds > create bots.*
