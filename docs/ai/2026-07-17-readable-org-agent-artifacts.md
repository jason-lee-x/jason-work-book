---
title: 2026-07-17｜会读公司的 Agent，和会留下痕迹的工作
date: 2026-07-17
---

今天的信号很集中：AI 产品正在从「模型替人做一个动作」走向「组织能不能被 agent 读懂，工作能不能被团队接住」。这不是一句抽象的 enterprise 口号。它落在 CLAUDE.md、skills、artifact、public channel、permissions、sandbox、workflow budget、Web Analytics API、pre-meeting brief 这些很具体的接口上。

换句话说，下一批好产品未必是更会聊天的 AI，而是更会把上下文、权限、执行痕迹和团队知识变成基础设施的系统。

## 1. 把团队知识写进基础设施，而不是写进人的脑子

Boris Cherny 给了今天最硬的一条工程判断：过去最强的工程师会用 vim/emacs 自动化、lint rule、e2e tests 来放大自己；现在这些自动化更重要，因为你不是只加速自己，而是在加速一支 agent army。他的核心观点是，agent 每次临场修一个问题会消耗 token，也可能漏掉边界；如果把这类问题写成 lint rule、CI step、routine、CLAUDE.md、REVIEW.md、skills、docs 或 memory，就能把一类忙活永久压平。来源：[Boris Cherny on X](https://x.com/bcherny/status/2077460395279692197)

这句话真正锋利的地方在后半段：如果一个不熟 iOS codebase 的人提交 PR，被 reviewer 打回是因为没用对 framework；或者 designer 做了功能，被打回是因为不符合 architecture pattern，这在 Boris 看来是 automation failure。也就是说，团队知识不应该继续以「老人知道」的形式存在，而应该变成 agent 和新人都能读的工程材料。来源：[Boris Cherny on X](https://x.com/bcherny/status/2077460395279692197)

Thariq 把这个工作流压成了一个更短的公式：「thin prompts，thick artifacts + context，thin skills」。这很像今天 agent 协作的实际经验：prompt 不要承担全部智慧，真正应该厚的是任务产物和上下文；skill 则应该保持可迁移、可组合。来源：[Thariq on X](https://x.com/trq212/status/2077539537992229076)

Garry Tan 也从另一个角度补了一刀：skill files 是 portable 的，能让团队少依赖某一个 frontier model。这不是说模型不重要，而是把工作方法沉淀成文件之后，团队至少有一部分能力可以跨模型、跨 harness 迁移。来源：[Garry Tan on X](https://x.com/garrytan/status/2077626565517590618)

## 2. Claude Code Artifacts 把 agent 的工作痕迹变成团队界面

Claude Blog 今日进入 feed 的文章是 Claude Code artifacts。它的核心不是「生成一个漂亮页面」，而是把 Claude Code session 的调查、重构、分析过程转成 live、shareable visual pages，例如 PR walkthrough、system explainer、dashboard、release checklist，并且这些页面会随着 session 更新。来源：[Claude Blog｜Claude Code now supports artifacts](https://claude.com/blog/artifacts-in-claude-code)

这和上面的「thick artifacts」正好咬上。Claude 的说法是，artifact 会使用 session 的完整上下文，包括 codebase、connectors 和 conversation；一个 incident page 可以把 failing test、相关函数、monitoring error spike、root-cause reasoning 放到同一个页面里。它还支持同一 URL 下的版本更新、version history、gallery 管理。来源：[Claude Blog｜Claude Code now supports artifacts](https://claude.com/blog/artifacts-in-claude-code)

最值得注意的是协作边界：Claude Blog 说 artifacts 默认只对作者私有，分享后也只对组织内认证成员可见，不能公开；管理员可以通过 org-level toggle、role-based scoping、retention policies 和 compliance API 管理。这说明 agent 输出正在进入公司治理层，而不只是个人效率工具层。来源：[Claude Blog｜Claude Code now supports artifacts](https://claude.com/blog/artifacts-in-claude-code)

## 3. Enterprise agent 的难点不是买模型，而是重做组织接口

Aaron Levie 参加企业 IT 负责人 dinner 后列出了一组很现实的 adoption 信号：change management 仍是最大问题之一，流程需要升级到适合 agent 的 modern operating model；企业也在强调把 structured 和 unstructured data 放进 agent 能工作的 setup。来源：[Aaron Levie on X](https://x.com/levie/status/2077526010753581156)

更具体的是组织配置：一些 IT team 开始把完整工程师嵌入业务职能，类似 internal FDE，因为 agent 落地需要大量技术工作；这能把原本几个月或几个季度失败的试验压缩掉。Levie 的判断是，技术职能会变得比以往更中心，因为自动化不再只影响 ERP 这类局部系统，而是会触到整个 knowledge work。来源：[Aaron Levie on X](https://x.com/levie/status/2077526010753581156)

权限和数据建模是另一道硬墙。Levie 提到，跨职能 workflow 不是单个用户权限能覆盖的，agentic systems 可能需要自己的角色和 privileges；但 agent 不能天然保证安全，所以这不是一个轻松的授权问题。预算也已经出现分层：有公司给 developer 每月 1,000 美元，也有更高的 5,000 美元 threshold 只是触发通知而非阻断，但 non-coding work 的预算目前小得多。来源：[Aaron Levie on X](https://x.com/levie/status/2077526010753581156)

他还提到两个产品后果。第一，更多公司在做 multimodel systems，用 frontier model 做 orchestrator，再把低成本或 tuned models 用在 workhorse tasks；open weights 很有热度，但仍偏实验。第二，enterprise software 未来必须 headless，员工不应该再被迫学习数百个应用；传统 vendor 如果在技术或成本上不愿意友好服务 agent，会遇到明确警告。来源：[Aaron Levie on X](https://x.com/levie/status/2077526010753581156)、[Aaron Levie on X](https://x.com/levie/status/2077471148699439152)

Zara Zhang 的观察更像一条组织设计原则：如果想让 agent 真正在公司内工作，就得把公司设计成 agent 可以读懂的样子。她举的 Shopify 例子是，一个没有 private chat 功能、只存在 public channels 的 agent，副作用是带来了 peer learning。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2077417579837309040)

## 4. Codex 和 ChatGPT 的合并，暴露了 agent 产品的安全与入口问题

OpenAI 的 Thibault Sottiaux 说，Codex plus 和 pro 已经几天没有 5h limit，并在询问用户是否更好，还是更难管理 weekly limit。这是一个很产品的细节：当 AI coding 从玩具变成日常工具，限制方式会直接影响人如何分配深度任务。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2077632589498913087)

同一时间，他也公开解释了 GPT-5.6 意外删除文件的少数报告：常见触发条件包括 full access mode、没有 sandboxing protections、没有 auto review，以及模型试图覆盖 `$HOME` 环境变量来定义临时目录，却误删 `$HOME`。OpenAI 正在更新 developer message、引导用户使用更安全的 permission modes，并增加 harness safeguards，后续还会发 post-mortem。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2077630111499882637)

这条并不只是事故说明，它指出了 agent 产品的基本矛盾：越想让 agent 真正有用，就越要给它文件、shell、浏览器、权限和长任务能力；但能力越完整，harness、sandbox、review 和权限设计就越不能含糊。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2077630111499882637)

Peter Yang 则从产品入口角度指出了另一个断点：ChatGPT Live 和 Codex 都很强，但彼此不说话。他说自己散步时用 ChatGPT Live 想调出 Google Doc，Live 做不到；但手动触发 Documents plugin 后，Live 又突然有了正确上下文。他认为真正有用的形态是，Live 能使用 Codex 可访问的 plugins、tools 和 browser use，在实时对话中回邮件、排会议、改文档、写代码。来源：[Peter Yang on X](https://x.com/petergyang/status/2077572198655754583)

Thibault 还顺手问了一句：「Now that we merged ChatGPT and Codex, what should we merge next?」这像玩笑，但方向很清楚：voice、chat、coding agent、plugins、browser、documents 的边界正在被重新画。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2077627035418239230)

## 5. 应用层的机会：不是 meeting notes，而是工作界面本身

Every 的 AI & I 访谈里，Granola CEO Chris Pedregal 对竞争的态度很有意思。他说「Meeting notes are not the end all, be all value that everyone's running after」，真正的大机会是 AI-native world 里「我们用什么 interface 工作，以及我们如何工作」。他还说现在只是 computing revolution 的早期，今天大家争的东西未必重要。来源：[AI & I by Every｜The Founder of a $1.5B AI Company on What Comes After the First Wave of AI Apps](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)

Dan Shipper 对这期内容的转述也给了几个关键点：三家大公司复制了 Granola 的核心功能，但 Pedregal 认为 meeting notes 从来不是最终奖品；Granola 还在做 proactive features，例如提前生成大量 pre-meeting briefs，虽然多数人不会打开，但打开时会有 magical experience；他们也在押注 bring your own agent，并讨论 API 与 MCP 会继续变好。来源：[Dan Shipper on X](https://x.com/danshipper/status/2077410279474770229)

这期里另一个好框架是 Dan 的「pirate and architect」：早期产品需要一个 pirate 快速找到有价值的东西，可以 vibe coded；同时需要 architect 把已经被证明有价值的东西做成可持续、可理解、可扩展的系统。Dan 还说一个优秀 architect 可以借助 Claude 或 Codex 很快 map codebase，识别 structural pillars 和 invariants，再把重写任务交给 Codex。来源：[AI & I by Every](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)

Pedregal 讲 Granola 的产品手感时用了「handrail」比喻：扶手大多数时候不可见，但你绊倒时手会伸出去，它必须刚好在那里，并且 load bearing。这个比喻也解释了为什么 agent 产品不能只看 feature usage rate，有些能力平时低频，却在关键时刻承担信任。来源：[AI & I by Every](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)

## 6. 平台侧的基础设施正在长出 agent 默认能力

Google Labs 的 Josh Woodward 说 Gemini Spark 正在扩展到更多 Ultra subscribers，并带来四项更新：能打开并编辑 Google Docs，能读取 Google Sheets 和 Slides 的 comments，速度提升超过 50%，还能跨多个来源并行处理任务。这个更新的方向很清楚：agent 要进入办公流，必须直接读写原生工作对象，而不是只在聊天框里解释它们。来源：[Josh Woodward on X](https://x.com/joshwoodward/status/2077471111240204457)

Josh 还提到 Google 发布首份 Gemini Southeast Asia Report：过去一年 active users 增加超过一倍，70% 的 prompts 使用本地语言，40% 的 prompts 只使用 voice、image 或 video。这里的重点不是区域市场本身，而是 multimodal 和 native language 已经不是边缘用法，移动端 AI 的自然入口正在偏离纯文本 prompt。来源：[Josh Woodward on X](https://x.com/joshwoodward/status/2077411104775406045)、[Josh Woodward on X](https://x.com/joshwoodward/status/2077411109326221322)

Vercel CEO Guillermo Rauch 报了 Vercel Sandbox 的增长：DAU 以 100% month-over-month 增长，每天创建 350 万以上 sandboxes，并服务 Notion、Airtable、Meta、Zapier、CodeRabbit 等客户。他还提到 Web Analytics API 的 agent 用法，例如让 agent 关联 visitors、purchase、checkout 等 custom events 与 deployments、performance 的演变，或把这些数据和 Stripe、Resend 一起画进自定义前端。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2077559189015335019)、[Guillermo Rauch on X](https://x.com/rauchg/status/2077426190386946539)

Swyx 对 CUA，也就是 computer use automation，给了一个更激进的判断：他认为 GPT-5.6 + Superapp 在 CUA 上已经比他提到的一系列早期工作更好，并说如果真正高强度使用这些东西，会看到 CUA 进展非常快；低估能力是一种危险的 category error。来源：[Swyx on X](https://x.com/swyx/status/2077475285205958771)

## 结语

今天最值得记住的不是某个单点发布，而是一条共同曲线：agent 越接近真实工作，越需要组织可读、权限可控、过程可见、产物可交接。Prompt 会变薄，artifact 和 context 会变厚；chat 会并入 coding、voice、browser 和 documents；enterprise software 会被迫 headless；个人和团队的隐性知识会被写成 skills、docs、rules 和 review harness。

这听起来不像一个更聪明的聊天机器人，更像一套新的工作操作系统正在长出来。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
