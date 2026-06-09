# Distriall — Product Requirements Document (PRD)

> **Versao:** 1.0
> **Data:** 2026-06-08
> **Autor:** Morgan (PM Agent) | Input: Iris (Intake Chief)
> **Fonte:** 30 audios do cliente Tiago + screenshots do app Kite
> **Status:** Draft — Aguardando validacao do cliente

---

## 1. Goals and Background Context

### 1.1 Goals

- **G1:** Unificar 3 contas/apps separados (Distrial RP, Tiago, Distrial Votoporanga) em um unico sistema multi-conta
- **G2:** Permitir selecao de pedidos por cliente para gerar estatisticas e lista de carregamento (eliminar soma manual)
- **G3:** Automatizar o acerto semanal com controle de vales, Pix, boleto e fiado
- **G4:** Registrar e ratear gastos operacionais por conta, eliminando controle por bloco de notas
- **G5:** Suportar precos diferenciados por cliente
- **G6:** Oferecer status granulares de pedido (Lancado > Confirmado > Carregado > Entregue) com edicao pos-confirmacao
- **G7:** Manter impressao termica Bluetooth 58mm (2 vias por pedido)
- **G8:** Interface simples o suficiente para o entregador (Joao) usar sem dificuldade

### 1.2 Background Context

A Distriall e uma distribuidora de alimentos/condimentos que opera como intermediaria entre a fabrica Boa Mesa (Rio Preto-SP) e clientes finais (restaurantes, frigorificos, acougues). O modelo e um "dropship fisico" — sem estoque proprio, pega na fabrica e entrega direto.

Hoje o Tiago opera com o app **Kite** em 3 celulares separados, cada um com uma conta independente para regioes e tabelas de precos diferentes. O processo diario envolve somas manuais entre contas, acertos financeiros em bloco de notas, e gambiarras com confirmacao/exclusao de pedidos para contornar limitacoes do Kite. O novo sistema precisa absorver o fluxo que ja funciona (catalogo, pedidos, impressao) e resolver as dores criticas: estatisticas por selecao, multi-conta unificada, e acerto automatizado.

### 1.3 Change Log

| Data | Versao | Descricao | Autor |
|------|--------|-----------|-------|
| 2026-06-08 | 1.0 | PRD inicial a partir de intake (30 audios) | Morgan (PM) |

---

## 2. Requirements

### 2.1 Functional Requirements

#### Multi-Conta & Permissoes

- **FR-01:** O sistema deve suportar multiplas contas (unidades de negocio) dentro de uma unica instalacao. Inicialmente 3 contas: "Distrial Rio Preto", "Tiago", "Distrial Votoporanga". Escalavel para mais.
- **FR-02:** Cada conta possui catalogo de produtos, tabela de precos, clientes e financeiro independentes.
- **FR-03:** Usuarios com permissoes por conta. Tiago = admin total em todas. Diego = vendedor com visualizacao financeira em Distrial RP, vendedor em Votoporanga, sem acesso a conta "Tiago".
- **FR-04:** Perfil de entregador com acesso restrito (apenas lista de entregas e check de entrega).

#### Catalogo de Produtos

- **FR-05:** Cadastro de produtos com: nome, peso, variacao de tamanho (ex: 500g, 1kg, 5kg, 25kg), preco de custo, preco de venda padrao.
- **FR-06:** Suporte a ~200 produtos com atualizacao de precos (~2x/mes, 4-5 produtos por vez).
- **FR-07:** Preco diferenciado por cliente — ao selecionar o cliente no pedido, o sistema puxa os precos ja cadastrados para aquele cliente. Se nao houver preco especifico, usa o padrao.

#### Gestao de Pedidos

- **FR-08:** Lancamento de pedido: selecionar cliente, adicionar produtos com quantidade, salvar como rascunho.
- **FR-09:** Status granulares com transicoes: `Lancado` → `Confirmado` → `Carregado` → `Entregue`.
- **FR-10:** Edicao de pedido apos confirmacao (sem precisar excluir e relancar).
- **FR-11:** Devolucao parcial de pedido: remover itens devolvidos e abater valor do acerto.
- **FR-12:** Impressao de pedido em impressora termica 58mm via Bluetooth. Duas vias por pedido.

