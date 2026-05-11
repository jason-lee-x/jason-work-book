---
title: "2026-05-11｜声音成为界面，记忆回到工程"
date: 2026-05-11
---

# 2026-05-11｜声音成为界面，记忆回到工程

今天的信号不算嘈杂，但很集中：AI 产品正在从“能不能做”进入“怎样长期可靠地做”。一边是 ElevenLabs 把 voice agent 讲成下一代人机界面，另一边是 Anthropic 公开复盘 Claude Code 的质量波动，并继续把 connectors、memory 这些更像基础设施的能力往产品里推进。

更有意思的是，builders 在 X 上聊的不是宏大叙事，而是手感：agent 生成的 markdown 会不会积累 slop，Codex 能不能像后台工人一样完成一批任务，专家在 agent 时代到底还值不值钱。这些碎片拼在一起，像是同一个问题的不同侧面：当 AI 真正进入日常工作流，产品的胜负会越来越取决于上下文、记忆、反馈和人的判断。

## 1. Voice agent 从客服走向“界面”

Training Data 放出了 ElevenLabs 联合创始人 Mati Staniszewski 的访谈，核心判断很直接：voice 会成为很多技术的 primary interface。ElevenLabs 的起点来自一个很具体的痛点：在波兰看外语电影时，所有角色常常被同一个单调旁白覆盖。这个体验让他们相信，未来每个人都应该能用同样的情绪和语调说任何语言。

Mati 提到，ElevenLabs 并不是靠一开始就砸下巨额算力进入 frontier model 竞争。2022 年时，audio 仍被很多人视为小众领域，模型相对更小，关键难题更多在数据转写、标注和架构选择。他们很早就商业化，保持健康的 margin，再把收入投入模型研发。这个路径提醒人：AI 里仍然有一些被低估的 niche，可以从垂直问题切入，再逐步打开边界。

产品层面，ElevenLabs 从 text-to-speech 做起，补上 speech-to-text、翻译、dubbing，再扩展到实时流式 audio、voice agent orchestration，甚至 music。Mati 认为接下来两个“wow moment”会很关键：一是 voice agent 的 emotional intelligence，能理解对方是焦虑、兴奋还是说得很慢，并调整自己的语气；二是更通用的 audio intelligence，让同一个连续声音可以叙述、停顿、甚至唱歌。

应用上，客服只是最显眼的一层。Mati 还提到销售、政府服务、教育、医疗等场景。例如 Deliveroo 用 voice agent 联系餐厅确认营业时间，Deutsche Telekom 让用户通过语音咨询或购买产品；乌克兰政府用 voice agent 作为公民获取前线、安全和教育信息的新渠道；Masterclass 则在做 Gordon Ramsay 或 Chris Voss 这类互动式学习体验。

来源：Training Data, “ElevenLabs' Mati Staniszewski: How Voice Becomes the Interface for Everything”  
https://www.youtube.com/playlist?list=PLOhHNjZItNnMm5tdW61JpnyxeYH5NDDx8

## 2. Claude Code 的复盘：智能不是一个模型参数，而是一整条链路

Anthropic Engineering 公开解释了最近 Claude Code 质量报告背后的三个问题。最重要的点是：API 和 inference layer 没受影响，问题出在产品层和 Claude Code、Claude Agent SDK、Claude Cowork 相关的变更上，且 4 月 20 日 v2.1.116 已解决。

三个问题分别是：3 月 4 日把 Claude Code 默认 reasoning effort 从 high 改成 medium，以降低长延迟，但用户反馈更愿意默认更聪明、简单任务再手动降 effort，因此 4 月 7 日回滚；3 月 26 日一个清理旧 thinking 的优化出现 bug，导致空闲超过一小时的 session 之后每轮都持续丢弃更早 reasoning，让 Claude 显得健忘、重复并做出奇怪工具选择，4 月 10 日修复；4 月 16 日加入减少 verbosity 的 system prompt 指令，与其他 prompt 变更叠加后伤害 coding quality，4 月 20 日回滚。

这篇复盘最值得记的一点，是它把“模型变笨了”拆成了可验证的工程问题：默认 effort、context 管理、prompt 约束、cache 行为、评测覆盖、公开 build 的 dogfooding，都可能改变用户感知到的智能。Anthropic 接下来会让更多内部员工使用准确的 public build，改进 Code Review 工具，并对 Claude Code 的 system prompt 变更增加更广泛的 per-model eval、ablation、soak period 和渐进 rollout。

来源：Anthropic Engineering, “An update on recent Claude Code quality reports”  
https://www.anthropic.com/engineering/april-23-postmortem

## 3. Claude 继续把 agent 的外部世界接进来

Claude Blog 同一天线索很清晰：connectors 和 memory 都在把 Claude 从“聊天窗口”推向“长期工作环境”。

第一篇是生活类 connectors 扩展。Claude 现在可以连接 AllTrails、Audible、Booking.com、Instacart、Intuit Credit Karma、Intuit TurboTax、Resy、Spotify、StubHub、Taskrabbit、Thumbtack、Tripadvisor、Uber、Uber Eats、Viator 等服务。Claude directory 从 2025 年 7 月上线以来已经有 200 多个 connectors，并且用户常常会在同一段对话中串联多个 app，比如从 Amplitude 拉查询、转成 Canva deck，再把链接放进 Asana。

一个产品细节值得注意：Claude 会根据对话动态推荐相关 connector，比如预订、买菜、查航班，不是让用户自己记住有哪些插件。Anthropic 也明确说 Claude 保持 ad-free，没有付费展示或 sponsored answers；连接服务后，app 数据不会用于训练模型，相关 app 也看不到用户其他 Claude 对话；涉及预订或购买前，Claude 设计上会先确认。

