#!/usr/bin/env bash
# ==============================================================================
# fidelity-report.sh — Per-Agent Fidelity Check for Franchising Avend Squad
# Checks 5 keys per agent: voice_dna, thinking_dna, heuristics, smoke_tests,
# immune_system. Calculates percentage score. Supports --csv flag.
# ==============================================================================

set -euo pipefail

SQUAD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CSV_MODE=false

for arg in "$@"; do
  case "$arg" in
    --csv) CSV_MODE=true ;;
  esac
done

FIDELITY_KEYS=("voice_dna" "thinking_dna" "heuristics" "smoke_tests" "immune_system")
TOTAL_KEYS=${#FIDELITY_KEYS[@]}
TOTAL_SCORE=0
AGENT_COUNT=0

if $CSV_MODE; then
  echo "agent,voice_dna,thinking_dna,heuristics,smoke_tests,immune_system,score_pct"
else
  echo "=========================================="
  echo "  Fidelity Report — Franchising Avend"
  echo "=========================================="
  echo ""
  printf "  %-30s " "AGENT"
  for key in "${FIDELITY_KEYS[@]}"; do
    printf "%-14s " "$key"
  done
  printf "%s\n" "SCORE"
  printf "  %-30s " "------------------------------"
  for _ in "${FIDELITY_KEYS[@]}"; do
    printf "%-14s " "--------------"
  done
  printf "%s\n" "------"
fi

if [[ ! -d "$SQUAD_DIR/agents" ]]; then
  echo "ERROR: agents/ directory not found at $SQUAD_DIR/agents"
  exit 1
fi

for agent_file in "$SQUAD_DIR/agents"/*.md; do
  agent_name=$(basename "$agent_file" .md)
  found=0
  results=()

  for key in "${FIDELITY_KEYS[@]}"; do
    if grep -q "${key}:" "$agent_file" 2>/dev/null; then
      results+=("Y")
      found=$((found + 1))
    else
      results+=("N")
    fi
  done

  score_pct=$((found * 100 / TOTAL_KEYS))
  TOTAL_SCORE=$((TOTAL_SCORE + score_pct))
  AGENT_COUNT=$((AGENT_COUNT + 1))

  if $CSV_MODE; then
    line="$agent_name"
    for r in "${results[@]}"; do
      line="$line,$r"
    done
    line="$line,$score_pct%"
    echo "$line"
  else
    printf "  %-30s " "$agent_name"
    for r in "${results[@]}"; do
      if [[ "$r" == "Y" ]]; then
        printf "%-14s " "Y"
      else
        printf "%-14s " "N"
      fi
    done
    printf "%s\n" "$score_pct%"
  fi
done

# Average
if [[ $AGENT_COUNT -gt 0 ]]; then
  AVG=$((TOTAL_SCORE / AGENT_COUNT))
else
  AVG=0
fi

if $CSV_MODE; then
  echo ""
  echo "average,,,,,$AVG%"
else
  echo ""
  echo "=========================================="
  echo "  Average Fidelity: $AVG%"
  echo "  Agents Checked:   $AGENT_COUNT"
  echo "=========================================="
fi
