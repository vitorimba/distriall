# Task: Gerenciar Certificado Digital A1

## Purpose
Importar, validar e monitorar certificado digital A1 (ICP-Brasil) utilizado na assinatura e transmissão de documentos fiscais.

## Inputs
- Arquivo do certificado (.pfx ou .p12)
- Senha do certificado
- CNPJ vinculado ao certificado
- Data de aquisição

## Steps

1. **Importar certificado**
   - Ler arquivo .pfx/.p12 com a senha informada
   - Extrair certificado X.509 (público)
   - Extrair chave privada RSA
   - Validar que é certificado tipo A1 (armazenamento em software)
   - Armazenar de forma segura (criptografado em repouso)

2. **Validar certificado**
   - Verificar cadeia de certificação (ICP-Brasil)
   - Confirmar AC (Autoridade Certificadora) válida
   - Verificar se não está revogado (consulta CRL/OCSP)
   - Confirmar CNPJ do certificado = CNPJ do emitente
   - Verificar algoritmo (RSA 2048+ bits)

3. **Verificar validade**
   - Extrair data de início (notBefore) e fim (notAfter)
   - Certificado A1: validade máxima de 1 ano
   - Calcular dias restantes até expiração
   - Classificar status:
     - Verde: > 60 dias para expirar
     - Amarelo: 30-60 dias para expirar
     - Vermelho: < 30 dias para expirar
     - Expirado: certificado inválido

4. **Configurar alertas de expiração**
   - Alerta 90 dias antes: planejar renovação
   - Alerta 60 dias antes: iniciar processo de compra
   - Alerta 30 dias antes: urgente, certificado próximo do vencimento
   - Alerta 7 dias antes: crítico, operações podem parar

5. **Testar assinatura**
   - Assinar XML de teste com o certificado
   - Validar assinatura gerada (SHA-256/RSA)
   - Confirmar que SEFAZ aceita o certificado (NfeStatusServico)

6. **Documentar informações**
   - AC emissora
   - Data de emissão e expiração
   - CNPJ vinculado
   - Responsável pela renovação
   - Histórico de certificados anteriores

## Outputs
- Certificado importado e validado
- Status de validade (dias restantes)
- Cadeia de certificação verificada
- Alertas configurados
- Resultado do teste de assinatura

## Acceptance Criteria
- [ ] Certificado A1 importado e chave privada extraída
- [ ] Cadeia ICP-Brasil validada
- [ ] CNPJ do certificado confere com emitente
- [ ] Status de validade classificado (verde/amarelo/vermelho)
- [ ] Alertas de expiração configurados (90, 60, 30, 7 dias)
- [ ] Teste de assinatura bem-sucedido
