---
title: 2026-06-17｜Agent 记忆成形，计算底座合流
date: 2026-06-17
---

# 2026-06-17｜Agent 记忆成形，计算底座合流

今天的 AI builders 信号不是某个单点发布，而是几条线同时收束：agent 正在从“会执行任务”走向“有记忆、有验收、有分工”；底层云计算正在把 sandbox、function、server、build 重新合并成同一种可调度资源；企业侧的焦点也从“哪个模型最强”转向“如何把自己的数据、流程和判断力接到模型上”。

换句话说，AI 产品的主战场正在离开聊天框本身，转向更难但更有护城河的部分：长期记忆、结果评估、多 agent 协作、计算边界、企业上下文，以及更自然的输入方式。

## 1) Claude Managed Agents：记忆、验收和多 agent 编排开始产品化

Claude Blog 发布了 Managed Agents 的一组新能力：`dreaming`、`outcomes`、multiagent orchestration 和 webhooks。这里最值得注意的是 `dreaming`：它是一个定时过程，会回看过去的 agent sessions 和 memory stores，抽取模式、整理记忆，让 agent 在会话之间自我改进。官方描述里，dreaming 能发现单个 agent 自己看不到的模式，包括重复错误、趋同出来的工作流，以及团队共享偏好。[来源](https://claude.com/blog/new-in-claude-managed-agents)

`outcomes` 则把“验收标准”做成产品接口：开发者写一份 rubric，说明什么叫成功；一个独立 grader 在自己的 context window 里评估输出，指出哪里不达标，再让 agent 返工。Claude Blog 给出的内部测试数据是：outcomes 相比标准 prompting loop 最多提升 10 个百分点；文件生成质量上，docx 任务成功率提升 8.4%，pptx 提升 10.1%。[来源](https://claude.com/blog/new-in-claude-managed-agents)

multiagent orchestration 的方向也很清楚：一个 lead agent 把复杂任务拆成子任务，交给带有独立 model、prompt 和 tools 的 specialist agents，并行处理 deploy history、error logs、metrics、support tickets 这类材料；每个 agent 在共享 filesystem 上工作，lead agent 汇总整体上下文。官方案例里，Harvey 用 dreaming 做复杂法律工作，测试中 completion rates 提升约 6 倍；Netflix 平台团队用多 agent 并行分析大量 build logs；Spiral by Every 用 Haiku 做 lead agent、Opus 做 drafting subagents，并用 outcomes 按 Every 的编辑原则和用户声音验收草稿。[来源](https://claude.com/blog/new-in-claude-managed-agents)

这组能力的信号很强：agent 的下一层竞争，不只是模型会不会更聪明，而是谁能把“长期学习、结果验收、分工协作、可追踪执行”变成稳定的工程接口。

## 2) AI 科学家不是一夜出现的，而是 reasoning、RL 和验证逐步叠出来的

The MAD Podcast 这一期请到 OpenAI 的 Dan Roberts，主题是 AI 为什么开始能做科学发现。Roberts 是 OpenAI foundations of reinforcement learning team 的负责人，背景横跨 theoretical physics、deep learning theory 和 OpenAI 的 frontier reasoning work。他对 AI for science 的判断很克制：这不会是一个突然从“不能做科学”跳到“完整科学家”的断点，而是一个平滑过程；如果非要找标志性时刻，可能是 OpenAI o1 以及 test-time compute / reasoning 范式的出现。[来源](https://www.youtube.com/watch?v=oWOz2htozfI)

他提到最近 AI 在数学问题上的进展时，重点不是“模型背出了证明”，而是模型能够走一条反直觉路径：对一个大家长期默认成立的猜想，ChatGPT 能“assume it was false”，然后沿着一条很长的计算路径坚持下去，并借助 algebraic number theory 这样的跨领域连接反驳 conjecture。Roberts 的原话很有代表性：“when you go against the grain and do something contrarian like that, you really have to have strong conviction”。[来源](https://www.youtube.com/watch?v=oWOz2htozfI)

他也区分了不同路线：Google DeepMind 更常见的做法是把问题 formalize 到 Lean 这样的形式语言里，再搜索可自动检查的 proofs；OpenAI 公开的多数结果则更偏 informal setting，用自然语言和数学表达式理解问题、给出类似人类数学家的证明，再由外部检查。前者验证更硬，后者更接近人类数学家的工作界面，但 verification problem 也更难。[来源](https://www.youtube.com/watch?v=oWOz2htozfI)

关于 RL，Roberts 用 Mario 类比解释了为什么它强：不是只看专家演示，而是在环境里行动、收到反馈、根据 reward 调整策略。但它的困难也在这里：当任务需要很多步骤之后才有稀疏反馈，比如研究级数学题或一盘棋，模型很难知道中间哪些选择真正有贡献。[来源](https://www.youtube.com/watch?v=oWOz2htozfI)

这和 Claude Managed Agents 的 `outcomes` 可以放在一起看：一个负责让模型更会思考和探索，一个负责把“好结果”变成可反复校验的外部约束。科学发现、工程交付、内容生产看似不同，底层都在追同一个东西：长链路行动里的反馈密度。

## 3) 计算底座在合流：sandbox、function、server、build 变成同一种东西

Vercel CEO Guillermo Rauch 今天连续讲的是 compute infrastructure。他说 Vercel 延长 function runtime 这件看似只是“改一个常量”，实际是多年计算平台投入的结果：Builds、Sandbox 和 Functions 都跑在 Vercel 自研的 microVM-based Fluid compute infrastructure 上；这个投入带来了 function multi-concurrency、Active CPU pricing、Secure Compute 等能力。[来源](https://x.com/rauchg/status/2066553521978097921)

Rauch 进一步把判断说得更直接：sandbox、function、server、build 都是同一种 underlying compute infrastructure 的不同表达，只是在 load balancing、concurrency、persistence、overcommit 等参数上做了不同调整。他的结论是：“2026 is the year serverless and servers finally converge. With no gotchas”。[来源](https://x.com/rauchg/status/2066556235961237826)

这对 agent 产品很关键。agent 不是一次性 API call，而是会写文件、跑 build、开 sandbox、调用工具、等待 webhook、做长时间任务的工作流。底层 compute 如果还被切成互不相通的 serverless、VM、CI、sandbox，就会不断暴露摩擦；如果它们能收束成同一种可治理资源，agent 才更容易稳定执行。

Rauch 还提到 v0 会默认提供更好的 skills，目标是让每个 prompt 都像带着一位 Vercel product engineer；同时用户也可以从外部获取 skills，或加入团队私有 skill set。[来源](https://x.com/rauchg/status/2066567117562868009) 这说明 agent 平台的竞争正在从“裸模型调用”变成“模型 + skills + compute substrate + deployment path”的组合拳。

## 4) 企业 AI 的重点：可定制 intelligence，而不是单一大模型崇拜

Box CEO Aaron Levie 转发并强调了一个判断：AI 最有意思的变化不是某个模型更聪明，而是 intelligence 正在变得越来越 customizable。未来赢的公司不一定是有最大模型的公司，而是能把 intelligence 变成自己独有资产的公司。Levie 自己的总结是：企业需要把独特数据、workflow，以及能把任务路由到最合适模型的层组合起来。[来源](https://x.com/levie/status/2066735879213994434)

这条线和 Replit CEO Amjad Masad 的产品观察能接上。Masad 说他喜欢 Replit 的 domain-specific agents：growth agent 可以发现 SEO 问题，security agent 可以发现潜在漏洞；他最喜欢的体验是“select all, fix with Agent”。[来源](https://x.com/amasad/status/2066683949129330817) 这类 agent 的价值不在“聊天”，而在把某个具体业务面里的判断、扫描、修复动作封装成可重复执行的工作流。

Levie 另一条关于监管的评论也指向同一个现实：模型能力有近乎无限的排列组合，如果每次模型发布都要用一套完全客观、通用、发布前适用的指标审批，会在全球范围拖慢进展。他认为更合理的重点是监管 AI 的 applied uses，因为风险真正出现在应用场景里。[来源](https://x.com/levie/status/2066554018953146689)

所以企业 AI 的护城河不是“接入最新模型”四个字，而是：谁拥有高质量 private context，谁能把 workflow 变成 agent 可执行的工具，谁能在模型之间做任务路由，谁能对具体应用场景建立验收和治理。

## 5) 输入方式和 agent 手感：语音、浏览器、开源维护都在变薄

Google Labs / Gemini App 的 Josh Woodward 宣布 Gemini App 的麦克风入口在 Android 和 iOS 上升级，尤其利好非英语用户：现在支持 70 多种语言，可以自由混合语言，不需要改语言设置，并且仍然不会打断用户；Web 版也会在一周左右上线。[来源](https://x.com/joshwoodward/status/2066673011554435450) [来源](https://x.com/joshwoodward/status/2066673191783665722)

这看似是输入细节，但对 AI 产品很重要。多语言、不中断、混合语言的语音输入，会让 prompt 从“写给机器看的文本”更接近真实工作流里的自然表达。尤其对非英语用户，入口摩擦下降本身就是能力释放。

Peter Yang 的一句话则代表另一种手感变化：Codex browser use 好到“几乎让他忘了 APIs 还需要存在”。[来源](https://x.com/petergyang/status/2066753125197967653) 这不是严谨评测，但它指向一个产品趋势：当 browser use 足够顺滑，agent 可以直接在现有 Web 界面里行动，API 不再是自动化的唯一入口。

Peter Steinberger 提到，在他们的开源项目里，只要有人创建 issue，`clawsweeper` 会 review；如果 issue 符合 `VISION.md`，它就会接手并创建、自动 review 一个 PR。[来源](https://x.com/steipete/status/2066457262571360396) 这是 agent 进入维护流的典型形态：不是随便接活，而是先对齐项目愿景文件，再决定是否执行。

这些小信号合起来说明，agent 的工作边界正在往外扩：从 IDE 走向浏览器，从英文键盘走向多语言语音，从单次任务走向开源项目的 issue 到 PR 流程。

## 6) 建造者市场的侧影：资本、人和注意力重新流动

Nikunj Kothari 观察到，过去 12 个月里他知道已有 32 位 VC 回到 operating，从 associates 到 GPs 都有；他认为节奏似乎在加快，而且这些人看起来更开心。理由也很现实：运营岗位能直接面对客户、团队协作和更多自主性；从补偿角度，不必等 13 年 carry，也可能更早获得流动性。[来源](https://x.com/nikunj/status/2066701833964531736)

这条不是纯 AI 产品信号，但它解释了为什么 builders 生态会继续升温：当 agent、低代码、自动化和新基础设施降低了产品试错成本，更多资本端人才会被吸回一线建造。Garry Tan 的一句 “Attention is all you need” 则像是对这轮 builder economy 的轻描淡写注脚：注意力、分发和执行速度仍然是稀缺资源。[来源](https://x.com/garrytan/status/2066728979978244355)

Matt Turck 也从一个非 AI 例子里提炼了 B2B sales 的小经验：不要忽略 LinkedIn DMs，因为有人就是通过几条 LinkedIn 消息被招进了 Cabo Verde 国家队。[来源](https://x.com/mattturck/status/2066587619132146164) 放在今天的上下文里，这提醒很朴素：再自动化的时代，分发、触达和机会发现依然会从很普通的渠道发生。

## 简短结语

今天最值得记住的不是“agent 更强了”，而是 agent 的外壳终于变厚了：它开始需要 memory hygiene、rubric、grader、multiagent trace、webhook、skills、compute substrate、预算和治理。

模型能力仍然是发动机，但真正决定产品差异的，会越来越多地落在周边系统：谁能让 agent 记住该记的，忘掉该忘的；谁能把“完成得好”定义清楚；谁能让长任务安全地跑完；谁能把企业的 private reality 翻译成模型可行动的上下文。

这也是今天 builders 信号里最清楚的一条：AI 的下一阶段不是单纯把模型接进产品，而是把产品重构成适合 agent 长时间工作的环境。

## 原始来源

- [Claude Blog: New in Claude Managed Agents: dreaming, outcomes, and multiagent orchestration](https://claude.com/blog/new-in-claude-managed-agents)
- [The MAD Podcast: OpenAI's Dan Roberts: Why AI Can Now Make Discoveries](https://www.youtube.com/watch?v=oWOz2htozfI)
- [Guillermo Rauch on X: longer Vercel function runtime and Fluid compute](https://x.com/rauchg/status/2066553521978097921)
- [Guillermo Rauch on X: sandbox, function, server and build converge](https://x.com/rauchg/status/2066556235961237826)
- [Guillermo Rauch on X: v0 skills by default and private skill sets](https://x.com/rauchg/status/2066567117562868009)
- [Aaron Levie on X: customizable intelligence and enterprise workflows](https://x.com/levie/status/2066735879213994434)
- [Aaron Levie on X: regulate applied AI uses, not every model release](https://x.com/levie/status/2066554018953146689)
- [Aaron Levie on X: open source going to win big](https://x.com/levie/status/2066526720480690221)
- [Amjad Masad on X: Replit domain-specific agents](https://x.com/amasad/status/2066683949129330817)
- [Josh Woodward on X: Gemini mic supports 70+ languages and mixed-language input](https://x.com/joshwoodward/status/2066673011554435450)
- [Josh Woodward on X: Gemini mic coming to Web](https://x.com/joshwoodward/status/2066673191783665722)
- [Josh Woodward on X: Gemini Trusted Tester program](https://x.com/joshwoodward/status/2066664862671921259)
- [Peter Yang on X: Codex browser use and APIs](https://x.com/petergyang/status/2066753125197967653)
- [Peter Yang on X: Cursor planned a Michelin-quality dinner](https://x.com/petergyang/status/2066756347438469602)
- [Peter Steinberger on X: clawsweeper reviews issues and opens PRs if aligned with VISION.md](https://x.com/steipete/status/2066457262571360396)
- [Nikunj Kothari on X: VCs moving back to operating](https://x.com/nikunj/status/2066701833964531736)
- [Garry Tan on X: Attention is all you need](https://x.com/garrytan/status/2066728979978244355)
- [Matt Turck on X: LinkedIn DMs and B2B sales lesson](https://x.com/mattturck/status/2066587619132146164)

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
