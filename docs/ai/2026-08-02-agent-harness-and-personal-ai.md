---
title: 2026-08-02｜Harness 之后，agent 才像一种生产力
date: 2026-08-02
---

今天的信号很集中：AI 的主战场正在从“模型有没有更聪明”转向“系统能不能把聪明变成稳定动作”。builders 讨论最多的不是单点 demo，而是 harness、可观测工作流、团队协作界面、个性化 AI，以及本地推理控制权。模型仍然是发动机，但真正决定生产力的，越来越像是发动机外面的传动系统。

## 1. Agentic software factory 的核心不是 agent，而是 loop

Vercel CEO Guillermo Rauch 把软件项目的未来压成一个循环：`Issue → Agent → PR → Release`。他认为随着项目转向 agentic software factories，作者和维护者的工作会变成设计这个 loop，让它产出最高质量的产品，并决定什么值得被做。这个判断重要，因为它把人从“亲手写每一行”移到了“设计反馈回路和准入标准”的位置。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2083208578526314513)

Linear 产品负责人 Nan Yu 给了更接地气的版本：Linear 内部最常见的 loop 正是某种 `Issue > Agent > PR > Release`，并且约 30% 的 bug 会走完整条链路。但她强调，agent 不能被粗暴地要求“修掉它”。instructions 应该要求 agent 先深挖 root cause，用 Datadog 和 Sentry MCP 收集证据；只有在高确定性时才提交修复，否则就请 reporter 补充 repro steps。换句话说，agent 也需要被教会 good practices，像新人一样。来源：[Nan Yu on X](https://x.com/thenanyu/status/2083230295206121807)

Box CEO Aaron Levie 则把同一件事上升为 AI stack 的关键变量：harness 会成为仅次于 model capability 的重要因素。随着任务从几十万、几百万 token 走向几千万、上亿 token，系统如何拆解任务、如何在正确时间 route 到正确模型，将直接影响 accuracy 和 cost。模型能力当然重要，但长任务时代的胜负手可能是 harness efficiency。来源：[Aaron Levie on X](https://x.com/levie/status/2083389460679373135)

Rauch 的另一条更新更偏基础设施：AI Gateway 要提供 per key / team / project 的 budgets、failover、model and provider choice、realtime observability。他的措辞是，如果还沉迷在“token-maxing”的热梦里，该醒了。这里的潜台词很清楚：企业要把 AI 变成 productive investment，不能只买 token，要有预算、容灾、模型选择和观测。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2083319868766699699)

## 2. Harness 也是个人和公司的“脑壳”

YC CEO Garry Tan 说，个人 AI 或 company brain 需要一个 clean harness，并指向他们团队每天使用的 free and open source 工具。即使不展开工具细节，这条也说明一个趋势：知识库、agent、工作上下文如果没有一个干净外壳，很快会变成一堆互不相干的 prompt 和碎片记忆。来源：[Garry Tan on X](https://x.com/garrytan/status/2083353760701833546)

Swyx 仍然在使用 `/loop` 和 `/goal`，并认为很多 AI leaders 太早放弃了它们。他给出的使用场景很具体：当你想要 steerability 与 autonomy 的混合，或者想要一种开放式的“loop that generates loops”终态，而不是把路径写死时，`/loop` 和 `/goal` 仍然有价值。他同日还观察到，“vibe coding”的贬义基本消失，因为从非技术人到超技术人都在做。来源：[Swyx on X](https://x.com/swyx/status/2083439562437673053)、[Swyx on X](https://x.com/swyx/status/2083294839186260385)

Peter Steinberger 的体感则来自模型交互方式：过去 queue 是必要的，但在 5.5 之后，模型不再那么容易混乱，你可以在它工作时继续丢任务，它会认真处理。这个细节看似小，其实关系到 agent 的“手感”：如果用户必须精心排队，agent 是一个脆弱流程；如果用户能边想边追加上下文，它才更像真实协作者。来源：[Peter Steinberger on X](https://x.com/steipete/status/2083369880599015713)

## 3. 工作过程正在变成可以共享的 artifact

Claude Blog 发布的 Claude Code artifacts，是今天官方博客里最值得单独拎出来的产品信号。Claude Code 可以把 session 里的工作进展转成 live、shareable visual pages，包括 PR walkthroughs、system explainers、dashboards、release checklists；页面会随着 session 更新，发布同一链接的新版本，并带 version history。它不是简单的“生成网页”，而是把 agent 的推理、代码上下文、connector 数据和协作状态打包成一个团队可以一起看的对象。来源：[Claude Blog｜Claude Code now supports artifacts](https://claude.com/blog/artifacts-in-claude-code)

这个能力对 debugging 尤其有意义。博客里的例子是：工程师在 standup 前启动 incident investigation，Claude Code 查 logs 后发布 artifact，里面有 timeline、suspect commits、error-rate chart；调查继续推进时 artifact 自动 republish。团队不再需要听某个人口头“walk us through what the agent found”，而是直接看同一份上下文。企业侧也保留了边界：artifact 默认 private，只能被 org 内 authenticated members 查看，admins 可以用 org-level toggle、role-based scoping、retention policies 和 compliance API 管理。来源：[Claude Blog｜Claude Code now supports artifacts](https://claude.com/blog/artifacts-in-claude-code)

## 4. Personal AI 正在和 super AI 分叉

Unsupervised Learning 对 Igor Babushkin 的访谈，给了一个更长周期的判断。Igor 的背景横跨 DeepMind、OpenAI、xAI，并参与过 StarCraft、AlphaCode、early reasoning、Colossus 等工作。他认为去年 11、12 月对软件工程师和 AI researchers 是一个转折点：coding agents 突然强到无法忽视，让很多人意识到“anything is possible now”，但这也像现代版 Sorcerer’s Apprentice，工具会越来越强，问题是下一步会变成什么。来源：[Unsupervised Learning｜Ep 92: xAI Co-Founder Unpacks the Future of Model Development](https://www.youtube.com/@RedpointAI)

Igor 对 agent 进步路径的拆分很清楚：coding 和 math 是低垂果实，因为它们可验证；Lean 这样的 formalization 工具能提供 reward signal，帮助判断 proof 是否真的成立。但到了 material science、fundamental physics、better rocket engine 这类物理世界问题，瓶颈会变成 data 和实验闭环，agent 必须能从真实世界拿到反馈。来源：[Unsupervised Learning｜Ep 92: xAI Co-Founder Unpacks the Future of Model Development](https://www.youtube.com/@RedpointAI)

更有意思的是他对 AI 产品形态的分叉判断：一边是少数人才能调用、一次问题可能成本极高的 super AI；另一边是每个人日常使用的 common AI，目标不是证明 Riemann hypothesis，而是帮助人更高效、更好地组织生活。River AI 的三个 bets 也对应这个方向：River API 做 reinforcement learning 和 fine-tuning service；personal AI 试图打破“模型对所有用户表现一致”的假设，让 agent 直接从个人交互中学习；hardware bet 则追问能否把 inference compute 带到本地，让 frontier model 在办公室或家里的小设备上运行，从而给用户更多控制权和数据保护。来源：[Unsupervised Learning｜Ep 92: xAI Co-Founder Unpacks the Future of Model Development](https://www.youtube.com/@RedpointAI)

## 5. 真正的界面会越来越靠近人的日常动作

Zara Zhang 提到 Anthropic 内部 Claude Tag 对工作方式的改变：产品和工程团队里 65% 的 PR 现在由 Claude Tag raised。她的更大判断是，非工程团队的最终 agent interface 会在他们已经工作的地方，比如 Slack 或其他 collaboration tools；她自己过去半年从 terminal，到 desktop app，再到工作协作工具，每一步都更接近人类自然沟通方式。agent 应该 literally meet the user where they are。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2083161173563003268)

Sam Altman 分享了一个 ChatGPT Work 的日常用例：连接家庭日历并说明孩子的兴趣，然后每天早上为上学路上生成一个 podcast，内容包括某个孩子下午的 soccer game、生日、新闻等。这个例子不宏大，但很准：personal AI 的价值不一定来自一次性解决复杂理论问题，而是把家庭上下文、时间表、兴趣和音频生成揉进一个每天重复的微场景。来源：[Sam Altman on X](https://x.com/sama/status/2083221585792762171)

Thibault Sottiaux 则从使用门槛侧给出一个信号：为了庆祝一周的 efficiency，并让用户周末跑 100,000 个 Luna threads，他重置了 Codex 和 ChatGPT Work 的 usage limits。单条信息不能证明长期成本曲线，但它和今天反复出现的 harness / work loop 主题放在一起看，说明 frontier 产品正在同时打两个方向：让 agent 能承接更长任务，也让高频使用的摩擦更低。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2083395449814229287)

## 结语

今天的线索可以合成一句话：agent 真正进入生产系统之后，模型只是必要条件，harness、observability、artifact、界面位置和控制权才决定它能不能被信任、被复用、被规模化。过去一年大家在问“模型能不能做”；接下来更关键的问题会是“系统能不能让它持续做对”。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 X、podcast、blog 内容整理；没有使用额外抓取来源。政治、纯推广、家庭玩笑等与 AI 建造者信号弱相关的帖子未纳入正文。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
