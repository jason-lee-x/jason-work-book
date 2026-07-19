---
title: 2026-07-19｜把大脑移出容器，把 token 挤进电力
date: 2026-07-19
---

今天的 builders 信号很像一次 stack 的重新分层：agent 这一侧，Anthropic 在把「大脑、手、日志」拆成可替换的系统接口；compute 这一侧，OpenAI 的工业计算负责人把 AI 说成「把电子变成 token」的巨大工厂。中间夹着的，是更现实的成本曲线、usage limits、企业 harness 和 eval 人才缺口。

这说明 AI 的竞争正在从单点模型能力，继续下沉到运行系统：谁能让 agent 安全地伸手，谁能让 token 更便宜地流出来，谁就更接近生产环境里的真实吞吐。

## 1. Agent 不是一个容器，而是一组需要解耦的接口

Anthropic Engineering 的《Scaling Managed Agents: Decoupling the brain from the hands》给了今天最清晰的系统设计信号。Anthropic 说，很多 agent harness 都写进了关于模型能力的假设，但这些假设会随着模型变强而过期。Claude Sonnet 4.5 曾经有接近上下文限制就过早收尾的「context anxiety」，Anthropic 用 context reset 修过；到了 Claude Opus 4.5，同一行为消失，reset 反而变成 dead weight。来源：[Anthropic Engineering｜Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents)

Managed Agents 的核心设计，是把 agent 虚拟成三个组件：session，作为 append-only event log；harness，作为调用 Claude 并路由工具调用的循环；sandbox，作为运行代码和编辑文件的执行环境。Anthropic 的说法是「opinionated about the shape of these interfaces, not about what runs behind them」，也就是稳定接口，允许实现不断替换。来源：[Anthropic Engineering｜Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents)

这篇文章最重要的工程判断，是不要把 session、harness、sandbox 养成同一个「pet container」。早期三者共处一个容器，文件编辑是直接 syscall，边界简单；但容器失败时 session 会丢，debug 又会碰到用户数据，企业 VPC 接入也被「资源必须和 harness 在一起」这个假设卡住。解法是把 brain 从 hands 里移出来：sandbox 变成 `execute(name, input) → string` 的工具，死了就报错、重建；harness 也变成无状态 cattle，靠外部 session log `wake(sessionId)` 恢复。来源：[Anthropic Engineering｜Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents)

安全边界也因此更硬。文章明确指出，如果 Claude 生成的非可信代码和凭证在同一个容器里，prompt injection 只需要说服 Claude 读环境变量；结构性修复是让 token 永远不要出现在 sandbox 里。Git token 用来初始化 repo 和 remote，agent 不直接拿 token；MCP OAuth token 放在 vault，Claude 通过 proxy 调 MCP。来源：[Anthropic Engineering｜Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents)

## 2. 企业要的不是更会聊天的 agent，而是可控的手

