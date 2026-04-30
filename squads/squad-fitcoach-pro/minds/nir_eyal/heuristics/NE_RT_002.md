# Heuristic: Internal Trigger Goal

- **ID:** NE_RT_002
- **Category:** Retention — Habit Maturation
- **Source:** [SOURCE: Nir Eyal, Hooked / Indistractable]

---

## Rule

QUANDO projetando o sistema de hábito de um fitness app, o OBJETIVO de longo prazo é migrar o comportamento de triggers externos (notificação push, email, lembrete) para triggers internos (emoção, rotina, identidade). Se após 90 dias de uso ativo o usuário ainda depende exclusivamente de triggers externos para abrir o app, o Hook Loop falhou em formar hábito genuíno — e o produto está em risco de churn ao primeiro sinal de interrupção de rotina.

---

## Rationale

Triggers externos têm custo crescente (fadiga de notificação, opt-out, regulação de privacy) e controle decrescente (usuário pode desativar qualquer momento). Triggers internos têm custo zero e controle crescente — uma vez que a emoção ou rotina está associada ao comportamento, o produto se torna parte da vida do usuário. Em fitness, os triggers internos mais poderosos são: "sentir que preciso me mover" (ansiedade/energia), "quero ver como evoluí" (orgulho/curiosidade), e "isso é parte de quem eu sou" (identidade). Projetar para esses triggers é projetar para retenção real.

---

## Application

### Diagnóstico de Trigger Maturation

**Indicador de trigger externo dominante:**
- Uso cai >60% em semanas sem notificações enviadas
- Usuário não abre o app de forma espontânea fora do horário de notificação
- Após viagem ou mudança de rotina, nunca retoma sem campanha de reativação

**Indicador de trigger interno emergindo:**
- Usuário abre app em horários variados (não apenas quando notificado)
- Registra treino feito fora da plataforma (comportamento de identidade: "sou alguém que registra")
- Usa app para planejar treino antes de fazer, não só registrar depois

### Como Acelerar a Migração para Trigger Interno

1. **Nomear a emoção do usuário:**
   - Durante onboarding, perguntar: "Como você se sente quando fica um dia sem treinar?"
   - Usar essa emoção como copy de toda comunicação ("Quando a semana pesa, um treino muda tudo")

2. **Reforçar identidade progressivamente:**
   - Semana 1: "Você completou seu primeiro treino"
   - Semana 4: "Você treinou 12 vezes este mês — você tem consistência"
   - Mês 3: "Você é alguém que treina. Isso não é mais um desafio — é quem você é."

3. **Criar rituais de abertura:**
   - Feature de "Morning Check-in" associada a rotina de café
   - "Planejamento da semana" aos domingos como ritual de preparação
   - Vincular abertura do app a cues ambientais (chegar na academia, trocar de roupa)

4. **Reduzir notificações ativamente:**
   - A partir da semana 8, sugerir ao usuário que reduza notificações como sinal de progresso
   - "Você não precisa mais do lembrete das 7h — você já vai sozinho. Quer desativar?"

### Métricas de Trigger Maturation

| Métrica | Semana 1-4 | Semana 8+ |
|---------|-----------|----------|
| % de sessões iniciadas por push | <80% = ótimo | <40% = objetivo |
| Sessões espontâneas (sem notificação) | >2/semana = ótimo | >4/semana = objetivo |
| Retorno após 7 dias de inatividade | — | >50% espontâneo |

---

## Examples

✅ App que, na semana 10, exibe para usuários com >3 sessões/semana: "Percebemos que você já abre o app sem precisar do lembrete. Você formou um hábito — isso é real." Mensagem de celebração que reforça identidade e sinaliza maturidade do trigger interno.

✅ Feature "Why I Train" no onboarding: usuário escreve sua motivação real. O app exibe essa frase nos momentos de baixa motivação (depois de 5 dias sem treino). Conecta trigger interno (motivação pessoal) ao produto.

❌ App que aumenta frequência de notificações para usuários que estão engajando menos. Resposta correta ao sinal de "trigger interno não formado" é melhorar o Hook — não amplificar o trigger externo. Mais notificação = mais opt-out.

❌ App que trata todos os usuários com sequência idêntica de notificações por 12 meses. Nenhum usuário é guiado para trigger interno. Retenção de 12 meses completamente dependente de push — plataforma de notificação, não produto de hábito.

---

## Anti-Pattern

**"Nosso engajamento é alto porque enviamos notificações diárias."** Engajamento via notificação é engajamento alugado. O produto não é retido — é relembrado. A diferença é fundamental: um produto retido sobrevive a férias, troca de celular e mudança de rotina. Um produto que só engaja via push desaparece no primeiro momento de distração. A métrica que importa não é DAU total — é DAU espontâneo (sem notificação).

---

## Veto Condition

Se a estratégia de migração para trigger interno inclui criar associação emocional artificial (ex: personalidade do app que simula vínculo afetivo para criar dependência emocional no usuário) → VETO. Triggers internos devem emergir de valor real entregue pelo produto — não de manipulação emocional simulada. A linha entre "o app me motiva" e "o app me manipula" está na autonomia: o usuário que para de usar porque decidiu fazer diferente deve ser livre para sair sem culpa ou pressão artificial.
