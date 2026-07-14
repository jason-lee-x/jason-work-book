---
title: 2026-07-14｜模型的账单、Agent 的手感与能源的底座
date: 2026-07-14
---

今天的 AI builders 信号很集中：模型能力当然还在往前走，但真正浮到水面的，已经不是单纯的 benchmark，而是三类更硬的东西：用量如何计费、agent 如何嵌入工作流、以及支撑 AI 时代的物理能源从哪里来。

我的判断是：AI 正在从「聪明的工具」变成「需要被运营的基础设施」。基础设施的第一性问题不只是强不强，而是成本、限额、可控性、数据归属、组织流程，以及最底层的电。

## 1. 模型竞争进入账单层：usage limit 也是产品体验

OpenAI / Codex 侧今天最明确的信号来自 Thibault Sottiaux。他说 Codex 和 ChatGPT Work 用户会得到一组 GPT-5.6 Sol 的使用调整：推理优化带来的 savings 会传给订阅用户，单这一项预计带来约 10% 更多使用量；他们发现把 GPT-5.6 Sol 的 context size limit 从 GPT-5.5 的 272k 提到 372k 后，产品里计费消耗比预期更多，于是先回退到 272k，后续再重新推出 372k；同时也回退了 reasoning effort / juice value 的实验，并会修复 high 和 xhigh reasoning effort 下 multi-agent 使用量略高的问题。来源：[Thibault Sottiaux](https://x.com/thsottiaux/status/2076495156757577895)

这不是一个小的产品公告。它说明 frontier model 的用户体验正在变得像云服务：上下文长度、reasoning effort、multi-agent 调度、auto-review 效率，都会直接体现在用户的「消耗速度」上。模型越强，越需要把成本模型解释清楚，否则用户感知到的不是能力，而是账单不透明。

Thibault 还补了一句更安抚性的承诺：GPT 5.6 Sol 会留在 Go、Plus、Pro 等 ChatGPT 付费订阅里，至少直到更好的模型发布；Team、Edu 和其他 paid subscription 也包含在内。来源：[Thibault Sottiaux](https://x.com/thsottiaux/status/2076459871021736245)、[Thibault Sottiaux](https://x.com/thsottiaux/status/2076460408437887268)

Anthropic 侧的节奏也类似。Claude 官方说，会把 Claude Fable 5 在所有付费计划中的访问延长到 7 月 19 日，同时把 Claude Code 的 weekly rate limits 维持在提高 50% 的水平；另一个补充是，用户和之前一样最多可以把一半 weekly usage limit 用在 Fable 5 上，之后可继续用 usage credits 或切到其他模型。来源：[Claude](https://x.com/claudeai/status/2076351399999557669)、[Claude](https://x.com/claudeai/status/2076351401006154204)

Peter Yang 对这类时刻的观察很值得放在一起看：当社区情绪转向时，团队往往会沟通更少、话术更 corporate；他认为应该反过来，用更 human 的方式透明解释情况、和社区一起找解法。他还猜测当天大量人都在用 GPT 5.6 Sol，Terra 或 Luna 的占比可能很低。来源：[Peter Yang](https://x.com/petergyang/status/2076512796481880270)、[Peter Yang](https://x.com/petergyang/status/2076519927843000448)

这组信号的核心不是谁更会公关，而是模型供应商已经在处理云基础设施式的问题：容量、限额、成本分摊、用户预期管理。能力是入口，可信的运营才是留存。

## 2. 不要把大脑外包：企业 AI 的价值在模型之上

Guillermo Rauch 给了一个非常直接的架构判断：让模型成为你自己机器里的一个齿轮。他把 AI SDK、open model API、open Agent API、AI Gateway、open ZDR inference 放在同一个语境里，强调 startups 和 enterprises 必须拥有自己的 data、evals、model choices、software layer，不要外包自己的大脑。来源：[Guillermo Rauch](https://x.com/rauchg/status/2076364176252191222)

Aaron Levie 从企业 IP 的角度把这个问题讲得更具体。他说，21 世纪商业里的一个关键架构问题，是企业如何最大化自己以 decisions、insights、workflow patterns、best practices 形式存在的 corporate IP。即使模型智能越来越强，企业仍需要自己的 workflow evals、不同智能层级之间的模型路由、可沉淀并改善工作流的 traces，以及能让信息价值随着 AI 变强而复利的系统。来源：[Aaron Levie](https://x.com/levie/status/2076338364635287637)

这两条放在一起，基本就是企业 AI 的硬命题：模型会越来越强，也会越来越商品化；但企业真正的差异不在「我也调用了一个强模型」，而在是否把自己的判断、流程、评价标准和数据反馈闭环留在系统里。Applied AI layer 的机会正在这里，而不是只做一层漂亮壳。

## 3. Agent 的手感：会议变 PRD，实验开始并行，但方向仍然稀缺

Zara Zhang 分享了一个很实用的 workflow：把 meeting transcript 当成 PRD。她的做法是和同事讨论一个 feature 的实现，把会议转录发给 Codex，然后让它按讨论内容做 prototype。她的总结很短：「the meeting is the prompt」。来源：[Zara Zhang](https://x.com/zarazhangrui/status/2076300222884626754)

Amjad Masad 则把这种 agentic workflow 推到 ML 实验上。他称之为「Vibe Research」：在 Replit 上 fine-tuning 一个 Qwen-8b 模型来下棋，同时跑 3 个 parallel branches 做不同实验，并且取得进展。他的感受是，模型做 ML 的能力已经比过去强很多，所以一个有好直觉的人，即使以前没做过 ML，也可能指导模型完成有意思的 ML 工作。来源：[Amjad Masad](https://x.com/amasad/status/2076227936202662357)

Peter Steinberger 的几条状态则提供了更朴素的工程侧信号：他提到自己的 Mac Studio 大概已经接近能承受的 session 数量上限，并且把工作通过 Jump Desktop shard 到约 5 台机器上。来源：[Peter Steinberger](https://x.com/steipete/status/2076552605262872904)、[Peter Steinberger](https://x.com/steipete/status/2076553742883930455)

但 Nikunj Kothari 的提醒很必要：他见到很多人在 SF 自称 tokenmaxxing，让一堆 subagents 替自己循环工作；可当被问到「在为谁、做什么」时，很少有人能说清楚。他的结论是，即使在这个疯狂的 AI 时代，simplicity 和 direction 仍然极其重要。来源：[Nikunj Kothari](https://x.com/nikunj/status/2076458876816540144)

所以今天关于 agent 的真实图景并不浪漫：会议可以变 prompt，实验可以并行，session 可以被 sharding；但如果目标、用户和问题本身不清楚，token 再便宜也只是把迷路的速度提高了。

## 4. 能源是更底层的 AI 基础设施

No Priors 这期把话题拉到了 AI 之外，但其实正好落在 AI 的底座上：Valar Atomics 创始人 Isaiah Taylor 讨论为什么要用 hardware iteration 和制造业方式重启 nuclear。节目开头提到，他们做出了「first ever AI chip powered by a nuclear reactor」，并称这是美国 50 多年来首次启动 Triso reactor。来源：[No Priors｜How Nuclear Will Unlock Energy Abundance with Valar Atomics Founder Isaiah Taylor](https://www.youtube.com/watch?v=5Xvbq_zvOQ4)

Isaiah 的核心判断是，能源需求由价格决定：如果能把能源做得更便宜，就会出现需求。他批评传统 nuclear 行业更多像 modeling and simulation industry，产生很多 paper reactors；Valar 的路线则是硬件迭代、运行真实 plant，并用更可制造、更安全的 reactor 去追求规模化。来源：[No Priors｜How Nuclear Will Unlock Energy Abundance with Valar Atomics Founder Isaiah Taylor](https://www.youtube.com/watch?v=5Xvbq_zvOQ4)

节目里还有一个关键制度细节：他区分了 NRC 的 commercial deployment 路径和 Department of Energy 的 testing 路径，认为后者原本就是为了测试核反应堆而存在。Valar 背后的 100 kilowatt reactor 按他的说法是在 executive order EO14301 和 DOE authority 下运行，用来打破「没有运行数据就无法监管、没有监管又无法运行」的鸡生蛋困局。来源：[No Priors｜How Nuclear Will Unlock Energy Abundance with Valar Atomics Founder Isaiah Taylor](https://www.youtube.com/watch?v=5Xvbq_zvOQ4)

这和 AI 的关系不是口号式的「算力需要电」那么简单。Isaiah 后面把能源推到更基础的位置：当 AI 和 robotics 让 semi autonomous manufacturing 成为可能，energy 会变成很多东西的成本底层。换句话说，如果 AI 把软件、制造和自动化都推向更大规模，能源价格会成为文明级别的 throttle。来源：[No Priors｜How Nuclear Will Unlock Energy Abundance with Valar Atomics Founder Isaiah Taylor](https://www.youtube.com/watch?v=5Xvbq_zvOQ4)

## 简短结语

今天的主线可以压成一句话：AI 正在从模型竞赛进入基础设施竞赛。

模型厂商要解释清楚 usage、limit 和成本；企业要把自己的 data、evals、workflow traces 留在系统里；builder 要学会把会议、实验和多机 session 变成可控流程；而最底层，能源供给会决定 AI 和自动化能跑到多大规模。

真正值得追的不是「更强模型」四个字，而是强模型进入现实世界之后，谁能把账单、架构、流程和能源都接住。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
