# Task: operations-manual

```yaml
task: operations-manual
id: FA-TASK-004
responsavel: "@franchise-documentation"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - business_operations_path: string - Path para documentacao de operacoes existentes (SOPs, checklists)
  - franchise_model_path: string - Path para modelo de franquia definido
  - brand_guidelines_path: string - Path para manual de identidade visual (opcional)
  - training_materials_path: string - Path para materiais de treinamento existentes (opcional)
  - founder_interview: string - Entrevista com fundador sobre processos criticos

Saida:
  - operations-manual-avend.md: Manual de operacoes completo da franquia
  - quick-reference-cards/: Cartoes de referencia rapida para operacoes diarias
  - sop-library/: Biblioteca de SOPs (Standard Operating Procedures)

Checklist:
  - Manual Magic 3-Step de Penny Hopkinson aplicado
  - Todos os processos criticos documentados com SOPs
  - Identidade visual e padroes de marca definidos
  - Rotina operacional diaria/semanal/mensal detalhada
  - Procedimentos de abastecimento e logistica
  - Procedimentos de manutencao preventiva e corretiva
  - Gestao financeira e controles obrigatorios
  - Procedimentos de atendimento e relacionamento com pontos
  - Gestao de estoque e mix de produtos
  - Procedimentos de emergencia e contingencia
  - Quick reference cards para operacoes frequentes
  - Glossario de termos e FAQ

veto_conditions:
  - Processos criticos nao validados pela operacao real
  - Manual sem aprovacao do franqueador
  - Ausencia de procedimentos de seguranca alimentar (ANVISA)
  - Manual que contradiz a COF ou contrato de franquia
  - Procedimentos que violam regulamentacao vigente

output_examples:
  - |
    ## Manual de Operacoes — Avend Franquias
    ### SOP-001: Abastecimento de Maquinas
    **Frequencia:** Conforme telemetria (minimo 2x/semana)
    **Tempo estimado:** 15-20 min/maquina
    **Checklist:**
    - [ ] Verificar nivel de estoque via sistema
    - [ ] Preparar carga conforme planograma
    - [ ] Higienizar compartimentos antes de abastecer
    ...
```

---

## Purpose

Criar o **Manual de Operacoes** completo da Avend Franquias, utilizando o framework **Manual Magic 3-Step** de Penny Hopkinson ("Manual Magic: How to Create the Business Manual That Your Franchisees Will Actually Use"). O manual e a espinha dorsal da replicabilidade de uma franquia — se nao esta no manual, nao existe como padrao.

**O Manual Magic 3-Step de Hopkinson:**

1. **Step 1 — Map It (Mapeie):** Identifique e mapeie todos os processos do negocio, do macro ao micro. Crie a arvore de processos que representa tudo o que o franqueado precisa saber e fazer.

2. **Step 2 — Write It (Escreva):** Documente cada processo usando linguagem clara, direta e visual. Use screenshots, fotos, diagramas. O teste: "Uma pessoa que nunca fez isso antes consegue fazer lendo o manual?"

3. **Step 3 — Manage It (Gerencie):** O manual e um documento vivo. Estabeleca processos de atualizacao, versionamento e feedback. Um manual desatualizado e pior que nenhum manual.

**Principio fundamental:** O manual de operacoes nao e um documento que voce escreve uma vez e engaveta. E o instrumento que garante que cada franqueado entrega a MESMA experiencia ao consumidor final. E a transferencia codificada do know-how do franqueador.

**Contexto Avend:** O manual deve cobrir toda a operacao de vending machines: abastecimento, manutencao, selecao e gestao de pontos, mix de produtos, higiene e seguranca alimentar (ANVISA/RDC 216), uso de sistemas de telemetria, gestao financeira basica, e relacionamento com pontos comerciais.

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `business_operations_path` | string | Sim | SOPs existentes, checklists, fluxogramas, documentacao operacional |
| `franchise_model_path` | string | Sim | Modelo de franquia: obrigacoes, padroes, territorios |
| `brand_guidelines_path` | string | Nao | Manual de marca: logotipos, cores, tipografia, aplicacoes |
| `training_materials_path` | string | Nao | Materiais de treinamento existentes para referencia cruzada |
| `founder_interview` | string | Sim | Entrevista com fundador sobre processos criticos e know-how tacito |
| `regulatory_requirements` | string | Nao | Requisitos regulatorios especificos (ANVISA, vigilancia sanitaria) |

