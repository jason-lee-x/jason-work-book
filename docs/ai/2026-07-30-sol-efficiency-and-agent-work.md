---
title: 2026-07-30｜Sol 的效率账与 Agent 工作感
date: 2026-07-30
---

今天的 builder 信号集中在一个更朴素、也更真实的问题上：AI agent 不是只要更会做事，还要在真实工作里算得过账、跑得稳定、接得住反馈。OpenAI 侧直接谈到了 GPT-5.6 Sol 的 usage limits 与效率修正；创作者和产品 builder 则继续把 Claude Code、Claude Design、ChatGPT voice mode 放进完整工作流；Swyx 的招聘判断则像一根刺：会管理 agent 的 IC，正在变得比传统管理层更稀缺。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2082317452755751098)、[Peter Yang on X](https://x.com/petergyang/status/2082254852600873376)、[Swyx on X](https://x.com/swyx/status/2082199414656127010)

## 1. Sol 的核心矛盾：能力上去了，usage 账单也变复杂了

OpenAI 的 Thibault Sottiaux 今天给 ChatGPT Work 和 Codex 用户做了一次比较罕见的公开解释：所有 ChatGPT Work 与 Codex 用户的 usage limits 已经被 reset；关于 GPT-5.6 Sol，他说过去几周有不少用户反馈 Sol 消耗 Codex limits 的速度比预期更快，但 OpenAI 并没有降低任何订阅计划的 usage。团队做了几项改进后，预期典型 Sol 使用场景的额度可多持续约 18%；此前暂停的 five-hour limit 也会恢复。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2082317452755751098)

真正值得看的是他列出的原因。按 Thibault 的说法，GPT-5.6 Sol 更愿意长时间工作、做更多 tool calls、跨工具和 subagents 协调复杂 workflow；这让它更能解决难题，但有些任务消耗超出了预期。Sol 在相同 reasoning effort 下也会比之前模型更“用力”；programmatic tool calling / code mode 虽然提高了并行调用和等待期间继续工作的灵活性，也带来了更多 responses per turn、更多 cached input tokens，以及比预期更高的 usage。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2082317452755751098)

这说明 agent 产品的下一层竞争不会只看“能不能做”。越强的 agent 越像一个长时间运行的系统：它会等待工具返回、并行调用、保留上下文、在复杂任务里不断试探边界。能力与效率不会自动同步改善；中位用户可能觉得 token efficient，但 power users 的 long tail 会先撞到墙。Thibault 也承认团队 launch 前更关注平均值和中位数，漏掉了长尾高强度使用里的额度消耗。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2082317452755751098)

## 2. AI coding 的配套设施：不只是模型，也包括安全扫描和 CI

Thibault 还提到他们发布了一个开源 CLI 和 TypeScript SDK，用来发现、验证和修复代码里的 security vulnerabilities。按他的描述，它可以扫描 repositories、review changes、长期追踪 findings，并在 CI 中运行 security checks。这里 JSON 没有给出工具名称的完整展开，所以不补写名字；可确认的信号是：AI coding 生态正在从“生成代码”延伸到“检查代码、修复风险、接入 CI”的维护链路。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2082241164850364555)

这和 Sol usage 的讨论放在一起很有意思：agent 越能改代码，越需要配套的 verification、security scanning、CI guardrails。否则生产力提升会被 review 成本和安全风险吃掉。OpenAI 这两条动态合起来看，不像一次单点发布，更像 agentic software engineering 进入运营期后的现实账本：额度、效率、安全、CI，都得一起算。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2082317452755751098)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2082241164850364555)

## 3. 从 prompt 到产品：Claude Design、Claude Code 与 Tastemaker

