# Task: franchisee-screening

```yaml
task: franchisee-screening
id: FA-TASK-003
responsavel: "@franchise-growth"
responsavel_type: agent
atomic_layer: L4-Runtime
status: active
version: "1.0.0"
execution_type: Agent
elicit: true

Entrada:
  - candidate_profile: string - Perfil do candidato a franqueado (formulario preenchido)
  - franchise_model_path: string - Path para modelo de franquia (taxas, territorio, requisitos)
  - screening_criteria_path: string - Path para criterios de selecao customizados (opcional)
  - cof_path: string - Path para COF vigente

Saida:
  - candidate-assessment-report.md: Relatorio de avaliacao do candidato
  - screening-scorecard.md: Scorecard com pontuacao em cada dimensao
  - interview-guide.md: Roteiro de entrevista para candidatos pre-aprovados

Checklist:
  - Formulario de pre-qualificacao aplicado
  - Capacidade financeira verificada
  - Perfil comportamental avaliado (DISC ou similar)
  - Motivacoes e expectativas alinhadas
  - Due diligence basica realizada (credito, restricoes)
  - Scorecard consolidado com recomendacao GO/NO-GO
  - Roteiro de entrevista preparado para proxima fase
  - Compliance com Lei 13.966/2019 verificado
  - Red flags documentados e avaliados
  - Fit com cultura da rede avaliado

veto_conditions:
  - Candidato com restricoes financeiras graves (SPC/Serasa)
  - Expectativa de renda passiva total (sem envolvimento operacional)
  - Candidato com litigios contra franqueadores anteriores
  - Capacidade financeira insuficiente para investimento + capital de giro
  - Candidato nao aceita regras e padronizacao da rede

output_examples:
  - |
    ## Screening Report — Candidato: Joao Silva
    | Dimensao | Nota (1-10) | Status |
    |----------|-------------|--------|
    | Financeira | 8 | PASS |
    | Comportamental | 7 | PASS |
    | Alinhamento | 9 | PASS |
    | Disponibilidade | 6 | WATCH |
    **Score Final: 7.5/10 — PRE-APROVADO (prosseguir para entrevista)**
```

---

## Purpose

Realizar o screening (triagem e qualificacao) de candidatos a franqueados da Avend Franquias, utilizando um processo estruturado e multi-dimensional que avalia capacidade financeira, perfil comportamental, alinhamento com a marca e disponibilidade operacional.

O screening de franqueados e um dos processos mais criticos para a saude de uma rede de franquias. **Escolher o franqueado errado custa mais do que nao vender uma franquia.** Os custos de um franqueado inadequado incluem: suporte excessivo, conflitos, litigios, dano reputacional a marca, e impacto negativo em outros franqueados.

**Principio fundamental (Greg Nathan):** "O sucesso de uma franquia depende 50% do modelo e 50% da pessoa que opera." Um modelo perfeito nas maos erradas fracassa. Um modelo bom nas maos certas prospera.

**Contexto Avend:** A Avend opera microfranquias de vending machines (~R$50k investimento). O perfil do franqueado ideal e alguem que busca renda complementar ou semi-passiva, com capacidade financeira adequada, disciplina operacional e disposicao para seguir processos padronizados. Nao e necessario experiencia previa em vending, mas disciplina e organizacao sao essenciais.

---

## Inputs

| Input | Tipo | Obrigatorio | Descricao |
|-------|------|-------------|-----------|
| `candidate_profile` | string | Sim | Formulario de pre-qualificacao preenchido pelo candidato |
| `franchise_model_path` | string | Sim | Modelo de franquia com taxas, investimento, territorio, requisitos |
| `screening_criteria_path` | string | Nao | Criterios customizados de selecao (pesos, limiares) |
| `cof_path` | string | Sim | COF vigente para referencia de informacoes ao candidato |
| `existing_franchisees_data` | string | Nao | Dados de franqueados de sucesso para pattern matching |
| `territory_availability` | string | Nao | Territorios disponiveis para alocacao |

---

## Preconditions

1. **Modelo de franquia definido**: Investimento, taxas, territorio, perfil ideal — tudo precisa estar claro.
2. **COF vigente**: A COF deve estar pronta para entrega ao candidato pre-aprovado.
3. **Formulario de pre-qualificacao**: Template de formulario deve existir ou ser criado.
4. **Criterios de selecao**: Minimo de criterios deve estar definido (ou usar defaults da task).
5. **Processo de compliance**: Entender os limites legais do screening (LGPD, discriminacao).

