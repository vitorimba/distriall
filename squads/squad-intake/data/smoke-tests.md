# Smoke Tests — Squad Intake

## ST-INT-001: Reuniao com Cliente Novo (Golden Path)

**Cenario:** Usuario ativa intake-chief e pede `*new-intake AcmeCorp`
**Input:** client_name=AcmeCorp, industry=fintech, project_type=web-app
**Esperado:**
1. intake-chief inicia fase 1 (preparacao)
2. Gera roteiro de reuniao com 5 blocos + email de boas-vindas
3. Roteiro contem perguntas Mom Test (fatos, nao opinioes)
4. Email segue padrao Embark (timeline, expectativas)
5. Arquivos salvos em docs/intake/acmecorp/
**Criterio de Sucesso:** Roteiro tem 15+ perguntas distribuidas em 5 blocos, zero perguntas hipoteticas
**Status:** READY

---

## ST-INT-002: Briefing Personalizado por Tipo

**Cenario:** Usuario pede `*generate-briefing AcmeCorp` apos reuniao
**Input:** project_type=automation, industry=logistics, discovery_notes="empresa de logistica, 50 funcionarios, processo manual de tracking"
**Esperado:**
1. Briefing gerado com 6 blocos padrao + bloco condicional de automacao
2. Bloco de automacao contem perguntas especificas (processos, triggers, ferramentas)
3. Briefing referencia notas da reuniao ("Como mencionamos na conversa...")
4. Linguagem acessivel, nao tecnica
5. 30-45 perguntas total (nao mais que 50)
**Criterio de Sucesso:** Bloco condicional de automacao presente, perguntas personalizadas pelo contexto
**Status:** READY

---

## ST-INT-003: Deteccao de Gaps e Red Flags

**Cenario:** Usuario pede `*analyze AcmeCorp` com briefing incompleto
**Input:** Briefing com 70% respondido, budget="a definir", decisor ausente, prazo 2 meses para escopo enterprise
**Esperado:**
1. Score de completude calculado (70%)
2. Gaps classificados:
   - CRITICAL: budget indefinido, decisor ausente
   - IMPORTANT: integracoes nao especificadas
3. Red flags detectados: prazo vs escopo, budget explorer
4. Inconsistencia detectada: prazo 2 meses vs complexidade enterprise
5. Follow-up gerado com perguntas Mom Test para gaps CRITICAL
**Criterio de Sucesso:** Gaps CRITICAL identificados, inconsistencia prazo/escopo flagged, follow-up gerado
**Status:** READY

---

## ST-INT-004: Qualificacao de Fit (Blair Enns)

**Cenario:** Usuario pede `*qualify AcmeCorp` apos reuniao
**Input:** Notas indicam: budget compativel, escopo na expertise, cultura burocrática, prazo irrealista
**Esperado:**
1. Score nas 4 dimensoes de fit (Budget, Scope, Culture, Timeline)
2. Score total entre 10-13 → PROCEED WITH CAUTION
3. Flags documentados: timeline irrealista, cultura burocratica
4. Recomendacao: prosseguir mas alinhar expectativa de prazo
**Criterio de Sucesso:** 4 dimensoes scoradas, flags especificos, recomendacao acionavel
**Status:** READY

---

## ST-INT-005: Handoff para Squad-PM

**Cenario:** Intake completo, usuario pede `*report AcmeCorp`
**Input:** Todos os artefatos das 7 fases
**Esperado:**
1. Relatorio consolidado no formato 9 pontos (Alan Weiss)
2. Score de completude >= 85%
3. Zero gaps CRITICAL pendentes
4. Handoff summary com proximo passo (squad-pm:discovery-session)
5. Lista de artefatos com paths
**Criterio de Sucesso:** Relatorio completo, handoff summary pronto, paths corretos
**Status:** READY
