---
title: 2026-06-06｜把大脑从手里拆出来
date: 2026-06-06
---

# 2026-06-06｜把大脑从手里拆出来

今天的 builders 信号很像一次集体换挡：大家不再只讨论“模型会不会更聪明”，而是在拆解智能如何进入真实系统。一个方向是科学发现，靠 test-time compute、RL 和可验证反馈把模型推向更长的探索链；另一个方向是 agent 工程，把 brain、hands、session、sandbox 拆成可替换接口，让长任务能恢复、能扩展、能进入企业边界。

所以今天的关键词不是“更大的模型”，而是：更长的回路、更硬的边界、更可审计的工作流。

## 1) 科学发现：模型开始从“回答问题”走向“坚持探索”

The MAD Podcast with Matt Turck 这期请到 OpenAI Foundations of Reinforcement Learning lead Dan Roberts。节目围绕一个核心判断展开：AI 对科学的作用不会突然从 0 跳到“完整科学家”，而是平滑地增强科学过程；如果一定要找一个拐点，Roberts 认为 OpenAI o1 和 test-time compute / reasoning paradigm 是一个明显节点。[来源](https://www.youtube.com/watch?v=oWOz2htozfI)

最值得记录的是他对数学发现的描述。节目里提到，最近 OpenAI、Google DeepMind、Anthropic 都围绕 Erdős problems 给出了进展；Roberts 强调 OpenAI 的路径更接近 informal reasoning：模型读自然语言里的数学问题，用类似人类数学家的方式提出证明或反例，然后再由人检查。DeepMind 的路径则更偏 formal proof：把问题 formalize 到 Lean，再在形式系统里搜索证明。[来源](https://www.youtube.com/watch?v=oWOz2htozfI)

这不是“哪条路线更高贵”的问题，而是两种 verification tradeoff。formal proof 的好处是 airtight，隐藏假设更少；informal reasoning 的好处是能直接处理人类数学家实际使用的语言和表达，但验证更难。Roberts 说，OpenAI 公开的大多数结果都在 informal setting 下完成，依靠 test-time reasoning 的语言模型去做数学推理。[来源](https://www.youtube.com/watch?v=oWOz2htozfI)

他对 RL 的解释也很适合放在今天这条主线里：supervised learning 像是看别人玩 Mario，然后自己照着做；reinforcement learning 则是自己按按钮、撞怪、失败、拿奖励，靠环境反馈学会动作。RL 强大的地方在于 feedback loop，也就是模型能在适合自己水平的问题上，通过行动和回报建立理解。[来源](https://www.youtube.com/watch?v=oWOz2htozfI)

但 RL 的脆弱处也正是长任务的痛点：如果反馈非常稀疏，你做了很多很多步骤，最后只得到一个 yes / no，就很难知道中间哪一步真正有效。Roberts 用 chess 和 research-level homework problem 来说明这个问题。换到 AI agent 上，这就是为什么长程任务不仅需要更聪明的模型，还需要更好的环境、奖励、日志和 evals。[来源](https://www.youtube.com/watch?v=oWOz2htozfI)

## 2) Agent 架构：Anthropic 把 brain、hands、session 拆开

Anthropic Engineering 的《Scaling Managed Agents: Decoupling the brain from the hands》给了今天最工程化的一组信号。文章的核心设计是 Claude Managed Agents：把 agent 拆成 session、harness、sandbox 三类可替换接口。session 是 append-only log，harness 是调用 Claude 并路由工具调用的 loop，sandbox 是执行代码和改文件的环境。[来源](https://www.anthropic.com/engineering/managed-agents)

Anthropic 的判断很直接：harness 里编码了“Claude 不能做什么”的假设，但这些假设会随模型能力提升而过期。文章举例说，过去 Claude Sonnet 4.5 会在接近 context limit 时提前收尾，也就是 “context anxiety”，于是他们在 harness 里加了 context resets；但换到 Claude Opus 4.5 后，这个行为消失了，resets 反而成了 dead weight。[来源](https://www.anthropic.com/engineering/managed-agents)

他们早期把所有 agent component 都放进一个 container，好处是简单，坏处是这个 container 变成了 pet：如果 container 挂了，session 就丢；如果 container 卡住，工程师只能通过 WebSocket event stream 猜问题在哪，甚至很难安全地进容器 debug，因为里面可能有用户数据。[来源](https://www.anthropic.com/engineering/managed-agents)

新的拆分思路是“decouple the brain from the hands”。harness 离开 container，container 变成一种 tool：`execute(name, input) → string`。如果 container 死了，harness 把它当成工具调用错误交给 Claude；如果 Claude 决定重试，就按标准 recipe 重新 provision 一个 container。harness 自己也变成 cattle，因为 durable session log 在外部，崩溃后可以 `wake(sessionId)`、`getSession(id)`，从最后事件继续恢复。[来源](https://www.anthropic.com/engineering/managed-agents)

这篇文章还有两个关键数字：拆开 brain 和 hands 后，不需要 sandbox 的 session 可以立刻开始 inference，不必先等 container provision。Anthropic 称这种架构让 p50 time-to-first-token 下降约 60%，p95 下降超过 90%。这说明 agent infra 的体验改进不只是模型问题，编排层也能直接改变用户感知延迟。[来源](https://www.anthropic.com/engineering/managed-agents)

## 3) 企业边界：sandbox 留在你的 perimeter，MCP 从内网接出来

Claude Blog 的 Managed Agents 更新把上面的架构推向企业部署：Claude Managed Agents 现在可以在用户控制的 sandbox 里运行，并连接私有 MCP servers。模型循环、context management、error recovery 留在 Anthropic infrastructure；真正执行工具、访问文件和服务的 sandbox 可以在企业自己的 infrastructure，或 Cloudflare、Daytona、Modal、Vercel 这类 managed providers 上。[来源](https://claude.com/blog/claude-managed-agents-updates)

这解决的是企业 agent 的硬问题：敏感文件、packages、services 不离开自己的边界；网络策略、audit logging、安全工具都继续在企业 perimeter 内生效；同时用户还能自己控制 CPU、memory、runtime image，让长 build、图像生成等 compute-heavy work 有合适资源。[来源](https://claude.com/blog/claude-managed-agents-updates)

MCP tunnels 则处理另一半问题：agent 要访问内网 MCP servers，但企业不想把数据库、private APIs、knowledge bases、ticketing systems 暴露到公网。Anthropic 的方案是部署一个 lightweight gateway，由它发起 outbound connection；不需要 inbound firewall rules，也不需要 public endpoints，流量端到端加密。这个能力在 Managed Agents 和 Messages API 里都支持。[来源](https://claude.com/blog/claude-managed-agents-updates)

和工程博客合起来看，这是一条很清晰的产品路线：brain 可以集中托管，hands 可以分布在客户边界里，session 成为 durable context object。agent 真正进入企业，不靠“相信模型不会乱来”，而靠结构性隔离、可恢复日志和最小暴露面。[来源](https://www.anthropic.com/engineering/managed-agents) [来源](https://claude.com/blog/claude-managed-agents-updates)

## 4) 质量事故：system prompt 也需要像代码一样审计

Anthropic Engineering 另一篇 postmortem 解释了近期 Claude Code 质量报告。文章称，过去一个月他们追查到三类影响 Claude Code、Claude Agent SDK、Claude Cowork 的变更；API 和 inference layer 没受影响；截至 4 月 20 日 v2.1.116，三个问题都已修复。[来源](https://www.anthropic.com/engineering/april-23-postmortem)

最有价值的不是“修好了”，而是他们暴露出的工程教训：system prompt change 也会引入质量回退。文章提到，他们会让更多内部员工使用 exact public build，而不是只用测试新功能的版本；会改进内部 Code Review 工具；会对 Claude Code 的 system prompt changes 加更紧的控制，对每次变更跑 per-model evals，并继续做 ablations 理解每一行 prompt 的影响。[来源](https://www.anthropic.com/engineering/april-23-postmortem)

这和今天的 agent 架构主题是同一件事：当 harness、prompt、context trimming、memory、tool routing 都会影响模型表现时，“模型质量”不再只是模型权重的性质。产品层每一行 system prompt、每一种 context policy、每个 rollout 节奏，都进入质量系统。[来源](https://www.anthropic.com/engineering/april-23-postmortem)

## 5) Claude 自举信号：代码产量上升，瓶颈迁移到组织执行

Anthropic researcher Alex Albert 转述了 Anthropic 内部数据：超过 80% 合入 Anthropic codebase 的代码现在由 Claude 编写；许多 researchers 已经数月没有手写代码；典型 Anthropic engineer 的代码 shipping 量是 2024 年的 8 倍；在最开放的工程任务上，Claude 的成功率 6 个月内从约 26% 跳到 76%；当 research sessions 跑偏时，Claude 提出的下一步有 64% 的时间优于人类实际采取的下一步。[来源](https://x.com/alexalbert__/status/2062580571214389510)

Box CEO Aaron Levie 对同一类信号给了一个更稳的解释。他引用 Anthropic 的一段话：高能力模型让组织内部出现了远超执行容量的新想法、initiatives、tools、simulations；组织识别并修复这些 bottlenecks 的速度，可能会变成最重要的能力。Levie 的结论是：AI 会大幅降低做更多事的门槛，但想法变多以后，真正限制组织的仍是执行周边工作的能力，甚至在 agents 加持下也需要人管理。[来源](https://x.com/levie/status/2062728257359790292)

这比“AI 会替代工程师”更接近现实。代码产量上升后，瓶颈会移到 review、product judgment、release coordination、security、客户沟通、组织取舍。能不能把 8 倍代码 shipping 量转化成 8 倍有效产品，不取决于代码本身，而取决于组织是否能承受更高的信息流速。[来源](https://x.com/alexalbert__/status/2062580571214389510) [来源](https://x.com/levie/status/2062728257359790292)

## 6) Builder 工具化：skills、SDK、个人软件和写作 agent

OpenAI Codex / ChatGPT 团队的 Thibault Sottiaux 给出两个小但实用的产品信号：Codex 可以通过 Python SDK 放进自己的程序里，安装方式是 `pip install openai-codex`；同时他们正在修一个 Codex token 计数 bug，这个 bug 曾导致少量 Pro / Plus 账户被少算 token，影响少于 15% 的账户。[来源](https://x.com/thsottiaux/status/2062734215494664697) [来源](https://x.com/thsottiaux/status/2062648326332539015)

Peter Yang 的观察更偏工作流实践。他花了一天为自己的 creator workflows 配 Codex integrations 和 skills，然后得出一个很强的个人判断：如果先把系统搭好，任何 knowledge work 至少能省 50% 时间。他给的流程很朴素：回顾上周最耗时、最重复的工作；列出每一步；把步骤贴给 Codex 或 Claude Code，让它建议要建哪些 integrations 和 skills；但他的所有流程都保留 human checkpoints，用来施加自己的 taste。[来源](https://x.com/petergyang/status/2062740262338929110)

Peter 也提醒了 Codex 的短板：他越来越喜欢 Codex，但认为其 frontend design 仍明显落后。他用 `/slides` skill 做对比后判断，Claude 可以 one-shot 出更好看的 HTML slides，而 Codex 在设计表现上常给新手留下第一印象，需要修。[来源](https://x.com/petergyang/status/2062743491365544361)

Claude Code 团队的 Thariq 则把 personal software 的论点接到 2026：2020 年“app 可以像家常饭”还太早，但到 2026 年，软件真的可以像一顿 home-cooked meal 或一封手写信一样个人化。他还转发了关于 dynamic workflows 如何让 Claude Code 处理全新任务类型的内容。[来源](https://x.com/trq212/status/2062605395101884916) [来源](https://x.com/trq212/status/2062556889171517499)

Every CEO Dan Shipper 发布 Spiral 4.0，把它定位成“给你和你的 agent 的写作伙伴”。新版本强调 stylometry-based Style Engine，用过去作品抽取个人或品牌声音；同时支持 MCP 和 CLI，让 Codex、Claude Code、OpenClaw 等 agent 可以调用它写 landing pages、tweets、podcasts、marketing emails，并保持 on-brand。[来源](https://x.com/danshipper/status/2062628079869005876)

FPV Ventures partner Nikunj Kothari 的 Nock skill 是另一个很好的个人 agent 例子。他用 Claude Code 拉取超过 200 份由 Granola 记录的 founder pitch 1:1 notes，只保留自己提问的部分，再筛到约 53 场高质量讨论，结合自己的 essays，做成一个基于真实投资对话的 question bank / principle skill。之后他用 5 到 10 个真实 decks 和 conversations 对照迭代，直到它像自己的准确代表。[来源](https://x.com/nikunj/status/2062659649732825549)

## 7) 平台边缘信号：ChatGPT app、Claude connectors、Vercel open web

Sam Altman 今天的几条信号集中在“把应用发布权交给普通人”。他转发了 build and publish web apps with ChatGPT，并说自己小时候很想拥有这样的东西，同时怀念 HyperCard；他也提到 ChatGPT memory 有一次 big upgrade 正在 rollout。[来源](https://x.com/sama/status/2062661071761211561) [来源](https://x.com/sama/status/2062660086787613116)

Claude Blog 的 everyday connectors 更新则把 assistant 往日常生活 app 推：AllTrails、Instacart、Audible、Tripadvisor、Intuit TurboTax、Uber、Uber Eats、Spotify 等都进入连接范围。Claude directory 自 2025 年 7 月上线以来已经超过 200 个 connectors；Claude 现在会在对话里动态建议合适 app，比如找餐厅、加购物车、识别航班，同时在购买或预订前仍设计为先让用户确认。[来源](https://claude.com/blog/connectors-for-everyday-life)

Vercel CEO Guillermo Rauch 的信号则偏底层生态。他祝贺 Void 团队，并重申 Vercel 对 open platform for the web 的协作，包括投资 Nitro、open runtimes，以及对 Nuxt、Svelte、TanStack Start 等 Vite-based frameworks 的原生支持。[来源](https://x.com/rauchg/status/2062535454130676193)

这些看似分散，其实都在回答同一个问题：agent 的输出最终落在哪里？可能是一个临时网页、一个个人 workflow、一个日常 app connector、一组企业 sandbox，或者一个开放 web runtime。AI 产品的竞争不只在 chat box，而在“生成物能否进入真实世界”。[来源](https://x.com/sama/status/2062661071761211561) [来源](https://claude.com/blog/connectors-for-everyday-life) [来源](https://x.com/rauchg/status/2062535454130676193)

## 简短结语

今天最清晰的判断是：AI 正在进入“系统工程阶段”。

科学发现需要的不只是更聪明的模型，还需要 test-time compute、RL、稀疏反馈下的探索能力和可验证环境；企业 agent 需要的不只是会写代码的 Claude，还需要 durable session、可替换 sandbox、credential 隔离、MCP tunnels 和 prompt 变更审计；个人 builder 需要的不只是一个聊天窗口，而是 skills、SDK、CLI、style engine 和保留 taste 的 human checkpoints。

真正的分水岭会越来越少发生在 demo 里，越来越多发生在 harness 里：谁能把 intelligence 变成可恢复、可审计、可扩展、能穿过组织边界的工作回路，谁才真的拥有 agent。

## 原始来源

- [The MAD Podcast with Matt Turck: OpenAI's Dan Roberts: Why AI Can Now Make Discoveries](https://www.youtube.com/watch?v=oWOz2htozfI)
- [Anthropic Engineering: Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)
- [Claude Blog: New in Claude Managed Agents: self-hosted sandboxes and MCP tunnels](https://claude.com/blog/claude-managed-agents-updates)
- [Anthropic Engineering: An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem)
- [Alex Albert on X: Anthropic internal data on Claude-written code](https://x.com/alexalbert__/status/2062580571214389510)
- [Aaron Levie on X: AI creates more ideas than organizations can pursue](https://x.com/levie/status/2062728257359790292)
- [Thibault Sottiaux on X: Codex Python SDK](https://x.com/thsottiaux/status/2062734215494664697)
- [Thibault Sottiaux on X: Codex token counting bug](https://x.com/thsottiaux/status/2062648326332539015)
- [Peter Yang on X: Codex integrations and skills for creator workflows](https://x.com/petergyang/status/2062740262338929110)
- [Peter Yang on X: Codex frontend design still needs work](https://x.com/petergyang/status/2062743491365544361)
- [Thariq on X: personal software as home-cooked meal](https://x.com/trq212/status/2062605395101884916)
- [Thariq on X: dynamic workflows in Claude Code](https://x.com/trq212/status/2062556889171517499)
- [Dan Shipper on X: Spiral 4.0 for writers and agents](https://x.com/danshipper/status/2062628079869005876)
- [Nikunj Kothari on X: Nock skill built from founder pitch notes](https://x.com/nikunj/status/2062659649732825549)
- [Sam Altman on X: build and publish web apps with ChatGPT](https://x.com/sama/status/2062661071761211561)
- [Sam Altman on X: ChatGPT memory upgrade](https://x.com/sama/status/2062660086787613116)
- [Claude Blog: New connectors in Claude for everyday life](https://claude.com/blog/connectors-for-everyday-life)
- [Guillermo Rauch on X: Vercel and open platform for the web](https://x.com/rauchg/status/2062535454130676193)

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
