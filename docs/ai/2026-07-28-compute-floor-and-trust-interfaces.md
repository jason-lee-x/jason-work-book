---
title: 2026-07-28｜算力地板与信任接口
date: 2026-07-28
---

今天的 builder 信号不热闹，但很集中：AI 正在从「模型能力」进入「物理供给、权限边界、工作接口」同时受限的阶段。OpenAI 的 compute 负责人在谈电力、冷却、芯片和 token 供给；ChatGPT Work 的一线 builder 在强调手机上的任务执行；Box、Meta、Vercel 等人则把问题拉回现实工作流、open weights 和部署形态。看下来，下一阶段的 AI 产品不只拼 intelligence，而是拼谁能把 intelligence 接进真实世界，并让用户敢交出上下文。来源：[The MAD Podcast｜OpenAI’s Compute Chief: We Can’t Build Fast Enough](https://www.youtube.com/watch?v=wEZBlmvxx4o)、[Peter Yang on X](https://x.com/petergyang/status/2081555286817648738)、[Aaron Levie on X](https://x.com/levie/status/2081491621162668207)

## 1. 算力不是云端抽象，而是把电子变成 token 的工厂

The MAD Podcast 这期请到 OpenAI Head of Industrial Compute Sachin Katti，谈得最硬的一点是：AI 的瓶颈已经非常物理。他把 AI data center 描述成「giant factories that are turning electrons into tokens」，不是一句漂亮比喻，而是对当前约束的准确归纳：芯片更热，需要 liquid cooling；集群更大，需要电网、变电站、输电线、gas turbines、transformers 和施工队一起扩容。Katti 还说，OpenAI 方向性今年 compute spend 约 500 亿美元，整个行业方向性约 7000 亿美元，这些数字真正指向的是现实世界的建设速度。来源：[The MAD Podcast｜OpenAI’s Compute Chief: We Can’t Build Fast Enough](https://www.youtube.com/watch?v=wEZBlmvxx4o)

这也解释了为什么「需求是否会过度建设」在 OpenAI 内部不是他们最怕的方向。Katti 的说法很直接：demand far outstrips compute supply，能上线的 compute 会被立刻吃掉；真正担心的是 physical world does not move that fast。他还补了一层递归：AI 已经在做一部分 AI research，如果 AI 自己能扩大实验数量，research compute 的需求也会继续膨胀。这里的判断不是「模型永远 scaling」，而是「实验速度、inference、post-training、synthetic data、test-time compute」共同把算力地板抬高。来源：[The MAD Podcast｜OpenAI’s Compute Chief: We Can’t Build Fast Enough](https://www.youtube.com/watch?v=wEZBlmvxx4o)

能源部分同样值得看。Katti 说，早期大家接入电网，但现在需要为数据中心投资新的发电和输配电基础设施，包括 gas、solar、hydro、transmission lines、transformer substations；某些地方还会做 behind-the-meter / on-site generation，让 data center 在电力上更自给。核能在他那里不是科幻愿望，而是「can't come soon enough」的高密度、clean energy 选项。这个语境下，AI 公司越来越像基础设施公司，不只是 API 公司。来源：[The MAD Podcast｜OpenAI’s Compute Chief: We Can’t Build Fast Enough](https://www.youtube.com/watch?v=wEZBlmvxx4o)

## 2. Jalapeno 的关键词不是芯片，而是 tokens per watt

OpenAI 进入 custom silicon 的动机，在 Katti 的表述里也很清楚：当 inference 成为巨大甚至可能占多数的 compute workload，而且模型和 workload 都由自己掌握时，就可以 hardware / model co-design。他把 Jalapeno 的关键指标说成「maximizing the number of tokens you can produce per watt」。这比「自研芯片」的叙事更重要，因为 power 才是当前紧约束，tokens per watt 直接决定 intelligence 的供给弹性。来源：[The MAD Podcast｜OpenAI’s Compute Chief: We Can’t Build Fast Enough](https://www.youtube.com/watch?v=wEZBlmvxx4o)

他还说，training 和 inference 的边界已经变得没那么干净：synthetic data generation 是 inference，post-training 是 inference，test-time compute 也是 inference。所以如果只把 inference 理解成「用户请求阶段」，会低估它在整个模型生产链里的重量。换句话说，AI 的成本曲线正在从「一次大训练」变成「持续推理、持续实验、持续供给」。来源：[The MAD Podcast｜OpenAI’s Compute Chief: We Can’t Build Fast Enough](https://www.youtube.com/watch?v=wEZBlmvxx4o)

网络和可靠性也被放大成基础问题。Katti 提到 MRC 是为 100,000 GPU 级 cluster fabric 设计的 routing / networking protocol：这么大规模下 link、switch、NIC 的失败是常态，目标不是枚举所有失败，而是通过 multipath spraying 让 training workload 不被底层网络故障打断。AI infra 的现实感就在这里：模型越像魔法，底座越像工业系统。来源：[The MAD Podcast｜OpenAI’s Compute Chief: We Can’t Build Fast Enough](https://www.youtube.com/watch?v=wEZBlmvxx4o)

## 3. ChatGPT Work 的机会在手机上，但门槛在信任上

Sam Altman 今天给了一个很具体的 ChatGPT Work 样本：他从手机发出一个复杂任务，让 ChatGPT 基于聊天历史为 8 个朋友规划长周末旅行，给出 3 个选项，做一个 full-stack site 让 9 个人协调偏好并决定目的地，达成一致后预订，并在 Gmail 里起草通知邮件。他的结论是：it...just worked。Thibault Sottiaux 接着说，让 ChatGPT work for you 从手机上就能做，像协商网费、退订 spam emails、找 deal 这类琐事，都可能变成一个 prompt。来源：[Sam Altman on X](https://x.com/sama/status/2081396796174282900)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2081444811647963244)

但 Peter Yang 提醒了更现实的一面：离开 AI 圈层后，普通人的第一担忧不是 token 会不会不够，而是「我是否足够信任 ChatGPT，把 Gmail、Calendar、Google Workspace、Microsoft Office 等交给它」。这句话把 agent 产品的核心门槛说透了：能不能执行任务只是第一层，能不能获得账户、文件、邮件、日历、支付、企业系统的信任授权，才是从 demo 到日常工具的桥。来源：[Peter Yang on X](https://x.com/petergyang/status/2081555286817648738)

Sam Altman 另一条短帖说「i want a new kind of computer」，这和 ChatGPT Work 的例子放在一起看，含义不是换一台硬件，而是换一种计算接口：用户给出目标，系统组织上下文、写代码、协调群体、触达外部服务，并把过程变成可操作的结果。今天还没有足够信息展开那个被 quote 的对象，所以只能保守记录这个信号本身。来源：[Sam Altman on X](https://x.com/sama/status/2081513071135346814)

## 4. Applied AI layer 仍然是大机会，不会被更强模型自动吃掉

Box CEO Aaron Levie 今天的长帖很适合给「模型会吃掉应用层」降温。他说 intelligence alone is not enough，大多数 enterprise workflow 需要把 AI 接到真实反馈环路：企业系统、正确数据、人类决策 UX、会随流程改善的数据和模型、regulatory / compliance 等。银行客户 onboarding 和法律团队 contract review 的 agent 实现完全不同，AI 只有以 contextual way 接触真实世界才有价值。来源：[Aaron Levie on X](https://x.com/levie/status/2081491621162668207)

Levie 的反直觉点是：模型越强，applied layer 的需求不一定下降，反而可能上升。因为模型更强后，企业会尝试自动化更 ambitious 的 workflow，而这些 workflow 更依赖行业深度、数据接入、权限设计、异常处理和人机协作。这个判断和 Peter Yang 的信任问题互相咬合：AI 应用公司的空间，不在包装一个聊天框，而在替用户解决「敢不敢接入」和「接入后如何闭环」。来源：[Aaron Levie on X](https://x.com/levie/status/2081491621162668207)、[Peter Yang on X](https://x.com/petergyang/status/2081555286817648738)

Meta AI 的 Madhu Guru 则从产品扩散阶段解释为什么 AI impact 还没有完全显形。他认为现在是 phase 1：有 distribution 的公司正在快速扩展到相邻问题区域，AI 帮它们更快构建过去需要大量 custom software 的功能，比如 clothes try-on；phase 2 才会出现更多 net new features 和软件生态形态的明显变化。这个框架有用，因为它把「没有立刻重塑世界」和「没有产品影响」区分开了。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2081437850466451736)

## 5. Builder 的度量正在从 token 消耗转向交付时间

Zara Zhang 今天的两条短帖像是给上面几段补了一把尺子：不要用 burned tokens 衡量 AI adoption，要衡量从 user need 到 shipped thing 的时间；通用聊天产品越 general，越难使用，因为人面对 blank box 会僵住，不知道该问什么。这里的重点不是 prompt literacy，而是产品设计：AI 产品如果不能把空白框变成有上下文、有动作、有边界的 workflow，用户就会把能力浪费在不知道如何开口上。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2081627581997269192)、[Zara Zhang on X](https://x.com/zarazhangrui/status/2081627109299310684)

Garry Tan 的「Don’t LARP, be earnest」虽然短，但放在今天的语境里也成立：AI 赛道不缺概念 cosplay，缺的是把需求变成可交付系统的朴素执行。Nikunj Kothari 说「proof of prompt is soon going to replace proof of work」，这句话可以理解为一种 builder 信号：未来一部分能力证明不再是你手写了多少工，而是你能否通过 prompt、agent、workflow 和验证把结果稳定生产出来。来源：[Garry Tan on X](https://x.com/garrytan/status/2081586567211348432)、[Nikunj Kothari on X](https://x.com/nikunj/status/2081383934928068619)

Guillermo Rauch 给了两个偏工程侧的信号：Vercel co-sign 了 Open Weights and American AI Leadership letter，认为 open weights 是 open source、data、protocols、research 之后的 logical next frontier；他还展示把 Vercel CLI TypeScript 用 scriptc 编译成 native，结果 binary 1.28mb、startup overhead 1.5ms、mean compile 2.94s、不嵌入 V8 / QuickJS，并提到代码由 GLM 5.2 Fast 转译。一个是模型生态的开放性，一个是工具链的启动成本和部署形态，二者都在指向更低摩擦的 builder substrate。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2081546513885622760)、[Guillermo Rauch on X](https://x.com/rauchg/status/2081517519303737559)

## 结语

今天的主线可以压成一句话：AI 正在同时向下扎进基础设施，向上逼近个人和企业的真实权限。底层是电力、冷却、网络、芯片、tokens per watt；上层是 Gmail、Calendar、Office、enterprise systems、compliance 和用户信任。中间的机会，是把 intelligence 变成能交付、能恢复、能审计、能被授权的工作系统。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 X、podcast 内容整理；没有使用额外抓取来源。今日 JSON 中没有官方博客条目。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
