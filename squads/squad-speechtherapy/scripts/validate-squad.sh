#!/bin/bash
# =============================================================================
# SpeechTherapy Squad Validator
# Verifica a completude estrutural do squad SpeechTherapy
# Uso: ./validate-squad.sh [--verbose]
# =============================================================================

SQUAD_DIR="$(cd "$(dirname "$0")/.." && pwd)"
VERBOSE=false
ERRORS=0
WARNINGS=0

if [[ "$1" == "--verbose" ]]; then
  VERBOSE=true
fi

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
RESET='\033[0m'

log_ok()   { echo -e "  ${GREEN}[OK]${RESET}  $1"; }
log_warn() { echo -e "  ${YELLOW}[WARN]${RESET} $1"; WARNINGS=$((WARNINGS + 1)); }
log_err()  { echo -e "  ${RED}[ERRO]${RESET} $1"; ERRORS=$((ERRORS + 1)); }
log_info() { echo -e "  ${BLUE}[INFO]${RESET} $1"; }

# =============================================================================
# SECAO 1: Verificar config.yaml
# =============================================================================
echo -e "\n${BOLD}=== [1/7] config.yaml ===${RESET}"

if [[ -f "$SQUAD_DIR/config.yaml" ]]; then
  log_ok "config.yaml encontrado"
  for field in version slash_prefix title description; do
    if grep -q "$field:" "$SQUAD_DIR/config.yaml" 2>/dev/null; then
      [[ "$VERBOSE" == true ]] && log_ok "  Campo '$field' presente"
    else
      log_err "Campo obrigatorio '$field' ausente no config.yaml"
    fi
  done

  # Verificar versao
  config_version=$(grep "^version:" "$SQUAD_DIR/config.yaml" | head -1 | awk '{print $2}' | tr -d '"')
  log_info "Versao do squad: $config_version"

  # Verificar contagem de agentes
  config_agent_count=$(grep -c "^  - " "$SQUAD_DIR/config.yaml" 2>/dev/null | head -1)
  actual_agent_count=$(find "$SQUAD_DIR/agents" -name "*.md" -type f 2>/dev/null | wc -l | tr -d ' ')
  if [[ "$actual_agent_count" -gt 0 ]]; then
    log_info "Agentes no config: listados | Agentes em agents/: $actual_agent_count"
  fi
else
  log_err "config.yaml NAO encontrado em $SQUAD_DIR"
fi

# =============================================================================
# SECAO 2: Contagem de arquivos por diretorio
# =============================================================================
echo -e "\n${BOLD}=== [2/7] Contagem de arquivos ===${RESET}"

dirs=("agents" "minds" "tasks" "workflows" "templates" "checklists" "data" "docs" "config" "benchmarks" "scripts" "skills")

for dir in "${dirs[@]}"; do
  dir_path="$SQUAD_DIR/$dir"
  if [[ -d "$dir_path" ]]; then
    count=$(find "$dir_path" -type f 2>/dev/null | wc -l | tr -d ' ')
    log_ok "$dir: $count arquivo(s)"
  else
    log_warn "Diretorio '$dir' nao encontrado"
  fi
done

# =============================================================================
# SECAO 3: Verificar secoes obrigatorias em cada agente (7 Pro sections)
# =============================================================================
echo -e "\n${BOLD}=== [3/7] Secoes Pro obrigatorias nos agentes ===${RESET}"

REQUIRED_SECTIONS=("thinking_dna:" "heuristics:" "scope:" "immune_system:" "voice_dna:" "handoff_to:" "smoke_tests:")
AGENTS_DIR="$SQUAD_DIR/agents"
AGENT_PASS=0
AGENT_FAIL=0

if [[ -d "$AGENTS_DIR" ]]; then
  for agent_file in "$AGENTS_DIR"/*.md; do
    [[ -f "$agent_file" ]] || continue
    agent_name=$(basename "$agent_file" .md)
    missing_sections=()

    for section in "${REQUIRED_SECTIONS[@]}"; do
      if ! grep -q "$section" "$agent_file" 2>/dev/null; then
        missing_sections+=("$section")
      fi
    done

    if [[ ${#missing_sections[@]} -eq 0 ]]; then
      [[ "$VERBOSE" == true ]] && log_ok "Agente '$agent_name' — todas as 7 secoes Pro presentes"
      AGENT_PASS=$((AGENT_PASS + 1))
    else
      log_warn "Agente '$agent_name' — secoes ausentes: ${missing_sections[*]}"
      AGENT_FAIL=$((AGENT_FAIL + 1))
    fi
  done
  log_info "Agentes completos: $AGENT_PASS | Com secoes faltantes: $AGENT_FAIL"
else
  log_err "Diretorio agents/ nao encontrado"
fi

# =============================================================================
# SECAO 4: Verificar governance layer (config/)
# =============================================================================
echo -e "\n${BOLD}=== [4/7] Governance layer ===${RESET}"

CONFIG_DIR="$SQUAD_DIR/config"

governance_files=("veto-conditions.yaml" "quality-gates.yaml" "heuristics.yaml")

if [[ -d "$CONFIG_DIR" ]]; then
  for gfile in "${governance_files[@]}"; do
    if [[ -f "$CONFIG_DIR/$gfile" ]]; then
      log_ok "config/$gfile encontrado"
    else
      log_err "config/$gfile NAO encontrado — governance incompleta"
    fi
  done
else
  log_err "Diretorio config/ nao encontrado — governance layer ausente"
fi

# =============================================================================
# SECAO 5: Verificar minds (VOICE_DNA + heuristics por expert)
# =============================================================================
echo -e "\n${BOLD}=== [5/7] Minds ===${RESET}"

MINDS_DIR="$SQUAD_DIR/minds"
MIND_PASS=0
MIND_FAIL=0

if [[ -d "$MINDS_DIR" ]]; then
  for mind_dir in "$MINDS_DIR"/*/; do
    [[ -d "$mind_dir" ]] || continue
    mind_name=$(basename "$mind_dir")

    # Pular artifacts/ e heuristics/ globais
    [[ "$mind_name" == "artifacts" ]] && continue
    [[ "$mind_name" == "heuristics" ]] && continue

    has_voice=false
    has_heuristics=false

    if [[ -f "$mind_dir/artifacts/VOICE_DNA.md" ]]; then
      has_voice=true
    fi

    heur_count=$(find "$mind_dir/heuristics" -name "*.md" -type f 2>/dev/null | wc -l | tr -d ' ')
    if [[ $heur_count -gt 0 ]]; then
      has_heuristics=true
    fi

    if $has_voice && $has_heuristics; then
      [[ "$VERBOSE" == true ]] && log_ok "Mind '$mind_name' — VOICE_DNA + $heur_count heuristic(s)"
      MIND_PASS=$((MIND_PASS + 1))
    else
      missing=""
      $has_voice || missing="VOICE_DNA "
      $has_heuristics || missing="${missing}heuristics"
      log_warn "Mind '$mind_name' — faltando: $missing"
      MIND_FAIL=$((MIND_FAIL + 1))
    fi
  done
  log_info "Minds completos: $MIND_PASS | Com artefatos faltantes: $MIND_FAIL"
