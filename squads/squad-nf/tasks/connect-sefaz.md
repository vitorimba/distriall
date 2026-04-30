# Task: Configurar Conexão com Web Service SEFAZ

## Purpose
Configurar e estabelecer conexão com os web services da SEFAZ para transmissão de NF-e/NFC-e, utilizando certificado digital e endpoints corretos.

## Inputs
- Certificado digital A1 (.pfx)
- Senha do certificado
- UF do emitente
- Ambiente (1=Produção, 2=Homologação)
- Modelo (55=NF-e, 65=NFC-e)

## Steps

1. **Identificar web services da UF**
   - Consultar tabela de endpoints por UF e ambiente:
     - SEFAZ Autorizadora: SP, MG, RS, BA, PR, GO, MT, MS, PE
     - SVAN (Virtual Ambiente Nacional): demais estados NF-e
     - SVRS (Virtual RS): demais estados NFC-e
   - Serviços principais:
     - NfeAutorizacao (envio)
     - NfeRetAutorizacao (consulta retorno)
     - NfeConsultaProtocolo (consulta por chave)
     - NfeStatusServico (status do serviço)
     - RecepcaoEvento (cancelamento, CC-e, manifestação)
     - NfeInutilizacao (inutilização)

2. **Configurar certificado digital**
   - Carregar certificado A1 do arquivo .pfx
   - Validar validade (não expirado)
   - Extrair chave privada e certificado público
   - Configurar cadeia de certificação (ICP-Brasil)

3. **Configurar conexão SOAP/REST**
   - Montar URL do web service conforme UF + ambiente
   - Configurar TLS 1.2 (mínimo)
   - Configurar timeout de conexão (padrão: 30s)
   - Configurar timeout de leitura (padrão: 60s)
   - Incluir certificado no handshake SSL

4. **Testar conexão**
   - Executar NfeStatusServico (status do serviço)
   - Verificar retorno: cStat 107 = Serviço em operação
   - Se timeout: verificar firewall, proxy, DNS
   - Se erro SSL: verificar certificado e cadeia

5. **Configurar retry e fallback**
   - Retry automático: 3 tentativas com backoff exponencial
   - Fallback para contingência se timeout persistente
   - Log de todas as tentativas de conexão

## Outputs
- Conexão configurada e testada
- URL dos web services por serviço
- Status do serviço SEFAZ (cStat)
- Configuração de timeout e retry
- Log de teste de conexão

## Acceptance Criteria
- [ ] Endpoints corretos para UF e ambiente
- [ ] Certificado A1 válido e carregado
- [ ] TLS 1.2+ configurado
- [ ] NfeStatusServico retornando cStat 107
- [ ] Retry e timeout configurados
- [ ] Fallback para contingência preparado