---

## Preconditions

1. **Modelo de franquia definido**: Padronizacao, obrigacoes, limites de atuacao do franqueado.
2. **Operacao propria validada**: Processos devem ser testados em unidade propria antes de documentar.
3. **Fundador disponivel**: Para entrevista de extracao de know-how tacito.
4. **Regulamentacao mapeada**: Requisitos de ANVISA, vigilancia sanitaria, normas tecnicas.
5. **Identidade visual definida**: Pelo menos elementos basicos da marca.

---

## Key Activities & Instructions

### Step 1: Map It — Mapeamento de Processos

**1.1 — Arvore Macro de Processos**

Identificar TODOS os processos do negocio, organizados em categorias:

```
AVEND FRANQUIAS — ARVORE DE PROCESSOS
│
├── 1. OPERACAO DIARIA
│   ├── 1.1 Abastecimento de maquinas
│   ├── 1.2 Monitoramento via telemetria
│   ├── 1.3 Coleta de valores/contabilizacao
│   ├── 1.4 Higienizacao de maquinas
│   └── 1.5 Rota operacional otimizada
│
├── 2. MANUTENCAO
│   ├── 2.1 Manutencao preventiva (cronograma)
│   ├── 2.2 Manutencao corretiva (troubleshooting)
│   ├── 2.3 Gestao de pecas de reposicao
│   └── 2.4 Chamados tecnicos (quando escalar)
│
├── 3. GESTAO DE PONTOS COMERCIAIS
│   ├── 3.1 Prospecao de novos pontos
│   ├── 3.2 Negociacao com responsavel do ponto
│   ├── 3.3 Instalacao de maquina
│   ├── 3.4 Relacionamento continuo com ponto
│   └── 3.5 Desinstalacao e troca de ponto
│
├── 4. GESTAO DE PRODUTOS E ESTOQUE
│   ├── 4.1 Definicao de mix (planograma)
│   ├── 4.2 Compras e pedidos a fornecedores
│   ├── 4.3 Recebimento e conferencia
│   ├── 4.4 Armazenamento (deposito)
│   ├── 4.5 Controle de validade
│   └── 4.6 Gestao de perdas
│
├── 5. SEGURANCA ALIMENTAR E HIGIENE
│   ├── 5.1 Boas praticas de manipulacao
│   ├── 5.2 Higienizacao de equipamentos
│   ├── 5.3 Controle de temperatura
│   ├── 5.4 Rastreabilidade de produtos
│   └── 5.5 Conformidade ANVISA/RDC 216
│
├── 6. GESTAO FINANCEIRA
│   ├── 6.1 Controle de faturamento por maquina
│   ├── 6.2 Controle de custos operacionais
│   ├── 6.3 Fluxo de caixa
│   ├── 6.4 Pagamento de royalties e taxas
│   ├── 6.5 Emissao de notas fiscais
│   └── 6.6 Relatorio mensal ao franqueador
│
├── 7. MARKETING E COMUNICACAO
│   ├── 7.1 Uso da marca e identidade visual
│   ├── 7.2 Material de comunicacao no ponto
│   ├── 7.3 Redes sociais (guidelines)
│   ├── 7.4 Acoes promocionais
│   └── 7.5 Comunicacao com consumidor final
│
├── 8. TECNOLOGIA E SISTEMAS
│   ├── 8.1 Sistema de gestao (ERP/dashboard)
│   ├── 8.2 Telemetria das maquinas
│   ├── 8.3 Sistemas de pagamento (PIX, NFC, cartao)
│   ├── 8.4 App do franqueado
│   └── 8.5 Suporte tecnico de sistemas
│
├── 9. GESTAO DE PESSOAS (se aplicavel)
│   ├── 9.1 Contratacao de auxiliar operacional
│   ├── 9.2 Treinamento de equipe
│   ├── 9.3 Gestao de performance
│   └── 9.4 Conformidade trabalhista
│
└── 10. RELACAO COM O FRANQUEADOR
    ├── 10.1 Canais de comunicacao
    ├── 10.2 Reporting obrigatorio
    ├── 10.3 Auditorias e visitas
    ├── 10.4 Convencoes e treinamentos
    └── 10.5 Resolucao de problemas
```