来源：Claude Blog, “New connectors in Claude for everyday life”  
https://claude.com/blog/connectors-for-everyday-life

第二篇是 Claude Managed Agents 的 built-in memory，已经进入 public beta。这里的关键不是“有记忆”这个概念本身，而是实现方式：memory 以文件形式挂载到 filesystem 上，agent 可以用 bash 和 code execution 能力管理这些记忆；开发者可以导出、通过 API 管理，并用 scoped permissions、audit logs 和版本回滚控制它们。

案例也很工程化：Netflix 让 agent 跨 session 保留多轮才发现的洞察和人工纠正；Rakuten 的长任务 agent 通过记忆避免重复犯错，first-pass errors 降低 97%；Wisedocs 用 cross-session memory 识别和记住文档验证里的常见问题，验证速度提升 30%；Ando 则用 Managed Agents 捕捉组织内部沟通方式，而不是自己搭 memory 基础设施。

来源：Claude Blog, “Built-in memory for Claude Managed Agents”  
https://claude.com/blog/claude-managed-agents-memory

## 4. Builders 的手感：agent 会放大人，也会放大 slop

X 上最值得看的不是单点新闻，而是几条彼此呼应的使用经验。

Box CEO Aaron Levie 认为，agent 会让更多人进入过去很复杂的领域，比如软件、创意工作、研究等。但这不意味着专家消失，反而是专家在判断、历史上下文、识别灾难性错误、给 agent 正确上下文方面有更大优势。最终会出现的是更大的民主化，以及专家更高的产出预期。来源：https://x.com/levie/status/2053267097493573921

Every CEO Dan Shipper 对 benchmark 的提醒也类似。他说 benchmark 不只衡量模型能力，还衡量人类找到能让模型能力显现出来的 prompt 的能力；这件事并不轻松，需要熟练的专家人类做很像工作的事情。来源：https://x.com/danshipper/status/2053191885116571935

Peter Yang 则从反面讲了 agent 的“内容债”。如果一开始让 AI 生成 markdown，只是略过那 5% slop，后面新文件又继续引用旧文件，slop 会从 5% 变 10%，最后堆成一座自己也不理解的 AI 生成内容山。他还提到 Claude Code 有时会挂起 3 分钟，却不清楚是否仍在工作，希望它沟通更多。来源：https://x.com/petergyang/status/2053317001976881312 ，https://x.com/petergyang/status/2053170264121450616

OpenAI 的 Sam Altman 分享了一个很生活化的 optimism：启动一批 Codex 任务，带孩子在阳光下跑一圈，午睡时间回来发现都完成了。这个画面很能解释 agent 的吸引力，不是完全取代人，而是让人把一批后台工作交出去。来源：https://x.com/sama/status/2053191344999604409

Peter Steinberger 的几条更新则更偏工具手感：他提到教 Codex 在 review PR 时看 social signals；Crabbox 的 Windows terminal handling 已经好到 Codex 可以端到端修复 gifgrep，让 animated gifs 在 terminal 中渲染；spogo 这个 Spotify CLI 也变得更快。来源：https://x.com/steipete/status/2053374981824798751 ，https://x.com/steipete/status/2053329609064685740 ，https://x.com/steipete/status/2053310800773685600

YC CEO Garry Tan 提到 GBrain v0.31.1 支持真正的 MCP thin client，可以跑一个 home GBrain server，其他客户端通过 MCP 连接，接近本地运行体验。他还分享了一个使用技巧：让 agent 用 ASCII 画图解释东西，然后一直追问直到理解。来源：https://x.com/garrytan/status/2053306243704410460 ，https://x.com/garrytan/status/2053191327181865376

Zara Zhang 的观察更像产品表达层的补充：HTML 重要，因为人类是视觉动物。过去输出格式常常为了人类操作而优化，比如做 PPT；当 AI 负责操作时，输出格式应该更适合人类消费，漂亮、互动的 artifact 会更自然。来源：https://x.com/zarazhangrui/status/2053291803135410674

Nikunj Kothari 给了一段实用 custom instruction：当模型估算或规划时，应该假设由模型自己执行工作，用秒、分钟、工具调用、迭代等模型执行单位来报告，而不是用人类天数或人头；同时区分模型可执行部分和需要账号、凭证、部署、物理行动等人类前置条件。这个提示词的价值在于，它把 agent 从“写计划”拉回“现在能做什么”。来源：https://x.com/nikunj/status/2053159569015328953

Swyx 的几条动态集中在 AI Engineer Singapore 和政府参与 AI 的信号。他提到新加坡外长将 keynote AI Engineer Singapore，并把英国 Chief AI Officer、新加坡 Cabinet Minister 视为政府正在加入 AI builder 场域的例子。来源：https://x.com/swyx/status/2053370687931498603

## 结语

今天最明显的线索是，AI 产品正在变得更像操作系统：它要听得懂声音，连得上外部服务，记得住跨 session 的经验，也要在工程链路里解释自己为什么退化。与此同时，人的角色没有消失，只是从“亲手做每一步”转向“定义上下文、审查质量、管理记忆和反馈”。

如果说前两年的关键词是模型能力，那么现在越来越像是产品纪律：不要让 slop 滚雪球，不要让 prompt 小改动悄悄损伤智能，不要让 agent 只会计划而不动手。真正可靠的 AI 工作流，大概就长在这些细节里。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
