---
name: clarify-first
description: Risk-based clarification gate for agents. Use when a request is ambiguous, underspecified, contains conflicts, or has high-impact consequences (writing files, running commands, deleting data, deploying, spending money). The agent must do risk triage (low/medium/high); for medium/high risk or conflicts, pause and get confirmation before acting. Do not use when the request is already precise, low-risk, and has clear acceptance criteria.
---

# Clarify First (Agent Skill)

**One-line**: Prevents “guess-and-run”; when requirements are unclear or high-impact, align with the user (risk triage → recap → options → confirm) before acting.

This skill is a *meta* workflow: when requirements are unclear or conflicting, the agent must align with the user before acting.

Language rule:
- Match the user’s language. If the user writes Chinese, you may ask questions in Chinese.
- For Chinese phrasing templates, see `references/zh-CN.md`.

## When to Activate

Activate when **any** of these are true:

1. **Ambiguity**: unclear terms (“optimize it”, “make it similar”, “ASAP”, “just fix it”), missing definition of “done”, vague scope, unclear deliverables.
2. **Missing constraints**: no target platform/version, no file paths, no acceptance criteria, no performance/security/UX constraints, no deadline/priority tradeoffs.
3. **Conflicts**: requirements contradict (“no breaking changes” + “refactor everything”), budget/time vs quality, “keep minimal diff” + “major redesign”.
4. **High-impact / irreversible actions** requested: destructive ops, data loss risk, running scripts, changing production settings, publishing/deploying, spending money, contacting people.
5. **User intent mismatch risk**: the request could mean multiple things depending on context.

Do **not** activate (or keep it minimal) when the request is already precise, low-risk, and has clear acceptance criteria.

## Core Workflow (follow in order)

### Step 0 — Risk triage (B: risk-based)

Classify the next action as **low / medium / high** risk.

Use this rubric:

- **Low**: read-only inspection; formatting; adding comments/docs; adding tests (no prod impact); local-only changes that are easily reversible and clearly scoped.
- **Medium**: non-trivial refactors; changing APIs; dependency upgrades; performance/security changes without benchmarks; any change likely to ripple.
- **High**: destructive operations; running scripts with side effects; deleting data; migrations; deploy/publish; changing secrets/config; spending money; contacting people; anything hard to undo.

Tool-using agents:
- Treat **writing files** and **running commands** as at least **medium risk** if requirements or blast-radius are unclear.
- Treat commands that can modify state outside the repo (network calls, installs, migrations, deletes) as **high risk** unless explicitly approved.

Policy (risk-based):

- **Low risk**: you MAY proceed *without* asking questions, but MUST (a) state assumptions explicitly, (b) keep changes minimal and reversible, (c) stop and ask if new ambiguity appears.
- **Medium risk**: do read-only inspection first; ask targeted questions for missing constraints; propose 2–3 options; wait for confirmation before large edits.
- **High risk**: do not execute; ask for confirmation first (and consider requiring an explicit “Yes, proceed”).

### Step 1 — Context recap (alignment snapshot)

Provide a short recap (2–6 bullets) of:
- What the user asked for (as understood)
- Relevant constraints already known (repo, language, target environment, timeline)
- What you are *not* assuming yet

### Step 2 — Uncertainties & conflicts

List uncertainties as **action-blocking** vs **nice-to-have**:
- **Blocking**: must be answered to avoid wrong work
- **Optional**: can proceed with an explicit assumption if user agrees

If conflicts exist, quote them plainly and ask which requirement wins.

### Step 3 — Propose 2–3 concrete options

For each option, include:
- What will be done
- Tradeoffs (time/risk/quality)
- What you need from the user

### Step 4 — Ask targeted clarification questions

Ask the **minimum** number of questions needed (prefer **1–5** total).

Rules:
- Questions must be specific, answerable, and ordered by impact.
- Whenever possible, provide **2–3 choices** and mark a default as “(Recommended)”.
- Avoid open-ended “tell me more” unless unavoidable.

### Step 5 — Confirm and restate before acting

After the user answers, restate the finalized requirements in a short “Working Agreement”:
- Scope (in/out)
- Deliverables
- Constraints
- Acceptance criteria
- What you will do next

Then ask for a clear go-ahead: “Confirm / OK to proceed?”

Only after confirmation should the agent execute **medium/high-risk** irreversible steps.

## “Better solution” guardrail

If you see a clearly better approach than what the user requested:
- Present it as an option (don’t override the request silently).
- Explain the tradeoff briefly.
- Ask the user to choose.

## Output Template

Use this structure when clarification is needed:

1) **Alignment snapshot**
- …

2) **Open questions (Blocking)**
- Q1 (choices…)
- Q2 (choices…)

3) **Open questions (Optional)**
- …

4) **Options**
- Option A (Recommended): …
- Option B: …
- Option C: …

5) **Proposed next step**
- “If you confirm Option A + answers to Q1–Q2, I will …”

## Quick Question Bank

Use only what's relevant; prefer choices. **Full list**: See [references/QUESTION_BANK.md](references/QUESTION_BANK.md).

- **Scope**: what is in/out? single file vs whole repo?
- **Acceptance**: what does "done" mean (tests pass, metrics, screenshots, exact outputs)?
- **Risk**: is it OK to change APIs, run commands, delete/overwrite, deploy/publish?

## Examples

**Concrete examples (vague requests, conflicting constraints)**: See [references/EXAMPLES.md](references/EXAMPLES.md).