#### Carregamento & Estatisticas (DOR PRINCIPAL)

- **FR-13:** Selecao manual de N pedidos de qualquer combinacao de contas para gerar: (a) lista consolidada de produtos para carregar, (b) faturamento total, (c) lucro total.
- **FR-14:** Estatisticas por periodo (dia, semana, mes) com filtro por conta.
- **FR-15:** Ranking de produtos por valor vendido e por quantidade vendida.
- **FR-16:** Dashboard com resumo: total de pedidos, faturamento, lucro, ticket medio, meios de pagamento — por conta e consolidado.

#### Financeiro & Acerto

- **FR-17:** Acerto semanal por conta com calculo automatico: total vendido - custo mercadoria - gastos = lucro liquido.
- **FR-18:** Formas de pagamento por pedido: Dinheiro, Pix, Boleto, Vale (assinado), Cartao.
- **FR-19:** Controle de vales: registrar vale com foto, marcar como pendente/pago, vincular ao pedido e ao cliente.
- **FR-20:** Controle de fiado: saldo devedor por cliente com historico.
- **FR-21:** Boleto registrado como forma de pagamento (o valor vai para a Boa Mesa; o lucro fica com Tiago). O sistema so registra — nao gera boleto nem NF.
- **FR-22:** Registro de gastos por conta: fixos (impostos ~R$320/semana) e variaveis (gasolina, manutencao).
- **FR-23:** Gastos compartilhados com rateio configuravel entre contas (ex: gasolina dividida entre Tiago e Distrial RP).

#### Entregas

- **FR-24:** Lista de rota para o entregador: sequencia de clientes, endereco, forma de pagamento prevista.
- **FR-25:** Check de entrega no app: entregador marca cada pedido como entregue, status atualiza em tempo real para o admin.

#### Clientes

- **FR-26:** Cadastro de clientes com: nome, endereco, telefone/WhatsApp, forma de pagamento padrao, tabela de precos especifica (opcional).
- **FR-27:** Cliente vinculado a conta(s). Um cliente pode existir em mais de uma conta com precos diferentes.
- **FR-28:** Historico de pedidos por cliente.

### 2.2 Non-Functional Requirements

- **NFR-01:** Mobile-first (Android). App nativo ou PWA com experiencia nativa.
- **NFR-02:** Acesso web para uso em computador (Diego usa PC frequentemente).
- **NFR-03:** Interface minimalista e intuitiva. Entregador (Joao) tem baixa familiaridade tech — tela dele deve ser tipo checklist.
- **NFR-04:** Impressao Bluetooth com impressora termica 58mm. Compativel com impressoras genericas de mercado.
- **NFR-05:** Suportar 60-70 pedidos/semana, 200 produtos, 100+ clientes, 2-3 usuarios simultaneos.
- **NFR-06:** Tempo de resposta < 2s para operacoes comuns (lancar pedido, gerar estatisticas).
- **NFR-07:** Dados persistidos em nuvem com backup automatico.
- **NFR-08:** Funcionar em areas com internet instavel (sync offline basico para lancamento de pedidos).

---

## 3. User Interface Design Goals

### 3.1 Overall UX Vision

Interface limpa, rapida e orientada a acao. O Tiago ja esta acostumado com o fluxo do Kite — o novo sistema deve manter a familiaridade (catalogo → pedido → confirmar → estatisticas) mas resolver as dores sem adicionar complexidade desnecessaria. Telas dedicadas por papel (admin vs entregador).

### 3.2 Key Interaction Paradigms

- **Selecao multi-pedido:** Checkboxes em lista de pedidos para selecionar quais carregar/gerar estatisticas.
- **Troca de conta:** Switcher rapido no topo (tipo troca de workspace) sem logout.
- **Status visual:** Badges coloridos nos pedidos (Lancado=cinza, Confirmado=azul, Carregado=amarelo, Entregue=verde).
- **Acao principal sempre visivel:** Botao de "Novo Pedido" e "Carregar Selecionados" sempre acessiveis.

### 3.3 Core Screens and Views

