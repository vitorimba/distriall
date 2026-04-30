# Task: Integrar com Provider de NF (Focus/Enotas/Webmania)

## Purpose
Implementar adapter para integração com API de provider de emissão de NF (Focus NFe, Enotas, Webmania), abstraindo a comunicação com o serviço externo.

## Inputs
- Provider escolhido (Focus NFe, Enotas, Webmania)
- Credenciais de API (token, API key)
- Ambiente (sandbox/produção)
- Interface do adapter definida (task `design-nf-module.md`)

## Steps

1. **Configurar client HTTP**
   - Base URL por ambiente:
     - Focus NFe: `https://api.focusnfe.com.br` (prod) / `https://homologacao.focusnfe.com.br` (sandbox)
     - Enotas: `https://api.enotas.com.br` (prod)
     - Webmania: `https://webmaniabr.com/api` (prod)
   - Autenticação:
     - Focus: Basic Auth (token como username, vazio como password)
     - Enotas: Bearer token no header
     - Webmania: API key + secret nos headers
   - Timeout: 30s conexão, 60s leitura
   - Retry: 3 tentativas com backoff

2. **Implementar adapter de emissão**
   - `emit(invoiceData)`:
     - Mapear dados internos → formato do provider
     - Enviar POST para endpoint de emissão
     - Retornar ID da emissão no provider
   - Mapeamento de campos (varia por provider):
     - Focus: JSON com campos snake_case
     - Enotas: JSON com campos camelCase
     - Webmania: JSON com campos específicos

3. **Implementar adapter de cancelamento**
   - `cancel(providerRef, justification)`:
     - Enviar DELETE ou POST para endpoint de cancelamento
     - Incluir justificativa
     - Retornar protocolo de cancelamento

4. **Implementar adapter de consulta**
   - `query(providerRef)`:
     - Consultar status da NF no provider
     - Retornar: status, protocolo, motivo rejeição
   - `downloadXml(providerRef)`:
     - Baixar XML autorizado do provider
   - `downloadDanfe(providerRef)`:
     - Baixar DANFE (PDF) do provider

5. **Implementar webhook receiver**
   - Configurar URL de callback no provider
   - Validar autenticidade do webhook
   - Mapear payload do provider → formato interno
   - Disparar processamento assíncrono

6. **Implementar adapter de CC-e**
   - `correct(providerRef, text)`:
     - Enviar correção ao provider
     - Retornar protocolo do evento

7. **Testar em sandbox**
   - Emitir NF de teste em ambiente de homologação
   - Testar cancelamento
   - Testar CC-e
   - Validar webhooks
   - Documentar fluxo completo

## Outputs
- Adapter implementado para o provider escolhido
- Client HTTP configurado com retry e timeout
- Mapeamento de campos (interno ↔ provider)
- Webhook receiver configurado
- Testes em sandbox documentados

## Acceptance Criteria
- [ ] Adapter implementa interface definida (emit, cancel, correct, query)
- [ ] Autenticação correta para o provider
- [ ] Mapeamento de campos interno ↔ provider completo
- [ ] Webhook configurado e recebendo callbacks
- [ ] Retry e timeout configurados
- [ ] Testes em sandbox bem-sucedidos
