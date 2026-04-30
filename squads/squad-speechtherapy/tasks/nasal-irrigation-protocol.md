# Task: nasal-irrigation-protocol

> **Command:** `*nasal-irrigation-protocol {patient_name}`
> **Agent:** Worker (protocolo padronizado de execucao diaria)
> **Purpose:** Protocolo de lavagem nasal e manejo de secrecao para pacientes com secrecao nasal sobre pregas vocais, incluindo rotina de irrigacao salina, metas de hidratacao e controle de umidade ambiental

---

## Overview

A presenca de secrecao nasal sobre as pregas vocais compromete a vibracao mucosa, aumenta o esforco fonatorio e agrava lesoes existentes como nodulos. O manejo adequado da secrecao nasal e um pilar fundamental da reabilitacao vocal.

Este protocolo aborda tres frentes complementares:

1. **Irrigacao nasal salina** — limpeza mecanica das cavidades nasais e reducao do gotejamento pos-nasal
2. **Hidratacao sistemica e de superficie** — manutencao da viscosidade adequada do muco laringeo
3. **Controle ambiental** — umidade, qualidade do ar e reducao de irritantes

A irrigacao nasal e um procedimento seguro, de baixo custo e com forte evidencia para reducao de secrecao pos-nasal, melhora da respiracao nasal e otimizacao das condicoes das vias aereas superiores para fonacao.

**Contexto clinico:** Cantora com nodulos vocais bilaterais e secrecao nasal visivel sobre pregas vocais na laringoscopia.

---

## Input

| Parameter | Required | Description |
|-----------|----------|-------------|
| `patient_name` | Yes | Nome completo para identificacao no prontuario |
| `--secretion-type` | Yes | Tipo de secrecao: `thin_clear` (serosa), `thick_white` (mucosa), `thick_yellow` (mucopurulenta) |
| `--allergy-history` | No | Historico alergico: `rhinitis`, `sinusitis`, `asthma`, `none` |
| `--medications` | No | Medicamentos em uso (especialmente anti-histaminicos, descongestionantes, corticoides nasais) |
| `--gerd` | No | Presenca de refluxo gastroesofagico/laringofaringeo: `true`/`false` |
| `--environment` | No | Ambiente principal: `air_conditioned`, `dusty`, `humid`, `dry` |

---

## Preconditions

- Avaliacao vocal completa realizada (task: `vocal-assessment`)
- Laringoscopia documentando presenca de secrecao nasal sobre pregas vocais
- Avaliacao otorrinolaringologica descartando sinusite aguda bacteriana
- Paciente sem historico de cirurgia nasal nos ultimos 6 meses
- Paciente sem epistaxe (sangramento nasal) recorrente nao investigada
- Paciente orientado sobre o procedimento e consentindo com a pratica

---

## Execution Steps

### Fase 1: Educacao do Paciente (Primeira Sessao)

```
EDUCACAO — POR QUE A LAVAGEM NASAL IMPORTA PARA A VOZ:

1. O muco nasal e natural e protetor
   - Filtra particulas, umidifica o ar inspirado
   - Problema: excesso de muco ou muco espesso escorre para laringe

2. Gotejamento pos-nasal sobre pregas vocais:
   - Aumenta massa das pregas → voz mais grave e rouca
   - Provoca pigarro reflexo → trauma adicional nos nodulos
   - Altera vibracao mucosa → soprosidade e irregularidade

3. A irrigacao nasal:
   - Remove mecanicamente o excesso de muco
   - Reduz carga de alergenos e irritantes
   - Melhora o transporte mucociliar
   - Diminui necessidade de pigarro

4. Hidratacao sistemica:
   - Muco desidratado = muco espesso = mais aderente
   - Agua adequada = muco fluido = facil eliminacao
   - Meta: urina clara como indicador de hidratacao

"A lavagem nasal e como escovar os dentes —
 simples, diaria, e faz toda a diferenca."
```

---

### Fase 2: Tecnica de Irrigacao Nasal

