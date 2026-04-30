# Task: Projetar Módulo NF para Sistema-Alvo

## Purpose
Projetar a arquitetura do módulo de notas fiscais que será integrado ao sistema-alvo, definindo componentes, fluxos e interfaces.

## Inputs
- Relatório de análise do sistema-alvo (task `analyze-target-system.md`)
- Requisitos fiscais (tipos de NF, regime tributário)
- Provider de NF escolhido (Focus, Enotas, Webmania, direto SEFAZ)
- Padrões de código do sistema-alvo

## Steps

1. **Definir escopo do módulo**
   - Tipos de NF suportados: NF-e, NFS-e, NFC-e
   - Operações: emissão, cancelamento, CC-e, consulta
   - Fluxo: manual, automático (pós-venda), batch
   - Armazenamento: XMLs, PDFs, logs

2. **Projetar camadas do módulo**
   - **Controller/Route**: Endpoints de API para NF
   - **Service**: Lógica de negócio (validação, cálculo, orquestração)
   - **Provider**: Abstração para API externa (Focus/Enotas/SEFAZ)
   - **Repository**: Persistência de NFs, eventos, logs
   - **Queue/Worker**: Processamento assíncrono (emissão, retry)

3. **Definir modelo de dados**
   - Tabela `invoices`: dados da NF (tipo, status, valores, chave)
   - Tabela `invoice_items`: itens da NF (produto, NCM, CFOP, tributos)
   - Tabela `invoice_events`: eventos (cancelamento, CC-e, manifestação)
   - Tabela `invoice_xml`: armazenamento de XMLs
   - Tabela `fiscal_config`: configurações fiscais (certificado, regime)

4. **Definir fluxo de emissão**
   ```
   Request → Validação → Cálculo tributos → Provider API → 
   Callback/Polling → Atualizar status → Notificar → Armazenar XML
   ```
   - Emissão síncrona: aguarda resposta (NFC-e)
   - Emissão assíncrona: fila + webhook de retorno (NF-e)

5. **Projetar interface com Provider**
   - Adapter pattern: interface única, múltiplas implementações
   - Interface: `emit()`, `cancel()`, `correct()`, `query()`, `download()`
   - Implementações: FocusAdapter, EnotasAdapter, WebmaniaAdapter
   - Facilitar troca de provider sem alterar lógica de negócio

6. **Definir tratamento de erros e retry**
   - Retry automático com backoff exponencial (max 3)
   - Dead letter queue para falhas persistentes
   - Alertas para falhas críticas
   - Contingência quando SEFAZ indisponível

## Outputs
- Diagrama de arquitetura do módulo NF
- Definição de camadas e responsabilidades
- Modelo de dados (entidades e relacionamentos)
- Fluxo de emissão detalhado
- Interface do provider (contrato)
- Estratégia de erros e retry

## Acceptance Criteria
- [ ] Módulo segue padrões do sistema-alvo
- [ ] Camadas separadas (controller, service, provider, repository)
- [ ] Adapter pattern para abstração de provider
- [ ] Modelo de dados cobre NF, itens, eventos, XMLs
- [ ] Fluxo síncrono e assíncrono definidos
- [ ] Tratamento de erros e retry planejados
