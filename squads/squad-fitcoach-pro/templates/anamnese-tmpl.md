# Anamnese Template — FitCoach Squad

> **Template ID:** `anamnese-tmpl`
> **Version:** 1.0
> **Última atualização:** 2026-03-11
> **Uso:** Formulário completo de anamnese (intake) para novos clientes

---

## 1. Informações Pessoais

### Dados Cadastrais

| Campo | Valor |
|-------|-------|
| **Nome Completo** | `{{full_name}}` |
| **Data de Nascimento** | `{{birth_date}}` |
| **Idade** | `{{age}}` anos |
| **Sexo Biológico** | `{{biological_sex}}` (Masculino / Feminino) |
| **Gênero** | `{{gender}}` |
| **CPF** | `{{cpf}}` |
| **Email** | `{{email}}` |
| **Telefone (WhatsApp)** | `{{phone}}` |
| **Endereço** | `{{address}}` |
| **Profissão** | `{{profession}}` |
| **Estado Civil** | `{{marital_status}}` |
| **Tem Filhos?** | `{{has_children}}` — Quantos: `{{children_count}}` |
| **Como nos conheceu?** | `{{referral_source}}` |
| **Indicado por** | `{{referred_by}}` |

### Contato de Emergência

| Campo | Valor |
|-------|-------|
| **Nome** | `{{emergency_name}}` |
| **Parentesco** | `{{emergency_relation}}` |
| **Telefone** | `{{emergency_phone}}` |

---

## 2. Histórico Médico

### Condições de Saúde

| Condição | Possui? | Detalhes | Medicação | Controlado? |
|----------|---------|----------|-----------|------------|
| Hipertensão | `{{hypertension}}` | `{{hypertension_details}}` | `{{hypertension_meds}}` | `{{hypertension_controlled}}` |
| Diabetes (Tipo 1 / Tipo 2) | `{{diabetes}}` | `{{diabetes_details}}` | `{{diabetes_meds}}` | `{{diabetes_controlled}}` |
| Cardiopatia | `{{heart_disease}}` | `{{heart_details}}` | `{{heart_meds}}` | `{{heart_controlled}}` |
| Asma / DPOC | `{{respiratory}}` | `{{respiratory_details}}` | `{{respiratory_meds}}` | `{{respiratory_controlled}}` |
| Problemas articulares | `{{joint_issues}}` | `{{joint_details}}` | `{{joint_meds}}` | `{{joint_controlled}}` |
| Problemas na coluna | `{{spine_issues}}` | `{{spine_details}}` | `{{spine_meds}}` | `{{spine_controlled}}` |
| Doenças autoimunes | `{{autoimmune}}` | `{{autoimmune_details}}` | `{{autoimmune_meds}}` | `{{autoimmune_controlled}}` |
| Distúrbios hormonais | `{{hormonal}}` | `{{hormonal_details}}` | `{{hormonal_meds}}` | `{{hormonal_controlled}}` |
| Transtornos alimentares | `{{eating_disorders}}` | `{{eating_details}}` | `{{eating_meds}}` | `{{eating_controlled}}` |
| Ansiedade / Depressão | `{{mental_health}}` | `{{mental_details}}` | `{{mental_meds}}` | `{{mental_controlled}}` |
| Hipotireoidismo / Hipertireoidismo | `{{thyroid}}` | `{{thyroid_details}}` | `{{thyroid_meds}}` | `{{thyroid_controlled}}` |
| Outras | `{{other_conditions}}` | `{{other_details}}` | `{{other_meds}}` | `{{other_controlled}}` |

### Histórico Cirúrgico

| Cirurgia | Data | Detalhes | Restrições Atuais |
|----------|------|----------|-------------------|
| `{{surgery_1}}` | `{{surgery_1_date}}` | `{{surgery_1_details}}` | `{{surgery_1_restrictions}}` |
| `{{surgery_2}}` | `{{surgery_2_date}}` | `{{surgery_2_details}}` | `{{surgery_2_restrictions}}` |
| `{{surgery_3}}` | `{{surgery_3_date}}` | `{{surgery_3_details}}` | `{{surgery_3_restrictions}}` |

