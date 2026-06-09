# DISTRIALL - Intake Report

> **Cliente:** Tiago (Distriall)
> **Data:** 2026-06-08
> **Fonte:** 30 audios WhatsApp transcritos via Whisper + 2 screenshots do app Kite
> **Intake Agent:** Iris (intake-chief)
> **Status:** COMPLETO - Pronto para PRD

---

## 1. SOBRE O NEGOCIO

### 1.1 O Que E a Distriall

Empresa de **distribuicao de alimentos/condimentos** sediada em Rio Preto-SP. Opera como intermediaria entre a fabrica **Boa Mesa** e clientes finais (restaurantes, frigorificos, acougues, etc.).

**Modelo:** Dropship fisico - nao trabalha com estoque. Pega pedidos na fabrica (Boa Mesa) e entrega diretamente aos clientes.

### 1.2 Estrutura de Operacao

A Distriall opera com **3 "contas" / unidades de negocio independentes**, cada uma com precos, clientes e acertos financeiros separados:

| Conta | Regiao | Vendedores | Admin/Acerto | Entregador |
|-------|--------|------------|--------------|------------|
| **Distrial Rio Preto** | Rio Preto | Tiago + Diego | Tiago | Joao |
| **Tiago** (pessoal) | Rio Preto | Tiago (exclusivo) | Tiago (exclusivo) | Joao |
| **Distrial Votoporanga** | Votoporanga, Aracatuba, Fernandopolis, Buritama, Andradina | Tiago + Diego | Tiago | Diego |

### 1.3 Pessoas e Papeis

| Pessoa | Papel | Acesso |
|--------|-------|--------|
| **Tiago** | Dono, vendedor, administrador de todas as contas | Total em tudo |
| **Diego** | Socio, vendedor, entregador (Votoporanga) | Vendas + visualizacao em Distrial RP. Sem acesso a conta Tiago |
| **Joao** | Entregador (Rio Preto) | Apenas entregas. Nivel tecnico basico |
| **Leonardo** | Funcionario da fabrica | Ajuda com boletos |
| **Tia do Tiago** | Funcionaria da fabrica | Ajuda com boletos |

### 1.4 Volume de Operacao

| Metrica | Distrial RP | Tiago | Distrial Votoporanga | Total |
|---------|-------------|-------|----------------------|-------|
| Pedidos/semana | 30-40 | 18-22 | 25-30 | **60-70** |
| Ticket medio | R$ 500 | R$ 500 | R$ 410-420 | — |
| Faturamento semanal estimado | R$ 15-20k | R$ 9-11k | R$ 10-13k | **R$ 34-44k** |

**Entregas (Joao - Rio Preto):**
- Terca/Quarta/Quinta: 15-20 entregas/dia
- Sexta: ~10 entregas
- Segunda: quase nenhuma entrega

**Rotas Votoporanga (alternadas por semana):**
- Semana A: Votoporanga + Aracatuba
- Semana B: Votoporanga + Fernandopolis
- Semana C: Teoricamente folga

---

## 2. FLUXO OPERACIONAL ATUAL

### 2.1 Ciclo Semanal

```
SEG: Inicio tirada de pedidos (poucos, muitos clientes fechados)
TER-QUI: Tirada de pedidos (pico) + entregas diarias
SEX: Entregas + acerto semanal (manhã)
SAB/DOM: Acerto (quando nao feito na sexta)
```

### 2.2 Fluxo Diario de Pedidos

