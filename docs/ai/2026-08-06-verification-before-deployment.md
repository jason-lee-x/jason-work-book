---
title: 2026-08-06｜先把模型看清，再把它放进世界
date: 2026-08-06
---

今天的 builders 信号不算喧哗，但很集中：大家开始从“模型能做什么”转向“模型如何被验证、被部署、被人群真正采用”。Chai Discovery 把药物设计说成另一个 scaling problem；企业侧还没有统一的 agent 架构；产品侧的共识也越来越清楚，早期验证要用最强模型，生产阶段再把成本和延迟打下来。换句话说，AI 的下一段不是炫技，而是把能力放进现实世界之前，先建立可观察、可验证、可迁移的工程回路。

## 1. Chai Discovery：药物设计的 bitter lesson 是验证，而不是少做实验

Training Data 这期采访了 Chai Discovery 的两位 co-founder Josh 和 Matt。最有意思的判断是，他们并不把 AI 药物设计理解成“减少实验室工作”，而是把实验室当成 eval system：如果能验证模型产物是否正确，就能 hill climb。Chai 的目标是把 drug discovery 变成 drug design，从“在几百万、几十亿个分子里找针”，转向输入理想分子状态，让模型生成候选。来源：[Training Data](https://www.youtube.com/watch?v=wv53mDmY-k0)

这个思路很像软件工程里的反馈回路：更好的模型不一定让实验室消失，反而可能因为 ROI 提升而带来更多实验。节目里提到，Chai 认为关键不是减少 lab testing，而是改变范式，让分子设计更像可迭代的工程过程。来源：[Training Data](https://www.youtube.com/watch?v=wv53mDmY-k0)

Chai 的路线带着很强的 bitter lesson 味道：scale data、scale models、scale compute，但前提是模型结构要足够简单。Matt 提到 CHI-1 有 23 个 distinct submodules，这会让研究迭代变得困难，因为每个子模块都要单独理解其行为和 dynamics；所以他们把“simplicity”作为原则，先把真正重要的部分找出来，再寻找 scaling direction。来源：[Training Data](https://www.youtube.com/watch?v=wv53mDmY-k0)

最硬的数字来自 antibody design。节目里说，Chai 起步时抗体设计的 state of the art binding rate 大约是 0.1%，也就是 1000 个分子里约 1 个能在实验室结合；而 CHI2 达到约 15% success rate，1000 个里约 150 个能回来。这改变了 eval 的密度：不再只是偶尔命中，而是能围绕分子性质建立统计、设计评估，并继续迭代。来源：[Training Data](https://www.youtube.com/watch?v=wv53mDmY-k0)

这里也有一个容易被忽略的产品判断：Chai 虽然是 AI researchers、protein designers，但 deliverable 仍然是一块 software。随着模型能力提高，他们开始需要 antibody engineers、scientists、product team、security 和 GPU scaling 人才，因为强模型要变成可用工具，必须有合适的 product interfaces、可靠代码和可部署系统。来源：[Training Data](https://www.youtube.com/watch?v=wv53mDmY-k0)

## 2. 先用 frontier model 找到产品，再谈便宜模型

Meta AI 的 Madhu Guru 给了一个很清晰的 builder playbook：早期产品验证阶段用最强 frontier model，先忽略成本和延迟，把用户体验和 workflow 验证出来；等 workflow 和 UX 成立后，再通过 prompt engineering、model routing、harnesses、小模型和 fine-tuning 去优化成本与延迟。他的提醒很直白：不要一开始就从最便宜模型做起。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2084667443046502631)

Madhu 进一步把节奏说得更像迁移策略：先用最强模型 prototype，6 到 8 周后等 open-weight models 追上，再把 production workloads 迁过去，能用小模型就用小模型。这个顺序很关键，因为 early validation 和 production optimization 本来就是两个不同问题；前者要最大化学习速度，后者才是成本、延迟和稳定性工程。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2084809416105472070)

这和 Peter Yang 的 SaaS 观察能接上：现在 vibe code 出来的 SaaS，可能更适合作为进入高价 services offering 的 self-serve funnel，而不是指望 micro SaaS 本身赚很多钱。但 Peter 也指出，services 会重新落回“用时间换钱”的咨询感。这里的现实是：AI 降低了造产品的门槛，但没有自动解决分发、信任和高客单交付的问题。来源：[Peter Yang on X](https://x.com/petergyang/status/2084855632029774167)

## 3. 企业 AI 还没有标准答案，异质性本身就是机会

Box CEO Aaron Levie 今天的企业侧观察很值得记：和 cloud 早期相比，AI 在企业里的 deployment patterns 更分散。问 10 个 IT leaders coding agent strategy，至少会得到 5 种答案；end-user productivity agents 有的标准化在 ChatGPT 或 Claude，有的提供多方案选择，也有企业自己建 orchestration layer，让员工调用不同模型。来源：[Aaron Levie on X](https://x.com/levie/status/2084828773808239080)

模型选择同样没有定局。Aaron 说，大模型当然存在，但企业也在试验 OSS models，或者至少对安全可用的 OSS offering 很好奇；同时，vertical models 和 vertical agents 也在进入特定 use cases。数据访问层也分化明显：有的让 agents 以用户身份行动，有的设置拥有独立身份的 agent users；guardrails 有的集中设计，有的把责任更多放给用户。来源：[Aaron Levie on X](https://x.com/levie/status/2084828773808239080)

Aaron 的结论是，市场还远没 settle，过早预测 ultimate market outcomes 大概率会错。这不是一句空泛的“机会很多”，而是说明 AI enterprise stack 还在形成基本语法：身份、权限、模型选择、数据访问、guardrails、vertical workflow，任何一个环节都可能长出新的基础设施公司。来源：[Aaron Levie on X](https://x.com/levie/status/2084828773808239080)

## 4. Agent 的采用不是理性效率题，而是社会扩散题

Zara Zhang 今天把 technology adoption 说得很准：多数人不会因为一项技术“更有效率”就采用它，而是因为相似的人用了并得到正反馈，或者因为周围人都在用，自己不想被落下。她把这句话压缩成一句：“The diffusion of technology is a SOCIAL process.” 对 AI 产品来说，这意味着 messaging 不该只说“10x efficiency”，而要让用户看到具体同类如何因为使用它而变好。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2084828855404294266)

同一条线索也延伸到 AI enablement。Zara 认为最好的 AI training 不是课程，而是把一个 agent 拉进团队群聊，让大家直接看它工作；公司在做 AI enablement programs 前，应该先试试这种现场扩散。这个判断很现实：组织学习不是把知识塞进 LMS，而是让新行为在工作场景里可见。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2084635984164237792)

她对会议效率的判断也符合 agent-native workflow：高效会议结束后不应该留下 to-do list，因为 action 要么被实时监听会议的 agents 完成，要么被人当场完成；说和做之间的 gap 应该为零，会议变成 work session。来源：[Zara Zhang on X](https://x.com/zarazhangrui/status/2084601752817729811)

Dan Shipper 从另一侧补了一句：当 agency rupture 修复、AI 重新变得 invisible，人们会重新只关心人类做成了什么，AI use 会被默认且不再重要。这个判断和 Zara 的观察相互咬合：AI 采用真正成熟时，它不是一个需要被不断声明的标签，而是嵌入工作流里的默认介质。来源：[Dan Shipper on X](https://x.com/danshipper/status/2084634391079469390)

## 5. 好产品正在减少模式切换，底层则继续吃掉 token 成本

Google Labs VP Josh Woodward 对 Notebook 的表述很产品化：Notebook 是为 thinking 设计的，不是为 toggling 设计的；当别人继续添加更多 modes，Notebook 保持在一个 unified prompt bar 里，让用户直接做想做的事。Ultra 和 Pro subscribers 已可使用，随后会逐步 rollout。来源：[Josh Woodward on X](https://x.com/joshwoodward/status/2084746170576892342)

Vercel CEO Guillermo Rauch 则给了偏基础设施的信号：AI SDK 里 1 行代码，可以在 DeepSeek v4 Flash AI Gateway tokens 上节省 90% 或更多。这个点虽小，但方向明确：当应用开始规模化跑 AI，token 不是抽象账单，而会变成每个框架、gateway、routing layer 都要主动优化的成本项。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2084779435866398801)

Guillermo 还提到 FactoryAI 用 Vercel Fluid compute 支撑 API services，每月有 billions of requests。这里的信号不是一句“Vercel for backends”的口号，而是 AI tooling company 的后端流量已经走到需要弹性 compute 和平台化 backend 的阶段。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2084804138169446449)

## 6. AI 金融和模型可理解性：边界要靠失误成本定义

Aditya Agarwal 介绍 TryRivo 时用了一个很好的问题框架：self-driving finance 的难点是 prediction under asymmetric cost。钱早一天回到 checking account，只是少一点收益；钱晚一天回来，就可能导致 bill bounced 并摧毁信任。AI agents 在这里要连接已有 checking account，学习现金流，把钱扫入 Treasury-backed yield，并在账单前调回。来源：[Aditya Agarwal on X](https://x.com/adityaag/status/2084691244496625793)

Aditya 另一个判断是，大规模部署 AI 的正确方式必须能理解它如何工作；LLM 不应该只是 black box。JSON 里没有提供被引用内容的完整上下文，所以这里不能展开外部细节，但这个方向和今天的主线一致：一旦 AI 进入钱、企业数据、药物和自动化执行，解释、监控和验证就不再是研究洁癖，而是产品生存条件。来源：[Aditya Agarwal on X](https://x.com/adityaag/status/2084676740924764625)

## 结语

今天最值得带走的判断是：模型能力已经足够便宜、足够可得，真正稀缺的是验证回路和采用路径。Chai Discovery 用 lab eval 把 biology 变成可 hill climb 的工程；Madhu Guru 提醒先用 frontier model 学习，再做 production optimization；Aaron Levie 看到企业 agent 策略仍然高度异质；Zara Zhang 则提醒技术扩散从来不是纯理性效率题。AI 的下一轮建设，不是把模型喊得更响，而是让它在现实系统里可见、可信、可迁移。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 X、podcast、blog 内容整理；没有使用额外抓取来源。无明确 URL 或内容信号弱的条目未纳入正文。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