### Lesões Atuais ou Recentes (últimos 12 meses)

| Lesão | Local | Diagnóstico | Data | Status | Tratamento |
|-------|-------|------------|------|--------|-----------|
| `{{injury_1}}` | `{{injury_1_location}}` | `{{injury_1_diagnosis}}` | `{{injury_1_date}}` | `{{injury_1_status}}` | `{{injury_1_treatment}}` |
| `{{injury_2}}` | `{{injury_2_location}}` | `{{injury_2_diagnosis}}` | `{{injury_2_date}}` | `{{injury_2_status}}` | `{{injury_2_treatment}}` |

### Medicações em Uso

| Medicamento | Dose | Frequência | Motivo | Prescrito por |
|-----------|------|-----------|--------|-------------|
| `{{med_1}}` | `{{med_1_dose}}` | `{{med_1_freq}}` | `{{med_1_reason}}` | `{{med_1_doctor}}` |
| `{{med_2}}` | `{{med_2_dose}}` | `{{med_2_freq}}` | `{{med_2_reason}}` | `{{med_2_doctor}}` |
| `{{med_3}}` | `{{med_3_dose}}` | `{{med_3_freq}}` | `{{med_3_reason}}` | `{{med_3_doctor}}` |

### Exames Recentes

| Exame | Data | Resultado | Observações |
|-------|------|----------|-------------|
| Hemograma | `{{blood_test_date}}` | `{{blood_test_result}}` | `{{blood_test_notes}}` |
| Hormonal | `{{hormonal_test_date}}` | `{{hormonal_test_result}}` | `{{hormonal_test_notes}}` |
| Glicemia | `{{glucose_test_date}}` | `{{glucose_test_result}}` | `{{glucose_test_notes}}` |
| Lipidograma | `{{lipid_test_date}}` | `{{lipid_test_result}}` | `{{lipid_test_notes}}` |
| Outros | `{{other_test_date}}` | `{{other_test_result}}` | `{{other_test_notes}}` |

### Perguntas Adicionais de Saúde

- Possui atestado médico para prática de exercícios? `{{medical_clearance}}`
- Está grávida ou planeja engravidar? `{{pregnancy_status}}`
- Faz uso de alguma substância ergogênica (esteroides, SARMs, etc.)? `{{ergogenic_use}}`
- Fuma? `{{smoking}}` — Se sim, há quanto tempo? `{{smoking_duration}}`
- Consome álcool? `{{alcohol}}` — Frequência: `{{alcohol_frequency}}`

---

## 3. Histórico de Treinamento

### Experiência com Exercício

| Campo | Valor |
|-------|-------|
| **Treina atualmente?** | `{{currently_training}}` |
| **Anos de experiência com musculação** | `{{training_years}}` |
| **Frequência atual (dias/semana)** | `{{current_frequency}}` |
| **Duração média da sessão** | `{{session_duration}}` min |
| **Local de treino** | `{{training_location}}` (Academia / Home Gym / Ao ar livre / Misto) |
| **Treina sozinho ou com acompanhamento?** | `{{training_supervision}}` |
| **Já teve personal trainer antes?** | `{{previous_personal}}` — Duração: `{{previous_personal_duration}}` |
| **Motivo de ter parado (se aplicável)** | `{{stop_reason}}` |

### Splits/Divisões Já Utilizadas

- [ ] Full Body
- [ ] Upper/Lower
- [ ] Push/Pull/Legs
- [ ] Bro Split (peito/costas/pernas/ombros/braços)
- [ ] Arnold Split
- [ ] ABC
- [ ] ABCDE
- [ ] Outro: `{{other_split}}`

### Exercícios com Boa Execução

| Exercício | Nível de Confiança (1-10) | Carga Habitual |
|-----------|-------------------------|---------------|
| Agachamento livre | `{{squat_confidence}}` | `{{squat_load}}` kg |
| Supino reto | `{{bench_confidence}}` | `{{bench_load}}` kg |
| Levantamento terra | `{{deadlift_confidence}}` | `{{deadlift_load}}` kg |
| Desenvolvimento | `{{ohp_confidence}}` | `{{ohp_load}}` kg |
| Barra fixa | `{{pullup_confidence}}` | `{{pullup_reps}}` reps |
| Remada curvada | `{{row_confidence}}` | `{{row_load}}` kg |

