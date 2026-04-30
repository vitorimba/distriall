# Task: Preparar EFD-Contribuições

## Purpose
Guiar a geração da EFD-Contribuições (PIS/COFINS e Contribuição Previdenciária sobre Receita), garantindo apuração correta dos créditos e débitos.

## Inputs
- Período de apuração (mês/ano)
- NFs de saída (receitas) do período
- NFs de entrada (créditos) do período
- Regime de apuração (cumulativo/não-cumulativo)
- Dados cadastrais da empresa

## Steps

1. **Preparar dados cadastrais (Bloco 0)**
   - Registro 0000: Abertura e identificação
   - Registro 0100: Dados do contabilista
   - Registro 0110: Regime de apuração (cumulativo, não-cumulativo, ambos)
   - Registro 0140: Tabela de estabelecimentos
   - Registro 0150: Participantes
   - Registro 0200: Tabela de itens

2. **Escriturar receitas — Bloco A (Serviços)**
   - Registro A100: NFS-e emitidas e recebidas
   - Registro A170: Itens do documento de serviço
   - CST PIS/COFINS para cada item

3. **Escriturar receitas — Bloco C (Mercadorias)**
   - Registro C100: NF-e de saída
   - Registro C170: Itens com CST PIS/COFINS
   - Registro C190: Consolidação
   - Registro C800: NFC-e (quando aplicável)

4. **Escriturar créditos (Não-cumulativo)**
   - Bloco C (entradas): NF-e de compra com direito a crédito
   - Créditos permitidos:
     - Bens para revenda
     - Insumos da produção/prestação de serviço
     - Energia elétrica
     - Aluguéis
     - Depreciação de máquinas/equipamentos
     - Frete sobre vendas
   - CST de crédito: 50-66

5. **Apurar PIS e COFINS (Bloco M)**
   - Registro M100: Crédito de PIS apurado
   - Registro M200: Consolidação PIS (débito - crédito = a recolher)
   - Registro M500: Crédito de COFINS apurado
   - Registro M600: Consolidação COFINS
   - Tratar produtos monofásicos (alíquota zero na revenda)
   - Tratar receitas isentas/não tributadas

6. **Validar e transmitir**
   - Importar no PVA da EFD-Contribuições
   - Validar arquivo (erros e advertências)
   - Corrigir erros impeditivos
   - Assinar com certificado digital
   - Transmitir via ReceitaNet

## Outputs
- Arquivo EFD-Contribuições (.txt) conforme layout
- Relatório de validação
- Resumo: PIS a recolher, COFINS a recolher, créditos apurados
- Recibo de transmissão

## Acceptance Criteria
- [ ] Regime de apuração correto (cumulativo/não-cumulativo)
- [ ] Receitas escrituradas nos Blocos A e C
- [ ] Créditos apurados corretamente (não-cumulativo)
- [ ] Bloco M com consolidação PIS e COFINS
- [ ] Produtos monofásicos com CST correto (alíquota zero)
- [ ] Validação PVA sem erros impeditivos