---

## Key Activities & Instructions

### Phase 1: Design do Processo de Screening

**1.1 — Funil de Qualificacao**

O processo de screening segue um funil de 5 estagios:

```
┌─────────────────────────────────────────────┐
│  ESTAGIO 1: Lead / Interesse Inicial        │  100% dos leads
│  - Formulario online / contato inicial       │
│  - Qualificacao basica automatica            │
├─────────────────────────────────────────────┤
│  ESTAGIO 2: Pre-Qualificacao                │  ~40-50% avancam
│  - Formulario detalhado                      │
│  - Verificacao financeira basica             │
│  - Analise de motivacao                      │
├─────────────────────────────────────────────┤
│  ESTAGIO 3: Entrevista de Profundidade      │  ~25-30% avancam
│  - Entrevista estruturada (60-90 min)        │
│  - Avaliacao comportamental                  │
│  - Alinhamento de expectativas               │
├─────────────────────────────────────────────┤
│  ESTAGIO 4: Due Diligence & Validacao       │  ~15-20% avancam
│  - Consulta SPC/Serasa                       │
│  - Validacao de referencias                  │
│  - Visita a unidade (Discovery Day)          │
├─────────────────────────────────────────────┤
│  ESTAGIO 5: Decisao Final                   │  ~10-15% aprovados
│  - Comite de aprovacao                       │
│  - Entrega da COF                            │
│  - Periodo de reflexao (10 dias legais)      │
│  - Assinatura do contrato                    │
└─────────────────────────────────────────────┘
```

**1.2 — Metricas do Funil**

| Metrica | Target | Formula |
|---------|--------|---------|
| Taxa de conversao lead→pre-qualificacao | 40-50% | Pre-qualificados / Total leads |
| Taxa de conversao pre-qual→entrevista | 50-60% | Entrevistados / Pre-qualificados |
| Taxa de conversao entrevista→due diligence | 60-70% | Due diligence / Entrevistados |
| Taxa de conversao due diligence→aprovacao | 70-80% | Aprovados / Due diligence |
| Taxa de conversao total | 10-15% | Aprovados / Total leads |
| Tempo medio do funil | 30-45 dias | Data aprovacao - Data lead |

---

### Phase 2: Estagio 1 — Lead e Interesse Inicial

**2.1 — Formulario de Primeiro Contato**

Formulario curto (5-8 campos) para captura inicial:

```yaml
lead_form:
  nome_completo: ""
  email: ""
  telefone: ""
  cidade_uf: ""
  investimento_disponivel: "" # Faixa: Ate R$30k / R$30-50k / R$50-80k / R$80k+
  como_conheceu: "" # ABF / Google / Indicacao / Feira / Redes sociais / Outro
  motivacao_resumida: "" # Por que se interessa por franquia de vending machines?
  disponibilidade_contato: "" # Melhor horario para contato
```

**2.2 — Qualificacao Automatica (Knockout Criteria)**

Criterios que eliminam automaticamente:

| Criterio | Condicao de Eliminacao | Justificativa |
|----------|----------------------|---------------|
| Investimento | < R$30k disponivel | Insuficiente para modelo Avend |
| Localizacao | Regiao sem cobertura | Sem suporte logistico |
| Idade | < 18 anos | Incapacidade civil |

**Se o candidato passa nos knockout criteria, avanca para Estagio 2.**

---

### Phase 3: Estagio 2 — Pre-Qualificacao

**3.1 — Formulario de Pre-Qualificacao Detalhado**

```yaml
pre_qualification_form:
  dados_pessoais:
    nome_completo: ""
    cpf: ""
    data_nascimento: ""
    estado_civil: ""
    escolaridade: ""
    profissao_atual: ""
    endereco_completo: ""

  situacao_financeira:
    renda_mensal_atual: ""
    patrimonio_liquido_estimado: ""
    capital_disponivel_para_investimento: ""
    fonte_do_capital: "" # Poupanca / Emprestimo / FGTS / Venda de bem / Investidor
    possui_imovel_proprio: true/false
    possui_restricao_credito: true/false
    dependentes_financeiros: 0

  experiencia_profissional:
    experiencia_como_empresario: true/false
    detalhes_experiencia_empresarial: ""
    experiencia_em_franquias: true/false
    detalhes_experiencia_franquias: ""
    experiencia_em_vending_ou_food: true/false
    areas_de_expertise: []

  motivacao_e_expectativas:
    por_que_franquia: ""
    por_que_vending_machines: ""
    por_que_avend: ""
    expectativa_de_retorno_mensal: ""
    expectativa_de_payback: ""
    dedicacao_pretendida: "" # Integral / Parcial / Apenas gestao
    operacao_propria_ou_funcionario: ""

  disponibilidade:
    disponibilidade_para_treinamento: "" # Periodo e local
    data_pretendida_inicio: ""
    regiao_de_interesse: ""
    quantidade_maquinas_interesse: ""
    pretende_expandir_futuro: true/false

  referencias:
    referencia_profissional_1: {nome: "", telefone: "", relacao: ""}
    referencia_profissional_2: {nome: "", telefone: "", relacao: ""}
    referencia_pessoal: {nome: "", telefone: "", relacao: ""}
```

