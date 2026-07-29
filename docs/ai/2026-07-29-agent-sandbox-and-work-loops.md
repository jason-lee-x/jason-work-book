---
title: 2026-07-29｜Agent 的安全壳与工作回路
date: 2026-07-29
---

今天的 builder 信号很像一次降温：少一点「模型又聪明了」的兴奋，多一点「系统到底怎么接进现实」的追问。几条线索互相咬合：agent 需要更硬的安全边界，AI coding 正在进入真实工作回路，产品判断仍然离不开人类品味，而企业端对 AI 的看法，也从裁员叙事转向「用 AI 做更多以前做不了的事」。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2081842439304995169)、[Peter Yang on X](https://x.com/petergyang/status/2081775399097549083)、[Aaron Levie on X](https://x.com/levie/status/2081930301752942703)

## 1. Agent 的边界，不只是 container

Vercel CEO Guillermo Rauch 今天抓住 Kimi paper 里一个很具体的工程信号：agent 运行环境的 security boundary 不能停在 container-level isolation。按他的转述，实验里 agent 甚至能通过 kernel panic 让底层机器崩掉；他的结论是 Firecracker microVMs 这类隔离方式更安全，也对应 Vercel Sandbox 的方向。这里真正重要的不是某个 sandbox 产品，而是 agent 工程的底线正在抬高：一旦 agent 能写代码、跑命令、访问系统资源，「能不能跑」之后立刻就是「跑坏了能不能关在笼子里」。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2081842439304995169)

Rauch 另一条 benchmark 信号也值得并排看：他称 Grok 4.5 在最新的 cybersecurity AI model price-performance benchmarks 里表现突出，价格比 Sol 便宜 10 倍、比 Opus 5 便宜 5.7 倍、比 Kimi K3 便宜 2.2 倍，同时达到接近 Kimi 的性能；但 Sol 仍是 frontier，领先 Opus 5。安全能力、成本曲线、隔离边界放在一起，说明 AI security 不会只是模型榜单问题，而会变成「模型能力 × 运行成本 × 执行环境」的组合工程。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2081852481517318560)

## 2. Coding agent 开始从 IDE 走向「工作回路」

Peter Yang 转述了 OpenAI DevEx jxnlco / Jason 使用 Codex 的一个案例：人在骑车，收到同事要改 launch video 的请求，于是从手机远程连接，让 Codex 用 computer use 修改视频、导出并发回 Slack；20 分钟后 Slack 线程里出现了新视频。更关键的是后半段：他让 Codex 每 30 分钟检查线程反馈，并导出 V2、V3、V4，回家时视频已经 greenlit。这个例子不只是「AI 会改视频」，而是 agent 进入了反馈循环：读取协作上下文，执行修改，回到协作工具，继续等待下一轮反馈。来源：[Peter Yang on X](https://x.com/petergyang/status/2081775399097549083)

Peter Yang 后续还放出 Jason 如何在工作日使用 Codex 的访谈与书面整理链接。JSON 里没有展开那些链接内容，所以这里只能保守记录它们作为进一步材料存在；今天可以确认的信号，是 Codex 正在被描述成一种贯穿工作日的操作界面，而不只是一次性代码补全器。来源：[Peter Yang on X](https://x.com/petergyang/status/2081767558408175867)、[Peter Yang on X](https://x.com/petergyang/status/2081767570198401263)

OpenAI 的 Thibault Sottiaux 也给了一个产品运营侧信号：ChatGPT Work 和 Codex 付费用户的 usage limits 被重置，而且他把这件事和 ChatGPT Work 的快速采用放在一起说。不要把它读成大新闻，比较合理的读法是：当 AI work 产品进入高频使用，limit 本身会成为用户体验的一部分；限制、重置、fast path、Ultra 等机制，都会影响 builder 把 agent 当成日常工具的意愿。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2081899343091843463)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2081940052154933696)

## 3. 成本指标正在从 token 单价变成 task 单价