1. **Login / Selecao de Conta** — Entrar e escolher conta ativa
2. **Dashboard** — Resumo do dia: pedidos, faturamento, lucro (por conta e consolidado)
3. **Lista de Pedidos** — Com filtros por status, conta, data. Checkboxes para selecao
4. **Novo/Editar Pedido** — Selecao de cliente (puxa precos), adicao de produtos, totais
5. **Carregamento** — Pedidos selecionados → lista consolidada de produtos para separar
6. **Estatisticas** — Por periodo, por conta, por selecao de pedidos. Ranking de produtos
7. **Acerto Semanal** — Resumo financeiro: receitas, custos, gastos, lucro liquido por conta
8. **Clientes** — Cadastro, historico de pedidos, saldo devedor (fiado)
9. **Produtos** — Catalogo com precos, variacoes de tamanho
10. **Gastos** — Registro por conta, gastos compartilhados com rateio
11. **Tela Entregador** — Lista simplificada: cliente, endereco, produtos, checkbox de entrega
12. **Configuracoes** — Usuarios, permissoes, impressora, contas

### 3.4 Accessibility

Nenhum requisito formal de WCAG. Foco em legibilidade (fontes grandes, contraste alto) para uso em campo/sol.

### 3.5 Branding

Sem guia de marca definido. Sugestao: cores simples e limpas, similar ao Kite (verde/branco conforme screenshots).

### 3.6 Target Platforms

- **Primario:** Android (mobile) — Tiago e Diego usam celular
- **Secundario:** Web responsivo — Diego usa computador
- **Recomendacao tecnica:** PWA (Progressive Web App) — uma unica base de codigo que funciona em mobile e desktop, com suporte a Bluetooth e offline

---

## 4. Technical Assumptions

### 4.1 Repository Structure

**Monorepo** — frontend (PWA) + backend (API) no mesmo repositorio. Projeto pequeno, equipe pequena, sem necessidade de polyrepo.

### 4.2 Service Architecture

**Monolito modular** com API REST. Stack sugerida:

| Camada | Tecnologia | Rationale |
|--------|-----------|-----------|
| Frontend | Next.js (PWA) ou React Native | PWA cobre web + mobile com uma base; RN se precisar de nativo |
| Backend | Supabase (BaaS) | Auth, DB, Storage, Realtime — reduz drasticamente tempo de dev |
| Banco | PostgreSQL (Supabase) | Relacional, RLS nativo para multi-tenant, bom para financeiro |
| Auth | Supabase Auth | Login simples, sem overhead |
| Impressao | Web Bluetooth API (PWA) ou lib nativa (RN) | Para impressora termica 58mm |
| Hosting | Vercel (frontend) + Supabase (backend) | Free tier generoso, deploy simples |

**Decisao critica pendente:** PWA vs React Native. PWA e mais rapido de desenvolver e cobre web+mobile, mas impressao Bluetooth pode ter limitacoes. React Native resolve Bluetooth nativo mas exige mais dev. **Recomendacao: iniciar com PWA e testar Bluetooth; migrar para RN apenas se necessario.**

### 4.3 Testing Requirements

- Unit tests para logica de negocio (calculos financeiros, rateio de gastos, consolidacao de carregamento)
- Integration tests para fluxos criticos (pedido → carregamento → acerto)
- Manual testing para impressao Bluetooth

### 4.4 Additional Technical Assumptions

- Supabase RLS (Row Level Security) para isolamento de dados entre contas
- Offline-first com service worker para lancamento de pedidos
- Foto de vale armazenada no Supabase Storage
- Sem integracao com Kite (dados nao exportaveis — migracao manual)
- Sem integracao com sistema bancario/NF (fica com Boa Mesa)
- Sem controle de estoque (modelo dropship fisico)

---

## 5. Restricoes

- **CON-01:** NF e boleto bancario ficam com a Boa Mesa — sistema nao integra com banco/SEFAZ
- **CON-02:** Sem controle de estoque — nao necessario no modelo dropship
- **CON-03:** Kite nao exporta dados — migracao manual de ~200 produtos e clientes
- **CON-04:** Orcamento: premissa de investimento medio (~R$10-20k). A CONFIRMAR com cliente
- **CON-05:** Prazo: premissa de 3 meses para MVP completo. A CONFIRMAR com cliente
- **CON-06:** Modelo de cobranca: premissa hibrida (setup + mensalidade). A CONFIRMAR com cliente

