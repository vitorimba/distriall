# Heuristic: Hook Loop Design

- **ID:** NE_RT_001
- **Category:** Retention — Habit Formation Design
- **Source:** [SOURCE: Nir Eyal, Hooked]

---

## Rule

QUANDO criando ou auditando qualquer feature de retenção em fitness app, SEMPRE mapear os 4 componentes do Hook Model antes de implementar: Trigger (externo→caminho para interno), Action (mínimo de fricção possível), Variable Reward (Tribe, Hunt ou Self), Investment (dados/esforço que aumentam o valor futuro). Feature de retenção sem todos os 4 componentes mapeados é uma feature incompleta.

---

## Rationale

Retenção não é consequência de produto útil — é consequência de hábito formado. Utilidade sem hábito produz churn mesmo em produtos excelentes. O Hook Model é o mecanismo pelo qual o comportamento de usar o app se torna automático, ligado a triggers internos (emoções, rotinas) ao invés de depender eternamente de estímulo externo (notificações). Em fitness, onde a adesão ao comportamento é o principal desafio, o design do Hook não é opcional — é o produto.

---

## Application

### Componente 1: Trigger

**Tipos de Trigger Externo (ponto de partida):**
- Notificação push (ex: "Hora do seu treino")
- Email de lembrete
- Mensagem de coach ou grupo
- Anúncio em rede social

**Caminho para Trigger Interno (objetivo real):**
- Ansiedade → abrir app para planejar treino
- Tédio → explorar novo workout
- Orgulho → registrar conquista no app
- Rotina → "toda manhã antes do café, abro o app"

**Design para transição:**
1. Identificar qual emoção o usuário sente quando "precisa" do app
2. Criar conteúdo/feature que serve exatamente essa emoção
3. Reduzir notificações externas gradualmente à medida que o hábito se forma

### Componente 2: Action

**Princípio de Fogg:** Behavior = Motivation × Ability × Trigger

Para maximizar Action:
- Reduzir número de taps até a ação principal
- Remover decisões desnecessárias (ex: sugerir treino, não exibir lista de opções)
- "One-tap check-in" para registro de treino completado
- Pré-preencher dados sempre que possível

### Componente 3: Variable Reward

| Tipo | Descrição | Exemplo Fitness |
|------|-----------|----------------|
| Tribe | Recompensa social | Reações de amigos ao PR, comentários do coach |
| Hunt | Descoberta, recursos | Workout surpresa, nova receita, conteúdo desbloqueado |
| Self | Maestria, conquista | "Você quebrou seu recorde — de novo." |

**Variabilidade:** a recompensa deve ser real mas não completamente previsível. Stricter schedules reduzem o loop de antecipação.

### Componente 4: Investment

**Dados que aumentam o valor do app para o usuário:**
- Histórico de treino registrado
- Medidas corporais ao longo do tempo
- Preferências de treino calibradas
- Conquistas e badges acumulados
- Conexões sociais dentro do app

**Regra de Investment:** cada sessão deve deixar o app "mais inteligente" para o usuário. O custo de sair (perder o histórico, recomeçar do zero) deve crescer com o tempo.

---

## Examples

✅ App que, após 3 semanas de uso, exibe "Seu padrão: você treina melhor às terças às 7h. Quer que eu te lembre?" — usa dados de Investment para personalizar Trigger, migrando de notificação genérica para contexto individual.

✅ Feed de atividades que mostra conquistas de pessoas da mesma faixa de level (Variable Reward: Tribe) — usuário não sabe exatamente quando verá algo inspirador, cria loop de checagem voluntária.

❌ App que depende de notificação push para 100% das sessões após 6 meses de uso. Nenhum trigger interno foi formado. Quando usuário desativa notificações, uso cai 80%. Hook Model falhou — sem transição para trigger interno.

❌ Feature de check-in que exige 5 campos preenchidos antes de registrar treino concluído. Alta fricção na Action phase. Usuário desiste no meio. Comportamento nunca vira hábito porque o custo de ação é alto demais.

---

## Anti-Pattern

**"Mais notificações = mais engajamento."** Notificações são triggers externos — necessários no início, mas sinal de falha se ainda são o único mecanismo de retenção após meses de uso. Um app que só retém via notificação não formou hábito — criou dependência de interrupção. Quando o usuário entra no modo "não perturbe" ou muda de rotina, o produto desaparece da vida dele. O objetivo do Hook é tornar o trigger externo desnecessário.

---

## Veto Condition

Se o design do Variable Reward usa elementos de Unpredictability para criar comportamento compulsivo de checagem (ex: notificações com conteúdo misterioso deliberadamente vago para forçar abertura) → VETO. Variabilidade que serve ao engajamento às custas da autonomia do usuário cruza a linha de manipulação. O Hook deve resolver um problema real do usuário — não criar um problema (ansiedade de checagem) para vender a solução (abrir o app).