### Exercícios que Evita ou Sente Dor

| Exercício | Motivo | Alternativa Usada |
|-----------|--------|------------------|
| `{{avoid_1}}` | `{{avoid_1_reason}}` | `{{avoid_1_alternative}}` |
| `{{avoid_2}}` | `{{avoid_2_reason}}` | `{{avoid_2_alternative}}` |

### Outras Atividades Físicas

| Atividade | Frequência | Duração | Objetivo |
|-----------|-----------|---------|---------|
| `{{activity_1}}` | `{{act_1_freq}}` | `{{act_1_duration}}` | `{{act_1_goal}}` |
| `{{activity_2}}` | `{{act_2_freq}}` | `{{act_2_duration}}` | `{{act_2_goal}}` |

---

## 4. Histórico Nutricional

### Hábitos Alimentares Atuais

| Campo | Valor |
|-------|-------|
| **Quantas refeições por dia?** | `{{meals_per_day}}` |
| **Costuma pular refeições?** | `{{skip_meals}}` — Quais: `{{skipped_meals}}` |
| **Cozinha em casa?** | `{{cooks_at_home}}` — Frequência: `{{cooking_frequency}}` |
| **Come fora com frequência?** | `{{eats_out}}` — Frequência: `{{eating_out_frequency}}` |
| **Já contou macros/calorias?** | `{{tracked_macros}}` |
| **Usa algum app de nutrição?** | `{{nutrition_app}}` — Qual: `{{nutrition_app_name}}` |
| **Consome ultraprocessados?** | `{{ultra_processed}}` — Frequência: `{{ultra_processed_freq}}` |

### Alergias e Intolerâncias Alimentares

| Alimento/Substância | Tipo (Alergia/Intolerância) | Severidade | Reação |
|--------------------|---------------------------|-----------|--------|
| `{{allergy_1}}` | `{{allergy_1_type}}` | `{{allergy_1_severity}}` | `{{allergy_1_reaction}}` |
| `{{allergy_2}}` | `{{allergy_2_type}}` | `{{allergy_2_severity}}` | `{{allergy_2_reaction}}` |

### Preferências e Restrições

| Categoria | Preferências | Aversões |
|-----------|------------|---------|
| **Proteínas** | `{{protein_preferences}}` | `{{protein_aversions}}` |
| **Carboidratos** | `{{carb_preferences}}` | `{{carb_aversions}}` |
| **Gorduras** | `{{fat_preferences}}` | `{{fat_aversions}}` |
| **Vegetais/Frutas** | `{{veggie_preferences}}` | `{{veggie_aversions}}` |
| **Laticínios** | `{{dairy_preferences}}` | `{{dairy_aversions}}` |

### Restrição Dietética

- [ ] Nenhuma
- [ ] Vegetariano
- [ ] Vegano
- [ ] Sem Glúten
- [ ] Sem Lactose
- [ ] Low Carb
- [ ] Cetogênica
- [ ] Outra: `{{other_diet}}`

### Dietas Já Tentadas

| Dieta | Quando | Duração | Resultado | Motivo de Parar |
|-------|--------|---------|----------|----------------|
| `{{diet_1}}` | `{{diet_1_when}}` | `{{diet_1_duration}}` | `{{diet_1_result}}` | `{{diet_1_stop}}` |
| `{{diet_2}}` | `{{diet_2_when}}` | `{{diet_2_duration}}` | `{{diet_2_result}}` | `{{diet_2_stop}}` |

### Suplementos em Uso

| Suplemento | Dose | Frequência | Há quanto tempo |
|-----------|------|-----------|----------------|
| `{{suppl_1}}` | `{{suppl_1_dose}}` | `{{suppl_1_freq}}` | `{{suppl_1_duration}}` |
| `{{suppl_2}}` | `{{suppl_2_dose}}` | `{{suppl_2_freq}}` | `{{suppl_2_duration}}` |
| `{{suppl_3}}` | `{{suppl_3_dose}}` | `{{suppl_3_freq}}` | `{{suppl_3_duration}}` |

