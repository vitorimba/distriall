#!/usr/bin/env bash
##############################################################################
# fidelity-report.sh — Fidelity Report per Agent
# Checks that each agent's mind files, referenced tasks, and heuristics
# are properly linked and substantive.
##############################################################################

set -euo pipefail

SQUAD_DIR="$(cd "$(dirname "$0")/.." && pwd)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo "=============================================="
echo " Squad Gamification — Fidelity Report"
echo " $(date '+%Y-%m-%d %H:%M:%S')"
echo "=============================================="
echo ""

# Agent definitions
declare -A AGENTS
AGENTS=(
  ["gamification-chief"]="Orchestrator"
  ["motivation-analyst"]="Yu-kai Chou|yu-kai-chou"
  ["behavior-architect"]="BJ Fogg|bj-fogg"
  ["experience-designer"]="Amy Jo Kim|amy-jo-kim"
  ["engagement-engineer"]="Nir Eyal|nir-eyal"
  ["player-profiler"]="Andrzej Marczewski|andrzej-marczewski"
  ["enterprise-strategist"]="Kevin Werbach|kevin-werbach"
  ["learning-designer"]="Karl Kapp|karl-kapp"
  ["emotion-designer"]="Nicole Lazzaro + Jesse Schell|nicole-lazzaro"
)

TOTAL_SCORE=0
TOTAL_MAX=0

for AGENT in "${!AGENTS[@]}"; do
  IFS='|' read -r PERSONA MIND_DIR <<< "${AGENTS[$AGENT]}"
  SCORE=0
  MAX=0

  echo -e "${CYAN}--- $AGENT ($PERSONA) ---${NC}"

  # Check 1: Mind directory exists (skip for orchestrator)
  if [[ "$AGENT" != "gamification-chief" ]] && [[ -n "${MIND_DIR:-}" ]]; then
    ((MAX++))
    if [[ -d "$SQUAD_DIR/minds/$MIND_DIR" ]]; then
      echo -e "  ${GREEN}[OK]${NC} Mind directory exists: minds/$MIND_DIR/"
      ((SCORE++))
    else
      echo -e "  ${RED}[!!]${NC} Mind directory MISSING: minds/$MIND_DIR/"
    fi

    # Check 2: heuristics.md exists and is substantive (>20 lines)
    ((MAX++))
    HEUR_FILE="$SQUAD_DIR/minds/$MIND_DIR/heuristics.md"
    if [[ -f "$HEUR_FILE" ]]; then
      HEUR_LINES=$(wc -l < "$HEUR_FILE" | tr -d ' ')
      if [[ $HEUR_LINES -gt 20 ]]; then
        echo -e "  ${GREEN}[OK]${NC} heuristics.md substantive ($HEUR_LINES lines)"
        ((SCORE++))
      else
        echo -e "  ${YELLOW}[!!]${NC} heuristics.md too short ($HEUR_LINES lines, need >20)"
      fi
    else
      echo -e "  ${RED}[!!]${NC} heuristics.md MISSING"
    fi

    # Check 3: VOICE_DNA.md exists and is substantive (>15 lines)
    ((MAX++))
    VOICE_FILE="$SQUAD_DIR/minds/$MIND_DIR/VOICE_DNA.md"
    if [[ -f "$VOICE_FILE" ]]; then
      VOICE_LINES=$(wc -l < "$VOICE_FILE" | tr -d ' ')
      if [[ $VOICE_LINES -gt 15 ]]; then
        echo -e "  ${GREEN}[OK]${NC} VOICE_DNA.md substantive ($VOICE_LINES lines)"
        ((SCORE++))
      else
        echo -e "  ${YELLOW}[!!]${NC} VOICE_DNA.md too short ($VOICE_LINES lines, need >15)"
      fi
    else
      echo -e "  ${RED}[!!]${NC} VOICE_DNA.md MISSING"
    fi
  fi

  # Check 4: Agent referenced in at least one task
  ((MAX++))
  TASK_REFS=$(grep -rl "$AGENT" "$SQUAD_DIR/tasks/" 2>/dev/null | wc -l | tr -d ' ')
  if [[ $TASK_REFS -gt 0 ]]; then
    echo -e "  ${GREEN}[OK]${NC} Referenced in $TASK_REFS task(s)"
    ((SCORE++))
  else
    echo -e "  ${RED}[!!]${NC} Not referenced in any task"
  fi

  # Check 5: Agent referenced in config.yaml
  ((MAX++))
  if grep -q "$AGENT" "$SQUAD_DIR/config.yaml" 2>/dev/null; then
    echo -e "  ${GREEN}[OK]${NC} Listed in config.yaml"
    ((SCORE++))
  else
    echo -e "  ${RED}[!!]${NC} Not listed in config.yaml"
  fi

  # Score
  echo -e "  Score: $SCORE / $MAX"
  TOTAL_SCORE=$((TOTAL_SCORE + SCORE))
  TOTAL_MAX=$((TOTAL_MAX + MAX))
  echo ""
done

# Summary
echo "=============================================="
echo " FIDELITY SUMMARY"
echo "=============================================="
PERCENTAGE=0
if [[ $TOTAL_MAX -gt 0 ]]; then
  PERCENTAGE=$((TOTAL_SCORE * 100 / TOTAL_MAX))
fi
echo "  Total Score: $TOTAL_SCORE / $TOTAL_MAX ($PERCENTAGE%)"
echo ""

if [[ $PERCENTAGE -ge 90 ]]; then
  echo -e "  ${GREEN}FIDELITY: EXCELLENT${NC}"
elif [[ $PERCENTAGE -ge 70 ]]; then
  echo -e "  ${YELLOW}FIDELITY: GOOD (some gaps)${NC}"
else
  echo -e "  ${RED}FIDELITY: NEEDS WORK${NC}"
fi
