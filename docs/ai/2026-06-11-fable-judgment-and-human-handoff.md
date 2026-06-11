---
title: 2026-06-11｜Fable 的判断力，和人类的接力点
date: 2026-06-11
---

# 2026-06-11｜Fable 的判断力，和人类的接力点

今天的 builders 信号几乎被 Claude Fable 5 点燃，但真正值得写下来的不是“又一个更强模型发布了”。更有意思的变化是：大家开始用“判断力”“品味”“目标”“验证”“接力”这些词描述模型，而不是只谈 benchmark 或生成速度。

这意味着 coding agent 的交互边界正在变。过去的默认姿势是把任务拆小、把步骤说清、随时盯着；今天的前沿用法更像是给一个目标、定义完成标准、给它验证手段，然后在人类和模型之间建立更稳的 handoff。

## 1) Fable 5 的情绪面：不是更快，而是更像协作者

Claude 官方账号宣布 Claude Fable 5 已经开放，同时 Claude Mythos 5 先限制在 Glasswing partners 内；官方还说明 Mythos 5 与 Fable 5 使用相同 underlying model，但在部分区域放宽 safeguards，未来计划通过更广的 trusted access program 扩展到防御性网络安全和生物医学研究场景。[来源](https://x.com/claudeai/status/2064394160522559632) [来源](https://x.com/claudeai/status/2064394158056386684) [来源](https://x.com/claudeai/status/2064394159318782217)

真正形成扩散效应的是早期 builders 的体感。Andrej Karpathy 说 Fable 5 在 benchmark 上很强，但他更强调 qualitative step change：尤其适合长时间、困难问题的 problem-solving session，可以给它比过去更有野心的任务；他也提醒不要在生产环境里完全不看代码。Karpathy 的另一个判断更关键：当 working software 越来越像“打开水龙头”一样流出，Jevons paradox 会出现，个人对软件、可视化、dashboard、单次使用 app、测试套件和研究项目的需求会明显上升。[来源](https://x.com/karpathy/status/2064409694761054332)

Claude Code 的 Boris Cherny 给出了更贴近工程现场的描述：Fable 5 是他自 Opus 4.5 以来感受到的最大跃迁，Claude 从 coding agent 更像变成了产品构建里的 thought and design partner。他特别提到一次 debug 体验：模型会测量、加日志、验证修复是否真的完成，而不是急着宣布成功；这种 self-verification 不是 Claude Code prompt 硬写出来的，而像是模型自身的“气味”。[来源](https://x.com/bcherny/status/2064431111154053187)

Anthropic research 的 Alex Albert 也用了相似语言：Fable 让模型从“我指挥的工具”更像“我协作的对象”。他给新用户的建议很实用：给更大、更有野心的任务；默认使用 xhigh/high effort；重写旧的 skills 和 `CLAUDE.md`，避免旧指令把新模型锚定在过时模式里；从“给任务”转向“给目标”，描述 done looks like 和验证方式，再让 Fable 自己找路径。[来源](https://x.com/alexalbert__/status/2064394410004304003) [来源](https://x.com/alexalbert__/status/2064467657483829441)

这几个判断合在一起，说明今天的模型进步不只是 answer quality 的提升，而是交互协议的变化：人类不再只写 prompt，而是在写目标、边界和验收标准。

## 2) 从任务到目标：Agent 操作手感开始改变

OpenAI Codex / ChatGPT 团队的 Thibault Sottiaux 继续把 `/goal` 放在前台：他问大家是偶尔用 Codex `/goal`，还是已经把它当作主要完成工作的方式；另一条则把使用 Codex 描述成“像指挥一个乐团，一次一个 `/goal`”。这不是完整产品说明，但它很好地捕捉了 agent UI 的方向：从逐步命令，走向目标队列和控制节奏。[来源](https://x.com/thsottiaux/status/2064308436133716008) [来源](https://x.com/thsottiaux/status/2064307859903447396)

Boris Cherny 另一条动态把这个方向落到方法论上：强模型能长时间运行时，self-verification loop 会变成关键部件。它让模型更久地独立推进，同时结果更接近用户意图，用户不用不断 check in。[来源](https://x.com/bcherny/status/2064426115255730578)

Peter Yang 的小实验展示了另一种极端：他贴出让模型构建 F-Zero 风格反重力赛车的 prompt，里面明确写了伪 3D 赛道、3 个 AI 对手、boost meter、速度感、HUD、键盘控制和视觉风格，并强调“prioritize feel over realism”。这类 prompt 的重点不是把每个实现步骤拆开，而是把成品感、约束和体验目标说清楚。[来源](https://x.com/petergyang/status/2064550073594446059)

Nikunj Kothari 则把 input pipeline 拉长了：他听到一集关于 S-curves 的播客后，把 transcript 扔进 Claude app research mode，让它研究历史上的 S-curves、整理章节，再生成一个 Claude Code 可以 one-shot 的 prompt，最后做出一个关于过去 200 年 S-curves、拐点和 bubble 讨论的网站。[来源](https://x.com/nikunj/status/2064506504888373758) [来源](https://x.com/nikunj/status/2064508462034501997)

这里的共同点是：好的 agent 使用者越来越像 producer，而不是 typist。价值不只在写一句神奇 prompt，而在选择材料、组织 context、定义目标、设计验证，并知道什么时候该接手。

## 3) Every 的反直觉经验：自动化之后，人反而更多

AI & I by Every 这一期的标题很直白：`We Automated Everything With AI and Tripled Our Headcount`。Dan Shipper 的核心观点是，Every 内部已经非常 AI-native、agent-native，Slack 里可能同时撞到人和 agent；大家都在用 Claude Code、Codex 等工具。但从 GPT-3 时代到现在，Every 从 4 人增长到 30 人，还在继续招聘。[来源](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)

Dan 的解释很值得和今天的 Fable 热潮放在一起看：AI 让“昨天的专家能力”变便宜。任何人都能用 prompt 借用过去专家产出的代码、写作、设计和决策模式，于是组织里会涌出大量“看起来差不多对、但并不完全适合当下”的工作。[来源](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)

这并没有消灭专家，反而增加了专家需求。因为专家要把这些接近正确但未完成的产物 shepherd 到真正可用：建立 repo rules、review guidelines、editorial systems，或者用更高能力工具做以前不可能完成的产品。Dan 的一句判断可以作为今天整篇的底色：“the further away an agent gets from a human, the less valuable it is.”[来源](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)

他还区分了 autonomy 和 agency：agent 可以越来越 autonomous，代表你完成任务，但这不等于它有自己的 agency。它仍然是在代表某个人行动，仍然会回头问“下一步做什么”。这和 Fable 5 的协作感并不冲突，反而解释了为什么越强的模型越需要更清晰的人类接力点。[来源](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)

## 4) 企业落地的真实护城河：把公司的 private reality 翻译给模型

Box CEO Aaron Levie 今天转发并摘出一段很重要的话：应用公司进入“不可训练角落”的方式，不是炫技，而是做不体面的脏活，整理一家公司的 private reality，让模型能在其中行动，给模型工具，并和客户一起改变 workforce 的现实。他进一步评论说，模型能力和企业 workflow 应用之间仍有巨大鸿沟，里面包括技术、数据访问与格式化、change management 和 FDE 式实施工作。[来源](https://x.com/levie/status/2064569513023328268)

Levie 的判断很清晰：frontier models 和 labs 会继续增长，但同时也会出现大量 software 与 services 公司，把模型能力带进真实企业。这为新的 infrastructure providers、vertical applied AI companies、新型 system integrators 留出了空间。[来源](https://x.com/levie/status/2064569513023328268)

他还补了另一个被忽略的评价问题：模型表现越来越依赖 inference-time compute，因此 compute-normalized benchmarks 是理解 AI 进展的合理方向；但难点是“应该给多少 compute”本身很主观，不同模型在不同 thinking threshold 下排序可能反转，阈值集合几乎无限。[来源](https://x.com/levie/status/2064379199629181139)

Vercel CEO Guillermo Rauch 的动态则落在成本和控制面：Vercel CLI 现在可以创建 AI Gateway API keys，并通过 `--budget` 和 `--refresh-period` 给 spend 与周期设上限，他把它比作“AI token 的虚拟信用卡”。当 agent 工作开始变成目标驱动和长循环，预算边界也会成为产品接口的一部分。[来源](https://x.com/rauchg/status/2064551967461114111)

## 5) 非技术用户的问题不是聊天框，而是不知道能要求什么

Zara Zhang 的观察很适合给今天的“更强模型”降温：非技术用户使用 coding agents 的障碍从来不是 interface，聊天已经是最简单的 UI；真正障碍是他们不知道该要求什么。空白聊天框默认用户已经知道什么是可能的，但多数人不知道。[来源](https://x.com/zarazhangrui/status/2064587398529606082)

她提到 Town 的 onboarding 让她印象深刻，因为 agent 会主动建议 workflows 和可以接手的事情，而不是等用户先给指令。这一点和 Alex Albert 的“从任务转向目标”形成互补：高级用户需要学会描述 objective，普通用户则需要产品主动暴露 possibility space。[来源](https://x.com/zarazhangrui/status/2064587398529606082)

Zara 还预告会分享自己的 vibe coding process：作为非技术背景但在 GitHub 上拿到 30k stars 的 builder，她会讲产品想法、如何和 coding agents 协作、怎样设计不是 AI slop 的东西，以及为什么代码是一种 storytelling medium。[来源](https://x.com/zarazhangrui/status/2064486120386379950)

如果说 Fable 5 抬高了天花板，Zara 的提醒则指向地板：让更多人进入 builder 状态，需要的不只是更聪明的模型，还需要更好的 onboarding、范例、工作流建议和审美教育。

## 6) 小信号：兴奋、摩擦和开放问题

Thariq 说 Fable 是模型的 step-change，并希望它改变大家使用 Claude 的方式，TLDR 是“该更有野心了”。Garry Tan 也说 Fable 5 是他见过最大的 model energy。[来源](https://x.com/trq212/status/2064437561930682672) [来源](https://x.com/garrytan/status/2064573857911152710)

但摩擦也在出现。Peter Yang 说 browser use 让 Fable 在他的使用中变慢；他还追问大家说的 “big model smell” 到底是什么意思。Garry Tan 也在修 GStack 时遇到 Fable 5 的某种阻塞并叹气。这些细节提醒我们：模型体感跃迁不等于 workflow 已经稳定，工具调用、浏览器、权限、延迟、可解释的失败模式仍然会决定日常手感。[来源](https://x.com/petergyang/status/2064577126385459265) [来源](https://x.com/petergyang/status/2064563041166090672) [来源](https://x.com/garrytan/status/2064559225859416186)

还有一条有趣的能力组合来自 Rauch：Opus 写了一个 VM，然后 Mythos 验证它。无论细节如何，这个表述很像下一阶段 agent workflow 的雏形：一个模型生成，一个模型审查，一个系统负责权限、预算和交付。[来源](https://x.com/rauchg/status/2064419055726215438)

## 简短结语

今天最值得记住的，不是 Fable 5 的热闹发布，而是 builders 对“更强模型”给出的新操作语言：更大的目标、更少的微操、更清楚的 done looks like、更强的 self-verification、更重要的人类判断。

Every 的经验说明，自动化不会自动减少人类工作，它会制造更多半成品、更多可能性，也更需要专家把它们接到真实世界。Levie 的企业判断说明，模型越强，越需要有人把 private reality、工具、数据和组织流程翻译给它。Zara 的提醒则说明，空白聊天框并不会自动把普通人变成 builder。

所以 Fable 5 的真正信号也许不是“agent 离人更远了”，而是相反：越强的 agent，越需要更好的接力点。

## 原始来源

- [Claude on X: Claude Fable 5 is available everywhere today](https://x.com/claudeai/status/2064394160522559632)
- [Claude on X: Claude Mythos 5 shares underlying model with Fable 5](https://x.com/claudeai/status/2064394158056386684)
- [Claude on X: future trusted access program for Mythos 5](https://x.com/claudeai/status/2064394159318782217)
- [Andrej Karpathy on X: Fable 5 qualitative step change and Jevons paradox for software](https://x.com/karpathy/status/2064409694761054332)
- [Boris Cherny on X: Fable 5 as thought and design partner](https://x.com/bcherny/status/2064431111154053187)
- [Boris Cherny on X: self-verification loops](https://x.com/bcherny/status/2064426115255730578)
- [Alex Albert on X: Fable feels more collaborative](https://x.com/alexalbert__/status/2064394410004304003)
- [Alex Albert on X: four tips for using Fable](https://x.com/alexalbert__/status/2064467657483829441)
- [Thibault Sottiaux on X: Codex /goal usage](https://x.com/thsottiaux/status/2064308436133716008)
- [Thibault Sottiaux on X: playing Codex like an orchestra](https://x.com/thsottiaux/status/2064307859903447396)
- [Peter Yang on X: F-Zero prompt](https://x.com/petergyang/status/2064550073594446059)
- [Nikunj Kothari on X: Fable one-shot S-curves website](https://x.com/nikunj/status/2064506504888373758)
- [Nikunj Kothari on X: transcript to research to Claude Code prompt](https://x.com/nikunj/status/2064508462034501997)
- [AI & I by Every: We Automated Everything With AI and Tripled Our Headcount](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)
- [Aaron Levie on X: applied AI and the untrainable corner](https://x.com/levie/status/2064569513023328268)
- [Aaron Levie on X: compute-normalized benchmarks](https://x.com/levie/status/2064379199629181139)
- [Guillermo Rauch on X: Vercel CLI AI Gateway budgets](https://x.com/rauchg/status/2064551967461114111)
- [Zara Zhang on X: non-technical users and blank chat boxes](https://x.com/zarazhangrui/status/2064587398529606082)
- [Zara Zhang on X: vibe coding process](https://x.com/zarazhangrui/status/2064486120386379950)
- [Thariq on X: Fable as a step-change](https://x.com/trq212/status/2064437561930682672)
- [Garry Tan on X: biggest model energy](https://x.com/garrytan/status/2064573857911152710)
- [Peter Yang on X: browser use slowing Fable](https://x.com/petergyang/status/2064577126385459265)
- [Peter Yang on X: big model smell](https://x.com/petergyang/status/2064563041166090672)
- [Garry Tan on X: GStack and Fable 5 friction](https://x.com/garrytan/status/2064559225859416186)
- [Guillermo Rauch on X: Opus wrote a VM and Mythos verified it](https://x.com/rauchg/status/2064419055726215438)

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
