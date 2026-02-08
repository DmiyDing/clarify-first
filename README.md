# Clarify First

**Stop AI from guessing.** An [Agent Skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) that makes Claude and Cursor pause on vague or high-impact requests, ask a few targeted questions, and get your confirmation before changing files or running commands.

[中文](./README.zh-CN.md) · **License:** [Apache-2.0](./LICENSE)

---

## Why

AI coding assistants often **guess and proceed** when your request is ambiguous. The result: wrong edits, rework, and lost trust. Clarify First adds a risk-based gate: when the request is unclear or risky, the agent pauses, summarizes what it understands, proposes options, and waits for your go-ahead before acting.

## Example

| Without Clarify First | With Clarify First |
|-----------------------|--------------------|
| You: *"Optimize the app and ship it."* | You: *"Optimize the app and ship it."* |
| Agent starts refactoring and changing files. | Agent pauses and asks: scope (quick wins vs full refactor?), definition of "shipped", and your preferred option. |
| You: *"I only wanted to fix one slow query…"* | You: *"Quick wins; shipped = deploy to staging with green checklist."* |
| Rework and frustration. | Agent proceeds with clear scope; no rework. |

## Install

**Cursor, Claude Code, and other clients that support Agent Skills:**

```bash
npx -y skills add DmiyDing/clarify-first-skills --skill clarify-first
```

Restart your client after installation. If the skill doesn’t auto-trigger, say: *"Use the clarify-first skill."*

**Troubleshooting (Cursor):** If the skill doesn’t appear, ensure `~/.cursor/skills/clarify-first/` is a real directory (not a symlink) and contains `SKILL.md`. Reinstall with "Copy" instead of "Symlink" if needed.

**Codex (AGENTS.md):** To bake the behavior into a repo or global config, add the [snippet below](#codex-agentsmd-snippet) to `AGENTS.override.md` or `AGENTS.md`.

## Usage

After install, the skill activates when the agent detects ambiguous or high-impact requests. You can also invoke it explicitly:

- *"Use the clarify-first skill. If anything is ambiguous or high-impact, ask me the blocking questions first."*

The agent will then align on scope, ask 1–5 targeted questions (with choices when possible), and wait for your confirmation before making changes or running commands.

## How it works

- **Low risk** (read-only, small reversible edits): the agent may proceed with explicit assumptions and will stop if new ambiguity appears.
- **Medium risk** (refactors, API changes, etc.): the agent inspects first, proposes 2–3 options, asks blocking questions, and waits for confirmation before larger edits.
- **High risk** (deletes, deploy, secrets, etc.): the agent requires explicit confirmation (e.g. *"Yes, proceed"*) before taking action.

Details and workflows are in the skill body: `skills/clarify-first/SKILL.md`.

## Compatibility

- **Agent Skills**: This repo follows the [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) convention (Anthropic). The skill is a directory with a `SKILL.md` (YAML frontmatter + markdown). The agent uses the `description` field to decide when to load it.
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
skills/clarify-first/
├── SKILL.md           # Skill definition, workflow, anti-patterns
└── references/
    ├── zh-CN.md       # Chinese phrasing templates
    ├── EXAMPLES.md    # Example inputs and expected behavior
    ├── QUESTION_BANK.md
    ├── SCENARIOS.md   # Bug report, design/RFC, feature-scope scenarios
    └── NFR.md         # Non-functional requirements clarification checklist
```

The skill uses progressive disclosure: the agent loads `SKILL.md` when the skill triggers, and only opens `references/*` when needed (e.g. NFR for performance/scale, SCENARIOS for bugs or design).

## Contributing and license

Contributions are welcome. This project is licensed under [Apache-2.0](./LICENSE).
