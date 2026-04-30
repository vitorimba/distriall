#!/usr/bin/env bash
# ============================================================================
# Squad FastSystem — Fidelity Report
# ============================================================================
# Checks how well each agent's mind heuristics are referenced in tasks
# Usage: ./scripts/fidelity-report.sh
# ============================================================================

set -euo pipefail

SQUAD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "============================================"
echo " Squad FastSystem — Fidelity Report"
echo "============================================"
echo ""

# Agent-Mind mapping
declare -A AGENT_MIND
AGENT_MIND[system-profiler]="brendan_gregg"
AGENT_MIND[observability-engineer]="charity_majors"
AGENT_MIND[frontend-performance]="addy_osmani"
AGENT_MIND[database-optimizer]="markus_winand"
AGENT_MIND[api-performance]="alex_xu"
AGENT_MIND[resilience-engineer]="michael_nygard"
AGENT_MIND[caching-specialist]="steve_souders"
AGENT_MIND[devops-performance]="nicole_forsgren"
AGENT_MIND[distributed-systems]="martin_kleppmann"

# Heuristic prefixes per mind
declare -A MIND_PREFIX
MIND_PREFIX[brendan_gregg]="BG_USE"
MIND_PREFIX[charity_majors]="CM_OBS"
MIND_PREFIX[addy_osmani]="AO_WP"
MIND_PREFIX[steve_souders]="SS_WP"
MIND_PREFIX[markus_winand]="MW_SQL"
MIND_PREFIX[martin_kleppmann]="MK_DS"
MIND_PREFIX[michael_nygard]="MN_RE"
MIND_PREFIX[alex_xu]="AX_SD"
MIND_PREFIX[chris_richardson]="CR_MS"
MIND_PREFIX[nicole_forsgren]="NF_DO"

echo "Agent Fidelity Analysis:"
echo "========================"
echo ""

TOTAL_REFS=0
TOTAL_EXPECTED=0

for agent in "${!AGENT_MIND[@]}"; do
    mind="${AGENT_MIND[$agent]}"
    prefix="${MIND_PREFIX[$mind]}"

    # Count heuristic references in tasks
    refs=$(grep -rl "${prefix}" "${SQUAD_DIR}/tasks/" 2>/dev/null | wc -l | tr -d ' ')

    # Count heuristic references in all files
    total_refs=$(grep -r "${prefix}" "${SQUAD_DIR}/" --include="*.md" --include="*.yaml" 2>/dev/null | wc -l | tr -d ' ')

    TOTAL_REFS=$((TOTAL_REFS + total_refs))
    TOTAL_EXPECTED=$((TOTAL_EXPECTED + 2))

    # Check if mind directory has heuristics defined
    mind_files=0
    if [[ -d "${SQUAD_DIR}/minds/${mind}" ]]; then
        mind_files=$(find "${SQUAD_DIR}/minds/${mind}" -type f | wc -l | tr -d ' ')
    fi

    # Voice DNA
    voice="Missing"
    [[ -f "${SQUAD_DIR}/minds/${mind}/artifacts/VOICE_DNA.md" ]] && voice="Present"

    printf "  Agent: %-25s Mind: %-20s\n" "${agent}" "${mind}"
    printf "    Prefix: %-10s Task refs: %-3s Total refs: %-3s Mind files: %-3s Voice: %s\n" \
        "${prefix}" "${refs}" "${total_refs}" "${mind_files}" "${voice}"
    echo ""
done

echo "========================"
echo "Summary:"
echo "  Total heuristic references: ${TOTAL_REFS}"
echo "  Expected minimum (2 per mind): ${TOTAL_EXPECTED}"
echo ""

if [[ ${TOTAL_REFS} -ge ${TOTAL_EXPECTED} ]]; then
    echo "  Status: GOOD — All minds have sufficient references"
else
    echo "  Status: NEEDS IMPROVEMENT — Some minds lack references"
fi
echo ""
echo "============================================"
