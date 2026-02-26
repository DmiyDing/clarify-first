# Clarify First Architecture

Clarify First is a prompt-level state machine for agent execution safety.

## Core States
- `TRIAGE`: classify request risk and detect ambiguity.
- `ALIGN`: produce audit snapshot, options, and blocking questions.
- `PLAN_LOCK`: require explicit user confirmation for MEDIUM/HIGH risk plans.
- `EXECUTE`: run approved actions; for dependent HIGH-risk steps, execute progressively with `Plan-ID` anchoring.
- `CHECKPOINT`: restate approved plan summary before execution in long threads.
- `PATHFINDER`: run safe read-only diagnostics when blockers cannot be answered by user.
- `SANDBOX_VALIDATE`: optional isolated validation probe when read-only diagnosis is insufficient.
- `AMEND`: request Plan Amendment when execution discovers out-of-plan file changes.
- `RECONCILE`: emit final plan-vs-actual audit summary for MEDIUM/HIGH tasks.

## Key Invariants
- Unresolved ambiguity => no MEDIUM/HIGH-risk execution.
- Critical assumption (`weight=2`) or weighted total `>=3` => stop and clarify.
- HIGH-risk actions require rollback-first planning.
- Multi-step HIGH-risk execution references a stable `Plan-ID`.
- Execution cannot mutate files outside approved Impact Matrix without explicit amendment.
- Out-of-plan discoveries are classified as Derivative Adaptation vs Logic Expansion before amendment.
- Clarify-first guardrail precedence overrides conflicting silent-execution skills for ambiguous/high-risk actions.
- Risk is adjusted by contextual modifier (core file centrality escalates; isolated sandbox/test context can de-escalate under strict conditions).
- Architectural anti-pattern requests trigger hard stop with safe alternative paths.
- Dependency/stack questions are asked only after manifest self-check when manifests exist.
- Sensitive values are always redacted in audit output.

## Handoff Payload (Machine-Composable)
When handing off to another agent/process, emit compact payload:

```json
{
  "planId": "7A2F",
  "risk": "HIGH",
  "trigger": "env-assumption",
  "scopeTag": "backend-auth",
  "intentVector": ["preserve-api-contract", "migrate-auth-flow"],
  "contextPointers": ["src/auth.ts#L40", "src/types/auth.ts#JWTConfig"],
  "approvedFiles": ["path/a.ts", "path/b.ts"],
  "rollbackStrategy": "git revert / backup restore",
  "nextStep": "Execute Step 2/3 after explicit confirmation"
}
```

## Why This Design
- Reduces guess-and-run behavior.
- Improves user-agent intent alignment.
- Prevents plan drift in long multi-turn sessions.
- Preserves UX by pairing strict protocol with concise collaborative language.
