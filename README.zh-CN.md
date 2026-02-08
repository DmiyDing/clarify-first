# Clarify First

**先澄清，再执行。** 一个 [Agent Skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)，让 Claude、Cursor 等在遇到模糊或高风险请求时先暂停，问清关键问题并在你确认后再改代码或执行命令。

[English](./README.md) · **协议：** [Apache-2.0](./LICENSE)

---

## 为什么需要

AI 编程助手在需求不清时常常**猜着做**，结果就是改错、返工和信任损耗。Clarify First 加了一道「风险分级」的闸门：当请求模糊或风险较高时，agent 会先暂停、梳理理解、给出选项，并在你明确同意后再动手。

## 效果对比

| 未使用 Clarify First | 使用 Clarify First |
|----------------------|--------------------|
| 你：「把应用优化一下然后上线。」 | 你：「把应用优化一下然后上线。」 |
| Agent 直接开始改代码、重构。 | Agent 先暂停，问：范围（小优化还是大重构？）、「上线」的定义、你倾向的选项。 |
| 你：「其实我只想修一个慢查询……」 | 你：「小优化；上线=部署到 staging 且检查单全绿。」 |
| 返工、心累。 | Agent 在明确范围内执行，无返工。 |

## 安装

**支持 Agent Skills 的 Cursor、Claude Code 等：**

```bash
npx -y skills add DmiyDing/clarify-first-skills --skill clarify-first
```

安装后重启客户端。若未自动触发，可在对话中说：「使用 clarify-first skill」。

**排查（Cursor）：** 若看不到该 skill，请确认 `~/.cursor/skills/clarify-first/` 是真实目录（非软链接）且内含 `SKILL.md`；必要时用「复制」而非「软链接」重新安装。

**Codex（AGENTS.md）：** 若希望在某仓库或全局固定该行为，可将 [下方片段](#codex-agentsmd-片段) 写入 `AGENTS.override.md` 或 `AGENTS.md`。

## 使用方式

安装后，当 agent 识别到模糊或高风险请求时会自动启用。也可显式调用：

- 「使用 clarify-first 技能。有模糊或高风险的地方先问我确认，不要猜。」

Agent 会先对齐范围、提出 1–5 个关键问题（尽量给选项），并在你确认后再改代码或执行命令。

## 工作原理

- **低风险**（只读、小范围可逆改动）：agent 可在声明假设后继续，一旦出现新歧义会停下追问。
- **中风险**（重构、改接口等）：agent 先只读检查，给出 2–3 个选项、问清阻塞问题，确认后再做较大改动。
- **高风险**（删除、部署、改密钥等）：agent 会要求你显式确认（如「可以，执行」）后再执行。

详细流程见技能本体：`skills/clarify-first/SKILL.md`。

## 兼容性

- **Agent Skills**：本仓库遵循 [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) 约定（Anthropic）。技能即包含 `SKILL.md`（YAML frontmatter + 正文）的目录，agent 根据 `description` 决定何时加载。
- **客户端**：Cursor、Claude Code、Codex 以及任何支持从 GitHub 或本地路径加载 Agent Skills 的客户端。

### Codex AGENTS.md 片段

在 Codex 中，将以下内容写入 `AGENTS.override.md` 或 `AGENTS.md`（仓库内或 `~/.codex/`）：

```markdown
# Clarify First (risk-based)

When a request is ambiguous, underspecified, conflicting, or high-impact, do not guess.

Risk triage:
- Low: proceed with explicit assumptions and minimal reversible steps; stop if new ambiguity appears.
- Medium: inspect read-only first; propose 2–3 options; ask only blocking questions; wait for confirmation before larger edits or running commands.
- High: require explicit confirmation ("Yes, proceed") before any irreversible action (side-effect commands, deletion/overwrite, migrations, deploy/publish, secrets/config changes, spending money, contacting people).

If you see a better approach than requested, present it as an option and ask the user to choose.
```

## 仓库结构

```
skills/clarify-first/
├── SKILL.md           # 技能定义与工作流
└── references/
    ├── zh-CN.md       # 中文措辞参考
    ├── EXAMPLES.md    # 示例输入与预期行为
    └── QUESTION_BANK.md
```

## 参与与协议

欢迎贡献。本项目采用 [Apache-2.0](./LICENSE) 许可。
