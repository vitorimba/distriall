# Intake Quality Gate Checklist

## Propósito
Validar qualidade do intake antes do handoff para squad-pm.

## Quality Gate: QG-INT-FINAL

### Dados Coletados
- [ ] Problema principal claro e específico (não genérico)
- [ ] Objetivos são outcomes mensuráveis (testados com "isso muda o negócio?")
- [ ] Pelo menos 1 métrica com baseline → target → prazo
- [ ] Valor financeiro calculado (quanto custa não resolver + quanto vale resolver)
- [ ] Features priorizadas em MoSCoW (máximo 5 must-haves)
- [ ] Restrições documentadas (budget, prazo, equipe)

### Consistência
- [ ] Budget vs Escopo: compatíveis
- [ ] Prazo vs Complexidade: realista
- [ ] Métricas vs Features: alinhados
- [ ] Stakeholders envolvidos vs mencionados: sem gaps críticos

### Qualidade das Informações
- [ ] Respostas são FATOS, não opiniões ou hipóteses (Mom Test validated)
- [ ] Vieses detectados e documentados
- [ ] Inconsistências identificadas e resolvidas (ou flagged)
- [ ] Red flags documentados com ação recomendada

### Processo
- [ ] Cliente qualificado (fit score >= 10/20 ou justificativa)
- [ ] Score de completude >= 70% (ideal >= 85%)
- [ ] Gaps CRITICAL resolvidos ou com plano de resolução
- [ ] Relatório final gerado no formato 9 pontos
- [ ] Handoff summary preparado

### Classificação
- [ ] Tipo de projeto definido
- [ ] Complexidade classificada (simple/standard/enterprise)
- [ ] Riscos top 3 identificados com mitigação
- [ ] Abordagem recomendada (faseamento, metodologia)

## Veredicto

| Resultado | Critério | Ação |
|-----------|---------|------|
| PASS | Todos os checks BLOCK passam + completude >= 85% | Handoff para squad-pm |
| PASS com FLAGS | Checks BLOCK passam + completude 70-84% | Handoff com flags documentados |
| FAIL | Algum check BLOCK falha | Voltar para follow-up ou nova reunião |
| ABORT | Fit score < 10/20 sem justificativa | Decline educadamente |
