---
title: 2026-07-13｜护城河退潮后，Agent 要开始懂生意
date: 2026-07-13
---

今天的信号不像一次新品发布，更像一组行业温度计：一边是 OpenAI / Codex 圈层围绕 GPT 5.6 Sol 的速度、前端、后端能力继续抬高预期；另一边，Booking.com CEO Glenn Fogel 在 No Priors 里把话说得很冷静：AI 不是凭空抹掉行业复杂度的魔法，真正长期有效的还是每天重新为客户创造价值。来源：[No Priors｜Travel Through the Lens of AI with Booking.com CEO Glenn Fogel](https://www.youtube.com/watch?v=8nj_0wZkbtA)、[Thibault Sottiaux](https://x.com/thsottiaux/status/2076145711922696371)

我的判断是：今天值得看的不是「哪个模型更强」本身，而是模型变强之后，builder 们开始重新理解三件事：软件需求会不会被放大，agent 能不能跨进真实行业，组织又该如何训练人来接住这轮变化。

## 1. 软件没有被 AI 吃掉，反而可能变成更多工作的入口

Box CEO Aaron Levie 提出一个很清晰的 Jevons paradox 版本：AI 原本被认为会替代软件工作，但如果软件单位生产成本下降，而软件又有大量可用场景，企业反而会启动更多项目。他的要点不是「程序员永远安全」，而是：只要系统还没有被完全自动化，就仍然需要人决定建什么、长期运行它、维护它、更新它。来源：[Aaron Levie](https://x.com/levie/status/2076116544980214164)

Swyx 把同一个逻辑推得更广：如果只把 Jevons paradox 理解成「coding agents 让软件需求增加」，可能还低估了它。他强调两类条件正在同时出现：能熟练挥动 coding agents 的人，以及 coding agents 向其他 knowledge work 溢出的趋势。换句话说，coding 只是前哨，不一定是终点。来源：[Swyx](https://x.com/swyx/status/2076155833428431012)

这组信号对 builder 的含义很实际：AI 降低了生产成本，但不会自动提供需求判断、系统边界、长期维护和组织责任。真正稀缺的可能从「会不会写」转向「知道哪里值得写、写完后谁来负责」。

## 2. GPT 5.6 Sol 的讨论，已经从 benchmark 转向可用手感

Thibault Sottiaux 直接把 GPT 5.6 Sol 的改进点列成 builder 能感知的维度：fast、token efficient、hardcore at back-end dev、great at front-end，以及不会到处乱用 `useEffect`。这个表达很有意思，因为它不是抽象地说「模型更聪明」，而是在回应开发者真实抱怨：速度、code slop、frontend quality。来源：[Thibault Sottiaux](https://x.com/thsottiaux/status/2076145711922696371)

他还给了一个更偏工具链的玩法：通过 CLIProxyAPI，把 Claude Code 指到 `gpt-5.6-sol`，并设置 `CLAUDE_CODE_SUBAGENT_MODEL`、`CLAUDE_CODE_ALWAYS_ENABLE_EFFORT`、`CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY` 等环境变量来跑一个 `claudex` alias。这里的重点不是推荐某个 hack，而是说明模型竞争正在进入「能否塞进已有 developer workflow」的阶段。来源：[Thibault Sottiaux](https://x.com/thsottiaux/status/2076119366647894371)

Zara Zhang 的短评也指向同一件事：她说 5.6 Sol 在 front end 上很强。Sam Altman 则说不少 benchmark 显示 5.6 Sol 可能是当前最强模型，但他的表达更像社交场上的一句玩笑；真正可沉淀的信号，仍然是开发者在具体任务里的手感反馈。来源：[Zara Zhang](https://x.com/zarazhangrui/status/2076130810143367453)、[Sam Altman](https://x.com/sama/status/2075983427019612242)

## 3. Booking 的提醒：行业复杂度不会因为 agent 出现而消失

No Priors 这期最值得摘出来的一句话，是 Glenn Fogel 开场的判断：“There is no such thing as a moat.” 他并不是说公司没有竞争优势，而是说没有任何地方能永久免疫 innovation；长期能赢，只能持续发展新服务、新做法，并且每天争取客户。来源：[No Priors｜Travel Through the Lens of AI with Booking.com CEO Glenn Fogel](https://www.youtube.com/watch?v=8nj_0wZkbtA)

但他同时反对一种轻率的 AI 替代叙事：从外面看，travel 好像很容易被 AI 接管，于是有人会以为 travel companies 会失去价值；可当 OpenAI 表示不打算成为 merchant of record、也不继续某种 app 内 commerce 方式时，市场又会反向修正。Fogel 的核心观点是，travel marketplace 有 travelers 和 partners 两端，AI 的价值是让信息、决策和匹配更好、更便宜、更有用，而不是一句话抹掉复杂业务。来源：[No Priors｜Travel Through the Lens of AI with Booking.com CEO Glenn Fogel](https://www.youtube.com/watch?v=8nj_0wZkbtA)

他对 travel agent 的想象反而非常积极：Booking 希望提供个性化 agents，记住用户偏好，在大量 permutation 中快速搜索、回退、比较，再把复杂行程规划变简单。但他也强调，复杂决策里人仍然通常想保留 agency，至少要确认最终选择。来源：[No Priors｜Travel Through the Lens of AI with Booking.com CEO Glenn Fogel](https://www.youtube.com/watch?v=8nj_0wZkbtA)

这里的现实感很重要：agent 不是没有用，恰恰相反，它可能非常有用；但越进入高价值行业，越要理解库存、支付、责任、偏好、异常处理、合作伙伴关系和用户确认。产品不是 demo，行业不是 prompt。

## 4. Job displacement 的难题，不在方向，而在速度

Fogel 对 AI 与工作的看法也比常见口号更具体。他提到 Booking 早年有大量 40 多种语言的人工翻译和客服工作，而 machine translation 出现后，这些工作已经消失。他关心的不是技术是否会替代工作，这在人类历史上一直发生；真正的问题是变化速度，以及新工作出现的速度是否能接住旧工作消失的人。来源：[No Priors｜Travel Through the Lens of AI with Booking.com CEO Glenn Fogel](https://www.youtube.com/watch?v=8nj_0wZkbtA)

他的一个公司层面的答案是持续 upskill，让员工变得 AI literate。他说公司每天都在思考如何训练人面向未来；即使某些岗位最终无法保留，至少也让这些人更有能力去别处找到工作。这个说法没有把问题包装成「AI 会让所有人更幸福」，但承认企业有义务把工具能力变成员工的可迁移能力。来源：[No Priors｜Travel Through the Lens of AI with Booking.com CEO Glenn Fogel](https://www.youtube.com/watch?v=8nj_0wZkbtA)

这也与 Aaron Levie 和 Swyx 的软件需求放大论形成一个闭环：如果 AI 让更多工作被生产出来，那么人的位置不会简单消失，但会被迫迁移到更高层的判断、维护、协调和责任上。问题不只是「有没有新岗位」，而是「现有的人能不能足够快地学会进入新岗位」。来源：[Aaron Levie](https://x.com/levie/status/2076116544980214164)、[Swyx](https://x.com/swyx/status/2076155833428431012)

## 简短结语

今天这组 builders 信号可以压成一句话：模型能力继续上涨，但真正的竞争正在从能力展示转向行业吸收。

更强的 coding agent 会带来更多软件需求，也会暴露更多维护和判断问题；更强的 travel agent 能减少规划摩擦，但不能跳过真实市场的多边复杂度；更强的自动化会替代旧工作，但组织如果不训练人，速度差会变成社会和公司内部的断层。护城河退潮之后，剩下的不是裸奔的公司，而是那些能把 AI 放进真实业务、真实工作流和真实责任结构里的 builders。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