```
MATERIAIS NECESSARIOS:

Opcao A — Squeeze bottle (preferencial):
  - Frasco squeeze nasal de 240 mL (NeilMed, Nasoclean ou similar)
  - Sachets de solucao salina isotonica (0.9%)
  - OU preparo caseiro: 240 mL agua filtrada/fervida +
    1 colher de cha rasa de sal (nao-iodado) +
    1/2 colher de cha rasa de bicarbonato de sodio

Opcao B — Seringa (alternativa):
  - Seringa de 20 mL sem agulha
  - Mesma solucao salina

Opcao C — Irrigador nasal eletrico:
  - Dispositivos tipo Waterpik Nasal ou SinuPulse
  - Seguir instrucoes do fabricante para concentracao salina

NUNCA USAR:
  - Agua da torneira sem ferver/filtrar (risco de infeccao)
  - Solucao hipertonica sem prescricao (pode irritar mucosa)
  - Agua destilada pura sem sal (causa ardencia)
```

```
TECNICA DE IRRIGACAO — PASSO A PASSO:

PREPARACAO:
1. Lavar as maos com agua e sabao
2. Preparar solucao salina em temperatura morna (36-38°C)
   — Testar no pulso: deve estar confortavel, nao quente
3. Preencher o frasco com 240 mL de solucao

POSICIONAMENTO:
4. Posicionar-se sobre uma pia ou bacia
5. Inclinar a cabeca para frente (45 graus) — queixo em direcao ao peito
6. Girar levemente a cabeca para o lado (orelha em direcao ao ombro)
   — NAO inclinar para tras

IRRIGACAO:
7. Inserir o bico do frasco na narina superior (a que esta mais alta)
8. Manter a boca ABERTA (respirar pela boca durante todo o procedimento)
9. Apertar o frasco suavemente — fluxo constante
10. A solucao deve sair pela outra narina
    — Se sair pela boca, inclinar mais a cabeca para frente
11. Usar metade do frasco (120 mL) em cada narina

POS-IRRIGACAO:
12. Assoar o nariz SUAVEMENTE — uma narina de cada vez
    — NUNCA assoar com forca (risco de otite)
13. Inclinar cabeca para frente e girar lado a lado
    — Permite drenagem de solucao residual
14. Esperar 5 minutos antes de usar spray nasal (se prescrito)

LIMPEZA DO EQUIPAMENTO:
15. Lavar frasco com agua quente e sabao neutro
16. Enxaguar bem e deixar secar ao ar
17. Trocar frasco a cada 3 meses
18. Nao compartilhar frasco com outras pessoas
```

```
FREQUENCIA DE IRRIGACAO:

Fase aguda (primeiras 4 semanas — secrecao visivel na laringoscopia):
  - 2x ao dia: manha (ao acordar) + noite (antes de dormir)
  - Adicionar 3a lavagem se exposicao a irritantes (poeira, ar condicionado)

Fase de manutencao (apos melhora da secrecao):
  - 1x ao dia: manha
  - Aumentar para 2x em dias de maior exposicao ambiental

Fase de prevencao (apos alta):
  - 1x ao dia ou em dias alternados
  - Manter indefinidamente se historico de rinite alergica

TIMING EM RELACAO AOS EXERCICIOS VOCAIS:
  - SEMPRE irrigar ANTES dos exercicios vocais (minimo 15 min antes)
  - Permite vias aereas limpas para fonacao otima
  - Nao irrigar imediatamente apos exercicios (esperar 30 min)
```

---

### Fase 3: Protocolo de Hidratacao

