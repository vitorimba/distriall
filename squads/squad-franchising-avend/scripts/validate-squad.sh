#!/usr/bin/env bash
# ==============================================================================
# validate-squad.sh — Structural Validator for Franchising Avend Squad
# Checks 7 sections: config, agents, agent-structure, governance, minds,
# benchmarks, scripts. Outputs PASS/FAIL/WARNING per section.
# ==============================================================================

set -euo pipefail

SQUAD_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PASS=0
FAIL=0
WARN=0

section() {
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  $1"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

pass() {
  echo "  [PASS] $1"
  PASS=$((PASS + 1))
}

fail() {
  echo "  [FAIL] $1"
  FAIL=$((FAIL + 1))
}

warn() {
  echo "  [WARNING] $1"
  WARN=$((WARN + 1))
}

echo "=========================================="
echo "  Squad Validator — Franchising Avend"
echo "  Squad Dir: $SQUAD_DIR"
echo "=========================================="

# ──────────────────────────────────────────────
# 1. Config Validation
# ──────────────────────────────────────────────
section "1/7 — Config Validation"

if [[ -f "$SQUAD_DIR/config.yaml" ]]; then
  pass "config.yaml exists"
else
  fail "config.yaml not found"
fi

# Check valid YAML (requires yq or python)
if command -v python3 &>/dev/null; then
  if python3 -c "import yaml; yaml.safe_load(open('$SQUAD_DIR/config.yaml'))" 2>/dev/null; then
    pass "config.yaml is valid YAML"
  else
    fail "config.yaml is NOT valid YAML"
  fi
elif command -v yq &>/dev/null; then
  if yq eval '.' "$SQUAD_DIR/config.yaml" &>/dev/null; then
    pass "config.yaml is valid YAML"
  else
    fail "config.yaml is NOT valid YAML"
  fi
else
  warn "No YAML validator available (install python3 or yq)"
fi

# ──────────────────────────────────────────────
# 2. Agent Count Check
# ──────────────────────────────────────────────
section "2/7 — Agent Count"

EXPECTED_AGENTS=13
if [[ -d "$SQUAD_DIR/agents" ]]; then
  AGENT_COUNT=$(find "$SQUAD_DIR/agents" -maxdepth 1 -name "*.md" | wc -l | tr -d ' ')
  if [[ "$AGENT_COUNT" -eq "$EXPECTED_AGENTS" ]]; then
    pass "Agent count: $AGENT_COUNT (expected $EXPECTED_AGENTS)"
  else
    fail "Agent count: $AGENT_COUNT (expected $EXPECTED_AGENTS)"
  fi
else
  fail "agents/ directory not found"
fi

# ──────────────────────────────────────────────
# 3. Agent Structure (7 required YAML sections)
# ──────────────────────────────────────────────
section "3/7 — Agent Structure"

REQUIRED_SECTIONS=("thinking_dna" "heuristics" "scope" "immune_system" "voice_dna" "handoff_to" "smoke_tests")

if [[ -d "$SQUAD_DIR/agents" ]]; then
  for agent_file in "$SQUAD_DIR/agents"/*.md; do
    agent_name=$(basename "$agent_file" .md)
    missing=()
    for key in "${REQUIRED_SECTIONS[@]}"; do
      if ! grep -q "^${key}:" "$agent_file" 2>/dev/null && \
         ! grep -q "^  ${key}:" "$agent_file" 2>/dev/null && \
         ! grep -q "${key}:" "$agent_file" 2>/dev/null; then
        missing+=("$key")
      fi
    done
    if [[ ${#missing[@]} -eq 0 ]]; then
      pass "$agent_name — all 7 sections present"
    elif [[ ${#missing[@]} -le 2 ]]; then
      warn "$agent_name — missing: ${missing[*]}"
    else
      fail "$agent_name — missing ${#missing[@]} sections: ${missing[*]}"
    fi
  done
else
  fail "agents/ directory not found"
fi

# ──────────────────────────────────────────────
# 4. Governance Files
# ──────────────────────────────────────────────
section "4/7 — Governance Files"

GOVERNANCE_FILES=("config/veto-conditions.yaml" "config/quality-gates.yaml" "config/heuristics.yaml")

for gf in "${GOVERNANCE_FILES[@]}"; do
  if [[ -f "$SQUAD_DIR/$gf" ]]; then
    pass "$(basename "$gf") exists"
  else
    fail "$(basename "$gf") not found at $gf"
  fi
done

# ──────────────────────────────────────────────
# 5. Minds Folder
# ──────────────────────────────────────────────
section "5/7 — Minds"

EXPECTED_MINDS=10
if [[ -d "$SQUAD_DIR/minds" ]]; then
  MIND_COUNT=$(find "$SQUAD_DIR/minds" -maxdepth 1 -name "*.md" | wc -l | tr -d ' ')
  if [[ "$MIND_COUNT" -ge "$EXPECTED_MINDS" ]]; then
    pass "Mind count: $MIND_COUNT (expected $EXPECTED_MINDS)"
  elif [[ "$MIND_COUNT" -gt 0 ]]; then
    warn "Mind count: $MIND_COUNT (expected $EXPECTED_MINDS)"
  else
    fail "Mind count: 0 (expected $EXPECTED_MINDS)"
  fi
else
  fail "minds/ directory not found"
fi

# ──────────────────────────────────────────────
# 6. Benchmarks
# ──────────────────────────────────────────────
section "6/7 — Benchmarks"

if [[ -d "$SQUAD_DIR/benchmarks/smoke-tests" ]]; then
  pass "smoke-tests directory exists"
else
  warn "benchmarks/smoke-tests/ not found"
fi

if [[ -d "$SQUAD_DIR/benchmarks/golden-baselines" ]]; then
  pass "golden-baselines directory exists"
else
  warn "benchmarks/golden-baselines/ not found"
fi

# ──────────────────────────────────────────────
# 7. Scripts Self-Check
# ──────────────────────────────────────────────
section "7/7 — Scripts"

EXPECTED_SCRIPTS=("scripts/validate-squad.sh" "scripts/squad-stats.sh" "scripts/fidelity-report.sh")

for sf in "${EXPECTED_SCRIPTS[@]}"; do
  if [[ -f "$SQUAD_DIR/$sf" ]]; then
    if [[ -x "$SQUAD_DIR/$sf" ]]; then
      pass "$(basename "$sf") exists and is executable"
    else
      warn "$(basename "$sf") exists but is NOT executable"
    fi
  else
    fail "$(basename "$sf") not found"
  fi
done

# ──────────────────────────────────────────────
# Summary
# ──────────────────────────────────────────────
echo ""
echo "=========================================="
echo "  SUMMARY"
echo "=========================================="
echo "  PASS:    $PASS"
echo "  FAIL:    $FAIL"
echo "  WARNING: $WARN"
echo "=========================================="

if [[ $FAIL -gt 0 ]]; then
  echo "  Result: FAIL ($FAIL issues found)"
  exit 1
elif [[ $WARN -gt 0 ]]; then
  echo "  Result: WARNING ($WARN warnings)"
  exit 0
else
  echo "  Result: ALL PASS"
  exit 0
fi