else
  log_err "Diretorio minds/ nao encontrado"
fi

# =============================================================================
# SECAO 6: Verificar benchmarks e skills
# =============================================================================
echo -e "\n${BOLD}=== [6/7] Benchmarks e skills ===${RESET}"

BM_DIR="$SQUAD_DIR/benchmarks"
SK_DIR="$SQUAD_DIR/skills"

if [[ -d "$BM_DIR" ]]; then
  bm_count=$(find "$BM_DIR" -type f 2>/dev/null | wc -l | tr -d ' ')
  log_ok "benchmarks/: $bm_count arquivo(s)"

  if [[ -f "$BM_DIR/smoke-test-suite.md" ]]; then
    log_ok "smoke-test-suite.md encontrado"
  else
    log_warn "smoke-test-suite.md nao encontrado em benchmarks/"
  fi

  if [[ -f "$BM_DIR/baseline-registry.yaml" ]]; then
    log_ok "baseline-registry.yaml encontrado"
  else
    log_warn "baseline-registry.yaml nao encontrado em benchmarks/"
  fi

  if [[ -d "$BM_DIR/golden-baselines" ]]; then
    gb_count=$(find "$BM_DIR/golden-baselines" -type f 2>/dev/null | wc -l | tr -d ' ')
    log_ok "golden-baselines/: $gb_count arquivo(s)"
  else
    log_warn "golden-baselines/ nao encontrado em benchmarks/"
  fi
else
  log_warn "Diretorio benchmarks/ nao encontrado"
fi

if [[ -d "$SK_DIR" ]]; then
  sk_count=$(find "$SK_DIR" -type f 2>/dev/null | wc -l | tr -d ' ')
  log_ok "skills/: $sk_count arquivo(s)"
else
  log_warn "Diretorio skills/ nao encontrado"
fi

# =============================================================================
# SECAO 7: Verificar scripts
# =============================================================================
echo -e "\n${BOLD}=== [7/7] Scripts ===${RESET}"

SCRIPTS_DIR="$SQUAD_DIR/scripts"

if [[ -d "$SCRIPTS_DIR" ]]; then
  sc_count=$(find "$SCRIPTS_DIR" -name "*.sh" -type f 2>/dev/null | wc -l | tr -d ' ')
  log_ok "scripts/: $sc_count script(s) .sh"

  for script in "$SCRIPTS_DIR"/*.sh; do
    [[ -f "$script" ]] || continue
    if [[ -x "$script" ]]; then
      [[ "$VERBOSE" == true ]] && log_ok "$(basename "$script") — executavel"
    else
      log_warn "$(basename "$script") — NAO executavel (rode: chmod +x $script)"
    fi
  done
else
  log_warn "Diretorio scripts/ nao encontrado"
fi

# =============================================================================
# RELATORIO FINAL
# =============================================================================
echo -e "\n${BOLD}=============================================${RESET}"
echo -e "${BOLD}  RELATORIO DE VALIDACAO — SpeechTherapy${RESET}"
echo -e "${BOLD}=============================================${RESET}"
echo -e "  Squad dir : $SQUAD_DIR"
echo -e "  Versao    : ${config_version:-desconhecida}"
echo -e "  Erros     : ${RED}$ERRORS${RESET}"
echo -e "  Avisos    : ${YELLOW}$WARNINGS${RESET}"

if [[ $ERRORS -eq 0 && $WARNINGS -eq 0 ]]; then
  echo -e "\n  ${GREEN}${BOLD}RESULTADO: PASSOU — Squad estruturalmente completo${RESET}\n"
  exit 0
elif [[ $ERRORS -eq 0 ]]; then
  echo -e "\n  ${YELLOW}${BOLD}RESULTADO: PASSOU COM AVISOS — Verifique os warnings acima${RESET}\n"
  exit 0
else
  echo -e "\n  ${RED}${BOLD}RESULTADO: FALHOU — Corrija os erros acima antes de continuar${RESET}\n"
  exit 1
fi
