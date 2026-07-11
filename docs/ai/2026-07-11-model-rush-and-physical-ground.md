---
title: 2026-07-11｜模型狂潮与现实地面
date: 2026-07-11
---

今天的 builders 信号有点像两股力同时拉扯：一边是模型发布周的速度、价格和产品包装继续加速，另一边是更老派也更冷静的问题重新冒出来：agent 要落地，终究要有可靠 runtime、企业数据、物理世界和真实现金流。

所以今天不只是「谁又发布了更强模型」。更值得看的是：当 intelligence 变得更容易买到，建造者开始把注意力转向三件更硬的东西：成本、边界、地面。

## 1. GPT-5.6 成为今天的重力中心，但讨论已经从「聪明」转向「每个任务多少钱」

OpenAI 这波 GPT-5.6 的外部信号很集中。Sam Altman 说，他们听到了企业对 AI 成本的担忧，5.6 Sol、Terra、Luna 都是 dollars-per-task 上的一步前进；他还强调 Codex 是 OpenAI 新 work product 的核心，而且「not going anywhere」。来源：[Sam Altman on X](https://x.com/sama/status/2075267201058426944)、[Sam Altman on X](https://x.com/sama/status/2075293792048136572)

Thibault Sottiaux 则从产品运营侧给出配套动作：为了庆祝 GPT-5.6 Sol 发布，ChatGPT Work 和 Codex 的 usage limits 会在 24 小时内再次重置两次；此前他也宣布过一次 ChatGPT Work 和 Codex 的完整用量重置，并提到 Rajan Agarwal 加入做 model research 和 coding capabilities。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2075452680760443190)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2075330198887940337)

