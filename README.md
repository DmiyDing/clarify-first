# Clarify First Skills (Agent Skill)

[中文 README](./README.zh-CN.md)

A risk-based clarification gate for AI agents and AI coding tools. When a request is ambiguous, underspecified, or conflicting, the agent must **pause**, summarize context, ask targeted clarification questions, and obtain confirmation before taking medium/high-risk actions.

- Skill: `skills/clarify-first/SKILL.md`
- Skill name: `clarify-first`
- License: Apache-2.0

## Why

AI assistants fail in a predictable way: **they guess** and proceed. That creates wrong work, rework, and trust loss.

This skill enforces:
- Clear alignment when uncertainty is high
- Explicit assumptions when uncertainty is low
- A safety valve before irreversible actions

## What it does (Mode B: risk-based)

- **Low risk**: proceed with explicit assumptions + minimal, reversible steps; stop if new ambiguity appears
- **Medium risk**: inspect first, propose 2–3 options, ask only the blocking questions, then wait for confirmation before larger edits
- **High risk**: require explicit confirmation before any irreversible action (running side-effect commands, deletion/overwrite, migrations, deploy/publish, secrets/config changes, spending money, contacting people)

## What are “Agent Skills” (practical)

This repo follows the Agent Skills convention (as used in Anthropic examples):
- A skill is a folder containing a required `SKILL.md`
- `SKILL.md` starts with YAML frontmatter (at minimum `name` + `description`)
- The agent uses `description` to decide when to activate the skill; the body is the workflow once activated

## Install

### 1) Tools that support Agent Skills / skills CLI

If your agent/client supports installing skills via a CLI, install from GitHub:

```bash
npx -y skills add https://github.com/DmiyDing/clarify-first-skills@clarify-first --agent <agent-name>
```

Notes:
- You may need to restart your client after installation.
- If auto-trigger is flaky, explicitly say: “Use the `clarify-first` skill.”

### 2) OpenAI Codex CLI (recommended integration)

OpenAI Codex CLI does not natively consume Anthropic-style “Agent Skills folders”. The most reliable way is to **copy the policy into your project’s `AGENTS.md`** so Codex auto-loads it.

Minimal pattern:
- Copy the “Core Workflow” rules from `skills/clarify-first/SKILL.md` into `AGENTS.md`
- Keep it short; link back to this repo for full details

If you want, tell me where you want it applied (global vs per-repo) and I’ll generate a clean `AGENTS.md` snippet optimized for Codex CLI.

## Use

Most reliable:
- “Use the `clarify-first` skill. If anything is ambiguous or high-impact, ask me the blocking questions first.”

## Design principles

- Alignment before action when uncertainty is high
- Ask fewer, better questions (prefer choices; 1–5 questions)
- Provide options with tradeoffs (don’t silently override user intent)
- Progressive disclosure: keep the core workflow compact; move long examples into references
- Reversible by default: small steps → confirm → expand

## Repo layout

```
skills/
  clarify-first/
    SKILL.md
    references/
      zh-CN.md
```

## Publishing to Smithery (later)

Once you’ve validated the repo in real usage:
- Create a release/tag (e.g. `v0.1.0`)
- Publish the GitHub URL on Smithery as a Skill listing (so users can install via a `smithery.ai/skills/<namespace>/<slug>` URL)
- Add a short “Install” section in the Smithery listing that mirrors the CLI command above
- Ask early users to submit reviews (Smithery supports reviews on skill pages)

## GitHub Description (copy/paste)

`Risk-based clarification gate for AI agents — ask before acting on ambiguous or high-impact requests. 需求不清先澄清再执行。`

