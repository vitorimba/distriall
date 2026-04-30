#!/bin/bash
# =============================================================================
# FitCoach Fidelity Report Generator
# Gera relatório de fidelidade estrutural para todos os agentes do squad
# Verifica 7 seções obrigatórias e calcula percentual por agente
# Uso: ./fidelity-report.sh [--csv]
# =============================================================================

SQUAD_DIR="$(cd "$(dirname "$0")/.." && pwd)"
AGENTS_DIR="$SQUAD_DIR/agents"
CSV_MODE=false

if [[ "$1" == "--csv" ]]; then
  CSV_MODE=true
fi

# Seções obrigatórias para fidelidade completa
REQUIRED_SECTIONS=(
  "## Scope"
  "## Veto Conditions"
  "## Handoff Table"
  "## Immune System"
  "## Voice DNA"
  "## Source References"
  "## Output"
)
TOTAL_SECTIONS=${#REQUIRED_SECTIONS[@]}

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
RESET='\033[0m'

# Cabeçalho do relatório
if [[ "$CSV_MODE" == false ]]; then
  echo -e "\n${BOLD}================================================${RESET}"
  echo -e "${BOLD}  FIDELITY REPORT — FitCoach Squad${RESET}"
  echo -e "${BOLD}  Gerado em: $(date '+%Y-%m-%d %H:%M')${RESET}"
  echo -e "${BOLD}================================================${RESET}"
  printf "\n%-30s %-8s %-8s %s\n" "AGENTE" "SCORE" "%" "SECOES FALTANTES"
  printf "%-30s %-8s %-8s %s\n" "------------------------------" "--------" "--------" "----------------------------"
else
  echo "agente,score,percentual,secoes_faltantes"
fi

# Contadores globais
TOTAL_AGENTS=0
PERFECT_AGENTS=0
TOTAL_SCORE=0

# Verificar se diretório existe
if [[ ! -d "$AGENTS_DIR" ]]; then
  echo "ERRO: Diretório agents/ não encontrado em $SQUAD_DIR" >&2
  exit 1
fi

# Iterar sobre todos os agentes
for agent_file in "$AGENTS_DIR"/*.md; do
  [[ -f "$agent_file" ]] || continue

  agent_name=$(basename "$agent_file" .md)
  score=0
  missing=()

  for section in "${REQUIRED_SECTIONS[@]}"; do
    if grep -q "$section" "$agent_file" 2>/dev/null; then
      score=$((score + 1))
    else
      missing+=("$(echo $section | sed 's/## //')")
    fi
  done

  pct=$(( (score * 100) / TOTAL_SECTIONS ))
  TOTAL_AGENTS=$((TOTAL_AGENTS + 1))
  TOTAL_SCORE=$((TOTAL_SCORE + score))

  if [[ $score -eq $TOTAL_SECTIONS ]]; then
    PERFECT_AGENTS=$((PERFECT_AGENTS + 1))
  fi

  missing_str=$(IFS=','; echo "${missing[*]}")
  [[ -z "$missing_str" ]] && missing_str="nenhuma"

  if [[ "$CSV_MODE" == false ]]; then
    # Colorir score baseado no percentual
    if [[ $pct -ge 85 ]]; then
      color=$GREEN
    elif [[ $pct -ge 57 ]]; then
      color=$YELLOW
    else
      color=$RED
    fi
    printf "${color}%-30s %-8s %-8s${RESET} %s\n" "$agent_name" "$score/$TOTAL_SECTIONS" "${pct}%" "$missing_str"
  else
    echo "$agent_name,$score/$TOTAL_SECTIONS,${pct}%,$missing_str"
  fi
done

# Sumário final (apenas modo normal)
if [[ "$CSV_MODE" == false ]]; then
  if [[ $TOTAL_AGENTS -gt 0 ]]; then
    avg_score=$(( (TOTAL_SCORE * 100) / (TOTAL_AGENTS * TOTAL_SECTIONS) ))
    echo -e "\n${BOLD}----------------------------------------------${RESET}"
    echo -e "  Total de agentes   : $TOTAL_AGENTS"
    echo -e "  Agentes perfeitos  : $PERFECT_AGENTS / $TOTAL_AGENTS"
    echo -e "  Fidelidade média   : ${avg_score}%"

    if [[ $avg_score -ge 85 ]]; then
      echo -e "\n  ${GREEN}${BOLD}Fidelidade: ALTA (>= 85%)${RESET}"
    elif [[ $avg_score -ge 57 ]]; then
      echo -e "\n  ${YELLOW}${BOLD}Fidelidade: MEDIA (57-84%)${RESET}"
    else
      echo -e "\n  ${RED}${BOLD}Fidelidade: BAIXA (< 57%)${RESET}"
    fi
    echo ""
  else
    echo "Nenhum agente encontrado em $AGENTS_DIR"
  fi
fi
