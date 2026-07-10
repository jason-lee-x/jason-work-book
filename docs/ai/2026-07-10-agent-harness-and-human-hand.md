---
title: 2026-07-10｜Agent 的骨架、边界与人的手感
date: 2026-07-10
---

今天的 builders 信号不在「又一个模型更强了」，而在更底层的迁移：agent 正在从单机式的聪明工具，变成有 session、有 sandbox、有安全边界、有团队协作关系的系统。

另一条暗线则更人味：当 AI 可以重写内部工具、替代昂贵 SaaS、接管大量单人工作之后，真正稀缺的东西反而是人的判断、手感和团队之间的共享语境。

## 1. Anthropic 把 agent 拆成三件事：brain、hands、session

Anthropic Engineering 写了一篇很硬的架构文，解释 Claude Managed Agents 为什么要把 agent 拆开：brain 是 Claude 和 harness，hands 是 sandbox 与 tools，session 是持久化事件日志。早期把这些东西塞进同一个 container，好处是简单，但坏处是 container 变成「pet」：一旦挂掉，session 会丢；一旦卡住，工程师很难判断是 harness、event stream 还是 container 本身出了问题。来源：[Anthropic Engineering｜Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)

拆开之后，sandbox 变成一种可替换的 tool interface：`execute(name, input) → string`。container 死了，harness 把失败作为 tool-call error 交还给 Claude；如果 Claude 决定重试，就可以按标准 recipe 重新 provision 一个新的环境。harness 自己也不再需要「活着」，因为 session log 在外部，新的 harness 可以通过 `wake(sessionId)` 和 `getSession(id)` 恢复。来源：[Anthropic Engineering｜Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)

这篇文章最重要的产品信号是：session 不等于 context window。长任务会超过模型上下文，而 summary、compaction、trimming 都会做不可逆取舍。Managed Agents 把 session 做成 context window 之外的 durable object，通过 `getEvents()` 让 brain 按位置切片回看事件流。也就是说，未来的 context engineering 可以换，session 这层记录不必换。来源：[Anthropic Engineering｜Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)

工程收益也不是抽象的。Anthropic 说，拆开 brain 和 hands 后，不需要每个 session 一开始就等 container provision；如果暂时不需要 sandbox，inference 可以直接开始。这个架构让 p50 time-to-first-token 下降约 60%，p95 下降超过 90%。来源：[Anthropic Engineering｜Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)

## 2. 企业 agent 的边界：sandbox 留在你的 perimeter 内

