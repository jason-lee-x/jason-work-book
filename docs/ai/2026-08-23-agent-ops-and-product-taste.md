---
title: "2026-08-23｜Agent 进入工地，产品回到手感"
date: 2026-08-23
---

今天的 builders 信号不像一次大发布，更像几条工地日志：Codex 的 rate limit 和缓存命中率、Claude Security 的 repo 扫描与补丁、Vercel 用 `is-agentic` 反复打磨工具、Anthropic 内部常用的 ELI5 skill、以及个人把 Claude Code 接进家庭 Hermes bot 的小自动化。

这说明 AI 产品的重点正在从“模型看起来多聪明”转向“系统能不能稳定工作”。能力当然还在涨，但真正拉开差距的地方变得更粗糙也更真实：usage reset、cache hit、eval 分层、repo 级安全扫描、onboarding、隐私删除权、多线程工作区，以及那些让 agent 不撞门的产品细节。

## 1. Agent 产品开始暴露运行成本，而不是只展示魔法

OpenAI 的 Thibault Sottiaux 提到 Codex 的 rate limit 问题：部分用户本周的 cache hit rate 比此前稳定状态更差，这可能解释为什么一些人的 usage 消耗更快；团队正在调查并承诺更新。他随后确认 banked reset 已面向 ChatGPT Work 和 Codex 的付费用户落地。来源：[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2091033630147854385)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2090947196107764189)、[Thibault Sottiaux on X](https://x.com/thsottiaux/status/2090964822422949999)

这类信号很重要。Agentic coding 如果只是 demo，大家讨论的是“能不能写出来”；一旦进入日常使用，真正影响体感的是 token 消耗、缓存命中、reset 机制和可预期性。换句话说，AI coding 产品已经从能力叙事进入运维叙事。

Vercel CEO Guillermo Rauch 也给了同一个方向的工程侧证据：他们把 `is-agentic` 放进循环里跑，直到拿到 100/100，这迫使团队补上不少 gaps，并强调 criteria 必须高质量、值得用户花时间和 token。他还提到 Vercel 的相关工具现在支持 Grok 和 Codex subscriptions，并可在 sandbox 中测试。来源：[Guillermo Rauch on X](https://x.com/rauchg/status/2090858571613470919)、[Guillermo Rauch on X](https://x.com/rauchg/status/2090953806624489501)

## 2. 好 eval 不是一个分数，而是一组优先级明确的判断

Meta AI 的 Madhu Guru 写了 “How to build great evals” 系列的一条很硬的提醒：不要把复杂 eval suite 压成一个 single score。他称这为 “tyranny of the average”。例子也很直观：一个模型在简单摘要从 85% 到 89%、基础事实问答从 80% 到 85%，但在复杂金融分析从 70% 掉到 63%，单一分数会掩盖 frontier use case 的退化。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2090930137885774324)

他也反对用 weighted score 伪装精确性，因为那只是把 judgment call 包成数学形式。更好的办法是维护一组按优先级排列的 eval，让真正懂细节的人看 failure 和 strength，再判断新系统对用户是否更好。来源：[Madhu Guru on X](https://x.com/realmadhuguru/status/2090930137885774324)

这和 Vercel 的 `is-agentic` 信号可以合在一起看：AI 产品团队接下来拼的不是“有没有 benchmark”，而是 benchmark 是否逼近真实工作流、是否能暴露边界、是否值得消耗 token。平均分越漂亮，越可能把最重要的失败藏起来。

## 3. Security 和 coding agent 正在走向 repo 级工作流

Claude 官方账号介绍了 Claude Security 的一组更新：用户可以把 Claude Security 指向一个 GitHub repo，由 Mythos 扫描跨文件的数据流漏洞，并推理组件之间如何交互；每个 finding 会带 CWE category、confidence、severity ratings 和 suggested fix。建议补丁可以在 Claude Code on the web 中打开，扫描按现有 plan 的标准 token usage 计费。来源：[Claude on X](https://x.com/claudeai/status/2090852316328902930)、[Claude on X](https://x.com/claudeai/status/2090852318527033804)

同一组更新还提到，Anthropic 正在和 partners 合作把 Mythos 5 集成到安全产品和服务里，并推出 Defender Advantage Fund，为 open-source security 提供 3500 万美元 credits，Cyber Verification Program 也会在未来几周扩展。来源：[Claude on X](https://x.com/claudeai/status/2090852320128938319)

这里的关键不是“AI 能找漏洞”这句老话，而是接口形态：repo、跨文件 tracing、CWE、severity、confidence、suggested patch、Claude Code web。安全 agent 如果不能落到工程师已经使用的审查与修复流程里，就只是另一份扫描报告；如果能把 finding 直接接到 patch，它才开始像生产系统。

## 4. 小 skill 和小 bot，正在展示 agent 的真实入口

Claude Code 团队的 Thariq 分享了 Anthropic 内部最近常用的 ELI5 skill：`/eli5 <what you want explained>`，目标是用 HTML artifact、大图和少量文字，把某个主题解释给完全不了解的人。他给的例子不是玩具：解释一个 module 如何工作、为什么做某个 tradeoff、或者某次 incident 的原因。安装方式也直接写出：添加 `anthropics/claude-plugins-community` marketplace，再安装 `eli5@claude-community`。来源：[Thariq on X](https://x.com/trq212/status/2090884854590382515)、[Thariq on X](https://x.com/trq212/status/2090884855798407576)、[Thariq on X](https://x.com/trq212/status/2090890394880155888)

Nikunj Kothari 的家庭自动化例子更小，但更有未来感：他让 Claude Code 通过 network requests 找到女儿学校餐食网站背后的 API，发现接口未认证，解析出正确格式后交给已有的 Hermes bot。现在他的 Home bot 每天早上会告知早餐和午餐，方便决定是否自带食物。来源：[Nikunj Kothari on X](https://x.com/nikunj/status/2090884422178627624)

这两个例子都说明，agent 的入口不一定是宏大的“全自动员工”。很多高频价值来自小型、可解释、可复用的动作：把复杂模块讲清楚，把事故原因讲清楚，把网页背后的接口找出来，把结果接入已有 bot。真正好用的 agent，往往先从这些不起眼的缝隙长出来。

## 5. Product taste 仍然是 AI assistant 的硬约束

Peter Yang 对 Instinct 的评价很适合作为今天的产品手感样本。他认为 Instinct 的 onboarding 很顺，连接 iMessages、Google Workspace 和 MCPs 的体验令人印象深刻；它也比一些 assistant 更 proactive，会在连接 MCP 后马上建议可以做什么。来源：[Peter Yang on X](https://x.com/petergyang/status/2090814910720835633)

但他也指出自己不会用 Instinct 做真正工作，因为所有事情都在一个 thread 里。这和他对 bot 类产品的类似不满一致：UX 可以很干净，但真实工作经常需要同时和同一个 bot 开多个 thread。随后他又批评 Instinct 在未经许可的情况下 index 和 retain emails，并且不允许从记录中删除；在这个问题解决前，他不能推荐。来源：[Peter Yang on X](https://x.com/petergyang/status/2090814910720835633)、[Peter Yang on X](https://x.com/petergyang/status/2090936583814025417)

这是一条很现实的分界线：assistant 产品不能只靠“更主动”赢。它必须尊重工作并发、上下文隔离、数据保留和删除权。AI 越贴近私人通信与企业工具，隐私和信息架构越不是合规附录，而是产品本体。

## 6. 智能变便宜之后，机会转向扩散和模拟

Box CEO Aaron Levie 的判断是：AI 进展速度不像 tech history 中任何一个时期；模型在同类任务上变得更便宜、更通用、更快，也进入更多 domain。当 intelligence 变得 “too cheap to meter”，大机会会转向把 AI 扩散进经济系统；这对 applied AI 公司和能利用这股 tailwind 的 startup 是巨大时刻。来源：[Aaron Levie on X](https://x.com/levie/status/2091038566260539574)

Swyx 则把注意力放到 simulation。他说自己原本容易把 “Simulation is a new scaling law” 当作 marketing hyperbole，但现在开始认真看待：如果认真对待 recursive self-improvement，从模型逐步自动化 ML research 和 AI engineering 来看，最后或倒数第二个障碍是模拟 humans 和 human feedback。他提到 Simile 团队已在 Fortune 100s 中找到早期 PMF，并说自己 “never been so happy to be so wrong”。来源：[Swyx on X](https://x.com/swyx/status/2090948945753076141)

这两条放在一起，一个讲扩散，一个讲模拟。前者关心智能成本下降后如何进入经济；后者关心当模型能替代越来越多研发步骤后，如何生成、预测和利用人类反馈。它们都指向同一件事：下一阶段的瓶颈不只是模型，而是把智能嵌入社会、组织和反馈系统的方式。

## 7. Chess.com 的反例：超人 AI 没有杀死人的游戏

No Priors 这期和 Chess.com CEO Erik Allebest 聊了一个很好的反直觉案例：计算机早已在棋力上超过人类，但 chess 作为人的游戏并没有被杀死，反而被产品、社区、内容和文化重新放大。Allebest 提到 Chess.com 现在约有 1000 万 DAU、4000 到 5000 万 MAU、超过 2.5 亿注册用户、今年收入预计略高于 2 亿美元，团队约 650 人。来源：[No Priors](https://www.youtube.com/@NoPriorsPodcast)

他的建造路径也很非典型：2005 年从破产拍卖中买下 chess.com 域名，最初想做类似 MySpace 的 chess community；多数投资人认为这是 uninvestable niche passion project，于是团队靠现金流慢慢长大，早期通过 online chess learning membership 盈利，之后一直按收入增速招聘。来源：[No Priors](https://www.youtube.com/@NoPriorsPodcast)

更有意思的是 rating system 的讨论。他说正在把 chess playbook 带到 poker：核心不是谁能买更多 chips、用 bot、或靠不断 rebuy 取胜，而是 “how good are you really”。当人们开始在意 poker rating，它会像钱一样成为 skill 和 value 的反映。来源：[No Priors](https://www.youtube.com/@NoPriorsPodcast)

这对 AI builders 有一个旁证：superhuman capability 不必然消灭人的参与，关键看产品能否重塑人的身份、反馈和社区。Chess.com 把“只有 2000 分以上才算棋手”的旧叙事，改成 500 分也仍然是 chess player、仍然在 journey 里。AI 产品可能也需要类似转向：不是让人退出，而是重新定义人如何参与、学习、比较和成长。

## 结语

今天最清楚的判断是：AI agent 正在走出舞台，进入工地。工地里没有纯魔法，只有 cache hit、reset、token、eval、repo、patch、thread、privacy、onboarding 和一堆小 skill。

真正有品味的 AI 产品，会把这些粗糙细节处理到用户不必反复停下来理解系统边界；真正成熟的 AI 团队，也会拒绝用一个漂亮平均分掩盖关键失败。能力继续上涨当然重要，但接下来更稀缺的是把能力接进真实工作流的手感。

本文严格基于 Follow Builders 当日 JSON 中带 URL 的 podcast、blog 与 X 内容整理；未使用额外抓取来源。无明确 URL 或内容信号弱的条目未纳入正文。

Generated through the Follow Builders skill: https://github.com/zarazhangrui/follow-builders
