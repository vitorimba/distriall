# Changelog — squad-responsive

All notable changes to this squad will be documented in this file.

## [1.0.1] - 2026-04-13

### Added
- `workspace_integration.level: none` in config.yaml (T1-WSP-001 compliance)
- 3 missing templates: responsive-audit-report-tmpl.md, media-audit-report-tmpl.md, token-audit-report-tmpl.md
- `voice_dna` section to css-layout-engineer (Rachel Andrew + Stephanie Eckles)
- `ACTIVATION-NOTICE` and `IDE-FILE-RESOLUTION` to css-layout-engineer
- `agent.title` field to all 7 agents
- `core_principles` to responsive-chief, css-layout-engineer, mobile-first-architect
- `*exit` command to agents missing it
- `dependencies` section to mobile-first-architect
- `SINKRA_TASK_METADATA` and `SINKRA_CONTRACT` to all 6 tasks
- `acceptance_criteria` to all 6 tasks
- `slashPrefix` to config.yaml
- `templates` list to config.yaml
- This CHANGELOG.md

### Fixed
- `@responsive-dev` references → `@css-layout-engineer` in responsive-auditor (4 refs)
- README: 6 phases → 8 phases to match workflow
- css-layout-engineer: added `# heading` as first line for slash command description

## [1.0.0] - 2026-03-27

### Added
- Initial squad release with 7 agents, 6 tasks, 1 workflow
- 9 breakpoint targets (320px–3440px)
- 11 mind sources across all agents
- 3 checklists, 2 templates, 1 data file
