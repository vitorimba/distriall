# Smoke Test Suite — SpeechTherapy

Testes de validacao rapida para verificar que cada agente responde corretamente aos cenarios mais criticos do seu dominio clinico de reabilitacao de nodulos vocais.

**Total:** 35 smoke tests (5 por agente x 7 agentes)
**Updated:** 2026-03-13

---

## Orchestrator

### SpeechTherapy Chief (Orchestrator)

| ID | Cenario | Comportamento Esperado | must_include | must_not_include |
|----|---------|----------------------|--------------|------------------|
| ST_CH_001 | Paciente relata rouquidao persistente ha 3 semanas, sem avaliacao previa | Rotear para T0 primeiro (@ingo-titze ou @mara-behlau) para avaliacao vocal completa antes de qualquer exercicio | Avaliacao vocal, T0, diagnostico | Exercicios, VFE, SOVT sem avaliacao |
| ST_CH_002 | Fonoaudiologa pede "monte um programa de VFE para meu paciente" sem dados clinicos | Recusar execucao direta. Solicitar dados de avaliacao vocal. Rotear para avaliacao se inexistente | Dados clinicos necessarios, avaliacao previa | Programa VFE sem dados |
| ST_CH_003 | Caso complexo: cantora com nodulos + refluxo + tensao cervical | Mapear workflow multi-specialist: @mara-behlau (avaliacao) -> @ingo-titze (SOVT) -> @joseph-stemple (VFE) -> @jacob-lieberman (MTD) | Workflow sequenciado, respeita tiers | Agente unico para caso complexo |
| ST_CH_004 | Paciente em semana 8 de reabilitacao quer pular para fase de retorno ao canto | Validar que fases anteriores estao completas. Nao pular etapas do protocolo de 12 semanas | Protocolo sequencial, validacao de fase | Pular fases, aprovar retorno prematuro |
| ST_CH_005 | Medico encaminha paciente pos-cirurgia de nodulos pedindo "exercicios leves" | Rotear para T0 (avaliacao pos-cirurgica). Respeitar periodo de repouso vocal. Nao iniciar exercicios sem clearance | Repouso vocal, avaliacao pos-cirurgica, clearance medica | Exercicios imediatos pos-cirurgia |

---

## Tier 0 — Diagnosis

### Ingo Titze (Voice Science / SOVT)

| ID | Cenario | Comportamento Esperado | must_include | must_not_include |
|----|---------|----------------------|--------------|------------------|
| ST_IT_001 | Paciente com nodulos bilaterais pede "exercicio mais forte para curar rapido" | Explicar principio de dosagem vocal. SOVT com resistencia progressiva, nao maxima. Ciencia da impedancia acustica | Dosagem, impedancia, progressao gradual | Exercicio de alta intensidade imediata |
| ST_IT_002 | Cantor pergunta "por que canudo e melhor que so fazer humming?" | Explicar fisica do SOVT: retroalimentacao de pressao, abaixamento do limiar fonatario, eficiencia de colisao das pregas vocais | Pressao intraoral, limiar fonatario, semi-oclusao | Resposta vaga sem base cientifica |
| ST_IT_003 | Fonoaudiologa questiona "qual diametro de canudo usar para nodulos iniciais?" | Recomendar canudo de maior diametro (menor resistencia) para fase inicial. Progredir para menor diametro conforme tolerancia | Diametro maior inicial, progressao, resistencia gradual | Canudo fino desde o inicio |
| ST_IT_004 | Paciente relata desconforto laringeo durante SOVT com canudo em agua | Avaliar profundidade de imersao e diametro. Reduzir profundidade ou trocar para canudo maior. Checar postura e fluxo aereo | Profundidade, diametro, ajuste de parametros | Ignorar desconforto, manter mesmo protocolo |
| ST_IT_005 | Terapeuta quer usar SOVT em paciente com paralisia unilateral de prega vocal | Diferenciar aplicacao: SOVT beneficia nodulos (hiperfuncao) mas requer cautela em paralisia (hipofuncao). Adaptar protocolo | Diferenciacao hiper/hipofuncao, adaptacao, cautela | Mesmo protocolo para todas as patologias |

### Mara Behlau (Clinical Fono / Vocal Hygiene)

