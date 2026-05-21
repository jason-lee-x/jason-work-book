---
title: 2026-05-21｜边界成为产品，token 成为预算
date: 2026-05-21
---

# 2026-05-21｜边界成为产品，token 成为预算

今天的 builders 信号很集中：AI 的兴奋点正在从“模型又聪明了一点”，转向“如何把聪明安全、便宜、可恢复地放进真实组织”。Anthropic 在讲 Managed Agents 的系统边界，OpenAI 在讲长期 token 供给，企业 CIO 在算 token 成本，Serval 在把 IT 工作流重做成 AI-native automation。

这是一种很实在的转向：模型能力继续增长，但真正的产品分水岭开始落在 permissions、sandbox、session log、成本可预测性、eval、客户现场和组织流程上。换句话说，AI 应用层的主语不再只是 intelligence，而是 operations。

## 1) Agent 的下一层抽象：把 brain、hands 和 session 拆开

[Anthropic Engineering](https://www.anthropic.com/engineering/managed-agents)今天的文章把 Claude Managed Agents 的架构讲得很清楚：不要把 agent harness、sandbox 和 session 塞进同一个容器里。早期的一体化容器确实简单，但也把系统变成了“pet”：容器挂了，session 就有丢失风险；容器卡住，工程师只能进容器排障，而容器里可能还放着用户数据。[来源](https://www.anthropic.com/engineering/managed-agents)

Anthropic 的解法是把“brain”（Claude 和 harness）、“hands”（执行工具的 sandbox）和“session”（事件日志）拆成相互独立的接口。harness 不再住在容器里，而是像调用任何工具一样调用 sandbox：`execute(name, input) -> string`。如果 sandbox 死掉，harness 把失败作为 tool-call error 交给 Claude；如果 harness 死掉，也可以用外部 session log 恢复。[来源](https://www.anthropic.com/engineering/managed-agents)

这里最值得注意的不是某个 API 形状，而是一个老派系统设计原则回来了：把会变的实现藏在稳定抽象后面。Anthropic 明确说，Managed Agents 是为“programs as yet unthought of”设计的 meta-harness，像操作系统把硬件虚拟成 process 和 file 一样，把 agent 虚拟成 session、harness 和 sandbox。[来源](https://www.anthropic.com/engineering/managed-agents)

这套拆分还带来直接性能收益：在这种架构下，不需要 sandbox 的 session 不必等待容器启动，推理可以更早开始。Anthropic 给出的数字是，p50 time-to-first-token 下降约 60%，p95 下降超过 90%。[来源](https://www.anthropic.com/engineering/managed-agents)

## 2) 安全边界正在变成 agent 产品本身

[Claude Blog](https://claude.com/blog/claude-managed-agents-updates)同步发布了 Managed Agents 的新能力：self-hosted sandboxes 进入 public beta，MCP tunnels 进入 research preview。前者允许 agent 在企业自己控制的 sandbox 中执行工具，文件、包、服务和网络策略留在企业边界内；后者让 agent 访问私有网络里的 MCP server，而不需要把内部服务暴露到公网。[来源](https://claude.com/blog/claude-managed-agents-updates)

这和 Anthropic Engineering 文章里的安全边界是一组逻辑。在耦合设计里，如果 Claude 生成的不可信代码和 credentials 同处一个容器，prompt injection 只要诱导 Claude 读取自己的环境，就可能拿到 token。Anthropic 的结构性修复是让 token 永远不进入执行 sandbox：Git token 可以在 sandbox 初始化时被接入 remote，MCP 的 OAuth token 则放在 vault 里，由专门 proxy 调用。[来源](https://www.anthropic.com/engineering/managed-agents)

这也是为什么 Vercel、Cloudflare、Daytona、Modal 这些 sandbox / compute 提供方开始频繁出现在 agent 叙事里。Claude Blog 提到 self-hosted sandboxes 可以用企业自己的基础设施，也可以接入 Cloudflare、Daytona、Modal、Vercel 等 managed provider；Guillermo Rauch 也转发了“Claude Managed Agents 🤝 Vercel Sandbox”。[来源](https://claude.com/blog/claude-managed-agents-updates) [来源](https://x.com/rauchg/status/2056735989830471977)

如果说 2023 年的应用层问题是“LLM 能不能完成任务”，今天的问题更像是“LLM 完成任务时，能不能不碰不该碰的东西、能不能被审计、能不能失败后恢复”。边界、权限、日志和执行环境，正在从企业软件的 boring checklist 变成 agent 产品的核心能力。[来源](https://www.anthropic.com/engineering/managed-agents)

## 3) Token 从边际成本，变成企业预算和供应链

[Sam Altman](https://x.com/sama/status/2056827105401614656)今天连续讲了一个现实问题：随着模型变强，世界会在一段时间内处于 capacity-constrained 状态，因此 OpenAI 开始为 1 到 3 年 commits 提供 discounted tokens，客户也越来越需要 capacity certainty。[来源](https://x.com/sama/status/2056827105401614656)

他还说 OpenAI 会在当前 allocation 售罄前持续提供这类安排，同时保留足够 capacity 给 ChatGPT、Codex 等产品，并且未来还计划再次提供，目标仍然是尽快建设更多 compute。[来源](https://x.com/sama/status/2056834734915977382)

更有意思的是，OpenAI 还向当前 YC batch 的每个 startup 提供了 200 万美元 token 投资。Altman 把这称为“tokenmaxxing startups”，并期待这会影响创业公司的内部工作方式和能做出的产品。[来源](https://x.com/sama/status/2056933166875857290)

这不是普通的云服务折扣。它更像 AI 时代的原材料采购：长期锁定 token，就像提前锁定算力、产能和产品节奏。YC President Garry Tan 也用“Tokenmaxxing confirmed”回应了这条趋势。[来源](https://x.com/garrytan/status/2056931642967798226)

企业端已经感受到这个问题。[Box CEO Aaron Levie](https://x.com/levie/status/2056965292753146019)说，他刚和多位 Fortune 500 enterprise CIO 吃饭，token costs 是最激烈的话题。企业正在尝试把不同 workload 分配给不同模型，按用户类型开放不同质量的 agent，给团队设 spend cap，要求团队按 use case 证明 AI 支出，或者干脆先放开使用。但他的判断是，基本没人觉得自己已经找到了正确解法。[来源](https://x.com/levie/status/2056965292753146019)

这条线和 OpenAI 的 capacity commit 是同一枚硬币的两面：供给侧想要可预测的 compute planning，需求侧想要可预测的 AI budget。AI 从 demo 进入组织之后，token 不再只是技术指标，而是 procurement、governance 和 FinOps 问题。[来源](https://x.com/sama/status/2056827105401614656) [来源](https://x.com/levie/status/2056965292753146019)

## 4) AI-native enterprise software 的护城河，不是“更聪明”，而是“更会限制”

[Training Data 采访 Serval CEO Jake Stauch](https://www.youtube.com/watch?v=j7ypvRUFY7M)这期节目和今天的 Anthropic 信号非常同频。Serval 做的是 AI-native employee support / enterprise service management，可以粗略理解成下一代 ServiceNow。Jake 的起点很朴素：员工在工作中需要帮助，理想状态是请求能即时、自动完成，而不是等 ticket 被分配。[来源](https://www.youtube.com/watch?v=j7ypvRUFY7M)

他对传统 workflow + database 抽象并不否定，反而认为 ServiceNow 当年抓对了 primitives。问题在于，传统 workflow 和 database 需要大量人工搭建和维护；业务流程变化太快时，automation 往往还没建好，流程已经变了。Serval 的做法是让用户用自然语言描述 workflow、权限、审批和逻辑，再由系统生成代码；数据库的数据拉取和更新也用类似方式自动化。[来源](https://www.youtube.com/watch?v=j7ypvRUFY7M)

这期里最有价值的一句话是：如果要推动企业 automation，构建 automation 的过程必须和被自动化的工作一样简单，甚至更简单。否则 IT 人员面对“手动点一下 reset password”和“打开 workflow builder 拖一堆节点”时，永远会选择手动操作。[来源](https://www.youtube.com/watch?v=j7ypvRUFY7M)

但 Jake 也承认，这会带来“slop automation”：如果自动化太容易，团队可能一周造出 20 个几乎重复的 password reset workflow，最后 AI 反而不知道该跑哪一个。Serval 因此做了一个理解历史 workflow 的 agent，能提醒用户已有相似流程，建议修改、删除、分类或补审批步骤。[来源](https://www.youtube.com/watch?v=j7ypvRUFY7M)

他对应用层护城河的判断也很直接：产品是 boundaries，是 controls，是对模型能力的限制。问题不再是 Opus 或 GPT 能不能做惊人的事，而是企业能不能放心让它在自己的环境里运行。因此 permissions、approvals、API scope、visibility、audits、reporting、logs、alerts 这些老派企业软件能力，反而成为 AI 应用层的关键产品面。[来源](https://www.youtube.com/watch?v=j7ypvRUFY7M)

Jake 还提到一个现实的 unit economics 区别：Serval 不是在 resell tokens。workflow 被生成成 TypeScript 后，后续 password reset 不是每次都重新生成代码，而是执行已有代码；随着 automation library 增长，昂贵的 codegen token 消耗会下降。不过他也指出，background agents 和 long-running agents 如果开始调查历史 tickets、设备 logs、并在后台发现未知问题，成本就更需要提前关注，因为这类任务可能失控增长。[来源](https://www.youtube.com/watch?v=j7ypvRUFY7M)

## 5) 模型能力继续推高，但 eval 必须落回真实工作

模型本身当然仍在进步。Aaron Levie 说 Box 在 Box AI Complex Work Eval 上评估 Gemini 3.5 Flash，看到它相对 Gemini 3 Flash 在复杂文档任务上提升 12 个百分点；其中 financial services 从 73% 到 81%，public sector 从 59% 到 76%，healthcare 从 51% 到 73%，life sciences 从 47% 到 67%。他还说 Gemini 3.5 Flash 很快会进入 Box AI Studio 和 Box API，Box MCP Server 也将进入 Gemini app。[来源](https://x.com/levie/status/2056804573449474527)

Google Labs 这边也在把 agentic research 往前推：Computational Discovery 由 AlphaEvolve 和 Empirical Research Agent 支撑，可以生成并评估数千个 code variations，用更短时间发现模型和算法。[来源](https://x.com/GoogleLabs/status/2056812957775142985)

但今天更强的信号不是“又一个 benchmark”，而是 eval 和产品边界要跟真实任务绑定。Jake Stauch 说 Serval 会持续用 eval suites 测新模型，但新模型并非 plug and play：旧 prompt tuning 和围绕旧模型 quirks 建的 infrastructure，换模型后可能失效。有时新模型更聪明，却更不可预测，于是他们会升级后再降级，选择“不那么聪明但行为更可靠”的模型。[来源](https://www.youtube.com/watch?v=j7ypvRUFY7M)

这点很像企业 AI 的成人礼：能力提升不是自动转化为生产可用。真正的模型选择会变成多目标权衡：任务类型、工具调用可靠性、成本、延迟、guardrails、客户环境、错误可解释性，以及团队对某个模型“坏脾气”的熟悉程度。[来源](https://www.youtube.com/watch?v=j7ypvRUFY7M)

## 6) Builder 现场：从 Karpathy 回到 R&D，到个人 agent 和 AI SDLC

[Andrej Karpathy](https://x.com/karpathy/status/2056753169888334312)宣布加入 Anthropic。他说未来几年对 frontier LLMs 会特别 formative，因此很兴奋回到 R&D；同时他仍然关心 education，并计划之后恢复相关工作。[来源](https://x.com/karpathy/status/2056753169888334312)

Google Gemini 方向也在推个人 agent。[Josh Woodward](https://x.com/joshwoodward/status/2056873495116845485)发布 Gemini Spark，称它是 24/7 personal AI agent，用于主动管理任务、帮助用户处理数字生活，并会先给 trusted testers，随后作为 Beta 面向美国 Google AI Ultra 订阅者开放。[来源](https://x.com/joshwoodward/status/2056873495116845485)

Google Labs 的 Project Genie 则把生成式世界和真实地点连接起来：新更新支持从美国 Google Maps Street View 里的真实地点生成世界，提供 library 管理生成内容，并允许外部分享；Google AI Ultra 订阅者可逐步使用。[来源](https://x.com/GoogleLabs/status/2056872996988756228)

在日常开发流里，[Swyx](https://x.com/swyx/status/2056877529991205072)给了一套 AI SDLC 的小配方：准备约 50 个 tests，并要求 agent 增加测试；让 agent 先 plan、拆 hot paths、补 logging 和 error boundaries；允许破坏 backward compatibility，但要求先 map remaining work、持续提交部署测试，直到切片完成；再周期性 spot check 已部署功能并 steer bugs。[来源](https://x.com/swyx/status/2056877529991205072)

[Ryo Lu](https://x.com/ryolu_/status/2056892527626817935)的工具选择更具体：他现在用 Composer 2.5 做 planning、building、iterations 和 debugging，认为它是一个适合 UI work 的 all-rounder，配合 Cursor 的 Design Mode 能让人进入 flow。[来源](https://x.com/ryolu_/status/2056892527626817935)

[Nikunj Kothari](https://x.com/nikunj/status/2056865808832397344)则把时间尺度拉长：他认为即便在 Bay Area 的 AI 圈，很多人也还没有 price in AI 从 assistant 到 coworker，并很快进入 autonomous workers 的事实。他承认 autonomy 还没有真正成立，但认为 harness、模型能力、长任务 RL 数据和递归纠错能力，会把大量工作带进扩散阶段，而且这个“最后一公里的最后一公里”可能持续 10 到 20 年。[来源](https://x.com/nikunj/status/2056865808832397344)

## 简短结语

今天最重要的判断是：AI 产品的下一轮竞争，不会只看谁接上了最强模型，而会看谁能把模型放进可控边界里运行。能否恢复 session，能否隔离 credentials，能否连接私有 MCP，能否把 token 成本变成预算，能否在真实 workflow 里做 eval，都会成为应用层的硬能力。

这也是为什么“boring enterprise software”突然重新变性感。agent 越强，边界越值钱；token 越便宜但越大规模，预算越重要；automation 越容易，治理和去重越必要。未来几年值得看的，不只是 intelligence 如何上升，而是组织如何承受这种 intelligence。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