---

## 5. Estilo de Vida (Lifestyle)

### Sono

| Campo | Valor |
|-------|-------|
| **Horas de sono por noite (média)** | `{{sleep_hours}}` |
| **Qualidade do sono (1-10)** | `{{sleep_quality}}` |
| **Hora de dormir (habitual)** | `{{bedtime}}` |
| **Hora de acordar (habitual)** | `{{wake_time}}` |
| **Usa despertador?** | `{{uses_alarm}}` |
| **Dificuldade para dormir?** | `{{insomnia}}` |
| **Acorda durante a noite?** | `{{night_waking}}` |
| **Usa tela antes de dormir?** | `{{screen_before_bed}}` |
| **Usa suplemento para sono?** | `{{sleep_supplement}}` — Qual: `{{sleep_supplement_name}}` |

### Stress

| Campo | Valor |
|-------|-------|
| **Nível de stress geral (1-10)** | `{{stress_level}}` |
| **Principais fontes de stress** | `{{stress_sources}}` |
| **Pratica meditação/mindfulness?** | `{{meditation}}` — Frequência: `{{meditation_freq}}` |
| **Atividades de lazer** | `{{leisure_activities}}` |
| **Acompanhamento psicológico?** | `{{therapy}}` |

### Rotina de Trabalho

| Campo | Valor |
|-------|-------|
| **Tipo de trabalho** | `{{work_type}}` (Sedentário / Ativo / Misto) |
| **Horário de trabalho** | `{{work_hours}}` |
| **Regime** | `{{work_regime}}` (Presencial / Home Office / Híbrido) |
| **Tempo de deslocamento** | `{{commute_time}}` min |
| **Pausa para almoço** | `{{lunch_break}}` min |
| **Viaja a trabalho?** | `{{business_travel}}` — Frequência: `{{travel_frequency}}` |

### Disponibilidade para Treino

| Dia | Disponível? | Horário Preferido | Duração Máxima |
|-----|-----------|------------------|---------------|
| Segunda | `{{mon_available}}` | `{{mon_time}}` | `{{mon_duration}}` min |
| Terça | `{{tue_available}}` | `{{tue_time}}` | `{{tue_duration}}` min |
| Quarta | `{{wed_available}}` | `{{wed_time}}` | `{{wed_duration}}` min |
| Quinta | `{{thu_available}}` | `{{thu_time}}` | `{{thu_duration}}` min |
| Sexta | `{{fri_available}}` | `{{fri_time}}` | `{{fri_duration}}` min |
| Sábado | `{{sat_available}}` | `{{sat_time}}` | `{{sat_duration}}` min |
| Domingo | `{{sun_available}}` | `{{sun_time}}` | `{{sun_duration}}` min |

---

## 6. Objetivos (Goals)

### Objetivo Principal

| Campo | Valor |
|-------|-------|
| **Objetivo** | `{{primary_goal}}` |
| **Por quê?** | `{{primary_goal_why}}` |
| **Timeline desejada** | `{{primary_goal_timeline}}` |
| **Como saberá que alcançou?** | `{{primary_goal_metric}}` |

### Objetivos Secundários

| # | Objetivo | Prioridade | Timeline |
|---|---------|-----------|---------|
| 1 | `{{secondary_goal_1}}` | `{{priority_1}}` | `{{timeline_1}}` |
| 2 | `{{secondary_goal_2}}` | `{{priority_2}}` | `{{timeline_2}}` |
| 3 | `{{secondary_goal_3}}` | `{{priority_3}}` | `{{timeline_3}}` |

### Expectativas

| Pergunta | Resposta |
|----------|---------|
| O que espera do acompanhamento? | `{{coaching_expectation}}` |
| Qual seu nível de comprometimento (1-10)? | `{{commitment_level}}` |
| Prefere comunicação por qual canal? | `{{preferred_channel}}` (WhatsApp / Email / App / Presencial) |
| Com que frequência espera feedback? | `{{feedback_frequency}}` |
| Já alcançou esse objetivo antes? | `{{previous_achievement}}` |
| O que te impediu no passado? | `{{past_barriers}}` |

