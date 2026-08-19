---
title: "2026-08-19｜token 预算、产品手感与野心的尺度"
date: 2026-08-19
---

今天的 builders 信号不是单一发布，而是一组很像“第二阶段 AI 产品”的拼图：模型能力继续往前走，但真正稀缺的东西正在变成 token 预算、eval traces、工作流入口、品牌记忆，以及创始人对市场速度的判断。

如果把 No Priors 的长谈和 X 上这些碎片放在一起，今天最值得记住的一句话是：AI 的竞争正在从“谁拥有模型”转向“谁更会分配模型能力”。这既是产品问题，也是组织问题。

## 1. 万亿美元叙事要拆成两个变量：市场大小和到达速度

No Priors 这期 Sarah 与 Elad 的核心判断很克制：过去几年 Anthropic、OpenAI、SpaceX 这类公司以异常速度逼近或进入 trillion-dollar 叙事，但这不等于未来三到五年会批量复制同样曲线。Elad 的区分很重要：很多 AI 公司可以成为 100B 级别公司，但 trillion-dollar 公司需要 50B 到 100B 美元级收入和良好利润率，这不是“市场很大”四个字能自动推出的结果。来源：[No Priors](https://www.youtube.com/watch?v=6l8oAO_LBx4)

他反复强调的不是 TAM 不够，而是速度被高估：physical goods、energy、robotics 这类方向即使市场足够大，也未必能在几年内获得足够 footprint。换句话说，投资人和创始人容易把“终局规模”误读成“短期速度”。来源：[No Priors](https://www.youtube.com/watch?v=6l8oAO_LBx4)

更有意思的是另一侧风险：一些优秀创始人因为害怕被 model labs 吃掉，转向更窄的 niche、hardware 或 American Dynamism 方向。Elad 认为这会让一部分本该正面进攻大市场的创始人变得太 meek。Sarah 也说，她更常失望于创始人“不够有野心”。来源：[No Priors](https://www.youtube.com/watch?v=6l8oAO_LBx4)

这给 AI 创业一个很实用的判断框架：不要只问“labs 会不会做”，还要问“labs 做到这里时，产品、分发、行业信任和 workflow ownership 是否仍然留给你”。

## 2. token 预算会成为新的管理会计

同一场讨论里最像未来组织语言的概念，是 Elad 提到的 “return on invested tokens”。当 compute 成为瓶颈，大公司和 labs 不只是招聘研究员，而是在决定：谁值得获得更大的 token budget，哪些项目的 token 投入能换来最大回报。来源：[No Priors](https://www.youtube.com/watch?v=6l8oAO_LBx4)

他甚至用这个逻辑解释为什么“death of SaaS”可能被说过头了：如果同样一笔 token 能用于核心产品、margin lift 或更高杠杆的内部工具，公司未必愿意把稀缺 token 消耗在便宜、成熟、低边际收益的 SaaS 替代上。来源：[No Priors](https://www.youtube.com/watch?v=6l8oAO_LBx4)

Meta AI 的 Madhu Guru 从 eval 侧补上了工程实践版本：想做好 evals，先选一个自己非常熟悉的 workflow，把质量变成可测量对象；研究真实用户的 prompt traces，知道每一步好回答应该长什么样；再把 messy tool call responses、missing context 这类失败模式沉淀成 traces，最后让 eval 能反复自动运行，并且持续贴近 live traffic 的变化。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2089480958571331623)

这其实是同一个问题的两面：token 预算决定资源投向，eval traces 决定资源有没有转化成可靠质量。没有 eval 的 token 消耗只是烧钱；没有 token 预算的 eval 也很难进入业务优先级。

## 3. AI coding 正在外溢成通用创作 harness

OpenAI 的 Thibault Sottiaux 问了一个很产品经理的问题：Codex、API 或模型还有哪些“显而易见、100% within reach，但还没做”的事情？同一天他又用玩笑歌词写“Gimme Codex after midnight”，指向一个很真实的使用场景：半夜把 failing tests 消掉，第二天前 ship。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2089500941842342287)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2089604619936956778)

Peter Yang 的问题更明确地把 coding harness 推向视频编辑：他在测试 HyperFrames，也想知道还有什么工具能处理 YouTube talking-head intros，例如 zoom-in、字幕动画、logo、b-roll；他的目标是“只通过对 Codex 或其他 harness 说话”完成全流程剪辑。来源：[Peter Yang on X](https://x.com/petergyang/status/2089519732336787619)

Claude Code 团队的 Thariq 则给出一个很关键的抽象：代码的好处是更容易编辑、nudging，并且能 export 到现有工具；近期 procedural generation art、video editing、3D game demos 让他更倾向于相信，LLM coding models 在很多 creative work 上会比 diffusion models 更强。他还直接建议在 Claude Code 里输入 `/design <something you want to design>`。来源：[Thariq on X](https://x.com/trq212/status/2089415713098522688)、[Thariq on X](https://x.com/trq212/status/2089415712007938315)、[Thariq on X](https://x.com/trq212/status/2089529798850969805)

Garry Tan 也在同一条线上：他发布了一个开源方式，帮助用户创建自己的 Personal AGI，包含一个 private GitHub repo、70 个 proven skills，以及 Karpathy-style knowledge wiki 的开端；他说它 MIT licensed、free，并且可配合现有 Claude Code 或 Codex subscription 使用。来源：[Garry Tan on X](https://x.com/garrytan/status/2089438298540519821)、[Garry Tan on X](https://x.com/garrytan/status/2089425134339961173)、[Garry Tan on X](https://x.com/garrytan/status/2089424620764168485)

这些碎片说明，AI coding 的边界正在变薄：它不只是写代码，而是把可编辑、可版本化、可导出、可被工具链接住的“code-like substrate”带进设计、视频、游戏和个人知识系统。

## 4. 平台开始补工作流缝隙，而不是只秀模型

Google Labs / Gemini 的 Josh Woodward 汇报了一组具体迭代：revamped Workspace tools 正在 1 到 2 周内测试；3.7 Flash 在 tool calling 上已有改进；新的 Projects design 完成并进入实现；connectors 已支持 49 个且还在增加；若干 backend / frontend 工作推进，部分过度触发问题也已修复。来源：[Josh Woodward on X](https://x.com/joshwoodward/status/2089520767281324112)

Vercel CEO Guillermo Rauch 则转发 Cursor Origin 与 Vercel 的链路：repos 可以托管在 Cursor Origin，并通过 Cursor Origin 部署到 Vercel，而 Cursor Origin 自身也 hosted on Vercel。他顺手补了一句“unlike GitHub, it's online”，但更重要的信号是：IDE、repo hosting、deployment 正在被重新串成更短的 AI-native path。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2089409162270965858)

Swyx 对 Trajectory 在 Continual Learning 方向的执行给了正面评价，提到 Rronak 的 overview 覆盖了 main data problems、为什么 GRPO 不够、为什么需要 on-policy，以及随后必须修复 on-policy 带来的问题。来源：[Swyx on X](https://x.com/swyx/status/2089393073327653344)

这些都不是宏大的 AGI 叙事，而是产品栈里的小缝合：tool calling、connectors、repo-to-deploy、continual learning data。AI 产品真正变强，往往不是靠一次大发布，而是靠这些接口处的摩擦逐步消失。

## 5. moat 被质疑之后，品牌和数据重新上桌

FPV Ventures partner Nikunj Kothari 用一条带讽刺的长帖列举：models、IDEs、harnesses、app builders、wrappers、inference providers、voice layer、data labeling、AI infrastructure、neoclouds、generative media companies 都被说“没有 moat”，最后只剩 venture firm 似乎有 moat。来源：[Nikunj Kothari on X](https://x.com/nikunj/status/2089486802356961364)

但他另一条判断更值得认真看：未来 brand marketing 会成为主要差异化和最有价值资产之一。他明确说不是 launch video 或 aesthetic valuation pump，而是要在 retention 之后建立 attention：知道公司代表什么、理解市场 vibe、长期目标保持 relentless，同时每周都能短期展示自己。尤其当 agents 变成很多产品的 primary user，人类注意力会更稀缺，品牌表达会更重要。来源：[Nikunj Kothari on X](https://x.com/nikunj/status/2089374392295842086)

Box CEO Aaron Levie 从数据资产角度给出另一条 moat 线索：AI 对 data 的 thirst 让信息几乎以任何形式都变得有价值；在 AI 世界里，information 应该作为资产出现在 balance sheet 上。企业如何管理和挖掘自己的 organization intelligence，会成为未来竞争力和价值创造的决定因素之一。来源：[Aaron Levie on X](https://x.com/levie/status/2089499887905997272)

Replit CEO Amjad Masad 则提醒了两个更偏执行层的信号：有些团队 pitch 里不写 AI，却有 AI growth rates，并且如果不是足够 AI-pilled，可能需要 10 倍 headcount；同时，安全上不能只 scan code for vulnerabilities，还要主动 pen testing，真的尝试把系统打破。来源：[Amjad Masad on X](https://x.com/amasad/status/2089525819567739264)、[Amjad Masad on X](https://x.com/amasad/status/2089435606338416884)

所以 moat 不是消失了，而是在换形态：品牌、数据、工作流位置、组织杠杆和安全验证，可能比单点模型调用更耐用。

## 6. 监管问题的核心不是安全，而是风险收益是否对称

No Priors 最后转向 regulation。Elad 用 nuclear、biotech 和 pharma 做类比：法国 70% 电力来自 nuclear，美国约 18%，并且美国四十年没有建 reactor；他认为 70 年代 safety lobby 对 abundant clean energy 造成了真实损失。来源：[No Priors](https://www.youtube.com/watch?v=6l8oAO_LBx4)

他的担心不是“不需要安全”，而是监管如果只看 risk、不看 benefit，就会把社会推向过度保守。Sarah 也补充说，technologists 对 policymakers 说“你必须让技术发生，而不是预先完全控制它”，这本身就是很不舒服的立场。来源：[No Priors](https://www.youtube.com/watch?v=6l8oAO_LBx4)

这条线还落到地理迁移：他们讨论了 California billionaire tax、未来可能的 exit tax，以及这种监管环境如何加速 founders 和技术生态迁移；同时提到 Texas 因为 energy、hardware 和更可实验的监管环境，正在形成新的 corridor。来源：[No Priors](https://www.youtube.com/watch?v=6l8oAO_LBx4)

这部分可以不同意其政治倾向，但不能忽略它对 builders 的现实影响：当公司估值、人才、compute、CapEx 和监管全都耦合在一起，创业地点不再只是生活方式选择，而是系统吞吐量选择。

## 结语

今天没有官方 blog 更新，主要信号来自 1 期 podcast 和 30 条 X 内容。真正值得带走的不是“谁发了什么新功能”，而是 AI 产品进入了更细的操作层：token 怎么分配，eval 怎么跟上 live traffic，coding harness 怎么外溢到创作，平台怎么缩短工作流路径，brand 和 data 怎么在无 moat 的焦虑里重新变硬。

AI 第一阶段拼模型调用，第二阶段拼的是手感和分配：谁把有限的智能用在最该用的人、项目和 workflow 上，谁才可能把 demo 变成长期系统。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 podcast、blog 与 X 内容整理；未使用额外抓取来源。无明确 URL 或内容信号弱的条目未纳入正文。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
