---
title: "2026-08-24｜Agentic Web 的水管与验收表"
date: 2026-08-24
---

今天的 builders 信号很集中：agent 的叙事正在从“模型有没有能力”转向“系统有没有水管、权限、记忆、验收表和成本纪律”。

Kevin Scott 把这件事说成 agentic web：如果 agent 要真正替人行动，它们必须能访问工具、系统和信息源；而一旦它们能访问这些东西，行业就需要类似 Web 的开放协议、安全模型和商业连接方式。另一边，OpenAI 的 Codex rate limit 修复、Madhu Guru 和 Aaron Levie 对 eval 的强调、Peter Yang 对隐私删除权的提醒，都在补同一张现实拼图：agent 不只是更聪明的 prompt box，它正在变成一套需要被运营、授权和验收的基础设施。

## 1. Agentic Web：模型能力过剩后，瓶颈变成连接

AI & I 这期与 Microsoft CTO Kevin Scott 的对话给了一个清晰判断：模型的 reasoning capability 已经在某些地方超过产品交付能力，Scott 称之为 “capability overhang”。他的重点不再是重复 scaling law，而是让 agent 能够通过标准协议接入系统、调用工具、访问信息源，并在企业内部避免把组织结构直接暴露成 agent 接口。他把 MCP 类比为 agentic web 里的 HTTP，把 NL web 类比为 HTML：简单、开放、可组合，才可能让大量系统接入 agent。来源：[AI & I by Every](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)

这套说法最值得注意的地方，是它把 agent 的核心问题从“聪明”移动到了“管道”。一个真正有用的 agent 必须能行动；一旦能行动，就必须知道自己代表谁、能碰哪些资源、需要向用户申请什么权限、管理员如何审计。Scott 没有声称 MCP 的 security model 已经完成，而是强调 agent identity、entitlement system、permission request 这些层要用开放方式做出来。来源：[AI & I by Every](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)

这里还有一个产品判断：Scott 不认为未来会有一个 coding agent 统治所有开发者。开发者会继续选择很多工具，真正分化的维度不是谁有神秘基础设施，而是谁更懂某个具体问题，能把通用 infrastructure 调整成世界级解法。他的建议也朴素：工具变了，保持好奇，试一下；有效就用，无效就不用。来源：[AI & I by Every](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)

## 2. Codex 的 rate limit 问题，是 agent 产品进入运维态的信号

OpenAI 的 Thibault Sottiaux 更新了 Codex rate limits 的问题排查：团队发现了三类消耗异常，包括长 session 中使用图片并经历多次 compaction 时的低效、Computer History 的 p95+ 高使用量、以及一个用于生成 conversation title 的功能消耗比预期更高。OpenAI 计划集中修复，并对所有付费订阅做一次 usage reset；他还提到团队发现了一个与这些修复无关、能显著提升效率的新方法，会在下一周继续推进。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2091407991736332689)

这类信息不像发布新模型那样性感，但它更接近真实产品。Coding agent 的用户体感由很多底层细节组成：长上下文压缩、图片 token、历史记录、后台标题生成、p95 用量、reset 政策。越多人把 Codex 当日常工具，产品团队越不能只讲 capability，而要把 usage accounting 当成核心体验来运营。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2091407991736332689)

## 3. Evals 从 benchmark 变成企业自动化的通行证

Meta AI 的 Madhu Guru 继续写 “How to build great evals” 系列，第六部分讲的是 hill climbing on evals：选一个真正重要的维度，然后优化它。这个维度可以是基于最新生产数据改善高价值用户旅程，也可以是扩展相邻 use case，或者降低成本与延迟。实际工作会落到 harness、model selection、prompt engineering、context engineering、memory、post-training、以及必要时的传统 deterministic code。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2091278653435072523)

他给的例子很具体：如果 tool calling failures 是最常见的问题，团队可能会发现自己把 20 个工具塞进 context，而每个任务实际只需要 3 到 5 个；hill climbing 就变成分阶段给模型正确工具，并持续迭代到足够好。如果目标是降成本，先用最强模型把体验做到用户喜欢，再用更小、更便宜、更快的模型逼近同等质量。关键前提是 eval 必须告诉你是否真的在往正确方向移动。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2091278653435072523)

