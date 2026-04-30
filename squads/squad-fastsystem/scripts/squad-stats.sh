#!/usr/bin/env bash
# ============================================================================
# Squad FastSystem — Statistics Dashboard
# ============================================================================
# Shows statistics about the squad's files and structure
# Usage: ./scripts/squad-stats.sh
# ============================================================================

set -euo pipefail

SQUAD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "============================================"
echo " Squad FastSystem — Statistics"
echo "============================================"
echo ""

# File counts
TASKS=$(find "${SQUAD_DIR}/tasks" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
WORKFLOWS=$(find "${SQUAD_DIR}/workflows" -name "*.yaml" 2>/dev/null | wc -l | tr -d ' ')
TEMPLATES=$(find "${SQUAD_DIR}/templates" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
CHECKLISTS=$(find "${SQUAD_DIR}/checklists" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
PLAYBOOKS=$(find "${SQUAD_DIR}/playbooks" -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
MINDS=$(find "${SQUAD_DIR}/minds" -mindepth 1 -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')
DATA=$(find "${SQUAD_DIR}/data" -type f 2>/dev/null | wc -l | tr -d ' ')
CONFIG=$(find "${SQUAD_DIR}/config" -type f 2>/dev/null | wc -l | tr -d ' ')
BENCHMARKS=$(find "${SQUAD_DIR}/benchmarks" -type f 2>/dev/null | wc -l | tr -d ' ')

echo "File Counts:"
echo "  Tasks:        ${TASKS}"
echo "  Workflows:    ${WORKFLOWS}"
echo "  Templates:    ${TEMPLATES}"
echo "  Checklists:   ${CHECKLISTS}"
echo "  Playbooks:    ${PLAYBOOKS}"
echo "  Minds:        ${MINDS}"
echo "  Data files:   ${DATA}"
echo "  Config files: ${CONFIG}"
echo "  Benchmarks:   ${BENCHMARKS}"
echo ""

# Total files
TOTAL_FILES=$(find "${SQUAD_DIR}" -type f | wc -l | tr -d ' ')
echo "  Total files:  ${TOTAL_FILES}"
echo ""

# Line counts
echo "Line Counts by Category:"
for dir in tasks workflows templates checklists playbooks data config benchmarks; do
    if [[ -d "${SQUAD_DIR}/${dir}" ]]; then
        LINES=$(find "${SQUAD_DIR}/${dir}" -type f -exec cat {} + 2>/dev/null | wc -l | tr -d ' ')
        printf "  %-14s %s lines\n" "${dir}:" "${LINES}"
    fi
done

TOTAL_LINES=$(find "${SQUAD_DIR}" -type f -name "*.md" -o -name "*.yaml" -o -name "*.json" -o -name "*.sh" | xargs cat 2>/dev/null | wc -l | tr -d ' ')
echo ""
echo "  Total lines:  ${TOTAL_LINES}"
echo ""

# Minds detail
echo "Minds Detail:"
for mind_dir in "${SQUAD_DIR}/minds"/*/; do
    if [[ -d "${mind_dir}" ]]; then
        mind_name=$(basename "${mind_dir}")
        heuristics=$(find "${mind_dir}" -name "*.yaml" -o -name "*.md" | grep -v VOICE_DNA | wc -l | tr -d ' ')
        has_voice="No"
        [[ -f "${mind_dir}/artifacts/VOICE_DNA.md" ]] && has_voice="Yes"
        printf "  %-20s Heuristics: %s  VOICE_DNA: %s\n" "${mind_name}" "${heuristics}" "${has_voice}"
    fi
done
echo ""

# Size
TOTAL_SIZE=$(du -sh "${SQUAD_DIR}" 2>/dev/null | cut -f1)
echo "Total size: ${TOTAL_SIZE}"
echo ""
echo "============================================"
