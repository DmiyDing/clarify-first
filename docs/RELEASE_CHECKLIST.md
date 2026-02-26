# Release Checklist (Open Source)

Use this checklist before tagging or publishing.

## 1. Repository Hygiene
- Ensure `git status` has no unintended files.
- Ensure `docs/` is tracked (no `?? docs/`).
- Ensure no machine-specific absolute paths or local-only commands are committed.

## 2. Protocol Consistency
- `clarify-first/SKILL.md` is the source of truth.
- `references/*`, `.cursorrules`, and `docs/*` are semantically aligned with `SKILL.md`.
- `CHANGELOG.md` describes shipped behavior, not speculative behavior.

## 3. Verification
- Run:
  - `npm run verify-version`
  - `node tooling/test-triggers.js`
- Confirm all checks pass.

## 4. Versioning Policy
- Do not bump versions for wording-only edits.
- Bump only when behavior/protocol semantics change.
- Keep the version synchronized across:
  - `package.json`
  - `clarify-first/SKILL.md` frontmatter
  - latest numeric entry in `CHANGELOG.md`
  - version declarations in `clarify-first/references/*.md`

## 5. Release Notes Quality
- Include:
  - what changed
  - why it changed
  - risk/compatibility impact
  - migration guidance (if any)

## 6. Optional Pre-Release Smoke Test
- Run one low-risk scenario.
- Run one medium-risk scenario with plan confirmation.
- Run one high-risk scenario with explicit gate confirmation.
