# Changelog

All notable changes to Squad FastSystem will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-07-14

### Changed
- Aligned agent names across config.yaml, README.md, and agent files (source of truth: agent files)
- Updated README tier diagram and agent summary table with correct IDs and names
- Added activation-instructions to all 11 agents (AIOX structural compliance)
- Added handoff_to routing section to all 11 agents with tier-based routing logic
- Added SINKRA_TASK_METADATA blocks to all 12 tasks (8-field standard compliance)
- Bumped version to 1.1.0

### Fixed
- README had stale agent IDs (performance-lead, frontend-performance, api-performance, load-tester, devops-performance, distributed-systems) that did not match config.yaml or agent files
- Agent names were inconsistent: config.yaml used persona names (Probe, Pixel, etc.) while agent files used mind-based names (Gregg, WebPerf, etc.)

## [1.0.0] - 2026-03-13

### Added
- Initial release of Squad FastSystem
- 11 agents: Orchestrator (Blaze), T0 (Probe, Lens), T1 (Pixel, Query, Flux, Shield), T2 (Surge, Pipe, Mesh), Specialist (Cache)
- 12 tasks covering system diagnostic, query optimization, frontend audit, caching, load testing, bottleneck analysis, resilience, deployment pipeline, database indexing, API latency, capacity planning, performance budgets
- 4 workflows: performance-triage, full-system-optimization, incident-response-performance, scaling-readiness
- 6 templates: performance audit report, bottleneck analysis, caching strategy, capacity planning, optimization roadmap, DORA metrics dashboard
- 5 checklists: pre-deployment performance, database performance, frontend performance, resilience, caching
- 4 playbooks: producao-lenta, migracao-sem-downtime, escalar-10x, otimizar-custo-cloud
- 10 elite minds: Brendan Gregg, Charity Majors, Addy Osmani, Steve Souders, Markus Winand, Martin Kleppmann, Michael Nygard, Alex Xu, Chris Richardson, Nicole Forsgren
- Knowledge base, benchmarks, optimization patterns, tool reference, anti-patterns catalog
- Governance config: veto conditions, quality gates, heuristics
- Scripts: validate-squad, squad-stats, fidelity-report
- Benchmarks: smoke test suite, baseline registry
