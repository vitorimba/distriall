# Task: Gerar Camada de Serviço NF (NFService)

## Purpose
Gerar a camada de serviço (business logic) para operações de notas fiscais, orquestrando validação, cálculo tributário, comunicação com provider e persistência.

## Inputs
- Design do módulo NF (task `design-nf-module.md`)
- Schema do banco de dados (task `generate-nf-schema.md`)
- Provider escolhido (Focus, Enotas, Webmania)
- Padrões de código do sistema-alvo

## Steps

1. **Implementar NFService principal**
   - `createInvoice(data)`: Criar rascunho de NF com validação
   - `emitInvoice(id)`: Orquestrar emissão completa
   - `cancelInvoice(id, justification)`: Cancelar NF
   - `correctInvoice(id, correction)`: Emitir CC-e
   - `getInvoice(id)`: Buscar NF com relacionamentos
   - `listInvoices(filters)`: Listar com filtros e paginação

2. **Implementar fluxo de emissão**
   ```
   emitInvoice(id):
     1. Buscar NF do banco (status = DRAFT)
     2. Validar dados obrigatórios
     3. Classificar NCM/CFOP (se não informado)
     4. Calcular tributos (ICMS, PIS, COFINS, ISS)
     5. Montar payload para provider
     6. Enviar ao provider (adapter)
     7. Atualizar status → PROCESSING
     8. Aguardar retorno (webhook ou polling)
     9. Salvar protocolo e XML
     10. Atualizar status → AUTHORIZED ou REJECTED
   ```

3. **Implementar TaxCalculationService**
   - `calculateICMS(item, origin, destination)`: ICMS conforme UF
   - `calculateICMSST(item, mva)`: ICMS-ST com MVA
   - `calculatePISCOFINS(item, regime)`: PIS/COFINS por regime
   - `calculateISS(service, municipality)`: ISS por município
   - `calculateDIFAL(item, origin, destination)`: DIFAL interestadual
   - `determineTaxRegime(company)`: Regime tributário

4. **Implementar ValidationService**
   - Validar CNPJ/CPF (dígitos verificadores)
   - Validar IE por UF (algoritmo específico por estado)
   - Validar NCM (8 dígitos, existente na tabela)
   - Validar CFOP (4 dígitos, consistente com operação)
   - Validar totais (soma itens = total NF)

5. **Implementar error handling**
   - InvoiceValidationError: dados inválidos
   - InvoiceEmissionError: falha na emissão
   - ProviderError: falha no provider externo
   - CertificateError: certificado inválido/expirado
   - Retry logic: retentar emissão em caso de timeout

6. **Implementar eventos/hooks**
   - onInvoiceCreated: log, notificação
   - onInvoiceEmitted: atualizar pedido, contabilidade
   - onInvoiceCancelled: estornar pedido, notificar
   - onInvoiceRejected: alertar, logar motivo

## Outputs
- NFService com métodos de CRUD e operações fiscais
- TaxCalculationService com cálculos tributários
- ValidationService com validações fiscais
- Error classes específicas
- Event handlers para integração com sistema-alvo

## Acceptance Criteria
- [ ] NFService cobre criação, emissão, cancelamento, correção
- [ ] Cálculos tributários implementados (ICMS, PIS, COFINS, ISS)
- [ ] Validações fiscais (CNPJ, IE, NCM, CFOP) funcionando
- [ ] Error handling com classes específicas
- [ ] Fluxo de emissão com todos os passos orquestrados
- [ ] Eventos emitidos para integração com sistema-alvo