Box CEO Aaron Levie 从企业扩散角度补了同一刀：AI diffusion 被好 eval 限制的程度，比多数人意识到的更高。模型发布时的通用 eval 很有用，但它们只能说明整体 AI progress 的形状和相对能力；更大的空间是面向企业主要 workflow、甚至具体公司细节的 eval。他的结论很硬：不能评估进展，就不能自动化；企业不能只靠 vibes。来源：[Aaron Levie on X](https://x.com/levie/status/2091359223368315050)

这说明 eval 正从“模型榜单”变成“组织敢不敢自动化”的凭证。真正的企业 AI adoption 不会只问模型多强，而会问：这个 workflow 的失败分类是什么，生产数据是否覆盖高价值路径，成本下降有没有牺牲质量，模型换小以后哪些边界变脆。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2091278653435072523)、[Aaron Levie on X](https://x.com/levie/status/2091359223368315050)

## 4. 隐私与删除权正在进入 AI assistant 的主界面

Peter Yang 给了一个很实用的 privacy workflow：打开 Google 账号的第三方访问页面，在 Chrome 里让 Codex 或 Claude Code 知道有这个 tab，然后让 AI 帮你挑选并移除不再需要 Google 信息权限的 apps。他说自己刚断开了一半不该再拥有 Google info 的应用。来源：[Peter Yang on X](https://x.com/petergyang/status/2091331251211059468)

同一组内容里，他还提到 Instinct 现在可以在 Data Privacy 里删除外部数据，例如他的 36 条 Gmail records，并称赞团队快速响应。这里的重点不是某个产品的一次设置变更，而是 assistant 产品越来越靠近 email、workspace、messages 这些高敏感数据后，删除权和可见的 data privacy 控件会直接影响信任。来源：[Peter Yang on X](https://x.com/petergyang/status/2091187611507499321)

Peter Yang 还说自己在做一个名为 `/fuck-cancer` 的 AI skill，目标是帮助癌症患者和家属在治疗过程中保持知情、理解流程。这个方向也把 privacy 问题推到更极端的位置：医疗、家庭、身份、授权、记录保留，都会比普通 productivity assistant 更敏感。来源：[Peter Yang on X](https://x.com/petergyang/status/2091239339204415969)

## 5. 个体被 AI 放大，组织却未必同步放大

Zara Zhang 提出一个值得反复看的现象：有才华的人做自己的东西时，借助 AI 可能达到 10x 潜力；但同一个人进入大组织后，最多可能只提升 20%，有时甚至下降。她因此看到越来越多人才离开大公司，少数例外可能是 OpenAI、Anthropic 这类顶级 AI labs。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2091379220257603593)

她另一句更像心理状态总结：“Everyone who’s ahead in using AI thinks they’re behind。”这不是简单焦虑，而是 AI 工具链高速变化下的真实体感：越深入使用，越知道自己还有多少 workflow 没被改写。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2091338374447763481)

这和前面的 agentic web、eval、privacy 可以连在一起看：个体增幅来自低摩擦试错，大组织增幅受限于权限、合规、workflow、评估、采购和文化。不是 AI 对组织无效，而是组织要先把水管和验收表铺好，才能吃到个体已经感受到的杠杆。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2091379220257603593)、[Aaron Levie on X](https://x.com/levie/status/2091359223368315050)

## 6. Ship cadence 和创业噪声：速度仍然要配合判断力

Replit CEO Amjad Masad 写了一句很 Replit 的话：“A week has 7 days. That means 7 ships。”他还用 “Pretty soon” turned out to be 3 months 描述某个承诺到交付之间的时间差。内容本身没有展开产品细节，但作为 builder 信号，它说明 AI 工具公司的竞争节奏仍然在以高频发布和延迟兑现之间摆动。来源：[Amjad Masad on X](https://x.com/amasad/status/2091346778746757204)、[Amjad Masad on X](https://x.com/amasad/status/2091217410615644349)

FPV Ventures partner Nikunj Kothari 则从创业行为层面给了反面教材：用 ragebait 激怒投资人，再发 SAFE documents 让对方直接打钱，并不是融资方式。他强调要找对人拿建议，也不希望用 doxxing 处理这种事。放在今天的 AI 创业环境里，这条提醒很必要：工具让产出和曝光变快，但不等于判断力、信誉和融资基本功可以省略。来源：[Nikunj Kothari on X](https://x.com/nikunj/status/2091381756012511244)、[Nikunj Kothari on X](https://x.com/nikunj/status/2091403643815604629)

## 结语

今天最清楚的判断是：agent 的下一段增长不靠单点魔法，而靠系统化铺路。MCP、NL web、agent identity、entitlement、usage reset、context engineering、workflow eval、privacy deletion、组织权限，这些词看起来不如“新模型”耀眼，但它们决定 AI 能不能从个人玩具走进长期工作。

如果说 2025 年的问题是“agent 会不会到处都是”，那现在的问题更具体：它们接哪根管、拿什么权限、花多少 token、失败怎么验收、数据怎么删除、谁来为结果负责。真正有品味的 builder 会把这些脏活做到产品里，而不是把它们留给用户自己猜。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 podcast、blog 与 X 内容整理；未使用额外抓取来源，未纳入没有原始 URL 的内容。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
