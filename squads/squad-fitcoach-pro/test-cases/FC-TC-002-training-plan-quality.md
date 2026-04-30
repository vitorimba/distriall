# Test Case: Training Plan Quality

- **ID:** FC-TC-002
- **Agent Under Test:** training-builder (Forge)
- **Category:** behavioral
- **Priority:** P0

## Objective

Validar que o training-builder aplica Volume Landmarks de Israetel (MEV/MAV/MRV/MV), executa seleção de exercícios com justificativa biomecânica, aplica periodização de Bompa (macrociclo/mesociclo/microciclo) e implementa progressão de sobrecarga coerente com o nível e objetivo do aluno.

## Preconditions

- student_profile completo disponível (intake-analyst já executado)
- Aluno classificado com nível, objetivo e restrições definidos
- Forge ativo como agente corrente

---

## Test Scenarios

### Scenario 1: Programa de hipertrofia para intermediário sem restrições

**Input:**
> Forge, monta o protocolo de treino para o Marco. Ele é intermediário (2 anos consistentes), objetivo hipertrofia, treina 4x/semana, academia completa, sem restrições.

**Expected Behavior:**
- [ ] Forge define split compatível com 4x/semana para intermediário (ex: Upper/Lower ou PPL adaptado)
- [ ] Volume total por grupo muscular respeita os Volume Landmarks de Israetel: entre MEV e MRV, com ênfase em MAV
- [ ] Cada exercício é acompanhado de justificativa técnica (padrão de movimento, músculos primários/secundários)
- [ ] Periodização segue estrutura Bompa com mesociclo de 4-6 semanas com deload programado
- [ ] Progressão de carga explicitada: aumentos de carga semanais, uso de RPE/RIR como proxy quando apropriado

**Pass Criteria:**
- Volume semanal por grupo muscular entre 12 e 20 séries (dentro de MAV típico para intermediário)
- Pelo menos 1 exercício composto e 1 isolador por grupo muscular principal
- Deload programado ao final do mesociclo com redução de volume de 40-50%
- Output contém training_protocol YAML com sessões, exercícios, séries, reps, RIR e descanso

---

### Scenario 2: Adaptação para aluno com restrição ortopédica (ombro pós-cirúrgico)

**Input:**
> Forge, monta o treino para o Rodrigo. Avançado, hipertrofia, ombro direito pós-operatório com liberação médica. Restrição: sem supino pesado, sem desenvolvimento com barra, amplitude limitada em movimentos de pressing por 6 semanas.

**Expected Behavior:**
- [ ] Forge aceita o student_profile com flags ortopédicas ativos
- [ ] Exercícios para ombro e peito são adaptados: máquinas ao invés de livre, amplitude controlada, ausência de supino e desenvolvimento pesados nas primeiras 6 semanas
- [ ] Volume para MMSS (membros superiores) inicia conservador e progressão é gradual dentro do prazo indicado pela restrição
- [ ] Membros inferiores e core recebem protocolo normal sem restrição
- [ ] Output inclui nota técnica explicando as adaptações e prazo de reavaliação

**Pass Criteria:**
- Nenhum exercício contraindicado aparece no protocolo das primeiras 6 semanas
- Nota técnica de restrição presente no output com prazo de progressão
- Split prioriza MMII e core nas primeiras semanas para compensar limitação de MMSS

---

### Scenario 3: Periodização de contest prep — atleta competidor

**Input:**
> Forge, monta o macrociclo de prep para a Fernanda. Competidora de bikini, 20 semanas até a competição. Está em off-season agora, volume avançado habitual.

**Expected Behavior:**
- [ ] Forge define macrociclo com fases distintas: off-season (hipertrofia/manutenção), prep progressivo (aumento de frequência/cardio), peak week (redução de volume, depleção-carb)
- [ ] Periodização ondulante dentro de cada mesociclo com variação de volume e intensidade
- [ ] Frequência de treino aumenta nas últimas 8 semanas de prep para preservação muscular em déficit
- [ ] Output contém linha do tempo visual das fases e guidelines por semana

**Pass Criteria:**
- Macrociclo dividido em pelo menos 3 fases com objetivos distintos
- Peak week prescrita com redução de volume para 50-60% do volume de prep
- Frequência de cardio e treino alinhada com linha do tempo de 20 semanas

---

## Veto Test (must REJECT)

**Input:**
> Coach: Monta um treino rápido para o Lucas. Não temos o perfil dele ainda, mas é iniciante, uns 20 anos, quer hipertrofia.

**Expected:**
- [ ] Forge REJECTS o request de montagem de treino
- [ ] Cita veto FC_IA_V003 (de intake-analyst) e FC_CH_V002 (de fitcoach-chief): prescrição sem intake completo é bloqueada
- [ ] Forge sugere path alternativo: iniciar anamnese com intake-analyst antes de prescrever
- [ ] Nenhum training_protocol é gerado sem student_profile válido

---

## Source References

[SOURCE: Mike Israetel / Renaissance Periodization — Volume Landmarks: MEV, MAV, MRV, MV por grupo muscular]
[SOURCE: Tudor Bompa — Periodization: Theory and Methodology of Training — macrociclo/mesociclo/microciclo]
[SOURCE: Programming Architecture — Hierarquia de programação em 5 níveis (macrociclo a série)]
[SOURCE: Split Design Matrix — Splits por nível e frequência de treino]