```
HIDRATACAO SISTEMICA — METAS DIARIAS:

Meta geral: 2.0–3.0 L de liquidos por dia
  - Peso < 60 kg: 2.0 L/dia
  - Peso 60-80 kg: 2.5 L/dia
  - Peso > 80 kg: 3.0 L/dia
  - Adicionar 500 mL em dias de exercicio fisico ou calor

Distribuicao ao longo do dia:
  - Ao acordar: 500 mL (temperatura ambiente ou morna)
  - Manha: 500 mL (entre cafe e almoco)
  - Tarde: 500-750 mL
  - Noite: 500 mL (ate 2h antes de dormir para evitar nocturia)
  - Durante exercicios vocais: goles pequenos frequentes

Liquidos recomendados:
  + Agua (principal)
  + Cha de ervas sem cafeina (camomila, erva-cidreira)
  + Agua com frutas (limao, pepino — sem acucar)
  + Agua de coco (moderacao — contem potassio)

Liquidos a EVITAR ou LIMITAR:
  - Cafe: maximo 2 xicaras/dia (efeito diuretico e secante)
  - Cha preto/verde: maximo 2 xicaras/dia
  - Refrigerantes: evitar (carbonatacao, acucar, cafeina)
  - Alcool: evitar durante reabilitacao (desidrata e irrita)
  - Leite/laticeos: nao causam muco, mas PODEM espessar secrecao
    existente em pacientes sensiveis — observar individualmente

Indicadores de hidratacao adequada:
  - Urina: cor palha clara (amarelo claro)
  - Urina escura/concentrada = desidratacao = aumentar ingesta
  - Frequencia urinaria: 6-8x/dia e normal
```

```
HIDRATACAO DE SUPERFICIE (LARINGEA):

Inalacao de vapor:
  - 10 minutos, 2x ao dia (manha e noite)
  - Agua quente em recipiente + toalha sobre a cabeca
  - OU inalador pessoal (nebulizador com soro fisiologico)
  - Temperatura: vapor confortavel — NAO queimar
  - Nao adicionar oleos essenciais (eucalipto, menta)
    sem prescricao — podem irritar mucosa laringea

Nebulizacao com soro fisiologico:
  - 5 mL de soro fisiologico 0.9%
  - Nebulizar por 10-15 minutos
  - 1-2x ao dia
  - Preferir nebulizacao ultrassonica (particulas menores,
    alcancam laringe)

Sprays nasais salinos (complementar):
  - Spray nasal de solucao salina: 2 jatos em cada narina
  - Usar entre irrigacoes para manter umidade
  - Seguro para uso frequente (nao causa dependencia)
```

---

### Fase 4: Controle Ambiental

```
UMIDADE DO AMBIENTE:

Meta: 40-60% de umidade relativa do ar

Ambientes secos (< 30% umidade):
  - Usar umidificador no quarto (durante o sono)
  - Tipo ultrasonico preferencial (silencioso)
  - Limpar umidificador semanalmente (prevenir mofo/bacterias)
  - Trocar agua diariamente

Ar condicionado:
  - Ar condicionado RESSECA o ar significativamente
  - Se inevitavel: posicionar umidificador no mesmo ambiente
  - Manter recipiente com agua no quarto
  - Evitar fluxo direto de ar no rosto/garganta
  - Limpar filtros mensalmente (acumulo de poeira e fungos)

Aquecedores no inverno:
  - Mesma orientacao do ar condicionado
  - Preferir aquecedores a oleo (ressecam menos)
  - Evitar aquecedores de ar (ressecam muito)

IRRITANTES AMBIENTAIS A EVITAR:
  - Fumaca (tabaco, incenso, velas aromaticas, churrasco)
  - Poeira excessiva (limpeza com pano umido, nao vassoura)
  - Produtos quimicos volateis (tintas, solventes, produtos de limpeza)
  - Perfumes fortes e aerossois
  - Mofo (manter ambientes ventilados)

CONTEXTO DE IGREJA/CULTO:
  - Verificar sistema de ar condicionado do templo
  - Se ar muito seco: levar garrafa de agua + spray nasal salino
  - Evitar posicao direta sob saida de ar condicionado
  - Se incenso e usado no culto: sentar longe da fonte
  - Aquecimento vocal no local pode compensar ar seco
```

---

### Fase 5: Manejo de Secrecao Espessa (Muco Viscoso)