**3.2 — Analise de Pre-Qualificacao**

Avaliar o formulario em 4 dimensoes:

**Dimensao 1: Capacidade Financeira (Peso: 30%)**

| Criterio | Nota 1-10 | Evidencia |
|----------|-----------|-----------|
| Capital disponivel vs. investimento necessario | | |
| Fonte do capital (proprio vs. emprestado) | | |
| Reserva financeira alem do investimento | | |
| Renda alternativa durante payback | | |
| Historico de credito | | |
| Capacidade de absorver cenario pessimista | | |

**Score minimo para avancar: 6/10**

**Red flags financeiros:**
- 100% do capital vem de emprestimo
- Investimento representa > 80% do patrimonio liquido
- Sem renda alternativa durante fase de maturacao
- Expectativa de retorno irreal (< 6 meses payback)

**Dimensao 2: Perfil Comportamental (Peso: 25%)**

| Criterio | Nota 1-10 | Evidencia |
|----------|-----------|-----------|
| Disciplina e organizacao | | |
| Capacidade de seguir processos | | |
| Orientacao a resultados | | |
| Resiliencia e tolerancia a frustracao | | |
| Habilidade interpessoal | | |
| Perfil empreendedor vs. empregado | | |

**Score minimo para avancar: 5/10 (sera aprofundado na entrevista)**

**Dimensao 3: Alinhamento com a Marca (Peso: 25%)**

| Criterio | Nota 1-10 | Evidencia |
|----------|-----------|-----------|
| Motivacao autentica (nao apenas financeira) | | |
| Entendimento do modelo de negocio | | |
| Expectativas realistas | | |
| Aceitacao de padronizacao e regras | | |
| Visao de longo prazo (nao oportunista) | | |
| Fit com cultura da rede Avend | | |

**Score minimo para avancar: 6/10**

**Red flags de alinhamento:**
- Candidato quer "fazer do seu jeito" e nao aceita padronizacao
- Motivacao puramente financeira sem interesse no segmento
- Expectativa de renda 100% passiva (nao quer se envolver)
- Historico de conflitos com empregadores/parceiros

**Dimensao 4: Disponibilidade e Logistica (Peso: 20%)**

| Criterio | Nota 1-10 | Evidencia |
|----------|-----------|-----------|
| Disponibilidade de tempo para operacao | | |
| Proximidade geografica da area de atuacao | | |
| Disponibilidade para treinamento | | |
| Suporte familiar para o empreendimento | | |
| Capacidade logistica (veiculo, etc.) | | |

**Score minimo para avancar: 5/10**

**3.3 — Scorecard de Pre-Qualificacao**

```
============================================================
  SCORECARD DE PRE-QUALIFICACAO — [NOME DO CANDIDATO]
  Data: [DATA]
============================================================

| Dimensao | Peso | Nota (1-10) | Ponderado |
|----------|------|-------------|-----------|
| Financeira | 30% | ___/10 | ___ |
| Comportamental | 25% | ___/10 | ___ |
| Alinhamento | 25% | ___/10 | ___ |
| Disponibilidade | 20% | ___/10 | ___ |
| **TOTAL PONDERADO** | | | **___/10** |

RESULTADO: [ PRE-APROVADO | EM ANALISE | REPROVADO ]
============================================================
```

| Score | Resultado | Acao |
|-------|-----------|------|
| >= 7.0 | PRE-APROVADO | Agendar entrevista de profundidade |
| 5.0-6.9 | EM ANALISE | Solicitar informacoes adicionais, considerar entrevista |
| < 5.0 | REPROVADO | Agradecer e comunicar decisao com profissionalismo |

