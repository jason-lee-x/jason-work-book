---
title: 2026-06-09｜token 账单之后，Agent 开始学会自我节制
date: 2026-06-09
---

# 2026-06-09｜token 账单之后，Agent 开始学会自我节制

今天的 builders 信号很集中：Agent 不再只是“跑得更久”，而是开始被迫回答三个更现实的问题：谁来给它预算，谁来判断它跑得值不值，谁来设计让它不断自检的循环。

过去几周被反复讨论的 tokenmaxxing，其实不是一个消费习惯问题，而是 AI 从 demo 进入组织预算表后的第一场硬仗。模型越能长时间自主工作，越需要编排层、成本路由、质量 rubric、训练数据和组织教育一起补上。否则，所谓 autonomous agent 只是把人类的混乱放大成更贵的混乱。

## 1) 企业 AI 的第一道坎：模型进步太快，部署反而变慢

The MAD Podcast with Matt Turck 这期请到 Box CEO Aaron Levie，主题是 enterprise AI 2026。Levie 的核心判断很冷静：大企业并不是没看到 AI 的价值，相反，CIO 已经从工程团队使用 Claude Code、Codex、Cursor 的生产力提升里看到了效果；真正的问题是从 coding agents 迁移到非工程知识工作时，部署、预算、人才和流程都还在 day one。[来源](https://www.youtube.com/watch?v=Gs2styCcwro)

他有一句话很适合概括企业端的矛盾：技术突破越快，客户越难建立稳定架构，因为刚落地的方案可能很快被下一轮能力更新淘汰。换句话说，模型进步不是单向缩短部署周期，它也会制造架构焦虑和 change management 成本。[来源](https://www.youtube.com/watch?v=Gs2styCcwro)

Levie 对企业情绪的判断并不悲观。他说，大企业客户总体更偏 optimistic，因为业务部门正在主动要求 agentic tools，希望把 IT 和工程团队里的生产力收益带到文档审阅、客户 onboarding、营销资产生成等场景。但这已经不是“两年前装一个聊天系统”的问题，而是要部署能做事、能跑 workflow、可能 stateful 运行的 agents。[来源](https://www.youtube.com/watch?v=Gs2styCcwro)

## 2) token 从 IT 附加费变成业务预算

Levie 最具体的判断在 token 成本。他说，在企业和 agents 相关的讨论里，token cost、budgeting、budget planning 至少是最热按钮之一，甚至经常并列第一。原因很直接：过去 Cursor 或 Copilot 式产品还能把大量用量包在固定订阅费里；现在一个 coding agent 在单个任务上就可能消耗高额 compute，不可能继续塞进每人每月 20 美元的模型里。[来源](https://www.youtube.com/watch?v=Gs2styCcwro)

这会改变 AI 软件的采购结构。Levie 认为，前两三年的 AI 成本还可以被 IT budget 吸收，比如 Microsoft Copilot add-on、某个 SaaS 的 AI add-on、Cursor licenses。但如果 AI 真正在工程、客户 onboarding、营销、制造等业务线上产生生产力，就不能被困在企业收入 3% 到 7% 左右的 IT spend 里；它会迁移到 line-of-business budgets。[来源](https://www.youtube.com/watch?v=Gs2styCcwro)

问题是，CMO、销售负责人、制造负责人过去并不需要为 compute 做 FinOps。企业将不得不同时 centralize 系统管理与采购，又 decentralize 使用决策：例如营销团队究竟要花一百万美元在 compute 上，还是花在 marketing events 上，只能由业务负责人做 tradeoff。[来源](https://www.youtube.com/watch?v=Gs2styCcwro)

这也解释了今天 X 上多条围绕 token 的信号。Box CEO Aaron Levie 进一步判断，未来一两年 use cases 会在 model families 之间分层：高价值任务继续使用 frontier intelligence，高吞吐任务会被剥离给更便宜的模型；能把工作负载路由到正确模型、同时兼顾成功率与成本的 agent orchestration 层会变得更有价值。[来源](https://x.com/levie/status/2063835799096090749)

FPV Ventures partner Nikunj Kothari 则提醒另一面：从 tokenmaxxing、token anxiety 到 tokenoptimizing 的转向很快，但他仍倾向于给员工充足 token budget，让他们留在 frontier、探索边界；否则组织很容易退回“过去一直这么做”的惯性。[来源](https://x.com/nikunj/status/2063630238123483195)

## 3) 从 prompt 到 loop：长任务 Agent 需要自我验证

Claude Code 的 Boris Cherny 给出了一组非常实践的长任务建议。他说，看到一些 benchmark 显示 Opus 更适合 long-running work，并建议让 Opus autonomous 跑数小时或数天时使用 auto mode 减少权限打断、用 dynamic workflows 编排大量 agents、用 `/goal` 或 `/loop` 让 Claude 持续推进，最好放在 Claude Code cloud 里运行，并且必须给 Claude 端到端 self-verify 的手段，比如浏览器扩展、移动端 simulator MCP，或能启动完整 web server / backend service 的方式。[来源](https://x.com/bcherny/status/2063792263067754658)

Peter Steinberger 把这件事说得更像一句工程格言：不要再只是 prompting coding agents，而应该 designing loops that prompt your agents。这个说法之所以今天反复出现，是因为单次 prompt 只是在触发模型；loop 才是在定义检查点、权限、反馈、重试和完成条件。[来源](https://x.com/steipete/status/2063697162748260627)

OpenAI Codex / ChatGPT 团队的 Thibault Sottiaux 也在把“更多自主工作”推向社区：未来 100 天，他们每天会选一个用 Codex 做出 impressive 或 incredibly useful work 的人，给其一个月 10X usage limits，看看更高上限会释放出什么。[来源](https://x.com/thsottiaux/status/2063748242681307611) Sam Altman 对这条动态的评价是 “interesting recursive loop here maybe”，也把这件事放回 loop 叙事里：让用户用 Codex 做作品，再把更高额度奖励给更会用 Codex 的人。[来源](https://x.com/sama/status/2063779477419901071)

## 4) Managed Agents 的新部件：dreaming、outcomes、多 Agent 编排

Claude Blog 发布的 Managed Agents 更新，把今天的 loop 主题产品化成三个能力：dreaming、outcomes、multiagent orchestration。Dreaming 是一个定时过程，会回看过去的 agent sessions 和 memory stores，提取模式、整理记忆，让 agents 在会话之间改进；用户可以选择自动写入 memory，或先 review 再落地。[来源](https://claude.com/blog/new-in-claude-managed-agents)

Outcomes 则是把“好结果”的标准写成 rubric，由独立 grader 在自己的 context window 里评估 agent 输出。若结果不达标，grader 指出需要修改的地方，agent 再跑一轮。Claude Blog 称，在测试中，outcomes 相比标准 prompting loop 让 task success 最高提升 10 points；文件生成质量上，docx task success 提升 8.4%，pptx 提升 10.1%。[来源](https://claude.com/blog/new-in-claude-managed-agents)

Multiagent orchestration 处理的是单个 agent 工作量过大的问题：lead agent 可以把任务拆给多个 specialist agents，每个 specialist 有自己的 model、prompt 和 tools，并行在 shared filesystem 上工作。Claude Blog 给的例子包括从 deploy history、error logs、metrics、support tickets 并行调查问题；Harvey、Netflix platform team、Spiral by Every、Wisedocs 都被列为使用案例，其中 Harvey 在测试里 completion rates 提升约 6x，Wisedocs 的文档质量检查 review 速度提升 50%。[来源](https://claude.com/blog/new-in-claude-managed-agents)

这不是单纯的功能更新，而是 agent 产品正在从“用户给 prompt”转向“系统给评价标准、记忆维护和任务分发”。如果 token 是成本侧的约束，outcomes 和 dreaming 就是质量侧的约束。

## 5) 知识工作 Agent 为什么还没像 SWE Agent 一样成熟

前 Google Gemini / Veo / Nano Banana product leader Madhu Guru 提醒了一个常被低估的瓶颈：训练数据不是低技能脏活。要推进模型 frontier，labs 需要的是高经济价值任务的数据，而非简单扫描 notebook、挖互联网、打标签。尤其在 SWE 之外，很多高价值知识工作几乎没有文档，依赖多年积累的复杂、领域化经验，以及互不连通的 legacy tools。[来源](https://x.com/realmadhuguru/status/2063704354910347520)

他的结论很直接：这就是为什么现在已经有 SWE agents，却还没有同等成熟的 knowledge work agents。像 Mercor 这类创造训练数据的公司，做的是高杠杆、高技能、且被低估的工作。[来源](https://x.com/realmadhuguru/status/2063704354910347520)

这条信号和 Levie 的企业观察能对上：非工程知识工作不是“把 Claude Code 换个名字给市场部用”那么简单。它缺训练数据、缺标准、缺工具连接、缺 ROI tooling，也缺组织层面的使用教育。

## 6) 平台和分发：开发变便宜后，GTM 与可见性更贵

Aaron Levie 还反驳了一个流行判断：AI 会吃掉 enterprise software。AI 的确让软件开发变容易了一些，但要构建企业依赖的平台，仍然需要 taste、差异化、质量、安全，以及大量 GTM、consultative selling、实施和集成支持。开发变便宜以后，discoverability 和 market differentiation 反而会变成更难的问题。[来源](https://x.com/levie/status/2063756386572681606)

这和 Replit CEO Amjad Masad 的产品叙事形成另一种呼应：Replit 要移除 distraction，让用户专注于 getting to market。也就是说，AI builder 工具的竞争已经不只是谁能生成代码，而是谁能把用户推到市场里。[来源](https://x.com/amasad/status/2063744208587125142)

Vercel CEO Guillermo Rauch 则把成本、可靠性和观测性放在 AI infrastructure 层。他称 Vercel AI Gateway 平均每月 recover 超过 1T tokens，类似 Stripe 通过失败支付重试或信用卡更新来 recover revenue；并强调其在 labs 原价上零 markup，同时提供 redundancy、zero-data retention enforcement、observability、usage APIs、caps 等能力。[来源](https://x.com/rauchg/status/2063714700618334260)

如果把这些放在一起，今天的市场逻辑很清楚：生成能力会继续变得更普遍，但真正值钱的是把能力接进预算、路由、质量、合规、分发和 GTM 的那层系统。

## 7) 小信号：AI-native 的社会展示与个人记忆

Garry Tan 说，教育人们如何使用 AI tools 已经成为 serious bottleneck，并提到 GBrain v0.42.30 现在可以详细总结一个人的思考如何随时间变化。[来源](https://x.com/garrytan/status/2063786111588323780) [来源](https://x.com/garrytan/status/2063785286367392095)

Zara Zhang 则从 Frontend Slides skill 的自然增长里看到一个更轻的信号：slides 天生是 social 的，人们看到酷的 HTML decks 会问“这是怎么做的”，也更容易把使用 HTML decks 的人视为 AI-native、AI-savvy。[来源](https://x.com/zarazhangrui/status/2063638307586662539)

这两条看似边缘，但指向同一个事实：AI 工具 adoption 不只发生在性能曲线里，也发生在教育、展示、模仿和个人工作流的社会传播里。

## 简短结语

今天最值得记住的不是某个单点发布，而是一个更硬的阶段转换：Agent 正从“尽可能多跑”进入“有预算地跑、有标准地跑、有记忆地跑、有分工地跑”。

token 账单逼着企业做模型分层和业务预算；long-running work 逼着 builders 设计 loops 而不是堆 prompt；Managed Agents 把 dreaming、outcomes、multiagent orchestration 做成产品部件；知识工作 agents 则提醒我们，真正难的不是模型会不会说话，而是高价值工作的隐性知识能不能被捕捉、验证和组织起来。

下一轮 Agent 竞争，大概率不只比谁更聪明，而是比谁更会自我节制。

## 原始来源

- [The MAD Podcast with Matt Turck: State of Enterprise AI 2026: Aaron Levie on Tokenmaxxing, Rise of Headless, and AI-Proofing Your Job](https://www.youtube.com/watch?v=Gs2styCcwro)
- [Boris Cherny on X: Five tips for running Opus autonomously for hours/days](https://x.com/bcherny/status/2063792263067754658)
- [Thibault Sottiaux on X: Codex 10X usage limits for selected builders](https://x.com/thsottiaux/status/2063748242681307611)
- [Madhu Guru on X: High-skill training data for knowledge work agents](https://x.com/realmadhuguru/status/2063704354910347520)
- [Amjad Masad on X: Replit and getting to market](https://x.com/amasad/status/2063744208587125142)
- [Guillermo Rauch on X: Vercel AI Gateway recovers over 1T tokens a month](https://x.com/rauchg/status/2063714700618334260)
- [Aaron Levie on X: model family stratification and cost-aware orchestration](https://x.com/levie/status/2063835799096090749)
- [Aaron Levie on X: enterprise software, GTM, and differentiation after AI](https://x.com/levie/status/2063756386572681606)
- [Garry Tan on X: AI tool education as bottleneck](https://x.com/garrytan/status/2063786111588323780)
- [Garry Tan on X: GBrain v0.42.30 summarizes how thinking changed over time](https://x.com/garrytan/status/2063785286367392095)
- [Zara Zhang on X: Frontend Slides skill and social adoption](https://x.com/zarazhangrui/status/2063638307586662539)
- [Nikunj Kothari on X: from tokenmaxxing to tokenoptimizing](https://x.com/nikunj/status/2063630238123483195)
- [Peter Steinberger on X: design loops that prompt agents](https://x.com/steipete/status/2063697162748260627)
- [Sam Altman on X: recursive loop around Codex usage program](https://x.com/sama/status/2063779477419901071)
- [Claude Blog: New in Claude Managed Agents: dreaming, outcomes, and multiagent orchestration](https://claude.com/blog/new-in-claude-managed-agents)

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
