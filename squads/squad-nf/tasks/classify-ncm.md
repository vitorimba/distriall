# Task: Classificar NCM (Método Cerqueira 6 Passos)

## Purpose
Classificar mercadorias na NCM (Nomenclatura Comum do Mercosul) utilizando o método sistemático de 6 passos de Cerqueira.

## Inputs
- Descrição detalhada do produto
- Composição/material do produto
- Função/uso do produto
- Processo de fabricação (quando relevante)
- Setor/indústria de aplicação

## Steps

1. **Passo 1 — Identificar a natureza do produto**
   - Determinar se é: matéria-prima, produto intermediário, produto acabado
   - Identificar material predominante (metal, plástico, têxtil, etc.)
   - Classificar como: animal, vegetal, mineral, químico, manufaturado

2. **Passo 2 — Localizar a Seção (I a XXI)**
   - NCM possui 21 Seções organizadas por natureza/origem:
     - I-IV: Animal, Vegetal, Gorduras, Alimentícios
     - V-VII: Mineral, Químico, Plástico/Borracha
     - VIII-XII: Couro, Madeira, Papel, Têxtil
     - XIII-XV: Pedra/Cerâmica, Pérolas, Metais
     - XVI-XVIII: Máquinas, Transporte, Instrumentos
     - XIX-XXI: Armas, Mercadorias diversas, Objetos de arte

3. **Passo 3 — Identificar o Capítulo (01 a 99)**
   - Dentro da Seção, localizar o capítulo específico
   - Ler Notas de Seção e Notas de Capítulo (vinculantes)
   - Capítulo 99: reservado para uso especial

4. **Passo 4 — Selecionar a Posição (4 dígitos)**
   - Nível do Sistema Harmonizado (SH)
   - Aplicar Regras Gerais de Interpretação (RGI 1 a 6):
     - RGI 1: Títulos das Seções/Capítulos são indicativos
     - RGI 2a: Produto incompleto/desmontado
     - RGI 2b: Misturas e combinações
     - RGI 3: Duas ou mais posições possíveis
     - RGI 4: Posição mais específica
     - RGI 5: Embalagens
     - RGI 6: Subposições

5. **Passo 5 — Determinar a Subposição (6 dígitos)**
   - Primeiro e segundo nível de desdobramento
   - Aplicar RGI 6 (mesmos princípios para subposições)
   - Nível harmonizado internacionalmente

6. **Passo 6 — Completar o Item e Subitem (8 dígitos)**
   - Dígitos 7 e 8: específicos do Mercosul (NCM)
   - Consultar TEC (Tarifa Externa Comum) para desdobramentos
   - Validar NCM completo com 8 dígitos

## Outputs
- Código NCM completo (8 dígitos: XXXX.XX.XX)
- Descrição oficial da NCM
- Seção e Capítulo identificados
- Alíquota IPI vinculada (TIPI)
- Ex-tarifário (quando aplicável)
- Justificativa da classificação (RGI aplicadas)

## Acceptance Criteria
- [ ] 6 passos de Cerqueira seguidos na sequência correta
- [ ] Notas de Seção e Capítulo consultadas
- [ ] RGI aplicadas quando mais de uma posição possível
- [ ] NCM com 8 dígitos válidos
- [ ] Descrição oficial corresponde ao produto
- [ ] Alíquota IPI (TIPI) identificada para o NCM