---

## 6. Epic List

| # | Epic | Goal |
|---|------|------|
| **E1** | Fundacao & Multi-Conta | Setup do projeto, autenticacao, sistema de contas/permissoes e cadastro base (produtos + clientes) |
| **E2** | Pedidos & Carregamento | Ciclo completo de pedidos com status granulares, selecao multi-pedido para carregamento e impressao termica |
| **E3** | Financeiro & Acerto | Formas de pagamento, controle de vales/fiado, registro de gastos e acerto semanal automatizado |
| **E4** | Entregas & Estatisticas | Tela do entregador, lista de rota, dashboard com estatisticas e ranking de produtos |

---

## 7. Epic Details

### Epic 1: Fundacao & Multi-Conta

**Goal:** Estabelecer a infraestrutura do projeto, autenticacao de usuarios, sistema multi-conta com permissoes isoladas, e cadastros base de produtos e clientes. Ao final deste epic, Tiago e Diego conseguem logar, trocar entre contas, e gerenciar o catalogo de produtos e clientes de cada conta.

---

#### Story 1.1: Setup do Projeto e Infraestrutura Base

> Como **desenvolvedor**,
> quero ter o projeto inicializado com stack definida, banco de dados configurado e deploy automatico,
> para que toda feature subsequente tenha uma base solida.

**Acceptance Criteria:**
1. Repositorio criado com monorepo (frontend + backend/supabase)
2. Projeto Next.js (ou framework escolhido) inicializado com PWA configurada
3. Supabase projeto criado com PostgreSQL acessivel
4. Deploy automatico configurado (push → deploy)
5. Pagina de health-check acessivel em producao

---

#### Story 1.2: Autenticacao e Perfis de Usuario

> Como **Tiago (admin)**,
> quero fazer login com meu usuario e ter meu perfil reconhecido com as permissoes corretas,
> para que eu acesse apenas o que me pertence e o Diego acesse apenas o que lhe cabe.

**Acceptance Criteria:**
1. Login funcional (email + senha via Supabase Auth)
2. Tabela `users` com campos: id, name, email, role (admin, vendedor, entregador)
3. Tiago criado como admin com acesso total
4. Diego criado como vendedor com acesso configuravel por conta
5. Joao criado como entregador com acesso restrito
6. Redirect pos-login para dashboard apropriado ao perfil

---

#### Story 1.3: Sistema Multi-Conta (Contas de Negocio)

> Como **Tiago**,
> quero ter 3 contas separadas ("Distrial RP", "Tiago", "Distrial Votoporanga") em um unico app,
> para que eu nao precise de 3 celulares e 3 apps diferentes.

**Acceptance Criteria:**
1. Tabela `accounts` com: id, name, owner_id
2. Tabela `account_users` com: account_id, user_id, role (admin, vendedor, entregador)
3. RLS configurado — usuario so ve dados da conta ativa
4. UI com switcher de conta no header (troca sem logout)
5. 3 contas pre-criadas: "Distrial Rio Preto", "Tiago", "Distrial Votoporanga"
6. Diego tem acesso a "Distrial RP" (vendedor + visualizacao financeira) e "Distrial Votoporanga" (vendedor), sem acesso a "Tiago"

---

#### Story 1.4: Cadastro de Produtos com Variacoes

> Como **Tiago**,
> quero cadastrar meus ~200 produtos com nome, peso, variacoes de tamanho, preco de custo e preco de venda,
> para que eu tenha meu catalogo completo no sistema.

**Acceptance Criteria:**
1. CRUD de produtos vinculado a conta ativa
2. Campos: nome, peso_base, unidade, preco_custo, preco_venda
3. Suporte a variacoes de tamanho no mesmo produto (ex: Creme de Cebola 1kg e 25kg como variacoes)
4. Lista de produtos com busca e filtro
5. Edicao de precos em lote (selecionar N produtos, atualizar preco)
6. Cada conta tem seu proprio catalogo com precos independentes

---

#### Story 1.5: Cadastro de Clientes com Preco Diferenciado

