# Heuristic: Sustain-Before-Transition

- **ID:** JGS_H01
- **Name:** Sustain-Before-Transition
- **Agent:** jackie-gartner-schmidt
- **Severity:** HIGH

## When
When patient can sustain target voice quality for 3+ consecutive conversational turns.

## Rule
Transition from supported practice to unsupported conversation — remove clinician prompts.

## Rationale
Motor learning: premature fading causes reversion; late fading inhibits generalization.

## Action
1. Monitor: paciente sustenta qualidade-alvo por 3+ turnos consecutivos
2. Iniciar transicao: remover prompts do clinico gradualmente
3. Se reverter: voltar a pratica suportada brevemente
4. Se manter: progredir para conversa livre
5. Documentar momento de transicao para tracking de progresso