**Elicitation point:** Apresentar scorecard e pedir validacao antes de prosseguir.

---

### Phase 4: Estagio 3 — Entrevista de Profundidade

**4.1 — Preparacao da Entrevista**

```yaml
interview_setup:
  formato: "Presencial ou videoconferencia"
  duracao: "60-90 minutos"
  participantes:
    franqueador: "Responsavel comercial + consultor de campo"
    candidato: "Candidato (e conjuge/socio, se aplicavel)"
  materiais:
    - Formulario de pre-qualificacao preenchido
    - Scorecard de pre-qualificacao
    - Apresentacao institucional da Avend
    - Roteiro de entrevista
    - Formulario de avaliacao pos-entrevista
```

**4.2 — Roteiro de Entrevista Estruturada**

**Bloco 1: Rapport e Contexto (10 min)**

```
1. Conte-me sobre voce e sua trajetoria profissional.
2. Como voce conheceu a Avend Franquias?
3. O que despertou seu interesse em vending machines?
```

**Bloco 2: Motivacao e Expectativas (15 min)**

```
4. Por que voce esta considerando uma franquia neste momento da sua vida?
5. Quais sao suas expectativas financeiras? Em quanto tempo espera ter retorno?
6. Voce entende que vending machines exigem operacao regular (abastecimento,
   manutencao, gestao de pontos)? Como pretende organizar isso?
7. Voce pretende operar pessoalmente ou contratar alguem? Por que?
8. Se o resultado nos primeiros 6 meses for abaixo do esperado, como reagiria?
9. Voce ja investiu em algum negocio que nao deu certo? O que aprendeu?
```

**Bloco 3: Capacidade Operacional (15 min)**

```
10. Descreva sua rotina atual. Quanto tempo poderia dedicar a operacao?
11. Voce tem veiculo para rota de abastecimento? (essencial para vending)
12. Como voce lidaria com uma maquina quebrada em horario comercial?
13. Voce tem experiencia com gestao financeira (controle de fluxo de caixa,
    estoque, margem)?
14. Como voce reage quando precisa seguir um procedimento padronizado
    que nao concorda 100%?
```

**Bloco 4: Alinhamento com a Rede (10 min)**

```
15. O que voce sabe sobre o modelo Avend? (testar se fez homework)
16. Voce entende que como franqueado, existem regras e padroes que devem
    ser seguidos? Como se sente em relacao a isso?
17. Voce ja participou de alguma rede (franquia, cooperativa, associacao)?
    Como foi a experiencia?
18. Qual seria sua reacao se a rede mudasse o mix de produtos ou
    fornecedores? Voce seguiria a orientacao?
```

**Bloco 5: Situacao Financeira (10 min)**

```
19. Vamos falar sobre numeros. Quanto capital voce tem disponivel hoje?
20. Este capital e 100% proprio ou envolve emprestimo? Qual a composicao?
21. Voce tem renda de outras fontes enquanto o negocio matura?
22. Sua familia (conjuge) apoia esta decisao financeiramente e emocionalmente?
23. Alem do investimento inicial, voce teria reserva para os primeiros
    meses de operacao?
```

**Bloco 6: Visao de Futuro (10 min)**

```
24. Onde voce se ve daqui a 3 anos com esta franquia?
25. Voce teria interesse em expandir (mais maquinas, mais territorios)?
26. O que "sucesso" significa para voce neste empreendimento?
27. Voce tem alguma duvida ou preocupacao sobre o modelo?
```

**4.3 — Avaliacao Pos-Entrevista**

Avaliar imediatamente apos a entrevista:

```yaml
post_interview_assessment:
  impressao_geral: "" # 1-10
  comunicacao: "" # Clareza, articulacao, escuta
  autenticidade: "" # Genuinidade das respostas
  preparacao: "" # Candidato fez homework sobre a Avend?
  maturidade: "" # Emocional e profissional
  red_flags_identificados: []
  green_flags_identificados: []
  recomendacao: "" # AVANCAR / REVISAR / REPROVAR
  notas_adicionais: ""
```

---

### Phase 5: Estagio 4 — Due Diligence e Validacao

**5.1 — Consultas de Credito e Background**

| Verificacao | Fonte | Status | Resultado |
|-------------|-------|--------|-----------|
| SPC/Serasa | Servico de credito | [ ] | |
| Protestos | Cartorio de protestos | [ ] | |
| Processos judiciais | TJ/TRT | [ ] | |
| Situacao CPF | Receita Federal | [ ] | |
| Restricoes bancarias | BACEN/SCR | [ ] | |

