# Changelog — webapp-defender

## [2.1.1] - 2026-04-13

### Added
- `entry_agent: shield` in squad.yaml (was missing)
- `workspace_integration.level: none` in squad.yaml
- SINKRA_TASK_METADATA + SINKRA_CONTRACT to all 38 tasks
- Acceptance criteria to all 38 tasks
- ACTIVATION-NOTICE to all 22 agents
- activation-instructions to all 22 agents
- voice_dna to all 22 agents (security-focused vocabulary)
- output_examples to all 22 agents
- anti_patterns to all 22 agents
- *help + core_principles to 4 Tier-2 tools (fix-generator, header-analyzer, policy-validator, schema-reviewer)
- .lifecycle-certified.json
- This CHANGELOG.md

## [2.1.0] - 2026-04-10

### Added
- OWASP Top 10 specialists (10 agents: A01-A10)
- owasp-full-recon-workflow.yaml
- Blue Team agents (sentinel, watchdog, code-guardian)

## [2.0.0] - 2026-03-30

### Added
- Initial squad with 12 agents, 38 tasks, 4 workflows
- Based on real-world audit data (41 findings, 9 CRITICAL)
