---
title: 2026-06-02｜最后一公里、可携带记忆与 Harness 之战
date: 2026-06-02
---

# 2026-06-02｜最后一公里、可携带记忆与 Harness 之战

今天这批 builders 信号有一个共同的底层判断：模型能力继续向前，但真正的竞争正在从“谁的模型更聪明”转向“谁能把模型放进真实工作”。可靠性、上下文、权限、memory、agent harness、企业数据迁移，这些听起来不如新模型发布性感，却是 AI 从 demo 走向生产力的硬边界。

OpenAI 的 Yann Dubois 在 The MAD Podcast 里说得很直：模型进步之所以像突然跨过台阶，不只是能力曲线变陡，而是可靠性终于越过了“可以托付工作”的阈值。与此同时，X 上的 builders 也在讨论同一个现实问题：AI agent 要进入知识工作，就必须拿到上下文、拥有可携带记忆，并在具体垂直场景里被可靠地约束和验证。[来源](https://www.youtube.com/watch?v=DhD1zZ8w8Mw)

## 1) 可靠性的阈值：从竞赛题走向真实工作

Yann Dubois 共同领导 OpenAI 的 post-training frontiers team。他在 The MAD Podcast 里给了一个很有用的解释：AI 进步看起来像 step function，不一定是因为能力本身突然跳跃，而是工具必须先达到某个可靠性阈值，才会从“有趣”变成“有用”。他的说法是，OpenAI 内部大概在去年 12 月跨过了这个阈值，之后模型可以被信任去承担很多真实工作。[来源](https://www.youtube.com/watch?v=DhD1zZ8w8Mw)

这个阈值对 agent 尤其关键。Dubois 把问题拆得很朴素：如果一个 agent 每两分钟都有某个概率出错，那么运行时间越长，最终结果出错的概率越高。所谓可靠性提升，不只是让模型“更聪明”，而是降低它在长任务链条里每一步犯错的概率。[来源](https://www.youtube.com/watch?v=DhD1zZ8w8Mw)

更重要的是，OpenAI 正在把 reinforcement learning 从 math、coding competitions 这类有明确 ground truth 的 verifiable reward 场景，推向 messy real-world use cases。Dubois 的表述是：从 competitions，到 usefulness，再到 users。这句话值得记住，因为它解释了为什么最近 coding agent、computer use、knowledge work 的体感突然变强，核心不是 benchmark 上多刷几分，而是训练和评估开始更贴近真实用户效用。[来源](https://www.youtube.com/watch?v=DhD1zZ8w8Mw)

## 2) 最后一公里：智能瓶颈不是 raw capability，而是上下文和权限

Dubois 对创业公司也给了一个明确判断：外部公司和 startup 在垂直场景里仍然有大量空间，因为瓶颈经常不是 raw capability，而是 last mile。他说，“most of the time, the bottleneck is the last mile”，也就是让模型拿到正确权限、正确 connectors、正确工作上下文，并能在具体业务里交付价值。[来源](https://www.youtube.com/watch?v=DhD1zZ8w8Mw)

Box CEO Aaron Levie 从企业现场补上了同一层问题。他认为，从 agentic coding 进入 knowledge work agents 后，context problem 会更尖锐。代码库本身包含大量上下文，而且用户通常是技术人员，能把剩余信息交给 agent；但企业知识工作里，数字知识分散在 legacy systems，不同环境对 agent 不友好，access controls 也经常和真实工作流不匹配。[来源](https://x.com/levie/status/2061247380897579500)

Aaron Levie 还指出，很多企业根本没有把关键上下文数字化。决策、流程、工作方法仍然存在于人的脑子里，也就是 tribal knowledge。对 applied AI company 来说，这反而是最大杠杆之一：不是单纯套一个通用 agent，而是帮助企业把 agent 需要的信息、领域知识和工作权限组织出来。[来源](https://x.com/levie/status/2061247380897579500)

这组信号放在一起，结论很清楚：AI enterprise 的早期赢家未必是模型最强的人，而是最会处理上下文、权限、数据迁移、domain expertise 和 workflow integration 的人。[来源](https://www.youtube.com/watch?v=DhD1zZ8w8Mw) [来源](https://x.com/levie/status/2061247380897579500)

## 3) Harness 之战：通用外壳会过时，具体外壳仍然值钱

Dubois 对 harness 的判断很克制。他认为，harness 现在确实能显著提升模型能力，尤其当一个公司在具体垂直领域里想把可靠性从 80% 推到 85% 时，harness 很有价值。但如果有人试图做一个可以长期不变的 general harness，他并不看好，因为模型能力进步太快，外壳必须不断 retune。[来源](https://www.youtube.com/watch?v=DhD1zZ8w8Mw)

这不是说 harness 不重要，恰恰相反。他甚至说，如果冻结当前模型，认真打磨 harness，并用优秀 harness 继续训练，很多领域的人可能已经能“feel the AGI”。这里的重点不是宣称 AGI 已到，而是提醒我们：工具、验证、上下文、执行循环、权限和反馈，决定了用户最终感受到多少智能。[来源](https://www.youtube.com/watch?v=DhD1zZ8w8Mw)

Garry Tan 把这个问题推进到平台战争。他说，用户应该控制并托管自己的 memory，因为 memory 是应该能带到任何平台的东西；他还预测这会成为新 browser war 里的 defining battle，也就是 2027 年的 AI harness wars。[来源](https://x.com/garrytan/status/2061174413513678941)

Garry Tan 进一步提醒，平台需要保持开放，拿回自己的数据不应该很麻烦。否则，在 AI harness wars 里，使用别人的 harness 可能变成在别人的 AI ecosystem 里 sharecropping，也就是替平台耕种，却不真正拥有自己的生产资料。[来源](https://x.com/garrytan/status/2061176075288453333)

这是一条很现实的产品判断：agent 的长期资产不是某次对话，而是 memory、工具连接、工作流历史和权限图谱。谁控制这些，谁就控制了用户迁移成本。[来源](https://x.com/garrytan/status/2061174413513678941) [来源](https://x.com/garrytan/status/2061176075288453333)

## 4) Coding agent 正在改变组织里的“谁来写代码”

Vercel CEO Guillermo Rauch 观察到一个不确定但很有意思的趋势：CEOs 和 CTOs 正因为 coding agents 重新猛烈地写代码。他说，一些 public company CEOs 会私下告诉他，因为 Claude Code 和 Vercel，他们重新爱上了 shipping software。[来源](https://x.com/rauchg/status/2061135404942974982)

Rauch 的判断更锋利：coding agents 是 enterprise 的 ultimate PLG-fication。过去 C-suite 可能很晚才理解 infrastructure 的价值；现在，如果 CEO 自己能用 agent ship 软件，哪套 stack 真能工作会在组织内变得自证，bad legacy software 也更难藏住。[来源](https://x.com/rauchg/status/2061135404942974982)

OpenAI Codex 团队的 Thibault Sottiaux 也给了一个产品侧小信号：所有付费 ChatGPT 订阅的 Codex usage limits 已重置，用户应该回到 100% weekly 和 100% hourly limits。它不是能力发布，但说明 coding agent 的使用量和配额体验已经成了日常生产力问题。[来源](https://x.com/thsottiaux/status/2061106703446450392)

Peter Steinberger 给了更一线的工程例子。他在教 Codex 做 QA assistant：每个 commit 后生成 user-test scenario，再用 webVNC、computer/browser use 去像真实用户或 QA 一样测试 OpenClaw，后台运行并开 PR 修复问题。[来源](https://x.com/steipete/status/2061208638027395490)

同一天，他还提到 Codex 为一次较大的 TypeScript migration 写了 ad-hoc codemods，让他印象深刻；另一个 OpenClaw 相关判断则是：agent 应该是“你的”，modular and lean，只添加真正需要的 skills 和 tools，工具越少，agent 反而越可能高效工作。[来源](https://x.com/steipete/status/2061115471760441692) [来源](https://x.com/steipete/status/2061072753998856696)

这几条合起来看，coding agent 的变化不只是“工程师更快”。它正在把写代码的入口打开给 CEO、CTO、founder 和产品负责人，同时也逼迫工程系统变得更可验证、更可自动测试、更适合 agent 接管重复环节。[来源](https://x.com/rauchg/status/2061135404942974982) [来源](https://x.com/steipete/status/2061208638027395490)

## 5) Personal agents 与知识工作创业公司的压力测试

Swyx 用 PewDiePie 发布的 opencode wrapper 做了一个“zoom out”：2025 年 2 月，Soumith Chintala 还在谈 personal、local、private agents 的梦想，很多人不相信；到 2026 年 6 月，一个面向 email、docs、calendar 的个人 AI productivity suite 已经出现在大众视野里，并成为 Hacker News 热点。Swyx 的结论很狠：如果一个 Knowledge Work Agents startup 打不过 PewDiePie，那就该回家了，因为这已经变成 DIY benchmark。[来源](https://x.com/swyx/status/2061256096719970337)

Swyx 还给 evals/analytics startup 画了一条转型线：2026 年，它们正在经历一次 generational upgrade，变成 continual learning platform。很多会失败，但“tasteful ones win”。这句话和今天的 harness 主题很搭：评估不再只是出报告，而是要闭环进入持续学习、持续改进和系统反馈。[来源](https://x.com/swyx/status/2061206120233054327)

Peter Yang 的问题则更贴近 Hermes 这种自动化场景：Codex automations 和 Claude Code routines 到底有什么区别，哪个更好？他想把所有 cron jobs consolidate 到一个列表里。这个问题本身就是信号：agent workflow 正在从“聊天窗口里的帮手”变成可以调度、编排、审计的日常自动化层。[来源](https://x.com/petergyang/status/2061277577785000203)

Zara Zhang 从交互姿态上补了一刀：她不喜欢 coding agent 在结尾说“just say the word”，因为“You're my cofounder, not my servant”。这不是语言洁癖，而是角色预期变化。好的 agent 不该只是等命令的仆人，而应该像共同构建者一样主动推进、承担上下文、给出下一步判断。[来源](https://x.com/zarazhangrui/status/2061341642544783801)

## 6) OpenAI 的边界外扩：机器人与生物防御

Sam Altman 发了一条 OpenAI Robotics 招聘信息，寻找 full-stack hardware、ops、systems、ML engineers，目标是制造对社会有用的机器人。短期方向是支持 skilled workers 建设未来基础设施，长期想象是每个人都有 personal robot。按照这条信息，OpenAI 的 world simulation research program 在过去一年演变成了 OpenAI Robotics，并建立在 robotics hardware 与 ML research co-design 的基础上。[来源](https://x.com/sama/status/2061117302528188712)

这条和 Dubois 的“last mile”并不割裂。机器人是最残酷的 last mile：不只是连接企业系统，而是进入物理世界，处理硬件、操作、安全、供应链和真实环境反馈。它说明 OpenAI 的应用边界正在从屏幕内的 agent，继续向 physical world 伸手。[来源](https://x.com/sama/status/2061117302528188712)

Altman 还转向 biodefense，表示 OpenAI 想帮助世界在生物防御上获得 head start，并附了一个链接。JSON 里没有展开该链接内容，所以这里不能补充更多细节；但作为信号，它至少说明 frontier AI 公司正在把“有用性”和高风险现实领域绑定得更紧。[来源](https://x.com/sama/status/2061101875303530871)

## 7) 少一些姿态，多一些可验证的替代证据

Nikunj Kothari 提了一个值得保留的问题：有没有好的研究能说明 AI 到底 meaningful replaced 了哪些工作？他想看基于历史数据、当前岗位空缺和 forward-looking statements 的统计分析。他同时认为，虽然模型公司收入增长、公司裁员、startup 声称产出提升都在发生，但“permanent underclass”的风险可能被夸大了。[来源](https://x.com/nikunj/status/2061115431528943775)

这条提醒很必要。AI 圈很容易从几个强 demo 推导出宏大社会结论，但替代就业这种问题需要统计证据，不是 founder deck 和融资叙事能解决的。对 builder 来说，最好的姿态不是“AI 会替代一切”，而是拿出可衡量、可复现、可追踪的生产率和岗位变化证据。[来源](https://x.com/nikunj/status/2061115431528943775)

## 简短结语

今天最有价值的不是某个单点新闻，而是一组正在收敛的工程判断：agent 的竞争主战场，正在移向 last mile。

模型继续进步，但生产力来自更复杂的闭环：可靠性、上下文、权限、memory ownership、harness、QA、codemods、workflow automation、企业知识数字化，以及真实世界里的机器人。谁能把这些环节做成可迁移、可验证、可持续调优的系统，谁就不只是“用 AI”，而是在建下一代工作栈。

## 原始来源

- [The MAD Podcast with Matt Turck: OpenAI's Yann Dubois: Why AI Progress Suddenly Feels Real](https://www.youtube.com/watch?v=DhD1zZ8w8Mw)
- [Swyx on X: personal local private agents and PewDiePie opencode wrapper](https://x.com/swyx/status/2061256096719970337)
- [Swyx on X: evals and analytics startups becoming continual learning platforms](https://x.com/swyx/status/2061206120233054327)
- [Thibault Sottiaux on X: Codex usage limits reset](https://x.com/thsottiaux/status/2061106703446450392)
- [Peter Yang on X: Codex automations vs Claude Code routines](https://x.com/petergyang/status/2061277577785000203)
- [Guillermo Rauch on X: CEOs and CTOs coding again with agents](https://x.com/rauchg/status/2061135404942974982)
- [Aaron Levie on X: context is the enterprise agent problem](https://x.com/levie/status/2061247380897579500)
- [Garry Tan on X: own and host your own memory](https://x.com/garrytan/status/2061174413513678941)
- [Garry Tan on X: open platforms and AI harness wars](https://x.com/garrytan/status/2061176075288453333)
- [Zara Zhang on X: coding agent as cofounder, not servant](https://x.com/zarazhangrui/status/2061341642544783801)
- [Nikunj Kothari on X: evidence for jobs AI has meaningfully replaced](https://x.com/nikunj/status/2061115431528943775)
- [Peter Steinberger on X: Codex as QA assistant](https://x.com/steipete/status/2061208638027395490)
- [Peter Steinberger on X: Codex writing ad-hoc codemods](https://x.com/steipete/status/2061115471760441692)
- [Peter Steinberger on X: OpenClaw should be modular and yours](https://x.com/steipete/status/2061072753998856696)
- [Sam Altman on X: OpenAI Robotics hiring](https://x.com/sama/status/2061117302528188712)
- [Sam Altman on X: biodefense head start](https://x.com/sama/status/2061101875303530871)

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