**IMPORTANTE (LGPD):** Toda consulta deve ter consentimento expresso do candidato. Coletar autorizacao por escrito antes de qualquer verificacao.

**5.2 — Verificacao de Referencias**

```yaml
reference_check:
  referencia_1:
    nome: ""
    relacao: ""
    tempo_conhecimento: ""
    pontos_fortes: ""
    pontos_atencao: ""
    recomendaria: true/false
    nota: ""

  referencia_2:
    nome: ""
    relacao: ""
    # ... mesmos campos
```

**Perguntas para referencias:**
1. Ha quanto tempo conhece [candidato]?
2. Como descreveria o perfil profissional dele?
3. Ele e uma pessoa que cumpre compromissos e prazos?
4. Como ele reage sob pressao?
5. Voce o recomendaria como parceiro de negocios?

**5.3 — Discovery Day (Dia de Descoberta)**

```yaml
discovery_day:
  formato: "Visita guiada a unidade + conversa com franqueado ativo"
  duracao: "4-6 horas"
  atividades:
    - Tour pela operacao de um franqueado
    - Acompanhamento de rota de abastecimento
    - Conversa aberta com franqueado ativo
    - Demonstracao do sistema de gestao
    - Apresentacao detalhada do modelo financeiro
    - Q&A final
  objetivo: "Candidato vivencia a realidade da operacao antes de decidir"
```

**O Discovery Day e bidirecional:** O candidato avalia se quer entrar E o franqueador avalia o candidato em ambiente real.

---

### Phase 6: Estagio 5 — Decisao Final

**6.1 — Comite de Aprovacao**

```yaml
approval_committee:
  participantes:
    - Diretor comercial/expansao
    - Consultor de campo regional
    - Fundador (para primeiras unidades)
  criterios:
    - Score final >= 7.0
    - Sem red flags nao resolvidos
    - Capacidade financeira confirmada
    - Due diligence limpa
    - Discovery Day positivo
  decisoes:
    - APROVADO: Prosseguir com entrega de COF
    - APROVADO COM CONDICOES: Definir condicoes antes da COF
    - REPROVADO: Comunicar decisao profissionalmente
    - LISTA DE ESPERA: Candidato bom mas sem territorio disponivel
```

**6.2 — Comunicacao de Resultado**

**Se APROVADO:**
```
- Parabenizar candidato
- Agendar entrega formal da COF
- Explicar proximos passos e prazos legais
- Confirmar territorio disponivel
- Iniciar processo de documentacao
```

**Se REPROVADO:**
```
- Comunicar com respeito e profissionalismo
- Nao detalhar razoes especificas (risco legal)
- Agradecer o interesse
- Sugerir alternativas se possivel
- Manter porta aberta para futuro (se aplicavel)
```

**6.3 — Entrega da COF e Periodo Legal**

```yaml
cof_delivery:
  prazo_legal: "Minimo 10 dias antes de qualquer assinatura ou pagamento"
  prazo_recomendado: "15-20 dias"
  procedimento:
    - Agendar entrega presencial ou envio registrado
    - Candidato assina Termo de Recebimento
    - Registrar data de entrega
    - Manter copia do Termo assinado
    - Aguardar prazo legal sem pressionar
    - Disponibilizar-se para duvidas durante o prazo
    - Facilitar contato com franqueados da lista da COF
```

---

### Phase 7: Perfil Ideal Avend — Pattern Matching

**7.1 — Perfil do Franqueado de Sucesso Avend**

Baseado em dados da rede, os franqueados mais bem-sucedidos compartilham:

```yaml
ideal_profile_avend:
  demografico:
    idade: "28-55 anos"
    escolaridade: "Ensino medio completo ou superior"
    estado_civil: "Casado/uniao estavel (suporte familiar)"
    localizacao: "Proximo a area de operacao"

  financeiro:
    capital_disponivel: ">= R$60k (investimento + reserva)"
    fonte_capital: "Predominantemente proprio (>60%)"
    renda_alternativa: "Sim, nos primeiros 6-12 meses"
    patrimonio: "Investimento < 50% do patrimonio"

  comportamental:
    perfil_disc: "D (Dominante) ou C (Consciencioso)"
    caracteristicas:
      - Disciplinado e organizado
      - Segue processos sem reinventar
      - Proativo na resolucao de problemas
      - Bom relacionamento interpessoal (para pontos comerciais)
      - Orientado a numeros e resultados
      - Tolerante a rotina operacional

  operacional:
    dedicacao: "10-20h/semana (semi-passiva)"
    veiculo_proprio: "Sim (essencial para rota)"
    disponibilidade_treinamento: "Sim, dedicacao exclusiva no periodo"
    experiencia_gestao: "Desejavel, nao obrigatoria"

  motivacao:
    busca_renda_complementar: true
    entende_que_nao_e_100_passiva: true
    visao_de_longo_prazo: true
    aceita_padronizacao: true
    interesse_em_expansao: "Desejavel"
```

