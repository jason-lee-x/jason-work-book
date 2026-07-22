---
title: 2026-07-22｜没有护城河，只有更会省钱的 agent
date: 2026-07-22
---

今天的 builders 信号很集中：AI 叙事正在从「谁有模型护城河」转向「谁能把模型放进真实经济系统里」。旅行平台、enterprise workflow、招聘、eval、model routing、open weights，表面上是不同话题，底层都在问同一个问题：当智能变成可调用资源之后，组织怎样重新分配判断、成本和责任？

我的判断是：下一阶段的竞争不在于喊出更大的 agent 愿景，而在于把三件小事做扎实：让 agent 知道何时调用便宜模型，知道何时让人确认，知道何时承认现实世界比聊天框复杂。

## 1. 「没有护城河」不是投降，而是每天重新服务客户

No Priors 这一期请到 Booking.com / Booking Holdings CEO Glenn Fogel。最有分量的一句是开头这句："There is no such thing as a moat." 他的意思不是说公司没有竞争优势，而是任何优势都可能被明天的创新冲掉；长期能赢的方式，是不断开发新服务，追问客户哪里需要更多需求、哪里正在疼。来源：[No Priors｜Travel Through the Lens of AI with Booking.com CEO Glenn Fogel](https://www.youtube.com/watch?v=8nj_0wZkbtA)

这个判断放在 AI travel 上尤其有意思。Fogel 提醒，外部观察者常以为「AI 会接管旅行，旅行公司会失去价值」，但旅行不是一个简单的购买按钮。Booking 夹在 travelers 和 partners 之间，AI 对它的价值首先是把使命做得更容易、更便宜、更好，而不是把 marketplace 的复杂性抹平。来源：[No Priors｜Travel Through the Lens of AI with Booking.com CEO Glenn Fogel](https://www.youtube.com/watch?v=8nj_0wZkbtA)

他对 agent 的想象也很具体：复杂家庭旅行让人痛苦，富人会请真人 travel concierge，而 AI 可以把这种能力扩展给更多人。Fogel 说他期待 Booking Holdings 提供 personalized agents，知道你的偏好，能在大量组合里快速搜索、回退、再选择；但复杂旅行里，人通常仍想保留确认权。这里的关键不是「AI 替你买票」这么浅，而是把记忆、偏好、组合搜索和 human agency 放在同一个产品里。来源：[No Priors｜Travel Through the Lens of AI with Booking.com CEO Glenn Fogel](https://www.youtube.com/watch?v=8nj_0wZkbtA)

## 2. Agent 的成本曲线开始像系统设计问题

Box CEO Aaron Levie 今天转发 Cursor 的研究，把 multi-model agentic systems 说成未来的核心设计模式：frontier model 负责 planner / orchestrator，便宜的 workhorse model 负责执行清晰指令，整体 token 成本可有 15X 改善。他引用的核心逻辑是，大任务里真正需要 frontier intelligence 的时刻很少，通常发生在初始拆解、设计决策和关键 trade-off；一旦 planner 把模糊性压缩成明确任务，便宜模型就能跟着做。来源：[Aaron Levie on X](https://x.com/levie/status/2079402164988895293)

这比「换一个更便宜的模型」更重要。它意味着 applied AI layer 的差异化会越来越像编排系统：知道哪些步骤需要高级推理，哪些步骤只需要可靠执行；知道任务进度、上下文风险和领域约束；知道如何在 coding、finance、legal、healthcare、life sciences 等场景里把昂贵智能用在刀刃上。来源：[Aaron Levie on X](https://x.com/levie/status/2079402164988895293)

Meta AI 方向的 Madhu Guru 也把问题拉回经济价值。他说通往 AGI 的路由 economically valuable tasks 铺成，因此 enterprise AI 是最重要的前沿之一，因为许多有价值任务就在那里；他还把今天真正的「tokenomics」定义为 open vs closed weight、inference costs 和 model routing，而不是四年前 crypto / web3 式的代币讨论。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2079369965569003691)、[Madhu Guru on X](https://x.com/realmadhuguru/status/2079227605031829700)

## 3. 开源模型不再只是技术选项，而是战略变量

今天几条关于中国模型的短信号，指向同一个现实：open weights / open source 模型已经进入竞争结构本身。Peter Yang 说，禁止中国模型会像禁止中国 EV 一样是 self own。Matt Turck 则用一句调侃概括 OpenAI 和 Anthropic 面对「top free Chinese open source model」发布时的压力。来源：[Peter Yang on X](https://x.com/petergyang/status/2079273815004303477)、[Matt Turck on X](https://x.com/mattturck/status/2079198838741458989)

Glenn Fogel 在 No Priors 里也从社会接受度角度补了一刀：如果因为恐惧而让社会拒绝技术，最终会变成坏事；而其他地区不会都有同样问题，他点名中国不会停在「AI is bad, we shouldn't do it」这种态度上。这个观察不等于给某个政策背书，但它说明 AI adoption 的速度差会变成商业差和国家差。来源：[No Priors｜Travel Through the Lens of AI with Booking.com CEO Glenn Fogel](https://www.youtube.com/watch?v=8nj_0wZkbtA)

Swyx 则把 open weights 语境下的 eval 可信度问题说得更尖锐。他提到 frontier model training 的一个「open secret」：即便不直接训练 test，也可以训练 test lookalikes 来追 benchmark；而 open weights 发布时通常不会附带 datasets / RL envs，因此很难判断是否存在类似 Temu Tbench 的训练相似物。Alex Zhang 和 Omar 的 RLM paper 讨论了用标准 NLP distance metrics 比较 hidden trajectories，不能彻底解决问题，但至少是在逼近「模型是否真的泛化」这个问题。来源：[Swyx on X](https://x.com/swyx/status/2079411861150429402)

## 4. AI-native 组织会重新定义招聘、团队和验收

Zara Zhang 给了一个很像 2026 年招聘面试的结构：第一轮必须线下、不能用 AI，用来测试 domain expertise 和临场知识；第二轮必须用 AI 完成一个不用 AI 几乎做不完的项目，并且不仅看结果，还要评估候选人与 agents 的 chat transcript。这个设计抓住了一个新现实：AI 能力不是「会不会用工具」这么浅，而是能否把领域判断、任务拆解、prompt 过程和最终产物连起来。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2079409165424799889)

她的另一条判断更组织形态化：现在有两类公司，一类是在 coding agents 出现前建立、正在 retrofit；另一类是在 agents 之后诞生，从第一天就不同。后者可能少于十个人，按项目而不是部门组织，每个人闭环自己的工作，几乎没有内部会议。这个说法不必被当成普遍规律，但它很好地描述了 AI-native company 的最小组织想象：人更少，边界更清楚，交付链更短。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2079225776545968166)

Peter Yang 补上了验收机制：一个 agent 做工作，另一个 agent 按 rubric review。他引用 Thariq 对 video shorts 的解释：像「这个短视频好不好」没有 deterministic answer，因此应该让单独的 verification agent 读 rubric、审查并反馈；否则模型会有 self-preferential bias，更容易宽容自己的输出。这个模式适合很多主观质量任务：不是让 AI 自证正确，而是把判断标准外置，并分离生产者和评审者。来源：[Peter Yang on X](https://x.com/petergyang/status/2079257646939742542)

## 5. 「一切皆代码」不是口号，是生产边界正在融化

Vercel CEO Guillermo Rauch 的一句话很适合作为今天的产品注脚：AI 的大教训是 everything is code。slide deck 是 code，design 是 code，promo video 是 code，Excel automation 是 code。听起来夸张，但它描述的是更深的变化：过去被不同软件、岗位和文件格式分割的工作，现在越来越多可以被同一种生成、修改、执行、评审的 pipeline 处理。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2079274102129304026)

这也解释了为什么上面的招聘、routing、verification、enterprise workflow 会一起出现。当 slide、design、video、spreadsheet 都能进入「代码化」流程，真正稀缺的就不只是会写代码的人，而是能定义目标、拆任务、建 rubric、安排模型层级、判断产物是否够好的人。Madhu Guru 那句「it's literally the greatest time ever to have product sense」放在这里很贴切：当实现成本下降，product sense 反而更值钱。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2079387984852668780)

## 简短结语

今天最值得带走的不是某个单点发布，而是一条正在变硬的工程路线：AI agent 要穿过真实经济，就必须同时解决 moats、routing、eval、organization 和 human confirmation。

没有护城河，不等于没有战略；模型更便宜，不等于不用系统设计；agent 更强，不等于可以取消人类判断。恰恰相反，越接近真实工作，越需要把判断、成本和责任切得更细。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