```
1. TIRAR PEDIDOS (WhatsApp 95%, presencial 5%)
   - Tiago lanca no Kite pessoal + Kite Distrial RP
   - Diego lanca no Kite Distrial RP
   
2. CONFIRMAR PEDIDOS (noite, para entrega do dia seguinte)
   - Confirmacao gera estatisticas: faturamento, lucro, ranking produtos
   - Estatisticas SAO POR DIA, nao por selecao de pedidos (DOR PRINCIPAL)

3. SOMAR CARREGAMENTO
   - Somar estatisticas do Kite Tiago + Kite Distrial RP
   - Tiago lanca soma como "pedido" no Kite Distrial para ter total consolidado
   - PROCESSO MANUAL e propenso a erros

4. CARREGAR VAN (manha)
   - Separar produtos na fabrica conforme lista consolidada
   - Imprimir 2 vias de cada pedido (impressora termica 58mm Bluetooth)

5. ENTREGAR
   - Joao sai com lista de rota (Excel do Diego): sequencia + enderecos + forma pgto
   - Formas de pagamento: Dinheiro, Pix, Boleto (Itau/Boa Mesa), Vale assinado, Cartao (raro)
   - Retorna com: dinheiro + vias assinadas + canhotos de boleto

6. ACERTO
   - 3 acertos separados (um por conta)
   - Conferencia manual: vales assinados vs Pix recebidos no banco
   - Gastos anotados em bloco de notas, somados manualmente
```

### 2.3 Fluxo Financeiro

```
VENDA (ex: Frigorifico Espanha):
  Valor venda ao cliente: R$ 526 (boleto Itau, gerado pela Boa Mesa)
  Custo mercadoria (Boa Mesa): R$ 400
  Lucro Tiago: R$ 126

ACERTO COM BOA MESA:
  - Boleto do cliente cai na conta da Boa Mesa (prazo 15-20 dias)
  - Tiago registra boleto como "forma de pagamento" no acerto
  - Lucro vem em forma de dinheiro de vendas a vista
  - NF emitida pela Boa Mesa (Tiago nao precisa disso no sistema)
  - Distrial emite apenas 1 NF de servico/mes para Boa Mesa (~R$ 15k)

GASTOS (divididos por conta):
  - Gastos Distrial RP: impostos (~R$ 320/semana), modificacoes produto
  - Gastos Votoporanga: especificos da rota
  - Gastos compartilhados: gasolina, manutencao carro (dividem Tiago + Distrial RP)
```

---

## 3. SISTEMA ATUAL (KITE)

### 3.1 O Que o Kite Faz Hoje

- Cadastro de produtos (nome, peso, preco venda, preco custo)
- Cadastro de clientes
- Lancamento de pedidos
- Confirmacao de pedidos
- Estatisticas por dia (faturamento, lucro, ranking produtos, qtd clientes)
- Impressao em impressora termica (2 vias por pedido)

### 3.2 Screenshots do Kite (01 Junho)

**Tela Estatisticas:**
- Faturamento: R$ 1.504,00
- Vendas: 6
- Ticket Medio: R$ 250,67
- Lucro: R$ 318,70
- Taxa de Venda: R$ 0,00
- Meio de Pagamento: 100% Dinheiro

**Tela Ranking de Produtos:**
| # | Produto | Valor | Qtd |
|---|---------|-------|-----|
| 1 | Alho descascado | R$ 330 | 17 |
| 2 | Tempero caseiro 500gr (completo) | R$ 259,50 | 67 |
| 3 | Mezabom 500gr | R$ 144 | 9 |
| 4 | Creme de cebola kg | R$ 144 | 8 |
| 5 | Ervas mistas 250gr | R$ 116 | 8 |

### 3.3 Limitacoes do Kite (Dores do Tiago)

| # | Dor | Severidade | Frequencia |
|---|-----|-----------|------------|
| **D1** | Estatisticas so por dia, nao por selecao de pedidos/clientes | **CRITICA** | Diaria |
| **D2** | Precisa de 3 contas/celulares separados (nao tem multi-conta) | **ALTA** | Diaria |
| **D3** | Soma manual de carregamento entre contas | **ALTA** | Diaria |
| **D4** | Pedido confirmado nao pode ser editado (exclui + relanca) | **MEDIA** | Semanal |
| **D5** | Nao tem controle de gastos integrado (usa bloco de notas) | **MEDIA** | Semanal |
| **D6** | Nao tem status granular de pedido (so "pedido" vs "confirmado") | **MEDIA** | Diaria |
| **D7** | Nao tem preco por cliente (preco e global) | **MEDIA** | Diaria |
| **D8** | Nao exporta dados (clientes nem produtos) | **BAIXA** | Migracao |
| **D9** | Acerto de contas 100% manual | **ALTA** | Semanal |
| **D10** | Controle de vales/fiado manual (foto + consulta banco) | **ALTA** | Semanal |