Swyx 今天说得很直：用每百万 input / output tokens 的价格衡量成本，去年某个时候已经不再是相关指标；如果图表还不把横轴更新成每个 task 的成本，就很难严肃讨论。他这句话和 agent 化趋势高度一致：用户不是买 token，而是买一个任务闭环。一个模型便宜但需要多轮失败、人工补救、权限切换，它的 task cost 未必低；一个模型 token 贵但能一次完成，也可能更便宜。来源：[Swyx on X](https://x.com/swyx/status/2081904230768816487)

Swyx 还反思了自己的「agent lab thesis」：他认为当初对 evals、routing、interactivity、ROI 的关注是对的，但最大的反例是 Claude Code 今年近似「意外开源」后，对它和竞争对手的 roadmap 似乎几乎没有造成影响。这个判断很刺耳，却有用：agent 产品的护城河可能不在某个单点实现，而在分发、工作流、默认体验、持续迭代和用户信任这些更难复制的层。来源：[Swyx on X](https://x.com/swyx/status/2081890955070980416)

## 4. 好产品仍然是组织能力，不是套一层 AI

Linear Head of Product Nan Yu 的短帖像是在提醒 AI 圈别忘了常识：很多聪明人在努力把产品做得好用、好看；如果你也有聪明人，就应该让他们把自己的产品做好，然后付一点钱使用别人的好产品。它听起来像玩笑，但放在今天的语境里很准：AI 并不会自动替代 product craft，反而会放大产品团队对细节、边界和默认路径的要求。来源：[Nan Yu on X](https://x.com/thenanyu/status/2081768780045156358)

Meta AI 的 Madhu Guru 也从会议机制讲了同一件事。他说，最好的 product review 是在一小时内压缩数月学习，模拟市场对想法的反应；这要求房间里的人深懂领域、有 product sense、有强观点，而且经常是对的。反过来，如果 product review 滑向 status update、leadership visibility 和 cross-functional alignment，人们自然会讨厌它，因为它像 overhead，而不是 learning。AI 产品越复杂，这类组织判断越值钱。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2081781952437486052)

Zara Zhang 的两条短帖也属于 builder 的手感层：她说自己获得 endless content ideas 的方式在一张图里，并转发了「The magic you’re looking for is in the work you’re avoiding」。JSON 没有提供图片内容，所以不能展开图里是什么；可以写下的只有这个行动倾向：内容、产品、公司里真正的魔法，往往藏在那些被拖延的具体工作里。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2081983750658044079)、[Zara Zhang on X](https://x.com/zarazhangrui/status/2081976736854737164)

## 5. 企业 AI 不是少雇人，而是把需求地板抬高

Box CEO Aaron Levie 今天反驳了「AI 会立刻带来负面就业结果」的叙事。他说，自己接触的大量企业仍在招聘，只是角色倾向发生变化：企业雇工程师去处理以前无法处理的问题，雇销售去更深入维护客户关系，雇 internal FDE 帮助部署 AI。他把这理解为 Jevons paradox 正在发生：AI 让组织能做更多事，而不只是以更低成本做同样的事。来源：[Aaron Levie on X](https://x.com/levie/status/2081930301752942703)

Levie 的结论也很适合做企业 AI 的判断尺：如果一家公司只是用 AI 降成本，最后可能会被那些用 AI 更好服务客户、推动业务突破的公司超过。这不是说裁员不会发生，而是当前 JSON 里的企业端观察更偏向「需求扩张」而不是「需求消失」。来源：[Aaron Levie on X](https://x.com/levie/status/2081930301752942703)

## 6. 第一波 AI App 之后，问题变成计算革命的下一层

Every 的 AI & I 这期访谈里，Granola / Granolah 联合创始人兼 CEO Chris 的开场判断很重：meeting notes 不是大家追逐的全部价值，后面有更大的东西；我们还在 computing revolution 的非常早期，已经出现的东西会被后面要来的东西比下去。他还说 startups are like knife fights，而且公司顺利时也一样难。来源：[AI & I by Every｜The Founder of a $1.5B AI Company on What Comes After the First Wave of AI Apps](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)

这段访谈对今天的主线是一个补充：第一波让人觉得「holy shit, this actually works」的 AI app，不能停在某个单点用例里。Granola / Granolah 的例子从 meeting notes 起步，但 Chris 的表达明显指向更大的工作接口和上下文系统。结合上面的 Codex、sandbox、task cost、product review，下一阶段的 AI 产品竞争，很可能不是谁多接一个模型，而是谁能把 agent 放进安全壳，再接入稳定的工作回路。来源：[AI & I by Every｜The Founder of a $1.5B AI Company on What Comes After the First Wave of AI Apps](https://www.youtube.com/playlist?list=PLuMcoKK9mKgHtW_o9h5sGO2vXrffKHwJL)

## 结语

今天的关键词不是「更聪明」，而是「更可托付」。模型能力当然还在推进，但 builder 们真正反复碰到的是另一组问题：任务成本如何衡量，agent 运行时如何隔离，工具如何嵌进 Slack、手机和企业系统，组织如何保留产品判断，AI 到底是削减工作还是释放更多工作。谁能把这些问题做成默认体验，谁才更接近下一层 AI 应用。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 X 与 podcast 内容整理；没有使用额外抓取来源。今日 JSON 中没有官方博客条目。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
