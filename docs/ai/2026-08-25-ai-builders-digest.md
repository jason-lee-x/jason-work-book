---
title: "2026-08-25｜AI 基础设施开始显露日常性"
date: 2026-08-25
---

# 2026-08-25｜AI 基础设施开始显露日常性

今天的 builders 信号不热闹，但方向很集中：AI 正在从“新能力展示”转向“基础设施运营”。大家谈的不是更大的发布会，而是更便宜的 inference、更可诊断的 eval、更像工作流底座的 agent，以及更贴近日常软件界面的智能能力。

## 一、便宜的智能会改变产品的成本结构

Vercel CEO Guillermo Rauch 的判断很直接：智能正在变便宜，OpenAI Sol 的价格下降与 Vercel AI Gateway 折扣让 Sol 成为他们增长最快的 frontier model。他把这解释为两个信号：一是 inference 成本下降会快速释放需求，二是如果产品没有接入 gateway，就很难捕捉模型价格波动带来的成本优势和毛利改善。[来源](https://x.com/rauchg/status/2091671326897713424)

OpenAI 的 Thibault Sottiaux 也把焦点放在效率与可靠性上。他说 2026 年公司会开始认真关心 model efficiency 和 reliability，因为模型正在成为关键基础设施。[来源](https://x.com/thsottiaux/status/2091581575108653374) 同一天他还提到 usage 相关修复已经推送到账户，用户应该能感到改善，并表示后续会继续沟通。[来源](https://x.com/thsottiaux/status/2091688655828246890)

这两条放在一起看，AI 产品的竞争点正在从“能不能调用模型”变成“能不能稳定、便宜、可解释地消耗模型”。gateway、usage 修复、可靠性沟通，都是基础设施进入运营阶段后的语言。

## 二、eval 不再是最终答案打分，而是系统诊断工具

Meta AI 的 Madhu Guru 用 “Goldilocks principle” 描述 eval 粒度：不要太粗，也不要太细，要刚好能定位问题。他举了一个 financial analysis agent 的例子：如果只检查最终股票推荐是否正确，团队会错过中间环节的问题；更好的做法是分别评估客户理解、证据收集、数据分析、最终推荐等阶段，这样当最终结果错误时，团队能知道到底该挖哪一层。[来源](https://x.com/realmadhuguru/status/2091684812012875981)

Peter Yang 转述 Shreya 的观点，把 AI eval 分成 top-down 与 bottom-up 两类：top-down 是从任务描述出发设计评估，Claude 很擅长辅助；bottom-up 则来自大量样本输出后的直觉反馈，需要人把“哪里不对劲”外化成 eval，Claude 并不擅长替你发现这一部分。[来源](https://x.com/petergyang/status/2091586298779955512)

这说明 eval 的价值不只是验收，而是把人的判断、任务分解和故障定位写进系统。真正可用的 agent，不会只靠一个最终分数生存。

## 三、agent 会重塑系统边界，也会重塑人的工作方式

YC CEO Garry Tan 预测：systems of record 必须变成 AI harnesses，否则会被 agent 替代。[来源](https://x.com/garrytan/status/2091742825042030681) 这句话的重点不是“agent 会替代软件”这种泛泛判断，而是系统边界会变化：过去负责记录事实的软件，如果不能成为 agent 可调用、可编排、可执行的工作底座，就会失去位置。

Peter Yang 的另一条帖子给了一个更日常的切面：他的人类助理 Char 使用 Claude Code 和 Codex 参与 podcast 后期、show notes 草拟和 clips 制作，并把 Peter 的 AI skills 复制后改造成自己的工作流。[来源](https://x.com/petergyang/status/2091631590799737306) 这是一条 sponsored 内容，但里面仍有一个真实信号：AI-fluent operator 的价值不只是“会用工具”，而是能把 agent 嵌入重复工作、逐步形成自己的 workflow asset。

如果 Garry Tan 谈的是软件系统的适配压力，Peter Yang 这条谈的就是人的适配压力：未来的业务执行者需要会管理、改造和复用 agent workflow。

## 四、界面与协议：从 CLI 到工作现场

Guillermo Rauch 还提到他们扩展 `fx` 的哲学是 open protocols：MCP、Skills、Plugins，以及 Unix 式的小程序组合。他强调小程序做好一件事并能相互调用，同时 `libfx` 让能力可嵌入到更复杂程序里，开发者可以构建自己的 CLI、background agent 或 software factory。[来源](https://x.com/rauchg/status/2091583525661384813)

Peter Steinberger 则从体验角度补了一句：CLI 很好，但在工作的地方拥有 UI visualizations 和团队协作会更好。[来源](https://x.com/steipete/status/2091650136506327253) 他还提到自己给一个项目加入 rotation USB protocol，让 claw 能通过 360 webcam “look around”。[来源](https://x.com/steipete/status/2091639468935831910)

这些信号共同指向一个问题：agent 的能力不仅要在命令行里成立，还要进入团队协作界面、可视化界面、设备接口和后台任务系统。协议决定能否组合，界面决定能否日常使用。

## 五、Claude 进入 Apple Foundation Models 工作流

Claude Blog 发布了 Apple Foundation Models framework 支持：Anthropic 提供新的 Swift package，让 Apple 开发者可以通过 Apple 的 Foundation Models framework 调用 Claude，用于更复杂的多步推理、代码生成等任务。[来源](https://claude.com/blog/claude-for-foundation-models)

根据文章内容，Apple 的 Foundation Models framework 可以在 Swift 中访问模型，并通过 `@Generable` annotation 返回 typed Swift values；开发者可以先用 Apple on-device models 做快速本地任务，例如 summarization 或 extraction，再把需要更强能力的请求交给 Claude。Anthropic 还提到 Claude 可搜索 web 获取当前信息，也可以执行代码做数据分析，并把流式响应返回到同一个 SwiftUI view。[来源](https://claude.com/blog/claude-for-foundation-models)

这类集成的关键不在“又多了一个 SDK”，而在模型分工：本地模型处理低延迟、隐私敏感、结构化的前置步骤，远端 Claude 处理复杂推理和工具调用。智能 app 的架构会越来越像 routing system，而不是单模型入口。

## 结语

今天最值得记住的不是某个单点更新，而是 AI 产品语言的变化：成本、可靠性、eval 粒度、系统边界、协议组合、工作现场。这些词听起来不如模型发布刺激，但它们更接近真正的软件工业化。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