---

## 4. REQUISITOS EXTRAIDOS

### 4.1 Requisitos Funcionais (RF)

#### Multi-Conta / Multi-Vendedor
- **RF-01:** Sistema com 1 app, multiplas contas (inicialmente 3), escalavel para mais
- **RF-02:** Cada conta com clientes, produtos e precos independentes
- **RF-03:** Isolamento financeiro entre contas (lucro/acerto separado)
- **RF-04:** Permissoes por usuario por conta (Tiago = admin total; Diego = vendedor + visualizacao em RP, sem acesso a "Tiago")
- **RF-05:** Possibilidade de agrupar pedidos de diferentes contas para carregamento unificado

#### Catalogo de Produtos
- **RF-06:** Cadastro de ~200 produtos com nome, peso, variacao de tamanho
- **RF-07:** Preco de custo e preco de venda por produto
- **RF-08:** Preco diferenciado por cliente (override do preco padrao)
- **RF-09:** Ao selecionar cliente no pedido, puxar precos ja cadastrados para ele
- **RF-10:** Atualizacao de precos (~2x/mes, 4-5 produtos por vez)

#### Gestao de Pedidos
- **RF-11:** Lancamento de pedidos com selecao de cliente + produtos + quantidades
- **RF-12:** Status granulares: Lancado > Confirmado > Carregado > Entregue
- **RF-13:** Edicao de pedido confirmado (sem precisar excluir e relancar)
- **RF-14:** Devolucao parcial de pedido com abatimento automatico
- **RF-15:** Impressao de pedido em impressora termica 58mm Bluetooth (2 vias)

#### Estatisticas e Carregamento (DOR PRINCIPAL)
- **RF-16:** Estatisticas por selecao de pedidos (nao apenas por dia)
- **RF-17:** Selecionar N pedidos de qualquer conta e gerar: lista consolidada de produtos para carregar, faturamento, lucro
- **RF-18:** Soma cruzada entre contas para carregamento unico
- **RF-19:** Estatisticas por periodo (dia, semana, mes)
- **RF-20:** Ranking de produtos (por valor e quantidade)

#### Financeiro / Acerto
- **RF-21:** Acerto semanal por conta com calculo automatico
- **RF-22:** Formas de pagamento: Dinheiro, Pix, Boleto, Vale (assinado), Cartao
- **RF-23:** Controle de vales: registro com foto, status (pendente/pago), vinculo ao pedido
- **RF-24:** Controle de fiado com historico por cliente
- **RF-25:** Boleto registrado como forma de pagamento (valor vai para Boa Mesa, lucro para Tiago)
- **RF-26:** Registro de gastos por conta (fixos: impostos R$ 320/sem; variaveis: gasolina, manutencao)
- **RF-27:** Gastos compartilhados com rateio entre contas
- **RF-28:** Resumo financeiro: receitas - custos - gastos = lucro liquido por conta

#### Entregas
- **RF-29:** Lista de rota para entregador (sequencia, endereco, forma pagamento)
- **RF-30:** Check de entrega no app (entregador marca como entregue)
- **RF-31:** Rastreamento do entregador (nice-to-have, ja tem rastreador na Fiorino)

#### Clientes
- **RF-32:** Cadastro de clientes com: nome, endereco, forma de pagamento padrao, preco especifico
- **RF-33:** Clientes vinculados a conta(s) especifica(s)
- **RF-34:** Historico de pedidos por cliente

### 4.2 Requisitos Nao-Funcionais (RNF)

- **RNF-01:** Mobile-first (Android). Tiago e Diego usam celular no dia-a-dia
- **RNF-02:** Acesso web (Diego usa computador frequentemente)
- **RNF-03:** Funcionar offline/areas com internet instavel (rotas Votoporanga geralmente OK, mas precisa ser resiliente)
- **RNF-04:** Interface simples (Joao entregador tem pouca familiaridade tech - "baiano chucrão")
- **RNF-05:** Impressao Bluetooth termica 58mm
- **RNF-06:** Suportar 60-70 pedidos/semana, 200 produtos, ~100+ clientes
- **RNF-07:** 2-3 usuarios simultaneos