---

## 7. Medidas Corporais (Body Measurements)

### Composição Corporal

| Medida | Valor | Método |
|--------|-------|--------|
| **Peso** | `{{weight}}` kg | Balança |
| **Altura** | `{{height}}` cm | Estadiômetro |
| **IMC** | `{{bmi}}` | Calculado |
| **Gordura corporal (%)** | `{{body_fat}}` % | `{{bf_method}}` (Bioimpedância / Adipômetro / DEXA / Visual) |
| **Massa magra estimada** | `{{lean_mass}}` kg | Calculado |
| **Massa gorda estimada** | `{{fat_mass}}` kg | Calculado |
| **FFMI** | `{{ffmi}}` | Calculado |

### Circunferências (cm)

| Medida | Direito | Esquerdo | Observação |
|--------|---------|----------|-----------|
| **Pescoço** | `{{neck}}` | — | Na altura do pomo de Adão |
| **Ombro** | `{{shoulder}}` | — | Maior circunferência |
| **Peito** | `{{chest}}` | — | Na linha dos mamilos |
| **Cintura** | `{{waist}}` | — | Na cicatriz umbilical |
| **Quadril** | `{{hip}}` | — | Maior circunferência |
| **Braço (relaxado)** | `{{arm_r_relaxed}}` | `{{arm_l_relaxed}}` | Ponto médio |
| **Braço (contraído)** | `{{arm_r_flexed}}` | `{{arm_l_flexed}}` | Ponto médio, contraído |
| **Antebraço** | `{{forearm_r}}` | `{{forearm_l}}` | Maior circunferência |
| **Coxa (proximal)** | `{{thigh_r_prox}}` | `{{thigh_l_prox}}` | 10cm acima do joelho |
| **Coxa (medial)** | `{{thigh_r_med}}` | `{{thigh_l_med}}` | Ponto médio |
| **Panturrilha** | `{{calf_r}}` | `{{calf_l}}` | Maior circunferência |

### Dobras Cutâneas (se aplicável — mm)

| Dobra | Valor (mm) |
|-------|-----------|
| Peitoral | `{{skinfold_chest}}` |
| Abdominal | `{{skinfold_abs}}` |
| Coxa | `{{skinfold_thigh}}` |
| Tríceps | `{{skinfold_triceps}}` |
| Subescapular | `{{skinfold_subscapular}}` |
| Suprailíaca | `{{skinfold_suprailiac}}` |
| Axilar média | `{{skinfold_midaxillary}}` |
| **Soma** | `{{skinfold_sum}}` mm |
| **BF% (Jackson-Pollock)** | `{{skinfold_bf}}` % |

---

## 8. Fotos de Referência

### Protocolo Fotográfico

| Pose | Arquivo/Link | Data | Observação |
|------|-------------|------|-----------|
| **Frente (relaxado)** | `{{photo_front_relaxed}}` | `{{photo_date}}` | Braços ao lado do corpo |
| **Frente (contraído)** | `{{photo_front_flexed}}` | `{{photo_date}}` | Double biceps frontal |
| **Lateral direito** | `{{photo_side_r}}` | `{{photo_date}}` | Braços ao lado |
| **Lateral esquerdo** | `{{photo_side_l}}` | `{{photo_date}}` | Braços ao lado |
| **Costas (relaxado)** | `{{photo_back_relaxed}}` | `{{photo_date}}` | Braços ao lado |
| **Costas (contraído)** | `{{photo_back_flexed}}` | `{{photo_date}}` | Lat spread ou double biceps |

### Instruções para Fotos

- Iluminação consistente (mesma luz, mesmo local)
- Roupa mínima (short/sunga para homens, biquíni/top+short para mulheres)
- Mesmo horário do dia (preferencialmente manhã, em jejum)
- Câmera na altura do umbigo
- Distância padronizada (2 metros)
- Fundo neutro (parede branca ou lisa)

---

## 9. Classificação do Cliente (Client Classification)

### Nível de Treinamento

