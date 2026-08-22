---
title: "2026-08-22｜把 Agent 的手伸进真实边界里"
date: 2026-08-22
---

今天的 builders 信号有一条很清楚的暗线：AI 产品正在从“模型能不能做”转向“它的手该伸到哪里、由谁控制、怎么验收”。真正进入企业和生产系统的 agent，不再只是一个聪明的聊天窗口，而是一组边界：session 如何保留，harness 如何演进，sandbox 在谁的基础设施里，私有服务怎么接入，输出质量怎么被持续拦截。

## 1. Agent 基础设施开始把“脑”和“手”拆开

Anthropic Engineering 对 Claude Managed Agents 的技术叙述很值得读：他们把 agent 抽象成 session、harness、sandbox 三块。session 是 append-only log，harness 负责调用 Claude 并路由工具调用，sandbox 则是执行代码和编辑文件的环境。文章的核心判断是，harness 对模型能力的假设会过期；随着模型变强，原先为弥补模型弱点而写进系统的逻辑，可能变成 dead weight。来源：[Anthropic Engineering](https://www.anthropic.com/engineering/managed-agents)

更关键的是 Anthropic 对早期架构的反思：把 session、harness、sandbox 放在同一个 container 里，短期看简单，长期看却变成“pet”服务器。一旦 container 失败，session 会丢；一旦卡住，工程师只能进入容器排查，而容器里又可能有用户数据。于是他们选择把组件虚拟化，让接口稳定、实现可替换。这个方向很像操作系统把硬件抽象成 process 和 file：不是预测未来所有 agent，而是设计能承受未来变化的边界。来源：[Anthropic Engineering](https://www.anthropic.com/engineering/managed-agents)

同一天的 Claude Blog 把产品边界往企业侧推进：Managed Agents 支持 self-hosted sandboxes 和 MCP tunnels。前者让代码执行、敏感文件、包、服务和数据留在企业自己的基础设施或受控 sandbox provider 里；agent loop 仍由 Anthropic 处理 orchestration、context management 和 error recovery。后者让 agent 通过企业部署的 lightweight gateway 连接内网 MCP servers，而不是把内部数据库、私有 API、知识库和 ticketing systems 暴露到公网。来源：[Claude Blog](https://claude.com/blog/claude-managed-agents-updates)

这不是 Anthropic 一家的叙事。Boris Cherny 提到他们与客户合作的企业安全措施：面对 “Mythos-class models”，企业需要满足自己的隐私与合规规则，客户可以 own and control their own data，Anthropic 不保留数据，并计划秋季推出。Thariq 也说 Fable 的 enterprise safeguards 会运行在客户基础设施上，让企业控制数据位置和访问权。这些信号合在一起看，agent 的竞争正在从模型能力外溢到“执行边界”的产品化。来源：[Boris Cherny on X](https://x.com/bcherny/status/2090537902912815536)、[Thariq on X](https://x.com/trq212/status/2090569474139439335)

Guillermo Rauch 用一句 “We’re building AWS for agents” 把这个方向说得更直接。JSON 里没有展开具体形态，但结合 Vercel 也出现在 Claude self-hosted sandbox provider 列表里，可以看到一个趋势：agent 时代需要新的 compute、network、credential、preview、isolation 和 observability 层。未来的“云”不只托管 web app，也会托管长期运行、能调用工具、需要边界控制的 agent。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2090520415336845595)、[Claude Blog](https://claude.com/blog/claude-managed-agents-updates)

## 2. 质量问题暴露的是 agent 产品的操作系统难题

Anthropic 关于 Claude Code 质量报告的 postmortem 很具体：过去一个月用户反馈变差，最后定位到三类变化，分别影响 Claude Code、Claude Agent SDK 和 Claude Cowork，API 与 inference layer 未受影响。三类问题包括：默认 reasoning effort 从 high 改到 medium 后损害体验；idle session 后清理旧 thinking 的 bug 导致之后每轮都清理，让 Claude 显得健忘和重复；减少 verbosity 的 system prompt instruction 与其他 prompt change 叠加，伤害 coding quality。所有问题截至 4 月 20 日 v2.1.116 已修复。来源：[Anthropic Engineering](https://www.anthropic.com/engineering/april-23-postmortem)

这篇 postmortem 最有价值的地方不是“修了 bug”，而是它说明 AI 产品质量很难用单一指标观察。不同改动影响不同流量切片、不同时间窗口，聚合起来就像广泛而不稳定的 degradation；内部 usage 和 evals 一开始也没复现用户感受到的问题。Anthropic 后续措施包括让更多内部员工使用 public build、改进 Code Review 工具、对 Claude Code 的每次 system prompt change 跑更广的 per-model evals，并继续做 ablation 理解每一行 prompt 的影响。来源：[Anthropic Engineering](https://www.anthropic.com/engineering/april-23-postmortem)

Madhu Guru 今天的 eval 建议与这个 postmortem 正好互相咬合。他认为企业 AI 系统做不好，常常是因为缺少 eval strategy；需要 laddered evals：hill-climbing evals 推动产品前沿，regression evals 检查是否破坏当前产品，smoke tests 保住安全和基础要求，launch evals 则更接近真实流量。这个框架的重点不是“多测一点”，而是把不同成本、不同真实性、不同风险的测试放进一条梯子里。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2090595384905113939)、[Madhu Guru on X](https://x.com/realmadhuguru/status/2090635465120424067)

Peter Yang 的一个小判断也指向同一件事：很多 AI output 可以通过 manager agent 与 worker agent 的循环改善，比如持续追问“这就是你能做出的最好结果吗”“再仔细看一次”。这听起来像 prompt trick，但本质是把 review、challenge、retry 变成系统的一部分。agent 产品真正的壁垒，往往不是第一次回答，而是失败后的二次结构。来源：[Peter Yang on X](https://x.com/petergyang/status/2090564541499498919)

## 3. 成本、垂直化和入口正在重新分配

Aaron Levie 评论 applied AI 的 post-training 路径：当公司足够理解某个领域、拥有足够多相似任务，并且通用模型成本太高或任务足够独特时，专门为那类工作 purpose-design models 就会变得有意义。他引用的关键点是，通过 reward shaping 激励高效工具使用和 reasoning，在性能相当时减少 inference-time token 消耗，从而同时优化成本和质量。来源：[Aaron Levie on X](https://x.com/levie/status/2090664811185205722)

Replit 的 Amjad Masad 今天继续强调 Free Mode 的速度，并提到 Replit 与 OpenAI 的合作“long overdue”。JSON 里没有合作细节，但他的表达里有一个产品判断：让 coding 重新变得 interactive。AI coding 的一个陷阱是把“生成很多代码”误认为生产力；真正影响使用频率的，往往是 latency、反馈回路和用户能否连续试错。来源：[Amjad Masad on X](https://x.com/amasad/status/2090484698413740186)、[Amjad Masad on X](https://x.com/amasad/status/2090514571513708874)

OpenAI 的 Thibault Sottiaux 也补了一个边界问题：他们不会不透明地改变 Codex usage limits；受影响用户里不少人在用 sub2api，把 subscription 转成 API traffic 再转售或共享，这类用法会被 fraud-prevention systems 标记。他同时说明，通过 Sign in With ChatGPT 在官方客户端或支持登录的 OSS 客户端使用订阅额度是允许的。这里的产品含义很现实：模型订阅、API 流量、转售和 OSS 客户端之间的边界，会成为 AI 工具商业化里越来越频繁的摩擦点。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2090675027670978569)

同一位 Thibault 还提到 GPT-Image-2 已支持在 ChatGPT 和 API 里生成透明图片，并展示了用于打印贴在 laptop 上的 cactus。另一个 tweet 则鼓励创建、分享 ChatGPT Site 并一起构建小游戏和站点。这些不是最重的基础设施信号，但它们说明 AI 产品入口正在从“问答”扩散到可分享的 artifact：图片、站点、小游戏、协作页面。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2090631723302469995)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2090518287532916854)

## 4. 从代码到神经接口：AI 仍在扩展“可计算的边界”

No Priors 这期采访 Max Hodak。节目开头把 Science 的核心产品描述为 retinal prosthesis，可理解为“眼睛的 cochlear implant”；Prima 已在欧洲获得监管批准，目标是帮助失明者重新获得视觉。Hodak 的表述很工程化：如果能把视觉、听觉、平衡、运动等信号进出大脑，那个接口本身就是中心对象；retinal prosthesis 是 proof of concept，接下来还要增加 grayscale depth，并探索至少 red 和 green 的路径。来源：[No Priors](https://www.youtube.com/watch?v=7HXqMepjvy8)

这期节目之所以适合放进 AI builders digest，不是因为它直接发布了新模型，而是因为它把“脑作为计算系统”的视角拉到了极端。Hodak 说大脑很直观地是一台 computer，skull 某种意义上就是 brain in a vat；大脑通过少量 cranial and spinal nerves 与环境交互。今天 agent infra 在拆 brain、hands、sandbox，神经接口在拆 brain 与 sensor/motor wires；两者都在问同一个问题：智能系统到底通过哪些受控通道接触世界。来源：[No Priors](https://www.youtube.com/watch?v=7HXqMepjvy8)

## 5. 创业叙事仍在向极端结果倾斜

Nikunj Kothari 解释为什么 ambition 在融资里变得更重要：大型基金规模更大，每笔投资都需要被 underwrite 到极大结果；当 Anthropic、OpenAI、SpaceX、Cursor 等故事抬高了 LP 与基金经理对 power law 的想象，error of omission 会变得比 error of admission 更可怕。这里不需要认同所有估值叙事，但它解释了为什么 AI 创业公司会被持续推向“够不够大”的叙事压力。来源：[Nikunj Kothari on X](https://x.com/nikunj/status/2090585553947517298)

Aditya Agarwal 今天的两条 founder 观察更朴素：最好的 founder 是 reductionists；SPC 看重 clarity，也就是诚实、穿过 fog of war、在浑浊环境里画出路径的能力。放在 AI 周期里，这句话很有用，因为今天噪声太多，真正稀缺的不是知道更多概念，而是能把混乱压缩成一个可执行判断。来源：[Aditya Agarwal on X](https://x.com/adityaag/status/2090501112927223889)、[Aditya Agarwal on X](https://x.com/adityaag/status/2090478527313252494)

## 结语

今天最值得保留的判断是：agent 的下一阶段不是“更像人”，而是“更像一个有边界的系统”。脑和手要拆开，执行要留在可信 perimeter 内，MCP 要连接私有服务但不暴露公网，quality regression 要能被 eval ladder 捕捉，成本则要通过 post-training、tool-use efficiency 和更短反馈回路压下来。

如果说前两年的 AI 产品是在争夺惊艳感，那么现在真正有品味的 builder 会盯住另一组问题：失败能不能定位，边界能不能声明，成本能不能解释，控制权能不能留给客户。模型仍然重要，但系统的手感，正在从这些边界里长出来。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 podcast、blog 与 X 内容整理；未使用额外抓取来源，未纳入没有原始 URL 的内容。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
