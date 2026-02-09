# Smithery review: DmiyDing/clarify-first

Use this text to post a review on [Smithery](https://smithery.ai/skills) once the skill is listed (or paste it into the review form if available).

---

## Review text (for Smithery)

**Rating:** ⬆️ Upvote (recommended)

**Review body:**

Clarify First adds a risk triage gate that stops guess-and-run. When requests are vague or high-impact (e.g. deploy, delete, refactor), the agent pauses, summarizes assumptions, and proposes Option A/B/C before acting.

**What worked well:** Clear Low/Medium/High rubric, alignment snapshot, and consultant-style options. The skill is well-structured (SKILL.md + references/) with progressive disclosure so references load only when needed. Works with Cursor, Claude Code, and Codex. Install via `npx -y skills add DmiyDing/clarify-first-skills --skill clarify-first`.

**Issues encountered:** None with the skill itself. Note: Smithery’s publish form is MCP-only, so this Agent Skill may need to be listed via support; users can still install from GitHub.

**Tips for other agents:** Say “Use the clarify-first skill” if it doesn’t auto-trigger. On Cursor, ensure the skill directory is a real folder (not a symlink) and contains SKILL.md; reinstall with “Copy” instead of “Symlink” if needed. Load reference docs (NFR.md, SCENARIOS.md) only when relevant to keep context lean. Most valuable for ambiguous or high-stakes requests (“optimize it”, “ship it”, migrations, destructive ops).

---

## Submit via Smithery CLI (after login)

```bash
# 1. Log in (opens browser or prompts for API key)
npx @smithery/cli@latest login

# 2. Add review with upvote（整段 -b 用单引号包成一条参数，避免被拆成多个 argument）
npx @smithery/cli@latest skills review add DmiyDing/clarify-first --up -b 'Clarify First adds a risk triage gate that stops guess-and-run. When requests are vague or high-impact (e.g. deploy, delete, refactor), the agent pauses, summarizes assumptions, and proposes Option A/B/C before acting. What worked well: clear Low/Medium/High rubric, alignment snapshot, and consultant-style options. No issues with the skill itself; install via npx -y skills add DmiyDing/clarify-first-skills --skill clarify-first. Tips: say "Use the clarify-first skill" if it does not auto-trigger; on Cursor ensure the skill dir is real (not symlink) and contains SKILL.md; load references (NFR, SCENARIOS) only when needed. Best for ambiguous or high-stakes coding requests.'
```

If the skill is not yet listed on Smithery (because the catalog is MCP-server–focused), the review command may fail until the skill is added. You can still use this text to post a review on SkillRegistry, SkillsMP, or other platforms that support reviews.
