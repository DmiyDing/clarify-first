# Clarify First: 先澄清，再执行

[![License](https://img.shields.io/github/license/DmiyDing/clarify-first)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/DmiyDing/clarify-first/pulls)
[![Spec](https://img.shields.io/badge/Spec-Agent--Skills-blueviolet)](https://agentskills.io/specification)
[![Cursor Compatible](https://img.shields.io/badge/Cursor-Compatible-blue)](https://cursor.com)

**拒绝盲目猜测。Clarify First 是一个确定性状态机与安全中间层，让 Agent 在模糊或高风险任务上先问清再执行。**

Clarify First 的核心是：**先对齐，再落地**。它阻断静默假设，要求显式确认，并让“计划 vs 实际执行”可对账。

[English](./README.md) · **协议：** [Apache-2.0](./LICENSE)

---

## 为什么需要它
大多数 Agent 默认追求“马上做”，而不是“先确认”。在模糊或高影响场景下，这会把隐藏假设直接变成代价。

**Clarify First 彻底改变这种模式：先澄清，后代码。**

## 无防护 vs 启用后

| 无 Clarify First | 启用 Clarify First |
|------------------|--------------------|
| 用户：「删掉旧文件。」 | 用户：「删掉旧文件。」 |
| Agent 可能按猜测直接执行破坏性命令。 | Agent 输出风险头，先确认范围与回滚，再等待明确确认。 |
| 结果：范围错误、恢复困难。 | 结果：意图一致、可控可回滚。 |

## 特性矩阵

| 能力 | 支持 |
|------|------|
| 不可绕过的澄清门禁 | ✅ |
| 假设加权风险分级 | ✅ |
| 两阶段执行（计划 -> 确认 -> 执行） | ✅ |
| 严格执行边界与计划修订 | ✅ |
| 高风险渐进式执行 | ✅ |
| Plan-ID 锚定与长会话检查点 | ✅ |
| 敏感信息脱敏 | ✅ |
| 架构反模式硬中断 | ✅ |
| 文件核心度动态风险修正 | ✅ |
| 执行后最终对账 | ✅ |
| 多智能体交接载荷（细粒度） | ✅ |
| 对抗场景测试覆盖 | ✅ |

## 快速接入（TTFV）

### 1) Cursor / Windsurf 类客户端
- 复制 [`/.cursorrules`](./.cursorrules) 到项目根目录（或并入现有规则）。

### 2) 支持 Agent Skills 的客户端
- 通过命令安装：

```bash
npx -y skills add DmiyDing/clarify-first
```

安装后重启客户端。若未自动触发，可显式说：「使用 clarify-first 技能」。

### 3) Codex / AGENTS.md 环境
- 若希望在仓库或全局固定行为，可将 [下方片段](#codex-agentsmd-片段) 写入 `AGENTS.override.md` 或 `AGENTS.md`。

### 4) 框架编排（LangChain / Dify / 自研 Agent Runtime）
- 将 [`clarify-first/SKILL.md`](./clarify-first/SKILL.md) 作为系统策略注入。
- `references/*` 作为按需加载上下文，而不是常驻大 Prompt。

## 使用方式

安装后，当 agent 识别到模糊或高风险请求时会自动启用。也可显式调用：

- 「使用 clarify-first 技能。有模糊或高风险的地方先问我确认，不要猜。」

Agent 会先对齐范围、提出 1–5 个关键问题（尽量给选项），并在你确认后再改代码或执行命令。

## 校验

可使用以下脚本检查版本与引用一致性：
- [`tooling/verify-version.js`](./tooling/verify-version.js)

## 工作原理

- **低风险**（只读、小范围可逆改动）：agent 可在声明假设后继续，一旦出现新歧义会停下追问。
- **中风险**（重构、改接口等）：agent 先只读检查，给出 2–3 个选项、问清阻塞问题，确认后再做较大改动。
- **高风险**（删除、部署、改密钥等）：agent 会要求你显式确认（如「可以，执行」）后再执行。

详细流程见技能本体：`clarify-first/SKILL.md`。

## 兼容性

- **Agent Skills**：本仓库遵循 [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) 约定（Anthropic）。技能核心位于 `clarify-first/` 目录下的 `clarify-first/SKILL.md`。
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
.
├── clarify-first/
│   ├── SKILL.md          # 技能定义（Markdown）
│   └── references/       # 按需加载的上下文文件
├── tooling/              # 维护脚本
├── .cursorrules          # Cursor 规则模板（精简版）
├── CHANGELOG.md          # 版本历史
└── CONTRIBUTING.md       # 贡献指南
```

技能采用渐进式披露：agent 在触发时加载 `clarify-first/SKILL.md`，仅在需要时打开 `references/*`。

## 参与与协议

欢迎贡献。本项目采用 [Apache-2.0](./LICENSE) 许可。
