---
title: 2026-06-10｜给 Agent 配上守夜人
date: 2026-06-10
---

# 2026-06-10｜给 Agent 配上守夜人

今天的 builders 信号不算分散，主线很清楚：Agent 正从“能不能做事”进入“做事之后谁负责”的阶段。

一边是 coding agent 的 benchmark 开始从“测试能过”转向“代码能不能被 maintainer 合并”；另一边是企业开始意识到，权限、审计、DLP 这些传统安全部件并不能理解一个 agent 为什么要删除数据库、发布代码或调用某个 API。与此同时，Apple 生态里的 on-device model 与 Claude 这样的 cloud model 开始形成分工，NotebookLM 也在把个人资料库外的搜索和结构化输出接进研究流。

换句话说，AI 工具的下一层价值不再只是 raw intelligence，而是 context、rubric、guardrail、handoff 和 workflow。

## 1) Coding Agent 的新门槛：不是 pass tests，而是 maintainable code

Swyx 转发并解读了 METR / Cognition 的 FrontierCode：他称 METR 发现超过一半的 SWE-bench 结果是 “unmergeable slop”，而 FrontierCode 代表了 1000+ 小时由 maintainer 验证的软件工程工作，配有 3000+ rubrics，专门覆盖 code quality 与防止 benchmark reward hacking 的问题。[来源](https://x.com/swyx/status/2064081945567580323)

这条信号重要，不只是因为又多了一个 benchmark，而是评价对象变了。Swyx 把三代 AI coding benchmark 概括为：2021 年的 autocomplete 对应 HumanEval，2023 年的 passing tests 对应 SWE-bench / TerminalBench，2026 年则进入 maintainable code，对应 FrontierCode。[来源](https://x.com/swyx/status/2064081945567580323)

他还提到，FrontierCode Diamond 很难，Opus 4.8 得分为 13.8%；但在 FrontierCode Extended 中最容易的三分之一任务，Opus 在 4 个月里从 41% pass rate 跳到 74%。这解释了很多 builders 最近感受到的 “WTF happened in Dec 2025” 式能力跃迁：当模型从两次 reroll 才能接近成功，变成六次 reroll 内稳定推进时，更高层的 agentic coding loop 才真的可用。[来源](https://x.com/swyx/status/2064081945567580323)

结论很直接：coding agent 的竞争正在离开“能不能生成代码”的浅水区，进入“能不能留下可维护资产”的深水区。测试通过只是入场券，rubric、review、anti-cheat 和 maintainer judgment 才是下一阶段的真实地面。

## 2) 企业不缺 Agent，缺的是能看懂 Agent 的守夜人

No Priors 这一期请到 Onyx Security CEO Maxim Bar Kogan，主题是给企业里的 AI agents 做安全控制。Bar Kogan 的判断非常硬：随着 AI action 的数量指数级增长，human-in-the-loop 不可能继续成立；企业也没法阻止 agent adoption，只能降低 agent 做出 illegitimate 或 incorrect action 的概率。[来源](https://www.youtube.com/watch?v=QDsbFLEt9ro)

他把今天企业里的 AI deployment 粗分成三类：低代码 SaaS 自动化、企业自己在 cloud 里构建的一方 agents，以及高度自主的 coding agents / assistants。在 Onyx 看到的典型企业里，超过 50% 是 autonomous coding agents and assistants，约 45% 是 low-code automations，真正的一方自建 agents 只有约 2%。也就是说，最先大规模进入企业的不是“完美设计过的内部 agent 平台”，而是开发者和知识工作者已经开始使用的自主工具。[来源](https://www.youtube.com/watch?v=QDsbFLEt9ro)

传统安全工具在这里会失灵。身份系统能限制权限，但 coding agent 往往需要继承人的权限才能完成复杂任务；endpoint 或 API security 能看到动作，却看不见 agent 的意图。Bar Kogan 举了一个很具体的例子：如果你要求 Claude Code 删除并重建数据库，那可能是高价值自动化；但如果它在无关任务里突然决定这么做，那就是事故。区别不在 API call 本身，而在“它为什么这么做”。[来源](https://www.youtube.com/watch?v=QDsbFLEt9ro)

Onyx 的路线是训练模型和构建 agents 去监督其他 agents，并把它产品化为 secure AI control plane。关键不是简单 proxy，也不是给每个 agent 配一个同等昂贵的大 agent 做全程复核，因为成本和延迟都会爆炸。更实际的做法是训练小模型做一件窄任务：判断“这个时刻是否应该让更聪明的 agent 介入”。Bar Kogan 的原话很有画面感：这些小模型几乎不需要聪明，只要会判断 “should I have a smarter agent look at this?”[来源](https://www.youtube.com/watch?v=QDsbFLEt9ro)

这像是在 agent 世界里做一套风险分诊系统：大多数低风险动作快速通过，少数关键动作交给更强推理。未来企业 AI 安全的核心，很可能不是把 agent 关进笼子，而是让它在关键节点被另一个系统看见、理解、拦住或放行。

## 3) Context 仍然是护城河，模型越通用越需要被定向

Aaron Levie 今天给了一个很好的反共识提醒：没有任何塞进模型里的 intelligence 能替代 context。只要同一个通用模型同时服务律师、工程师、金融分析师和医疗专业人士，而用户又想做具体、差异化的事情，instructions、domain context 和 proprietary data 就必须进入 context window，模型才有用。[来源](https://x.com/levie/status/2064186766907887941)

这句话和 Onyx 的安全问题其实是一体两面。Agent 要做正确的事，需要知道任务背景；安全系统要判断它做得对不对，也需要理解背景。raw model intelligence 解决的是“它有没有能力”，context 解决的是“它是否朝正确方向用能力”。[来源](https://x.com/levie/status/2064186766907887941)

Levie 的另一个判断是，AI automation 不会免费出现。组织必须投入真实工作，把领域知识、流程、数据和指令喂给系统，才能换来真实价值。这也是 applied AI layer 仍有价值的原因：任何能让用户更快进入正确 context、更少从裸模型开始摸索的抽象层，都会继续存在。[来源](https://x.com/levie/status/2064186766907887941)

## 4) Claude 接入 Apple Foundation Models：端侧快跑，云端接力

Claude Blog 发布了面向 Apple platforms 的 Foundation Models framework 支持：Anthropic 提供新的 Swift package，让 Apple 开发者可以通过 Apple 的 Foundation Models framework 调用 Claude，处理更复杂的 workflow。[来源](https://claude.com/blog/claude-for-foundation-models)

这件事的关键不是“Claude 上了 Apple”，而是 model handoff 的形态更清楚了。Apple 的 Foundation Models framework 适合从 Swift 原生调用 on-device models，处理快速、本地的 summarization 或 extraction；当请求需要 multi-step reasoning、code generation、web search 或 code execution for data analysis 时，再交给 Claude。[来源](https://claude.com/blog/claude-for-foundation-models)

更值得注意的是 typed interface。Claude Blog 提到，Apple framework 可以通过 `@Generable` annotations 返回 typed Swift values，因此开发者传给 Claude API 的不是粗糙 user text，而是更干净的结构化输入；Claude 的响应也能 stream 回同一个 SwiftUI view，并支持 tool calls 与 structured responses。[来源](https://claude.com/blog/claude-for-foundation-models)

这就是 applied AI 的现实方向：不是一个模型包打一切，而是本地模型做低延迟、隐私友好、结构化的第一步，云端 frontier model 做复杂推理和工具调用。对开发者来说，真正的产品体验会藏在 handoff 质量里。

## 5) 研究与工作流产品正在从资料库走向输出物

Google / Google Labs 的 Josh Woodward 提到 NotebookLM 的新能力：用户可以把搜索扩展到自己的 source files 之外，并且生成新的输出格式，包括 PDFs、DOCX、XLSX、PPTX、charts 等。[来源](https://x.com/joshwoodward/status/2064046368352825492)

这说明 research assistant 的边界正在移动。早期 NotebookLM 的核心是“围绕我的资料库问答”；现在更像是“以我的资料库为起点，向外搜索，再生成可交付产物”。资料输入、搜索扩展和输出格式开始连成一个完整 workflow。[来源](https://x.com/joshwoodward/status/2064046368352825492)

Peter Yang 也从使用端观察到另一个趋势：ChatGPT / Codex 正在合并 coding、knowledge work、basic Q&A 等能力，并且应该能从任意设备进入；他还追问 Google 对 Codex 与 Claude Code 的对应产品会是什么，Antigravity 是否应该成为 Gemini 的一部分。[来源](https://x.com/petergyang/status/2064187731685831081)

这种“everything app”压力也体现在移动端。他分享了如何把 Codex 加到 iPhone Home Screen，并吐槽 everything app 不该需要 9 步才能打开；Boris Cherny 则提到 Claude Code GA 一年后，自己已经更多使用 auto mode 而非 plan mode，routines 会在他看到 bug 前修 bug，甚至大部分 coding 都从手机完成。[来源](https://x.com/petergyang/status/2064204735671124073) [来源](https://x.com/bcherny/status/2064034799711588805)

当 coding agent 进入手机和 daily routine，它就不再只是 IDE 插件，而是在争夺“随时发起工作”的入口。

## 6) Loop 文化继续扩散，但最后一公里仍然硬

OpenAI Codex / ChatGPT 团队的 Thibault Sottiaux 问 “Anyone writing nested loops yet?” 又展示了一个 Codex controller 的想法，并补了一句 “the codex dial goes to 11”。这些动态本身不提供完整产品细节，但它们说明 builder 社区仍在围绕 agent loops、控制器和调参界面寻找新的操作手感。[来源](https://x.com/thsottiaux/status/2064226958494572727) [来源](https://x.com/thsottiaux/status/2064224657822413137) [来源](https://x.com/thsottiaux/status/2064224790672769307)

Nikunj Kothari 对 autonomous companies 的判断更克制：最近几个月看到很多“autonomous”公司出现，即使有各种 loops，last mile 仍然很难；但这个 gap 可能会在接下来几个月缩小。[来源](https://x.com/nikunj/status/2063981835290562692)

Peter Yang 则指出一个现实分层：使用每月 200 美元补贴订阅的 AI builders，和在公司里努力避免 API cost 超支的员工，已经形成了完全不同的 best practices。[来源](https://x.com/petergyang/status/2064063499517743417)

这提醒我们，不要把 Twitter 上的 frontier workflow 直接等同于企业可复制流程。个人 builder 可以猛拉 token、开 auto mode、叠 nested loops；企业用户还要面对预算、审计、权限、数据边界和 ROI。这也是为什么前面的 secure control plane、context layer、model handoff 会变得重要。

## 7) 小信号：新的工作材料栈正在变轻

Zara Zhang 说，她觉得新的世界可能是 Markdown、HTML、SVG，并特别强调 SVG 被低估了。[来源](https://x.com/zarazhangrui/status/2064108976565092706)

这条看似轻，但和 AI-native 工具链很贴合：Markdown 负责语义和可编辑性，HTML 负责表达和分发，SVG 负责可组合的视觉结构。AI 越擅长生成和修改文本化 artifact，越会把工作材料推向可读、可 diff、可组合的格式。[来源](https://x.com/zarazhangrui/status/2064108976565092706)

她还转发一句很有共鸣的话：“I am the programming equivalent of a home cook”。这可能正是 AI coding 普及后的长期状态：更多人不会变成职业软件工程师，但会像 home cook 一样，能为自己的生活和工作做出足够好、足够贴身的小工具。[来源](https://x.com/zarazhangrui/status/2064101916725096810)

## 简短结语

今天最值得记住的不是某个单点发布，而是 Agent 产品正在补齐“责任系统”。

FrontierCode 把 coding agent 的评价拉到 maintainable code；Onyx 代表企业开始为 autonomous actions 建 guardrail；Aaron Levie 提醒 context 不会被 intelligence 消灭；Claude 与 Apple Foundation Models 的合作展示了本地模型和云端模型的接力方式；NotebookLM、Codex、Claude Code 则在把 AI 工作入口从 IDE 扩展到研究流和手机。

下一阶段真正稀缺的，不只是更聪明的模型，而是更会判断何时该用模型、给模型什么 context、怎样验证结果、以及什么时候必须让守夜人介入的系统。

## 原始来源

- [Swyx on X: FrontierCode, maintainable code, and benchmark eras](https://x.com/swyx/status/2064081945567580323)
- [No Priors: Building an AI Guardian for Enterprise with Onyx Security CEO Maxim Bar Kogan](https://www.youtube.com/watch?v=QDsbFLEt9ro)
- [Aaron Levie on X: intelligence does not replace context](https://x.com/levie/status/2064186766907887941)
- [Claude Blog: Building intelligent apps for Apple platforms with Claude in the Foundation Models framework](https://claude.com/blog/claude-for-foundation-models)
- [Josh Woodward on X: NotebookLM expands search and output formats](https://x.com/joshwoodward/status/2064046368352825492)
- [Peter Yang on X: Google equivalent of Codex and Claude Code](https://x.com/petergyang/status/2064187731685831081)
- [Peter Yang on X: Codex on iPhone Home Screen](https://x.com/petergyang/status/2064204735671124073)
- [Boris Cherny on X: Claude Code one year after GA](https://x.com/bcherny/status/2064034799711588805)
- [Thibault Sottiaux on X: nested loops](https://x.com/thsottiaux/status/2064226958494572727)
- [Thibault Sottiaux on X: Codex controller](https://x.com/thsottiaux/status/2064224657822413137)
- [Thibault Sottiaux on X: Codex dial goes to 11](https://x.com/thsottiaux/status/2064224790672769307)
- [Nikunj Kothari on X: autonomous companies and the last mile](https://x.com/nikunj/status/2063981835290562692)
- [Peter Yang on X: subsidized subscriptions vs enterprise API costs](https://x.com/petergyang/status/2064063499517743417)
- [Zara Zhang on X: Markdown, HTML, SVG](https://x.com/zarazhangrui/status/2064108976565092706)
- [Zara Zhang on X: programming as home cooking](https://x.com/zarazhangrui/status/2064101916725096810)

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
