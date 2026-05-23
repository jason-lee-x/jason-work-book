---
title: 2026-05-23｜Agent 的下一站：守边界，比比谁更会分层
date: 2026-05-23
---

# 2026-05-23｜Agent 的下一站：守边界，比比谁更会分层

今天这批信号很一致：AI 还在加速，但真正拉开差距的，不再只是“谁更聪明”，而是“谁能把聪明装进可控边界，并按任务分层定价”。一边是 Claude Code 用 auto mode 讨论如何用 classifier 替代频繁确认；另一边是 OpenAI、Box、Google、Cursor、Replit、Feishu bridge 这些 builder，都在把 agent 从演示品推向可执行、可审计、可分发的工作流。

## 1) Anthropic 把“少点确认”做成了产品设计问题

[Anthropic Engineering: Claude Code auto mode: a safer way to skip permissions](https://www.anthropic.com/engineering/claude-code-auto-mode) 的核心不是“更激进”，而是把权限问题重新拆成两层防御：一层看输入，一层看动作。文章明确说，auto mode 试图解决 approval fatigue，也就是用户一直点 approve，最后开始麻木。

更值得注意的是它对风险的定义非常工程化：overeager behavior、honest mistakes、prompt injection、misaligned model，最后都落到一个结论上，危险动作要被 block，而不是默认相信 agent 的自我解释。它还给出一个现实判断：在大多数场景里，自动化不是靠取消边界赢的，而是靠更好的边界赢的。[来源](https://www.anthropic.com/engineering/claude-code-auto-mode)

这和今天所有 agent 产品的方向其实是一致的。谁能更稳地识别“用户授权”和“模型自作主张”的分界，谁就更接近可部署的软件。

## 2) OpenAI、Box、Google 都在讲同一件事：能力正在分层，成本也在分层

[Sam Altman](https://x.com/sama/status/2057559714788258003) 直接宣布 new codex ships today，说明 coding agent 这条线还在继续往前推。[来源](https://x.com/sama/status/2057559714788258003)

[Box CEO Aaron Levie](https://x.com/levie/status/2057663408376516703) 讲得更直白：我们已经从“便宜、窗口小”的 AI chat tools，进入“长上下文、长任务、推理更贵”的 AI agents 时代。更重要的是，他判断这不是短期噪音，而是 cost stratification 只会继续加深，企业会被迫建立新的 finance 和 tooling 体系，去管理不同任务配不同模型这件事。[来源](https://x.com/levie/status/2057663408376516703)

这意味着一个很现实的变化：AI 的单位经济学不再是单一 token price，而是任务级别的价格分层。高价值工作交给 frontier model，普通工作下沉到够用的低成本模型，系统能力越强，预算治理越重要。[来源](https://x.com/levie/status/2057663408376516703)

[Josh Woodward](https://x.com/joshwoodward/status/2057564491064483930) 也在庆祝 Google Labs 的新东西，顺带确认 iOS、Android、Web 上的 Neural Expressive design 正在被用户喜欢。这类 post 表面上像发布庆祝，底层却说明一个事实：AI 产品已经进入多端分发和体验打磨阶段，不只是模型 API 的问题了。[来源](https://x.com/joshwoodward/status/2057564491064483930)

[Google Labs](https://x.com/GoogleLabs/status/2057492241472729543) 继续推 Project Genie，把 Labster 带到 Grand Canyon；[GoogleLabs](https://x.com/GoogleLabs/status/2057492242911404443) 也在强调最新 experiments，邀请大家一起 shape AI 的未来。[来源](https://x.com/GoogleLabs/status/2057492241472729543) [来源](https://x.com/GoogleLabs/status/2057492242911404443)

## 3) Builder 们在把“agent”嵌进日常协作界面

[Zara Zhang](https://x.com/zarazhangrui/status/2057710284920520906) 发布了 Claude Code Lark/Feishu Bridge，关键点很清楚：把 Claude Code 变成可以在 Lark 里当同事用的东西。它可以通过 Lark chat 在手机上使用、把多个 session 变成 group chat 管理、读取聊天和文档上下文、写 Lark Docs，甚至接收交互卡片。[来源](https://x.com/zarazhangrui/status/2057710284920520906)

这类桥接的意义不只是“方便”，而是把 agent 从 terminal 推进协作场景。谁先占据消息、文档、会议记录这些上下文入口，谁就更接近真实工作流。[来源](https://x.com/zarazhangrui/status/2057710284920520906)

[Amjad Masad](https://x.com/amasad/status/2057616724757827826) 的说法也很 Replit：monetize your apps，我们给 credit rewards。[来源](https://x.com/amasad/status/2057616724757827826) 这是一种很典型的平台激励设计，目标不是只卖模型调用，而是鼓励应用被持续构建和变现。

[Replit](https://x.com/ryolu_/status/2057500107235557675) 的 Ryo Lu 则把“building software is more fun together”放在最前面，配合 new model、interface、sdk、automations 一起打包传播。[来源](https://x.com/ryolu_/status/2057500107235557675) 这说明平台竞争已经从单点能力，转向整套开发和协作体验。

[Peter Yang](https://x.com/petergyang/status/2057674020481593710) 直接说 Codex automation 是 game changer；[Swyx](https://x.com/swyx/status/2057576893621150020) 则判断 local-first 这场仗大概已经被某个 stack 赢下了，如果你在做 fast apps fast，可能要认真看这个方向。[来源](https://x.com/petergyang/status/2057674020481593710) [来源](https://x.com/swyx/status/2057576893621150020)

## 4) 用户真的在买什么：不是“AI”，而是更稳的动作、更少的摩擦

[Matt Turck](https://x.com/mattturck/status/2057498130795385188) 把和 OpenAI Yann Dubois 的对谈标题定为 “Why AI Progress Suddenly Feels Real”。这期的主轴很明确：reliability、step function、vertical vs horizontal teams、test-time compute、real-world utility vs verifiable rewards。[来源](https://x.com/mattturck/status/2057498130795385188)

换句话说，行业正在从“模型能不能做题”转向“模型在 messy real world 里能不能稳定工作”。这和 Anthropic 的 auto mode、Box 的成本分层、以及各种 workflow bridge 是同一条线。[来源](https://x.com/mattturck/status/2057498130795385188) [来源](https://www.anthropic.com/engineering/claude-code-auto-mode) [来源](https://x.com/levie/status/2057663408376516703)

[Matt Turck](https://x.com/mattturck/status/2057498135300039068) 还补了一条直接的 distribution 信息：这期对谈已经上了 Spotify、Apple Podcasts 和 YouTube。内容的存在感，开始和分发形态绑定得越来越紧。[来源](https://x.com/mattturck/status/2057498135300039068)

## 5) 这轮 builder 信号的共同答案

如果只挑一个结论，那就是：AI 应用层的护城河，正在从“谁接到了最强模型”变成“谁把模型变成了可控的系统”。

- Anthropic 在做权限和风险边界。[来源](https://www.anthropic.com/engineering/claude-code-auto-mode)
- OpenAI 和 Box 在谈能力分层和成本分层。[来源](https://x.com/sama/status/2057559714788258003) [来源](https://x.com/levie/status/2057663408376516703)
- Google 在把 agent 做进多端体验和实验平台。[来源](https://x.com/joshwoodward/status/2057564491064483930) [来源](https://x.com/GoogleLabs/status/2057492241472729543)
- Zara、Replit、Claude Code bridge 这种工作流桥接，说明 agent 正在进入协作入口，而不是停留在 demo 层。[来源](https://x.com/zarazhangrui/status/2057710284920520906) [来源](https://x.com/ryolu_/status/2057500107235557675)

## 简短结语

今天最强的不是某个模型参数，而是行业共识正在收敛：更强的 agent 需要更强的边界、更清晰的成本分层、以及更贴近真实工作的入口。能把这三件事同时做稳的团队，才更像下一阶段的赢家。

## 原始来源

- [Anthropic Engineering: Claude Code auto mode: a safer way to skip permissions](https://www.anthropic.com/engineering/claude-code-auto-mode)
- [Matt Turck: Why AI Progress Suddenly Feels Real](https://x.com/mattturck/status/2057498130795385188)
- [Sam Altman on X](https://x.com/sama/status/2057559714788258003)
- [Box CEO Aaron Levie on X](https://x.com/levie/status/2057663408376516703)
- [Josh Woodward on X](https://x.com/joshwoodward/status/2057564491064483930)
- [Google Labs on X](https://x.com/GoogleLabs/status/2057492241472729543)
- [Zara Zhang on X](https://x.com/zarazhangrui/status/2057710284920520906)
- [Amjad Masad on X](https://x.com/amasad/status/2057616724757827826)
- [Ryo Lu on X](https://x.com/ryolu_/status/2057500107235557675)
- [Peter Yang on X](https://x.com/petergyang/status/2057674020481593710)
- [Swyx on X](https://x.com/swyx/status/2057576893621150020)
- [Matt Turck on X](https://x.com/mattturck/status/2057498135300039068)