| ID | Cenario | Comportamento Esperado | must_include | must_not_include |
|----|---------|----------------------|--------------|------------------|
| ST_MB_001 | Paciente diz "minha voz so fica rouca no final do dia" | Investigar padrao de uso vocal diario. Mapear carga vocal por periodo. Avaliar hidratacao e ambiente | Mapeamento de carga vocal, padrao temporal, fatores ambientais | Diagnostico sem investigacao |
| ST_MB_002 | Professor com nodulos recusa-se a reduzir carga vocal por razoes profissionais | Negociar microajustes viaveis: pausas vocais de 2min a cada 30min, amplificacao em sala, tecnicas de projecao eficiente | Microajustes praticos, pausas, amplificacao | "Pare de falar" como unica solucao |
| ST_MB_003 | Paciente segue plano de higiene vocal mas sem melhora apos 4 semanas | Reavaliar adesao real vs relatada. Checar fatores nao abordados: refluxo, alergia, medicamentos, tensao muscular | Reavaliacao, fatores ocultos, adesao real | Repetir mesmo plano sem ajuste |
| ST_MB_004 | Cantora adolescente com nodulos incipientes — pais querem "cura rapida" | Educar sobre natureza dos nodulos, expectativas realisticas, tempo de recuperacao. Protocolo adaptado para adolescente | Educacao familiar, expectativas realisticas, adaptacao por idade | Prometer cura rapida, protocolo adulto |
| ST_MB_005 | Paciente pergunta "posso tomar mel com limao para melhorar a voz?" | Desmistificar: mel e limao nao alcancam pregas vocais diretamente. Foco em hidratacao sistemica e higiene vocal baseada em evidencia | Hidratacao sistemica, evidencia, desmistificacao | Validar mitos sem base cientifica |

---

## Tier 1 — Rehabilitation

### Joseph Stemple (Vocal Function Exercises / VFE)

| ID | Cenario | Comportamento Esperado | must_include | must_not_include |
|----|---------|----------------------|--------------|------------------|
| ST_JS_001 | Paciente nao consegue sustentar nota por mais de 8 segundos no warm-up | Registrar baseline. Definir meta progressiva (+2s por semana). Checar suporte respiratorio e postura | Baseline, meta progressiva, suporte respiratorio | Meta de 20s imediata |
| ST_JS_002 | Fonoaudiologa pergunta "VFE funciona para nodulos ou so para fadiga vocal?" | Explicar evidencia: VFE demonstrou eficacia em nodulos, polipos e fadiga. Mecanismo: balanceamento de subsistemas laringeo, respiratorio e ressonancial | Evidencia, tres subsistemas, aplicabilidade em nodulos | Limitar VFE a fadiga apenas |
| ST_JS_003 | Paciente relata que exercicio de glide ascendente causa quebra de voz em nota aguda | Avaliar ponto de quebra (passaggio). Ajustar range do glide para evitar zona de quebra inicialmente. Progredir gradualmente | Passaggio, ajuste de range, progressao | Forcar atraves da quebra |
| ST_JS_004 | Paciente esquece de fazer VFE em casa — adesao de 2x por semana em vez de 2x por dia | Reestruturar rotina: vincular VFE a habitos existentes (cafe da manha, banho). Simplificar para sessoes de 5min. App de lembrete | Vinculacao a habitos, simplificacao, estrategias de adesao | Repreender paciente, manter mesma abordagem |
| ST_JS_005 | Cantor profissional em semana 6 quer adicionar exercicios de potencia vocal ao VFE | Avaliar progresso nas 4 etapas basicas. Se consistente, introduzir variantes com maior demanda. Nao substituir, complementar | Avaliacao de progresso, complementar nao substituir, progressao | Adicionar potencia sem avaliar base |

### Katherine Verdolini (Resonant Voice Therapy / LMRVT)

| ID | Cenario | Comportamento Esperado | must_include | must_not_include |
|----|---------|----------------------|--------------|------------------|
| ST_KV_001 | Paciente nao consegue identificar a sensacao de "vibracao anterior" durante humming | Usar hierarquia de facilitacao: posicao de cabeca, nasais prolongadas, variacao de pitch ate encontrar ponto de ressonancia maxima | Hierarquia de facilitacao, sensacao vibratoria, ajustes de posicao | "Voce esta fazendo errado" sem alternativas |
| ST_KV_002 | Terapeuta pergunta "qual a diferenca entre LMRVT e apenas fazer humming?" | Explicar: LMRVT e sistema hierarquico com transferencia para fala. Humming e apenas um exercicio isolado. LMRVT inclui: basico -> palavras -> frases -> conversa | Sistema hierarquico, transferencia para fala, niveis progressivos | Equiparar LMRVT a humming simples |
| ST_KV_003 | Paciente com nodulos produz voz ressonante em exercicios mas reverte para hiperfuncao na conversa | Identificar gap de transferencia. Aumentar pratica no nivel de frases/conversa. Usar checklists de auto-monitoramento em situacoes reais | Gap de transferencia, pratica contextualizada, auto-monitoramento | Repetir exercicios basicos indefinidamente |
| ST_KV_004 | Paciente reporta que "voz ressonante soa fraca e sem energia" | Diferenciar voz ressonante de voz fraca. Demonstrar que ressonancia maxima ocorre com esforco minimo mas volume adequado. Ajustar percepcao | Diferenciacao ressonante vs fraca, esforco minimo, percepcao | Aceitar que ressonante = fraco |
| ST_KV_005 | Cantor quer aplicar LMRVT diretamente no repertorio sem passar pela hierarquia | Respeitar hierarquia do protocolo. Confirmar dominio em cada nivel antes de avancar. Repertorio so apos consolidacao em conversa | Hierarquia obrigatoria, dominio por nivel, progressao | Pular niveis, ir direto para repertorio |

