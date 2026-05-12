---
title: "2026-05-12｜Agent 变成基础设施，推理云长出护城河"
date: 2026-05-12
---

# 2026-05-12｜Agent 变成基础设施，推理云长出护城河

今天的 AI builders 信号很像一次从“模型能力”到“运行系统”的转场：Anthropic 在讲 long-horizon agent 的系统边界，Baseten 在讲推理云和 custom model 的需求爆发，Box 则把 AI automation engineer 当成一种新的企业角色来招。

共同的底层判断是：AI 不再只是一个更聪明的 API。它正在变成一套需要隔离、上下文、权限、工具、反馈、评测和人类介入位置的工作系统。谁能把这些运行细节做稳定，谁才真正拥有生产环境里的智能。

## 1. Anthropic 的 Managed Agents：不要养宠物，要养接口

Anthropic Engineering 发布了 “Scaling Managed Agents: Decoupling the brain from the hands”。这篇文章最值得看的不是产品名，而是架构取向：他们把 agent 拆成三层接口，session 是 append-only event log，harness 是调用 Claude 和路由 tool calls 的循环，sandbox 是运行代码和改文件的执行环境。核心目的很明确：让实现可以被替换，而接口尽量长期稳定。来源：https://www.anthropic.com/engineering/managed-agents

这套拆分来自一个很工程化的教训：早期把 session、harness、sandbox 放进同一个 container，直接但脆弱。container 一挂，session 就丢；container 卡住，只能像照顾“宠物”一样进去救；更麻烦的是，container 里同时有用户数据，debug 也变成安全问题。Anthropic 的解法是把“brain”和“hands”拆开，harness 通过 `execute(name, input) → string` 调 sandbox，container 死了就把失败作为 tool-call error 返回给 Claude，必要时重新 provision。来源：https://www.anthropic.com/engineering/managed-agents

安全边界也跟着改变。文章明确说，在耦合设计里，Claude 生成的不可信代码和 credentials 在同一个 container 中，prompt injection 只要诱导 Claude 读环境变量就可能拿到 token。新的结构让 token 不进入 sandbox：Git token 用于初始化 repo remote，agent 可以 push/pull 但不直接接触 token；MCP OAuth token 存在 vault 里，由 proxy 代取代用。来源：https://www.anthropic.com/engineering/managed-agents

还有一个很有意思的细节：他们说 Claude Sonnet 4.5 曾有接近 context limit 就过早收尾的 “context anxiety”，后来通过 context resets 缓解；但同一套 harness 放到 Claude Opus 4.5 上，这个行为消失了，原来的 reset 反而成了 dead weight。这是一个很好的提醒：agent harness 不是一次写完的壳，而是会随着模型能力变化而过期的工程假设。来源：https://www.anthropic.com/engineering/managed-agents

拆分之后也带来实打实的性能收益。Anthropic 写到，只有真正需要 sandbox 时才 provision container，inference 可以在 orchestration layer 拉到 session log 后先启动；在这套架构下，p50 time-to-first-token 下降约 60%，p95 下降超过 90%。来源：https://www.anthropic.com/engineering/managed-agents

## 2. Baseten 的推理云：应用层护城河在 workflow，不在裸模型

No Priors 访谈了 Baseten CEO Tuhin Srivastava，主题是 AI inference crunch、custom models 和 inference cloud。访谈开头给出的背景已经足够夸张：Baseten 过去一年增长 30x，主持人还提到公司预计今年收入超过 10 亿美元。Tuhin 的解释是，过去 24 个月里，大家意识到 AI 可以放进每个地方，open source model 的基础能力跨过了一道门槛，post-training 也变得足够主流，客户开始更想“拥有自己的 inference”。来源：https://www.youtube.com/watch?v=XAbKflCncDo

他对“独立应用层会不会被模型实验室吃掉”的回答很具体：应用层的价值在于只有自己能拿到的 user signal，尤其是被编码在 workflow 里的信号。以 Abridge 这类 ambient scribe 为例，真正的护城河不是一段语音转文字，而是医生如何编辑 note、之后如何在 EMR 里继续处理，以及这些动作如何形成可用于 post-train 的 reward signal。来源：https://www.youtube.com/watch?v=XAbKflCncDo

Baseten 的负载结构也很能说明市场方向。Tuhin 说，按 tokens 看，90%-95% 基本都是 custom；其中 dedicated inference 是 custom model inference，占今天约 95% 的 tokens。客户几乎都会基于自己的数据改模型，或者为了 performance 重新编译和优化，“没人只是跑 vanilla open source weights”。来源：https://www.youtube.com/watch?v=XAbKflCncDo

