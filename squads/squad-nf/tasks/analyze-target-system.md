# Task: Analisar Sistema-Alvo para Integração NF

## Purpose
Analisar a arquitetura do sistema-alvo (stack, API, banco de dados) para planejar a integração do módulo de notas fiscais.

## Inputs
- Repositório ou acesso ao código do sistema-alvo
- Documentação técnica existente (README, docs, Swagger)
- Stack tecnológica declarada
- Requisitos de integração NF

## Steps

1. **Identificar stack tecnológica**
   - Frontend: React, Next.js, Vue, Angular, etc.
   - Backend: Node.js, Python, Java, Go, PHP, etc.
   - Banco de dados: PostgreSQL, MySQL, MongoDB, etc.
   - ORM/Query builder: Prisma, TypeORM, Sequelize, Drizzle, etc.
   - Infraestrutura: Docker, Kubernetes, serverless, etc.

2. **Analisar arquitetura da API**
   - Padrão: REST, GraphQL, tRPC, gRPC
   - Autenticação: JWT, OAuth2, API Key, Session
   - Versionamento: URL, header, query param
   - Documentação: OpenAPI/Swagger, GraphQL schema
   - Rate limiting e paginação

3. **Analisar modelo de dados**
   - Schema do banco de dados
   - Tabelas de produtos, clientes, pedidos (entidades fiscais)
   - Padrão de IDs (UUID, auto-increment, CUID)
   - Soft delete vs hard delete
   - Padrão de timestamps (created_at, updated_at)

4. **Mapear pontos de integração**
   - Onde NF será disparada (após venda, após pagamento, manual)
   - Eventos existentes (webhooks, filas, event bus)
   - Dados disponíveis para emissão (produto, cliente, endereço)
   - Lacunas: dados fiscais faltantes (NCM, CFOP, IE, etc.)

5. **Avaliar padrões de código**
   - Estrutura de pastas (modules, features, layers)
   - Padrão de serviços/repositórios/controllers
   - Tratamento de erros existente
   - Padrão de validação (Zod, Joi, class-validator)
   - Testes existentes (Jest, Vitest, pytest)

6. **Identificar dependências e restrições**
   - Licenças de bibliotecas
   - Restrições de ambiente (cloud provider, região)
   - Requisitos de performance
   - Políticas de segurança (dados sensíveis, LGPD)

## Outputs
- Relatório de análise do sistema-alvo
- Stack tecnológica mapeada
- Pontos de integração identificados
- Lacunas de dados fiscais
- Restrições e dependências catalogadas
- Recomendação de abordagem de integração

## Acceptance Criteria
- [ ] Stack completa identificada (frontend, backend, DB, infra)
- [ ] Padrão de API documentado (REST/GraphQL, auth, versão)
- [ ] Modelo de dados analisado com entidades fiscais mapeadas
- [ ] Pontos de integração para emissão de NF identificados
- [ ] Lacunas de dados fiscais listadas
- [ ] Padrões de código do projeto seguidos na recomendação