```
PROTOCOLO PARA SECRECAO ESPESSA:

Se secrecao e espessa (thick_white ou thick_yellow):

1. Aumentar hidratacao em 500 mL/dia alem da meta base
2. Irrigacao nasal: aumentar para 3x/dia por 7 dias
3. Inalacao de vapor: aumentar para 3x/dia por 7 dias
4. Mucolifico natural:
   - Guaifenesina (Mucinex/equivalente): 400 mg 2x/dia
     — SOMENTE com prescricao medica
   - Aumenta volume e reduz viscosidade do muco
   — MANTER hidratacao elevada (guaifenesina sem agua = ineficaz)

5. Se secrecao amarela/esverdeada persistente > 10 dias:
   → Encaminhar ORL para avaliacao de sinusite
   → Pode necessitar tratamento com antibiotico ou corticoide nasal

PIGARRO — ESTRATEGIA DE SUBSTITUICAO:

O pigarro e o INIMIGO dos nodulos.
Cada pigarro = impacto violento das pregas vocais.

Substituicoes para o pigarro:
  1. Engolir com forca (deglutition method)
  2. Gole de agua
  3. "Aspiracao silenciosa" — inspiracao rapida pelo nariz
  4. Fonacao breve em /h/ suave ("hmmm" sussurrado)
  5. Bocejo silencioso

Tecnica de eliminacao gradual:
  - Semana 1: Contar pigarros/dia (consciencia)
  - Semana 2: Substituir 50% por alternativas
  - Semana 3: Substituir 80%
  - Semana 4: Meta zero pigarros

"Cada vez que voce limpa a garganta,
 voce esta batendo seus nodulos um contra o outro.
 A agua faz o mesmo trabalho, sem machucar."
```

---

### Fase 6: Manejo de Alergias e Refluxo (Comorbidades)

```
RINITE ALERGICA — PROTOCOLO COMPLEMENTAR:

Se diagnostico de rinite alergica confirmado:
  1. Corticoide nasal topico (prescricao medica):
     - Mometasona ou fluticasona: 2 jatos/narina 1x/dia
     - Usar APOS irrigacao nasal (nao antes)
     - Esperar 15 min apos irrigacao para aplicar
     - Efeito pleno em 2-4 semanas

  2. Anti-histaminico (se necessario):
     - Preferir 2a geracao (loratadina, cetirizina)
       — MENOS ressecamento que 1a geracao
     - EVITAR difenidramina, clorfeniramina (1a geracao)
       — Ressecam mucosa laringea significativamente
     - Compensar com hidratacao extra se anti-histaminico necessario

  3. Medidas ambientais alergicas:
     - Capa antiacaro no colchao e travesseiro
     - Lavar roupas de cama semanalmente em agua quente
     - Evitar cortinas pesadas e carpetes
     - Manter janelas fechadas em dias de alta polinizacao

REFLUXO LARINGOFARINGEO (LPR):

Se GERD/LPR confirmado ou suspeito:
  - Referir para gastroenterologista
  - Nao deitar por 2-3 horas apos refeicoes
  - Elevar cabeceira da cama 15 cm
  - Evitar: cafe, chocolate, menta, alimentos acidos,
    frituras, bebidas gasosas, alcool
  - Irrigacao nasal NAO trata refluxo — complementar apenas
  - LPR nao tratado compromete reabilitacao dos nodulos

VETO: Se secrecao e predominantemente de refluxo (nao nasal),
irrigacao nasal isolada sera INSUFICIENTE.
Tratamento do refluxo e OBRIGATORIO concomitantemente.
```

---

## Output

### Registro de Acompanhamento de Irrigacao

```markdown
# Protocolo de Irrigacao Nasal — Registro

**Paciente:** [Nome]
**Data de inicio:** [Data]
**Tipo de secrecao inicial:** [serosa/mucosa/mucopurulenta]
**Comorbidades:** [rinite/sinusite/GERD/nenhuma]

## Checklist Semanal

### Semana [X]

| Dia | Irrigacao AM | Irrigacao PM | Hidratacao (L) | Pigarros | Inalacao | Observacoes |
|-----|-------------|-------------|----------------|----------|----------|-------------|
| Seg | [ ] | [ ] | | | [ ] | |
| Ter | [ ] | [ ] | | | [ ] | |
| Qua | [ ] | [ ] | | | [ ] | |
| Qui | [ ] | [ ] | | | [ ] | |
| Sex | [ ] | [ ] | | | [ ] | |
| Sab | [ ] | [ ] | | | [ ] | |
| Dom | [ ] | [ ] | | | [ ] | |

**Adesao irrigacao:** [X/14]
**Media hidratacao:** [X L/dia]
**Media pigarros:** [X/dia]
**Cor da urina predominante:** [clara/media/escura]

## Evolucao da Secrecao

| Semana | Tipo Secrecao | Volume Subjetivo (0-10) | Presenca em Laringoscopia |
|--------|--------------|------------------------|--------------------------|
| Baseline | | | Presente |
| 2 | | | |
| 4 | | | |
| 8 | | | |
| 12 | | | |

## Impressao Clinica
[Evolucao da secrecao e impacto na qualidade vocal]
```

