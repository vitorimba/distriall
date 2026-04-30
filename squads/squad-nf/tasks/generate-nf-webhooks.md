# Task: Gerar Handlers de Webhook para NF

## Purpose
Gerar handlers de webhook para receber callbacks dos providers de NF (Focus, Enotas, Webmania) e processar eventos assíncronos de emissão, cancelamento e rejeição.

## Inputs
- Provider de NF configurado (Focus, Enotas, Webmania)
- Framework do sistema-alvo
- Schema de banco de dados (invoices, events)
- Configuração de autenticação do webhook

## Steps

1. **Configurar endpoint de webhook**
   - `POST /webhooks/nf/:provider` — Endpoint genérico por provider
   - Ou endpoints específicos:
     - `POST /webhooks/nf/authorized` — NF autorizada
     - `POST /webhooks/nf/rejected` — NF rejeitada
     - `POST /webhooks/nf/cancelled` — NF cancelada
   - Responder 200 rapidamente (processar assíncrono)

2. **Validar autenticidade do webhook**
   - Verificar assinatura HMAC (header X-Signature ou similar)
   - Validar IP de origem (whitelist do provider)
   - Verificar token de autenticação (quando fornecido)
   - Rejeitar webhooks inválidos com 401

3. **Implementar handlers por evento**
   - **NF Autorizada**:
     - Extrair: chave de acesso, protocolo, número, série
     - Atualizar invoice.status → AUTHORIZED
     - Salvar XML e protocolo
     - Disparar evento onInvoiceEmitted
   - **NF Rejeitada**:
     - Extrair: código rejeição, motivo
     - Atualizar invoice.status → REJECTED
     - Executar diagnóstico (task `handle-rejection.md`)
     - Disparar evento onInvoiceRejected
   - **NF Cancelada**:
     - Confirmar cancelamento processado
     - Atualizar invoice.status → CANCELLED
     - Salvar evento de cancelamento
     - Disparar evento onInvoiceCancelled

4. **Implementar idempotência**
   - Armazenar webhook_id/event_id recebido
   - Verificar duplicidade antes de processar
   - Se duplicado: retornar 200 sem reprocessar
   - Prevenir efeitos colaterais de reprocessamento

5. **Implementar retry e dead letter**
   - Se processamento falhar: enfileirar para retry
   - Max retries: 3 com backoff exponencial
   - Após max retries: mover para dead letter queue
   - Alertar equipe sobre webhooks em dead letter

6. **Implementar logging e monitoramento**
   - Logar todos os webhooks recebidos (payload, headers)
   - Métricas: webhooks recebidos, processados, falhados
   - Alertas para falhas consecutivas
   - Dashboard de status de webhooks

## Outputs
- Endpoint(s) de webhook configurados
- Handlers para cada tipo de evento (autorizado, rejeitado, cancelado)
- Validação de autenticidade implementada
- Mecanismo de idempotência
- Retry e dead letter queue configurados
- Logging estruturado

## Acceptance Criteria
- [ ] Endpoint de webhook acessível e respondendo 200
- [ ] Autenticidade do webhook validada (HMAC/IP/token)
- [ ] Handlers processam autorização, rejeição e cancelamento
- [ ] Idempotência garante processamento único por evento
- [ ] Retry com backoff para falhas temporárias
- [ ] Logs de todos os webhooks recebidos
