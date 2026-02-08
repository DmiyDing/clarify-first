# Scenario-Based Clarification

Use these when the request fits a common SDLC situation. Load this file when the user mentions bugs, design/RFC, or feature scope.

---

## Bug report (receiving a bug)

**Do not fix immediately.** Clarify first:

- **Repro steps**: Exact steps to reproduce (environment, version, inputs).
- **Expected vs actual**: What should happen vs what happens. Any error message or screenshot?
- **Environment**: OS, runtime version, config (e.g. env vars). Reproducible in another environment?
- **Scope**: One-off workaround vs root-cause fix? Any regression risk or side effects?

Then restate in 1–2 sentences and ask: “If I fix it by [approach], is that in scope?”

---

## Design / RFC / technical proposal

**Clarify boundaries and NFR before diving into implementation.**

- **Boundaries**: In scope vs out of scope. What is explicitly *not* in this change?
- **Goals**: Primary goal in one sentence. Success criteria?
- **Non-functional**: Performance, scale, compatibility, rollout—see [NFR.md](NFR.md).
- **Alternatives**: Have you considered X? If so, why prefer this approach?

Capture “Definition of Done” or Given-When-Then for the design doc or first deliverable.

---

## Feature or “optimize / refactor” request

- **Scope**: Single module vs whole codebase? Which areas are off-limits?
- **Done**: How do we know we’re done (tests, metrics, review checklist)?
- **Risk**: Allowed to change APIs, add dependencies, or run migrations? Rollback plan?
- **Priority**: Quick win vs full redesign? Timeline or deadline?

Use the main workflow (alignment snapshot → blocking questions → options → confirm) and link to [QUESTION_BANK.md](QUESTION_BANK.md) and [NFR.md](NFR.md) when relevant.
