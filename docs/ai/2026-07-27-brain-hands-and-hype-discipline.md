---
title: 2026-07-27｜把大脑和手拆开，给热潮降温
date: 2026-07-27
---

今天的 builder 信号有一个很清楚的重心：AI 产品正在从「模型更强」进入「系统更稳」。强模型当然还重要，但今天更值得看的，是 agent 的工程边界、长期会话的状态管理、工具执行的位置、以及 builder 们如何把自己的软件生产方式改造成一座可以持续运转的 factory。换句话说，下一段竞争不只是谁有更聪明的大脑，而是谁能把大脑、手、记忆、权限和真实业务拆成稳定接口。

## 1. Agent 的新骨架：session、harness、sandbox 分家

Anthropic Engineering 的《Scaling Managed Agents: Decoupling the brain from the hands》是今天最硬的一条。它把 Managed Agents 描述成一种「meta-harness」：session 是 append-only 事件日志，harness 是调用 Claude 并路由 tool calls 的循环，sandbox 是执行代码和修改文件的环境。早期把三者放进同一个 container，虽然简单，但变成了 infrastructure 里的「pet」：container 一挂，session 丢；container 卡住，工程师也很难调试，因为里面常常同时有用户数据。来源：[Anthropic Engineering｜Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents)

他们最后选择把「brain」从「hands」和「session」里拆出来。harness 不再住在 sandbox 里，而是通过 `execute(name, input) → string` 把 sandbox 当作一个 tool 调用；如果 sandbox 死掉，错误返回给 Claude，由它决定是否重试，新 sandbox 可以用 `provision({resources})` 重新初始化。harness 自己也变成 cattle，因为 session log 在外部，失败后可以用 `wake(sessionId)` 和 `getSession(id)` 恢复。这个设计的关键不是某个 API 名字，而是把 agent 的失败恢复、长期状态和执行环境从「一个活着的进程」升级成可替换接口。来源：[Anthropic Engineering｜Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents)

安全边界也随之变硬。Anthropic 明确指出，如果 Claude 生成的不可信代码和 credentials 在同一个 container 里，prompt injection 只需要说服 Claude 读自己的环境变量。Managed Agents 的结构性修复是：tokens 永远不要出现在 sandbox 里。Git token 用于初始化 repo 和 remote，但 agent 不直接持有；MCP OAuth tokens 放在 vault，通过 proxy 调用外部服务。这里的产品判断很实在：不要赌模型永远不会误读一段文本，要让它即使误读也够不到密钥。来源：[Anthropic Engineering｜Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents)

