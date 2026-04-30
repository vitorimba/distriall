---
task: generate-briefing
responsavel: "@intake-chief (Iris)"
responsavel_type: agent
delegated_to: ["@alan-weiss", "@donna-weber"]
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Hybrid
optimization_note: "Template base Worker, personalização por notas Agent. Se sem notas de reunião → Worker puro."
elicit: true
Entrada:
  - client_name: string - Nome do cliente/empresa
  - project_type: string - Tipo de projeto (web-app, mobile-app, website, automation, saas, ecommerce, custom)
  - industry: string - Setor do cliente
  - discovery_notes (optional): text - Notas da reunião de discovery
  - meeting_context (optional): text - Contexto da conversa inicial
Saida:
  - briefing.md: Questionário personalizado para o cliente responder
  - briefing-email.md: Email de envio do briefing com contexto
Checklist:
  - Briefing personalizado por tipo de projeto e indústria
  - Seções adaptadas ao contexto da reunião
  - Linguagem acessível (não técnica)
  - Limite de 30-45 perguntas
  - Exemplos incluídos em perguntas complexas
  - Seção de Objetivos e Métricas obrigatória
  - Email de envio humanizado com contexto da conversa
---

# Task: Generate Briefing

## Purpose

Gerar questionário personalizado para o cliente responder pós-reunião. O briefing é adaptado por tipo de projeto, indústria e contexto da conversa inicial. Não é um formulário genérico — é uma continuação da conversa, estruturada para coletar informações completas.

---

## Inputs

| Input | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `client_name` | string | Sim | Nome da empresa/cliente |
| `project_type` | string | Sim | Tipo de projeto (web-app, mobile-app, website, automation, saas, ecommerce, custom) |
| `industry` | string | Sim | Setor do cliente |
| `discovery_notes` | text | Não | Notas da reunião. Se fornecido, personaliza perguntas. Se não, gera versão padrão |
| `meeting_context` | text | Não | Contexto adicional da conversa |

---

## Key Activities & Instructions

### 1. Determinar Contexto

Se `discovery_notes` fornecido:
- Extrair temas discutidos na reunião
- Identificar gaps de informação (o que NÃO foi coberto)
- Personalizar perguntas baseado no que já foi dito
- Referenciar a conversa: "Como mencionamos na reunião..."

Se SEM discovery_notes:
- Gerar versão padrão por tipo de projeto
- Incluir todas as seções sem personalização

### 2. Montar Estrutura do Briefing

O briefing tem **6 blocos obrigatórios** + **1 bloco condicional** por tipo de projeto:

**Bloco 1: Sobre Você e Seu Negócio** (8-10 perguntas)
- Nome da empresa, setor, modelo de negócio
- Público-alvo, tamanho da equipe
- Estágio atual (ideia, MVP, crescimento, escala)
- Website e redes sociais existentes

**Bloco 2: O Problema que Queremos Resolver** (6-8 perguntas)
- Qual o problema principal
- Como resolvem hoje
- Quem mais é afetado
- Qual o impacto de NÃO resolver
- Já tentaram resolver antes? O que aconteceu?
- Nível de urgência

**Bloco 3: A Solução Ideal** (6-8 perguntas)
- Como seria o cenário ideal
- Quem vai usar a solução
- Features essenciais vs desejáveis (MoSCoW)
- Referências e inspirações
- Integrações necessárias

**Bloco 4: Objetivos e Métricas de Sucesso** (5-6 perguntas)
- Quais resultados de NEGÓCIO espera (não deliverables)
- Como vai medir sucesso (KPIs concretos)
- Baseline atual vs target
- Em quanto tempo espera ver resultados
- O que faria o projeto ser considerado um fracasso

**Bloco 5: Restrições e Limites** (6-8 perguntas)
- Orçamento (range)
- Prazo desejado vs deadline firme
- Equipe disponível (interna e externa)
- Restrições técnicas
- Compliance/regulatório

