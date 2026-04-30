# Heuristic: Core Drive Priority

- **ID:** YC_GM_002
- **Category:** Gamification — Fitness Application Design
- **Source:** [SOURCE: Yu-kai Chou, Actionable Gamification / Octalysis content]

---

## Rule

QUANDO implementando gamificação em contexto de fitness e coaching, CD2 (Development & Accomplishment) e CD5 (Social Influence & Relatedness) são os Core Drives primários de engajamento sustentável. SEMPRE iniciar o design por esses dois drives antes de qualquer outro. Drives secundários são adicionados para complementar, nunca para substituir.

---

## Rationale

Fitness tem uma estrutura motivacional natural que se alinha com CD2 e CD5. O progresso mensurável (peso levantado, quilos perdidos, km rodados, reps completadas) é a essência do CD2 — e é por isso que planilhas de treino existem há décadas antes de apps. O suporte social, a accountability e a comparação com pares é a essência do CD5 — e é por isso que academias superam treino em casa em retenção. Um fitness app que não engaja CD2 e CD5 está lutando contra a psicologia natural da atividade física. Todos os outros drives são amplificadores — não substitutos.

---

## Application

### CD2 — Development & Accomplishment em Fitness

**Mechanics que ativam CD2:**
- Sistema de progressão com marcos claramente visíveis (níveis, badges de PR)
- Feedback imediato de performance ("Você superou seu recorde de 10 semanas!")
- Visualização de evolução histórica (gráficos, comparativos)
- "Progress milestones" que reconhecem consistência, não apenas pico de performance
- Desafios com dificuldade crescente e calibrada (não muito fácil, não impossível)

**Erro comum com CD2:**
- Badges por ação simples sem esforço real (badge de "primeiro login" não ativa CD2)
- Progressão invisível — o usuário melhora mas não sabe

### CD5 — Social Influence & Relatedness em Fitness

**Mechanics que ativam CD5:**
- Grupos de desafio entre amigos com acompanhamento em tempo real
- Compartilhamento de conquistas (opt-in, nunca obrigatório)
- Mentorship/buddy system dentro do app
- Rankings contextuais (entre pessoas do mesmo nível, não globais)
- Reações sociais a conquistas de outros membros

**Erro comum com CD5:**
- Ranking global que expõe iniciantes a experts — gera shame, não motivação
- Social features obrigatórias para usuários introvertidos

### Sequência de Implementação
1. **Sprint 1:** Implementar CD2 core (sistema de progressão + feedback de PR)
2. **Sprint 2:** Implementar CD5 core (grupos de desafio + conquistas compartilháveis)
3. **Sprint 3+:** Adicionar drives secundários (CD7 para surpresa, CD6 para urgência de desafios)

---

## Examples

✅ App que exibe "Novo PR: você levantou 5kg a mais do que há 30 dias!" com animação e opção de compartilhar (CD2 + CD5). Taxa de share >40% entre usuários engajados.

✅ Feature de "Squad Challenge": grupo de 5 amigos, meta coletiva de 20 treinos em 30 dias. CD5 cria accountability mútua. Retenção do grupo no mês do desafio é 3x maior que baseline.

❌ App que lança sistema de recompensas com moeda virtual (CD4: Ownership) como primeira feature de gamificação. Usuários acumulam moeda mas não entendem o valor — baixo engajamento porque CD2 e CD5 não estabeleceram o loop motivacional básico.

❌ Leaderboard global de "mais calorias queimadas no mês" como feature principal. Iniciante vê que está em 847º lugar. Shame instantâneo. CD5 usado de forma excludente, efeito oposto ao pretendido.

---

## Anti-Pattern

**"Vamos adicionar pontos e um leaderboard."** PBL (Points, Badges, Leaderboards) sem CD2 e CD5 como base é decoração motivacional. Pontos sem progressão significativa não ativam CD2. Leaderboards sem contexto social saudável não ativam CD5 positivamente. O framework começa pelos drives, não pelas mechanics. A pergunta correta é: "Qual Core Drive queremos ativar?" — não "Qual mechanic vamos adicionar?"

---

## Veto Condition

Se a implementação de CD5 (Social Influence) inclui ranking competitivo visível para usuários em fase de onboarding (primeiros 30 dias) sem segmentação por nível ou grupo de pares → VETO. Exposição prematura a comparação social em usuários iniciantes é a principal causa de abandono por shame. CD5 deve ser introduzido inicialmente como suporte/pertencimento (grupos, squads) antes de competição (rankings, leaderboards).