同一条线也出现在 Claude Blog 的产品更新里：Claude Managed Agents 支持 self-hosted sandboxes 和 MCP tunnels。前者让 code execution、sensitive files、packages、services 和 data 留在企业自己的 perimeter 内，Anthropic 侧保留 agent loop、context management 和 error recovery；后者让 agent 通过你部署的轻量 gateway 访问 private MCP servers，不需要暴露公网入口，也不需要 inbound firewall rules。来源：[Claude Blog｜New in Claude Managed Agents](https://claude.com/blog/claude-managed-agents-updates)

这不是一个小 feature，而是 agent 平台化的方向：brain 可以托管，hands 可以留在客户边界内，session 可以外置成可查询对象。Anthropic 还给了一个非常具体的性能结果：把 brain 从 container 中拆出来后，不需要 sandbox 的 session 不再等待 container provision，p50 TTFT 下降约 60%，p95 下降超过 90%。来源：[Anthropic Engineering｜Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents)

## 2. Claude Code 的质量事故，说明 prompt 也是生产变更

另一篇 Anthropic Engineering postmortem 讲的是 Claude Code、Claude Agent SDK 和 Claude Cowork 近期质量报告。Anthropic 归因于三类变更：3 月 4 日把 Claude Code default reasoning effort 从 high 改到 medium 以降低延迟，后来发现这是错误 tradeoff，4 月 7 日恢复；3 月 26 日一次清理 stale thinking context 的缓存优化有 bug，导致 idle 超过一小时后每一轮都持续丢弃旧 reasoning，使 Claude 显得健忘、重复、工具选择奇怪，4 月 10 日修复；4 月 16 日为了降低 verbosity 加入 system prompt 限制，组合后伤害 coding quality，4 月 20 日回滚。来源：[Anthropic Engineering｜An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem)

这篇文章最值得带走的不是「Anthropic 修了 bug」，而是三条工程教训。第一，reasoning effort 不是 UI 偏好，它直接改变智能、延迟和 token 消耗的 tradeoff；第二，thinking history 不是可随便裁剪的缓存垃圾，它承载了 agent 为什么这样改文件、为什么这样调用工具的因果链；第三，system prompt 里的短短一句话也可能是生产级变更。Anthropic 提到那句限制是：“Length limits: keep text between tool calls to ≤25 words. Keep final responses to ≤100 words unless the task requires more detail.” 后续更广 eval 显示 Opus 4.6 和 4.7 都有 3% drop，于是回滚。来源：[Anthropic Engineering｜An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem)

这和昨天围绕 prompt、workflow、containment 的信号能接上：当 agent 开始长时间工作，prompt 不是文案，context trimming 不是优化小技巧，harness 不是胶水代码。它们都是会改变智能表现、可靠性和成本曲线的生产系统。Anthropic 后续措施也很像成熟 infra 团队：更多员工使用 public build，更广 per-model evals，每次 system prompt change 做 ablation，增加 soak periods、gradual rollouts，并让 model-specific changes 受 CLAUDE.md guidance 约束。来源：[Anthropic Engineering｜An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem)

## 3. Software factory 正在从口号变成工作方式

Vercel CEO Guillermo Rauch 今天把「software factory」说得很直接：软件工厂本身就是产品，你的产品质量取决于你设置了哪些 agents 去 autonomously maintain it。他还给了一个很朴素的研究 workflow：用 agent CLI 和 filesystem，一个 `research/` folder，一个 `AGENTS.md` 写清格式与 best practices，然后让 agent 查找、关联之前 session 的知识；需要分享结果时，让 agent 生成 HTML report 并部署到 Vercel。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2081123293340520642)、[Guillermo Rauch on X](https://x.com/rauchg/status/2081103993917649134)

这条思路很像 Managed Agents 的个人版：不是先找一个漂亮 UI，而是先定义文件、协议和可重复流程。Rauch 进一步说，`v0` 比他们之前做过的任何 framework 都更 fundamental，因为它是公司想法的 genesis；当你有新 idea，不该想「去找 agent 随便 prompt 一下」，而该想「怎样建一座会启动、维护、增长这个 idea 的 factory」。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2081149743368122723)

