# Future Optimizations

This document tracks planned improvements after `v1.3.0`.

## Post-1.3.0 Candidates
- Adaptive confidence threshold by user preference/profile.
- Better multilingual template coverage beyond English/Chinese.
- Better long-context memory reminders and recovery prompts.
- Optional output compact mode for high-frequency users.
- Machine-readable risk blocks (for example `<risk-assessment>` / `<execution-checkpoint>`) for IDE-native confirm UIs.
- Plan signature ergonomics (auto-generated short IDs with step references).
- Pathfinder mode templates for deadlock resolution via read-only probes.
- Trigger attribution schema (`rule`, `weight`, `scope`) for transparent guardrail decisions.
- Reasoning-model aware output profile (internal audit, concise external report).
- Compact expert output profile (`MODE=EXPERT`) with on-demand expansion (`explain`).
- Structured telemetry export from risk headers for IDE dashboards.
- Shadow-branch probing templates for compiled ecosystems (C++/Rust/Go) when read-only probing is insufficient.
- Blast-radius calculus for amendment ergonomics (derivative adaptation batching vs logic-expansion hard stops).
- Meta-skill precedence schema for cross-skill conflict resolution in multi-skill stacks.
- Conservative trust annealing research: never relax HIGH-risk confirmation, only explore reduced repetition for repeatedly verified low-risk assumptions.
- Quantitative file-centrality scoring (import graph / call graph) for automatic contextual risk modifier.
- Contradiction knowledge base for anti-pattern detection across common stacks (web, data, infra, mobile).
- Confidence auto-scoring utility based on verified-entity ratio instead of manually chosen percentages.
- Post-execution reconciliation automation that compares approved payload vs actual diff in tool-enabled environments.

## Backlog
- Optional machine-readable policy profile (strict/normal/fast-track).
- Structured telemetry checklist for skill behavior evaluation.
- Additional examples for incident-response and rollback-heavy workflows.
- Automatic plan drift detector between approved plan and generated actions.
- Router/protocol split (`SKILL.md` as router, detailed protocol in references/PROTOCOL.md).
- Multi-agent swarm contract: signed handoff payload validation and inheritance checks.

## Notes
- Keep this roadmap non-breaking by default.
- Update `CHANGELOG.md` and version fields when roadmap items ship.
