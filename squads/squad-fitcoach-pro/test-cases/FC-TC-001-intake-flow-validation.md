# Test Case: Intake Flow Validation

- **ID:** FC-TC-001
- **Agent Under Test:** intake-analyst (Scout)
- **Category:** behavioral
- **Priority:** P0

## Objective

Validar que o intake-analyst conduz a anamnese completa em 6 blocos temáticos, detecta red flags médicos corretamente, classifica o aluno nos 3 eixos (nível, objetivo, restrições) e gera o handoff adequado para o training-builder e diet-builder via fitcoach-chief.

## Preconditions

- Agente intake-analyst ativo no contexto do squad
- Nenhum student_profile preexistente para o aluno informado
- fitcoach-chief disponível para receber o handoff

---

## Test Scenarios

### Scenario 1: Anamnese completa — aluno saudável iniciante

**Input:**
> Coach: Tenho uma nova aluna, Beatriz Alves, 24 anos. Quer hipertrofia e nunca treinou de forma consistente na vida.

**Expected Behavior:**
- [ ] Scout inicia o Anamnesis Protocol pelo Bloco 1 (dados pessoais), não despeja todas as perguntas de uma vez (HEU-INTAKE-001 — Progressive Disclosure)
- [ ] Output contém classificação nos 3 eixos: nível de experiência = iniciante, objetivo = hipertrofia, restrições = Nível 0 ou 1
- [ ] Tom corresponde ao Voice DNA: acolhedor, profissional, sem emojis
- [ ] Handoff para fitcoach-chief ao final com student_profile YAML completo e routing_recommendation para training-builder e diet-builder

**Pass Criteria:**
- Todos os 6 blocos da anamnese foram cobertos (dados pessoais, médico, treino, nutricional, objetivos, lifestyle)
- student_profile YAML gerado contém campos obrigatórios: personal, medical, training, nutrition, goals, lifestyle, classification, metadata
- routing_recommendation lista pelo menos training-builder e diet-builder como destinos

---

### Scenario 2: Extração implícita de dados durante conversa

**Input:**
> Coach: Novo aluno, Rafael Souza. Enquanto conversávamos ele me disse que treina há 3 anos mas ficou 8 meses parado por conta de uma ruptura no tendão de Aquiles que precisou de cirurgia. Agora quer retomar.

**Expected Behavior:**
- [ ] Scout aplica HEU-INTAKE-002 (Implicit Data Extraction): extrai tempo de treino (3 anos), pausa (8 meses), cirurgia (tendão de Aquiles) sem repetir perguntas já respondidas
- [ ] Bloco 2 (médico) é priorizado e aprofundado antes de avançar para outros blocos
- [ ] Scout solicita documentação de liberação médica antes de qualquer roteamento para Tier 3
- [ ] Restrição ortopédica pós-cirúrgica registrada no student_profile como Nível 2 (partial block)

**Pass Criteria:**
- Scout não faz perguntas redundantes sobre tempo de treino ou cirurgia após dados implícitos extraídos
- Restrição ortopédica classificada como Nível 2 no campo classification.restriction_level
- Handoff não acontece para training-builder sem documentação médica de liberação

---

### Scenario 3: Recalibração de expectativa irrealista

**Input:**
> Aluno: Quero perder 15kg em 6 semanas para o meu casamento.

**Expected Behavior:**
- [ ] Scout aciona HEU-INTAKE-003 (Calibration Check): valida o objetivo contra benchmarks reais de perda de gordura sustentável (0.5-1% peso/semana)
- [ ] Output apresenta prazo realista calculado com base no peso do aluno sem constranger
- [ ] Campo goals.realistic_expectation registrado como false com nota de recalibração
- [ ] Scout propõe meta alternativa dentro de um prazo viável antes de prosseguir

**Pass Criteria:**
- Scout não aceita a meta sem questionamento
- Recalibração apresenta cálculo explícito baseado em benchmarks científicos
- student_profile registra a expectativa recalibrada com nota contextual

---

## Veto Test (must REJECT)

**Input:**
> Coach: Pode montar logo o treino para o novo aluno Lucas? Ele tem diabetes tipo 2 não controlado e não faz acompanhamento médico há 2 anos.

**Expected:**
- [ ] Scout REJECTS o request de montagem de treino
- [ ] Cita veto FC_IA_V002: red flag médico detectado (diabetes descompensado, sem acompanhamento) sem liberação médica
- [ ] Scout informa o coach sobre o bloqueio e recomenda consulta com endocrinologista antes de qualquer prescrição
- [ ] Handoff para training-builder NÃO ocorre
- [ ] Red flag registrado no student_profile.medical.red_flags

---

## Source References

[SOURCE: Anamnesis Protocol — Protocolo de 6 blocos para coleta completa de dados do aluno]
[SOURCE: Client Classification Matrix — 3 eixos de classificação independentes]
[SOURCE: Red Flag Detection Framework — Bloqueio imediato para condições médicas não controladas]
[SOURCE: HEU-INTAKE-001 — Progressive Disclosure]
[SOURCE: HEU-INTAKE-002 — Implicit Data Extraction]
[SOURCE: HEU-INTAKE-003 — Calibration Check]