Linear 产品负责人 Nan Yu 的几条短帖也在同一方向。他说如果你能做 SoftwareFactory，就能做 SoftwareFactoryFactory；并补了一句，这不只适用于软件，也可以泛化到 public health、law 等领域，目标不是一个 feature，而是某种被设计并实现的 intention。这个说法有点抽象，但和 Rauch 的文件夹工作流放在一起看，重点很清楚：agent-native workflow 的单位不是 prompt，而是一套可复制、可监督、能持续生成结果的生产系统。来源：[Nan Yu on X](https://x.com/thenanyu/status/2081187979024797858)、[Nan Yu on X](https://x.com/thenanyu/status/2081183178568405171)

Peter Steinberger 给了更粗暴的一线样本：他让 Codex 全天做 massive parallel QA，为 OpenClaw 下一版准备，要求 12 个 subagents 切分功能、起不同端口的 dev gateways、stress test、自治创建 PR、目标找 200 个 bugs、每次修 root cause、不要 band-aids，并持续更新桌面上的 Markdown test report。他还说过去这种 workflow 会在 compaction boundaries 附近崩掉，或者模型开始 cheating；现在 Sol 对 intent 的理解强了很多，能找到复杂行为问题。来源：[Peter Steinberger on X](https://x.com/steipete/status/2081169376317932017)、[Peter Steinberger on X](https://x.com/steipete/status/2081169373784633552)

Peter Yang 也把 Codex 工作方式往「组织记忆」方向推了一步：他预告采访 OpenAI DevEx engineer Jason，后者写过 Codex for work 官方 guidebook，并展示了如何用 Codex 跑 Slack 和 email 的 chief of staff、把过去 sessions 变成新 skills 和 workflows、以及搭网站来学习打鼓。这里的共同点不是某个工具名，而是把 agent 使用从一次性聊天改成积累 workflows、skills、reports 和可复用上下文。来源：[Peter Yang on X](https://x.com/petergyang/status/2081029209993154980)

## 4. Open weights 的共识在现实实验中形成

今天 open weights 的信号不多，但很集中。Box CEO Aaron Levie 看到 Google 也加入后，称这是对 open weights AI 的完整 endorsement，是行业的重要时刻。Peter Steinberger 的说法更短：competition is good for the ecosystem，serving models at scale is hard，并提到 OpenAI 签署了相关 letter。来源：[Aaron Levie on X](https://x.com/levie/status/2081054531908247937)、[Peter Steinberger on X](https://x.com/steipete/status/2081175795587072421)

Meta AI 的 Madhu Guru 则给了更好的解释框架：在 uncharted territory，难题答案只能来自反复接触现实。他说美国 AI community 对 open-weight models 的支持很快收敛，但一个月前并不显然；DeepSeek、Microsoft-OpenAI breakup、GLM、Kimi、Fable、OpenAI-Hugging Face episode 等一系列公共「实验」，让行业共同观察不同方向的一阶和二阶效应，并更新对 incentives、innovation、geopolitics 和各方牌面的判断。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2081141594892415028)

这段话适合放在今天整篇的底部做注脚：AI 的大问题不会靠 metaphors 一次性想清楚，而会靠一轮轮现实实验逼出答案。open weights 如此，agent sandbox 如此，software factory 也如此。

## 5. Benedict Evans 给热潮踩了一脚刹车

Unsupervised Learning 这期和 Benedict Evans 的对谈，价值在于给热潮降温。Evans 不否认 AI 很大，他把 AI 放在 internet、mobile、PC 这种 platform shift 的比较里，但反复提醒不要把「这次不同」当成无需分析的理由。他谈 token pricing 时拿 mobile、semiconductors、fiber、operating systems 做类比，强调这些历史没有预测力，但能帮助我们理解不同 stack layer 的竞争动态。一个很尖锐的点是：mobile data traffic 十五年涨了一两千倍，运营商每年花 2000 亿美元 CapEx，却没有拿走 Uber、banking、YouTube 的价值；AI 也要问价值是否会上移。来源：[Unsupervised Learning｜Ep 91](https://www.youtube.com/watch?v=vDY_ocrkQ5w)

Evans 还直接说，LLMs 不像 Windows 那样有 network effects，所以很难简单把 foundation models 想成操作系统级垄断入口。他对产品化的拆分也很有用：software development 已经明确有 product-market fit；一部分灵活知识工作者会高频使用；但普通用户还远没有达到 Silicon Valley 想象中的「改变计算」程度。他甚至说 weekly active user 在 social 语境里是 bullshit，如果人们一周只用一两次，那只是偶尔有用的工具，不是日常计算界面的替代品。来源：[Unsupervised Learning｜Ep 91](https://www.youtube.com/watch?v=vDY_ocrkQ5w)

这和今天 builder 侧的信号刚好互补。Thibault Sottiaux 提到 ChatGPT Work active users 已经超过 Codex，并说从 mobile 使用会是 game changer，语音过去只是能对电脑说话，现在「它会做点什么」。Zara Zhang 则问大家等待 AI output 时在做什么，并说 AI-native companies 有一种类似 open-source community 的文化。它们都指向同一个 UX 问题：模型会做事之后，真正的瓶颈变成移动入口、语音入口、等待时间、组织协作和任务连续性。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2081198608293187635)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2081229262452097169)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2081254182502465981)、[Zara Zhang on X](https://x.com/zarazhangrui/status/2081200367480738098)、[Zara Zhang on X](https://x.com/zarazhangrui/status/2081223709755650054)

Evans 最好的问题可能是这个：很多我们想自动化的问题，是否连向一个真人解释都很困难？如果你无法把任务隔离、描述、交付给人，那么模型能力不是唯一瓶颈，任务定义本身就是瓶颈。来源：[Unsupervised Learning｜Ep 91](https://www.youtube.com/watch?v=vDY_ocrkQ5w)

## 结语

今天的主线可以压成一句话：AI builder 的工作正在从「调一个更好的回答」转向「设计一套能长期行动的系统」。Anthropic 在拆 brain、hands、session 和 sandbox；Claude Code postmortem 证明 prompt、effort、context 和 eval 都是生产变更；Vercel、Linear、OpenClaw 等 builder 信号说明 software factory 正在变成实际工作方式；Benedict Evans 则提醒我们，不要被宏大叙事催眠，真正要看的还是 product-market fit、价值层级、任务可描述性和现实反馈。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 X、官方博客与 podcast 内容整理；没有使用额外抓取来源。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