**1.2 — Detalhamento de Cada Processo**

Para cada processo, documentar:

```yaml
process_map:
  id: "SOP-XXX"
  nome: ""
  categoria: ""
  frequencia: "" # Diaria / Semanal / Mensal / Sob demanda
  responsavel: "" # Franqueado / Auxiliar / Franqueador
  tempo_estimado: ""
  criticidade: "" # Alta / Media / Baixa
  inputs: []
  outputs: []
  ferramentas_necessarias: []
  pre_requisitos: []
  metricas_sucesso: []
  riscos: []
```

**Elicitation point:** Apresentar arvore de processos e validar com fundador — faltam processos? Algum esta incorreto?

---

### Step 2: Write It — Documentacao dos Processos

**2.1 — Formato Padrao de SOP**

Cada SOP deve seguir este formato:

```markdown
# SOP-[XXX]: [Nome do Procedimento]

**Categoria:** [Categoria]
**Versao:** [X.X]
**Data:** [DATA]
**Aprovado por:** [Nome]
**Frequencia:** [Diaria/Semanal/Mensal/Sob demanda]
**Tempo estimado:** [XX minutos]
**Responsavel:** [Quem executa]

## Objetivo
[O que este procedimento realiza e por que e importante]

## Materiais Necessarios
- [Item 1]
- [Item 2]

## Pre-Requisitos
- [Condicao 1]
- [Condicao 2]

## Procedimento Passo-a-Passo

### Passo 1: [Titulo do passo]
[Instrucao detalhada]
> **DICA:** [Dica pratica]
> **ATENCAO:** [Alerta de seguranca ou qualidade]

### Passo 2: [Titulo do passo]
[Instrucao detalhada]

[... continua ...]

## Checklist de Verificacao
- [ ] [Item de verificacao 1]
- [ ] [Item de verificacao 2]

## Troubleshooting
| Problema | Causa Provavel | Solucao |
|----------|---------------|---------|
| | | |

## Registro
[Como documentar a execucao deste procedimento]
```

**2.2 — SOPs Criticos Obrigatorios**

Os seguintes SOPs DEVEM ser criados com maximo detalhe:

**SOP-001: Abastecimento de Maquinas**
```
- Verificacao de nivel via telemetria
- Preparacao da carga no deposito
- Conferencia do planograma
- Transporte adequado dos produtos
- Abertura da maquina (protocolo de seguranca)
- Retirada de produtos vencidos/danificados
- Abastecimento conforme planograma
- Limpeza basica durante abastecimento
- Registro no sistema
- Fechamento e teste da maquina
```

**SOP-002: Manutencao Preventiva**
```
- Cronograma mensal de manutencao
- Checklist de itens a verificar
- Limpeza profunda de condensador
- Verificacao de vedacoes e borrachas
- Teste de sistemas de pagamento
- Verificacao de temperatura
- Teste de dispensamento
- Inspecao visual externa
- Registro de manutencao
- Agendamento de proxima preventiva
```

**SOP-003: Gestao de Pontos Comerciais**
```
- Criterios de selecao de ponto (fluxo, perfil, acessibilidade)
- Abordagem e negociacao com responsavel
- Modelo de contrato/acordo de parceria
- Instalacao da maquina (checklist tecnico)
- Avaliacao de performance do ponto (30/60/90 dias)
- Renegociacao ou troca de ponto
```

**SOP-004: Controle de Validade e Seguranca Alimentar**
```
- Rotina PVPS (Primeiro que Vence, Primeiro que Sai)
- Verificacao de temperaturas (maquinas refrigeradas)
- Registro de temperaturas (log)
- Procedimento para produto vencido encontrado
- Procedimento para produto danificado
- Registro de retirada e descarte
- Conformidade com RDC 216/ANVISA
```

