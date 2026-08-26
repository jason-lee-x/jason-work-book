---
title: "2026-08-26｜agent 要进系统，先过边界与记忆这一关"
date: 2026-08-26
---

今天的 builders 信号不算喧闹，但很集中：AI 正在从“能不能做事”进入“能不能在真实系统里可靠地做事”。这背后有三条线同时出现：平台开始用配额和合规控制使用方式，agent 开始碰到 system of record 的治理边界，而个人工作流里的 AI 则越来越像一层可调用的操作系统接口。

如果说过去一年大家在追模型能力，今天更值得看的反而是边界：compute budget、ZDR、access control、eval discriminatory power、以及“软件是否能被 prompt 改动”。这些不是配角，是 AI 落地之后真正决定体验上限的东西。

## 1. 平台把 AI 从无限感拉回运营现实

OpenAI 的 Thibault Sottiaux 说，ChatGPT Work 和 Codex 面向 Plus accounts 将恢复 5 小时限制。他给出的理由很直白：5 小时限制能平滑 compute load，同时避免相对 casual 或新用户意外吃完整周额度后困惑；未来几个月，Pro $100 和 Pro $200 订阅暂不启用这个限制。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2092058556707344708)

这条并不是单纯的“产品限制”。它说明 coding agent 和 ChatGPT Work 这种高消耗场景，已经进入经典云服务问题：能力越强，越需要用 quota、tier 和 workload shaping 管住成本曲线。AI 产品的 generous usage 不是口号，而是一个实时调度、计费分层和用户预期管理问题。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2092058556707344708)

同一天，Thibault 还预热 OpenAI DevDay 2026，称这会是 OpenAI 历史上最好的 DevDay，并且“not close”。这不是可验证事实，但至少说明 OpenAI 仍在把开发者生态作为未来几个月的重要叙事入口。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2092117461646856505)

## 2. 企业 AI 的关键不是 agent 多聪明，而是系统边界够不够硬

Box CEO Aaron Levie 把话题拉回 enterprise software：在 agent 会在平台上做比人类多 100 倍工作的世界里，systems of record 反而更重要。agent 会查询数据、处理任务、执行 workflow、和人类及其他 agent 协作，所以 governance、reliability、security、access controls、business logic 的重要性只会上升。他还把 OpenAI Hugging Face incident 称作未来的一小瞥：当 agent 为了完成目标四处执行动作时，系统边界会被更频繁地撞到。来源：[Aaron Levie on X](https://x.com/levie/status/2092087679240569126)

Aaron Levie 的另一个判断是，ZDR（zero data retention）对 AI 增长有实质推动，因为它显著简化了企业在 subprocessors 和敏感数据处理上的合规流程。很多 applied AI 工具会优先给客户提供 ZDR 模型，避免每开一个模型都触发额外审核；企业内部也常要求只能使用 ZDR models，因为上下文窗口里很难显式分离 PII、敏感数据和机密信息。来源：[Aaron Levie on X](https://x.com/levie/status/2091909170308296950)

这两条放在一起，指向一个朴素但经常被低估的事实：agent 的真正入口不是炫技 demo，而是能被企业放心调用的 record layer。没有 API、权限、审计、数据保留策略和商业模式的系统，会被 agent 绕开；但能把这些边界产品化的系统，可能反而在 AI 时代拥有更强的控制点。来源：[Aaron Levie on X](https://x.com/levie/status/2092087679240569126)

## 3. eval 的问题不是难，而是能否区分真实差异

Meta AI 的 Madhu Guru 继续写“如何构建好的 evals”，这次讲的是 discriminatory property。一个用于 hill-climbing 的 eval，必须能区分“能力上确实不同”的系统；如果五个系统都在 92 到 95 分之间，但你已经知道其中两个明显更强，那这个 eval 就没告诉你任何关键差异。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2092058332735693264)

他也提醒，解决办法不是把 eval 任意做难。太简单会全部满分，像拿五年级数学题考 PhD；太难则所有系统都失败，测不到它们本来要服务的真实任务。好的 eval sweet spot 是：realistic、difficult、并且 sensitive to differences in capability。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2092058332735693264)

这条对 builder 很实用。现在很多团队的问题不是没有 eval，而是 eval 很快饱和，然后继续给大家一种虚假的进步感。真正能推动产品质量的 eval，应该像工程里的性能 profile：暴露瓶颈，而不是生产一个漂亮但不区分差异的分数。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2092058332735693264)

## 4. AI 正在变成个人工作流里的操作接口