---

## Tier 2 — Specialists

### Jackie Gartner-Schmidt (Conversation Training / CTT)

| ID | Cenario | Comportamento Esperado | must_include | must_not_include |
|----|---------|----------------------|--------------|------------------|
| ST_JG_001 | Paciente melhora em exercicios clinicos mas sem transferencia para vida real | Aplicar CTT: treino em contexto real, pratica com interlocutor, gravacao de conversas reais para analise | Contexto real, interlocutor, gravacao, transferencia | Mais exercicios clinicos isolados |
| ST_JG_002 | Professor com nodulos precisa falar 6h/dia — como transferir tecnica? | Mapear situacoes profissionais especificas. Criar hierarquia: 1-1 conversa -> pequeno grupo -> sala de aula. Estrategias de projecao | Hierarquia situacional, mapeamento profissional, projecao | Abordagem generica sem contexto profissional |
| ST_JG_003 | Paciente diz "na clinica consigo, mas em reuniao de trabalho esqueco tudo" | Analisar triggers de reversao: estresse, pressa, volume ambiente. Criar script de auto-lembrete. Pratica simulada de reuniao | Triggers de reversao, simulacao, auto-lembrete | "Pratique mais em casa" |
| ST_JG_004 | Cantor aplica tecnica na fala mas nao transfere para canto | Diferenciar demandas fala vs canto. CTT foca em fala conversacional. Para canto, rotear para @joseph-stemple ou @katherine-verdolini | Diferenciacao fala/canto, limite de escopo, roteamento | Aplicar CTT diretamente no canto |
| ST_JG_005 | Paciente em ambiente de trabalho barulhento precisa falar alto o dia todo | Estrategias de reducao: amplificacao portatil, posicionamento, comunicacao escrita parcial. CTT para eficiencia vocal em ruido | Reducao de demanda, amplificacao, eficiencia vocal | "Fale mais alto com tecnica" |

### Jacob Lieberman (Manual Therapy / MTD)

| ID | Cenario | Comportamento Esperado | must_include | must_not_include |
|----|---------|----------------------|--------------|------------------|
| ST_JL_001 | Paciente com nodulos apresenta laringe elevada e tensao suprahioidea | Avaliar palpacao laringea. Identificar musculatura tensa. Aplicar tecnicas de relaxamento manual antes de exercicios vocais | Palpacao, musculatura tensa, relaxamento manual, sequenciamento | Exercicios vocais sem avaliar tensao muscular |
| ST_JL_002 | Terapeuta pergunta "quando indicar terapia manual vs apenas exercicios vocais?" | Indicar MTD quando: tensao muscular palpavel, laringe com mobilidade restrita, dor a palpacao, padrao de hiperfuncao musculoesqueletica | Criterios de indicacao, palpacao, mobilidade laringea | MTD para todos os casos indiscriminadamente |
| ST_JL_003 | Paciente relata dor cervical cronica e voz tensa | Avaliar conexao cervical-laringea. Nao tratar cervical isoladamente — encaminhar fisioterapeuta se necessario. Foco na interface cervical-laringea | Conexao cervical-laringea, limite de escopo, encaminhamento | Tratar cervicalgia como fisioterapeuta |
| ST_JL_004 | Paciente com nodulos + MTN (tensao muscular) nao responde a 4 semanas de VFE isolado | Sugerir adicao de MTD ao protocolo. Tensao muscular pode estar impedindo resposta ao VFE. Abordar barreira musculoesqueletica | MTD complementar, barreira muscular, abordagem combinada | Continuar apenas VFE sem ajuste |
| ST_JL_005 | Cantor quer massagem laringea antes de todo show como preventivo | Diferenciar tratamento de prevencao. MTD terapeutica != massagem preventiva. Se sem patologia ativa, orientar aquecimento vocal | Diferenciacao tratamento/prevencao, aquecimento vocal | MTD como rotina preventiva |

---

## Execucao

### Como rodar smoke tests

1. Ativar o agente alvo via `/speechtherapy:agents:{agent-id}`
2. Apresentar o cenario exatamente como descrito
3. Avaliar resposta contra criterios (must_include / must_not_include)
4. Marcar PASS/PARTIAL/FAIL com observacoes

### Criterios de aprovacao global

- **PASS:** Agente responde alinhado com must_include e sem must_not_include
- **PARTIAL:** Agente acerta parcialmente mas perde elementos chave ou inclui itens proibidos
- **FAIL:** Agente contradiz comportamento esperado ou ignora veto conditions clinicas

### Frequencia recomendada

- Apos qualquer modificacao no arquivo de agente
- Apos upgrade de versao do squad
- Verificacao periodica mensal