**SOP-005: Coleta e Gestao Financeira**
```
- Frequencia de coleta de valores (moedas, notas)
- Procedimento de contagem e conferencia
- Registro no sistema financeiro
- Conciliacao com telemetria vs. coleta
- Pagamento de royalties (prazo, forma)
- Emissao de documentos fiscais
- Relatorio mensal obrigatorio
```

**SOP-006: Procedimentos de Emergencia**
```
- Maquina vandalizada/roubada
- Maquina com defeito critico (alimento preso, nao refrigera)
- Reclamacao de consumidor (produto vencido, defeituoso)
- Problema no ponto comercial (interdito, mudanca)
- Problema financeiro (inadimplencia)
- Acidente de trabalho durante operacao
```

**2.3 — Linguagem e Tom**

Seguindo Penny Hopkinson:
- Use linguagem **direta e simples** — nao academica
- Escreva como se estivesse **explicando para alguem que nunca fez isso**
- Use **verbos de acao** no imperativo: "Abra", "Verifique", "Registre"
- Inclua **dicas praticas** (Tips) para atalhos do dia-a-dia
- Inclua **alertas** (Warnings) para riscos de qualidade ou seguranca
- Use **fotos e diagramas** sempre que possivel
- Cada passo deve ter **UMA acao** — nao agrupe multiplas acoes

---

### Step 3: Manage It — Gestao do Manual

**3.1 — Versionamento**

```yaml
versioning:
  formato: "X.Y"
  major: "Mudanca significativa de processo"
  minor: "Ajuste, correcao, atualizacao de valor"
  changelog: "Manter log de todas as alteracoes"
  aprovacao: "Toda mudanca deve ser aprovada pelo franqueador"
  comunicacao: "Franqueados notificados de atualizacoes"
```

**3.2 — Ciclo de Atualizacao**

| Frequencia | Tipo de Revisao | Responsavel |
|------------|----------------|-------------|
| Mensal | Correcoes e ajustes menores | @franchise-documentation |
| Trimestral | Revisao de processos criticos | Franqueador + Consultor |
| Anual | Revisao completa do manual | Comite (franqueador + franqueados) |
| Sob demanda | Mudanca regulatoria ou operacional | Imediato |

**3.3 — Feedback Loop**

```
Franqueado usa manual → Identifica melhoria → Sugere ao franqueador
→ Franqueador avalia → Se aprovado → Atualiza manual → Comunica rede
```

**3.4 — Metricas de Efetividade do Manual**

| Metrica | Como Medir | Target |
|---------|-----------|--------|
| Taxa de consulta | Acessos ao manual digital | > 3x/semana por franqueado |
| Compliance operacional | Auditorias de campo | > 85% dos itens em conformidade |
| Tempo para autonomia | Dias ate franqueado operar sem supervisao | < 30 dias |
| NPS do manual | Pesquisa com franqueados | > 7/10 |
| Incidentes por falta de procedimento | Reports de campo | < 2/mes por franqueado |

---

### Estrutura Completa do Manual

**Capitulo 1: Boas-Vindas a Rede Avend**
- Carta do fundador
- Historia da Avend
- Missao, visao e valores
- Como usar este manual
- Glossario de termos

**Capitulo 2: A Marca Avend**
- Identidade visual (logotipo, cores, tipografia)
- Aplicacoes da marca
- O que fazer e nao fazer com a marca
- Material de comunicacao padrao

**Capitulo 3: Operacao Diaria**
- Rotina diaria do franqueado
- SOP-001: Abastecimento
- Monitoramento via telemetria
- Coleta de valores
- Checklist diario

**Capitulo 4: Manutencao de Equipamentos**
- SOP-002: Manutencao preventiva
- Troubleshooting de problemas comuns
- Quando chamar assistencia tecnica
- Gestao de pecas de reposicao