**Bloco 6: Informações Complementares** (4-5 perguntas)
- Algo que deveríamos saber que não perguntamos?
- Quem são os stakeholders chave?
- Canal de comunicação preferido
- Disponibilidade para reuniões de validação

**Bloco Condicional por Tipo de Projeto:**

Se `project_type = web-app`:
- Quantos tipos de usuário (roles)?
- Precisa de área administrativa?
- Volume esperado de dados/transações?
- Multi-idioma necessário?

Se `project_type = mobile-app`:
- iOS, Android ou ambos?
- Funciona offline?
- Usa recursos do dispositivo (câmera, GPS, notificações)?
- Monetização (gratuito, assinatura, freemium)?

Se `project_type = website`:
- Quantas páginas estimadas?
- Precisa de blog/CMS?
- SEO é prioridade?
- Captação de leads (formulários, chatbot)?
- Já tem domínio e hospedagem?

Se `project_type = automation`:
- Qual processo específico quer automatizar?
- Quais ferramentas usa hoje (planilhas, ERPs, CRMs)?
- Quantas vezes por dia/semana o processo ocorre?
- Quais triggers iniciam o processo?
- Precisa de aprovação humana em alguma etapa?

Se `project_type = saas`:
- Modelo de pricing (mensal, anual, pay-per-use)?
- Self-service ou sales-assisted?
- Multi-tenant?
- Free trial ou freemium?

Se `project_type = ecommerce`:
- Quantos produtos/SKUs?
- Marketplace ou loja própria?
- Gateways de pagamento necessários?
- Logística (própria, terceirizada)?
- Integrações com marketplaces (ML, Amazon, Shopee)?

### 3. Humanizar o Briefing

Aplicar heurística DW_003 (Donna Weber):
- Começar com contexto da reunião (se houver)
- Explicar o propósito de cada bloco
- Usar linguagem acessível (não jargão técnico)
- Incluir exemplos em perguntas complexas
- Manter tom de conversa, não de formulário

### 4. Gerar Email de Envio

Criar email seguindo heurística DW_001 (Expectation Setting):
- Agradecer a reunião
- Referenciar pontos discutidos
- Explicar o propósito do briefing
- Definir expectativa de tempo (25-40 min)
- Definir prazo de resposta
- Oferecer suporte durante preenchimento

### 5. Validar com Usuário (Elicit)

Apresentar draft do briefing para o usuário revisar:
- Mostrar resumo: total de perguntas, blocos, estimativa de tempo
- Perguntar se quer adicionar/remover algo
- Confirmar tipo de projeto e indústria
- Perguntar se quer versão em formato específico (Markdown, Google Forms, etc.)

### 6. Salvar Artefatos

- Criar `docs/intake/{client_slug}/` se não existir
- Salvar `briefing.md`
- Salvar `briefing-email.md`
- Confirmar paths ao usuário

---

## Outputs

| Output | Path | Formato |
|--------|------|---------|
| Briefing | `docs/intake/{client}/briefing.md` | Markdown |
| Email de Envio | `docs/intake/{client}/briefing-email.md` | Markdown |

---

## Veto Conditions

| Condição | Ação |
|----------|------|
| Mais de 50 perguntas | BLOQUEAR — reduzir. Cliente não vai responder |
| Falta seção de Objetivos | BLOQUEAR — é a seção mais importante |
| Linguagem técnica | CORRIGIR — substituir por linguagem acessível |
| Sem personalização (genérico) | ALERTAR — adicionar contexto da reunião |

---

## Error Handling

| Erro | Causa | Ação |
|------|-------|------|
| Tipo de projeto não reconhecido | project_type inválido | Usar "custom" e não adicionar bloco condicional |
| Sem notas de reunião | discovery_notes vazio | Gerar versão padrão, alertar que não é personalizado |
| Cliente não mapeado | Primeiro intake do cliente | Criar diretório e gerar com dados disponíveis |
