# Clarify First Skills（先澄清再执行）

[English README](./README.md)

这是一个面向 AI / AI 编程工具的“风险分级澄清闸门”：当需求模糊、不完整或存在冲突时，AI 必须先**暂停执行**，梳理上下文、提出最少但关键的澄清问题，并在进行中/高风险操作前获得用户确认。

- Skill：`skills/clarify-first/SKILL.md`
- Skill 名称：`clarify-first`
- 协议：Apache-2.0

## 为什么需要它

很多 AI 助手会在信息不足时“猜着做”，带来返工、误解和信任成本。

这个技能的目标：
- 不确定性高：先对齐再行动
- 不确定性低：在明确假设下小步快跑
- 不可逆动作：必须先确认

## 它做什么（B：风险分级）

- **低风险**：允许继续，但必须声明假设、保持最小改动与可逆；出现新歧义立刻停下追问
- **中风险**：先只读检查，再给 2–3 个选项与权衡，问阻塞问题，确认后再做较大改动
- **高风险**：必须显式确认后才执行（跑有副作用命令、删除/覆盖、迁移、部署/发布、改配置/密钥、花钱、联系他人等）

## 安装

### 1）支持 Agent Skills / skills CLI 的工具

如果你的工具支持通过 CLI 安装 skills：

```bash
npx -y skills add https://github.com/DmiyDing/clarify-first-skills@clarify-first --agent <agent-name>
```

提示：
- 安装后可能需要重启客户端。
- 自动触发不稳定时，建议在对话里显式说“使用 `clarify-first` skill”。

### 2）OpenAI Codex CLI

OpenAI Codex CLI 不会直接加载 Anthropic 风格的“skills 文件夹”。最可靠的做法是把核心规则复制进你的项目 `AGENTS.md`，让 Codex 自动加载。

你告诉我你希望全局生效还是某个仓库生效，我可以给你生成一段专门为 Codex CLI 优化的 `AGENTS.md` 片段。

## 使用方式

最可靠（显式调用）：
- “Use the `clarify-first` skill. If anything is ambiguous or high-impact, ask me the blocking questions first.”
- “使用 `clarify-first` 技能。中/高风险操作先问我确认，不要猜。”