Claude Blog 的产品更新把这套架构落到企业部署：Claude Managed Agents 支持 self-hosted sandboxes 和 MCP tunnels。意思是 agent loop、orchestration、context management、error recovery 仍在 Anthropic 侧，但代码执行、敏感文件、packages、services 和数据可以留在企业自己的基础设施或托管 sandbox provider 里。来源：[Claude Blog｜New in Claude Managed Agents](https://claude.com/blog/claude-managed-agents-updates)

这不是合规包装，而是 agent 进入企业内网的必要形态。Self-hosted sandbox 让企业控制 runtime image、CPU、memory、network policy、audit logging；Cloudflare、Daytona、Modal、Vercel 都作为可选 sandbox provider 出现。MCP tunnels 则用企业部署的轻量 gateway 建立 outbound connection，让 Claude Managed Agents 访问私有 MCP servers，不需要开放 inbound firewall，也不需要把内部数据库、private APIs、知识库、ticketing systems 暴露到公网。来源：[Claude Blog｜New in Claude Managed Agents](https://claude.com/blog/claude-managed-agents-updates)

这和 builders 在 X 上的零散经验能接上。Peter Steinberger 说，看 Codex 用 browser 和 computer use 打开 Chrome、进 PR、点 comment、折腾 macOS picker 只为上传一张图，既 amazing 又 painful；他把 Codex 跑在 VM 里，避免偷走 app focus。这个小场景很典型：agent 的「手」越接近真实桌面，越需要隔离、可恢复、可观察的执行环境。来源：[Peter Steinberger on X](https://x.com/steipete/status/2078318731785359634)

## 3. Compute 的新瓶颈是物理世界，指标是 tokens per watt

The MAD Podcast 里，OpenAI Head of Industrial Compute Sachin Katti 把 AI data center 说得非常直白：它是「giant factories that are turning electrons into tokens」。他认为当前 build-out 像人类历史上最大的基础设施工程之一，OpenAI 每天要做过去在 Intel 可能花数月才做的 compute 决策，因为需求增长太快。来源：[The MAD Podcast｜OpenAI’s Compute Chief: We Can’t Build Fast Enough](https://www.youtube.com/watch?v=wEZBlmvxx4o)

Katti 的判断不是「会不会 overbuild」，而是相反：OpenAI 的担心是没法把需要的 compute 建出来。他说 demand far outstrips compute supply，任何上线的 compute 都会立刻被消耗；当他们以为 compute 足够、可以放慢时，历史上总是被负面惊讶。更硬的约束来自物理世界：supply chain、factory、power door、grid 都不会按软件速度扩容。来源：[The MAD Podcast｜OpenAI’s Compute Chief: We Can’t Build Fast Enough](https://www.youtube.com/watch?v=wEZBlmvxx4o)

Jalapeno 的定位也在这个框架里：OpenAI 知道自己要跑的 workload 和模型，因此可以 co-design hardware，提高 serving efficiency。Katti 说关键指标是 tokens per watt，因为世界已经受限于 power；同样电力能产出更多 token，就能更好地扩展 intelligence delivery。来源：[The MAD Podcast｜OpenAI’s Compute Chief: We Can’t Build Fast Enough](https://www.youtube.com/watch?v=wEZBlmvxx4o)

他还把 training / inference 的边界拆掉了：inference 已经是 compute 的很大部分，甚至可能是多数；而 training 本身也越来越包含 synthetic data generation、post-training、test-time compute 这些 inference 工作。如果 AI 本身能做 AI research，实验数量会爆炸，research compute 需求也会继续爆炸。来源：[The MAD Podcast｜OpenAI’s Compute Chief: We Can’t Build Fast Enough](https://www.youtube.com/watch?v=wEZBlmvxx4o)

## 4. 便宜 AI 不一定减少 frontier spend，可能放大整个需求曲线

Aaron Levie 今天抓住了成本下降的反直觉结果：AI 越便宜，整个生态，尤其终端客户，越能受益；真实瓶颈是能否把 AI 低成本部署到工作负载里。他认为当成本下降，总 usage 会涨，价值会流向 stack 各层；同时，更高效的便宜模型不一定压低 frontier closed model 需求，因为复杂任务的 orchestration 仍可能需要最强模型，再把大量 token 工作分发给更便宜或更 tuned 的模型。来源：[Aaron Levie on X](https://x.com/levie/status/2078139206946459853)

Madhu Guru 从企业落地角度补了另一半：企业之所以卡在 basic chatbot，是因为缺少会做 harness 和 eval 的人才。需要的问题包括：是否能把 use case 变成 offline / online evals，eval 是否表达了产品野心并推动模型 jagged frontier，是否能按 quality-cost-latency 曲线选择模型；harness 是否能独立于模型管理 routing、multi-agent orchestration、context management、tool calling 和 memory。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2078131628262752550)

他对 Kimi 的企业路径也很现实：许多企业不会直接消费 Kimi，而会通过 Google Cloud 这样的平台拿到它，因为企业还需要 security、data residency、compliance，最重要的是 chips。也就是说，open / cheaper model 对云厂商未必只是威胁，也可能是把需求导回已有企业分发和算力层。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2078210889778708744)

Thariq 的建议更像日常 builder hygiene：先做 mockups、schemas、data models、proof of concepts 这类 prototypes，是避免烧掉大量 token 后才发现自己并不想要该输出的最好方式。便宜 token 会放大使用量，但好的原型仍然是最早的成本控制。来源：[Thariq on X](https://x.com/trq212/status/2078189833445654714)

## 5. 产品侧的痛感：容量、用量和日常工作流还在磨合

Anthropic Engineering 的《An update on recent Claude Code quality reports》是一篇少见的质量复盘。过去一个月里，部分用户感到 Claude 变差，Anthropic 最终追到三个不同变更：3 月 4 日把 Claude Code 默认 reasoning effort 从 high 改到 medium 以降低延迟，这是错误 tradeoff，4 月 7 日回滚；3 月 26 日为闲置一小时以上 session 清理 older thinking，本应只清一次，bug 导致之后每轮都清，使 Claude 显得健忘重复，4 月 10 日修复；4 月 16 日为降低 verbosity 加了 system prompt instruction，影响 coding quality，4 月 20 日回滚。来源：[Anthropic Engineering｜Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem)

这篇复盘的价值在于承认「质量下降」不一定发生在模型权重或 API inference layer，也可能发生在 harness、context management、system prompt、product defaults 这些外围层。Anthropic 还提到，会让更多内部员工使用 exact public build，加强 Code Review 工具，对 Claude Code 的 system prompt changes 加更严控制、per-model evals、ablations、soak periods 和 gradual rollouts。来源：[Anthropic Engineering｜Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem)

Claude 官方账号则给出了容量侧的现实结果：从 7 月 20 日开始，Claude Fable 5 会进入所有 Max 和 Team Premium plans，但按 50% usage limits；Pro 和 Team Standard 用户继续通过 usage credits 使用 Fable，并收到一次性 100 美元 credit。官方说 Fable demand 难以预测，因此按阶段扩展 subscription access，同时继续投资新 capacity。来源：[Claude on X](https://x.com/claudeai/status/2078302415804379218)、[Claude on X](https://x.com/claudeai/status/2078302417100394737)

OpenAI 这边，Thibault Sottiaux 说所有 Codex 和 ChatGPT Work 付费用户获得 usage limits reset，并提到团队在快速迭代、维持 infra、应对比以往更快的 scale。单看像福利，放在今天的 compute 主题里，其实还是同一个信号：模型产品正在把用户需求、容量管理、limits、infra scale 和用户信任绑在一起。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2078320950488297917)

## 结语

今天最值得带走的判断是：AI 系统的真实护城河正在变成「可控的执行」和「可扩的供给」。Agent 需要把 brain、hands、session 拆开，才能安全进入企业边界；模型服务需要把 token 压进 watts、cooling、grid、chips 和 capacity planning，才能持续满足需求。

如果只看模型名字，会觉得每天都是 release noise；如果看接口、sandbox、eval、routing、tokens per watt 和 usage limits，会看到一条更稳定的线：AI 正在从聪明的软件，变成需要像云、操作系统和电力工业一样治理的基础设施。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
