# Clarify First — Examples

Concrete examples of when and how to apply the clarification workflow. Use **English inputs** when the agent or users work mainly in English; use **Chinese inputs** when the request is in Chinese (see Language rule in SKILL.md).

---

## Example 1 — Vague coding request

**Input (English)**: "Optimize this project and get it shipped ASAP."

**Input (中文)**: "帮我把这个项目优化一下，尽快上线。"

**Expected behavior** (same for either):
- Snapshot: what "optimize" might mean (performance / UX / bundle size / test flakiness) and what "shipped" implies (env, done criteria).
- Blocking questions: target environment, definition of "done", constraints (e.g. no breaking changes?).
- Options: e.g. "quick wins only" vs "full refactor" vs "perf profiling first".
- Wait for confirmation before making changes.

---

## Example 2 — Conflicting constraints

**Input (English)**: "Don't change the API, but refactor the backend into microservices."

**Input (中文)**: "不要改接口，但把后端彻底重构成微服务。"

**Expected behavior** (same for either):
- Call out the conflict: "full refactor" / "彻底重构" often implies interface or contract risk.
- Ask which has priority and what migration path is acceptable.
- Propose phased options (e.g. facade first, then internal split) and get confirmation.