> Como **Tiago**,
> quero cadastrar meus clientes com endereco, forma de pagamento padrao e precos especificos por produto,
> para que na hora do pedido os precos ja venham corretos para cada cliente.

**Acceptance Criteria:**
1. CRUD de clientes vinculado a conta ativa
2. Campos: nome, endereco, telefone_whatsapp, forma_pagamento_padrao
3. Tabela `client_prices` com: client_id, product_id, custom_price (override do preco padrao)
4. Ao criar pedido e selecionar cliente, precos customizados sao aplicados automaticamente
5. Se nao houver preco customizado, usa o preco padrao do produto
6. Cliente pode existir em mais de uma conta com precos diferentes

---

### Epic 2: Pedidos & Carregamento

**Goal:** Implementar o ciclo completo de pedidos (lancar, confirmar, carregar, entregar) com status granulares, selecao multi-pedido cruzando contas para gerar lista de carregamento consolidada, e impressao termica. Este epic resolve a DOR PRINCIPAL do Tiago — nao precisar mais somar manualmente entre contas.

---

#### Story 2.1: Lancamento e Edicao de Pedidos

> Como **Tiago ou Diego (vendedor)**,
> quero lancar pedidos selecionando o cliente e adicionando produtos com quantidades,
> para que o pedido fique registrado e pronto para confirmacao.

**Acceptance Criteria:**
1. Tela "Novo Pedido": selecionar cliente → precos carregados automaticamente
2. Adicionar produtos com quantidade (busca rapida por nome)
3. Exibir total do pedido (faturamento e lucro estimado) em tempo real
4. Salvar pedido com status "Lancado"
5. Edicao de pedido em qualquer status (Lancado, Confirmado, Carregado) — nao precisa excluir e relancar
6. Pedido vinculado a conta ativa e ao usuario que criou

---

#### Story 2.2: Status Granulares de Pedido

> Como **Tiago**,
> quero que cada pedido tenha status claros (Lancado, Confirmado, Carregado, Entregue),
> para que eu saiba exatamente em que estagio cada pedido esta sem confusao.

**Acceptance Criteria:**
1. Campo `status` no pedido com valores: `lancado`, `confirmado`, `carregado`, `entregue`
2. Transicoes permitidas: lancado→confirmado, confirmado→carregado, carregado→entregue
3. Transicao reversa permitida: qualquer status pode voltar ao anterior (exceto entregue→lancado)
4. Filtro de pedidos por status na lista
5. Badges visuais coloridos por status (cinza, azul, amarelo, verde)
6. Confirmacao em lote: selecionar varios pedidos e confirmar de uma vez

---

#### Story 2.3: Carregamento Seletivo Multi-Conta (DOR PRINCIPAL)

> Como **Tiago**,
> quero selecionar pedidos especificos de qualquer conta e gerar uma lista consolidada de produtos para carregar a van,
> para que eu nao precise mais somar manualmente entre 3 apps diferentes.

**Acceptance Criteria:**
1. Tela "Carregamento" com lista de pedidos de TODAS as contas (com indicador de qual conta)
2. Checkboxes para selecionar quais pedidos incluir no carregamento
3. Ao selecionar, exibir em tempo real: lista de produtos consolidada (produto + quantidade total), faturamento total, lucro total
4. Botao "Marcar como Carregado" que muda status dos pedidos selecionados
5. Funciona independente de status — pode selecionar pedidos "Lancados" e "Confirmados" juntos
6. Nao interfere nas estatisticas diarias por conta — carregamento e uma visao transversal
7. Opcao de imprimir a lista consolidada de carregamento

---

#### Story 2.4: Impressao Termica Bluetooth

> Como **Tiago**,
> quero imprimir cada pedido na impressora termica 58mm via Bluetooth (2 vias),
> para que o entregador saia com os comprovantes fisicos.

**Acceptance Criteria:**
1. Conectar com impressora termica 58mm via Bluetooth (Web Bluetooth API ou lib nativa)
2. Layout do cupom: nome do cliente, data, lista de produtos (nome + qtd), total, forma de pagamento
3. Impressao de 2 vias automatica (1 via cliente, 1 via controle)
4. Botao "Imprimir" disponivel na tela de detalhes do pedido e na lista de pedidos (acao em lote)
5. Fallback se Bluetooth falhar: exibir cupom em tela para screenshot/compartilhamento