### 4.3 Restricoes

- **RES-01:** NF e boleto bancario ficam com a Boa Mesa (nao integrar)
- **RES-02:** Sem controle de estoque (modelo dropship fisico)
- **RES-03:** Kite nao exporta dados — migracao manual de clientes/produtos
- **RES-04:** Orçamento: A DEFINIR (gap)
- **RES-05:** Prazo: A DEFINIR (gap)

---

## 5. ANALISE DE GAPS

### 5.1 Gaps Criticos (precisam de resposta antes do PRD)

| # | Gap | Status | Impacto |
|---|-----|--------|---------|
| G1 | **Orcamento disponivel** | NAO RESPONDIDO | Define escopo e tecnologia |
| G2 | **Prazo desejado** | NAO RESPONDIDO | Define faseamento |
| G3 | **Modelo de cobranca** (mensalidade? unico?) | NAO RESPONDIDO | Define sustentabilidade |

### 5.2 Gaps Menores (podem ser resolvidos durante desenvolvimento)

| # | Gap | Notas |
|---|-----|-------|
| G4 | Quantidade exata de clientes por conta | Estimavel (~100+ total) |
| G5 | Formato exato do cupom termico | Reuniao presencial resolve |
| G6 | Fluxo detalhado de devolucao | Simples: exclui, relanca, abate na fabrica |
| G7 | "Bastante coisinha que precisava mudar" (audio 29) | Tiago indicou que tem mais dores nao cobertas |

---

## 6. RED FLAGS

| # | Flag | Risco | Mitigacao |
|---|------|-------|-----------|
| RF1 | Joao (entregador) com baixa familiaridade tech | Interface dele precisa ser MUITO simples | Tela dedicada de entregador, tipo checklist |
| RF2 | Kite nao exporta dados | Migracao manual de ~200 produtos + clientes | Cadastro assistido ou digitacao |
| RF3 | Tiago esta "acostumado" com o Kite | Resistencia a mudanca se UX for muito diferente | Manter familiaridade com o fluxo do Kite |
| RF4 | Budget e prazo indefinidos | Pode inviabilizar escopo completo | Definir antes de iniciar dev |

---

## 7. CLASSIFICACAO DO PROJETO

| Dimensao | Classificacao |
|----------|--------------|
| **Tipo** | App mobile (Android) + Web |
| **Categoria** | Sistema de gestao de vendas/distribuicao |
| **Complexidade** | MEDIA-ALTA (multi-tenant, financeiro, impressao termica) |
| **Usuarios** | 3 (Tiago, Diego, Joao) — potencial para mais |
| **Industria** | Distribuicao de alimentos / Food Service |
| **Referencia** | App Kite (concorrente/baseline) |

---

## 8. RECOMENDACAO DE PROXIMO PASSO

1. **Resolver Gaps G1-G3** (orcamento, prazo, modelo cobranca) com Tiago
2. **Reuniao presencial** (quinta-feira conforme sugerido) para:
   - Ver o Kite rodando ao vivo
   - Validar requisitos extraidos
   - Cobrir dores adicionais (audio 29: "tem bastante coisinha")
   - Definir formato do cupom termico
3. **Gerar PRD** com `@pm` a partir deste intake report
4. **Definir MVP** (provavelmente: multi-conta + pedidos + carregamento seletivo + acerto basico)

---

## ARTEFATOS

| Artefato | Path |
|----------|------|
| Transcricao completa (30 audios) | `C:\Users\vitor\Downloads\DISTRIALL AUDIOS\TRANSCRICAO_COMPLETA.md` |
| Screenshots Kite | `C:\Users\vitor\Downloads\DISTRIALL AUDIOS\WhatsApp Image 2026-06-03 at 21.37.*.jpeg` |
| Este relatorio | `docs/intake/distriall/intake-report.md` |

---

*Gerado por Iris (intake-chief) | Squad Intake | 2026-06-08*