| Critério | Pontuação | Classificação |
|----------|----------|--------------|
| Anos de treino consistente | `{{training_years_score}}` / 5 | — |
| Domínio técnico dos básicos | `{{technique_score}}` / 5 | — |
| Histórico de periodização | `{{periodization_score}}` / 5 | — |
| Força relativa (Wilks/DOTS) | `{{strength_score}}` / 5 | — |
| Consciência corporal | `{{body_awareness_score}}` / 5 | — |
| **TOTAL** | **`{{total_classification_score}}`** / 25 | **`{{classification_level}}`** |

### Tabela de Classificação

| Score | Nível | Descrição | Abordagem Recomendada |
|-------|-------|-----------|----------------------|
| 0-5 | Iniciante | Pouca ou nenhuma experiência | Foco em técnica, padrões básicos, volume baixo |
| 6-10 | Iniciante Avançado | Alguma experiência, técnica inconsistente | Consolidar técnica, progressão linear |
| 11-15 | Intermediário | 1-3 anos consistentes, boa técnica | Periodização linear/ondulada, progressive overload |
| 16-20 | Avançado | 3-5+ anos, técnica sólida, PRs consistentes | Periodização em blocos, DUP, autorregulação |
| 21-25 | Elite | 5+ anos, competidor ou nível competitivo | Periodização avançada, micro-ajustes, peaking |

### Classificação Final: **`{{final_classification}}`**

---

## 10. Recomendação de Roteamento (Routing Recommendation)

### Protocolo Recomendado

| Campo | Valor |
|-------|-------|
| **Tipo de protocolo** | `{{protocol_type}}` (Hipertrofia / Força / Emagrecimento / Recomposição / Competição / Reabilitação) |
| **Frequência de treino** | `{{recommended_frequency}}` dias/semana |
| **Split recomendado** | `{{recommended_split}}` |
| **Fase nutricional** | `{{recommended_diet_phase}}` |
| **Prioridade muscular** | `{{muscle_priority}}` |
| **Encaminhamentos necessários** | `{{referrals}}` (Fisio / Médico / Nutricionista / Psicólogo / Nenhum) |
| **Nível de supervisão** | `{{supervision_level}}` (Alto / Médio / Baixo / Autônomo) |
| **Risco** | `{{risk_level}}` (Baixo / Moderado / Alto) |

### Observações do Coach para Roteamento

```
{{routing_notes}}
```

### Próximos Passos

1. [ ] Anamnese revisada e validada pelo coach
2. [ ] Encaminhamentos realizados (se necessário)
3. [ ] Atestado médico obtido (se necessário)
4. [ ] Protocolo de treino criado
5. [ ] Protocolo nutricional criado
6. [ ] Onboarding agendado (aula experimental / primeira sessão)
7. [ ] Contrato assinado
8. [ ] Pagamento confirmado
9. [ ] Welcome kit enviado
10. [ ] Cliente adicionado ao sistema de tracking

---

## 11. Consentimentos e Declarações

### Termo de Responsabilidade

- [ ] Declaro que as informações acima são verdadeiras e completas
- [ ] Autorizo o uso das informações para fins de planejamento do meu programa de treinamento
- [ ] Estou ciente de que devo informar qualquer alteração no meu estado de saúde
- [ ] Autorizo o uso de fotos para acompanhamento do meu progresso (uso interno)
- [ ] Li e concordo com os termos do serviço e política de privacidade

**Assinatura:** `{{signature}}`
**Data:** `{{consent_date}}`

### LGPD — Consentimento de Dados

- [ ] Autorizo o armazenamento dos meus dados pessoais conforme LGPD (Lei 13.709/2018)
- [ ] Autorizo o compartilhamento de dados com profissionais de saúde envolvidos no meu acompanhamento
- [ ] Estou ciente de que posso solicitar a exclusão dos meus dados a qualquer momento

---

## 12. Histórico de Versões

| Versão | Data | Alteração | Responsável |
|--------|------|-----------|------------|
| 1.0 | `{{creation_date}}` | Anamnese inicial | `{{coach_name}}` |
| — | — | — | — |

---

> **Gerado pelo FitCoach Squad — Synkra AIOX**
> Template: `anamnese-tmpl` v1.0
