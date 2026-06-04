---
title: 2026-06-04｜代码变便宜之后，判断力变稀缺
date: 2026-06-04
---

# 2026-06-04｜代码变便宜之后，判断力变稀缺

今天的 builders 信号不热闹，但方向很集中：AI 正在把“写代码”和“做调研”这两类原本昂贵的动作压到更低成本。变化的结果不是软件自动变好，而是瓶颈往上游迁移了：你到底该建什么、怎样把 agent 放进真实工作流、如何控制 token 成本、怎样用 evals 和 traceability 防止幻觉。

换句话说，代码正在变便宜，真正稀缺的是判断力、工作上下文和可验证的执行系统。

## 1) 从 no-code 到 yes-code：代码不再是稀缺资源

Vercel CEO Guillermo Rauch 今天把立场说得很锋利：过去 no-code 这个品类成立，是因为代码昂贵、困难、稀缺；coding agents 改变了等式，代码正在变得便宜、容易、充裕。他把 Vercel 的方向称为 “yes-code”：不是绕开代码，而是让 agent 能在不牺牲性能和复杂度上限的前提下直接生成、部署和维护代码。[来源](https://x.com/rauchg/status/2061934154732974376)

这个判断和他另一条关于教育的观察连在一起看更有意思。Rauch 说，在 AI 时代，语言表层就是 roadmap，人类语言像 SDK 的 function definitions 一样，正在成为通往世界的新 API。过去 English 不能直接产出可运行的软件，中间必须经过学习编程或委托他人；现在这层翻译成本正在被 agent 吃掉。[来源](https://x.com/rauchg/status/2061862134469062850)

所以 “yes-code” 不是复古的工程师中心主义，而是一个更现实的判断：当代码供给膨胀，产品竞争不会消失，只会转移到更高层。谁更懂用户、业务约束、质量边界和部署环境，谁才能把便宜代码变成有用软件。[来源](https://x.com/rauchg/status/2061934154732974376)

## 2) Agent 工作流开始成形：从聊天窗口到日常生产线

Claude Code 团队的 Thariq 把 Workflows 称为 Claude Code 自 skills 和 subagents 之后最大的能力升级，并特别提到它会打开更多 non-technical tasks。这个信号重要，因为 agent 的下一步不是“更会聊天”，而是把重复任务、跨文件操作、非技术文档和业务流程变成可复用的执行轨道。[来源](https://x.com/trq212/status/2061907538741006796)

OpenAI Codex / ChatGPT 团队的 Thibault Sottiaux 也给出一组产品侧小信号：Codex 正在变得更适合 day-to-day work；business plan 用户可以 host 和 share websites；plugins 和 skills 有了明显改进；用户还能在 docs、slides、sheets 等场景里通过 visual annotations 给 agent 反馈。[来源](https://x.com/thsottiaux/status/2061876999564791952)

这两条合起来看，agent 产品正在从“会生成一次性结果”转向“能嵌入日常工作材料”。真正的工作界面不一定是 IDE，也可能是文档、幻灯片、表格、网站预览和一组可复用 workflow。Thibault 另一条更像品牌判断：ChatGPT 会继续存在，并且很快会成为 agents 的同义词。至少从今天这些产品信号看，ChatGPT / Codex 的边界确实在向工作流层扩张。[来源](https://x.com/thsottiaux/status/2062057881424506950)

Rauch 还提到 Conductor 像是为 coding agents 而生的 IDE，甚至可以称为 ADE；他认为 agents 会让 remote dev mainstream，尤其在大型、敏感组织里，“local” 本来就不是默认现实。[来源](https://x.com/rauchg/status/2061809689973944724)

## 3) Token 预算进入经营层：model routing 会成为 applied AI 的硬能力

Box CEO Aaron Levie 的观察很企业：随着 token budgets 在 operating expenses 中占比上升，model routing 几乎是必然结论。他认为，applied AI layer 的差异化会来自两件事：理解具体领域里的 work patterns，以及拥有足够强的 domain evals，从而在成本和性能之间做优化。[来源](https://x.com/levie/status/2061974298760495132)

Levie 的判断不是马上把所有任务丢给便宜模型。他明确说，很多 use cases 在可预见时间里仍然需要 frontier performance；但一旦某些子任务质量足够，就可以剥离出来，路由到更低成本模型。企业自己在规模化场景下逐一解决这个问题并不现实，因此能智能路由 workflow 到合适模型层级的产品，会有机会聚合更多需求。[来源](https://x.com/levie/status/2061974298760495132)

这解释了为什么 evals 会从“研发指标”变成“成本控制系统”。没有可靠 evals，就不知道哪些任务可以降级到便宜模型；没有 workflow understanding，就不知道该在哪里降级；没有 routing layer，token 成本最后会变成一笔越来越不可控的云账单。[来源](https://x.com/levie/status/2061974298760495132)

## 4) 简单 SaaS 被挤压：个人上下文和 AI skills 改变付费心理

Peter Yang 对 SaaS 的判断很值得创业者冷静看一眼：大型企业 SaaS，尤其是能做多种工作的产品，可能没问题；但面向狭窄 use case 的简单 SaaS 会更难 monetization。原因有三层：AI skills 往往能以更灵活、更个性化的方式解决同类问题；Codex / Claude Code 这类 AI-native agents 拥有用户个人上下文和 memory，比独立 SaaS 网站或 chatbot 更懂用户；而 $20/month 的 SaaS 会被用户拿来和 Claude / ChatGPT 订阅比较。[来源](https://x.com/petergyang/status/2061846283263103274)

他还引用 Matt 的一句提醒：有些人因为“现在能建任何东西”而兴奋到什么都建，结果发布后没有用户。这句话和 Listen Labs 那期 podcast 的主题正好互相照应：AI 降低了 build 的成本，但没有降低“知道该 build 什么”的难度。[来源](https://x.com/petergyang/status/2062018242789670929)

Peter 也给 Devin / Windsurf 团队补了一句认可，认为他们在起伏中保持纪律，很多 AI-native builders 已经喜欢 Devin。这不是完整评测，但说明 coding agent 正在从话题热度进入真实 builder 的工具偏好层。[来源](https://x.com/petergyang/status/2061936952400814392)

## 5) 用户研究被 AI 重写：Listen Labs 把“听客户”做成可扩展系统

Training Data 这期采访里，Listen Labs founder and CEO Alfred Wahlforss 给了一个非常清楚的创业命题：越接近 AGI，build things 会更容易，难点会变成 know what to build。Listen Labs 做的是 AI-first customer research，平台能同时跑大量 voice interviews；节目介绍里提到他们大约上线一年，已经服务 20% 的 Fortune 500，包括 Microsoft、Anthropic、Sweetgreen、NBC 等客户。[来源](https://www.youtube.com/watch?v=Rumft-rsEu4)

Listen Labs 的流程是：用户提出类似“如何改善 onboarding”的问题，系统生成 interview guide，再从 3000 万 participant audience 里找到合适对象，进行数百场访谈，分析数据并给出建议。Wahlforss 还说，他们接下来几个月要推出 simulation：在平台里完成数万次访谈后，预测未来客户会如何回答问题。[来源](https://www.youtube.com/watch?v=Rumft-rsEu4)

这里最关键的不是“AI 做 survey”，而是把用户洞察变成一个可追溯、可扩展、可复用的系统。Wahlforss 说 Listen 围绕 traceability 构建，每个数据点都能点击回原始 video 或 quote，这样用户知道 AI 不是在 hallucinate。对企业来说，这比一份漂亮总结更重要，因为可追溯性决定了 insight 能不能进入决策链条。[来源](https://www.youtube.com/watch?v=Rumft-rsEu4)

他对传统调研也有一个反直觉观察：很多人以为用户不愿意被 AI 采访，但 Listen 发现，人们可以更低报酬接受 AI 访谈，因为它 asynchronous、压力更低；他们还发现人们对 AI 更诚实，有时会把它当成 nonjudgmental entity，因而更愿意打开。[来源](https://www.youtube.com/watch?v=Rumft-rsEu4)

更底层的工程投入在 audience matching。Wahlforss 说，Listen 80% 的 engineering resources 都花在 audience 上，因为每家公司都被 customer segmentation 的 power law 驱动。比如 Sweetgreen 不是“所有人”的产品，真正可行动的用户画像可能是 urban、高 household income、mostly female，并且知道 seed oils 是什么；如果能找到这种核心 segment，调研就更有用。[来源](https://www.youtube.com/watch?v=Rumft-rsEu4)

## 6) 其他边缘信号：企业 app、法律、记忆与融资叙事

Replit CEO Amjad Masad 宣布与 Microsoft 合作，让企业用户可以构建和部署 safe & secure Fabric data apps，并提到这是基于 Microsoft 的 Rayfin SDK。他还说，SWE benchmarks 不一定能捕捉 app building capabilities，而 ViBench 更能衡量这件事。[来源](https://x.com/amasad/status/2061893093696434578) [来源](https://x.com/amasad/status/2061878314311266552)

Claude 官方账号转发了 Legora 的故事：Legora co-founder and CEO Max Junestrand 正在用 Claude 把法律解释这种古老工作带入新阶段；他的判断是，每次新模型发布都会抬高水位，而 Legora 要为其他人造船。[来源](https://x.com/claudeai/status/2061829558999912680)

Garry Tan 提到 GBrain 是面向 retrieval and memory 的 agentic swiss army knife。JSON 里没有更多展开，所以这里只能把它作为一个记忆 / 检索方向的产品信号记录下来。[来源](https://x.com/garrytan/status/2062052761945223266)

Zara Zhang 引用 OpenAI 最新 Codex report 里的数字：knowledge workers 已占 Codex users 约 20%，采用速度比 developers 快 3 倍以上；knowledge workers 增长最快的任务类型是 Data Analysis，周环比增长 110%，Research 增长 37%，Knowledge Artifacts 增长 36%。这组数字和前面的 workflows、visual annotations、docs/slides/sheets 场景可以互相印证：Codex 的用户边界正在越过纯工程人群。[来源](https://x.com/zarazhangrui/status/2061924300698091760)

Zara 还提到 Frontend Slides 已经有 20k GitHub stars，并且许多人已经用 HTML decks 替代 PPT；新功能包括 templates、publish as webpage / export as PDF、inline editing。这是另一个“代码变便宜后，知识产物变成网页”的小信号。[来源](https://x.com/zarazhangrui/status/2061889286585405790)

FPV Ventures partner Nikunj Kothari 则提醒创业者：AI / timing、funding、distribution / hype、market、product、revenue 都可以是 business 的必要组成，但不能把其中任意一个当成整个 business。他看到太多 pitch 只拿其中一项作为投资理由；在 seed 到 A 的断层里，bar 更高，founder 需要说明自己如何独特地同时捕获多个要素，并且难以被复制。[来源](https://x.com/nikunj/status/2062033620773306763)

## 简短结语

今天的主线很朴素：AI 把“生产动作”压便宜之后，“选择动作”的价值会上升。

Coding agents 让代码更便宜，但也让粗糙产品更容易泛滥；Claude Code workflows、Codex skills、visual annotations 和 remote ADE 把 agent 推进日常工作流；企业端开始认真面对 token routing 和 evals；Listen Labs 则把用户研究变成可扩展、可追溯的 AI 系统。

如果昨天的竞争是“能不能做出来”，明天的竞争会更像是：你是否知道该做什么，是否能把上下文交给 agent，是否能验证它没有胡说，以及是否能在成本曲线上长期跑下去。

## 原始来源

- [Guillermo Rauch on X: YES-CODE and Vercel as cloud for agents](https://x.com/rauchg/status/2061934154732974376)
- [Guillermo Rauch on X: human language as the new API to the world](https://x.com/rauchg/status/2061862134469062850)
- [Guillermo Rauch on X: Conductor as ADE and remote dev mainstream](https://x.com/rauchg/status/2061809689973944724)
- [Thariq on X: Claude Code Workflows as biggest upgrade since skills and subagents](https://x.com/trq212/status/2061907538741006796)
- [Thibault Sottiaux on X: Codex day-to-day work, websites, plugins, skills, visual annotations](https://x.com/thsottiaux/status/2061876999564791952)
- [Thibault Sottiaux on X: ChatGPT as synonym with AI and agents](https://x.com/thsottiaux/status/2062057881424506950)
- [Aaron Levie on X: token budgets and model routing](https://x.com/levie/status/2061974298760495132)
- [Peter Yang on X: simple SaaS monetization pressure from AI skills and agents](https://x.com/petergyang/status/2061846283263103274)
- [Peter Yang on X: builders lit up by building anything but launching to no users](https://x.com/petergyang/status/2062018242789670929)
- [Peter Yang on X: Devin / Windsurf discipline and AI-native builders](https://x.com/petergyang/status/2061936952400814392)
- [Training Data: Knowing What Your Customers Want, All the Time: Listen Labs' Alfred Wahlforss](https://www.youtube.com/watch?v=Rumft-rsEu4)
- [Amjad Masad on X: Replit partnership with Microsoft for Fabric data apps](https://x.com/amasad/status/2061893093696434578)
- [Amjad Masad on X: ViBench and app building capabilities](https://x.com/amasad/status/2061878314311266552)
- [Claude on X: Legora and law with Claude](https://x.com/claudeai/status/2061829558999912680)
- [Garry Tan on X: GBrain as retrieval and memory swiss army knife](https://x.com/garrytan/status/2062052761945223266)
- [Zara Zhang on X: Codex report on knowledge workers](https://x.com/zarazhangrui/status/2061924300698091760)
- [Zara Zhang on X: Frontend Slides reaches 20k stars](https://x.com/zarazhangrui/status/2061889286585405790)
- [Nikunj Kothari on X: founder pitch bar and seed-to-A gap](https://x.com/nikunj/status/2062033620773306763)

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