Peter Yang 今天公开了自己做 Tastemaker 的过程：他想摆脱 IMDb 评分电影和剧集的限制，也不满足 Letterboxd 不支持 video games，于是做了一个把 movies、TV shows、games 放进同一个个人 profile 的产品。用户可以评分和评论、创建并分享 lists、发现接下来该看什么或玩什么；由于 API limits，初期只开放前 100 个 profiles。来源：[Peter Yang on X](https://x.com/petergyang/status/2082254840655405293)

更适合 builder 读的是第二条：Peter Yang 说他用 Claude Design 和 Claude Code，把一个 rough idea 变成了可用产品。他的流程包括创建 `design.md` 和 HTML spec，在 Claude Design 里 prototype screens，再用 Claude Code 构建和迭代。这里的重点不是“AI 帮我写了代码”这种泛泛叙事，而是一个越来越清晰的产品工作法：先把品味与约束写成 spec，再让设计模型出界面，再交给 coding agent 进入实现循环。来源：[Peter Yang on X](https://x.com/petergyang/status/2082254852600873376)

Tastemaker 这个例子也提醒了一点：AI-first prototyping 不等于不需要产品判断。Peter 选择从个人娱乐品味、跨媒介收藏、profile 分享这些具体需求切入，而且还明确处理 API limits 带来的上线约束。AI 工具把从 idea 到 artifact 的路径缩短了，但“为什么是这个产品、先开放给谁、哪些约束不能绕过”，仍然是 builder 自己要负责的判断。来源：[Peter Yang on X](https://x.com/petergyang/status/2082254840655405293)、[Peter Yang on X](https://x.com/petergyang/status/2082254852600873376)

## 4. 工作方式的分叉：会带 agent 的 IC，正在变贵

Swyx 对当前招聘市场的判断很直：AI-native ICs / player-coaches 是巨大牛市，而 “heads of X” managers 是巨大熊市。他把这种 bifurcation 概括成一句有意夸张的话：1 年管理 10 个 agents 的经验，大于 10 年管理 10 到 100 个人的经验。来源：[Swyx on X](https://x.com/swyx/status/2082199414656127010)

这句话不该被读成“人类管理不重要了”，而应读成一个角色重估：能把任务拆给 agent、设计检查点、读取工具输出、判断何时接管、把结果合并进真实产品的人，会变成新的高杠杆 IC。传统 manager 如果只擅长同步会议、人员协调和 status tracking，却不会亲自进入 agent workflow，很容易被新一代 player-coach 压过。来源：[Swyx on X](https://x.com/swyx/status/2082199414656127010)

Madhu Guru 的玩笑也在同一个方向上。他说自己看到一个 SWE 在工作，没有 Claude、没有 wispr、没有 tab key，只是“bare hands” 写代码。这个梗之所以成立，是因为默认工作姿势已经变了：不用 AI 辅助写代码开始显得像一种复古手艺，而不是正常状态。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2082112941814661236)

## 5. Voice mode 与长文本劳动：创作也开始 agent 化

Dan Shipper 今天分享了一个非常具体的创作工作流：他在沙发上写 Codex 的“definitive history”，材料来自对 Thibault Sottiaux、AJ Ambrosino、Greg Brockman 等团队成员的深入访谈；整个过程，包括整理采访、构建 timeline、写作、编辑和修订，都通过 ChatGPT for Work 的 voice mode 完成，手没有碰键盘和鼠标。来源：[Dan Shipper on X](https://x.com/danshipper/status/2082130836485259530)

这条的意义不在于 voice input 新鲜，而在于 creative work 的边界被重新划了一次。过去语音更像输入法；这里它变成一个可以组织材料、维护结构、推动 revision loop 的工作界面。把它和 Peter Yang 的 `design.md` / Claude Code 流程放在一起看，今天的主题就更清楚了：无论写文章还是做产品，AI 工具正在从“帮你完成一个动作”变成“陪你跑完整工作段落”。来源：[Dan Shipper on X](https://x.com/danshipper/status/2082130836485259530)、[Peter Yang on X](https://x.com/petergyang/status/2082254852600873376)

## 6. Frontier 的另一面：大模型服务、数学搜索与耐心

Peter Steinberger 只写了一句：“Serving large models is hard.” 信息量不长，但放在今天并不突兀。Thibault 刚解释完 Sol 因为更长任务、更密集 tool calls、更复杂 code mode 而带来的 usage 压力，Steinberger 这句话像是基础设施侧的脚注：frontier model 的体验不是只由模型聪明程度决定，还由 serving、limits、latency、cost 和边界条件共同塑形。来源：[Peter Steinberger on X](https://x.com/steipete/status/2082337130299457652)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2082317452755751098)

Amjad Masad 则抛了一个更远的想象：像 SETI@Home 当年让人捐出 compute 搜索外星信号一样，未来也可以捐 compute 来搜索 math proofs。他同一组动态里还提到“1300 Elo”，但 JSON 没有足够上下文解释具体对象，所以这里只保守记录前一个明确想法：当推理和证明搜索变成可并行消耗计算资源的问题，个人和社区 compute 也可能成为 AI / math frontier 的参与方式。来源：[Amjad Masad on X](https://x.com/amasad/status/2082316553740284060)、[Amjad Masad on X](https://x.com/amasad/status/2082316150273360316)

## 结语

今天最值得留下的判断是：AI agent 正在从演示期进入运营期。运营期关心的不是一句“模型更强了”，而是 limits 怎么设、长尾用户怎么处理、tool calls 如何计费、security scan 如何进 CI、spec 如何变成产品、voice mode 如何承载长文本劳动，以及谁有能力把一组 agents 真正带进交付链路。

这也是为什么 Swyx 那句关于 AI-native IC 的话会刺中人：未来的高杠杆 builder，不只是会调用模型的人，而是能把模型、工具、反馈、验证、成本和品味绑成一个稳定工作系统的人。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 X 内容整理；今日 JSON 中没有 podcast 和官方 blog 条目。未使用额外抓取来源。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
