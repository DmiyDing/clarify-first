# Clarify First: The "Ask-Before-Act" Protocol

[![License](https://img.shields.io/github/license/DmiyDing/clarify-first)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/DmiyDing/clarify-first/pulls)
[![Spec](https://img.shields.io/badge/Spec-Agent--Skills-blueviolet)](https://agentskills.io/specification)
[![Cursor Compatible](https://img.shields.io/badge/Cursor-Compatible-blue)](https://cursor.com)

**Stop your AI from guessing. Clarify First is a deterministic state-machine and safety middleware that forces agents to ask before acting on ambiguous or high-risk tasks.**

Clarify First is a protocol-first skill focused on one thing: **alignment before execution**. It blocks silent assumptions, enforces explicit confirmation, and keeps plan vs execution auditable.

[中文](./README.zh-CN.md) · **License:** [Apache-2.0](./LICENSE)

---

## Why You Need This
Most coding agents optimize for immediacy, not certainty. In ambiguous or high-impact requests, this creates hidden assumptions and expensive mistakes.

**Clarify First** flips the default to: **Clarify First, Code Second**.

## Without vs With

| Without Clarify First | With Clarify First |
|-----------------------|--------------------|
| User: "Delete old files." | User: "Delete old files." |
| Agent runs destructive command with assumptions. | Agent emits risk header, asks target scope + rollback, waits for confirmation. |
| Result: Wrong scope / hard recovery. | Result: Intent-aligned, reversible execution path. |

## Feature Matrix

| Capability | Included |
|------------|----------|
| Non-bypass clarification gate | ✅ |
| Weighted assumption triage | ✅ |
| Two-phase plan lock (Plan -> Confirm -> Execute) | ✅ |
| Strict execution boundary + amendment protocol | ✅ |
| Progressive execution for dependent high-risk actions | ✅ |
| Plan-ID anchoring + long-thread checkpoint recall | ✅ |
| Security redaction in audit outputs | ✅ |
| Architectural anti-pattern hard stop | ✅ |
| Contextual risk modifier (file centrality aware) | ✅ |
| Final reconciliation (plan vs actual) | ✅ |
| Multi-agent handoff payload (scoped pointers) | ✅ |
| Adversarial trigger tests in tooling | ✅ |

## Example: The Power of a Question

| Blind Execution (Standard) | Clarified Execution (With This Skill) |
|-----------------------|--------------------|
| You: *"Optimize the app."* | You: *"Optimize the app."* |
| Agent starts massive refactors. | Agent: **"Risk: Medium. I need to clarify: are we optimizing for runtime speed, bundle size, or code readability?"** |
| Result: Broken code, wrong focus. | Result: The AI does exactly what you needed. |

## Fast Onboarding (TTFV)

### 1) Cursor / Windsurf style clients
- Copy [`/.cursorrules`](./.cursorrules) into your project root (or merge into your existing rules file).

### 2) Agent Skills compatible clients
- Install from registry/repo:

```bash
npx -y skills add DmiyDing/clarify-first
```

Restart your client after installation. If auto-trigger is weak, explicitly invoke: *"Use the clarify-first skill."*

### 3) Codex / AGENTS.md environments
- Add the [snippet below](#codex-agentsmd-snippet) to `AGENTS.override.md` or `AGENTS.md`.

### 4) Framework orchestration (LangChain / Dify / custom agent runtime)
- Inject core protocol as system policy from [`clarify-first/SKILL.md`](./clarify-first/SKILL.md).
- Keep references (`references/*`) as on-demand context files, not always-on prompt payload.

## Usage

After install, the skill activates when the agent detects ambiguous or high-impact requests. You can also invoke it explicitly:

- *"Use the clarify-first skill. If anything is ambiguous or high-impact, ask me the blocking questions first."*

The agent will then align on scope, ask 1–5 targeted questions (with choices when possible), and wait for your confirmation before making changes or running commands.

## Testing as Documentation

Protocol behavior is assertion-tested in:
- [`tooling/test-triggers.js`](./tooling/test-triggers.js)
- [`tooling/verify-version.js`](./tooling/verify-version.js)

This makes the skill specification verifiable, not only descriptive.

## How it works

- **Low risk** (read-only, small reversible edits): the agent may proceed with explicit assumptions and will stop if new ambiguity appears.
- **Medium risk** (refactors, API changes, etc.): the agent inspects first, proposes 2–3 options, asks blocking questions, and waits for confirmation before larger edits.
- **High risk** (deletes, deploy, secrets, etc.): the agent requires explicit confirmation (e.g. *"Yes, proceed"*) before taking action.

Details and workflows are in the skill body: `clarify-first/SKILL.md`.

## Compatibility

- **Agent Skills**: This repo follows the [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) convention (Anthropic). The skill lives in the `clarify-first/` directory: `clarify-first/SKILL.md` (YAML frontmatter + Markdown).
- **Clients**: Cursor, Claude Code, Codex, and any client that supports loading Agent Skills from a GitHub repo or local path.

### Codex AGENTS.md snippet

For Codex, paste this into `AGENTS.override.md` or `AGENTS.md` (repo or `~/.codex/`):

```markdown
# Clarify First (risk-based)

When a request is ambiguous, underspecified, conflicting, or high-impact, do not guess.

Risk triage:
- Low: proceed with explicit assumptions and minimal reversible steps; stop if new ambiguity appears.
- Medium: inspect read-only first; propose 2–3 options; ask only blocking questions; wait for confirmation before larger edits or running commands.
- High: require explicit confirmation ("Yes, proceed") before any irreversible action (side-effect commands, deletion/overwrite, migrations, deploy/publish, secrets/config changes, spending money, contacting people).

If you see a better approach than requested, present it as an option and ask the user to choose.
```

## Repository structure

```
.
├── clarify-first/
│   ├── SKILL.md          # Core skill definition (Markdown)
│   └── references/       # Context files loaded on demand
├── docs/                 # Architecture notes and roadmap
├── tooling/              # Maintenance scripts
├── .cursorrules          # Cursor rule template (condensed)
├── CHANGELOG.md          # Version history
└── CONTRIBUTING.md       # Contribution guide
```

## Standards & Compliance
This skill follows the [Agent Skills specification](https://agentskills.io/specification) and is compatible with:
*   [Claude Code](https://claude.ai)
*   [Cursor](https://cursor.com)

The skill uses progressive disclosure: the agent loads `clarify-first/SKILL.md` when the skill triggers, and only opens `references/*` when needed.

## Future Roadmap

See [`docs/FUTURE_OPTIMIZATIONS.md`](./docs/FUTURE_OPTIMIZATIONS.md) for planned enhancements after v1.3.0:
- **Adaptive Confidence Threshold**: Dynamic threshold adjustment based on user behavior (beginner: 90%, expert: 70%)
- Enhanced multilingual support
- Context memory improvements
- Collaboration features

## Contributing and license

Contributions are welcome. This project is licensed under [Apache-2.0](./LICENSE).

Before publishing, follow [`docs/RELEASE_CHECKLIST.md`](./docs/RELEASE_CHECKLIST.md).
