---
title: 2026-07-01｜Agent 的边界、成本与供应链
date: 2026-07-01
---

# 2026-07-01｜Agent 的边界、成本与供应链

今天的 builders 信号很集中：AI agent 不再只是“模型加工具”，而是在被迫长出一整套工程边界。谁负责思考，谁负责执行，session 如何持久化，token 如何计费，sandbox 里能不能碰到密钥，企业内网如何接入，底层算力和半导体供应链能否跟上，这些问题正在同时浮出水面。

这不是一个漂亮的产品发布日，更像一次基础设施体检。模型能力当然还在前进，但真正决定 agent 能不能进入生产环境的，开始变成更无聊也更硬的东西：隔离、审计、权限、上下文恢复、成本透明、compute substrate，以及芯片与电力。

## 1) Anthropic 的 Managed Agents：把 brain、hands、session 拆开

Anthropic Engineering 写了一篇很值得反复看的系统设计文章：Managed Agents 的核心不是“让 Claude 更会调用工具”，而是把 agent 拆成三个相对稳定的接口：`session` 是 append-only 的事件日志，`harness` 是调用 Claude 并路由 tool calls 的循环，`sandbox` 是执行代码、编辑文件的环境。它们的实现可以替换，但接口尽量长期稳定。[来源](https://www.anthropic.com/engineering/managed-agents)

这篇文章里最关键的判断是：早期把 session、harness、sandbox 全塞进一个 container，看起来简单，实际上是在“养宠物”。container 一旦挂掉，session 就丢；container 卡住，工程师也很难判断是 harness bug、WebSocket event stream 断了，还是容器本身离线。更麻烦的是，用户数据也在同一个环境里，debug 本身就会变成安全问题。[来源](https://www.anthropic.com/engineering/managed-agents)

Anthropic 的解法是“decouple the brain from the hands”：harness 不再住在 container 里，而是像调用任何工具一样调用 sandbox，接口近似 `execute(name, input) → string`。如果 sandbox 死掉，harness 把它当作 tool-call error 反馈给 Claude；如果 Claude 选择重试，就重新 provision 一个新的 sandbox。harness 也变成 cattle，因为 durable session log 在外部，新的 harness 可以用 `wake(sessionId)` 和 `getSession(id)` 恢复。[来源](https://www.anthropic.com/engineering/managed-agents)

这里的安全边界尤其重要：在耦合设计里，Claude 生成的不可信代码和 credentials 在同一个 container 中，prompt injection 只要诱导 Claude 读自己的环境变量，就可能拿到 token。Managed Agents 的结构性修复是：token 不进入 sandbox。Git token 用于初始化 clone 和 remote，custom tools 通过 MCP proxy 从 vault 取 credentials，harness 本身也不感知凭证。[来源](https://www.anthropic.com/engineering/managed-agents)

还有一个漂亮的抽象：session 不是 Claude 的 context window，而是外部的 durable context object。Claude 不需要一次性吞下全部历史，而可以通过 `getEvents()` 读取事件流的切片、回看某个动作前后的上下文，harness 再决定如何组织这些内容进入当前 context window。这个设计承认了一件事：未来模型需要什么样的 context engineering，现在没人能完全预测。[来源](https://www.anthropic.com/engineering/managed-agents)

实际收益也不只是架构洁癖。Anthropic 说，brain 和 hands 解耦后，session 不必先等 container clone repo、boot process、fetch events 才能开始推理；用这套架构，p50 TTFT 大约下降 60%，p95 下降超过 90%。[来源](https://www.anthropic.com/engineering/managed-agents)

## 2) 自托管 sandbox 与 MCP tunnels：企业 agent 的边界开始产品化

Claude Blog 随后把这个架构往企业部署方向推进：Claude Managed Agents 现在支持 self-hosted sandboxes 和 MCP tunnels。前者让 agent 的工具执行环境运行在企业自己控制的 infrastructure，或 Cloudflare、Daytona、Modal、Vercel 这类 managed sandbox providers 上；后者让 agent 连接企业 private MCP servers，而不用把内部服务暴露到公网。[来源](https://claude.com/blog/claude-managed-agents-updates)

这组能力的产品含义很直接：orchestration、context management、error recovery 仍由 Anthropic 侧的 agent loop 处理，但代码执行、文件、内部服务、network policy、audit logging、runtime image、resource sizing 都留在企业边界内。对于长 build、image generation、内部数据库查询、私有 API 调用，这比“把所有东西传给 SaaS agent”更接近企业能接受的形态。[来源](https://claude.com/blog/claude-managed-agents-updates)

MCP tunnels 的设计也很务实：企业部署一个轻量 gateway，主动向外建立连接，不需要 inbound firewall rules，也不需要 public endpoints，流量端到端加密。Anthropic 说 MCP tunnels 支持 Managed Agents 和 Messages API，并由组织管理员在 Claude Console 的 workspace settings 里管理。[来源](https://claude.com/blog/claude-managed-agents-updates)

这和 Vercel CEO Guillermo Rauch 的信号可以放在一起看。Rauch 今天提到 “20x larger functions on Vercel”，并说 “You can deploy anything and everything to Vercel. More tomorrow”。[来源](https://x.com/rauchg/status/2071716510389662153) [来源](https://x.com/rauchg/status/2071718135799927224) 对 agent 来说，serverless function、sandbox、build、long-running execution 的界线会越来越薄。模型负责计划，但真正让计划落地的，是可隔离、可扩展、可审计的执行环境。

## 3) Claude Code 与 Codex 的同一天教训：agent 的“聪明”会被 harness 细节吃掉

Anthropic 另一篇工程复盘解释了近期 Claude Code 质量报告的根因：不是 API 或 inference layer 退化，而是 Claude Code、Claude Agent SDK、Claude Cowork 的三组产品层变更叠加。三类问题都在 April 20 的 v2.1.116 解决，Anthropic 还在 April 23 为所有 subscribers 重置 usage limits。[来源](https://www.anthropic.com/engineering/april-23-postmortem)

第一类是 reasoning effort 的默认值：March 4，Claude Code 为降低高 effort 带来的长延迟，把默认 reasoning effort 从 high 改成 medium；后来发现这是错误 tradeoff，April 7 回滚，因为用户宁愿默认更高 intelligence，再对简单任务手动降低 effort。第二类是 March 26 的 stale session 优化：原本只想在 idle 超过一小时后清掉旧 thinking，减少恢复时延，但 bug 导致后续每一轮都持续清理 thinking blocks，让 Claude 表现得健忘、重复，并造成 prompt cache misses 和 usage limits 消耗异常；这个 bug 在 April 10 修复。第三类是 April 16 的 system prompt 限制：“Length limits: keep text between tool calls to ≤25 words. Keep final responses to ≤100 words unless the task requires more detail.” 更广 eval 后发现对 Opus 4.6 和 4.7 都有 3% drop，于 April 20 回滚。[来源](https://www.anthropic.com/engineering/april-23-postmortem)

这里的教训很尖锐：agent 产品的质量不是只由 model weights 决定，默认 effort、thinking retention、prompt wording、cache strategy、eval coverage 都能改变用户体感。Peter Yang 今天也从使用侧说了一个相近观察：写作和编辑时，plain vanilla Claude web 仍然比 Codex 和 Claude Code 更好；他的猜测是 coding agent 的 system prompts 里有东西让它们写作变差。[来源](https://x.com/petergyang/status/2071731343390851519)

OpenAI Codex 侧也有一条相似的成本复盘。Thibault Sottiaux 说 Codex usage limits 会再次完全 reset，并额外给用户 24 小时内可用的一次 reset；调查发现没有单一中心问题，而是 auto-review 变得更主动、某个变更触发更多 subagent work、background suggestions 可能重复运行或失败后过度 retry。OpenAI 回滚相关变化，修复 suggestion scheduling、duplicate generation 和 retry behavior；usage reporting 也修正为 auto-review 单独归类，只有成功请求计入 turn graphs，rate-limited requests 之前没有收费但显示错误。[来源](https://x.com/thsottiaux/status/2071740419030053227)

同一个方向上，Codex 还在收紧权限边界。Thibault 提到，他们给 advanced Codex users 推出 coarse sandbox modes 的替代方案：可复用、可继承的 permission profiles，把 OS-enforced file read/write/deny rules，包括 `**/*.env`，和 per-domain network、Unix sockets 绑定起来，并支持 fail-closed admin allowlists。关键词是“least privilege per task”。[来源](https://x.com/thsottiaux/status/2071636285807059315)

Boris Cherny 则透露 Claude Code 下一版会让 subagents 默认在后台运行，用户可以在 subagents 工作时继续和 Claude 对话；如果想让 agent 前台运行，直接告诉 Claude 即可。[来源](https://x.com/bcherny/status/2071647677591466098) 这听起来是交互细节，但背后仍是同一个主题：长期 agent 需要并发、可中断、可观察，也需要用户能理解“谁正在替我花 token 和改文件”。

## 4) Open weights 之争：如果第二名足够近，价值会流向 infra

今天关于 open weights 的讨论，比通常的“开源好不好”更接近商业本质。Box CEO Aaron Levie 说，AI 的核心辩论之一取决于一个判断：如果 closed stack 永远大幅领先 frontier，那么 vertical integration 和 gatekeeping 在美国可以成立，因为大家总会追逐最强技术；但如果 open weights 能长期接近 frontier intelligence，那么等式会反过来。在高度监管的路径下，frontier market 仍归你，但绝大多数 tokens 可能流向另一套 stack，那套 stack 包括模型和运行它的底层硬件，并由别人控制和变现。[来源](https://x.com/levie/status/2071775583072375214)

Madhu Guru 的角度更偏 cloud infra。他认为，GLM 这类强 open-weight models 的崛起反而会强化 Google 的位置，因为更多公司会开始实验 fine-tuning open-weight models，而价值会 accrue to the infra。企业想要的是在 managed platform 上运行和微调 open models，同时有 enterprise-grade reliability、security、support；他还提醒，Google 拥有 compute stack 的很大部分。[来源](https://x.com/realmadhuguru/status/2071637885154148785)

这两条合在一起，指向一个现实：open weights 如果足够接近 frontier，模型本身可能更像入口，长期利润会流向 cloud、hardware、deployment、fine-tuning、security、governance 和 workflow layer。也就是说，AI stack 的控制权争夺，不只是“谁发布最强模型”，而是谁承接最多真实 token 流量，并把它变成可靠基础设施。

## 5) Intel、TeraFab 与 AI 供应链：agent 的尽头仍然是电力、内存和晶圆

No Priors 这一期请到 Intel CEO Lip-Bu Tan。他把 Intel 的问题讲得很朴素：先“crawl and be humble”，听客户，强化 balance sheet，简化 product line，再推进下一代 leadership products。上任后，他让所有 engineering 向自己汇报，目的不是管理姿态，而是直接弄清楚“what went wrong”，并重新把产品、roadmap、客户需求连起来。[来源](https://www.youtube.com/watch?v=asCgCv2XB4s)

对 AI 来说，最有意思的是他对 CPU 需求的判断。Tan 说，agentic AI 和 inference 让 CPU 需求变高；训练时代 CPU:GPU 可能是 1:8，但 inference 和 agent orchestration 里，这个比例可能走向 1:4，甚至 1:1。他提到一些 AI model developers 反馈，在 reinforcement learning、协调多个 agents 的速度上，CPU 实际上更好。[来源](https://www.youtube.com/watch?v=asCgCv2XB4s)

Foundry 业务部分，他反复强调这是 service business 和 trust business：要有正确 IP，特别是移动场景需要 low power IP；要盯 yield、defect density、cycle time，保证客户下单后可以稳定、高质量交付。更远一步，客户甚至会要求“give me the whole rack”，所以 Intel 最终不能只做 silicon，还要进入更 full-stack 的系统能力。[来源](https://www.youtube.com/watch?v=asCgCv2XB4s)

他也谈到与 Elon Musk 的 TeraFab 协作：Musk 想建自己的 fab，Intel 则希望用自己的 technology 和 process 帮他更快进入 production。Tan 认为他们共享一个判断：semiconductor infrastructure 没有跟上 AI growth，需要更多 capacity、productivity 和 efficiency。[来源](https://www.youtube.com/watch?v=asCgCv2XB4s)

AI 增长的瓶颈在 Tan 口中也很具体：power constraint 是大家都知道的；helium 对 semiconductor 的影响被很多人低估；memory 正在短缺，而扩产 fab 需要几年；CPU、GPU 也会高度紧缺，成本最终会传导给客户。他还提到 advanced packaging 正成为 bottleneck，并关注 glass、artificial diamond、gallium nitride、silicon carbide、indium phosphide 等新材料。[来源](https://www.youtube.com/watch?v=asCgCv2XB4s)

这和 Garry Tan 的一句 “Build power and datacenters” 很配。[来源](https://x.com/garrytan/status/2071600933210100074) AI agent 的产品叙事可以很轻，但执行成本很重；所有长任务、并发 subagents、browser use、sandbox builds、private MCP calls，最终都会落在 power、data centers、memory、packaging、CPU/GPU supply 上。

## 6) 建造者手感：写作、阅读时间与移动中的创作

今天也有几条更“人”的 builder 信号。Thariq 描述了他现在的写作流程：先做一些 engineering work，和很多人聊，用 Claude brainstorm 和 research，写一版，做一两场 talk，再重写文章、重写 intro，早上 6 点醒来再改一遍，然后发布。[来源](https://x.com/trq212/status/2071787401475960892) 这不是把写作交给 AI，而是把 AI 放进一个反复压缩判断、表达和反馈的循环里。

Zara Zhang 则做了一个很小但很实用的 Chrome extension：把 “read later” 列表变成 Google Calendar 上的专门阅读时间。保存 5 篇文章后，它会自动预定一个 30 分钟 reading block，并带上链接；没有账号、没有 server，全部 local，且 open source。[来源](https://x.com/zarazhangrui/status/2071766827345285411) 她还补了代码链接。[来源](https://x.com/zarazhangrui/status/2071766865245012255)

Zara 另一条关于写作的判断也值得记下：她引用 Anthropic 一位 PM 的说法，“The market value of writing has gone way up”；原因是好写作和清晰表达同时影响产品构建，也就是能否有效 steer models，以及 audience building。她认为 writing well 在 tech 里长期被低估，现在该改变了。[来源](https://x.com/zarazhangrui/status/2071670108033073365)

Cursor 设计师 Ryo Lu 的两条短帖也指向产品形态变化：ideas 命中时，桌子和笔记本都可以不是必需品；并给出了 app 下载链接。[来源](https://x.com/ryolu_/status/2071652629890088964) [来源](https://x.com/ryolu_/status/2071655130152493297) 这类信号不适合过度解读，但它和今天的主线并不矛盾：AI 工具正在从固定工位里的 IDE，扩展到移动场景、阅读时间、写作循环和更碎片化的执行界面。

## 简短结语

今天最值得记住的不是某个模型又强了一点，而是 agent 的生产化正在把一堆原本被产品 demo 掩盖的问题摊开：session 不能丢，sandbox 不能碰 token，subagent 不能暗中烧预算，system prompt 不能随便改，企业内网不能暴露公网，open weights 的 token 流量会流向 infra，算力供应链也不会因为软件叙事变轻。

下一阶段的 AI 产品竞争，会越来越像系统工程：模型只是 brain，真正难的是 hands、memory、permissions、cost accounting、compute substrate，以及支撑这一切的物理世界。

## 原始来源

- [Anthropic Engineering: Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)
- [Claude Blog: New in Claude Managed Agents: self-hosted sandboxes and MCP tunnels](https://claude.com/blog/claude-managed-agents-updates)
- [Anthropic Engineering: An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem)
- [No Priors: Re-engineering the Semiconductor Supply Chain with Intel CEO Lip-Bu Tan](https://www.youtube.com/watch?v=asCgCv2XB4s)
- [Boris Cherny on X: Claude Code subagents run in the background by default](https://x.com/bcherny/status/2071647677591466098)
- [Thibault Sottiaux on X: Codex usage limits reset and usage accounting fixes](https://x.com/thsottiaux/status/2071740419030053227)
- [Thibault Sottiaux on X: Codex permission profiles and least privilege per task](https://x.com/thsottiaux/status/2071636285807059315)
- [Peter Yang on X: Claude web still best for writing and editing](https://x.com/petergyang/status/2071731343390851519)
- [Madhu Guru on X: open-weight models strengthen Google Cloud infra](https://x.com/realmadhuguru/status/2071637885154148785)
- [Guillermo Rauch on X: 20x larger functions on Vercel](https://x.com/rauchg/status/2071716510389662153)
- [Guillermo Rauch on X: deploy anything and everything to Vercel](https://x.com/rauchg/status/2071718135799927224)
- [Aaron Levie on X: closed stack, open weights, regulation and token flow](https://x.com/levie/status/2071775583072375214)
- [Garry Tan on X: Build power and datacenters](https://x.com/garrytan/status/2071600933210100074)
- [Thariq on X: writing process with Claude](https://x.com/trq212/status/2071787401475960892)
- [Zara Zhang on X: read-later calendar Chrome extension](https://x.com/zarazhangrui/status/2071766827345285411)
- [Zara Zhang on X: extension code link](https://x.com/zarazhangrui/status/2071766865245012255)
- [Zara Zhang on X: market value of writing has gone up](https://x.com/zarazhangrui/status/2071670108033073365)
- [Ryo Lu on X: wherever ideas hit](https://x.com/ryolu_/status/2071652629890088964)
- [Ryo Lu on X: app download link](https://x.com/ryolu_/status/2071655130152493297)

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