Box CEO Aaron Levie 给了更企业化的观察。他说 Box 正在用 Box AI Complex Work eval 测 GPT-5.6 family，这个 eval 会让 Box AI Agent 在企业文档集上做非常难的任务。按他的描述，Sol 相比 GPT-5.5 在复杂数据型任务上提升明显：金融服务 76% vs 71%，医疗 58% vs 46%，公共部门 74% vs 63%，生命科学 60% vs 51%。他的重点不是泛泛地「更会推理」，而是 Sol 更会从 source definitions 和 documents 出发，避免在真实决策里会扩散的错误假设。来源：[Aaron Levie on X](https://x.com/levie/status/2075287443411222628)

Dan Shipper 的判断更短：GPT-5.6 Sol 是 knowledge work 的 gold standard。Nikunj Kothari 用玩笑体把这一周的密度串起来：GPT-5.6 分 Sol、Terra、Luna，Grok 4.5 抢先一天发布，Fable 5 回来，Sonnet 5 上周发布，Meituan 开源 LongCat-2.0，ByteDance 推 Seedream 5 Pro，OpenAI 推 GPT-Live，Ollama 融资。即使这条本身是段子，它也抓住了一个事实：模型竞争已经进入「多家同时压价格、速度、模态和默认入口」的节奏。来源：[Dan Shipper on X](https://x.com/danshipper/status/2075264022988116280)、[Nikunj Kothari on X](https://x.com/nikunj/status/2075411514773967261)

## 2. 模型市场没有变成单极，入口层开始重新定价

Replit CEO Amjad Masad 今天直接反驳了「Anthropic 会垄断」式叙事。他说 LLM 市场在很短时间内变得非常动态，六个月前一些 VC 还沉迷于 Anthropic monopoly 的想象，但 Anthropic 会继续做出好模型，其他公司和新进入者也会。来源：[Amjad Masad on X](https://x.com/amasad/status/2075413916491075755)

Vercel CEO Guillermo Rauch 也在看同一个方向。他说这是 model release week，并猜测 Meta Spark 1.1、Grok 4.5、GLM 5.2 会显著移动 token market share；因为多数 agentic tasks 需要的是「足够高的 intelligence」加上快速度。他随后补了一句：open models are about to get exorbitantly fast。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2075294130327196152)、[Guillermo Rauch on X](https://x.com/rauchg/status/2075294327354577256)

Garry Tan 的反馈提供了一个具体落点：Meta Muse Spark 1.1，早期 access 名叫 Hornbill，在他的 OpenClaw 上表现很好。来源：[Garry Tan on X](https://x.com/garrytan/status/2075445455438385255)

这几条放在一起看，模型市场的关键不是「谁赢一次 benchmark」，而是 token share 开始像云资源一样被速度、价格、availability 和 gateway 分发重新切开。对于 builder 来说，默认供应商越来越不该是宗教选择，而应该是 routing 策略。

## 3. Agentic coding 的核心，不是放飞，而是减少未知数

Claude Code 的 Thariq 给了今天最短也最有用的一句话：agentic coding 的核心技能之一，是 reducing your unknowns。来源：[Thariq on X](https://x.com/trq212/status/2075283841758183674)

这句话和 Amjad Masad 的另一条形成了很好互文：AI 正在让 coding less rigid，但 Replit 的 infra teams 反而第一次开始写 formal specs，系统更 deterministic，基础设施更 resilient。他的总结很准：「The faster you want to move, the more solid the ground beneath you has to be.」来源：[Amjad Masad on X](https://x.com/amasad/status/2075423115052790054)

Peter Yang 对 OpenAI 新产品的反馈也落在这个主题上。他称赞 OpenAI 有机会把 working with agents mainstream：ChatGPT 有 images、live voice、browser/computer use 和插件，已经接近一个能学习并完成白领工作的 coworker；他觉得 GPT-5.6「never gives up」，但也指出 ChatGPT Work vs Codex 命名混乱，Sol/Terra/Luna 与 effort 档位缺少使用指引，tasks 与 chat 的关系也会让普通用户困惑。来源：[Peter Yang on X](https://x.com/petergyang/status/2075345016437039600)

这其实是 agent 产品最现实的矛盾：模型越能干，产品越不能把用户丢进一堆模式、档位和抽象名词里。减少未知数，不只是写代码前多探索，也是产品要把「我该用哪个模型、哪个入口、哪个 effort」这类元问题藏起来。

## 4. 企业护城河会转向数据、workflow 和人如何使用系统

Aaron Levie 另一条长帖提出了一个更长期的问题：如果 AI 已经吸收了各行业最好的数据和知识，例如法律、金融、医疗、生命科学，那么公司未来靠什么竞争？他的答案倾向于一个 reinforcing loop：模型 intelligence、公司自己的数据、这些数据和 AI 在 workflow 里的连接方式，以及员工如何和系统互动，都会共同形成价值。来源：[Aaron Levie on X](https://x.com/levie/status/2075416313481290077)

这个判断很适合放进今天的模型狂潮里看。GPT-5.6、Grok 4.5、Meta Spark、GLM 这些名字会继续轮换，但企业真正能沉淀的不是「今天用了哪个最强模型」，而是把自己的 documents、process、permissions、reviews 和 employee behavior 组织成一个会复利的系统。

换句话说，模型越共享，差异化越不在模型本身；它会回到数据是否干净、workflow 是否真实、员工是否愿意把关键判断交给系统，以及系统是否能从这些判断中持续变好。来源：[Aaron Levie on X](https://x.com/levie/status/2075416313481290077)

## 5. Schmidhuber 的冷水：AGI 不是只在屏幕后面发生

今天最有重量的长内容来自 Unsupervised Learning 对 Jürgen Schmidhuber 的访谈。他一开始就把「AGI 进展」从屏幕拉回物理世界：当前 behind the screen 的 AI 很强，甚至已经能通过 Turing test，但 true AI 还包括现实世界里的 robots 和 machinery；他说现实硬件仍有很多限制，人造技术还比不上人的手。来源：[Unsupervised Learning｜Ep 90: AI Pioneer Jürgen Schmidhuber on the State of AI Today](https://www.youtube.com/watch?v=RKjR8DQ40po)

他对 artificial scientist 的描述也很关键：未来 AI 不应该只是吃 Web 上人类觉得有趣的数据，而应该像婴儿一样，通过自己的 action 生成训练 world model 的数据。他说 Web 数据看似很多，但只是所有可通过实验收集的数据里极小的一部分；未来 AI 会通过 artificial curiosity 收集数据，并训练不依赖人类语言、围绕具体机器人自身经验展开的 world models。来源：[Unsupervised Learning｜Ep 90: AI Pioneer Jürgen Schmidhuber on the State of AI Today](https://www.youtube.com/watch?v=RKjR8DQ40po)

这条线和今天的 agentic coding 很像：真正强的系统不是只会回答已有问题，而是会设计实验、减少未知数、用行动把世界变成可学习对象。区别只是软件 agent 的世界是 repo、browser、tool 和 enterprise data；Schmidhuber 关心的下一层，是带身体的系统如何在物理世界里自己产生数据。

## 6. CapEx 狂热的另一面：算力会变便宜，但买单者未必安全

Schmidhuber 对 AI business 的看法更逆风。他认为 compute per dollar 大概率继续按几十年来的节奏演进，大约每五年提升 10 倍；因此今天投进数据中心 GPU 的巨额资本，五年内会大幅贬值。他甚至说，当前投向 GPU data centers 的一千 billion dollars，五年内会损失 900 billion dollars，并把这视为可能发生 stock market crash 的信号之一。来源：[Unsupervised Learning｜Ep 90: AI Pioneer Jürgen Schmidhuber on the State of AI Today](https://www.youtube.com/watch?v=RKjR8DQ40po)

他的批评点不在「AI 没用」，而在资本配置：原本轻资产的软件公司正在变得像 utilities，要投 data centers、nuclear power plants、gas turbines，free cash flow 被吃掉；如果服务提供方为了 market share 持续亏钱，最终还是要回到 supply and demand。来源：[Unsupervised Learning｜Ep 90: AI Pioneer Jürgen Schmidhuber on the State of AI Today](https://www.youtube.com/watch?v=RKjR8DQ40po)

他对 moat 的看法也很刺耳：recursive self improvement 的许多基本思想来自小实验室和学术实验室，不是大公司独占发明；因此大公司很难靠一点优势长期赚钱。更大的方向是 AI 越来越便宜、参与者越来越多，今天令人惊讶的东西，三十年后可能会像智能手机能力一样普通。来源：[Unsupervised Learning｜Ep 90: AI Pioneer Jürgen Schmidhuber on the State of AI Today](https://www.youtube.com/watch?v=RKjR8DQ40po)

这并不等于「不要押 AI」。更准确的读法是：押 AI 技术和押某一批超重 CapEx 的公司，不是一回事。技术趋势可以长期向上，资产回报可以阶段性重估。

## 7. Google Gemini 的反馈清单：主流 AI 产品开始补旧世界的基本功

Google Labs / Gemini 的 Josh Woodward 今天把用户反馈排成了 Top 10，并给了逐项状态：Workspace integrations 要更可靠，这是第一请求；tool calling 要更可靠；Projects 和 folder organization 要重想；Gemini Spark 已经有早期 custom MCPs、custom skills 和 connected apps 支持，但要更广泛可用；Deep Research 用户希望导出到 NotebookLM，并能在同一聊天里切换 Deep Research mode 与 Flash/Pro；还有编辑历史消息、语音听写准确率、移动端滚动 bug 等。来源：[Josh Woodward on X](https://x.com/joshwoodward/status/2075241749048401936)

这份清单朴素但重要。AI 产品要成为日常工作入口，不能只靠「模型很强」。它还要有 folders、edit history、export、mobile scrolling、Workspace reliability、tool calling reliability。这些听起来像旧软件的基本功，但正是 agent 进入主流工作流时最容易被忽视的地面。

Madhu Guru 加入 Meta 做 AI products 的个人更新也押在类似方向：SWE agents 已经改变 software engineering，但大多数其他复杂系统里的 agents 仍处早期，多数人还没有感受到 AI agents 的全部力量；他认为 Meta 有位置去改变这件事。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2075243087325217038)

## 简短结语

今天最值得带走的判断是：模型发布越密，真正的竞争越会下沉到地面。

地面包括 dollars-per-task、runtime determinism、formal specs、企业数据的复利、用户能不能理解入口、以及机器人和现实世界之间还没有解决的硬件差距。模型会继续变强，也会继续变便宜；但 builder 的胜负手，越来越像是把这些 intelligence 接到稳定、可解释、可付费、可长期运行的系统里。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