---

## Validation

| Criterion | Standard | Fail Condition |
|-----------|----------|----------------|
| Tecnica de irrigacao demonstrada e supervisionada | Paciente executa corretamente na sessao | Instrucao apenas verbal |
| Solucao salina na concentracao correta | 0.9% (isotonica) verificada | Concentracao nao especificada |
| Frequencia de irrigacao documentada | Registro semanal preenchido | Sem registro de adesao |
| Hidratacao monitorada | Meta diaria definida e acompanhada | Meta nao estabelecida |
| Contagem de pigarros | Registro diario por minimo 4 semanas | Sem monitoramento |
| Comorbidades avaliadas | Alergia e refluxo investigados | Secrecao tratada isoladamente |
| Equipamento higienizado | Orientacao de limpeza documentada | Risco de contaminacao |

---

## Veto Conditions

| Condition | Action | Severity |
|-----------|--------|----------|
| Sinusite bacteriana aguda nao tratada | ENCAMINHAR ORL antes de iniciar irrigacao regular — pode necessitar antibioticoterapia | NON-NEGOTIABLE |
| Epistaxe (sangramento nasal) durante irrigacao | PARAR irrigacao, comprimir narina, se persistir encaminhar ORL | NON-NEGOTIABLE |
| Otite ou otalgia apos irrigacao | PARAR irrigacao, avaliar tecnica (forca excessiva?), encaminhar ORL se persistir | MUST |
| Uso de agua nao tratada (torneira sem ferver) | CORRIGIR imediatamente — risco de infeccao por ameba (Naegleria fowleri) em casos raros mas fatais | NON-NEGOTIABLE |
| Secrecao mucopurulenta persistente > 10 dias | ENCAMINHAR ORL — possivel sinusite cronica ou infeccao que requer tratamento medico | MUST |
| Cirurgia nasal nos ultimos 6 meses | NAO iniciar irrigacao sem liberacao do cirurgiao | NON-NEGOTIABLE |
| Perfuracao de septo nasal conhecida | ADAPTAR tecnica (menor pressao) e monitorar — pode causar desconforto | SHOULD |
| Paciente com alergia a componentes da solucao | SUBSTITUIR formulacao — usar apenas sal nao-iodado puro | MUST |
| Refluxo laringofaringeo nao tratado | ENCAMINHAR gastro — irrigacao nasal isolada nao resolve secrecao de origem refluxo | MUST |

---

## Contraindications

```
CONTRAINDICACOES ABSOLUTAS:
  - Tumor nasal ou nasofaringeo (qualquer massa nasal nao investigada)
  - Atresia de coanas (obstrucao anatomica completa)
  - Fistula liquorica (rinoliquorreia — liquido cefalorraquidiano)
  - Cirurgia de base de cranio recente
  - Fratura facial aguda envolvendo seios paranasais

CONTRAINDICACOES RELATIVAS (adaptar tecnica):
  - Perfuracao de septo nasal (usar menor pressao)
  - Otite media aguda (suspender ate resolucao)
  - Epistaxe recorrente (investigar antes, usar solucao morna)
  - Criancas < 4 anos (tecnica adaptada com conta-gotas)
  - Desvio septal severo (pode dificultar fluxo — avaliar com ORL)
```

---

**Nota do protocolo:** "A irrigacao nasal e uma das intervencoes mais simples e mais subestimadas na reabilitacao vocal. Quando a secrecao sai das pregas vocais, a voz respira. E quando a voz respira, ela cura."