Claude Blog 同步给了 Managed Agents 的产品落点：self-hosted sandboxes 进入 public beta，MCP tunnels 是 research preview。核心承诺很清楚：agent loop、orchestration、context management 和 error recovery 仍在 Anthropic 基础设施上，但工具执行可以放到企业自己的 sandbox，或者 Cloudflare、Daytona、Modal、Vercel 这类 managed provider 里。来源：[Claude Blog｜New in Claude Managed Agents: self-hosted sandboxes and MCP tunnels](https://claude.com/blog/claude-managed-agents-updates)

这解决的是企业采用 agent 的老问题：敏感文件、私有 package、内部服务和 network policy 不应该为了让 agent 干活就跑出边界。Claude 的 MCP tunnels 设计也很典型：企业部署一个 lightweight gateway，建立 outbound connection；不需要 inbound firewall rule，不需要 public endpoint，agent 通过 tunnel 访问私有 MCP servers。来源：[Claude Blog｜New in Claude Managed Agents: self-hosted sandboxes and MCP tunnels](https://claude.com/blog/claude-managed-agents-updates)

把这两篇放在一起看，Anthropic 的路线不是「给 Claude 一个更大的浏览器」，而是把 agent 执行层变成可替换、可审计、可隔离的 operating substrate。它承认未来模型和 harness 会变，所以真正要稳定的是接口：session 如何保存，tool 如何调用，credential 如何不进入 generated code 的执行环境。来源：[Anthropic Engineering｜Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)、[Claude Blog｜New in Claude Managed Agents: self-hosted sandboxes and MCP tunnels](https://claude.com/blog/claude-managed-agents-updates)

## 3. Claude Code 的事故复盘：聪明系统也会被 harness 拖坏

另一篇 Anthropic Engineering postmortem 解释了近期 Claude Code / Claude Agent SDK / Claude Cowork 质量报告的根因。最值得注意的不是「bug 修了」，而是这些问题都发生在模型之外：Claude Code 曾把默认 reasoning effort 从 high 调到 medium 以降低延迟，但这被证明是错误 tradeoff；另一个 compaction bug 会在 session 进入 idle threshold 后持续清理 thinking history，导致 Claude 越做越忘自己为什么这样做；还有一条 system prompt 的长度限制曾让部分 eval 出现约 3% drop。来源：[Anthropic Engineering｜An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem)

这给所有 agent builder 一个很直接的提醒：模型能力不是最终用户感受到的能力。reasoning effort、context cache、thinking block、prompt policy、CLI display、message queue，这些产品层和 harness 层的选择，都会把一个强模型变成一个健忘、重复、工具选择奇怪的系统。Anthropic 的后续措施也指向这点：更多内部人员使用 public build、更宽的 per-model eval、prompt change audit、soak periods 和 gradual rollout。来源：[Anthropic Engineering｜An update on recent Claude Code quality reports](https://www.anthropic.com/engineering/april-23-postmortem)

Boris Cherny 今天提到 Claude Code 新增 `/checkup`，可以清理未用的 skills/MCPs/plugins、去重 local CLAUDE.md、拆分 root CLAUDE.md、关闭慢 hooks、更新 Claude Code、默认启用 auto mode，并预批准常被拒绝的 read-only commands；它会在改动前确认。这个功能表面是 housekeeping，实际是在承认：agent 的周边环境会积灰，积灰会吃 context、拖速度、污染行为。来源：[Boris Cherny on X](https://x.com/bcherny/status/2074997570317779038)

## 4. 单人 agent 不够了，团队需要 human-human-agent collaboration

Zara Zhang 今天讲了一个很具体的副作用：一个「super agent-pilled」的 founder 给所有团队成员买了 Codex Max，大家几乎整天和 Codex 说话完成工作；结果是人和人不说话了，会议取消，协作变少，团队文化变差。她的结论是，enterprise AI usage 现在大量是 single-player，但下一步应该从 human-agent collaboration 走向 human-human-agent collaboration。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2075004775436005687)

Cat Wu 提到她会 live walkthrough Claude Code 如何从 single-player 走到 multi-player Claude Tag：Claude Tag 可以 monitor channels、主动替团队做事、让整个团队 steer it，并记住上周被告知的内容。把这条和 Zara 的观察放在一起，问题就清楚了：agent 不能只优化个人 throughput，它也必须成为团队共享状态、共享意图和共享记忆的一部分。来源：[Cat Wu on X](https://x.com/_catwu/status/2074925531519468012)、[Zara Zhang on X](https://x.com/zarazhangrui/status/2075004775436005687)

这也是为什么「artifact」「session log」「channel-aware agent」这些东西会比单纯模型升级更重要。单人效率提升到一定程度后，瓶颈会回到 coordination：谁知道 agent 做了什么，谁能中途改方向，谁对结果负责，团队如何避免每个人都被自己的私人 agent 隔离起来。来源：[Anthropic Engineering｜Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)、[Cat Wu on X](https://x.com/_catwu/status/2074925531519468012)

## 5. 软件经济学继续松动：rewrite、native、vertical work

Thariq 的一句话很适合放进今天的经济学脉络里：软件工程的模型需要更新，rewrites 可以是 good、cheap、fast；当然，不是所有 app 都像 Bun 那样 testable 和 verifiable，但模型会继续补上这些缺口。来源：[Thariq on X](https://x.com/trq212/status/2074993112217461020)

Amjad Masad 则从评价框架上推了一步：什么时候我们停止把 autonomous agents 和 handwritten code 比？你不会看到 compiler 拿自己和手写 assembly 的工程师比较。这个类比的锋利处在于，它把 agent 从「写代码的人类替身」移到「提高抽象层的工具」上。来源：[Amjad Masad on X](https://x.com/amasad/status/2075080984211624154)

Guillermo Rauch 今天给了两个方向：一是「AI will make all software Native」，强调 uncompromising performance 和 platform affinity；二是 Grok 4.5 已面向 Vercel customers 可用。Aaron Levie 也把 Grok 4.5 放进 enterprise AI 语境里，说最新模型在复杂 knowledge worker tasks，尤其 legal、professional services、healthcare 这类 sophisticated domains 上越来越强，并且在 cost + performance 上值得注意。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2075018147330232707)、[Guillermo Rauch on X](https://x.com/rauchg/status/2074920996201796067)、[Aaron Levie on X](https://x.com/levie/status/2075073587015516228)

这里的共同方向不是「大家都去重写一切」，而是 legacy SaaS 和通用工作流的护城河继续变浅：当模型能写、能测、能接企业数据、能在隔离 sandbox 里跑，软件会更容易按组织自身的 workflow 长出来。来源：[Anthropic Engineering｜Scaling Managed Agents: Decoupling the brain from the hands](https://www.anthropic.com/engineering/managed-agents)、[Aaron Levie on X](https://x.com/levie/status/2075073587015516228)

## 6. 反机器感：越自动化，越需要保留人的摩擦

今天最有温度的内容来自 Every 的《AI & I》。受访者一开始就说，自己醒来后不碰 Internet、不看手机，午饭后很久才上线；因为一碰手机就会感到「chemical shift」，无法进入 deep thinking、deep attention 或 deep focus。他也承认 AI 很强，但工作时有一种 dopamine-driven 的 slot machine 感。来源：[AI & I by Every｜How a Writer Uses AI Without Losing His Voice](https://www.youtube.com/watch?v=7ND0lQmLJlA)

他用 AI 的方式也很清楚：不用 AI 写作，而是把它当 research assistant，例如让它找某栋建筑相关的 blog posts、summarize、给 links，然后自己去核对来源和阅读。与此同时，他用 Opus / Claude Code 重建内部工具：newsletter software、membership software、面向会员的 The Good Place，并把一个巨大的 Python 文件 refactor 成 modules。来源：[AI & I by Every｜How a Writer Uses AI Without Losing His Voice](https://www.youtube.com/watch?v=7ND0lQmLJlA)

最有意思的是他对社交产品的反设计：The Good Place 只给会员用，内容一周后消失，每天只能发两条帖、回二十次，没有 algorithm，只是 reverse chron。这里的判断和今天的 agent 主题其实一致：AI 让构建变便宜，但便宜不等于应该无限扩张。一个好系统有时要限制输入、限制频率、保留稀缺性，甚至删除历史。来源：[AI & I by Every｜How a Writer Uses AI Without Losing His Voice](https://www.youtube.com/watch?v=7ND0lQmLJlA)

Swyx 也从表达层面捕捉到同一股反机器感。他说 Theo keynote 的手绘 Excalidraw / tldraw 风格，在一堆「claudeslopped thin color border professional looking slides」里，反而立即传达出 humanity、thoughtfulness 和 concision。Nikunj Kothari 的判断更直接：polished 正在越来越快地和 slop 相关，接下来会出现向 raw and human 的大幅回摆。来源：[Swyx on X](https://x.com/swyx/status/2074953099748450346)、[Nikunj Kothari on X](https://x.com/nikunj/status/2075033190708961675)

## 简短结语

今天最值得带走的判断是：agent 的下一阶段不是更像人，而是更像一个能长期运行的系统，同时更懂得给人留位置。

brain、hands、session 的分离解决可靠性和安全边界；self-hosted sandbox 和 MCP tunnel 解决企业落地；`/checkup` 和 postmortem 提醒我们 harness 本身会塑造模型表现；而 writer、designer、team builder 的这些信号则提醒另一件事：当 AI 降低了建造成本，人类的品味、节制和协作结构会变得更贵。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