---

#### Story 2.5: Devolucao Parcial de Pedido

> Como **Tiago**,
> quero registrar devolucao de itens de um pedido ja entregue, com abatimento automatico no acerto,
> para que eu nao precise excluir e relancar o pedido inteiro.

**Acceptance Criteria:**
1. Acao "Registrar Devolucao" em pedido com status "Entregue"
2. Selecionar quais produtos e quantidades devolvidas
3. Pedido recalcula automaticamente: novo total, novo lucro
4. Registro de devolucao com motivo (campo texto) e data
5. Valor devolvido refletido no acerto semanal da conta

---

### Epic 3: Financeiro & Acerto

**Goal:** Implementar controle financeiro completo: multiplas formas de pagamento, gestao de vales com foto, controle de fiado, registro de gastos com rateio entre contas, e acerto semanal automatizado. Ao final, Tiago nao precisa mais usar bloco de notas nem consultar o banco manualmente.

---

#### Story 3.1: Formas de Pagamento no Pedido

> Como **Tiago**,
> quero registrar a forma de pagamento de cada pedido (Dinheiro, Pix, Boleto, Vale, Cartao),
> para que o acerto semanal seja automatico.

**Acceptance Criteria:**
1. Campo `forma_pagamento` no pedido: dinheiro, pix, boleto, vale, cartao
2. Selecao na criacao/edicao do pedido (puxa padrao do cadastro do cliente)
3. Boleto: registrado como pagamento com nota de que "valor cai na conta da Boa Mesa"
4. Pagamento misto permitido (ex: parte dinheiro, parte Pix)
5. Filtro de pedidos por forma de pagamento na lista

---

#### Story 3.2: Controle de Vales e Fiado

> Como **Tiago**,
> quero registrar vales assinados com foto e acompanhar o status de pagamento,
> para que eu nao precise ficar entrando no banco manualmente pra conferir.

**Acceptance Criteria:**
1. Ao marcar pagamento como "Vale", permitir upload de foto do vale assinado
2. Vale com status: pendente, pago, vencido
3. Tela "Vales Pendentes" com lista de vales aguardando pagamento, ordenados por data
4. Marcar vale como "Pago" com data do pagamento
5. Controle de fiado: saldo devedor por cliente (soma de vales + pedidos nao pagos)
6. Historico de fiado por cliente com timeline de debitos e pagamentos

---

#### Story 3.3: Registro de Gastos por Conta

> Como **Tiago**,
> quero registrar gastos operacionais (impostos, gasolina, manutencao) no app por conta,
> para que entrem automaticamente no calculo do acerto.

**Acceptance Criteria:**
1. CRUD de gastos com: descricao, valor, data, conta, categoria (fixo/variavel), recorrencia (semanal/mensal/unico)
2. Gastos fixos pre-cadastrados (ex: impostos R$320/semana para Distrial)
3. Gastos compartilhados: flag `compartilhado` com percentual de rateio por conta
4. Ex: gasolina R$500 → 50% Distrial RP, 50% Tiago (configuravel)
5. Lista de gastos com filtro por conta, periodo e categoria

---

#### Story 3.4: Acerto Semanal Automatizado

> Como **Tiago**,
> quero que o sistema calcule automaticamente o acerto de cada conta na semana,
> para que eu nao precise mais somar tudo manualmente.

**Acceptance Criteria:**
1. Tela "Acerto Semanal" com selecao de conta e periodo (semana)
2. Calculo automatico: total vendido (por forma de pagamento) - custo das mercadorias - gastos da conta - gastos rateados = lucro liquido
3. Detalhamento: lista de pedidos incluidos, gastos incluidos, vales pendentes
4. Status do acerto: rascunho, conferido, fechado
5. Historico de acertos fechados por conta
6. Acerto da conta "Tiago" visivel APENAS para Tiago (Diego sem acesso)

---

### Epic 4: Entregas & Estatisticas