**Capitulo 5: Gestao de Pontos Comerciais**
- SOP-003: Gestao de pontos
- Criterios de selecao de ponto
- Negociacao e contrato
- Relacionamento com responsavel do ponto
- Performance e troca de ponto

**Capitulo 6: Produtos e Estoque**
- Planograma oficial
- Gestao de mix de produtos
- Compras e fornecedores homologados
- Controle de estoque e validade
- SOP-004: Seguranca alimentar

**Capitulo 7: Gestao Financeira**
- SOP-005: Controles financeiros
- DRE simplificada do franqueado
- Pagamento de royalties e taxas
- Notas fiscais e obrigacoes tributarias
- Relatorio mensal ao franqueador

**Capitulo 8: Marketing e Comunicacao**
- Uso da marca no ponto
- Acoes promocionais permitidas
- Redes sociais (guidelines)
- Material de marketing disponivel

**Capitulo 9: Tecnologia e Sistemas**
- Sistema de gestao (tutorial)
- Telemetria (como usar)
- Sistemas de pagamento
- App do franqueado

**Capitulo 10: Seguranca Alimentar e Compliance**
- ANVISA/RDC 216
- Boas praticas de manipulacao
- Controle de temperatura
- Documentacao obrigatoria
- Auditorias sanitarias

**Capitulo 11: Emergencias e Contingencias**
- SOP-006: Procedimentos de emergencia
- Contatos de emergencia
- Plano de contingencia
- Seguro e sinistros

**Capitulo 12: Relacao com o Franqueador**
- Canais de comunicacao
- Reporting obrigatorio
- Programa de excelencia
- Convencoes e eventos
- Resolucao de duvidas e problemas

**Anexos**
- Checklists de operacao (diario, semanal, mensal)
- Formularios padrao
- Contatos uteis
- FAQ — Perguntas Frequentes

---

## Validation

### Criterios de Qualidade do Manual

| Criterio | Requisito | Verificacao |
|----------|-----------|-------------|
| Completude | Todos os processos mapeados e documentados | [ ] |
| Clareza | Linguagem acessivel, passo-a-passo claro | [ ] |
| Praticidade | Manual utilizavel no dia-a-dia | [ ] |
| Visual | Formatacao profissional, facil navegacao | [ ] |
| Compliance | ANVISA, Lei de Franquias, normas setoriais | [ ] |
| Validacao | Testado com operador real | [ ] |
| Atualizacao | Processo de atualizacao definido | [ ] |
| Coerencia | Alinhado com COF e contrato | [ ] |
| SOPs criticos | Todos os 6 SOPs obrigatorios criados | [ ] |
| Quick reference | Cartoes de referencia rapida disponiveis | [ ] |

### Checklist de Entrega

- [ ] `operations-manual-avend.md` gerado
- [ ] Quick reference cards criados
- [ ] Biblioteca de SOPs criada (minimo 6 SOPs criticos)
- [ ] Arvore de processos completa (Step 1: Map It)
- [ ] SOPs detalhados com passo-a-passo (Step 2: Write It)
- [ ] Processo de atualizacao definido (Step 3: Manage It)
- [ ] Rotina diaria/semanal/mensal documentada
- [ ] Procedimentos de emergencia incluidos
- [ ] Conformidade ANVISA/RDC 216 abordada
- [ ] Manual validado pelo franqueador

---

## References

- **Hopkinson, Penny.** "Manual Magic: How to Create the Business Manual That Your Franchisees Will Actually Use." Franchise Magic Press.
- **Hopkinson, Penny.** "The Franchisor's Guide to Systems and Operations Manuals."
- **ANVISA — RDC 216/2004.** Regulamento Tecnico de Boas Praticas para Servicos de Alimentacao.
- **ABF.** "Manual do Franqueador: Guia Pratico."
- **Siebert, Mark.** "Franchise Your Business." Entrepreneur Press, 2016.
- **Cherto, Marcelo.** "Como Organizar sua Empresa para Franquear." Editora Senac.
- **E-Myth (Michael Gerber).** "The E-Myth Revisited." — Principios de sistematizacao.

---

*Task version 1.0.0 — Squad Franchising Avend — FA-TASK-004*
