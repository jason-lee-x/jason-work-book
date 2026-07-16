---
title: 2026-07-16｜从 Harness 到协调层，Agent 开始长出组织感
date: 2026-07-16
---

今天的信号不算喧哗，但很成体系：agent 的讨论正在离开「模型能不能做」这一层，进入更像组织工程的层面。平台要决定哪些 primitives 外放，企业要给知识工作补上 eval，产品要在 heavy app 和 quick query 之间重新找手感，而 builder 自己也要面对一个更私人的问题：当机器开始逼近创作与判断，人的「想要」还剩下什么。

## 1. Anthropic 把平台抽象拆成三层：知识、执行、协调

Training Data 放出了一期 Anthropic Platform 访谈，Katelyn Lesse 与 Angela Jiang 讲得最清楚的一点是：Anthropic 并不想只做一个 messages API。她们把平台能力大致分成三层：底层是 knowledge，包括 messages API、tools、skills、memory 这类让 Claude 知道如何工作的上下文与标准；中间是 execution，也就是让 Claude 真正去做事所需的 harness、sandbox、session storage、prompt caching、context management 和 managed infrastructure；再往上是 coordination，用「strategies」把不同 token 或不同 agent 角色组织起来，让某些部分负责 advising，某些部分负责 executing。来源：[Training Data｜Anthropic's Katelyn Lesse & Angela Jiang: Building an Ecosystem, not a Walled Garden](https://www.youtube.com/watch?v=vPnVTHYplrQ)

这套分层有两个值得注意的含义。第一，agent 平台的难点已经不是「给模型一个 API」这么简单，而是怎样把知识、执行环境、成本、上下文和恢复能力打包成可复用的系统。访谈里提到，AI-native startups 往往会选择更底层的 primitives，而企业或非 AI-native 团队更倾向 higher-order packaged offerings，因为他们的核心价值不是优化 harness，而是把 workflow 串起来交付给用户。来源：[Training Data](https://www.youtube.com/watch?v=vPnVTHYplrQ)

第二，Anthropic 在把 standards 当作生态策略的一部分。Angela Jiang 提到，skills 和 MCP 这类标准不是单纯的产品功能，而是 Claude 为了有用所需要的结构，因此可以开放给生态一起使用。她还把 AI 类比成 electricity：真正有用的基础设施必须能被接入到很多地方，也必须有标准和伙伴生态。来源：[Training Data](https://www.youtube.com/watch?v=vPnVTHYplrQ)

## 2. Agent 要进企业，先得把「知识工作如何测试」补上

Box CEO Aaron Levie 给了今天最实用的一条企业判断：代码之所以特别适合 agent，是因为代码可以被快速测试。你可以手动跑应用，也可以跑测试；但大多数企业工作不是这样，一笔交易、一次合同谈判、一次销售 pitch，往往要等进入真实世界才知道结果好坏。因此下一批机会，可能是把这种「可测试性」扩展到更多知识工作里。来源：[Aaron Levie on X](https://x.com/levie/status/2077201458546745553)

这句话比「企业需要 eval」更具体。Levie 的说法是，今天多数企业 workflow 没有配套 eval，无法判断一次模型、prompt 或系统变更到底让工作变好了还是变坏了。能把知识工作 eval 做得最好的企业，也最可能从 AI adoption 里获益。Peter Steinberger 的小提醒也落在同一条线上：总是运行 autoreview，哪怕会烧 token，也能让人安心。来源：[Aaron Levie on X](https://x.com/levie/status/2077201458546745553)、[Peter Steinberger on X](https://x.com/steipete/status/2077265627379843242)、[Peter Steinberger on X](https://x.com/steipete/status/2077266132625698820)

Levie 还转发并评论了一个 AI standards body 的提案，认为它不同于监管机构，可能让标准改进和行业协作更快；但他也指出难点在于，即使是行业内部，对 AI safety risks 的理解也并不一致。和 Anthropic 访谈里的 safety standard setting 放在一起看，企业 agent 的下一阶段很可能不是「完全自由」或「完全监管」二选一，而是在 interoperability、eval、fraud prevention、cyber safety 之间搭出共同语言。来源：[Aaron Levie on X](https://x.com/levie/status/2077043523703243070)、[Training Data](https://www.youtube.com/watch?v=vPnVTHYplrQ)

## 3. Codex / ChatGPT Work 的增长信号，说明需求已经开始压平台

OpenAI 的几个信号很直接。Sam Altman 称「5.6 sol growth is insane」，说 inference team 为支撑需求做了 heroic work，并会继续扩容，但近期可能出现一些 hiccups。Thibault Sottiaux 则在征集 ChatGPT Work 反馈，并提到使用量可能很快到 9M；他还提出给前 10k 个分享 GPT-5.6 Sol 使用感受或迁移原因的人 $100 Codex credits。来源：[Sam Altman on X](https://x.com/sama/status/2077106587307798989)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2077212009071075330)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2077271889626706300)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2077248807533003257)

这里不需要过度解读数字本身，重要的是产品已经进入「用量、反馈、额度、inference capacity」互相咬合的阶段。Sam 另外一句「also, a reason to favor open-source harnesses」也值得放进这个背景里：当 agent workload 增长、平台可能 hiccup、用户又把越来越多工作交给系统时，harness 的可检查、可迁移、可复现，会变成真实的工程问题，而不是开源姿态。来源：[Sam Altman on X](https://x.com/sama/status/2077053226080436235)

但产品层面也有反向摩擦。Aditya Agarwal 说自己过去每天用 ChatGPT Legacy 做 15-20 次快速查询，而新的 ChatGPT app 功能更完整，却对这个 use case 显得 heavyweight。这个抱怨很小，却打中了 AI 产品常见的分裂：power workflow 需要更厚的工作台，日常查询需要更轻的入口。把两者塞进同一个界面，未必总是更好。来源：[Aditya Agarwal on X](https://x.com/adityaag/status/2077130899733553560)

## 4. 平台正在把 agent 的周边服务做成默认动作

Vercel CEO Guillermo Rauch 提到，Vercel 正在开放 AI Gateway 上的 AI token flows dataset。他没有在这条内容里展开 dataset 的具体结论，但「token flows」本身就是一个值得关注的对象：当 AI Gateway 成为统一入口，平台自然会沉淀出不同模型、不同应用、不同调用模式之间的流量形态。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2077176141790752798)、[Guillermo Rauch on X](https://x.com/rauchg/status/2077176287131840734)

Guillermo 还转发 agentmail 的集成：让 agent 执行 `vercel install agentmail`，无需 signup，自动 setup，并走 unified billing。这个细节看起来像开发者体验优化，实际更像 agentic platform 的默认趋势：邮箱、身份、账单、部署、数据流、observability 都会被包装成 agent 能直接安装和使用的服务。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2077154901013221444)

Thariq 给了一个更轻但很有 builder 味的样本：他用 Claude Code 辅助玩 Pokemon Champions，让它通过 Smogon 的 npm library 写代码、拉取 live usage stats，并生成 matchup、breakpoint 和 team theorycraft 报告。他还说如果大家感兴趣会 open source，并贴出了 Mega Sceptile team breakdown。这个例子不宏大，但说明 agent 的使用正在从「帮我写业务代码」扩散到任何有规则、有数据、有反馈循环的小世界。来源：[Thariq on X](https://x.com/trq212/status/2077051280267399550)、[Thariq on X](https://x.com/trq212/status/2077051282146431092)

## 5. 教育场景给出另一种边界：有用之前，先要可信

Claude 官方发布了 Claude for Teachers 的几条说明：它可以从州标准和高质量课程资源出发，通过 Learning Commons 连接相关内容，生成 lesson plan 和面向学生的材料，教师可以再修改后带进课堂。同时，Claude 强调这是面向 K-12 privacy 构建的产品，不会用对话训练模型，学生信息由符合 FERPA 的 data processing agreement 保护。来源：[Claude on X](https://x.com/claudeai/status/2077047279689535705)、[Claude on X](https://x.com/claudeai/status/2077047280767488218)、[Claude on X](https://x.com/claudeai/status/2077047282109714488)

这和企业场景一样，都在提醒同一件事：AI 产品进入高信任场景时，「模型能生成」只是起点。课程标准、内容来源、隐私承诺、数据处理协议，这些看似不 sexy 的东西，才是产品能否被组织采用的门槛。

## 6. 当梦变成工作，人的火还要自己守住

Cursor designer Ryo Lu 写了一段很个人的文字：把热爱的东西变成工作确实是梦，但它也会把原本只属于自己的兴趣接到 deadline、team、customer、strategy、money、reputation 和 momentum 上；当 AI 开始逼近 writing、coding、designing、reasoning 和 taste-like decisions，焦虑不只来自岗位竞争，也来自自我神话被触碰。来源：[Ryo Lu on X](https://x.com/ryolu_/status/2077162119506833627)

他最后的判断很适合给今天这些平台与 eval 信号收尾：AI 可以让 output 更快，也可以提高 craft 的地板，但它不能替你 want，不能替你决定什么值得爱。Nikunj Kothari 另一条玩笑式观察也很真实：agent 工作时，工程师在等待间隙刷 X，tech 圈的 X 使用时间可能还会上升。换句话说，AI 没有消灭人的注意力问题，只是改变了等待、审查和决策的节奏。来源：[Ryo Lu on X](https://x.com/ryolu_/status/2077162119506833627)、[Nikunj Kothari on X](https://x.com/nikunj/status/2077144910508257317)

## 结语

今天最值得带走的判断是：agent 的下一段进化，不是单个模型能力再涨一点，而是平台、eval、标准、周边服务和人的工作节奏一起重排。知识层让模型知道，执行层让模型能做，协调层让多个角色能配合；但真正落到企业、教育和个人创作里，还需要测试、隐私、成本、入口轻重和人的 taste。

官方博客源今日没有新增可写入内容；本文仅基于 Follow Builders 当日 JSON 中带 URL 的 podcasts 与 X 内容整理。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
