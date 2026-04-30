# Task: Diagnosticar e Tratar Rejeição SEFAZ

## Purpose
Diagnosticar código de rejeição retornado pela SEFAZ, identificar a causa raiz e sugerir correção específica.

## Inputs
- Código de rejeição (cStat)
- Motivo da rejeição (xMotivo)
- XML enviado que foi rejeitado
- Dados da NF-e/NFC-e
- UF de origem

## Steps

1. **Classificar tipo de rejeição**
   - **2xx**: Rejeições de schema/estrutura
   - **3xx**: Rejeições de regra de validação
   - **4xx**: Rejeições de certificado/assinatura
   - **5xx**: Rejeições de negócio/dados
   - **6xx-9xx**: Rejeições específicas

2. **Diagnosticar rejeições comuns**
   - **204**: Duplicidade de NF-e (chave já existe)
     - Verificar se NF já foi autorizada → consultar protocolo
   - **233**: CNPJ destinatário inválido
     - Validar CNPJ no cadastro da RF
   - **301**: IE irregular no CADESP/cadastro estadual
     - Verificar situação cadastral da IE
   - **302**: IE destinatário não informada
     - Incluir IE quando destinatário é contribuinte
   - **539**: Duplicidade de NF (número + série já existe)
     - Usar próximo número disponível
   - **600-699**: Rejeições de ICMS-ST
     - Verificar MVA, CEST, alíquota interna
   - **704**: NFC-e com erro no QR Code
     - Recalcular hash do QR Code com CSC

3. **Mapear causa raiz**
   - Comparar dados do XML com regras de validação
   - Identificar campo específico com erro
   - Verificar se é erro de dados, cálculo ou formatação

4. **Sugerir correção**
   - Gerar instrução específica para corrigir o campo
   - Indicar referência na legislação/MOC quando aplicável
   - Priorizar correção automática quando possível

5. **Aplicar correção e reenviar**
   - Corrigir o XML conforme diagnóstico
   - Revalidar XML contra schema XSD
   - Reenviar à SEFAZ
   - Se persistir: escalar para análise manual

6. **Registrar histórico**
   - Logar rejeição, diagnóstico e correção aplicada
   - Alimentar base de conhecimento de rejeições
   - Identificar padrões recorrentes

## Outputs
- Diagnóstico da rejeição (causa raiz)
- Campo específico com erro identificado
- Instrução de correção
- XML corrigido (quando correção automática possível)
- Log de rejeição e resolução

## Acceptance Criteria
- [ ] Código de rejeição mapeado para causa raiz
- [ ] Campo específico com erro identificado
- [ ] Sugestão de correção clara e acionável
- [ ] Rejeições comuns (204, 233, 301, 302, 539) tratadas automaticamente
- [ ] Histórico de rejeições registrado
- [ ] Reenvio após correção com sucesso