**Goal:** Implementar a tela dedicada do entregador com lista de rota e check de entrega, e o dashboard de estatisticas com visualizacoes por periodo, por conta e ranking de produtos. Completa a experiencia end-to-end.

---

#### Story 4.1: Tela do Entregador (Joao)

> Como **Joao (entregador)**,
> quero ver uma lista simples dos clientes que preciso entregar hoje, com endereco e check de conclusao,
> para que eu consiga fazer as entregas sem confusao.

**Acceptance Criteria:**
1. Tela simplificada acessivel apenas pelo perfil "entregador"
2. Lista de pedidos do dia com status "Carregado", ordenados pela sequencia de rota
3. Cada item mostra: nome do cliente, endereco, forma de pagamento, lista resumida de produtos
4. Botao grande "Entregue" que muda status para "Entregue"
5. Campo para anotar observacao na entrega (ex: "recebeu Dona Maria no lugar do Sr. Jose")
6. Interface com fontes grandes, alto contraste, minimo de botoes

---

#### Story 4.2: Lista de Rota

> Como **Tiago**,
> quero montar a sequencia de entregas do dia para o Joao,
> para que ele saiba a ordem e nao se perca.

**Acceptance Criteria:**
1. Tela "Montar Rota" com pedidos carregados do dia
2. Drag-and-drop (ou numeracao manual) para definir sequencia
3. Cada item mostra: nome do cliente, endereco, bairro/cidade
4. Botao "Enviar para Entregador" que torna a rota visivel na tela do Joao
5. Link para Google Maps com a sequencia de enderecos (opcional, nice-to-have)

---

#### Story 4.3: Dashboard e Estatisticas

> Como **Tiago**,
> quero ver um dashboard com faturamento, lucro, ticket medio e ranking de produtos,
> para que eu acompanhe a saude do negocio.

**Acceptance Criteria:**
1. Dashboard com cards: faturamento, lucro, ticket medio, total de pedidos, total de clientes atendidos
2. Filtro por: conta (individual ou consolidado), periodo (dia, semana, mes, customizado)
3. Ranking de produtos: top 10 por valor vendido e por quantidade
4. Grafico simples de evolucao semanal (faturamento + lucro)
5. Meios de pagamento: percentual por tipo (pizza chart)
6. Dados respeitam permissao — Diego nao ve estatisticas da conta "Tiago"

---

#### Story 4.4: Historico e Relatorios por Cliente

> Como **Tiago**,
> quero ver o historico completo de pedidos de cada cliente e seu saldo devedor,
> para que eu tenha controle do relacionamento comercial.

**Acceptance Criteria:**
1. Tela de detalhe do cliente com: dados cadastrais, forma de pagamento, precos especiais
2. Lista de pedidos do cliente com filtro por periodo e status
3. Saldo devedor: total de vales pendentes + fiado
4. Ultimo pedido e frequencia de compra (semanal, quinzenal, mensal)
5. Acessivel via lista de clientes e via tela de pedido (link no nome do cliente)

---

## 8. Checklist Results Report

*A ser preenchido apos validacao com o cliente e revisao tecnica.*

---

## 9. Next Steps

### 9.1 UX Expert Prompt

> Leia o PRD em `docs/prd.md` e o intake report em `docs/intake/distriall/intake-report.md`. O projeto e um app de gestao de vendas/distribuicao de alimentos para substituir o app Kite. Crie o design system e wireframes das 12 telas core, priorizando a tela de Carregamento Seletivo (FR-13) que e a dor principal. Mobile-first Android, interface minimalista. O entregador (Joao) tem baixa familiaridade tech — tela dele deve ser extremamente simples.

### 9.2 Architect Prompt

> Leia o PRD em `docs/prd.md`. O projeto e um app de gestao de vendas/distribuicao (Distriall). Stack sugerida: Next.js (PWA) + Supabase. Defina a arquitetura completa: schema do banco com RLS multi-tenant, API routes, estrutura de pastas, estrategia de offline-first, e integracao com impressora termica 58mm Bluetooth. Priorize simplicidade — sao 2-3 usuarios, 200 produtos, 70 pedidos/semana. Valide se PWA resolve o Bluetooth ou se precisa de React Native.

---

*— Morgan, planejando o futuro 📊*