在模型选择上，他描述的顺序不是先省钱，而是先 capability，再优化成本。客户会用 GPTOSS、Moonshot、DeepSeek、Canopy、Orpheus 等各类 frontier 附近的模型；他还提到 DeepSeek 在某些生产场景里可能以约 20% 的成本运行，同时有可比或更好的 latency 与 reliability。这个点不是在说某个模型必胜，而是在说 intelligence cost 下降会直接让更多地方嵌入 intelligence。来源：https://www.youtube.com/watch?v=XAbKflCncDo

另一个值得记住的判断是，post-training 和 inference 正在变成同一枚硬币的两面。Tuhin 提到，训练方式会影响 inference 时如何 quantize；inference 产生数据，eval 找到 reward function，再反过来 post-train，形成闭环。推理云如果只是卖 GPU 时间，很难长期成立；更深的机会是把 deployment、eval、post-training 和性能工程接在一起。来源：https://www.youtube.com/watch?v=XAbKflCncDo

## 3. 企业里的新角色：AI automation engineer

Box CEO Aaron Levie 把 agent 从 coding 推向其他 knowledge work 后需要的工作拆得很清楚：给 agent 正确 context 和 data，把系统安全地接起来，确认 agent 产出质量，设计 end-state workflow 里人类如何 in the loop，并在 model 和 system upgrade 后持续维护。来源：https://x.com/levie/status/2053672965125140915

他的结论是，这不是 nights and weekends 的副业，而是 mission critical workflow 里的技术岗位，接近面向内部职能的 forward deployed engineer。Box 已经开始招聘 AI automation engineering role，让这类人直接和业务合作，改造员工工作方式和客户体验。来源：https://x.com/levie/status/2053672965125140915

这条和 Anthropic、Baseten 的信号是同一件事：当 agent 进入生产，它需要的不只是 prompt，而是一整套运行责任。谁负责上下文？谁负责权限？谁负责质量闸门？谁在模型升级后重新评估？这些问题最后都会落成组织里的岗位和流程。来源：https://x.com/levie/status/2053672965125140915

## 4. Builders 的手感：自己造工具，别等平台替你想好

Peter Steinberger 的几条更新非常“builder”：他让 Codex 对 OpenClaw chat completion endpoint 做 e2e test improvements，而且是 “WITH OpenClaw”，同时用 `/side` 在 agent 工作时继续提问。这个画面很典型：agent 不只是生成代码，而是在真实项目里并行跑任务。来源：https://x.com/steipete/status/2053744332675408151

他还把自己的完整 Twitter archive 接进 Birdclaw，让 Codex 可以查询过去收藏或 bookmark 过的怪 tweet；又在 RepoBar 里加了 browser，用来在选择 issues、PRs、shas、workflows 时保留工作上下文。他自己的总结很直接：“You gotta build yourself the tools to work more efficient.” 来源：https://x.com/steipete/status/2053737275268177980 ，https://x.com/steipete/status/2053717468623872230

Thariq 也在讲类似的工具形态，只是更偏表达介质：他说自己已经在用 HTML 做 planning、speccing、exploration、code review、reports 等很多事情。相比纯 markdown，HTML 更像是给人类和 agent 共享的可视化工作台。来源：https://x.com/trq212/status/2053632475294040084

Dan Shipper 的 weekend hack 则展示了 Codex-native 的小工具速度：买一根 MIDI keyboard 连接线，然后让 Codex 写 watcher script 和 web app，显示正在弹的 chords，再生成练习和改进建议；他说从开始到可用大概 5 分钟。这个例子不宏大，但很说明问题：agent 最先改变的，可能是个人把临时想法变成可用工具的摩擦。来源：https://x.com/danshipper/status/2053551046299959760

Peter Yang 提了一个更日常但很真实的自动化需求：学校每周十页 newsletter 里，AI 应该直接告诉他有没有 early dismissal 或必须注意的事项。这类需求没有炫技成分，却可能是 agent 最容易扎根的入口：把冗长信息流压缩成行动提醒。来源：https://x.com/petergyang/status/2053672364681134511

Ryo Lu 的 ryOS 则出现了一个偏趣味但有象征意义的小连接：给 levelsio 的 retro PC 接上 IRC bridge，让两个小世界连起来。它和今天其他信号放在一起看，像是 consumer side 的同一种冲动：把工具、记忆、网络和人的工作台重新连线。来源：https://x.com/ryolu_/status/2053523477878259951

## 结语

今天最强的线索不是“又出了一个新模型”，而是模型周围的运行系统正在变厚：session log、sandbox、MCP proxy、token vault、custom inference、post-training loop、AI automation engineer、个人工作台工具，都在回答同一个问题：智能要怎样长期、安全、低延迟、可维护地参与真实工作？

真正的 AI 应用壁垒也因此越来越不在 demo，而在 workflow 里的稀有信号、生产链路里的可靠接口，以及能不断把失败反馈进系统的人。模型是大脑，但现在竞争开始转向手、记忆、权限和组织。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