**7.2 — Red Flags Criticos**

| Red Flag | Severidade | Acao |
|----------|-----------|------|
| Busca renda 100% passiva | CRITICO | Reprovar |
| Nao aceita padronizacao/regras | CRITICO | Reprovar |
| Capital 100% emprestado | ALTO | Avaliar com cuidado |
| Historico de conflitos com franqueadores | CRITICO | Reprovar |
| Expectativa de payback < 6 meses | ALTO | Alinhar expectativas |
| Nao tem veiculo para rota | MEDIO | Verificar plano |
| Candidato nao fez nenhum homework | MEDIO | Avaliar na entrevista |
| Pressao para fechar rapido | ALTO | Red flag de impulsividade |
| Conjuge/familia contra | ALTO | Risco de desistencia |
| Quer modificar o modelo | CRITICO | Reprovar |

**7.3 — Green Flags**

| Green Flag | Peso |
|-----------|------|
| Ja e cliente/consumidor de vending machines | Alto |
| Tem experiencia operacional em outro negocio | Alto |
| Pesquisou o mercado e a Avend antes | Alto |
| Fez perguntas inteligentes sobre unit economics | Medio |
| Fez contato com franqueados existentes | Alto |
| Tem plano B financeiro para cenario pessimista | Medio |
| Familia apoia ativamente | Medio |
| Interesse genuino no segmento (nao so financeiro) | Alto |

---

## Validation

### Criterios de Qualidade do Screening

| Criterio | Requisito | Verificacao |
|----------|-----------|-------------|
| Processo completo | Todas as 5 fases aplicadas | [ ] |
| Scorecard preenchido | Todas as 4 dimensoes pontuadas | [ ] |
| Entrevista estruturada | Roteiro seguido, notas registradas | [ ] |
| Due diligence realizada | Credito, referencias, background | [ ] |
| LGPD respeitada | Consentimento para consultas obtido | [ ] |
| Red flags documentados | Todos identificados e avaliados | [ ] |
| Compliance legal | Lei 13.966 respeitada (prazo COF) | [ ] |
| Comunicacao profissional | Resultado comunicado com respeito | [ ] |
| Documentacao completa | Todos os formularios preenchidos | [ ] |
| Decisao justificada | Recomendacao com evidencias | [ ] |

### Checklist de Entrega

- [ ] `candidate-assessment-report.md` gerado
- [ ] `screening-scorecard.md` gerado
- [ ] `interview-guide.md` gerado
- [ ] Formulario de pre-qualificacao aplicado
- [ ] Scorecard com todas as dimensoes pontuadas
- [ ] Entrevista realizada e avaliada
- [ ] Due diligence basica concluida
- [ ] Red flags e green flags documentados
- [ ] Recomendacao final emitida (GO/NO-GO)
- [ ] Proximos passos definidos

---

## References

- **Nathan, Greg.** "The Franchise E-Factor: Understanding and Improving the All-Important Franchise Relationship." Franchise Relationships Institute, 2008.
- **Nathan, Greg.** "Profitable Partnerships: Improve Your Franchise Relationships and Change Your Life." Franchise Relationships Institute, 2000.
- **Siebert, Mark.** "Franchise Your Business." Entrepreneur Press, 2016.
- **ABF.** "Guia de Selecao de Franqueados." Associacao Brasileira de Franchising.
- **Lei 13.966/2019** — Protecao do candidato a franqueado (disclosure).
- **LGPD (Lei 13.709/2018)** — Protecao de dados pessoais dos candidatos.
- **Bradach, Jeffrey.** "Franchise Organizations." Harvard Business School Press.
- **Cherto, Marcelo.** "Franchising: Revolucao no Marketing."

---

*Task version 1.0.0 — Squad Franchising Avend — FA-TASK-003*
