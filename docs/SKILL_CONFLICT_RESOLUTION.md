# Skill Conflict Resolution (Vendor-Neutral)

Use this guide when multiple skills or prompts provide conflicting instructions.

## Problem Pattern
- Two or more active skills request incompatible behavior (for example: "auto-fix all" vs "must pause and clarify").
- Duplicate skill names are loaded from different skill roots.
- A secondary policy tries to bypass high-risk confirmation gates.

## Resolution Rules
1. Keep one canonical source for each skill name to avoid duplicate loading.
2. Prefer guardrail precedence for ambiguity/high-risk decisions.
3. When conflict happens, state precedence explicitly in output:
   - `Guardrail precedence applied: clarification required before execution.`
4. Do not use hidden bypasses to skip clarification or high-risk confirmation.

## Repo Hygiene
- Avoid committing machine-specific absolute paths in docs.
- Keep conflict guidance provider-agnostic so it works across clients.
- Track only durable policy patterns in this repository; keep local environment fixes out of public docs.

## Quick Checks
- No duplicate skill names across configured skill roots.
- Clarification gate is still non-bypassable.
- High-risk actions still require explicit confirmation.
