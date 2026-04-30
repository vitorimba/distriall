# Cross-Squad Integration — Squad Gamification

## Como Outros Squads Usam Gamificacao

### Acesso via Slash Command

Qualquer squad pode acessar o squad-gamification usando:

```
/squad-gamification:gamification-chief
```

O Chief faz diagnostico automatico e roteia para o especialista adequado ao dominio do squad chamador.

### Integracao com squad-fitcoach-pro

**Cenario:** squad-fitcoach-pro precisa de gamificacao para treinos, streaks, ou progressao fitness.

**Antes (agente unico):**
- `squad-fitcoach-pro:gamification-designer` — agente single-purpose baseado em Yu-kai Chou
- Limitado a um framework (Octalysis)
- Sem orquestracao multi-framework

**Depois (squad completo):**
- `/squad-gamification:gamification-chief` — orquestra 9 especialistas
- Acesso a Octalysis + B=MAP + Game Thinking + Hooked Model + HEXAD + mais 4 frameworks
- Diagnostico, design, teste e launch integrados

**Como usar:**

```
1. De dentro do squad-fitcoach-pro:
   /squad-gamification:gamification-chief

2. Descreva o contexto fitness:
   "Preciso gamificar streaks de treino para retencao de alunos"

3. Chief diagnostica e roteia:
   → @motivation-analyst (core drives de fitness)
   → @behavior-architect (habit formation para treino diario)
   → @experience-designer (progression system fitness)

4. Resultado devolvido ao fitcoach-chief
```

### Integracao Generica (Qualquer Squad)

Qualquer squad pode requisitar gamificacao seguindo este protocolo:

1. **Chamar:** `/squad-gamification:gamification-chief`
2. **Descrever:** Contexto do dominio + comportamento desejado
3. **Receber:** Diagnostico de roteamento com especialistas recomendados
4. **Executar:** Workflow de gamificacao dentro do contexto do dominio

### Agents Disponiveis

| Agent | Skill Path | Framework | Quando Usar |
|-------|-----------|-----------|-------------|
| gamification-chief | `/squad-gamification:gamification-chief` | Orchestration | Entry point — sempre comece aqui |
| motivation-analyst | `/squad-gamification:motivation-analyst` | Octalysis | Diagnostico motivacional |
| behavior-architect | `/squad-gamification:behavior-architect` | B=MAP | Design comportamental e habitos |
| experience-designer | `/squad-gamification:experience-designer` | Game Thinking | Jornada do jogador e progressao |
| engagement-engineer | `/squad-gamification:engagement-engineer` | Hooked Model | Loops de engajamento |
| player-profiler | `/squad-gamification:player-profiler` | HEXAD | Perfis de jogadores |
| enterprise-strategist | `/squad-gamification:enterprise-strategist` | 6D Framework | Gamificacao corporativa |
| learning-designer | `/squad-gamification:learning-designer` | Gamification of Learning | E-learning |
| emotion-designer | `/squad-gamification:emotion-designer` | 4 Keys to Fun | Design emocional |

### Workflows Disponiveis

| Workflow | Contexto |
|----------|----------|
| `wf-full-gamification` | Projeto completo de gamificacao (7 fases) |
| `wf-app-gamification` | Apps mobile/web |
| `wf-enterprise-gamification` | Sistemas corporativos |
| `wf-learning-gamification` | Plataformas educacionais |
