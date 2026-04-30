# Task: Gerar Endpoints de API para Operações NF

## Purpose
Gerar rotas/endpoints de API para as operações de notas fiscais, seguindo os padrões do sistema-alvo.

## Inputs
- Design do módulo NF (task `design-nf-module.md`)
- Framework de API do sistema-alvo (Express, Fastify, NestJS, etc.)
- Padrão de autenticação e autorização existente
- Padrão de validação (Zod, Joi, etc.)

## Steps

1. **Definir endpoints CRUD**
   - `POST /invoices` — Criar NF (rascunho)
   - `GET /invoices` — Listar NFs (com filtros e paginação)
   - `GET /invoices/:id` — Detalhar NF
   - `PUT /invoices/:id` — Atualizar NF (rascunho apenas)
   - `DELETE /invoices/:id` — Excluir rascunho

2. **Definir endpoints de operação fiscal**
   - `POST /invoices/:id/emit` — Emitir NF (transmitir à SEFAZ/provider)
   - `POST /invoices/:id/cancel` — Cancelar NF
   - `POST /invoices/:id/correction` — Emitir CC-e
   - `POST /invoices/:id/manifest` — Manifestar destinatário
   - `GET /invoices/:id/xml` — Download do XML
   - `GET /invoices/:id/danfe` — Download do DANFE (PDF)

3. **Definir endpoints de consulta**
   - `GET /invoices/received` — NFs recebidas (DF-e)
   - `GET /invoices/status/:accessKey` — Consultar status por chave
   - `GET /invoices/stats` — Estatísticas (total emitidas, canceladas, etc.)

4. **Definir endpoints de configuração**
   - `GET /fiscal/config` — Obter configuração fiscal
   - `PUT /fiscal/config` — Atualizar configuração
   - `POST /fiscal/certificate` — Upload de certificado A1
   - `GET /fiscal/certificate/status` — Status do certificado

5. **Implementar validação de entrada**
   - Schema de validação para cada endpoint
   - Validar campos obrigatórios (CNPJ, itens, valores)
   - Validar formatos (CNPJ, CEP, NCM)
   - Retornar erros estruturados (campo, mensagem, código)

6. **Implementar middleware**
   - Autenticação (JWT/session conforme projeto)
   - Autorização (roles: admin, fiscal, viewer)
   - Rate limiting para endpoints de emissão
   - Logging de operações fiscais (auditoria)

## Outputs
- Arquivos de rotas/controllers gerados
- Schemas de validação para cada endpoint
- Middleware de autenticação e autorização
- Documentação OpenAPI/Swagger dos endpoints
- Exemplos de request/response

## Acceptance Criteria
- [ ] Endpoints CRUD para invoices implementados
- [ ] Endpoints de operação fiscal (emit, cancel, correction)
- [ ] Validação de entrada em todos os endpoints
- [ ] Autenticação e autorização aplicadas
- [ ] Padrão de resposta consistente (sucesso e erro)
- [ ] Documentação de API gerada
