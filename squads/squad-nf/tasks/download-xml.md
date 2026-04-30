# Task: Download de XMLs via Distribuição DF-e

## Purpose
Baixar XMLs de NF-e emitidas contra o CNPJ (como destinatário) utilizando o serviço de Distribuição de DF-e da SEFAZ.

## Inputs
- CNPJ do interessado (destinatário)
- Tipo de consulta (por NSU, por chave, por período)
- Último NSU processado (para consulta incremental)
- Chave de acesso específica (para consulta pontual)
- Certificado digital A1

## Steps

1. **Configurar acesso ao serviço**
   - Endpoint: NFeDistribuicaoDFe (Ambiente Nacional — AN)
   - URL produção: `https://www1.nfe.fazenda.gov.br/NFeDistribuicaoDFe/NFeDistribuicaoDFe.asmx`
   - Autenticação via certificado A1
   - Protocolo SOAP 1.2

2. **Consultar por NSU (incremental)**
   - Enviar distNSU com ultNSU (último NSU processado)
   - Retorna lote de até 50 documentos por consulta
   - Cada documento tem um NSU único e sequencial
   - Repetir consulta até maxNSU = ultNSU (sem mais documentos)

3. **Consultar por chave de acesso**
   - Enviar consChNFe com chave de 44 dígitos
   - Retorna XML completo da NF-e especificada
   - Útil para buscar NF específica

4. **Processar documentos recebidos**
   - Tipos de documento retornados:
     - **resNFe**: Resumo da NF-e (dados básicos)
     - **procNFe**: NF-e completa com protocolo
     - **resEvento**: Resumo de evento
     - **procEventoNFe**: Evento completo
   - Descompactar (documentos vêm em GZIP)
   - Salvar XMLs no sistema local

5. **Manifestar ciência (quando necessário)**
   - Para obter XML completo, pode ser necessário manifestar ciência
   - Executar task `manifest-recipient.md` com evento 210210
   - Após ciência: XML completo disponível na próxima consulta

6. **Armazenar e indexar**
   - Salvar XMLs organizados por período (AAAAMM)
   - Indexar por: chave, CNPJ emitente, data, valor
   - Atualizar último NSU processado para próxima consulta
   - Manter log de downloads

## Outputs
- XMLs de NF-e baixados e armazenados
- Último NSU processado atualizado
- Resumo de NFs recebidas (quantidade, valores)
- Log de download com status de cada documento

## Acceptance Criteria
- [ ] Conexão com NFeDistribuicaoDFe estabelecida
- [ ] Consulta incremental por NSU funcionando
- [ ] Documentos descompactados (GZIP) corretamente
- [ ] XMLs completos armazenados e indexados
- [ ] Último NSU persistido para continuidade
- [ ] Manifestação de ciência executada quando necessário