Peter Yang 提到一个很日常但准确的摩擦：每次要登录一个新网站或 app，甚至使用一个被困在网站/app 里的 agent，他通常就不想继续用了，娱乐和游戏除外。另一条里，他想让 AI 打客服电话、穿过糟糕的自动语音系统、找真人预约或取消订阅，并询问最容易的尝试方式。来源：[Peter Yang on X](https://x.com/petergyang/status/2092080901094248474)、[Peter Yang on X](https://x.com/petergyang/status/2092031413319266382)

Nan Yu 的体验更贴近本地电脑：用 Codex 设置新电脑，让它下载并安装 Handy、Slack、Chrome、CleanShot、Rectangle 这类应用，感觉“kind of nice”，也让人希望 Siri 足够好。来源：[Nan Yu on X](https://x.com/thenanyu/status/2092048044502192374)

这几条组合起来像一个产品定义：好的个人 agent 不该被困在网页里，也不该只会聊天。它要能跨应用、跨系统、跨电话树行动，同时把登录、权限和安全处理得足够自然。今天的痛点不是“模型会不会理解我要什么”，而是它有没有真正的 hand、身份和可控的执行面。来源：[Peter Yang on X](https://x.com/petergyang/status/2092080901094248474)、[Nan Yu on X](https://x.com/thenanyu/status/2092048044502192374)

## 5. 软件的新审美：能被 prompt 改，也能保持小而快

Peter Steinberger 说，我们需要摆脱那些“不能用 prompt 改动”的软件。这句话有点像 AI-native software 的一句简短宣言：如果软件结构无法被自然语言指导、检查、修改，它在未来的可塑性就会变差。来源：[Peter Steinberger on X](https://x.com/steipete/status/2091923535513928015)

Guillermo Rauch 从另一个角度讲软件手感。他提到一个产品“faster, cheaper, more capable, and smaller”，并说软件演化通常会变慢、膨胀、bug 更多、体积更大，而这个产品从架构上试图防止这种趋势。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2092081554814320677)

Guillermo Rauch 还分享了一个很程序员的细节：terminal 进入 bad state 时常用 `reset`，但它慢得奇怪；追溯后发现 1979 年 3BSD 的 `tset` 里有 `sleep(1)`，原本是给机械打印终端“settle down”的。他让 `fx` 写了一个 Zig 替代品，把 1 秒降到 1ms，并顺手研究了 ncurses、tset、terminfo 以及终端可能出问题的方式。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2091957823945216474)

这组信号很有趣：AI-native 不等于更臃肿，也不等于所有东西都交给模型糊一层。恰恰相反，越是 agent 会频繁调用的软件，越需要小、快、明确、可理解、可修改。prompt 是新的操作入口，但底层仍然吃系统设计的老本。来源：[Peter Steinberger on X](https://x.com/steipete/status/2091923535513928015)、[Guillermo Rauch on X](https://x.com/rauchg/status/2091957823945216474)

## 6. builder 方法论仍然是：观点，实验，现实，修正

Garry Tan 今天有一句很适合贴在任何 AI builder 工作台上的流程：形成观点，把它变成 artifact 或 experiment，让它接触现实，不自欺地读结果，然后修正并再跑一遍。来源：[Garry Tan on X](https://x.com/garrytan/status/2092059517446156640)

他还提到 Conductor Cloud 让自己更高产，并且不再需要一直让 MacBook Pro 开着。这个细节和最近 cloud coding / cloud agent 的趋势一致：开发环境正在从个人机器迁移到持续运行的云端工作区。来源：[Garry Tan on X](https://x.com/garrytan/status/2092062231488061584)

Zara Zhang 则抛出一个活动形式判断：传统 hackathon 至少按常见举办方式看已经过时。她没有展开更多论证，但这个判断和今天的 agent/workflow 主题并不冲突：当 build 的速度和工具条件变了，旧的“限时堆 demo”格式可能也需要重新设计。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2092079390301556883)

## 结语

今天最值得留下的不是某个单点新闻，而是一个转向：AI 产品开始全面进入“系统工程阶段”。平台要限流和分层，企业要 ZDR 和权限边界，团队要能区分模型差异的 eval，个人用户要跨应用的执行接口，软件本身还要足够小、快、可 prompt 修改。

这比“更聪明的模型”更无聊，也更决定胜负。因为 agent 一旦真的开始做事，它马上会撞上成本、合规、权限、可靠性、审计、工具接口和用户耐心。今天的信号很清楚：下一阶段的 AI builder，拼的不是会不会喊 autonomous，而是谁能把 autonomous 放进一个不失控的系统。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 X 内容整理；当日 JSON 未提供 podcast 与 blog 条目。未使用额外抓取来源，未纳入无明确 URL 的内容。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
