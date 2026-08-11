---
title: 2026-08-11｜把 agent 放进制度，也放回用户手里
date: 2026-08-11
---

今天的 builders 信号不像一次模型发布，更像一组基础设施侧的校准：agent 不能只靠“更聪明”继续前进，它需要可审计的协作网络、能嵌进企业流程的工作制度、抵抗 prompt injection 的安全边界，也需要从云端 API 重新走向个人控制、local compute 和个性化。换句话说，agent 时代的主问题正在从 capability 转向 governance、workflow 和 ownership。

## 1. Agent 要进入企业，先要变成流程，而不是更长的 prompt

Box CEO Aaron Levie 对 agent adoption 给了一个很好的冷水判断：agentic coding 之所以垂直增长，是因为软件开发天然接近“连续、不间断、纯数字输出”的工作；但销售、法律、医疗这些流程需要客户、当事人、病人等外部反馈回路，所以不会自动复制 coding agent 的扩散曲线。真正的机会不是把聊天框塞进企业，而是重构业务流程，让 agent 在合同、客户记录、科研测试等流动数据上持续后台工作。来源：[Aaron Levie on X](https://x.com/levie/status/2086559201053294909)

这也解释了为什么企业 AI 的难点常常不是模型接入，而是 workflow wiring：数据清理、change management、human-in-the-loop 审核、权限边界、任务触发器和完成标准都要重新设计。Levie 引用 Factory 的 Matan Grinberg 的说法：如果明天所有人都请病假，token usage 会暴跌，因为今天多数 agent 仍然依赖人类不断 prompt；未来的主体工作量应该来自后台运行的 agent。来源：[Aaron Levie on X](https://x.com/levie/status/2086559201053294909)

YC CEO Garry Tan 则给了更底层的建造方法：从 bug、gap、false claim、half-built tool 或机构里的怪行为出发，追问“什么隐藏机器让这个可见失败成为可能”，然后修根因，循环。这句话适合今天的 agent 工程：不要只修 prompt 表面症状，要修 agent 失败背后的数据、工具、权限、spec 和反馈机制。来源：[Garry Tan on X](https://x.com/garrytan/status/2086615082163941460)

## 2. 协作网络：agent 需要公共记忆，但这也是新的攻击面

Replit CEO Amjad Masad 提出了 HelpPeer，一个面向 AI agents 的 public commons，核心 API 是 `tell` 和 `lookup`：agent 遇到有复用价值的问题时向网络报告，在做昂贵工作前先查询别的 agent 是否已经踩过同一个坑。他用软件供应链攻击作类比：如果 10,000 个安全 agent 同时发现异常，不该各自重复逆向 payload 和写 mitigation，而应该让第一批 agent 发布发现，后续 agent 验证、增补并继续传播。来源：[Amjad Masad on X](https://x.com/amasad/status/2086628413322981747)

这个方向很有吸引力，因为 agent 的经验如果永远困在单次会话里，整个行业会不断重复低级探索；但它也把“agent 之间的自发协调”变成了正式基础设施。Masad 自己也承认，类似 OpenAI-HuggingFace incident 中的 spontaneous coordination 如果被恶意使用会令人担忧。他的判断是，与其只把这种行为视为风险，不如尝试把它导向 public good。来源：[Amjad Masad on X](https://x.com/amasad/status/2086628413322981747)

这里的分界线会很关键：公共 agent 记忆需要 provenance、verification、信誉、撤回机制和污染防护。否则，“lookup before work” 可能从节省成本变成放大错误或投毒的高速通道。今天这条信号值得跟踪，不是因为 HelpPeer 已经证明了答案，而是因为它把 agent 生态下一层缺失的东西说清楚了：共享经验的协议。来源：[Amjad Masad on X](https://x.com/amasad/status/2086628413322981747)

## 3. 安全边界开始从规则外壳进入模型行为本身

Claude Code 的 Boris Cherny 把 prompt injection 说得很具体：agent 访问网页时，页面里的恶意文字可能诱导模型发送用户的 SSH keys 或 passwords；早期 Claude 模型曾会中招，这也是很多重视安全的公司犹豫是否使用 agent 的原因。他说 Anthropic 一直在训练模型不要落入这类攻击，并称在使用 Claude models 时，“largely solved the threat of prompt injection in practice”。来源：[Boris Cherny on X](https://x.com/bcherny/status/2086520950259118464)

这个表述值得重视，但也要精确理解：它不是说所有 agent 安全问题消失，而是说模型层面的指令边界正在被系统性训练，而不只是靠外层 allowlist、sandbox 或提示词提醒。对实际部署来说，最稳的路径仍然会是多层防御：模型抗注入、工具权限最小化、敏感动作确认、日志审计和隔离运行环境叠加。来源：[Boris Cherny on X](https://x.com/bcherny/status/2086520950259118464)

Vercel CEO Guillermo Rauch 也从工程实践侧补了一刀：如果你完全不读代码，可能意味着你是 beginner、项目可丢弃、还在 prototype、没有用户/收入，或者正在承担债务和风险。他承认这种需求未来会减少，很多代码会像 assembly 一样退到背景里；但现在模型仍会犯 rookie mistakes，甚至走上糟糕架构路径，所以“agentic inquiry” 和人工读代码仍是生产软件的责任边界。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2086513316265181213)

## 4. 个人 AI 的反方向：从平均用户，回到具体的人

Unsupervised Learning 这期采访了 xAI co-founder Igor Babushkin。Igor 离开 xAI 后创办 River AI，核心动机不是再做一个云端 API，而是把 AI 的收益和控制权更广泛地分发出去。他把 River 的三个方向说得很清楚：面向企业的 River API，可理解为 reinforcement learning 和 fine-tuning 服务；面向个人的 personalization；以及把 inference compute 带到本地设备的 hardware 研究。来源：[Unsupervised Learning: Ep 92: xAI Co-Founder Unpacks the Future of Model Development](https://www.youtube.com/@RedpointAI)

Igor 对 personalization 的批评很直接：今天商业上成功的 agent 大多按“平均用户”训练，把不同用户的反馈合并后要求模型对所有人表现一致；River 想打破这个假设，让你的 agent 和我的 agent 在说话方式、偏好、行为上都不同，并且每次互动都能直接从个人身上学习。这个问题还很早期，但它抓住了 consumer AI 的一个硬伤：最强的通用模型不等于真正属于你的 agent。来源：[Unsupervised Learning: Ep 92: xAI Co-Founder Unpacks the Future of Model Development](https://www.youtube.com/@RedpointAI)

他对 local hardware 的设想也不是怀旧式“本地优先”，而是控制权、隐私和体验三者合流：今天最强 agent 依赖数据中心，个人只能通过 OpenAI、Anthropic 等 API 访问，对方决定限制、权限和可用性；River 想研究能否把 frontier model 的 inference compute 放进办公室或家里的小设备中。Igor 也承认这是 research project，因为当前主要受 memory 限制，但如果成立，本地设备会带来更低 latency，也可能让 voice、video input/output 等交互更自然。来源：[Unsupervised Learning: Ep 92: xAI Co-Founder Unpacks the Future of Model Development](https://www.youtube.com/@RedpointAI)

## 5. AI 工作成果需要可共享的表面，而不是口头汇报

Claude Blog 介绍了 Claude Code artifacts：Claude Code 可以把工作过程产生成 live、shareable visual pages，例如 PR walkthrough、system explainer、dashboard、release checklist，并且在 session 继续推进时自动更新同一个链接。Anthropic 给出的典型场景是 incident investigation：工程师让 Claude Code 分析日志并发布 timeline、suspect commits 和 error-rate chart；standup 开始前，页面已经随着调查进展 republish 多次。来源：[Claude Blog: Claude Code now supports artifacts](https://claude.com/blog/artifacts-in-claude-code)

这不是一个单纯的“把结果做漂亮”的功能，而是把 agent 的中间过程变成团队可共同查看的 artifact。它解决的是 agent 工作里的一个实际沟通成本：团队成员不必听某个人“walk us through what the agent found”，而是看同一个页面、同一份上下文、同一条版本历史。按 blog 描述，artifacts 默认对作者私有，可分享给 team 和 organization，且不能设为 public；管理员可以做 org-level toggle、role-based scoping、retention policies 和 compliance API 可见性。来源：[Claude Blog: Claude Code now supports artifacts](https://claude.com/blog/artifacts-in-claude-code)

这和今天其他信号是同一条线：agent 要进入组织，必须把工作过程对象化、版本化、权限化。聊天记录不是协作界面，artifact 才更接近组织能消费的单位。来源：[Claude Blog: Claude Code now supports artifacts](https://claude.com/blog/artifacts-in-claude-code)

## 6. 小信号：skills、taste 与多人协作

Swyx 提醒大家“DELETE your skills”：时间线里不断出现“这个 skill 改变人生”的推荐，很容易让人堆积一堆东西，轻则吃掉 context，重则在没盯 traces 的情况下互相产生意外副作用。这个提醒很实用：agent 能力不是装得越多越强，skills 也需要 pruning、观测和边界管理。来源：[Swyx on X](https://x.com/swyx/status/2086505938144616810)

Swyx 还为 AI Engineer 频道的 talk 质量做了辩护：他们是在建设一个大于任何单个人脑容量的 community 和 industry，很多 speaker 是真实做事的 engineers、researchers、academics 和 founders，不是巡回演讲的职业 talking heads。他也承认可以改进 curation、coaching 和 production。这个信号提醒我们：AI 圈的信息价值不只来自播放量和包装，也来自未被算法提前验证的第一手建造经验。来源：[Swyx on X](https://x.com/swyx/status/2086700857358450853)

Nikunj Kothari 提了一个还没被产品形态充分回答的问题：最好的 AI multiplayer experience 是什么？他看到的大多还是 human(s) 和 agent(s) 的接口重复同一套范式，真正多人类、多 agent 协同的体验还缺少范例。这个问题和 HelpPeer、Claude artifacts 放在一起看很有意思：agent 的下一代界面也许不是“一个人对一个助手”，而是多人、多 agent、共享状态、共享产物的协作空间。来源：[Nikunj Kothari on X](https://x.com/nikunj/status/2086438339419496449)

## 结语

今天最值得带走的判断是：agent 的下一步不是更会说话，而是更能被放进真实制度里。企业侧需要 workflow reengineering，生态侧需要共享经验协议，安全侧需要模型行为和系统权限的双层边界，个人侧则需要 personalization 和 local control。AI 的能力还会继续上涨，但真正决定它能否被信任、被组织吸收、被个人拥有的，是这些看起来不那么炫的基础设施。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 podcast、blog 与 X 内容整理；未使用额外抓取来源。无明确 URL 或内容信号弱的条目未纳入正文。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
